
function isEven(n){
	if (!Number.isFinite(parseFloat(n))) return undefined;
	return !isOdd(n);
}
function isOdd(n){
	if (!Number.isFinite(parseFloat(n))) return undefined;
	return n & 1;
}

/*
1. Написати скрипт, який запрошує 2 числа, початок і кінець діапазону, і в результаті видає
 суму всіх непарних чисел у цьому діапазоні.
 */

	window.processTask1 = function processTask1(){
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

/*
2. Знайти факторіал числа. У користувача запрошується число, і в результаті виводиться факторіал числа 
(якщо ввести, наприклад, 5, то у результаті має бути число 120).
*/
function fact(n){
if (n == 1 || n == 0) return 1;
return fact(n-1) * n;
}
window.processTask2 = function processTask2(){
var num = parseInt(document.getElementById('task2Input').value);
		var factorialOfNumber = fact(num);
		var resultElm = document.getElementById('task2Result');
		resultElm.innerText = factorialOfNumber;
}

/*
3. Знайти послідовність Хеєса. Користувач вводить число і в результаті повинно бути видано повідомлення з самою 
послідовністю, кількість кроків, які були необхідні для знаходження послідовності, і вершиною послідовності – 
це максимальне число з цієї послідовності. 
Послідовність Хеєса рахується так: якщо введено число 9, то воно перевіряється на парність. Якщо воно парне, то 
ділимо на 2, якщо непарне, множимо на 3 і додаємо 1. Таку операцію продовжуємо до тих пір, поки число не буде 
рівним 1. 
*/
function findHeyes(num){
	var steps = 0;
	var sequenceString = "";
	var sequenceArray = [];
	var top = num;

	sequenceArray.push(num);
	function tryUpdateTop(value){
		if (value>top){
			top = value;
		}
	}
	while(num != 1){
		steps++;
		sequenceString += num 
		if (isEven(num)){
			sequenceString += '/2';
			num/=2;
		}
		else{
			sequenceString += '*3+1'
			num*=3;
			num+=1;
		}
		tryUpdateTop(num);
		sequenceArray.push(num);
		sequenceString += '='+num+';';
	}
	return {
		sequence: sequenceArray,
		steps: steps,
		top: top,
		sequenceString: sequenceString
	}

}

window.processTask3 = function processTask3(num){
var num = parseInt(document.getElementById('task3Input').value);
var result = findHeyes(num);
var resultJSON = JSON.stringify(result);
//var resultElm = document.getElementById('task3Result');
//resultElm.innerText = resultJSON;
return resultJSON;


}

/*
4. Дано довільне ціле число n. Написати програму, яка:
- розбиває число на цифри і виводиться їх на екран, 
- рахує кількість цифр у числі n,
- знаходить суму цифр числа n,
- змінює порядок цифр числа n на зворотній.
*/
function digitsOfNumber(n){
	var digits = [];
	var i = 0;
	while(n != 0){
		digits[i++] = n%10;
		n = Math.floor(n / 10);
	}
	digits.reverse();
	return digits;
}
function countDigits(n){
	var i = 0;
	while(n != 0){
		i++;
		n = Math.floor(n / 10);
	}
	return i;
}
function sumDigits(n){
	var digits = digitsOfNumber(n);
	var sum = digits.reduce((a, b) => a + b, 0);
	return sum;
}
function digitsToNumber(digits){
	var num = 0;
	digits.reverse();//for easier iterating 
	for (var i = 0; i < digits.length; i++){
		num += Math.pow(10,i) * digits[i];
	}
	return num;
}
function reverseNum(n){
	var digits = digitsOfNumber(n);
	digits.reverse();
	return digitsToNumber(digits);

}
window.processTask4 =function processTask4(num){
var num = parseInt(document.getElementById('task4Input').value);
var digits = digitsOfNumber(num);
var digitsCount = countDigits(num);
var digitsSum = sumDigits(num);
var reversed = reverseNum(num);
var resultObj = {
	number: num,
	digits: digits,
	digitsCount: digitsCount,
	digitsSum: digitsSum,
	reversed: reversed
}

var resultJSON = JSON.stringify(resultObj);
return resultJSON;
//var resultElm = document.getElementById('task4Result');
//resultElm.innerText = resultJSON;
}