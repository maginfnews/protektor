#!/usr/bin/env node

/**
 * Script de teste para verificar o formulário de representante
 * Execute: node test-representative-form.js
 */

async function testRepresentativeForm() {
    console.log('🧪 TESTE DO FORMULÁRIO DE REPRESENTANTE\n');
    
    const testData = {
        access_key: '69da808d-ff05-4d39-986e-55cccda23f2c',
        subject: 'Teste - Nova Candidatura de Representante MPSH-Protektor',
        from_name: 'Site MPSH-Protektor (Teste)',
        nome: 'João Silva Santos',
        email: 'joao.teste@email.com',
        telefone: '(11) 99999-9999',
        cidade: 'Ribeirão Preto',
        estado: 'SP',
        experiencia: '5-10-anos',
        empresa: 'Agro Silva LTDA',
        area_atuacao: 'vendas-maquinas',
        regiao_interesse: 'Interior de São Paulo - região de Ribeirão Preto, Araraquara e Franca',
        motivacao: 'Tenho experiência no agronegócio e acredito no potencial do MPSH-Protektor para revolucionar a proteção hidráulica no setor.'
    };
    
    console.log('📋 Dados de teste:');
    console.log('   Nome:', testData.nome);
    console.log('   Email:', testData.email);
    console.log('   Telefone:', testData.telefone);
    console.log('   Cidade/Estado:', `${testData.cidade}/${testData.estado}`);
    console.log('   Experiência:', testData.experiencia);
    console.log('   Área de Atuação:', testData.area_atuacao);
    
    console.log('\n📧 Enviando para Web3Forms...');
    
    try {
        const formData = new FormData();
        Object.keys(testData).forEach(key => {
            formData.append(key, testData[key]);
        });
        
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });
        
        console.log('   Status da resposta:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ ERRO no Web3Forms:', errorText);
            return;
        }
        
        const result = await response.json();
        console.log('✅ Web3Forms: Email enviado com sucesso!');
        console.log('   Resposta:', result);
        
        console.log('\n🎉 TESTE CONCLUÍDO COM SUCESSO!');
        console.log('📧 Verifique o email configurado no Web3Forms');
        
    } catch (error) {
        console.error('❌ ERRO ao testar Web3Forms:', error.message);
        
        if (error.code === 'ENOTFOUND') {
            console.log('\n🔍 DIAGNÓSTICO: Erro de conexão');
            console.log('   - Verifique sua conexão com a internet');
            console.log('   - Confirme se não há firewall bloqueando');
        }
    }
}

// Executar teste
testRepresentativeForm().catch(console.error);
