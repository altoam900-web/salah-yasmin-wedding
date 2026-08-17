// ===== بيانات الدعوة - عدّل القيم دي لو حبيت =====
const weddingDate = new Date("2026-08-26T20:00:00+03:00").getTime();

// ضع رقم واتساب هنا بصيغة دولية بدون + مثال: 2010XXXXXXXX
const whatsappNumber = "201000000000";

// لو عندك رابط خريطة القاعة، حطه هنا
const mapLink = "https://maps.google.com/";

// اسم القاعة والعنوان
const venueName = "اسم القاعة هنا";
const venueAddress = "العنوان هنا";

document.getElementById("venueName").textContent = venueName;
document.getElementById("venueAddress").textContent = venueAddress;
document.querySelector(".location")?.setAttribute("href", mapLink);
document.querySelector(".button")?.setAttribute("href", mapLink);

const rsvpMessage = encodeURIComponent("مرحبًا، أود تأكيد حضوري لفرح صلاح وياسمين يوم 26 أغسطس 2026 الساعة 8 مساءً ❤️");
document.getElementById("rsvp").href = `https://wa.me/${whatsappNumber}?text=${rsvpMessage}`;

function updateCountdown(){
  const diff = weddingDate - Date.now();
  if(diff <= 0){
    document.getElementById("countdown").innerHTML =
      '<div style="width:auto;border:0;font-family:Amiri;font-size:24px">ألف مبروك لصلاح وياسمين ❤️</div>';
    return;
  }
  const d=Math.floor(diff/86400000);
  const h=Math.floor(diff/3600000)%24;
  const m=Math.floor(diff/60000)%60;
  const s=Math.floor(diff/1000)%60;
  days.textContent=String(d).padStart(2,"0");
  hours.textContent=String(h).padStart(2,"0");
  mins.textContent=String(m).padStart(2,"0");
  secs.textContent=String(s).padStart(2,"0");
}
updateCountdown(); setInterval(updateCountdown,1000);

// شاشة الافتتاح
enterBtn.onclick=()=>{
  opening.classList.add("hide");
  setTimeout(()=>{opening.style.display="none";main.classList.remove("hidden")},900);
  startMusic();
};

// موسيقى رومانسية خفيفة مولّدة داخل المتصفح، بدون ملف خارجي
let audioCtx, timer, playing=false;
function startMusic(){
  if(playing) return;
  audioCtx = audioCtx || new (window.AudioContext||window.webkitAudioContext)();
  const notes=[261.63,329.63,392,329.63,293.66,349.23,440,349.23];
  let i=0;
  function tone(){
    if(!playing) return;
    const o=audioCtx.createOscillator(), g=audioCtx.createGain();
    o.frequency.value=notes[i++%notes.length]; o.type="sine";
    g.gain.setValueAtTime(.0001,audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(.035,audioCtx.currentTime+.03);
    g.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+.65);
    o.connect(g); g.connect(audioCtx.destination); o.start(); o.stop(audioCtx.currentTime+.7);
  }
  playing=true; musicBtn.textContent="♫"; tone(); timer=setInterval(tone,700);
}
musicBtn.onclick=()=>{ if(playing){playing=false;clearInterval(timer);musicBtn.textContent="♪"}else startMusic() };

// ظهور العناصر أثناء النزول
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
