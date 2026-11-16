const data=[
{name:"Çekirdek",en:"Nucleus",emoji:"🟣",desc:"Hücrenin yönetim merkezidir. DNA'yı bulundurur.",edesc:"The control center of the cell. It contains DNA."},
{name:"Mitokondri",en:"Mitochondrion",emoji:"🫘",desc:"Hücresel solunumda ATP üretiminde görev alır.",edesc:"It plays a key role in ATP production during cellular respiration."},
{name:"Ribozom",en:"Ribosome",emoji:"🔵",desc:"Protein sentezinin gerçekleştiği yapıdır.",edesc:"It is the site of protein synthesis."},
{name:"Golgi aygıtı",en:"Golgi apparatus",emoji:"📦",desc:"Maddeleri işler, paketler ve salgılanmaya hazırlar.",edesc:"It modifies, packages and prepares substances for secretion."},
{name:"Hücre zarı",en:"Cell membrane",emoji:"🫧",desc:"Hücreye madde giriş çıkışını düzenler.",edesc:"It regulates the movement of substances into and out of the cell."},
{name:"Endoplazmik retikulum",en:"Endoplasmic reticulum",emoji:"〰️",desc:"Hücre içi madde taşınmasında görev alır.",edesc:"It helps transport substances within the cell."}
];
let lang="tr",selected=data[0],scene, camera, renderer, cellGroup, raycaster, pointer, autoRotate=true, clickable=[];
const grid=document.getElementById("orgGrid");
function renderOrg(){grid.innerHTML="";data.forEach(item=>{const b=document.createElement("button");b.className="org-btn"+(item===selected?" active":"");b.textContent=item.emoji+" "+(lang==="tr"?item.name:item.en);b.onclick=()=>selectOrg(item);grid.appendChild(b);});document.getElementById("orgEmoji").textContent=selected.emoji;document.getElementById("orgName").textContent=lang==="tr"?selected.name:selected.en;document.getElementById("orgDesc").textContent=lang==="tr"?selected.desc:selected.edesc;}
function selectOrg(item){selected=item;renderOrg();if(cellGroup){cellGroup.children.forEach(o=>{if(o.userData.org===item.name){o.scale.setScalar(1.18);setTimeout(()=>o.scale.setScalar(1),350);}});}}
renderOrg();
document.getElementById("langBtn").addEventListener("click",()=>{lang=lang==="tr"?"en":"tr";document.documentElement.lang=lang;document.getElementById("langBtn").textContent=lang==="tr"?"EN":"TR";document.querySelectorAll("[data-tr]").forEach(el=>{el.textContent=el.dataset[lang];});renderOrg();document.querySelectorAll("#answers button").forEach((b,i)=>b.textContent=lang==="tr"?["Çekirdek","Mitokondri","Golgi aygıtı"][i]:["Nucleus","Mitochondrion","Golgi apparatus"][i]);document.querySelector(".quiz-card .eyebrow").textContent=lang==="tr"?"KENDİNİ DENE":"TEST YOURSELF";});
document.querySelectorAll(".grade-card").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".grade-card").forEach(x=>x.classList.remove("active"));btn.classList.add("active");const g=btn.dataset.grade;document.getElementById("gradeMessage").textContent=lang==="tr"?`${g}. sınıf içerikleri seçildi. İlk laboratuvar modülünü keşfet!`:`Grade ${g} selected. Explore the first lab module!`;}));
document.querySelectorAll("#answers button").forEach(btn=>btn.addEventListener("click",()=>{const ok=btn.dataset.answer==="Mitokondri";document.getElementById("quizResult").textContent=lang==="tr"?(ok?"🎉 Doğru cevap! Mitokondri, hücresel solunumda ATP üretiminin temel merkezidir.":"Tekrar dene! İpucu: Hücresel solunumun gerçekleştiği organeli düşün."):(ok?"🎉 Correct! Mitochondria are a key site of ATP production.":"Try again! Think about the organelle where cellular respiration occurs.");document.getElementById("quizResult").style.color=ok?"#16856b":"#a15b38";}));
document.getElementById("mitoTask").addEventListener("click",()=>{selectOrg(data[1]);document.getElementById("taskResult").textContent=lang==="tr"?"Mitokondriyi buldun! Hücresel solunumda ATP üretimine katkı sağlar.":"You found it! Mitochondria contribute to ATP production during cellular respiration.";});
function init3D(){
 const host=document.getElementById("cell3d");
 if(!window.THREE){document.getElementById("loading3d").textContent="3B model için internet bağlantısı gerekli.";return;}
 scene=new THREE.Scene();scene.background=new THREE.Color(0xece8ff);
 camera=new THREE.PerspectiveCamera(42,host.clientWidth/host.clientHeight,.1,100);camera.position.set(0,0,8);
 renderer=new THREE.WebGLRenderer({antialias:true,alpha:false});renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));renderer.setSize(host.clientWidth,host.clientHeight);host.appendChild(renderer.domElement);
 scene.add(new THREE.AmbientLight(0xffffff,1.5));const light=new THREE.DirectionalLight(0xffffff,2);light.position.set(4,5,7);scene.add(light);
 cellGroup=new THREE.Group();scene.add(cellGroup);
 const mat=(color,rough=.55)=>new THREE.MeshStandardMaterial({color,roughness:rough,metalness:0.02});
 const membrane=new THREE.Mesh(new THREE.SphereGeometry(2.65,48,36),new THREE.MeshStandardMaterial({color:0x83d4c1,transparent:true,opacity:.26,roughness:.35,side:THREE.DoubleSide}));membrane.scale.set(1.25,.88,.78);membrane.userData.org="Hücre zarı";cellGroup.add(membrane);
 const cytoplasm=new THREE.Mesh(new THREE.SphereGeometry(2.5,40,32),new THREE.MeshStandardMaterial({color:0xdcccf4,transparent:true,opacity:.20,side:THREE.BackSide}));cytoplasm.scale.set(1.22,.85,.75);cellGroup.add(cytoplasm);
 function blob(name,color,pos,scale){const m=new THREE.Mesh(new THREE.SphereGeometry(1,28,20),mat(color));m.position.set(...pos);m.scale.set(...scale);m.userData.org=name;cellGroup.add(m);clickable.push(m);return m;}
 blob("Çekirdek",0x9272d5,[-.35,.05,.2],[.78,.78,.68]);
 blob("Mitokondri",0xe68c67,[1.35,.7,.45],[.72,.32,.35]);
 blob("Mitokondri",0xe68c67,[-1.35,-.85,.3],[.58,.28,.3]);
 blob("Golgi aygıtı",0xf1bd58,[.8,-.85,.25],[.68,.18,.22]);
 blob("Endoplazmik retikulum",0x5d9fce,[-1.15,.9,-.2],[.72,.2,.25]);
 for(let i=0;i<18;i++){const p=blob("Ribozom",0x426fbd,[(Math.random()-.5)*3.3,(Math.random()-.5)*2.2,(Math.random()-.5)*1.1],[.07,.07,.07]);}
 blob("Hücre zarı",0x53bca8,[0,0,-1.7],[1.7,.08,.08]);
 raycaster=new THREE.Raycaster();pointer=new THREE.Vector2();
 let dragging=false,lastX=0,lastY=0;
 renderer.domElement.addEventListener("pointerdown",e=>{dragging=true;lastX=e.clientX;lastY=e.clientY;});
 window.addEventListener("pointerup",()=>dragging=false);
 renderer.domElement.addEventListener("pointermove",e=>{if(dragging){cellGroup.rotation.y+=(e.clientX-lastX)*.008;cellGroup.rotation.x+=(e.clientY-lastY)*.008;lastX=e.clientX;lastY=e.clientY;}});
 renderer.domElement.addEventListener("click",e=>{const r=renderer.domElement.getBoundingClientRect();pointer.x=((e.clientX-r.left)/r.width)*2-1;pointer.y=-((e.clientY-r.top)/r.height)*2+1;raycaster.setFromCamera(pointer,camera);const hits=raycaster.intersectObjects(clickable,false);if(hits.length){const n=hits[0].object.userData.org;const found=data.find(x=>x.name===n);if(found)selectOrg(found);}});
 host.addEventListener("wheel",e=>{camera.position.z=Math.max(5,Math.min(11,camera.position.z+e.deltaY*.008));},{passive:true});
 document.getElementById("loading3d").remove();
 function animate(){requestAnimationFrame(animate);if(autoRotate&&!dragging)cellGroup.rotation.y+=.003;renderer.render(scene,camera);}animate();
 window.addEventListener("resize",()=>{if(!renderer)return;camera.aspect=host.clientWidth/host.clientHeight;camera.updateProjectionMatrix();renderer.setSize(host.clientWidth,host.clientHeight);});
}
document.getElementById("rotateBtn").addEventListener("click",e=>{autoRotate=!autoRotate;e.currentTarget.textContent=autoRotate?"⟳ Otomatik döndür":"Ⅱ Döndürmeyi durdur";});
document.getElementById("resetBtn").addEventListener("click",()=>{if(cellGroup){cellGroup.rotation.set(0,0,0);camera.position.set(0,0,8);}});
init3D();
