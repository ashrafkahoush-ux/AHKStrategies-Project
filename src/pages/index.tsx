import Head from 'next/head';
import React from 'react';
import Hero from '../components/Hero';
import AiVisuals from '../components/AiVisuals';
import Header from '../components/Header';

export default function Home() {
  return (
    <>
      <Head>
        <title>AHKStrategies  Intelligence in Motion</title>
        <meta name='description' content='Strategic innovation meets AI and human creativity.' />
      </Head>
      <main style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'radial-gradient(circle at top, #0a0a0a, #000)',
        color: '#fff'
      }}>
        <Header />
        <Hero />
        <AiVisuals />
      </main>
    </>
  );
}


