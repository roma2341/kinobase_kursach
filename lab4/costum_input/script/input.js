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
		bindInputEvents(elements[i]);
	}

}

function keyPressEventHandler(event){
	var element = event.target;
	var char = String.fromCharCode(event.keyCode);
	preventIllegalCharacter(event,char);
	var char = String.fromCharCode(event.keyCode);
}
function keyUpEventHandler(event){
	var element = event.target;
	var elementModel = getElementModel(element);
	var char = String.fromCharCode(event.keyCode);
	if (!validateInput(event.target,char)){
		element.value = elementModel.previousValue;
	}
	updateView(event.target,elementModel);
	elementModel.previousValue = unformatString(element.value);
}


function bindInputEvents(element){
	addEvent(element,"keyup",keyUpEventHandler);
	addEvent(element,"keypress",keyPressEventHandler);
}

function updateView(element,model){
	var numberDetails = getNumberDetailsFromString(model.previousValue.toString());
	var unformatted = unformatString(element.value);
	element.value = formatString(unformatted);
}
function formatString(str){
	var opt = getLanguageOptions();
	var withSeparatedDigitGroups = separateDigitGroups(str,opt.digitGroupSeparator,opt.decimalCharacter);
	var withCurrencySymbol = addCurrencySymbol(withSeparatedDigitGroups,opt.currencySymbol,opt.currencySymbolPlacement); 
return withCurrencySymbol;
}

function unformatString(str){
		var opt = getLanguageOptions();
	console.log('unformatting('+str+')=');
	var strWithoutCurrencySymbol = removeCurrencySymbol(str,opt.currencySymbol,opt.currencySymbolPlacement);
	var strWithDecimalSeparator = removeDigitGroups(strWithoutCurrencySymbol,opt.digitGroupSeparator,opt.currencySymbol);
	console.log(strWithDecimalSeparator+'<<unformatted');
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
	console.log('validating input:'+element.value);
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


