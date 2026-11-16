const data=[
{name:"Çekirdek",en:"Nucleus",emoji:"🟣",desc:"Çift katlı çekirdek zarıyla çevrilidir; DNA'yı taşır ve hücresel etkinlikleri yönetir.",edesc:"Surrounded by a double nuclear envelope, it contains DNA and helps regulate cell activities."},
{name:"Mitokondri",en:"Mitochondrion",emoji:"🫘",desc:"İç zar kıvrımları (krista) bulunur. Hücresel solunumla ATP üretiminde görevlidir.",edesc:"Its inner membrane forms cristae. It produces ATP during cellular respiration."},
{name:"Ribozom",en:"Ribosome",emoji:"🔵",desc:"Protein sentezinin gerçekleştiği, zarsız hücresel yapıdır.",edesc:"A non-membranous structure where proteins are synthesized."},
{name:"Golgi aygıtı",en:"Golgi apparatus",emoji:"📦",desc:"Yassılaşmış keseciklerden oluşur; protein ve lipitleri işler, sınıflandırır ve paketler.",edesc:"Made of flattened sacs; it modifies, sorts and packages proteins and lipids."},
{name:"Hücre zarı",en:"Cell membrane",emoji:"🫧",desc:"Fosfolipit çift tabaka ve proteinlerden oluşan seçici geçirgen sınırdır.",edesc:"A selectively permeable boundary made of a phospholipid bilayer and proteins."},
{name:"Endoplazmik retikulum",en:"Endoplasmic reticulum",emoji:"〰️",desc:"Granüllü ER ribozom taşır ve protein işlenmesinde; granülsüz ER lipit sentezi ve başka görevlerde rol alır.",edesc:"Rough ER bears ribosomes and helps process proteins; smooth ER has roles including lipid synthesis."},
{name:"Lizozom",en:"Lysosome",emoji:"🟠",desc:"Hücre içi sindirimde görev alan enzimli zarlı keseciktir.",edesc:"A membrane-bound vesicle containing enzymes for intracellular digestion."},
{name:"Sentrozom",en:"Centrosome",emoji:"🧭",desc:"Hayvan hücrelerinde mikrotübüllerin organizasyonunda ve hücre bölünmesinde görev alır.",edesc:"In animal cells, it organizes microtubules and contributes to cell division."}
];
let lang="tr",selected=data[0],scene,camera,renderer,cellGroup,raycaster,pointer,autoRotate=true,clickable=[];
const grid=document.getElementById("orgGrid");
function renderOrg(){
 grid.innerHTML="";
 data.forEach(item=>{
  const b=document.createElement("button");
  b.className="org-btn"+(item===selected?" active":"");
  b.textContent=item.emoji+" "+(lang==="tr"?item.name:item.en);
  b.onclick=()=>selectOrg(item);
  grid.appendChild(b);
 });
 document.getElementById("orgEmoji").textContent=selected.emoji;
 document.getElementById("orgName").textContent=lang==="tr"?selected.name:selected.en;
 document.getElementById("orgDesc").textContent=lang==="tr"?selected.desc:selected.edesc;
}
function selectOrg(item){
 selected=item;renderOrg();
 if(cellGroup){
  cellGroup.traverse(o=>{
   if(o.userData.org===item.name && o.userData.pulse){
    const original=o.scale.clone();o.scale.multiplyScalar(1.12);
    setTimeout(()=>o.scale.copy(original),420);
   }
  });
 }
}
renderOrg();

document.getElementById("langBtn").addEventListener("click",()=>{
 lang=lang==="tr"?"en":"tr";document.documentElement.lang=lang;
 document.getElementById("langBtn").textContent=lang==="tr"?"EN":"TR";
 document.querySelectorAll("[data-tr]").forEach(el=>{el.textContent=el.dataset[lang];});
 renderOrg();
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
 selectOrg(data[1]);document.getElementById("taskResult").textContent=lang==="tr"?"Mitokondriyi buldun! Kristaları iç zarın yüzey alanını artırır; ATP üretiminde rol oynar.":"You found it! Cristae increase inner membrane surface area and are involved in ATP production.";
});

