// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if(toggle && links){
  toggle.addEventListener('click', ()=>{
    links.classList.toggle('show');
  });
}
// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if(target) target.scrollIntoView({behavior:'smooth'});
  });
});

// Back to top button
const backToTop = document.getElementById('backToTop');
if(backToTop){
  window.addEventListener('scroll', ()=>{
    if(window.scrollY > 300) backToTop.classList.add('show'); else backToTop.classList.remove('show');
  });
  backToTop.addEventListener('click', ()=>{
    window.scrollTo({top:0,behavior:'smooth'});
  });
}

// Slideshow (applies to each .slideshow on the page)
document.querySelectorAll('.slideshow').forEach(slideshow=>{
  const slides = Array.from(slideshow.querySelectorAll('.slide'));
  const prev = slideshow.querySelector('.prev');
  const next = slideshow.querySelector('.next');
  const dotsContainer = slideshow.querySelector('.dots');
  let idx = 0;
  let timer = null;

  // create dots
  slides.forEach((s,i)=>{
    const btn = document.createElement('button');
    btn.setAttribute('aria-label', 'Slide '+(i+1));
    btn.addEventListener('click', ()=>{ go(i); restart(); });
    dotsContainer.appendChild(btn);
  });

  const dots = Array.from(dotsContainer.children);

  function show(i){
    slides.forEach(s=>s.classList.remove('active'));
    dots.forEach(d=>d.classList.remove('active'));
    slides[i].classList.add('active');
    dots[i].classList.add('active');
  }

  function go(i){ idx = (i+slides.length)%slides.length; show(idx); }

  function nextSlide(){ go(idx+1); }
  function prevSlide(){ go(idx-1); }

  if(next) next.addEventListener('click', ()=>{ nextSlide(); restart(); });
  if(prev) prev.addEventListener('click', ()=>{ prevSlide(); restart(); });

  function start(){ timer = setInterval(nextSlide, 4000); }
  function stop(){ clearInterval(timer); timer = null; }
  function restart(){ stop(); start(); }

  // initialize
  if(slides.length){ show(0); start(); slideshow.addEventListener('mouseenter', stop); slideshow.addEventListener('mouseleave', start); }
});

// Contact form handler (static demo with inline status)
const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    const status = document.getElementById('formStatus');
    // Simple validation
    const name = contactForm.querySelector('#name');
    const email = contactForm.querySelector('#email');
    const message = contactForm.querySelector('#message');
    if(!name.value.trim() || !email.value.trim() || !message.value.trim()){
      status.textContent = 'Please complete all fields.';
      status.style.color = 'salmon';
      return;
    }
    // Simulate submit
    status.style.color = '';
    status.textContent = 'Message sent — thank you! (static demo)';
    contactForm.reset();
    setTimeout(()=>{ status.textContent = ''; }, 5000);
  });
}

// Highlight current nav link in the header navigation
;(function highlightCurrentNav(){
  try{
    const currentFile = location.pathname.split('/').pop() || 'index.html';
    const mark = el=>{
      el.classList.add('current');
      try{ el.setAttribute('aria-current','page') }catch(e){}
    }
    // header links
    document.querySelectorAll('.nav-links a').forEach(a=>{
      const linkFile = (a.getAttribute('href') || '').split('/').pop().split('#')[0];
      if(!linkFile) return;
      if(linkFile === currentFile) mark(a);
    });
    // footer links (optional, keep consistent)
    document.querySelectorAll('.footer-nav a').forEach(a=>{
      const linkFile = (a.getAttribute('href') || '').split('/').pop().split('#')[0];
      if(!linkFile) return;
      if(linkFile === currentFile) mark(a);
    });
  }catch(e){console.warn('nav highlight error', e)}
})();
