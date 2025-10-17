import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'saturate(1.2) blur(6px)', background: 'rgba(10,10,10,0.4)', padding: '1rem 2rem', display: 'flex', alignItems: 'center' }}>
      <Link href="/" passHref>
        <a style={{ fontFamily: 'Poppins, Inter, system-ui, sans-serif', fontWeight: 600, fontSize: '1.25rem', color: '#e6eef9', textDecoration: 'none' }} onMouseEnter={(e) => (e.currentTarget.style.textShadow = '0 0 8px #38bdf8')} onMouseLeave={(e) => (e.currentTarget.style.textShadow = 'none')}>
          AHKStrategies
        </a>
      </Link>
      <nav style={{ marginLeft: 'auto', color: '#9aa7b8' }} aria-label="Top">
        <a href="#" style={{ marginLeft: '1rem', textDecoration: 'none', color: 'inherit' }}>About</a>
      </nav>
    </header>
  );
}
