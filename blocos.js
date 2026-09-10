document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.faq details').forEach(item=>item.addEventListener('toggle',()=>{
    if(item.open)document.querySelectorAll('.faq details').forEach(other=>{if(other!==item)other.open=false});
  }));

  const dialog=document.querySelector('#passport-dialog');
  const openPassport=document.querySelector('#passport-demo');
  const closePassport=document.querySelector('#passport-close');
  openPassport?.addEventListener('click',()=>dialog?.showModal());
  closePassport?.addEventListener('click',()=>dialog?.close());
  dialog?.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});

  const form=document.querySelector('#blocos-spec-form');
  const status=document.querySelector('#form-status');
  form?.addEventListener('submit',event=>{
    event.preventDefault();
    const data=new FormData(form);
    const subject=encodeURIComponent(`Especificação Blocos VIRA — ${data.get('empresa')||data.get('nome')}`);
    const body=encodeURIComponent(`Nome: ${data.get('nome')}\nE-mail: ${data.get('email')}\nEmpresa/órgão: ${data.get('empresa')||'Não informado'}\nLocal: ${data.get('local')||'Não informado'}\nEstágio: ${data.get('estagio')||'Não informado'}\nAplicação: ${data.get('aplicacao')||'Não informada'}\n\nProjeto:\n${data.get('mensagem')||'Não informado'}`);
    if(status)status.textContent='Abrindo seu aplicativo de e-mail para concluir a solicitação…';
    location.href=`mailto:contato@projetovira.com.br?subject=${subject}&body=${body}`;
  });

  const navLinks=[...document.querySelectorAll('.product-nav a[href^="#"]')];
  const sections=navLinks.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if(sections.length){
    const observer=new IntersectionObserver(entries=>{
      const active=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(!active)return;
      navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${active.target.id}`));
    },{rootMargin:'-35% 0px -55% 0px',threshold:[0,.25,.5,1]});
    sections.forEach(section=>observer.observe(section));
  }
});
