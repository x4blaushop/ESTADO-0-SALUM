const canvas = document.getElementById("portalCanvas");
const ctx = canvas.getContext("2d");
let w, h, particles = [];
const dnaChars = "X4C3DNA77701".split(""); 

function init() {
    // Captura a largura e altura exata da tela atual
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = [];
    
    // Densidade inteligente: mais partículas em telas maiores
    const particleCount = Math.floor((w * h) / 1000); 
    const limitCount = Math.min(Math.max(particleCount, 800), 2000);

    for(let i = 0; i < limitCount; i++) { 
        particles.push({
            r: Math.random() * Math.max(w, h),
            angle: Math.random() * Math.PI * 2,
            speed: 0.003 + Math.random() * 0.002,
            size: Math.random() * (w < 600 ? 10 : 15) + 8, // Letras menores no celular, maiores no PC
            c: dnaChars[Math.floor(Math.random() * dnaChars.length)]
        });
    }
}

function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
    ctx.fillRect(0, 0, w, h);
    
    // Pega a cor definida no CSS (Verde, Azul, etc)
    const themeColor = getComputedStyle(document.body).color;

    particles.forEach(p => {
        p.angle += p.speed;
        p.r -= 3; // Velocidade de sucção para o centro
        
        // Reset da partícula quando atinge o centro (Buraco Negro)
        if(p.r < 40) {
            p.r = Math.max(w, h) * 0.9;
        }

        // Cálculo trigonométrico para manter o círculo perfeito em qualquer tela
        const x = w / 2 + Math.cos(p.angle) * p.r;
        const y = h / 2 + Math.sin(p.angle) * p.r;

        ctx.fillStyle = themeColor;
        ctx.font = p.size + "px monospace";
        ctx.shadowBlur = 8;
        ctx.shadowColor = themeColor;
        ctx.fillText(p.c, x, y);
    });

    // O Núcleo da Porta
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 50, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.strokeStyle = themeColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    requestAnimationFrame(draw);
}

// Recalibra tudo se o usuário girar o celular ou redimensionar a janela do PC
window.addEventListener("resize", () => {
    init();
});

init();
draw();
