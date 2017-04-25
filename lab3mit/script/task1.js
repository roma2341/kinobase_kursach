/*
1. Написати скрипт, який запрошує 2 числа, початок і кінець діапазону, і в результаті видає
 суму всіх непарних чисел у цьому діапазоні.
 */

	function processTask1(){
		var diapasonStart = parseInt(document.getElementById('task1FirstNumber').value);
		var diapasonEnd = parseInt(document.getElementById('task1LastNumber').value);
		var sumOfOdd = sumOddNumbersInRange(diapasonStart,diapasonEnd);
		var resultElm = document.getElementById('task1Result');
		resultElm.innerText = sumOfOdd;
	}

     function sumOddNumbersInRange(rangeStart,rangeEnd){
 	var sum = 0;
 	var i = rangeStart;
 	if (isEven(i)) i++;//Корекція позиції щоб починати з непарного.
 	for(; i <= rangeEnd; i+=2) {
 		sum += i;
 	}
 	return sum;
 }
