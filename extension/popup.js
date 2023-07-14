button_start = document.getElementById('button_mr');
button_delete_data = document.getElementById('button_delete');
button_export = document.getElementById('button_export')

let recording = JSON.parse(window.localStorage.getItem("recording"));
if(recording != null && recording){
    button_start.textContent = "end record"
}
button_start.addEventListener('click', ()=>{
    
    if(button_start.textContent == "start record"){
        button_start.textContent = "record in progress";
        recording = true;
        chrome.windows.create({
            url: 'newrecord.html',
            type: 'popup',
            width: 400,
            height: 300
        });
    }else{
        button_start.textContent = "start record";
        recording = false;
    }
    window.localStorage.setItem("recording", JSON.stringify(recording))
    chrome.runtime.sendMessage({message: "start"});
})

button_delete_data.addEventListener("click", ()=>{
    chrome.runtime.sendMessage({message: "clear"});
})

button_export.addEventListener("click", ()=>{
    chrome.runtime.sendMessage({message: "convert"});
})