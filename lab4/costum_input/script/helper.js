
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
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1'+digitGroupSeparator);
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join(decimalCharacter);
}
function addCurrencySymbol(str,symbol, positionStr){
    var resultStr;
    switch(positionStr.toLowerCase()){
        //prefix
        case 'p':
            resultStr = symbol + str; 
        break;
        //sufix;
        case 's':
            resultStr = str + symbol; 
        break;
    }
    return resultStr;
}
function removeCurrencySymbol(str,symbol,positionStr){
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