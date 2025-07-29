// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos do DOM
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('back-to-top');
    const sections = document.querySelectorAll('section');
    const techCards = document.querySelectorAll('.tech-card');
    const skillBadges = document.querySelectorAll('.skill-badge');
    const contactItems = document.querySelectorAll('.contact-item');
    const socialLinks = document.querySelectorAll('.social-link');

    // ===== NAVEGAÇÃO E MENU MOBILE =====
    
    // Toggle do menu mobile
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Fechar menu mobile ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Fechar menu mobile ao clicar fora dele
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // ===== SCROLL EFFECTS =====
    
    // Navbar transparente/opaca baseada no scroll
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    }

    // Botão voltar ao topo
    function updateBackToTop() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    // Event listener para scroll
    window.addEventListener('scroll', function() {
        updateNavbar();
        updateBackToTop();
        updateActiveNavLink();
        animateOnScroll();
    });

    // Clique no botão voltar ao topo
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== NAVEGAÇÃO ATIVA =====
    
    // Atualizar link ativo baseado na seção visível
    function updateActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // ===== ANIMAÇÕES DE SCROLL =====
    
    // Intersection Observer para animações
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.tech-card, .skill-badge, .contact-item, .about-text p');
    animatedElements.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });

    // Animação manual para elementos específicos
    function animateOnScroll() {
        const scrolled = window.scrollY;
        const rate = scrolled * -0.5;
        
        // Parallax suave no hero
        const hero = document.querySelector('.hero');
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    }

    // ===== EFEITOS INTERATIVOS =====
    
    // Efeito de hover nas tech cards
    techCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Efeito de hover nas skill badges
    skillBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Efeito de hover nos contact items
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(15px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });

    // ===== EFEITOS DE CURSOR =====
    
// Removido código do cursor personalizado

    // ===== EFEITOS DE TYPING =====
    
    // Efeito de digitação no título
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Aplicar efeito de digitação quando a seção hero estiver visível
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        
        // Observer para o hero
        const heroObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        typeWriter(heroTitle, originalText, 50);
                    }, 500);
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        heroObserver.observe(document.querySelector('.hero'));
    }

    // ===== PARTÍCULAS DE FUNDO =====
    
    // Criar partículas flutuantes
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        
        document.body.appendChild(particlesContainer);
        
        // Criar partículas individuais
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(139, 92, 246, 0.3);
                border-radius: 50%;
                animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 10}s;
            `;
            
            particlesContainer.appendChild(particle);
        }
        
        // CSS para animação das partículas
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float-particle {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Criar partículas apenas em desktop
    if (window.innerWidth > 768) {
        createParticles();
    }

    // ===== SMOOTH SCROLL PERSONALIZADO =====
    
    // Scroll suave para links internos
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Altura da navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== LAZY LOADING DE IMAGENS =====
    
    // Lazy loading para imagens
    // const images = document.querySelectorAll('img');
    // const imageObserver = new IntersectionObserver(function(entries) {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             const img = entry.target;
    //             img.style.opacity = '0';
    //             img.style.transition = 'opacity 0.5s ease';
                
    //             img.onload = function() {
    //                 img.style.opacity = '1';
    //             };
                
    //             imageObserver.unobserve(img);
    //         }
    //     });
    // });
    
    // images.forEach(img => imageObserver.observe(img));

    // ===== PERFORMANCE E OTIMIZAÇÕES =====
    
    // Throttle para eventos de scroll
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Aplicar throttle aos eventos de scroll
    window.addEventListener('scroll', throttle(function() {
        updateNavbar();
        updateBackToTop();
        updateActiveNavLink();
    }, 16)); // ~60fps

    // ===== RESPONSIVIDADE =====
    
    // Ajustar comportamentos baseados no tamanho da tela
    function handleResize() {
        const isMobile = window.innerWidth <= 768;
        
        // Remover cursor personalizado em mobile
        if (isMobile) {
            cursor.style.display = 'none';
        } else {
            cursor.style.display = 'block';
        }
        
        // Fechar menu mobile se a tela aumentar
        if (!isMobile && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    window.addEventListener('resize', throttle(handleResize, 250));

    // ===== INICIALIZAÇÃO =====
    
    // Executar funções iniciais
    updateNavbar();
    updateBackToTop();
    updateActiveNavLink();
    handleResize();
    
    // Adicionar classe loaded ao body após carregamento
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // ===== EASTER EGGS =====
    
    // Konami Code easter egg
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Ativar modo rainbow
            document.body.style.animation = 'rainbow 2s infinite';
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            
            setTimeout(() => {
                document.body.style.animation = '';
                style.remove();
            }, 5000);
            
            konamiCode = [];
        }
    });

    // Console message
    console.log('%c🚀 Portfólio desenvolvido por Matheus Lino', 'color: #8b5cf6; font-size: 16px; font-weight: bold;');
    console.log('%c💜 Feito com HTML, CSS e JavaScript puro', 'color: #a855f7; font-size: 12px;');
    
});

// ===== FUNÇÕES UTILITÁRIAS =====

// Função para detectar se o elemento está visível
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Função para animar números (contador)
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Função para gerar cor aleatória neon
function getRandomNeonColor() {
    const colors = [
        '#8b5cf6', '#a855f7', '#c084fc', '#e879f9',
        '#f472b6', '#fb7185', '#f87171', '#fbbf24'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

