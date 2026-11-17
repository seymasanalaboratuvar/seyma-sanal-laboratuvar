import * as THREE from 'https://esm.sh/three@0.152.2';

/* Şeyma Hocanın Sanal Laboratuvarı - hayvan hücresi */
const organs = [
  {id:'nucleus',name:'Çekirdek',en:'Nucleus',emoji:'🧬',chip:'#b77cff',desc:'Hücrenin yönetim merkezi; DNA’yı barındırır.',edesc:'The control center of the cell; it contains DNA.',structure:'Çift katlı, gözenekli çekirdek zarı ve DNA’dan oluşan kromatin içerir.',estructure:'A double membrane with pores and DNA-containing chromatin.',fn:'DNA’daki bilgiyle protein üretimini yönetir. Bölünme sırasında kromatin kromozomlara yoğunlaşır.',efn:'Directs protein production using DNA information. Chromatin condenses into chromosomes during cell division.'},
  {id:'nucleolus',name:'Çekirdekçik',en:'Nucleolus',emoji:'🟡',chip:'#ffd36e',desc:'Ribozom alt birimlerinin üretildiği bölge.',edesc:'The region where ribosome subunits are assembled.',structure:'Çekirdek içinde bulunan zarsız ve yoğun bir bölgedir.',estructure:'A dense, membrane-free region inside the nucleus.',fn:'rRNA sentezler ve ribozom alt birimlerinin oluşumuna katkı sağlar.',efn:'Produces rRNA and helps assemble ribosome subunits.'},
  {id:'mito',name:'Mitokondri',en:'Mitochondrion',emoji:'🔶',chip:'#ff9a62',desc:'Hücresel solunumla ATP üreten organel.',edesc:'The organelle that produces ATP through cellular respiration.',structure:'Çift zarlıdır; iç zar kıvrımları kristaları oluşturur. Kendi DNA’sı ve ribozomları vardır.',estructure:'Double-membraned; folds of the inner membrane form cristae. It has its own DNA and ribosomes.',fn:'Besinlerdeki enerjiyi ATP’ye aktarır. Krebs döngüsü matrikste, elektron taşıma sistemi iç zarda gerçekleşir.',efn:'Transfers energy from nutrients to ATP. The Krebs cycle occurs in the matrix and the electron transport chain on the inner membrane.'},
  {id:'rough',name:'Granüllü ER',en:'Rough ER',emoji:'🌀',chip:'#168cff',desc:'Proteinlerin üretilmesi ve işlenmesiyle ilişkili zar ağı.',edesc:'A membrane network involved in protein production and processing.',structure:'Yüzeyinde ribozomlar bulunan kanal ve keseciklerden oluşur; çekirdek zarıyla bağlantılıdır.',estructure:'A network of channels and sacs covered with ribosomes; continuous with the nuclear envelope.',fn:'Ribozomlarda üretilen proteinleri alır, katlar ve Golgi aygıtına taşınmak üzere paketler.',efn:'Receives, folds and packages proteins made by ribosomes for transport to the Golgi.'},
  {id:'smooth',name:'Düz ER',en:'Smooth ER',emoji:'〰️',chip:'#27c8ff',desc:'Lipit sentezi, detoksifikasyon ve kalsiyum depolanmasında görev alır.',edesc:'Involved in lipid synthesis, detoxification and calcium storage.',structure:'Yüzeyinde ribozom bulunmayan borucuk biçimli zar ağıdır.',estructure:'A tubular membrane network without surface ribosomes.',fn:'Lipit ve steroid sentezler; karaciğerde bazı maddeleri detoksifiye eder, kas hücrelerinde kalsiyum depolar.',efn:'Synthesizes lipids and steroids, detoxifies some substances in the liver and stores calcium in muscle cells.'},
  {id:'golgi',name:'Golgi aygıtı',en:'Golgi apparatus',emoji:'📚',chip:'#ff5ca8',desc:'Protein ve lipitleri düzenleyen, paketleyen ve yönlendiren organel.',edesc:'The organelle that modifies, packages and routes proteins and lipids.',structure:'Üst üste dizilmiş yassı zar keseciklerinden oluşur.',estructure:'A stack of flattened membrane sacs.',fn:'ER’den gelen maddeleri işler ve hedeflerine gönderir; lizozom oluşumuna katkı sağlar.',efn:'Processes materials from the ER and ships them to destinations; contributes to lysosome formation.'},
  {id:'ribosome',name:'Ribozom',en:'Ribosome',emoji:'🔵',chip:'#9fd8ff',desc:'Protein sentezinin gerçekleştiği zarsız yapı.',edesc:'A membrane-free structure where proteins are synthesized.',structure:'rRNA ve proteinlerden oluşan büyük ve küçük alt birimi vardır.',estructure:'Has large and small subunits made of rRNA and proteins.',fn:'mRNA’daki şifreyi okuyarak amino asitleri birleştirir ve protein sentezler.',efn:'Reads mRNA instructions and joins amino acids to synthesize proteins.'},
  {id:'lysosome',name:'Lizozom',en:'Lysosome',emoji:'🟣',chip:'#7fe58f',desc:'Hücre içi sindirim ve geri dönüşüm keseciği.',edesc:'A vesicle for intracellular digestion and recycling.',structure:'Sindirim enzimleri içeren tek zarlı keseciktir.',estructure:'A single-membrane vesicle containing digestive enzymes.',fn:'Hücreye alınan maddeleri ve yaşlanmış organelleri parçalayarak geri dönüşüme katkı sağlar.',efn:'Breaks down imported materials and worn-out organelles for recycling.'},
  {id:'centrosome',name:'Sentrozom',en:'Centrosome',emoji:'🟠',chip:'#ff6f91',desc:'Hayvan hücrelerinde hücre bölünmesinin düzenlenmesine katkı sağlar.',edesc:'Helps organize cell division in animal cells.',structure:'Genellikle birbirine dik duran iki sentriyolden oluşur.',estructure:'Usually consists of two centrioles arranged at right angles.',fn:'Mitoz ve mayoz sırasında iğ ipliklerinin organizasyonunda görev alır.',efn:'Organizes spindle fibers during mitosis and meiosis.'},
  {id:'membrane',name:'Hücre zarı',en:'Cell membrane',emoji:'🫧',chip:'#7fe0cf',desc:'Hücreyi çevreleyen seçici geçirgen sınır.',edesc:'The selectively permeable boundary surrounding the cell.',structure:'Fosfolipit çift tabaka ve içine gömülü proteinlerden oluşur.',estructure:'A phospholipid bilayer with embedded proteins.',fn:'Madde alışverişini ve hücreler arası iletişimi düzenler.',efn:'Regulates material exchange and cell communication.'}
];

