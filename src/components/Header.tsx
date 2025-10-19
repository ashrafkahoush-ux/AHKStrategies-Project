
import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <header className="site-header">
      <div className="brand">AHKStrategies</div>
      <nav className="main-nav" aria-label="Main navigation">
        <a href="#vision">Vision</a>
        <a href="#innovation">Innovation</a>
        <a href="#people">People</a>
        <a href="#legacy">Legacy</a>
      </nav>
    </header>
  );
}


