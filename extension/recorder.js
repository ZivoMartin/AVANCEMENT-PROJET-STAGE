console.log('I am running');
const actions = [];
let indice_actions = 0;
let actual_word_type = "";
let actual_input = null;
let controle = false
let in_elt = false


function store_event(e){
    selecteur = get_selecteur(e.target)
    actions[indice_actions] = {type: e.type, selecteur: selecteur.selecteur, type_selecteur: selecteur.type, type_target: e.target.tagName, arbre: get_arbre(e.target)};
    indice_actions += 1;
}

function get_selecteur(target){
    if(target.id != ""){
        return {selecteur: target.id, type: "id"};
    }else if(target.tagName == "INPUT" && target.placeholder != ""){
        return {selecteur: target.placeholder, type: "placeholder"}
    }else if(target.name != null && target.name != ""){
        return {selecteur: target.name, type: "name"}
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
    result = []
    elt = target.parentElement;
    k = 0;
    while(elt.tagName != "HTML" && elt.tagName != "BODY"){
        result[k] = {tagName: elt.tagName, id: elt.id, class: elt.class, nom: target.name};
        elt = elt.parentElement;
        k = k + 1;
    }
    return result;
}

document.addEventListener('click', (e) => {
    store_event(e);
    console.log(actions[indice_actions-1])
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
    const key = e.key;
    if(key != "Control"){
        store_event(e);
        actions[indice_actions-1].input = actual_input;
    }
    if(controle && key != "Control"){
        if(key == 'z'){
            actions.pop();
            let j = actions.length - 1;
            while(actions[j].type == "mousemove"){
                j = j - 1;
            }
            actions.splice(j, 1);
        }else{
            actions[indice_actions-1].key = "controle + " + key;
        }
    }else if(key != "Control"){
        actions[indice_actions-1].key = key;
    }else{
        controle = true;
    }
})

document.addEventListener('keypress', (e) => {
    store_event(e);
})

document.addEventListener('mousemove', (e)=>{
    const cursorStyle = getComputedStyle(e.target).cursor;
    if(cursorStyle == 'pointer') {
        if(!in_elt){
            in_elt = true;
            store_event(e)
            actions[indice_actions-1].mouvement = "enter"
        }
    }else if(cursorStyle == 'auto' && in_elt){
        in_elt = false;
        store_event(e)
        actions[indice_actions-1].mouvement = "exit"
    }
});