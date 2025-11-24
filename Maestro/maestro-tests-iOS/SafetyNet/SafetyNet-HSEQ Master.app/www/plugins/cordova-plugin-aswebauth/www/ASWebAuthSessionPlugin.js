cordova.define(
  "cordova-plugin-aswebauth.ASWebAuthSessionPlugin",
  function (require, exports, module) {
    var exec = require("cordova/exec");
    module.exports = {
      start: function (
        authUrl,
        callbackScheme,
        successCallback,
        errorCallback
      ) {
        exec(
          successCallback,
          errorCallback,
          "ASWebAuthSessionPlugin",
          "start",
          [authUrl, callbackScheme]
        );
      },
      isAvailable: function (successCallback) {
        var errorHandler = function errorHandler(error) {
          // An error has occurred while trying to access the
          // SafariViewController native implementation, most likely because
          // we are on an unsupported platform.
          successCallback(false);
        };

        exec(
          successCallback,
          errorHandler,
          "ASWebAuthSessionPlugin",
          "isAvailable",
          []
        );
      },
      cancel: function (successCallback, errorCallback) {
        exec(
          successCallback,
          errorCallback,
          "ASWebAuthSessionPlugin",
          "cancel",
          []
        );
      },
    };
  }
);
