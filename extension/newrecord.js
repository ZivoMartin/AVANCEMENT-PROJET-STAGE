var sub_button = document.getElementById("submit_title");
sub_button.addEventListener('click', ()=>{
    let input = document.getElementById("input_title")
    let title = input.value
    document.getElementById("form").remove(); 
    chrome.runtime.sendMessage({message: "start", title: title});
})