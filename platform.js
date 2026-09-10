function initTechnicalLibrary(){
  const buttons=[...document.querySelectorAll('.tech-filter')];
  const items=[...document.querySelectorAll('[data-tech-item]')];
  const status=document.querySelector('#tech-filter-status');
  if(!buttons.length||!items.length)return;
  buttons.forEach(button=>button.addEventListener('click',()=>{
    const filter=button.dataset.filter||'all';
    buttons.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
    let visible=0;
    items.forEach(item=>{const show=filter==='all'||item.dataset.family===filter;item.hidden=!show;if(show)visible+=1});
    if(status)status.textContent=filter==='all'?'Exibindo todas as famílias.':`Exibindo ${visible} itens da família ${button.textContent.trim()}.`;
  }));
}

function initPassportDemo(){}

document.addEventListener('DOMContentLoaded',()=>{initTechnicalLibrary();initPassportDemo()});
