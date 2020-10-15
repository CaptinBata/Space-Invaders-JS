class Utilities {
    static getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static removeElement(list, element) {
        list.splice(list.indexOf(element), 1)
    }
}