## Roman numbers parser [![Build Status](https://travis-ci.org/caub/roman-number.svg?branch=master)](https://travis-ci.org/caub/roman-number)

```js
const RomanNumber = require('roman-number'); // npm i -S caub/roman-number

const num1 = RomanNumber('XX');
const num2 = RomanNumber(40);

console.log(num1.toInt(), num2.toString()) // 20 'XL'
```

### compatibility

- node.js >= 6
- browser (Chrome, Firefox, Edge, IE11, Safari, ..)

(requires `String.prototype.repeat`, that can be shimmed)