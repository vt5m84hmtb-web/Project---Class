const express = require('express');
const webpush = require('web-push');
const app = express();
app.use(express.json());

// VAPID keys (gerar novas para produção)
const vapidKeys = {
  publicKey: 'BF_Z3N6ADy35bdj4T91GAKbAhArtSMi-cTWt12bLxTq4FfIq2APK5ObX9Jfjx3l4PsjANwtWFjC9xiXBtdfvBH4',
  privateKey: '6WyeGC8cOi95NIhSEvYCtbV3DDV23ua052Y1jDTvvLk'
};

webpush.setVapidDetails(
  'mailto:admin@turmaconnect.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// Armazenar subscriptions (em produção, use banco de dados)
let subscriptions = [];

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({ message: 'Subscribed successfully' });
});

app.post('/send-notification', (req, res) => {
  const { title, body } = req.body;

  const payload = JSON.stringify({
    title: title || 'Turma Connect',
    body: body || 'Nova atualização no mural!'
  });

  const promises = subscriptions.map(sub =>
    webpush.sendNotification(sub, payload).catch(err => console.error(err))
  );

  Promise.all(promises).then(() => res.status(200).json({ message: 'Notifications sent' }));
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});