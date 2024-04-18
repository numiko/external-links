import '../lib/external-links.js'

/**
 * This file is used to run the package locally for development and testing purposes.
 *
 * File runs on import
 */



/**
 * Used to style checkboxes based on test results
 */
window.addEventListener('DOMContentLoaded', (event) => {
  fetch('test-results.json')
    .then(response => response.json())
    .then(data => {
      const testResult = data.testResults[0];
      const h3Elements = document.querySelectorAll('h3');
      testResult.assertionResults.forEach(assertionResult => {
        h3Elements.forEach(h3Element => {
          if (h3Element.textContent.toLowerCase() === assertionResult.ancestorTitles[2].toLowerCase()) {
            const parentElement = h3Element.parentElement;
            const keyword = assertionResult.title.match(/\b(rel|target|aria|class)\b/)[0];
            const checkbox = parentElement.querySelector(`input[class*="${keyword}"]`);
            if (checkbox) {
              if (assertionResult.status === 'passed') {
                checkbox.setAttribute('checked', true);
                checkbox.classList.add('accent-green-600');
                checkbox.classList.add('pointer-events-none');
              } else {
                checkbox.classList.add('pointer-events-none');
              }
            }
          }
        });
      });
      const failSpan = document.getElementById('fail');
      failSpan.textContent = data.numFailedTests
      if (data.numFailedTests > 0) {
        failSpan.classList.add('text-red-600','font-bold');
      }
    });
});
