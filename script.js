const canvas = document.getElementById("portalCanvas");
const ctx = canvas.getContext("2d");
let w, h, particles = [];
const dnaChars = "X4C3DNA77701".split(""); 

function init() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = [];
    
    // Cálculo de densidade responsiva para PC e Celular
    const area = w * h;
    const particleCount = Math.floor(area / 1100);
    const finalCount = Math.min(Math.max(particleCount, 700), 1800);

    for(let i = 0; i < finalCount; i++) { 
        particles.push({
            r: Math.random() * Math.max(w, h),
            angle: Math.random() * Math.PI * 2,
            speed: 0.003 + Math.random() * 0.003,
            size: Math.random() * (w < 600 ? 10 : 16) + 7,
            c: dnaChars[Math.floor(Math.random() * dnaChars.length)]
        });
    }
}

function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
    ctx.fillRect(0, 0, w, h);
    
    const themeColor = getComputedStyle(document.body).color;

    particles.forEach(p => {
        p.angle += p.speed;
        p.r -= 2.5; 
        
        if(p.r < 40) {
            p.r = Math.max(w, h) * 0.9;
        }

        const x = w / 2 + Math.cos(p.angle) * p.r;
        const y = h / 2 + Math.sin(p.angle) * p.r;

        ctx.fillStyle = themeColor;
        ctx.font = p.size + "px monospace";
        ctx.shadowBlur = 5;
        ctx.shadowColor = themeColor;
        ctx.fillText(p.c, x, y);
    });

    // Centro Soberano
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 50, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.strokeStyle = themeColor;
    ctx.lineWidth = 1;
    ctx.stroke();

    requestAnimationFrame(draw);
}

window.addEventListener("resize", () => {
    init();
});

init();
draw();
