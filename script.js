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

// ===== Simple demo form handlers (booking band, etc.) =====
document.querySelectorAll('form[data-fake]').forEach(function(f){
  f.addEventListener('submit',function(e){
    e.preventDefault(); f.reset();
    alert(f.getAttribute('data-msg')||"Thanks! We'll be in touch soon.");
  });
});

// ===== Contact form -> HubSpot (via /api/contact) =====
(function(){
  var form=document.getElementById('contactForm');
  if(!form) return;
  var btn=form.querySelector('button[type="submit"]');
  var status=form.querySelector('.form-status');
  var btnHTML=btn?btn.innerHTML:'';

  function show(msg,ok){
    if(!status) return;
    status.textContent=msg;
    status.hidden=false;
    status.classList.remove('is-ok','is-err');
    status.classList.add(ok?'is-ok':'is-err');
  }

  form.addEventListener('submit',function(e){
    e.preventDefault();

    // Basic front-end validation (backend validates too).
    if(!form.checkValidity()){
      show('Please fill in your name, email and message.',false);
      form.reportValidity && form.reportValidity();
      return;
    }

    var payload={
      fullname:(form.fullname&&form.fullname.value||'').trim(),
      email:(form.email&&form.email.value||'').trim(),
      phone:(form.phone&&form.phone.value||'').trim(),
      message:(form.message&&form.message.value||'').trim()
    };

    if(btn){btn.disabled=true;btn.innerHTML='Sending…';}
    show('Sending your message…',true);

    fetch('/api/contact',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(payload)
    })
    .then(function(res){
      return res.json().catch(function(){return {ok:false,error:'Unexpected server response.'};})
        .then(function(body){return {ok:res.ok&&body.ok,body:body};});
    })
    .then(function(r){
      if(r.ok){
        show(r.body.message||"Thanks! Your message has been sent.",true);
        form.reset();
      }else{
        show((r.body&&r.body.error)||"Sorry, something went wrong. Please call us at 905.331.5999.",false);
      }
    })
    .catch(function(){
      show("Network error. Please check your connection, or call us at 905.331.5999.",false);
    })
    .finally(function(){
      if(btn){btn.disabled=false;btn.innerHTML=btnHTML;}
    });
  });
})();
