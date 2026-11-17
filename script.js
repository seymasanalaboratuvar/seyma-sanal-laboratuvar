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
function:'Lipit ve steroid hormon sentezler; karaciğerde ilaç ve zehirli
