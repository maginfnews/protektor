# 🔧 Debug do Resend no Vercel

## ✅ Checklist de Verificação

### 1. Verificar Variáveis de Ambiente no Vercel

1. **Acesse o painel do Vercel**: https://vercel.com/dashboard
2. **Selecione o projeto**: `protektor` ou similar
3. **Vá em**: Settings → Environment Variables
4. **Verifique se existe**:
   ```
   Name: RESEND_API_KEY
   Value: re_Jr4jLwwQ_KUY29u62G4SyP9G4Y6WCTAbt
   Environment: ✅ Production ✅ Preview ✅ Development
   ```

### 2. Verificar Status da API Key no Resend

1. **Acesse**: https://resend.com/api-keys
2. **Verifique**:
   - ✅ A chave `re_Jr4jLwwQ_KUY29u62G4SyP9G4Y6WCTAbt` está ativa
   - ✅ Não expirou
   - ✅ Tem permissões de envio

### 3. Verificar Domínio no Resend

1. **Acesse**: https://resend.com/domains
2. **Verifique**:
   - ✅ `sendprotektor.com` está verificado
   - ✅ DNS está configurado corretamente
   - ✅ Status: "Verified"

### 4. Testar Localmente

```bash
# 1. Criar arquivo de ambiente local
cp .env.example.local .env.local

# 2. Editar .env.local com sua chave real
# RESEND_API_KEY=re_Jr4jLwwQ_KUY29u62G4SyP9G4Y6WCTAbt

# 3. Testar configuração
node test-resend.js

# 4. Se OK, testar servidor local
npm install
python -m http.server 3000
```

### 5. Verificar Logs no Vercel

1. **Acesse**: Vercel Dashboard → Projeto → Functions
2. **Clique em**: `/api/contact`
3. **Verifique logs** para erros como:
   - `RESEND_API_KEY não configurada`
   - `401 Unauthorized`
   - `403 Forbidden`

## 🚨 Problemas Comuns

### Erro: "RESEND_API_KEY não configurada"
- ❌ Variável não existe no Vercel
- ❌ Nome da variável está errado
- ❌ Não está marcada para o ambiente correto

### Erro: "401 Unauthorized"
- ❌ API Key inválida ou expirada
- ❌ Chave copiada incorretamente

### Erro: "403 Forbidden"
- ❌ Domínio não verificado no Resend
- ❌ Email "from" não autorizado

### Erro: "Domain not found"
- ❌ `sendprotektor.com` não existe no Resend
- ❌ DNS não configurado

## 🔄 Redeploy Após Correção

Após corrigir as variáveis de ambiente:

1. **Redeploy manual**: Vercel Dashboard → Deployments → Redeploy
2. **Ou commit novo**: Git push para trigger automático
3. **Testar formulário**: Preencher e enviar no site

## 📞 Contatos de Suporte

- **Resend Support**: https://resend.com/support
- **Vercel Support**: https://vercel.com/support
- **Documentação**: https://resend.com/docs
