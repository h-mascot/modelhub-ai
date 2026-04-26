import Link from "next/link";
import { Suspense } from "react";
import { AcquisitionTracker } from "@/components/AcquisitionTracker";
import { ChatInterface } from "@/components/ChatInterface";

export default function ChatPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10 md:px-10">
      <Suspense fallback={null}>
        <AcquisitionTracker />
      </Suspense>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Chat</p>
          <h1 className="mt-2 text-4xl font-semibold text-white">One prompt, one workspace, multiple models.</h1>
        </div>
        <div className="flex gap-3 text-sm text-slate-300">
          <Link href="/">Home</Link>
          <Link href="/compare">Compare</Link>
          <Link href="/pricing">Pricing</Link>
        </div>
      </div>
      <Suspense fallback={null}>
        <ChatInterface />
      </Suspense>
    </main>
  );
}
