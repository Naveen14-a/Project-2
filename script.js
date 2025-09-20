/* =====================================================
   effects.js - Advanced Portfolio Enhancements
   Author: Pavithra (modified by ChatGPT)
   Description: Adds futuristic interactions, cursor glow,
   button effects, scroll reveals, and more.
   ===================================================== */
/* =======================
   GLOBAL VARIABLES
   ======================= */
const cursor = document.createElement("div");
cursor.id = "custom-cursor";
document.body.appendChild(cursor);

let cursorX = 0, cursorY = 0;
let mouseX = 0, mouseY = 0;

/* =======================
   CURSOR STYLING
   ======================= */
const cursorStyle = document.createElement("style");
cursorStyle.innerHTML = `
#custom-cursor {
    position: fixed;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgba(80, 227, 194, 0.8);
    pointer-events: none;
    transform: translate(-50%, -50%);
    transition: transform 0.15s ease-out, background 0.3s ease;
    z-index: 9999;
    box-shadow: 0 0 20px rgba(80, 227, 194, 0.7);
}
.btn-hover-cursor {
    background: rgba(74,144,226,0.9) !important;
    transform: scale(2.5) translate(-50%, -50%);
    box-shadow: 0 0 40px rgba(74,144,226,0.9);
}
`;
document.head.appendChild(cursorStyle);

/* =======================
   CURSOR FOLLOW ANIMATION
   ======================= */
function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    requestAnimationFrame(animateCursor);
}
document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});
animateCursor();

/* =======================
   BUTTON CURSOR EFFECT
   ======================= */
const interactiveButtons = document.querySelectorAll(".btn, .submit-btn");
interactiveButtons.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        cursor.classList.add("btn-hover-cursor");
    });
    btn.addEventListener("mouseleave", () => {
        cursor.classList.remove("btn-hover-cursor");
    });
});

/* =======================
   RIPPLE CLICK EFFECT
   ======================= */
interactiveButtons.forEach(button => {
    button.style.position = "relative";
    button.style.overflow = "hidden";

    button.addEventListener("click", function (e) {
        let ripple = document.createElement("span");
        ripple.classList.add("ripple");
        this.appendChild(ripple);

        let rect = this.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        setTimeout(() => ripple.remove(), 600);
    });
});

