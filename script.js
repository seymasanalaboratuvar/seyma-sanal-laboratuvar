import * as THREE from 'https://esm.sh/three@0.152.2';
import { GLTFLoader } from 'https://esm.sh/three@0.152.2/examples/jsm/loaders/GLTFLoader.js';

const organs = [
 {id:'nucleus',name:'Çekirdek',en:'Nucleus',emoji:'🧬',chip:'#d52bff',desc:'Hücrenin yönetim merkezi; DNA’yı barındırır.',edesc:'The control center of the cell; it contains DNA.',structure:'Çift katlı, gözenekli çekirdek zarı ve DNA’dan oluşan kromatin içerir.',estructure:'A double membrane with pores and DNA-containing chromatin.',fn:'DNA’daki bilgiyle protein üretimini yönetir.',efn:'Directs protein production using DNA information.'},
 {id:'nucleolus',name:'Çekirdekçik',en:'Nucleolus',emoji:'🟡',chip:'#ffd36e',desc:'Ribozom alt birimlerinin üretildiği bölge.',edesc:'The region where ribosome subunits are assembled.',structure:'Çekirdek içinde bulunan zarsız ve yoğun bir bölgedir.',estructure:'A dense, membrane-free region inside the nucleus.',fn:'rRNA sentezler ve ribozom alt birimlerinin oluşumuna katkı sağlar.',efn:'Produces rRNA and helps assemble ribosome subunits.'},
 {id:'mito',name:'Mitokondri',en:'Mitochondrion',emoji:'🔶',chip:'#f15a24',desc:'Hücresel solunumla ATP üreten organel.',edesc:'The organelle that produces ATP through cellular respiration.',structure:'Çift zarlıdır; iç zar kıvrımları kristaları oluşturur. Kendi DNA’sı ve ribozomları vardır.',estructure:'Double-membraned; folds of the inner membrane form cristae.',fn:'Besinlerdeki enerjiyi ATP’ye aktarır.',efn:'Transfers energy from nutrients to ATP.'},
 {id:'rough',name:'Granüllü ER',en:'Rough ER',emoji:'🌀',chip:'#075dff',desc:'Proteinlerin üretilmesi ve işlenmesiyle ilişkili zar ağı.',edesc:'A membrane network involved in protein production and processing.',structure:'Yüzeyinde ribozomlar bulunan kanal ve keseciklerden oluşur.',estructure:'A network of channels and sacs covered with ribosomes.',fn:'Proteinleri alır, katlar ve Golgi aygıtına gönderir.',efn:'Receives, folds and sends proteins to the Golgi.'},
 {id:'smooth',name:'Düz ER',en:'Smooth ER',emoji:'〰️',chip:'#12b9c8',desc:'Lipit sentezi, detoksifikasyon ve kalsiyum depolanmasında görev alır.',edesc:'Involved in lipid synthesis, detoxification and calcium storage.',structure:'Yüzeyinde ribozom bulunmayan borucuk biçimli zar ağıdır.',estructure:'A tubular membrane network without ribosomes.',fn:'Lipit sentezler, detoksifikasyon ve kalsiyum depolanmasında görev alır.',efn:'Synthesizes lipids and helps detoxification and calcium storage.'},
 {id:'golgi',name:'Golgi aygıtı',en:'Golgi apparatus',emoji:'📚',chip:'#ff3b98',desc:'Protein ve lipitleri düzenleyen, paketleyen ve yönlendiren organel.',edesc:'The organelle that modifies, packages and routes proteins and lipids.',structure:'Üst üste dizilmiş yassı zar keseciklerinden oluşur.',estructure:'A stack of flattened membrane sacs.',fn:'ER’den gelen maddeleri işler ve hedeflerine gönderir.',efn:'Processes materials from the ER and ships them to destinations.'},
 {id:'ribosome',name:'Ribozom',en:'Ribosome',emoji:'🔵',chip:'#b8e9ff',desc:'Protein sentezinin gerçekleştiği zarsız yapı.',edesc:'A membrane-free structure where proteins are synthesized.',structure:'rRNA ve proteinlerden oluşan büyük ve küçük alt birimi vardır.',estructure:'Has large and small subunits made of rRNA and proteins.',fn:'mRNA’daki şifreyi okuyarak protein sentezler.',efn:'Reads mRNA instructions to synthesize proteins.'},
 {id:'lysosome',name:'Lizozom',en:'Lysosome',emoji:'🟢',chip:'#75d98a',desc:'Hücre içi sindirim ve geri dönüşüm keseciği.',edesc:'A vesicle for intracellular digestion and recycling.',structure:'Sindirim enzimleri içeren tek zarlı keseciktir.',estructure:'A single-membrane vesicle containing digestive enzymes.',fn:'Maddeleri ve yaşlanmış organelleri parçalar.',efn:'Breaks down materials and worn-out organelles.'},
 {id:'centrosome',name:'Sentrozom',en:'Centrosome',emoji:'🟠',chip:'#ff8b75',desc:'Hayvan hücrelerinde hücre bölünmesinin düzenlenmesine katkı sağlar.',edesc:'Helps organize cell division in animal cells.',structure:'Genellikle birbirine dik duran iki sentriyolden oluşur.',estructure:'Usually consists of two centrioles at right angles.',fn:'İğ ipliklerinin organizasyonunda görev alır.',efn:'Organizes spindle fibers.'},
 {id:'cytoskeleton',name:'Hücre iskeleti',en:'Cytoskeleton',emoji:'🕸️',chip:'#c6ff00',desc:'Hücreye şekil veren, organelleri tutan ve taşıyan protein ağı.',edesc:'A protein network that shapes the cell and holds and moves organelles.',structure:'Mikrotübüller, aktin filamentleri ve ara filamentlerden oluşur; mikrotübüller sentrozomdan yayılır.',estructure:'Made of microtubules, actin filaments and intermediate filaments; microtubules radiate from the centrosome.',fn:'Hücre şeklini korur, organel taşınmasını ve hücre bölünmesini sağlar.',efn:'Maintains cell shape and enables organelle transport and cell division.'},
 {id:'membrane',name:'Hücre zarı',en:'Cell membrane',emoji:'🫧',chip:'#7fe0cf',desc:'Hücreyi çevreleyen seçici geçirgen sınır.',edesc:'The selectively permeable boundary surrounding the cell.',structure:'Fosfolipit çift tabaka ve içine gömülü proteinlerden oluşur.',estructure:'A phospholipid bilayer with embedded proteins.',fn:'Madde alışverişini ve hücreler arası iletişimi düzenler.',efn:'Regulates material exchange and cell communication.'}
];

