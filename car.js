class Car{
    constructor(mark, model, color, number){
        this.mark = mark
        this.model = model
        this.color = color
        this.number = number
    }

    get car() {
        return {
            mark: this.mark,
            model: this.model,
            color: this.color,
            number: this.number
        }
    }
}

let arr = [];

function createCar(mark, model, color, number){
    arr.push(new Car(mark, model, color, number));
}
