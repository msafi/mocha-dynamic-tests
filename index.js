module.exports = function(arrayOfTests, generateTestDefinition) {
  arrayOfTests = arrayOfTests || []
  generateTestDefinition = generateTestDefinition || function() {}

  arrayOfTests.forEach(function (test) {
    test = test || {}

    var testDefinition = generateTestDefinition(test) || {}

    it(testDefinition.description, testDefinition.body)
  })
}
