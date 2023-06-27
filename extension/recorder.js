console.log('I am running');
const actions = [];
let i = 0;
let actual_word_type = "";
let actual_input = null;
let controle = false


function store_event(e){
    selecteur = get_selecteur(e.target)
    actions[i] = {type: e.type, selecteur: selecteur.selecteur, type_selecteur: selecteur.type, type_target: e.target.tagName, arbre: get_arbre(e.target)};
    console.log(actions[i]);
    i += 1;
}

function get_selecteur(target){
    if(target.id != ""){
        return {selecteur: target.id, type: "id"};
    }else if(target.tagName == "INPUT" && target.placeholder != ""){
        return {selecteur: target.placeholder, type: "placeholder"}
    }else if(target.tagName == "INPUT" && target.value != ""){
        return {selecteur: target.value, type: "value"}
    }else if(target.textContent != ""){
        txt = target.textContent;
        if(txt.length <= 100){
            return {selecteur: txt, type: "texte"};
        }else{
            let txt_result = txt[0]
            for(i = 1; i<100; i++){
                txt_result += txt[i];
            }
            return {selecteur: txt_result, type: "texte"};
        }
    }else{
        return {selecteur: 'not', type: "not"}
    }
}

function get_arbre(target){
    result = ""
    elt = target.parentElement;
    while(elt != null){
        result = " > " + elt.tagName + result;
        elt = elt.parentElement;
    }
    return result;
}

document.addEventListener('click', (e) => {
    store_event(e);
    if(e.target.tagName == "INPUT"){
        const name = e.target.name;
        actual_input = name;
    }else{
        actual_input = null;
    }
})
document.addEventListener('dblclick', (e) => {
    store_event(e);
})

document.addEventListener('keyup', (e) => {
    if(e.key == "Control"){
        controle = false;
    }
    store_event(e);
})
document.addEventListener('keydown', (e) => {
    store_event(e);
    const key = e.key;
    if(controle && key != "Control"){
        actions[i-1].key = "controle + " + key;
    }else if(key != "Control"){
        actions[i-1].key = key;
    }else{
        controle = true;
    }
    actions[i-1].input = actual_input;
})

document.addEventListener('keypress', (e) => {
    store_event(e);
})