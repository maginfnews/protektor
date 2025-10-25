module.exports = async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    try {
        const { nome, empresa, email, telefone, maquina, quantidade, localizacao } = req.body;

        // Validação básica
        if (!nome || !empresa || !email || !telefone || !maquina || !quantidade || !localizacao) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Email inválido' });
        }

        // Dados para envio via Resend API
        const emailData = {
            from: 'MPSHPROTEKTOR <noreply@sendprotektor.com>',
            to: ['sac@maginf.com.br'],
            subject: `🚜 Nova Solicitação de Orçamento - ${empresa}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #1B4332 0%, #16A085 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">🛡️ MPSHPROTEKTOR</h1>
                        <p style="color: #2ECC71; margin: 10px 0 0 0; font-size: 16px;">Nova Solicitação de Orçamento</p>
                    </div>
                    
                    <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                        <h2 style="color: #1B4332; margin-bottom: 20px;">📋 Dados do Cliente</h2>
                        
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 12px 0; font-weight: bold; color: #16A085; width: 30%;">👤 Nome:</td>
                                <td style="padding: 12px 0;">${nome}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 12px 0; font-weight: bold; color: #16A085;">🏢 Empresa:</td>
                                <td style="padding: 12px 0;">${empresa}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 12px 0; font-weight: bold; color: #16A085;">📧 Email:</td>
                                <td style="padding: 12px 0;"><a href="mailto:${email}" style="color: #16A085;">${email}</a></td>
                            </tr>
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 12px 0; font-weight: bold; color: #16A085;">📱 Telefone:</td>
                                <td style="padding: 12px 0;"><a href="tel:${telefone}" style="color: #16A085;">${telefone}</a></td>
                            </tr>
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 12px 0; font-weight: bold; color: #16A085;">🚜 Máquina:</td>
                                <td style="padding: 12px 0;">${maquina}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 12px 0; font-weight: bold; color: #16A085;">🔢 Quantidade:</td>
                                <td style="padding: 12px 0;">${quantidade} equipamento(s)</td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 0; font-weight: bold; color: #16A085;">📍 Localização:</td>
                                <td style="padding: 12px 0;">${localizacao}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div style="text-align: center; margin-top: 20px; color: #666; font-size: 14px;">
                        <p>MAGINF TECNOLOGIA - Divisão de Tecnologia e Projetos</p>
                        <p>📧 sac@maginf.com.br | 📱 +55 (11) 4610-6363</p>
                    </div>
                </div>
            `
        };

        // Enviar via Resend API usando https nativo
        const https = require('https');
        const postData = JSON.stringify(emailData);
        
        const options = {
            hostname: 'api.resend.com',
            port: 443,
            path: '/emails',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const result = await new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        try {
                            resolve(JSON.parse(data));
                        } catch (e) {
                            resolve({ id: 'success' });
                        }
                    } else {
                        reject(new Error(`Resend API error: ${res.statusCode} - ${data}`));
                    }
                });
            });
            
            req.on('error', (error) => {
                reject(error);
            });
            
            req.write(postData);
            req.end();
        });

        return res.status(200).json({ 
            success: true, 
            message: 'Solicitação enviada com sucesso! Verificue seu email.',
            emailId: result.id
        });

    } catch (error) {
        console.error('Erro ao enviar email:', error);
        return res.status(500).json({ 
            error: 'Erro interno do servidor',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}
