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
function processTask4(num){
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
var resultElm = document.getElementById('task4Result');
resultElm.innerText = resultJSON;
}