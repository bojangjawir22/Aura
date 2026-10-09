// Teks Surat yang Diketik Otomatis
const letterMessage = "Hai sayang... Aku mau minta maaf banget ya atas kesalahanku kemarin. Aku sadar aku salah dan ga berniat bikin kamu sedih. Maafin aku ya? I Love You So Much! ❤️";

let index = 0;
const typewriterElement = document.getElementById('typewriterText');

// Fungsi Ketik Teks Otomatis
function typeWriter() {
    if (index < letterMessage.length) {
        typewriterElement.innerHTML += letterMessage.charAt(index);
        index++;
        setTimeout(typeWriter, 40);
    }
}

// Efek Bunga & Hati Gugur
function createFallingItems() {
    const container = document.getElementById('fallingContainer');
    const items = ['🌸', '💖', '🌺', '💕', '✨', '🌹'];
    
    for (let i = 0; i < 30; i++) {
        const item = document.createElement('div');
        item.classList.add('falling-item');
        item.innerText = items[Math.floor(Math.random() * items.length)];
        item.style.left = Math.random() * 100 + 'vw';
        item.style.animationDuration = Math.random() * 3 + 2 + 's';
        item.style.fontSize = Math.random() * 15 + 15 + 'px';
        container.appendChild(item);
    }
}

// Logic Tombol "Enggak" Melari
const btnNo = document.getElementById('btnNo');
const btnYes = document.getElementById('btnYes');

function moveNoButton() {
    const x = Math.random() * (window.innerWidth - btnNo.offsetWidth - 50);
    const y = Math.random() * (window.innerHeight - btnNo.offsetHeight - 50);
    
    btnNo.style.position = 'fixed';
    btnNo.style.left = `${x}px`;
    btnNo.style.top = `${y}px`;
}

btnNo.addEventListener('mouseover', moveNoButton);
btnNo.addEventListener('click', moveNoButton);

// Logic Tombol "Mau Banget"
const mainPage = document.getElementById('mainPage');
const forgivePage = document.getElementById('forgivePage');
const bgMusic = document.getElementById('bgMusic');

btnYes.addEventListener('click', () => {
    mainPage.classList.add('hidden');
    forgivePage.classList.remove('hidden');

    // Putar Lagu Secara Otomatis Saat Dimaafkan
    if (bgMusic) {
        bgMusic.play().catch(error => {
            console.log("Autoplay ditolak oleh browser:", error);
        });
    }

    // Efek Kembang Api / Confetti
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
});

// Tombol Reset untuk Baca Ulang
document.getElementById('btnReset').addEventListener('click', () => {
    forgivePage.classList.add('hidden');
    mainPage.classList.remove('hidden');
    
    // Hentikan Lagu Saat Reset
    if (bgMusic) {
        bgMusic.pause();
        bgMusic.currentTime = 0;
    }

    typewriterElement.innerHTML = '';
    index = 0;
    typeWriter();
    btnNo.style.position = 'absolute';
    btnNo.style.right = '30px';
    btnNo.style.top = 'auto';
});

// Jalankan Fungsi Awal Saat Halaman Memuat
window.onload = () => {
    typeWriter();
    createFallingItems();
};