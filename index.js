//класс конструктор item в котором есть цвет и название дел
//стоит добавить дату
//добавить id на каждое дело
//добавить генерацию id


// некий пример, как может выглядеть конструктор в ООП

const ItemDeal = require('./ItemDeal').default;
module.exports = ItemDeal;



class Dog {
    constructor(name, poroda, age, bark) {
        this.name = name;
        this.poroda = poroda;
        this.age = age;
        this.bark = bark = () => {
            alert("woow");
        }
    }
}

let Lassy = new Dog("Lassy", "terier", 5);




let todo = new ItemDeal("delo", "red");
// console.dir(todo);



let motivation_array = [
    'Двигайся вперед и никогда не сдаваться',
    'Расти большой не будь лапшой',
    'Just do it',
    'Лучший в мире за работой',
    'Просто садись и делай',
    'Ты большой молодец'
];

let IA = ['has-text-danger',
    'has-text-warning',
    'has-text-success']; //цвета важности из бульмы IA = important array

let Animation_Array = ['bounceOut',
    'rollOut', 'rotateOut', 'lightSpeedOut'];  // различные анимации удаления todo - item

let Month_Array = ['Января', "Февраля", "Марта", "Апреля" , "Мая", "Июня", "Июля", "Августа", "Сентября","Октября", "Ноября", "Декабря"];	



let select = document.querySelector('#important');
// сообщение о важности нашего дела
let field = document.querySelector('input');
// здесь мы получаем контент нашего дела('помыть посуду')
let button = document.querySelector('.button_plus');
//кнопка по которой у нас добавляется событие
let deals = document.querySelector('.deals');
// куда мы будем вписывать наши дела





//здесь реализован самовызывающийся модуль
//эта функция вызывается сразу при загрузке страницы
//она берет данные из localStorage и рисует их 

(function drawOnLoad() {
    for (let i = 0; i < localStorage.length; i++) {
        
        let lk_key = localStorage.key(i);
        
        let content = localStorage.getItem(lk_key);
        let item = JSON.parse(content);
        let tempo_dat = Date.parse(item.now);
        item.now = new Date(tempo_dat);
        GenerateDom(deals, item);
    }
})();

function createItem(){
    let text = field.value;
    if(!text){
        return;
    } 
    let item = new ItemDeal(`${text}`,`${select.value - 1}`);
    let item_toJSON = JSON.stringify(item);
    localStorage.setItem(+item.now, item_toJSON);   
    GenerateDom(deals, item);
    field.value = '';
};

button.addEventListener('click', createItem);

document.addEventListener('keypress', (e) => {
    if(e.keyCode == 13 ){
        createItem();
    }
    
})


//удаление элемента

deals.addEventListener('click', (e) => {
    let item = event.target.closest('i');
    let item2 = event.target.closest('.wrap_task');
    if(!item || !deals.contains(item)){
        return;
    }
    item2.className = `animated ${Animation_Array[GR(Animation_Array)]} wrap-task`;
    setTimeout(() => {
        item2.remove();
        localStorage.removeItem(item2.id);
    }, 1500);
})


//функция смены фраз
//вставить уникальный рандом только
setInterval(() => {
    (function ChangePhrase(){
        document.querySelector('.MotSpeech').className ='MotSpeech is-size-5 animated bounceIn';
        document.querySelector('.MotSpeech').innerHTML = motivation_array[GR(motivation_array)];
        setTimeout(() => {
            document.querySelector('.MotSpeech').classList.remove("bounceIn");
        }, 2900);
    })();
    
}, 3000);



//генерация различных анимаций на создании
function GenerateDom(aimElem, obj){
    aimElem.insertAdjacentHTML('afterbegin', 
    `<div class="wrap_task animated zoomInLeft" id="${+obj.now}">
    <div class="task is-size-4">
    <p> <span class="${IA[select.value - 1]}"> ${obj.name} </span>
    ${obj.now.getDate()} ${Month_Array[obj.now.getMonth()]} ${obj.now.getFullYear()} </p>
    </div>
    <span class="icon is-large tr">
    <i class="fas fa-trash-alt thrash"> </i>
    </span>
    </div>`);
}

function GR(arr){
    return Math.round(Math.random() * (arr.length - 1));
}


// только на селекте
/* если выбрана 1  то красное  has-background-danger*/
/* если выбрана 2  то красное has-background-info */
/* если выбрана 3  то красное has-background-primary  */

function ChangeColorSelect(el){
    switch (el.value) {
        case '1':
            el.className = "has-background-danger has-text-white";
            break;
        case '2':
            el.className = "has-background-info has-text-white";
            break;
        case '3':
            el.className = "has-background-primary has-text-white";
            break;

        default:
            break;
    }
}

document.addEventListener("DOMContentLoaded", () =>{
    ChangeColorSelect(select);
})
select.onchange = () =>{
    ChangeColorSelect(select);
}

// Д/З
// реализовать следующее:
// смена важности дела ( в селекте по номеру)
//если нажата 1 - тогда важность выбирается сама красная, и так далее










