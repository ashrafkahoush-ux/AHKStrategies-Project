"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero({ headline = 'AHKStrategies — Intelligence in Motion.' }: { headline?: string }) {
  const [video, setVideo] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch('/api/assets?type=video&latest=true')
      .then(res => res.json())
      .then(d => {
        const p = d?.path || (Array.isArray(d) ? d[0]?.path : d?.items?.[0]?.path) || null;
        if (mounted) setVideo(p);
      })
      .catch(() => { if (mounted) setVideo(null); });
    return () => { mounted = false; };
  }, []);
    // Manifesto Mode: always use Manifesto.mp4
    useEffect(() => {
      console.log('🎬 Manifesto Hero video active.');
    }, []);

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} style={{ position: 'relative', height: '80vh', overflow: 'hidden' }} aria-label="Hero">
      {/* Cinematic background image layer */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image src="/assets/ai_visuals/hero_cinematic_bg_v1.png" alt="AHKStrategies cinematic background" fill style={{ objectFit: 'cover' }} priority />
      </div>

        {/* Manifesto Cinematic Intro video layer */}
        <video
          src="/assets/ai_videos/Manifesto.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.7,
            zIndex: 1,
            transition: 'opacity 1s'
          }}
          onLoadedData={e => { e.currentTarget.style.opacity = '1'; }}
        />

      {/* Gradient overlay for text readability */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.3), rgba(0,0,0,0.6))', zIndex: 2 }} />

      {/* Text overlay */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 3, pointerEvents: 'none' }}>
        <motion.h1 aria-live="polite" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ color: '#e0f2fe', fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 800, textAlign: 'center', textShadow: '0 0 20px rgba(224,242,254,0.6)', marginBottom: '1rem' }}>
          {headline}
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }} style={{ color: '#e0f2fe', fontSize: 'clamp(18px, 3vw, 28px)', fontWeight: 400, textAlign: 'center', textShadow: '0 0 12px rgba(224,242,254,0.4)' }}>
          Where Vision Becomes Intelligence.
        </motion.p>
      </div>
    </motion.section>
  );
}



