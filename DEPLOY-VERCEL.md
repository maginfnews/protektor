# 🚀 Deploy MPSH-PROTEKTOR no Vercel

## 📋 Pré-requisitos
- Conta no [Vercel](https://vercel.com)
- Conta no [GitHub](https://github.com) (opcional, mas recomendado)

## 🔄 Método 1: Deploy via GitHub (Recomendado)

### 1. Criar Repositório no GitHub
```bash
# No GitHub, criar novo repositório: mpsh-protektor
```

### 2. Upload dos Arquivos
- Fazer upload de todos os arquivos da pasta `c:\app-protektor`
- Ou usar Git:
```bash
git init
git add .
git commit -m "Initial commit - MPSH-PROTEKTOR Landing Page"
git remote add origin https://github.com/SEU-USUARIO/mpsh-protektor.git
git push -u origin main
```

### 3. Conectar ao Vercel
1. Acessar [vercel.com](https://vercel.com)
2. Login com GitHub
3. Clicar em "New Project"
4. Selecionar o repositório `mpsh-protektor`
5. Configurações:
   - **Framework Preset**: Other
   - **Root Directory**: ./
   - **Build Command**: (deixar vazio)
   - **Output Directory**: ./
6. Clicar em "Deploy"

## ⚡ Método 2: Deploy Direto (Drag & Drop)

### 1. Preparar Arquivos
- Selecionar todos os arquivos da pasta `c:\app-protektor`
- Excluir: `.git`, `node_modules` (se existirem)

### 2. Upload no Vercel
1. Acessar [vercel.com](https://vercel.com)
2. Arrastar a pasta para a área de upload
3. Aguardar o deploy automático

## 🌐 Configuração de Domínio

### Domínio Gratuito Vercel
- URL automática: `https://mpsh-protektor.vercel.app`

### Domínio Personalizado
1. No painel do Vercel → Settings → Domains
2. Adicionar: `mpsh-protektor.com.br`
3. Configurar DNS conforme instruções

## 📊 Monitoramento

### Analytics
- Vercel Analytics automático
- Google Analytics já configurado no código

### Performance
- Core Web Vitals automático
- Lighthouse score otimizado

## 🔧 Configurações Incluídas

### Arquivos de Configuração
- ✅ `vercel.json` - Configurações do Vercel
- ✅ `package.json` - Metadados do projeto
- ✅ `.gitignore` - Arquivos ignorados
- ✅ `robots.txt` - SEO
- ✅ `sitemap.xml` - Mapa do site

### Otimizações
- ✅ Headers de segurança
- ✅ Cache otimizado
- ✅ Compressão automática
- ✅ HTTPS por padrão
- ✅ CDN global

## 🎯 Resultado Esperado

Após o deploy, a landing page estará disponível em:
- **URL**: https://mpsh-protektor.vercel.app
- **Performance**: 90+ no Lighthouse
- **SEO**: Otimizado para ranking #1
- **Mobile**: 100% responsivo

## 📞 Suporte

Em caso de dúvidas:
1. Documentação Vercel: [vercel.com/docs](https://vercel.com/docs)
2. Suporte Vercel: [vercel.com/support](https://vercel.com/support)

---
**MPSH-PROTEKTOR** - Sistema de Proteção Hidráulica Inteligente 🛡️
