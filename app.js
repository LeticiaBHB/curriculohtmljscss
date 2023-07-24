// Configuração do nodemailer (substitua pelos seus dados de e-mail)
const transporter = nodemailer.createTransport({
    service: 'servidor de email', // Ex: 'Gmail', 'Outlook'
    auth: {
      user: 'seu_email@exemplo.com',
      pass: 'sua_senha_do_email',
    },
  });
  
  // Habilitar o uso do bodyParser para obter os dados do formulário
  app.use(bodyParser.urlencoded({ extended: true }));
  
  // Rota para enviar o e-mail
  app.post('/enviar-email', (req, res) => {
    const { nome, tel, email, idade, linkedIn, urgencia, 'dia-da-semana': diaSemana, horario, Cidade, assunto, mensagem } = req.body;
  
    const mailOptions = {
      from: email,
      to: 'seu_email@exemplo.com', // Substitua pelo seu endereço de e-mail
      subject: 'Questionário de Contato',
      text: `Nome: ${nome}\nTelefone: ${tel}\nE-mail: ${email}\nIdade: ${idade}\nLinkedIn: ${linkedIn}\nUrgência: ${urgencia}\nDia da Semana: ${diaSemana.join(', ')}\nHorário: ${horario}\nCidade: ${Cidade}\nAssunto: ${assunto}\nMensagem:\n${mensagem}`,
    };
  
    // Envia o e-mail
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send('Erro ao enviar o e-mail.');
      } else {
        console.log('E-mail enviado: ' + info.response);
        res.send('Obrigado por entrar em contato! Seu questionário foi enviado com sucesso.');
      }
    });
  
    // Envia uma cópia do e-mail para o remetente
    const copyMailOptions = { ...mailOptions, to: email };
    transporter.sendMail(copyMailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Cópia do e-mail enviado: ' + info.response);
      }
    });
  });
  
  // Iniciar o servidor na porta especificada
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
