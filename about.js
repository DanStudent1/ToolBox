document.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.about-hero');
    const sectionHeight = heroSection.offsetHeight;
    const scrollY = window.scrollY;
    const sectionTop = heroSection.offsetTop;

    // Проверка, находится ли прокрутка внутри секции
    if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
        const relativeScrollY = scrollY - sectionTop; // Позиция прокрутки внутри секции
        const parallaxOffset = (relativeScrollY / sectionHeight) * 100; // Процент смещения
        heroSection.style.backgroundPositionY = `${Math.min(parallaxOffset, 100)}%`; // Ограничение до 100%
    }
});
