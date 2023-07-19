let subButton = document.getElementById("submitTitle");

subButton.addEventListener('click', ()=>{
    let input = document.getElementById("inputTitle");
    document.getElementById("form").remove(); 
    chrome.runtime.sendMessage({subject: "start", title: input.value, sender: "myRecord"});
})

chrome.runtime.onMessage.addListener(function(msg) {
    const act = msg.message;
    let newAct = document.createElement('p');
    if(act === "switch"){
        newAct.textContent = "Assert -> url == " + msg.url;
        document.body.appendChild(newAct);
    }else if(act === "startRecord"){
        newAct.textContent = "Goto -> " + msg.url;
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
});