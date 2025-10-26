#!/usr/bin/env node

/**
 * Script de teste para verificar configuração do Resend
 * Execute: node test-resend.js
 */

require('dotenv').config({ path: '.env.local' });

async function testResend() {
    console.log('🧪 TESTE DE CONFIGURAÇÃO RESEND\n');
    
    // 1. Verificar variáveis de ambiente
    console.log('1️⃣ Verificando variáveis de ambiente:');
    console.log('   RESEND_API_KEY presente:', !!process.env.RESEND_API_KEY);
    console.log('   API Key length:', process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.length : 0);
    console.log('   API Key prefix:', process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.substring(0, 10) + '...' : 'undefined');
    console.log('   NODE_ENV:', process.env.NODE_ENV || 'undefined');
    
    if (!process.env.RESEND_API_KEY) {
        console.error('\n❌ ERRO: RESEND_API_KEY não encontrada!');
        console.log('\n📋 PASSOS PARA CORRIGIR:');
        console.log('1. Copie o arquivo: cp .env.example.local .env.local');
        console.log('2. Edite .env.local e adicione sua chave do Resend');
        console.log('3. Execute novamente: node test-resend.js');
        return;
    }
    
    // 2. Testar conexão com API do Resend
    console.log('\n2️⃣ Testando conexão com API do Resend...');
    
    try {
        const emailData = {
            from: 'MPSHPROTEKTOR <noreply@notificacao.protektor.com.br>',
            to: ['site@maginf.com.br'],
            subject: '🧪 Teste de Configuração - MPSHPROTEKTOR',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h1 style="color: #1B4332;">🧪 Teste de Configuração</h1>
                    <p>Este é um email de teste para verificar se o Resend está funcionando corretamente.</p>
                    <p><strong>Data/Hora:</strong> ${new Date().toLocaleString('pt-BR')}</p>
                    <p><strong>Status:</strong> ✅ Configuração OK</p>
                </div>
            `
        };
        
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData)
        });
        
        console.log('   Status da resposta:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ ERRO na API do Resend:', errorText);
            
            // Analisar tipos de erro comuns
            if (response.status === 401) {
                console.log('\n🔍 DIAGNÓSTICO: Erro 401 - Unauthorized');
                console.log('   - Verifique se a API Key está correta');
                console.log('   - Confirme se a chave não expirou');
                console.log('   - Acesse: https://resend.com/api-keys');
            } else if (response.status === 403) {
                console.log('\n🔍 DIAGNÓSTICO: Erro 403 - Forbidden');
                console.log('   - Verifique se o domínio está verificado no Resend');
                console.log('   - Confirme se o email "from" está autorizado');
            }
            
            return;
        }
        
        const result = await response.json();
        console.log('✅ Email enviado com sucesso!');
        console.log('   ID do email:', result.id);
        
        console.log('\n🎉 CONFIGURAÇÃO OK! O Resend está funcionando.');
        
    } catch (error) {
        console.error('❌ ERRO ao testar Resend:', error.message);
        
        if (error.code === 'ENOTFOUND') {
            console.log('\n🔍 DIAGNÓSTICO: Erro de conexão');
            console.log('   - Verifique sua conexão com a internet');
            console.log('   - Confirme se não há firewall bloqueando');
        }
    }
}

// Executar teste
testResend().catch(console.error);
