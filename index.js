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
const intToRomanMap = {}; // invert romanToIntMap
for (const key in romanToIntMap) {
	intToRomanMap[romanToIntMap[key]] = key;
}

// comment: it's weird that Romans didn't write 990 XM instead of CMXC

class RomanNumber {
	constructor(value) {
		if (typeof value === 'number') {
			this.value = value;
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

		if (isNaN(this.value)) {
			throw new Error('invalid value');
		}
		if (!Number.isInteger(this.value)) {
			throw new Error('invalid float value');
		}
		if (this.value < 1 || this.value > 3999) {
			throw new RangeError('invalid range value');
		}
	}

	toInt() {
		return this.value;
	}

	toString() {
		// 
		throw new Error('toRoman todo');
	}

}

module.exports = RomanNumber;

RomanNumber.tests = function() {

	const inputs = [ // [input, null for error or expected integer] // todo check which error
		[null, null],
		['', null],
		[0, null], 
		[1, 1],
		[3, 3],
		[4, 4],
		[5, 5],
		['I', 1],
		['III', 3],
		['IIII', null],
		['IV', 4],
		['V', 5],
		[1968, 1968],
		['1473', 1473],
		[2999, 2999],
		[3000, 3000],
		[10000, 10000],
		['CDXXIX', 429],
		['CD1X', null],
		['error', null],
		['MCDLXXXII', 1482],
		['MCMLXXX', 1980],
		['MMMMCMXCIX', null],
		['MMMMDMXCIX', null]
	];

	for (const [input, expected] of inputs) {
		try {
			const num = new RomanNumber(input);
			console.assert(num.toInt() === expected);
		} catch(e) {
			console.assert(expected === null);
		}
	}
};

// RomanNumber.tests()