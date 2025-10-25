// API para envio de email usando Resend
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    // Permitir apenas POST
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

        // Template do email para a empresa
        const emailToCompany = await resend.emails.send({
            from: 'MPSHPROTEKTOR <noreply@sendprotektor.com>',
            to: ['sac@maginf.com.br'],
            subject: `🚜 Nova Solicitação de Orçamento - ${empresa}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
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
                        
                        <div style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #16A085;">
                            <h3 style="color: #1B4332; margin: 0 0 10px 0;">⚡ Próximos Passos</h3>
                            <p style="margin: 0; color: #666;">Entre em contato com o cliente em até 24 horas para apresentar a proposta personalizada do MPSHPROTEKTOR.</p>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 20px; color: #666; font-size: 14px;">
                        <p>MAGINF TECNOLOGIA - Divisão de Tecnologia e Projetos</p>
                        <p>📧 sac@maginf.com.br | 📱 +55 (11) 4610-6363</p>
                    </div>
                </div>
            `
        });

        // Email de confirmação para o cliente
        const emailToClient = await resend.emails.send({
            from: 'MPSHPROTEKTOR <noreply@sendprotektor.com>',
            to: [email],
            subject: '✅ Solicitação Recebida - MPSHPROTEKTOR | MAGINF TECNOLOGIA',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
                    <div style="background: linear-gradient(135deg, #1B4332 0%, #16A085 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">🛡️ MPSHPROTEKTOR</h1>
                        <p style="color: #2ECC71; margin: 10px 0 0 0; font-size: 16px;">Solicitação Recebida com Sucesso!</p>
                    </div>
                    
                    <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                        <h2 style="color: #1B4332; margin-bottom: 20px;">Olá, ${nome}! 👋</h2>
                        
                        <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                            Recebemos sua solicitação de orçamento para o <strong>MPSHPROTEKTOR</strong> e agradecemos o interesse em nossa tecnologia de proteção hidráulica.
                        </p>
                        
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2ECC71;">
                            <h3 style="color: #1B4332; margin: 0 0 15px 0;">📋 Resumo da sua solicitação:</h3>
                            <ul style="margin: 0; padding-left: 20px; color: #666;">
                                <li><strong>Empresa:</strong> ${empresa}</li>
                                <li><strong>Tipo de máquina:</strong> ${maquina}</li>
                                <li><strong>Quantidade:</strong> ${quantidade} equipamento(s)</li>
                                <li><strong>Localização:</strong> ${localizacao}</li>
                            </ul>
                        </div>
                        
                        <div style="background: linear-gradient(135deg, #16A085, #2ECC71); padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: white; margin: 0 0 15px 0;">⚡ Próximos Passos</h3>
                            <p style="color: white; margin: 0; line-height: 1.6;">
                                Nossa equipe técnica entrará em contato em até <strong>24 horas</strong> para:
                            </p>
                            <ul style="color: white; margin: 10px 0 0 0; padding-left: 20px;">
                                <li>Entender suas necessidades específicas</li>
                                <li>Apresentar a solução ideal para sua operação</li>
                                <li>Elaborar uma proposta personalizada</li>
                            </ul>
                        </div>
                        
                        <div style="background: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107; margin: 20px 0;">
                            <p style="margin: 0; color: #856404;">
                                <strong>💡 Dica:</strong> Enquanto isso, que tal assistir nosso vídeo demonstrativo e conhecer mais sobre como o MPSHPROTEKTOR pode proteger seus equipamentos?
                            </p>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 20px;">
                        <p style="color: #666; margin-bottom: 15px;">Dúvidas? Entre em contato conosco:</p>
                        <div style="background: white; padding: 20px; border-radius: 8px; display: inline-block;">
                            <p style="margin: 5px 0; color: #16A085;"><strong>📧 sac@maginf.com.br</strong></p>
                            <p style="margin: 5px 0; color: #16A085;"><strong>📱 +55 (11) 4610-6363</strong></p>
                            <p style="margin: 5px 0; color: #666; font-size: 14px;">Guarulhos, SP</p>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
                        <p>MAGINF TECNOLOGIA - Divisão de Tecnologia e Projetos</p>
                        <p>CNPJ: 26.643.624/0001-10</p>
                    </div>
                </div>
            `
        });

        console.log('Emails enviados:', { emailToCompany: emailToCompany.data, emailToClient: emailToClient.data });

        return res.status(200).json({ 
            success: true, 
            message: 'Solicitação enviada com sucesso! Verificue seu email.',
            emailIds: {
                company: emailToCompany.data?.id,
                client: emailToClient.data?.id
            }
        });

    } catch (error) {
        console.error('Erro ao enviar email:', error);
        return res.status(500).json({ 
            error: 'Erro interno do servidor',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}
