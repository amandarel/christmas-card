document.addEventListener('DOMContentLoaded', () => {
    createSnow();
});

const giftBox = document.getElementById('giftBox');
const card = document.getElementById('christmasCard');
const snowContainer = document.getElementById('snow-container');
const audio = document.getElementById('bgMusic'); // Ambil elemen audio

giftBox.addEventListener('click', openGift);

function createSnow() {
    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.style.left = Math.random() * 100 + 'vw';
        const size = Math.random() * 3 + 2;
        snowflake.style.width = size + 'px';
        snowflake.style.height = size + 'px';
        snowflake.style.animationDuration = Math.random() * 5 + 5 + 's';
        snowflake.style.animationDelay = Math.random() * 5 + 's';
        snowContainer.appendChild(snowflake);
    }
}

function openGift(e) {
    createParticles(e.clientX, e.clientY);

    giftBox.style.transition = "transform 0.5s, opacity 0.5s";
    giftBox.style.transform = "scale(0) rotate(180deg)";
    giftBox.style.opacity = "0";

    setTimeout(() => {
        giftBox.style.display = 'none';
        card.classList.remove('hidden');
        card.classList.add('active');
        
        // --- MULAI MUSIK DI SINI ---
        audio.volume = 0.5; // Atur volume 50% agar tidak kaget
        audio.play().catch(error => {
            console.log("Autoplay dicegah oleh browser, tapi karena klik harusnya aman.");
        });

    }, 500);
}

function resetGift() {
    card.classList.remove('active');
    
    // --- HENTIKAN MUSIK DI SINI ---
    audio.pause();
    audio.currentTime = 0; // Reset lagu ke awal
    
    setTimeout(() => {
        card.classList.add('hidden');
        giftBox.style.display = 'block';
        
        setTimeout(() => {
            giftBox.style.transform = "scale(1) rotate(0deg)";
            giftBox.style.opacity = "1";
        }, 50);
        
    }, 500);
}

function createParticles(x, y) {
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        document.body.appendChild(particle);
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        const tx = (Math.random() - 0.5) * 200;
        const ty = (Math.random() - 0.5) * 200;
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        const colors = ['#f1c40f', '#ffffff', '#e74c3c'];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}