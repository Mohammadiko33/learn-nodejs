const sayHello = (name) => {
    console.log(`hello ${name}`)
    return "hello"
}

sayHello("mohammad")
// console.log(window) // ❌ نمیشه در نود چی اس استفاده کرد
// document.getElementById("") // ❌ نمیشه در نود چی اس استفاده کرد
// window.setTimeout(() => { console.log("morning time") } , 1500) // ❌ نمیشه در نود جی اس استفاده کرد
console.log(global) // بجای ویندو باید از گلوباس استفاده بکنیم
global.setTimeout(() => { console.log("morning time") } , 1500)

console.log(__dirname) // محلی که فایل app.js وجود دارد رو به ما نشون میده // G:\B\AA-NotesCourse\learnNode
console.log(__filename) // اسم فایلی که که توش قرار داریم رو نشون میده // G:\B\AA-NotesCourse\learnNode\app.js