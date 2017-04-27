"use strict";
var COSTUM_ELEMENT_CLASS = "costum_input";
var ELEMENT_MODEL_ID_ATTRIBUTE_NAME = "element_model_id";

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
this.previousCarretIndex = 0;
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
	var element = event.target;
	var elementModel = getElementModel(element);
	preventIllegalKeyCode(event);
	if (isViewUpdateRequired(event))
	correctCarretPositionBeforeKeyPress(element);
}

function keyUpEventHandler(event){
	var element = event.target;
	var elementModel = getElementModel(element);
	var carretIndexWithoutFormat = getCarretPosExcludingFormatChars(element);
		var char = String.fromCharCode(event.keyCode);
	if (!validateInput(event.target)){
		element.value = elementModel.previousValue;
	}
	if (isViewUpdateRequired(event))
	updateView(event.target,elementModel);
	elementModel.previousValue = element.value;
	elementModel.previousCarretIndex = carretIndexWithoutFormat;
	
}

function onClickEventHandler(event){
var element = event.target;
var elementModel = getElementModel(element);
var carretIndexWithoutFormat = getCarretPosExcludingFormatChars(element);
elementModel.previousCarretIndex = carretIndexWithoutFormat;
}

function isViewUpdateRequired(event){
if (KeyCode.isArrowKey(event.keyCode)) return false;
return true;
}

function bindInputEvents(element){
	addEvent(element,"keydown",keyDownEventHandler);
	addEvent(element,"keyup",keyUpEventHandler);
	addEvent(element,"keypress",keyPressEventHandler);
	addEvent(element,"click",onClickEventHandler);
}
function correctCarretPositionBeforeKeyPress(element){
var elementModel = getElementModel(element);
var opt = getLanguageOptions();
var textLength = element.value.length;
var carretPos = getActualCarretPosByExcludingFormatChars(elementModel.previousCarretIndex,element.value);;
var currencySymbolLength = opt.currencySymbol.length;
switch (opt.currencySymbolPlacement.toLowerCase()){
	case 'p':
		carretPos = carretPos < currencySymbolLength ? currencySymbolLength :  carretPos;
		break;
	case 's':
	var lastPosibleCarretPos = textLength - currencySymbolLength;
		carretPos = carretPos > lastPosibleCarretPos ? lastPosibleCarretPos : carretPos;
		break;
}
//carretPos += 1; // count of inputed characters to fix carret
console.log('correctCarretPositionBeforeKeyPress:'+element.selectionStart+' to '+carretPos);
element.selectionStart = carretPos;
element.selectionEnd = carretPos;
}

function getCarretPosExcludingFormatChars(element){
var opt = getLanguageOptions();
var str = element.value;
var resultIndex = 0;
var carretPos = element.selectionStart;
for (var i = 0; i < carretPos; i++){
	if (CharaterGroups.isDigit(str.charAt(i)) || str.charAt(i)==opt.decimalCharacter){
		resultIndex++;
		}
	}
	console.log('ignore format:'+resultIndex);
return resultIndex;
}

function getActualCarretPosByExcludingFormatChars(indexExcludingFmt,formattedString){
var realIndex = 0;
var opt = getLanguageOptions();
var currentDigitOrDigitSeparatorIndex = 0;
for (; realIndex < formattedString.length && currentDigitOrDigitSeparatorIndex < indexExcludingFmt; realIndex++){
if (CharaterGroups.isDigit(formattedString[realIndex]) || formattedString[realIndex]==opt.decimalCharacter)
	currentDigitOrDigitSeparatorIndex++;
}
console.log('real:'+realIndex);
return realIndex;
}


function processCarretPositionShiftForDigitsGroups_DEPRECATED(carretPos, formattedString){
	var opt = getLanguageOptions();
	var strBeforeCarret = formattedString.substring(0,carretPos);
	var digitSeparators = occurences(strBeforeCarret,opt.digitGroupSeparator);
	var result = digitSeparators==null ? 0 : digitSeparators.length;
	console.log('proc carret pos.: carPos='+carretPos +' new:'+result);
return result;
}

function correctCarretPositionAfterKeyPress(element,addedSymbolsCount,removedSymbolsCount){
var opt = getLanguageOptions();
var elementModel = getElementModel(element);
var textLength = element.value.length;
var carretPos = getActualCarretPosByExcludingFormatChars(elementModel.previousCarretIndex,element.value);
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
//var carretFix = processCarretPositionShiftForDigitsGroups(carretPos,element.value);
//carretPos += carretFix;
//console.log(StringUtils.format('carretPos += addedSymbolsCount({0}) carretFix({1})',addedSymbolsCount,carretFix));
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
	if(str == "") return "";
	var opt = getLanguageOptions();
	var withSeparatedDigitGroups = separateDigitGroups(str,opt.digitGroupSeparator,opt.decimalCharacter);
	var withCurrencySymbol = addCurrencySymbol(withSeparatedDigitGroups,opt.currencySymbol,opt.currencySymbolPlacement); 
return withCurrencySymbol;
}

function unformatString(str){
		var opt = getLanguageOptions();
	var strWithoutCurrencySymbol = removeCurrencySymbol(str,opt.currencySymbol,opt.currencySymbolPlacement);
	var strWithDecimalSeparator = removeDigitGroups(strWithoutCurrencySymbol,opt.digitGroupSeparator,opt.currencySymbol);
	return strWithDecimalSeparator;
}


function preventIllegalKeyCode(event){
if (event.shiftKey || !KeyCode.isKeyCodePermitted(event.keyCode))//contains not number
	event.preventDefault();
}

function validateInput(element){
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


