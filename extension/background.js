const UNKNOW = null;
const IS_RECORDING = true;
const NOT_RECORDING = false;

const POPUP = "popup";
const MY_RECORD = "myRecord";
const RECORDER = "recorder";

const DELETE_LAST_CHAR = "deleteLastChar";
const SWITCH_INPUT = "switchInput";
const NEW_EVENT = "newEvent";
const CONVERT = "convert";
const START = "start";
const STOP = "stop";
const CLEAR = "clear";
const SWITCH_URL = "switchUrl"

let record;
let actualRecord;
let recordHistory = [];
let start = NOT_RECORDING; 
let actualInput; 
let urlContentPage;



chrome.runtime.onMessage.addListener(function(message){
    chrome.tabs.query({active: true}, function(tabs){
        if(message.sender === MY_RECORD){
            if(message.subject === START){
                createNewRecord(message.title);
                start = IS_RECORDING;
            }else if(message.subject === STOP){
                stopRecord();
            }
        }else if(message.sender === POPUP){
            if(message.subject === CONVERT){
                sendConvertMessage(tabs);
            }else if(message.subject === STOP){
                stopRecord();
            }else if(message.subject === CLEAR){
                clearData();
            }
        }else if(message.sender === RECORDER){
            if(start === IS_RECORDING){
                if(message.subject === NEW_EVENT){
                    pushNewEvent(message.event.type, message.event);
                }else if(message.subject === DELETE_LAST_CHAR){
                    deleteLastChar();
                }else if(message.subject === SWITCH_INPUT){
                    actualInput = message.newInput;
                }
            }
            if(message.subject === SWITCH_URL){
                urlContentPage = message.url;
                if(start === IS_RECORDING){
                    switchUrl(message.url);
                }
            }
        }
    });
});     


function pushNewEvent(type, event){
    if(type === "keydown" || type === "replace" || type === "click"){
        record.push(event);
    }else if(type === "dblclick"){
        record.splice(record.length-3, 2);
        record.push(event);
    }
    console.log(type);
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
    start = NOT_RECORDING;
    start = NOT_RECORDING;
    pushRecord(record, actualRecord);
    record = UNKNOW;
    actualRecord = UNKNOW;
}

function pushRecord(record, title){
    recordHistory.push({title: title, record: []});
    const newEltIndice = recordHistory.length - 1;
    for(i = 0; i < record.length; i++){
        recordHistory[newEltIndice].record[i] = record[i];
    }
}

function createNewRecord(title){
    actualRecord = title;   
    record = [];
}

async function sendConvertMessage(tabs){
    let i = 0;
    while(tabs[i].url != record[record.length - 1].url && i < tabs.length){
        i += 1;
    }
    await chrome.tabs.sendMessage(tabs[i].id, {subject: "download", txt: convert(record), sender: "background"});
}

function clearData(){
    record = UNKNOW;
    actualInput = UNKNOW;
    actualRecord = UNKNOW;
    recordHistory = [];
    start = NOT_RECORDING; 
}

function switchUrl(newUrl){
    return newUrl;
}

function convert(record){
    if(record.length === 0){
        return;
    }
    txt = "mr = require('mr');\ntest('myTest', () => { \nmr.goto('"+record[0].url+"' );\n";
    for(i = 0; i<record.length; i++){
        if(i != 0 && record[i].url != record[i-1].url){
            txt += "mr.checkUrlEqual('"+record[i].url+"');\n";
        }
        txt += "mr.getBy"+record[i].typeSelecteur+"("+record[i].typeTarget+"{'"+record[i].selecteur+"'}).";
        if(record[i].type === "replace"){
            txt += "replace("+record[i].newValue+");\n";
        }else if(record[i].type === "keydown"){
            if(record[i].controle){
                txt += "type(Control+"+record[i].key+");\n";
            }else if(record[i].alt){
                txt += "type(Alt+"+record[i].key+");\n";
            }else{
                txt += "type("+record[i].key+");\n";
            }
        }else{
            txt += record[i].type+"();\n";
        }
    }
    txt += "}";
    return txt;
}