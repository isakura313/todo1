//класс конструктор item в котором есть цвет и название дел
//здесь чисто технически у нас будет деструктуризация, когда мы будем отправлять текст.  ну чисто технически, мы можем ее попробовать
// не вижу никакого смысла разносить генерацию сообщения. Она у нас точно должна быть в одной функции



/* 
класс ITEMDEAL
*/

class ItemDeal {
  constructor(name, color, now) {
    this.name = name;
    this.color = color;
    this.now = new Date();
  }
}


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
let Month_Array = ['Января', 'Февраля ', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];



//здесь у нас происходит первичная прорисовка приложения


(function drawOnLoad() {
  for (let i = 0; i < localStorage.length; i++) {
    let lk_key = localStorage.key(i);
    let content = localStorage.getItem(lk_key);
    let parse_content = JSON.parse(content);
    let dat = Date.parse(parse_content.now);
    parse_content.now = new Date(dat);
    GenerateDom(deals, parse_content);
  }
})();

// дальше у нас пойдет сама отрисовочка

function createItem() {
  let text = field.value; // получение данных из input
  if (!text) {
    return;
  }
  let item = new ItemDeal(`${text}`, `${select.value - 1}`);
  let myJson = JSON.stringify(item);
  localStorage.setItem(+item.now, myJson);
  GenerateDom(deals, item);
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

  item2.className = `animated ${Animation_Array[GR(Animation_Array)]} wrap-task`;
  setTimeout(() => {
    item2.remove();
    localStorage.removeItem(item2.id);
  }, 700)
});


let motivation_array = [
  'Двигайся вперед и никогда не сдавайся',
  'Расти большой не будь лапшой',
  'Just do it',
  'Лучший в мире за работой'
];

function changePhrase() {
  document.querySelector('.MotSpeech').innerHTML = motivation_array[GR(motivation_array)];
  document.querySelector('.MotSpeech').className = "MotSpeech anime";
}

//эта функция занимается генерацией различных цифер
function GR(arr) {
  return Math.round(Math.random() * (arr.length - 1))
}

//запуск смены фраз;
setInterval(changePhrase, 8000);



// если выбрана 1  то красное is-danger 
// если выбрана 2  то красное is-warning 
// если выбрана 3  то красное is-success 
// здесь у нас должна быть отрисовка  

function ChangeColorSelect(val) {
  switch (val) {
    case '1':
      select.className = 'has-background-danger has-text-white';
      break;
    case '2':
      select.className = 'has-background-link has-text-white';
      break;
    case '3':
      select.className = 'has-background-primary has-text-white';
      break;
    default:
      alert("wtf");
      select.className = 'has-text-danger';
      break;
  }
}

window.onload = () =>{
  ChangeColorSelect(select.value);
}
select.onchange = () =>{
  ChangeColorSelect(select.value);
}

// отдельная функция на генерацию DOM
function GenerateDom(aimElem, obj) {
  aimElem.insertAdjacentHTML('afterbegin',
    `<div class="wrap-task animated zoomInLeft" id="${+obj.now}">
  <div class="task is-size-4">
      <p> <span class=${IA[select.value - 1]}> ${obj.name} </span> ${obj.now.getDate()} ${Month_Array[obj.now.getMonth()]} ${obj.now.getFullYear()} </p>
      </div>
      <span class="icon is-large tr">
      <i class="fas fa-trash-alt trash"></i>
  </span>
</div>`);
  field.value = '';
}

