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
        if (!email || email.trim() === '') {
            errors.push('E-mail é obrigatório');
        } else if (!emailRegex.test(email)) {
            errors.push('Por favor, insira um e-mail válido (exemplo: nome@empresa.com.br)');
        }
        
        const telefone = formData.get('telefone');
        if (!telefone || telefone.trim() === '') {
            errors.push('Telefone é obrigatório');
        } else if (telefone.replace(/\D/g, '').length < 10) {
            errors.push('Telefone deve ter pelo menos 10 dígitos (exemplo: (11) 99999-9999)');
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
    
    // Configuração EmailJS
    const EMAILJS_CONFIG = {
        serviceId: 'service_protektor',
        templateId: 'template_protektor',
        publicKey: 'YOUR_PUBLIC_KEY' // Será configurado
    };

    // Inicializar EmailJS
    function initEmailJS() {
        if (typeof emailjs !== 'undefined') {
            emailjs.init(EMAILJS_CONFIG.publicKey);
            console.log('✅ EmailJS inicializado');
        } else {
            console.warn('⚠️ EmailJS não carregado');
        }
    }

    // Envio via EmailJS
    async function sendWithEmailJS(formData) {
        const templateParams = {
            to_email: 'site@maginf.com.br',
            from_name: formData.get('nome'),
            from_email: formData.get('email'),
            company: formData.get('empresa'),
            phone: formData.get('telefone'),
            machine: formData.get('maquina'),
            quantity: formData.get('quantidade'),
            location: formData.get('localizacao'),
            message: `Nova solicitação de orçamento:
            
Nome: ${formData.get('nome')}
Empresa: ${formData.get('empresa')}
Email: ${formData.get('email')}
Telefone: ${formData.get('telefone')}
Máquina: ${formData.get('maquina')}
Quantidade: ${formData.get('quantidade')}
Localização: ${formData.get('localizacao')}

Data: ${new Date().toLocaleString('pt-BR')}`
        };

        return emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            templateParams
        );
    }

    // Envio via Web3Forms (gratuito e simples)
    async function sendWithWeb3Forms(formData) {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                access_key: '69da808d-ff05-4d39-986e-55cccda23f2c', // Nova chave Web3Forms
                name: formData.get('nome'),
                email: formData.get('email'),
                company: formData.get('empresa'),
                phone: formData.get('telefone'),
                machine: formData.get('maquina'),
                quantity: formData.get('quantidade'),
                location: formData.get('localizacao'),
                subject: `🚜 Nova Solicitação de Orçamento - ${formData.get('empresa')}`,
                message: `Nova solicitação de orçamento:

Nome: ${formData.get('nome')}
Empresa: ${formData.get('empresa')}
Email: ${formData.get('email')}
Telefone: ${formData.get('telefone')}
Máquina: ${formData.get('maquina')}
Quantidade: ${formData.get('quantidade')}
Localização: ${formData.get('localizacao')}

Data: ${new Date().toLocaleString('pt-BR')}`
            })
        });

        if (!response.ok) {
            throw new Error(`Web3Forms error: ${response.status}`);
        }

        return response.json();
    }

    // Envio via mailto (fallback simples)
    function sendWithMailto(formData) {
        const subject = encodeURIComponent(`🚜 Nova Solicitação de Orçamento - ${formData.get('empresa')}`);
        const body = encodeURIComponent(`Nova solicitação de orçamento:

Nome: ${formData.get('nome')}
Empresa: ${formData.get('empresa')}
Email: ${formData.get('email')}
Telefone: ${formData.get('telefone')}
Máquina: ${formData.get('maquina')}
Quantidade: ${formData.get('quantidade')}
Localização: ${formData.get('localizacao')}

Data: ${new Date().toLocaleString('pt-BR')}`);
        
        const mailtoLink = `mailto:site@maginf.com.br?subject=${subject}&body=${body}`;
        window.open(mailtoLink, '_blank');
        
        return Promise.resolve({ success: true, method: 'mailto' });
    }

    // Envio do formulário com múltiplas opções
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(quoteForm);
        const errors = validateForm(formData);
        
        // Limpar erros anteriores
        document.querySelectorAll('.field-error').forEach(error => error.remove());
        
        if (errors.length > 0) {
            // Mostrar erros
            errors.forEach(error => {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'field-error';
                errorDiv.style.color = '#e74c3c';
                errorDiv.style.background = '#fdf2f2';
                errorDiv.style.padding = '10px';
                errorDiv.style.borderRadius = '5px';
                errorDiv.style.margin = '5px 0';
                errorDiv.style.border = '1px solid #e74c3c';
                errorDiv.textContent = error;
                quoteForm.insertBefore(errorDiv, quoteForm.firstChild);
            });
            
            // Scroll para o primeiro erro
            quoteForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }
        
        // Preparar dados para envio
        const submitButton = quoteForm.querySelector('.submit-button');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitButton.disabled = true;
        
        try {
            console.log('🚀 Tentando enviar formulário...');
            
            // Tentar Web3Forms primeiro (mais confiável)
            try {
                console.log('📧 Tentando Web3Forms...');
                await sendWithWeb3Forms(formData);
                console.log('✅ Web3Forms: Sucesso!');
            } catch (web3Error) {
                console.warn('⚠️ Web3Forms falhou:', web3Error.message);
                
                // Fallback para EmailJS
                if (typeof emailjs !== 'undefined') {
                    try {
                        console.log('📧 Tentando EmailJS...');
                        await sendWithEmailJS(formData);
                        console.log('✅ EmailJS: Sucesso!');
                    } catch (emailjsError) {
                        console.warn('⚠️ EmailJS falhou:', emailjsError.message);
                        
                        // Último recurso: mailto
                        console.log('📧 Usando mailto como último recurso...');
                        await sendWithMailto(formData);
                        console.log('✅ Mailto: Aberto!');
                    }
                } else {
                    // Sem EmailJS, usar mailto diretamente
                    console.log('📧 EmailJS não disponível, usando mailto...');
                    await sendWithMailto(formData);
                    console.log('✅ Mailto: Aberto!');
                }
            }
            
            // Sucesso
            quoteForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Tracking do envio de formulário
            if (typeof window.va !== 'undefined') {
                window.va('track', 'Form Submitted', {
                    empresa: formData.get('empresa'),
                    maquina: formData.get('maquina'),
                    quantidade: formData.get('quantidade')
                });
            }
            
            // Reset do formulário
            quoteForm.reset();
            
            // Scroll para a mensagem de sucesso
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Google Analytics - Evento de conversão
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    event_category: 'engagement',
                    event_label: 'quote_request',
                    value: 1
                });
            }
            
        } catch (error) {
            console.error('❌ Erro ao enviar formulário:', error);
            
            // Mostrar erro para o usuário
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.style.color = '#e74c3c';
            errorDiv.style.background = '#fdf2f2';
            errorDiv.style.padding = '15px';
            errorDiv.style.borderRadius = '8px';
            errorDiv.style.margin = '10px 0';
            errorDiv.style.border = '1px solid #e74c3c';
            errorDiv.innerHTML = `
                <strong>❌ Erro ao enviar solicitação</strong><br>
                ${error.message || 'Tente novamente em alguns minutos ou entre em contato diretamente.'}<br>
                <small>📧 sac@maginf.com.br | 📱 +55 (11) 4610-6363</small>
            `;
            quoteForm.insertBefore(errorDiv, quoteForm.firstChild);
            
            // Scroll para o erro
            quoteForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
        } finally {
            // Restaurar botão
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
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
        // Validação em tempo real para campos obrigatórios
        function setupRealTimeValidation() {
            const emailField = document.getElementById('email');
            const telefoneField = document.getElementById('telefone');
            
            if (emailField) {
                emailField.addEventListener('blur', function() {
                    const email = this.value.trim();
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    
                    if (email === '') {
                        this.style.borderColor = '#e74c3c';
                        showFieldHint(this, 'E-mail é obrigatório');
                    } else if (!emailRegex.test(email)) {
                        this.style.borderColor = '#e74c3c';
                        showFieldHint(this, 'Formato inválido (exemplo: nome@empresa.com.br)');
                    } else {
                        this.style.borderColor = '#2ECC71';
                        removeFieldHint(this);
                    }
                });
            }
            
            if (telefoneField) {
                telefoneField.addEventListener('blur', function() {
                    const telefone = this.value.trim();
                    
                    if (telefone === '') {
                        this.style.borderColor = '#e74c3c';
                        showFieldHint(this, 'Telefone é obrigatório');
                    } else if (telefone.replace(/\D/g, '').length < 10) {
                        this.style.borderColor = '#e74c3c';
                        showFieldHint(this, 'Mínimo 10 dígitos (exemplo: (11) 99999-9999)');
                    } else {
                        this.style.borderColor = '#2ECC71';
                        removeFieldHint(this);
                    }
                });
            }
        }
        
        // Mostrar dica no campo
        function showFieldHint(field, message) {
            removeFieldHint(field);
            const hint = document.createElement('div');
            hint.className = 'field-hint';
            hint.style.color = '#e74c3c';
            hint.style.fontSize = '0.85rem';
            hint.style.marginTop = '5px';
            hint.textContent = message;
            field.parentNode.appendChild(hint);
        }
        
        // Remover dica do campo
        function removeFieldHint(field) {
            const existingHint = field.parentNode.querySelector('.field-hint');
            if (existingHint) {
                existingHint.remove();
            }
        }
        
        // Event listeners
        window.addEventListener('scroll', handleHeaderScroll);
        
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        }
        
        setupSmoothScroll();
        setupRealTimeValidation();
        
        if (quoteForm) {
            quoteForm.addEventListener('submit', handleFormSubmit);
        }
        
        // Setup das funcionalidades
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
    
    // Tracking de clicks em CTAs
    document.addEventListener('click', function(e) {
        if (e.target.matches('.cta-button-hero, .cta-button-header')) {
            if (typeof window.va !== 'undefined') {
                window.va('track', 'CTA Click', {
                    button: e.target.textContent.trim(),
                    location: e.target.className
                });
            }
        }
        
        // Tracking de navegação para página do produto
        if (e.target.matches('a[href="produto.html"]')) {
            if (typeof window.va !== 'undefined') {
                window.va('track', 'Product Page Click');
            }
        }
        
        // Tracking do botão Área de Cliente
        if (e.target.matches('.client-area-button')) {
            if (typeof window.va !== 'undefined') {
                window.va('track', 'Client Area Click');
            }
        }
        
        // Tracking do Instagram
        if (e.target.closest('.instagram-float') || e.target.closest('.social-link[href*="instagram"]')) {
            if (typeof window.va !== 'undefined') {
                window.va('track', 'Instagram Click', {
                    source: e.target.closest('.instagram-float') ? 'floating_button' : 'footer_link'
                });
            }
        }
        
        // Tracking do Facebook
        if (e.target.closest('.social-link[href*="facebook"]')) {
            if (typeof window.va !== 'undefined') {
                window.va('track', 'Facebook Click', {
                    source: 'footer_link'
                });
            }
        }
        
        // Tracking do botão Seja um Representante
        if (e.target.matches('.representative-button') || e.target.closest('.representative-button')) {
            if (typeof window.va !== 'undefined') {
                window.va('track', 'Representative Button Click', {
                    page: window.location.pathname
                });
            }
        }
    });
    
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

