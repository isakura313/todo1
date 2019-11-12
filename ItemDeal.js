export default class ItemDeal {
    constructor(name, color) {
        this.name = name; //имя дела
        this.color = color;  //цвет дела
        this.now = new Date; // дата создания и отсюда будет сгенерирован id
    }
}

// export default ItemDeal;