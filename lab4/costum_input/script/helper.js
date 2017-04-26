
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
	var number = parseFloat(str);
var intPart = Math.floor(number);
	var floatPart = getFloatPart(number);
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

function commafy(numStr) {
    var str = numStr.split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}