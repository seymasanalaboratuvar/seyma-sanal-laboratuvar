import * as THREE from 'https://esm.sh/three@0.152.2';

const organs=[
{id:'nucleus',name:'Çekirdek',en:'Nucleus',emoji:'🧬',chip:'#b77cff',
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
{id:'rough',name:'Granüllü ER',en:'Rough ER',emoji:'🌀',chip:'#168cff',
desc:'Protein üretimi ve işlenmesiyle ilgili zar ağı.',edesc:'A membrane network for making and processing proteins.',
structure:'Yüzeyi ribozomlarla kaplı, birbirine bağlı kanal ve keselerdir; çekirdek zarıyla süreklidir.',estructure:'Connected channels and sacs covered with ribosomes; continuous with the nuclear envelope.',
function:'Ribozomlarda üretilen proteinleri içine alır, katlar ve keseciklerle Golgi’ye gönderir. Salgı yapan hücrelerde çok gelişmiştir.',efunction:'Takes in proteins made by its ribosomes, folds them and sends them to the Golgi in vesicles. Well developed in secretory cells.'},
{id:'smooth',name:'Düz ER',en:'Smooth ER',emoji:'〰️',chip:'#27c8ff',
desc:'Lipit sentezi ve zehirsizleştirme yapan zar ağı.',edesc:'A membrane network for lipid synthesis and detoxification.',
structure:'Yüzeyinde ribozom bulunmayan, borucuk biçimli zar sistemidir.',estructure:'Tube-shaped membranes without ribosomes on the surface.',
function:'Lipit ve steroid hormon sentezler; karaciğerde ilaç ve zehirli maddeleri zararsız hale getirir; kas hücrelerinde kalsiyum depolar.',efunction:'Makes lipids and steroid hormones; detoxifies drugs and poisons in the liver; stores calcium in muscle cells.'},
{id:'golgi',name:'Golgi aygıtı',en:'Golgi apparatus',emoji:'📚',chip:'#ff5ca8',
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

/* ---------- 3B mikroskop sahnesi (zengin sürüm) ---------- */
const V=(x,y,z)=>new THREE.Vector3(x,y,z),UP=V(0,1,0);
const mat=(c,o)=>new THREE.MeshPhongMaterial(Object.assign({color:c,shininess:70,specular:0x555555},o||{}));
const floaters=[];let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
let membMat,dust,lab,hit=null,lastSel=selected,focusOn=false,camZ=19;const focusLocal=V(0,0,0);
const ZOOM={membrane:19,rough:14,smooth:14,nucleus:13,golgi:12,nucleolus:9.5,mito:11,lysosome:10,ribosome:11,centrosome:10};
function add(parent,mesh,id,hex,focus){mesh.userData.id=id;mesh.userData.c=new THREE.Color(hex);if(focus)mesh.userData.focus=focus;(byId[id]=byId[id]||[]).push(mesh);targets.push(mesh);parent.add(mesh);return mesh;}
function proxy(parent,id,r){const m=new THREE.Mesh(new THREE.SphereGeometry(r,8,8),new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}));m.userData.id=id;targets.push(m);parent.add(m);}
function frame(c,u){const p=c.getPoint(u),tg=c.getTangent(u),s=new THREE.Vector3().crossVectors(tg,UP).normalize(),n=new THREE.Vector3().crossVectors(s,tg).normalize();return{p,s,n};}
function ribbon(curve,w,seg,color){
  const pos=[],idx=[];
  for(let i=0;i<=seg;i++){const u=i/seg,f=frame(curve,u),ww=w*(1+.22*Math.sin(u*17)),off=.12*Math.sin(u*13);
    for(const k of[-1,1]){const q=f.p.clone().addScaledVector(f.s,k*ww).addScaledVector(f.n,off+k*.05*Math.sin(u*9));pos.push(q.x,q.y,q.z);}
    if(i<seg){const a=i*2;idx.push(a,a+1,a+2,a+1,a+3,a+2);}}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setIndex(idx);g.computeVertexNormals();
  return new THREE.Mesh(g,mat(color,{side:THREE.DoubleSide}));
}
const inE=(p,s)=>(p.x/(5.3*s))**2+(p.y/(4.6*s))**2+(p.z/(4.4*s))**2<1;
const rp=s=>{let p;do{p=V((rnd()*2-1)*5.3*s,(rnd()*2-1)*4.6*s,(rnd()*2-1)*4.4*s);}while(!inE(p,s));return p;};
const sph=(r,c,o,w=20,h=14)=>new THREE.Mesh(new THREE.SphereGeometry(r,w,h),mat(c,o));

function buildCell(){
  const NP=V(-.6,.3,0);
  const cy=new THREE.Mesh(new THREE.SphereGeometry(1,48,36),new THREE.MeshBasicMaterial({color:0x1f7a78,transparent:true,opacity:.22,side:THREE.BackSide,depthWrite:false}));
  cy.scale.set(5.25,4.55,4.35);root.add(cy);
  membMat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,side:THREE.DoubleSide,
    uniforms:{glow:{value:0},col:{value:new THREE.Color(0x7fe0cf)}},
    vertexShader:'varying vec3 n;varying vec3 v;void main(){n=normalize(normalMatrix*normal);vec4 mv=modelViewMatrix*vec4(position,1.);v=-mv.xyz;gl_Position=projectionMatrix*mv;}',
    fragmentShader:'uniform vec3 col;uniform float glow;varying vec3 n;varying vec3 v;void main(){float f=pow(1.-abs(dot(normalize(n),normalize(v))),2.3);gl_FragColor=vec4(col+glow,.07+f*.6+glow*.25);}'});
  const memb=new THREE.Mesh(new THREE.SphereGeometry(1,64,48),membMat);memb.scale.set(5.3,4.6,4.4);add(root,memb,'membrane','#7fe0cf',V(0,0,0));

  /* sitoplazma tozları ve hücre iskeleti */
  const spr=(()=>{const c=document.createElement('canvas');c.width=c.height=32;const g=c.getContext('2d'),gr=g.createRadialGradient(16,16,0,16,16,16);gr.addColorStop(0,'rgba(255,255,255,1)');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.fillRect(0,0,32,32);return new THREE.CanvasTexture(c);})();
  const dp=[];for(let i=0;i<420;i++){const p=rp(.95);dp.push(p.x,p.y,p.z);}
  const dg=new THREE.BufferGeometry();dg.setAttribute('position',new THREE.Float32BufferAttribute(dp,3));
  dust=new THREE.Points(dg,new THREE.PointsMaterial({size:.16,map:spr,transparent:true,opacity:.5,depthWrite:false,color:0xbff7ee,blending:THREE.AdditiveBlending}));root.add(dust);
  const lp=[];for(let i=0;i<40;i++){const a=rp(.9),b=rp(.9),m=a.clone().lerp(b,.5).add(V(rnd()-.5,rnd()-.5,rnd()-.5).multiplyScalar(1.5));
    const pts=new THREE.CatmullRomCurve3([a,m,b]).getPoints(12);for(let k=0;k<12;k++)lp.push(pts[k].x,pts[k].y,pts[k].z,pts[k+1].x,pts[k+1].y,pts[k+1].z);}
  const lg=new THREE.BufferGeometry();lg.setAttribute('position',new THREE.Float32BufferAttribute(lp,3));
  root.add(new THREE.LineSegments(lg,new THREE.LineBasicMaterial({color:0x9be8dc,transparent:true,opacity:.16})));

  /* çekirdek: zar, gözenekler, kromatin, çekirdekçik */
  const ng=new THREE.SphereGeometry(1.4,64,48),np=ng.attributes.position,tv=V(0,0,0);
  for(let i=0;i<np.count;i++){tv.fromBufferAttribute(np,i);tv.multiplyScalar(1+.035*Math.sin(tv.x*5)*Math.cos(tv.y*4)*Math.sin(tv.z*5));np.setXYZ(i,tv.x,tv.y,tv.z);}
  ng.computeVertexNormals();
  const nuc=new THREE.Mesh(ng,mat(0x8735d2,{transparent:true,opacity:.4,depthWrite:false,shininess:100}));nuc.position.copy(NP);add(root,nuc,'nucleus','#8735d2');
  for(let i=0;i<40;i++){const y=1-i/19.5,r=Math.sqrt(Math.max(0,1-y*y)),a=i*2.39996,pm=sph(.08,0x4d167e,null,8,6);
    pm.position.set(NP.x+Math.cos(a)*r*1.42,NP.y+y*1.42,NP.z+Math.sin(a)*r*1.42);add(root,pm,'nucleus','#2a2f8a');}
  [[.55,.07,2,3,0xd9a2ff,0],[.42,.06,3,5,0xb34df0,1.1],[.3,.05,2,5,0xf0caff,2.2]].forEach(k=>{
    const m=new THREE.Mesh(new THREE.TorusKnotGeometry(k[0],k[1],120,8,k[2],k[3]),mat(k[4]));m.position.copy(NP);m.rotation.set(k[5],k[5]*.7,0);add(root,m,'nucleus','#d9a2ff');});
  const nl=sph(.4,0xffd36e,{shininess:90},24,18);nl.position.set(-.1,.4,.3);add(root,nl,'nucleolus','#ffd36e');
  [[.3,.1,.1],[-.25,-.1,.2],[.05,.3,-.25]].forEach(o=>{const b=sph(.17,0xffc247,null,12,10);b.position.set(-.1+o[0],.4+o[1],.3+o[2]);add(root,b,'nucleolus','#ffc247');});

  /* ribozom */
  const rg=new THREE.SphereGeometry(.075,8,6),rm=mat(0xd8f3ff,{shininess:30});
  const ribo=p=>{const m=new THREE.Mesh(rg,rm);m.position.copy(p);add(root,m,'ribosome','#d8f3ff');};

  /* granüllü ER: katlanmış yassı keseler + ribozomlar */
  const rpts=[];for(let i=0;i<=80;i++){const a=i/80*Math.PI*3.2,r=2.15+.28*Math.sin(5*a);rpts.push(V(NP.x+r*Math.cos(a),NP.y+.8*Math.sin(a*.7)+.25*Math.cos(3*a),r*Math.sin(a)*.9));}
  const rc=new THREE.CatmullRomCurve3(rpts),dys=[-.34,0,.34];
  dys.forEach(dy=>{const m=ribbon(rc,.3,160,0x168cff);m.position.y=dy;add(root,m,'rough','#168cff',NP);});
  for(let i=0;i<110;i++){const f=frame(rc,rnd());ribo(f.p.clone().addScaledVector(f.s,(rnd()*2-1)*.3).addScaledVector(f.n,.06).add(V(0,dys[i%3],0)));}

  /* düz ER: dallanmış borucuk ağı */
  const smm=mat(0x27c8ff),sf=V(3.2,.4,0);
  [[[2,2.2,.8],[3.2,1.6,-.6],[3.6,.5,.7],[2.9,-.4,-.7],[3.4,-1.3,.6]],[[3.2,1.6,-.6],[4.1,2,.2],[4.3,.6,-.8]],
   [[2.9,-.4,-.7],[1.9,-1,-1.5],[2.4,-2,-.6]],[[2,2.2,.8],[1.3,3,0],[2,3.4,-1]]].forEach(c=>{
    const cur=new THREE.CatmullRomCurve3(c.map(p=>V(p[0],p[1],p[2])));
    add(root,new THREE.Mesh(new THREE.TubeGeometry(cur,70,.11,8,false),smm),'smooth','#27c8ff',sf);
    c.forEach(p=>{const j=sph(.17,0x27c8ff,null,10,8);j.position.set(p[0],p[1],p[2]);add(root,j,'smooth','#27c8ff',sf);});});

  /* Golgi: üst üste yassı keseler + keseciklar */
  const gg=new THREE.Group();gg.position.set(-3.2,-1.8,.6);gg.rotation.set(.3,.4,.5);root.add(gg);
  for(let i=0;i<6;i++){const sc=1-.07*Math.abs(i-2.5),cp=[];for(let k=0;k<=8;k++){const x=(-1.1+k*.275)*sc;cp.push(V(x,0,.3*x*x));}
    const m=ribbon(new THREE.CatmullRomCurve3(cp),.5*sc,40,0xff5ca8);m.position.y=(i-2.5)*.3;add(gg,m,'golgi','#ff5ca8');}
  [[1.3,.7,.5],[-1.3,-.6,.5],[1.5,-.2,.9],[-1.5,.4,.9],[0,1.2,.5],[.2,-1.1,.6]].forEach(p=>{
    const v=sph(.14,0xffa4d0,{shininess:100},12,10);v.position.set(p[0],p[1],p[2]);add(gg,v,'golgi','#ffa4d0');floaters.push({o:v,b:v.position.clone(),ph:rnd()*6,a:.08});});
  proxy(gg,'golgi',1.2);

  /* mitokondri: dış zar, iç zar, kristalar */
  [[.8,-2.6,.8,.4,.3],[-3.6,.9,-1.2,1.1,-.4],[1.9,.8,-2.8,2.2,.2],[.4,3.1,-1.2,.7,-.3],[3.2,-2.4,1,1.8,.5],[-1.3,-3,-1.8,.3,.4],[2.6,2.8,-.9,1.4,-.2]].forEach(a=>{
    const g=new THREE.Group();g.position.set(a[0],a[1],a[2]);g.rotation.set(0,a[3],a[4]);root.add(g);
    const o=sph(1,0xe8643c,{transparent:true,opacity:.5,depthWrite:false},28,18);o.scale.set(1.05,.46,.46);add(g,o,'mito','#e8643c');
    const inn=sph(1,0xff8b5a,{transparent:true,opacity:.9},24,16);inn.scale.set(.93,.34,.34);add(g,inn,'mito','#ff8b5a');
    /* Kristalar: iç zarın belirgin, dalgalı kıvrımları */
    for(let i=-2;i<=2;i++){
      const pts=[];
      for(let j=0;j<=12;j++){
        const x=-.78+j*.13;
        const y=i*.085+Math.sin(j*.85+i*.7)*.075;
        const z=Math.cos(j*.75+i*.6)*.045;
        pts.push(V(x,y,z));
      }
      const cr=new THREE.CatmullRomCurve3(pts);
      const fold=new THREE.Mesh(new THREE.TubeGeometry(cr,48,.025,6,false),mat(0xffffb0,{shininess:95}));
      add(g,fold,'mito','#ffffb0');
    }
    proxy(g,'mito',.65);floaters.push({o:g,b:g.position.clone(),ph:rnd()*6,a:.12});});

  /* lizozom */
  [[-1.4,2.6,1.4],[-2.2,-.6,2.5],[1.2,-1.4,2.8],[3.6,2.2,1],[-1,-3.4,1.6]].forEach(p=>{
    const g=new THREE.Group();g.position.set(p[0],p[1],p[2]);root.add(g);
    add(g,sph(.3,0x6fcf7f,{transparent:true,opacity:.75,depthWrite:false,shininess:120}),'lysosome','#6fcf7f');
    [[.1,.05,.05],[-.1,.08,-.05],[.02,-.1,.1],[-.06,-.05,-.12]].forEach(o=>{const gr=sph(.07,0x2f8a45,null,8,6);gr.position.set(o[0],o[1],o[2]);add(g,gr,'lysosome','#2f8a45');});
    proxy(g,'lysosome',.45);floaters.push({o:g,b:g.position.clone(),ph:rnd()*6,a:.15});});

  /* sentrozom: iki sentriyol + ışınsal mikrotübüller */
  const cg=new THREE.Group();cg.position.set(-2.8,2.6,-.5);cg.rotation.set(.3,.5,.2);root.add(cg);
  [[0,0,0,0],[.55,-.45,0,Math.PI/2]].forEach(c=>{
    const m=new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.9,16),mat(0xff6f91));m.position.set(c[0],c[1],c[2]);m.rotation.z=c[3];add(cg,m,'centrosome','#ff6f91');
    [-.3,0,.3].forEach(y=>{const r=new THREE.Mesh(new THREE.TorusGeometry(.14,.018,6,16),mat(0xffb3c6));r.rotation.x=Math.PI/2;r.position.y=y;add(m,r,'centrosome','#ffb3c6');});});
  proxy(cg,'centrosome',.8);
  const ap=[];for(let i=0;i<18;i++){const d=V(rnd()-.5,rnd()-.5,rnd()-.5).normalize().multiplyScalar(1.3+rnd()*1.3);ap.push(cg.position.x,cg.position.y,cg.position.z,cg.position.x+d.x,cg.position.y+d.y,cg.position.z+d.z);}
  const ag=new THREE.BufferGeometry();ag.setAttribute('position',new THREE.Float32BufferAttribute(ap,3));
  root.add(new THREE.LineSegments(ag,new THREE.LineBasicMaterial({color:0xff9db5,transparent:true,opacity:.25})));

  /* serbest ribozomlar */
  let n=0;while(n<70){const p=rp(.9);if(p.distanceTo(NP)<2.6)continue;ribo(p);n++;}
}

