# Mocha Dynamic Tests

If you want to test your code against a bunch of slightly different inputs,
writing a bunch of Mocha `it` statements becomes tedious.
Instead, you can use this package to define your tests as an array of
plain JavaScript objects and pass those to Mocha's `it`.

Mocha naturally supports [dynamic tests](https://mochajs.org/#dynamically-generating-tests)
(also known as parameterized tests). However, this package eliminates some of the cruft
involved in writing dynamic tests that also support.

## How to use

Here's an example of how to use it:

```js
var dynamicTests = require('mocha-dynamic-tests')
var myTokenizer = function myTokenizer(value) {
  return value.split('')
}

describe('myTokenizer', function() {
  it('returns an array', function() {
    expect(myTokenizer('123')).to.be.an('array')
  })

  dynamicTests(
    [
      {input: '123', expected: [1,2,3]},
      {input: '432', expected: [4,3,2]},
      {input: '4 8 0', expected: [4, '', 8, '', 0]},
    ],

    // Each test object will be passed to this call back function
    function(test) {
      return {
        description: 'returns ' + JSON.stringify(test.expected) + ' for input ' + test.input
        body: function() {
          expect(myTokenizer(test.input)).to.deep.equal(test.expected)
        }
      }
    }
  )
})
```

### API

`dynamicTests` accepts three arguments:

- array of test objects
- function that returns the test details

#### Test objects array

The array of tests is an array of objects.

#### Test details function

This function must return an object that contains `description` and `body` properties that
will be passed to Mocha's `it` as such `it(test.description, test.body)`.
Therefore, `description` must be a string, and `body` must be a function.

(Test)
