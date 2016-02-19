module.exports = function(arrayOfTests, generateTestDetails) {
  arrayOfTests = arrayOfTests || []
  generateTestDetails = generateTestDetails || function() {}

  arrayOfTests.forEach(function(test) {
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
