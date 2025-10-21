"use client";
import React from "react";
import Link from "next/link";

export default function Projects() {
  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const divisions = [
    { title: "Automotive", image: "/assets/images/divisions/automotive.jpg", id: "automotive" },
    { title: "Renewable", image: "/assets/images/divisions/renewable.jpg", id: "renewable" },
    { title: "Research", image: "/assets/images/divisions/research.jpg", id: "research" },
    { title: "Trade", image: "/assets/images/divisions/trade.jpg", id: "trade" },
    { title: "Digital", image: "/assets/images/divisions/digital.jpg", id: "digital" },
    { title: "MENA & Europe", image: "/assets/images/divisions/MENA region export business.png", id: "mena-europe" },
  ];

  return (
    <main className="relative min-h-screen w-full overflow-hidden text-white">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
      >
        <source src="/assets/backgrounds/projects-bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-8 py-24 space-y-10">
        <h1 className="text-5xl md:text-6xl font-bold text-indigo-300 drop-shadow-lg text-center">
          Projects & Business Opportunities
        </h1>

        <p className="max-w-4xl text-center text-indigo-100 text-lg leading-relaxed">
          At <strong>AHKStrategies</strong>, each division represents a pathway
          for strategic collaboration and growth across industries. Select a
          sector below to explore current and upcoming opportunities.
        </p>

        {/* Grid of Division Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-16">
          {divisions.map((division) => (
            <div
              key={division.id}
              className="cursor-pointer flex flex-col items-center"
              onClick={() => handleScroll(division.id)}
            >
              <img
                src={division.image}
                alt={division.title}
                className="w-40 h-40 object-cover rounded-xl shadow-lg border-2 border-indigo-500 hover:scale-105 transition-transform duration-300"
              />
              <p className="mt-4 text-xl font-bold text-center text-indigo-200">
                {division.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Division Sections */}
      <div className="relative z-10 bg-black/80 mt-32">
        {divisions.map((division) => (
          <section
            key={division.id}
            id={division.id}
            className="px-8 py-32 border-t border-indigo-900"
          >
            <h2 className="text-4xl font-bold text-indigo-300 mb-6 text-center">
              {division.title}
            </h2>
            <p className="text-lg text-indigo-100 max-w-4xl mx-auto text-center leading-relaxed">
              Opportunities and partnerships within the{" "}
              <strong>{division.title}</strong> division will be displayed here.
              This section can later include offers, investment highlights,
              downloadable brochures, or embedded media.
            </p>
          </section>
        ))}

        {/* Back to Home */}
        <div className="text-center py-16">
          <Link
            href="/"
            className="text-indigo-300 underline hover:text-white transition duration-300"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
