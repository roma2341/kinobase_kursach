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
        currencySymbolPlacement: 's',
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
function addCurrencySymbol(str,symbol, positionStr){
    //if (str.length<1 || str==symbol) return "";
    if (str=="") return str;
    var resultStr = "";
    switch(positionStr.toLowerCase()){
        //prefix
        case 'p':
            if(str.charAt(0)!=symbol)
            resultStr = symbol + str; 
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
    switch(positionStr.toLowerCase()){
        //prefix
        case 'p':
            resultStr = str.substring(symbol.length);
        break;
        //sufix;
        case 's':
            resultStr = str.slice(0,-symbol.length);
        break;
    }
    return resultStr;
}
function removeDigitGroups(str,digitGroupSeparator,currencySymbol){
var regexString = digitGroupSeparator + '|' + currencySymbol;
var regex = new RegExp(regexString, "g");
var strWithoutCurrencySymbol = str.replace(regex,'');
return strWithoutCurrencySymbol;
}
function isCorrectNumberString(str,floatPartSeparator){
 var regexString = '^(-{0,1}\\d+\\'+floatPartSeparator+'{0,1}\\d*)$';
var regex = new RegExp(regexString, "g");
return regex.test(str);   
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