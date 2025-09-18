نحوه اینزت دیتا در mySql

```sql
INSERT INTO "courses" {`id`, `title`, `caption`, `price`, `teacher id`} VALUES (NULL, "name of course", "caption of course", 50000, "name of teacher")
```

یا به صورت خلاصه تر (فقط در صورتی که عملیات پست انجام بدیم نه پُوت)

```sql
INSERT INTO "courses" VALUES (NULL, "name of course", "caption of course", 50000, "name of teacher")
```

-------------

برای دریافت اطلاعات تمام اطلاعات از تیبل کوزسس

```sql
SELECT * FROM `courses`
```

برای اینکه فقط چند کلید یا کی رو برداریم بجای استار  

```sql
SELECT `title`, `caption`, `price`, `teacher` FROM `courses`
```

و برای شرط گذاشتن 

```sql
SELECT `title`, `caption`, `price`, `teacher` FROM `courses` WHERE teacher = "name teacher"
```

و برای چند شرط گذاشتن 

```sql
SELECT `title`, `caption`, `price`, `teacher` FROM `courses` WHERE teacher = "name teacher" AND  price > 200000
```
```sql
SELECT `title`, `caption`, `price`, `teacher` FROM `courses` WHERE teacher = "name teacher" OR  price > 200000
```

---


برای عملایت اپدیت

```sql
UPDATE courses SET teacher = "محمد امین" , title = "npm مقدماتی تا پیشرفته" WHERE title = "npm برای فرانت اند کار ها"
```
و برای اپدیت فقط یک کلید

```sql
UPDATE courses SET teacher = "محمد امین" WHERE title = "REACT مقدماتی تا پیشرفته"
```

----

و در اخر برای حذف ایتم

```sql
DELETE FROM `courses` WHERE teacher = "leach mob"
```
میتونیم بدون بک تیک بزاریم

```sql
DELETE FROM courses WHERE teacher = "leach mob"
```