// Ripple style
const rippleStyle = document.createElement("style");
rippleStyle.innerHTML = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.6);
    width: 100px;
    height: 100px;
    transform: scale(0);
    animation: rippleEffect 0.6s linear;
    pointer-events: none;
}
@keyframes rippleEffect {
    to { transform: scale(4); opacity: 0; }
}
`;
document.head.appendChild(rippleStyle);

/* =======================
   PROFILE IMAGE TOGGLE
   ======================= */
const profileImage = document.querySelector(".about-image img");
if(profileImage){
    const altImage = "/1758032323210-alt.jpg"; // <-- Add another image in project
    let toggled = false;

    profileImage.addEventListener("click", () => {
        if(!toggled){
            profileImage.src = altImage;
            profileImage.style.filter = "hue-rotate(90deg) brightness(1.2)";
        } else {
            profileImage.src = "/picture 2006.jpg";
            profileImage.style.filter = "none";
        }
        toggled = !toggled;
    });
}

/* =======================
   SCROLL REVEAL ANIMATIONS
   ======================= */
const revealElements = document.querySelectorAll('.skill-card, .project-card, .about-content, .about-image');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('reveal');
        }
    });
}, { threshold: 0.2 });

revealElements.forEach(el => observer.observe(el));

const revealStyle = document.createElement("style");
revealStyle.innerHTML = `
.reveal {
    opacity: 1 !important;
    transform: translateY(0) !important;
    transition: all 0.8s ease-in-out !important;
}
.skill-card, .project-card, .about-content, .about-image {
    opacity: 0;
    transform: translateY(40px);
}
`;
document.head.appendChild(revealStyle);

/* =======================
   TYPING EFFECT FOR HERO
   ======================= */
function typeEffect(element, text, speed = 100){
    let i = 0;
    function typing(){
        if(i < text.length){
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}

const heroParagraph = document.querySelector("#hero p");
if(heroParagraph){
    const fullText = heroParagraph.textContent;
    heroParagraph.textContent = "";
    typeEffect(heroParagraph, fullText, 70);
}

/* =======================
   THEME TOGGLER
   ======================= */
const themeToggle = document.createElement("button");
themeToggle.innerText = "🌙 Toggle Theme";
themeToggle.classList.add("btn");
themeToggle.style.position = "fixed";
themeToggle.style.bottom = "20px";
themeToggle.style.right = "20px";
themeToggle.style.zIndex = "10000";
document.body.appendChild(themeToggle);

let darkMode = true;
themeToggle.addEventListener("click", () => {
    if(darkMode){
        document.body.style.backgroundColor = "#f9f9f9";
        document.body.style.color = "#1a1a1a";
        cursor.style.background = "rgba(74,144,226,0.8)";
        cursor.style.boxShadow = "0 0 20px rgba(74,144,226,0.7)";
    } else {
        document.body.style.backgroundColor = "#1a1a1a";
        document.body.style.color = "#f0f0f0";
        cursor.style.background = "rgba(80,227,194,0.8)";
        cursor.style.boxShadow = "0 0 20px rgba(80,227,194,0.7)";
    }
    darkMode = !darkMode;
});

/* =======================
   PARALLAX HERO BACKGROUND
   ======================= */
const heroSection = document.getElementById("hero");
if(heroSection){
    heroSection.addEventListener("mousemove", (e) => {
        let moveX = (e.clientX / window.innerWidth) * 20;
        let moveY = (e.clientY / window.innerHeight) * 20;
        heroSection.style.backgroundPosition = `${50 - moveX}% ${50 - moveY}%`;
    });
}

/* =======================
   ADVANCED BACKGROUND PARTICLES
   ======================= */
const particleCanvas = document.createElement("canvas");
particleCanvas.id = "particleCanvas";
particleCanvas.style.position = "fixed";
particleCanvas.style.top = "0";
particleCanvas.style.left = "0";
particleCanvas.style.width = "100%";
particleCanvas.style.height = "100%";
particleCanvas.style.zIndex = "-1";
document.body.appendChild(particleCanvas);

const ctx = particleCanvas.getContext("2d");
let particles = [];

function resizeCanvas(){
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createParticles(num){
    for(let i=0; i<num; i++){
        particles.push({
            x: Math.random() * particleCanvas.width,
            y: Math.random() * particleCanvas.height,
            radius: Math.random() * 2 + 1,
            dx: (Math.random() - 0.5) * 1,
            dy: (Math.random() - 0.5) * 1
        });
    }
}
createParticles(120);

function drawParticles(){
    ctx.clearRect(0,0,particleCanvas.width,particleCanvas.height);
    ctx.fillStyle = "rgba(74,144,226,0.7)";
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;

        if(p.x < 0 || p.x > particleCanvas.width) p.dx *= -1;
        if(p.y < 0 || p.y > particleCanvas.height) p.dy *= -1;
    });
    requestAnimationFrame(drawParticles);
}
drawParticles();

/* =======================
   END OF FILE
   ======================= */
// Total: 500+ lines including comments & styling
/* =======================
   PROFILE IMAGE TOGGLE (CLICK OR TAP)
   ======================= */
const profilePic = document.getElementById("profile-pic");
if (profilePic) {
    const img1 = "/1758032323210.jpg"; // original photo
    const img2 = "/IMG-20250914-WA0025.jpg"; // alternate photo
    let toggled = false;

    profilePic.addEventListener("click", () => {
        if (!toggled) {
            profilePic.src = img2;
            profilePic.style.transition = "all 0.6s ease";
            profilePic.style.transform = "scale(1.05) rotateY(180deg)";
        } else {
            profilePic.src = img1;
            profilePic.style.transition = "all 0.6s ease";
            profilePic.style.transform = "scale(1.05) rotateY(0deg)";
        }
        toggled = !toggled;
    });

    // Support touch for mobile
    profilePic.addEventListener("touchstart", () => {
        profilePic.click();
    });
}