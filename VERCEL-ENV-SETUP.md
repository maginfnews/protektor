# 🔑 Configuração da API Key do Resend no Vercel

## 📋 Credenciais Fornecidas
- **Domínio**: sendprotektor.com
- **API Key**: `re_Jr4jLwwQ_KUY29u62G4SyP9G4Y6WCTAbt`

## 🚀 Passo a Passo para Configurar no Vercel

### **1. Acessar o Painel do Vercel**
1. Acesse: https://vercel.com/dashboard
2. Faça login na sua conta
3. Selecione o projeto **protektor**

### **2. Configurar Environment Variables**
1. No projeto, clique em **Settings**
2. No menu lateral, clique em **Environment Variables**
3. Clique em **Add New**

### **3. Adicionar a Variável**
```
Name: RESEND_API_KEY
Value: re_Jr4jLwwQ_KUY29u62G4SyP9G4Y6WCTAbt
Environment: Production, Preview, Development (marcar todos)
```

### **4. Salvar e Fazer Deploy**
1. Clique em **Save**
2. Vá para a aba **Deployments**
3. Clique em **Redeploy** no último deployment
4. Ou faça um novo push para ativar o deploy automático

## 📧 Configuração do Domínio no Resend

### **Emails Configurados:**
- **From**: `MPSHPROTEKTOR <noreply@sendprotektor.com>`
- **To (Empresa)**: `sac@maginf.com.br`
- **To (Cliente)**: Email fornecido no formulário

### **Domínio Verificado:**
- ✅ **sendprotektor.com** já está configurado no Resend
- ✅ **API Key** já está ativa e funcionando
- ✅ **Templates** atualizados para usar o domínio correto

## 🧪 Como Testar

### **1. Após configurar no Vercel:**
1. Aguarde o deploy terminar (1-2 minutos)
2. Acesse seu site: https://protektor-xxx.vercel.app
3. Preencha o formulário de orçamento
4. Clique em "Enviar e Receber Proposta"

### **2. Verificar se funcionou:**
- ✅ **Mensagem de sucesso** aparece na tela
- ✅ **Email chega** em sac@maginf.com.br
- ✅ **Email de confirmação** chega para o cliente
- ✅ **Sem erros** no console do navegador

### **3. Se não funcionar:**
1. Pressione F12 > Console
2. Procure por erros na rede (Network tab)
3. Verifique se a API Key foi salva corretamente
4. Teste com um email seu primeiro

## 🔍 Troubleshooting

### **Erro: "API Key inválida"**
- Verifique se copiou a chave completa
- Confirme que salvou em todas as environments
- Refaça o deploy após salvar

### **Erro: "Domain not verified"**
- O domínio sendprotektor.com já está verificado
- Se persistir, use temporariamente: `onboarding@resend.dev`

### **Emails não chegam:**
- Verifique pasta de spam
- Teste com diferentes provedores (Gmail, Outlook)
- Confirme que sac@maginf.com.br está correto

## 📊 Monitoramento

### **Dashboard do Resend:**
1. Acesse: https://resend.com/emails
2. Veja estatísticas de envio
3. Monitore bounces e complaints

### **Logs do Vercel:**
1. Aba **Functions** no projeto
2. Clique em `/api/send-email`
3. Veja logs de execução

## ✅ Checklist Final

- [ ] **API Key configurada** no Vercel
- [ ] **Deploy realizado** após configuração
- [ ] **Formulário testado** com email real
- [ ] **Email recebido** em sac@maginf.com.br
- [ ] **Confirmação enviada** para cliente
- [ ] **Logs verificados** sem erros

## 🎯 Resultado Esperado

Após configurar corretamente:
- 📧 **Emails automáticos** funcionando
- 🎨 **Templates profissionais** com branding MAGINF
- 📊 **Tracking completo** de envios
- ✅ **Sistema de leads** 100% operacional

**Configuração simples: apenas adicionar a API Key no Vercel!** 🚀📧✨
