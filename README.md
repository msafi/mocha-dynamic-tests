# Mocha Dynamic Tests

If you want to test your code against a bunch of slightly different inputs, writing a bunch of Mocha `it` statements becomes tedious. Instead, you can use this package to define your tests as an array of plain JavaScript objects and pass those to Mocha's `it`. These are called dynamic tests.

Mocha naturally supports [dynamic tests](https://mochajs.org/#dynamically-generating-tests)
(also known as parameterized tests). However, this package eliminates some of the cruft
involved in writing dynamic tests that also support `it.skip` and `it.only`.

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
      {input: null, expected: null, skip: true}, // will implement later
      {input: 123, expected: [1,2,3], only: true} // only run this one while I work on it
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

* array of test objects
* function that returns the test details
* object of options

#### Test objects array

The array of tests is an array of objects. The only special property names of the object
are `skip` and `only`. Those will be used to decide whether to execute Mocha's
`it.only`, `it.skip`, or just `it`. Other property names are yours.

#### Test details function

This function must return an object that contains `description` and `body` properties that
will be passed to Mocha's `it` as such `it(test.description, test.body)`.
Therefore, `description` must be a string, and `body` must be a function.

#### Options object

Using the options object, you can skip all dynamic tests or only run dynamic tests. Pass
the `options` object such as `{skip: true}` or `{only: true}`. For example, the following
will cause for only the dynamic tests to run. All other tests in your test suite will be ignored:

```js
dynamicTests(
  [
    /* A bunch test parameters... */
  ],

  function(test) {
    return {
      /* test description and body... */
    }
  },

  {only: true} // or {skip: true}
)
```
