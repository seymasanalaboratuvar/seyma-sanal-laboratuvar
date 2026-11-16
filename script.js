// Şeyma Hocanın Sanal Laboratuvarı - Kesit alınmış hayvan hücresi
// Eğitim amaçlı şematik modeldir; gerçek ölçek ve organel sayıları temsil edilmez.
const organelles=[
{name:"Çekirdek",en:"Nucleus",emoji:"🟣",desc:"Çift katlı çekirdek zarı, çekirdek porları, kromatin ve çekirdekçik içerir. DNA'yı taşır ve hücresel etkinliklerin düzenlenmesinde rol oynar.",edesc:"Contains a double nuclear envelope, nuclear pores, chromatin and a nucleolus. It houses DNA and helps regulate cell activities."},
{name:"Mitokondri",en:"Mitochondrion",emoji:"🫘",desc:"Çift zarlıdır. İç zar kıvrımları olan kristalar, matriksin çevresinde uzanır. Hücresel solunumda ATP üretiminde görevlidir.",edesc:"Has two membranes. Inner-membrane folds called cristae extend into the matrix. It is involved in ATP production during cellular respiration."},
{name:"Ribozom",en:"Ribosome",emoji:"🔵",desc:"Büyük ve küçük alt birimlerden oluşan zarsız yapıdır. Protein sentezini gerçekleştirir; sitoplazmada serbest veya granüllü ER üzerinde bulunabilir.",edesc:"A non-membranous structure made of large and small subunits. It synthesizes proteins and may be free in the cytoplasm or attached to rough ER."},
{name:"Golgi aygıtı",en:"Golgi apparatus",emoji:"📦",desc:"Üst üste dizilmiş yassı sisternalardan oluşur. Protein ve lipitleri işler, sınıflandırır ve veziküllerle paketler.",edesc:"Made of stacked flattened cisternae. It modifies, sorts and packages proteins and lipids into vesicles."},
{name:"Hücre zarı",en:"Cell membrane",emoji:"🫧",desc:"Fosfolipit çift tabakadan oluşan seçici geçirgen sınırdır. Zar proteinleri madde taşınması ve hücresel iletişimde görev alır.",edesc:"A selectively permeable boundary made of a phospholipid bilayer. Membrane proteins support transport and cell signaling."},
{name:"Endoplazmik retikulum",en:"Endoplasmic reticulum",emoji:"〰️",desc:"Granüllü ER yüzeyinde ribozom taşır ve proteinlerin işlenmesine katkı sağlar. Granülsüz ER lipit sentezi ve başka işlevlerde rol alır.",edesc:"Rough ER bears ribosomes and helps process proteins. Smooth ER contributes to lipid synthesis and other functions."},
{name:"Lizozom",en:"Lysosome",emoji:"🟠",desc:"Hücre içi sindirimde görev alan, sindirim enzimleri içeren zarlı keseciktir.",edesc:"A membrane-bound vesicle containing digestive enzymes for intracellular digestion."},
{name:"Sentrozom",en:"Centrosome",emoji:"🧭",desc:"Hayvan hücrelerinde mikrotübüllerin organizasyon merkezidir. Hücre bölünmesinde iğ ipliklerinin düzenlenmesine katkı sağlar.",edesc:"The microtubule-organizing center in animal cells; it contributes to organizing the spindle during cell division."}
];
let lang="tr",selected=organelles[0],scene,camera,renderer,cellRoot,raycaster,pointer,autoRotate=true,hitTargets=[];
const grid=document.getElementById("orgGrid");
function renderInfo(){
 grid.innerHTML="";
 organelles.forEach(item=>{
  const b=document.createElement("button");
  b.className="org-btn"+(item===selected?" active":"");
  b.textContent=item.emoji+" "+(lang==="tr"?item.name:item.en);
  b.addEventListener("click",()=>selectOrg(item));
  grid.appendChild(b);
 });
 document.getElementById("orgEmoji").textContent=selected.emoji;
 document.getElementById("orgName").textContent=lang==="tr"?selected.name:selected.en;
 document.getElementById("orgDesc").textContent=lang==="tr"?selected.desc:selected.edesc;
}
function selectOrg(item){
 selected=item;renderInfo();
 if(cellRoot) cellRoot.traverse(o=>{
  if(o.userData.org===item.name && o.userData.highlight){
   const old=o.scale.clone();o.scale.multiplyScalar(1.1);
   setTimeout(()=>o.scale.copy(old),380);
  }
 });
}
renderInfo();

