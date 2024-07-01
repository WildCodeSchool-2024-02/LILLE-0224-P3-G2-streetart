// Load environment variables from the .env file
require('dotenv').config();

const nodemailer = require('nodemailer');

// Configuration of transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS, // Your e-mail adress
    pass: process.env.EMAIL_PASSWORD  // Your e-mail password 
  }
});

// Function for send an e-mail
const sendEmail = async (to, subject, text, html) => {
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS, // sender address
        to,                          // recipient address
        subject,                // object e-mail
        text,                      // content txt e-mail
        html                       // content HTML e-mail
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.info(`Email sent: ${info.response}`);
    } catch (error) {
        console.error('Error sending email: ', error);
    }
};

const sendEmailWelcome = async (req, res, next) => {
    const { to, name } = req.body;
    const subject = `Spot Lille Art - Bienvenue ${name}`;
    const textContent = `Bonjour ${name},\n\nBienvenue chez Spot Lille Art! Nous sommes ravis de vous avoir parmi nous. Vous pouvez maintenant explorer notre site et découvrir les merveilles de l'art de rue à Lille.\n\nMerci de votre inscription et à bientôt!\n\nL'équipe Spot Lille Art.`;
    const htmlContent = `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Bienvenue chez Spot Lille Art</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f6f6f6;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border: 1px solid #dddddd;
                padding: 20px;
            }
            .header {
                background-color: #007BFF;
                color: #ffffff;
                text-align: center;
                padding: 10px 0;
            }
            .header h1 {
                margin: 0;
            }
            .content {
                margin: 20px 0;
            }
            .footer {
                text-align: center;
                font-size: 12px;
                color: #888888;
                margin-top: 20px;
                padding-top: 10px;
                border-top: 1px solid #dddddd;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007BFF;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
                margin: 20px 0;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>Bienvenue chez Spot Lille Art</h1>
            </div>
            <div class="content">
                <p>Bonjour ${name},</p>
                <p>Bienvenue chez Spot Lille Art! Nous sommes ravis de vous avoir parmi nous. Vous pouvez maintenant explorer notre site et découvrir les merveilles de l'art de rue à Lille.</p>
                <p>Merci de votre inscription et à bientôt!</p>
                <p>Merci,<br>L'équipe Spot Lille Art.</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 Spot Lille Art. Tous droits réservés.</p>
                <p>Lille, France.</p>
            </div>
        </div>
    </body>
    </html>`;
    try {
        await sendEmail(to, subject, textContent, htmlContent)
        res.status(201);
    } catch (error) {
        next(error)
    }
}

const sendEmailRecoverPwd = async (req, res, next) => {
    const { to, name, token } = req.body;
    const subject = 'Spot Lille Art - Récupération de mot de passe';
    const textContent = `Bonjour ${name},\n\nNous avons reçu une demande de réinitialisation de votre mot de passe. Cliquez sur le lien suivant pour réinitialiser votre mot de passe : ${`${process.env.CLIENT_URL}/recuperation-mdp/${token}`}\n\nSi vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet e-mail en toute sécurité.\n\nMerci,\nL'équipe Spot Lille Art`;
    const htmlContent = `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Récupération de mot de passe</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f6f6f6;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border: 1px solid #dddddd;
                padding: 20px;
            }
            .header {
                background-color: #007BFF;
                color: #ffffff;
                text-align: center;
                padding: 10px 0;
            }
            .header h1 {
                margin: 0;
            }
            .content {
                margin: 20px 0;
            }
            .footer {
                text-align: center;
                font-size: 12px;
                color: #888888;
                margin-top: 20px;
                padding-top: 10px;
                border-top: 1px solid #dddddd;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007BFF;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
                margin: 20px 0;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>Récupération de mot de passe</h1>
            </div>
            <div class="content">
                <p>Bonjour ${name},</p>
                <p>Nous avons reçu une demande de réinitialisation de votre mot de passe. Cliquez sur le bouton ci-dessous pour réinitialiser votre mot de passe :</p>
                <a href="${`${process.env.CLIENT_URL}/recuperation-mdp/${token}`}" class="button">Réinitialiser mon mot de passe</a>
                <p>Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet e-mail en toute sécurité.</p>
                <p>Merci,<br>L'équipe Spot Lille Art.</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 Spot Lille Art. Tous droits réservés.</p>
                <p>Lille, France.</p>
            </div>
        </div>
    </body>
    </html>`;
    try {
        await sendEmail(to, subject, textContent, htmlContent)
        res.status(201);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    sendEmailWelcome,
    sendEmailRecoverPwd
}
