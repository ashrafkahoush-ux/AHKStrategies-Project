"use client";
import Link from "next/link";

export default function HeroSection() {
  const pillars = [
    { title: "Innovation", href: "/innovation", video: "/assets/backgrounds/innovation-bg.mp4" },
    { title: "Vision", href: "/vision", video: "/assets/backgrounds/vision-bg.mp4" },
    { title: "People", href: "/people", video: "/assets/backgrounds/people-bg.mp4" },
    { title: "Legacy", href: "/legacy", video: "/assets/backgrounds/legacy-bg.mp4" },
    { title: "Human Intelligence", href: "/human-intelligence", video: "/assets/backgrounds/human-intelligence-base.mp4" },
    { title: "Projects & Opportunities", href: "/projects", video: "/assets/backgrounds/projects-bg.mp4" },
  ];

  return (
    <section className="flex flex-col items-center justify-center mt-24 w-full bg-transparent">
      <h2 className="text-4xl font-bold text-indigo-300 mb-12 drop-shadow-lg tracking-wide text-center">
        AHKStrategies Vision Pillars
      </h2>

      <div
        className="
          mx-auto w-full max-w-[1500px] px-6
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8
          place-items-center
        "
      >
        {pillars.map((pillar) => (
          <Link
            key={pillar.title}
            href={pillar.href}
            className="group relative w-full rounded-2xl overflow-hidden border border-indigo-700/60 bg-transparent 
                       shadow-[0_0_30px_-5px_rgba(99,102,241,0.4)] 
                       hover:shadow-[0_0_55px_-5px_rgba(99,102,241,0.8)] 
                       transition-all duration-700 hover:scale-[1.05] hover:border-indigo-400"
          >
            <div className="aspect-[16/9] w-full overflow-hidden transform transition-transform duration-700 group-hover:scale-[1.08]">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              >
                <source src={pillar.video} type="video/mp4" />
              </video>
            </div>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_70%)] 
                            opacity-0 group-hover:opacity-70 animate-[pulse_3s_ease-in-out_infinite] transition-opacity duration-700"></div>

            <div className="absolute inset-0 flex items-center justify-center 
                            bg-gradient-to-t from-black/60 via-black/40 to-transparent
                            opacity-80 group-hover:opacity-100 transition-opacity duration-700">
              <span className="text-lg font-semibold tracking-wide text-indigo-200 group-hover:text-indigo-100 drop-shadow-md">
                {pillar.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
