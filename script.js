import * as THREE from 'https://esm.sh/three@0.152.2';

const organs=[
{id:'nucleus',name:'Çekirdek',en:'Nucleus',emoji:'🧬',chip:'#8d9bff',
desc:'Hücrenin yönetim merkezi; kalıtsal maddeyi (DNA) barındırır.',edesc:'The control center of the cell; it holds the genetic material (DNA).',
structure:'Gözenekli çift zarla çevrilidir; içinde DNA’dan oluşan kromatin iplikleri bulunur.',estructure:'Surrounded by a double membrane with pores; contains chromatin made of DNA.',
function:'Hücrenin hangi proteinleri üreteceğini belirler: DNA’dan mRNA sentezlenir ve çekirdek gözeneklerinden sitoplazmaya geçer. Hücre bölünürken kromatin kromozomlara dönüşür.',efunction:'Decides which proteins the cell makes: mRNA is copied from DNA and leaves through the nuclear pores. Chromatin condenses into chromosomes during cell division.'},
{id:'nucleolus',name:'Çekirdekçik',en:'Nucleolus',emoji:'🟡',chip:'#ffd36e',
desc:'Ribozom yapımının başladığı bölge.',edesc:'Where ribosome production begins.',
structure:'Çekirdeğin içinde zarsız, yoğun bir bölgedir.',estructure:'A dense, membrane-free region inside the nucleus.',
function:'rRNA sentezlenir ve proteinlerle birleşerek ribozomların alt birimlerini oluşturur. Hücre bölünürken kaybolur.',efunction:'Makes rRNA, which combines with proteins to form ribosome subunits. It disappears during cell division.'},
{id:'mito',name:'Mitokondri',en:'Mitochondrion',emoji:'🔶',chip:'#ff9a62',
desc:'Hücrenin enerji santrali.',edesc:'The power plant of the cell.',
structure:'Çift zarlıdır; iç zar kıvrılarak kristaları oluşturur. Kendi DNA’sı ve ribozomları vardır.',estructure:'Double membrane; the inner membrane folds into cristae. Has its own DNA and ribosomes.',
function:'Hücresel solunumla glikozdaki enerjiyi ATP’ye çevirir: glikoz + O₂ → CO₂ + H₂O + ATP. Krebs döngüsü matriksde, elektron taşıma sistemi kristalarda gerçekleşir.',efunction:'Cellular respiration turns the energy in glucose into ATP: glucose + O₂ → CO₂ + H₂O + ATP. The Krebs cycle runs in the matrix, the electron transport chain on the cristae.'},
{id:'rough',name:'Granüllü ER',en:'Rough ER',emoji:'🌀',chip:'#e27fb3',
desc:'Protein üretimi ve işlenmesiyle ilgili zar ağı.',edesc:'A membrane network for making and processing proteins.',
structure:'Yüzeyi ribozomlarla kaplı, birbirine bağlı kanal ve keselerdir; çekirdek zarıyla süreklidir.',estructure:'Connected channels and sacs covered with ribosomes; continuous with the nuclear envelope.',
function:'Ribozomlarda üretilen proteinleri içine alır, katlar ve keseciklerle Golgi’ye gönderir. Salgı yapan hücrelerde çok gelişmiştir.',efunction:'Takes in proteins made by its ribosomes, folds them and sends them to the Golgi in vesicles. Well developed in secretory cells.'},
{id:'smooth',name:'Düz ER',en:'Smooth ER',emoji:'〰️',chip:'#f0a8d6',
desc:'Lipit sentezi ve zehirsizleştirme yapan zar ağı.',edesc:'A membrane network for lipid synthesis and detoxification.',
structure:'Yüzeyinde ribozom bulunmayan, borucuk biçimli zar sistemidir.',estructure:'Tube-shaped membranes without ribosomes on the surface.',
function:'Lipit ve steroid hormon sentezler; karaciğerde ilaç ve zehirli maddeleri zararsız hale getirir; kas hücrelerinde kalsiyum depolar.',efunction:'Makes lipids and steroid hormones; detoxifies drugs and poisons in the liver; stores calcium in muscle cells.'},
{id:'golgi',name:'Golgi aygıtı',en:'Golgi apparatus',emoji:'📚',chip:'#f2c14e',
desc:'Hücrenin paketleme ve kargo merkezi.',edesc:'The packaging and shipping center of the cell.',
structure:'Üst üste dizilmiş yassı zar keseciklerinden (sisternalardan) oluşur.',estructure:'A stack of flattened membrane sacs (cisternae).',
function:'ER’den gelen proteinleri ve lipitleri olgunlaştırır, paketler ve salgı kesecikleriyle hedefine gönderir (ekzositoz). Lizozomların oluşumuna da katkıda bulunur.',efunction:'Finishes and packages proteins and lipids from the ER and ships them in secretory vesicles (exocytosis). Also helps form lysosomes.'},
{id:'ribosome',name:'Ribozom',en:'Ribosome',emoji:'🔵',chip:'#9fd8ff',
desc:'Proteinlerin üretildiği küçük “fabrikalar”.',edesc:'Tiny “factories” where proteins are made.',
structure:'Zarsızdır; rRNA ve proteinden oluşan büyük ve küçük alt birimi vardır. Serbest ya da ER üzerinde bulunur.',estructure:'No membrane; a large and a small subunit made of rRNA and protein. Free or attached to the ER.',
function:'mRNA’daki şifreyi okuyarak amino asitleri birleştirir ve protein sentezler (translasyon). Tüm canlı hücrelerde bulunur.',efunction:'Reads the code on mRNA and joins amino acids into proteins (translation). Found in all living cells.'},
{id:'lysosome',name:'Lizozom',en:'Lysosome',emoji:'🟣',chip:'#7fe58f',
desc:'Hücrenin sindirim ve geri dönüşüm kesecikleri.',edesc:'The digestion and recycling vesicles of the cell.',
structure:'İçi sindirim enzimleriyle dolu, tek zarlı küçük keseciklerdir; Golgi tarafından oluşturulur.',estructure:'Small single-membrane vesicles full of digestive enzymes, formed by the Golgi.',
function:'Besinleri, bakterileri ve virüsleri parçalar; yaşlı veya hasarlı organelleri geri dönüştürür (otofaji).',efunction:'Breaks down food, bacteria and viruses; recycles old or damaged organelles (autophagy).'},
{id:'centrosome',name:'Sentrozom',en:'Centrosome',emoji:'🟠',chip:'#ff6f91',
desc:'Hücre bölünmesini düzenleyen merkez.',edesc:'The center that organizes cell division.',
structure:'Birbirine dik duran iki sentriyol; mikrotübüllerden yapılmış silindirik yapılardır. Hayvan hücrelerinde bulunur.',estructure:'Two centrioles at right angles; cylinders built from microtubules. Found in animal cells.',
function:'Mitoz ve mayozda iğ ipliklerini oluşturur; bu iplikler kromozomları kutuplara çeker.',efunction:'Forms the spindle fibers in mitosis and meiosis; these fibers pull chromosomes toward the poles.'},
{id:'membrane',name:'Hücre zarı',en:'Cell membrane',emoji:'🫧',chip:'#7fe0cf',
desc:'Hücreyi çevreleyen seçici geçirgen sınır.',edesc:'The selectively permeable boundary around the cell.',
structure:'Fosfolipit çift tabaka ve içine gömülü proteinlerden oluşur.',estructure:'A phospholipid bilayer with embedded proteins.',
function:'Madde giriş çıkışını denetler (difüzyon, osmoz, aktif taşıma, endositoz, ekzositoz). Reseptör proteinleriyle hücreler arası iletişimi sağlar.',efunction:'Controls what enters and leaves (diffusion, osmosis, active transport, endocytosis, exocytosis). Receptor proteins allow communication between cells.'}
];

