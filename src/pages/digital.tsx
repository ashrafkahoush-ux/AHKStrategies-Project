import React from "react";

export default function Digital() {
    return (
        <main className="relative w-full h-screen overflow-hidden text-white">
            <video
                className="absolute inset-0 w-full h-full object-cover"
                src="/assets/ai_videos/Divisions_Pages_Backgrounds/ai_digital.mp4"
                autoPlay
                loop
                muted
                playsInline
            />
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>

            <section className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                <h1 className="text-5xl font-bold mb-4">AI & Digital Transformation</h1>
                <p className="max-w-2xl text-lg">
                    Harnessing artificial intelligence, automation, and advanced analytics
                    to reshape industries and elevate operational intelligence across
                    MENA.
                </p>
            </section>
        </main>
    );
}
