document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.side-menu');
    const closeBtn = document.querySelector('.close-menu');
    
    // Создаем оверлей с анимацией
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
    
    // Плавное открытие меню
    menuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        menu.classList.add('active');
        overlay.classList.add('active');
        document.documentElement.style.scrollBehavior = 'smooth';
        document.body.style.overflow = 'hidden';
    });
    
    // Улучшенная функция закрытия
    function closeMenu() {
        menu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            document.documentElement.style.scrollBehavior = '';
        }, 300);
    }
    
    // Обработчики закрытия
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    
    // Закрытие по Escape с анимацией
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Плавный скролл для пунктов меню
    document.querySelectorAll('.side-menu-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            closeMenu();
            setTimeout(() => {
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 300);
        });
    });
});
document.querySelectorAll('.side-menu-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Если это внутренняя ссылка (не якорь)
        if (href.includes('.html')) {
            window.location.href = href; // Простой переход
            return;
        }

        // Для якорных ссылок (плавный скролл)
        e.preventDefault();
        closeMenu();
        setTimeout(() => {
            document.querySelector(href)?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 300);
    });
});

