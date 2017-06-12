
 var StringUtils = {
format: function() {
      var s = arguments[0];
      for (var i = 0; i < arguments.length - 1; i++) {       
          var reg = new RegExp("\\{" + i + "\\}", "gm");             
          s = s.replace(reg, arguments[i + 1]);
      }
      return s;
  }
}
var CharaterGroups = {
    digits: ['0','1','2','3','4','5','6','7','8','9'],
    isDigit: function(char){
        return this.digits.indexOf(char)!=-1;
    }

}
var defaultClassName = "costum_input";

var KeyCode = {
    separators: {
        comma: 188,
        dot: 190,   
    },
    functional: {
        leftArrow: 37,
        upArrow: 38,
        rightArrow: 39,
        downArrow: 40,
        backspace: 8,
        ctrl: 17,
        shift: 16,
        delete: 46
    },
    minus: 45,
    isDigit: function(keyCode){
        return (keyCode >= 48 && keyCode <= 57);
    },
    isSeparator: function(keyCode){
     return [188,190].indexOf(keyCode) !=- 1;
    },
    isArrowKey: function(keyCode){
        return [37,38,39,40].indexOf(keyCode) != -1;
    },
    isFunctional: function(keyCode){
        return this.isArrowKey(keyCode) || [8,17,16,46].indexOf(keyCode)!=-1;
    },
    isKeyCodePermitted: function(char){
    if(this.isDigit(char) || this.isSeparator(char) || this.isFunctional(char))
        return true;
    else
        return false;
    }

}
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function occurences(str, substr){
    var criteria = new RegExp(escapeRegExp(substr),'g')
  return str.match(criteria);
}

function addEvent(element, eventName, callback) {
    if (element.addEventListener) {
        element.addEventListener(eventName, callback, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, callback);
    } else {
        element["on" + eventName] = callback;
    }
}

function getFloatPart(number){
    return number - Math.floor(number);
}

function getNumberDetailsFromString(str){
    var tokens = str.split('.');
    var number = parseFloat(tokens[0]) || 0;
var intPart = parseInt(tokens[0]);
    var floatPart = parseInt(tokens[1]) || 0;
return{
    number: number,
    intPart: intPart,
    floatPart: floatPart
}
}



var defaultLeadingZero = false;
const languageOption = {
    French: { // Français
        digitGroupSeparator        : '.', // or '\u202f'
        decimalCharacter           : ',',
        decimalCharacterAlternative: '.',
        currencySymbol             : '\u202f€',
        currencySymbolPlacement    : 's',
        leadingZero                : defaultLeadingZero
    },
    NorthAmerican: {
        digitGroupSeparator    : ',',
        decimalCharacter       : '.',
        currencySymbol         : '$',
        currencySymbolPlacement: 'p',
        leadingZero            : defaultLeadingZero
    },
    British: {
        digitGroupSeparator    : ',',
        decimalCharacter       : '.',
        currencySymbol         : '£',
        currencySymbolPlacement: 'p',
        leadingZero            : defaultLeadingZero
    },
    Swiss: { // Suisse
        digitGroupSeparator    : `'`,
        decimalCharacter       : '.',
        currencySymbol         : '\u202fCHF',
        currencySymbolPlacement: 's',
        leadingZero            : defaultLeadingZero
    },
    Japanese: { // 日本語
        digitGroupSeparator    : ',',
        decimalCharacter       : '.',
        currencySymbol         : '¥',
        currencySymbolPlacement: 'p',
        leadingZero            : defaultLeadingZero
    },
};

function separateDigitGroups(numStr,digitGroupSeparator,decimalCharacter) {
    var str = numStr.split(decimalCharacter);
    if (str[0].length >= 4) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1'+digitGroupSeparator);
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join(decimalCharacter);
}

function insertStrAt(index, source, dest){ 
  return dest.substr(0, index) + source + dest.substr(index);
}

function addCurrencySymbol(str,symbol, positionStr){
    //if (str.length<1 || str==symbol) return "";
    if (str=="") return str;
    var resultStr = "";
    var isMinusSign = str.charAt(0)=='-';
    var insertionPos = isMinusSign ? 1 : 0;
    switch(positionStr.toLowerCase()){
        //prefix
        case 'p':
            if(str.charAt(0)!=symbol)
            resultStr = insertStrAt(insertionPos,symbol,str);
        break;
        //sufix;
        case 's':
            var lastChar = str.slice(-1);
            if(lastChar!=symbol)
            resultStr = str + symbol; 
        break;
    }
    return resultStr;
}
function removeCurrencySymbol(str,symbol,positionStr){
     if (str.length<=symbol.length) return str;
     var resultStr;
     var isMinusSign = str.charAt(0)=='-';
     var symbolsCountPrefix = symbol.length;
     if (isMinusSign) symbolsCountPrefix++;
     var symbolCountSuffix = symbol.length;
    switch(positionStr.toLowerCase()){
        //prefix
        case 'p':
            resultStr = str.substring(symbolsCountPrefix);
        break;
        //sufix;
        case 's':
            resultStr = str.slice(0,-symbolCountSuffix);
        break;
    }
    if(isMinusSign){
        resultStr = '-' + resultStr;
    }
    console.log('removeCurrencySymbol ('+str+')->'+'('+resultStr+')');
    return resultStr;
}
function removeDigitGroups(str,digitGroupSeparator,currencySymbol){
var regexString = digitGroupSeparator + '|' + currencySymbol;
var regex = new RegExp(regexString, "g");
var strWithoutCurrencySymbol = str.replace(regex,'');
return strWithoutCurrencySymbol;
}
function isCorrectNumberString(str,floatPartSeparator){
 var regexString = '^(\\-{0,1}\\d+\\'+floatPartSeparator+'{0,1}\\d*)$';
var regex = new RegExp(regexString, "g");
var isCorrect = regex.test(str);
console.log('isCorrectNumber: '+str + ' bool:' + isCorrect);
return isCorrect;   
}

