import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LegacyContinuity() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            gsap.fromTo(video, { opacity: 0 }, { opacity: 1, duration: 3, ease: "power2.out" });
        }

        gsap.to(videoRef.current, {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
                trigger: videoRef.current,
                scrub: true,
            },
        });
    }, []);

    return (
        <>
            <Head>
                <title>Legacy & Continuity | AHKStrategies</title>
                <link
                    href="https://fonts.googleapis.com/css2?family=Exo+2:wght@400;600;800&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div
                style={{
                    position: "relative",
                    overflow: "hidden",
                    minHeight: "100vh",
                    fontFamily: "'Exo 2', sans-serif",
                    color: "#e4dfc3", // subtle parchment tone
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "0 2rem",
                }}
            >
                <video
                    ref={videoRef}
                    src="/assets/ai_videos/legacy.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        top: 0,
                        left: 0,
                        zIndex: -1,
                    }}
                ></video>

                <div
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: 0,
                        left: 0,
                        background:
                            "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.9))",
                        zIndex: 0,
                    }}
                ></div>

                <div
                    style={{
                        position: "relative",
                        zIndex: 1,
                        maxWidth: "850px",
                    }}
                >
                    <h2
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: 500,
                            color: "#d9c67a", // golden olive tone
                            textShadow: "0 0 20px rgba(0,0,0,0.4)",
                            marginBottom: "2.5rem",
                        }}
                    >
                        “Legacy is not what we leave behind — it’s what continues to grow because of what we’ve built.”
                    </h2>

                    <h1
                        style={{
                            fontSize: "3.8rem",
                            fontWeight: 800,
                            color: "#98ffcc", // soft futuristic green
                            textShadow: "0 0 30px rgba(0,0,0,0.4)",
                            letterSpacing: "1px",
                            marginBottom: "2rem",
                        }}
                    >
                        Legacy & Continuity
                    </h1>

                    <p
                        style={{
                            fontSize: "1.2rem",
                            lineHeight: "1.9",
                            textAlign: "center",
                            color: "#f1eac7",
                            textShadow: "0 0 12px rgba(0,0,0,0.7)",
                        }}
                    >
                        At{" "}
                        <strong
                            style={{
                                color: "#f1eac7",
                                fontWeight: "800",
                            }}
                        >
                            AHKStrategies
                        </strong>
                        , legacy means more than reputation — it’s endurance through
                        evolution. It’s about designing systems and cultures that
                        outlast individuals, thriving across generations of thinkers,
                        dreamers, and builders. Continuity isn’t repetition — it’s
                        adaptation, guided by the wisdom of experience and the courage
                        to begin again.
                    </p>

                    <Link
                        href="/"
                        style={{
                            display: "inline-block",
                            marginTop: "3.5rem",
                            fontSize: "1.15rem",
                            color: "#00eaff",
                            textDecoration: "none",
                            transition: "0.3s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#00eaff")}
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </>
    );
}
