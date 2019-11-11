//класс конструктор item в котором есть цвет и название дел
//здесь чисто технически у нас будет деструктуризация, когда мы будем отправлять текст.  ну чисто технически, мы можем ее попробовать
// не вижу никакого смысла разносить генерацию сообщения. Она у нас точно должна быть в одной функции



/* 
класс ITEMDEAL
нужноп переписать  саму генерацию класса

*/

class ItemDeal{
    constructor(name, color, now){
        this.name = name;
        this.color = color; 
        this.now = new Date();
    }
}

// просто пример создания
let item  = new ItemDeal('prikol', 'red'); // здесь скорее всего можно по человечески переписать конструктор
console.dir(item); // просто тестовый прогон
console.log(+item.now);




let select = document.querySelector('#important');
// сообщение о  степени важности нашего дела
let field = document.querySelector('input');
// здесь мы получаем контент нашего дела('помыть посуду')
let button = document.querySelector('.button_plus');
//кнопка по которой у нас добавляется событие
let deals = document.querySelector('.deals');
// елеменкт, в который мы будем вписывать наши дела



// а на сообщения - 
// срочное - has-text-danger
//полусрочное - has-text-warning
//  несрочное - has-text-success
//IA = important array
let IA = ['has-text-danger', 'has-text-warning', 'has-text-success'];
let Animation_Array = ['bounceOut', 'rollOut', 'rotateOut', 'lightSpeedOut'];
let Month_Array = [ 'Январь', 'Февраль ', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];



//здесь у нас происходит первичная прорисовка приложения


(function drawOnLoad(){
    for (let i = 0; i < localStorage.length; i++) {
        let lk_key = localStorage.key(i);
        let content = localStorage.getItem(lk_key);
        let parse_content = JSON.parse(content);
        // console.dir(parse_content);
        // console.log(parse_content.name);
        // console.log(parse_content.color);
        // console.log(parse_content.now.getDate());
        //здесь у нас пойдет сама отрисовочка
        let dat = Date.parse(parse_content.now);
        dat  = new Date(dat)
        console.warn(dat.getDate());

        deals.insertAdjacentHTML('afterbegin', 
        `<div class='wrap-task' id ="${parse_content.id}">
            <div class="task is-size-4">
            <p> <span class="${IA[parse_content.color]}">  ${parse_content.name}  </span>  ${dat.getDate()} ${Month_Array[dat.getMonth()]} ${dat.getFullYear()} </p>
            </div>
        <span class="icon is-large tr">
        <i class="fas fa-trash-alt trash"></i>
        </span>
        </div>`);
      field.value = '';
    }
})();

// дальше у нас пойдет сама отрисовочка

function createItem() {
    let text = field.value; // получение данных из input
    if (!text) {
      return;
      //return сразу прекращает выполнение функции
    }
    let item = new ItemDeal("",`${text}`, `${select.value - 1}`);
    let lk_id = item.id;
    let myJson = JSON.stringify(item);
    localStorage.setItem(lk_id, myJson);
    deals.insertAdjacentHTML('afterbegin', 
        `<div class="wrap-task animated zoomInLeft" id = "${item.id}">
        <div class="task is-size-4 ${IA[select.value - 1]}">
            <p>${text} ${item.now.getDate()} ${Month_Array[item.now.getMonth()]} ${item.now.getFullYear()} </p>
            </div>
        <span class="icon is-large tr">
            <i class="fas fa-trash-alt trash"></i>
        </span>
  </div>`);
    field.value = '';
  }
  
  
  
  button.addEventListener('click', createItem);

  document.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
      createItem();
    }
  });


// удаление элемента
deals.addEventListener('click', function (event) {
    let item = event.target.closest('i');
    let item2 = event.target.closest('.wrap-task');
    if (!item || !deals.contains(item)) {
      return;
    }
  
    item2.className = `animated ${Animation_Array[1]} wrap-task`;
    setTimeout(function () {
      // item2.parentNode.removeChild(item2);// это можно переписать проще
      item2.remove();
      let id_element = item2.id;
      // x = x.trim();
      //трим вырезает лишние пробелы
      console.log(id_element);
      localStorage.removeItem(id_element);
    }, 700)
  });
  

/* часть связанная с мотивацией
игрока 
*/



  let motivation_array = [
    'Двигайся вперед и никогда не сдавайся',
    'Расти большой не будь лапшой',
    'Just do it',
    'Лучший в мире за работой'
];

  function changePhrase() {
    document.querySelector('.MotSpeech').innerHTML = motivation_array[Math.round(Math.random() * (motivation_array.length - 1))];
    document.querySelector('.MotSpeech').className = "MotSpeech anime";
  }
  //запуск смены фраз;
  setInterval(changePhrase, 8000);



  // если выбрана 1  то красное is-danger 
// если выбрана 2  то красное is-warning 
// если выбрана 3  то красное is-success 
// здесь у нас должна быть отрисовка  

  function ChangeColorSelect(val){
    switch (val) {
      case 1:
        select.className = 'is-danger ';
        break;
      case 2:
          select.className = 'is-danger ';
        break;
      case 3:
          select.className = 'is-danger ';
        break;
      
    
      default:
        break;
    }
  }

  ChangeColorSelect(select);


  //сюда я хочу заложить отдельную функцию не генерацию и парсинг времени