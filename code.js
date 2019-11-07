//класс конструктор item в котором есть цвет и название дел
//стоит добавить дату
//добавить id на каждое дело
//добавить генерацию id
class ItemDeal{
    constructor(name, color, now){
        this.name = name;
        this.color = color; 
        this.now = new Date;
    }
}



let motivation_array = [
    'Двигайся вперед',
    'Расти большой не будь лапшой',
    'Just do it'
];

let select = document.querySelector('#important');
// сообщение о важности нашего дела
let field = document.querySelector('input');
// здесь мы получаем контент нашего дела('помыть посуду')
let button = document.querySelector('.button_plus');
//кнопка по которой у нас добавляется событие
let deals = document.querySelector('.deals');
// куда мы будем вписывать наши дела

/* если выбрана 1  то красное is-danger */
/* если выбрана 2  то красное is-warning */
/* если выбрана 3  то красное is-success */
// только на селекте


// а на сообщения - 
// срочное - has-text-danger
//полусрочное - has-text-warning
//  несрочное - has-text-success
//IA = important array
let IA = ['has-text-danger', 'has-text-warning', 'has-text-success'];

let Animation_Array = ['bounceOut', 'rollOut', 'rotateOut', 'lightSpeedOut'];


//здесь у нас происходит первичная прорисовка приложения


(function drawOnLoad(){
    for (let i = 0; i < localStorage.length; i++) {
        let lk_key = localStorage.key(i);
        let content = localStorage.getItem(lk_key);
        let parse_content = JSON.parse(content);
        console.dir(parse_content);
        console.log(parse_content.name);
        console.log(parse_content.color);
        console.log(parse_content.now.getDate());
        //здесь у нас пойдет сама отрисовочка
    }
})();






