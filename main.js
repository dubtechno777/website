// ================= BURGER MENU =================
const burgerButton = document.getElementById("burger-button");
const burgerClose = document.getElementById("burger-close");
const burgerMenu = document.getElementById("burger-menu");
const body = document.body;
const mainNav = document.querySelector(".main-nav");

if (burgerButton && burgerMenu) {
    burgerButton.addEventListener("click", () => {
        if (mainNav && mainNav.classList.contains("active")) {
            mainNav.classList.remove("active");
        }
        burgerMenu.classList.add("active");
        body.style.overflow = "hidden";
    });
}

if (burgerClose) {
    burgerClose.addEventListener("click", () => {
        burgerMenu.classList.remove("active");
        body.style.overflow = "auto";
    });
}

document.querySelectorAll('.burger-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        burgerMenu.classList.remove("active");
        body.style.overflow = "auto";
    });
});

if (burgerMenu) {
    burgerMenu.addEventListener('click', (e) => {
        if (e.target === burgerMenu) {
            burgerMenu.classList.remove("active");
            body.style.overflow = "auto";
        }
    });
}

// ================= CALCULATOR =================
const bpmInput = document.getElementById('bpmInput');
const tableBody = document.getElementById('tableBody');
const reverbTableBody = document.getElementById('reverbTableBody');

const notes = ["1/1","1/2","1/4","1/8","1/16","1/32","1/64","1/128"];
const reverbSizes = [
  { name:"Hall", preDelayBeats:0.125, decayBeats:7.875 },
  { name:"Large Room", preDelayBeats:0.0625, decayBeats:3.875 },
  { name:"Small Room", preDelayBeats:0.03125, decayBeats:1.53125 },
  { name:"Tight Ambience", preDelayBeats:0.0078125, decayBeats:0.4921875 }
];

const debounceDelay = 300;

function formatHz(ms){return (1000/ms).toFixed(2)+' Hz';}

function updateDelayTable(bpm){
    tableBody.innerHTML="";
    tableBody.style.opacity='0';
    notes.forEach((note,index)=>{
        const [base,denom]=note.split("/").map(Number);
        const beatFactor=base/denom;
        const ms=(60000/bpm)*(4*beatFactor);
        const dottedMs=ms*1.5;
        const tripletMs=(ms*2)/3;
        tableBody.innerHTML+=`<tr style="animation-delay:${index*0.1}s"><td>${note}</td><td>${ms.toFixed(1)} ms / ${formatHz(ms)}</td><td>${dottedMs.toFixed(1)} ms / ${formatHz(dottedMs)}</td><td>${tripletMs.toFixed(1)} ms / ${formatHz(tripletMs)}</td></tr>`;
    });
    setTimeout(()=>{tableBody.style.opacity='1';},100);
}

function updateReverbTable(bpm){
    reverbTableBody.innerHTML="";
    reverbTableBody.style.opacity='0';
    const beatMs=60000/bpm;
    reverbSizes.forEach((size,index)=>{
        const pre=size.preDelayBeats*beatMs;
        const decay=size.decayBeats*beatMs;
        const total=pre+decay;
        reverbTableBody.innerHTML+=`<tr style="animation-delay:${index*0.1}s"><td>${size.name}</td><td>${pre.toFixed(2)} ms</td><td>${decay.toFixed(2)} ms</td><td>${total.toFixed(2)} ms</td></tr>`;
    });
    setTimeout(()=>{reverbTableBody.style.opacity='1';},100);
}

function updateTables(){
    const bpm=Number(bpmInput.value);
    if(!bpm||bpm<1) return;
    setTimeout(()=>{updateDelayTable(bpm);updateReverbTable(bpm);},debounceDelay);
}

if(bpmInput&&tableBody&&reverbTableBody){
    bpmInput.addEventListener('input',updateTables);
    updateTables();
}
