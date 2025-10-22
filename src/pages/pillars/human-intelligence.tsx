import Image from "next/image";
import Link from "next/link";

export default function HumanIntelligencePage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative w-full h-[38rem] overflow-hidden">
        <Image
          src="/assets/ai_images/pillars/human-intelligence.jpg"
          alt="Human Intelligence"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-10 left-0 right-0 mx-auto max-w-5xl px-6 text-white">
          <h1 className="text-4xl md:text-5xl font-bold">Human Intelligence</h1>
          <p className="mt-3 max-w-2xl text-lg opacity-90">
            People-first strategy, decision clarity, and leadership systems that
            compound over time.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12 prose prose-lg">
        <h2>Why it matters</h2>
        <p>
          Technology amplifies judgment; it doesn’t replace it. We design org
          structures, incentives, and decision protocols that let talent do its
          best work—measurably.
        </p>

        <h3>What we implement</h3>
        <ul>
          <li>Decision frameworks (one-way vs. two-way doors)</li>
          <li>Leadership operating cadence &amp; scorecards</li>
          <li>Org design aligned to strategy (not politics)</li>
          <li>Partner ecosystems &amp; knowledge transfer</li>
        </ul>

        <p className="mt-10">
          <Link href="/" className="no-underline">
            ← Back to Home
          </Link>
        </p>
      </section>
    </main>
  );
}
