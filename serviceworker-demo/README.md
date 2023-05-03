# Service Worker App Demo

This is a demo for service workers and web push notifications that work in modern web browsers.

## How to use

First, install all Node.js dependencies via `npm install`.

This demo requires access to a mongodb instance for storing push subscription info to send push updates at some other point in time. It also requires specifying a public and private key for identifying your server to the push service's server. These keys, known as VAPID public/private keys, can be generated and printed to the console when first executing the site. The site can be executed by running `node index.js` which will start a server on port `2020`. You'll need to populate those keys as environment variables and execute `node index.js` again to ensure that push messages can be configured from your server.

If you are using VS Code you can set the environment variables mentioned above in your `launch.json` file as follows:

```js
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch demo",
            "program": "${workspaceFolder}/serve.js",
            "env": {
                "DATABASE_CONNECTION_URI": "YOUR CONNECTION STRING",
                "VAPID_PUBLIC_KEY": "YOUR PUBLIC KEY",
                "VAPID_PRIVATE_KEY": "YOUR PRIVATE KEY",
            }
        },
        {
            "type": "node",
            "request": "launch",
            "name": "Job",
            "program": "${workspaceFolder}/notify.js",
            "env": {
                "DATABASE_CONNECTION_URI": "YOUR CONNECTION STRING",
                "VAPID_PUBLIC_KEY": "YOUR PUBLIC KEY",
                "VAPID_PRIVATE_KEY": "YOUR PRIVATE KEY",
            }
        }
    ]
}
```

Alternatively, you can modify `configured-web-push.js` and `db.js` and set the values there explicitly:

```js
const databaseConnectionURI = process.env.DATABASE_CONNECTION_URI || '';
const vapidPublicKey = process.env.VAPID_PUBLIC_KEY || '';
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY || '';
```