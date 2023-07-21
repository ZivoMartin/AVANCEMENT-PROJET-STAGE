let recordLineTab = [];

chrome.runtime.sendMessage({subject: "giveHisto", sender: "histoRecord", receiver: "background"}, (response)=>{
    const lenTab = response.tabHisto.length;
    for(let i = lenTab - 1; i >= 0 ; i--){
        recordLineTab[i] = document.createElement('div');
        let divLeft = document.createElement('div');
        let divRight = document.createElement('div');
        initDivs(recordLineTab[i], divLeft, divRight);
        initRecButton(divLeft, response.tabHisto[i].title);
        initButtonScript(divLeft, response.tabHisto[i].record);
        initReplayButton(divRight);
        initExportButton(divRight, i);
        initDeleteRecordButton(divRight, i);
    }
})

function initDivs(bigDiv, divLeft, divRight){
    bigDiv.className = "record";
    divLeft.className = "containerLeft";
    divRight.className = "containerRight";
    document.body.appendChild(bigDiv);
    bigDiv.appendChild(divLeft);
    bigDiv.appendChild(divRight);
}

function initRecButton(div, title){
    let rec = document.createElement('p');
    rec.className = "divLeftElement";
    rec.id = "title";
    rec.textContent = title + ": ";
    div.appendChild(rec);
}

function initButtonScript(div, recordTab){
    let scriptButton = document.createElement('button');
    scriptButton.textContent = "...";
    scriptButton.className = "divLeftElement";
    div.appendChild(scriptButton);
    scriptButton.addEventListener('click', ()=>{
        scriptButton.remove();
        eventScriptButton(recordTab, div);
    })
}

function initReplayButton(div){
    let replayButton = document.createElement('button');
    replayButton.textContent = "▶"
    replayButton.className = "divRightElement";
    div.appendChild(replayButton);
    replayButton.addEventListener('click', ()=>{
        replay();
    })
}

function initDeleteRecordButton(div, i){
    let img = document.createElement('img');
    img.height = 20;
    img.src = "cssAndimg/bin.png";
    let deleteRecordButton = document.createElement('button');
    deleteRecordButton.appendChild(img);
    deleteRecordButton.className = "divRightElement";
    deleteRecordButton.addEventListener('click', ()=>{
        deleteThisReplay(i);
    })
    div.appendChild(deleteRecordButton);
}

function initExportButton(div, i){
    let exportButton = document.createElement('button');
    exportButton.textContent = "Export";
    exportButton.className = "divRightElement";
    exportButton.addEventListener('click', ()=>{
        exportScript(i);
    })
    div.appendChild(exportButton);
}

function exportScript(i){
    chrome.runtime.sendMessage({subject: "export", indice: i, sender: "histoRecord", receiver: "background"});
}

function eventScriptButton(record, div){
    let thisRecord = document.createElement('p');
    thisRecord.textContent = "";
    let lenRec = record.length;
    for(let i = 0; i<lenRec; i++){
        thisRecord.textContent += record[i].type
        if(i != lenRec-1){
            thisRecord.textContent += " -> ";
        }
    }
    thisRecord.className = "divLeftElement";
    div.appendChild(thisRecord);
}

function replay(){
    console.log("replay");
}

function deleteThisReplay(i){
    chrome.runtime.sendMessage({subject: "deleteRecord", indice: i, sender: "histoRecord", receiver: "background"})
    .then(()=>{
        recordLineTab[i].remove();
    })
}