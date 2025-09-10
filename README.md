## 🚀 مرحله ۱: آشنایی با Node.js

* **Node.js** محیطی روی جاوااسکریپت هست که اجازه می‌ده جاوااسکریپت رو بیرون از مرورگر هم اجرا کنی (مثلاً روی سرور).
* با استفاده از Node.js می‌تونی:

  * سرور بسازی
  * فایل‌ها رو بخونی/بنویسی
  * با دیتابیس کار کنی
  * اپلیکیشن‌های سمت سرور بنویسی

---

## 🚀 مرحله ۲: نصب و استفاده از Express

* **Express** یک فریم‌ورک سبک برای Node.js هست که کار رو خیلی راحت‌تر می‌کنه.
* تو با این دستور نصبش کردی:

  ```bash
  npm install express
  ```
* بعدش توی فایل `app.js` اینجوری ایمپورت کردی:

  ```js
  const express = require("express");
  const app = express();
  ```
* و سرور رو روی پورت 3000 بالا آوردی:

  ```js
  app.listen(3000);
  ```

---

## 🚀 مرحله ۳: Route و Request/Response

* یاد گرفتی که هر آدرس (URL) یک **route** هست.
* با متدهای `app.get()` یا `app.post()` مشخص می‌کنی وقتی کاربر به اون آدرس بیاد چی برگردونی.

مثال:

```js
app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});
```

* تو الان سه تا route اصلی داری:

  * `/` → صفحه اصلی
  * `/about` → صفحه درباره
  * `/blog/new-blog` → فرم ساخت بلاگ

---

## 🚀 مرحله ۴: View Engine و EJS

* به جای اینکه فقط متن ساده (`res.send`) برگردونی، یاد گرفتی از **EJS** برای ساخت صفحات داینامیک استفاده کنی.

* ست کردی:

  ```js
  app.set("view engine", "ejs");
  ```

* بعد می‌تونی توی routeها صفحه رندر کنی:

  ```js
  res.render("index", { titleInApp: "home", pageTitle: "home", blogs });
  ```

* توی فایل `index.ejs` داده‌ها رو به صورت داینامیک نشون می‌دی:

  ```ejs
  <% blogs.map(({title, caption}) => { %>
    <h3><%= title %></h3>
    <p><%= caption %></p>
  <% }) %>
  ```

---

## 🚀 مرحله ۵: Layout و Componentها

* یاد گرفتی که بخش‌های تکراری (مثل `<head>`, `<header>`, `<footer>`) رو جدا کنی و با **include** استفاده کنی.

* مثال:

  ```ejs
  <%- include("./Components/header.ejs") %>
  ```

* این باعث می‌شه کدت مرتب‌تر و قابل نگهداری‌تر بشه.

---

## 🚀 مرحله ۶: داده‌های داینامیک

* یک آرایه از بلاگ‌ها ساختی:

  ```js
  const blogs = [
    {title: "title 1", caption: "lorem ipsum is a fake title 1"},
    {title: "title 2", caption: "lorem ipsum is a fake title 2"},
    {title: "title 3", caption: "lorem ipsum is a fake title 3"}
  ];
  ```
* این آرایه رو به `index.ejs` پاس می‌دی و لیست رو توی صفحه نمایش می‌دی.

---

## 🚀 مرحله ۷: صفحه 404

* با `app.use()` یک middleware آخر ساختی که وقتی هیچ routeی match نشه، صفحه 404 رو نمایش می‌ده:

  ```js
  app.use((req , res) => {
    res.status(404).render("notFounded", { titleInApp: "404", pageTitle: "404" });
  });
  ```

---

## 🚀 مرحله ۸: Middleware (اولین آشنایی)

* Middleware تابعیه که بین request و response قرار می‌گیره.
* مثلاً برای **لاگ گرفتن**:

  ```js
  app.use((req , res, next) => {
    console.log("new request:", req.method, req.path);
    next(); // خیلی مهمه → می‌فرسته به route بعدی
  });
  ```
* بدون `next()`، درخواست گیر می‌کنه و هیچ route اجرا نمی‌شه.

---

## ✅ جمع‌بندی مسیر تا اینجا

تو الان یاد گرفتی:

1. Node.js چیه و Express چطوری کمک می‌کنه.
2. سرور ساده با Express بسازی.
3. با routeها کار کنی (`get`, `post`).
4. از EJS برای صفحات داینامیک استفاده کنی.
5. از partialها (header, footer, head) برای نظم بیشتر استفاده کنی.
6. داده‌ها (مثل لیست بلاگ‌ها) رو به صفحه پاس بدی.
7. صفحه 404 اختصاصی درست کنی.
8. با middleware آشنا بشی (لاگ گرفتن یا کنترل requestها).