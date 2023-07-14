console.log('I am running');
let indice_actions;  //Cette variable represente l'indice de la prochaine action dans le tableau de l'actuel record 
let actual_word_type; //Cette chaine de charactère représente le mot qui est tapé dans l'actuel input
let actual_input; 
let in_elt; //Permet de savoir si on survole un element
let blue_word; //Permet de savoir si un mot dans un input est actuellement bleu
let blue_input; //Permet de savoir si actual input est entierment bleu
let replace; //Booleen qui s'active quand un input est modifié drastiquement (aprés un double clique par exemple) pour prevenir key up d'enregistrer une action de type replace
let actual_record; //Si un record est en court, il s'agit de l'indice de ce record, sinon il s'agit de l'indice du dernier record 
let the_record; //Tableau d'action de l'actuel record
let record_history = JSON.parse(window.localStorage.getItem("record_history"))
if(record_history == null){
    record_history = [];
}
let start = JSON.parse(window.localStorage.getItem("start")); //Booleen qui se transmet par le localstorage permettant de savoir si on doit ou non directement commencer a enregistrer les actions
if(start == null){
    start = false;
}
let indice_record;
let data = JSON.parse(window.localStorage.getItem("data")); //recupere les datas de l'actuel record s'il n'existe pas, on initialise.
if(data != null){
    make_variable();
}else{
    indice_record = 0;
}


function reset_variable(){
    indice_actions = 0;
    actual_word_type = "";
    actual_input = null;
    in_elt = false;
    blue_word = false;
    blue_input = false;
    replace = false;    
    the_record = [];
}

function make_variable(){
    actual_record = data.actual_record;
    indice_actions = data.indice_actions;
    actual_word_type = data.actual_word_type;
    actual_input = data.actual_input;
    indice_record = data.indice_record;
    the_record = JSON.parse(window.localStorage.getItem(actual_record));
}

function convert(){
    if(the_record.length == 0){
        return;
    }
    txt = "mr = require('mr');\ntest('my_test', () => { mr.goto('"+the_record[0].url+"' );\n";
    for(i = 0; i<the_record.length; i++){
        if(i != 0 && the_record[i].url != the_record[i-1].url){
            txt += "mr.checkUrlEqual('"+the_record[i].url+"');\n"
        }
        txt += "mr.getBy"+the_record[i].type_selecteur+"("+the_record[i].type_target+"{'"+the_record[i].selecteur+"'})."
        if(the_record[i].type == "replace"){
            txt += "replace("+the_record[i].new_value+");\n";
        }else if(the_record[i].type == "keydown"){
            if(the_record[i].controle){
                txt += "type(Control+"+the_record[i].key+");\n"
            }else if(the_record[i].alt){
                txt += "type(Alt+"+the_record[i].key+");\n"
            }else{
                txt += "type("+the_record[i].key+");\n";
            }
        }else{
            txt += the_record[i].type+"();\n"
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
    the_record[indice_actions] = {type: e.type, selecteur: selecteur.selecteur, type_selecteur: selecteur.type, type_target: e.target.tagName.toLowerCase(), controle: false, alt: false, url: window.location.href};
    if(e.ctrlKey){
        the_record[indice_actions].controle = true;
    }
    if(e.altKey){
        the_record[indice_actions].alt = true;
    }
    indice_actions += 1;
    update_record()
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
    the_record[indice_actions] = {type: "replace", selecteur: actual_input, type_selecteur: "name", type_target: "input", controle: false, alt: false, url: window.location.href, input: actual_input, new_value: value};
    indice_actions += 1;
    update_record()
}

function delete_last_char(){
    let i = the_record.length()
    while(i>=0){
        if(the_record[i].type == 'keypress' && the_record[i].input == actual_input){
            the_record.splice(i, 1)
            return;
        }
    }
    update_record();
}

function reset_blue(){
    blue_word = false;
    blue_input = false;
}

function create_new_record(title){
    indice_record += 1;
    actual_record = title;    
    window.localStorage.setItem("indice_record", JSON.stringify(JSON.parse(window.localStorage.getItem("indice_record"))));
    reset_variable();
    update_record();
    record_history.push(title);
    window.localStorage.setItem("record_history", JSON.stringify(record_history));
}

function update_record(){
    window.localStorage.setItem("data", JSON.stringify({actual_record: actual_record, actual_input: actual_input, actual_word_type: actual_word_type, indice_actions: indice_actions, indice_record: indice_record}));
    window.localStorage.setItem(actual_record, JSON.stringify(the_record));
}

function clear_data(){
    window.localStorage.clear();
    the_record = [];
    reset_variable();
    window.localStorage.setItem("indice_record", 0);
    indice_record = 0;
}

function test_is_recording(){
    if(JSON.parse(localStorage.getItem("start")) && actual_record == null){
        reset_variable();
        indice_record += 1;
        actual_record = "record" + indice_record;
        create_new_record("record"+indice_record);
        return true;
    }else if(actual_record != null){
        reset_variable();
    }
    return false;
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
    if(e.key == '*'){
        convert();
    }else if(e.key == "ù"){
        
    }
})
document.addEventListener('keydown', (e) => {
    if(!start){
        return;
    }
    const key = e.key;
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
        if(actual_input != null){
            the_record[indice_actions-1].input = actual_input;
        }else{
            the_record[indice_actions-1].input = "None";
        }
        the_record[indice_actions-1].key = key;
        update_record();
    }else if(actual_input != null){
        if(key == 'z' || key == 'v' || key == 'a'){
            replace = true;
        }
    }
    
})



chrome.runtime.onMessage.addListener(function(msg) {
    console.log(msg);
    var data = msg.message;    
    if(data == "convert"){
        convert();
    }else if(data == "start"){
        console.log("hey")
        if(start){
            start = false;
        }else{
            start = true;
            create_new_record("record"+indice_record);
        }
        window.localStorage.setItem("start", JSON.stringify(start));
    }else if(data == "clear"){
        clear_data();
    }
});


// document.addEventListener('mousemove', (e)=>{
//     const cursorStyle = getComputedStyle(e.target).cursor;
//     if(cursorStyle == 'pointer') {
//         if(!in_elt){
//             in_elt = true;
//             store_event(e)
//             the_record[indice_actions-1].mouvement = "enter"
//         }
//     }else if(cursorStyle == 'auto' && in_elt){
//         in_elt = false;
//         store_event(e)
//         the_record[indice_actions-1].mouvement = "exit"
//     }
// });