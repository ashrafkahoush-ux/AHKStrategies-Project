// Lightweight motion + sound starter
(function(){
  // Motion: intersection observer to reveal fade-in-up elements
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); } });
  },{threshold:0.12});
  document.querySelectorAll('.fade-in-up').forEach(el=>observer.observe(el));

  // Logo pulse
  const logo = document.querySelector('.brand'); if(logo) logo.classList.add('logo-pulse');

  // Pillar hover interactions
  document.querySelectorAll('.pillar').forEach(p=>{
    p.classList.add('pill-hover');
    p.addEventListener('mouseenter', ()=>{ if(window.innerWidth>900) p.style.transform='translateY(-6px) rotateX(1deg)'; });
    p.addEventListener('mouseleave', ()=>{ p.style.transform=''; });
    p.addEventListener('click', (ev)=>{
      // micro ripple
      const r = document.createElement('div'); r.className='pill-click-ripple';
      const rect = p.getBoundingClientRect(); r.style.left = (ev.clientX - rect.left) + 'px'; r.style.top = (ev.clientY - rect.top) + 'px';
      r.style.width = r.style.height = '8px'; r.style.background = 'radial-gradient(circle, rgba(255,255,255,0.12), rgba(255,255,255,0))';
      p.appendChild(r);
      requestAnimationFrame(()=>{ r.style.transition='width .45s ease,height .45s ease,opacity .45s ease'; r.style.width='220px'; r.style.height='220px'; r.style.opacity='0'; });
      setTimeout(()=> r.remove(), 600);
      // optionally play click sound if enabled
      if(window.motionSound && window.motionSound.enabled) window.motionSound.play('click');
    });
  });

  // Neon cursor
  const neon = document.createElement('div'); neon.id='neon-cursor'; document.body.appendChild(neon);
  window.addEventListener('mousemove', (e)=>{ neon.style.left = e.clientX + 'px'; neon.style.top = e.clientY + 'px'; });
  window.addEventListener('mousedown', ()=>{ neon.style.transform='translate(-50%,-50%) scale(1.2)'; neon.style.boxShadow='0 18px 60px rgba(96,165,250,0.22)'; });
  window.addEventListener('mouseup', ()=>{ neon.style.transform='translate(-50%,-50%) scale(0.8)'; neon.style.boxShadow='0 8px 30px rgba(96,165,250,0.14)'; });

  // Sound: lightweight Web Audio API kit (opt-in)
  const AudioKit = function(){
    try{
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const master = ctx.createGain(); master.gain.value = 0.12; master.connect(ctx.destination);
      const kit = { ctx, master, enabled: false };
      kit.play = function(name){ if(!kit.enabled) return; if(name==='click'){ const o=ctx.createOscillator(); const g=ctx.createGain(); o.type='sine'; o.frequency.value=880; g.gain.value=0.002; o.connect(g); g.connect(master); o.start(); setTimeout(()=>{ g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime+0.15); o.stop(ctx.currentTime+0.16); }, 20); }
        if(name==='pulse'){ const o=ctx.createOscillator(); const g=ctx.createGain(); o.type='sine'; o.frequency.value=120; g.gain.value=0.004; const bi=ctx.createBiquadFilter(); bi.type='lowpass'; bi.frequency.value=1000; o.connect(bi); bi.connect(g); g.connect(master); o.start(); setTimeout(()=>{ g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime+0.45); o.stop(ctx.currentTime+0.46); }, 40); }
      };
      kit.toggle = function(on){ kit.enabled = !!on; if(kit.enabled && ctx.state==='suspended') ctx.resume(); };
      return kit;
    }catch(e){ return null; }
  };
  window.motionSound = AudioKit();

  // Create a toggle UI
  const bar = document.createElement('div'); bar.style.position='fixed'; bar.style.right='18px'; bar.style.bottom='18px'; bar.style.zIndex=9999; bar.style.display='flex'; bar.style.gap='8px';
  const btn = document.createElement('button'); btn.className='cta'; btn.textContent='Sound'; btn.style.padding='8px 12px'; btn.style.borderRadius='8px'; btn.style.background='linear-gradient(90deg,var(--accent),var(--accent-2))'; btn.style.color='#04102b'; btn.style.fontWeight='700';
  btn.addEventListener('click', ()=>{ if(!window.motionSound) return; window.motionSound.toggle(!window.motionSound.enabled); btn.textContent = window.motionSound.enabled ? 'Sound: On' : 'Sound: Off'; if(window.motionSound.enabled) window.motionSound.play('pulse'); });
  bar.appendChild(btn); document.body.appendChild(bar);

})();


