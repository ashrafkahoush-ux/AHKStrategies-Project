import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const visuals = [
  '/assets/ai_visuals/ahkstrategies_logo_v1.png',
  '/assets/ai_visuals/brain_holographic_v1.png',
  '/assets/ai_visuals/ai_hand_activation_v1.png',
  '/assets/ai_visuals/hero_brain_hand_v4.png',
  '/assets/ai_visuals/3D Brand.png'
];

export default function AiVisuals() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log('✅ AHKStrategies visual integration active: cinematic background + 3D visuals loaded.');
  }, []);

  return (
    <section aria-label="AI Visuals gallery" role="region">
      <div
        ref={containerRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          padding: '2rem',
        }}
      >
        {visuals.map((src, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ overflow: 'hidden', borderRadius: 12 }}
          >
            {/* ✅ Fixed: removed the extra "/" that caused "//assets/..." */}
            <Image
              src={src}
              alt={getAltText(src)}
              width={800}
              height={600}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              loading="lazy"
            />
            <figcaption
              style={{
                color: '#9aa7b8',
                fontSize: '0.85rem',
                padding: '0.5rem',
                textAlign: 'center',
              }}
            >
              {getCaption(src)}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

function getAltText(path: string) {
  if (path.toLowerCase().includes('logo')) return 'AHKStrategies logo';
  if (path.toLowerCase().includes('brain')) return 'Holographic brain visualization';
  if (path.toLowerCase().includes('hand')) return 'AI hand activation visual';
  if (path.toLowerCase().includes('3d')) return '3D brand render';
  return 'AI visual asset';
}

function getCaption(path: string) {
  return path.split('/').pop() || '';
}
