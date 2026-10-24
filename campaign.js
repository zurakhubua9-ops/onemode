/* Responsive image sources also apply to cards inserted by search/filtering. */
(() => {
 const enhance = image => {
   const source = image.getAttribute('src') || '';
   const match = source.match(/^(assets\/campaign\/[a-z]+)-(?:480|960|1536)\.webp$/);
   if (!match) { image.removeAttribute('srcset'); return; }
   image.srcset = (match[1].endsWith('/hero') ? [480,960,1536] : [480,960]).map(width => `${match[1]}-${width}.webp ${width}w`).join(', ');
   image.sizes = image.closest('.hero-visual') ? '94vw' : image.closest('.cart-item, .checkout-summary-item, .all-brand-image, .search-results') ? '140px' : image.closest('.product-main-image, .editorial-image, .spotlight-media, .category-story-visual') ? '(max-width: 900px) 100vw, 50vw' : '(max-width: 900px) 48vw, 33vw';
 };
 document.querySelectorAll('img').forEach(enhance);
 new MutationObserver(records => records.forEach(record => {
   if(record.type === 'attributes') enhance(record.target);
   record.addedNodes.forEach(node => {
     if(node.nodeType !== 1) return;
     if(node.matches('img')) enhance(node);
     node.querySelectorAll('img').forEach(enhance);
   });
 })).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['src']});
})();
