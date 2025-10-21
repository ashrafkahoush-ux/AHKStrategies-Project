import React from "react";

export default function Automotive() {
    return (
        <main className="relative w-full h-screen overflow-hidden text-white">
            <video
                className="absolute inset-0 w-full h-full object-cover"
                src="/assets/ai_videos/Divisions_Pages_Backgrounds/Automotive.mp4"
                autoPlay
                loop
                muted
                playsInline
            />
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>

            <section className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                <h1 className="text-5xl font-bold mb-4">Automotive & Mobility</h1>
                <p className="max-w-2xl text-lg">
                    Driving the future of connected, electric, and sustainable mobility
                    solutions across the MENA region.
                </p>
            </section>
        </main>
    );
}
