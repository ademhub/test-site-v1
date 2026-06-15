(function(){
  var isAbout = document.body.dataset.page === 'about';

  /* ── Scroll progress bar ── */
  if(!isAbout){
    var bar = document.createElement('div');
    bar.className = 'g-progress';
    document.body.prepend(bar);
    function updateBar(){
      var h = document.documentElement;
      var pct = h.scrollTop / (h.scrollHeight - h.clientHeight) || 0;
      bar.style.transform = 'scaleX('+pct+')';
    }
    window.addEventListener('scroll', updateBar, {passive:true});
  }

  /* ── Header scroll class ── */
  var hdr = document.querySelector('.site-header');
  if(hdr){
    window.addEventListener('scroll', function(){
      hdr.classList.toggle('is-scrolled', window.scrollY > 30);
    }, {passive:true});
  }

  /* ── Button ripple ── */
  document.querySelectorAll('.btn, .cart-btn').forEach(function(btn){
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.addEventListener('click', function(e){
      var r = document.createElement('span');
      var d = Math.max(btn.offsetWidth, btn.offsetHeight) * 1.4;
      var rect = btn.getBoundingClientRect();
      r.style.cssText = [
        'position:absolute',
        'border-radius:50%',
        'background:rgba(255,255,255,.35)',
        'width:'+d+'px',
        'height:'+d+'px',
        'left:'+(e.clientX - rect.left - d/2)+'px',
        'top:'+(e.clientY - rect.top - d/2)+'px',
        'pointer-events:none',
        'animation:btn-ripple .55s cubic-bezier(.16,1,.3,1) forwards'
      ].join(';');
      btn.appendChild(r);
      r.addEventListener('animationend', function(){ r.remove(); });
    });
  });

  /* ── Page entrance (skip about — it has its own hero anim) ── */
  if(!isAbout){
    document.body.style.animation = 'page-in .55s cubic-bezier(.16,1,.3,1) both';
  }

})();
