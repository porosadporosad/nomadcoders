const a = 5;
const b = 2;
const Hi = "Hello ";
let myName = "nico";

console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(Hi + myName);

myName = "YJ";

console.log(Hi + myName);

const amIFat = null;
let something;

console.log(amIFat, something);

const day0fWeek = ["mon", "tue", "wed", "thu", "fri", "sat"];

console.log(day0fWeek);
console.log(day0fWeek[4]);

day0fWeek.push("sun");

console.log(day0fWeek);

const player = {
    name : "nico",
    points : 12,
    fat : true,
};

console.log(player);
console.log(player.name);
console.log(player["name"]);

player.fat = false;
console.log(player.fat);

function sayHello(name0fPerson, age) {
    console.log("Hello my name is " + name0fPerson + " and I'm " + age);
}

sayHello("nico", 10);
sayHello("dal", 23);
sayHello("lynn", 21);

function plus(a, b) {
    console.log(a + b);
}

function divide(a, b) {
    console.log(a / b);
} 

plus(8, 60);
divide(98, 20);

const calculator = {
    plus: function (a, b){
        console.log(a + b);
    },
    minus: function (a, b){
        console.log(a - b);
    },
    times: function (a, b){
        console.log(a * b);
    },
    divide: function (a, b){
        console.log(a / b);
    },
    power: function (a, b){
        console.log(a ** b);
    },
};


const agee = 96;
function calculateKrAge(age0fForeigner) {
    return age0fForeigner + 2;
}
const krAge = calculateKrAge(agee);

console.log(krAge);