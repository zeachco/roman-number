# Roman numbers parser
[![npm version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![coverage status][codecov-image]][codecov-url]

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

[npm-image]: https://img.shields.io/npm/v/roman-number.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/roman-number
[travis-image]: https://img.shields.io/travis/caub/roman-number.svg?style=flat-square
[travis-url]: https://travis-ci.org/caub/roman-number
[codecov-image]: https://img.shields.io/codecov/c/github/caub/roman-number.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/caub/roman-number