const progressPercentages = { 1: 0, 2: 33, 3: 66, 4: 100 };

function goToStep(currentStep, nextStep) {
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    document.getElementById(`step-${nextStep}`).classList.add('active');
    document.getElementById(`node-${nextStep}`).classList.add('active');
    document.getElementById('progress-fill-bar').style.width = progressPercentages[nextStep] + '%';
}

function checkAnswer(status, questionId, currentStep, nextStep) {
    const errorElement = document.getElementById(`error-${questionId}`);
    
    if (status === 'correct') {
        errorElement.textContent = "";
        goToStep(currentStep, nextStep);
    } else {
        if (questionId === 'q1') {
            errorElement.innerHTML = "Aww nice try! But it's way more than just that... Try again! 😍";
        } else {
            errorElement.innerHTML = "Think again, you're closer than you think! 🐺✨";
        }
    }
}

function runAwayButton() {
    const noBtn = document.getElementById('no-btn');
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 50);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 50);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
}

function showCongratulations() {
    document.getElementById('app-wrapper').style.display = 'none';
    const congratsPage = document.getElementById('congratulations-screen');
    congratsPage.style.display = 'flex';
    createRainStream(120);
}

let particleTimer;
function createRainStream(frequency = 400) {
    if (particleTimer) clearInterval(particleTimer);
    
    const zone = document.getElementById('decorations-container');
    const visualPool = ['🌸', '💖', '✨', '🎈', '❤️', '🌹'];
    
    particleTimer = setInterval(() => {
        const item = document.createElement('div');
        item.classList.add('floating-item');
        
        item.innerText = visualPool[Math.floor(Math.random() * visualPool.length)];
        item.style.left = Math.random() * 100 + 'vw';
        item.style.fontSize = Math.random() * (32 - 14) + 14 + 'px';
        item.style.animationDuration = Math.random() * (6 - 3) + 3 + 's';
        
        zone.appendChild(item);
        
        setTimeout(() => { item.remove(); }, 6000);
    }, frequency);
}

window.onload = () => {
    createRainStream(400);
    
    document.getElementById('congratulations-screen').addEventListener('click', () => {
        createRainStream(40);
        setTimeout(() => { createRainStream(150); }, 2500);
    });
};