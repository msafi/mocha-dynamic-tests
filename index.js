module.exports = function(arrayOfTests, generateTestDetails, options) {
  arrayOfTests = arrayOfTests || []
  generateTestDetails = generateTestDetails || function() {}
  options = options || {}

  var testsName = 'Dynamic tests'
  var runTests = function() {
    arrayOfTests.forEach(function (test) {
      test = test || {}

      var testDetails = generateTestDetails(test) || {}

      if (test.only === true) {
        it.only.call(null, testDetails.description, testDetails.body)
      } else if (test.skip === true) {
        it.skip.call(null, testDetails.description, testDetails.body)
      } else {
        it.call(null, testDetails.description, testDetails.body)
      }
    })
  }

  if (options.only === true) {
    describe.only(testsName, function() {
      runTests()
    })
  } else if (options.skip === true) {
    describe.skip(testsName, function() {
      runTests()
    })
  } else {
    describe(testsName, function() {
      runTests()
    })
  }
}
