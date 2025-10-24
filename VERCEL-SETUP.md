# 🚀 Conectar GitHub ao Vercel - MPSH-PROTEKTOR

## 📋 Repositório Configurado
- **GitHub**: https://github.com/maginfnews/protektor
- **Branch**: main
- **Arquivos**: Todos prontos para deploy

## 🔄 Passos para Deploy no Vercel

### 1. Fazer Push para GitHub
```bash
# Execute o arquivo deploy-git.bat ou rode os comandos:
git init
git add .
git commit -m "feat: Landing page MPSH-PROTEKTOR completa"
git branch -M main
git remote add origin https://github.com/maginfnews/protektor.git
git push -u origin main
```

### 2. Conectar ao Vercel
1. **Acesse**: [vercel.com](https://vercel.com)
2. **Login**: Com GitHub (maginfnews)
3. **New Project**: Clique no botão
4. **Import**: Selecione `maginfnews/protektor`

### 3. Configurações do Deploy
```json
Framework Preset: Other
Root Directory: ./
Build Command: (deixar vazio)
Output Directory: ./
Install Command: (deixar vazio)
```

### 4. Variáveis de Ambiente (Opcional)
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

### 5. Deploy Automático
- Clique em **Deploy**
- Aguarde 2-3 minutos
- URL gerada: `https://protektor-xxx.vercel.app`

## 🌐 Configurar Domínio Personalizado

### Opção 1: Subdomínio Vercel (Gratuito)
- URL: `https://mpsh-protektor.vercel.app`
- Configuração automática

### Opção 2: Domínio Próprio
1. **Settings** → **Domains**
2. **Add Domain**: `mpsh-protektor.com.br`
3. **Configure DNS** conforme instruções

## 📊 Monitoramento Automático

### Analytics Incluídos
- ✅ Google Analytics 4
- ✅ Google Tag Manager
- ✅ Vercel Analytics
- ✅ Core Web Vitals

### SEO Otimizado
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Meta tags completas
- ✅ Structured data
- ✅ Open Graph

## 🎯 URLs Finais

Após deploy, o site estará em:
- **Produção**: https://protektor-xxx.vercel.app
- **GitHub**: https://github.com/maginfnews/protektor
- **Vercel Dashboard**: https://vercel.com/maginfnews/protektor

## 🔄 Deploy Automático

Toda vez que você fizer push no GitHub:
```bash
git add .
git commit -m "update: nova funcionalidade"
git push
```
O Vercel fará deploy automático em ~2 minutos!

---
**MPSH-PROTEKTOR** pronto para o mundo! 🌍
