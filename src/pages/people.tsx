import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PeopleCulture() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            gsap.fromTo(video, { opacity: 0 }, { opacity: 1, duration: 2.5, ease: "power2.out" });
        }

        gsap.to(videoRef.current, {
            yPercent: 5,
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
                <title>People & Culture | AHKStrategies</title>
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
                    color: "#f3d9b1", // soft warm gold
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
                    src="/assets/ai_videos/people.mp4"
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
                            "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.85))",
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
                            fontSize: "1.6rem",
                            fontWeight: 500,
                            color: "#eac784", // softer amber gold
                            textShadow: "0 0 20px rgba(0,0,0,0.4)",
                            marginBottom: "2.5rem",
                        }}
                    >
                        “Culture is the heartbeat of innovation — it’s where empathy,
                        collaboration, and purpose turn ideas into impact.”
                    </h2>

                    <h1
                        style={{
                            fontSize: "3.8rem",
                            fontWeight: 800,
                            color: "#b689ff", // futuristic violet tone
                            textShadow: "0 0 30px rgba(0,0,0,0.4)",
                            letterSpacing: "1px",
                            marginBottom: "2rem",
                        }}
                    >
                        People & Culture
                    </h1>

                    <p
                        style={{
                            fontSize: "1.2rem",
                            lineHeight: "1.9",
                            textAlign: "center",
                            color: "#f8e6c1", // warm light gold for readability
                            textShadow: "0 0 12px rgba(0,0,0,0.7)",
                        }}
                    >
                        At{" "}
                        <strong
                            style={{
                                color: "#f8e6c1", // same color, only bold for emphasis
                                fontWeight: "800",
                            }}
                        >
                            AHKStrategies
                        </strong>
                        , we believe people are the true catalysts of transformation.
                        Culture isn’t built by systems — it’s shaped by shared values,
                        trust, and creativity. We nurture an environment where empathy meets
                        excellence, diversity fuels innovation, and every voice has the
                        power to shape tomorrow.
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