function init3D(){
 const host=document.getElementById("cell3d");
 if(!window.THREE){document.getElementById("loading3d").textContent="3B model için internet bağlantısı gerekli.";return;}
 scene=new THREE.Scene();scene.background=new THREE.Color(0xece8ff);
 camera=new THREE.PerspectiveCamera(40,host.clientWidth/host.clientHeight,.1,100);camera.position.set(0,0,9.2);
 renderer=new THREE.WebGLRenderer({antialias:true,alpha:false});
 renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));renderer.setSize(host.clientWidth,host.clientHeight);
 renderer.outputEncoding=THREE.sRGBEncoding;host.appendChild(renderer.domElement);
 scene.add(new THREE.HemisphereLight(0xffffff,0x8a83b4,1.45));
 const key=new THREE.DirectionalLight(0xffffff,2.1);key.position.set(4,6,8);scene.add(key);
 const fill=new THREE.PointLight(0xb9e8ff,.8);fill.position.set(-5,-2,4);scene.add(fill);
 cellGroup=new THREE.Group();scene.add(cellGroup);
 const mat=(color,rough=.48,metal=0)=>new THREE.MeshStandardMaterial({color,roughness:rough,metalness:metal});
 function addMesh(mesh,name,pulse=true){mesh.userData.org=name;mesh.userData.pulse=pulse;cellGroup.add(mesh);clickable.push(mesh);return mesh;}
 function sphere(name,color,pos,scale,detail=32){
  const m=new THREE.Mesh(new THREE.SphereGeometry(1,detail,24),mat(color));
  m.position.set(...pos);m.scale.set(...scale);return addMesh(m,name);
 }
 // Cytoplasm and softly transparent plasma membrane, with a distinct phospholipid-like rim.
 const cyt=new THREE.Mesh(new THREE.SphereGeometry(2.7,56,40),new THREE.MeshPhysicalMaterial({color:0xc9e8ed,transparent:true,opacity:.24,roughness:.65,side:THREE.DoubleSide,depthWrite:false}));
 cyt.scale.set(1.25,.88,.78);cellGroup.add(cyt);
 const membrane=new THREE.Mesh(new THREE.SphereGeometry(2.78,56,40),new THREE.MeshPhysicalMaterial({color:0x55bda9,transparent:true,opacity:.24,roughness:.28,clearcoat:.8,side:THREE.DoubleSide,depthWrite:false}));
 membrane.scale.set(1.25,.88,.78);addMesh(membrane,"Hücre zarı",false);
 // Nuclear envelope, nucleoplasm and nucleolus.
 sphere("Çekirdek",0x9b79cf,[-.35,.05,.15],[.77,.72,.66]);
 const nucRim=new THREE.Mesh(new THREE.SphereGeometry(.79,36,28),new THREE.MeshStandardMaterial({color:0x6d4aa9,transparent:true,opacity:.7,wireframe:true}));
 nucRim.position.set(-.35,.05,.15);addMesh(nucRim,"Çekirdek",false);
 sphere("Çekirdek",0x6c4b9e,[-.1,.22,.68],[.23,.22,.16]);
 // Mitochondria: capsule-shaped outer membranes and visible folded cristae.
 function mitochondrion(pos,rot=0){
  const g=new THREE.Group();g.position.set(...pos);g.rotation.z=rot;
  const outer=new THREE.Mesh(new THREE.SphereGeometry(1,32,24),mat(0xe58b63));outer.scale.set(.72,.34,.28);g.add(outer);
  const inner=new THREE.Mesh(new THREE.SphereGeometry(1,32,24),new THREE.MeshStandardMaterial({color:0xffc18c,roughness:.55}));inner.scale.set(.61,.25,.22);g.add(inner);
  for(let i=0;i<5;i++){
   const curve=new THREE.Mesh(new THREE.TorusGeometry(.13,.025,8,24,Math.PI*1.45),mat(0xb95f49));
   curve.position.set(-.36+i*.17,Math.sin(i*1.3)*.055,.19);curve.rotation.y=.35;g.add(curve);
  }
  addMesh(g,"Mitokondri");
 }
 mitochondrion([1.28,.72,.5],-.35);mitochondrion([-1.35,-.83,.35],.55);
 // Rough and smooth ER: folded tubules around the nucleus; rough ER has ribosome beads.
 function tube(points,radius,color,name){
  const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)));
  const mesh=new THREE.Mesh(new THREE.TubeGeometry(curve,48,radius,8,false),mat(color));
  return addMesh(mesh,name);
 }
 tube([[-1.1,.85,.05],[-.85,1.05,.05],[-.45,.95,.05],[-.15,.82,.05],[.18,.94,.05]],.09,0x5c9ec9,"Endoplazmik retikulum");
 tube([[-1.25,.62,-.05],[-.85,.7,-.05],[-.5,.58,-.05],[-.15,.62,-.05],[.18,.72,-.05]],.07,0x6fb5d5,"Endoplazmik retikulum");
 tube([[-1.25,-.05,-.25],[-.95,-.28,-.25],[-.65,-.18,-.25],[-.4,-.38,-.25]],.055,0x6fb5d5,"Endoplazmik retikulum");
 // Golgi stack: curved flattened cisternae with budding vesicles.
 const golgiGroup=new THREE.Group();golgiGroup.position.set(.95,-.9,.25);
 for(let i=0;i<5;i++){
  const geo=new THREE.SphereGeometry(1,32,20);
  const mesh=new THREE.Mesh(geo,mat(i%2?0xf4c65d:0xeab64d));
  mesh.scale.set(.58,.075,.18);mesh.position.set(Math.sin(i*.35)*.07,(i-2)*.14,0);golgiGroup.add(mesh);
 }
 addMesh(golgiGroup,"Golgi aygıtı");
 sphere("Golgi aygıtı",0xf8d989,[1.62,-.63,.33],[.11,.11,.11]);
 sphere("Golgi aygıtı",0xf8d989,[1.55,-1.2,.32],[.09,.09,.09]);
 // Lysosomes and transport vesicles.
 for(const p of [[-.95,-1.15,.55],[1.7,.05,.25],[.25,1.25,-.2]]) sphere("Lizozom",0xe99b58,p,[.17,.17,.17]);
 // Ribosomes, both free and attached to rough ER.
 for(let i=0;i<34;i++){
  const a=Math.random()*Math.PI*2,r=.6+Math.random()*1.45;
  const x=Math.cos(a)*r,y=Math.sin(a)*r*.65,z=(Math.random()-.5)*.75;
  sphere("Ribozom",0x356fb3,[x,y,z],[.045,.045,.045],12);
 }
 // Centrosome pair, stylized centrioles.
 const centro=new THREE.Group();centro.position.set(-1.35,-.1,.75);
 for(let j=0;j<2;j++){
  const c=new THREE.Mesh(new THREE.CylinderGeometry(.09,.09,.52,16),mat(0x9b78bd));
  c.rotation.z=Math.PI/2+(j*.85);c.position.x=(j-.5)*.22;centro.add(c);
 }
 addMesh(centro,"Sentrozom");
 // Cytoskeletal filaments as thin strands.
 for(let i=0;i<7;i++){
  const a=i*Math.PI/3.5;
  tube([[Math.cos(a)*.3,Math.sin(a)*.2,-.55],[Math.cos(a)*1.0,Math.sin(a)*.65,-.45],[Math.cos(a)*1.65,Math.sin(a)*.85,-.3]],.012,0x91a2c5,"Hücre zarı");
 }
 raycaster=new THREE.Raycaster();pointer=new THREE.Vector2();
 let dragging=false,lastX=0,lastY=0;
 renderer.domElement.addEventListener("pointerdown",e=>{dragging=true;lastX=e.clientX;lastY=e.clientY;});
 window.addEventListener("pointerup",()=>dragging=false);
 renderer.domElement.addEventListener("pointermove",e=>{if(dragging){cellGroup.rotation.y+=(e.clientX-lastX)*.008;cellGroup.rotation.x+=(e.clientY-lastY)*.008;lastX=e.clientX;lastY=e.clientY;}});
 renderer.domElement.addEventListener("click",e=>{
  const r=renderer.domElement.getBoundingClientRect();pointer.x=((e.clientX-r.left)/r.width)*2-1;pointer.y=-((e.clientY-r.top)/r.height)*2+1;
  raycaster.setFromCamera(pointer,camera);const hits=raycaster.intersectObjects(clickable,true);
  if(hits.length){let obj=hits[0].object;while(obj&&!obj.userData.org)obj=obj.parent;const n=obj&&obj.userData.org;const found=data.find(x=>x.name===n);if(found)selectOrg(found);}
 });
 host.addEventListener("wheel",e=>{camera.position.z=Math.max(6.5,Math.min(13,camera.position.z+e.deltaY*.008));},{passive:true});
 const loading=document.getElementById("loading3d");if(loading)loading.remove();
 function animate(){requestAnimationFrame(animate);if(autoRotate&&!dragging)cellGroup.rotation.y+=.0025;renderer.render(scene,camera);}animate();
 window.addEventListener("resize",()=>{if(!renderer)return;camera.aspect=host.clientWidth/host.clientHeight;camera.updateProjectionMatrix();renderer.setSize(host.clientWidth,host.clientHeight);});
}
document.getElementById("rotateBtn").addEventListener("click",e=>{autoRotate=!autoRotate;e.currentTarget.textContent=autoRotate?"⟳ Otomatik döndür":"Ⅱ Döndürmeyi durdur";});
document.getElementById("resetBtn").addEventListener("click",()=>{if(cellGroup){cellGroup.rotation.set(0,0,0);camera.position.set(0,0,9.2);}});
init3D();
