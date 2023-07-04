console.log('I am running');
const actions = [];
let indice_actions = 0;
let actual_word_type = "";
let actual_input = null;
let in_elt = false;
let blue_word = false;
let blue_input = false;
let replace = false;
let start = false;  


function convert(){
    if(actions.length == 1){
        return;
    }
    actions.pop()
    txt = "mr = require('mr');\ntest('my_test', () => { mr.goto('"+actions[0].url+"' );\n";
    for(i = 0; i<actions.length; i++){
        if(i != 0 && actions[i].url != actions[i-1].url){
            txt += "mr.tcheckUrlEqual('"+actions[i].url+"');\n"
        }
        txt += "mr.getBy"+actions[i].type_selecteur+"("+actions[i].type_target+"{'"+actions[i].selecteur+"'})."
        if(actions[i].type == "replace"){
            txt += "replace("+actions[i].new_value+");\n";
        }else if(actions[i].type == "keydown" && actions[i].input != null){
            if(actions[i].controle){
                txt += "type(Control+"+actions[i].key+");\n"
            }else if(actions[i].alt){
                txt += "type(Alt+"+actions[i].key+");\n"
            }else{
                txt += "type("+actions[i].key+");\n";
            }
        }else{
            txt += actions[i].type+"();\n"
        }
    }
    download(txt)
}

function download(txt){
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain,charset=utf-8,' + encodeURIComponent(txt));
    element.setAttribute('download', 'script');
    element.style.display = 'none';
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element);
}

function store_event(e){
    selecteur = get_selecteur(e.target)
    actions[indice_actions] = {type: e.type, selecteur: selecteur.selecteur, type_selecteur: selecteur.type, type_target: e.target.tagName.toLowerCase(), controle: false, alt: false, url: window.location.href};
    if(e.ctrlKey){
        actions[indice_actions].controle = true;
    }
    if(e.altKey){
        actions[indice_actions].alt = true;
    }
    indice_actions += 1;
}

function get_selecteur(target){
    if(target.id != ""){
        return {selecteur: target.id, type: "id"};
    }else if(target.tagName == "INPUT" && target.placeholder != ""){
        return {selecteur: target.placeholder, type: "placeholder"}
    }else if(target.name != null && target.name != ""){
        return {selecteur: target.name, type: "name"}   
    }else if(target.textContent != "" && (target.tagName == "P" || target.tagName == "H1" || target.tagName == "A" )){
        txt = target.textContent;
        if(txt.length <= 100){
            return {selecteur: txt, type: "texte"};
        }else{
            let txt_result = txt[0];
            for(i = 1; i<100; i++){
                txt_result += txt[i];
            }
            return {selecteur: txt_result, type: "texte"};
        }
    }else{
        return {selecteur: get_arbre(target), type: "arbre"};
    }
}

function get_arbre(target){
    result = []
    elt = target.parentElement;
    k = 0;
    while(elt.tagName != "HTML" && elt.tagName != "BODY"){
        //result[k] = elt.tagName + " | " + elt.id +" | " + elt.class + " | " + target.name;
        result[k] = elt.tagName.toLowerCase();
        elt = elt.parentElement;
        k = k + 1;
    }
    return result;
}

function store_the_replace(){
    let value = document.querySelector('input[name="' + actual_input + '"]').value;
    actions[indice_actions] = {type: "replace", selecteur: actual_input, type_selecteur: "name", type_target: "input", controle: false, alt: false, url: window.location.href, input: actual_input, new_value: value};
    indice_actions += 1;
}

function delete_last_char(){
    let i = actions.length()
    while(i>=0){
        if(actions[i].type == 'keypress' && actions[i].input == actual_input){
            actions.splice(i, 1)
            return;
        }
    }
}

function reset_blue(){
    blue_word = false;
    blue_input = false;
}

document.addEventListener('click', (e) => {
    if(!start){
        return;
    }
    store_event(e);
    if(e.target.tagName == "INPUT"){
        const name = e.target.name;
        actual_input = name;
    }else{
        actual_input = null;
    }
    reset_blue();
})

document.addEventListener('dblclick', (e) => {
    if(!start){
        return;
    }
    store_event(e);
    if(e.target.tagName == 'INPUT'){
        blue_word = true;
        blue_input = false;
    }else{
        reset_blue();
    }
    console.log(blue_word);
})


document.addEventListener('keyup', (e) => {
    if(!start){
        return;
    }
    if(replace){
        store_the_replace();
        replace = false;
        blue_input = false;
        blue_word = false;
    }
    if(e.key == ''){
        convert();
    }
})
document.addEventListener('keydown', (e) => {
    const key = e.key;
    if(!start){
        if(key == "$"){
            start = true;
            window.localStorage.setItem('trace5', JSON.stringify([]));
        }
        return;
    }
    if(actual_input != null){
        if(blue_word){
            replace = true;
            return;
        }else if(blue_input){
            replace = true
            return;
        }else if(key == "Backspace"){
            delete_last_char()
            return;
        }
    }
    if(!e.ctrlKey){
        store_event(e);
        actions[indice_actions-1].input = actual_input;
        actions[indice_actions-1].key = key;
    }else if(actual_input != null){
        if(key == 'z' || key == 'v' || key == 'a'){
            replace = true;
        }
    }
    
})
// document.addEventListener('mousemove', (e)=>{
//     const cursorStyle = getComputedStyle(e.target).cursor;
//     if(cursorStyle == 'pointer') {
//         if(!in_elt){
//             in_elt = true;
//             store_event(e)
//             actions[indice_actions-1].mouvement = "enter"
//         }
//     }else if(cursorStyle == 'auto' && in_elt){
//         in_elt = false;
//         store_event(e)
//         actions[indice_actions-1].mouvement = "exit"
//     }
// });