let lang='tr',selected='nucleus',auto=true,drag=false,down=null,prev={x:0,y:0};
let scene,camera,renderer,root;
const targets=[],byId={};
const $=id=>document.getElementById(id);
const t=(a,b)=>lang==='tr'?a:b;

function renderOrgans(){
  const grid=$('orgGrid');grid.innerHTML='';
  organs.forEach(o=>{
    const b=document.createElement('button');
    b.className='org-btn'+(o.id===selected?' active':'');
    b.innerHTML=`<span class="org-icon" style="--chip:${o.chip}">${o.emoji}</span><span>${t(o.name,o.en)}</span>`;
    b.addEventListener('click',()=>selectOrgan(o.id,true));
    grid.appendChild(b);
  });
}
function showDetail(o){
  $('detailEmoji').textContent=o.emoji;
  $('orgName').textContent=t(o.name,o.en);
  $('orgDesc').textContent=t(o.desc,o.edesc);
  $('orgStructure').textContent=t(o.structure,o.estructure);
  $('orgFunction').textContent=t(o.function,o.efunction);
  $('detailVisual').style.background=`radial-gradient(circle at 45% 40%,#fff,${o.chip} 62%,#cbb4ef)`;
  $('detailVisual').querySelector('small').textContent=t('SEÇİLİ ORGANEL','SELECTED ORGANELLE');
  const s=$('detailVisual').querySelector('span');s.style.animation='none';void $('detailVisual').offsetWidth;s.style.animation='pop .35s ease';
}
function selectOrgan(id,focus){
  selected=id;renderOrgans();showDetail(organs.find(o=>o.id===id));
  if(focus)$('detailCard').scrollIntoView({behavior:'smooth',block:'nearest'});
}
renderOrgans();showDetail(organs[0]);

