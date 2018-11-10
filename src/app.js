const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const CryptoJS = require('crypto-js');

const app = express();
const port = process.env.PORT || 5000;
const secretPhrase = 'Secret Phrase';

app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.post('/mail', (req, res) => {
  const { to, subject, text } = req.body;
  const from = req.body.from + '@gmail.com';
  const password = CryptoJS.AES.decrypt(req.body.password, secretPhrase).toString(CryptoJS.enc.Utf8);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: from,
      pass: password
    }
  });
  const mailOptions = { from, to, subject, text };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.status(err.responseCode).json({ error: err.response});
    } else {
      console.log('Message Sent: ' + info.response);
      res.json({ message: 'Message Send!' });
    }
  });
});

module.exports = app;