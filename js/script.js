document.addEventListener('DOMContentLoaded', () => {

    // LOGO HOVER
    const logoContainer = document.querySelector('.logo-container');
    logoContainer.addEventListener('mouseenter', () => {
        logoContainer.style.transform = 'translateY(-8px) rotate(2deg)';
    });

    logoContainer.addEventListener('mouseleave', () => {
        logoContainer.style.transform = 'translateY(-5px)';
    });

    // RIPPLE SIN BLOQUEAR NAVEGACIÓN
    document.querySelectorAll('.exercise-card').forEach(card => {
        card.addEventListener('click', function (e) {

            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);

            ripple.style.cssText = `
                position:absolute;
                width:${size}px;
                height:${size}px;
                left:${e.offsetX - size / 2}px;
                top:${e.offsetY - size / 2}px;
                background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
                border-radius:50%;
                transform:scale(0);
                animation:ripple 0.5s linear;
                pointer-events:none;
            `;

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 500);

            // feedback visual
            this.style.transform = "scale(0.97)";
        });
    });

    // SCROLL WATERMARK
    window.addEventListener('scroll', () => {
        document.getElementById('watermark').style.transform =
            `translateY(${window.scrollY * 0.3}px)`;
    });

    // EASTER EGG
    let clicks = 0;
    document.getElementById('logo').addEventListener('dblclick', () => {
        clicks++;
        if (clicks === 3) {
            showEasterEgg();
            clicks = 0;
        }
    });

    initParticles();
});

// PARTICULAS OPTIMIZADAS
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    const particles = [];
    const count = innerWidth < 768 ? 40 : 80;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3;
            this.vx = Math.random() * 0.5 - 0.25;
            this.vy = Math.random() * 0.5 - 0.25;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.fillStyle = "rgba(255,255,255,0.2)";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// EASTER EGG
function showEasterEgg() {
    const div = document.createElement('div');

    div.innerHTML = `
        <div style="
            position:fixed;
            top:50%;
            left:50%;
            transform:translate(-50%,-50%);
            background:linear-gradient(45deg,#ff6b6b,#4ecdc4);
            padding:30px;
            border-radius:20px;
            color:white;
            font-weight:bold;
            z-index:10000;
        ">
            🎉 Modo Pro Activado 🎉
        </div>
    `;

    document.body.appendChild(div);

    setTimeout(() => div.remove(), 2500);
}

window.addEventListener('resize', () => {
    const canvas = document.getElementById('particles-canvas');
    canvas.width = innerWidth;
    canvas.height = innerHeight;
})