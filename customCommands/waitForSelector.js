/**
 * Wait for a selector (CSS) that launches a pseudo-debugger.
 *
 * This builds on top of `waitForElementPresent()` that comes with Nightwatch
 * and works as a drop in replacement. The major difference is that if the
 * selector does not appear in the specified time it will act like a breakpoint
 * where the state is paused and a Continue button appears to proceed manually.
 *
 * @param selector The CSS entity to wait for - e.g. '#something'
 * @param [timeout] The maximum time we should wait. If this isn't provided 10
 *     seconds will be used.
 */
exports.command = function (selector, timeout) {
  var _this = this;

  // 10 seconds should be a reasonable amount of time if a specific wait time is
  // not provided.
  timeout = timeout || 10000;

  // Start waiting for the element.
  _this.waitForElementPresent(selector, timeout, false, function () {
    _this.elements('css selector', selector, function (result) {

      // We arrive here in all scenarios (timeout and success) so we need to
      // check again if the selector exists; if it does we can jump out here so
      // the test can continue as normal.
      if (result.value.length) {
        return;
      }

      // The error message from Nightwatch will print to the console saying it
      // couldn't find the element in the given amount of time but we add an
      // extra very visible magenta message so that they don't think it has just
      // stalled for no reason.
      printDebugMessage('Execution is stopped for debugging.');

      // Add a big ugly button to the top left that will allow the tester to
      // continue after they have done the nessesary debugging and hopefully
      // solved the issue. Or maybe they just want to continue anyway.
      _this.execute(function () {
        // We will abuse a global here becuase the browser cannot send
        // information back to Nightwatch. So we have to poll for this variable
        // until it changes.
        window.canContinue = false;

        // Draw the ugly button.
        var newDiv = document.createElement('div');
        newDiv.innerHTML = "continue";
        newDiv.id = 'debugContinue';
        newDiv.style = 'width: 100px; height: 100px; position: absolute; top: 0; left: 0; z-index: 10000; background-color: magenta; color: white';
        document.querySelector('body').appendChild(newDiv);
        var debugBtn = document.getElementById('debugContinue');

        // Clicking the button will allow the test to keep running.
        debugBtn.addEventListener('click', function () { window.canContinue = true; }, false)
      });

      // Keep waiting until the user eventually clicks Continue.
      waitForContinue();

      function waitForContinue() {
        // This is where we have to poll the browser to see if canContinue has
        // changed.
        _this.execute(function () {
          return window.canContinue;
        }, [], function (result) {

          if (!result.value) {
            // Try this again in 250ms - they are not ready yet.
            _this.pause(250, waitForContinue);
          }
        });
      }

      function printDebugMessage(message) {
        console.log('\x1b[35m' + message + '\x1b[0m');
      }
    });
  });

  return this;
};