const RomanNumber = require('../');
const {assert} = console;

const inputs = [ // [input, null for error or expected integer, expected roman number (default as input if undefined)] // todo check which error
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

describe('RomanNumber', () => {

	it('should stringify 152 as CLII', () => {
		assert(RomanNumber(152) + '' === 'CLII');
	});
	
	inputs.forEach(([input, expectedArabic, expectedRoman = input]) => {
	
		let num = null;
		try {
			num = new RomanNumber(input);	
		} catch(e) {
			it(`should error for ${input} reason: ${e.message}`, () => {
				assert(expectedArabic === null);
			});
			return;
		}
		it(`should convert ${input} as arabic:${expectedArabic}, roman:${expectedRoman}`, () => {
			assert(num.toInt() === expectedArabic);
			assert(num.toString() === expectedRoman);
		});
	});
});
