//Решение задачи с ксероксами,
minTimeForCopies = (N, x, y) => {
    /* Секунды - наше общее ограничение по времени, служит концом отсчёта в цикле
    * Копии - текущее кол-во копий
    * Переменные ксероксов =  время их работы в секундах
    * minTime наш ответ на задачку, мин кол-во времени для создания копий
    * timeForSecondXerox - начало времени работы второго ксерокса
    *
    *
    * */
    let seconds = 100;
    let copies = 0;
    let firstXerox, secondXerox;
    let minTime = 0;
    let timeForSecondXerox = 0;
    // Первым ксероксом будет тот, которым быстрее
    if (x < y) {
        firstXerox = x;
        secondXerox = y;
    } else {
        firstXerox = y;
        secondXerox = x;
    }
    // Цикл для проверки если текущие секунды делятся без остачи на время работы ксерокса, тогда копия+1
    for (let i = 1; i <= seconds; i++) {
        //Второй ксерокс начинает работать только после первой копии
        if (copies > 0) {
            timeForSecondXerox++;
            if (timeForSecondXerox % secondXerox === 0) {
                copies++
            }
        }

        if (i % firstXerox === 0) {
            copies++
        }
        //  console.log(copies)
        minTime = i;
        console.log(copies, minTime, timeForSecondXerox, timeForSecondXerox % secondXerox === 0);
        if (copies >= N) {
            return console.log(copies, minTime, timeForSecondXerox)
        }
    }

};
minTimeForCopies(5, 4, 5);