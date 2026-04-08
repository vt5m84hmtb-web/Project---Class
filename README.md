# Turma Connect

Sistema de gestão de turma com mural de tarefas e notificações push.

## Como usar

1. Instale as dependências: `npm install`

2. Execute o servidor de notificações em um terminal: `npm start`

3. Em outro terminal, sirva o site: `npm run serve`

4. Abra `http://localhost:8080` no navegador (recomendado Chrome ou Firefox).

5. Para receber notificações push no celular:
   - Acesse o site no celular via Wi-Fi na mesma rede (substitua localhost pelo IP da máquina).
   - Instale o site como PWA (no Chrome, clique em "Instalar" no menu).
   - Permita notificações quando solicitado.

6. Para enviar notificações:
   - Faça login como admin e publique algo.

## Servidor de Notificações

O servidor Node.js (`server.js`) gerencia as inscrições e envia notificações push.

## Notas

- Para produção, hospede o servidor em um domínio HTTPS e configure VAPID keys próprias.
- As notificações funcionam quando o app não está aberto (background).

Para executar:

```
npm install
npm start
```

O servidor roda na porta 3000. Certifique-se de que o navegador possa acessar `http://localhost:3000`.

## Notas

- Para produção, hospede o servidor em um domínio HTTPS e configure VAPID keys próprias.
- As notificações funcionam quando o app não está aberto (background).
