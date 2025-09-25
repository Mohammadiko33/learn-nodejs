function wrapId(name, wrap = false) {
  return wrap ? `\`${name}\`` : name;
}

function normalizeConditions(conditions) {
  // conditions میتونه:
  // - آبجکت: { col: value, col2: { op: '>', value: 10 } }
  // - آرایه: [{ column:'price', op:'>', value:200 }, 'raw sql string']
  // - null/undefined
  if (!conditions) return [];
  if (Array.isArray(conditions)) return conditions;
  // object -> تبدیل به آرایه شرط‌ها
  return Object.keys(conditions).map((k) => {
    const v = conditions[k];
    if (v && typeof v === "object" && !Array.isArray(v) && ("op" in v)) {
      return { column: k, op: v.op, value: v.value };
    }
    // مقدار ساده => مساوی
    return { column: k, op: "=", value: v };
  });
}

function readQuery({
  table,
  columns = [],        // [] => *
  conditions = null,   // object or array (see normalizeConditions)
  wrapIdentifiers = false, // اگر true، آی‌دی‌ها با backtick بسته میشن
}) {
  if (!table) throw new Error("table is required");

  const cols = Array.isArray(columns) && columns.length > 0
    ? columns.map(c => wrapId(c, wrapIdentifiers)).join(", ")
    : "*";

  const conds = normalizeConditions(conditions);
  const params = [];
  let where = "";

  if (conds.length > 0) {
    const parts = conds.map((cond) => {
      if (typeof cond === "string") return `(${cond})`; // raw
      const col = wrapId(cond.column, wrapIdentifiers);
      const op = (cond.op || "=").toUpperCase();

      // پشتیبانی از IN
      if (op === "IN" && Array.isArray(cond.value)) {
        const placeholders = cond.value.map(() => "?").join(", ");
        params.push(...cond.value);
        return `${col} IN (${placeholders})`;
      }

      // IS NULL / IS NOT NULL
      if ((op === "IS" || op === "IS NOT") && cond.value === null) {
        return `${col} ${op} NULL`;
      }

      params.push(cond.value);
      return `${col} ${op} ?`;
    });

    where = ` WHERE ${parts.join(" AND ")}`;
  }

  const query = `SELECT ${cols} FROM ${wrapId(table, wrapIdentifiers)}${where}`;
  return { query, params };
}

function createQuery({
  table,
  columns = [],      // optional: ['id','title',...]
  values = null,     // array positional OR object { col: val, ... }
  wrapIdentifiers = false,
}) {
  if (!table) throw new Error("table is required");
  if (!values) throw new Error("values are required (array or object)");

  let colsPart = "";
  const params = [];
  let placeholders = "";

  if (Array.isArray(values)) {
    // اگر columns داده شده، ازش استفاده می‌کنیم، در غیر اینصورت VALUES positional ولی بدون ستون‌ها
    if (columns.length > 0) {
      colsPart = `(${columns.map(c => wrapId(c, wrapIdentifiers)).join(", ")})`;
    }
    placeholders = values.map(() => "?").join(", ");
    params.push(...values);
  } else if (typeof values === "object") {
    // حذف id اگر null باشه
    const keys = Object.keys(values).filter(k => !(k === "id" && values[k] === null));
    colsPart = `(${keys.map(k => wrapId(k, wrapIdentifiers)).join(", ")})`;
    placeholders = keys.map(() => "?").join(", ");
    params.push(...keys.map(k => values[k]));
} else {
    throw new Error("values must be array or object");
  }

  const query = `INSERT INTO ${wrapId(table, wrapIdentifiers)} ${colsPart} VALUES (${placeholders})`;
  return { query, params };
}

