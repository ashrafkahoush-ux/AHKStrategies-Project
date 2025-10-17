import dynamic from 'next/dynamic';
import Header from '../components/Header';
import AiVisuals from '../components/AiVisuals';

const Hero = dynamic(() => import('../components/Hero'), { ssr: false });

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero headline="AHKStrategies — Intelligence in Motion." />
        <AiVisuals />
      </main>
    </>
  );
}
