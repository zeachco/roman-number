## Roman numerals parser

```js
const RomanNumber = require('roman-numerals');

const num1 = RomanNumber('XX');
const num2 = RomanNumber(40);

console.log(num1.toInt(), num2.toString()) // 20 'XL'

```