document.getElementById("langBtn").addEventListener("click",()=>{
 lang=lang==="tr"?"en":"tr";document.documentElement.lang=lang;
 document.getElementById("langBtn").textContent=lang==="tr"?"EN":"TR";
 document.querySelectorAll("[data-tr]").forEach(el=>{el.textContent=el.dataset[lang];});
 renderInfo();
 document.querySelectorAll("#answers button").forEach((b,i)=>b.textContent=lang==="tr"?["Çekirdek","Mitokondri","Golgi aygıtı"][i]:["Nucleus","Mitochondrion","Golgi apparatus"][i]);
 document.querySelector(".quiz-card .eyebrow").textContent=lang==="tr"?"KENDİNİ DENE":"TEST YOURSELF";
});
document.querySelectorAll(".grade-card").forEach(btn=>btn.addEventListener("click",()=>{
 document.querySelectorAll(".grade-card").forEach(x=>x.classList.remove("active"));btn.classList.add("active");
 const g=btn.dataset.grade;document.getElementById("gradeMessage").textContent=lang==="tr"?`${g}. sınıf içerikleri seçildi. İlk laboratuvar modülünü keşfet!`:`Grade ${g} selected. Explore the first lab module!`;
}));
document.querySelectorAll("#answers button").forEach(btn=>btn.addEventListener("click",()=>{
 const ok=btn.dataset.answer==="Mitokondri";
 document.getElementById("quizResult").textContent=lang==="tr"?(ok?"🎉 Doğru cevap! Mitokondri, hücresel solunumda ATP üretiminin temel merkezidir.":"Tekrar dene! İpucu: Hücresel solunumun gerçekleştiği organeli düşün."):(ok?"🎉 Correct! Mitochondria are a key site of ATP production.":"Try again! Think about the organelle where cellular respiration occurs.");
 document.getElementById("quizResult").style.color=ok?"#16856b":"#a15b38";
}));
document.getElementById("mitoTask").addEventListener("click",()=>{
 selectOrg(organelles[1]);
 document.getElementById("taskResult").textContent=lang==="tr"?"Mitokondriyi buldun! Kristalar iç zarın yüzey alanını artırır.":"You found it! Cristae increase the surface area of the inner membrane.";
});