if (!window.__seymaCellLabStarted) {
  window.__seymaCellLabStarted = true;
  let lang='tr', selected='nucleus', auto=true, dragging=false, down=null, previous={x:0,y:0};
  let scene,camera,renderer,root,host,raycaster,mouse,cellLabel;
  let camZ=19, focusOn=false, focusPoint=new THREE.Vector3();
  const meshesById={}, pickables=[], floaters=[];
  const $=id=>document.getElementById(id);
  const tr=(a,b)=>lang==='tr'?a:b;
  const vec=(x,y,z)=>new THREE.Vector3(x,y,z);
  const material=(color,opts={})=>new THREE.MeshPhongMaterial({color,shininess:85,specular:0x555555,...opts});
  const add=(parent,mesh,id,color,focus=null)=>{
    mesh.userData.organelle=id;
    mesh.userData.color=new THREE.Color(color);
    (meshesById[id] ||= []).push(mesh);
    pickables.push(mesh); parent.add(mesh);
    if(focus) mesh.userData.focus=focus.clone();
    return mesh;
  };
  const sphere=(r,c,opts={})=>new THREE.Mesh(new THREE.SphereGeometry(r,24,16),material(c,opts));
  function renderOrgans(){
    const grid=$('orgGrid'); if(!grid)return;
    grid.innerHTML='';
    organs.forEach(o=>{
      const b=document.createElement('button');
      b.type='button'; b.className='org-btn'+(o.id===selected?' active':'');
      b.innerHTML=`<span class="org-icon" style="--chip:${o.chip}">${o.emoji}</span><span>${tr(o.name,o.en)}</span>`;
      b.addEventListener('click',()=>selectOrgan(o.id,true));
      grid.appendChild(b);
    });
    const count=document.querySelector('.count');
    if(count) count.innerHTML='10 <small>'+tr('YAPI','STRUCTURES')+'</small>';
  }
  function showDetail(o){
    if(!$('detailCard'))return;
    $('detailEmoji').textContent=o.emoji;
    $('orgName').textContent=tr(o.name,o.en);
    $('orgDesc').textContent=tr(o.desc,o.edesc);
    $('orgStructure').textContent=tr(o.structure,o.estructure);
    $('orgFunction').textContent=tr(o.fn,o.efn);
    $('detailVisual').style.background=`radial-gradient(circle at 45% 40%,#fff,${o.chip} 62%,#cbb4ef)`;
    $('detailVisual').querySelector('small').textContent=tr('SEÇİLİ ORGANEL','SELECTED ORGANELLE');
  }
  function selectOrgan(id,scroll=false){
    selected=id;
    const o=organs.find(x=>x.id===id); if(!o)return;
    renderOrgans(); showDetail(o);
    if(scroll)$('detailCard')?.scrollIntoView({behavior:'smooth',block:'nearest'});
    focusOn=true;
  }
  renderOrgans(); showDetail(organs[0]);

  $('langBtn')?.addEventListener('click',()=>{
    lang=lang==='tr'?'en':'tr'; document.documentElement.lang=lang;
    $('langBtn').textContent=lang==='tr'?'EN':'TR';
    document.querySelectorAll('[data-tr]').forEach(el=>{el.textContent=el.dataset[lang];});
    renderOrgans();showDetail(organs.find(o=>o.id===selected));
  });
  document.querySelectorAll('.grade').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('.grade').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    if($('gradeMessage'))$('gradeMessage').textContent=tr(`${b.dataset.grade}. sınıf laboratuvar modülü seçildi.`,`Grade ${b.dataset.grade} laboratory module selected.`);
  }));

  function addTube(parent,points,radius,color,id,focus=null){
    const curve=new THREE.CatmullRomCurve3(points.map(p=>vec(...p)));
    return add(parent,new THREE.Mesh(new THREE.TubeGeometry(curve,80,radius,8,false),material(color)),id,color,focus);
  }
  function buildCell(){
    const nucleusPos=vec(-.6,.3,0);
    const cytoplasm=new THREE.Mesh(new THREE.SphereGeometry(1,48,36),new THREE.MeshBasicMaterial({color:0x1f7a78,transparent:true,opacity:.2,side:THREE.BackSide,depthWrite:false}));
    cytoplasm.scale.set(5.25,4.55,4.35);root.add(cytoplasm);
    const membrane=new THREE.Mesh(new THREE.SphereGeometry(1,64,48),new THREE.MeshBasicMaterial({color:0x7fe0cf,transparent:true,opacity:.22,side:THREE.DoubleSide,depthWrite:false}));
    membrane.scale.set(5.3,4.6,4.4);add(root,membrane,'membrane','#7fe0cf');

    const nuc=sphere(1.42,0x8735d2,{transparent:true,opacity:.55,depthWrite:false});
    nuc.position.copy(nucleusPos);add(root,nuc,'nucleus','#8735d2');
    const shell=new THREE.Mesh(new THREE.SphereGeometry(1.47,40,32),material(0xb77cff,{wireframe:true,transparent:true,opacity:.42}));
    shell.position.copy(nucleusPos);add(root,shell,'nucleus','#b77cff');
    for(let i=0;i<3;i++){
      const k=new THREE.Mesh(new THREE.TorusKnotGeometry(.42+i*.13,.045,100,8,2+i,3),material([0xd9a2ff,0xb34df0,0xf0caff][i]));
      k.position.copy(nucleusPos);k.rotation.set(i*.7,i*.45,0);add(root,k,'nucleus','#d9a2ff');
    }
    const nucleolus=sphere(.4,0xffd36e,{shininess:100});nucleolus.position.set(-.1,.4,.3);add(root,nucleolus,'nucleolus','#ffd36e');

    const riboGeo=new THREE.SphereGeometry(.075,8,6),ribMat=material(0xd8f3ff,{shininess:30});
    const addRibo=p=>{const m=new THREE.Mesh(riboGeo,ribMat);m.position.copy(p);add(root,m,'ribosome','#d8f3ff');};

    const roughPts=[];
    for(let i=0;i<=80;i++){const a=i/80*Math.PI*3.2,r=2.15+.28*Math.sin(5*a);roughPts.push(vec(nucleusPos.x+r*Math.cos(a),nucleusPos.y+.8*Math.sin(a*.7)+.25*Math.cos(3*a),r*Math.sin(a)*.9));}
    const roughCurve=new THREE.CatmullRomCurve3(roughPts);
    for(const dy of [-.34,0,.34]){
      const m=new THREE.Mesh(new THREE.TubeGeometry(roughCurve,150,.22,8,false),material(0x168cff,{transparent:true,opacity:.9}));
      m.position.y=dy;add(root,m,'rough','#168cff',nucleusPos);
    }
    for(let i=0;i<105;i++){const p=roughCurve.getPoint(i/105);addRibo(p.add(vec(0,(i%3-1)*.34,.15)));}

    const smoothColor=0x27c8ff;
    [
      [[2,2.2,.8],[3.2,1.6,-.6],[3.6,.5,.7],[2.9,-.4,-.7],[3.4,-1.3,.6]],
      [[3.2,1.6,-.6],[4.1,2,.2],[4.3,.6,-.8]],
      [[2.9,-.4,-.7],[1.9,-1,-1.5],[2.4,-2,-.6]],
      [[2,2.2,.8],[1.3,3,0],[2,3.4,-1]]
    ].forEach(points=>addTube(root,points,.105,smoothColor,'smooth',vec(3.2,.4,0)));

    const golgi=new THREE.Group();golgi.position.set(-3.2,-1.8,.6);golgi.rotation.set(.3,.4,.5);root.add(golgi);
    for(let i=0;i<6;i++){
      const pts=[];for(let j=0;j<=12;j++){const x=(-1.1+j*.183)*(1-.07*Math.abs(i-2.5));pts.push([x,(i-2.5)*.28,.3*x*x]);}
      addTube(golgi,pts,.12,0xff5ca8,'golgi');
    }
    [[1.3,.7,.5],[-1.3,-.6,.5],[1.5,-.2,.9],[-1.5,.4,.9],[0,1.2,.5],[.2,-1.1,.6]].forEach(p=>{
      const v=sphere(.14,0xffa4d0);v.position.set(...p);add(golgi,v,'golgi','#ffa4d0');
    });
    const gp=new THREE.Mesh(new THREE.SphereGeometry(.8,8,8),new THREE.MeshBasicMaterial({transparent:true,opacity:0}));add(golgi,gp,'golgi','#ff5ca8');

    const mitochondria=[
      [.8,-2.6,.8,.4,.3],[-3.6,.9,-1.2,1.1,-.4],[1.9,.8,-2.8,2.2,.2],[.4,3.1,-1.2,.7,-.3],[3.2,-2.4,1,1.8,.5],[-1.3,-3,-1.8,.3,.4],[2.6,2.8,-.9,1.4,-.2]
    ];
    mitochondria.forEach(a=>{
      const g=new THREE.Group();g.position.set(a[0],a[1],a[2]);g.rotation.set(0,a[3],a[4]);root.add(g);
      const outer=sphere(1,0xe8643c,{transparent:true,opacity:.52,depthWrite:false});outer.scale.set(1.05,.46,.46);add(g,outer,'mito','#e8643c');
      const inner=sphere(1,0xff8b5a,{transparent:true,opacity:.95});inner.scale.set(.93,.34,.34);add(g,inner,'mito','#ff8b5a');
      for(let i=-2;i<=2;i++){
        const pts=[];for(let j=0;j<=14;j++){
          const x=-.78+j*.112;
          pts.push(vec(x,i*.085+Math.sin(j*.85+i*.7)*.075,Math.cos(j*.75+i*.6)*.045));
        }
        const cr=new THREE.CatmullRomCurve3(pts);
        add(g,new THREE.Mesh(new THREE.TubeGeometry(cr,48,.026,6,false),material(0xffffb0,{shininess:100})),'mito','#ffffb0');
      }
      const proxy=new THREE.Mesh(new THREE.SphereGeometry(.65,8,8),new THREE.MeshBasicMaterial({transparent:true,opacity:0}));add(g,proxy,'mito','#e8643c');
      floaters.push({object:g,base:g.position.clone(),phase:Math.random()*6});
    });

    [[-1.4,2.6,1.4],[-2.2,-.6,2.5],[1.2,-1.4,2.8],[3.6,2.2,1],[-1,-3.4,1.6]].forEach(p=>{
      const g=new THREE.Group();g.position.set(...p);root.add(g);
      add(g,sphere(.3,0x6fcf7f,{transparent:true,opacity:.8}),'lysosome','#6fcf7f');
      for(let i=0;i<4;i++){const q=sphere(.065,0x2f8a45);q.position.set(Math.sin(i*2)*.12,Math.cos(i*2)*.1,Math.sin(i)*.1);add(g,q,'lysosome','#2f8a45');}
      const proxy=new THREE.Mesh(new THREE.SphereGeometry(.42,8,8),new THREE.MeshBasicMaterial({transparent:true,opacity:0}));add(g,proxy,'lysosome','#6fcf7f');
    });

    const centro=new THREE.Group();centro.position.set(-2.8,2.6,-.5);centro.rotation.set(.3,.5,.2);root.add(centro);
    [[0,0,0,0],[.55,-.45,0,Math.PI/2]].forEach(c=>{
      const cyl=new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.9,16),material(0xff6f91));cyl.position.set(c[0],c[1],c[2]);cyl.rotation.z=c[3];add(centro,cyl,'centrosome','#ff6f91');
    });
    for(let i=0;i<18;i++){
      const d=vec(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize().multiplyScalar(1.3+Math.random()*1.3);
      const line=new THREE.BufferGeometry().setFromPoints([vec(0,0,0),d]);
      add(centro,new THREE.Line(line,new THREE.LineBasicMaterial({color:0xff9db5,transparent:true,opacity:.4})),'centrosome','#ff6f91');
    }
    let n=0;while(n<65){const p=vec((Math.random()*2-1)*4.8,(Math.random()*2-1)*4,(Math.random()*2-1)*3.8);if(p.distanceTo(nucleusPos)<2.5)continue;addRibo(p);n++;}
  }

  function init(){
    host=$('cell3d');if(!host)return;
    host.style.position='relative';host.style.overflow='hidden';
    try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});}
    catch(e){const loading=$('loading3d');if(loading)loading.innerHTML='<b>3B model başlatılamadı.</b><small>Tarayıcı WebGL desteğini kontrol et.</small>';return;}
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
    renderer.setSize(host.clientWidth,host.clientHeight,false);
    renderer.setClearColor(0x000000,0);
    renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
    renderer.domElement.style.cssText='display:block;width:100%;height:100%;touch-action:none;cursor:grab';
    host.appendChild(renderer.domElement);
    host.style.background='radial-gradient(circle at 50% 42%,#2a6f77 0%,#12363d 50%,#061519 100%)';
    const vignette=document.createElement('div');vignette.style.cssText='position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle,transparent 55%,rgba(0,0,0,.5) 100%)';host.appendChild(vignette);
    cellLabel=document.createElement('div');cellLabel.style.cssText='position:absolute;display:none;pointer-events:none;white-space:nowrap;padding:5px 12px;border-radius:999px;font:600 13px system-ui;color:white;background:#061519d9;border:1.5px solid #7fe0cf';host.appendChild(cellLabel);
    scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(40,host.clientWidth/host.clientHeight,.1,100);camera.position.set(0,0,19);
    scene.add(new THREE.HemisphereLight(0xcffff4,0x0a2a30,.8));
    const key=new THREE.DirectionalLight(0xffffff,1.1);key.position.set(5,8,10);scene.add(key);
    const fill=new THREE.DirectionalLight(0x7fe0ff,.55);fill.position.set(-6,-3,-8);scene.add(fill);
    const point=new THREE.PointLight(0x66ffee,.7,50);point.position.set(-8,-4,6);scene.add(point);
    root=new THREE.Group();scene.add(root);buildCell();
    $('loading3d')?.remove();
    raycaster=new THREE.Raycaster();mouse=new THREE.Vector2();
    const canvas=renderer.domElement;
    function pick(e){
      const r=canvas.getBoundingClientRect();mouse.set((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height)*2+1);
      raycaster.setFromCamera(mouse,camera);const hits=raycaster.intersectObjects(pickables,false);
      if(!hits.length)return null;
      const hit=hits.find(h=>h.object.userData.organelle==='nucleolus')||hits.find(h=>h.object.userData.organelle!=='membrane')||hits[0];
      return hit.object.userData.organelle;
    }
    canvas.addEventListener('pointerdown',e=>{dragging=true;previous={x:e.clientX,y:e.clientY};down={x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);});
    canvas.addEventListener('pointermove',e=>{
      if(!dragging)return;
      root.rotation.y+=(e.clientX-previous.x)*.006;root.rotation.x+=(e.clientY-previous.y)*.006;previous={x:e.clientX,y:e.clientY};
    });
    canvas.addEventListener('pointerup',e=>{
      dragging=false;
      if(down&&Math.hypot(e.clientX-down.x,e.clientY-down.y)<7){const id=pick(e);if(id)selectOrgan(id,false);}
      down=null;
    });
    canvas.addEventListener('pointercancel',()=>{dragging=false;down=null;});
    canvas.addEventListener('wheel',e=>{camZ=Math.max(8,Math.min(26,camZ+e.deltaY*.01));},{passive:true});
    $('rotateBtn')?.addEventListener('click',()=>{
      auto=!auto;$('rotateBtn').classList.toggle('active',auto);
      const span=$('rotateBtn').querySelector('span');if(span)span.textContent=tr(auto?'Otomatik döndür':'Döndürme durdu',auto?'Auto rotate':'Auto rotate paused');
    });
    $('zoomIn')?.addEventListener('click',()=>{camZ=Math.max(8,camZ-2);});
    $('zoomOut')?.addEventListener('click',()=>{camZ=Math.min(26,camZ+2);});
    $('resetBtn')?.addEventListener('click',()=>{root.rotation.set(0,0,0);camZ=19;focusOn=false;cellLabel.style.display='none';});
    const resize=()=>{if(!host.clientWidth||!host.clientHeight)return;camera.aspect=host.clientWidth/host.clientHeight;camera.updateProjectionMatrix();renderer.setSize(host.clientWidth,host.clientHeight,false);};
    new ResizeObserver(resize).observe(host);
    const zoom={membrane:19,rough:14,smooth:14,nucleus:13,golgi:12,nucleolus:9.5,mito:11,lysosome:10,ribosome:11,centrosome:10};
    let lastSelected='';
    function animate(){
      requestAnimationFrame(animate);const time=performance.now()/1000;
      if(selected!==lastSelected){
        lastSelected=selected;const group=(meshesById[selected]||[])[0];
        if(group){
          let p=group.userData.focus?group.userData.focus.clone():group.getWorldPosition(new THREE.Vector3());
          root.worldToLocal(p);focusPoint.copy(p);camZ=zoom[selected]||12;focusOn=true;
        }
      }
      if(auto&&!dragging)root.rotation.y+=.0016;
      floaters.forEach(f=>f.object.position.set(f.base.x+Math.cos(time*.5+f.phase)*.08,f.base.y+Math.sin(time*.6+f.phase)*.08,f.base.z));
      const target=focusOn?focusPoint.clone().applyQuaternion(root.quaternion).multiplyScalar(-1):vec(0,0,0);
      root.position.lerp(target,.07);camera.position.z+=(camZ-camera.position.z)*.07;
      Object.keys(meshesById).forEach(id=>{
        const glow=id===selected?.28+.16*Math.sin(time*4):0;
        meshesById[id].forEach(m=>{if(m.material?.emissive)m.material.emissive.copy(m.userData.color).multiplyScalar(glow);});
      });
      root.updateMatrixWorld(true);
      if(focusOn){
        const p=focusPoint.clone();root.localToWorld(p);p.project(camera);
        const o=organs.find(x=>x.id===selected);cellLabel.textContent=o?tr(o.name,o.en):'';
        cellLabel.style.display='block';
        cellLabel.style.transform=`translate(${(p.x*.5+.5)*host.clientWidth}px,${(-p.y*.5+.5)*host.clientHeight}px) translate(-50%,-170%)`;
        cellLabel.style.borderColor=o?o.chip:'#7fe0cf';
      }
      renderer.render(scene,camera);
    }
    animate();
  }
  init();
}
