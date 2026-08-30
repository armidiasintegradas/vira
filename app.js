const products={
  "paver-cinza":{title:"Paver Intertravado 16 Faces",category:"Pavimentação urbana",code:"VRA-PVR-2026",description:"Bloco intertravado maciço produzido com polímeros reciclados e compósitos minerais de alta densidade.",specs:[["Formato","16 faces — holandês"],["Dimensões","200 × 100 × 60 mm"],["Compressão","> 35 MPa"],["Absorção","< 0,05%"],["Garantia","10 anos"]]},
  "painel-plano":{title:"Painel Arquitetônico Plano",category:"Arquitetura e fachadas",code:"VRA-PRD-1204",description:"Placa rígida de alta densidade resistente à água e intempéries, indicada para mobiliário, divisórias e fachadas.",specs:[["Dimensões","2440 × 1220 mm"],["Espessuras","10, 15 e 20 mm"],["Densidade","0,94 g/cm³"],["Absorção","< 0,08%"],["Acabamentos","Polido, granulado e fosco"]]},
  "perfil-estrutural":{title:"Perfil Estrutural 80 × 80",category:"Construção e mobiliário",code:"VRA-LTE-0142",description:"Perfil maciço para decks, pergolados, cercamentos e mobiliário urbano, resistente à umidade, fungos e cupins.",specs:[["Seção","80 × 80 mm"],["Comprimento","3.000 mm ou sob medida"],["Ruptura","38,5 MPa"],["Pragas","100% imune"],["Origem","Caruaru — PE"]]},
  "materia-micronizada":{title:"Composto Micronizado VIRA-HD",category:"Matéria-prima circular",code:"VRA-MAT-0001",description:"Micronizados poliméricos homogêneos, preparados para processos industriais e acompanhados de controle de lote.",specs:[["Polímero base","PEAD / PP reciclado"],["Fluidez","0,8 a 4,5 g/10 min"],["Pureza","> 99,4%"],["Apresentação","Big bag ou saco de 25 kg"],["Rastreabilidade","Passaporte por lote"]]}
};

document.addEventListener("DOMContentLoaded",()=>{
  const header=document.querySelector("#site-header"),toggle=document.querySelector("#menu-toggle"),menu=document.querySelector("#menu-panel");
  const setMenu=open=>{toggle.classList.toggle("active",open);menu.classList.toggle("open",open);toggle.setAttribute("aria-expanded",String(open));menu.setAttribute("aria-hidden",String(!open));document.body.classList.toggle("locked",open)};
  toggle.addEventListener("click",()=>setMenu(!menu.classList.contains("open")));
  menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>setMenu(false)));
  document.addEventListener("keydown",e=>{if(e.key==="Escape")setMenu(false)});
  addEventListener("scroll",()=>header.classList.toggle("scrolled",scrollY>50),{passive:true});

  const filterButtons=document.querySelectorAll("[data-filter]"),cards=document.querySelectorAll(".product-card");
  filterButtons.forEach(button=>button.addEventListener("click",()=>{filterButtons.forEach(b=>b.classList.remove("active"));button.classList.add("active");const filter=button.dataset.filter;cards.forEach(card=>card.classList.toggle("hidden",filter!=="all"&&card.dataset.category!==filter))}));

  const drawer=document.querySelector("#drawer"),backdrop=document.querySelector("#drawer-backdrop");
  const closeDrawer=()=>{drawer.classList.remove("open");backdrop.classList.remove("open");drawer.setAttribute("aria-hidden","true");document.body.classList.remove("locked")};
  const openDrawer=id=>{const p=products[id];if(!p)return;document.querySelector("#drawer-category").textContent=p.category;document.querySelector("#drawer-title").textContent=p.title;document.querySelector("#drawer-description").textContent=p.description;document.querySelector("#drawer-code").textContent=`Código: ${p.code}`;document.querySelector("#drawer-specs").innerHTML=p.specs.map(([a,b])=>`<div class="drawer-spec"><span>${a}</span><strong>${b}</strong></div>`).join("");drawer.classList.add("open");backdrop.classList.add("open");drawer.setAttribute("aria-hidden","false");document.body.classList.add("locked")};
  document.querySelectorAll("[data-product]").forEach(button=>button.addEventListener("click",()=>openDrawer(button.dataset.product)));
  document.querySelector("#drawer-close").addEventListener("click",closeDrawer);backdrop.addEventListener("click",closeDrawer);document.querySelector(".drawer-cta").addEventListener("click",closeDrawer);

  const range=document.querySelector("#calc-area"),area=document.querySelector("#calc-area-val"),plastic=document.querySelector("#calc-res-plastic"),co2=document.querySelector("#calc-res-co2");
  const updateCalc=()=>{const sqm=Number(range.value),kg=Math.round(sqm*18.5);area.textContent=sqm.toLocaleString("pt-BR");plastic.textContent=`${kg.toLocaleString("pt-BR")} kg`;co2.textContent=`${Math.round(kg*2.15).toLocaleString("pt-BR")} kg`;range.style.background=`linear-gradient(90deg,var(--green) ${(sqm-50)/49.5}%,#ddd ${(sqm-50)/49.5}%)`};
  range.addEventListener("input",updateCalc);document.querySelectorAll("[data-preset]").forEach(b=>b.addEventListener("click",()=>{range.value=b.dataset.preset;updateCalc()}));updateCalc();

  document.querySelectorAll(".faq details").forEach(item=>item.addEventListener("toggle",()=>{if(item.open)document.querySelectorAll(".faq details").forEach(other=>{if(other!==item)other.open=false})}));

  const form=document.querySelector("#vira-contact-form"),alert=document.querySelector("#contact-alert");form.addEventListener("submit",e=>{e.preventDefault();const data=new FormData(form);const subject=encodeURIComponent(`Especificação VIRA — ${data.get("empresa")||data.get("nome")}`);const body=encodeURIComponent(`Nome: ${data.get("nome")}\nE-mail: ${data.get("email")}\nEmpresa: ${data.get("empresa")||"Não informada"}\n\nProjeto:\n${data.get("mensagem")||"Não informado"}`);alert.textContent="Abrindo seu aplicativo de e-mail para concluir o envio…";location.href=`mailto:contato@projetovira.com.br?subject=${subject}&body=${body}`});
});
