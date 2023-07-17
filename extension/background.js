chrome.runtime.onMessage.addListener(function(message){
    chrome.tabs.query({active: true}, function(tabs){
        console.log(message);
        if(message.sender == "my_record"){
            let i = 0;
            while(tabs[i].title == "my record" || tabs[i].title == "popup"){
                i += 1;
            }
            chrome.tabs.sendMessage(tabs[i].id, {message: message.message, title: message.title});  
        }else if(message.sender == "popup"){
            if(message.receiver == "recorder"){
                let i = 0;
                while(tabs[i].title == "my record" || tabs[i].title == "popup"){
                    i += 1;
                }
                chrome.tabs.sendMessage(tabs[i].id, {message: message.message});  
            }
        }else if(message.sender == "recorder"){
            if(message.receiver == "my_record"){
                let i = 0;
                if(tabs[0].title == "my record"){
                    i = 1;
                }
                if(message.message == "switch" || message.message == "start_record"){
                    chrome.tabs.sendMessage(tabs[i].id, {message: message.message, url: message.url});  
                }else{
                    chrome.tabs.sendMessage(tabs[i].id, {message: message.message});  
                }
            }
        }
        
    });
})      