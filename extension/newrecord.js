var sub_button = document.getElementById("submit_title");
sub_button.addEventListener('click', ()=>{
    let input = document.getElementById("input_title")
    let title = input.value
    document.getElementById("form").remove(); 
    chrome.runtime.sendMessage({message: "start", title: title, sender: "my_record", receiver: "recorder"});
})

chrome.runtime.onMessage.addListener(function(msg) {
    const act = msg.message;
    let new_act = document.createElement('p');
    if(act == "switch"){
        new_act.textContent = "Assert -> url == " + msg.url;
        document.body.appendChild(new_act);
    }else if(act == "start_record"){
        new_act.textContent = "Goto -> " + msg.url;
        document.body.appendChild(new_act);
    }else if(act.type_target != null){
        new_act.textContent = act.type;
        if(act.type == "dblclick"){
            let actions = document.querySelectorAll('p');
            const len = actions.length
            actions[len-1].remove();
            actions[len-2].remove();
        }else if(act.type == "keydown"){
            new_act.textContent += " (" + act.key + ") "
        }
        new_act.textContent += " -> " + act.type_target
        document.body.appendChild(new_act);
    }
});