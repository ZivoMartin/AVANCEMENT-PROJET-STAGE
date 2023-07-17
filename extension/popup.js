button_start = document.getElementById('button_mr');
button_delete_data = document.getElementById('button_delete');
button_export = document.getElementById('button_export')

let recording = JSON.parse(window.localStorage.getItem("recording"));
if(recording != null && recording){
    button_start.textContent = "end record"
}
button_start.addEventListener('click', ()=>{
    
    if(button_start.textContent == "start record"){
        button_start.textContent = "end record";
        recording = true;
        chrome.windows.create({
            url: 'newrecord.html',
            type: 'popup',
            width: 700,
            height: 600
        });
    }else{
        button_start.textContent = "start record";
        recording = false;
        chrome.runtime.sendMessage({message: "stop", sender: "popup", receiver: "recorder"});
    }
    window.localStorage.setItem("recording", JSON.stringify(recording))
})

button_delete_data.addEventListener("click", ()=>{
    chrome.runtime.sendMessage({message: "clear", sender: "popup", receiver: "recorder"});
})

button_export.addEventListener("click", ()=>{
    chrome.runtime.sendMessage({message: "convert", sender: "popup", receiver: "recorder"});
})