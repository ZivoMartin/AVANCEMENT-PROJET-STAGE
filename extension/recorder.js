console.log('I am running');
const actions = [];
let i = 0;
let in_form = true;
let actual_word_type = "";
let inputs = {}


function store_event(e){
    actions[i] = e.type;
    i += 1;
}

document.addEventListener('click', (e) => {
    store_event(e);
    if(e.target.tagName == "INPUT"){
        in_form = true;
    }else{
        in_form = false;
    }
})
document.addEventListener('dblclick', (e) => {
    store_event(e);
})

document.addEventListener('keyup', (e) => {
    store_event(e);
})
document.addEventListener('keydown', (e) => {
    store_event(e);
    if(in_form){
        const key = e.key;
        if(key == "Backspace"){
            actual_word_type = actual_word_type.slice(0, -1);
            console.log(actual_word_type);
        }else if(key == "enter"){
            in_form == false
        }
    }
})

document.addEventListener('keypress', (e) => {
    store_event(e);
    if(in_form){
        actual_word_type += e.key;
    }
    console.log(actual_word_type);
})