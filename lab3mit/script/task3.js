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
		sequenceString += '='+num+'\n';
	}
	return {
		sequence: sequenceArray,
		steps: steps,
		top: top
	}

}

function processTask3(num){
var num = parseInt(document.getElementById('task3Input').value);
var result = findHeyes(num);
var resultJSON = JSON.stringify(result);
var resultElm = document.getElementById('task3Result');
resultElm.innerText = resultJSON;



}