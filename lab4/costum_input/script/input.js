var COSTUM_ELEMENT_CLASS = "costum_input";
var ELEMENT_MODEL_ID_ATTRIBUTE_NAME = "element_model_id";


var generateNumberFormats
var availableSymbols = [
',',
'.'
];
var config = {
	integerPartMaxSize: 5,
	floatPartMaxSize: 2,
	placeholder: "Racoon",
	style: {
		font:{
			size: 12,
			color: "#aabbcc"
		},
		placeholder: "Racoon",
		fillColor: "white",
		border:{
			color: "red",
			size: 1,
		},
		align: "left",
		emphasis: ["bold","italic","underline"]
	},
	number:{
		format: "NorthAmerican",// приклад eu 111.111.111,222; приклад us - 111,111,111.222
	}

};
function ElementModel(element,previousValue){
this.element = element;
this.previousValue = previousValue | "";
}

var elementsModels = [];

function getLanguageOptions(){
	return languageOption[config.number.format];
}

function initCostumInputs() {

var elements = document.getElementsByClassName(COSTUM_ELEMENT_CLASS);
	
	for (var i = 0; i < elements.length; i++){
		elements[i].setAttribute(ELEMENT_MODEL_ID_ATTRIBUTE_NAME,i);
		elementsModels.push(new ElementModel(elements[i]));
		bindKeyPressEvent(elements[i]);
	}
	console.info('cosum input successfully inited');

}
function bindKeyPressEvent(element){
		var elementModel = getElementModel(element);
addEvent(element,"keyup",function(event){
	var char = String.fromCharCode(event.keyCode);
	console.log('key pressed:'+event.keyCode);
	if (!validateInput(event.target,char)){
	element.value = elementModel.previousValue;
	}
	updateView(event.target,elementModel);
	elementModel.previousValue = unformatString(element.value);
	});
addEvent(element,"keypress",function(event){
	var element = event.target;
	var char = String.fromCharCode(event.keyCode);
	preventIllegalCharacter(event,char);
	console.log('previousValue'+elementModel.previousValue);
	var char = String.fromCharCode(event.keyCode);
	
	});

}

function updateView(element,model){
	var numberDetails = getNumberDetailsFromString(model.previousValue);
	var unformatted = unformatString(element.value);
	element.value = formatString(unformatted);
}
function formatString(str){
return commafy(str);
}

function unformatString(str){
var regexString = getLanguageOptions().digitGroupSeparator + '|' + getLanguageOptions().currencySymbol;
var regex = new RegExp(regexString, "g");
var strWithDecimalSeparator = str.replace(regex,'');
return strWithDecimalSeparator;
}

function isCharPermitted(char){
	if(availableSymbols.indexOf(char)!=-1)
	return true;

	if (!isNaN(char)) return true;

	return false;
}
function preventIllegalCharacter(event,char){
if (!isCharPermitted(char))//contains not number
	event.preventDefault();
}

function validateInput(element,char){
	if (element.value=="")return true;
var numberDetails = getNumberDetailsFromString(element.value);
if (numberDetails.intPart.toString().length > config.integerPartMaxSize ) {
return false;
}
if (numberDetails.floatPart.toString().length > config.floatPartMaxSize ) {
return false;
}
return true;
}

function getElementModel(element){
var elementId = parseInt(element.getAttribute(ELEMENT_MODEL_ID_ATTRIBUTE_NAME));
var elementModel = elementsModels[elementId];
return elementModel;
}

window.onload = function(){
	initCostumInputs();
};


