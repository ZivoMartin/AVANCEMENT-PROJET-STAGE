const NEW_EVENT = "newEvent";

let subButton = document.getElementById("submitTitle");

subButton.addEventListener('click', ()=>{
    let input = document.getElementById("inputTitle");
    document.getElementById("form").remove(); 
    chrome.runtime.sendMessage({subject: "start", title: input.value, sender: "myRecord", receiver: "background"});
})

chrome.runtime.onMessage.addListener((message) => {
    if(message.sender === "background" && message.receiver === "newRecord"){
        if(message.subject === NEW_EVENT){
            const act = message.event;
            let newAct = document.createElement('p');
            if(act === "switch"){
                newAct.textContent = "Assert -> url == " + message.url;
                document.body.appendChild(newAct);
            }else if(act === "startRecord"){
                newAct.textContent = "Goto -> " + message.url;
                document.body.appendChild(newAct);
            }else if(act.typeTarget != null){
                newAct.textContent = act.type;
                if(act.type === "dblclick"){
                    let actions = document.querySelectorAll('p');
                    const len = actions.length;
                    actions[len-1].remove();
                    actions[len-2].remove();
                }else if(act.type === "keydown"){   
                    newAct.textContent += " (" + act.key + ") ";
                }
                newAct.textContent += " -> " + act.typeTarget;
                document.body.appendChild(newAct);
            }
        }
    }
});

window.addEventListener('beforeunload', function() {
    chrome.runtime.sendMessage({subject: "stop", sender: "myRecord", receiver: "background"});
})
