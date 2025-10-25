# 📧 Configuração do Resend para MPSHPROTEKTOR

## 🚀 Passo a Passo para Configurar o Envio de Emails

### 1. Criar Conta no Resend
1. Acesse [resend.com](https://resend.com)
2. Crie uma conta gratuita
3. Confirme seu email

### 2. Obter API Key
1. No dashboard do Resend, vá em **API Keys**
2. Clique em **Create API Key**
3. Dê um nome (ex: "MPSHPROTEKTOR Production")
4. Copie a chave gerada (começa com `re_`)

### 3. Configurar Domínio (Recomendado)
1. No Resend, vá em **Domains**
2. Clique em **Add Domain**
3. Digite seu domínio (ex: `maginf.com.br`)
4. Adicione os registros DNS fornecidos:
   - **MX Record**: `feedback-smtp.us-east-1.amazonses.com`
   - **TXT Record**: Para verificação
   - **CNAME Records**: Para DKIM

### 4. Configurar no Vercel
1. No painel do Vercel, vá em **Settings** > **Environment Variables**
2. Adicione a variável:
   - **Name**: `RESEND_API_KEY`
   - **Value**: Sua chave do Resend (ex: `re_xxxxxxxxx`)
   - **Environment**: Production, Preview, Development

### 5. Testar Localmente
```bash
# Criar arquivo .env.local
echo "RESEND_API_KEY=sua_chave_aqui" > .env.local

# Instalar dependências
npm install

# Rodar em desenvolvimento
vercel dev
```

## 📋 Configuração Atual

### Emails Configurados
- **From**: `MPSHPROTEKTOR <noreply@maginf.com.br>`
- **To (Empresa)**: `sac@maginf.com.br`
- **To (Cliente)**: Email fornecido no formulário

### Templates Incluídos
- ✅ **Email para empresa**: Notificação de nova solicitação
- ✅ **Email para cliente**: Confirmação de recebimento
- ✅ **Design responsivo**: HTML otimizado para todos os dispositivos
- ✅ **Branding MAGINF**: Cores e identidade visual

### Recursos Implementados
- 🔒 **Validação robusta**: Email e telefone obrigatórios
- 📊 **Google Analytics**: Tracking de conversões
- ⚡ **Feedback visual**: Loading states e mensagens de erro
- 📱 **Responsivo**: Funciona em todos os dispositivos

## 🛠️ Troubleshooting

### Erro: "API Key inválida"
- Verifique se a chave está correta no Vercel
- Confirme que a chave não expirou
- Teste com uma nova chave

### Erro: "Domain not verified"
- Verifique os registros DNS
- Aguarde até 24h para propagação
- Use o domínio padrão do Resend temporariamente

### Emails não chegam
- Verifique a pasta de spam
- Confirme o domínio no Resend
- Teste com diferentes provedores de email

## 📈 Limites do Plano Gratuito
- **100 emails/dia** (suficiente para começar)
- **1 domínio verificado**
- **Suporte por email**

## 🚀 Próximos Passos
1. Configure o domínio personalizado
2. Monitore as métricas no dashboard
3. Configure webhooks para tracking avançado
4. Implemente templates mais avançados

## 📞 Suporte
- **Resend Docs**: [resend.com/docs](https://resend.com/docs)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Suporte MAGINF**: sac@maginf.com.br
