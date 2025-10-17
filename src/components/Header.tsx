import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'saturate(1.2) blur(6px)', background: 'rgba(10,10,10,0.5)', padding: '1rem 2rem', display: 'flex', alignItems: 'center' }}>
      <Link href="/" passHref>
        <a style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600, fontSize: '22px', color: '#e0f2fe', textDecoration: 'none', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.textShadow = '0 0 12px #e0f2fe'; e.currentTarget.style.transform = 'scale(1.05)'; }} onMouseLeave={(e) => { e.currentTarget.style.textShadow = 'none'; e.currentTarget.style.transform = 'scale(1)'; }}>
          AHKStrategies
        </a>
      </Link>
      <nav style={{ marginLeft: 'auto', color: '#9aa7b8' }} aria-label="Top">
        <a href="#" style={{ marginLeft: '1rem', textDecoration: 'none', color: 'inherit' }}>About</a>
      </nav>
    </header>
  );
}
