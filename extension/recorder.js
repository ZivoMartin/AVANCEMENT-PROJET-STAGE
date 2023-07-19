console.log('I am running');

const UNKNOW = null;
chrome.runtime.sendMessage({subject: "switchContentUrl", url: window.location.href, sender: "recorder"});

let actualInput; 
let inElt; 
let blueWord; 
let blueInput; 
let replace; 


function download(txt){
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain,charset=utf-8,' + encodeURIComponent(txt));
    element.setAttribute('download', 'script');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function pushEvent(e){
    const selecteur = getSelecteur(e.target);
    let object = {type: e.type, selecteur: selecteur.selecteur, typeSelecteur: selecteur.type, typeTarget: e.target.tagName.toLowerCase(), controle: e.ctrlKey, alt: e.altKey, url: window.location.href};
    if(object.type === "keydown"){
        if(actualInput != UNKNOW){
            object.input = actualInput;
        }else{
            object.input = "None";
        }
        object.key = e.key;
    }
    chrome.runtime.sendMessage({subject: "newEvent", sender: "recorder", event: object});
}

function pushTheReplace(){
    let value = document.querySelector('input[name="' + actualInput + '"]').value;
    chrome.runtime.sendMessage({subject: "newEvent", sender: "recorder", event: {type: "replace", selecteur: actualInput, typeSelecteur: "name", typeTarget: "input", controle: false, alt: false, url: window.location.href, input: actualInput, newValue: value}});
}

function getSelecteur(target){
    if(target.id != ""){
        return {selecteur: target.id, type: "id"};
    }else if(target.tagName === "INPUT" && target.placeholder != ""){
        return {selecteur: target.placeholder, type: "placeholder"};
    }else if(target.name != null && target.name != ""){
        return {selecteur: target.name, type: "name"}; 
    }else if(target.textContent != "" && (target.tagName === "P" || target.tagName === "H1" || target.tagName === "A" )){
        txt = target.textContent;
        if(txt.length <= 100){
            return {selecteur: txt, type: "texte"};
        }else{
            let txtResult = txt[0];
            for(i = 1; i<100; i++){
                txtResult += txt[i];
            }
            return {selecteur: txtResult, type: "texte"};
        }
    }else{
        return {selecteur: getArbre(target), type: "arbre"};
    }
}

function getArbre(target){
    result = [];
    elt = target.parentElement;
    k = 0;
    while(elt.tagName != "HTML" && elt.tagName != "BODY"){
        result[k] = elt.tagName.toLowerCase();
        elt = elt.parentElement;
        k = k + 1;
    }
    return result;
}

function resetBlue(){
    blueWord = false;
    blueInput = false;
}


document.addEventListener('click', (e) => {
    if(e.target.tagName === "INPUT"){
        actualInput = e.target.name;
        chrome.runtime.sendMessage({subject: "switchInput", sender: "recorder", newInput: actualInput});
    }else if(actualInput != UNKNOW){
        actualInput = UNKNOW;
        chrome.runtime.sendMessage({subject: "switchInput", sender: "recorder", newInput: UNKNOW});
    }
    resetBlue();
    pushEvent(e);
})

document.addEventListener('dblclick', (e) => {
    if(e.target.tagName === 'INPUT'){
        blueWord = true;
        blueInput = false;
    }else{
        resetBlue();
    }
    pushEvent(e);
})


document.addEventListener('keyup', () => {
    if(replace){
        replace = false;
        blueInput = false;
        blueWord = false;
        pushTheReplace();
    }
})

document.addEventListener('keydown', (e) => {
    const key = e.key;
    if(actualInput != UNKNOW){
        if(blueWord || blueInput || key === 'a' || key === 'v' || key === 'z'){
            replace = true;
            return;
        }else if(key === "Backspace"){
            chrome.runtime.sendMessage({subject: "deleteLastChar", sender: "recorder"});
            return;
        }
    }
    if(!e.ctrlKey){
        pushEvent(e);
    }
})



chrome.runtime.onMessage.addListener(function(message) {
    if(message.subject === "download" && message.sender === "background"){
        download(message.txt);
    }
});


// document.addEventListener('mousemove', (e)=>{
//     const cursorStyle = getComputedStyle(e.target).cursor;
//     if(cursorStyle === 'pointer') {
//         if(!inElt){
//             inElt = true;
//             pushEvent(e);
//             record[record.length-1].mouvement = "enter";
//         }
//     }else if(cursorStyle === 'auto' && inElt){
//         inElt = false;
//         pushEvent(e);
//         record[record.length-1].mouvement = "exit";
//     }
// });