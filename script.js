/*
 * Знаки, которыми играет игрок и компьютер
 */
var ZnakUser = 'X';
var ZnakComp = 'O';

/*
 * Обнуление счёта выигрышей
 */
var ScoreUser = '0';
var ScoreComp = '0';

/**
 * Инициализация
 * @returns {void}
 */
$(document).ready(function() {
    /*
     * Увеличение на 130%
     */
    document.body.style.zoom = "130%";

    var ExitFlag = false;
    var WinUserArray = ['123', '456', '789', '147', '258', '369', '159', '357'];

    /**
     *Определяем победу игрока
     *
     *@param {integer} znak - знак Х
     *@return {integer} +1 к счёту игрока
     */
    function check3user(znak) {
        for (var i = 0; i < 8; i++) {

            var first = 'kletka' + WinUserArray[i].substr(0, 1);
            var second = 'kletka' + WinUserArray[i].substr(1, 1);
            var third = 'kletka' + WinUserArray[i].substr(2, 1);

            /**
             * Проверка выигрыша игрока
             */
            if ($('.' + first).text() == znak && $('.' + second).text() == znak && $('.' + third).text() == znak) {
                $('.kletka1, .kletka2, .kletka3, .kletka4, .kletka5, .kletka6, .kletka7, .kletka8, .kletka9').css("background-color", "#FFF");
                $('.' + first + ',.' + second + ',.' + third).css("background-color", "#83e2c3");
                $('.result').text('Вы выиграли!');
                $('.MAIN_DIV .div').unbind('click');
                ScoreUser++;
                score();
                ExitFlag = true;
            }
        }
    }

    /**
     *Определяем возможность победы компьютера
     *
     *@param {integer} znak - знак О
     *@return {integer} +1 к счёту компьютера
     */
    function check2comp(znak) {
        for (var i = 0; i < 8; i++) {

            var first = 'kletka' + WinUserArray[i].substr(0, 1);
            var second = 'kletka' + WinUserArray[i].substr(1, 1);
            var third = 'kletka' + WinUserArray[i].substr(2, 1);

            /**
             * Проверка выигрыша коспьютера
             */
            if ($('.' + first).text() == znak && $('.' + second).text() == znak && $('.' + third).text() == '' && ExitFlag == false) {
                $('.' + third).text(znak);
                $('.' + first + ',.' + second + ',.' + third).css("background-color", "#EF7C7C");
                $('.result').text('Вы проиграли!');
                $('.MAIN_DIV .div').unbind('click');
                ScoreComp++;
                score();
                ExitFlag = true;
            }

            if ($('.' + first).text() == znak && $('.' + second).text() == '' && $('.' + third).text() == znak && ExitFlag == false) {
                $('.' + second).text(znak);
                $('.' + first + ',.' + second + ',.' + third).css("background-color", "#EF7C7C");
                $('.result').text('Вы проиграли!');
                $('.MAIN_DIV .div').unbind('click');
                ScoreComp++;
                score();
                ExitFlag = true;
            }

            if ($('.' + first).text() == '' && $('.' + second).text() == znak && $('.' + third).text() == znak && ExitFlag == false) {
                $('.' + first).text(znak);
                $('.' + first + ',.' + second + ',.' + third).css("background-color", "#EF7C7C");
                $('.result').text('Вы проиграли!');
                $('.MAIN_DIV .div').unbind('click');
                ScoreComp++;
                score();
                ExitFlag = true;
            }
        }
    }

    /**
     *Определяем ход компьютера
     *
     *@param {integer} znak - знак О
     */
    function check2user(znak) {

        for (var i = 0; i < 8; i++) {

            var first = 'kletka' + WinUserArray[i].substr(0, 1);
            var second = 'kletka' + WinUserArray[i].substr(1, 1);
            var third = 'kletka' + WinUserArray[i].substr(2, 1);


            if (ExitFlag == false) {
                if ($('.' + first).text() == znak && $('.' + second).text() == znak && $('.' + third).text() == '') {
                    $('.' + third).text(ZnakComp);
                    ExitFlag = true;
                }
            }

            if (ExitFlag == false) {
                if ($('.' + first).text() == znak && $('.' + second).text() == '' && $('.' + third).text() == znak) {
                    $('.' + second).text(ZnakComp);
                    ExitFlag = true;
                }
            }

            if ($('.' + first).text() == '' && $('.' + second).text() == znak && $('.' + third).text() == znak) {
                $('.' + first).text(ZnakComp);
                ExitFlag = true;
            }

            if (ExitFlag)
                break;
        }
    }

    /**
     * Обработка клика ☺ + ☻™ = ♥♥♥
     */
    $('.MAIN_DIV .div').click(function() {
        //Если клетка пустая
        if ($(this).text() == '') {
            $(this).text(ZnakUser);
            check();
            check3user(ZnakUser);
            check2comp(ZnakComp);
            check2user(ZnakUser);
            if (ExitFlag == false) {
                for (var i = 1; i < 10; i++) {
                    if ($('.kletka' + i).text() == '') {
                        $('.kletka' + i).text(ZnakComp);
                        break;
                    }
                }
            } else
                ExitFlag = false;
        }
    });
});

