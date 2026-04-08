// Service Worker para Turma Connect
self.addEventListener('install', event => {
  console.log('Service Worker instalado');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Service Worker ativado');
  event.waitUntil(clients.claim());
});

self.addEventListener('push', event => {
  console.log('Push recebido', event);

  let data = {};
  if (event.data) {
    data = event.data.json();
  }

  const options = {
    body: data.body || 'Nova atualização no mural!',
    icon: 'logo.png',
    badge: 'logo.png',
    vibrate: [200, 100, 200],
    data: {
      url: data.url || '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Turma Connect', options)
  );
});

self.addEventListener('notificationclick', event => {
  console.log('Notificação clicada', event);
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      const url = event.notification.data.url || '/';
      for (let i = 0; i < clientList.length; i++) {
        let client = clientList[i];
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});