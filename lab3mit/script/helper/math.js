function isEven(n){
	if (!Number.isFinite(parseFloat(n))) return undefined;
	return !isOdd(n);
}
function isOdd(n){
	if (!Number.isFinite(parseFloat(n))) return undefined;
	return n & 1;
}