function initCell(){
 const host=document.getElementById("cell3d");
 if(!window.THREE){document.getElementById("loading3d").textContent="3B model yüklenemedi. İnternet bağlantısını kontrol edip sayfayı yenile.";return;}
 const T=THREE;
 scene=new T.Scene();scene.background=new T.Color(0xece8ff);
 camera=new T.PerspectiveCamera(38,host.clientWidth/host.clientHeight,.1,100);camera.position.set(0,0,10.5);
 renderer=new T.WebGLRenderer({antialias:true,alpha:false});
 renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));renderer.setSize(host.clientWidth,host.clientHeight);
 renderer.outputEncoding=T.sRGBEncoding;host.appendChild(renderer.domElement);
 scene.add(new T.HemisphereLight(0xffffff,0x756a9b,1.6));
 const key=new T.DirectionalLight(0xffffff,2.2);key.position.set(4,6,9);scene.add(key);
 const fill=new T.DirectionalLight(0xb4e8ff,.8);fill.position.set(-5,-3,5);scene.add(fill);
 cellRoot=new T.Group();scene.add(cellRoot);
 const material=(color,rough=.5,transparent=false,opacity=1)=>new T.MeshStandardMaterial({color,roughness:rough,transparent,opacity,side:T.DoubleSide,depthWrite:!transparent});
 function add(mesh,name,highlight=true){mesh.userData.org=name;mesh.userData.highlight=highlight;cellRoot.add(mesh);hitTargets.push(mesh);return mesh;}
 function sphere(name,color,pos,scale,segments=32,highlight=true){
  const m=new T.Mesh(new T.SphereGeometry(1,segments,24),material(color));
  m.position.set(...pos);m.scale.set(...scale);return add(m,name,highlight);
 }
 function tube(name,points,r,color,highlight=true){
  const curve=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p)));
  return add(new T.Mesh(new T.TubeGeometry(curve,64,r,9,false),material(color)),name,highlight);
 }
 // Cell body: an elliptical translucent cytoplasm plus a broad membrane shell with a deliberate cutaway opening.
 const cyt=new T.Mesh(new T.SphereGeometry(2.8,64,48),material(0xc7e9ed,.75,true,.26));
 cyt.scale.set(1.3,.9,.78);cellRoot.add(cyt);
 const shellGeo=new T.SphereGeometry(2.86,72,52,0,Math.PI*1.72,0,Math.PI);
 const shell=new T.Mesh(shellGeo,new T.MeshPhysicalMaterial({color:0x62c6b2,roughness:.3,transparent:true,opacity:.38,side:T.DoubleSide,clearcoat:.8,depthWrite:false}));
 shell.scale.set(1.3,.9,.78);shell.rotation.y=-.25;add(shell,"Hücre zarı",false);
 // Small membrane protein channels and phospholipid heads along the exposed rim.
 for(let i=0;i<18;i++){
  const a=-1.25+(i/17)*2.5;
  const x=3.70*Math.cos(a),y=2.55*Math.sin(a),z=.1;
  sphere("Hücre zarı",0x2c9e91,[x,y,z],[.075,.075,.075],12,false);
 }
 // Nucleus: two envelopes, visible pores, chromatin strands and nucleolus.
 sphere("Çekirdek",0x9271c7,[-.35,.12,.15],[.82,.76,.68],48);
 const envelope=new T.Mesh(new T.SphereGeometry(1,48,32),new T.MeshStandardMaterial({color:0x674a9d,wireframe:true,transparent:true,opacity:.42}));
 envelope.position.set(-.35,.12,.15);envelope.scale.set(.86,.80,.72);add(envelope,"Çekirdek",false);
 // Nuclear pores arranged on visible front hemisphere.
 for(let i=0;i<14;i++){
  const a=(i/14)*Math.PI*2, x=-.35+.83*Math.cos(a), y=.12+.72*Math.sin(a);
  sphere("Çekirdek",0x493675,[x,y,.68],[.045,.045,.035],10,false);
 }
 sphere("Çekirdek",0x5d3e91,[-.12,.28,.78],[.22,.20,.13],28,false);
 // Chromatin: thin winding strands inside the nucleus.
 for(let j=0;j<5;j++){
  const pts=[];
  for(let k=0;k<18;k++){
   const t=k/17, a=t*Math.PI*2*(1+j*.16);
   pts.push([-.35+Math.cos(a)*(.22+j*.07),.12+Math.sin(a)*(.20+j*.055),.52+Math.sin(a*1.7+j)*.09]);
  }
  tube("Çekirdek",pts,.014,0x553d86,false);
 }
 // Mitochondria with outer membrane, inner matrix and folded cristae.
 function makeMito(pos,rot,scale=1){
  const g=new T.Group();g.position.set(...pos);g.rotation.z=rot;g.scale.setScalar(scale);
  const outer=new T.Mesh(new T.SphereGeometry(1,40,28),material(0xd98258));outer.scale.set(.78,.39,.30);g.add(outer);
  const inner=new T.Mesh(new T.SphereGeometry(1,40,28),material(0xf3b17e));inner.scale.set(.67,.29,.23);g.add(inner);
  for(let i=0;i<6;i++){
   const x=-.48+i*.19;
   const crista=new T.Mesh(new T.TorusGeometry(.12,.022,8,24,Math.PI*1.45),material(0xa94e42));
   crista.position.set(x,Math.sin(i*1.4)*.045,.19);crista.rotation.y=.35;g.add(crista);
  }
  add(g,"Mitokondri");
 }
 makeMito([1.38,.78,.48],-.42,1.0);makeMito([-1.45,-.82,.25],.55,.86);
 // Endoplasmic reticulum around nucleus; rough ER has ribosome granules, smooth ER is a separate tubular network.
 const roughPaths=[
 [[-1.15,.85,.05],[-.92,1.08,.05],[-.55,1.02,.05],[-.2,.91,.05],[.15,1.0,.05]],
 [[-1.28,.55,-.08],[-.95,.68,-.08],[-.58,.57,-.08],[-.25,.67,-.08],[.12,.72,-.08]],
 [[-1.05,.25,-.18],[-.78,.38,-.18],[-.48,.29,-.18],[-.18,.4,-.18]]
 ];
 roughPaths.forEach(p=>tube("Endoplazmik retikulum",p,.065,0x4f91c5));
 const smoothPaths=[
 [[-.95,-.55,-.32],[-.65,-.75,-.32],[-.28,-.68,-.32],[.05,-.82,-.32],[.36,-.72,-.32]],
 [[-.75,-.95,-.38],[-.38,-1.1,-.38],[.0,-.98,-.38],[.3,-1.1,-.38],[.62,-.95,-.38]]
 ];
 smoothPaths.forEach(p=>tube("Endoplazmik retikulum",p,.052,0x75b7d5));
 // Ribosomes on rough ER and free in cytoplasm.
 roughPaths.forEach(path=>{
  for(let i=0;i<22;i++){
   const p=path[Math.floor(Math.random()*path.length)];
   sphere("Ribozom",0x315f9e,[p[0]+(Math.random()-.5)*.22,p[1]+(Math.random()-.5)*.16,p[2]+.09],[.035,.035,.035],10);
  }
 });
 for(let i=0;i<26;i++){
  const a=Math.random()*Math.PI*2,r=.7+Math.random()*1.65;
  sphere("Ribozom",0x3978b7,[Math.cos(a)*r,Math.sin(a)*r*.65,(Math.random()-.5)*.65],[.038,.038,.038],10);
 }
 // Golgi stack: curved flattened cisternae made from bent flattened tubes with vesicles budding nearby.
 const golgi=new T.Group();golgi.position.set(.95,-.88,.3);
 for(let i=0;i<6;i++){
  const pts=[];
  for(let k=0;k<=16;k++){
   const t=-1+k/8;
   pts.push([t*.48,(i-2.5)*.13+.10*t*t,Math.sin(t*Math.PI/2)*.06]);
  }
  const curve=new T.CatmullRomCurve3(pts.map(p=>new T.Vector3(...p)));
  const geo=new T.TubeGeometry(curve,40,.045,8,false);
  const cis=new T.Mesh(geo,material(i%2?0xe9ae4e:0xf4c96a));golgi.add(cis);
 }
 add(golgi,"Golgi aygıtı");
 sphere("Golgi aygıtı",0xf5d27e,[1.62,-.58,.42],[.10,.10,.10],16);
 sphere("Golgi aygıtı",0xf5d27e,[1.55,-1.23,.42],[.085,.085,.085],16);
 // Lysosomes and transport vesicles.
 [[-1.05,-1.18,.48],[1.72,.05,.22],[.35,1.28,-.22]].forEach(p=>sphere("Lizozom",0xe59a5b,p,[.16,.16,.16],24));
 // Centrosome with two perpendicular centrioles.
 const centro=new T.Group();centro.position.set(-1.45,-.12,.78);
 for(let i=0;i<2;i++){
  const c=new T.Mesh(new T.CylinderGeometry(.075,.075,.5,16),material(0x9a76bd));
  c.rotation.z=i===0?Math.PI/2:0;c.position.x=(i-.5)*.18;centro.add(c);
 }
 add(centro,"Sentrozom");
 // Cut face edge accents: a thin curved line along the open cutaway to emphasize the section.
 tube("Hücre zarı",[[-2.9,-.7,.25],[-2.65,0,.35],[-2.2,.85,.35],[-1.35,1.55,.25],[0,1.95,.15],[1.5,1.55,.15],[2.55,.65,.15]],.025,0x399f91,false);

 raycaster=new T.Raycaster();pointer=new T.Vector2();
 let dragging=false,lastX=0,lastY=0;
 renderer.domElement.addEventListener("pointerdown",e=>{dragging=true;lastX=e.clientX;lastY=e.clientY;});
 window.addEventListener("pointerup",()=>dragging=false);
 renderer.domElement.addEventListener("pointermove",e=>{
  if(dragging){cellRoot.rotation.y+=(e.clientX-lastX)*.008;cellRoot.rotation.x+=(e.clientY-lastY)*.008;lastX=e.clientX;lastY=e.clientY;}
 });
 renderer.domElement.addEventListener("click",e=>{
  const r=renderer.domElement.getBoundingClientRect();pointer.x=((e.clientX-r.left)/r.width)*2-1;pointer.y=-((e.clientY-r.top)/r.height)*2+1;
  raycaster.setFromCamera(pointer,camera);const hits=raycaster.intersectObjects(hitTargets,true);
  if(hits.length){let obj=hits[0].object;while(obj&&!obj.userData.org)obj=obj.parent;const found=organelles.find(x=>x.name===(obj&&obj.userData.org));if(found)selectOrg(found);}
 });
 host.addEventListener("wheel",e=>{camera.position.z=Math.max(7.5,Math.min(14,camera.position.z+e.deltaY*.008));},{passive:true});
 const loading=document.getElementById("loading3d");if(loading)loading.remove();
 function animate(){requestAnimationFrame(animate);if(autoRotate&&!dragging)cellRoot.rotation.y+=.002;renderer.render(scene,camera);}animate();
 window.addEventListener("resize",()=>{camera.aspect=host.clientWidth/host.clientHeight;camera.updateProjectionMatrix();renderer.setSize(host.clientWidth,host.clientHeight);});
}
document.getElementById("rotateBtn").addEventListener("click",e=>{autoRotate=!autoRotate;e.currentTarget.textContent=autoRotate?"⟳ Otomatik döndür":"Ⅱ Döndürmeyi durdur";});
document.getElementById("resetBtn").addEventListener("click",()=>{if(cellRoot){cellRoot.rotation.set(0,0,0);camera.position.set(0,0,10.5);}});
initCell();