let lang='tr', selected='nucleus', auto=true, scene,camera,renderer,root,host,raycaster,mouse,cellLabel;
let camZ=10.8, camX=0, camY=0, dragging=false, down=null, previous={x:0,y:0}, focusOn=false, highlightOn=false, langReady=false;
const pickables=[], meshesById={}, focusLocal={}, focusRadius={};
const $=id=>document.getElementById(id);
const tr=(a,b)=>lang==='tr'?a:b;
const rules=[
 ['membrane','membrane'],['nucleolus','nucleolus'],['nucleus','nucleus'],
 ['mito','mito'],['rough','rough'],['smooth','smooth'],['golgi','golgi'],
 ['free_ribosome','ribosome'],['rough_er_ribosome','rough'],['lysosome','lysosome'],
 ['centrosome','centrosome'],['cytoskeleton','cytoskeleton'],['cytoplasm','']
];
function idFor(name){
 const n=(name||'').toLowerCase();
 for(const [key,id] of rules) if(n.includes(key)) return id;
 if(n.includes('chromatin')||n.includes('nucleus_pore')) return 'nucleus';
 if(n.includes('mito_cristae')||n.includes('mito_matrix')||n.includes('mito_outer')) return 'mito';
 if(n.includes('rough_er_cisternae')) return 'rough';
 if(n.includes('smooth_er_tubules')) return 'smooth';
 if(n.includes('golgi_')) return 'golgi';
 if(n.includes('free_ribosome')) return 'ribosome';
 if(n.includes('lysosome_')) return 'lysosome';
 if(n.includes('centrosome_')) return 'centrosome';
 if(n.includes('membrane_shell')) return 'membrane';
 return '';
}
function colorFor(id,name){
 if(id==='nucleus') return 0x9518df;
 if(id==='nucleolus') return 0xffd36e;
 if(id==='mito') return name.includes('cristae')?0xffe0a8:0xf15a24;
 if(id==='rough') return name.includes('ribosome')?0x9bdcff:0x075dff;
 if(id==='smooth') return 0x12b9c8;
 if(id==='golgi') return 0xff3b98;
 if(id==='ribosome') return 0xb8e9ff;
 if(id==='lysosome') return name.includes('core')?0x2f9c57:0x75d98a;
 if(id==='centrosome') return 0xff8b75;
 if(id==='membrane') return 0x55d8c8;
 return null;
}
function renderOrgans(){
 const grid=$('orgGrid');if(!grid)return;grid.innerHTML='';
 organs.forEach(o=>{const b=document.createElement('button');b.type='button';b.className='org-btn'+(o.id===selected?' active':'');
 b.innerHTML=`<span class="org-icon" style="--chip:${o.chip}"><img src="assets/organelles/${o.id}.svg" alt="" loading="lazy"></span><span>${tr(o.name,o.en)}</span>`;
 b.addEventListener('click',()=>selectOrgan(o.id,true));grid.appendChild(b);});
 const count=document.querySelector('.count');if(count)count.innerHTML=organs.length+' <small>'+tr('YAPI','STRUCTURES')+'</small>';
}
function showDetail(o){
 if(!$('detailCard')||!o)return;
 $('detailEmoji').innerHTML=`<img src="assets/organelles/${o.id}.svg" alt="${tr(o.name,o.en)}" />`;
 $('orgName').textContent=tr(o.name,o.en);
 $('orgDesc').textContent=tr(o.desc,o.edesc);$('orgStructure').textContent=tr(o.structure,o.estructure);
 $('orgFunction').textContent=tr(o.fn,o.efn);
 $('detailVisual').style.background=`radial-gradient(circle at 45% 40%,#fff,${o.chip} 62%,#cbb4ef)`;
 $('detailVisual').querySelector('small').textContent=tr('SEÇİLİ ORGANEL','SELECTED ORGANELLE');
}
function selectOrgan(id,scroll=false){
 selected=id;const o=organs.find(x=>x.id===id);if(!o)return;renderOrgans();showDetail(o);
 if(scroll)$('detailCard')?.scrollIntoView({behavior:'smooth',block:'nearest'});
 focusOn=true;highlightOn=true;applyHighlight();
}
function setupLanguage(){
  if(langReady)return;
  langReady=true;

  $('langBtn')?.addEventListener('click',()=>{
    lang=lang==='tr'?'en':'tr';
    document.documentElement.lang=lang;
    $('langBtn').textContent=lang==='tr'?'EN':'TR';
    document.querySelectorAll('[data-tr]').forEach(el=>{
      el.textContent=el.dataset[lang];
    });
    renderOrgans();
    showDetail(organs.find(o=>o.id===selected));
  });

  const modulesByGrade={
    "9":["Yaşam","Organizasyon"],
    "10":["Enerji","Ekoloji"],
    "11":["Tepki","Homeostazi"],
    "12":[
      "Genden Proteine",
      "Canlılarda Enerji Dönüşümü",
      "Bitki Biyolojisi",
      "Canlılar ve Çevre"
    ]
  };

  document.querySelectorAll('.grade').forEach(b=>{
    b.addEventListener('click',()=>{
      document.querySelectorAll('.grade').forEach(x=>
        x.classList.remove('active')
      );

      b.classList.add('active');

      const grade=b.dataset.grade;
      const modules=modulesByGrade[grade];

      $('gradeMessage').textContent=
        `${grade}. sınıf laboratuvar modülü seçildi.`;

      $('moduleTitle').textContent=
        `${grade}. Sınıf Biyoloji Modülleri`;

   
      $('moduleList').innerHTML = modules.map((name,index) => `
        <div class="module-card" style="background:white;padding:18px;margin:10px 0;border-radius:12px;border:1px solid #e8defb;cursor:pointer;">
          <strong>${index+1}. ${name}</strong>
          <span style="float:right;color:#7138c5;">Laboratuvara Git →</span>
        </div>
      `).join('');
document.querySelectorAll('.module-card').forEach(card => {
  card.addEventListener('click', () => {
    const moduleName = card.querySelector('strong').textContent;
if (grade === "9" && moduleName.includes("Yaşam")) {
  window.location.href = "yasam.html";

} else if (grade === "9" && moduleName.includes("Organizasyon")) {
  $('laboratuvar').style.display = 'block';
  $('laboratuvar').scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });

} else if (grade === "10" && moduleName.includes("Enerji")) {
  window.location.href = "enerji.html";

} else {
  $('gradeMessage').textContent =
    `${moduleName} etkinliği hazırlanıyor.`;
}
   });
});
  });
});
}

