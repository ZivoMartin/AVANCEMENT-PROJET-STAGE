const UNKNOW = null;
const IS_RECORDING = true;
const NOT_RECORDING = false;

const BACKGROUND = "background";
const POPUP = "popup";
const MY_RECORD = "myRecord";
const RECORDER = "recorder";
const HISTO_RECORD = "histoRecord"

const DELETE_LAST_CHAR = "deleteLastChar";
const SWITCH_INPUT = "switchInput";
const NEW_EVENT = "newEvent";
const EXPORT = "export";
const START = "start";
const STOP = "stop";
const CLEAR = "clear";
const SWITCH_URL = "switchContentUrl";
const START_STATUS = "askStartStatus";
const GIVE_HISTO = "giveHisto";
const DELETE_RECORD = "deleteRecord"

let record;
let actualRecord;
let recordHistory = [];
let start = NOT_RECORDING; 
let actualInput; 
let urlContentPage;
let idNewRec;

chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if(message.receiver === BACKGROUND){
        if(message.sender === MY_RECORD){
            if(message.subject === START){
                chrome.tabs.query({active: true}, (tabs)=>{
                    createNewRecord(message.title, tabs)
                });
                start = IS_RECORDING;
            }else if(message.subject === STOP){
                stopRecord();
            }
        }else if(message.sender === POPUP){
            if(message.subject === STOP){
                stopRecord();
            }else if(message.subject === CLEAR){
                clearData();
            }else if(message.subject === START_STATUS){
                sendResponse({status: start, sender: "background", receiver: "popup"});
            }
        }else if(message.sender === RECORDER){
            if(start === IS_RECORDING){
                if(message.subject === NEW_EVENT){
                    console.log("OUI");
                    pushNewEvent(message.event.type, message.event);
                }else if(message.subject === DELETE_LAST_CHAR){
                    deleteLastChar();
                }else if(message.subject === SWITCH_INPUT){
                    actualInput = message.newInput;
                }else if(message.subject === SWITCH_URL){
                    urlContentPage = message.url;
                    if(start === IS_RECORDING){
                        switchUrl(urlContentPage);
                    }
                }
            }
        }else if(message.sender === HISTO_RECORD){
            if(message.subject === GIVE_HISTO){
                sendResponse({tabHisto: recordHistory, sender: "background", receiver: "histo"});
            }else if(message.subject === DELETE_RECORD){
                recordHistory.splice(message.indice, 1);
            }else if(message.subject === EXPORT){
                chrome.tabs.query({active: true}, (tabs)=>{
                    sendConvertMessage(tabs, recordHistory[message.indice].record, recordHistory[message.indice].title);
                });
            }
        }
    }
});     


function pushNewEvent(type, event){
    if(type === "keydown" || type === "replace" || type === "click"){
        record.push(event);
    }else if(type === "dblclick"){
        record.splice(record.length-2, 2);
        record.push(event);
    }
    if(record.length === 1){
        chrome.tabs.sendMessage(idNewRec, {subject: "newEvent", event: "startRecord", url: event.url, sender: "background", receiver: "newRecord"})
        .then(() => {
            chrome.tabs.sendMessage(idNewRec, {subject: "newEvent", event: event, sender: "background", receiver: "newRecord"})
          })
    }else{
        chrome.tabs.sendMessage(idNewRec, {subject: "newEvent", event: event, sender: "background", receiver: "newRecord"});
    }
    console.log(record);
}

function deleteLastChar(){
    let i = record.length - 1;
    while(i>=0){
        if(record[i].type === 'keypress' && record[i].input === actualInput){
            record.splice(i, 1);
            return;
        }
    }
}

function stopRecord(){
    if(start === IS_RECORDING){
        start = NOT_RECORDING;
        pushRecord(record, actualRecord);
        record = UNKNOW;
        actualRecord = UNKNOW;
    }
}

function pushRecord(record, title){
    recordHistory.push({title: title, record: []});
    const newEltIndice = recordHistory.length - 1;
    for(i = 0; i < record.length; i++){
        recordHistory[newEltIndice].record[i] = record[i];
    }
}

function createNewRecord(title, tabs){
    actualRecord = title;   
    record = [];
    idNewRec = findIdNewRec(tabs);
}

async function sendConvertMessage(tabs, theExportedRecord, title){
    let i = 0;
    while((tabs[i].title === "My records" || tabs[i].title === "Popup" || tabs[i].title === "New record" ) && i < tabs.length){
        i += 1;
    }
    await chrome.tabs.sendMessage(tabs[i].id, {subject: "download", txt: convert(theExportedRecord, title), sender: "background", receiver: "recorder"});
}


function clearData(){
    record = UNKNOW;
    actualInput = UNKNOW;
    actualRecord = UNKNOW;
    recordHistory = [];
    start = NOT_RECORDING; 
}

function switchUrl(newUrl){
    chrome.tabs.sendMessage(idNewRec, {subject: "newEvent", event: "switch", url: newUrl, sender: "background", receiver: "newRecord"})
}

function findIdNewRec(tabs){
    let i = 0;
    while(tabs[i].title != "New record"){
        i += 1;
    }
    return tabs[i].id;
}

function convert(record, title){
    if(record.length === 0){
        return;
    }
    txt = "import { test, expect } from '@playwright/test\n"
    txt += "test('"+title+"', () => { \n"
    txt += "\tawait page.goto('"+record[0].url+"');\n";
    for(i = 0; i<record.length; i++){
        // if(i != 0 && record[i].url != record[i-1].url){
        //     txt += "mr.checkUrlEqual('"+record[i].url+"');\n";
        // }
        txt += "\tawait page.getByRole('"+record[i].typeTarget+"', {name: "+record[i].selecteur+"}).";
        if(record[i].type === "replace"){
            txt += "fill("+record[i].newValue+");\n";
        }else if(record[i].type === "keydown"){
            if(record[i].controle){
                txt += "press(Control+"+record[i].key+");\n";
            }else if(record[i].alt){
                txt += "press(Alt+"+record[i].key+");\n";
            }else{
                txt += "press("+record[i].key+");\n";
            }
        }else{
            txt += record[i].type+"();\n";
        }
    }
    txt += "});";
    return txt;
}