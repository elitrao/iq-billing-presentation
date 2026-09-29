'use strict';
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
const intro=document.getElementById('intro-screen');
if(intro){
  const started=performance.now();
  const closeIntro=()=>{
    const finish=()=>{
      let cleanupTimer;
      const cleanup=()=>{
        clearTimeout(cleanupTimer);
        intro.removeEventListener('animationend',onIntroEnd);
        document.body.classList.remove('intro-pending','intro-closing');
        intro.remove();
      };
      const onIntroEnd=event=>{
        if(event.target===intro&&event.animationName==='intro-screen-close')cleanup();
      };
      if(reduce.matches){cleanup();return;}
      intro.addEventListener('animationend',onIntroEnd);
      document.body.classList.add('intro-closing');
      cleanupTimer=setTimeout(cleanup,2300);
    };
    setTimeout(finish,reduce.matches?0:Math.max(0,1650-(performance.now()-started)));
  };
  if(document.readyState==='complete')closeIntro();else window.addEventListener('load',closeIntro,{once:true});
}
const slides=[...document.querySelectorAll('.slide')];
const chapters=['Новая модель','От тарифов к балансу','Стоимость использования','Личный кабинет','Пополнение и бонусы','Резерв Тренера','Защита баланса','История операций','Миграция клиентов','Итоги'];
const prev=document.getElementById('prev'),next=document.getElementById('next');
let current=0,transitioning=false;
const clamp=n=>Math.max(0,Math.min(slides.length-1,n));
function fromHash(){const match=location.hash.match(/^#slide-(\d+)$/);return match?clamp(Number(match[1])-1):0;}
const dots=slides.map((s,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',`${i+1}. ${chapters[i]}`);b.addEventListener('click',()=>go(i));document.querySelector('.dots').append(b);return b;});
function update(){document.getElementById('progress').style.width=`${(current+1)/slides.length*100}%`;prev.disabled=current===0;next.disabled=current===slides.length-1;dots.forEach((b,i)=>b.setAttribute('aria-current',String(i===current)));}
function go(target,write=true,animate=true){target=clamp(target);if(transitioning||target===current)return;const old=slides[current],incoming=slides[target],direction=target>current?1:-1;current=target;if(write)history.pushState(null,'',`#slide-${current+1}`);update();transitioning=true;old.inert=true;document.documentElement.style.setProperty('--enter-x',`${direction*6}vw`);document.documentElement.style.setProperty('--exit-x',`${direction*-3}vw`);const show=()=>{old.hidden=true;old.classList.remove('active','is-leaving');incoming.hidden=false;incoming.inert=false;incoming.scrollTop=0;incoming.classList.add('active');if(animate&&!reduce.matches)incoming.classList.add('is-entering');incoming.querySelector('h1,h2').focus({preventScroll:true});setTimeout(()=>{incoming.classList.remove('is-entering');transitioning=false;if(fromHash()!==current)go(fromHash(),false);},animate&&!reduce.matches?560:0);};if(animate&&!reduce.matches){old.classList.add('is-leaving');setTimeout(show,230);}else show();}
current=fromHash();slides.forEach((s,i)=>{s.hidden=i!==current;s.inert=i!==current;s.classList.toggle('active',i===current)});history.replaceState(null,'',`#slide-${current+1}`);update();
prev.addEventListener('click',()=>go(current-1));next.addEventListener('click',()=>go(current+1));
window.addEventListener('hashchange',()=>go(fromHash(),false));window.addEventListener('popstate',()=>go(fromHash(),false));
window.addEventListener('keydown',e=>{if(e.altKey||e.ctrlKey||e.metaKey||e.target.closest('button,a,input,select,textarea,[contenteditable=true]'))return;if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();go(current+1);}else if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();go(current-1);}else if(e.key==='Home'){e.preventDefault();go(0);}else if(e.key==='End'){e.preventDefault();go(slides.length-1);}});
document.querySelectorAll('.switch').forEach(b=>{const state=b.closest('article').querySelector('.product-state'),initial=state.innerHTML;b.addEventListener('click',()=>{const on=b.getAttribute('aria-checked')!=='true';b.setAttribute('aria-checked',String(on));state.innerHTML=on?initial:'Выключен · новые платные операции не запускаются';});});
document.getElementById('detail-toggle').addEventListener('click',e=>{const b=e.currentTarget,expanded=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(expanded));document.getElementById('history-detail').hidden=!expanded;});
const full=document.getElementById('fullscreen');if(!document.fullscreenEnabled)full.hidden=true;full.addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{full.hidden=true;}});document.addEventListener('fullscreenchange',()=>{const active=!!document.fullscreenElement;full.setAttribute('aria-label',active?'Выйти из полноэкранного режима':'Полноэкранный режим');full.title=full.getAttribute('aria-label');});
const cover=document.getElementById('slide-1'),coverArt=cover?.querySelector('.cover-art');
if(coverArt&&window.matchMedia('(pointer:fine)').matches&&!reduce.matches){let targetX=0,targetY=0,currentX=0,currentY=0,frame=0;const render=()=>{currentX+=(targetX-currentX)*.08;currentY+=(targetY-currentY)*.08;coverArt.style.setProperty('--art-x',`${currentX.toFixed(2)}px`);coverArt.style.setProperty('--art-y',`${currentY.toFixed(2)}px`);if(Math.abs(targetX-currentX)>.05||Math.abs(targetY-currentY)>.05)frame=requestAnimationFrame(render);else frame=0;};const start=()=>{if(!frame)frame=requestAnimationFrame(render);};cover.addEventListener('pointermove',e=>{const rect=cover.getBoundingClientRect(),x=Math.max(-1,Math.min(1,(e.clientX-rect.left)/rect.width*2-1)),y=Math.max(-1,Math.min(1,(e.clientY-rect.top)/rect.height*2-1));targetX=x*18;targetY=y*12;start();});cover.addEventListener('pointerleave',()=>{targetX=0;targetY=0;start();});}