$('langBtn').onclick=()=>{
  lang=lang==='tr'?'en':'tr';document.documentElement.lang=lang;
  $('langBtn').textContent=lang==='tr'?'EN':'TR';
  document.querySelectorAll('[data-tr]').forEach(el=>el.textContent=el.dataset[lang]);
  renderOrgans();showDetail(organs.find(o=>o.id===selected));
};
document.querySelectorAll('.grade').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('.grade').forEach(x=>x.classList.remove('active'));b.classList.add('active');
  $('gradeMessage').textContent=t(`${b.dataset.grade}. sınıf laboratuvar modülü seçildi.`,`Grade ${b.dataset.grade} laboratory module selected.`);
});

/* ---------- 3B mikroskop sahnesi ---------- */
const V=(x,y,z)=>new THREE.Vector3(x,y,z);
const mat=(c,o)=>new THREE.MeshPhongMaterial(Object.assign({color:c,shininess:60,specular:0x444444},o||{}));
function add(parent,mesh,id,hex){
  mesh.userData.id=id;mesh.userData.c=new THREE.Color(hex);
  (byId[id]=byId[id]||[]).push(mesh);targets.push(mesh);parent.add(mesh);return mesh;
}
function proxy(parent,id,r){
  const m=new THREE.Mesh(new THREE.SphereGeometry(r,8,8),new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}));
  m.userData.id=id;targets.push(m);parent.add(m);
}
function buildCell(){
  const NP=V(-.6,.3,0);
  const memb=new THREE.Mesh(new THREE.SphereGeometry(1,64,48),mat(0x7fe0cf,{transparent:true,opacity:.13,side:THREE.DoubleSide,depthWrite:false,shininess:120}));
  memb.scale.set(5.3,4.6,4.4);add(root,memb,'membrane','#7fe0cf');
  const rim=new THREE.Mesh(new THREE.SphereGeometry(1,48,32),new THREE.MeshBasicMaterial({color:0x66ffee,transparent:true,opacity:.07,side:THREE.BackSide,depthWrite:false}));
  rim.scale.set(5.4,4.7,4.5);root.add(rim);

  const nuc=new THREE.Mesh(new THREE.SphereGeometry(1.4,40,32),mat(0x5b6ee1,{transparent:true,opacity:.45,depthWrite:false}));
  nuc.position.copy(NP);add(root,nuc,'nucleus','#5b6ee1');
  const knot=new THREE.Mesh(new THREE.TorusKnotGeometry(.55,.09,90,8,2,3),mat(0xb7c0ff));
  knot.position.copy(NP);add(root,knot,'nucleus','#b7c0ff');
  const nl=new THREE.Mesh(new THREE.SphereGeometry(.42,24,20),mat(0xffd36e));
  nl.position.set(-.1,.4,.3);add(root,nl,'nucleolus','#ffd36e');

  const rg=new THREE.SphereGeometry(.07,8,6),rm=mat(0xd8f3ff,{shininess:30});
  const ribo=p=>{const m=new THREE.Mesh(rg,rm);m.position.copy(p);add(root,m,'ribosome','#d8f3ff');};

  const pts=[];
  for(let i=0;i<=70;i++){const a=i/70*Math.PI*3,r=2.1+.25*Math.sin(5*a);
    pts.push(V(NP.x+r*Math.cos(a),NP.y+.9*Math.sin(a*.7)+.3*Math.cos(3*a),r*Math.sin(a)*.9));}
  const rc=new THREE.CatmullRomCurve3(pts),rtube=new THREE.TubeGeometry(rc,200,.12,8,false),rmat=mat(0xe27fb3);
  [-.26,0,.26].forEach(dy=>{const m=new THREE.Mesh(rtube,rmat);m.position.y=dy;add(root,m,'rough','#e27fb3');});
  for(let i=0;i<60;i++){const p=rc.getPoint(i/60);ribo(V(p.x+(i%3-1)*.05,p.y+((i*7)%3-1)*.2,p.z+.13));}

  const smat=mat(0xf0a8d6);
  [[[2,2.2,.8],[3.2,1.6,-.6],[3.6,.5,.7],[2.9,-.4,-.7],[3.4,-1.3,.6]],
   [[3.2,1.6,-.6],[4.1,2,.2],[4.3,.6,-.8]],
   [[2.9,-.4,-.7],[1.9,-1,-1.5],[2.4,-2,-.6]]].forEach(c=>{
    const cur=new THREE.CatmullRomCurve3(c.map(p=>V(p[0],p[1],p[2])));
    add(root,new THREE.Mesh(new THREE.TubeGeometry(cur,60,.13,8,false),smat),'smooth','#f0a8d6');});

  const gg=new THREE.Group();gg.position.set(-3.2,-1.8,.6);gg.rotation.set(.3,.4,.5);root.add(gg);
  for(let i=0;i<5;i++){
    const m=new THREE.Mesh(new THREE.TorusGeometry(1-.06*Math.abs(i-2),.09,8,28,Math.PI*.9),mat(0xf2c14e));
    m.rotation.x=Math.PI/2;m.position.y=(i-2)*.3;add(gg,m,'golgi','#f2c14e');}
  [[1,.6,.2],[-.9,-.5,.3],[.2,.8,.9],[-.3,-.7,.8]].forEach(p=>{
    const v=new THREE.Mesh(new THREE.SphereGeometry(.15,12,10),mat(0xffe08a));v.position.set(p[0],p[1],p[2]);add(gg,v,'golgi','#ffe08a');});
  proxy(gg,'golgi',1.1);

  [[.8,-2.6,.8,.4,.3],[-3.6,.9,-1.2,1.1,-.4],[1.9,.8,-2.8,2.2,.2],[.4,3.1,-1.2,.7,-.3],[3.2,-2.4,1,1.8,.5]].forEach(a=>{
    const g=new THREE.Group();g.position.set(a[0],a[1],a[2]);g.rotation.set(0,a[3],a[4]);root.add(g);
    const o=new THREE.Mesh(new THREE.SphereGeometry(1,24,16),mat(0xe8643c,{transparent:true,opacity:.7,depthWrite:false}));
    o.scale.set(.95,.42,.42);add(g,o,'mito','#e8643c');
    for(let i=-2;i<=2;i++){const c=new THREE.Mesh(new THREE.CylinderGeometry(.26,.26,.04,16),mat(0xffb36b));
      c.rotation.z=Math.PI/2;c.position.x=i*.28;add(g,c,'mito','#ffb36b');}
    proxy(g,'mito',.6);});

  [[-1.4,2.6,1.4],[-2.2,-.6,2.5],[1.2,-1.4,2.8],[3.6,2.2,1],[-1,-3.4,1.6]].forEach(p=>{
    const g=new THREE.Group();g.position.set(p[0],p[1],p[2]);root.add(g);
    add(g,new THREE.Mesh(new THREE.SphereGeometry(.28,20,16),mat(0x6fcf7f)),'lysosome','#6fcf7f');
    add(g,new THREE.Mesh(new THREE.SphereGeometry(.1,10,8),mat(0x2f8a45)),'lysosome','#2f8a45');
    proxy(g,'lysosome',.45);});

  const cg=new THREE.Group();cg.position.set(-2.8,2.6,-.5);cg.rotation.set(.3,.5,.2);root.add(cg);
  add(cg,new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.9,16),mat(0xff6f91)),'centrosome','#ff6f91');
  const c2=new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.9,16),mat(0xff6f91));
  c2.rotation.z=Math.PI/2;c2.position.set(.55,-.45,0);add(cg,c2,'centrosome','#ff6f91');
  proxy(cg,'centrosome',.8);

  let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
  let n=0;while(n<50){const x=(rnd()*2-1)*4.5,y=(rnd()*2-1)*3.9,z=(rnd()*2-1)*3.74,p=V(x,y,z);
    if((x/4.5)**2+(y/3.9)**2+(z/3.74)**2>1||p.distanceTo(NP)<2.6)continue;ribo(p);n++;}
}

