const employees = require('/test-task/employees').employees;
const prices = require('/test-task/prices');
const recipes = require('/test-task/recipes');

//Глубокое копирование, чтобы не менялся исходный обект
const sortedEmployees = JSON.parse(JSON.stringify(employees));

//Ф-я  для получения суммы стоимости напитков одного человекав
getPrice = (drinks, prices) => {
    let price = 0;
    for (let drink in drinks) {

        Object.keys(recipes).find(key => {

            if (key === drinks[drink]) {
                for (const [keys, value] of Object.entries(recipes[key])) {
                    price += prices[keys] * value;
                }
            }
        });
    }
    return price;
};
//Ф-я присвоения напитков в массив обьектов для сортировки
countEmplDrinks = () => {
    for (let employee in sortedEmployees) {
        sortedEmployees[employee].drinks = getPrice(sortedEmployees[employee].drinks, prices);

    }

};
//Ф-я  сортировки массива обьектов  по цене напитков
sortEmplByPrice = () => {
    sortedEmployees.sort((a, b) => {
        if (a.drinks > b.drinks) {
            return 1;
        } else if (a.drinks === b.drinks) {
            if (a.id > b.id) {
                return 1
            }
            if (a.id < b.id) {
                return -1;
            }
        }
        if (a.drinks < b.drinks) {
            return -1;
        }
    });
};

//Ф-я вывода максимального кол-ва сотрудников
membersToInvite = (M) => {
    /*
    count -  кол-во приглашенных людей,
    sum - текущая сумма напитков со всех приглашенных(нужна для ограничения подсчёта относительно M)
     */
    let answer = [];
    let count = 0;
    let sum = 0;
    for (let employee in sortedEmployees) {
        sum += sortedEmployees[employee].drinks;
        if (sum > M) {
            break;
        }
        count++
    }
    //В массив ответов пушатся ответы из сортированного массива в количестве count
    //И в том случае если имя сортированного елемента === имя исходного массива
    for (let i = 0; i < count; i++) {
        answer.push(employees.find(item => item.name === sortedEmployees[i].name))
    }
    //Сортировка окончательного ответа по айди(айди все уникальны, потому проверки на повторяющиеся значения нет)
    answer.sort((a, b) => {
        if (a.id > b.id) {
            return 1
        }
        if (a.id < b.id) {
            return -1;
        }
    });
    return console.log(answer);

};
countEmplDrinks();
sortEmplByPrice();
membersToInvite(1);
