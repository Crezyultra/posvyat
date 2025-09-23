// Инициализация AOS для анимаций при скролле
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
});

// Прелоадер
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    setTimeout(function() {
        preloader.style.opacity = '0';
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    }, 1500); // Минимальное время показа прелоадера
});

// Управление звуком
let soundEnabled = localStorage.getItem('soundEnabled') === 'true';
let sound;

// Инициализация звука
function initSound() {
    sound = new Howl({
        src: ['assets/audio/OLIGARKH_-_Forgive_Us.mp3'], // Замените на ваш аудиофайл
        loop: true,
        volume: 0.5,
        onplayerror: function() {
            console.log('Ошибка воспроизведения звука');
            // Если звук не может быть воспроизведен, отключаем функционал
            document.getElementById('sound-toggle').style.display = 'none';
        }
    });
    
    // Воспроизводим звук если он был включен ранее
    if (soundEnabled) {
        sound.play();
        updateSoundButton(true);
    } else {
        updateSoundButton(false);
    }
}

// Обновление кнопки звука
function updateSoundButton(enabled) {
    const soundToggle = document.getElementById('sound-toggle');
    const icon = soundToggle.querySelector('i');
    
    if (enabled) {
        icon.className = 'fas fa-volume-up';
        soundToggle.style.borderColor = '#ff00ff';
    } else {
        icon.className = 'fas fa-volume-mute';
        soundToggle.style.borderColor = '#00ffff';
    }
}

// Обработчик клика по кнопке звука
document.getElementById('sound-toggle').addEventListener('click', function() {
    soundEnabled = !soundEnabled;
    localStorage.setItem('soundEnabled', soundEnabled);
    
    if (soundEnabled) {
        sound.play();
    } else {
        sound.pause();
    }
    
    updateSoundButton(soundEnabled);
});

// Инициализируем звук после загрузки страницы
window.addEventListener('load', initSound);

// Таймер обратного отсчета
function updateCountdown() {
    const eventDate = new Date('October 25, 2025 18:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;
    
    if (distance < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Обновляем таймер каждую секунду
setInterval(updateCountdown, 1000);
updateCountdown(); // Первоначальный вызов

// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});