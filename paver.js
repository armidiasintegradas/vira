document.addEventListener("DOMContentLoaded",()=>{
  const heroMeta=document.querySelector(".hero-meta");
  const syncHeroMeta=()=>{if(heroMeta)heroMeta.hidden=innerWidth<=700};
  addEventListener("resize",syncHeroMeta);syncHeroMeta();

  const area=document.querySelector("#paver-area");
  const areaValue=document.querySelector("#paver-area-value");
  const total=document.querySelector("#calc-total");
  const plastic=document.querySelector("#calc-plastic");
  const slag=document.querySelector("#calc-slag");
  const formArea=document.querySelector("#form-area");
  const formatKg=value=>`${Math.round(value).toLocaleString("pt-BR")} kg`;
  const updateCalc=()=>{
    const sqm=Number(area.value);
    const totalKg=sqm*18.5;
    const plasticKg=totalKg*.5;
    areaValue.textContent=sqm.toLocaleString("pt-BR");
    total.textContent=formatKg(totalKg);
    plastic.textContent=formatKg(plasticKg);
    slag.textContent=formatKg(totalKg-plasticKg);
    formArea.value=`${sqm.toLocaleString("pt-BR")} m²`;
  };
  area.addEventListener("input",updateCalc);
  document.querySelectorAll("[data-area]").forEach(button=>button.addEventListener("click",()=>{area.value=button.dataset.area;updateCalc()}));
  updateCalc();

  document.querySelectorAll(".faq details").forEach(item=>item.addEventListener("toggle",()=>{
    if(item.open)document.querySelectorAll(".faq details").forEach(other=>{if(other!==item)other.open=false});
  }));

  const dialog=document.querySelector("#passport-dialog");
  document.querySelector("#passport-demo").addEventListener("click",()=>dialog.showModal());
  document.querySelector("#passport-close").addEventListener("click",()=>dialog.close());
  dialog.addEventListener("click",event=>{if(event.target===dialog)dialog.close()});

  const form=document.querySelector("#paver-spec-form");
  const status=document.querySelector("#form-status");
  form.addEventListener("submit",event=>{
    event.preventDefault();
    const data=new FormData(form);
    const subject=encodeURIComponent(`Especificação Paver VIRA — ${data.get("empresa")||data.get("nome")}`);
    const body=encodeURIComponent(
`Nome: ${data.get("nome")}
E-mail: ${data.get("email")}
Empresa/órgão: ${data.get("empresa")||"Não informado"}
Local: ${data.get("local")||"Não informado"}
Área: ${data.get("area")||"Não informada"}
Aplicação: ${data.get("aplicacao")||"Não informada"}

Projeto:
${data.get("mensagem")||"Não informado"}`
    );
    status.textContent="Abrindo seu aplicativo de e-mail para concluir a solicitação…";
    location.href=`mailto:contato@projetovira.com.br?subject=${subject}&body=${body}`;
  });

  const navLinks=[...document.querySelectorAll(".product-nav a[href^='#']")];
  const sections=navLinks.map(link=>document.querySelector(link.getAttribute("href"))).filter(Boolean);
  if(sections.length){
    const observer=new IntersectionObserver(entries=>{
      const active=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(!active)return;
      navLinks.forEach(link=>link.classList.toggle("active",link.getAttribute("href")===`#${active.target.id}`));
    },{rootMargin:"-35% 0px -55% 0px",threshold:[0,.25,.5,1]});
    sections.forEach(section=>observer.observe(section));
  }
});
