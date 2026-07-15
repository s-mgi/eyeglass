// ===== Mobile / overlay menu =====
(function(){
  var burger=document.querySelector('.burger');
  if(burger){
    burger.addEventListener('click',function(){
      document.body.classList.toggle('menu-open');
    });
    document.querySelectorAll('.menu a').forEach(function(a){
      a.addEventListener('click',function(){document.body.classList.remove('menu-open');});
    });
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape') document.body.classList.remove('menu-open');
    });
  }
})();

// ===== Scroll reveal =====
(function(){
  var els=document.querySelectorAll('[data-reveal]');
  if(!('IntersectionObserver' in window)||!els.length){
    els.forEach(function(el){el.classList.add('in');}); return;
  }
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}
    });
  },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
  els.forEach(function(el){io.observe(el);});
})();

// ===== Accordion (lens tech / faq) =====
function toggleLens(btn){
  var item=btn.closest('.lens-item'),
      a=item.querySelector('.lens-a'),
      open=item.classList.contains('open');
  item.closest('.lens').querySelectorAll('.lens-item').forEach(function(i){
    i.classList.remove('open'); i.querySelector('.lens-a').style.maxHeight=null;
  });
  if(!open){item.classList.add('open'); a.style.maxHeight=a.scrollHeight+'px';}
}

// ===== Hero slider (images + dots) =====
(function(){
  var slides=document.querySelectorAll('.hero-slider .slide'),
      dots=document.querySelectorAll('.hero .dots i');
  if(!slides.length) return;
  var i=0, timer;
  function show(n){
    i=(n+slides.length)%slides.length;
    slides.forEach(function(s,x){s.classList.toggle('on',x===i);});
    dots.forEach(function(d,x){d.classList.toggle('on',x===i);});
  }
  function start(){timer=setInterval(function(){show(i+1);},4500);}
  function reset(){clearInterval(timer);start();}
  dots.forEach(function(d,idx){d.addEventListener('click',function(){show(idx);reset();});});
  show(0); start();
})();

// ===== Simple form handlers =====
document.querySelectorAll('form[data-fake]').forEach(function(f){
  f.addEventListener('submit',function(e){
    e.preventDefault(); f.reset();
    alert(f.getAttribute('data-msg')||"Thanks! We'll be in touch soon.");
  });
});
