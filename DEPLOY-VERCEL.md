# 🚀 Deploy MPSH-PROTEKTOR no Vercel

## 📋 Pré-requisitos
- Conta no [Vercel](https://vercel.com)
- Conta no [GitHub](https://github.com) (opcional, mas recomendado)

## 🔄 Método 1: Deploy via GitHub (Recomendado)

### 1. Criar Repositório no GitHub
```bash
# No GitHub, criar novo repositório: mpsh-protektor
```

### **2. Importar Projeto**
1. Clique em **"Add New..."** → **"Project"**
2. Selecione **"Import Git Repository"**
3. Procure por: `maginfnews/protektor`
4. Clique em **"Import"**

### **3. Configurar Deploy**
```
Project Name: mpsh-protektor
Framework Preset: Other (ou Static Site)
Root Directory: ./
Build Command: (deixe vazio ou "echo 'Static site ready'")
Output Directory: public
Install Command: npm install
```

### **4. Variáveis de Ambiente**
**✅ Não são necessárias** - o projeto usa Web3Forms que funciona no frontend.

### **5. Deploy**
1. Clique em **"Deploy"**
2. Aguarde o build completar (~1-2 minutos)
3. Acesse a URL gerada (ex: `https://mpsh-protektor.vercel.app`)

## 🌐 **Estrutura do Projeto**

### **Páginas Principais**
- **`/`** - Site principal com vídeo e formulário
- **`/produto.html`** - Página do produto com imagem
- **`/privacidade.html`** - Política de Privacidade LGPD

### **Funcionalidades Ativas**
- ✅ **Navbar fixo** - Navegação entre páginas
- ✅ **Formulário Web3Forms** - Chave: `69da808d-ff05-4d39-986e-55cccda23f2c`
- ✅ **Design responsivo** - Mobile, tablet, desktop
- ✅ **SEO otimizado** - Meta tags e structured data

### **Assets Incluídos**
- ✅ **Imagem do produto**: `produto-mpsh-protektor.png` (1.6MB)
- ✅ **Logos e favicons**: Múltiplos formatos
- ✅ **CSS otimizado**: `styles.css` com glassmorphism
- ✅ **JavaScript**: `script.js` com validação e envio

## ⚙️ **Configuração Técnica**

### **vercel.json**
```json
{
  "buildCommand": null,
  "outputDirectory": "public",
  "installCommand": "npm install"
}
```

### **package.json**
```json
{
  "scripts": {
    "build": "echo 'Static site ready' && exit 0",
    "start": "python -m http.server 3000"
  },
  "dependencies": {
    "resend": "^3.2.0"
  }
}
```

## 🎯 **Resultado Final**

Após o deploy você terá:
- **✅ Site profissional**: Design moderno com glassmorphism
- **✅ Formulário funcional**: Enviando para `site@maginf.com.br`
- **✅ LGPD compliant**: Política de privacidade completa
- **✅ SEO otimizado**: Para aparecer no Google
- **✅ Mobile-first**: Responsivo em todos os dispositivos

## 🔧 **Se Houver Problemas**

### **Build Error**
- Verificar se `public/` tem todos os arquivos
- Confirmar `vercel.json` na raiz do projeto

### **Formulário não funciona**
- Testar chave Web3Forms: https://web3forms.com/
- Verificar console do navegador (F12)

### **Imagens não carregam**
- Confirmar que `produto-mpsh-protektor.png` está em `/public/`
- Verificar caminhos relativos nas páginas

## 🚀 **Pronto para Deploy!**

O projeto está **100% preparado** para deploy no Vercel. Siga os passos acima e em poucos minutos terá o site online!

**URL esperada**: `https://mpsh-protektor.vercel.app` ou similar

## 📞 Suporte

Em caso de dúvidas:
1. Documentação Vercel: [vercel.com/docs](https://vercel.com/docs)
2. Suporte Vercel: [vercel.com/support](https://vercel.com/support)

---
**MPSH-PROTEKTOR** - Sistema de Proteção Hidráulica Inteligente 🛡️
