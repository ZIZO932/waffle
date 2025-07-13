document.addEventListener('DOMContentLoaded', function() {
    initPage();
    
    if (document.querySelector('.hero')) {
        const randomIndex = Math.floor(Math.random() * 3);
        changeBackgroundImage(randomIndex);
        
        startImageRotation(randomIndex);
    }
    
    checkSeasonMode();
});

function initPage() {
    if (document.querySelector('.legends-page')) {
        calculateTotalPower();
        initTooltips();
    }
    
    addEventListeners();
}

function addEventListeners() {
    const exploreButton = document.querySelector('.hero .cta-button');
    if (exploreButton) {
        exploreButton.addEventListener('click', scrollToFeatures);
    }
}

function checkSeasonMode() {
    const seasonEnabled = localStorage.getItem('seasonMode') === 'autumn';
    if (seasonEnabled) {
        document.body.classList.add('autumn-mode');
        
        const button = document.querySelector('.world-toggle .toggle-button');
        if (button) {
            button.textContent = 'Spring Season';
            document.querySelector('#world .feature-showcase-text').textContent = 'AUTUMN COLORS';
        }
        
        const headerButton = document.querySelector('.season-toggle-btn');
        if (headerButton) {
            headerButton.textContent = 'Spring Season';
        }
    }
}

function scrollToFeatures() {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function startImageRotation(startIndex = 0) {
    let currentImageIndex = startIndex;
    
    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % 3;
        changeBackgroundImage(currentImageIndex);
    }, 5000);
}

function toggleSeasons() {
    document.body.classList.toggle('autumn-mode');
    const seasonEnabled = document.body.classList.contains('autumn-mode');
    
    localStorage.setItem('seasonMode', seasonEnabled ? 'autumn' : 'spring');
    
    const button = document.querySelector('.world-toggle .toggle-button');
    if (button) {
        if (seasonEnabled) {
            button.textContent = 'Spring Season';
            document.querySelector('#world .feature-showcase-text').textContent = 'AUTUMN COLORS';
        } else {
            button.textContent = 'Autumn Season';
            document.querySelector('#world .feature-showcase-text').textContent = 'SPRING BLOSSOMS';
        }
    }
    
    const headerButton = document.querySelector('.season-toggle-btn');
    if (headerButton) {
        if (seasonEnabled) {
            headerButton.textContent = 'Spring Season';
        } else {
            headerButton.textContent = 'Autumn Season';
        }
    }
}

function calculateTotalPower() {
    const characters = document.querySelectorAll('.character');
    let total = 0;
    
    characters.forEach(character => {
        const power = parseInt(character.getAttribute('data-power'));
        total += power;
    });
    
    const totalPowerElement = document.getElementById('total-power');
    if (totalPowerElement) {
        animateCounter(totalPowerElement, 0, total, 2000);
    }
}

function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    
    function step(timestamp) {
        if (!startTimestamp) startTimestamp = timestamp;
        
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        
        element.textContent = currentValue;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = end;
        }
    }
    
    window.requestAnimationFrame(step);
}

function changeBackgroundImage(index) {
    const hero = document.querySelector('.hero');
    if (hero) {
        const images = [
            'images/ghost b.jpg',
            'images/ghost b2.jpg',
            'images/ghost b3.jpg'
        ];
        
        hero.style.backgroundImage = `linear-gradient(to right, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.4)), url('${images[index % images.length]}')`;
    }
}