/**
 *Перезагрузка игры
 */
function restart() {
    $('.result').text('Ваш ход!');
    $('.kletka1, .kletka2, .kletka3, .kletka4, .kletka5, .kletka6, .kletka7, .kletka8, .kletka9').text('');
    $('.kletka1, .kletka2, .kletka3, .kletka4, .kletka5, .kletka6, .kletka7, .kletka8, .kletka9').css("background-color", "#FFF");
    $(".MAIN_DIV .div").bind("click", function() {

        //Если клетка пустая
        if ($(this).text() == '') {
            $(this).text(ZnakUser);
            check3user(ZnakUser);
            check2comp(ZnakComp);
            check2user(ZnakUser);

            if (ExitFlag == false) {
                for (var i = 1; i < 10; i++) {
                    if ($('.kletka' + i).text() == '') {
                        $('.kletka' + i).text(ZnakComp);
                        break;
                    }
                }
            } else
                ExitFlag = false;
        }
    });
}

var ExitFlag = false;
var WinUserArray = ['123', '456', '789', '147', '258', '369', '159', '357'];

/**
 *Определяем победу игрока
 *
 *@param {integer} znak - знак Х
 *@return {integer} +1 к счёту игрока
 */
function check3user(znak) {
    for (var i = 0; i < 8; i++) {
        check();
        var first = 'kletka' + WinUserArray[i].substr(0, 1);
        var second = 'kletka' + WinUserArray[i].substr(1, 1);
        var third = 'kletka' + WinUserArray[i].substr(2, 1);

        if ($('.' + first).text() == znak && $('.' + second).text() == znak && $('.' + third).text() == znak) {
            $('.kletka1, .kletka2, .kletka3, .kletka4, .kletka5, .kletka6, .kletka7, .kletka8, .kletka9').css("background-color", "#FFF");
            $('.' + first + ',.' + second + ',.' + third).css("background-color", "#83e2c3");
            $('.result').text('Вы выиграли!');
            $('.MAIN_DIV .div').unbind('click');
            ScoreUser++;
            score();
            ExitFlag = true;
        }
    }
}

/**
 *Определяем возможность победы компьютера
 *
 *@param {integer} znak - знак О
 *@return {integer} +1 к счёту компьютера
 */


/**
 *Определяем ход компьютера
 *
 *@param {integer} znak - знак О
 */
function check2user(znak) {

    for (var i = 0; i < 8; i++) {

        var first = 'kletka' + WinUserArray[i].substr(0, 1);
        var second = 'kletka' + WinUserArray[i].substr(1, 1);
        var third = 'kletka' + WinUserArray[i].substr(2, 1);


        if (ExitFlag == false) {
            if ($('.' + first).text() == znak && $('.' + second).text() == znak && $('.' + third).text() == '') {
                $('.' + third).text(ZnakComp);
                ExitFlag = true;
            }
        }

        if (ExitFlag == false) {
            if ($('.' + first).text() == znak && $('.' + second).text() == '' && $('.' + third).text() == znak) {
                $('.' + second).text(ZnakComp);
                ExitFlag = true;
            }
        }

        if ($('.' + first).text() == '' && $('.' + second).text() == znak && $('.' + third).text() == znak) {
            $('.' + first).text(ZnakComp);
            ExitFlag = true;
        }
        if (ExitFlag)
            break;
    }
}



/**
 *Подсветка желтым цветом поля, если ничья
 */
function check() {
    if ($('.kletka1').text() != '' && $('.kletka2').text() != '' && $('.kletka3').text() != '' && $('.kletka4').text() != '' && $('.kletka5').text() != '' && $('.kletka6').text() != '' && $('.kletka7').text() != '' && $('.kletka8').text() != '' && $('.kletka9').text() != '') {
        $('.result').text("Ничья");
        $('.kletka1, .kletka2, .kletka3, .kletka4, .kletka5, .kletka6, .kletka7, .kletka8, .kletka9').css("background-color", "#FFE097");
    }
}