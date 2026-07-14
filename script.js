// Accordion (eye care lens tech / FAQ)
function toggleLens(btn){
  var item=btn.parentElement, a=item.querySelector('.lens-a'), open=item.classList.contains('open');
  item.parentElement.querySelectorAll('.lens-item').forEach(function(i){
    i.classList.remove('open'); i.querySelector('.lens-a').style.maxHeight=null;
  });
  if(!open){ item.classList.add('open'); a.style.maxHeight=a.scrollHeight+'px'; }
}
// Close mobile nav when a link is tapped
document.querySelectorAll('.primary a').forEach(function(a){
  a.addEventListener('click',function(){document.querySelector('.primary').classList.remove('open');});
});
