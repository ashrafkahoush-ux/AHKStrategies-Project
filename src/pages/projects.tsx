import Link from "next/link";
import Head from "next/head";

export default function Projects() {
    return (
        <>
            <Head>
                <title>Projects & Business Opportunities | AHKStrategies</title>
                <meta
                    name="description"
                    content="Discover business opportunities and projects at AHKStrategies — bridging innovation, sustainability, and global partnerships."
                />
            </Head>

            <main
                className="relative min-h-screen flex flex-col justify-center items-center text-white px-6 py-20"
                style={{
                    backgroundImage: "url('/assets/images/pillars/projects-business-opportunities.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 text-center max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-cyan-300 drop-shadow-lg">
                        Projects & Business Opportunities
                    </h1>
                    <p className="text-lg md:text-xl leading-relaxed text-gray-200">
                        At <strong>AHKStrategies</strong>, our projects are not just ventures —
                        they are pathways to meaningful impact. We build partnerships that
                        drive innovation, shape industries, and empower sustainable growth.
                        Each opportunity represents a bridge between vision and execution,
                        connecting advanced technologies with human ingenuity.
                    </p>

                    {/* Back to home link */}
                    <div className="mt-10">
                        <Link href="/" className="text-cyan-300 hover:underline">
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