function init(){
  const host=$('cell3d');
  if(!host||host.dataset.ready)return;
  host.dataset.ready='1';
  try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});}
  catch(e){$('loading3d').innerHTML='<b>3B model başlatılamadı.</b><small>Tarayıcın WebGL’i desteklemiyor olabilir.</small>';return;}
  host.style.position='relative';host.style.overflow='hidden';
  host.style.background='radial-gradient(circle at 50% 42%,#2a6f77 0%,#12363d 50%,#061519 100%)';
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
  renderer.setSize(host.clientWidth,host.clientHeight,false);
  renderer.setClearColor(0x000000,0);
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
  const cv=renderer.domElement;cv.style.cssText='display:block;width:100%;height:100%;touch-action:none;cursor:grab';
  host.appendChild(cv);
  const vig=document.createElement('div');
  vig.style.cssText='position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle,transparent 55%,rgba(0,0,0,.5) 100%)';
  host.appendChild(vig);
  lab=document.createElement('div');
  lab.style.cssText='position:absolute;left:0;top:0;display:none;pointer-events:none;white-space:nowrap;padding:5px 12px;border-radius:999px;font:600 13px system-ui,sans-serif;color:#fff;background:rgba(6,21,25,.82);border:1.5px solid #7fe0cf';
  host.appendChild(lab);

  scene=new THREE.Scene();
  camera=new THREE.PerspectiveCamera(40,host.clientWidth/host.clientHeight,.1,100);
  camera.position.set(0,0,19);
  scene.add(new THREE.HemisphereLight(0xcffff4,0x0a2a30,.75));
  const dl=new THREE.DirectionalLight(0xffffff,1);dl.position.set(5,8,10);scene.add(dl);
  const rl=new THREE.DirectionalLight(0x7fe0ff,.6);rl.position.set(-6,-3,-8);scene.add(rl);
  const pl=new THREE.PointLight(0x66ffee,.8,50);pl.position.set(-8,-4,6);scene.add(pl);
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
    const nlh=h.find(x=>x.object.userData.id==='nucleolus');
    return nlh?nlh.object:(h.find(x=>x.object.userData.id!=='membrane')||h[0]).object;
  }
  cv.addEventListener('pointerdown',e=>{drag=true;prev={x:e.clientX,y:e.clientY};down={x:e.clientX,y:e.clientY};cv.setPointerCapture(e.pointerId);});
  cv.addEventListener('pointermove',e=>{if(drag){root.rotation.y+=(e.clientX-prev.x)*.006;root.rotation.x+=(e.clientY-prev.y)*.006;prev={x:e.clientX,y:e.clientY};}});
  cv.addEventListener('pointerup',e=>{
    drag=false;
    if(down&&Math.hypot(e.clientX-down.x,e.clientY-down.y)<7){const o=pickAt(e);if(o){hit=o;lastSel=null;selectOrgan(o.userData.id,false);}}
    down=null;
  });
  cv.addEventListener('pointercancel',()=>{drag=false;down=null;});
  $('orgGrid').addEventListener('click',()=>{hit=null;lastSel=null;});
  host.addEventListener('wheel',e=>{camZ=Math.max(8,Math.min(26,camZ+e.deltaY*.01));},{passive:true});
  window.addEventListener('resize',()=>{camera.aspect=host.clientWidth/host.clientHeight;camera.updateProjectionMatrix();renderer.setSize(host.clientWidth,host.clientHeight,false);});

  $('rotateBtn').onclick=()=>{
    auto=!auto;$('rotateBtn').classList.toggle('active',auto);
    const s=$('rotateBtn').querySelector('span');if(s)s.textContent=auto?t('Otomatik döndür','Auto rotate'):t('Döndürme durdu','Auto rotate paused');
  };
  $('zoomIn').onclick=()=>{camZ=Math.max(8,camZ-2);};
  $('zoomOut').onclick=()=>{camZ=Math.min(26,camZ+2);};
  $('resetBtn').onclick=()=>{root.rotation.set(0,0,0);camZ=19;focusOn=false;lab.style.display='none';};

  function computeFocus(){
    const o=(hit&&hit.userData.id===selected)?hit:(byId[selected]||[])[0];
    if(!o){focusOn=false;return;}
    if(o.userData.focus)focusLocal.copy(o.userData.focus);
    else{const src=(o.parent&&o.parent!==root)?o.parent:o,w=src.getWorldPosition(new THREE.Vector3());root.worldToLocal(w);focusLocal.copy(w);}
    camZ=ZOOM[selected]||12;focusOn=true;
    const org=organs.find(x=>x.id===selected);lab.style.borderColor=org?org.chip:'#7fe0cf';
  }
  (function animate(){
    requestAnimationFrame(animate);
    const tm=performance.now()/1000;
    if(selected!==lastSel){lastSel=selected;computeFocus();hit=null;}
    if(auto&&!drag)root.rotation.y+=.0016;
    dust.rotation.y+=.0004;
    for(const f of floaters)f.o.position.set(f.b.x+Math.cos(tm*.5+f.ph)*f.a,f.b.y+Math.sin(tm*.6+f.ph)*f.a,f.b.z);
    const target=focusOn?focusLocal.clone().applyQuaternion(root.quaternion).multiplyScalar(-1):V(0,0,0);
    root.position.lerp(target,.07);
    camera.position.z+=(camZ-camera.position.z)*.07;
    for(const id in byId){
      const lv=id===selected?.28+.16*Math.sin(tm*4):0;
      for(const m of byId[id]){if(m.material.uniforms)m.material.uniforms.glow.value=lv;else m.material.emissive.copy(m.userData.c).multiplyScalar(lv);}
    }
    root.updateMatrixWorld(true);
    if(focusOn){
      const w=focusLocal.clone();root.localToWorld(w);w.project(camera);
      const org=organs.find(x=>x.id===selected);
      lab.textContent=org?t(org.name,org.en):'';
      lab.style.display='block';
      lab.style.transform=`translate(${(w.x*.5+.5)*host.clientWidth}px,${(-w.y*.5+.5)*host.clientHeight}px) translate(-50%,-170%)`;
    }
    renderer.render(scene,camera);
  })();
}
init();