function updateQuery({
  table,
  updates,           // object { col: val, ... } or array [{ column, value, op? }]
  conditions = null, // like select
  wrapIdentifiers = false,
}) {
  if (!table) throw new Error("table is required");
  if (!updates || (typeof updates !== "object")) throw new Error("updates required as object");

  const params = [];
  // updates object -> array of {column, value}
  const updatesArr = Array.isArray(updates)
    ? updates
    : Object.keys(updates).map(k => ({ column: k, value: updates[k] }));

  const setParts = updatesArr.map(u => {
    const col = wrapId(u.column, wrapIdentifiers);
    params.push(u.value);
    return `${col} = ?`;
  });

  const conds = normalizeConditions(conditions);
  let where = "";
  if (conds.length > 0) {
    const condParts = conds.map((cond) => {
      if (typeof cond === "string") return `(${cond})`; // raw
      const col = wrapId(cond.column, wrapIdentifiers);
      const op = (cond.op || "=").toUpperCase();

      if (op === "IN" && Array.isArray(cond.value)) {
        const placeholders = cond.value.map(() => "?").join(", ");
        params.push(...cond.value);
        return `${col} IN (${placeholders})`;
      }

      if ((op === "IS" || op === "IS NOT") && cond.value === null) {
        return `${col} ${op} NULL`;
      }

      params.push(cond.value);
      return `${col} ${op} ?`;
    });
    where = ` WHERE ${condParts.join(" AND ")}`;
  } else {
    // احتیاط: اگر WHERE خالی باشه، آپدیت همه ردیف‌ها انجام میشه — تصمیم با شما است
  }

  const query = `UPDATE ${wrapId(table, wrapIdentifiers)} SET ${setParts.join(", ")}${where}`;
  return { query, params };
}

function deleteQuery({
  table,
  conditions = null,
  wrapIdentifiers = false,
}) {
  if (!table) throw new Error("table is required");
  const conds = normalizeConditions(conditions);
  const params = [];

  let where = "";
  if (conds.length > 0) {
    const parts = conds.map((cond) => {
      if (typeof cond === "string") return `(${cond})`;
      const col = wrapId(cond.column, wrapIdentifiers);
      const op = (cond.op || "=").toUpperCase();

      if (op === "IN" && Array.isArray(cond.value)) {
        const placeholders = cond.value.map(() => "?").join(", ");
        params.push(...cond.value);
        return `${col} IN (${placeholders})`;
      }

      if ((op === "IS" || op === "IS NOT") && cond.value === null) {
        return `${col} ${op} NULL`;
      }

      params.push(cond.value);
      return `${col} ${op} ?`;
    });
    where = ` WHERE ${parts.join(" AND ")}`;
  } else {
    // مراقب باشید: اگر WHERE خالی باشه، DELETE همه‌ی ردیف‌ها انجام میشه.
  }

  const query = `DELETE FROM ${wrapId(table, wrapIdentifiers)}${where}`;
  return { query, params };
}

module.exports = {
  createQuery,
  readQuery,
  updateQuery,
  deleteQuery,
};

/*
مثال استفاده از توابع:

/*
1️⃣ SELECT (readQuery)
----------------------
const { query, params } = readQuery({
  table: "courses",
  columns: ["id", "title", "price"],           // اگر خالی باشه همه ستون‌ها *
  conditions: { price: { op: ">", value: 100000 } } // شرط دلخواه
});
// اجرا با mysql
db.query(query, params, (err, rows) => {
  if (err) console.error(err);
  else console.log(rows);
});

2️⃣ INSERT (createQuery)
------------------------
const { query, params } = createQuery({
  table: "courses",
  values: { title: "Node.js Basics", price: 250000, teacher: "Ali" }
});
// اجرا
db.query(query, params, (err, result) => {
  if (err) console.error(err);
  else console.log(result);
});

3️⃣ UPDATE (updateQuery)
------------------------
const { query, params } = updateQuery({
  table: "courses",
  updates: { price: 300000 },                    // ستون‌هایی که میخوای آپدیت بشن
  conditions: { title: "Node.js Basics" }       // شرط WHERE
});
// اجرا
db.query(query, params, (err, result) => {
  if (err) console.error(err);
  else console.log(result);
});

4️⃣ DELETE (deleteQuery)
------------------------
const { query, params } = deleteQuery({
  table: "courses",
  conditions: { teacher: "Ali" }                // شرط حذف
});
// اجرا
db.query(query, params, (err, result) => {
  if (err) console.error(err);
  else console.log(result);
});

⚠️ نکته مهم:
- همه توابع خروجی { query, params } میده که امن در برابر SQL Injection هست.
- برای SELECT، اگر شرط ندادی، همه ردیف‌ها برگردانده میشه.
- برای UPDATE یا DELETE، اگر شرط ندادی، تمام ردیف‌ها تغییر/حذف میشن — مراقب باش!
*/