import React from "react";

export default function Renewable() {
    return (
        <main className="relative w-full h-screen overflow-hidden text-white">
            <video
                className="absolute inset-0 w-full h-full object-cover"
                src="/assets/ai_videos/Divisions_Pages_Backgrounds/renewable_energy.mp4"
                autoPlay
                loop
                muted
                playsInline
            />
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>

            <section className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                <h1 className="text-5xl font-bold mb-4">Renewable & Green Energy</h1>
                <p className="max-w-2xl text-lg">
                    Empowering sustainable progress through solar, wind, and innovative
                    energy technologies that fuel the region’s green transition.
                </p>
            </section>
        </main>
    );
}
