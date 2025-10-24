// Funcionalidades da Landing Page MPSH-PROTEKTOR

document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos do DOM
    const header = document.querySelector('.header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const quoteForm = document.getElementById('quoteForm');
    const successMessage = document.getElementById('successMessage');
    
    // Header scroll effect
    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Menu mobile toggle
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        
        // Animação do hambúrguer
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (mobileMenuToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
    
    // Smooth scroll para links de navegação
    function setupSmoothScroll() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Fechar menu mobile se estiver aberto
                    if (navMenu.classList.contains('active')) {
                        toggleMobileMenu();
                    }
                }
            });
        });
    }
    
    // Validação e formatação de campos
    function setupFormValidation() {
        const telefoneInput = document.getElementById('telefone');
        const emailInput = document.getElementById('email');
        const nomeInput = document.getElementById('nome');
        const empresaInput = document.getElementById('empresa');
        
        // Formatação de telefone
        if (telefoneInput) {
            telefoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.length <= 11) {
                    if (value.length <= 10) {
                        value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
                    } else {
                        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                    }
                }
                
                e.target.value = value;
            });
        }
        
        // Validação de email em tempo real
        if (emailInput) {
            emailInput.addEventListener('blur', function(e) {
                const email = e.target.value;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (email && !emailRegex.test(email)) {
                    e.target.style.borderColor = '#EF4444';
                    showFieldError(e.target, 'Por favor, insira um e-mail válido');
                } else {
                    e.target.style.borderColor = '#22C55E';
                    hideFieldError(e.target);
                }
            });
        }
        
        // Validação de nome (apenas letras e espaços)
        if (nomeInput) {
            nomeInput.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
            });
        }
    }
    
    // Mostrar erro no campo
    function showFieldError(field, message) {
        hideFieldError(field); // Remove erro anterior
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.color = '#EF4444';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }
    
    // Esconder erro no campo
    function hideFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    // Validação completa do formulário
    function validateForm(formData) {
        const errors = [];
        
        // Validações obrigatórias
        if (!formData.get('nome') || formData.get('nome').trim().length < 2) {
            errors.push('Nome deve ter pelo menos 2 caracteres');
        }
        
        if (!formData.get('empresa') || formData.get('empresa').trim().length < 2) {
            errors.push('Nome da empresa é obrigatório');
        }
        
        const email = formData.get('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            errors.push('E-mail válido é obrigatório');
        }
        
        const telefone = formData.get('telefone');
        if (!telefone || telefone.replace(/\D/g, '').length < 10) {
            errors.push('Telefone deve ter pelo menos 10 dígitos');
        }
        
        if (!formData.get('maquina')) {
            errors.push('Tipo de máquina é obrigatório');
        }
        
        const quantidade = formData.get('quantidade');
        if (!quantidade || parseInt(quantidade) < 1) {
            errors.push('Quantidade deve ser pelo menos 1');
        }
        
        if (!formData.get('localizacao') || formData.get('localizacao').trim().length < 3) {
            errors.push('Localização é obrigatória');
        }
        
        if (!formData.get('aceito')) {
            errors.push('Você deve aceitar receber comunicações');
        }
        
        return errors;
    }
    
    // Envio do formulário
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(quoteForm);
        const errors = validateForm(formData);
        
        // Limpar erros anteriores
        document.querySelectorAll('.field-error').forEach(error => error.remove());
        document.querySelectorAll('.form-group input, .form-group select').forEach(field => {
            field.style.borderColor = '#E5E7EB';
        });
        
        if (errors.length > 0) {
            // Mostrar erros
            alert('Por favor, corrija os seguintes erros:\n\n' + errors.join('\n'));
            return;
        }
        
        // Simular envio (aqui você integraria com seu backend)
        const submitButton = quoteForm.querySelector('.submit-button');
        const originalText = submitButton.innerHTML;
        
        // Loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitButton.disabled = true;
        
        // Simular delay de envio
        setTimeout(() => {
            // Esconder formulário e mostrar mensagem de sucesso
            quoteForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Scroll para a mensagem de sucesso
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Aqui você enviaria os dados para seu servidor
            console.log('Dados do formulário:', Object.fromEntries(formData));
            
            // Opcional: Enviar para Google Analytics ou outras ferramentas
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    event_category: 'engagement',
                    event_label: 'quote_request'
                });
            }
            
        }, 2000);
    }
    
    // Animações de entrada
    function setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Elementos para animar
        const animatedElements = document.querySelectorAll(
            '.step-card, .advantage-card, .brand-logo, .sustainability-content'
        );
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    // Contador animado para números importantes
    function animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 segundos
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = target.toLocaleString('pt-BR');
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current).toLocaleString('pt-BR');
                }
            }, 16);
        });
    }
    
    // Efeito parallax sutil no hero
    function setupParallax() {
        const hero = document.querySelector('.hero');
        const heroBackground = document.querySelector('.hero-background');
        
        if (hero && heroBackground) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                
                if (scrolled < hero.offsetHeight) {
                    heroBackground.style.transform = `translateY(${rate}px)`;
                }
            });
        }
    }
    
    // Inicialização
    function init() {
        // Event listeners
        window.addEventListener('scroll', handleHeaderScroll);
        
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        }
        
        if (quoteForm) {
            quoteForm.addEventListener('submit', handleFormSubmit);
        }
        
        // Setup das funcionalidades
        setupSmoothScroll();
        setupFormValidation();
        setupScrollAnimations();
        setupParallax();
        
        // Animações iniciais
        setTimeout(animateCounters, 1000);
        
        // Fechar menu mobile ao clicar fora
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container') && navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
        
        // Prevenção de zoom no iOS em inputs
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            const inputs = document.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    input.style.fontSize = '16px';
                });
            });
        }
    }
    
    // Inicializar quando o DOM estiver pronto
    init();
    
    // Função global para reset do formulário (caso necessário)
    window.resetQuoteForm = function() {
        if (quoteForm && successMessage) {
            quoteForm.style.display = 'block';
            successMessage.style.display = 'none';
            quoteForm.reset();
            
            // Reset do botão
            const submitButton = quoteForm.querySelector('.submit-button');
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar e Receber Proposta';
            submitButton.disabled = false;
        }
    };
    
});

// Função para integração com Google Analytics (opcional)
function trackEvent(action, category = 'engagement', label = '') {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

// Função para integração com Facebook Pixel (opcional)
function trackFacebookEvent(eventName, parameters = {}) {
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, parameters);
    }
}

// Detecção de dispositivo para otimizações específicas
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isTablet = /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768;

// Adicionar classes CSS baseadas no dispositivo
document.documentElement.classList.add(
    isMobile ? 'is-mobile' : 'is-desktop',
    isTablet ? 'is-tablet' : 'is-not-tablet'
);

// Performance: Lazy loading para imagens (se houver)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
