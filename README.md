## Roman numerals parser

```js
const RomanNumber = require('roman-numerals');

const num1 = new RomanNumber('XX');
const num2 = new RomanNumber(40);

console.log(num1.toInt(), num2.toString()) // '20, XL'

```