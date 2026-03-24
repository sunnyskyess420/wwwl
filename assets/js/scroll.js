/* =============================================================
   SCROLL.JS — Scroll-to-top button visibility + legend
               hide-on-scroll-down behaviour
   ============================================================= */

(function () {

  /* ----- SCROLL TO TOP BUTTON ----- */
  window.addEventListener('load', function () {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const strainList   = document.querySelector('.strain-list-container');

    if (!scrollTopBtn) return;

    function checkScroll() {
      const shouldShow = window.scrollY > 400 ||
                         (strainList && strainList.scrollTop > 200);
      scrollTopBtn.classList.toggle('show', shouldShow);
    }

    window.addEventListener('scroll', checkScroll);
    if (strainList) strainList.addEventListener('scroll', checkScroll);

    scrollTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (strainList) strainList.scrollTop = 0;
    });
  });

  /* ----- LEGEND HIDE ON SCROLL DOWN ----- */
let lastScrollY = 0;
const legend = document.querySelector('.legend');
const strainList = document.querySelector('.strain-list-container');

function checkLegendScroll() {
  if (!legend) return;  // FIXED: Null check here
  
  let currentScrollY = window.scrollY;
  if (strainList) currentScrollY += strainList.scrollTop;

  if (currentScrollY > lastScrollY && currentScrollY > 200) {
    legend.classList.add('hide');
  } else {
    legend.classList.remove('hide');
  }

  lastScrollY = currentScrollY;
}

window.addEventListener('scroll', checkLegendScroll);

// Strain top button (separate load handler)
window.addEventListener('load', function() {
  const strainTopBtn = document.getElementById('strainTopBtn');
  const strainScrollContainer = document.querySelector('.strain-list-container');
  
  if (!strainTopBtn || !strainScrollContainer) return;
  
  strainTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    strainScrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  function checkStrainScroll() {
    const shouldShow = strainScrollContainer.scrollTop > 50;
    strainTopBtn.classList.toggle('show', shouldShow);
  }
  
  strainScrollContainer.addEventListener('scroll', checkStrainScroll);
});
})();  // Closes the outer IIFE
