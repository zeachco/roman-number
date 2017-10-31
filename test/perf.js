const RomanNumber = require('../');

function runOnce() {
	for (let i = 1; i < 4000; i++) {
		const n = RomanNumber(i);
		const n1 = RomanNumber(n + '');
		const n2 = RomanNumber(4000 - i);
		const s = '' + n1 + n2;
	}
}
console.time(1);
for (let k=0; k<10; k++) {
	runOnce();
}
console.timeEnd(1);
