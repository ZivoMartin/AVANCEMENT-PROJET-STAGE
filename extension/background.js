chrome.runtime.onMessage.addListener(function(message){
    chrome.tabs.query({active: true}, function(tabs){
        console.log(tabs)
        let i = 0;
        if(tabs[0].title == "my record"){
            i = 1;
        }
        chrome.tabs.sendMessage(tabs[i].id, {message: message.message, title: message.title});  
    });
    console.log("its ok")
})      