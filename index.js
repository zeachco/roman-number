const romanToIntMap = {
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
const romanSymbols = Object.keys(romanToIntMap);

// comment: it's weird that Romans didn't write 990 XM instead of CMXC

class RomanNumber {
	constructor(value) {
		if (typeof value === 'number') {
			this.value = value;
			RomanNumber.checkValidity(this.value);
			return;
		}
		if (!value || typeof value !== 'string') {
			throw new TypeError('String or Integer value required');
		}

		this.value = 0; // intialize
		const romanSymbolsRe = /^IV|IX|XL|XC|CD|CM|([IVXLCDM])\1*/g;
		let m, prev = Infinity;
		while (m = romanSymbolsRe.exec(value)) {
			if (m[0].length > 3) {
				throw new Error('invalid roman value');
			}
			const v = m[1] ? romanToIntMap[m[1]] * m[0].length : romanToIntMap[m[0]];

			// ensure the value is less than the previous one
			if (v >= prev) {
				throw new Error('invalid roman value');
			}
			prev = v;
			this.value += v;
		}
		
		if (this.value === 0) { // try to parse as base10 Arabic number
			this.value = Number(value);
		}
		RomanNumber.checkValidity(this.value);
	}

	static checkValidity(n) {
		if (isNaN(n)) {
			throw new Error('invalid value');
		}
		if (!Number.isInteger(n)) {
			throw new Error('invalid float value');
		}
		if (n < 1 || n > 3999) {
			throw new RangeError('invalid range value');
		}
	}

	toInt() {
		return this.value;
	}

	toString() {
		let s = ''; // value to return
		let v = this.value;
		let n = Math.floor(Math.log10(v)); // number of digits-1, 3900 -> 3; 285 -> 2
		let a = Math.floor(v / 10**n); // the factor for the nth digit

		while (n >= 0) {
			if (a < 4) {
				s += romanSymbols[4 * n].repeat(a);
			} else if (a === 4) {
				s += romanSymbols[4 * n + 1];
			} else if (a === 5) {
				s += romanSymbols[4 * n + 2];
			} else if (a < 9) {
				s += romanSymbols[4 * n + 2] + romanSymbols[4 * n].repeat(a - 5);
			} else {
				s += romanSymbols[4 * n + 3];
			}
			v -= a * 10**n;
			n--;
			a = Math.floor(v / 10**n);
		}
		return s; // we could cache it, for perf
	}
}


module.exports = RomanNumber;

RomanNumber.tests = function() {

	console.assert(new RomanNumber(152)+'', 'CLII');

	const inputs = [ // [input, null for error or expected integer] // todo check which error
		[null, null],
		['', null],
		[0, null], 
		[1, 1, 'I'],
		[3, 3, 'III'],
		[4, 4, 'IV'],
		[5, 5, 'V'],
		['I', 1],
		['III', 3],
		['IIII', null],
		['IV', 4],
		['V', 5],
		[1968, 1968, 'MCMLXVIII'],
		['1473', 1473, 'MCDLXXIII'],
		[2999, 2999, 'MMCMXCIX'],
		[3000, 3000, 'MMM'],
		[10000, null],
		['CDXXIX', 429],
		['CD1X', null],
		['error', null],
		['MCDLXXXII', 1482],
		['MCMLXXX', 1980],
		['MMMMCMXCIX', null],
		['MMMMDMXCIX', null]
	];

	inputs.forEach(([input, expectedArabic, expectedRoman = input]) => {
		try {
			const num = new RomanNumber(input);
			console.assert(num.toInt() === expectedArabic);
			console.assert(num.toString() === expectedRoman);
		} catch(e) {
			console.assert(expectedArabic === null);
		}
	});

	console.log('tests passed');
};



RomanNumber.tests()