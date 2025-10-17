"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} style={{ position: 'relative', height: '80vh', overflow: 'hidden' }} aria-label="Hero">
      {video ? (
        <video src={video} autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg,#070617,#000)' }} />
      )}

      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <motion.h1 aria-live="polite" initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} style={{ color: '#fff', fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, textAlign: 'center', textShadow: '0 4px 24px rgba(0,0,0,0.6)' }}>
          {headline}
        </motion.h1>
      </div>
    </motion.section>
  );
}
