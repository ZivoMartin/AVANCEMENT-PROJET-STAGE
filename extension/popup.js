const UNKNOW = null;
const IS_RECORDING = true;
const NOT_RECORDING = false;

buttonStart = document.getElementById('buttonMr');
buttonDeleteData = document.getElementById('buttonDelete');
buttonExport = document.getElementById('buttonExport');
let recording = JSON.parse(window.localStorage.getItem("recording"));

if(recording != UNKNOW && recording === IS_RECORDING){
    buttonStart.textContent = "end record";
}

buttonStart.addEventListener('click', ()=>{
    if(buttonStart.textContent === "start record"){
        buttonStart.textContent = "end record";
        recording = IS_RECORDING;
        chrome.windows.create({
            url: 'newrecord.html',
            type: 'popup',
            width: 700,
            height: 600
        });
    }else{
        buttonStart.textContent = "start record";
        recording = NOT_RECORDING;
        chrome.runtime.sendMessage({subject: "stop", sender: "popup"});
    }
    window.localStorage.setItem("recording", JSON.stringify(recording));
})

buttonDeleteData.addEventListener("click", ()=>{
    chrome.runtime.sendMessage({subject: "clear", sender: "popup"});
})

buttonExport.addEventListener("click", ()=>{
    chrome.runtime.sendMessage({subject: "convert", sender: "popup"});
})