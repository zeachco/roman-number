const romanSymbols = {
	I:  1,
	IV: 4,
	V:  5,
	IX: 9,
	X:  10,
	XL: 40,
	L:  50,
	XC: 90,
	C:  100,
	CD: 400,
	D:  500,
	CM: 900,
	M:  1000
};

// const romanSymbolsRe = /^[IVXLCDM]/;
const romanGroupRe = /[IVXLCDM]\1?\1?|IV|IX|XL|XC|CD|CM/g; // bit lazy to do that
// const romanGroupRe = /I|I?V|I?X|X?L|X?C|C?D|C?M/; // ignore this one

// comment: it's weird that Romans didn't write 990 XM instead of CMXC

class RomanNumber {
	constructor(value) {
		if (typeof value === 'number') {
			this.value = value;
		}
		if (!value || typeof value !== 'string') {
			throw new TypeError('String or Integer value required');
		}
		
		const matches = value.match(romanGroupRe);
		if (matches) {
			let v = 0;
			// todo add up groups
			this.value = v;
		} else {
			this.value = Number(value); // do we acept NaN or we have to throw? 
		}
	}

	toString() {
		throw new Error('toRoman todo');
	}

}