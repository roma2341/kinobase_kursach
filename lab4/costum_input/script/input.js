var COSTUM_ELEMENT_CLASS = "costum_input";
var ELEMENT_MODEL_ID_ATTRIBUTE_NAME = "element_model_id";


var carretPositionBeforeKeyPress = 0;
var availableKeyCodes = [
',',
'.'
];
var config = {
	integerPartMaxSize: 9,
	floatPartMaxSize: 4,
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
this.previousValue = previousValue || "";
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
	var elementModel = getElementModel(element);
}
function keyDownEventHandler(event){
	carretPositionBeforeKeyPress = event.target.selectionStart;
	preventIllegalKeyCode(event);
	correctCarretPositionBeforeKeyPress(event.target);
}

function keyUpEventHandler(event){
	var element = event.target;
	var elementModel = getElementModel(element);
	var char = String.fromCharCode(event.keyCode);
	if (!validateInput(event.target,char)){
		element.value = elementModel.previousValue;
	}
	if (isViewUpdateRequired(event))
	updateView(event.target,elementModel);
	elementModel.previousValue = element.value;

}

function isViewUpdateRequired(event){
if (KeyCode.isArrowKey(event.keyCode)) return false;
return true;
}

function bindInputEvents(element){
	addEvent(element,"keydown",keyDownEventHandler);
	addEvent(element,"keyup",keyUpEventHandler);
	addEvent(element,"keypress",keyPressEventHandler);
}
function correctCarretPositionBeforeKeyPress(element){
var opt = getLanguageOptions();
var textLength = element.value.length;
var carretPos = carretPositionBeforeKeyPress;
var currencySymbolLength = opt.currencySymbol.length;
switch (opt.currencySymbolPlacement.toLowerCase()){
	case 'p':
		carretPos = carretPos < currencySymbolLength ? currencySymbolLength :  carretPos;
		break;
	case 's':
	var lastPosibleCarretPos = textLength - currencySymbolLength - 1;
		carretPos = carretPos > lastPosibleCarretPos ? lastPosibleCarretPos : carretPos;
		break;
}
//carretPos += 1; // count of inputed characters to fix carret
element.selectionStart = carretPos;
element.selectionEnd = carretPos;
}

function correctCarretPositionAfterKeyPress(element,addedSymbolsCount,removedSymbolsCount){
var opt = getLanguageOptions();
var textLength = element.value.length;
var carretPos = carretPositionBeforeKeyPress;
var currencySymbolLength = opt.currencySymbol.length;
switch (opt.currencySymbolPlacement.toLowerCase()){
	case 'p':
		carretPos = carretPos < currencySymbolLength ? currencySymbolLength :  carretPos;
		break;
	case 's':
	var lastPosibleCarretPos = textLength - currencySymbolLength - 1;
		carretPos = carretPos > lastPosibleCarretPos ? lastPosibleCarretPos : carretPos;
		break;
}	
carretPos += addedSymbolsCount; // count of inputed characters to fix carret
element.selectionStart = carretPos;
element.selectionEnd = carretPos;

}

function updateView(element,model){
	var numberDetails = getNumberDetailsFromString(model.previousValue);
	var unformatted = unformatString(element.value);
	var previousUnformatted = unformatString(model.previousValue);
	element.value = formatString(unformatted);
	var addedSymbolsCount =  unformatted.length - previousUnformatted.length;
	var removedSymbolsCount = 0;
	if (addedSymbolsCount < 0) {
		addedSymbolsCount = 0;
		removedSymbolsCount = -1;
	}
	correctCarretPositionAfterKeyPress(element,addedSymbolsCount,removedSymbolsCount);
}
function formatString(str){
	var opt = getLanguageOptions();
	var withSeparatedDigitGroups = separateDigitGroups(str,opt.digitGroupSeparator,opt.decimalCharacter);
	var withCurrencySymbol = addCurrencySymbol(withSeparatedDigitGroups,opt.currencySymbol,opt.currencySymbolPlacement); 
return withCurrencySymbol;
}

function unformatString(str){
		var opt = getLanguageOptions();
	//console.log('unformatting('+str+')=');
	var strWithoutCurrencySymbol = removeCurrencySymbol(str,opt.currencySymbol,opt.currencySymbolPlacement);
	var strWithDecimalSeparator = removeDigitGroups(strWithoutCurrencySymbol,opt.digitGroupSeparator,opt.currencySymbol);
	//console.log(strWithDecimalSeparator+'<<unformatted');
	return strWithDecimalSeparator;
}


function preventIllegalKeyCode(event){
if (event.shiftKey || !KeyCode.isKeyCodePermitted(event.keyCode))//contains not number
	event.preventDefault();
}

function validateInput(element,char){
	if (element.value=="")return true;
var numberDetails = getNumberDetailsFromString(unformatString(element.value));
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


