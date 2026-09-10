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

function initPassportDemo(){
  const tabs=[...document.querySelectorAll('.passport-tab')];
  const panels=[...document.querySelectorAll('[data-passport-panel]')];
  const live=document.querySelector('#passport-live');
  if(!tabs.length||!panels.length)return;
  document.documentElement.classList.add('platform-js');
  const select=family=>{
    tabs.forEach(tab=>tab.setAttribute('aria-pressed',String(tab.dataset.passport===family)));
    panels.forEach(panel=>{panel.hidden=panel.dataset.passportPanel!==family});
    const active=tabs.find(tab=>tab.dataset.passport===family);
    if(live&&active)live.textContent=`Demonstração ${active.textContent.trim()} selecionada.`;
  };
  tabs.forEach(tab=>tab.addEventListener('click',()=>select(tab.dataset.passport)));
  select(tabs.find(tab=>tab.getAttribute('aria-pressed')==='true')?.dataset.passport||tabs[0].dataset.passport);
}

document.addEventListener('DOMContentLoaded',()=>{initTechnicalLibrary();initPassportDemo()});
