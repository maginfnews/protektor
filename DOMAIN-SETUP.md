# 🌐 Configuração do Domínio notificacao.protektor.com.br

## ✅ Status Atual
- **Domínio**: `notificacao.protektor.com.br`
- **Email From**: `noreply@notificacao.protektor.com.br`
- **Teste**: ✅ Funcionando (ID: 63d52e9f-532d-466d-92f6-203c7b5b6d4f)

## 🔧 Verificação no Painel Resend

### 1. Acessar Painel de Domínios
- **URL**: https://resend.com/domains
- **Login**: Conta associada à API Key `re_Jr4jLwwQ_...`

### 2. Verificar Status do Domínio
Procure por `notificacao.protektor.com.br` e confirme:
- ✅ **Status**: Verified
- ✅ **DNS Records**: Configurados
- ✅ **DKIM**: Ativo

### 3. Registros DNS Necessários

Se o domínio não estiver verificado, adicione estes registros DNS:

```dns
# SPF Record
Type: TXT
Name: notificacao.protektor.com.br
Value: "v=spf1 include:_spf.resend.com ~all"

# DKIM Record (exemplo - use o valor fornecido pelo Resend)
Type: CNAME
Name: resend._domainkey.notificacao.protektor.com.br
Value: resend._domainkey.resend.com

# MX Record (opcional para recebimento)
Type: MX
Name: notificacao.protektor.com.br
Value: 10 mx.resend.com
```

## 🧪 Teste de Verificação

Execute o teste para confirmar:
```bash
node test-resend.js
```

**Resultado esperado**:
- ✅ Status: 200
- ✅ Email enviado com sucesso
- ✅ ID do email retornado

## 🚨 Possíveis Problemas

### Erro 403 - Domain not verified
```json
{
  "statusCode": 403,
  "message": "The notificacao.protektor.com.br domain is not verified"
}
```

**Solução**:
1. Verificar DNS no painel do Resend
2. Aguardar propagação DNS (até 48h)
3. Usar domínio padrão temporariamente: `onboarding@resend.dev`

### Erro 401 - Unauthorized
```json
{
  "statusCode": 401,
  "message": "Invalid API key"
}
```

**Solução**:
1. Verificar API Key no Vercel
2. Confirmar permissões da chave
3. Regenerar chave se necessário

## 📧 Configuração de Produção

### Vercel Environment Variables
```
RESEND_API_KEY=re_Jr4jLwwQ_KUY29u62G4SyP9G4Y6WCTAbt
NODE_ENV=production
```

### Email Settings
```javascript
from: 'MPSHPROTEKTOR <noreply@notificacao.protektor.com.br>'
to: ['site@maginf.com.br']
```

## 🔄 Deploy

Após confirmar que o domínio está funcionando:

```bash
git add .
git commit -m "feat: configurar domínio personalizado notificacao.protektor.com.br"
git push
```

## 📞 Suporte

- **Resend Docs**: https://resend.com/docs/send-with-nodejs
- **DNS Help**: https://resend.com/docs/dashboard/domains/introduction
- **API Reference**: https://resend.com/docs/api-reference/emails/send-email
