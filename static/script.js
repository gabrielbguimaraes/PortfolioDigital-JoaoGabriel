document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.getElementById('navLinks');
    const menuIcon = document.querySelector('.menu-icon');
    const initialTerminalScreen = document.getElementById('initial-terminal-screen');
    const typedTextElement = document.getElementById('typed-text');
    const blinkingCursor = document.getElementById('blinking-cursor');
    const portfolioSectionsContainer = document.getElementById('portfolio-sections');
    const logoAnimationTextElement = document.getElementById('logoAnimationText');
    const logoImgElement = document.querySelector('.navbar .logo-img');

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

    // --- Dados dos Projetos para o Modal (EXEMPLOS - PREENCHA COM SEUS DADOS REAIS) ---
    const projectDetails = {
        "smart-farming": {
            title: "Smart Farming",
            year: "2024-1",
            partner: "i9 FATEC",
            description: "Em 2024-1 desenvolvemos este projeto que se trata de um website para a leitura e armazenamento de dados da estufa inteligente do Project Smart Farming, que analisa os dados sobre umidade ambiente, umidade do solo, temperatura ambiente e volume da água, usando-os como base para a geração de gráficos e médias diárias, possibilitando uma melhor administração e monitoria da estufa.",
            technologies: "HTML5, CSS3, JavaScript, VS Code, GitHub, Flask, MySQL, Figma, Jira",
            contributions: "Desenvolvedor: Atuei na criação da iteração do calendário anual para integração com o efeito carrossel da aplicação, assim como o detalhamento dos dados ao clicar no dia. Também atuei no desenvolvimento do sistema de filtro por dias na seção de analytics da aplicação.",
            hardSkills: "HTML5, CSS3, JavaScript, VS Code, GitHub, Flask, MySQL, Figma, Jira",
            softSkills: "Durante o desenvolvimento, tivemos como obstáculo a adaptação do processo de desenvolvimento ágil no desenvolvimento de software e principalmente na arquitetura necessária, como DoR e DoD das tarefas que não estavam bem definidas, e para contornar desenvolvemos a proatividade do grupo em visualizar a nossa dificuldade em reuniões e reestruturar nosso projeto com a ajuda e orientação dos professores.",
            repoLink: "[https://github.com/BugBustersFatecSJC/Smart-farm](https://github.com/BugBustersFatecSJC/Smart-farm)"
        },
        "automatizacao-backups": {
            title: "Automatização de Backups",
            year: "2024-1",
            partner: "DEEPESG",
            description: "Realizei a automatização de backups de empresa criando um script que acessava a API da Oracle Cloud infrastructure e enviava toda semana um email informando se a verificação foi realizada e quais empresas foram verificadas.",
            technologies: "Python, Oracle Cloud Infrastructure (OCI) API, E-mail Automation",
            contributions: "Desenvolvimento e implementação do script Python, configuração de agendamento, testes e monitoramento.",
            hardSkills: "Python, APIs REST, Automação",
            softSkills: "Resolução de Problemas, Atenção a Detalhes"
        },
        "one-piece-dev": {
            title: "Projeto Dev Web (One Piece)",
            year: "2024-1",
            partner: "FATEC",
            description: "Criei um site de tema livre com o tema de uma página para os fãs de One Piece e criei um banco de dados para o cadastro de usuários e a conteinerização da aplicação utilizando Docker e Docker Compose, garantindo um ambiente de desenvolvimento e deploy robusto e portátil.",
            technologies: "HTML, CSS, JavaScript, Docker, Docker Compose, MySQL",
            contributions: "Design e desenvolvimento front-end e back-end, modelagem do banco de dados, conteinerização da aplicação.",
            hardSkills: "Web Development, Docker, Bancos de Dados",
            softSkills: "Criatividade, Gerenciamento de Projeto Básico",
            repoLink: "[https://github.com/gabrielbguimaraes/dev_web_JGBG](https://github.com/gabrielbguimaraes/dev_web_JGBG)"
        },
        "inv-sort": {
            title: "Inv. Sort",
            year: "2024-1",
            partner: "FATEC",
            description: "Participei de um projeto chamado Inv.Sort, uma solução moderna para gerenciamento de inventários. Utilizando Node.js, React e AWS, o sistema automatiza o controle de estoque com interface intuitiva, permitindo rastreamento eficiente e geração de relatórios. O projeto foi desenvolvido utilizando a metodologia ágil Scrum para otimização do processo de desenvolvimento.",
            technologies: "Node.js, React, AWS (S3, Lambda, API Gateway), Scrum",
            contributions: "Desenvolvimento de módulos de back-end (Node.js), integração com APIs AWS, participação em reuniões Scrum e planejamento de sprints.",
            hardSkills: "Full-stack Development, Cloud Computing, Metodologias Ágeis",
            softSkills: "Trabalho em Equipe, Comunicação, Adaptabilidade",
            repoLink: "[https://github.com/BugBustersFatecSJC/inv.sort](https://github.com/BugBustersFatecSJC/inv.sort)"
        },
        "checkpoint": {
            title: "checkpoint",
            year: "2025-1",
            partner: "FATEC",
            description: "Participei de um projeto chamado checkpoint, uma aplicação web desenvolvida para otimizar o gerenciamento de jornada de trabalho, proporcionando uma solução moderna e eficiente para o controle de ponto eletrônico. A plataforma permite registros precisos de entrada e saída, cálculo automático de horas, gestão de ausências e um painel intuitivo para análise de dados e geração de relatórios.",
            technologies: "Java, Spring Boot, React, TypeScript, MySQL, MongoDB, AWS, Tailwind, CSS, STOMP, SockJS, Axios, React",
            contributions: "Scrum Master: Atuei na qualidade do processo de desenvolvimento, assegurando que não hajam obstáculos para a equipe de desenvolvimento e para o Product Owner",
            hardSkills: "Full-stack Development, Cloud Computing, Metodologias Ágeis",
            softSkills: "Trabalho em Equipe, Comunicação, Adaptabilidade",
            repoLink: "[https://github.com/FR0M-ZER0/checkpoint](https://github.com/FR0M-ZER0/checkpoint)"
        }
    };

    // --- Elementos do Modal ---
    const projectModal = document.getElementById('projectModal');
    const closeButton = projectModal.querySelector('.close-button');
    const modalCloseButton = projectModal.querySelector('.modal-close-button');
    const viewProjectButtons = document.querySelectorAll('.view-project-button');

    const modalTitle = projectModal.querySelector('.modal-title');
    const modalYear = projectModal.querySelector('.modal-year');
    const modalPartner = projectModal.querySelector('.modal-partner');
    const modalDescription = projectModal.querySelector('.modal-description');
    const modalTechList = projectModal.querySelector('.modal-tech-list');
    const modalContributions = projectModal.querySelector('.modal-contributions');
    const modalHardSkills = projectModal.querySelector('.modal-hard-skills');
    const modalSoftSkills = projectModal.querySelector('.modal-soft-skills');
    const modalRepoButton = projectModal.querySelector('.modal-repo-button');


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

        // --- ATUALIZAR CLASSE ATIVA DA NAV BAR ---
        document.querySelectorAll('.nav-link-internal').forEach(link => {
            if (link.dataset.section === sectionId) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        });
        // --- FIM DA ATUALIZAÇÃO ---

        // Inicia ou reseta a animação da logo (apenas o texto padrão "Seja bem-vindo!")
        // Garante que a animação da logo padrão só rode se não estiver em hover
        if (!isLogoHovered) {
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
                    showSection('home');
                }, { once: true });
            }, fadeOutDelay);
        }
    }

    // Animação de texto da logo (agora usa 'currentLogoText')
    function animateLogoText() {
        let cursorAnimationName = (currentLogoText === welcomeText) ? 'blink-caret-logo' : 'blink-caret-name';

        if (logoCharIndex < currentLogoText.length) {
            logoAnimationTextElement.textContent += currentLogoText.charAt(logoCharIndex);
            // Aplica a animação do cursor, removendo a anterior para evitar conflitos
            logoAnimationTextElement.style.animation = `${cursorAnimationName} 0.75s step-end infinite`;
            logoAnimationTimeout = setTimeout(animateLogoText, logoTypingSpeed);
            logoCharIndex++;
        } else {
            logoAnimationTextElement.classList.add('typed');
            logoAnimationTextElement.style.animation = 'none'; // Para o cursor piscar no final da digitação
            // Reinicia a animação após um tempo se for o texto padrão e não estiver em hover
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
            clearTimeout(logoAnimationTimeout);
            logoAnimationTextElement.textContent = '';
            logoCharIndex = 0;
            logoAnimationTextElement.classList.remove('typed');
            logoAnimationTextElement.classList.remove('name-visible');
            logoAnimationTextElement.classList.add('visible');
            logoAnimationTextElement.style.animation = `blink-caret-logo 0.75s step-end infinite`; // Inicia com cursor padrão
            animateLogoText();
        }
    }

    function stopLogoTextAnimation() {
        clearTimeout(logoAnimationTimeout);
        if (logoAnimationTextElement) {
            logoAnimationTextElement.classList.remove('visible');
            logoAnimationTextElement.textContent = '';
            logoCharIndex = 0;
            logoAnimationTextElement.classList.remove('typed');
            logoAnimationTextElement.classList.remove('name-visible');
            logoAnimationTextElement.style.animation = 'none'; // Garante que a animação do cursor pare
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
            currentLogoText = nameText;
            logoAnimationTextElement.style.animation = `blink-caret-name 0.75s step-end infinite`; // Aplica animação de cursor do nome
            animateLogoText();
        });

        logoImgElement.addEventListener('mouseleave', () => {
            isLogoHovered = false;
            clearTimeout(logoAnimationTimeout);
            logoAnimationTextElement.textContent = '';
            logoCharIndex = 0;
            logoAnimationTextElement.classList.remove('typed');
            logoAnimationTextElement.classList.remove('name-visible');
            logoAnimationTextElement.classList.remove('visible');
            logoAnimationTextElement.style.animation = 'none'; // Para o cursor ao sair

            setTimeout(() => {
                if (!isLogoHovered) { // Verifica novamente se o mouse não está mais sobre a logo
                    currentLogoText = welcomeText;
                    startLogoTextAnimation(); // Reinicia a animação padrão
                }
            }, 500);
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
        if (window.innerWidth <= 767) return 2;
        if (window.innerWidth <= 1024) return 3;
        return 4;
    };

    function updateCarousel() {
        if (!techCarouselInner) return;

        const totalItems = techCarouselInner.children.length;
        const currentItemsPerView = itemsPerView();
        const maxIndex = Math.max(0, Math.ceil(totalItems / currentItemsPerView) - 1);

        if (currentIndex < 0) {
            currentIndex = maxIndex;
        } else if (currentIndex > maxIndex) {
            currentIndex = 0;
        }

        const offset = -currentIndex * (100 / currentItemsPerView);
        techCarouselInner.style.transform = `translateX(${offset}%)`;

        console.log(`Carousel Debug: currentIdx=${currentIndex}, totalItems=${totalItems}, itemsPerView=${currentItemsPerView}, maxIdx=${maxIndex}, offset=${offset}%`);
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

        window.addEventListener('resize', () => {
            updateCarousel();
        });

        updateCarousel();
    }

    // --- Lógica do Modal ---
    function openModal(projectId) {
        const project = projectDetails[projectId];
        if (!project) {
            console.error("Detalhes do projeto não encontrados para o ID:", projectId);
            return;
        }

        modalTitle.textContent = project.title;
        modalYear.textContent = project.year || 'N/A';
        modalPartner.textContent = project.partner || 'N/A';
        modalDescription.textContent = project.description || 'Nenhuma descrição disponível.';
        modalTechList.textContent = project.technologies || 'N/A';
        modalContributions.textContent = project.contributions || 'Nenhuma contribuição listada.';
        modalHardSkills.textContent = project.hardSkills || 'N/A';
        modalSoftSkills.textContent = project.softSkills || 'N/A';

        if (project.repoLink) {
            modalRepoButton.href = project.repoLink;
            modalRepoButton.style.display = 'inline-block';
        } else {
            modalRepoButton.style.display = 'none';
        }

        projectModal.classList.add('active');
        // Desativar rolagem do container principal enquanto o modal estiver aberto
        portfolioSectionsContainer.style.overflowY = 'hidden';
    }

    function closeModal() {
        projectModal.classList.remove('active');
        // Reativar rolagem do container principal
        portfolioSectionsContainer.style.overflowY = 'scroll';
    }

    // Event Listeners para os botões do modal
    viewProjectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const projectId = e.target.dataset.project;
            openModal(projectId);
        });
    });

    closeButton.addEventListener('click', closeModal);
    modalCloseButton.addEventListener('click', closeModal);

    // Fechar modal ao clicar fora (no overlay)
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeModal();
        }
    });


    // --- Inicialização ---

    // Esconder todas as seções, exceto a tela de terminal, ao carregar
    portfolioSectionsContainer.querySelectorAll('.page-section').forEach(section => {
        section.classList.add('hidden-section');
    });

    // Inicia a animação de digitação
    typeWriter();

});