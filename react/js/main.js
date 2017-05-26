(function() {
    var labaService = new window.labaService();
    //alert(labaService.tast3_heist(534, 5));
    var currentTask = null;
    var worker;
    var preloaderTimeout = null;
    $('ul.tabs').tabs();
    function startWorker(params) {
        stopWorker();
        if (typeof(Worker) !== "undefined") {
            if (typeof(worker) == "undefined") {
                worker = new Worker("js/service.js");
            }
            worker.postMessage(params);
            worker.onmessage = function(event) {
                showData(event.data);
                stopWorker();
            };
            return true;
        } else {
            alert("Sorry! No Web Worker support.");
        }
        return false;
    }

    function stopWorker() {
        if (worker != undefined) {
            worker.terminate();
            worker = undefined;
        }
    }

    var tasks = {
        'task1': {
            title: "Cума не парних",
            content: "1.    Написати скрипт, який запрошує 2 числа, початок і кінець діапазону, і в результаті видає суму всіх непарних чисел у цьому діапазоні.",
            func: "tast1_calcSumaOfUnpairNum",
            args: 2
        },
        'task2': {
            title: "Факторіал",
            content: "2.    Знайти факторіал числа. У користувача запрошується число, і в результаті виводиться факторіал числа (якщо ввести, наприклад, 5, то у результаті має бути число 120).",
            func: "tast2_factotial",
            args: 1
        },
        'task3': {
            title: "Хеєс",
            content: `3.    Знайти послідовність Хеєса. Користувач вводить число і в результаті повинно бути видано повідомлення з самою послідовністю, кількість кроків, які були необхідні для знаходження послідовності, і вершиною послідовності – це максимальне число з цієї послідовності. 
            Послідовність Хеєса рахується так: якщо введено число 9, то воно перевіряється на парність. Якщо воно парне, то ділимо на 2, якщо непарне, множимо на 3 і додаємо 1. Таку операцію продовжуємо до тих пір, поки число не буде рівним 1.`,
            func: "tast3_heist",
            args: 1
        },
        'task4': {
            title: "Щось дивне",
            content: `4.    Дано довільне ціле число n. Написати програму, яка:
    - розбиває число на цифри і виводиться їх на екран, 
    - рахує кількість цифр у числі n,
    - знаходить суму цифр числа n,
    - змінює порядок цифр числа n на зворотній.
    `,
            func: "tast4_test",
            args: 1
        }
    };

    function loadTask(id) {
        var task = tasks[id];
        if (task == undefined) {
            alert("task not founded");
            return false;
        }
        $("#task-title").html(task.title);
        $("#task-content").html(task.content);
        document.getElementById("second_arg").disabled = task.args == 1;

        currentTask = task;
    }

    function showData(data) {
        if (preloaderTimeout != null) {
            clearTimeout(preloaderTimeout);
            preloaderTimeout = null;
        }
        $("#task-result").html(data);
        $("#progress").fadeTo("slow", 0);
    }

    function calc(event) {
        event.preventDefault();

        var first = parseInt($("#first_arg").val());
        var second = parseInt($("#second_arg").val());
        var workerParams = {
            first: first,
            second: second,
            task: currentTask.func
        }
        preloaderTimeout = setTimeout(function() {
            $("#progress").fadeTo("slow", 1);
        }, 500)

        if (startWorker(workerParams) == false) {
            showData(labaService[currentTask.func](first, second));
        }


        return false;
    }

    
        $('ul.tabs li a').click(function(event) {
            //alert($(event.currentTarget).attr('t-id'));
            loadTask($(event.currentTarget).attr('t-id'));
            $("button[type=submit]").click();
        })
        document.getElementById("form").addEventListener('submit', calc);
        loadTask('task1');
    
})();
