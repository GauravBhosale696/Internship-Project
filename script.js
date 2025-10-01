
const menuBtn = document.getElementById('menuBtn');
const nav = document.querySelector('nav');
menuBtn && menuBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
});
class SimpleTyper {
  constructor(el, words, typeSpeed = 80, backSpeed = 40, pause = 1200) {
    this.el = el;
    this.words = words;
    this.typeSpeed = typeSpeed;
    this.backSpeed = backSpeed;
    this.pause = pause;
    this.txt = '';
    this.wordIndex = 0;
    this.isDeleting = false;
    this.tick();
  }
  tick() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = `<span>${this.txt}</span>`;

    let delta = this.isDeleting ? this.backSpeed : this.typeSpeed;

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.pause;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      delta = 300;
    }

    setTimeout(() => this.tick(), delta);
  }
}


const typedEl = document.getElementById('typed');
if (typedEl) {
  new SimpleTyper(typedEl, ['Web Developer', 'Engineering Student', 'Frontend Enthusiast'], 70, 40, 1100);
}


const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });
reveals.forEach(r => revealObserver.observe(r));

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
  let index = sections.length;
  while(--index && window.scrollY + 120 < sections[index].offsetTop) {}
  navLinks.forEach(link => link.classList.remove('active'));
  const active = document.querySelector(`.nav-link[href='#${sections[index].id}']`);
  if(active) active.classList.add('active');
}
window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);


navLinks.forEach(link => link.addEventListener('click', () => {
  if (nav.classList.contains('open')) nav.classList.remove('open');
}));