function addClass(elements, myClass) {

  // if there are no elements, we're done
  if (!elements) { return; }

  // if we have a selector, get the chosen elements
  if (typeof(elements) === 'string') {
    elements = document.querySelectorAll(elements);
  }

  // if we have a single DOM element, make it an array to simplify behavior
  else if (elements.tagName) { elements=[elements]; }

  // add class to all chosen elements
  for (var i=0; i<elements.length; i++) {

    // if class is not already found
    if ( (' '+elements[i].className+' ').indexOf(' '+myClass+' ') < 0 ) {

      // add class
      elements[i].className += ' ' + myClass;
    }
  }
}

function checkKeyCodeIsBackSpace(keyCode){
    return keyCode == 8;
}

"use strict";
var COSTUM_ELEMENT_CLASS = "costum_input";
var ELEMENT_MODEL_ID_ATTRIBUTE_NAME = "element_model_id";
var COSTUM_INPUT_CSS_PREFIX = "_costum_input";

var availableKeyCodes = [
',',
'.'
];

var currentConfig = new DefaultConfig();

function DefaultConfig(){
    this.integerPartMaxSize = 9;
    this.floatPartMaxSize = 4;
    this.placeholder = "Тикніть сюди";
    this.style = {
        width:600,
        font:{
            size: 20,
            color: "red",
            family: "Impact,Charcoal,sans-serif"
        },
        fillColor: "pink",
        border:{
            color: "red",
            size: 1
        },
        align: "right",
        emphasises: ["bold","italic","underline"]
    };
    this.number = {
        format: "NorthAmerican",// приклад eu 111.111.111,222; приклад us - 111,111,111.222
    };

}

window.getCurrentConfig = function getCurrentConfig(){
    return currentConfig;
}
window.updateCurrentConfig = function updateCurrentConfig(newConf){
    currentConfig = newConf;
}

function ElementModel(element,previousValue){
this.element = element;
this.previousValue = previousValue || "";
this.previousCarretIndex = 0;
}

var elementsModels = [];

function getLanguageOptions(){
    return languageOption[getCurrentConfig().number.format];
}

function initCssPropertiesOfInput(element,conf){
element.style.fontFamily = conf.style.font.family;
element.style.fontSize = conf.style.font.size+"px";
element.style.color = conf.style.font.color;
element.style.backgroundColor = conf.style.fillColor;
element.style.borderColor = conf.style.border.color;
element.style.borderWidth = conf.style.border.size+"px";
element.style.textAlign = conf.style.align;
element.style.width = conf.style.width+"px";

element.className = defaultClassName;

for (var i = 0; i < conf.style.emphasises.length; i++){
var emphasis = conf.style.emphasises[i];
addClass(element,emphasis + COSTUM_INPUT_CSS_PREFIX);
}

}
window.initCostumInputs = function initCostumInputs() {

var elements = document.getElementsByClassName(COSTUM_ELEMENT_CLASS);
    
    for (var i = 0; i < elements.length; i++){
        elements[i].setAttribute(ELEMENT_MODEL_ID_ATTRIBUTE_NAME,i);
        elements[i].onpaste = function(e) {
            e.preventDefault();
        }
        elements[i].placeholder = getCurrentConfig().placeholder;
        initCssPropertiesOfInput(elements[i],getCurrentConfig());
        elementsModels.push(new ElementModel(elements[i]));
        bindInputEvents(elements[i]);
    }

}

function applyPressedKeyFunctionIfExcist(event){
    var element = event.target;
        if (event.keyCode == KeyCode.minus){
            var elementValue = element.value;
            var withToggledSign = toggleSign(elementValue);
            element.value = withToggledSign;
            event.preventDefault();
        }
}

function keyPressEventHandler(event){
    var element = event.target;
    applyPressedKeyFunctionIfExcist(event);
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
function toggleSign(numberString){
    if (numberString==null || numberString.length<1)return "";
    var result;
   if(numberString.charAt(0)=='-'){
                result = numberString.slice(1,numberString.length);
            }
            else{
                result = '-'+numberString;
            }
            return result;
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
return realIndex;
}


function processCarretPositionShiftForDigitsGroups_DEPRECATED(carretPos, formattedString){
    var opt = getLanguageOptions();
    var strBeforeCarret = formattedString.substring(0,carretPos);
    var digitSeparators = occurences(strBeforeCarret,opt.digitGroupSeparator);
    var result = digitSeparators==null ? 0 : digitSeparators.length;
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
if (event.shiftKey || !KeyCode.isKeyCodePermitted(event.keyCode) || isKeyCodeOfDigitGroupSeparator(event.keyCode) || event.keyCode == KeyCode.minus)//contains not number
    event.preventDefault();
}
function getInputValueAfterKeyPress(element,event){
    if (event.keyCode == KeyCode.minus){
        var toggledSign =  toggleSign(element.value);
        console.log('toggled sign:'+toggledSign);
        return toggledSign;
    }
var char = String.fromCharCode(event.keyCode);
var carretPosition = element.selectionStart;
var inputValueAfterKeyPress = element.value;
    inputValueAfterKeyPress = inputValueAfterKeyPress.slice(0,carretPosition) + char + inputValueAfterKeyPress.slice(carretPosition);
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
if (numberDetails.intPart.toString().length > getCurrentConfig().integerPartMaxSize ) {
return false;
}
if (numberDetails.floatPart.toString().length > getCurrentConfig().floatPartMaxSize ) {
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
