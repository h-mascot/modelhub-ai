"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MessageBubble } from "@/components/MessageBubble";
import { ModelSelector } from "@/components/ModelSelector";
import { DEFAULT_MODEL, MODELS, type ModelId } from "@/lib/models";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  model?: string;
};

type Props = {
  compare?: boolean;
};

const STORAGE_KEY = "modelhub-history";

const CHAT_STARTERS = [
  "Summarize this meeting transcript into decisions, risks, and next steps.",
  "Rewrite this email to sound clearer, warmer, and more persuasive without getting longer.",
  "Turn these rough notes into a crisp strategy memo with recommendations and tradeoffs.",
];

const COMPARE_STARTERS = [
  "Compare how each model would write a launch email for a new B2B SaaS feature. Call out which answer is stronger and why.",
  "Compare how each model would debug a failing API request and explain the likely root cause step by step.",
  "Compare how each model would summarize customer interview notes into patterns, quotes, and product recommendations.",
];

function createWelcomeMessage(model: string): Message {
  return {
    id: crypto.randomUUID(),
    role: "assistant",
    model,
    content:
      "Ask for a summary, rewrite, code explanation, strategy memo, or side-by-side prompt. GLM-5 is live by default in this MVP.",
  };
}

export function ChatInterface({ compare = false }: Props) {
  const searchParams = useSearchParams();
  const [model, setModel] = useState<ModelId>(DEFAULT_MODEL);
  const [compareModel, setCompareModel] = useState<ModelId>("minimax");
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === "undefined") {
      return [createWelcomeMessage("GLM-5")];
    }

    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return [createWelcomeMessage("GLM-5")];
    }

    try {
      return JSON.parse(saved) as Message[];
    } catch {
      return [createWelcomeMessage("GLM-5")];
    }
  });
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const samplePrompt = searchParams.get("prompt")?.trim() || "";
  const starterPrompts = compare ? COMPARE_STARTERS : CHAT_STARTERS;
  const modelName = useMemo(
    () => MODELS.find((item) => item.id === model)?.name || model,
    [model],
  );

  useEffect(() => {
    if (!samplePrompt) return;

    setPrompt((currentPrompt) => (currentPrompt.trim().length > 0 ? currentPrompt : samplePrompt));
  }, [samplePrompt]);

  const persistMessages = (nextMessages: Message[]) => {
    setMessages(nextMessages);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextMessages));
    }
  };

  const sendPrompt = async () => {
    if (!prompt.trim() || loading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: prompt.trim(),
    };

    const nextMessages = [...messages, userMessage];
    persistMessages(nextMessages);
    setPrompt("");
    setLoading(true);

    try {
      if (compare) {
        const [left, right] = await Promise.all([
          fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model, prompt: userMessage.content }),
          }).then((res) => res.json()),
          fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model: compareModel, prompt: userMessage.content }),
          }).then((res) => res.json()),
        ]);

        persistMessages([
          ...nextMessages,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            model: modelName,
            content: left.reply || left.error,
          },
          {
            id: crypto.randomUUID(),
            role: "assistant",
            model:
              MODELS.find((item) => item.id === compareModel)?.name || compareModel,
            content: right.reply || right.error,
          },
        ]);
      } else {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model, prompt: userMessage.content }),
        });

        const data = await response.json();
        persistMessages([
          ...nextMessages,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            model: modelName,
            content: data.reply || data.error,
          },
        ]);
      }
    } catch (error) {
      persistMessages([
        ...nextMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          model: modelName,
          content:
            error instanceof Error ? error.message : "Something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const resetHistory = () => {
    const initial = [createWelcomeMessage("GLM-5")];
    persistMessages(initial);
  };

  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-4 shadow-2xl backdrop-blur md:p-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="grid gap-4 md:grid-cols-2">
          <ModelSelector value={model} onChange={setModel} label="Primary model" />
          {compare ? (
            <ModelSelector
              value={compareModel}
              onChange={setCompareModel}
              label="Compare with"
            />
          ) : null}
        </div>
        <button
          onClick={resetHistory}
          className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-400"
        >
          Clear history
        </button>
      </div>

      <div className="grid gap-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            role={message.role}
            model={message.model}
            content={message.content}
          />
        ))}
      </div>

      <form
        className="mt-6 space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          void sendPrompt();
        }}
        data-analytics-submit-event={compare ? "compare_submit" : "chat_submit"}
        data-analytics-location={compare ? "modelhub_compare" : "modelhub_chat"}
        data-analytics-label={compare ? "compare_answers" : "send_message"}
      >
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
              {compare ? "Starter comparisons" : "Starter prompts"}
            </p>
            {samplePrompt ? (
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[11px] text-cyan-200">
                Prefilled from article
              </span>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2">
            {starterPrompts.map((starter) => (
              <button
                key={starter}
                type="button"
                onClick={() => setPrompt(starter)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-left text-xs text-slate-200 transition hover:border-cyan-400/50 hover:text-white"
              >
                {starter}
              </button>
            ))}
          </div>
        </div>
        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder={compare ? "Paste the task you want to compare across models…" : "Ask ModelHub anything…"}
          className="min-h-32 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-4 text-slate-100 outline-none transition focus:border-cyan-400"
        />
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-400">
            Live now: GLM-5, GLM-4, MiniMax. OpenAI and Anthropic are visible in UI for upcoming rollout.
          </p>
          <button
            type="submit"
            data-analytics-event={compare ? "cta_click" : "cta_click"}
            data-analytics-location={compare ? "modelhub_compare" : "modelhub_chat"}
            data-analytics-label={compare ? "compare_answers" : "send_message"}
            disabled={loading}
            className="rounded-2xl bg-cyan-400 px-6 py-3 font-medium text-slate-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Thinking…" : compare ? "Compare answers" : "Send message"}
          </button>
        </div>
      </form>
    </div>
  );
}
