class MyArray {
    constructor() {
        this.length = 0;
        this.push(...arguments);
    }

    push() {
        for (let i = 0; i < arguments.length; i++) {
        this[this.length] = arguments[i];
        this.length++;
        }
    }

    pop() {
        let lastItem = this[this.length - 1];
        delete this[this.length - 1];
        this.length--;
        return lastItem;
    }

    forEach(fn) {
        for (let i = 0; i < this.length; i++) {
            fn(this[i]);
        }
    }

    map(fn) {
        const newArr = new MyArray();
        for (let i = 0; i < this.length; i++) {
            newArr.push(fn(this[i], i, this));
        }
        return newArr;
    }

    [Symbol.iterator]() {
        let i = 0;
        return {
            next: () => ({
                done: i > this.length -1,
                value: this[i++]
            })
        }
    }

    static isMyArray(item) {
        return item instanceof MyArray;
    }

    flat(deep = 1) {
        let arr = new MyArray();
        for (let item of this) {
            if (MyArray.isMyArray(item) && deep > 0) {
                arr.push(...item.flat(deep-1));
            } 
            else {
                arr.push(item);
            } 
        }
        return arr;
    }
}

const myarr = new MyArray(1, 2, new MyArray(3, 4, new MyArray(5, 6, new MyArray (7, 8, new MyArray(9, 10)))));
myarr.push(101, 44)
console.log(myarr.flat(5));



