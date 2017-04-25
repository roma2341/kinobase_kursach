/*
2. Знайти факторіал числа. У користувача запрошується число, і в результаті виводиться факторіал числа 
(якщо ввести, наприклад, 5, то у результаті має бути число 120).
*/
function fact(n){
if (n == 1 || n == 0) return 1;
return fact(n-1) * n;
}
function processTask2(){
var num = parseInt(document.getElementById('task2Input').value);
		var factorialOfNumber = fact(num);
		var resultElm = document.getElementById('task2Result');
		resultElm.innerText = factorialOfNumber;
}