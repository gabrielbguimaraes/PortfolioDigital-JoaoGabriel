document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.getElementById('navLinks');
    const menuIcon = document.querySelector('.menu-icon');
    const initialTerminalScreen = document.getElementById('initial-terminal-screen');
    const typedTextElement = document.getElementById('typed-text');
    const blinkingCursor = document.getElementById('blinking-cursor');
    const portfolioSectionsContainer = document.getElementById('portfolio-sections');
    const logoAnimationTextElement = document.getElementById('logoAnimationText'); // Elemento para animação da logo
    const logoImgElement = document.querySelector('.navbar .logo-img'); // A imagem da logo

    const textToType = "Olá, Gabriel Guimarães aqui.";
    let charIndex = 0;
    const typingSpeed = 100;
    const fadeOutDelay = 1000;

    const welcomeText = "Seja bem-vindo!"; // Texto padrão
    const nameText = "Gabriel Guimarães"; // Texto no hover da logo

    let currentLogoText = welcomeText;
    let logoCharIndex = 0;
    const logoTypingSpeed = 80;
    let logoAnimationTimeout;
    let isLogoHovered = false; // Estado do hover da logo

    // --- Funções Comuns ---

    // Função para alternar o menu em mobile
    window.toggleMenu = function() {
        navLinks.classList.toggle('active');
    };

    // Função para mostrar/esconder seções
    function showSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (!targetSection) {
            console.error(`Seção com ID "${sectionId}" não encontrada.`);
            return;
        }

        const sections = portfolioSectionsContainer.querySelectorAll('.page-section');
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.add('active-section');
                section.classList.remove('hidden-section');
            } else {
                section.classList.remove('active-section');
                section.classList.add('hidden-section');
            }
        });

        // Rola para a seção ativa no container #portfolio-sections
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Inicia ou reseta a animação da logo (apenas o texto padrão "Seja bem-vindo!")
        if (!isLogoHovered) { // Se não estiver em hover, mostra o texto padrão
            currentLogoText = welcomeText;
            startLogoTextAnimation();
        }
    }

    // --- Lógica de Animação Inicial e SPA ---

    // Animação de digitação principal
    function typeWriter() {
        if (charIndex < textToType.length) {
            typedTextElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            typedTextElement.classList.add('typed');
            blinkingCursor.style.display = 'none';

            setTimeout(() => {
                initialTerminalScreen.classList.add('fade-out');
                initialTerminalScreen.addEventListener('transitionend', () => {
                    initialTerminalScreen.style.display = 'none';
                    showSection('home'); // Isso também vai acionar startLogoTextAnimation com welcomeText
                }, { once: true });
            }, fadeOutDelay);
        }
    }

    // Animação de texto da logo (agora usa 'currentLogoText')
    function animateLogoText() {
        if (logoCharIndex < currentLogoText.length) {
            logoAnimationTextElement.textContent += currentLogoText.charAt(logoCharIndex);
            logoAnimationTextElement.classList.remove('typed'); // Garante que o cursor pisque
            logoAnimationTimeout = setTimeout(animateLogoText, logoTypingSpeed);
            logoCharIndex++;
        } else {
            logoAnimationTextElement.classList.add('typed'); // Remove cursor ao finalizar digitação
            // Reinicia a animação após um tempo se for o texto padrão
            if (currentLogoText === welcomeText && !isLogoHovered) {
                setTimeout(() => {
                    logoAnimationTextElement.textContent = '';
                    logoCharIndex = 0;
                    logoAnimationTextElement.classList.remove('typed');
                    animateLogoText();
                }, 3000);
            }
        }
    }

    function startLogoTextAnimation() {
        if (logoAnimationTextElement) {
            clearTimeout(logoAnimationTimeout); // Limpa qualquer animação anterior
            logoAnimationTextElement.textContent = ''; // Limpa o texto
            logoCharIndex = 0; // Reseta o índice
            logoAnimationTextElement.classList.remove('typed');
            // Remove a classe name-visible se estiver ativa (para o texto padrão)
            logoAnimationTextElement.classList.remove('name-visible');
            logoAnimationTextElement.classList.add('visible'); // Mostra o elemento
            animateLogoText(); // Inicia a digitação
        }
    }

    function stopLogoTextAnimation() {
        clearTimeout(logoAnimationTimeout);
        if (logoAnimationTextElement) {
            logoAnimationTextElement.classList.remove('visible');
            logoAnimationTextElement.textContent = '';
            logoCharIndex = 0;
            logoAnimationTextElement.classList.remove('typed');
            logoAnimationTextElement.classList.remove('name-visible'); // Garante que a classe name-visible seja removida
        }
    }

    // --- Lógica de Hover da Logo para exibir nome ---
    if (logoImgElement && logoAnimationTextElement) {
        logoImgElement.addEventListener('mouseenter', () => {
            isLogoHovered = true;
            clearTimeout(logoAnimationTimeout);
            logoAnimationTextElement.textContent = '';
            logoCharIndex = 0;
            logoAnimationTextElement.classList.remove('typed');
            logoAnimationTextElement.classList.add('visible');
            logoAnimationTextElement.classList.add('name-visible'); // Adiciona classe para estilo do nome
            currentLogoText = nameText; // Define o texto para o nome
            animateLogoText();
        });

        logoImgElement.addEventListener('mouseleave', () => {
            isLogoHovered = false;
            clearTimeout(logoAnimationTimeout);
            logoAnimationTextElement.textContent = '';
            logoCharIndex = 0;
            logoAnimationTextElement.classList.remove('typed');
            logoAnimationTextElement.classList.remove('name-visible'); // Remove a classe de estilo do nome
            logoAnimationTextElement.classList.remove('visible'); // Esconde ao sair

            // Após um pequeno delay, reinicia a animação padrão se não estiver em hover novamente
            setTimeout(() => {
                if (!isLogoHovered) {
                    currentLogoText = welcomeText;
                    startLogoTextAnimation();
                }
            }, 500); // Meio segundo de delay para reiniciar
        });
    }


    // Lida com a navegação interna da SPA
    document.querySelectorAll('.nav-link-internal').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = e.target.dataset.section;
            if (sectionId) {
                history.pushState({ section: sectionId }, '', `#${sectionId}`);
                showSection(sectionId);
            }
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Lida com o histórico do navegador (botão voltar/avançar)
    window.addEventListener('popstate', (event) => {
        const sectionId = (event.state && event.state.section) ? event.state.section : 'home';
        showSection(sectionId);
    });

    // Interação do Fundo (Parallax) com o Scroll
    portfolioSectionsContainer.addEventListener('scroll', () => {
        const scrollY = portfolioSectionsContainer.scrollTop;
        document.body.style.backgroundPosition = `-${scrollY * 0.05}px -${scrollY * 0.05}px`;
    });


    // --- Lógica do Carrossel de Tecnologias ---
    const techCarouselInner = document.querySelector('.tech-carousel-inner');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');

    let currentIndex = 0;
    const itemsPerView = () => {
        if (window.innerWidth <= 576) return 1;
        if (window.innerWidth <= 767) return 2; // Duas colunas em mobile grande/tablet pequeno
        if (window.innerWidth <= 1024) return 3; // Três colunas em laptops
        return 4; // Quatro colunas em desktop
    };

    function updateCarousel() {
        if (!techCarouselInner) return;

        // Calcular total de itens visíveis com base na largura atual
        const currentItemsPerView = itemsPerView();
        const totalItems = techCarouselInner.children.length; // Número total de itens no carrossel

        // MaxIndex é o último índice de slide possível
        // Ex: 21 itens, 4 por vez -> (21 / 4) = 5.25 -> ceil = 6. 6-1 = 5. (Índices 0 a 5)
        // Isso permite que o último slide mostre menos itens se não completar a linha.
        const maxIndex = Math.max(0, Math.ceil(totalItems / currentItemsPerView) - 1);

        // Ajustar currentIndex se ele for além do limite (acontece ao redimensionar)
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        if (currentIndex < 0) {
            currentIndex = 0; // Não permitir ir abaixo de 0
        }

        const offset = -currentIndex * (100 / currentItemsPerView);
        techCarouselInner.style.transform = `translateX(${offset}%)`;
        console.log(`Carousel: currentIdx=${currentIndex}, totalItems=${totalItems}, itemsPerView=${currentItemsPerView}, maxIdx=${maxIndex}, offset=${offset}%`); // Debugging
    }

    if (prevButton && nextButton && techCarouselInner) {
        prevButton.addEventListener('click', () => {
            currentIndex--;
            updateCarousel();
        });

        nextButton.addEventListener('click', () => {
            currentIndex++;
            updateCarousel();
        });

        // Ouve o redimensionamento da janela para recalcular e atualizar
        window.addEventListener('resize', () => {
            // Não resetamos o currentIndex aqui para a UX, mas ajustamos ele dentro de updateCarousel
            updateCarousel();
        });

        // Inicializa o carrossel
        updateCarousel();
    }


    // --- Inicialização ---

    // Esconder todas as seções, exceto a tela de terminal, ao carregar
    portfolioSectionsContainer.querySelectorAll('.page-section').forEach(section => {
        section.classList.add('hidden-section');
    });

    // Inicia a animação de digitação
    typeWriter();

});