function init(){
  const host=$('cell3d');
  if(!host||host.dataset.ready)return;
  host.dataset.ready='1';
  try{
    renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
  }catch(e){
    $('loading3d').innerHTML='<b>3B model başlatılamadı.</b><small>Tarayıcın WebGL’i desteklemiyor olabilir.</small>';return;
  }
  host.style.position='relative';host.style.overflow='hidden';
  host.style.background='radial-gradient(circle at 50% 45%,#215860 0%,#0f2f36 55%,#071519 100%)';
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
  renderer.setSize(host.clientWidth,host.clientHeight,false);
  renderer.setClearColor(0x000000,0);
  const cv=renderer.domElement;cv.style.cssText='display:block;width:100%;height:100%;touch-action:none;cursor:grab';
  host.appendChild(cv);
  const vig=document.createElement('div');
  vig.style.cssText='position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle,transparent 50%,rgba(0,0,0,.55) 100%)';
  host.appendChild(vig);

  scene=new THREE.Scene();
  camera=new THREE.PerspectiveCamera(40,host.clientWidth/host.clientHeight,.1,100);
  camera.position.set(0,0,19);
  scene.add(new THREE.AmbientLight(0xffffff,.7));
  const dl=new THREE.DirectionalLight(0xffffff,.9);dl.position.set(5,8,10);scene.add(dl);
  const pl=new THREE.PointLight(0x66ffee,.7,50);pl.position.set(-8,-4,6);scene.add(pl);
  root=new THREE.Group();scene.add(root);
  buildCell();
  $('loading3d')?.remove();

  const ray=new THREE.Raycaster(),mouse=new THREE.Vector2();
  function pickAt(e){
    const r=cv.getBoundingClientRect();
    mouse.set(((e.clientX-r.left)/r.width)*2-1,-((e.clientY-r.top)/r.height)*2+1);
    ray.setFromCamera(mouse,camera);
    const h=ray.intersectObjects(targets,false);
    if(!h.length)return null;
    if(h.some(x=>x.object.userData.id==='nucleolus'))return 'nucleolus';
    return (h.find(x=>x.object.userData.id!=='membrane')||h[0]).object.userData.id;
  }
  cv.addEventListener('pointerdown',e=>{drag=true;prev={x:e.clientX,y:e.clientY};down={x:e.clientX,y:e.clientY};cv.setPointerCapture(e.pointerId);});
  cv.addEventListener('pointermove',e=>{if(drag){root.rotation.y+=(e.clientX-prev.x)*.006;root.rotation.x+=(e.clientY-prev.y)*.006;prev={x:e.clientX,y:e.clientY};}});
  cv.addEventListener('pointerup',e=>{
    drag=false;
    if(down&&Math.hypot(e.clientX-down.x,e.clientY-down.y)<7){const id=pickAt(e);if(id)selectOrgan(id,false);}
    down=null;
  });
  cv.addEventListener('pointercancel',()=>{drag=false;down=null;});
  host.addEventListener('wheel',e=>{camera.position.z=Math.max(9,Math.min(26,camera.position.z+e.deltaY*.01));},{passive:true});
  window.addEventListener('resize',()=>{camera.aspect=host.clientWidth/host.clientHeight;camera.updateProjectionMatrix();renderer.setSize(host.clientWidth,host.clientHeight,false);});

  $('rotateBtn').onclick=()=>{
    auto=!auto;$('rotateBtn').classList.toggle('active',auto);
    const s=$('rotateBtn').querySelector('span');if(s)s.textContent=auto?t('Otomatik döndür','Auto rotate'):t('Döndürme durdu','Auto rotate paused');
  };
  $('zoomIn').onclick=()=>{camera.position.z=Math.max(9,camera.position.z-2);};
  $('zoomOut').onclick=()=>{camera.position.z=Math.min(26,camera.position.z+2);};
  $('resetBtn').onclick=()=>{root.rotation.set(0,0,0);camera.position.set(0,0,19);};

  (function animate(){
    requestAnimationFrame(animate);
    if(auto&&!drag)root.rotation.y+=.0016;
    const tm=performance.now()/1000;
    for(const id in byId){
      const lv=id===selected?.3+.18*Math.sin(tm*4):0;
      for(const m of byId[id])m.material.emissive.copy(m.userData.c).multiplyScalar(lv);
    }
    renderer.render(scene,camera);
  })();
}
init();
