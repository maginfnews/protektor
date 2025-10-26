#!/usr/bin/env node

/**
 * Script de teste para verificar Formspree
 * Execute: node test-formspree.js
 */

async function testFormspree() {
    console.log('🧪 TESTE DO FORMSPREE\n');
    
    const testData = {
        nome: 'João Silva',
        empresa: 'Fazenda Teste LTDA',
        email: 'teste@fazendateste.com.br',
        telefone: '(11) 99999-9999',
        maquina: 'trator',
        quantidade: '3',
        localizacao: 'Ribeirão Preto / SP',
        _subject: '🚜 Teste MPSH Protektor - Fazenda Teste LTDA',
        _replyto: 'teste@fazendateste.com.br'
    };
    
    console.log('📋 Dados de teste:');
    console.log('   Nome:', testData.nome);
    console.log('   Empresa:', testData.empresa);
    console.log('   Email:', testData.email);
    console.log('   Telefone:', testData.telefone);
    console.log('   Máquina:', testData.maquina);
    console.log('   Quantidade:', testData.quantidade);
    console.log('   Localização:', testData.localizacao);
    
    console.log('\n📧 Enviando para Formspree...');
    
    try {
        const response = await fetch('https://formspree.io/f/xdkogvpb', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });
        
        console.log('   Status da resposta:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ ERRO no Formspree:', errorText);
            return;
        }
        
        const result = await response.json();
        console.log('✅ Formspree: Email enviado com sucesso!');
        console.log('   Resposta:', result);
        
        console.log('\n🎉 TESTE CONCLUÍDO COM SUCESSO!');
        console.log('📧 Verifique o email em: site@maginf.com.br');
        
    } catch (error) {
        console.error('❌ ERRO ao testar Formspree:', error.message);
        
        if (error.code === 'ENOTFOUND') {
            console.log('\n🔍 DIAGNÓSTICO: Erro de conexão');
            console.log('   - Verifique sua conexão com a internet');
            console.log('   - Confirme se não há firewall bloqueando');
        }
    }
}

// Executar teste
testFormspree().catch(console.error);