function prepareModel(gltf){
 root=gltf.scene;scene.add(root);
 root.updateMatrixWorld(true);
 const box=new THREE.Box3().setFromObject(root),center=box.getCenter(new THREE.Vector3()),size=box.getSize(new THREE.Vector3());
 root.position.sub(center);
 const maxDim=Math.max(size.x,size.y,size.z);
 const scale=9.6/maxDim;root.scale.setScalar(scale);
 root.updateMatrixWorld(true);
 root.traverse(obj=>{
  if(!obj.isMesh)return;
  obj.material=obj.material.clone();
  const m=obj.material;m.side=THREE.DoubleSide;
  if(m.transparent)m.depthWrite=false;
  m.userData.base={opacity:m.opacity,transparent:m.transparent,depthWrite:m.depthWrite,emissive:m.emissive?m.emissive.clone():null,emissiveIntensity:m.emissiveIntensity};
  const id=idFor(obj.name);
  if(id){obj.userData.organelle=id;pickables.push(obj);(meshesById[id] ||= []).push(obj);}
 });
 for(const id of Object.keys(meshesById)){
  const b=new THREE.Box3();meshesById[id].forEach(m=>b.expandByObject(m));
  const c=b.getCenter(new THREE.Vector3()),sz=b.getSize(new THREE.Vector3());
  focusLocal[id]=root.worldToLocal(c.clone());focusRadius[id]=Math.max(sz.x,sz.y)/2;
 }
 camZ=10.8;camX=0;camY=0;camera.position.set(0,0,camZ);
 $('loading3d')?.remove();
}
function applyHighlight(){
 const o=organs.find(x=>x.id===selected);
 for(const id of Object.keys(meshesById)){
  meshesById[id].forEach(mesh=>{
   const m=mesh.material,b=m.userData.base;if(!b)return;
   if(!highlightOn){m.opacity=b.opacity;m.transparent=b.transparent;m.depthWrite=b.depthWrite;if(m.emissive&&b.emissive){m.emissive.copy(b.emissive);m.emissiveIntensity=b.emissiveIntensity;}m.needsUpdate=true;return;}
   if(id===selected){m.opacity=Math.max(b.opacity,.75);m.transparent=b.transparent;m.depthWrite=b.depthWrite;if(m.emissive){m.emissive.set(o?o.chip:'#ffffff');m.emissiveIntensity=.55;}}
   else{const keep=(id==='membrane');m.transparent=true;m.depthWrite=false;m.opacity=keep?b.opacity:Math.min(b.opacity,1)*.28;if(m.emissive&&b.emissive){m.emissive.copy(b.emissive);m.emissiveIntensity=b.emissiveIntensity;}}
   m.needsUpdate=true;
  });
 }
}
function init(){
 host=$('cell3d');if(!host||window.__seymaCellLabStarted)return;window.__seymaCellLabStarted=true;
 host.style.position='relative';host.style.overflow='hidden';
 try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});}catch(e){if($('loading3d'))$('loading3d').textContent='3B model başlatılamadı. Tarayıcı WebGL desteğini kontrol et.';return;}
 renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));renderer.setSize(host.clientWidth,host.clientHeight,false);
 renderer.setClearColor(0x000000,0);renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;
 renderer.domElement.style.cssText='display:block;width:100%;height:100%;touch-action:none;cursor:grab';host.appendChild(renderer.domElement);
 host.style.background='radial-gradient(circle at 50% 42%,#2a6f77 0%,#12363d 50%,#061519 100%)';
 scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(38,host.clientWidth/host.clientHeight,.1,100);camera.position.set(0,0,camZ);
 scene.add(new THREE.HemisphereLight(0xd9fff6,0x173039,1.15));
 const key=new THREE.DirectionalLight(0xffffff,1.5);key.position.set(5,8,10);scene.add(key);
 const fill=new THREE.DirectionalLight(0x9beaff,.8);fill.position.set(-6,-3,-8);scene.add(fill);
 const rim=new THREE.PointLight(0x5fffe5,.8,50);rim.position.set(-8,-4,6);scene.add(rim);
 raycaster=new THREE.Raycaster();mouse=new THREE.Vector2();
 const loader=new GLTFLoader();
 loader.load('./animal_cell_cutaway.glb?v=9',gltf=>prepareModel(gltf),undefined,err=>{console.error('GLB yüklenemedi',err);if($('loading3d'))$('loading3d').textContent='3B hücre modeli yüklenemedi. animal_cell_cutaway.glb dosyasını kontrol et.';});
 const canvas=renderer.domElement;
 function pick(e){const r=canvas.getBoundingClientRect();mouse.set((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height)*2+1);raycaster.setFromCamera(mouse,camera);
 const hits=raycaster.intersectObjects(pickables,true).filter(h=>h.object.userData.organelle);const hit=hits.find(h=>h.object.userData.organelle!=='membrane')||hits[0];return hit?.object.userData.organelle||'';}
 canvas.addEventListener('pointerdown',e=>{dragging=true;previous={x:e.clientX,y:e.clientY};down={x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);});
 canvas.addEventListener('pointermove',e=>{if(!dragging)return;root&&(root.rotation.y+=(e.clientX-previous.x)*.006,root.rotation.x+=(e.clientY-previous.y)*.006);previous={x:e.clientX,y:e.clientY};});
 canvas.addEventListener('pointerup',e=>{dragging=false;if(down&&Math.hypot(e.clientX-down.x,e.clientY-down.y)<7){const id=pick(e);if(id)selectOrgan(id,false);}down=null;});
 canvas.addEventListener('pointercancel',()=>{dragging=false;down=null;});
 canvas.addEventListener('wheel',e=>{camZ=Math.max(3.2,Math.min(25,camZ+e.deltaY*.01));},{passive:true});
 $('rotateBtn')?.addEventListener('click',()=>{auto=!auto;$('rotateBtn').classList.toggle('active',auto);const span=$('rotateBtn').querySelector('span');if(span)span.textContent=tr(auto?'Otomatik döndür':'Döndürme durdu',auto?'Auto rotate':'Auto rotate paused');});
 $('zoomIn')?.addEventListener('click',()=>camZ=Math.max(3.2,camZ-1.5));
 $('zoomOut')?.addEventListener('click',()=>camZ=Math.min(25,camZ+1.5));
 $('resetBtn')?.addEventListener('click',()=>{if(root)root.rotation.set(0,0,0);camZ=10.8;focusOn=false;highlightOn=false;applyHighlight();if(cellLabel)cellLabel.style.display='none';});
 const resize=()=>{if(!host.clientWidth||!host.clientHeight)return;camera.aspect=host.clientWidth/host.clientHeight;camera.updateProjectionMatrix();renderer.setSize(host.clientWidth,host.clientHeight,false);};
 new ResizeObserver(resize).observe(host);
 cellLabel=document.createElement('div');cellLabel.style.cssText='position:absolute;display:none;pointer-events:none;white-space:nowrap;padding:5px 12px;border-radius:999px;font:600 13px system-ui;color:white;background:#061519d9;border:1.5px solid #7fe0cf';host.appendChild(cellLabel);
 let lastSelected='';
 function animate(){requestAnimationFrame(animate);if(!renderer)return;
  if(auto&&!dragging&&root)root.rotation.y+=.0012;
  if(selected!==lastSelected){lastSelected=selected;if(root&&focusLocal[selected]){focusOn=true;camZ=Math.max(4.2,Math.min(11,focusRadius[selected]*2.6+3.2));}}
  let tx=0,ty=0,wp=null;
  if(focusOn&&root&&focusLocal[selected]){wp=root.localToWorld(focusLocal[selected].clone());tx=wp.x;ty=wp.y;}
  camX+=(tx-camX)*.08;camY+=(ty-camY)*.08;
  camera.position.x=camX;camera.position.y=camY;
  camera.position.z+=(camZ-camera.position.z)*.08;
  if(wp){const p=wp.clone().project(camera);const o=organs.find(x=>x.id===selected);cellLabel.textContent=o?tr(o.name,o.en):'';cellLabel.style.display='block';cellLabel.style.transform=`translate(${(p.x*.5+.5)*host.clientWidth}px,${(-p.y*.5+.5)*host.clientHeight}px) translate(-50%,-170%)`;cellLabel.style.borderColor=o?o.chip:'#7fe0cf';}
  renderer.render(scene,camera);
 }
 animate();
}
renderOrgans();showDetail(organs[0]);setupLanguage();init();
