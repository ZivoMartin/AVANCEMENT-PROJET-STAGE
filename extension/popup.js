const UNKNOW = null;
const IS_RECORDING = true;
const NOT_RECORDING = false;

buttonStart = document.getElementById('buttonMr');
buttonHisto = document.getElementById('buttonHisto');
buttonExport = document.getElementById('buttonExport');


chrome.runtime.sendMessage({subject: "askStartStatus", sender: "popup", receiver: "background"}, (response)=>{
    if(response.status === IS_RECORDING){
        buttonStart.textContent = "end record";
    }
});

buttonStart.addEventListener('click', ()=>{
    if(buttonStart.textContent === "start record"){
        buttonStart.textContent = "end record";
        chrome.windows.create({
            url: 'newrecord.html',
            type: 'popup',
            width: 700,
            height: 600
        });
    }else{
        buttonStart.textContent = "start record";
        chrome.runtime.sendMessage({subject: "stop", sender: "popup", receiver: "background"});
    }
})

buttonHisto.addEventListener("click", ()=>{
    chrome.windows.create({
        url: 'historique.html',
        type: 'popup',
        width: 700,
        height: 600
    });
})

buttonExport.addEventListener("click", ()=>{
    chrome.runtime.sendMessage({subject: "convert", sender: "popup", receiver: "background"});
})






