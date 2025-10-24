# MPSH-PROTEKTOR - Landing Page

Landing page profissional, moderna e responsiva para o produto MPSH-PROTEKTOR (Módulo de Proteção do Sistema Hidráulico) da Maginf Tecnologia.

## 📋 Sobre o Projeto

Esta landing page foi desenvolvida para gerar cadastros e solicitações de orçamento de empresas e operadores do agronegócio e construção civil. A página possui alto impacto visual, linguagem técnica e confiável, forte apelo de sustentabilidade e conversão otimizada.

## 🎨 Design e Características

### Paleta de Cores
- **Laranja Maginf**: `#FF6B35` (cor primária)
- **Cinza Maginf**: `#4A4A4A` (cor secundária)
- **Verde Sustentabilidade**: `#22C55E` (detalhes ecológicos)
- **Cinza Escuro**: `#2C2C2C`
- **Cinza Claro**: `#F5F5F5`

### Tipografia
- **Fonte**: Inter (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700

### Ícones
- **Font Awesome 6.0.0** para todos os ícones

## 🏗️ Estrutura da Página

### 1. Header Fixo
- Logotipo Maginf
- Menu de navegação: "Sobre", "Como Funciona", "Vantagens", "Contato"
- Botão CTA destacado: "Solicitar Orçamento"
- Menu mobile responsivo

### 2. Hero Section
- Título impactante com destaque no produto
- Subtítulo com informações sobre multas ambientais
- Botão CTA principal
- Fundo com overlay e efeitos visuais

### 3. Como Funciona
- 3 etapas do processo explicadas com ícones
- Cards animados com hover effects
- Frase de destaque: "Tecnologia embarcada, prevenção garantida"

### 4. Vantagens e Benefícios
- 6 cards com principais benefícios
- Ícones representativos para cada vantagem
- Animações de entrada suaves

### 5. Sustentabilidade e Conformidade Legal
- Seção destacada em verde
- Informações sobre legislação ambiental
- Ícone de sustentabilidade

### 6. Formulário de Cadastro
- Formulário completo com validação
- Campos obrigatórios marcados
- Mensagem de sucesso após envio
- Validação em tempo real

### 7. Depoimentos/Marcas
- Logos das principais marcas do setor
- Efeitos hover nos cards

### 8. Rodapé
- Informações de contato da Maginf
- Links para redes sociais
- Frase institucional

## 🚀 Funcionalidades

### JavaScript Implementado
- **Scroll suave** entre seções
- **Menu mobile** responsivo
- **Validação de formulário** em tempo real
- **Formatação automática** de telefone
- **Animações de entrada** com Intersection Observer
- **Efeito parallax** sutil no hero
- **Header dinâmico** que muda com o scroll

### Validações do Formulário
- Nome completo (mínimo 2 caracteres)
- E-mail corporativo (formato válido)
- Telefone/WhatsApp (formatação automática)
- Tipo de máquina (seleção obrigatória)
- Quantidade de equipamentos (mínimo 1)
- Cidade/Estado (obrigatório)
- Checkbox de consentimento (obrigatório)

### Responsividade
- **Desktop**: Layout completo com grid
- **Tablet**: Adaptação de colunas e espaçamentos
- **Mobile**: Menu hambúrguer, formulário em coluna única
- **Breakpoints**: 768px e 480px

## 📱 Compatibilidade

### Navegadores Suportados
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

### Dispositivos
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🛠️ Tecnologias Utilizadas

- **HTML5** semântico
- **CSS3** com Grid e Flexbox
- **JavaScript ES6+**
- **Font Awesome** para ícones
- **Google Fonts** (Inter)

## 📦 Estrutura de Arquivos

```
app-protektor/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript
└── README.md           # Documentação
```

## 🚀 Como Usar

1. **Abrir a página**:
   - Abra o arquivo `index.html` em qualquer navegador moderno
   - Ou configure um servidor local para desenvolvimento

2. **Personalização**:
   - **Cores**: Modifique as variáveis CSS em `:root`
   - **Conteúdo**: Edite o HTML conforme necessário
   - **Imagens**: Adicione imagens do produto no hero section

3. **Integração Backend**:
   - Modifique a função `handleFormSubmit()` no `script.js`
   - Integre com seu sistema de CRM ou email marketing
   - Configure Google Analytics ou Facebook Pixel

## 🔧 Customizações Recomendadas

### Imagens
- **Hero Background**: Adicione uma imagem real do MPSH-PROTEKTOR em um trator/escavadeira
- **Logos**: Substitua os textos das marcas por logos reais
- **Favicon**: Adicione o favicon da Maginf

### Integrações
```javascript
// Exemplo de integração com backend
function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(quoteForm);
    
    fetch('/api/quote-request', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Mostrar mensagem de sucesso
    });
}
```

### Analytics
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 📊 Performance

### Otimizações Implementadas
- **CSS minificado** e otimizado
- **Lazy loading** para imagens (preparado)
- **Intersection Observer** para animações
- **Debounce** em eventos de scroll
- **Prevenção de zoom** no iOS

### Métricas Esperadas
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🔒 SEO e Acessibilidade

### SEO
- Meta tags otimizadas
- Estrutura semântica HTML5
- URLs amigáveis (âncoras)
- Schema markup (pode ser adicionado)

### Acessibilidade
- Contraste adequado (WCAG AA)
- Navegação por teclado
- Labels apropriados em formulários
- Foco visível em elementos interativos

## 📞 Suporte

Para dúvidas ou customizações adicionais:
- **Email**: contato@maginf.com.br
- **Telefone**: (11) 9999-9999

## 📄 Licença

Este projeto foi desenvolvido exclusivamente para a Maginf Tecnologia.

---

**Maginf Tecnologia** - Inovação e Proteção Inteligente para o Futuro.
