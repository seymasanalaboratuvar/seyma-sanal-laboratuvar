import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/loaders/GLTFLoader.js';

const organs=[
{id:'nucleus',name:'Çekirdek',en:'Nucleus',emoji:'🧬',chip:'#eee3ff',desc:'Hücrenin DNA’sını barındıran ve gen ifadesinin düzenlenmesinde rol oynayan organeldir.',edesc:'The organelle that houses the cell’s DNA and helps regulate gene expression.',structure:'Çift katlı çekirdek zarı, çekirdek porları, kromatin ve çekirdekçik.',estructure:'Double nuclear envelope, nuclear pores, chromatin and nucleolus.',function:'Kalıtsal bilgiyi korur; hücresel etkinliklerin düzenlenmesine katkı sağlar.',efunction:'Stores hereditary information and helps regulate cellular activities.'},
{id:'mito',name:'Mitokondri',en:'Mitochondrion',emoji:'🔶',chip:'#ffe7d7',desc:'Çift zarlı organeldir. İç zar kıvrımları olan kristalar, matriksin çevresinde uzanır.',edesc:'A double-membraned organelle. Its inner membrane folds, called cristae, extend into the matrix.',structure:'Dış zar, kristaları oluşturan kıvrımlı iç zar, zarlar arası boşluk ve matriks.',estructure:'Outer membrane, folded inner membrane forming cristae, intermembrane space and matrix.',function:'Hücresel solunum basamaklarında ATP üretiminde görev alır.',efunction:'Participates in ATP production during cellular respiration.'},
{id:'rough',name:'Granüllü ER',en:'Rough ER',emoji:'〰️',chip:'#dcecff',desc:'Yüzeyine ribozomların tutunduğu zar kanalcıkları ve keseciklerden oluşur.',edesc:'A network of membranous tubules and sacs with ribosomes attached to its surface.',structure:'Sitoplazmik yüzeyinde ribozom bulunan yassı sisternalar.',estructure:'Flattened cisternae with ribosomes on the cytosolic surface.',function:'Salgı ve zar proteinlerinin sentezi ve işlenmesinde rol oynar.',efunction:'Involved in synthesis and processing of secreted and membrane proteins.'},
{id:'smooth',name:'Granülsüz ER',en:'Smooth ER',emoji:'〰️',chip:'#d8f4f0',desc:'Yüzeyinde ribozom bulunmayan tübüler zar ağıdır.',edesc:'A tubular membrane network without surface-bound ribosomes.',structure:'Ribozom taşımayan, dallanmış membran tübülleri.',estructure:'Branched membrane tubules without ribosomes.',function:'Lipit sentezi, bazı hücrelerde detoksifikasyon ve kalsiyum depolanmasında görev alır.',efunction:'Functions in lipid synthesis, detoxification in some cells and calcium storage.'},
{id:'golgi',name:'Golgi aygıtı',en:'Golgi apparatus',emoji:'📚',chip:'#ffe6f0',desc:'Üst üste dizilmiş yassı sisternalardan oluşan zar sistemidir.',edesc:'A membrane system made of stacks of flattened cisternae.',structure:'Sisternalar, veziküller ve cis-trans yüzleri.',estructure:'Cisternae, vesicles and cis-trans faces.',function:'Protein ve lipitleri değiştirir, sınıflandırır ve hedeflerine gönderilmek üzere paketler.',efunction:'Modifies, sorts and packages proteins and lipids for delivery.'},
{id:'ribosome',name:'Ribozom',en:'Ribosome',emoji:'🔵',chip:'#e1edff',desc:'Zarsız, büyük ve küçük alt birimlerden oluşan moleküler makinedir.',edesc:'A non-membranous molecular machine made of large and small subunits.',structure:'Ribozomal RNA ve proteinlerden oluşan iki alt birim.',estructure:'Two subunits composed of ribosomal RNA and proteins.',function:'mRNA bilgisini kullanarak protein sentezler.',efunction:'Synthesizes proteins using information carried by mRNA.'},
{id:'lysosome',name:'Lizozom',en:'Lysosome',emoji:'🟣',chip:'#f1e4ff',desc:'Hücre içi sindirimde görev alan, enzim içeren zarlı keseciktir.',edesc:'A membrane-bound vesicle containing enzymes for intracellular digestion.',structure:'Tek zarla çevrili, hidrolitik enzimler içeren kesecik.',estructure:'A single-membrane vesicle containing hydrolytic enzymes.',function:'Büyük moleküllerin ve yaşlanmış hücresel yapıların parçalanmasına katkı sağlar.',efunction:'Helps break down macromolecules and worn-out cellular components.'},
{id:'centrosome',name:'Sentrozom',en:'Centrosome',emoji:'🟡',chip:'#fff2cf',desc:'Hayvan hücrelerinde mikrotübüllerin organizasyon merkezidir.',edesc:'The microtubule-organizing center in animal cells.',structure:'Genellikle birbirine dik konumlanmış iki sentriyol ve çevresindeki materyal.',estructure:'Typically two perpendicular centrioles surrounded by pericentriolar material.',function:'Hücre bölünmesinde iğ ipliklerinin organizasyonuna katkı sağlar.',efunction:'Contributes to organization of the mitotic spindle during cell division.'},
{id:'membrane',name:'Hücre zarı',en:'Cell membrane',emoji:'🫧',chip:'#d9f4ee',desc:'Hücreyi çevreleyen seçici geçirgen sınırdır.',edesc:'The selectively permeable boundary surrounding the cell.',structure:'Fosfolipit çift tabaka, zar proteinleri ve kolesterol.',estructure:'Phospholipid bilayer, membrane proteins and cholesterol.',function:'Madde alışverişini ve hücre ile çevresi arasındaki iletişimi düzenler.',efunction:'Regulates exchange of materials and communication between the cell and its environment.'}
];
let lang='tr',selected='nucleus',scene,camera,renderer,root,raycaster,mouse,auto=true,targets=[],selectedObject=null,drag=false,prev={x:0,y:0};
const $=id=>document.getElementById(id);
function t(a,b){return lang==='tr'?a:b}
function renderOrgans(){const grid=$('orgGrid');grid.innerHTML='';organs.forEach(o=>{const b=document.createElement('button');b.className='org-btn'+(o.id===selected?' active':'');b.innerHTML=`<span class="org-icon" style="--chip:${o.chip}">${o.emoji}</span><span>${t(o.name,o.en)}</span>`;b.addEventListener('click',()=>selectOrgan(o.id,true));grid.appendChild(b)})}
function showDetail(o){$('detailEmoji').textContent=o.emoji;$('orgName').textContent=t(o.name,o.en);$('orgDesc').textContent=t(o.desc,o.edesc);$('orgStructure').textContent=t(o.structure,o.estructure);$('orgFunction').textContent=t(o.function,o.efunction);$('detailVisual').style.background=`radial-gradient(circle at 45% 40%,#fff,${o.chip} 62%,#cbb4ef)`;$('detailVisual').querySelector('small').textContent=t('SEÇİLİ ORGANEL','SELECTED ORGANEL');$('detailVisual').querySelector('span').style.animation='none';void $('detailVisual').offsetWidth;$('detailVisual').querySelector('span').style.animation='pop .35s ease'}
function selectOrgan(id,focus){selected=id;const o=organs.find(x=>x.id===id);renderOrgans();showDetail(o);if(selectedObject){selectedObject.scale.copy(selectedObject.userData.baseScale)}const obj=targets.find(x=>x.userData.org===id);if(obj){selectedObject=obj;obj.userData.baseScale=obj.scale.clone();obj.scale.multiplyScalar(1.16);if(focus&&obj.userData.focus){const p=obj.userData.focus;camera.position.set(p.x,p.y+0.4,p.z+6.2)}}$('detailCard').scrollIntoView({behavior:'smooth',block:'nearest'})}
renderOrgans();showDetail(organs[0]);
$('langBtn').onclick=()=>{lang=lang==='tr'?'en':'tr';document.documentElement.lang=lang;$('langBtn').textContent=lang==='tr'?'EN':'TR';document.querySelectorAll('[data-tr]').forEach(el=>el.textContent=el.dataset[lang]);renderOrgans();showDetail(organs.find(o=>o.id===selected));};
document.querySelectorAll('.grade').forEach(b=>b.onclick=()=>{document.querySelectorAll('.grade').forEach(x=>x.classList.remove('active'));b.classList.add('active');$('gradeMessage').textContent=t(`${b.dataset.grade}. sınıf laboratuvar modülü seçildi.`,`Grade ${b.dataset.grade} laboratory module selected.`)});
function init(){
 const host=$('cell3d');
 if(!THREE || !GLTFLoader){
  $('loading3d').innerHTML='<b>3B model kütüphanesi yüklenemedi.</b><small>İnternet bağlantısını kontrol edip sayfayı yenileyin.</small>';return;
 }
 const T=THREE;scene=new T.Scene();scene.background=new T.Color(0xf0eaff);
 camera=new T.PerspectiveCamera(37,host.clientWidth/host.clientHeight,.1,100);camera.position.set(0,.15,10.2);
 renderer=new T.WebGLRenderer({antialias:true,alpha:false});renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));renderer.setSize(host.clientWidth,host.clientHeight);renderer.outputEncoding=T.sRGBEncoding;host.appendChild(renderer.domElement);
 scene.add(new T.HemisphereLight(0xffffff,0x6b5c94,1.65));
 const key=new T.DirectionalLight(0xffffff,2.15);key.position.set(4,6,8);scene.add(key);
 const rim=new T.DirectionalLight(0xb7dfff,1.15);rim.position.set(-5,1,-5);scene.add(rim);
 root=new T.Group();scene.add(root);raycaster=new T.Raycaster();mouse=new T.Vector2();
 const mapName=(n)=>{
  if(n.includes('nucleus'))return 'nucleus';
  if(n.includes('mito'))return 'mito';
  if(n.includes('rough_er'))return 'rough';
  if(n.includes('smooth_er'))return 'smooth';
  if(n.includes('golgi'))return 'golgi';
  if(n.includes('ribosome'))return 'ribosome';
  if(n.includes('lysosome'))return 'lysosome';
  if(n.includes('centrosome'))return 'centrosome';
  if(n.includes('membrane')||n.includes('cytoplasm')||n.includes('cytoskeleton'))return 'membrane';
  return null;
 };
 const loader=new GLTFLoader();
 loader.load('animal_cell_cutaway.glb',gltf=>{
  const model=gltf.scene;model.scale.setScalar(1);model.position.set(0,0,0);
  model.traverse(o=>{
   if(o.isMesh){
    const id=mapName(o.name||'');
    if(id){o.userData.org=id;o.userData.baseScale=o.scale.clone();o.userData.focus=o.getWorldPosition(new T.Vector3());targets.push(o);}
    if(o.material){o.material.side=T.DoubleSide;if(o.material.transparent)o.material.depthWrite=false;}
   }
  });
  root.add(model);$('loading3d').remove();
 },xhr=>{
  if(xhr.total){const pct=Math.round(xhr.loaded/xhr.total*100);const sm=$('loading3d')?.querySelector('small');if(sm)sm.textContent=`3B model yükleniyor… %${pct}`;}
 },err=>{
  console.error('GLB load error',err);
  $('loading3d').innerHTML='<b>3B hücre dosyası yüklenemedi.</b><small>animal_cell_cutaway.glb dosyasının ana klasörde olduğunu kontrol edin.</small>';
 });
 let down=null;
 renderer.domElement.addEventListener('pointerdown',e=>{drag=true;prev={x:e.clientX,y:e.clientY};down={x:e.clientX,y:e.clientY};renderer.domElement.setPointerCapture?.(e.pointerId)});
 renderer.domElement.addEventListener('pointermove',e=>{if(drag){root.rotation.y+=(e.clientX-prev.x)*.006;root.rotation.x+=(e.clientY-prev.y)*.006;prev={x:e.clientX,y:e.clientY}}});
 renderer.domElement.addEventListener('pointerup',e=>{
  drag=false;
  if(down&&Math.hypot(e.clientX-down.x,e.clientY-down.y)<7){
   const r=renderer.domElement.getBoundingClientRect();mouse.x=((e.clientX-r.left)/r.width)*2-1;mouse.y=-((e.clientY-r.top)/r.height)*2+1;
   raycaster.setFromCamera(mouse,camera);const hits=raycaster.intersectObjects(targets,false);
   if(hits.length){const id=hits[0].object.userData.org;if(id&&organs.some(x=>x.id===id))selectOrgan(id,false);}
  }
  down=null;
 });
 renderer.domElement.addEventListener('pointercancel',()=>{drag=false;down=null});
 host.addEventListener('wheel',e=>{camera.position.z=Math.max(6.4,Math.min(15,camera.position.z+e.deltaY*.008))},{passive:true});
 function animate(){requestAnimationFrame(animate);if(auto&&!drag)root.rotation.y+=.0016;renderer.render(scene,camera)}animate();
 window.addEventListener('resize',()=>{camera.aspect=host.clientWidth/host.clientHeight;camera.updateProjectionMatrix();renderer.setSize(host.clientWidth,host.clientHeight)});
}
$('rotateBtn').onclick=()=>{auto=!auto;$('rotateBtn').classList.toggle('active',auto);$('rotateBtn').querySelector('span').textContent=t(auto?'Otomatik döndür':'Döndürmeyi durdur',auto?'Auto rotate':'Pause rotation')};$('resetBtn').onclick=()=>{if(root)root.rotation.set(0,0,0);if(camera)camera.position.set(0,.15,10.2)};$('zoomIn').onclick=()=>{if(camera)camera.position.z=Math.max(6.4,camera.position.z-.7)};$('zoomOut').onclick=()=>{if(camera)camera.position.z=Math.min(15,camera.position.z+.7)};
window.addEventListener('load',()=>{if(window.THREE)init();else setTimeout(()=>{if(window.THREE)init();else $('loading3d').innerHTML='<b>3B kütüphane yüklenemedi.</b><small>Bağlantıyı kontrol edip sayfayı yenileyin.</small>'},1200)});
