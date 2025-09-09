## 🔹 Client و Server یعنی چی؟

* **Server (سرور)** → برنامه‌ای که همیشه روشنه و منتظر درخواست‌هاست. (مثل مغازه‌دار که پشت دخل وایساده)
* **Client (کلاینت)** → برنامه یا دستگاهی که درخواست می‌فرسته. (مثل مشتری که میاد چیزی می‌خره یا می‌پرسه)

ارتباطشون معمولاً از طریق **HTTP** (یا پروتکل‌های دیگه مثل WebSocket, TCP, …) انجام میشه.

---

## 🔹 ساخت یک Server ساده در Node.js

با ماژول داخلی `http` میشه سرور ساخت:

```js
// server.js
const http = require('http');

// ساخت سرور
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('سلام! این پاسخ از سرور Node.js است 🚀');
});

// گوش دادن روی پورت 3000
server.listen(3000, () => {
  console.log('سرور روی http://localhost:3000 اجرا شد');
});
```

📌 حالا اگه توی مرورگر بری به `http://localhost:3000` → سرورت جواب میده.
اینجا مرورگر (Client) یه درخواست فرستاده و Node.js (Server) جواب داده.

---

## 🔹 ساخت یک Client در Node.js

Node.js خودش می‌تونه به یه سرور دیگه درخواست بفرسته.

```js
// client.js
const http = require('http');

http.get('http://localhost:3000', (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('پاسخ از سرور:', data);
  });
});
```

📌 اینجا `client.js` میره به سرور `localhost:3000` وصل میشه و پاسخش رو می‌گیره.

---

## 🔹 تصویر ذهنی ساده

* **Server** = رستوران (منتظر مشتری‌ها)
* **Client** = مشتری (سفارش میده)
* **Request (درخواست)** = سفارش غذا
* **Response (پاسخ)** = غذا یا جواب سفارش

---

🔑 **خلاصه:**

* در Node.js با `http.createServer` می‌تونی سرور بسازی.
* همون Node.js می‌تونه کلاینت باشه و به سرور دیگه درخواست بفرسته.
* مرورگر، Postman یا حتی یه گوشی موبایل هم می‌تونن کلاینت باشن.