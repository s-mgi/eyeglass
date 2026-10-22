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

function toggleLens(btn){
  var item=btn.closest('.lens-item'),
      a=item.querySelector('.lens-a'),
      open=item.classList.contains('open');
  item.closest('.lens').querySelectorAll('.lens-item').forEach(function(i){
    i.classList.remove('open'); i.querySelector('.lens-a').style.maxHeight=null;
  });
  if(!open){item.classList.add('open'); a.style.maxHeight=a.scrollHeight+'px';}
}

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


(function(){
  var FORM_VERSION='2026-10-21';
  var PHONE='905.331.5999';
  function setup(form,formType,fields,okMsg){
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
      if(!form.checkValidity()){
        show('Please complete the highlighted fields.',false);
        var bad=form.querySelector(':invalid');
        if(bad) bad.focus();
        return;
      }
      var params=new URLSearchParams(window.location.search);
      var payload={formType:formType,formVersion:FORM_VERSION,sourcePath:window.location.pathname,
        utmSource:params.get('utm_source')||'',utmMedium:params.get('utm_medium')||'',utmCampaign:params.get('utm_campaign')||''};
      fields.forEach(function(n){var el=form.elements[n];if(el) payload[n]=el.type==='checkbox'?(el.checked?'yes':''):String(el.value||'').trim();});
      if(btn){btn.disabled=true;btn.innerHTML='Sending…';}
      show('Sending…',true);
      fetch('/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
      .then(function(res){return res.json().catch(function(){return {};}).then(function(body){return {ok:res.ok&&body.ok!==false,body:body};});})
      .then(function(r){
        if(r.ok){
          show(okMsg,true);
          form.reset();
          if(typeof gtag==='function'&&!payload.company) gtag('event','generate_lead',{form_name:formType});
        }else{
          try{console.warn('[cms] form rejected',r.body&&r.body.missing,r.body&&r.body.formVersion);}catch(err){}
          show((r.body&&r.body.error)||('Sorry, something went wrong. Please call us at '+PHONE+'.'),false);
        }
      })
      .catch(function(){show('Network error. Please check your connection, or call us at '+PHONE+'.',false);})
      .finally(function(){if(btn){btn.disabled=false;btn.innerHTML=btnHTML;}});
    });
  }
  setup(document.getElementById('contactForm'),'contact',
    ['firstName','lastName','email','phone','message','optIn','company'],
    "Thanks! Your message has been sent. We'll be in touch soon.");
  setup(document.getElementById('orderForm'),'lens',
    ['firstName','lastName','email','phone','supply','brand','message','address','unit','city','province','postal','optIn','company'],
    "Thanks! Your order request has been sent. We'll contact you to confirm the details.");
})();

(function(){
  var dlg=document.querySelector('.sc-dialog');
  var cards=[].slice.call(document.querySelectorAll('.sc-card'));
  if(!dlg||!cards.length||typeof dlg.showModal!=='function') return;
  var img=dlg.querySelector('.sc-img'),title=dlg.querySelector('.sc-title'),counter=dlg.querySelector('.sc-counter'),thumbs=dlg.querySelector('.sc-thumbs');
  var photos=[],idx=0,opener=null;
  function show(i){
    idx=(i+photos.length)%photos.length;
    var p=photos[idx];
    img.src=p.src;img.alt=p.alt;
    counter.textContent=(idx+1)+' / '+photos.length;
    [].forEach.call(thumbs.children,function(b,j){b.setAttribute('aria-current',j===idx?'true':'false');});
    var cur=thumbs.children[idx];if(cur&&cur.scrollIntoView) cur.scrollIntoView({block:'nearest',inline:'nearest'});
    if(photos.length>1){var pre=new Image();pre.src=photos[(idx+1)%photos.length].src;}
  }
  function open(card,from){
    photos=[].map.call(card.querySelectorAll('.sc-photos li'),function(li){return {src:li.getAttribute('data-src'),alt:li.getAttribute('data-alt')||''};});
    if(!photos.length) return;
    title.textContent=card.getAttribute('data-brand');
    thumbs.innerHTML='';
    photos.forEach(function(p,i){
      var b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Photo '+(i+1)+' of '+photos.length);
      var t=document.createElement('img');t.src=p.src;t.alt='';t.loading='lazy';b.appendChild(t);
      b.addEventListener('click',function(){show(i);});
      thumbs.appendChild(b);
    });
    dlg.classList.toggle('single',photos.length<2);
    opener=from;
    dlg.showModal();
    document.documentElement.classList.add('sc-lock');
    show(0);
  }
  cards.forEach(function(c){c.querySelector('.sc-open').addEventListener('click',function(){open(c,this);});});
  function norm(s){return String(s||'').toLowerCase().replace(/&/g,' ').replace(/\bco\b\.?/g,'').replace(/[^a-z0-9]/g,'');}
  var byName={};cards.forEach(function(c){byName[norm(c.getAttribute('data-brand'))]=c;});
  [].forEach.call(document.querySelectorAll('.brand-tile'),function(t){
    var im=t.querySelector('img');
    var c=byName[norm(im?im.alt:t.textContent)];
    if(!c) return;
    t.classList.add('has-sc');t.setAttribute('role','button');t.tabIndex=0;
    t.setAttribute('aria-label','See '+c.getAttribute('data-brand')+' frames');
    t.addEventListener('click',function(){open(c,t);});
    t.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();open(c,t);}});
  });
  dlg.querySelector('.sc-prev').addEventListener('click',function(){show(idx-1);});
  dlg.querySelector('.sc-next').addEventListener('click',function(){show(idx+1);});
  dlg.querySelector('.sc-close').addEventListener('click',function(){dlg.close();});
  dlg.addEventListener('click',function(e){if(e.target===dlg) dlg.close();});
  dlg.addEventListener('keydown',function(e){
    if(photos.length<2) return;
    if(e.key==='ArrowLeft'){e.preventDefault();show(idx-1);}
    if(e.key==='ArrowRight'){e.preventDefault();show(idx+1);}
  });
  dlg.addEventListener('close',function(){
    document.documentElement.classList.remove('sc-lock');
    if(opener&&opener.focus) opener.focus();
  });
  var stage=dlg.querySelector('.sc-stage'),x0=null,y0=0;
  stage.addEventListener('touchstart',function(e){x0=e.touches[0].clientX;y0=e.touches[0].clientY;},{passive:true});
  stage.addEventListener('touchend',function(e){
    if(x0===null||photos.length<2) return;
    var dx=e.changedTouches[0].clientX-x0,dy=e.changedTouches[0].clientY-y0;x0=null;
    if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)) show(idx+(dx<0?1:-1));
  },{passive:true});
})();