// Tracking de visualização de página
if (typeof window.va !== 'undefined') {
    window.va('track', 'Page View', {
        page: window.location.pathname,
        device: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'
    });
}

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

// Animação de números das estatísticas
function animateStats() {
    const statCards = document.querySelectorAll('.stat-card');
    
    if (!statCards.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const numberElement = card.querySelector('.stat-number');
                const targetValue = parseInt(card.dataset.stat);
                
                if (!numberElement || !targetValue) return;
                
                const isPercentage = numberElement.textContent.includes('%');
                const isCurrency = numberElement.textContent.includes('R$');
                const isHours = numberElement.textContent.includes('h');
                const isPlus = numberElement.textContent.includes('+');
                
                let currentValue = 0;
                const increment = targetValue / 100;
                const duration = 2000; // 2 segundos
                const stepTime = duration / 100;
                
                const timer = setInterval(() => {
                    currentValue += increment;
                    
                    if (currentValue >= targetValue) {
                        currentValue = targetValue;
                        clearInterval(timer);
                    }
                    
                    let displayValue = Math.floor(currentValue);
                    
                    if (isCurrency) {
                        displayValue = `R$ ${displayValue.toLocaleString('pt-BR')}`;
                    } else if (isPercentage) {
                        displayValue = `${displayValue}%`;
                    } else if (isHours) {
                        displayValue = `${displayValue}h`;
                    } else if (isPlus) {
                        displayValue = `${displayValue.toLocaleString('pt-BR')}+`;
                    }
                    
                    numberElement.textContent = displayValue;
                }, stepTime);
                
                observer.unobserve(card);
            }
        });
    }, { threshold: 0.5 });
    
    statCards.forEach(card => observer.observe(card));
}

// Inicializar animação das estatísticas
document.addEventListener('DOMContentLoaded', animateStats);
