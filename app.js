const products={
  "paver-cinza":{title:"Paver Intertravado 16 Faces",category:"Pavimentação urbana",code:"VRA-PVR-2026",description:"Bloco intertravado maciço produzido com polímeros reciclados e compósitos minerais de alta densidade.",specs:[["Formato","16 faces — holandês"],["Dimensões","200 × 100 × 60 mm"],["Compressão","> 35 MPa"],["Absorção","< 0,05%"],["Garantia","10 anos"]]},
  "guia-meio-fio":{title:"Guias e meio-fio",category:"Infraestrutura urbana",code:"VRA-GUI-SOB-PROJETO",description:"Elementos para delimitação, drenagem e organização de vias, calçadas e espaços públicos, configurados conforme as necessidades de cada implantação.",specs:[["Aplicação","Vias e passeios"],["Dimensões","Sob projeto"],["Acabamento","Sob especificação"],["Produção","Escala industrial"],["Origem","Caruaru — PE"]]},
  "bloco-concreto":{title:"Blocos de concreto",category:"Construção modular",code:"VRA-BLC-SOB-PROJETO",description:"Família de blocos produzida para diferentes necessidades construtivas, com configuração técnica definida para cada projeto.",specs:[["Aplicação","Construção"],["Dimensões","Sob projeto"],["Resistência","Conforme aplicação"],["Produção","Escala industrial"],["Origem","Caruaru — PE"]]}
};

document.addEventListener("DOMContentLoaded",()=>{
  const header=document.querySelector("#site-header"),toggle=document.querySelector("#menu-toggle"),menu=document.querySelector("#menu-panel");
  const setMenu=open=>{toggle.classList.toggle("active",open);menu.classList.toggle("open",open);toggle.setAttribute("aria-expanded",String(open));menu.setAttribute("aria-hidden",String(!open));document.body.classList.toggle("locked",open);document.body.classList.toggle("menu-open",open)};
  toggle.addEventListener("click",()=>setMenu(!menu.classList.contains("open")));
  menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>setMenu(false)));
  document.querySelectorAll(".site-header .brand,.footer-brand").forEach(brand=>brand.addEventListener("click",event=>{event.preventDefault();setMenu(false);window.scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});history.replaceState(null,"",`${location.pathname}${location.search}`)}));
  document.addEventListener("keydown",e=>{if(e.key==="Escape")setMenu(false)});
  const lightSections=".manifesto,.stats,.collection,.expertise,.proof,.faq,.contact";
  const updateHeaderTheme=()=>{header.classList.toggle("scrolled",scrollY>50);const probeY=Math.max(1,Math.min(innerHeight-1,header.getBoundingClientRect().height/2));const section=document.elementsFromPoint(innerWidth/2,probeY).map(element=>element.closest?.("main>section")).find(Boolean);document.body.classList.toggle("header-on-light",Boolean(section?.matches(lightSections)))};
  addEventListener("scroll",updateHeaderTheme,{passive:true});addEventListener("resize",updateHeaderTheme);updateHeaderTheme();

  const manifesto=document.querySelector("#manifesto"),manifestoCopy=manifesto.querySelector(".manifesto-copy");
  const textNodes=[];const walker=document.createTreeWalker(manifestoCopy,NodeFilter.SHOW_TEXT);while(walker.nextNode())textNodes.push(walker.currentNode);
  textNodes.forEach(node=>{const fragment=document.createDocumentFragment();node.textContent.split(/(\s+)/).forEach(part=>{if(!part)return;if(/\s+/.test(part)){fragment.append(document.createTextNode(part));return}const word=document.createElement("span");word.className="manifesto-word";word.textContent=part;fragment.append(word)});node.replaceWith(fragment)});
  const manifestoWords=[...manifestoCopy.querySelectorAll(".manifesto-word")],reduceMotion=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const updateManifesto=()=>{const rect=manifesto.getBoundingClientRect(),vh=innerHeight,progress=Math.max(0,Math.min(1,(vh*.67-rect.top)/(vh*.78)));manifestoWords.forEach((word,index)=>{const offset=index/Math.max(1,manifestoWords.length-1),local=Math.max(0,Math.min(1,(progress-offset*.72)/.28));word.style.opacity=reduceMotion?1:String(.12+local*.88);word.style.filter=reduceMotion?"none":`blur(${(1-local)*8}px)`;word.style.transform=reduceMotion?"none":`translateY(${(1-local)*12}px)`});document.body.classList.toggle("manifesto-active",rect.top<=70&&rect.bottom>70)};
  addEventListener("scroll",updateManifesto,{passive:true});addEventListener("resize",updateManifesto);updateManifesto();

  const journeyStages=[...document.querySelectorAll(".journey-stage")],journeyCurrent=document.querySelector(".journey-current"),journeyBar=document.querySelector(".journey-progress i");
  if(journeyStages.length){const setJourneyStage=stage=>{journeyStages.forEach(item=>item.classList.toggle("is-active",item===stage));const index=journeyStages.indexOf(stage);journeyCurrent.textContent=stage.dataset.step;journeyBar.style.width=`${((index+1)/journeyStages.length)*100}%`};const journeyObserver=new IntersectionObserver(entries=>{const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(visible)setJourneyStage(visible.target)},{rootMargin:"-32% 0px -32% 0px",threshold:[0,.25,.5,.75,1]});journeyStages.forEach(stage=>journeyObserver.observe(stage))}

  const stats=document.querySelector("#indicadores");if(stats){new IntersectionObserver(entries=>{if(entries[0].isIntersecting){stats.classList.add("metrics-visible")}},{threshold:.2}).observe(stats)}

  const expertiseChapters=[...document.querySelectorAll(".expertise-chapter")],expertiseImages=[...document.querySelectorAll("[data-expertise-image]")],expertiseCounter=document.querySelector(".expertise-stage-meta i");
  if(expertiseChapters.length){const setExpertise=chapter=>{const step=chapter.dataset.expertiseStep;expertiseChapters.forEach(item=>item.classList.toggle("is-active",item===chapter));expertiseImages.forEach(image=>image.classList.toggle("is-active",image.dataset.expertiseImage===step));expertiseCounter.textContent=step};const expertiseObserver=new IntersectionObserver(entries=>{const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(visible)setExpertise(visible.target)},{rootMargin:"-30% 0px -30% 0px",threshold:[0,.25,.5,.75,1]});expertiseChapters.forEach(chapter=>expertiseObserver.observe(chapter))}

  const filterButtons=document.querySelectorAll("[data-filter]"),cards=document.querySelectorAll(".product-card"),productGrid=document.querySelector(".product-grid");
  filterButtons.forEach(button=>button.addEventListener("click",()=>{filterButtons.forEach(b=>b.classList.remove("active"));button.classList.add("active");const filter=button.dataset.filter;productGrid.dataset.activeFilter=filter;cards.forEach(card=>card.classList.toggle("hidden",filter!=="all"&&card.dataset.category!==filter))}));
  document.querySelectorAll(".product-view-toggle").forEach(button=>button.addEventListener("click",()=>{const card=button.closest(".product-card"),factory=card.classList.toggle("show-factory");button.setAttribute("aria-pressed",String(factory));button.querySelector("span").textContent=factory?"Ver aplicação":"Ver na fábrica"}));

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
