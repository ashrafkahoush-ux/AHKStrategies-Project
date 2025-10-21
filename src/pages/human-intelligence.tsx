import Head from "next/head";

export default function HumanIntelligence() {
    return (
        <>
            <Head>
                <title>Human Intelligence — AHKStrategies</title>
                <meta
                    name="description"
                    content="Human Intelligence — the Founder’s Vision behind AHKStrategies."
                />
            </Head>

            <main className="relative min-h-screen w-full text-white overflow-hidden">
                <video
                    className="fixed top-0 left-0 w-full h-full object-cover -z-10"
                    src="/assets/ai_videos/human-intelligence.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                />

                <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6 backdrop-blur-[2px]">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Human Intelligence</h1>
                    <p className="max-w-2xl text-sky-200/90 text-lg">
                        The founder’s mind — bridging human intuition and artificial intelligence.
                        A philosophy of leadership where clarity, vision, and empathy shape innovation.
                    </p>
                </div>
            </main>
        </>
    );
}
