button_start = document.getElementById('button_mr');
button_delete_data = document.getElementById('button_delete');
button_export = document.getElementById('button_export')
if(localStorage.getItem("start") == null){
    localStorage.setItem("start", JSON.stringify(false));
}else if(JSON.parse(localStorage.getItem("start"))){
    button_start.textContent = "end record";
}else{
    console.log(localStorage.getItem("start"))
}

button_start.addEventListener('click', ()=>{
    if(button_start.textContent == "start record"){
        button_start.textContent = "end record";
        console.log(window.location.href)
    }else{
        button_start.textContent = "start record";
    }
    console.log(localStorage)
})

button_delete_data.addEventListener("click", ()=>{
    localStorage.clear()
})

button_export.addEventListener("click", ()=>{
    convert();
})