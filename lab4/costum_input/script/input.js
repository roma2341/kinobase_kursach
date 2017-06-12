"use strict";
var COSTUM_ELEMENT_CLASS = "costum_input";
var ELEMENT_MODEL_ID_ATTRIBUTE_NAME = "element_model_id";
var COSTUM_INPUT_CSS_PREFIX = "_costum_input";

var availableKeyCodes = [
',',
'.'
];
var defaultConfig = {
	integerPartMaxSize: 9,
	floatPartMaxSize: 4,
	placeholder: "Тикніть сюди",
	style: {
		font:{
			size: 20,
			color: "red",
			family: "Impact,Charcoal,sans-serif"
		},
		fillColor: "pink",
		border:{
			color: "red",
			size: 1,
		},
		align: "right",
		emphasises: ["bold","italic","underline"]
	},
	number:{
		format: "NorthAmerican",// приклад eu 111.111.111,222; приклад us - 111,111,111.222
	}

};

function getDefaultConfig(){
	return defaultConfig;
}

function ElementModel(element,previousValue){
this.element = element;
this.previousValue = previousValue || "";
this.previousCarretIndex = 0;
}

var elementsModels = [];

function getLanguageOptions(){
	return languageOption[getDefaultConfig().number.format];
}
function initCssPropertiesOfInput(element,conf){
element.style.fontFamily = conf.style.font.family;
element.style.fontSize = conf.style.font.size;
element.style.color = conf.style.font.color;
element.style.backgroundColor = conf.style.fillColor;
element.style.borderColor = conf.style.border.color;
element.style.borderWidth = conf.style.border.size;
element.style.textAlign = conf.style.align;
for (var i = 0; i < conf.style.emphasises.length; i++){
var emphasis = conf.style.emphasises[i];
addClass(element,emphasis + COSTUM_INPUT_CSS_PREFIX);
}

}

function initCostumInputs() {

var elements = document.getElementsByClassName(COSTUM_ELEMENT_CLASS);
	
	for (var i = 0; i < elements.length; i++){
		elements[i].setAttribute(ELEMENT_MODEL_ID_ATTRIBUTE_NAME,i);
		elements[i].placeholder = defaultConfig.placeholder;
		initCssPropertiesOfInput(elements[i],getDefaultConfig());
		elementsModels.push(new ElementModel(elements[i]));
		bindInputEvents(elements[i]);
	}

}

function keyPressEventHandler(event){
	var element = event.target;
	var elementModel = getElementModel(element);
		preventIllegalKeyCode(event);
		if (isViewUpdateRequired(event)){
	correctCarretPositionBeforeKeyPress(element);
	if (!validateInputBeforeKeyPress(event) && !checkKeyCodeIsBackSpace(event.keyCode)){
		//element.value = elementModel.previousValue;
		event.preventDefault();
	}
}
}

function keyDownEventHandler(event){
	var element = event.target;
	var elementModel = getElementModel(element);

}

function keyUpEventHandler(event){
	var element = event.target;
	var elementModel = getElementModel(element);
	var carretIndexWithoutFormat = getCarretPosExcludingFormatChars(element);
		var char = String.fromCharCode(event.keyCode);
	/*if (!validateInputBeforeKeyPress(event)){
		element.value = elementModel.previousValue;
	}*/
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
function isKeyCodeOfDigitGroupSeparator(keyCode){
return getLanguageOptions().digitGroupSeparator == String.fromCharCode(keyCode);
}


function preventIllegalKeyCode(event){
if (event.shiftKey || !KeyCode.isKeyCodePermitted(event.keyCode) || isKeyCodeOfDigitGroupSeparator(event.keyCode) )//contains not number
	event.preventDefault();
}
function getInputValueAfterKeyPress(element,event){
var char = String.fromCharCode(event.keyCode);
var isBackSpace = checkKeyCodeIsBackSpace(event.keyCode);
var carretPosition = element.selectionStart;
var inputValueAfterKeyPress = element.value;
if (isBackSpace){
inputValueAfterKeyPress.slice(carretPosition-1,carretPosition);
}
else {
	inputValueAfterKeyPress = inputValueAfterKeyPress.slice(0,carretPosition) + char + inputValueAfterKeyPress.slice(carretPosition);
}
console.log('inputValueAfterKeyPress:'+inputValueAfterKeyPress);

return inputValueAfterKeyPress;
}

function validateInputBeforeKeyPress(event){
var inputValueAfterKeyPress = getInputValueAfterKeyPress(event.target,event);
return validateInputValue(inputValueAfterKeyPress);
}
function validateInputValue(inputValue){
		if (inputValue=="")return true;
		var unformattedValue = unformatString(inputValue);
		if (!isCorrectNumberString(unformattedValue,'.')) return false;
var numberDetails = getNumberDetailsFromString(unformattedValue);
if (numberDetails.intPart.toString().length > getDefaultConfig().integerPartMaxSize ) {
return false;
}
if (numberDetails.floatPart.toString().length > getDefaultConfig().floatPartMaxSize ) {
return false;
}
return true;
}

function validateInput(element){
return validateInputValue(element.value);
}

function getElementModel(element){
var elementId = parseInt(element.getAttribute(ELEMENT_MODEL_ID_ATTRIBUTE_NAME));
var elementModel = elementsModels[elementId];
return elementModel;
}

window.onload = function(){
	initCostumInputs();
};


