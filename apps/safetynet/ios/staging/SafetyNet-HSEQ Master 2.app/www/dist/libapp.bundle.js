/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./scripts/LocalStorageHelper.js":
/*!***************************************!*\
  !*** ./scripts/LocalStorageHelper.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


///<reference path="../scripts/LocalStorageModule.js"
var app = angular.module('LocalStorageUtils', ['WebModule', 'LocalStorage', 'commonUtils']);
app.factory("$exceptionHandler",  ['$injector', function($injector) {
    return function (exception, cause) {
        var localStorageUtility = $injector.get('LocalStorageUtility')
        localStorageUtility.addExceptionToLogTable(exception,cause);
        var rScope = $injector.get('$rootScope');
        rScope.$broadcast('exceptionRefresh', exception, cause);
    };
   }]);
app.factory('LocalStorageHelper', ['$q', '$rootScope', 'QuestionnaireUtility',
    'LocalStorageUtility', '$timeout', '$injector', 'DeviceUtil', 'PopupUtil',
    function ($q, $rootScope, QuestionnaireUtility,
        LocalStorageUtility, $timeout, $injector, DeviceUtil, PopupUtil) {
        var localStorageScope = {
            documentLibraryDownloadInProgressList: {},
            documentLibraryDownloadCompletedList: [],
            documentLibraryDownloadErrorList: [],
            fileSystemPromise: null,
            IsInititalized: function IsInititalized() {
                return LocalStorageUtility.DbLoaded;
            },
            init: function init() {
                if (localStorageScope.initDbPromise === null) {
                    localStorageScope.initDbPromise = $q.defer();
                }
            },
            initDb: function initDb() {
                // Added a promise till the DB is initilized
                localStorageScope.fileSystemPromise = LocalStorageUtility.initialize();
                return localStorageScope.fileSystemPromise;
            },
            validateUserCredentials: function validateUserCredentials(userName, userPassword) {
                return $q(function (resolve, reject) {
                    var validateCredentialsPromise = QuestionnaireUtility.validateUser(userName, userPassword);
                    validateCredentialsPromise.promise.then(function (successPayloadResponse) {
                        var tokenSharedProm = DeviceUtil.setKeyValueWithSharedPreferences("token", successPayloadResponse.headers('HSEQToken'));
                        tokenSharedProm.then(function () {
                            // window.localStorage.setItem("token", successPayloadResponse.headers('HSEQToken'));
                            LocalStorageUtility.addUserNameToken(successPayloadResponse.headers('HSEQToken'), userName);
                            resolve(successPayloadResponse);
                        });
                    }, function (errorPayloadResponse) {
                        reject(errorPayloadResponse);
                    });
                });
            },
            getData: function getData() {
                return LocalStorageUtility;
            },
            getErrorData : function getErrorData() {
                return LocalStorageUtility.getErrorData();
            },
            clearErrorLog : function clearErrorLog() {
                return LocalStorageUtility.clearErrorLogData();
            },
            initUserDetails: function initUserDetails(userName) {

                if (LocalStorageUtility.DbLoaded === true) {
                    var insertUserDetails = function insertUserDetails(successUserDetailsResponse, defferedInitUserDetails, logId) {
                        LocalStorageUtility.addUserDetails(successUserDetailsResponse, userName);
                        var endDate = new Date();
                        var endSavePromise = LocalStorageUtility.endDownload(endDate, logId);
                        var savePromise = LocalStorageUtility.saveOfflineDb();
                        savePromise.promise.then(function () {
                            defferedInitUserDetails.resolve('SuccessUserDetails');
                        });
                    };

                    var defferedInitUserDetailsPromise = $q.defer();
                    var userDetailsPromise = QuestionnaireUtility.loadUserDetails();
                    userDetailsPromise.promise.then(function (successUserDetailsResponse) {
                        var currentdate = new Date();
                        var userId = successUserDetailsResponse.UserId;
                        $timeout(function () {
                            var logId = LocalStorageUtility.startDownload(currentdate, 'UserDetails', userId);
                            insertUserDetails(successUserDetailsResponse, defferedInitUserDetailsPromise, logId);
                        }, 0);
                    }, function (errorResp) {
                        console.log(errorResp);
                    });
                    return defferedInitUserDetailsPromise.promise;
                }
            },

            /* Purpose is to validate the URL formed based on the details entered in the ToggleURL screen and
             also store the details sent during validation process.
             During URL validating, if success then Web API returns application and customer details.
             Thus handling those details.*/
            refreshSuiteDetails: function refreshSuiteDetails(custName, onlineVal, isCustomUrlEnabled) {
                if (LocalStorageUtility.DbLoaded === true) {
                    var suiteCustomerDetails = QuestionnaireUtility.refreshCustomerDetails();
                    suiteCustomerDetails.promise.then(function (successDetailResponse) {
                        LocalStorageUtility.addSuiteData(successDetailResponse, custName, onlineVal, isCustomUrlEnabled);
                        var cKeyNewValue = successDetailResponse.CKey;
                        suiteCustomerDetails.resolve(cKeyNewValue);
                    }, function (errorDetailResponse) {
                        console.log(errorDetailResponse);
                    });
                    return suiteCustomerDetails.promise;
                }
            },
            getEmptyPromise: function getEmptyPromise(paramValue) {
                var prom = $q.defer();
                prom.resolve(paramValue);
                return prom.promise;
            },
            // Add for deep link purpose. Here based on the token passed customer details is returned
            getCKeyData: function getCKeyData(token) {
                if (LocalStorageUtility.DbLoaded === true) {
                    var suiteCustomerDetails = QuestionnaireUtility.getCustomerKeyDetails(token);
                    suiteCustomerDetails.promise.then(function (successDetailResponse) {
                        var cKeyNewValue = successDetailResponse.CKey;
                        suiteCustomerDetails.resolve(cKeyNewValue);
                    }, function (errorDetailResponse) {
                        console.log(errorDetailResponse);
                    });
                    return suiteCustomerDetails.promise;
                }
            },
            setUserDefaultLanguage: function setUserDefaultLanguage(custName, onlineVal, cKey) {
                var defferedLangPromise = $q.defer();
                if (LocalStorageUtility.DbLoaded === true) {
                    var suiteDetails = QuestionnaireUtility.loadSuiteDetails(cKey);
                    suiteDetails.promise.then(function (successDetailResponse) {
                        var languages = successDetailResponse.Languages;

                        if (languages) {
                            for (var i = 0; i < languages.length; i++) {
                                var lanData = languages[i];

                                if (lanData.IsDefault) {
                                    window.localStorage.setItem('userLanguage', lanData.CultureName);
                                }
                            }
                        }

                        defferedLangPromise.resolve(true);
                    }, function (errorDetailResponse) {
                        console.log(errorDetailResponse);
                        defferedLangPromise.reject();
                    });
                } else {
                    defferedLangPromise.reject();
                }

                return defferedLangPromise.promise;
            },
            //Set User device language as default language once after login
            setUserDeviceLanguage: function setUserDeviceLanguage(cKey) {
                var defferedLangPromise = $q.defer();
                if (LocalStorageUtility.DbLoaded === true) {
                    navigator.globalization.getPreferredLanguage(function (language) {
                        var lang = language.value;
                        window.localStorage.setItem("deviceLang", lang);
                        var twoLetterLang = lang.substring(0, 2);
                        var suiteDetails = QuestionnaireUtility.loadSuiteDetails(cKey);
                        suiteDetails.promise.then(function (successDetailResponse) {
                            var languages = successDetailResponse.Languages;

                            if (languages) {
                                for (var i = 0; i < languages.length; i++) {
                                    if (languages[i].LanguageCode == twoLetterLang) {
                                        LocalStorageUtility.saveUserPreferredLanguage(
                                            languages[i].CultureName
                                        );
                                        window.localStorage.setItem(
                                            "userLanguage",
                                            languages[i].CultureName
                                        );
                                    }
                                }
                            }
                            defferedLangPromise.resolve(true);
                        }, function (errorDetailResponse) {
                            console.log(errorDetailResponse);
                            defferedLangPromise.reject();
                        });
                    });
                } else {
                    defferedLangPromise.reject();
                }

                return defferedLangPromise.promise;
            },
            initSuiteDetails: function initSuiteDetails(custName, onlineVal, cKey, isCustomUrlEnabled) {
                if (LocalStorageUtility.DbLoaded === true) {
                    var suiteDetails = QuestionnaireUtility.loadSuiteDetails(cKey);
                    suiteDetails.promise.then(function (successDetailResponse) {
                        LocalStorageUtility.addSuiteData(successDetailResponse, custName, onlineVal, isCustomUrlEnabled);
                    }, function (errorDetailResponse) {
                        console.log(errorDetailResponse);
                    });
                    return suiteDetails.promise;
                }
            },
            updateDownloadActionPlanOrProblem: function updateDownloadActionPlanOrProblem() {
                var defferedInsertActionPlan = $q.defer();

                if (LocalStorageUtility.DbLoaded === true) {
                    var addApwDataActionPlan = function addApwDataActionPlan(successActionPlanWizardResponse, defferedInsert, logId) {
                        var personApwManager = $injector.get('personApwManager');
                        var actionPlanWizards = successActionPlanWizardResponse.ActionPlanWizards;
                        actionPlanWizards = actionPlanWizards == null ? [] : actionPlanWizards;
                        var promise = personApwManager.updateDownloadActionPlanData(actionPlanWizards);
                        LocalStorageUtility.addActionPlanWizardListData(successActionPlanWizardResponse);
                        var endDate = new Date();
                        LocalStorageUtility.endDownload(endDate, logId);
                        promise.then(function () {
                            var savePromise = LocalStorageUtility.saveOfflineDb();
                            savePromise.promise.then(function () {
                                defferedInsert.resolve("ActionPlan");
                            });
                        });
                    };

                    var apwPromise = QuestionnaireUtility.loadAllActionPlanWizardForActionPlan();
                    apwPromise.promise.then(function (successActionPlanWizardResponse) {
                        var currentdate = new Date();
                        $timeout(function () {
                            var logId = LocalStorageUtility.startDownload(currentdate, 'ActionPlan');
                            addApwDataActionPlan(successActionPlanWizardResponse, defferedInsertActionPlan, logId);
                        }, 0);
                    }, function (error) {
                        console.log(error);
                    });
                }

                return defferedInsertActionPlan.promise;
            },
            updateDownloadCase: function updateDownloadCase(moduleName) {
                var modName = moduleName;
                var that = this;
                var defferedInsert = $q.defer();

                if (LocalStorageUtility.DbLoaded === true) {
                    //Download Askade/Claim
                    var casePromise = QuestionnaireUtility.loadAllWizardForCase(modName);
                    casePromise.promise.then(function (successCaseResponse) {
                        var currentdate = new Date();
                        $timeout(function () {
                            var logId = LocalStorageUtility.startDownload(currentdate, modName);
                            that.updateModuleData(successCaseResponse, defferedInsert, logId, moduleName);
                        }, 0);
                    }, function (error) {
                        console.log(error);
                    });
                }

                return defferedInsert.promise;
            },
            updateDownloadQuestionnaireData: function updateDownloadQuestionnaireData(moduleName) {
                var modName = moduleName;
                var webPromise = null;
                var that = this;
                var defferedInsertApv = $q.defer();

                if (LocalStorageUtility.DbLoaded === true) {
                    webPromise = QuestionnaireUtility.loadAllQuestionnaires(modName);
                    webPromise.promise.then(function (successQuestionnaireResponse) {
                        var currentdate = new Date();
                        $timeout(function () {
                            var logId = LocalStorageUtility.startDownload(currentdate, modName);
                            that.updateModuleData(successQuestionnaireResponse, defferedInsertApv, logId, moduleName);
                        }, 0);
                    }, function (error) {
                        console.log(error);
                    });
                }

                return defferedInsertApv.promise;
            },
            updateModuleData: function updateModuleData(successResponse, defferedInsert, logId, moduleName) {
                if (moduleName === "Askade" || moduleName === "Claim") {
                    var personAskadeFileTypeWizardManager = $injector.get("personAskadeFileTypeWizardManager");
                    var caseFileTypeWizards = successResponse.FileTypes;
                    caseFileTypeWizards = caseFileTypeWizards == null ? [] : caseFileTypeWizards;
                    var promise = personAskadeFileTypeWizardManager.updateDownloadWizards(caseFileTypeWizards, moduleName);
                } else {
                    var personQuestionnaireManager = $injector.get("personQuestionnaireManager");
                    var questionnaireData = successResponse.Questionnaires;
                    questionnaireData = questionnaireData == null ? successResponse : questionnaireData;
                    var promise = personQuestionnaireManager.updateDownloadedQuestionnaire(questionnaireData, moduleName);
                }
                var dataTypes = successResponse.DataTypes; // for DataTypes Values
                var hierarchyDataTypes = successResponse.HierarchyDataTypes; //for HierarchyDataTypes Values

                function getColumnTypeValues(allDataTypes, dataTypeId) {
                    var dataTypesList = [];

                    // if(allDataTypes != undefined) {
                    for (var i = 0; i < allDataTypes.length; i++) {
                        var dataTypeIdRaw = allDataTypes[i].DataTypeId;

                        if (dataTypeIdRaw === dataTypeId) {
                            return allDataTypes[i].Values;
                        }
                        // }
                    }

                    return [];
                }

                if (moduleName === "Askade" || moduleName === "Claim") {
                    var allColumnTypes = LocalStorageUtility.getAllColumnTypeWithDataTypeId();
                } else {
                    var allColumnTypes = LocalStorageUtility.getQuestionTypeWithDataTypeId();
                }

                for (var i = 0; i < allColumnTypes.length; i++) {
                    var columnType = allColumnTypes[i].columnType;
                    var dataTypeId = allColumnTypes[i].dataTypeId;
                    var columnSpecificValues = null;

                    switch (columnType) {
                        case "HtmlText":
                        case "CountPicker":
                        case "TextBox":
                        case "DatePicker":
                        case "TimePicker":
                        case "CheckBox":
                        case "EditableTimePicker":
                            continue;
                            break;

                        case "EasyClassification":
                            if (moduleName === "Askade" || moduleName === "Claim") {
                                if (dataTypeId === '34' || dataTypeId === '1479') {
                                    columnSpecificValues = getColumnTypeValues(hierarchyDataTypes, dataTypeId);
                                }
                                else {
                                    columnSpecificValues = getColumnTypeValues(dataTypes, dataTypeId);
                                }
                            } else {
                                columnSpecificValues = getColumnTypeValues(dataTypes, dataTypeId);
                            }
                            LocalStorageUtility.addEasyClassificationListData(dataTypeId, columnSpecificValues);
                            break;

                        case "ListValue":
                            columnSpecificValues = getColumnTypeValues(dataTypes, dataTypeId);
                            LocalStorageUtility.addListValueListData(dataTypeId, columnSpecificValues);
                            break;

                        case "Insurance":
                            columnSpecificValues = getColumnTypeValues(dataTypes, dataTypeId);
                            LocalStorageUtility.addInsuranceData(dataTypeId, columnSpecificValues);
                            break;

                        case "VehiclePart":
                            columnSpecificValues = getColumnTypeValues(dataTypes, dataTypeId);
                            LocalStorageUtility.addVehicleDamageData(dataTypeId,columnSpecificValues);
                            break;

                        default:
                            columnSpecificValues = getColumnTypeValues(dataTypes, dataTypeId);
                            LocalStorageUtility.addListData(columnType, columnSpecificValues);
                            break;
                    }
                }

                promise.then(function () {
                    var endDate = new Date();
                    LocalStorageUtility.endDownload(endDate, logId);
                    var savePromise = LocalStorageUtility.saveOfflineDb();
                    savePromise.promise.then(function () {
                        defferedInsert.resolve(moduleName);
                    });
                });
            },
            downloadFile2: function downloadFile(downloadList, index) {
                return new Promise((resolve, reject) => {
                    const docItem = downloadList[index];
      
                    const docId = docItem.Id;
                    const uriString = docItem.Link;
      
                    localStorageScope.documentLibraryDownloadInProgressList[docId] = '0%';

                    function getFileExtension(fileName) {
                        return fileName.slice((Math.max(0, fileName.lastIndexOf(".")) || Infinity) + 1);
                    }
      
                    const fileName = docId + "." + getFileExtension(docItem.LinkName);
                    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
                        var testFileName = fileName;
                        fileSystem.root.getFile(testFileName, { create: true }, function (newFile) {

                            var complete = function () {
                              const docItemExtend = {...docItem, filePath:newFile}
                              var completedList = localStorageScope.documentLibraryDownloadCompletedList;
                              completedList.push(docId);
                              localStorageScope.documentLibraryDownloadCompletedList = completedList;

                              delete localStorageScope.documentLibraryDownloadCompletedList[docId];

                              $rootScope.$broadcast('completedEvent', localStorageScope.documentLibraryDownloadCompletedList);
                              resolve(docItemExtend);
                            };

                            var error = function (err) {
                                console.log('Error: ' + err);
                                var errorList = localStorageScope.documentLibraryDownloadErrorList;
                                errorList.push(docId);
                                localStorageScope.documentLibraryDownloadErrorList = errorList;

                                delete localStorageScope.documentLibraryDownloadErrorList[docId];
                                $rootScope.$broadcast('errorEvent', localStorageScope.documentLibraryDownloadErrorList);
                                reject(err);
                            };

                            var progress = function (progress) {
                                var progress = (100 * progress.bytesReceived / progress.totalBytesToReceive) + '%';
                                localStorageScope.documentLibraryDownloadInProgressList[docId] = progress;
                                $rootScope.$broadcast('progressEvent', localStorageScope.documentLibraryDownloadInProgressList);
                            };
      
                            try {
                                var downloader = new BackgroundTransfer.BackgroundDownloader();
                                var download = downloader.createDownload(uriString, newFile);
                                download.startAsync().then(complete, error, progress);
                            } catch (err) {
                                console.log('Error: ' + err);
                                reject(err);
                            }
                        }, function (err) {
                            console.log('File system error: ' + err);
                            reject(err);
                        });
                    });
                });
            },
            downloadAllFiles2:  function (downloadList){
                const promiseList = [];
        
                for (let index = 0; index < downloadList.length; index++) {
                      try {
                          const filePromise = localStorageScope.downloadFile(downloadList,index);
                          promiseList.push(filePromise);
                      } catch (err) {
                          console.error('Error downloading file:', err);
                      }
                  }
                return promiseList;
            },
            downloadFile: function downloadFile(downloadList, index) {
                return new Promise((resolve, reject) => {
                    const docItem = downloadList[index];
                    const docId = docItem.Id;
                    const uriString = docItem.Link;
      
                    localStorageScope.documentLibraryDownloadInProgressList[docId] = '0%';

                    function getFileExtension(fileName) {
                        return fileName.slice((Math.max(0, fileName.lastIndexOf(".")) || Infinity) + 1);
                    }
      
                    const fileName = docId + "." + getFileExtension(docItem.LinkName);
                    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
                        var testFileName = fileName;
                        fileSystem.root.getFile(testFileName, { create: true }, function (newFile) {

                            var complete = function () {
                              const docItemExtend = {...docItem, filePath:newFile}
                              var completedList = localStorageScope.documentLibraryDownloadCompletedList;
                              completedList.push(docId);
                              localStorageScope.documentLibraryDownloadCompletedList = completedList;

                              delete localStorageScope.documentLibraryDownloadCompletedList[docId];

                              $rootScope.$broadcast('completedEvent', localStorageScope.documentLibraryDownloadCompletedList);
                              resolve(docItemExtend);
                            };

                            var error = function (err) {
                                console.log('Error: ' + err);
                                var errorList = localStorageScope.documentLibraryDownloadErrorList;
                                errorList.push(docId);
                                localStorageScope.documentLibraryDownloadErrorList = errorList;

                                delete localStorageScope.documentLibraryDownloadErrorList[docId];
                                $rootScope.$broadcast('errorEvent', localStorageScope.documentLibraryDownloadErrorList);
                                reject(err);
                            };

                            var progress = function (progress) {
                                var progress = (100 * progress.bytesReceived / progress.totalBytesToReceive) + '%';
                                localStorageScope.documentLibraryDownloadInProgressList[docId] = progress;
                            };
      
                            try {
                                var downloader = new BackgroundTransfer.BackgroundDownloader();
                                var download = downloader.createDownload(uriString, newFile);
                                download.startAsync().then(complete, error, progress);
                            } catch (err) {
                                console.log('Error: ' + err);
                                reject(err);
                            }
                        }, function (err) {
                            console.log('File system error: ' + err);
                            reject(err);
                        });
                    });
                });
            },
            downloadAllFiles:  async function (downloadList){
                const promiseList = [];
                window.localStorage.setItem('documentLibraryDownloadInStarted', '1');
                for (let index = 0; index < downloadList.length; index++) {
                      try {
                          const promiseResult = await localStorageScope.downloadFile(downloadList,index);
                          const { filePath, ...docItem } = promiseResult;
                          const {nativeURL} = filePath;
                          // Handle the resolved promise result here
                          console.log(nativeURL);
                          LocalStorageUtility.addDocumentLibraryData(docItem, nativeURL);
                          var savePromise = await LocalStorageUtility.saveOfflineDb();
                      } catch (err) {
                          console.error('Error downloading file:', err);
                      }
                  }
                  window.localStorage.setItem('documentLibraryDownloadInStarted', '0');
                return promiseList;
            },
            initDownloadDocumentLibrary: function initDownloadDocumentLibrary(moduleName) {
                if (LocalStorageUtility.DbLoaded === true) {
                    var defferedInsertDoc = $q.defer();
                    var dlDetails = QuestionnaireUtility.loadAllDocumentLibrary(moduleName);
                    dlDetails.promise.then(function (successDataResponse) {
                        var currentdate = new Date();
                        var logId = LocalStorageUtility.startDownload(currentdate, moduleName);
                        var documentLibraryManager = $injector.get('documentLibraryManager');
                        var insertPromise = documentLibraryManager.updateDownloadDocumentLibrary(successDataResponse);
                        insertPromise.then(function (success) {
                            var filteredList = success;
                            for (let index = 0; index < filteredList.length; index++) {
                                var itemdDoc = filteredList[index];
                                localStorageScope.documentLibraryDownloadInProgressList[itemdDoc.Id] = '0%';
                            }
                            const allInProgressKeys = Object.keys( localStorageScope.documentLibraryDownloadInProgressList);
                            
                            window.localStorage.setItem('documentLibraryDownloadInProgressList', allInProgressKeys.join('|'));

                            $rootScope.$broadcast('progressEvent', localStorageScope.documentLibraryDownloadInProgressList);
                            const tempFunc = () => {
                                localStorageScope.downloadAllFiles(filteredList);
                            };
                            tempFunc();
                            var endDate = new Date();
                            LocalStorageUtility.endDownload(endDate, logId);
                            var savePromise = LocalStorageUtility.saveOfflineDb();
                            savePromise.promise.then(function () {
                                defferedInsertDoc.resolve(true);
                            });
                        }, function (errorSaving) {
                            defferedInsertDoc.reject(false);
                        });
                    }, function (errorDataResponse) {
                        defferedInsertDoc.reject(false);
                        console.log(errorDataResponse);
                    });
                    return defferedInsertDoc.promise;
                }
            },
            initDownloadNew: function initDownloadNew() {
                var currentdate = new Date();
                var logId = LocalStorageUtility.startDownload(currentdate, 'All');
                var loggedInUser = LocalStorageUtility.getUserNameByLoggedInTimeStamp();
                var userId = loggedInUser[0].userId;
                var userDetailsManager = $injector.get('userDetailsManager');
                var userDetails = userDetailsManager.getUserLastLoggedTimeStamp();
                var applications = LocalStorageUtility.getUserApplicationsByUser(userId);
                var promiseList = [];
                var logIdPromiseList = [];
                var isSurveyAnswerFetchExecuted = false;

                for (var i = 0; i < applications.length; i++) {
                    // If channel disabled not downloading 
                    if (!applications[i].isApplicationModuleDisable) {
                        var appId = applications[i].applicationId;
                        var app = LocalStorageUtility.getApplication(appId);
                        var moduleName = app.text;

                        if (moduleName === 'ActionPlan') {
                            var promiseSetForActionPlanProblem = this.updateDownloadActionPlanOrProblem();
                            promiseList.push(promiseSetForActionPlanProblem);
                        } else if (moduleName === 'Askade' || moduleName === 'Claim') {
                            var promiseSetForAskade = this.updateDownloadCase(moduleName);
                            promiseList.push(promiseSetForAskade);
                        } else if (moduleName === 'DocumentLibrary') {
                            var promiseSetForDL = this.initDownloadDocumentLibrary(moduleName);
                            promiseList.push(promiseSetForDL);
                        } else {
                            var promiseForQuestionnaire = this.updateDownloadQuestionnaireData(moduleName);
                            promiseList.push(promiseForQuestionnaire);
                        }
                    }
                }

                if (userDetails.Customer.EnableNews) {
                    var newsPromise = this.getNewsDataDetails();
                    promiseList.push(newsPromise);
                }

                logIdPromiseList = {
                    'promiseList': promiseList,
                    'logId': logId
                };
                return logIdPromiseList;
            },
            // Added this method only to insert the end date when a master download happens, or on login download happens.
            addEndDateForDownloadAll: function addEndDateForDownloadAll(logId) {
                if (logId) {
                    var endDate = new Date();
                    LocalStorageUtility.endDownload(endDate, logId);
                    return LocalStorageUtility.saveOfflineDb();
                }

                return null;
            },
            uploadPersonQuestionnaire: function uploadPersonQuestionnaire(pq, moduleName) {
                // Assigning Questionnaire and Question array to null to handle an issue where questionnaire was not uploading due to not computing the JSON array
                var copyPq = angular.copy(pq);
                copyPq.Questionnaire = null;

                for (var cpPq = 0; cpPq < copyPq.Answers.length; cpPq++) {
                    var answer = copyPq.Answers[cpPq];
                    answer.Question = null;
                }

                var webPromise = QuestionnaireUtility.postPersonQuestionnaire(copyPq, moduleName);
                return webPromise;
            },
            uploadPersonActionPlanWizard: function uploadPersonActionPlanWizard(pApw) {
                var pApwId = pApw.Id;
                var webPromise = QuestionnaireUtility.postPersonActionPlanWizard(pApw);
                webPromise.then(function (aoData) {//LocalStorageUtility.deletePersonActionPlanWizard(pApwId);
                }, function (errorResponse) {
                    console.log(errorResponse);
                });
                return webPromise;
            },
            validateUserToken: function validateUserToken() {
                return QuestionnaireUtility.validateToken();
            },
            uploadPersonAskadeWizard: function uploadPersonAskadeWizard(pAkEntity) {
                var webPromise = QuestionnaireUtility.postPersonAskadeWizard(pAkEntity);
                webPromise.then(function (aoData) { }, function (errorResponse) {
                    console.log(errorResponse);
                });
                return webPromise;
            },
            uploadPersonClaimWizard: function uploadPersonClaimWizard(pClaimEntity) {
                var webPromise = QuestionnaireUtility.postPersonClaimWizard(pClaimEntity);
                webPromise.then(function (successResponse) { }, function (errorResponse) {
                    console.log(errorResponse);
                });
                return webPromise;
            },
            reset: function reset(excludeList) {
                var excludeTable = ['ResourceLabels', 'Icons'];
                var excludedTablesList = excludeTable.concat(excludeList);
                return LocalStorageUtility.removeLocalStorageData(excludedTablesList);
            },
            resetAllModules: function resetAllModules() {
                var excludeTables = ['ResourceLabels', 'Icons', 'UserDetails', 'UserDepartments', 'UserApplications', 'Customers', 'Application', 'Department'];
                return LocalStorageUtility.removeLocalStorageData(excludeTables);
            },
            // Below update methods are called in my profile screen on reset of user specific data
            updateResourceDetails: function updateResourceDetails() {
                if (LocalStorageUtility.DbLoaded === true) {
                    var def = $q.defer();
                    var suiteDetails = QuestionnaireUtility.loadSuiteDetails();
                    suiteDetails.promise.then(function (successDetailResponse) {
                        LocalStorageUtility.addResourceData(successDetailResponse);
                        LocalStorageUtility.saveOfflineDb();
                        def.resolve();
                    }, function (errorDetailResponse) {
                        console.log(errorDetailResponse);
                        def.reject();
                    });
                    return def.promise;
                }
            },
            updateIconsDetails: function updateIconsDetails() {
                if (LocalStorageUtility.DbLoaded === true) {
                    var def = $q.defer();
                    var suiteDetails = QuestionnaireUtility.loadSuiteDetails();
                    suiteDetails.promise.then(function (successDetailResponse) {
                        LocalStorageUtility.addIconsData(successDetailResponse);
                        LocalStorageUtility.saveOfflineDb();
                        def.resolve();
                    }, function (errorDetailResponse) {
                        console.log(errorDetailResponse);
                        def.reject();
                    });
                    return def.promise;
                }
            },
            updateSuiteDetails: function updateSuiteDetails(custName, onlineVal, isCustomUrlEnabled, ckey) {
                if (LocalStorageUtility.DbLoaded === true) {
                    var def = $q.defer();
                    var suiteDetails = QuestionnaireUtility.loadSuiteDetails(ckey);
                    suiteDetails.promise.then(function (successDetailResponse) {
                        LocalStorageUtility.addCustomerData(successDetailResponse, custName, onlineVal, isCustomUrlEnabled);
                        LocalStorageUtility.saveOfflineDb();
                        def.resolve();
                    }, function (errorDetailResponse) {
                        console.log(errorDetailResponse);
                        def.reject();
                    });
                    return def.promise;
                }
            },
            updateUserDetails: function updateUserDetails(userName) {
                if (LocalStorageUtility.DbLoaded === true) {
                    var defferedInitUserDetailsPromise = $q.defer();
                    var userDetailsPromise = QuestionnaireUtility.loadUserDetails();
                    userDetailsPromise.promise.then(function (successUserDetailsResponse) {
                        LocalStorageUtility.updateUserDetails(successUserDetailsResponse, userName);
                        LocalStorageUtility.saveOfflineDb();
                        defferedInitUserDetailsPromise.resolve();
                    }, function (errorResp) {
                        console.log(errorResp);
                        defferedInitUserDetailsPromise.reject();
                    });
                    return defferedInitUserDetailsPromise.promise;
                }
            },
            updateUserApplicationsDetails: function updateUserApplicationsDetails(userId) {
                if (LocalStorageUtility.DbLoaded === true) {
                    var defferedUserApplicationPromise = $q.defer();
                    var applicationPromise = QuestionnaireUtility.loadSuiteDetails();
                    applicationPromise.promise.then(function (successApplicationResponse) {
                        LocalStorageUtility.insertApplicationDetails(successApplicationResponse);
                        var userApplicationPromise = QuestionnaireUtility.loadUserDetails();
                        userApplicationPromise.promise.then(function (successUserApplicationResponse) {
                            LocalStorageUtility.addUserApplicationDetails(successUserApplicationResponse, userId);
                            LocalStorageUtility.saveOfflineDb();
                            defferedUserApplicationPromise.resolve();
                        }, function (errorResp) {
                            console.log(errorResp);
                            defferedUserApplicationPromise.reject();
                        });
                    });
                    return defferedUserApplicationPromise.promise;
                }
            },
            updateDepartmentDetails: function updateDepartmentDetails(userId) {
                if (LocalStorageUtility.DbLoaded === true) {
                    var defferedInitUserDetailsPromise = $q.defer();
                    var applicationPromise = QuestionnaireUtility.loadSuiteDetails();
                    applicationPromise.promise.then(function (successApplicationResponse) {
                        LocalStorageUtility.insertApplicationDetails(successApplicationResponse);
                        var userApplicationPromise = QuestionnaireUtility.loadUserDetails();
                        userApplicationPromise.promise.then(function (successUserApplicationResponse) {
                            LocalStorageUtility.addUserApplicationDetails(successUserApplicationResponse, userId);
                            LocalStorageUtility.addDepartmentDetailsData(successUserApplicationResponse);
                            LocalStorageUtility.saveOfflineDb();
                            defferedInitUserDetailsPromise.resolve();
                        }, function (errorResp) {
                            console.log(errorResp);
                            defferedInitUserDetailsPromise.reject();
                        });
                    }, function (errorApplicationResponse) {
                        console.log(errorApplicationResponse);
                        defferedInitUserDetailsPromise.reject();
                    });
                    return defferedInitUserDetailsPromise.promise;
                }
            },
            updatePersonDetails: function updatePersonDetails(userId) {
                if (LocalStorageUtility.DbLoaded === true) {
                    var defferedInitUserDetailsPromise = $q.defer();
                    var applicationPromise = QuestionnaireUtility.loadSuiteDetails();
                    applicationPromise.promise.then(function (successApplicationResponse) {
                        LocalStorageUtility.insertApplicationDetails(successApplicationResponse);
                        var userDetailsPromise = QuestionnaireUtility.loadUserDetails();
                        userDetailsPromise.promise.then(function (successPersonResponse) {
                            LocalStorageUtility.addUserApplicationDetails(successPersonResponse, userId);
                            LocalStorageUtility.addPersonsDetails(successPersonResponse);
                            LocalStorageUtility.saveOfflineDb();
                            defferedInitUserDetailsPromise.resolve();
                        }, function (errorResp) {
                            console.log(errorResp);
                            defferedInitUserDetailsPromise.reject();
                        });
                    }, function (errorApplicationResponse) {
                        console.log(errorApplicationResponse);
                        defferedInitUserDetailsPromise.reject();
                    });
                    return defferedInitUserDetailsPromise.promise;
                }
            },
            refreshDepartmentsPersonsDetails: function refreshDepartmentsPersonsDetails() {
                if (LocalStorageUtility.DbLoaded === true) {
                    var defferedInitUserDetailsPromise = $q.defer();
                    var userDetailsPromise = QuestionnaireUtility.loadUserDetails();
                    userDetailsPromise.promise.then(function (successUserDetailsResponse) {
                        LocalStorageUtility.addDepartmentDetailsData(successUserDetailsResponse);
                        LocalStorageUtility.addPersonsDetails(successUserDetailsResponse);
                        LocalStorageUtility.saveOfflineDb();
                        defferedInitUserDetailsPromise.resolve();
                    }, function (errorResp) {
                        console.log(errorResp);
                        defferedInitUserDetailsPromise.reject();
                    });
                    return defferedInitUserDetailsPromise.promise;
                }
            },
            // Based on app area, table name and search text web api call is done
            getDropDownDetails: function getDropDownDetails(firstParam, dropDownType, appArea, searchText) {
                if (LocalStorageUtility.DbLoaded === true) {
                    var defferedDropdownPromise = $q.defer(); // Append '/' after search text value (to handle email address search or with special characters)

                    var newSearchText = searchText + '/';
                    var dropdownPromise = QuestionnaireUtility.getDropDownValuesDetails(firstParam, dropDownType, appArea, newSearchText);
                    dropdownPromise.promise.then(function (successPersonResponse) {
                        defferedDropdownPromise.resolve(successPersonResponse);
                    }, function (errorResp) {
                        console.log(errorResp);
                        defferedDropdownPromise.reject();
                    });
                    return defferedDropdownPromise.promise;
                }
            },
            postErrorLogData: function postErrorLogData(){
                if (LocalStorageUtility.DbLoaded === true) {
                    var defferedPromise = $q.defer();
                    var errorData = LocalStorageUtility.getErrorData();
                    if (errorData.length > 0) {
                        var uploadErrorPromiseList = QuestionnaireUtility.uploadErrorLogData(errorData);

                        $q.all(uploadErrorPromiseList).then(function (successPromise) {
                            console.log(successPromise);
                            defferedPromise.resolve();
                        }, function (errorPromise) {
                            console.log(errorPromise);
                        });

                        defferedPromise.promise.then(function (s) {
                            $timeout(() => {
                                PopupUtil.hide();
                                var anim = '<lottie-player src="raw/loadingSuccess.json" background="transparent" speed="1" id="loadAnim" loop autoplay></lottie-player>';
                                var contentTitle = $rootScope.getResourceText('LIT_MOBILE_UPLOAD');
                                var contentLabel = $rootScope.getResourceText('MSG_MOBILE_ERROR_UPLOAD');
                                var contentTimer = 3000;
                                PopupUtil.animTimerPopUp(anim, contentTitle, contentLabel, contentTimer);
                            }, 100)
                        });
                    }

                    return defferedPromise.promise;
                }
            },
            // Based on app area, table name and search text web api call is done
            getDropDownDetailsWithSearchFilter: function getDropDownDetailsWithSearchFilter(firstParam, dropDownType, appArea, searchText, searchFilter) {
                if (LocalStorageUtility.DbLoaded === true) {
                    var defferedDropdownPromise = $q.defer();
                    var withSearchFilter = searchText + '/' + searchFilter + '/';
                    var dropdownPromise = QuestionnaireUtility.getDropDownValuesDetails(firstParam, dropDownType, appArea, withSearchFilter);
                    dropdownPromise.promise.then(function (successPersonResponse) {
                        defferedDropdownPromise.resolve(successPersonResponse);
                    }, function (errorResp) {
                        console.log(errorResp);
                        defferedDropdownPromise.reject();
                    });
                    return defferedDropdownPromise.promise;
                }
            },
            getNewsDataDetails: function getNewsDataDetails() {
                if (LocalStorageUtility.DbLoaded === true) {
                    var defferedInsertDoc = $q.defer();
                    var dlDetails = QuestionnaireUtility.getNewsDetails();
                    dlDetails.promise.then(function (successDataResponse) {
                        var currentdate = new Date(); // Passing 'News' as type for StartDownload to create a log

                        var logId = LocalStorageUtility.startDownload(currentdate, 'News');
                        var newsManager = $injector.get('newsManager');
                        var insertPromise = newsManager.updateNews(successDataResponse);
                        insertPromise.then(function (success) {
                            var endDate = new Date();
                            LocalStorageUtility.endDownload(endDate, logId);
                            var savePromise = LocalStorageUtility.saveOfflineDb();
                            savePromise.promise.then(function () {
                                defferedInsertDoc.resolve(true);
                            });
                        }, function (errorSaving) {
                            defferedInsertDoc.reject(false);
                        });
                    }, function (errorDataResponse) {
                        defferedInsertDoc.reject(false);
                        console.log(errorDataResponse);
                    });
                    return defferedInsertDoc.promise;
                }
            },
            getBothNewsDataDetails: function getBothNewsDataDetails() {
                if (LocalStorageUtility.DbLoaded === true) {
                    var defferedInsert = $q.defer();
                    var promiseArray = []; // If the parameter passed isfalse -> implies request is done for /news url

                    var newsDetails = QuestionnaireUtility.getBothNewsDetails();
                    newsDetails.promise.then(function (successDataResponse) {
                        var currentdate = new Date(); // Passing 'News' as type for StartDownload to create a log

                        var logId = LocalStorageUtility.startDownload(currentdate, 'News');
                        var newsManager = $injector.get('newsManager');

                        for (var i = 0; i < successDataResponse.length; i++) {
                            var newsResponse = successDataResponse[i];
                            var insertPromise = newsManager.updateNews(newsResponse.news, newsResponse.isRSSFeed);
                            promiseArray.push(insertPromise);
                        }

                        $q.all(promiseArray).then(function (success) {
                            var endDate = new Date();
                            LocalStorageUtility.endDownload(endDate, logId);
                            var savePromise = LocalStorageUtility.saveOfflineDb();
                            savePromise.promise.then(function () {
                                defferedInsert.resolve(true);
                            });
                        }, function (errorSaving) {
                            defferedInsert.reject(false);
                        });
                    }, function (errorDataResponse) {
                        defferedInsert.reject(false);
                        console.log(errorDataResponse);
                    });
                    return defferedInsert.promise;
                }
            } 
        };
        return localStorageScope;
    }]);


/***/ }),

/***/ "./scripts/LocalStorageModule.js":
/*!***************************************!*\
  !*** ./scripts/LocalStorageModule.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true,
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

var app = angular.module("LocalStorage", ["lokijs", "angularMoment"]);
app.factory("$exceptionHandler", [
    "$injector",
    function ($injector) {
        return function (exception, cause) {
            var localStorageUtility = $injector.get("LocalStorageUtility");
            localStorageUtility.addExceptionToLogTable(exception, cause);
            var rScope = $injector.get("$rootScope");
            rScope.$broadcast("exceptionRefresh", exception, cause);
        };
    },
]);
app.constant("MobileConfig", {
    DatabaseName: "OfflineDb",
    AdapterName: "LocalStorageAdapter",
});
/*
The LocalStorageUtility contains refereneces to modules 
1. Loki : which manages local storage saving
2. MobileConfig : contains constants globally defined at the module level seee line 0,
3. $q: angular utility
4. $rootScope to notify an event that the database is loaded and is ready to be used.
*/

app.factory("LocalStorageUtility", [
    "Loki",
    "MobileConfig",
    "$q",
    "$rootScope",
    "moment",
    "DateUtil",
    "DeviceUtil",
    "$cordovaAppVersion",
    "$ionicPlatform",
    "GeneralUtil",
    function (
        Loki,
        mobileConfig,
        $q,
        $rootScope,
        moment,
        DateUtil,
        DeviceUtil,
        $cordovaAppVersion,
        $ionicPlatform,
        GeneralUtil
    ) {
        var _localStorage;

        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }

            return (
                s4() +
                s4() +
                "-" +
                s4() +
                "-" +
                s4() +
                "-" +
                s4() +
                "-" +
                s4() +
                s4() +
                s4()
            );
        }

        function toUTCDate(date) {
            var _utc = new Date(
                date.getUTCFullYear(),
                date.getUTCMonth(),
                date.getUTCDate(),
                date.getUTCHours(),
                date.getUTCMinutes(),
                date.getUTCSeconds()
            );

            return _utc;
        }

        function getDefaultLabels() {
            var defaultResource = [
                {
                    resources: [
                        {
                            Id: "LIT_LOGIN_TEXT",
                            defaultText: "LOGIN",
                        },
                        {
                            Id: "LIT_USERNAME",
                            defaultText: "UserName / Brugernavn",
                        },
                        {
                            Id: "LIT_PASSWORD",
                            defaultText: "Password / Adgangskode",
                        },
                        {
                            Id: "LIT_BACK",
                            defaultText: "Tilbage",
                        },
                        {
                            Id: "LIT_CUSTOMER",
                            defaultText: "Customer / Kunde",
                        },
                        {
                            Id: "LIT_OK",
                            defaultText: "Ok",
                        },
                        {
                            Id: "LIT_SUBMIT",
                            defaultText: "Gem",
                        },
                        {
                            Id: "LIT_ONLINE_VALUES",
                            defaultText: "Site / Websted",
                        },
                        {
                            Id: "LIT_LOADING",
                            defaultText: "Arbejder...",
                        },
                        {
                            Id: "LIT_ALERT",
                            defaultText: "Alert",
                        },
                        {
                            Id: "LIT_PLEASE_ENTER_THE_DETAILS",
                            defaultText: "Indtast venligst brugernavn / adgangskode !",
                        },
                        {
                            Id: "LIT_SESSION_TIMEOUT",
                            defaultText: "Din session er udløbet!",
                        },
                        {
                            Id: "LIT_TOGGLE",
                            defaultText: "Shift / Skift",
                        },
                        {
                            Id: "MSG_CHECK_INTERNET_CONNECTION",
                            defaultText:
                                "Check Internet / Venligst tjek din internetforbindelse , og prøv igen .",
                        },
                        {
                            Id: "MSG_ACCESS_TO_ROLES",
                            defaultText:
                                "No access / Vi beklager !!! Du har ikke adgang til disse roller",
                        },
                        {
                            Id: "LIT_LOGIN_FAILED",
                            defaultText: "Login failed/mislykkedes",
                        },
                        {
                            Id: "MSG_WAIT_TO_LOGIN",
                            defaultText: "Vent venligst mens vi logge dig ind",
                        },
                        {
                            Id: "LIT_MAIL_SUBJECT_APP",
                            defaultText:
                                "__HSEQ__MASTER__ -- __CUSTOMER__NAME__ (__REGISTRATION__NAME__ -- __DATE__)",
                        },
                        {
                            Id: "MSG_MAIL_BODY_APP",
                            defaultText:
                                "Kjære __NAME__\r\n\r\n" +
                                "\r\nSe vedlagt __REGISTRATION__NAME__ -- __DATE__\r\n\r\n" +
                                "Denne meldingen ble generert av  __HSEQ__MASTER__ app.\r\n\r\n" +
                                "Med vennlig hilsen,\r\n\r\n" +
                                "__HSEQ__MASTER__ -- __CUSTOMER__NAME__",
                        },
                        {
                            Id: "MSG_MULTIPLE_USER_FOUND",
                            defaultText: "Kan ikke logge ind. Flere brugere fundet.",
                        },
                        {
                            Id: "MSG_SELECTED_CUSTOMER",
                            defaultText: "Connected to ",
                        },
                        {
                            Id: "LIT_YES",
                            defaultText: "Ja",
                        },
                        {
                            Id: "LIT_NO",
                            defaultText: "Nej",
                        },
                        {
                            Id: "LIT_ADVANCED_SETTINGS",
                            defaultText: "Avancerede indstillinger",
                        },
                        {
                            Id: "LIT_PULL_TO_REFRESH",
                            defaultText: "Træk for at opdatere",
                        },
                        {
                            Id: "LIT_CUSTOMER_KEY",
                            defaultText: "Kunde nøgle",
                        },
                        {
                            Id: "LIT_LANGUAGE",
                            defaultText: "Sprog",
                        },
                        {
                            Id: "LIT_UPDATE_DEF",
                            defaultText: "Opdaterings definition",
                        },
                        {
                            Id: "MSG_UPDATE_LANG_CONFIRM",
                            defaultText:
                                "Er du sikker på, at du vil ændre app sprog til __LANG__?",
                        },
                        {
                            Id: "LIT_HELP_TEXT",
                            defaultText: "Hjælpetekst",
                        },
                        {
                            Id: "LIT_ANONYMOUS",
                            defaultText: "Anonym",
                        },
                        {
                            Id: "LIT_ONLINE",
                            defaultText: "Online",
                        },
                        {
                            Id: "LIT_OFFLINE",
                            defaultText: "Offline",
                        },
                        {
                            Id: "LIT_COMPANY",
                            defaultText: "Selskab",
                        },
                        {
                            Id: "LIT_ENVIRONMENT",
                            defaultText: "Miljø",
                        },
                        {
                            Id: "LIT_DEMO",
                            defaultText: "DEMO",
                        },
                        {
                            Id: "LIT_CONNECT_TO",
                            defaultText: "Forbinde til",
                        },
                        {
                            Id: "MSG_URL_NOT_VALID",
                            defaultText: "Indtast venligst gyldig webadresse",
                        },
                        {
                            Id: "MSG_ENTER_CUSTOMER_DETAILS",
                            defaultText: "Vælg venligst / indtast kundeoplysninger",
                        },
                        {
                            Id: "MSG_DATA_NOT_VALID",
                            defaultText: "Indtast venligst gyldige data",
                        },
                        {
                            Id: "LIT_ALL",
                            defaultText: "Alle",
                        },
                        {
                            Id: "MSG_FILE_NOT_FOUND",
                            defaultText:
                                "Filen mangler eller er beskadiget. Venligst download igen.",
                        },
                        {
                            Id: "MSG_ALLOW_POPUP",
                            defaultText: "Tillad popups til denne hjemmeside",
                        },
                        {
                            Id: "LIT_MESSAGE",
                            defaultText: "Besked",
                        },
                        {
                            Id: "MSG_URL_NOT_FOUND",
                            defaultText:
                                "Den ønskede URL kunne ikke findes. Kontakt venligst administrator!",
                        },
                        {
                            Id: "LIT_DONE",
                            defaultText: "Færdig",
                        },
                        {
                            Id: "LIT_CLEAR",
                            defaultText: "Ryd",
                        },
                        {
                            Id: "LIT_READ_ALOUD",
                            defaultText: "Læse højt",
                        },
                        {
                            Id: "MSG_MOBILE_DATE_WRONG_FORMAT",
                            defaultText: "Indtast venligst den rigtige dato",
                        },
                        {
                            Id: "LIT_MULTI_TASK",
                            defaultText: "Multitaske",
                        },
                        {
                            Id: "LIT_MULTI_TASK_SOLUTION",
                            defaultText: "Multi Task Solution",
                        },
                        {
                            Id: "LIT_CANCEL_MULTITASK",
                            defaultText: "Annuller multitask",
                        },
                        {
                            Id: "LIT_SAVE_MULTITASK",
                            defaultText: "Gem multitask",
                        },
                        {
                            Id: "LIT_MULTITASK_ATTACHMENTS",
                            defaultText: "Multi-task attachments",
                        },
                        {
                            Id: "LIT_SOLUTION",
                            defaultText: "Opløsning",
                        },
                        {
                            Id: "MSG_MULTITASK_REQUIRED",
                            defaultText: "Mindste en multitaskindtastning er obligatorisk",
                        },
                        {
                            Id: "MSG_MULTITASK_MANDATORY_ANSWER",
                            defaultText: "Atleast One Multi Task Svar er påkrævet",
                        },
                        {
                            Id: "LIT_NEXT_UPDATE",
                            defaultText: "Næste opdatering",
                        },
                        {
                            Id: "LIT_TILE_DISPLAY",
                            defaultText: "Aktivér flisevisning",
                        },
                        {
                            Id: "MSG_UPDATE_MODULE",
                            defaultText:
                                "Opdater moduler, når rolleadgangen ændres. Klik på master download for at få de seneste definitioner.",
                        },
                        {
                            Id: "MSG_TIME_WRONG_FORMAT",
                            defaultText: "Indtast det korrekte tidspunkt",
                        },
                        {
                            Id: "MSG_MOBILE_FAVORITES_ADDED",
                            defaultText: "Føjet til favoritter",
                        },
                        {
                            Id: "LIT_FAVORITES",
                            defaultText: "Foretrukner",
                        },
                        {
                            Id: "LIT_MOBILE_FAVORITES",
                            defaultText: "Favoritter",
                        },
                        {
                            Id: "LIT_MOBILE_NEWS",
                            defaultText: "Nyheder",
                        },
                        {
                            Id: "LIT_MOBILE_DISPLAY_FAVORITES",
                            defaultText: "Vis som favoritter som standard",
                        },
                        {
                            Id: "MSG_MOBILE_DOWNLOAD_NEWS",
                            defaultText:
                                "Nyheder downloades ikke. Træk venligst ned for at downloade nyhederne.",
                        },
                        {
                            Id: "LIT_MOBILE_DEMODK",
                            defaultText: "DEMODK",
                        },
                        {
                            Id: "MSG_LOGOUT_CONFIRMTEXT",
                            defaultText:
                                "Brugers afventende svar ryddes. Ønsker du at fortsætte?",
                        },
                        {
                            Id: "MSG_MOBILE_ADD_TO_FAVORITES_LINE1",
                            defaultText: "Du har ikke tilføjet nogen favoritter.",
                        },
                        {
                            Id: "MSG_MOBILE_ADD_TO_FAVORITES_LINE2",
                            defaultText:
                                "Tilføj en favorit ved at trykke og holde nede på en guide.",
                        },
                        {
                            Id: "MSG_NEWS_UPDATE",
                            defaultText:
                                "Nyheder downloades ikke.Opdater for at downloade nyhederne.",
                        },
                        {
                            Id: "MSG_MOBILE_DOWNLOAD_MODULE_LINE1",
                            defaultText: "Ingen moduler at vise",
                        },
                        {
                            Id: "MSG_MOBILE_DOWNLOAD_MODULE_LINE2",
                            defaultText: "Download venligst for at opdatere.",
                        },
                        {
                            Id: "MSG_MOBILE_CONFIRM_TO_SHOW_FAVORITE_GUIDE",
                            defaultText:
                                "Du kan tilføje guider og dokumenter som favoritter for let adgang. Ønsker du en hurtig demostrering?",
                        },
                        {
                            Id: "LIT_ADD_PHOTO",
                            defaultText: "Tilføj et foto",
                        },
                        {
                            Id: "MSG_MOBILE_TO_THE_MAXIMUM_ATTACHMENTS_REACHED",
                            defaultText: "Du har nået det maksimale antal vedhæftede filer",
                        },
                        {
                            Id: "MSG_MOBILE_REMOVE_THE_ATTACHMENT",
                            defaultText: "Fjern en vedhæftet fil, før du tilføjer en anden.",
                        },
                        {
                            Id: "LIT_MOBILE_ENABLE_DARKMODE",
                            defaultText: "Aktivér mørk tilstand",
                        },
                        {
                            Id: "LIT_MOBILE_DOWNLOAD",
                            defaultText: "Download",
                        },
                        {
                            Id: "LIT_MOBILE_SUCCESS",
                            defaultText: "Fuldført",
                        },
                        {
                            Id: "LIT_MOBILE_ERROR",
                            defaultText: "Fejl",
                        },
                        {
                            Id: "LIT_MOBILE_REMOVE",
                            defaultText: "Fjern",
                        },
                        {
                            Id: "LIT_MOBILE_UPLOAD",
                            defaultText: "Uploader",
                        },
                        {
                            Id: "MSG_MOBILE_COLLECT_DATA",
                            defaultText: "Vi henter data fra SafetyNet.",
                        },
                        {
                            Id: "MSG_MOBILE_INTERNET_ERROR",
                            defaultText:
                                "Noget gik galt. Tjek din internetforbindelse og prøv igen senere.",
                        },
                        {
                            Id: "MSG_MOBILE_SAVE_SETTING",
                            defaultText: "Ændringerne blev gemt.",
                        },
                        {
                            Id: "MSG_MOBILE_UNSAVE_SETTING",
                            defaultText:
                                "Du har fortaget ændringer, som ikke er blevet gemt.",
                        },
                        {
                            Id: "MSG_MOBILE_REMOVE_FAVORITES",
                            defaultText:
                                "Er du sikker på, du ønsker at fjerne denne fra favoritter?",
                        },
                        {
                            Id: "MSG_MOBILE_UPOADING_REGISTRATION",
                            defaultText: "Vi uploader din registrering.",
                        },
                        {
                            Id: "MSG_MOBILE_UPLOADED_REGISTRATION",
                            defaultText: "Din registrering blev uploadet til SafetyNet.",
                        },
                        {
                            Id: "LIT_MOBILE_SELECT_ILLUSTRATION",
                            defaultText: "Vælg fra illustration",
                        },
                        {
                            Id: "LIT_MOBILE_SELECT_LIST",
                            defaultText: "Vælg fra liste",
                        },
                        {
                            Id: "MSG_MOBILE_PUBLISH_FAIL",
                            defaultText: "Ikke offentliggjort",
                        },
                        {
                            Id: "LIT_MOBILE_PICK_LOCATION",
                            defaultText: "Vælg placeringen",
                        },
                        {
                            Id: "LIT_MOBILE_ENABLE_LOCATION_ACCESS",
                            defaultText: "Aktiver adgang til enhedens placering",
                        },
                        {
                            Id: "MSG_MOBILE_READALOUD_SPEED_HANDLE",
                            defaultText: "Læs hastighedshåndtaget højt",
                        },
                        {
                            Id: "MSG_MOBILE_ERROR_UPLOAD",
                            defaultText: "Fejl uploades",
                        },
                        {
                            Id: "MSG_MOBILE_CLEAR_ERROR_LOG",
                            defaultText: "Er du sikker på, at du vil rydde fejlene",
                        },
                        {
                            Id: "LIT_MOBILE_CUSTOMER_ENVIRONMENT",
                            defaultText: "Tryk på feltet herunder for at scanne en QR-kode eller for at indsætte URL-adresse til organisations log in.",
                        },
                        {
                            Id: "LIT_MOBILE_TOKEN_LOGIN",
                            defaultText: "Tryk på feltet herunder, hvis du har modtaget en token-URL på e-mail, for at logge ind på organisations SafetyNet.",
                        },
                        {
                            Id: "MSG_MOBILE_LOGIN_EMPTY_TOKEN",
                            defaultText: "Indtast korrekt token for at fortsætte",
                        },
                        {
                            Id: "LIT_MOBILE_ALLOWED_EXTENSION",
                            defaultText: "Tilladte udvidelser",
                        },
                        {
                            Id: "MSG_MOBILE_ALLOWED_EXTENSION",
                            defaultText:
                                "Ugyldig filtypenavn. Brug venligst en af ??de tilladte filtypenavne",
                        },
                        {
                            Id: "LIT_MOBILE_SELECT_FILE",
                            defaultText: "Vælg fil",
                        },
                        {
                            Id: "MSG_MOBILE_NO_DOCUMENTS_FOUND",
                            defaultText: "Ingen linkede dokumenter fundet",
                        },
                        {
                            Id: "MSG_MOBILE_DOCUMENT_SIGN_ERROR",
                            defaultText: "Ingen linkede dokumenter fundet",
                        },
                        {
                            Id: "LIT_CANCEL",
                            defaultText: "Annuller",
                        },
                        {
                            Id: "LIT_MOBILE_READ_AGAIN",
                            defaultText: "Læs igen",
                        },
                        {
                            Id: "MSG_MOBILE_MISSING_REGISTRATION",
                            defaultText: "Du mangler registrering i __X__ dage",
                        },
                        {
                            Id: "LIT_MOBILE_YOUR_HISTORY",
                            defaultText: "Din historie",
                        },
                        {
                            Id: "LIT_MOBILE_SHOW_MORE",
                            defaultText: "Vis mere",
                        },
                        {
                            Id: "LIT_MOBILE_SHOW_LESS",
                            defaultText: "Vis mindre",
                        },
                        {
                            Id: "LIT_MOBILE_YESTERDAY",
                            defaultText: "I går",
                        },
                        {
                            Id: "MSG_MOBILE_NO_ACTIVE_SURVEY",
                            defaultText: "Ingen aktiv undersøgelse fundet",
                        },
                        {
                            Id: "LIT_MOBILE_HISTORY",
                            defaultText: "Historie",
                        },
                        {
                            Id: "LIT_MOBILE_CURRENT_SURVEY",
                            defaultText: "Aktuel undersøgelse",
                        },
                        {
                            Id: "MSG_MOBILE_NO_ANSWERED_SURVEY",
                            defaultText: "Ingen besvaret undersøgelse fundet",
                        },
                        {
                            Id: "LIT_MOBILE_SURVEY_HEADER",
                            defaultText: "Undersøgelse / Daglig Tilfredshed",
                        },
                        {
                            Id: "LIT_MOBILE_TODAY",
                            defaultText: "I dag",
                        },
                        {
                            Id: "MSG_MOBILE_SURVEY_ANSWERED_MESSAGE",
                            defaultText: "Undersøgelsen ${surveyName} er besvaret i dag",
                        },
                        {
                            Id: "MSG_MOBILE_SIGN_DOCUMENT_MESSAGE",
                            defaultText:
                                "Underskriv venligst nedenfor, at du har læst dokumentet'",
                        },
                        {
                            Id: "LIT_MOBILE_SIGNED_LIST",
                            defaultText: "Underskrevet dokumentliste",
                        },
                        {
                            Id: "LIT_MOBILE_TO_BE_SIGNED",
                            defaultText: "Klar til at underskrive",
                        },
                        {
                            Id: "LIT_MOBILE_NO_SIGN_NEEDED",
                            defaultText: "Intet tegn nødvendigt",
                        },
                        {
                            Id: "LIT_MOBILE_FINISHED",
                            defaultText: "Færdig",
                        },
                        {
                            Id: "LIT_MOBILE_BACK",
                            defaultText: "Tilbage",
                        },
                        {
                            Id: "LIT_MOBILE_SAVE",
                            defaultText: "Gem",
                        },
                        {
                            Id: "LIT_MOBILE_ADD_ITEM",
                            defaultText: "Tilføj vare",
                        },
                        {
                            Id: "LIT_MOBILE_WELCOME_TEXT",
                            defaultText: "Velkommen til Safetynet-login.",
                        },
                        {
                            Id: "LIT_MOBILE_LOGIN_WAYS",
                            defaultText: "Du kan logge ind på din organisation på to måder:",
                        },
                        {
                            Id: "LIT_MOBILE_URL_SCAN_PLACEHOLDER",
                            defaultText: "Scan for QR kode, eller indsæt Url",
                        },
                        {
                            Id: "LIT_MOBILE_TOKEN_SCAN_PLACEHOLDER",
                            defaultText: "Scan for QR kode eller Indsæt Token url",
                        },
                        {
                            Id: "LIT_OR",
                            defaultText: "Eller",
                        },
                        {
                            "Id": "MSG_MOBILE_TOKEN_INVALID",
                            "defaultText": "Din token- URL blev ikke fundet, prøv igen eller jeres SafetyNet administrator."
                        },
                        {
                            "Id": "MSG_MOBILE_URL_INVALID",
                            "defaultText": "Din __Organization__ blev ikke fundet, prøv igen eller jeres SafetyNet administrator."
                        },
                        {
                            "Id": "MSG_MOBILE_TOKEN_SUCCESS",
                            "defaultText": "Du er nu logget ind på __Organization__ Safetynet-app via en token-URL, og du sendes nu videre til appen."
                        },
                        {
                            "Id": "MSG_MOBILE_URL_SUCCESS",
                            "defaultText": "Vi sender dig nu videre til din __Organization__ Safetynet-login."
                        },
                        {
                            "Id": "LIT_MOBILE_TOGGLE",
                            "defaultText": "Skift organisation "
                        },
                        {
                            "Id": "LIT_CONTINUE",
                            "defaultText": "Fortsæt"
                        },
                        {
                            "Id": "MSG_MOBILE_WELCOME_OR",
                            "defaultText": "eller"
                        }
                    ],
                },
            ];
            return defaultResource;
        } // Contains default labels. Is used only during app update and when resource label from Web API returns undefined (Not deployed)
        // Here Text is user as a key word, as during update defaultText is not used (defaultText only for fresh install)

        function updateDefaultLabels() {
            var defaultResource = [
                {
                    resources: [
                        {
                            Id: "LIT_SAVE",
                            Text: "Gem",
                        },
                        {
                            Id: "LIT_VERSION",
                            Text: "Version",
                        },
                        {
                            Id: "LIT_PLEASE_ENTER_THE_DETAILS",
                            Text: "Please enter Username/Password !",
                        },
                        {
                            Id: "MSG_NO_CHANNELS",
                            Text: "Ingen kanaler er konfigureret. Kontakt administrator.",
                        },
                        {
                            Id: "MSG_LOGGED_OUT",
                            Text: "Du er logget ud.",
                        },
                        {
                            Id: "MSG_WAIT_TO_LOGIN",
                            Text: "Vent venligst mens vi logge dig ind",
                        },
                        {
                            Id: "MSG_MULTIPLE_USER_FOUND",
                            Text: "Kan ikke logge ind. Flere brugere fundet.",
                        },
                        {
                            Id: "LIT_ADVANCED_SETTINGS",
                            Text: "Avancerede indstillinger",
                        },
                        {
                            Id: "LIT_UPDATE_DEF",
                            Text: "Opdaterings definition",
                        },
                        {
                            Id: "MSG_UPDATE_LANG_CONFIRM",
                            Text: "Er du sikker på, at du vil ændre app sprog til __LANG__?",
                        },
                        {
                            Id: "LIT_HELP_TEXT",
                            Text: "Hjælpetekst",
                        },
                        {
                            Id: "LIT_ANONYMOUS",
                            Text: "Anonym",
                        },
                        {
                            Id: "LIT_ONLINE",
                            Text: "Online",
                        },
                        {
                            Id: "LIT_OFFLINE",
                            Text: "Offline",
                        },
                        {
                            Id: "LIT_COMPANY",
                            Text: "Selskab",
                        },
                        {
                            Id: "LIT_ENVIRONMENT",
                            Text: "Miljø",
                        },
                        {
                            Id: "LIT_DEMO",
                            Text: "DEMO",
                        },
                        {
                            Id: "LIT_CONNECT_TO",
                            Text: "Forbinde til",
                        },
                        {
                            Id: "MSG_URL_NOT_VALID",
                            Text: "Indtast venligst gyldig webadresse",
                        },
                        {
                            Id: "MSG_ENTER_CUSTOMER_DETAILS",
                            Text: "Vælg venligst / indtast kundeoplysninger",
                        },
                        {
                            Id: "MSG_DATA_NOT_VALID",
                            Text: "Indtast venligst gyldige data",
                        },
                        {
                            Id: "LIT_ALL",
                            Text: "Alle",
                        },
                        {
                            Id: "MSG_FILE_NOT_FOUND",
                            Text: "Filen mangler eller er beskadiget. Venligst download igen.",
                        },
                        {
                            Id: "MSG_ALLOW_POPUP",
                            Text: "Tillad popups til denne hjemmeside",
                        },
                        {
                            Id: "LIT_MESSAGE",
                            Text: "Besked",
                        },
                        {
                            Id: "MSG_URL_NOT_FOUND",
                            Text: "Den ønskede URL kunne ikke findes. Kontakt venligst administrator!",
                        },
                        {
                            Id: "LIT_DONE",
                            Text: "Færdig",
                        },
                        {
                            Id: "LIT_CLEAR",
                            Text: "Ryd",
                        },
                        {
                            Id: "LIT_READ_ALOUD",
                            Text: "Læse højt",
                        },
                        {
                            Id: "MSG_MOBILE_DATE_WRONG_FORMAT",
                            Text: "Indtast venligst den rigtige dato",
                        },
                        {
                            Id: "LIT_MULTI_TASK",
                            Text: "Multitaske",
                        },
                        {
                            Id: "LIT_MULTI_TASK_SOLUTION",
                            Text: "Multi Task Solution",
                        },
                        {
                            Id: "LIT_CANCEL_MULTITASK",
                            Text: "Annuller multitask",
                        },
                        {
                            Id: "LIT_SAVE_MULTITASK",
                            Text: "Gem multitask",
                        },
                        {
                            Id: "LIT_MULTITASK_ATTACHMENTS",
                            Text: "Multitask vedhæftede filer",
                        },
                        {
                            Id: "LIT_SOLUTION",
                            Text: "Opløsning",
                        },
                        {
                            Id: "MSG_MULTITASK_REQUIRED",
                            Text: "Mindste en multitaskindtastning er obligatorisk",
                        },
                        {
                            Id: "MSG_MULTITASK_MANDATORY_ANSWER",
                            Text: "Atleast One Multi Task Svar er påkrævet",
                        },
                        {
                            Id: "LIT_NEXT_UPDATE",
                            Text: "Næste opdatering",
                        },
                        {
                            Id: "LIT_TILE_DISPLAY",
                            Text: "Aktivér flisevisning",
                        },
                        {
                            Id: "MSG_UPDATE_MODULE",
                            Text: "Opdater moduler, når rolleadgangen ændres. Klik på master download for at få de seneste definitioner.",
                        },
                        {
                            Id: "MSG_TIME_WRONG_FORMAT",
                            Text: "Indtast det korrekte tidspunkt",
                        },
                        {
                            Id: "LIT_MOBILE_FAVORITES",
                            Text: "Favoritter",
                        },
                        {
                            Id: "LIT_MOBILE_NEWS",
                            Text: "Nyheder",
                        },
                        {
                            Id: "LIT_MOBILE_DISPLAY_FAVORITES",
                            Text: "Vis som favoritter som standard",
                        },
                        {
                            Id: "MSG_MOBILE_DOWNLOAD_NEWS",
                            Text: "Nyheder downloades ikke. Træk venligst ned for at downloade nyhederne.",
                        },
                        {
                            Id: "LIT_MOBILE_DEMODK",
                            Text: "DEMODK",
                        },
                        {
                            Id: "MSG_MOBILE_FAVORITES_ADDED",
                            Text: "Føjet til favoritter",
                        },
                        {
                            Id: "MSG_MOBILE_ADD_TO_FAVORITES_LINE1",
                            Text: "Du har ikke tilføjet nogen favoritter.",
                        },
                        {
                            Id: "MSG_MOBILE_ADD_TO_FAVORITES_LINE2",
                            Text: "Tilføj en favorit ved at trykke og holde nede på en guide.",
                        },
                        {
                            Id: "MSG_LOGOUT_CONFIRMTEXT",
                            Text: "Brugers afventende svar ryddes. Ønsker du at fortsætte?",
                        },
                        {
                            Id: "MSG_NEWS_UPDATE",
                            Text: "Nyheder downloades ikke.Opdater for at downloade nyhederne.",
                        },
                        {
                            Id: "MSG_MOBILE_DOWNLOAD_MODULE_LINE1",
                            Text: "Ingen moduler at vise",
                        },
                        {
                            Id: "MSG_MOBILE_DOWNLOAD_MODULE_LINE2",
                            Text: "Download venligst for at opdatere.",
                        },
                        {
                            Id: "MSG_MOBILE_CONFIRM_TO_SHOW_FAVORITE_GUIDE",
                            Text: "Du kan tilføje guider og dokumenter som favoritter for let adgang. Ønsker du en hurtig demostrering?",
                        },
                        {
                            Id: "LIT_ADD_PHOTO",
                            Text: "Tilføj et foto",
                        },
                        {
                            Id: "MSG_MOBILE_TO_THE_MAXIMUM_ATTACHMENTS_REACHED",
                            Text: "Du har nået det maksimale antal vedhæftede filer",
                        },
                        {
                            Id: "MSG_MOBILE_REMOVE_THE_ATTACHMENT",
                            Text: "Fjern en vedhæftet fil, før du tilføjer en anden.",
                        },
                        {
                            Id: "LIT_MOBILE_ENABLE_DARKMODE",
                            Text: "Aktivér mørk tilstand",
                        },
                        {
                            Id: "LIT_MOBILE_DOWNLOAD",
                            Text: "Download",
                        },
                        {
                            Id: "LIT_MOBILE_SUCCESS",
                            Text: "Fuldført",
                        },
                        {
                            Id: "LIT_MOBILE_ERROR",
                            Text: "Fejl",
                        },
                        {
                            Id: "LIT_MOBILE_REMOVE",
                            Text: "Fjern",
                        },
                        {
                            Id: "LIT_MOBILE_UPLOAD",
                            Text: "Uploader",
                        },
                        {
                            Id: "MSG_MOBILE_COLLECT_DATA",
                            Text: "Vi henter data fra SafetyNet.",
                        },
                        {
                            Id: "MSG_MOBILE_INTERNET_ERROR",
                            Text: "Noget gik galt. Tjek din internetforbindelse og prøv igen senere.",
                        },
                        {
                            Id: "MSG_MOBILE_SAVE_SETTING",
                            Text: "Ændringerne blev gemt.",
                        },
                        {
                            Id: "MSG_MOBILE_UNSAVE_SETTING",
                            Text: "Du har fortaget ændringer, som ikke er blevet gemt.",
                        },
                        {
                            Id: "MSG_MOBILE_REMOVE_FAVORITES",
                            Text: "Er du sikker på, du ønsker at fjerne denne fra favoritter?",
                        },
                        {
                            Id: "MSG_MOBILE_UPOADING_REGISTRATION",
                            Text: "Vi uploader din registrering.",
                        },
                        {
                            Id: "MSG_MOBILE_UPLOADED_REGISTRATION",
                            Text: "Din registrering blev uploadet til SafetyNet.",
                        },
                        {
                            Id: "MSG_MOBILE_PUBLISH_FAIL",
                            Text: "Ikke offentliggjort",
                        },
                        {
                            Id: "LIT_MOBILE_PICK_LOCATION",
                            Text: "Vælg placeringen",
                        },
                        {
                            Id: "LIT_MOBILE_ENABLE_LOCATION_ACCESS",
                            Text: "Aktiver adgang til enhedens placering",
                        },
                        {
                            Id: "MSG_MOBILE_READALOUD_SPEED_HANDLE",
                            Text: "Læs hastighedshåndtaget højt",
                        },
                        {
                            Id: "MSG_MOBILE_ERROR_UPLOAD",
                            Text: "Fejl uploades",
                        },
                        {
                            Id: "MSG_MOBILE_CLEAR_ERROR_LOG",
                            Text: "Er du sikker på, at du vil rydde fejlene",
                        },
                        {
                            Id: "LIT_MOBILE_CUSTOMER_ENVIRONMENT",
                            Text: "Tryk på feltet herunder for at scanne en QR-kode eller for at indsætte URL-adresse til organisations log in.",
                        },
                        {
                            Id: "LIT_MOBILE_TOKEN_LOGIN",
                            Text: "Tryk på feltet herunder, hvis du har modtaget en token-URL på e-mail, for at logge ind på organisations SafetyNet.",
                        },
                        {
                            Id: "MSG_MOBILE_LOGIN_EMPTY_TOKEN",
                            Text: "Indtast korrekt token for at fortsætte",
                        },
                        {
                            Id: "LIT_MOBILE_ALLOWED_EXTENSION",
                            Text: "Tilladte udvidelser",
                        },
                        {
                            Id: "MSG_MOBILE_ALLOWED_EXTENSION",
                            Text: "Ugyldig filtypenavn. Brug venligst en af ??de tilladte filtypenavne",
                        },
                        {
                            Id: "LIT_MOBILE_SELECT_FILE",
                            Text: "Vælg fil",
                        },
                        {
                            Id: "MSG_NO_DOCUMENTS_FOUND",
                            Text: "Ingen linkede dokumenter fundet",
                        },
                        {
                            Id: "MSG_MOBILE_DOCUMENT_SIGN_ERROR",
                            Text: "Ingen linkede dokumenter fundet",
                        },
                        {
                            Id: "LIT_CANCEL",
                            Text: "Annuller",
                        },
                        {
                            Id: "LIT_MOBILE_READ_AGAIN",
                            Text: "Læs igen",
                        },
                        {
                            Id: "MSG_MOBILE_MISSING_REGISTRATION",
                            Text: "Du mangler registrering i __X__ dage",
                        },
                        {
                            Id: "LIT_MOBILE_YOUR_HISTORY",
                            Text: "Din historie",
                        },
                        {
                            Id: "LIT_MOBILE_SHOW_MORE",
                            Text: "Vis mere",
                        },
                        {
                            Id: "LIT_MOBILE_SHOW_LESS",
                            Text: "Vis mindre",
                        },
                        {
                            Id: "LIT_MOBILE_YESTERDAY",
                            Text: "I går",
                        },
                        {
                            Id: "MSG_MOBILE_NO_ACTIVE_SURVEY",
                            Text: "Ingen aktiv undersøgelse fundet",
                        },
                        {
                            Id: "LIT_MOBILE_HISTORY",
                            Text: "Historie",
                        },
                        {
                            Id: "LIT_MOBILE_CURRENT_SURVEY",
                            Text: "Aktuel undersøgelse",
                        },
                        {
                            Id: "MSG_MOBILE_NO_ANSWERED_SURVEY",
                            Text: "Ingen besvaret undersøgelse fundet",
                        },
                        {
                            Id: "LIT_MOBILE_SURVEY_HEADER",
                            Text: "Undersøgelse / Daglig Tilfredshed",
                        },
                        {
                            Id: "MSG_MOBILE_SURVEY_ANSWERED_MESSAGE",
                            Text: "Undersøgelsen ${surveyName} er besvaret i dag",
                        },
                        {
                            Id: "MSG_MOBILE_SIGN_DOCUMENT_MESSAGE",
                            Text: "Underskriv venligst nedenfor, at du har læst dokumentet'",
                        },
                        {
                            Id: "LIT_MOBILE_FINISHED",
                            Text: "Færdig",
                        },
                        {
                            Id: "LIT_MOBILE_BACK",
                            Text: "Tilbage",
                        },
                        {
                            Id: "LIT_MOBILE_SAVE",
                            Text: "Gem",
                        },
                        {
                            Id: "LIT_MOBILE_ADD_ITEM",
                            Text: "Tilføj vare",
                        },
                        {
                            Id: "LIT_MOBILE_WELCOME_TEXT",
                            Text: "Velkommen til Safetynet-login.",
                        },
                        {
                            Id: "LIT_MOBILE_LOGIN_WAYS",
                            Text: "Du kan logge ind på din organisation på to måder:",
                        },
                        {
                            Id: "LIT_MOBILE_URL_SCAN_PLACEHOLDER",
                            Text: "Scan for QR kode, eller indsæt Url",
                        },
                        {
                            Id: "LIT_MOBILE_TOKEN_SCAN_PLACEHOLDER",
                            Text: "Scan for QR kode eller Indsæt Token url",
                        },
                        {
                            Id: "LIT_OR",
                            Text: "Eller",
                        },
                        {
                            "Id": "MSG_MOBILE_TOKEN_INVALID",
                            "Text": "Din token- URL blev ikke fundet, prøv igen eller jeres SafetyNet administrator."
                        },
                        {
                            "Id": "MSG_MOBILE_URL_INVALID",
                            "Text": "Din __Organization__ blev ikke fundet, prøv igen eller jeres SafetyNet administrator."
                        },
                        {
                            "Id": "MSG_MOBILE_TOKEN_SUCCESS",
                            "Text": "Du er nu logget ind på __Organization__ Safetynet-app via en token-URL, og du sendes nu videre til appen."
                        },
                        {
                            "Id": "MSG_MOBILE_URL_SUCCESS",
                            "Text": "Vi sender dig nu videre til din __Organization__ Safetynet-login."
                        },
                        {
                            "Id": "LIT_MOBILE_TOGGLE",
                            "Text": "Skift organisation "
                        },
                        {
                            "Id": "LIT_CONTINUE",
                            "Text": "Fortsæt"
                        },
                        {
                            "Id": "MSG_MOBILE_WELCOME_OR",
                            "Text": "eller"
                        }
                    ],
                },
            ];
            return defaultResource;
        }

        function defaultIcons() {
            var icons = [
                {
                    Id: "Home",
                    defaultIcon: "ion-android-home",
                },
                {
                    Id: "Navigation",
                    defaultIcon: "ion-navicon",
                },
                {
                    Id: "Setting",
                    defaultIcon: "ion-android-more-vertical",
                },
                {
                    Id: "Download",
                    defaultIcon: "ion-ios-cloud-download-outline",
                },
                {
                    Id: "User",
                    defaultIcon: "ion-person",
                },
                {
                    Id: "Department",
                    defaultIcon: "ion-social-buffer-outline",
                },
                {
                    Id: "Toggle",
                    defaultIcon: "ion-loop",
                },
                {
                    Id: "Search",
                    defaultIcon: "ion-search",
                },
                {
                    Id: "NoData",
                    defaultIcon: "ion-android-alert",
                },
                {
                    Id: "MyProfile",
                    defaultIcon: "ion-android-person",
                },
                {
                    Id: "Email",
                    defaultIcon: "ion-android-mail",
                },
                {
                    Id: "Help",
                    defaultIcon: "ion-help-circled",
                },
                {
                    Id: "LogOut",
                    defaultIcon: "ion-log-out",
                },
                {
                    Id: "Active",
                    defaultIcon: "ion-ios-pulse-strong",
                },
                {
                    Id: "InProgress",
                    defaultIcon: "ion-ios-compose",
                },
                {
                    Id: "Completed",
                    defaultIcon: "ion-ios-cloud-upload",
                },
                {
                    Id: "Calender",
                    defaultIcon: "ion-ios-calendar-outline",
                },
                {
                    Id: "DropDown",
                    defaultIcon: "ion-chevron-down",
                },
                {
                    Id: "Attachment",
                    defaultIcon: "ion-paperclip",
                },
                {
                    Id: "Delete",
                    defaultIcon: "ion-android-delete",
                },
                {
                    Id: "Camera",
                    defaultIcon: "ion-ios-camera",
                },
                {
                    Id: "Folder",
                    defaultIcon: "ion-folder",
                },
                {
                    Id: "HelpInfo",
                    defaultIcon: "ion-ios-information-outline",
                },
                {
                    Id: "Close",
                    defaultIcon: "ion-ios-close-empty",
                },
                {
                    Id: "AppSetting",
                    defaultIcon: "ion-android-settings",
                },
                {
                    Id: "Positive",
                    defaultIcon: "ion-ios-checkmark-empty",
                },
                {
                    Id: "Negative",
                    defaultIcon: "ion-ios-close-empty",
                },
                {
                    Id: "NewOutline",
                    defaultIcon: "ion-ios-plus-outline",
                },
                {
                    Id: "New",
                    defaultIcon: "ion-ios-plus",
                },
                {
                    Id: "CompletedOutline",
                    defaultIcon: "ion-ios-cloud-upload-outline",
                },
                {
                    Id: "Preview",
                    defaultIcon: "ion-ios-eye-outline",
                },
                {
                    Id: "InprogressOutline",
                    defaultIcon: "ion-ios-compose-outline",
                },
                {
                    Id: "DeleteAnswer",
                    defaultIcon: "ion-ios-close",
                },
                {
                    Id: "CameraOutline",
                    defaultIcon: "ion-ios-camera-outline",
                },
                {
                    Id: "Timer",
                    defaultIcon: "ion-ios-time-outline",
                },
                {
                    Id: "Reset",
                    defaultIcon: "ion-ios-refresh-outline",
                },
                {
                    Id: "Pdf",
                    defaultIcon: "ion-document",
                },
                {
                    Id: "ShowDependency",
                    defaultIcon: "ion-ios-information-outline",
                },
                {
                    Id: "CloseCircled",
                    defaultIcon: "ion-close-circled",
                },
                {
                    Id: "Refresh",
                    defaultIcon: "ion-refresh",
                },
                {
                    Id: "Minus",
                    defaultIcon: "ion-minus",
                },
                {
                    Id: "Plus",
                    defaultIcon: "ion-plus",
                },
                {
                    Id: "Document",
                    defaultIcon: "ion-android-document",
                },
                {
                    Id: "LinkOutline",
                    defaultIcon: "ion-link",
                },
                {
                    Id: "Html",
                    defaultIcon: "ion-android-list",
                },
                {
                    Id: "ArrorDropDown",
                    defaultIcon: "ion-android-arrow-dropdown",
                },
                {
                    Id: "ArrorDropRight",
                    defaultIcon: "ion-android-arrow-dropright",
                },
                {
                    Id: "AndroidDone",
                    defaultIcon: "ion-android-done",
                },
                {
                    Id: "NewsNotification",
                    defaultIcon: "ion-android-notifications",
                },
                {
                    Id: "Favorite",
                    defaultIcon: "ion-android-star",
                },
                {
                    Id: "Swap",
                    defaultIcon: "ion-arrow-swap",
                },
                {
                    Id: "Scanner",
                    defaultIcon: "ion-qr-scanner",
                },
                {
                    Id: "Flip",
                    defaultIcon: "ion-ios-reverse-camera-outline",
                },
                {
                    Id: "Flash",
                    defaultIcon: "ion-flash",
                },
                {
                    Id: "ScannerClose",
                    defaultIcon: "ion-close",
                },
            ];
            return icons;
        }

        var privateMethods = {
            addEvaluatingForPov: function addEvaluatingForPov(
                evalList,
                userId,
                pov,
                qId
            ) {
                var offlineDb = localStorage.OfflineStorage;
                var evaluatingForPovCollection =
                    offlineDb.getCollection("EvaluatingForPov");
                var updateEvalForPovList = [];
                var insertEvalForPovList = [];

                for (var i = 0; i < evalList.length; i++) {
                    var evalItem = evalList[i];
                    var evaluatingFor = evaluatingForPovCollection.findOne({
                        $and: [
                            {
                                qId: {
                                    $eq: qId,
                                },
                            },
                            {
                                userId: {
                                    $eq: userId,
                                },
                            },
                            {
                                povName: {
                                    $eq: pov,
                                },
                            },
                            {
                                evalId: {
                                    $eq: evalItem,
                                },
                            },
                        ],
                    });

                    if (evaluatingFor !== null) {
                        evaluatingFor.qId = qId;
                        evaluatingFor.povName = pov;
                        evaluatingFor.evalId = evalItem;
                        evaluatingFor.userId = userId;
                        updateEvalForPovList.push(evaluatingFor);
                    } else {
                        var evaluatingForNew = {
                            qId: qId,
                            povName: pov,
                            evalId: evalItem,
                            userId: userId,
                        };
                        insertEvalForPovList.push(evaluatingForNew);
                    }
                }

                if (updateEvalForPovList.length > 0) {
                    evaluatingForPovCollection.update(updateEvalForPovList);
                }

                if (insertEvalForPovList.length > 0) {
                    evaluatingForPovCollection.insert(insertEvalForPovList);
                }
            },
            addQuestionTriggers: function addQuestionTriggers(
                questionTriggers,
                questionId
            ) {
                var offlineDb = localStorage.OfflineStorage;
                var questionTriggerColl = offlineDb.getCollection("QuestionTrigger");
                questionTriggerColl.removeWhere(function (qt) {
                    return qt.questionId === questionId;
                });
                var triggersList = [];

                for (var i = 0; i < questionTriggers.length; i++) {
                    var qt = questionTriggers[i];
                    var questionTriggerEntry = {
                        questionId: questionId,
                        triggerQuestionId: qt.TriggerQuestionId,
                        triggerAnswerId: qt.TriggerAnswerId,
                        triggerAnswerTextCode: qt.TriggerAnswerTextCode,
                    };
                    triggersList.push(questionTriggerEntry);
                }

                questionTriggerColl.insert(triggersList);
            },
            addAnswerOption: function addAnswerOption(answerOptions, id, type) {
                var offlineDb = localStorage.OfflineStorage;
                var answerOptionCollection = offlineDb.getCollection("AnswerOption");
                var answerOptionInsert = [];
                var answerOptionUpdate = []; //if (answerOptions != null) {

                for (var i = 0; i < answerOptions.length; i++) {
                    var answerOptionData = answerOptions[i];

                    if (type === "questionData") {
                        answerOptionData.QuestionId = id;
                    } else {
                        answerOptionData.AnswerGroupId = id;
                    }

                    var aoExists = answerOptionCollection.findOne({
                        Id: {
                            $eq: answerOptionData.Id,
                        },
                    });

                    if (aoExists != null) {
                        aoExists.questionId = answerOptionData.QuestionId;
                        aoExists.answerGroupId = answerOptionData.AnswerGroupId;
                        aoExists.text = answerOptionData.Text;
                        aoExists.imageFileBase64 = answerOptionData.ImageFileBase64;
                        aoExists.sortOrder = answerOptionData.SortOrder;
                        aoExists.colourCode = answerOptionData.ColourCode;
                        aoExists.commentRequired = answerOptionData.CommentRequired;
                        aoExists.fileAttachmentRequired =
                            answerOptionData.FileAttachmentRequired;
                        aoExists.createdDate = answerOptionData.CreatedDate;
                        answerOptionUpdate.push(aoExists);
                    } else {
                        var ao = {
                            Id: answerOptionData.Id,
                            questionId: answerOptionData.QuestionId,
                            answerGroupId: answerOptionData.AnswerGroupId,
                            text: answerOptionData.Text,
                            imageFileBase64: answerOptionData.ImageFileBase64,
                            sortOrder: answerOptionData.SortOrder,
                            colourCode: answerOptionData.ColourCode,
                            commentRequired: answerOptionData.CommentRequired,
                            fileAttachmentRequired: answerOptionData.FileAttachmentRequired,
                            createdDate: answerOptionData.CreatedDate,
                        };
                        answerOptionInsert.push(ao);
                    }
                } //}

                answerOptionCollection.insert(answerOptionInsert);
                answerOptionCollection.update(answerOptionUpdate);
            },
            getIfPointOfViewIsUsedByActionPlan:
                function getIfPointOfViewIsUsedByActionPlan(pointOfView, evalId) {
                    var tableName = pointOfView;

                    if (pointOfView === "Manager") {
                        tableName = "Person";
                    }

                    var loggedInUser = localStorage.getUserNameByLoggedInTimeStamp();
                    var personId = loggedInUser.personId;
                    var offlineDb = localStorage.OfflineStorage;
                    var personApwCollection = offlineDb.getCollection(
                        "PersonActionPlanWizard"
                    );
                    var otherPersonsApwCollection = personApwCollection.find({
                        personId: {
                            $ne: personId,
                        },
                    });
                    var personApwStepCollection = offlineDb.getCollection(
                        "PersonActionPlanWizardStepAnswer"
                    );
                    var apwCollection = offlineDb.getCollection(
                        "ActionPlanWizardStepColumn"
                    );
                    var actionPlanWizardStepColumns = apwCollection.find({
                        text: {
                            $eq: "Person",
                        },
                    });

                    for (var i = 0; i < actionPlanWizardStepColumns.length; i++) {
                        var stepColumn = actionPlanWizardStepColumns[i];
                        var columnId = stepColumn.columnId;

                        for (var j = 0; j < otherPersonsApwCollection.length; j++) {
                            var personApw = otherPersonsApwCollection[j];
                            var personApwId = personApw.Id;
                            var personStepAnswers = personApwStepCollection.find({
                                newActionPlanEntityId: {
                                    $eq: personApwId,
                                },
                            });
                            var stepAnswersLength = personStepAnswers.find({
                                $and: [
                                    {
                                        columnId: {
                                            $eq: columnId,
                                        },
                                    },
                                    {
                                        answerId: {
                                            $eq: evalId,
                                        },
                                    },
                                ],
                            }).length;

                            if (stepAnswersLength > 0) {
                                return true;
                            }
                        }
                    }

                    return false;
                },
            getIsEvaluatingItemExistsForOtherUsersInActionPlanProblems:
                function getIsEvaluatingItemExistsForOtherUsersInActionPlanProblems(
                    evalId,
                    pointOfView
                ) {
                    var loggedInUser = localStorage.getUserNameByLoggedInTimeStamp();
                    var userId = loggedInUser.userId;
                    var offlineDb = localStorage.OfflineStorage;
                    var tableName = pointOfView;

                    if (pointOfView === "Manager") {
                        tableName = "Person";
                    }

                    var personCollection = offlineDb.getCollection("Person");
                    var isPointOfViewUsedByOtherUsersInActionPlan =
                        this.getIfPointOfViewIsUsedByActionPlan(pointOfView);
                    return isPointOfViewUsedByOtherUsersInActionPlan;
                },
            getIsEvaluatingItemExistsForOtherUsersInQuestionnaires:
                function getIsEvaluatingItemExistsForOtherUsersInQuestionnaires(
                    qId,
                    evalId,
                    pointOfView
                ) {
                    var loggedInUser = localStorage.getUserNameByLoggedInTimeStamp();
                    var userId = loggedInUser.userId;
                    var offlineDb = localStorage.OfflineStorage;
                    var evalCollection = offlineDb.getCollection("EvaluatingFor");
                    var evalListItem = evalCollection.find({
                        $and: [
                            {
                                userId: {
                                    $ne: userId,
                                },
                            },
                            {
                                qId: {
                                    $eq: qId,
                                },
                            },
                            {
                                pointOfView: {
                                    $eq: pointOfView,
                                },
                            },
                        ],
                    });

                    for (var i = 0; i < evalListItem.length; i++) {
                        var evalItem = evalListItem[i];
                        var evalList = evalItem.evaluatingForIds.split("|");

                        if (evalList.indexOf(evalId) >= 0) {
                            return true;
                        }
                    }

                    return false;
                },
            getEvaluatingList: function getEvaluatingList(userId, qId, pointOfView) {
                var offlineDb = localStorage.OfflineStorage;
                var evalCollection = offlineDb.getCollection("EvaluatingFor");
                var evalItem = evalCollection.findOne({
                    $and: [
                        {
                            userId: {
                                $eq: userId,
                            },
                        },
                        {
                            qId: {
                                $eq: qId,
                            },
                        },
                    ],
                });
                var evalList = evalItem.evaluatingForIds.split("|");
                return evalList;
            },
            addManager: function addManager(manager) {
                var offlineDb = localStorage.OfflineStorage;
                var managerColl = offlineDb.getCollection("Manager");
                var managerSource = managerColl.findOne({
                    Id: {
                        $eq: manager.Id,
                    },
                });

                if (managerSource != null) {
                    managerSource.text = manager.Text;
                    managerColl.update(managerSource);
                } else {
                    managerColl.insert({
                        Id: manager.Id,
                        text: manager.Text,
                    });
                }
            },
            addManager2QuestionnaireEvaluatingFor:
                function addManager2QuestionnaireEvaluatingFor(
                    manager2QueItemList,
                    userId,
                    qId
                ) {
                    var offlineDb = localStorage.OfflineStorage;
                    var manager2QuestionnaireEvaluatingForColl = offlineDb.getCollection(
                        "Manager2Questionnaire"
                    );
                    var ids = [];

                    for (var i = 0; i < manager2QueItemList.length; i++) {
                        ids.push(manager2QueItemList[i].Id);
                        this.addManager(manager2QueItemList[i]);
                    }

                    var concatIds = ids.join("|");
                    var evalItem = manager2QuestionnaireEvaluatingForColl.findOne({
                        $and: [
                            {
                                userId: {
                                    $eq: userId,
                                },
                            },
                            {
                                qId: {
                                    $eq: qId,
                                },
                            },
                        ],
                    });

                    if (evalItem === null) {
                        manager2QuestionnaireEvaluatingForColl.insert({
                            userId: userId,
                            qId: qId,
                            evaluatingForIds: concatIds,
                        });
                    } else {
                        evalItem.evaluatingForIds = concatIds;
                        manager2QuestionnaireEvaluatingForColl.update(evalItem);
                    }
                },
            addEvaluatingFor: function addEvaluatingFor(
                evalList,
                userId,
                qId,
                pointOfView
            ) {
                var offlineDb = localStorage.OfflineStorage;
                var evalCollection = offlineDb.getCollection("EvaluatingFor");
                var evalItem = evalCollection.findOne({
                    $and: [
                        {
                            userId: {
                                $eq: userId,
                            },
                        },
                        {
                            qId: {
                                $eq: qId,
                            },
                        },
                    ],
                });

                if (evalItem != null) {
                    var evals = evalItem.evaluatingForIds;
                    var evalArray = evals.split("|");

                    for (var i = 0; i < evalList.length; i++) {
                        var evalId = evalList[i];

                        if (evalArray.indexOf(evalId) === -1) {
                            evalArray.push(evalId);
                        }
                    }

                    evalItem.evaluatingForIds = evalArray.join("|");
                    evalItem.qId = qId;
                    evalItem.pointOfView = pointOfView;
                    evalCollection.update(evalItem);
                } else {
                    var evals = evalList.join("|");
                    var userEval = {
                        userId: userId,
                        qId: qId,
                        evaluatingForIds: evals,
                        pointOfView: pointOfView,
                    };
                    evalCollection.insert(userEval);
                }
            },
            removeDepartment: function removeDepartment(departmentList) {
                var offlineDb = localStorage.OfflineStorage;
                var departmentCollection = offlineDb.getCollection("Department");
                var usersdepartments = departmentCollection.find({
                    Id: {
                        $in: departmentList,
                    },
                });

                for (var i = 0; i < usersdepartments.length; i++) {
                    departmentCollection.remove(usersdepartments[i]);
                }

                return usersdepartments;
            },
            getUsersCommonDepartments: function getUsersCommonDepartments(
                usersDepartments,
                userId
            ) {
                var offlineDb = localStorage.OfflineStorage;
                var userDepartmentCollection =
                    offlineDb.getCollection("UserDepartments");
                var commonDepartmentsBetweenUsers = [];
                var usersDeptList = userDepartmentCollection.find({
                    userId: {
                        $ne: userId,
                    },
                });

                for (var i = 0; i < usersDeptList.length; i++) {
                    var user = usersDeptList[i];
                    var depts = user.departmentIds;
                    var deptArray = depts.split("|");

                    for (var j = 0; j < deptArray.length; j++) {
                        var othersDept = deptArray[j];

                        if (usersDepartments.indexOf(othersDept) >= 0) {
                            commonDepartmentsBetweenUsers.push(othersDept);
                        }
                    }
                }

                return commonDepartmentsBetweenUsers;
            },
            getUniqueDepartmentsList: function getUniqueDepartmentsList(
                userDepartments,
                commonDepartments
            ) {
                for (var i = 0; i < commonDepartments.length; i++) {
                    var commonDept = commonDepartments[i];
                    var elementIndex = userDepartments.indexOf(commonDept);

                    if (elementIndex >= 0) {
                        if (elementIndex > -1) {
                            userDepartments.splice(elementIndex, 1);
                        }
                    }
                }

                return userDepartments;
            },
            removeUserDepartments: function removeUserDepartments(userId) {
                var offlineDb = localStorage.OfflineStorage;
                var userDepartmentCollection =
                    offlineDb.getCollection("UserDepartments");
                var usersDepartments = [];
                var userDeptList = userDepartmentCollection.findOne({
                    userId: {
                        $eq: userId,
                    },
                });
                var usersDeptArray = userDeptList.departmentIds.split("|");
                userDeptList.departmentIds = "";
                return usersDeptArray;
            },
            addUserPersons: function addUserPersons(personsList, userId) {
                var offlineDb = localStorage.OfflineStorage;
                var userPersonsCollection = offlineDb.getCollection("UserPersons");
                var singlePersonDetailExists = userPersonsCollection.findOne({
                    userId: {
                        $eq: userId,
                    },
                });

                if (singlePersonDetailExists != null) {
                    singlePersonDetailExists.userId = userId;
                    var persons = singlePersonDetailExists.personIds;
                    var personArray = persons.split("|");

                    for (var i = 0; i < personsList.length; i++) {
                        var personId = personsList[i];

                        if (personArray.indexOf(personId) === -1) {
                            personArray.push(personId);
                        }
                    }

                    singlePersonDetailExists.personIds = personArray.join("|");
                    userPersonsCollection.update(singlePersonDetailExists);
                } else {
                    var persons = personsList.join("|");
                    var uPerson = {
                        userId: userId,
                        personIds: persons,
                    };
                    userPersonsCollection.insert(uPerson);
                }
            },
            addUserDepartments: function addUserDepartments(deptList, userId) {
                var offlineDb = localStorage.OfflineStorage;
                var userDepartmentCollection =
                    offlineDb.getCollection("UserDepartments");
                var singleDepartmentDetailExists = userDepartmentCollection.findOne({
                    userId: {
                        $eq: userId,
                    },
                });

                if (singleDepartmentDetailExists != null) {
                    singleDepartmentDetailExists.userId = userId;
                    var depts = singleDepartmentDetailExists.departmentIds;
                    var deptArray = depts.split("|");

                    for (var i = 0; i < deptList.length; i++) {
                        var deptId = deptList[i];

                        if (deptArray.indexOf(deptId) === -1) {
                            deptArray.push(deptId);
                        }
                    }

                    singleDepartmentDetailExists.departmentIds = deptArray.join("|");
                    userDepartmentCollection.update(singleDepartmentDetailExists);
                } else {
                    var depts = deptList.join("|");
                    var uDept = {
                        userId: userId,
                        departmentIds: depts,
                    };
                    userDepartmentCollection.insert(uDept);
                }
            },
            removeUserApplications: function removeUserApplications(userId) {
                var offlineDb = localStorage.OfflineStorage;
                var userApplicationCollection =
                    offlineDb.getCollection("UserApplications");
                var appId = userApplicationData.Id;
                var appCollection = offlineDb.getCollection("Application");
                var apps = appCollection.data;

                for (var i = 0; i < apps.length; i++) {
                    var application = apps[i];
                    var applicationId = application.Id;
                    var userApplication = userApplicationCollection.find({
                        $and: [
                            {
                                userId: {
                                    $ne: userId,
                                },
                            },
                            {
                                applicationId: {
                                    $eq: applicationId,
                                },
                            },
                        ],
                    });

                    if (userApplication === null) {
                        appCollection.remove(application);
                        userApplicationCollection.remove(userApp);
                    }
                }
            },
            addUserApplication: function addUserApplication(
                userApplicationData,
                userId
            ) {
                var offlineDb = localStorage.OfflineStorage;
                var userApplicationCollection =
                    offlineDb.getCollection("UserApplications");
                var appId = userApplicationData.Id;
                var singleApplicationDetailExists = userApplicationCollection.findOne({
                    $and: [
                        {
                            userId: {
                                $eq: userId,
                            },
                        },
                        {
                            applicationId: {
                                $eq: appId,
                            },
                        },
                    ],
                });

                if (singleApplicationDetailExists != null) {
                    singleApplicationDetailExists.applicationId = userApplicationData.Id;
                    singleApplicationDetailExists.includeSubDepartments =
                        userApplicationData.IncludeSubDepartments;
                    singleApplicationDetailExists.isApplicationModuleDisable = false;
                    userApplicationCollection.update(singleApplicationDetailExists);
                } else {
                    var uApp = {
                        userId: userId,
                        applicationId: userApplicationData.Id,
                        includeSubDepartments: userApplicationData.IncludeSubDepartments,
                        isApplicationModuleDisable: false,
                    };
                    userApplicationCollection.insert(uApp);
                }
            },
            deletePerson: function deletePerson(personId) {
                var offlineDb = localStorage.OfflineStorage;
                var personCollection = offlineDb.getCollection("Person");
                personCollection.removeWhere(function (person) {
                    return person.Id === personId;
                });
            },
            addPerson: function addPerson(personDataCollection) {
                var offlineDb = localStorage.OfflineStorage;
                var personCollection = offlineDb.getCollection("Person");
                var personInserts = [];
                var personUpdates = [];
                var userPersons = [];

                for (var i = 0; i < personDataCollection.length; i++) {
                    var personData = personDataCollection[i];
                    var person = personCollection.findOne({
                        Id: {
                            $eq: personData.Id,
                        },
                    });
                    userPersons.push(personData.Id);

                    if (person != null) {
                        person.text = personData.Text;
                        person.isOwner = personData.IsOwner;
                        person.isMyManager = personData.IsMyManager;
                        person.isResponsible = personData.IsResponsible;
                        person.isPointOfView = personData.IsPointOfView;
                        person.isFile = personData.IsFile;
                        person.isFileUser = personData.IsFileUser;
                        person.isSubEntity = personData.IsSubEntity;
                        personUpdates.push(person);
                    } else {
                        var person = {
                            Id: personData.Id,
                            text: personData.Text,
                            isOwner: personData.IsOwner,
                            isMyManager: personData.IsMyManager,
                            isResponsible: personData.IsResponsible,
                            isPointOfView: personData.IsPointOfView,
                            isFile: personData.IsFile,
                            isSubEntity: personData.IsSubEntity,
                            isFileUser: personData.IsFileUser,
                        };
                        personInserts.push(person);
                    }
                }

                personCollection.update(personUpdates);
                personCollection.insert(personInserts);
                return userPersons;
            },
            addDepartmentDetails: function addDepartmentDetails(departmentDataList) {
                var offlineDb = localStorage.OfflineStorage;
                var departmentCollection = offlineDb.getCollection("Department");
                var deptInserts = [];
                var deptUpdates = [];
                var userDepartments = [];

                for (var i = 0; i < departmentDataList.length; i++) {
                    var departmentData = departmentDataList[i];
                    userDepartments.push(departmentData.Id);
                    var departmentExists = departmentCollection.findOne({
                        Id: {
                            $eq: departmentData.Id,
                        },
                    });

                    if (departmentExists != null) {
                        departmentExists.text = departmentData.Text;
                        departmentExists.level = departmentData.Level;
                        departmentExists.parentId = departmentData.ParentId;
                        departmentExists.isSubEntity = departmentData.IsSubEntity;
                        deptUpdates.push(departmentExists);
                    } else {
                        var dept = {
                            Id: departmentData.Id,
                            text: departmentData.Text,
                            level: departmentData.Level,
                            parentId: departmentData.ParentId,
                            isSubEntity: departmentData.IsSubEntity,
                        };
                        deptInserts.push(dept);
                    }
                }

                departmentCollection.update(deptUpdates);
                departmentCollection.insert(deptInserts);
                return userDepartments;
            },
            addCustomer: function addCustomer(
                customerData,
                custName,
                onlineVal,
                isCustomUrlEnabled
            ) {
                var offlineDb = localStorage.OfflineStorage;
                var customerCollection = offlineDb.getCollection("Customers"); // Adding this check as SupportMail field is not yet deployed to production (< 162),
                // will return undefined .Can be removed once deployed

                var supportMailValue = "support@safetyNet.dk";

                if (customerData.SupportMail) {
                    supportMailValue = customerData.SupportMail;
                } // Adding this check as IsGeoLocationEnabled field is not yet deployed to production, as it
                // will return undefined .Can be removed once deployed

                var isGeoLocation = false; // Adding default value as Web API doesnot return a value

                if (customerData.EnableGeoLocation) {
                    isGeoLocation = customerData.EnableGeoLocation;
                }

                var enableHighAccuracy = false;

                if (customerData.EnableGeoLocationHighAccuracy) {
                    enableHighAccuracy = customerData.EnableGeoLocationHighAccuracy;
                }

                var geoTimeOut = 10000; // Adding default value as Web API doesnot return a value

                if (customerData.GeoLocationTimeout) {
                    geoTimeOut = customerData.GeoLocationTimeout;
                }

                var disableLogPanel = false;

                if (customerData.DisableLoginPanel) {
                    disableLogPanel = customerData.DisableLoginPanel;
                }

                var isDarkModeEnable = false;

                if (customerData.EnableDarkMode) {
                    isDarkModeEnable = customerData.EnableDarkMode;
                }

                var isReadAloud = false;

                if (customerData.IsReadAloudTextEnabled) {
                    isReadAloud = customerData.IsReadAloudTextEnabled;
                }

                var isTileDisplayEnable = false;

                if (customerData.EnableTileDisplay) {
                    isTileDisplayEnable = customerData.EnableTileDisplay;
                }

                var nextUpdate = null;

                if (customerData.NextAutoUpdateInDays) {
                    nextUpdate = customerData.NextAutoUpdateInDays;
                }

                var disableGalleryUpload = false;

                if (customerData.DisableReadImageFromPhotoLibary) {
                    disableGalleryUpload = customerData.DisableReadImageFromPhotoLibary;
                }

                var enableTreeView = false;

                if (customerData.EnableTreeView) {
                    enableTreeView = customerData.EnableTreeView;
                }

                var enableNextAutoUpdate = false;

                if (customerData.EnableNextAutoUpdate) {
                    enableNextAutoUpdate = customerData.EnableNextAutoUpdate;
                }

                var disableUserSetting = false;

                if (customerData.DisableUserSetting) {
                    disableUserSetting = customerData.DisableUserSetting;
                }

                var bgColorCode = "#ededed";

                if (customerData.BgColourCode) {
                    bgColorCode = customerData.BgColourCode;
                }

                var darkBgColorCode = "#121212";

                if (customerData.DarkBgColourCode) {
                    darkBgColorCode = customerData.DarkBgColourCode;
                }

                var darkHeaderColorCode = "#000000";

                if (customerData.DarkHeaderColourCode) {
                    darkHeaderColorCode = customerData.DarkHeaderColourCode;
                }

                var darkTileColorCode = "#1F1F1F";

                if (customerData.DarkTileColourCode) {
                    darkTileColorCode = customerData.DarkTileColourCode;
                }

                var darkButtonColorCode = "#323232";

                if (customerData.DarkButtonColourCode) {
                    darkButtonColorCode = customerData.DarkButtonColourCode;
                }

                var darkTextColorCode = "#f2f2f2";

                if (customerData.DarkTextColourCode) {
                    darkTextColorCode = customerData.DarkTextColourCode;
                }

                var cameraImageQuality = "50";

                if (customerData.ImageQualityInPercent) {
                    cameraImageQuality = customerData.ImageQualityInPercent;
                }

                var saveImageToGallery = false;

                if (customerData.EnableSaveImageToPhotoLibary) {
                    saveImageToGallery = customerData.EnableSaveImageToPhotoLibary;
                }

                var showFavorites = true;

                if (customerData.DisplayFavorites) {
                    showFavorites = customerData.DisplayFavorites;
                }

                var enableNews = false;

                if (customerData.EnableNews) {
                    enableNews = customerData.EnableNews;
                }

                var disableFavoritesGuide = false;

                if (customerData.DisableFavoritesGuideDisplay) {
                    disableFavoritesGuide = customerData.DisableFavoritesGuideDisplay;
                }

                var autoUploadDelayInMinutes = "0";

                if (customerData.AutoUploadDelayInMinutes) {
                    autoUploadDelayInMinutes = customerData.AutoUploadDelayInMinutes;
                }

                var enableDocumentTreeView = false;

                if (customerData.EnableDocumentTreeView) {
                    enableDocumentTreeView = customerData.EnableDocumentTreeView;
                }

                var customUrl = null;

                if (custName) customUrl = custName;

                var allowedExtensions = null;

                if (customerData.AllowedExtensions) {
                    allowedExtensions = customerData.AllowedExtensions;
                }

                var isCustomDatePickerEnabledForSurveyHistory = false;

                if (customerData.IsCustomDatePickerEnabledForSurveyHistory) {
                    isCustomDatePickerEnabledForSurveyHistory =
                        customerData.IsCustomDatePickerEnabledForSurveyHistory;
                }

                var isSurveyEnabled = false;

                if (customerData.IsSurveyEnabled) {
                    isSurveyEnabled = customerData.IsSurveyEnabled;
                }

                var isQrCodeForAssetDocEnabled = false;

                if (customerData.IsQRCodeScanForAssetLinkedDocumentEnabled) {
                    isQrCodeForAssetDocEnabled =
                        customerData.IsQRCodeScanForAssetLinkedDocumentEnabled;
                }

                var aiAssistanceGlobalLink = null;

                if (customerData.AiAssistanceGlobalLink) {
                    aiAssistanceGlobalLink = customerData.AiAssistanceGlobalLink;
                }

                var specialCharactersToMask = "*,%,#,^";

                if (customerData.SpecialCharactersToMask) {
                    specialCharactersToMask = customerData.SpecialCharactersToMask;
                }

                var isSSOEnabled = false;
                if (customerData.IsSSOEnabled) {
                    isSSOEnabled = customerData.IsSSOEnabled;
                }

                var singleCustomerExists = customerCollection.findOne({
                    custId: {
                        $eq: customerData.CustomerId,
                    },
                });

                var readAloudSpeed = 0.75 * 10;

                if (singleCustomerExists != null) {
                    singleCustomerExists.custId = customerData.CustomerId;
                    singleCustomerExists.title = customerData.Title;
                    singleCustomerExists.customerName = customerData.CustomerName;
                    singleCustomerExists.imageLogoBase64 =
                        customerData.CustomerImageLogoBase64;
                    singleCustomerExists.colourCode = customerData.ColourCode;
                    singleCustomerExists.frontPageText =
                        customerData.CustomerFrontPageText;
                    singleCustomerExists.uniqueUrlPart = custName;
                    singleCustomerExists.onlineVal = onlineVal;
                    singleCustomerExists.isAutoSyncEnabled =
                        customerData.IsAutoSyncEnabled;
                    singleCustomerExists.buttonBackColour = customerData.ButtonColourCode;
                    singleCustomerExists.cameraImageQuality = cameraImageQuality;
                    singleCustomerExists.isPasswordSaveEnabled =
                        customerData.IsPasswordSaveEnabled;
                    singleCustomerExists.saveImageToGallery = saveImageToGallery;
                    singleCustomerExists.isDemoCustomer = customerData.IsDemoCustomer;
                    singleCustomerExists.versionInfo = customerData.VersionInfo;
                    singleCustomerExists.supportMail = supportMailValue;
                    singleCustomerExists.cKey = customerData.CKey;
                    singleCustomerExists.enableGeoLocation = isGeoLocation;
                    singleCustomerExists.enableHighAccuracyForGeoLocation =
                        enableHighAccuracy;
                    singleCustomerExists.geoLocationTimeout = geoTimeOut;
                    singleCustomerExists.disableLoginPanel = disableLogPanel;
                    singleCustomerExists.isDarkModeEnable = isDarkModeEnable;
                    singleCustomerExists.isReadAloudTextEnable = isReadAloud;
                    singleCustomerExists.isTileDisplayEnable = isTileDisplayEnable;
                    singleCustomerExists.nextUpdate = nextUpdate;
                    singleCustomerExists.disableReadImageFromPhotoLibary =
                        disableGalleryUpload;
                    singleCustomerExists.enableTreeView = enableTreeView;
                    singleCustomerExists.enableNextAutoUpdate = enableNextAutoUpdate;
                    singleCustomerExists.disableUserSetting = disableUserSetting;
                    singleCustomerExists.bgColourCode = bgColorCode;
                    singleCustomerExists.displayFavorites = showFavorites;
                    singleCustomerExists.enableNews = enableNews;
                    singleCustomerExists.disableFavoritesGuide = disableFavoritesGuide;
                    singleCustomerExists.autoUploadDelayInMinutes =
                        autoUploadDelayInMinutes;
                    singleCustomerExists.readAloudSpeed = readAloudSpeed.toString();
                    singleCustomerExists.enableDocumentTreeView = enableDocumentTreeView;
                    singleCustomerExists.isCustomUrlEnabled = isCustomUrlEnabled;
                    singleCustomerExists.customUrl = customUrl;
                    singleCustomerExists.allowedExtensions = allowedExtensions;
                    singleCustomerExists.specialCharactersToMask =
                        specialCharactersToMask;
                    singleCustomerExists.specialCharactersToMask =
                        specialCharactersToMask;
                    singleCustomerExists.isCustomDatePickerEnabledForSurveyHistory =
                        isCustomDatePickerEnabledForSurveyHistory;
                    singleCustomerExists.aiAssistanceGlobalLink = aiAssistanceGlobalLink;
                    singleCustomerExists.isSurveyEnabled = isSurveyEnabled;
                    singleCustomerExists.isQrCodeForAssetDocEnabled =
                        isQrCodeForAssetDocEnabled;
                    singleCustomerExists.isSSOEnabled = isSSOEnabled;
                    customerCollection.update(singleCustomerExists);
                } else {
                    var custDetails = {
                        custId: customerData.CustomerId,
                        title: customerData.Title,
                        customerName: customerData.CustomerName,
                        imageLogoBase64: customerData.CustomerImageLogoBase64,
                        colourCode: customerData.ColourCode,
                        frontPageText: customerData.CustomerFrontPageText,
                        uniqueUrlPart: custName,
                        onlineVal: onlineVal,
                        isDarkModeEnable: isDarkModeEnable,
                        isAutoSyncEnabled: customerData.IsAutoSyncEnabled,
                        buttonBackColour: customerData.ButtonColourCode,
                        cameraImageQuality: cameraImageQuality,
                        isPasswordSaveEnabled: customerData.IsPasswordSaveEnabled,
                        saveImageToGallery: saveImageToGallery,
                        isDemoCustomer: customerData.IsDemoCustomer,
                        versionInfo: customerData.VersionInfo,
                        supportMail: supportMailValue,
                        cKey: customerData.CKey,
                        enableGeoLocation: isGeoLocation,
                        enableHighAccuracyForGeoLocation: enableHighAccuracy,
                        geoLocationTimeout: geoTimeOut,
                        disableLoginPanel: disableLogPanel,
                        isReadAloudTextEnable: isReadAloud,
                        nextUpdate: nextUpdate,
                        disableReadImageFromPhotoLibary: disableGalleryUpload,
                        enableTreeView: enableTreeView,
                        enableNextAutoUpdate: enableNextAutoUpdate,
                        disableUserSetting: disableUserSetting,
                        bgColourCode: bgColorCode,
                        darkBgColourCode: darkBgColorCode,
                        darkHeaderColourCode: darkHeaderColorCode,
                        darkTileColourCode: darkTileColorCode,
                        darkButtonColourCode: darkButtonColorCode,
                        darkTextColourCode: darkTextColorCode,
                        displayFavorites: showFavorites,
                        enableNews: enableNews,
                        disableFavoritesGuide: disableFavoritesGuide,
                        autoUploadDelayInMinutes: autoUploadDelayInMinutes,
                        readAloudSpeed: readAloudSpeed,
                        enableDocumentTreeView: enableDocumentTreeView,
                        isCustomUrlEnabled: isCustomUrlEnabled,
                        customUrl: customUrl,
                        allowedExtensions: allowedExtensions,
                        specialCharactersToMask: specialCharactersToMask,
                        isCustomDatePickerEnabledForSurveyHistory:
                            isCustomDatePickerEnabledForSurveyHistory,
                        aiAssistanceGlobalLink: aiAssistanceGlobalLink,
                        isSurveyEnabled: isSurveyEnabled,
                        isQrCodeForAssetDocEnabled: isQrCodeForAssetDocEnabled,
                        isSSOEnabled: isSSOEnabled,
                    };
                    customerCollection.insert(custDetails);
                }

                offlineDb.saveDatabase(function () {
                    //Stuff to do after the save to local storage.
                });
            },
            addApplicationDetails: function addApplicationDetails(applicationData) {
                var offlineDb = localStorage.OfflineStorage;
                var applicationCollection = offlineDb.getCollection("Application");
                var applicationExists = applicationCollection.findOne({
                    Id: {
                        $eq: applicationData.Id,
                    },
                });

                if (applicationExists != null) {
                    applicationExists.Id = applicationData.Id;
                    applicationExists.sortOrder = applicationData.SortOrder;
                    applicationExists.text = applicationData.Text;
                    applicationExists.translatedText = applicationData.TranslatedText;
                    applicationExists.imageLogoBase64 = applicationData.ImageLogoBase64;
                    applicationExists.colourCode = applicationData.ColourCode;
                    applicationExists.parentId = applicationData.ParentId;
                    applicationExists.iconClass = applicationData.IconClass;
                    applicationCollection.update(applicationExists);
                } else {
                    var application = {
                        Id: applicationData.Id,
                        sortOrder: applicationData.SortOrder,
                        text: applicationData.Text,
                        translatedText: applicationData.TranslatedText,
                        imageLogoBase64: applicationData.ImageLogoBase64,
                        colourCode: applicationData.ColourCode,
                        parentId: applicationData.ParentId,
                        iconClass: applicationData.IconClass,
                    };
                    applicationCollection.insert(application);
                }
            },
            addPreferredLanguage: function addPreferredLanguage(langCode) {
                var offlineDb = localStorage.OfflineStorage;
                var preferredLanguageCollection =
                    offlineDb.getCollection("PreferredLanguage");
                var preferredLanguageExists = preferredLanguageCollection.findOne({
                    langCode: {
                        $ne: "",
                    },
                });

                if (preferredLanguageExists != null) {
                    preferredLanguageExists.langCode = langCode;
                    preferredLanguageCollection.update(preferredLanguageExists);
                } else {
                    var pl = {
                        langCode: langCode,
                    };
                    preferredLanguageCollection.insert(pl);
                }
            },
            removeCollection: function removeCollection(collectionName) {
                var offlineDb = localStorage.OfflineStorage;
                var genCollection = offlineDb.getCollection(collectionName);

                function dummyRemove(obj) {
                    return true;
                }

                genCollection.removeWhere(dummyRemove);
            },
            addResourceLabels: function addResourceLabels(
                labelsData,
                isFreshInstall
            ) {
                var offlineDb = localStorage.OfflineStorage;
                var resourceCollection = offlineDb.getCollection("ResourceLabels");
                var resourceInsert = [];
                var resourceUpdate = [];
                var resourceExists = resourceCollection.findOne({
                    resourceId: {
                        $eq: labelsData.Id,
                    },
                });

                if (resourceExists != null) {
                    resourceExists.resourceId = labelsData.Id;

                    if (!isFreshInstall) resourceExists.resourceText = labelsData.Text;

                    if (resourceExists.resourceText == undefined) {
                        resourceExists.resourceText = labelsData.defaultText;
                    }

                    resourceUpdate.push(resourceExists);
                } else {
                    var resource = {
                        resourceId: labelsData.Id,
                        resourceText: labelsData.Text,
                        defaultText: labelsData.defaultText,
                    };
                    if (resource.resourceText == undefined) {
                        resource.resourceText = labelsData.defaultText;
                    }

                    resourceInsert.push(resource);
                }

                resourceCollection.update(resourceUpdate);
                resourceCollection.insert(resourceInsert);
            },
            addIcons: function addIcons(iconsData) {
                var offlineDb = localStorage.OfflineStorage;
                var iconsCollection = offlineDb.getCollection("Icons");
                var iconsInsert = [];
                var iconsUpdate = [];
                var iconExists = iconsCollection.findOne({
                    iconId: {
                        $eq: iconsData.Id,
                    },
                });

                if (iconExists != null) {
                    iconExists.iconId = iconsData.Id;
                    iconExists.iconText = iconsData.Text;
                    iconsUpdate.push(iconExists);
                } else {
                    var icon = {
                        iconId: iconsData.Id,
                        iconText: iconsData.Text,
                        defaultIcon: iconsData.defaultIcon,
                    };
                    iconsInsert.push(icon);
                }

                iconsCollection.update(iconsUpdate);
                iconsCollection.insert(iconsInsert);
            },
            addNewIcons: function addNewIcons(iconsData) {
                var offlineDb = localStorage.OfflineStorage;
                var iconsCollection = offlineDb.getCollection("Icons");
                var iconsInsert = [];
                var iconExists = iconsCollection.findOne({
                    iconId: {
                        $eq: iconsData.Id,
                    },
                });

                if (iconExists == null) {
                    var icon = {
                        iconId: iconsData.Id,
                        iconText: iconsData.Text,
                        defaultIcon: iconsData.defaultIcon,
                    };
                    iconsInsert.push(icon);
                }

                iconsCollection.insert(iconsInsert);
            },
            addDataTypeTableListData: function addDataTypeTableListData(
                tableName,
                dataTypeId,
                genericListData
            ) {
                var offlineDb = localStorage.OfflineStorage;
                var genericTableCollection = offlineDb.getCollection(tableName);

                if (genericListData != null) {
                    var insertList = [];
                    var updateList = [];

                    for (var j = 0; j < genericListData.length; j++) {
                        var genData = genericListData[j];
                        var genericListDataExists = genericTableCollection.findOne({
                            $and: [
                                {
                                    Id: {
                                        $eq: genData.Id,
                                    },
                                },
                                {
                                    dataTypeId: {
                                        $eq: dataTypeId,
                                    },
                                },
                            ],
                        });

                        if (genericListDataExists == null) {
                            insertList.push({
                                Id: genData.Id,
                                dataTypeId: dataTypeId,
                                text: genData.Text,
                                sortOrder: j,
                            });
                        } else {
                            genericListDataExists.Id = genData.Id;
                            genericListDataExists.text = genData.Text;
                            genericListDataExists.dataTypeId = dataTypeId;
                            genericListDataExists.sortOrder = j;
                            updateList.push(genericListDataExists);
                        }
                    }

                    genericTableCollection.insert(insertList);
                    genericTableCollection.update(updateList);
                }
            },
            addDataTypeTableEasyData: function addDataTypeTableEasyData(
                tableName,
                dataTypeId,
                genericListData
            ) {
                var offlineDb = localStorage.OfflineStorage;
                var genericTableCollection = offlineDb.getCollection(tableName);

                if (genericListData != null) {
                    var insertList = [];
                    var updateList = [];

                    for (var j = 0; j < genericListData.length; j++) {
                        var genData = genericListData[j];
                        var genericListDataExists = genericTableCollection.findOne({
                            $and: [
                                {
                                    Id: {
                                        $eq: genData.Id,
                                    },
                                },
                                {
                                    dataTypeId: {
                                        $eq: dataTypeId,
                                    },
                                },
                                {
                                    parentCode: {
                                        $eq: genData.ParentCode,
                                    },
                                },
                                {
                                    code: {
                                        $eq: genData.Code,
                                    },
                                },
                                {
                                    isSelectable: {
                                        $eq: genData.IsSelectable,
                                    },
                                },
                            ],
                        });

                        if (genericListDataExists == null) {
                            insertList.push({
                                Id: genData.Id,
                                dataTypeId: dataTypeId,
                                text: genData.Text,
                                parentCode: genData.ParentCode, // added
                                code: genData.Code, // added
                                isSelectable: genData.IsSelectable, // added
                            });
                        } else {
                            genericListDataExists.Id = genData.Id;
                            genericListDataExists.text = genData.Text;
                            genericListDataExists.dataTypeId = dataTypeId;
                            genericListDataExists.parentCode = genData.ParentCode; // added
                            genericListDataExists.code = genData.Code; // added
                            genericListDataExists.isSelectable = genData.IsSelectable; // added
                            updateList.push(genericListDataExists);
                        }
                    }

                    genericTableCollection.insert(insertList);
                    genericTableCollection.update(updateList);
                }
            },
            addInsuranceDetails: function addInsuranceDetails(
                tableName,
                dataTypeId,
                insuranceListData
            ) {
                var offlineDb = localStorage.OfflineStorage;
                var insuranceTableCollection = offlineDb.getCollection(tableName);

                if (insuranceListData != null) {
                    var insertList = [];
                    var updateList = [];

                    for (var i = 0; i < insuranceListData.length; i++) {
                        var insuranceData = insuranceListData[i];
                        var insuranceDataExists = insuranceTableCollection.findOne({
                            Id: {
                                $eq: insuranceData.Id,
                            },
                        });

                        if (insuranceDataExists == null) {
                            insertList.push({
                                Id: insuranceData.Id,
                                text: insuranceData.Text,
                                dataTypeId: dataTypeId,
                            });
                        } else {
                            insuranceDataExists.Id = insuranceData.Id;
                            insuranceDataExists.text = insuranceData.Text;
                            insuranceDataExists.dataTypeId = dataTypeId;
                            updateList.push(insuranceDataExists);
                        }
                    }

                    insuranceTableCollection.insert(insertList);
                    insuranceTableCollection.update(updateList);
                }
            },
            addDataToGenericCollection: function addDataToGenericCollection(
                tableName,
                genericListData
            ) {
                var offlineDb = localStorage.OfflineStorage;
                var genericTableCollection = offlineDb.getCollection(tableName);

                if (genericTableCollection !== null) {
                    if (genericListData != null) {
                        var insertList = [];
                        var updateList = [];

                        for (var j = 0; j < genericListData.length; j++) {
                            var genData = genericListData[j];
                            var genericListDataExists = genericTableCollection.findOne({
                                Id: {
                                    $eq: genData.Id,
                                },
                            });

                            if (genericListDataExists == null) {
                                insertList.push({
                                    Id: genData.Id,
                                    text: genData.Text,
                                });
                            } else {
                                genericListDataExists.Id = genData.Id;
                                genericListDataExists.text = genData.Text;
                                updateList.push(genericListDataExists);
                            }
                        }

                        genericTableCollection.insert(insertList);
                        genericTableCollection.update(updateList);
                    }
                }
            },
        };
        var localStorage =
            ((_localStorage = {
                OfflineStorage: null,
                Adapter: null,
                DbLoaded: false,
                newTableSchema: function newTableSchema(offlineDb) {
                    //Add definations to generic tables..
                    var fpTables = [
                        "Activity",
                        "ActivityModule",
                        "Employee",
                        "Custom",
                        "CustomerListValue1",
                        "CustomerListValue2",
                        "CustomerListValue3",
                    ];

                    for (var i = 0; i < fpTables.length; i++) {
                        var table = fpTables[i];
                        localStorage.genericTableCreation(table);
                    }

                    var errorLogTable = offlineDb.getCollection("ErrorLog");
                    if (errorLogTable === null) {
                        var errorLogTableCollection = offlineDb.addCollection("ErrorLog");
                        if (errorLogTableCollection != null) {
                            errorLogTableCollection.insert({
                                name: null,
                                message: null,
                                cause: null,
                                stack: null,
                                toStringValue: null,
                            });
                            errorLogTableCollection.removeDataOnly();
                        }
                    }

                    var docLibTable = offlineDb.getCollection("DocumentLibrary");

                    if (docLibTable === null) {
                        var docLibCollection = offlineDb.addCollection("DocumentLibrary");

                        if (docLibCollection != null) {
                            docLibCollection.insert({
                                Id: null,
                                text: null,
                                documentTypeCode: null,
                                htmlContent: null,
                                linkName: null,
                                link: null,
                                fileName: null,
                                deviceFilePath: null,
                                groupName: null,
                                groupSortOrder: null,
                                sortOrder: null,
                                extendedInfo: null,
                                encriptedFileName: null,
                            });
                        }

                        docLibCollection.removeDataOnly();
                    }

                    var custFieldTable = offlineDb.getCollection("CustomerFieldValue3");

                    if (custFieldTable === null) {
                        var offlineDb = this.OfflineStorage;
                        var custFieldCollection = offlineDb.addCollection(
                            "CustomerFieldValue3"
                        );

                        if (custFieldCollection != null) {
                            custFieldCollection.insert({
                                Id: null,
                                text: null,
                            });
                        }

                        custFieldCollection.removeDataOnly();
                    } //PersonActionPlanMultiTask

                    var personActionPlanMultiTaskColl = offlineDb.addCollection(
                        "PersonActionPlanMultiTask"
                    );

                    if (personActionPlanMultiTaskColl != null) {
                        personActionPlanMultiTaskColl.insert({
                            Id: null,
                            newActionPlanEntityId: null,
                            wizardStepId: null,
                            columnId: null,
                            answerId: null,
                            answerText: null,
                            answerDate: null,
                            defaultValue: false,
                            scope: null,
                            solution: null,
                            deadLine: null,
                            approvedDate: null,
                            assignedToId: null,
                            isEmptyMultiTask: null,
                        });
                    }

                    personActionPlanMultiTaskColl.removeDataOnly(); //PersonActionPlanWizardMultiTask Attachment

                    var personActionPlanMultiTaskAttachmentColl = offlineDb.addCollection(
                        "PersonActionPlanMultiTaskAttachment"
                    );

                    if (personActionPlanMultiTaskAttachmentColl != null) {
                        personActionPlanMultiTaskAttachmentColl.insert({
                            Id: null,
                            multiTaskEntityId: null,
                            fileName: null,
                            fileLocation: null,
                            fileSourceBase64: null,
                            internalFileLocation: null,
                            fileHeader: null,
                            isSavedToDb: false,
                        });
                    }

                    personActionPlanMultiTaskAttachmentColl.removeDataOnly(); //Favorites Collection

                    var favoriteColl = offlineDb.addCollection("Favorite");

                    if (favoriteColl != null) {
                        favoriteColl.insert({
                            itemId: null,
                            moduleName: null,
                            dlGroupName: false,
                            userSortOrder: null,
                        });
                    }

                    favoriteColl.removeDataOnly(); //News Collection

                    var newsColl = offlineDb.addCollection("News");

                    if (newsColl != null) {
                        newsColl.insert({
                            Id: null,
                            header: null,
                            teaser: null,
                            link: null,
                            groupName: null,
                            groupSortOrder: null,
                            htmlContent: null,
                            fileName: null,
                            deviceFilePath: null,
                            sortOrder: null,
                            expiryDate: null,
                            modifiedDate: null,
                            isExternal: false,
                            isRead: false,
                        });
                    }

                    newsColl.removeDataOnly(); //TempNews Collection this collection is used only when user resets the app

                    var tempNewsColl = offlineDb.addCollection("TempNews");

                    if (tempNewsColl != null) {
                        tempNewsColl.insert({
                            Id: null,
                            modifiedDate: null,
                            isRead: false,
                        });
                    }

                    tempNewsColl.removeDataOnly(); //News File Collection

                    var newsFileColl = offlineDb.addCollection("NewsFile");

                    if (newsFileColl != null) {
                        newsFileColl.insert({
                            Id: null,
                            newsId: null,
                            fileName: null,
                            deviceFilePath: null,
                        });
                    }

                    newsFileColl.removeDataOnly();

                    var chemicalCollection = offlineDb.addCollection("Chemical");

                    if (chemicalCollection != null) {
                        chemicalCollection.insert({
                            Id: null,
                            text: null,
                            filter: null,
                        });
                    }
                    chemicalCollection.removeDataOnly();

                    var actionPlanWizardColumnGuideColumn = offlineDb.addCollection(
                        "ActionPlanWizardStepColumnGuide"
                    );

                    if (actionPlanWizardColumnGuideColumn != null) {
                        actionPlanWizardColumnGuideColumn.insert({
                            Id: null,
                            apWizStepId: null,
                            text: null,
                            description: null,
                            sortOrder: -1,
                            includeQuotations: false,
                        });
                    }

                    actionPlanWizardColumnGuideColumn.removeDataOnly();

                    var vehicleDamageCol = offlineDb.addCollection("VehicleDamage");

                    if (vehicleDamageCol != null) {
                        vehicleDamageCol.insert({
                            Id: null,
                            dataTypeId: null,
                            text: null,
                        });
                    }

                    vehicleDamageCol.removeDataOnly();
                },
                addNewColumn: function addNewColumn() {
                    // Update any column changes on app update to playstore/app store.
                    // Updated for version 1.0.9
                    var allNewColumns = [
                        {
                            tableName: "Customers",
                            newColumn: [
                                {
                                    name: "supportMail",
                                    value: "support@safetyNet.dk",
                                },
                                {
                                    name: "enableGeoLocation",
                                    value: false,
                                },
                                {
                                    name: "enableHighAccuracyForGeoLocation",
                                    value: false,
                                },
                                {
                                    name: "geoLocationTimeout",
                                    value: 10000,
                                },
                                {
                                    name: "disableLoginPanel",
                                    value: false,
                                },
                                {
                                    name: "isDarkModeEnable",
                                    value: false,
                                },
                                {
                                    name: "isReadAloudTextEnable",
                                    value: false,
                                },
                                {
                                    name: "nextUpdate",
                                    value: null,
                                },
                                {
                                    name: "isTileDisplayEnable",
                                    value: false,
                                },
                                {
                                    name: "disableReadImageFromPhotoLibary",
                                    value: false,
                                },
                                {
                                    name: "enableTreeView",
                                    value: false,
                                },
                                {
                                    name: "enableNextAutoUpdate",
                                    value: false,
                                },
                                {
                                    name: "disableUserSetting",
                                    value: false,
                                },
                                {
                                    name: "bgColourCode",
                                    value: null,
                                },
                                {
                                    name: "darkBgColourCode",
                                    value: null,
                                },
                                {
                                    name: "darkHeaderColourCode",
                                    value: null,
                                },
                                {
                                    name: "darkTileColourCode",
                                    value: null,
                                },
                                {
                                    name: "darkButtonColourCode",
                                    value: null,
                                },
                                {
                                    name: "darkTextColourCode",
                                    value: null,
                                },
                                {
                                    name: "displayFavorites",
                                    value: true,
                                },
                                {
                                    name: "enableNews",
                                    value: false,
                                },
                                {
                                    name: "disableFavoritesGuide",
                                    value: false,
                                },
                                {
                                    name: "autoUploadDelayInMinutes",
                                    value: null,
                                },
                                {
                                    name: "enableDocumentTreeView",
                                    value: false,
                                },
                                {
                                    name: "isCustomUrlEnabled",
                                    value: false,
                                },
                                {
                                    name: "isSSOEnabled",
                                    value: false,
                                },
                            ],
                        },
                        {
                            tableName: "AskadeFileTypeWizard",
                            newColumn: [
                                {
                                    name: "typeCode",
                                    value: 8,
                                },
                                {
                                    name: "enablePrint",
                                    value: true,
                                },
                                {
                                    name: "enableEmail",
                                    value: true,
                                },
                                {
                                    name: "columnGuideFileTypeId",
                                    value: null,
                                },
                                {
                                    name: "autoUploadDelayInMinutes",
                                    value: null,
                                },
                                {
                                    name: "enableEditGeoLocation",
                                    value: false,
                                },
                            ],
                        },
                        {
                            tableName: "Questionnaire",
                            newColumn: [
                                {
                                    name: "translatedPointOfView",
                                    value: null,
                                },
                                {
                                    name: "answerOptionFontColour",
                                    value: null,
                                },
                                {
                                    name: "controlType",
                                    value: "Boxes",
                                },
                                {
                                    name: "columnSubType",
                                    value: null,
                                },
                                {
                                    name: "autoUploadDelayInMinutes",
                                    value: null,
                                },
                                {
                                    name: "enableEditGeoLocation",
                                    value: false,
                                },
                            ],
                        },
                        {
                            tableName: "ActionPlanWizard",
                            newColumn: [
                                {
                                    name: "enablePrint",
                                    value: true,
                                },
                                {
                                    name: "enableEmail",
                                    value: true,
                                },
                                {
                                    name: "autoUploadDelayInMinutes",
                                    value: null,
                                },
                                {
                                    name: "columnGuideCategoryId",
                                    value: null,
                                },
                                {
                                    name: "enableEditGeoLocation",
                                    value: false,
                                },
                            ],
                        },
                        {
                            tableName: "PersonActionPlanWizard",
                            newColumn: [
                                {
                                    name: "geoX",
                                    value: null,
                                },
                                {
                                    name: "geoY",
                                    value: null,
                                },
                                {
                                    name: "columnGuideCategoryId",
                                    value: null,
                                },
                                {
                                    name: "address",
                                    value: null,
                                },
                            ],
                        },
                        {
                            tableName: "PersonActionPlanWizardTemplate",
                            newColumn: [
                                {
                                    name: "geoX",
                                    value: null,
                                },
                                {
                                    name: "geoY",
                                    value: null,
                                },
                                {
                                    name: "columnGuideCategoryId",
                                    value: null,
                                },
                                {
                                    name: "address",
                                    value: null,
                                },
                            ],
                        },
                        {
                            tableName: "PersonAskadeFileTypeWizard",
                            newColumn: [
                                {
                                    name: "geoX",
                                    value: null,
                                },
                                {
                                    name: "geoY",
                                    value: null,
                                },
                                {
                                    name: "columnGuideFileTypeId",
                                    value: null,
                                },
                                {
                                    name: "address",
                                    value: null,
                                },
                            ],
                        },
                        {
                            tableName: "PersonAskadeFileTypeWizardTemplate",
                            newColumn: [
                                {
                                    name: "geoX",
                                    value: null,
                                },
                                {
                                    name: "geoY",
                                    value: null,
                                },
                                {
                                    name: "columnGuideFileTypeId",
                                    value: null,
                                },
                                {
                                    name: "address",
                                    value: null,
                                },
                            ],
                        },
                        {
                            tableName: "PersonAskadeFileTypeWizardAttachmentTemplate",
                            newColumn: [
                                {
                                    name: "fileHeader",
                                    value: null,
                                },
                            ],
                        },
                        {
                            tableName: "PersonAskadeFileTypeWizardAttachment",
                            newColumn: [
                                {
                                    name: "fileHeader",
                                    value: null,
                                },
                            ],
                        },
                        {
                            tableName: "PersonActionPlanWizardAttachmentTemplate",
                            newColumn: [
                                {
                                    name: "fileHeader",
                                    value: null,
                                },
                            ],
                        },
                        {
                            tableName: "PersonActionPlanWizardAttachment",
                            newColumn: [
                                {
                                    name: "fileHeader",
                                    value: null,
                                },
                            ],
                        },
                        {
                            tableName: "UserDetails",
                            newColumn: [
                                {
                                    name: "userPreferredLanguage",
                                    value: null,
                                },
                                {
                                    name: "enableOnlineDepartments",
                                    value: false,
                                },
                                {
                                    name: "enableOnlinePersons",
                                    value: false,
                                },
                                {
                                    name: "enableOnlineAssets",
                                    value: false,
                                },
                                {
                                    name: "enableOnlineChemicals",
                                    value: false,
                                },
                                {
                                    name: "isDemoUser",
                                    value: false,
                                },
                                {
                                    name: "notificationSubscriptionTopics",
                                    value: null,
                                },
                                {
                                    name: "localNotificationTimeInterval",
                                    value: null,
                                },
                            ],
                        },
                        {
                            tableName: "AskadeFileTypeWizardStepColumn",
                            newColumn: [
                                {
                                    name: "isDateDefaultToday",
                                    value: false,
                                },
                                {
                                    name: "isDateMaximumToday",
                                    value: false,
                                },
                                {
                                    name: "columnSubType",
                                    value: null,
                                },
                                {
                                    name: "ColumnGuides2FileTypes",
                                    value: null,
                                },
                                {
                                    name: "dependantFileColumnId",
                                    value: null,
                                },
                                {
                                    name: "dependantFileColumnValues",
                                    value: null,
                                },
                            ],
                        },
                        {
                            tableName: "ActionPlanWizardStepColumn",
                            newColumn: [
                                {
                                    name: "defaultValue",
                                    value: null,
                                },
                                {
                                    name: "isDateMaximumToday",
                                    value: false,
                                },
                            ],
                        },
                        {
                            tableName: "PersonActionPlanWizardStepAnswer",
                            newColumn: [
                                {
                                    name: "defaultValue",
                                    value: false,
                                },
                            ],
                        },
                        {
                            tableName: "PersonActionPlanWizardStepAnswer",
                            newColumn: [
                                {
                                    name: "defaultValue",
                                    value: false,
                                },
                            ],
                        },
                        {
                            tableName: "Asset",
                            newColumn: [
                                {
                                    name: "filter",
                                    value: null,
                                },
                            ],
                        },
                        {
                            tableName: "PersonAskadeColumnAnswerTemplate",
                            newColumn: [
                                {
                                    name: "columnSubType",
                                    value: null,
                                },
                            ],
                        },
                        {
                            tableName: "PersonAskadeColumnAnswer",
                            newColumn: [
                                {
                                    name: "columnSubType",
                                    value: null,
                                },
                            ],
                        },
                        {
                            tableName: "PersonQuestionAnswer",
                            newColumn: [
                                {
                                    name: "answerImage",
                                    value: null,
                                },
                                {
                                    name: "isDoneSign",
                                    value: false,
                                },
                            ],
                        },
                        {
                            tableName: "PersonQuestionAnswerTemplate",
                            newColumn: [
                                {
                                    name: "answerImage",
                                    value: null,
                                },
                                {
                                    name: "isDoneSign",
                                    value: false,
                                },
                            ],
                        },
                        {
                            tableName: "Person",
                            newColumn: [
                                {
                                    name: "isFileUser",
                                    value: false,
                                },
                            ],
                        },
                        {
                            tableName: "UserApplications",
                            newColumn: [
                                {
                                    name: "isApplicationModuleDisable",
                                    value: false,
                                },
                            ],
                        },
                        {
                            tableName: "DocumentLibrary",
                            newColumn: [
                                {
                                    name: "extendedInfo",
                                    value: null,
                                },
                            ],
                        },
                        {
                            tableName: "AnswerOption",
                            newColumn: [
                                {
                                    name: "fileAttachmentRequired",
                                    value: false,
                                },
                            ],
                        },
                        {
                            tableName: "PersonQuestionnaire",
                            newColumn: [
                                {
                                    name: "address",
                                    value: null,
                                },
                            ],
                        },
                        {
                            tableName: "PersonQuestionnaireTemplate",
                            newColumn: [
                                {
                                    name: "address",
                                    value: null,
                                },
                            ],
                        },
                    ];
                    return allNewColumns;
                },
                updateColumnSchema: function updateColumnSchema(tableColumnDetails) {
                    var def = $q.defer();
                    var buildVersion = null;
                    var thisScope = this;
                    $cordovaAppVersion.getVersionNumber().then(function (version) {
                        var buildVersion = version;
                        // var versionApp = window.localStorage.getItem('versionApp'); // When the version saved in the localstorage is less than current app version or versionApp is null
                        var versionAppProm =
                            DeviceUtil.getKeyValueWithSharedPreferences("versionApp");
                        versionAppProm
                            .then(function (data) {
                                versionAppProcess(data, buildVersion);
                            })
                            .catch(function (err) {
                                versionAppProcess(null, buildVersion);
                            });

                        function versionAppProcess(versionApp, buildVersion) {
                            // In this scenario the below code is executed.
                            if (versionApp == null) {
                                versionApp = "0.0";
                            }

                            var versionAppNo = parseInt(versionApp.replace(/\./g, ""));
                            var buildVersionNo = parseInt(buildVersion.replace(/\./g, ""));

                            if (versionAppNo < buildVersionNo) {
                                var offlineDb = thisScope.OfflineStorage;
                                thisScope.addResourceLanguageDetails(updateDefaultLabels()); //TODO: Update scenerio add language default data.

                                var defaultIcon = defaultIcons();

                                for (
                                    var iconCount = 0;
                                    iconCount < defaultIcon.length;
                                    iconCount++
                                ) {
                                    privateMethods.addNewIcons(defaultIcon[iconCount]);
                                }

                                var userSetLang = window.localStorage.getItem("userLanguage");

                                if (!userSetLang) {
                                    thisScope.addLanguageData();
                                }

                                for (var i = 0; i < tableColumnDetails.length; i++) {
                                    var tableName = tableColumnDetails[i].tableName;
                                    var tableCollection = offlineDb.getCollection(tableName);
                                    var columnData = tableColumnDetails[i].newColumn;

                                    for (var j = 0; j < columnData.length; j++) {
                                        var columnName = columnData[j].name;
                                        var tableData = tableCollection.where(function (obj) {
                                            return obj != null;
                                        });

                                        for (var k = 0; k < tableData.length; k++) {
                                            var resultSet = tableData[k];

                                            if (!resultSet.hasOwnProperty(columnName)) {
                                                resultSet[columnName] = columnData[j].value;
                                                tableCollection.update(resultSet);
                                            }
                                        }
                                    }
                                } // TODO: This can be remove in V 1.1.2 or 1.2.0
                                // ------------------------------------------

                                var apRecipientTable = offlineDb.getCollection(
                                    "ActionPlanRecipient"
                                );
                                var akRecipientTable =
                                    offlineDb.getCollection("AskadeRecipient");
                                var queRecipientTable = offlineDb.getCollection(
                                    "QuestionnaireRecipient"
                                );

                                if (apRecipientTable !== null) {
                                    apRecipientTable.removeDataOnly();
                                }

                                if (akRecipientTable !== null) {
                                    akRecipientTable.removeDataOnly();
                                }

                                if (queRecipientTable !== null) {
                                    queRecipientTable.removeDataOnly();
                                } // ----------------------------------

                                offlineDb.saveDatabase(function () {
                                    // Only during save setting the current version of the app
                                    var verAppPromise =
                                        DeviceUtil.setKeyValueWithSharedPreferences(
                                            "versionApp",
                                            buildVersion
                                        );
                                    verAppPromise.then(function () {
                                        // executes this method when data is saved sucessfully.
                                    });
                                });
                            }
                        }
                        def.resolve(true);
                    }, false);
                    return def.promise;
                },
                syncOldDb: function syncOldDb(fsAdapterDb) {
                    var dbPromise = $q.defer();
                    var offlineDb = new loki(mobileConfig.DatabaseName, {
                        autosave: false,
                    });
                    offlineDb.loadDatabase({}, function () {
                        var oldData = offlineDb.listCollections().length;
                        fsAdapterDb.loadDatabase({}, function () {
                            if (oldData > 0) {
                                var dbJson = offlineDb.serialize();
                                fsAdapterDb.loadJSON(dbJson, {});
                                fsAdapterDb.saveDatabase(function () {
                                    offlineDb.deleteDatabase({}, function () {
                                        fsAdapterDb.close();
                                        dbPromise.resolve(fsAdapterDb);
                                    });
                                });
                            } else {
                                dbPromise.resolve(fsAdapterDb);
                            }
                        });
                    });
                    return dbPromise;
                },
                fsDbPromise: null,
                initializeLocalStorageBrowser:
                    function initializeLocalStorageBrowser() {
                        var defLocal = $q.defer();
                        var thisScope = this;
                        var offlineDb = new loki(mobileConfig.DatabaseName, {
                            autosave: false,
                        });
                        thisScope.OfflineStorage = offlineDb;
                        var tableValues = this.addNewColumn();
                        offlineDb.loadDatabase({}, function () {
                            var testInititalized = offlineDb.getCollection("Questionnaire");

                            if (testInititalized === null) {
                                thisScope.createOfflineTables(); //TODO : For now new tables will be initialized manually ..

                                thisScope.newTableSchema(offlineDb);
                                offlineDb.saveDatabase(function () {
                                    thisScope.DbLoaded = true;
                                    $rootScope.$broadcast("DbCommand", {
                                        Command: "DatabaseLoaded",
                                    });
                                    defLocal.resolve(true);
                                });
                            } else {
                                //TODO : For now new tables will be initialized manually ..
                                thisScope.newTableSchema(offlineDb);
                                var updateColPromise =
                                    thisScope.updateColumnSchema(tableValues);
                                updateColPromise.then(function (sucess) {
                                    thisScope.DbLoaded = true;
                                    $rootScope.$broadcast("DbCommand", {
                                        Command: "DatabaseLoaded",
                                    });
                                    defLocal.resolve(true);
                                });
                            }
                        });
                        return defLocal;
                    },
                initializeLocalStorage: function initializeLocalStorage() {
                    var defLocal = $q.defer();
                    var thisScope = this;

                    if (localStorage.fsDbPromise === null) {
                        $ionicPlatform.ready(function () {
                            window.resolveLocalFileSystemURL(
                                cordova.file.dataDirectory,
                                function (fs) {
                                    window.fs = fs.filesystem;
                                    var baseDirectory = ""; //cordova.file.dataDirectory;

                                    var adapterFs = new FileSystemAdapter({
                                        base_dir: baseDirectory,
                                    });
                                    var offlineDb = new loki(mobileConfig.DatabaseName, {
                                        adapter: adapterFs,
                                        autosave: false,
                                    });
                                    var testInititalized =
                                        offlineDb.getCollection("Questionnaire");
                                    thisScope.OfflineStorage = offlineDb;
                                    var tableValues = thisScope.addNewColumn();
                                    offlineDb.loadDatabase(
                                        {},
                                        function () {
                                            var testInititalized =
                                                offlineDb.getCollection("Questionnaire");

                                            if (testInititalized === null) {
                                                thisScope.createOfflineTables(); //TODO : For now new tables will be initialized manually ..

                                                thisScope.newTableSchema(offlineDb);
                                                offlineDb.saveDatabase(function () {
                                                    thisScope.DbLoaded = true;
                                                    $rootScope.$broadcast("DbCommand", {
                                                        Command: "DatabaseLoaded",
                                                    });
                                                    defLocal.resolve(true);
                                                });
                                            } else {
                                                thisScope.newTableSchema(offlineDb); //TODO : For now new tables will be initialized manually ..

                                                var updateColPromise =
                                                    thisScope.updateColumnSchema(tableValues);
                                                updateColPromise.then(function (sucess) {
                                                    //thisScope.newTableSchema(offlineDb);
                                                    thisScope.DbLoaded = true;
                                                    $rootScope.$broadcast("DbCommand", {
                                                        Command: "DatabaseLoaded",
                                                    });
                                                    defLocal.resolve(true);
                                                });
                                            }
                                        },
                                        function (err) {
                                            def.resolve(err);
                                        }
                                    );
                                }
                            );
                        });
                        localStorage.fsDbPromise = defLocal;
                    } else {
                        localStorage.fsDbPromise = defLocal;
                    }

                    return localStorage.fsDbPromise;
                },
                initializeIndexedDb: function initializeIndexedDb() {
                    var indexedDbAdapter = new LokiIndexedAdapter(
                        mobileConfig.AdapterName
                    );
                    var thisScope = this;
                    var offlineDb = new loki(mobileConfig.DatabaseName, {
                        autosave: false,
                        adapter: indexedDbAdapter,
                    });
                    thisScope.OfflineStorage = offlineDb;
                    indexedDbAdapter.getDatabaseList(function (dbList) {
                        var databaseExists = false;

                        if (dbList.length > 0) {
                            for (var i = 0; i < dbList.length; i++) {
                                if (dbList[i] == mobileConfig.DatabaseName) {
                                    offlineDb.loadDatabase({}, function (result) {
                                        thisScope.DbLoaded = true;
                                        $rootScope.$broadcast("DbCommand", {
                                            Command: "DatabaseLoaded",
                                        });
                                    });
                                    databaseExists = true;
                                }
                            }
                        }

                        if (databaseExists == false) {
                            thisScope.createOfflineTables();
                            offlineDb.saveDatabase(function () {
                                thisScope.DbLoaded = true;
                                $rootScope.$broadcast("DbCommand", {
                                    Command: "DatabaseLoaded",
                                });
                            });
                        }
                    });
                },
                initialize: function initialize() {
                    return this.initializeLocalStorage();
                },
                createOfflineDb: function createOfflineDb() {
                    var offlineDb = new Loki(mobileConfig.DatabaseName);
                    this.OfflineStorage = offlineDb;
                },

                /* The below method is called only the first time that is 
                   if a database is not already created then the tables are created. 
                   This can be skipped but is used to show the structure of the tables created.
                */
                createOfflineTables: function createOfflineTables() {
                    var offlineDb = this.OfflineStorage;
                    var questionnaireCollection =
                        offlineDb.addCollection("Questionnaire");

                    if (questionnaireCollection === null) {
                        questionnaireCollection.insert({
                            Id: null,
                            typeCode: -1,
                            controlType: null,
                            name: null,
                            description: null,
                            extendedDescription: null,
                            isRepeatable: false,
                            isRepeatableOnlyOnceForEvaluatingFor: false,
                            pointOfView: null,
                            commentLabel: null,
                            questionGroupBackColor: null,
                            questionGroupForeColor: null,
                            questionBackColor: null,
                            questionForeColor: null,
                            answerGroupId: -1,
                            enableAnswerOptionColour: false,
                            enableTabularAnswering: false,
                            tabularAnswerOptionColourType: null,
                            publishedDate: null,
                            expirationDate: null,
                            createdDate: null,
                            updatedDate: null,
                            questionImageFileBase64: null,
                            enableEmail: false,
                            enablePrint: false,
                            translatedPointOfView: null,
                            answerOptionFontColour: null,
                            columnSubType: null,
                            autoUploadDelayInMinutes: null,
                            enableEditGeoLocation: false,
                            isSurvey: false,
                            hidePointOfViewOnStartScreen: false,
                        });
                        questionnaireCollection.removeDataOnly();
                    }

                    var questionGroupCollection =
                        offlineDb.addCollection("QuestionGroup");

                    if (questionGroupCollection === null) {
                        questionGroupCollection.insert({
                            Id: null,
                            questionnaireId: null,
                            answerGroupId: null,
                            name: null,
                            description: null,
                            helpLink: null,
                            sortOrder: -1,
                        });
                        questionGroupCollection.removeDataOnly();
                    }

                    var questionCollection = offlineDb.addCollection("Question");

                    if (questionCollection === null) {
                        questionCollection.insert({
                            Id: null,
                            questionGroupId: null,
                            text: null,
                            typeCode: -1,
                            isRequired: false,
                            ignoreValuationQuestion: false,
                            enableComment: false,
                            enableFileAttachment: false,
                            helpLink: null,
                            helpText: null,
                            sortOrder: -1,
                            triggerRequirement: null,
                            answerGroupId: null,
                            createdDate: null,
                            showDependencyQuestion: null,
                            columnType: null,
                            columnSubType: null,
                            dataTypeId: null,
                            isDateDefaultToday: null,
                            isDateMaximumToday: null,
                            enableQRCodeReader: false,
                        });
                        questionCollection.removeDataOnly();
                    }

                    var questionTriggers = offlineDb.addCollection("QuestionTrigger");
                    questionTriggers.insert({
                        questionId: null,
                        triggerQuestionId: null,
                        triggerAnswerId: null,
                        triggerAnswerTextCode: null,
                    });
                    questionTriggers.removeDataOnly(); //ValuationQuestion table

                    var valuationQuestionCollection =
                        offlineDb.addCollection("ValuationQuestion");

                    if (valuationQuestionCollection === null) {
                        valuationQuestionCollection.insert({
                            Id: null,
                            text: null,
                            questionnaireId: null,
                            typeCode: -1,
                            isRequired: false,
                            helpLink: null,
                            helpText: null,
                            sortOrder: -1,
                            valuationAnswerGroupId: null,
                        });
                        valuationQuestionCollection.removeDataOnly();
                    } //ValuationAnswerOption table

                    var valuationAnsOptionCollection = offlineDb.addCollection(
                        "ValuationAnswerOption"
                    );

                    if (valuationAnsOptionCollection === null) {
                        valuationAnsOptionCollection.insert({
                            Id: null,
                            valuationQuestionId: null,
                            text: null,
                            imageFile: -1,
                            value: false,
                            sortOrder: null,
                            valuationAnswerGroupId: null,
                            colourCode: -1,
                        });
                        valuationAnsOptionCollection.removeDataOnly();
                    } //ValuationAnswerGroup table

                    var valuationAnsGpCollection = offlineDb.addCollection(
                        "ValuationAnswerGroup"
                    );

                    if (valuationAnsGpCollection === null) {
                        valuationAnsGpCollection.insert({
                            Id: null,
                            name: null,
                        });
                        valuationAnsGpCollection.removeDataOnly();
                    }

                    var personQuestionnaireCollection = offlineDb.addCollection(
                        "PersonQuestionnaire"
                    );

                    if (personQuestionnaireCollection === null) {
                        personQuestionnaireCollection.insert({
                            Id: null,
                            questionnaireId: null,
                            personId: null,
                            departmentId: null,
                            evaluatedForId: null,
                            initiatedDate: null,
                            geoX: null,
                            geoY: null,
                            answerByPersonId: -1,
                            isAnonymous: null,
                            answeringInProgress: false,
                            answeringCompleted: false,
                            lastGroupIndex: null,
                            address: null,
                        });
                        personQuestionnaireCollection.removeDataOnly();
                    }

                    var personQuestionAnswerCollection = offlineDb.addCollection(
                        "PersonQuestionAnswer"
                    );

                    if (personQuestionAnswerCollection === null) {
                        personQuestionAnswerCollection.insert({
                            Id: null,
                            personQuestionnaireId: null,
                            questionId: null,
                            answerId: null,
                            answerText: null,
                            comment: null,
                            fileName: null,
                            fileSourceBase64: null,
                            internalFileLocation: null,
                            createdDate: null,
                            answerImage: null,
                            isDoneSign: false,
                        });
                        personQuestionAnswerCollection.removeDataOnly();
                    } //------PersonQuestionnaire templates-------------

                    var personQuestionnaireCollection = offlineDb.addCollection(
                        "PersonQuestionnaireTemplate"
                    );

                    if (personQuestionnaireCollection === null) {
                        personQuestionnaireCollection.insert({
                            Id: null,
                            questionnaireId: null,
                            personId: null,
                            departmentId: null,
                            evaluatedForId: null,
                            initiatedDate: null,
                            geoX: null,
                            geoY: null,
                            answerByPersonId: -1,
                            createdDate: null,
                            isAnonymous: null,
                            address: null,
                        });
                        personQuestionnaireCollection.removeDataOnly();
                    }

                    var personQuestionAnswerCollection = offlineDb.addCollection(
                        "PersonQuestionAnswerTemplate"
                    );

                    if (personQuestionAnswerCollection === null) {
                        personQuestionAnswerCollection.insert({
                            Id: null,
                            personQuestionnaireId: null,
                            questionId: null,
                            answerId: null,
                            answerText: null,
                            comment: null,
                            fileName: null,
                            fileSourceBase64: null,
                            internalFileLocation: null,
                            createdDate: null,
                            answerImage: null,
                            isDoneSign: false,
                        });
                        personQuestionAnswerCollection.removeDataOnly();
                    } //-----------------------------------

                    var personValQuestionAnswerTemplateCollection =
                        offlineDb.addCollection("PersonValuationQuestionAnswerTemplate");

                    if (personValQuestionAnswerTemplateCollection === null) {
                        personValQuestionAnswerTemplateCollection.insert({
                            Id: null,
                            personQuestionnaireId: null,
                            questionId: null,
                            valuationQuestionId: null,
                            answerId: null,
                            answerText: null,
                        });
                        personValQuestionAnswerTemplateCollection.removeDataOnly();
                    } //--------------------------------------------

                    var personValQuestionAnswerCollection = offlineDb.addCollection(
                        "PersonValuationQuestionAnswer"
                    );

                    if (personValQuestionAnswerCollection === null) {
                        personValQuestionAnswerCollection.insert({
                            Id: null,
                            personQuestionnaireId: null,
                            questionId: null,
                            valuationQuestionId: null,
                            answerId: null,
                            answerText: null,
                        });
                        personValQuestionAnswerCollection.removeDataOnly();
                    } //--------------------------------------------
                    //AnswerGroup

                    var answerGroupCollection = offlineDb.addCollection("AnswerGroup");

                    if (answerGroupCollection === null) {
                        answerGroupCollection.insert({
                            Id: null,
                            name: null,
                        });
                        answerGroupCollection.removeDataOnly();
                    } //AnswerOption

                    var answerOptionCollection = offlineDb.addCollection("AnswerOption");

                    if (answerOptionCollection === null) {
                        answerOptionCollection.insert({
                            Id: null,
                            questionId: null,
                            answerGroupId: null,
                            text: null,
                            imageFileBase64: null,
                            sortOrder: -1,
                            colourCode: null,
                            commentRequired: false,
                            fileAttachmentRequired: false,
                            createdDate: null,
                        });
                        answerOptionCollection.removeDataOnly();
                    } //UserDetails

                    var userDetails = offlineDb.addCollection("UserDetails");
                    userDetails.insert({
                        userId: null,
                        userName: null,
                        firstName: null,
                        lastName: null,
                        email: null,
                        personId: null,
                        employeeNumber: null,
                        primaryDepartmentId: null,
                        token: null,
                        loggedInTimeStamp: null,
                        completeName: null,
                        isDepartmentManager: null,
                        primaryDepartmentName: null,
                        managerId: null,
                        managerCompleteName: null,
                        userPreferredLanguage: null,
                        enableOnlineDepartments: false,
                        enableOnlinePersons: false,
                        enableOnlineAssets: false,
                        enableOnlineChemicals: false,
                        isDemoUser: false,
                        notificationSubscriptionTopics: null,
                        localNotificationTimeInterval: null,
                    });
                    userDetails.removeDataOnly();
                    var userDepartments = offlineDb.addCollection("UserDepartments");
                    userDepartments.insert({
                        userId: null,
                        departmentIds: null,
                    });
                    userDepartments.removeDataOnly();

                    var userPersons = offlineDb.addCollection("UserPersons");
                    userPersons.insert({
                        userId: null,
                        personIds: null,
                    });
                    userPersons.removeDataOnly();

                    var userApplications = offlineDb.addCollection("UserApplications");
                    userApplications.insert({
                        userId: null,
                        applicationId: null,
                        includeSubDepartments: false,
                        isApplicationModuleDisable: false,
                    });
                    userApplications.removeDataOnly(); //ActionPlanWizard

                    var actionPlanWizard = offlineDb.addCollection("ActionPlanWizard");

                    if (actionPlanWizard != null) {
                        actionPlanWizard.insert({
                            Id: null,
                            columnGuideCategoryId: null,
                            name: null,
                            description: null,
                            typeCode: null,
                            noOfAttachments: null,
                            imageLogoBase64: null,
                            groupBackColor: null,
                            groupForeColor: null,
                            backColor: null,
                            foreColor: null,
                            enablePrint: null,
                            enableEmail: null,
                            autoUploadDelayInMinutes: null,
                            enableEditGeoLocation: false,
                        });
                    }

                    actionPlanWizard.removeDataOnly(); //ActionPlanWizardStep

                    var actionPlanWizardStep = offlineDb.addCollection(
                        "ActionPlanWizardStep"
                    );

                    if (actionPlanWizardStep != null) {
                        actionPlanWizardStep.insert({
                            Id: null,
                            actionPlanWizardId: null,
                            title: null,
                            description: null,
                            sortOrder: -1,
                            isRequired: null,
                            associationCode: null,
                            columnGuide2Categories: null,
                        });
                    }

                    actionPlanWizardStep.removeDataOnly(); //ActionPlanWizardStepColumnGuide

                    var actionPlanWizardColumnGuideColumn = offlineDb.addCollection(
                        "ActionPlanWizardStepColumnGuide"
                    );

                    if (actionPlanWizardColumnGuideColumn != null) {
                        actionPlanWizardColumnGuideColumn.insert({
                            Id: null,
                            apWizStepId: null,
                            text: null,
                            description: null,
                            sortOrder: -1,
                            includeQuotations: false,
                        });
                    }

                    actionPlanWizardColumnGuideColumn.removeDataOnly(); //ActionPlanWizardStepColumn

                    var actionPlanWizardStepColumn = offlineDb.addCollection(
                        "ActionPlanWizardStepColumn"
                    );

                    if (actionPlanWizardStepColumn != null) {
                        actionPlanWizardStepColumn.insert({
                            Id: null,
                            actionPlanWizardStepId: null,
                            text: null,
                            translatedText: null,
                            sortOrder: -1,
                            imageLogoBase64: null,
                            colourCode: null,
                            parentId: null,
                            columnType: null,
                            isMandatory: false,
                            isDateMaximumToday: false,
                            defaultValue: null,
                            enableQRCodeReader: false,
                        });
                    }

                    actionPlanWizardStepColumn.removeDataOnly(); //PersonActionPlanWizard

                    var personActionPlanWizardColl = offlineDb.addCollection(
                        "PersonActionPlanWizard"
                    );

                    if (personActionPlanWizardColl != null) {
                        personActionPlanWizardColl.insert({
                            Id: null,
                            wizardId: null,
                            columnGuideCategoryId: null,
                            title: null,
                            personId: null,
                            answeringInProgress: false,
                            answeringCompleted: false,
                            lastAnsweredStepIndex: null,
                            geoX: null,
                            geoY: null,
                            address: null,
                        });
                    }

                    personActionPlanWizardColl.removeDataOnly(); //PersonActionPlanWizardStepAnswer

                    var personActionPlanWizardStepAnswerColl = offlineDb.addCollection(
                        "PersonActionPlanWizardStepAnswer"
                    );

                    if (personActionPlanWizardStepAnswerColl != null) {
                        personActionPlanWizardStepAnswerColl.insert({
                            Id: null,
                            newActionPlanEntityId: null,
                            wizardStepId: null,
                            columnId: null,
                            answerId: null,
                            answerText: null,
                            answerDate: null,
                            defaultValue: false,
                        });
                    }

                    personActionPlanWizardStepAnswerColl.removeDataOnly(); //PersonActionPlanWizardStepAnswer

                    var personActionPlanWizardAttachmentColl = offlineDb.addCollection(
                        "PersonActionPlanWizardAttachment"
                    );

                    if (personActionPlanWizardAttachmentColl != null) {
                        personActionPlanWizardAttachmentColl.insert({
                            Id: null,
                            newActionPlanEntityId: null,
                            fileName: null,
                            fileLocation: null,
                            fileSourceBase64: null,
                            internalfileLocation: null,
                            fileHeader: null,
                        });
                    }

                    personActionPlanWizardAttachmentColl.removeDataOnly(); //------------------------------------------------------------------
                    //Templates section
                    //PersonActionPlanWizard

                    var personActionPlanWizardColl = offlineDb.addCollection(
                        "PersonActionPlanWizardTemplate"
                    );

                    if (personActionPlanWizardColl != null) {
                        personActionPlanWizardColl.insert({
                            Id: null,
                            wizardId: null,
                            columnGuideCategoryId: null,
                            title: null,
                            personId: null,
                            geoX: null,
                            geoY: null,
                            address: null,
                        });
                    }

                    personActionPlanWizardColl.removeDataOnly(); //PersonActionPlanWizardStepAnswer

                    var personActionPlanWizardStepAnswerColl = offlineDb.addCollection(
                        "PersonActionPlanWizardStepAnswerTemplate"
                    );

                    if (personActionPlanWizardStepAnswerColl != null) {
                        personActionPlanWizardStepAnswerColl.insert({
                            Id: null,
                            newActionPlanEntityId: null,
                            wizardStepId: null,
                            columnId: null,
                            answerId: null,
                            answerText: null,
                            answerDate: null,
                            defaultValue: false,
                        });
                    }

                    personActionPlanWizardStepAnswerColl.removeDataOnly(); //PersonActionPlanMultiTask

                    var personActionPlanMultiTaskColl = offlineDb.addCollection(
                        "PersonActionPlanMultiTask"
                    );

                    if (personActionPlanMultiTaskColl != null) {
                        personActionPlanMultiTaskColl.insert({
                            Id: null,
                            newActionPlanEntityId: null,
                            wizardStepId: null,
                            columnId: null,
                            answerId: null,
                            answerText: null,
                            answerDate: null,
                            defaultValue: false,
                            scope: null,
                            solution: null,
                            deadLine: null,
                            approvedDate: null,
                            assignedToId: null,
                            isEmptyMultiTask: null,
                        });
                    }

                    personActionPlanMultiTaskColl.removeDataOnly(); //PersonActionPlanWizardMultiTask Attachment

                    var personActionPlanMultiTaskAttachmentColl = offlineDb.addCollection(
                        "PersonActionPlanMultiTaskAttachment"
                    );

                    if (personActionPlanMultiTaskAttachmentColl != null) {
                        personActionPlanMultiTaskAttachmentColl.insert({
                            Id: null,
                            multiTaskEntityId: null,
                            fileName: null,
                            fileLocation: null,
                            fileSourceBase64: null,
                            internalFileLocation: null,
                            fileHeader: null,
                            isSavedToDb: false,
                        });
                    }

                    personActionPlanMultiTaskAttachmentColl.removeDataOnly(); //PersonActionPlanWizardStepAnswer

                    var personActionPlanWizardAttachmentColl = offlineDb.addCollection(
                        "PersonActionPlanWizardAttachmentTemplate"
                    );

                    if (personActionPlanWizardAttachmentColl != null) {
                        personActionPlanWizardAttachmentColl.insert({
                            Id: null,
                            newActionPlanEntityId: null,
                            fileName: null,
                            fileLocation: null,
                            fileSourceBase64: null,
                            fileHeader: null,
                        });
                    }

                    personActionPlanWizardAttachmentColl.removeDataOnly(); //------------------------------------------------------------------
                    //Customer..

                    var application = offlineDb.addCollection("Application");
                    application.insert({
                        Id: null,
                        text: null,
                        translatedText: null,
                        sortOrder: -1,
                        imageLogoBase64: null,
                        colourCode: null,
                        parentId: null,
                        iconClass: null,
                    });
                    application.removeDataOnly(); //Customer..

                    var speed = 0.75 * 10;

                    var customer = offlineDb.addCollection("Customers");
                    customer.insert({
                        custId: null,
                        title: null,
                        customerName: null,
                        imageLogoBase64: null,
                        frontPageText: null,
                        colourCode: null,
                        uniqueUrlPart: null,
                        onlineVal: null,
                        isAutoSyncEnabled: false,
                        buttonBackColour: null,
                        cameraImageQuality: null,
                        isPasswordSaveEnabled: false,
                        saveImageToGallery: false,
                        isDemoCustomer: null,
                        versionInfo: null,
                        supportMail: null,
                        cKey: null,
                        enableGeoLocation: false,
                        geoLocationTimeout: null,
                        enableHighAccuracyForGeoLocation: false,
                        disableLoginPanel: false,
                        isDarkModeEnable: false,
                        isReadAloudTextEnable: false,
                        nextUpdate: null,
                        isTileDisplayEnable: false,
                        disableReadImageFromPhotoLibary: false,
                        enableTreeView: false,
                        enableNextAutoUpdate: false,
                        disableUserSetting: false,
                        bgColourCode: null,
                        darkBgColourCode: null,
                        darkHeaderColourCode: null,
                        darkTileColourCode: null,
                        darkButtonColourCode: null,
                        darkTextColourCode: null,
                        displayFavorites: true,
                        enableNews: false,
                        disableFavoritesGuide: false,
                        autoUploadDelayInMinutes: null,
                        enableEditGeoLocation: false,
                        enableDocumentTreeView: false,
                        isCustomUrlEnabled: false,
                        customUrl: null,
                        allowedExtensions: null,
                        specialCharactersToMask: null,
                        readAloudSpeed: speed.toString(),
                        isSSOEnabled: false,
                    });
                    customer.removeDataOnly(); //Preferred Language (As of now not used)

                    var preferredLanguage = offlineDb.addCollection("PreferredLanguage");
                    preferredLanguage.insert({
                        langCode: null,
                    });
                    preferredLanguage.removeDataOnly(); //Resource Labels

                    var resourceLabels = offlineDb.addCollection("ResourceLabels");
                    resourceLabels.insert({
                        resourceId: null,
                        resourceText: null,
                        defaultText: null,
                    });
                    resourceLabels.removeDataOnly(); //Icons Collection

                    var iconsList = offlineDb.addCollection("Icons");
                    iconsList.insert({
                        iconId: null,
                        iconText: null,
                        defaultIcon: null,
                    });
                    iconsList.removeDataOnly(); // DownloadLog Table

                    var downloadLog = offlineDb.addCollection("DownloadLog");
                    downloadLog.insert({
                        Id: null,
                        startDate: null,
                        endDate: null,
                        type: null,
                        userId: null,
                    });
                    downloadLog.removeDataOnly(); // DownloadLog Table

                    var departmentColl = offlineDb.addCollection("Department");
                    departmentColl.insert({
                        Id: null,
                        text: null,
                        level: -1,
                        parentId: null,
                        isSubEntity: null,
                    });
                    departmentColl.removeDataOnly(); // DownloadLog Table

                    var personColl = offlineDb.addCollection("Person");
                    personColl.insert({
                        Id: null,
                        text: null,
                        isFile: false,
                        isOwner: false,
                        isMyManager: false,
                        isResponsible: false,
                        isPointOfView: false,
                        isSubEntity: false,
                        isFileUser: false,
                    });
                    personColl.removeDataOnly(); // Manager2Questionnaire Table

                    var manager2QuestionnaireColl = offlineDb.addCollection(
                        "Manager2Questionnaire"
                    );
                    manager2QuestionnaireColl.insert({
                        userId: null,
                        qId: null,
                        evaluatingForIds: null,
                    });
                    manager2QuestionnaireColl.removeDataOnly(); //AskadeFileTypeWizard

                    var askadeFileTypeWizColl = offlineDb.addCollection(
                        "AskadeFileTypeWizard"
                    );

                    if (askadeFileTypeWizColl != null) {
                        askadeFileTypeWizColl.insert({
                            Id: null,
                            columnGuideFileTypeId: null,
                            name: null,
                            typeCode: null,
                            noOfAttachments: null,
                            imageFileBase64: null,
                            groupBackColor: null,
                            groupForeColor: null,
                            backColor: null,
                            foreColor: null,
                            enableEmail: false,
                            enablePrint: false,
                            autoUploadDelayInMinutes: null,
                            enableEditGeoLocation: false,
                        });
                    }

                    askadeFileTypeWizColl.removeDataOnly(); //AskadeFileTypeWizardStep

                    var askadeFileTypeWizStepColl = offlineDb.addCollection(
                        "AskadeFileTypeWizardStep"
                    );

                    if (askadeFileTypeWizStepColl != null) {
                        askadeFileTypeWizStepColl.insert({
                            Id: null,
                            fileTypeId: null,
                            name: null,
                            description: null,
                            sortOrder: -1,
                        });
                    }

                    askadeFileTypeWizStepColl.removeDataOnly(); //AskadeFileTypeWizardStepColumn Here Id is FileColumnId

                    var askadeFileTypeWizStepColumnColl = offlineDb.addCollection(
                        "AskadeFileTypeWizardStepColumn"
                    );

                    if (askadeFileTypeWizStepColumnColl != null) {
                        askadeFileTypeWizStepColumnColl.insert({
                            Id: null,
                            fileTypeWizardStepId: null,
                            text: null,
                            helpText: null,
                            sortOrder: -1,
                            columnType: null,
                            dataTypeId: null,
                            isMandatory: false,
                            isDateDefaultToday: false,
                            isDateMaximumToday: false,
                            columnSubType: null,
                            columnGuides2FileTypes: null,
                            dependantFileColumnId: null,
                            dependantFileColumnValues: null,
                            enableQRCodeReader: false,
                            disableSearch: false,
                        });
                    }

                    askadeFileTypeWizStepColumnColl.removeDataOnly(); //AskadeFileTypeWizardStepColumnGuide

                    var askadeFileTypeWizColumnGuideColl = offlineDb.addCollection(
                        "AskadeFileTypeWizardStepColumnGuide"
                    );

                    if (askadeFileTypeWizColumnGuideColl != null) {
                        askadeFileTypeWizColumnGuideColl.insert({
                            Id: null,
                            askWizFileColumnId: null,
                            text: null,
                            description: null,
                            sortOrder: -1,
                            includeQuotations: false,
                        });
                    }

                    askadeFileTypeWizColumnGuideColl.removeDataOnly(); //AskadeFileTypeWizardStepColumnGuide refers to answer for a person and is template value

                    var personAskadeFileTypeWizTemplateColl = offlineDb.addCollection(
                        "PersonAskadeFileTypeWizardTemplate"
                    );

                    if (personAskadeFileTypeWizTemplateColl != null) {
                        personAskadeFileTypeWizTemplateColl.insert({
                            Id: null,
                            fileTypeId: null,
                            columnGuideFileTypeId: null,
                            personId: null,
                            geoX: null,
                            geoY: null,
                            address: null,
                        });
                    }

                    personAskadeFileTypeWizTemplateColl.removeDataOnly(); //AskadeFileTypeWizardStepColumnGuide

                    var personAskadeColumnAnswerTemplateColl = offlineDb.addCollection(
                        "PersonAskadeColumnAnswerTemplate"
                    );

                    if (personAskadeColumnAnswerTemplateColl != null) {
                        personAskadeColumnAnswerTemplateColl.insert({
                            Id: null,
                            fileColumnId: null,
                            personAskadeWizId: null,
                            answerId: null,
                            answerText: null,
                            answerDate: null,
                            defaultValue: null,
                            columnSubType: null,
                            columnType: null,
                        });
                    }

                    personAskadeColumnAnswerTemplateColl.removeDataOnly(); //AskadeFileTypeWizardAttachment

                    var personAskadeColumnAnswerTemplateColl = offlineDb.addCollection(
                        "PersonAskadeFileTypeWizardAttachment"
                    );

                    if (personAskadeColumnAnswerTemplateColl != null) {
                        personAskadeColumnAnswerTemplateColl.insert({
                            Id: null,
                            personAskadeFileTypeWizardId: null,
                            fileName: null,
                            fileSourceBase64: null,
                            internalFilePath: null,
                            filePath: null,
                            fileHeader: null,
                        });
                    }

                    personAskadeColumnAnswerTemplateColl.removeDataOnly(); //AskadeFileTypeWizardAttachmentTemplate

                    var personAskadeWizardAttachmentTemplateColl =
                        offlineDb.addCollection(
                            "PersonAskadeFileTypeWizardAttachmentTemplate"
                        );

                    if (personAskadeWizardAttachmentTemplateColl != null) {
                        personAskadeWizardAttachmentTemplateColl.insert({
                            Id: null,
                            personAskadeFileTypeWizardTemplateId: null,
                            fileName: null,
                            fileSourceBase64: null,
                            filePath: null,
                            internalFilePath: null,
                            fileHeader: null,
                        });
                    }

                    personAskadeWizardAttachmentTemplateColl.removeDataOnly(); //AskadeFileTypeWizardStepColumnGuide refers to answer for a person

                    var personAskadeFileTypeWizColl = offlineDb.addCollection(
                        "PersonAskadeFileTypeWizard"
                    );

                    if (personAskadeFileTypeWizColl != null) {
                        personAskadeFileTypeWizColl.insert({
                            Id: null,
                            fileTypeId: null,
                            columnGuideFileTypeId: null,
                            personId: null,
                            answeringInProgress: null,
                            answeringCompleted: null,
                            lastAnsweredStepIndex: null,
                            geoX: null,
                            geoY: null,
                            address: null,
                        });
                    }

                    personAskadeFileTypeWizColl.removeDataOnly(); //AskadeFileTypeWizardStepColumnGuide

                    var personAskadeColumnAnswerColl = offlineDb.addCollection(
                        "PersonAskadeColumnAnswer"
                    );

                    if (personAskadeColumnAnswerColl != null) {
                        personAskadeColumnAnswerColl.insert({
                            Id: null,
                            fileColumnId: null,
                            personId: null,
                            personAskadeWizId: null,
                            answerId: null,
                            answerText: null,
                            answerDate: null,
                            defaultValue: null,
                            columnSubType: null,
                            columnType: null,
                        });
                    }

                    personAskadeColumnAnswerColl.removeDataOnly(); //EasyClassification

                    var easyClassificationColl =
                        offlineDb.addCollection("EasyClassification");

                    if (easyClassificationColl != null) {
                        easyClassificationColl.insert({
                            Id: null,
                            dataTypeId: null,
                            text: null,
                        });
                    }

                    easyClassificationColl.removeDataOnly(); //ListValue

                    var listValueColl = offlineDb.addCollection("ListValue");

                    if (listValueColl != null) {
                        listValueColl.insert({
                            Id: null,
                            dataTypeId: null,
                            text: null,
                            sortOrder: 0,
                        });
                    }

                    listValueColl.removeDataOnly(); //EvaluatingForPov

                    var evaluatingForPovColl =
                        offlineDb.addCollection("EvaluatingForPov");

                    if (evaluatingForPovColl != null) {
                        evaluatingForPovColl.insert({
                            qId: null,
                            userId: null,
                            povName: null,
                            evalId: null,
                        });
                    }

                    evaluatingForPovColl.removeDataOnly();
                    var assetCollection = offlineDb.addCollection("Asset");

                    if (assetCollection != null) {
                        assetCollection.insert({
                            Id: null,
                            text: null,
                            filter: null,
                        });
                    }

                    assetCollection.removeDataOnly();

                    var chemicalCollection = offlineDb.addCollection("Chemical");

                    if (chemicalCollection != null) {
                        chemicalCollection.insert({
                            Id: null,
                            text: null,
                            filter: null,
                        });
                    }

                    chemicalCollection.removeDataOnly();

                    var docLibCollection = offlineDb.addCollection("DocumentLibrary");

                    if (docLibCollection != null) {
                        docLibCollection.insert({
                            Id: null,
                            text: null,
                            documentTypeCode: null,
                            htmlContent: null,
                            linkName: null,
                            link: null,
                            fileName: null,
                            deviceFilePath: null,
                            groupName: null,
                            groupSortOrder: null,
                            sortOrder: null,
                            extendedInfo: null,
                            encriptedFileName: null,
                        });
                    }

                    docLibCollection.removeDataOnly(); //Generic table creation

                    var genericTableNames = [
                        "Category",
                        "Status",
                        "Probability",
                        "Consequence",
                        "Priority",
                        "ProblemArea",
                        "LineOfBusiness",
                        "SafetyDepartment",
                        "Process",
                        "ControlLevel",
                        "CustomerFieldValue1",
                        "CustomerFieldValue2",
                        "CustomerFieldValue3",
                        "CustomerListValue1",
                        "CustomerListValue2",
                        "CustomerListValue3",
                        "Manager",
                        "Country",
                        "City",
                        "Activity",
                        "ActivityModule",
                        "Employee",
                        "Custom",
                    ];

                    for (var i = 0; i < genericTableNames.length; i++) {
                        localStorage.genericTableCreation(genericTableNames[i]);
                    } //Language Collection

                    var languageColl = offlineDb.addCollection("Language");

                    if (languageColl != null) {
                        languageColl.insert({
                            Id: null,
                            language: null,
                            isDefault: false,
                            languageCode: null,
                            cultureName: null,
                            isInactive: false,
                        });
                    }

                    languageColl.removeDataOnly(); //Favorites Collection

                    var favoriteColl = offlineDb.addCollection("Favorite");

                    if (favoriteColl != null) {
                        favoriteColl.insert({
                            itemId: null,
                            moduleName: null,
                            dlGroupName: false,
                            userSortOrder: null,
                        });
                    }

                    favoriteColl.removeDataOnly(); //News Collection

                    var newsColl = offlineDb.addCollection("News");

                    if (newsColl != null) {
                        newsColl.insert({
                            Id: null,
                            header: null,
                            teaser: null,
                            link: null,
                            groupName: null,
                            groupSortOrder: null,
                            htmlContent: null,
                            fileName: null,
                            sortOrder: null,
                            expiryDate: null,
                            modifiedDate: null,
                            isExternal: false,
                            isRead: false,
                        });
                    }

                    newsColl.removeDataOnly(); //TempNews Collection this collection is used only when user resets the app

                    var tempNewsColl = offlineDb.addCollection("TempNews");

                    if (tempNewsColl != null) {
                        tempNewsColl.insert({
                            Id: null,
                            modifiedDate: null,
                            isRead: false,
                        });
                    }

                    tempNewsColl.removeDataOnly(); //GeographyLocation Collection this collection is used only when user resets the app

                    var GeographyLocationColl =
                        offlineDb.addCollection("GeographyLocation");

                    if (GeographyLocationColl != null) {
                        GeographyLocationColl.insert({
                            Id: null,
                            text: null,
                        });
                    }
                    GeographyLocationColl.removeDataOnly(); //News File Collection

                    var newsFileColl = offlineDb.addCollection("NewsFile");

                    if (newsFileColl != null) {
                        newsFileColl.insert({
                            Id: null,
                            newsId: null,
                            fileName: null,
                            deviceFilePath: null,
                        });
                    }

                    newsFileColl.removeDataOnly();

                    //Insurance collection
                    var InsuranceColl = offlineDb.addCollection("Insurance");

                    if (InsuranceColl != null) {
                        InsuranceColl.insert({
                            Id: null,
                            dataTypeId: null,
                            text: null,
                        });
                    }

                    InsuranceColl.removeDataOnly();
                },
                genericTableCreation: function genericTableCreation(tableName) {
                    var offlineDb = this.OfflineStorage;
                    var genericCollection = offlineDb.addCollection(tableName);

                    if (genericCollection != null) {
                        genericCollection.insert({
                            Id: null,
                            text: null,
                        });
                    }

                    genericCollection.removeDataOnly();

                    var vehicleDamageCol = offlineDb.addCollection("VehicleDamage");

                    if (vehicleDamageCol != null) {
                        vehicleDamageCol.insert({
                            Id: null,
                            dataTypeId: null,
                            text: null,
                        });
                    }

                    vehicleDamageCol.removeDataOnly();
                },

                /* Questionniare answering/retriving details related methods */
                // The below method will return if the evaluatedForId for pointOfView
                //Person is being used by any other user in any other questionnaire..
                getIfPersonUsedInQuestionnaireForUser:
                    function getIfPersonUsedInQuestionnaireForUser(
                        evaluatedForId,
                        qId,
                        personId
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var queColl = offlineDb.getCollection("Questionnaire");
                        var personPovQuestionnaires = queColl.find({
                            pointOfView: {
                                $eq: "Person",
                            },
                        });
                        var usedCounter = 0;

                        for (var i = 0; i < personPovQuestionnaires.length; i++) {
                            var povQuestionnaire = personPovQuestionnaires[i];

                            if (povQuestionnaire.evaluatedForId === answeredPersonId) {
                                usedCounter = usedCounter + 1;
                            }
                        }

                        return usedCounter === 1;
                    },
                getIfAskadeFileTypeWizardColumnsusedForPerson:
                    function getIfAskadeFileTypeWizardColumnsusedForPerson(
                        answeredPersonId
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var columnIds = [];
                        var askWizColumnsColl = offlineDb.getCollection(
                            "AskadeFileTypeWizardStepColumn"
                        );

                        for (var i = 0; i < askWizColumnsColl.length; i++) {
                            var askColumn = askWizColumnsColl[i];

                            if (askColumn.columnType.indexOf("Person") >= 0) {
                                columnIds.push(askColumn.Id);
                            }
                        }

                        var personAskColumnAnswerTemplateColl = offlineDb.getCollection(
                            "PersonAskadeColumnAnswerTemplate"
                        );
                        var answerIdListForTemplate =
                            personAskColumnAnswerTemplateColl.find({
                                $and: [
                                    {
                                        columnId: {
                                            $in: columnIds,
                                        },
                                    },
                                    {
                                        answerId: {
                                            $eq: answeredPersonId,
                                        },
                                    },
                                ],
                            });

                        if (answerIdListForTemplate.length == 0) {
                            var personAskColumnAnswerColl = offlineDb.getCollection(
                                "PersonAskadeColumnAnswer"
                            );
                            var answerIdList = personAskColumnAnswerColl.find({
                                $and: [
                                    {
                                        columnId: {
                                            $in: columnIds,
                                        },
                                    },
                                    {
                                        answerId: {
                                            $eq: answeredPersonId,
                                        },
                                    },
                                ],
                            });
                            return answerIdList.length > 0;
                        }

                        return true;
                    },
                getIfActionPlanWizardColumnsUsedForPerson:
                    function getIfActionPlanWizardColumnsUsedForPerson(answeredPersonId) {
                        var offlineDb = this.OfflineStorage;
                        var columnIds = [];
                        var actionPlanWizColumnsColl = offlineDb.getCollection(
                            "ActionPlanWizardStepColumn"
                        );

                        for (var i = 0; i < actionPlanWizColumnsColl.length; i++) {
                            var apwColumn = actionPlanWizColumnsColl[i];

                            if (apwColumn.columnType.indexOf("Person") >= 0) {
                                columnIds.push(apwColumn.Id);
                            }
                        }

                        var personApwStepAnswerColl = offlineDb.getCollection(
                            "PersonActionPlanWizardStepAnswer"
                        );
                        var answerIdList = personApwStepAnswerColl.find({
                            $and: [
                                {
                                    columnId: {
                                        $in: columnIds,
                                    },
                                },
                                {
                                    answerId: {
                                        $eq: answeredPersonId,
                                    },
                                },
                            ],
                        });
                        return answerIdList.length > 0;
                    },
                getIfPersonUsedInQuestionnairesForUser:
                    function getIfPersonUsedInQuestionnairesForUser(evaluatedForId) {
                        var offlineDb = this.OfflineStorage;
                        var queColl = offlineDb.getCollection("Questionnaire");
                        var personPovQuestionnaires = queColl.find({
                            pointOfView: {
                                $eq: "Person",
                            },
                        });
                        var usedCounter = 0;
                        var pqColl = offlineDb.getCollection("PersonQuestionnaire");

                        for (var i = 0; i < personPovQuestionnaires.length; i++) {
                            var povQuestionnaire = personPovQuestionnaires[i];
                            var povPersonqId = povQuestionnaire.Id;
                            var pqFiltered = pqColl.find({
                                questionnaireId: {
                                    $eq: povPersonqId,
                                },
                            });

                            for (var j = 0; j < pqFiltered.length; j++) {
                                var pq = pqFiltered[j];

                                if (pq.evaluatedForId === answeredPersonId) {
                                    usedCounter = usedCounter + 1;
                                }
                            }
                        }

                        return usedCounter === 0;
                    },
                addAnswerOptionData: function addAnswerOptionData(answerOptionsData) {
                    var offlineDb = this.OfflineStorage;
                    privateMethods.addAnswerOption(answerOptionsData);
                    offlineDb.saveDatabase(function () {
                        //Stuff to do after the save to local storage.
                    });
                },
                addValuationAnswerGroup: function addValuationAnswerGroup(
                    valuationAnsGroupList
                ) {
                    var valAnswerGrps =
                        valuationAnsGroupList === null ? [] : valuationAnsGroupList;

                    for (var i = 0; i < valAnswerGrps.length; i++) {
                        var valuationAnsGroup = valAnswerGrps[i];
                        var offlineDb = this.OfflineStorage;
                        var valAnswerGroupColl = offlineDb.getCollection(
                            "ValuationAnswerGroup"
                        );
                        var valQuestionExists = valAnswerGroupColl.findOne({
                            Id: {
                                $eq: valuationAnsGroup.Id,
                            },
                        });

                        if (valQuestionExists != null) {
                            valQuestionExists.name = valuationAnsGroup.Name;
                            valAnswerGroupColl.update(valQuestionExists);
                        } else {
                            var valAnsGroup = {
                                Id: valuationAnsGroup.Id,
                                name: valuationAnsGroup.Name,
                            };
                            valAnswerGroupColl.insert(valAnsGroup);
                        }

                        var valAnswerOptionColl = offlineDb.getCollection(
                            "ValuationAnswerOption"
                        );
                        var valAnswerOptions = valuationAnsGroup.AnswerOptions;
                        var updateAnsOptionsList = [];
                        var insertAnsOptionsList = [];

                        for (var j = 0; j < valAnswerOptions.length; j++) {
                            var valAnswerOption = valAnswerOptions[j];

                            var valAnsOptionExists = valAnswerOptionColl.findOne({
                                $and: [
                                    {
                                        Id: {
                                            $eq: valAnswerOption.Id,
                                        },
                                    },
                                    {
                                        valuationAnswerGroupId: {
                                            $eq: valuationAnsGroup.Id,
                                        },
                                    },
                                ],
                            });

                            if (valAnsOptionExists !== null) {
                                valAnsOptionExists.text = valAnswerOption.Text;
                                valAnsOptionExists.imageFile = valAnswerOption.ImageFileBase64;
                                valAnsOptionExists.sortOrder = valAnswerOption.SortOrder;
                                valAnsOptionExists.valuationAnswerGroupId =
                                    valuationAnsGroup.Id;
                                valAnsOptionExists.colourCode = valAnswerOption.ColourCode;
                                updateAnsOptionsList.push(valAnsOptionExists);
                            } else {
                                var vaAnsEntry = {
                                    Id: valAnswerOption.Id,
                                    valuationQuestionId: null,
                                    text: valAnswerOption.Text,
                                    imageFile: valAnswerOption.ImageFileBase64,
                                    sortOrder: valAnswerOption.SortOrder,
                                    valuationAnswerGroupId: valuationAnsGroup.Id,
                                    colourCode: valAnswerOption.ColourCode,
                                };
                                insertAnsOptionsList.push(vaAnsEntry);
                            }
                        }

                        valAnswerOptionColl.insert(insertAnsOptionsList);
                        valAnswerOptionColl.update(updateAnsOptionsList);
                    }
                },
                // Changed from previous implementation as to data should be deleted only from the template table for download and update
                addValuationAnswerOptionData: function addValuationAnswerOptionData(
                    valAnswerOptionsList,
                    valQuestionId
                ) {
                    var offlineDb = this.OfflineStorage;
                    var valAnswerOptionColl = offlineDb.getCollection(
                        "ValuationAnswerOption"
                    );
                    valAnswerOptionColl.removeWhere(function (valAnsEntry) {
                        return valAnsEntry.valuationQuestionId === valQuestionId;
                    });
                    valAnswerOptionColl.insert(valAnswerOptionsList);
                },
                addValuationQuestionData: function addValuationQuestionData(
                    valuationQuestionList,
                    questionnaireId
                ) {
                    var offlineDb = this.OfflineStorage;
                    var valQuestionCollection =
                        offlineDb.getCollection("ValuationQuestion");
                    var valQueInsertList = [];
                    var valQueUpdateList = [];

                    for (var i = 0; i < valuationQuestionList.length; i++) {
                        var valQueRaw = valuationQuestionList[i];
                        var valQueExists = valQuestionCollection.findOne({
                            Id: {
                                $eq: valQueRaw.Id,
                            },
                        });

                        if (valQueExists !== null) {
                            valQueExists.text = valQueRaw.Text;
                            valQueExists.questionnaireId = questionnaireId;
                            valQueExists.typeCode = valQueRaw.TypeCode;
                            valQueExists.isRequired = valQueRaw.IsRequired;
                            valQueExists.helpLink = valQueRaw.HelpLink;
                            valQueExists.helpText = valQueRaw.HelpText;
                            valQueExists.sortOrder = valQueRaw.SortOrder;
                            valQueExists.valuationAnswerGroupId = valQueRaw.AnswerGroupId;
                            valQueUpdateList.push(valQueExists);
                        } else {
                            var valQueEntry = {
                                Id: valQueRaw.Id,
                                text: valQueRaw.Text,
                                questionnaireId: questionnaireId,
                                typeCode: valQueRaw.TypeCode,
                                isRequired: valQueRaw.IsRequired,
                                helpLink: valQueRaw.HelpLink,
                                helpText: valQueRaw.HelpText,
                                sortOrder: valQueRaw.SortOrder,
                                valuationAnswerGroupId: valQueRaw.AnswerGroupId,
                            };
                            valQueInsertList.push(valQueEntry);
                        }

                        var valAnsList = [];
                        var valAnsOptions =
                            valQueRaw.AnswerOptions === null ? [] : valQueRaw.AnswerOptions;

                        for (var j = 0; j < valAnsOptions.length; j++) {
                            var valAnswerOption = valAnsOptions[j];
                            var vaAnsEntry = {
                                Id: valAnswerOption.Id,
                                valuationQuestionId: valQueRaw.Id,
                                text: valAnswerOption.Text,
                                imageFile: valAnswerOption.ImageFileBase64,
                                sortOrder: valAnswerOption.SortOrder,
                                valuationAnswerGroupId: null,
                                colourCode: valAnswerOption.ColourCode,
                            };
                            valAnsList.push(vaAnsEntry);
                        }

                        this.addValuationAnswerOptionData(valAnsList, valQueRaw.Id);
                    }

                    valQuestionCollection.insert(valQueInsertList);
                    valQuestionCollection.update(valQueUpdateList);
                },
                addAnswerGroupData: function addAnswerGroupData(answerGroups) {
                    var offlineDb = this.OfflineStorage;
                    var answerGroupCollection = offlineDb.getCollection("AnswerGroup");
                    var answerGroupDataInsert = [];
                    var answerGroupDataUpdate = [];

                    for (var i = 0; i < answerGroups.length; i++) {
                        var answerGroupData = answerGroups[i];
                        var answerGroupId = answerGroupData.Id;
                        var answerGroup = answerGroupCollection.findOne({
                            Id: {
                                $eq: answerGroupId,
                            },
                        });

                        if (answerGroup != null) {
                            answerGroup.name = answerGroupData.Name;
                            answerGroup.description = answerGroupData.Description;
                            answerGroup.isArchived = answerGroupData.IsArchived;
                            answerGroup.createdDate = answerGroupData.CreatedDate;
                            answerGroup.createdBy = answerGroupData.CreatedBy;
                            answerGroup.typeCode = answerGroupData.TypeCode;
                            answerGroupDataUpdate.push(answerGroup);
                        } else {
                            var ag = {
                                Id: answerGroupData.Id,
                                name: answerGroupData.Name,
                                description: answerGroupData.Description,
                                isArchived: answerGroupData.IsArchived,
                                createdDate: answerGroupData.CreatedDate,
                                createdBy: answerGroupData.CreatedBy,
                                typeCode: answerGroupData.TypeCode,
                            };
                            answerGroupDataInsert.push(ag);
                        } //Call method to save Groups

                        var answerOptions = answerGroupData.AnswerOptions;
                        privateMethods.addAnswerOption(
                            answerOptions,
                            answerGroupId,
                            "answerGroup"
                        );
                    }

                    answerGroupCollection.insert(answerGroupDataInsert);
                    answerGroupCollection.update(answerGroupDataUpdate);
                },
                saveOfflineDb: function saveOfflineDb() {
                    var savePromise = $q.defer();
                    var offlineDb = this.OfflineStorage;
                    offlineDb.saveDatabase(function () {
                        //Stuff to do after the save to local storage.
                        savePromise.resolve(true);
                    });
                    return savePromise;
                },
                deleteActionPlanWizard: function deleteActionPlanWizard(
                    actionPlanWizardId
                ) {
                    var offlineDb = this.OfflineStorage;
                    var apwCollection = offlineDb.getCollection("ActionPlanWizard");
                    var apwData = apwCollection.findOne({
                        Id: {
                            $eq: actionPlanWizardId,
                        },
                    });
                    apwCollection.remove(apwData);
                },
                deletePersonActionPlanAttachTemplate:
                    function deletePersonActionPlanAttachTemplate(actionPlanWizardId) {
                        var offlineDb = this.OfflineStorage;
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var pApwTempCollection = offlineDb.getCollection(
                            "PersonActionPlanWizardTemplate"
                        );
                        var pApwAttachTempCollection = offlineDb.getCollection(
                            "PersonActionPlanWizardAttachmentTemplate"
                        );
                        var pApwData = pApwTempCollection.findOne({
                            $and: [
                                {
                                    wizardId: {
                                        $eq: actionPlanWizardId,
                                    },
                                },
                                {
                                    personId: {
                                        $eq: loggedInUser[0].personId,
                                    },
                                },
                            ],
                        });
                        var newActionPlanEntityId = pApwData.Id;
                        pApwAttachTempCollection.removeWhere(function (pApWAttachTemp) {
                            return (
                                pApWAttachTemp.newActionPlanEntityId === newActionPlanEntityId
                            );
                        });
                    },
                deletePersonActionPlanAttachTemplateById:
                    function deletePersonActionPlanAttachTemplateById(attachId) {
                        var offlineDb = this.OfflineStorage;
                        var pApwAttachTempCollection = offlineDb.getCollection(
                            "PersonActionPlanWizardAttachmentTemplate"
                        );
                        pApwAttachTempCollection.removeWhere(function (pApWAttachTemp) {
                            return pApWAttachTemp.Id === attachId;
                        });
                    },
                deletePersonActionPlanWizardTemplate:
                    function deletePersonActionPlanWizardTemplate(actionPlanWizardId) {
                        var offlineDb = this.OfflineStorage;
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var pApwTempCollection = offlineDb.getCollection(
                            "PersonActionPlanWizardTemplate"
                        );
                        var pApwData = pApwTempCollection.findOne({
                            $and: [
                                {
                                    wizardId: {
                                        $eq: actionPlanWizardId,
                                    },
                                },
                                {
                                    personId: {
                                        $eq: loggedInUser[0].personId,
                                    },
                                },
                            ],
                        });
                        pApwTempCollection.remove(pApwData);
                        return pApwData;
                    },
                deleteActionPlanWizardStep: function deleteActionPlanWizardStep(
                    stepId
                ) {
                    var offlineDb = this.OfflineStorage;
                    var apwStepCollection = offlineDb.getCollection(
                        "ActionPlanWizardStep"
                    );
                    apwStepCollection.removeWhere(function (apwStep) {
                        return apwStep.Id === stepId;
                    });
                },
                deleteActionPlanWizardStepColumn:
                    function deleteActionPlanWizardStepColumn(columnId, stepId) {
                        var offlineDb = this.OfflineStorage;
                        var apwStepColumnCollection = offlineDb.getCollection(
                            "ActionPlanWizardStepColumn"
                        );
                        apwStepColumnCollection.removeWhere(function (apwStepColumn) {
                            return (
                                apwStepColumn.Id === columnId &&
                                apwStepColumn.actionPlanWizardStepId === stepId
                            );
                        });
                    },
                deletePApWizardStepAnswerTemplate:
                    function deletePApWizardStepAnswerTemplate(columnId, wizardStepId) {
                        var offlineDb = this.OfflineStorage;
                        var pApwStepAnswerColl = offlineDb.getCollection(
                            "PersonActionPlanWizardStepAnswerTemplate"
                        );
                        var pApwStepAnswer = pApwStepAnswerColl.findOne({
                            $and: [
                                {
                                    Id: {
                                        $eq: columnId,
                                    },
                                },
                                {
                                    wizardStepId: {
                                        $eq: wizardStepId,
                                    },
                                },
                            ],
                        });

                        if (pApwStepAnswer) {
                            pApwStepAnswerColl.remove(pApwStepAnswer);
                        }

                        return pApwStepAnswer; //pApwStepAnswerColl.removeWhere(function (pApwStepAnswer) {
                        //    return (pApwStepAnswer.columnId === columnId && pApwStepAnswer.wizardStepId === wizardStepId);
                        //});
                    },
                deleteActionPlanWizardById: function deleteActionPlanWizardById(
                    actionPlanWizardId
                ) {
                    var offlineDb = this.OfflineStorage;
                    var apwCollection = offlineDb.getCollection("ActionPlanWizard");
                    var apwStepCollection = offlineDb.getCollection(
                        "ActionPlanWizardStep"
                    );
                    var apwStepColumnCollection = offlineDb.getCollection(
                        "ActionPlanWizardStepColumn"
                    );
                    var apwData = apwCollection.findOne({
                        Id: {
                            $eq: actionPlanWizardId,
                        },
                    });
                    var apwSteps = apwStepCollection.find({
                        actionPlanWizardId: {
                            $eq: actionPlanWizardId,
                        },
                    });

                    for (var i = 0; i < apwSteps.length; i++) {
                        var actionPlanWizardStepId = apwSteps[i].actionPlanWizardStepId;
                        apwStepColumnCollection.removeWhere(function (apwStepColumn) {
                            return (
                                apwStepColumn.actionPlanWizardStepId === actionPlanWizardStepId
                            );
                        });
                    }

                    apwStepCollection.removeWhere(function (apwStep) {
                        return apwStep.actionPlanWizardId === wizId;
                    });
                    apwCollection.remove(apwData);
                },
                deleteAskadeWizard: function deleteAskadeWizard(fileTypeId) {
                    var offlineDb = this.OfflineStorage;
                    var askCollection = offlineDb.getCollection("AskadeFileTypeWizard");
                    var akwData = askCollection.findOne({
                        Id: {
                            $eq: fileTypeId,
                        },
                    });
                    askCollection.remove(akwData);
                },
                deletePersonAskadeTemplate: function deletePersonAskadeTemplate(
                    fileTypeId
                ) {
                    var offlineDb = this.OfflineStorage;
                    var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                    var personAskTemplateCollection = offlineDb.getCollection(
                        "PersonAskadeFileTypeWizardTemplate"
                    );
                    personAskTemplateCollection.removeWhere(function (pAkw) {
                        return (
                            pAkw.fileTypeId === fileTypeId &&
                            pAkw.personId === loggedInUser[0].personId
                        );
                    });
                },
                deletePersonAskadeAttachmentTemplate:
                    function deletePersonAskadeAttachmentTemplate(fileTypeId) {
                        var offlineDb = this.OfflineStorage;
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var personAskTemplateCollection = offlineDb.getCollection(
                            "PersonAskadeFileTypeWizardTemplate"
                        );
                        var personAskAttachmentTemplateColl = offlineDb.getCollection(
                            "PersonAskadeFileTypeWizardAttachmentTemplate"
                        );
                        var personAkwTemplate = personAskTemplateCollection.findOne({
                            $and: [
                                {
                                    fileTypeId: {
                                        $eq: fileTypeId,
                                    },
                                },
                                {
                                    personId: {
                                        $eq: loggedInUser[0].personId,
                                    },
                                },
                            ],
                        });
                        var personAkwTemplateId = personAkwTemplate.Id;
                        personAskAttachmentTemplateColl.removeWhere(function (
                            pAkwAttachmentTemplate
                        ) {
                            return (
                                pAkwAttachmentTemplate.personAskadeFileTypeWizardTemplateId ===
                                personAkwTemplateId
                            );
                        });
                    },
                deleteAskadeWizardStep: function deleteAskadeWizardStep(stepId) {
                    var offlineDb = this.OfflineStorage;
                    var askStepCollection = offlineDb.getCollection(
                        "AskadeFileTypeWizardStep"
                    );
                    askStepCollection.removeWhere(function (akwStep) {
                        return akwStep.Id === stepId;
                    });
                },
                deletePersonAskadeColumnAnswerTemplate:
                    function deletePersonAskadeColumnAnswerTemplate(
                        columnId,
                        fileTypeId
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        if (loggedInUser.length > 0) {
                            var personAskTemplateCollection = offlineDb.getCollection(
                                "PersonAskadeFileTypeWizardTemplate"
                            );
                            var personAkwTemplate = personAskTemplateCollection.findOne({
                                $and: [
                                    {
                                        fileTypeId: {
                                            $eq: fileTypeId,
                                        },
                                    },
                                    {
                                        personId: {
                                            $eq: loggedInUser[0].personId,
                                        },
                                    },
                                ],
                            });
                            if (personAkwTemplate != null) {
                                var templateAskWizId = personAkwTemplate.Id;
                                var pAkColumnAnswerTempColl = offlineDb.getCollection(
                                    "PersonAskadeColumnAnswerTemplate"
                                );
                                pAkColumnAnswerTempColl.removeWhere(function (
                                    pAkColumnAnswerTemp
                                ) {
                                    return (
                                        pAkColumnAnswerTemp.fileColumnId === columnId &&
                                        pAkColumnAnswerTemp.personAskadeWizId === templateAskWizId
                                    );
                                });
                            }
                        }
                    },
                deleteAkWizardStepColumn: function deleteAkWizardStepColumn(
                    columnId,
                    stepId
                ) {
                    var offlineDb = this.OfflineStorage;
                    var akStepColumnCollection = offlineDb.getCollection(
                        "AskadeFileTypeWizardStepColumn"
                    );
                    akStepColumnCollection.removeWhere(function (akStepColumn) {
                        return (
                            akStepColumn.Id === columnId &&
                            akStepColumn.fileTypeWizardStepId === stepId
                        );
                    });
                },
                deleteAkWizardStepColumnGuide: function deleteAkWizardStepColumnGuide(
                    columnGuideId,
                    columnId
                ) {
                    var offlineDb = this.OfflineStorage;
                    var askStepColumnGuideCollection = offlineDb.getCollection(
                        "AskadeFileTypeWizardStepColumnGuide"
                    );
                    askStepColumnGuideCollection.removeWhere(function (
                        akStepColumnGuide
                    ) {
                        return (
                            akStepColumnGuide.Id === columnGuideId &&
                            akStepColumnGuide.askWizFileColumnId === columnId
                        );
                    });
                },
                removeAskadeData: function removeAskadeData(personId) {
                    var offlineDb = this.OfflineStorage;
                    var askCollection = offlineDb.getCollection("AskadeFileTypeWizard");
                    var askStepCollection = offlineDb.getCollection(
                        "AskadeFileTypeWizardStep"
                    );
                    var askStepColumnCollection = offlineDb.getCollection(
                        "AskadeFileTypeWizardStepColumn"
                    );
                    var askStepColumnGuideCollection = offlineDb.getCollection(
                        "AskadeFileTypeWizardStepColumnGuide"
                    );
                    var askColl = askCollection.data; //First, delete the answer templates ..

                    var personAskTemplateCollection = offlineDb.getCollection(
                        "PersonAskadeFileTypeWizardTemplate"
                    );
                    var personAskStepAnswerTemplateCollection = offlineDb.getCollection(
                        "PersonAskadeColumnAnswerTemplate"
                    );
                    var personAskStepAttachmentTemplateCollection =
                        offlineDb.getCollection(
                            "PersonAskadeFileTypeWizardAttachmentTemplate"
                        );
                    var personAskCollection = offlineDb.getCollection(
                        "PersonAskadeFileTypeWizard"
                    );
                    var personAskStepAnswerCollection = offlineDb.getCollection(
                        "PersonAskadeColumnAnswer"
                    );
                    var personAskStepAttachmentCollection = offlineDb.getCollection(
                        "PersonAskadeFileTypeWizardAttachment"
                    );
                    var removeList = [];

                    for (var i = 0; i < askColl.length; i++) {
                        var ask = askColl[i];
                        var fileTypeId = ask.Id; //First clear all the templates..

                        var personAskTemplateList = personAskTemplateCollection.find({
                            $and: [
                                {
                                    fileTypeId: {
                                        $eq: fileTypeId,
                                    },
                                },
                                {
                                    personId: {
                                        $eq: personId,
                                    },
                                },
                            ],
                        }); //Removes the template data..

                        for (var j = 0; j < personAskTemplateList.length; j++) {
                            var pAskTemplate = personAskTemplateList[j];
                            var pAskTemplateId = pAskTemplate.Id;
                            personAskStepAnswerTemplateCollection.removeWhere(function (
                                personAskStepAnswerTemplate
                            ) {
                                return (
                                    personAskStepAnswerTemplate.personAskadeWizId ===
                                    pAskTemplateId
                                );
                            });
                            personAskStepAttachmentTemplateCollection.removeWhere(function (
                                personApwAttachTemplateAnswer
                            ) {
                                return (
                                    personApwAttachTemplateAnswer.personAskadeWizId ===
                                    pAskTemplateId
                                );
                            });
                            personAskTemplateCollection.remove(pAskTemplate);
                        }

                        var personAskList = personAskCollection.find({
                            $and: [
                                {
                                    fileTypeId: {
                                        $eq: fileTypeId,
                                    },
                                },
                                {
                                    personId: {
                                        $eq: personId,
                                    },
                                },
                            ],
                        }); //Remove actuall answers for the person..

                        for (var j = 0; j < personAskList.length; j++) {
                            var pAsk = personAskList[j];
                            var pAskId = pAsk.Id;
                            personAskStepAnswerCollection.removeWhere(function (
                                personAskStepAnswer
                            ) {
                                return personAskStepAnswer.personAskadeWizId === pAskId;
                            });
                            personAskStepAttachmentCollection.removeWhere(function (
                                personApwAttachAnswer
                            ) {
                                return personApwAttachAnswer.personAskadeWizId === pAskId;
                            });
                            personAskCollection.remove(pAsk);
                        }

                        var nonPersonAskList = personAskCollection.find({
                            $and: [
                                {
                                    fileTypeId: {
                                        $eq: fileTypeId,
                                    },
                                },
                                {
                                    personId: {
                                        $ne: personId,
                                    },
                                },
                            ],
                        });

                        if (nonPersonAskList.length === 0) {
                            var askSteps = askStepCollection.find({
                                fileTypeId: {
                                    $eq: fileTypeId,
                                },
                            });

                            for (var k = 0; k < askSteps.length; k++) {
                                var askfileTypeWizardStepId = askSteps[k].Id;
                                askStepColumnCollection.removeWhere(function (askStepColumn) {
                                    return (
                                        askStepColumn.fileTypeWizardStepId ===
                                        askfileTypeWizardStepId
                                    );
                                });
                            }

                            askStepCollection.removeWhere(function (apwStep) {
                                return apwStep.fileTypeId === fileTypeId;
                            });
                            removeList.push(ask);
                        }
                    }

                    for (var i = 0; i < removeList.length; i++) {
                        askCollection.remove(removeList[i]);
                    }
                },
                removeActionPlanWizardData: function removeActionPlanWizardData(
                    personId
                ) {
                    var offlineDb = this.OfflineStorage;
                    var apwCollection = offlineDb.getCollection("ActionPlanWizard");
                    var apwStepCollection = offlineDb.getCollection(
                        "ActionPlanWizardStep"
                    );
                    var apwStepColumnCollection = offlineDb.getCollection(
                        "ActionPlanWizardStepColumn"
                    );
                    var apwColl = apwCollection.data;
                    var personApwCollection = offlineDb.getCollection(
                        "PersonActionPlanWizard"
                    );
                    var personApwStepAnswerCollection = offlineDb.getCollection(
                        "PersonActionPlanWizardStepAnswer"
                    );
                    var personApwStepAttachmentCollection = offlineDb.getCollection(
                        "PersonActionPlanWizardAttachment"
                    );
                    var personApwMultiTask = offlineDb.getCollection(
                        "PersonActionPlanMultiTask"
                    );
                    var personApwMultiTaskAttachment = offlineDb.getCollection(
                        "PersonActionPlanMultiTaskAttachment"
                    );
                    var removeList = [];

                    for (var i = 0; i < apwColl.length; i++) {
                        var apw = apwColl[i];
                        var wizId = apw.Id;
                        var personApwList = personApwCollection.find({
                            $and: [
                                {
                                    wizardId: {
                                        $eq: wizId,
                                    },
                                },
                                {
                                    personId: {
                                        $eq: personId,
                                    },
                                },
                            ],
                        });

                        for (var j = 0; j < personApwList.length; j++) {
                            var pApw = personApwList[j];
                            var pApwId = pApw.Id;
                            personApwStepAnswerCollection.removeWhere(function (
                                personApwStepAnswer
                            ) {
                                return personApwStepAnswer.newActionPlanEntityId === pApwId;
                            });
                            personApwStepAttachmentCollection.removeWhere(function (
                                personApwAttachAnswer
                            ) {
                                return personApwAttachAnswer.newActionPlanEntityId === pApwId;
                            });
                            var pApwMultiTaskVal = personApwMultiTask.find({
                                newActionPlanEntityId: {
                                    $eq: pApwId,
                                },
                            });

                            for (var mt = 0; mt < pApwMultiTaskVal.length; mt++) {
                                var multiTaskVal = pApwMultiTaskVal[mt];
                                personApwMultiTaskAttachment.removeWhere(function (
                                    multiTaskAttach
                                ) {
                                    return multiTaskAttach.multiTaskEntityId === multiTaskVal.Id;
                                });
                                personApwMultiTask.remove(multiTaskVal);
                            }

                            personApwCollection.remove(pApw);
                        }

                        var nonPersonApwList = personApwCollection.find({
                            $and: [
                                {
                                    wizardId: {
                                        $eq: wizId,
                                    },
                                },
                                {
                                    personId: {
                                        $ne: personId,
                                    },
                                },
                            ],
                        });

                        if (nonPersonApwList.length === 0) {
                            var apwSteps = apwStepCollection.find({
                                actionPlanWizardId: {
                                    $eq: wizId,
                                },
                            });

                            for (var k = 0; k < apwSteps.length; k++) {
                                var actionPlanWizardStepId = apwSteps[k].actionPlanWizardStepId;
                                apwStepColumnCollection.removeWhere(function (apwStepColumn) {
                                    return (
                                        apwStepColumn.actionPlanWizardStepId ===
                                        actionPlanWizardStepId
                                    );
                                });
                            }

                            apwStepCollection.removeWhere(function (apwStep) {
                                return apwStep.actionPlanWizardId === wizId;
                            });
                            removeList.push(apw);
                        }
                    }

                    for (var i = 0; i < removeList.length; i++) {
                        apwCollection.remove(removeList[i]);
                    }
                },
                processAnswerGroup: function processAnswerGroup(answerGroupId, qId) {
                    var isAnswerGroupUsed =
                        this.getUsedAnswerGroupCountInAllQuestionnaires(answerGroupId, qId);

                    if (isAnswerGroupUsed == false) {
                        //Means no reference of the AnswerGroup is found in other questionnaires
                        //and hence is Ok to delete from the db.
                        //The below check is required see if an answer group is already deleted.
                        var answerGroup = this.getAnswerGroup(answerGroupId);

                        if (answerGroup !== null) {
                            this.deleteAnswerGroup(answerGroupId);
                            this.deleteAnswerOptionsByAnswerGroup(answerGroupId);
                        }
                    }

                    return isAnswerGroupUsed;
                },
                processAnswerOptionsForQuestionnaire:
                    function processAnswerOptionsForQuestionnaire(questionnaire) {
                        var isAnswerGroupUsed = false;
                        var qId = questionnaire.Id;

                        if (questionnaire.answerGroupId != null) {
                            //The AnswerGroup is defined at the questionnaire level get
                            //the answergroup id and see if it is being used in any other questionnaire
                            isAnswerGroupUsed = this.processAnswerGroup(
                                questionnaire.answerGroupId,
                                qId
                            );
                        } else {
                            //Go into the groups and check for answergroups
                            var qgs = this.getQuestionGroupByQuestionnaireId(qId);

                            for (var i = 0; i < qgs.length; i++) {
                                var questionGroup = qgs[i];
                                var answerGroupId = questionGroup.answerGroupId;

                                if (answerGroupId != null) {
                                    isAnswerGroupUsed = this.processAnswerGroup(
                                        answerGroupId,
                                        qId
                                    );
                                } else {
                                    //This means that there are no AnswerGroups that are defined by the QuestionGroup
                                    //and all answer options will be directly linked to the question .
                                    //Hence delete the AnswerOptions based on the question
                                    var questions = this.getQuestionByQuestionGroupId(
                                        questionGroup.Id
                                    );

                                    for (var j = 0; j < questions.length; j++) {
                                        var que = questions[j]; //Handle for question group assigned at the question level if not then all the answer options..

                                        if (que.answerGroupId !== null) {
                                            isAnswerGroupUsed = this.processAnswerGroup(
                                                que.answerGroupId,
                                                qId
                                            );
                                        } else {
                                            var aos = this.getAnswerOptionsOnlyQuestion(que.Id);

                                            for (var k = 0; k < aos.length; k++) {
                                                var ao = aos[k];
                                                this.deleteAnswerOption(ao.Id);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                removeQuestionnaireData: function removeQuestionnaireData() {
                    var offlineDb = this.OfflineStorage;
                    var questionnaireCollection =
                        offlineDb.getCollection("Questionnaire");
                    var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                    if (loggedInUser.length > 0) {
                        var userId = loggedInUser[0].userId;
                        var personId = loggedInUser[0].personId; //Get the current logged in user details.

                        var questionnaire = this.getAllQuestionnaires();
                        var filteredList = [];

                        for (var i = 0; i < questionnaire.length; i++) {
                            var qId = questionnaire[i].Id;
                            var qListForUser = questionnaire[i];
                            var pov = qListForUser.pointOfView;

                            if (qListForUser !== null) {
                                //First we delete the Valuation questions.
                                this.deleteValuationQuestions(qId); //This method below will contain checks to remove and
                                //AnswerGroup and AnswerOption for the questionnaire.

                                this.processAnswerOptionsForQuestionnaire(qListForUser);
                                var qgs = this.getQuestionGroupByQuestionnaireId(qId);

                                for (var j = 0; j < qgs.length; j++) {
                                    var qg = qgs[j];
                                    var questions = this.getQuestionByQuestionGroupId(qg.Id);

                                    for (var k = 0; k < questions.length; k++) {
                                        var que = questions[k];
                                        this.deleteQuestion(que.Id);
                                    }

                                    this.deleteQuestionGroup(qg.Id);
                                }

                                this.deleteQuestionnaire(qId);
                            }

                            var pqTemplate =
                                this.getPersonQuestionnaireByQuestionnaireTemplate(qId);
                            if (pqTemplate != null) {
                                this.deletePersonQuestionnaireTemplate(pqTemplate.Id);
                                this.deletePersonQuestionAnswersTemplate(pqTemplate.Id);
                                this.deleteValuationQuestionAnswersTemplate(pqTemplate.Id);
                            }

                            var personPQList = this.getPersonQuestionnairesForQuestionnaire(
                                qId,
                                personId
                            );
                            personPQList = personPQList === null ? [] : personPQList;

                            for (var l = 0; l < personPQList.length; l++) {
                                var pq = personPQList[l];
                                var evalId = pq.evaluatedForId;

                                switch (pov) {
                                    case "Department":
                                        //First remove the Departments from the Department table
                                        //and then remove from the UserDepartment table.
                                        //LocalStorageUtility.deleteDepartmentForUserQuestionnaire(evalId, userId);
                                        break;

                                    case "Manager":
                                        this.deleteUserManagerForQuestionnaire(userId, qId, evalId);
                                        break;

                                    case "Person":
                                        //First check if the person is being used by any other questionnaire for same user.
                                        //Second, Check if the person is being used by any other questionnaire for other users.
                                        //Third, Check if the person is used by ActionPlanWizard for all user
                                        //Fourth , Check if the person is used by AskadeFileTypeWizard for all user.
                                        break;

                                    default:
                                        break;
                                }

                                this.deletePersonQuestionnaire(pq.Id);
                                this.deletePersonQuestionAnswers(pq.Id);
                                this.deleteValuationQuestionAnswers(pq.Id);
                            }
                        }

                        this.saveOfflineDb();
                    }
                },
                removeDownloadLogEntry: function removeDownloadLogEntry(userId) {
                    var offlineDb = this.OfflineStorage;
                    var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                    var downloadColl = offlineDb.getCollection("DownloadLog");
                    var downloadLogCollForUser = downloadColl.find({
                        userId: {
                            $eq: loggedInUser.Id,
                        },
                    });

                    for (var i = 0; i < downloadLogCollForUser.length; i++) {
                        var logEntry = downloadLogCollForUser[i];
                        downloadColl.remove(logEntry);
                    }

                    offlineDb.saveDatabase(function () {
                        //Stuff to do after the save to local storage.
                    });
                },
                startDownload: function startDownload(
                    startDate,
                    type,
                    userIdFromResponse
                ) {
                    var offlineDb = this.OfflineStorage;
                    var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                    var userId = loggedInUser[0].userId;

                    if (userId == null && userIdFromResponse != null) {
                        userId = userIdFromResponse;
                    }

                    var downloadColl = offlineDb.getCollection("DownloadLog");
                    var logEntry = downloadColl.findOne({
                        $and: [
                            {
                                type: {
                                    $eq: type,
                                },
                            },
                            {
                                userId: {
                                    $eq: userId,
                                },
                            },
                        ],
                    });
                    var id = null;

                    if (logEntry === null) {
                        id = guid();
                        var logEntry = {
                            Id: id,
                            startDate: startDate,
                            endDate: null,
                            type: type,
                            userId: userId,
                        };
                        downloadColl.insert(logEntry);
                    } else {
                        id = logEntry.Id;
                        logEntry.startDate = startDate;
                        logEntry.endDate = null;
                        downloadColl.update(logEntry);
                    }

                    offlineDb.saveDatabase(function () {
                        //Stuff to do after the save to local storage.
                    });
                    return id;
                },
                endDownload: function endDownload(endDate, logEntryId) {
                    var offlineDb = this.OfflineStorage;
                    var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                    var downloadColl = offlineDb.getCollection("DownloadLog");
                    var logEntry = downloadColl.findOne({
                        Id: {
                            $eq: logEntryId,
                        },
                    }); //Need to check where the logEntryId results the object logEntry the variable to be null, hence the null check.

                    if (logEntry !== null) {
                        logEntry.endDate = endDate;
                        downloadColl.update(logEntry);
                    }
                },
                getDownloadLogCount: function getDownloadLogCount() {
                    var offlineDb = this.OfflineStorage;
                    var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                    var userId = loggedInUser[0].userId;
                    var downloadColl = offlineDb.getCollection("DownloadLog");
                    var downloadCollList = downloadColl.find({
                        userId: {
                            $eq: userId,
                        },
                    });
                    return downloadCollList.length;
                },
                getDownloadLogList: function getDownloadLogList() {
                    var offlineDb = this.OfflineStorage;
                    var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                    var userId = loggedInUser[0].userId;
                    var downloadColl = offlineDb.getCollection("DownloadLog");
                    var downloadCollList = downloadColl.find({
                        userId: {
                            $eq: userId,
                        },
                    });
                    return downloadCollList;
                },
                getIfdownloadValidForAll: function getIfdownloadValidForAll() {
                    var count = this.getDownloadLogCount();
                    var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                    var userId = loggedInUser[0].userId;
                    var inCompleteDownloadList = [];
                    var userApps = this.getUserApplicationsByUser(userId);

                    for (var i = 1; i <= userApps.length; i++) {
                        var userAppId = userApps[i - 1].applicationId;
                        var application = this.getApplication(userAppId);
                        var moduleName = application.text;

                        var downloadValid = this._getIfDownloadIsValid(moduleName);

                        if (downloadValid === false) {
                            inCompleteDownloadList.push(application.translatedText);
                        }
                    }

                    return inCompleteDownloadList;
                },
                getIfdownloadValidForType: function getIfdownloadValidForType(type) {
                    return this._getIfDownloadIsValid(type);
                },
                _getIfDownloadIsValid: function _getIfDownloadIsValid(type) {
                    var offlineDb = this.OfflineStorage;
                    var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                    var userId = loggedInUser[0].userId;
                    var downloadColl = offlineDb.getCollection("DownloadLog");
                    var downloadCollList = downloadColl.find({
                        $and: [
                            {
                                userId: {
                                    $eq: userId,
                                },
                            },
                            {
                                type: {
                                    $eq: type,
                                },
                            },
                        ],
                    });

                    if (downloadCollList.length > 0) {
                        for (var i = 0; i < downloadCollList.length; i++) {
                            var logEntry = downloadCollList[i];

                            if (logEntry.endDate === null) {
                                return false;
                            }
                        } //if the list contains values and none of the end dates are not empty then return true..

                        return true;
                    } else {
                        // TODO: Review the condition
                        if (type === "UserDetails") {
                            return false;
                        } //The download list if length zero then it is still a valid download.

                        return true;
                    }
                },
                getDb: function getDb() {
                    var offlineDb = this.OfflineStorage;
                    return offlineDb.serialize();
                },
                getActiveApwListForProblem: function getActiveApwListForProblem() {
                    var activeApwList = this._getActionPlanOrProblems(1);

                    return activeApwList;
                },
                getActiveApwListForActionPlan:
                    function getActiveApwListForActionPlan() {
                        var activeApwList = this._getActionPlanOrProblems(2);

                        return activeApwList;
                    },
                _getTypeCodeForModule: function _getTypeCodeForModule(moduleName) {
                    var typeCode = -1;
                    moduleName = moduleName;

                    switch (moduleName) {
                        case "Apv":
                            typeCode = 1;
                            break;

                        case "RiskProfile":
                            typeCode = 2;
                            break;

                        case "ActionPlan":
                            typeCode = 3;
                            break;

                        case "Problem":
                            typeCode = 4;
                            break;

                        case "Administration":
                            typeCode = 5;
                            break;

                        case "EmployeeSatisfaction":
                            typeCode = 6;
                            break;

                        case "ManagementEvaluation":
                            typeCode = 7;
                            break;

                        case "Askade":
                            typeCode = 8;
                            break;

                        case "Insurance":
                            typeCode = 9;
                            break;

                        case "HumanResource":
                            typeCode = 10;
                            break;

                        case "FrontPlanner":
                            typeCode = 11;
                            break;

                        case "DocumentLibrary":
                            typeCode = 12;
                            break;

                        case "Claim":
                            typeCode = 13;
                            break;

                        default:
                            typeCode = -1;
                            break;
                    }

                    return typeCode;
                },
                getActiveQuestionnairesList: function getActiveQuestionnairesList(
                    moduleName
                ) {
                    var loggedInUser = this.getUserNameByLoggedInTimeStamp();

                    var typeCode = this._getTypeCodeForModule(moduleName);

                    var offlineDb = this.OfflineStorage;
                    var queCollection = offlineDb.getCollection("Questionnaire");
                    var personQuestionnaireCollTemplate = offlineDb.getCollection(
                        "PersonQuestionnaireTemplate"
                    );
                    var personQuestionnaireColl = offlineDb.getCollection(
                        "PersonQuestionnaire"
                    ); //Now, we have a list of questionnaires that are specific only to the user.

                    var qListForUser = queCollection
                        .find({
                            $and: [
                                {
                                    Id: {
                                        $gt: 0,
                                    },
                                },
                                {
                                    typeCode: typeCode,
                                },
                                {
                                    isSurvey: false,
                                },
                            ],
                        })
                        .sort(function (a, b) {
                            if (a.$loki == b.$loki) return 0;
                            if (a.$loki > b.$loki) return 1;
                            if (a.$loki < b.$loki) return -1;
                        });
                    var activeQuestionnaires = [];

                    for (var i = 0; i < qListForUser.length; i++) {
                        var queUser = qListForUser[i];
                        var isRepeatable = queUser.isRepeatable;

                        if (
                            isRepeatable === true &&
                            queUser.isRepeatableOnlyOnceForEvaluatingFor === true
                        ) {
                            isRepeatable = this.getIsRepeatableForQuestionnaire(queUser.Id);
                        }

                        if (isRepeatable === true) {
                            activeQuestionnaires.push(queUser);
                        } else {
                            var answeringCompleted = personQuestionnaireColl.findOne({
                                $and: [
                                    {
                                        questionnaireId: queUser.Id,
                                    },
                                    {
                                        answeringInProgress: false,
                                    },
                                    {
                                        answeringCompleted: true,
                                    },
                                    {
                                        personId: loggedInUser[0].personId,
                                    },
                                ],
                            });
                            var answeringInProgress = personQuestionnaireColl.findOne({
                                $and: [
                                    {
                                        questionnaireId: queUser.Id,
                                    },
                                    {
                                        answeringInProgress: true,
                                    },
                                    {
                                        answeringCompleted: false,
                                    },
                                    {
                                        personId: loggedInUser[0].personId,
                                    },
                                ],
                            });

                            if (answeringCompleted === null && answeringInProgress === null) {
                                activeQuestionnaires.push(queUser);
                            }
                        }
                    }

                    return activeQuestionnaires;
                },
                getAllQuestionnaireForSurvey: function getAllQuestionnaireForSurvey() {
                    var offlineDb = this.OfflineStorage;
                    var qColl = offlineDb.getCollection("Questionnaire");
                    var queCollection = qColl.find({
                        $and: [
                            {
                                Id: {
                                    $ne: "0",
                                },
                            },
                            {
                                isSurvey: true,
                            },
                        ],
                    });
                    return queCollection;
                },
                getAllCompletedQuestionnaireForSurvey:
                    function getAllCompletedQuestionnaireForSurvey() {
                        var answeredList = [];
                        var queCollectionFiltered = this.getAllQuestionnaireForSurvey();
                        var queCollection = queCollectionFiltered.sort(function (a, b) {
                            if (a.name == b.name) return 0;
                            if (a.name > b.name) return 1;
                            if (a.name < b.name) return -1;
                        });

                        for (var i = 0; i < queCollection.length; i++) {
                            var q = queCollection[i];
                            var queId = q.Id;

                            var pqColl = this._getPersonQuestionnaire(queId, "Completed");

                            answeredList.push({
                                qId: queId,
                                qName: q.name,
                                Answers: pqColl,
                            });
                        }

                        return answeredList;
                    },
                getActionPlanListForPerson: function getActionPlanListForPerson(
                    personId
                ) {
                    var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                    var offlineDb = this.OfflineStorage;
                    var apwCollection = offlineDb.getCollection("ActionPlanWizard");
                    return apwCollection.find({
                        Id: {
                            $gt: 0,
                        },
                    });
                },
                _getActionPlanOrProblems: function _getActionPlanOrProblems(typeCode) {
                    var offlineDb = this.OfflineStorage;
                    var apwCollection = offlineDb.getCollection("ActionPlanWizard");
                    var apwList = apwCollection.find({
                        typeCode: {
                            $eq: typeCode,
                        },
                    });
                    return apwList;
                },
                getInProgressQueList: function getInProgressQueList(typeCode) {
                    return this._getQuestionnaireList("InProgress", typeCode);
                },
                getCompletedQueList: function getCompletedQueList(typeCode) {
                    return this._getQuestionnaireList("Completed", typeCode);
                },
                getPersonQuestionnairesForQuestionnaire:
                    function getPersonQuestionnairesForQuestionnaire(
                        questionnaireId,
                        personId
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var personQuestionnaireColl = offlineDb.getCollection(
                            "PersonQuestionnaire"
                        );
                        return personQuestionnaireColl.find({
                            $and: [
                                {
                                    personId: {
                                        $eq: personId,
                                    },
                                },
                                {
                                    questionnaireId: {
                                        $eq: questionnaireId,
                                    },
                                },
                            ],
                        });
                    },
                getPersonQuestionnaire: function getPersonQuestionnaire(
                    personId,
                    managerId,
                    qId
                ) {
                    var offlineDb = this.OfflineStorage;
                    var personQuestionnaireColl = offlineDb.getCollection(
                        "PersonQuestionnaire"
                    );
                    return personQuestionnaireColl.findOne({
                        $and: [
                            {
                                personId: {
                                    $eq: personId,
                                },
                            },
                            {
                                evaluatedForId: {
                                    $eq: managerId,
                                },
                            },
                            {
                                questionnaireId: {
                                    $eq: qId,
                                },
                            },
                        ],
                    });
                },
                _getQuestionnaireList: function _getQuestionnaireList(
                    state,
                    moduleName
                ) {
                    var answeredList = [];
                    var offlineDb = this.OfflineStorage;

                    var typeCode = this._getTypeCodeForModule(moduleName);

                    var loggedInUser = this.getUserNameByLoggedInTimeStamp(); //Now, we have a list of questionnaires that are specific only to the user.

                    var qColl = offlineDb.getCollection("Questionnaire");
                    var queCollectionFiltered = qColl.find({
                        $and: [
                            {
                                Id: {
                                    $gt: 0,
                                },
                            },
                            {
                                typeCode: typeCode,
                            },
                            {
                                isSurvey: false,
                            },
                        ],
                    });
                    var queCollection = queCollectionFiltered.sort(function (a, b) {
                        if (a.name == b.name) return 0;
                        if (a.name > b.name) return 1;
                        if (a.name < b.name) return -1;
                    });

                    for (var i = 0; i < queCollection.length; i++) {
                        var q = queCollection[i];
                        var queId = q.Id;

                        var pqColl = this._getPersonQuestionnaire(queId, state);

                        answeredList.push({
                            qId: queId,
                            qName: q.name,
                            Answers: pqColl,
                        });
                    }

                    return answeredList;
                },
                _getQuestionnaireAll: function _getQuestionnaireAll() {
                    var offlineDb = this.OfflineStorage;
                    var qColl = offlineDb.getCollection("Questionnaire");
                    var queCollection = qColl.find({
                        Id: {
                            $ne: "0",
                        },
                    });
                    return queCollection;
                },
                getPersonQuestionnaireListByQuestionnaireId:
                    function getPersonQuestionnaireListByQuestionnaireId(
                        questionnaireId,
                        state
                    ) {
                        return this._getPersonQuestionnaire(questionnaireId, state);
                    },
                _getPersonQuestionnaire: function _getPersonQuestionnaire(
                    questionnaireId,
                    state
                ) {
                    var offlineDb = this.OfflineStorage;
                    var personQuestionnaireColl = offlineDb.getCollection(
                        "PersonQuestionnaire"
                    );
                    var tempAnsweringInProgress = false;
                    var tempAnsweringCompleted = false;

                    switch (state) {
                        case "InProgress":
                            tempAnsweringInProgress = true;
                            break;

                        case "Completed":
                            tempAnsweringCompleted = true;
                            break;

                        default:
                            break;
                    }

                    var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                    return personQuestionnaireColl.find({
                        $and: [
                            {
                                questionnaireId: questionnaireId,
                            },
                            {
                                answeringInProgress: tempAnsweringInProgress,
                            },
                            {
                                answeringCompleted: tempAnsweringCompleted,
                            },
                            {
                                personId: {
                                    $eq: loggedInUser[0].personId,
                                },
                            },
                        ],
                    });
                },

                /*Returns a dynamic view object which returns view for getting a list of questionnaires*/
                getQuestionnairesList: function getQuestionnairesList() {
                    var offlineDb = this.OfflineStorage;
                    var questionnaireCollection =
                        offlineDb.getCollection("Questionnaire"); //console.log(questionnaireCollection);

                    return questionnaireCollection.data;
                },
                getAllQuestionnaires: function getAllQuestionnaires() {
                    var offlineDb = this.OfflineStorage;
                    var questionnaireCollection =
                        offlineDb.getCollection("Questionnaire");
                    return questionnaireCollection.find({
                        Id: {
                            $gt: 0,
                        },
                    });
                },

                /*Returns a dynamic view object which returns view for getting a single questionnaire based on the id passed */
                getQuestionnaireById: function getQuestionnaireById(questionnaireId) {
                    var offlineDb = this.OfflineStorage;
                    var questionnaireCollection =
                        offlineDb.getCollection("Questionnaire");
                    return questionnaireCollection.findOne({
                        Id: {
                            $eq: questionnaireId,
                        },
                    });
                },

                /* Returns a dynamic object which returns view for getting QuestionGroups(collection) 
                   for a particular questionnaire based on the Id passed */
                getQuestionGroupByQuestionnaireId:
                    function getQuestionGroupByQuestionnaireId(questionnaireId) {
                        var offlineDb = this.OfflineStorage;
                        var questionGroupCollection =
                            offlineDb.getCollection("QuestionGroup");
                        var qgColl = questionGroupCollection.find({
                            questionnaireId: {
                                $eq: questionnaireId,
                            },
                        }); // Changes as part of FT 6664 Sort order issue when one question per group

                        var basicSortedColl = this._sortString(qgColl);

                        return basicSortedColl.sort(function (a, b) {
                            if (a.sortOrder == b.sortOrder) return 0;
                            if (a.sortOrder > b.sortOrder) return 1;
                            if (a.sortOrder < b.sortOrder) return -1;
                        });
                    },
                getQuestion: function getQuestion(questionId) {
                    var offlineDb = this.OfflineStorage;
                    var questionCollection = offlineDb.getCollection("Question");
                    var q = questionCollection.findOne({
                        Id: {
                            $eq: questionId,
                        },
                    });
                    return q;
                },
                getValuationQuestion: function getValuationQuestion(
                    valuationQuestionId
                ) {
                    var offlineDb = this.OfflineStorage;
                    var valQueCollection = offlineDb.getCollection("ValuationQuestion");
                    var vq = valQueCollection.findOne({
                        Id: {
                            $eq: valuationQuestionId,
                        },
                    });
                    return vq;
                },
                addExceptionToLogTable: function addExceptionToLogTable(
                    exception,
                    cause
                ) {
                    var offlineDb = this.OfflineStorage;
                    var errorLogCollection = offlineDb.getCollection("ErrorLog");

                    var insertErrorLog = {
                        name: exception.name,
                        message: exception.message,
                        internalCause: exception.cause,
                        stack: exception.stack,
                        toStringValue: exception.toString(),
                        externalCause: cause,
                    };
                    errorLogCollection.insert(insertErrorLog);
                    offlineDb.saveDatabase(function () { });
                },
                getErrorData: function getErrorData() {
                    var offlineDb = this.OfflineStorage;
                    var errorLogCollection = offlineDb.getCollection("ErrorLog");
                    var result = errorLogCollection.chain().data();
                    return result;
                },
                clearErrorLogData: function clearErrorLogData() {
                    var offlineDb = this.OfflineStorage;
                    var errorLogCollection = offlineDb.getCollection("ErrorLog");
                    errorLogCollection.removeDataOnly();
                },
                deleteValuationQuestionAnswersTemplate:
                    function deleteValuationQuestionAnswersTemplate(pqTemplateId) {
                        var offlineDb = this.OfflineStorage;
                        var valQueAnswerCollection = offlineDb.getCollection(
                            "PersonValuationQuestionAnswerTemplate"
                        );
                        valQueAnswerCollection.removeWhere(function (valQAnswer) {
                            return valQAnswer.personQuestionnaireId === pqTemplateId;
                        });
                    },
                deleteValuationQuestionAnswers: function deleteValuationQuestionAnswers(
                    personQuestionnaireId
                ) {
                    var offlineDb = this.OfflineStorage;
                    var valQueAnswerCollection = offlineDb.getCollection(
                        "PersonValuationQuestionAnswer"
                    );
                    valQueAnswerCollection.removeWhere(function (valQAnswer) {
                        return valQAnswer.personQuestionnaireId === personQuestionnaireId;
                    });
                },
                deleteValuationQuestions: function deleteValuationQuestions(
                    questionnaireId
                ) {
                    var offlineDb = this.OfflineStorage;
                    var valQueCollection = offlineDb.getCollection("ValuationQuestion");
                    valQueCollection.removeWhere(function (valQ) {
                        return valQ.questionnaireId === questionnaireId;
                    });
                },
                deleteValuationQuestionByValQueId:
                    function deleteValuationQuestionByValQueId(valQueId) {
                        var offlineDb = this.OfflineStorage;
                        var valQueCollection = offlineDb.getCollection("ValuationQuestion");
                        valQueCollection.removeWhere(function (valQ) {
                            return valQ.Id === valQueId;
                        });
                    },
                deleteValuationQuestionAnswersTemplateByValQueId:
                    function deleteValuationQuestionAnswersTemplateByValQueId(valQueId) {
                        var offlineDb = this.OfflineStorage;
                        var valQueAnswerCollection = offlineDb.getCollection(
                            "PersonValuationQuestionAnswerTemplate"
                        );
                        valQueAnswerCollection.removeWhere(function (valQAnswer) {
                            return valQAnswer.valuationQuestionId === valQueId;
                        });
                    },
                deleteValuationQuestionAnswersByValQueId:
                    function deleteValuationQuestionAnswersByValQueId(valQueId) {
                        var offlineDb = this.OfflineStorage;
                        var valQueAnswerCollection = offlineDb.getCollection(
                            "PersonValuationQuestionAnswer"
                        );
                        valQueAnswerCollection.removeWhere(function (valQAnswer) {
                            return valQAnswer.valuationQuestionId === valQueId;
                        });
                    },
                getValuationQuestionsByQuestionnaireId:
                    function getValuationQuestionsByQuestionnaireId(questionnaireId) {
                        var offlineDb = this.OfflineStorage;
                        var valQueCollection = offlineDb.getCollection("ValuationQuestion");
                        var vqColl = valQueCollection.find({
                            questionnaireId: {
                                $eq: questionnaireId,
                            },
                        });
                        return vqColl.sort(function (a, b) {
                            if (a.sortOrder == b.sortOrder) return 0;
                            if (a.sortOrder > b.sortOrder) return 1;
                            if (a.sortOrder < b.sortOrder) return -1;
                        });
                    },
                getQuestionTriggers: function getQuestionTriggers(questionId) {
                    var offlineDb = this.OfflineStorage;
                    var qtCollection = offlineDb.getCollection("QuestionTrigger");
                    return qtCollection.find({
                        questionId: {
                            $eq: questionId,
                        },
                    });
                },
                getQuestionTrigger: function getQuestionTrigger(
                    questionId,
                    triggerQuestionId,
                    triggerAnswerId
                ) {
                    var offlineDb = this.OfflineStorage;
                    var qtCollection = offlineDb.getCollection("QuestionTrigger");
                    return qtCollection.findOne({
                        $and: [
                            {
                                questionId: {
                                    $eq: questionId,
                                },
                            },
                            {
                                triggerQuestionId: {
                                    $eq: triggerQuestionId,
                                },
                            },
                            {
                                triggerAnswerId: {
                                    $eq: triggerAnswerId,
                                },
                            },
                        ],
                    });
                },

                /*Returns a dynamic view object which returns view for getting 
                  Questions based on the questiongroupId sent as a parameter. */
                getQuestionByQuestionGroupId: function getQuestionByQuestionGroupId(
                    questionGroupId
                ) {
                    var offlineDb = this.OfflineStorage;
                    var questionCollection = offlineDb.getCollection("Question");
                    var queColl = questionCollection.find({
                        questionGroupId: {
                            $eq: questionGroupId,
                        },
                    });
                    return queColl.sort(function (a, b) {
                        if (a.sortOrder == b.sortOrder) return 0;
                        if (a.sortOrder > b.sortOrder) return 1;
                        if (a.sortOrder < b.sortOrder) return -1;
                    });
                },
                savePersonValuationQAsTemplate: function savePersonValuationQAsTemplate(
                    vAnswers,
                    newPqId
                ) {
                    var offlineDb = this.OfflineStorage;
                    var personVQACollection = offlineDb.getCollection(
                        "PersonValuationQuestionAnswer"
                    );
                    var savingPVQA = [];

                    for (var i = 0; i < vAnswers.length; i++) {
                        var pvqa = vAnswers[i];
                        var inserPVQA = {
                            Id: guid(),
                            personQuestionnaireId: newPqId,
                            questionId: pvqa.QuestionId,
                            valuationQuestionId: pvqa.ValuationQuestionId,
                            answerId: pvqa.AnswerId,
                            answerText: pvqa.AnswerText,
                        };
                        savingPVQA.push(inserPVQA);
                    }

                    personVQACollection.insert(savingPVQA);
                    var newVal = personVQACollection.find({
                        personQuestionnaireId: {
                            $eq: newPqId,
                        },
                    });
                    return newVal;
                },
                savePersonQuestionAnswersTemplate:
                    function savePersonQuestionAnswersTemplate(answers, newPqId) {
                        var offlineDb = this.OfflineStorage;
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var personQuestionAnswerInsert = [];
                        var personQuestionAnswerCollection = offlineDb.getCollection(
                            "PersonQuestionAnswer"
                        );

                        for (var i = 0; i < answers.length; i++) {
                            var personQuestionAnswer = answers[i];
                            var personQuestionAnswerData = {
                                Id: guid(),
                                personQuestionnaireId: newPqId,
                                questionId: personQuestionAnswer.QuestionId,
                                answerId: personQuestionAnswer.AnswerId,
                                answerText: personQuestionAnswer.AnswerText,
                                answerImage: personQuestionAnswer.AnswerImage,
                                isDoneSign: personQuestionAnswer.IsDoneSign,
                                comment: personQuestionAnswer.Comment,
                                fileName: personQuestionAnswer.FileName,
                                fileSourceBase64: personQuestionAnswer.FileSourceBase64,
                                fileLocation: personQuestionAnswer.FileLocation,
                                internalFileLocation: personQuestionAnswer.InternalFileLocation,
                                createdDate: personQuestionAnswer.CreatedDate,
                            };
                            personQuestionAnswerInsert.push(personQuestionAnswerData);
                        }

                        personQuestionAnswerCollection.insert(personQuestionAnswerInsert);
                        return personQuestionAnswerCollection.find({
                            personQuestionnaireId: {
                                $eq: newPqId,
                            },
                        });
                    },
                savePersonQuestionnaireTemplate:
                    function savePersonQuestionnaireTemplate(
                        pqAnswered,
                        isAnsweringComplete
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var personQuestionnaireCollection = offlineDb.getCollection(
                            "PersonQuestionnaire"
                        );
                        var pqExisting = personQuestionnaireCollection.findOne({
                            Id: {
                                $eq: pqAnswered.Id,
                            },
                        });
                        var ansInProgress = false;
                        var ansCompleted = false;

                        if (isAnsweringComplete !== null) {
                            ansInProgress = !isAnsweringComplete;
                            ansCompleted = isAnsweringComplete;
                        }

                        var pqId = null;
                        var pq = {
                            Id: guid(),
                            questionnaireId: pqAnswered.QuestionnaireId,
                            answerByPersonId: pqAnswered.AnswerByPersonId,
                            personId: pqAnswered.AnswerByPersonId,
                            departmentId: pqAnswered.DepartmentId,
                            evaluatedForId: pqAnswered.EvaluatedForId,
                            geoX: pqAnswered.GeoX,
                            geoY: pqAnswered.GeoY,
                            initiatedDate: pqAnswered.InitiatedDate,
                            isAnonymous: pqAnswered.IsAnonymous,
                            answeringInProgress: ansInProgress,
                            answeringCompleted: ansCompleted,
                            lastGroupIndex: pqAnswered.LastGroupIndex,
                            address: pqAnswered.Address,
                            surveyCompletedDate: pqAnswered.SurveyCompletedDate,
                            surveyHistoryFromDate: pqAnswered.SurveyHistoryFromDate,
                            surveyHistoryToDate: pqAnswered.SurveyHistoryToDate,
                        };
                        personQuestionnaireCollection.insert(pq);
                        return personQuestionnaireCollection.findOne({
                            Id: {
                                $eq: pq.Id,
                            },
                        });
                    },
                savePersonQuestionnaire: function savePersonQuestionnaire(
                    pqUpdated,
                    isAnsweringComplete
                ) {
                    var offlineDb = this.OfflineStorage;
                    var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                    var personQuestionAnswerUpdate = [];
                    var personValuationQuestionAnswerUpdate = [];
                    var personQuestionnaireCollection = offlineDb.getCollection(
                        "PersonQuestionnaire"
                    );
                    var pqExisting = personQuestionnaireCollection.findOne({
                        Id: {
                            $eq: pqUpdated.Id,
                        },
                    });
                    pqExisting.questionnaireId = pqUpdated.QuestionnaireId;
                    pqExisting.personId = pqUpdated.PersonId;
                    pqExisting.departmentId = pqUpdated.DepartmentId;
                    pqExisting.evaluatedForId = pqUpdated.EvaluatedForId;
                    pqExisting.geoX = pqUpdated.GeoX;
                    pqExisting.geoY = pqUpdated.GeoY;
                    pqExisting.answerByPersonId = pqUpdated.AnswerByPersonId;
                    pqExisting.answeringInProgress = !(pqExisting.answeringCompleted =
                        isAnsweringComplete);
                    pqExisting.lastGroupIndex = pqUpdated.LastGroupIndex;
                    pqExisting.initiatedDate = pqUpdated.InitiatedDate;
                    pqExisting.address = pqUpdated.Address;
                    var pqaCollection = offlineDb.getCollection("PersonQuestionAnswer");

                    for (var i = 0; i < pqUpdated.Answers.length; i++) {
                        var pqa = pqUpdated.Answers[i];
                        var pqaExisting = pqaCollection.findOne({
                            Id: {
                                $eq: pqa.Id,
                            },
                        });
                        pqaExisting.answerId = pqa.AnswerId;
                        pqaExisting.answerText = pqa.AnswerText;
                        pqaExisting.answerImage = pqa.AnswerImage;
                        pqaExisting.isDoneSign = pqa.IsDoneSign;
                        pqaExisting.comment = pqa.Comment;
                        pqaExisting.fileName = pqa.FileName;
                        pqaExisting.fileLocation = pqa.FileLocation;
                        pqaExisting.internalFileLocation = pqa.InternalFileLocation;
                        personQuestionAnswerUpdate.push(pqaExisting);
                    }

                    var personVQACollection = offlineDb.getCollection(
                        "PersonValuationQuestionAnswer"
                    );

                    for (var j = 0; j < pqUpdated.ValuationAnswers.length; j++) {
                        var pvqa = pqUpdated.ValuationAnswers[j];
                        var pvqaExisting = personVQACollection.findOne({
                            Id: {
                                $eq: pvqa.Id,
                            },
                        });
                        pvqaExisting.answerId = pvqa.AnswerId;
                        pvqaExisting.answerText = pvqa.AnswerText;
                        personValuationQuestionAnswerUpdate.push(pvqaExisting);
                    }

                    personVQACollection.update(personValuationQuestionAnswerUpdate);
                    this.saveOfflineDb();
                    pqaCollection.update(personQuestionAnswerUpdate);
                    this.saveOfflineDb();
                    personQuestionnaireCollection.update(pqExisting);
                    this.saveOfflineDb();
                    return pqExisting;
                },

                /* Returns a dynamic view object which returns view for 
                getting PersonQuestionnaire based on the personQuestionnaireId */
                getPersonQuestionnaireByQuestionnaire:
                    function getPersonQuestionnaireByQuestionnaire(questionnaireId) {
                        var offlineDb = this.OfflineStorage;
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var personQuestionnaireCollection = offlineDb.getCollection(
                            "PersonQuestionnaire"
                        );
                        var pq = personQuestionnaireCollection.findOne({
                            $and: [
                                {
                                    questionnaireId: {
                                        $eq: questionnaireId,
                                    },
                                },
                                {
                                    personId: {
                                        $eq: loggedInUser[0].personId,
                                    },
                                },
                            ],
                        });
                        return pq;
                    },
                getPersonQuestionnairesByQuestionnaire:
                    function getPersonQuestionnairesByQuestionnaire(questionnaireId) {
                        var offlineDb = this.OfflineStorage;
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var personQuestionnaireCollection = offlineDb.getCollection(
                            "PersonQuestionnaire"
                        );
                        var pqs = personQuestionnaireCollection.find({
                            $and: [
                                {
                                    questionnaireId: {
                                        $eq: questionnaireId,
                                    },
                                },
                                {
                                    personId: {
                                        $eq: loggedInUser[0].personId,
                                    },
                                },
                            ],
                        });
                        return pqs;
                    },
                getPersonQuestionnaireByQuestionnaireTemplate:
                    function getPersonQuestionnaireByQuestionnaireTemplate(
                        questionnaireId
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var personQuestionnaireCollection = offlineDb.getCollection(
                            "PersonQuestionnaireTemplate"
                        );
                        return personQuestionnaireCollection.findOne({
                            $and: [
                                {
                                    questionnaireId: {
                                        $eq: questionnaireId,
                                    },
                                },
                                {
                                    personId: {
                                        $eq: loggedInUser[0].personId,
                                    },
                                },
                            ],
                        });
                    },
                getPersonQuestionnaireByQuestionnaireId:
                    function getPersonQuestionnaireByQuestionnaireId(questionnaireId) {
                        var offlineDb = this.OfflineStorage;
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var personQuestionnaireCollection = offlineDb.getCollection(
                            "PersonQuestionnaireTemplate"
                        );
                        return personQuestionnaireCollection.find({
                            questionnaireId: {
                                $eq: questionnaireId,
                            },
                        });
                    },
                getPersonQuestionnaireFromTemplate:
                    function getPersonQuestionnaireFromTemplate(personQuestionnaireId) {
                        var offlineDb = this.OfflineStorage;
                        var personQuestionnaireCollection = offlineDb.getCollection(
                            "PersonQuestionnaireTemplate"
                        );
                        return personQuestionnaireCollection.findOne({
                            Id: {
                                $eq: personQuestionnaireId,
                            },
                        });
                    },
                getPersonQuestionnaireById: function getPersonQuestionnaireById(
                    personQuestionnaireId
                ) {
                    var offlineDb = this.OfflineStorage;
                    var personQuestionnaireCollection = offlineDb.getCollection(
                        "PersonQuestionnaire"
                    );
                    var pq = personQuestionnaireCollection.findOne({
                        Id: {
                            $eq: personQuestionnaireId,
                        },
                    });
                    return pq;
                },
                getPersonValuationQuestionAnswersFromTemplate:
                    function getPersonValuationQuestionAnswersFromTemplate(
                        personQuestionnaireId
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var personQuestionAnswerCollectionTemplate =
                            offlineDb.getCollection("PersonValuationQuestionAnswerTemplate");
                        var pq = personQuestionAnswerCollectionTemplate.find({
                            personQuestionnaireId: {
                                $eq: personQuestionnaireId,
                            },
                        });
                        return pq;
                    },
                getPersonValuationQuestionAnswerFromTemplate:
                    function getPersonValuationQuestionAnswerFromTemplate(
                        personQuestionnaireId,
                        questionId,
                        valQueId
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var personQuestionAnswerCollectionTemplate =
                            offlineDb.getCollection("PersonValuationQuestionAnswerTemplate");
                        var pq = personQuestionAnswerCollectionTemplate.findOne({
                            $and: [
                                {
                                    personQuestionnaireId: {
                                        $eq: personQuestionnaireId,
                                    },
                                },
                                {
                                    questionId: {
                                        $eq: questionId,
                                    },
                                },
                                {
                                    valuationQuestionId: {
                                        $eq: valQueId,
                                    },
                                },
                            ],
                        });
                        return pq;
                    },
                getPersonValuationQuestionAnswers:
                    function getPersonValuationQuestionAnswers(personQuestionnaireId) {
                        var offlineDb = this.OfflineStorage;
                        var personValuationQuestionAnswerCollection =
                            offlineDb.getCollection("PersonValuationQuestionAnswer");
                        var pq = personValuationQuestionAnswerCollection.find({
                            personQuestionnaireId: {
                                $eq: personQuestionnaireId,
                            },
                        });
                        return pq;
                    },
                getPersonQuestionAnswersFromTemplate:
                    function getPersonQuestionAnswersFromTemplate(personQuestionnaireId) {
                        var offlineDb = this.OfflineStorage;
                        var personQuestionAnswerCollectionTemplate =
                            offlineDb.getCollection("PersonQuestionAnswerTemplate");
                        var pq = personQuestionAnswerCollectionTemplate.find({
                            personQuestionnaireId: {
                                $eq: personQuestionnaireId,
                            },
                        });
                        return pq;
                    },
                getPersonQuestionAnswerFromTemplate:
                    function getPersonQuestionAnswerFromTemplate(pqaId) {
                        var offlineDb = this.OfflineStorage;
                        var personQuestionAnswerTemplateCollection =
                            offlineDb.getCollection("PersonQuestionAnswerTemplate");
                        var pq = personQuestionAnswerTemplateCollection.findOne({
                            Id: {
                                $eq: pqaId,
                            },
                        });
                        return pq;
                    },
                getPersonQuestionAnswerByPQIdAndQuestionId:
                    function getPersonQuestionAnswerByPQIdAndQuestionId(
                        pqId,
                        questionId,
                        isTemplate
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var tableName = isTemplate
                            ? "PersonQuestionAnswerTemplate"
                            : "PersonQuestionAnswer";
                        var personQuestionAnswerCollection =
                            offlineDb.getCollection(tableName);
                        return personQuestionAnswerCollection.findOne({
                            $and: [
                                {
                                    personQuestionnaireId: {
                                        $eq: pqId,
                                    },
                                },
                                {
                                    questionId: {
                                        $eq: questionId,
                                    },
                                },
                            ],
                        });
                    },
                getPersonQuestionAnswer: function getPersonQuestionAnswer(pqaId) {
                    var offlineDb = this.OfflineStorage;
                    var personQuestionAnswerCollection = offlineDb.getCollection(
                        "PersonQuestionAnswer"
                    );
                    var pq = personQuestionAnswerCollection.findOne({
                        Id: {
                            $eq: pqaId,
                        },
                    });
                    return pq;
                },

                /* Returns a dynamic view which contains a collection of records that match the personQuestionnaireId returns a collection*/
                getPersonQuestionAnswers: function getPersonQuestionAnswers(
                    personQuestionnaireId
                ) {
                    var offlineDb = this.OfflineStorage;
                    var personQuestionAnswerCollection = offlineDb.getCollection(
                        "PersonQuestionAnswer"
                    );
                    var pq = personQuestionAnswerCollection.find({
                        personQuestionnaireId: {
                            $eq: personQuestionnaireId,
                        },
                    });
                    return pq;
                },
                getQuestionGroup: function getQuestionGroup(questionGroupId) {
                    var offlineDb = this.OfflineStorage;
                    var questionGroupCollection =
                        offlineDb.getCollection("QuestionGroup");
                    var qg = questionGroupCollection.findOne({
                        Id: {
                            $eq: questionGroupId,
                        },
                    });
                    return qg;
                },
                checkIfGroupIsUsed: function checkIfGroupIsUsed(questionGroupId) {
                    var offlineDb = this.OfflineStorage;
                    var questionGroupCollection =
                        offlineDb.getCollection("QuestionGroup");
                    var qgs = questionGroupCollection.find({
                        Id: {
                            $eq: questionGroupId,
                        },
                    });

                    if (qgs.length > 1) {
                        return true;
                    }

                    return false;
                },
                getAnswerGroup: function getAnswerGroup(answerGroupId) {
                    var offlineDb = this.OfflineStorage;
                    var answerGroupCollection = offlineDb.getCollection("AnswerGroup");
                    var ag = answerGroupCollection.findOne({
                        Id: {
                            $eq: answerGroupId,
                        },
                    });
                    return ag;
                },
                getAnswerOption: function getAnswerOption(answerOptionId) {
                    var offlineDb = this.OfflineStorage;
                    var answerOptionsCollection = offlineDb.getCollection("AnswerOption");
                    return answerOptionsCollection.findOne({
                        Id: {
                            $eq: answerOptionId,
                        },
                    });
                },
                getValuationAnswerOptions: function getValuationAnswerOptions(
                    valAnswerGroupId
                ) {
                    var offlineDb = this.OfflineStorage;
                    var valAOColl = offlineDb.getCollection("ValuationAnswerGroup");
                    var valAnswerOptionsColl = valAOColl.find({
                        valuationAnswerGroupId: {
                            $eq: valAnswerGroupId,
                        },
                    });
                    return valAnswerOptionsColl.sort(function (a, b) {
                        if (a.sortOrder == b.sortOrder) return 0;
                        if (a.sortOrder > b.sortOrder) return 1;
                        if (a.sortOrder < b.sortOrder) return -1;
                    });
                },
                getAnswerOptions: function getAnswerOptions(answerGroupId) {
                    var offlineDb = this.OfflineStorage;
                    var answerOptionsCollection = offlineDb.getCollection("AnswerOption");
                    var answerOptionsColl = answerOptionsCollection.find({
                        answerGroupId: {
                            $eq: answerGroupId,
                        },
                    });
                    return answerOptionsColl.sort(function (a, b) {
                        if (a.sortOrder == b.sortOrder) return 0;
                        if (a.sortOrder > b.sortOrder) return 1;
                        if (a.sortOrder < b.sortOrder) return -1;
                    });
                },
                getAnswerOptionsOnlyQuestion: function getAnswerOptionsOnlyQuestion(
                    questionId
                ) {
                    var offlineDb = this.OfflineStorage;
                    var answerOptionsCollection = offlineDb.getCollection("AnswerOption");
                    var answerOptionsColl = answerOptionsCollection.find({
                        questionId: {
                            $eq: questionId,
                        },
                    });
                    return answerOptionsColl.sort(function (a, b) {
                        if (a.sortOrder == b.sortOrder) return 0;
                        if (a.sortOrder > b.sortOrder) return 1;
                        if (a.sortOrder < b.sortOrder) return -1;
                    });
                },
                getValuationAnswerOptionsByVQ: function getValuationAnswerOptionsByVQ(
                    valuationQuestionId
                ) {
                    var offlineDb = this.OfflineStorage;
                    var valAnswerOptionsColl = offlineDb.getCollection(
                        "ValuationAnswerOption"
                    );
                    var vAOColl = valAnswerOptionsColl.find({
                        valuationQuestionId: {
                            $eq: valuationQuestionId,
                        },
                    });
                    return vAOColl.sort(function (a, b) {
                        if (a.sortOrder == b.sortOrder) return 0;
                        if (a.sortOrder > b.sortOrder) return 1;
                        if (a.sortOrder < b.sortOrder) return -1;
                    });
                },
                getValuationAnswerOptionsByVAGId:
                    function getValuationAnswerOptionsByVAGId(valuationAnswerGroupId) {
                        var offlineDb = this.OfflineStorage;
                        var valAnswerOptionsColl = offlineDb.getCollection(
                            "ValuationAnswerOption"
                        );
                        var vAOColl = valAnswerOptionsColl.find({
                            valuationAnswerGroupId: {
                                $eq: valuationAnswerGroupId,
                            },
                        });
                        return vAOColl.sort(function (a, b) {
                            if (a.sortOrder == b.sortOrder) return 0;
                            if (a.sortOrder > b.sortOrder) return 1;
                            if (a.sortOrder < b.sortOrder) return -1;
                        });
                    },
                getValuationAnswerOptionByVAOId:
                    function getValuationAnswerOptionByVAOId(valuationAnswerOptionId) {
                        var offlineDb = this.OfflineStorage;
                        var valAnswerOptionsColl = offlineDb.getCollection(
                            "ValuationAnswerOption"
                        );
                        var vAO = valAnswerOptionsColl.findOne({
                            valuationAnswerGroupId: {
                                $eq: valuationAnswerOptionId,
                            },
                        });
                        return vAO;
                    },
                getValuationAnswerOptionsByValuationQuestion:
                    function getValuationAnswerOptionsByValuationQuestion(
                        valuationQuestionId
                    ) {
                        var vq = this.getValuationQuestion(valuationQuestionId);
                        var valuationAnswerGroupId = vq.valuationAnswerGroupId;
                        var vAoList = [];

                        if (valuationAnswerGroupId === null) {
                            vAoList = this.getValuationAnswerOptionsByVQ(valuationQuestionId);
                        } else {
                            vAoList = this.getValuationAnswerOptionsByVAGId(
                                valuationAnswerGroupId
                            );
                        }

                        return vAoList;
                    },
                getAnswerOptionsByQuestion: function getAnswerOptionsByQuestion(
                    questionId
                ) {
                    var question = this.getQuestion(questionId);
                    var questionGroup = this.getQuestionGroup(question.questionGroupId);
                    var questionnaire = this.getQuestionnaireById(
                        questionGroup.questionnaireId
                    );
                    var answerGroupId = questionnaire.answerGroupId;

                    if (answerGroupId != null) {
                        return this.getAnswerOptions(answerGroupId);
                    } else {
                        var answerGroupIdAtGroupLevel = questionGroup.answerGroupId;

                        if (answerGroupIdAtGroupLevel != null) {
                            return this.getAnswerOptions(answerGroupIdAtGroupLevel);
                        } else {
                            var answerGroupIdAtQuestionLevel = question.answerGroupId;

                            if (answerGroupIdAtQuestionLevel != null) {
                                return this.getAnswerOptions(answerGroupIdAtQuestionLevel);
                            } else {
                                return this.getAnswerOptionsOnlyQuestion(questionId);
                            }
                        }
                    }

                    return [];
                },
                getAnswerOptionsByQuestionnaire:
                    function getAnswerOptionsByQuestionnaire(questionnaireId) {
                        var questionGroups =
                            this.getQuestionGroupByQuestionnaireId(questionnaireId);
                        var answerOptions = [];

                        for (var i = 0; i < questionGroups.length; i++) {
                            var qg = questionGroups[i];
                            var questions = this.getQuestionByQuestionGroupId(qg.Id);

                            for (var j = 0; j < questions.length; j++) {
                                var question = questions[j];
                                var aos = this.getAnswerOptionsByQuestionId(question.Id);

                                for (var k = 0; k < aos.length; k++) {
                                    var ao = aos[k];
                                    var exists = false;

                                    for (var l = 0; l < answerOptions.length; l++) {
                                        var existingAo = answerOptions[l];

                                        if (existingAo.Id == ao.Id) {
                                            exists = true;
                                            break;
                                        }
                                    }

                                    if (!exists) {
                                        answerOptions.push(ao);
                                    }
                                }
                            }
                        }

                        return answerOptions.sort(function (a, b) {
                            if (a.sortOrder == b.sortOrder) return 0;
                            if (a.sortOrder > b.sortOrder) return 1;
                            if (a.sortOrder < b.sortOrder) return -1;
                        });
                    },
                deleteValuationAnswerGroup: function deleteValuationAnswerGroup(
                    valAnswerGroupId
                ) {
                    var offlineDb = this.OfflineStorage;
                    var agColl = offlineDb.getCollection("ValuationAnswerGroup");
                    var ag = agColl.findOne({
                        Id: {
                            $eq: valAnswerGroupId,
                        },
                    });
                    agColl.remove(ag);
                },
                deleteValuationAnswerOptionByValuationGroup:
                    function deleteValuationAnswerOptionByValuationGroup(
                        valAnswerGroupId
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var vAOColl = offlineDb.getCollection("ValuationAnswerOption");
                        vAOColl.removeWhere(function (valAo) {
                            return valAo.valuationAnswerGroupId === valAnswerGroupId;
                        });
                    },
                deleteAnswerGroup: function deleteAnswerGroup(answerGroupId) {
                    var offlineDb = this.OfflineStorage;
                    var agColl = offlineDb.getCollection("AnswerGroup");
                    var ag = agColl.findOne({
                        Id: {
                            $eq: answerGroupId,
                        },
                    });
                    agColl.remove(ag);
                },
                deleteAnswerOption: function deleteAnswerOption(answerOptionId) {
                    var offlineDb = this.OfflineStorage;
                    var aoColl = offlineDb.getCollection("AnswerOption");
                    var ao = aoColl.findOne({
                        Id: {
                            $eq: answerOptionId,
                        },
                    });
                    aoColl.remove(ao);
                },
                deleteAnswerOptionsByAnswerGroup:
                    function deleteAnswerOptionsByAnswerGroup(answerGroupId) {
                        var offlineDb = this.OfflineStorage;
                        var aoColl = offlineDb.getCollection("AnswerOption");
                        var aos = aoColl.find({
                            answerGroupId: {
                                $eq: answerGroupId,
                            },
                        });

                        for (var i = 0; i < aos.length; i++) {
                            aoColl.remove(aos[i]);
                        }
                    },
                // Below method returns the number of questions for the specified questionnaire group id.
                getUsedAnswerGroupCountForQuestion:
                    function getUsedAnswerGroupCountForQuestion(
                        answerGroupId,
                        currentQuestionGroupId
                    ) {
                        var qList = this.getQuestionByQuestionGroupId(
                            currentQuestionGroupId
                        );

                        for (var i = 0; i < qList.length; i++) {
                            var q = qList[i];

                            if (q.answerGroupId === answerGroupId) {
                                return true;
                            }
                        }

                        return false;
                    },
                getUsedAnswerGroupCountForQuestionGroup:
                    function getUsedAnswerGroupCountForQuestionGroup(
                        answerGroupId,
                        currentQuestionnaireId
                    ) {
                        var qgs = this.getQuestionGroupByQuestionnaireId(
                            currentQuestionnaireId
                        );

                        for (var i = 0; i < qgs.length; i++) {
                            var qg = qgs[i];
                            var ansGrpIdAtGroupLevel = qg.answerGroupId; // If answer group id at group level is null or undefined
                            // it checks for answer group id at question level.

                            if (ansGrpIdAtGroupLevel) {
                                if (ansGrpIdAtGroupLevel === answerGroupId) {
                                    return true;
                                }
                            } else {
                                var hasAnswerGroupId = this.getUsedAnswerGroupCountForQuestion(
                                    answerGroupId,
                                    qg.Id
                                );

                                if (hasAnswerGroupId == true) {
                                    return hasAnswerGroupId;
                                }
                            }
                        }

                        return false;
                    },
                getUsedValuationAnswerGroupCountInAllQuestionnaires:
                    function getUsedValuationAnswerGroupCountInAllQuestionnaires(
                        valAnswerGrpId,
                        currentQuestionnaireId
                    ) {
                        var qs = this._getQuestionnaireAll();

                        for (var i = 0; i < qs.length; i++) {
                            var q = qs[i];

                            if (q.Id != currentQuestionnaireId) {
                                var valQueList = this.getValuationQuestionsByQuestionnaireId(
                                    currentQuestionnaireId
                                );

                                for (var j = 0; j < length; j++) {
                                    var vq = valQueList[j];

                                    if (vq.valuationAnswerGroupId === valAnswerGrpId) {
                                        return true;
                                    }
                                }
                            }
                        }

                        return false;
                    },
                getUsedAnswerGroupCountInAllQuestionnaires:
                    function getUsedAnswerGroupCountInAllQuestionnaires(
                        answerGroupId,
                        currentQuestionnaireId
                    ) {
                        var qs = this._getQuestionnaireAll();

                        for (var i = 0; i < qs.length; i++) {
                            var q = qs[i];

                            if (q.Id != currentQuestionnaireId) {
                                if (q.answerGroupId === answerGroupId) {
                                    return true;
                                } else {
                                    var isAnswerGroupUsed =
                                        this.getUsedAnswerGroupCountForQuestionGroup(
                                            answerGroupId,
                                            q.Id
                                        );

                                    if (isAnswerGroupUsed) {
                                        return true;
                                    }
                                }
                            }
                        }

                        return false;
                    },
                getAnswerOptionsByQuestionId: function getAnswerOptionsByQuestionId(
                    questionId
                ) {
                    var offlineDb = this.OfflineStorage;
                    var answerOptionsCollection = offlineDb.getCollection("AnswerOption");
                    var question = this.getQuestion(questionId);
                    var answerGroupIdForQuestion = question.answerGroupId; //The AnswerGroup is defined at the Question level. Then

                    if (answerGroupIdForQuestion != null) {
                        if (answerGroupIdForQuestion.length > 0) {
                            return this.getAnswerOptions(answerGroupIdForQuestion);
                        }
                    } else {
                        //Look up for the Questiongroup and try and get the AnswerGroupId
                        var questionGroupId = question.questionGroupId;
                        var questionGroup = this.getQuestionGroup(questionGroupId);
                        var questionnaireId = questionGroup.questionnaireId;
                        var questionnaire = this.getQuestionnaireById(questionnaireId);
                        var answerGroupIdForQuestionnaire = questionnaire.answerGroupId;

                        if (answerGroupIdForQuestionnaire != null) {
                            return this.getAnswerOptions(answerGroupIdForQuestionnaire);
                        } else {
                            if (questionGroup != null) {
                                var answerGroupIdAtQuestionGroup = questionGroup.answerGroupId;

                                if (answerGroupIdAtQuestionGroup != null) {
                                    if (answerGroupIdAtQuestionGroup.length > 0) {
                                        return this.getAnswerOptions(answerGroupIdAtQuestionGroup);
                                    }
                                } else {
                                    //Look up at the Questionnaire level to get an answer group id..
                                    var questionnaireId = questionGroup.questionnaireId;
                                    var answerGroupIdAtQuestionnaire =
                                        questionnaire.answerGroupId;

                                    if (answerGroupIdAtQuestionnaire != null) {
                                        if (answerGroupIdAtQuestionnaire.length > 0) {
                                            return this.getAnswerOptions(
                                                answerGroupIdAtQuestionnaire
                                            );
                                        }
                                    } else {
                                        //The answer option is defined at the question level without a group..
                                        return this.getAnswerOptionsOnlyQuestion(questionId);
                                    }
                                }
                            }
                        }
                    } //Default check if AnswerOptions are defined without a AnswerGroup

                    return this.getAnswerOptionsOnlyQuestion(questionId);
                },
                getEvaluatingManagersForQuestionnaire:
                    function getEvaluatingManagersForQuestionnaire(qId) {
                        var offlineDb = this.OfflineStorage;
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var userId = loggedInUser[0].userId;
                        var personId = loggedInUser[0].personId;
                        var m2QColl = offlineDb.getCollection("Manager2Questionnaire");
                        var m2q = m2QColl.findOne({
                            $and: [
                                {
                                    userId: {
                                        $eq: userId,
                                    },
                                },
                                {
                                    qId: {
                                        $eq: qId,
                                    },
                                },
                            ],
                        });
                        var evalIds = [];

                        if (m2q.evaluatingForIds.length !== 0) {
                            evalIds = m2q.evaluatingForIds.split("|");
                        }

                        return evalIds;
                    },
                getIsRepeatableForQuestionnaire:
                    function getIsRepeatableForQuestionnaire(qId) {
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var personId = loggedInUser[0].personId;
                        var managers = this.getEvaluatingManagersForQuestionnaire(qId);

                        for (var i = 0; i < managers.length; i++) {
                            var managerId = managers[i];
                            var pq = this.getPersonQuestionnaire(personId, managerId, qId);

                            if (pq === null) {
                                return true;
                            }
                        }

                        return false;
                    },
                getEvaluatingForQuestionnaireCount:
                    function getEvaluatingForQuestionnaireCount(qId) {
                        var managers = this.getEvaluatingManagersForQuestionnaire(qId);
                        return managers.length > 0;
                    },
                deleteEvaluatingForQuestionnaireForUser:
                    function deleteEvaluatingForQuestionnaireForUser(pq) {
                        var offlineDb = this.OfflineStorage;
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var userId = loggedInUser[0].userId;
                        var qId = pq.Questionnaire.Id;
                        var evaluatedId = pq.EvaluatedForId;
                        var m2QColl = offlineDb.getCollection("Manager2Questionnaire");
                        var m2q = m2QColl.findOne({
                            $and: [
                                {
                                    userId: {
                                        $eq: userId,
                                    },
                                },
                                {
                                    qId: {
                                        $eq: qId,
                                    },
                                },
                            ],
                        });
                        var evalIds = m2q.evaluatingForIds.split("|");
                        var evalIndex = evalIds.indexOf(evaluatedId);

                        if (evalIndex >= 0) {
                            evalIds.splice(evalIndex, 1);
                            m2q.evaluatingForIds = evalIds.join("|").trim();
                        }

                        m2QColl.update(m2q);
                    },
                deleteQuestionnaire: function deleteQuestionnaire(qId) {
                    var offlineDb = this.OfflineStorage;
                    var qColl = offlineDb.getCollection("Questionnaire");
                    var q = qColl.findOne({
                        Id: {
                            $eq: qId,
                        },
                    });
                    qColl.remove(q);
                },
                deleteQuestionGroup: function deleteQuestionGroup(questionGroupId) {
                    var offlineDb = this.OfflineStorage;
                    var qgColl = offlineDb.getCollection("QuestionGroup");
                    var qg = qgColl.findOne({
                        Id: {
                            $eq: questionGroupId,
                        },
                    });
                    qgColl.remove(qg);
                },
                deleteQuestion: function deleteQuestion(questionId) {
                    var offlineDb = this.OfflineStorage;
                    var queColl = offlineDb.getCollection("Question");
                    var que = queColl.findOne({
                        Id: {
                            $eq: questionId,
                        },
                    });
                    queColl.remove(que);
                },
                deletePersonValuationQuestionAnswerTemplate:
                    function deletePersonValuationQuestionAnswerTemplate(pqId) {
                        var offlineDb = this.OfflineStorage;
                        var pvqaColl = offlineDb.getCollection(
                            "PersonValuationQuestionAnswerTemplate"
                        );
                        pvqaColl.removeWhere(function (pvqa) {
                            return pvqa.personQuestionnaireId === pqId;
                        });
                    },
            }),
                _defineProperty(
                    _localStorage,
                    "deletePersonValuationQuestionAnswerTemplate",
                    function deletePersonValuationQuestionAnswerTemplate(pqId) {
                        var offlineDb = this.OfflineStorage;
                        var pvqaColl = offlineDb.getCollection(
                            "PersonValuationQuestionAnswerTemplate"
                        );
                        pvqaColl.removeWhere(function (pvqa) {
                            return pvqa.personQuestionnaireId === pqId;
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deletePersonQuestionAnswersTemplate",
                    function deletePersonQuestionAnswersTemplate(pqId) {
                        var offlineDb = this.OfflineStorage;
                        var pqaColl = offlineDb.getCollection("PersonQuestionAnswerTemplate");
                        pqaColl.removeWhere(function (pqa) {
                            return pqa.personQuestionnaireId === pqId;
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deletePersonQuestionAnswersTemplateById",
                    function deletePersonQuestionAnswersTemplateById(pqaId) {
                        var offlineDb = this.OfflineStorage;
                        var pqaColl = offlineDb.getCollection("PersonQuestionAnswerTemplate");
                        pqaColl.removeWhere(function (pqa) {
                            return pqa.Id === pqaId;
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deletePersonValuationQuestionAnswers",
                    function deletePersonValuationQuestionAnswers(pqId) {
                        var offlineDb = this.OfflineStorage;
                        var pvqaColl = offlineDb.getCollection(
                            "PersonValuationQuestionAnswer"
                        );
                        pvqaColl.removeWhere(function (pvqa) {
                            return pvqa.personQuestionnaireId === pqId;
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deletePersonQuestionAnswers",
                    function deletePersonQuestionAnswers(pqId) {
                        var offlineDb = this.OfflineStorage;
                        var pqaColl = offlineDb.getCollection("PersonQuestionAnswer");
                        pqaColl.removeWhere(function (pqa) {
                            return pqa.personQuestionnaireId === pqId;
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deletePersonQuestionnaire",
                    function deletePersonQuestionnaire(pqId) {
                        var offlineDb = this.OfflineStorage;
                        var pqColl = offlineDb.getCollection("PersonQuestionnaire");
                        var pqList = pqColl.find({
                            Id: {
                                $eq: pqId,
                            },
                        });

                        for (var i = 0; i < pqList.length; i++) {
                            pqColl.remove(pqList[i]);
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deletePersonQuestionnaireTemplate",
                    function deletePersonQuestionnaireTemplate(pqId) {
                        var offlineDb = this.OfflineStorage;
                        var pqColl = offlineDb.getCollection("PersonQuestionnaireTemplate");
                        var pq = pqColl.findOne({
                            Id: {
                                $eq: pqId,
                            },
                        });
                        pqColl.remove(pq);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deletePersonQuestionnaireTemplateByQId",
                    function deletePersonQuestionnaireTemplateByQId(qId) {
                        var offlineDb = this.OfflineStorage;
                        var pqColl = offlineDb.getCollection("PersonQuestionnaireTemplate");
                        var pq = pqColl.findOne({
                            questionnaireId: {
                                $eq: qId,
                            },
                        });
                        pqColl.remove(pq);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deleteTriggerQuestionByIds",
                    function deleteTriggerQuestionByIds(
                        questionId,
                        triggerQuestionId,
                        triggerAnswerId
                    ) {
                        var offlineDb = localStorage.OfflineStorage;
                        var questionTriggerColl = offlineDb.getCollection("QuestionTrigger");
                        var deleteTriggerId = questionTriggerColl.findOne({
                            $and: [
                                {
                                    questionId: {
                                        $nin: questionIds,
                                    },
                                },
                                {
                                    triggerQuestionId: {
                                        $nin: triggerQuestionIds,
                                    },
                                },
                            ],
                        });
                        questionTriggerColl.remove(deleteTriggerId);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addUserNameToken",
                    function addUserNameToken(userToken, userName) {
                        var offlineDb = this.OfflineStorage;
                        var userDataCollection = offlineDb.getCollection("UserDetails");
                        var timeStamp = Math.floor(Date.now());
                        var userNameExists = userDataCollection.findOne({
                            userName: {
                                $eq: userName,
                            },
                        });

                        if (userNameExists != null) {
                            userNameExists.userName = userName;
                            userNameExists.token = userToken;
                            userNameExists.loggedInTimeStamp = timeStamp;
                            userDataCollection.update(userNameExists);
                        } else {
                            var uNuT = {
                                userName: userName,
                                token: userToken,
                                loggedInTimeStamp: timeStamp,
                                userId: null,
                                firstName: null,
                                lastName: null,
                                email: null,
                                personId: null,
                                employeeNumber: null,
                                primaryDepartmentId: null,
                                completeName: null,
                                isDepartmentManager: null,
                                primaryDepartmentName: null,
                                managerId: null,
                                managerCompleteName: null,
                                userPreferredLanguage: null,
                                enableOnlineDepartments: false,
                                enableOnlinePersons: false,
                                enableOnlineAssets: false,
                                enableOnlineChemicals: false,
                            };
                            userDataCollection.insert(uNuT);
                        }

                        offlineDb.saveDatabase(function () {
                            //Stuff to do after the save to local storage.
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "removeSuiteData",
                    function removeSuiteData() {
                        var offlineDb = this.OfflineStorage; //Remove Application data..

                        privateMethods.removeCollection("Application"); //Remove Resources data..

                        privateMethods.removeCollection("ResourceLabels"); //Remove Icons data..

                        privateMethods.removeCollection("Icons");
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addSuiteData",
                    function addSuiteData(
                        suiteData,
                        custName,
                        onlineVal,
                        isCustomUrlEnabled
                    ) {
                        var offlineDb = this.OfflineStorage;
                        this.addCustomerData(
                            suiteData,
                            custName,
                            onlineVal,
                            isCustomUrlEnabled
                        ); // To save Application related information

                        this.insertApplicationDetails(suiteData); // To save Resource related information

                        this.addResourceData(suiteData); // To save Icons related information

                        this.addIconsData(suiteData);
                        this.addLanguageData(suiteData);
                        offlineDb.saveDatabase(function () {
                            //Stuff to do after the save to local storage.
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "removeUserDetails",
                    function removeUserDetails(userName) {
                        var offlineDb = this.OfflineStorage;
                        var usersCollection = offlineDb.getCollection("UserDetails");
                        var user = usersCollection.findOne({
                            userName: {
                                $eq: userName,
                            },
                        });
                        var userId = user.userId;
                        var userDepartmentList = privateMethods.removeUserDepartments(userId);
                        var commonDepartmentList = privateMethods.getUsersCommonDepartments(
                            userDepartmentList,
                            userId
                        );
                        var uniqueDeptList = privateMethods.getUniqueDepartmentsList(
                            userDepartmentList,
                            commonDepartmentList
                        );
                        privateMethods.removeDepartment(uniqueDeptList);
                        privateMethods.removeUserApplications(userId);
                        offlineDb.saveDatabase(function () {
                            //Stuff to do after the save to local storage.
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addUserDetails",
                    function addUserDetails(userDetailsData, userName) {
                        var offlineDb = this.OfflineStorage;
                        var userDataCollection = offlineDb.getCollection("UserDetails");
                        var updateUserDetails = userDataCollection.findOne({
                            userName: {
                                $eq: userName,
                            },
                        });

                        if (updateUserDetails != null) {
                            updateUserDetails.userId = userDetailsData.UserId;
                            updateUserDetails.firstName = userDetailsData.FirstName;
                            updateUserDetails.lastName = userDetailsData.LastName;
                            updateUserDetails.email = userDetailsData.Email;
                            updateUserDetails.personId = userDetailsData.PersonId;
                            updateUserDetails.primaryDepartmentId =
                                userDetailsData.PrimaryDepartmentId;
                            updateUserDetails.employeeNumber = userDetailsData.EmployeeNumber;
                            updateUserDetails.completeName = userDetailsData.CompleteName;
                            updateUserDetails.isDepartmentManager =
                                userDetailsData.IsDepartmentManager;
                            updateUserDetails.primaryDepartmentName =
                                userDetailsData.PrimaryDepartmentName;
                            updateUserDetails.managerId = userDetailsData.ManagerId;
                            updateUserDetails.managerCompleteName =
                                userDetailsData.ManagerCompleteName;
                            updateUserDetails.notificationSubscriptionTopics =
                                userDetailsData.NotificationSubscriptionTopics;
                            updateUserDetails.localNotificationTimeInterval =
                                userDetailsData.LocalNotificationTimeInterval;

                            if (userDetailsData.IsDemoUser) {
                                updateUserDetails.isDemoUser = userDetailsData.IsDemoUser;
                            } else {
                                // Assigning a default value for a scenario where this setting is not present in the Web api version
                                // TODO: Can be removed after 1.1.3
                                updateUserDetails.isDemoUser = false;
                            } // Temp value (null) is set to the variable till web api is done

                            var preffLangCode = updateUserDetails.userPreferredLanguage;

                            if (userDetailsData.PreferredLanguageId != null) {
                                preffLangCode = userDetailsData.PreferredLanguageId;
                            }

                            updateUserDetails.userPreferredLanguage =
                                preffLangCode == undefined ? null : preffLangCode;
                            updateUserDetails.enableOnlineDepartments =
                                userDetailsData.EnableOnlineDepartments;
                            updateUserDetails.enableOnlinePersons =
                                userDetailsData.EnableOnlinePersons;
                            updateUserDetails.enableOnlineAssets =
                                userDetailsData.EnableOnlineAssets;
                            updateUserDetails.enableOnlineChemicals =
                                userDetailsData.EnableOnlineChemicals;

                            userDataCollection.update(updateUserDetails);
                            var userId = userDetailsData.UserId; // Add department details data

                            this.addDepartmentDetailsData(userDetailsData); //Call method to save Applications

                            this.addUserApplicationDetails(userDetailsData); // Add persons related information

                            this.addPersonsDetails(userDetailsData); // Add Asset data to asset table using generic table

                            this.addAssetDetails(userDetailsData.Assets);

                            this.addChemicalDetails(userDetailsData.Chemicals);

                            this.updateCustomerData(userDetailsData.Customer);
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getUserNameByLoggedInTimeStamp",
                    function getUserNameByLoggedInTimeStamp() {
                        var offlineDb = this.OfflineStorage;
                        var userDetailsCollection = offlineDb.getCollection("UserDetails");
                        var userDetails = userDetailsCollection
                            .chain()
                            .simplesort("loggedInTimeStamp", true)
                            .data();
                        return userDetails;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getUserDetailsByUserName",
                    function getUserDetailsByUserName(userName) {
                        var offlineDb = this.OfflineStorage;
                        var userDetailsCollection = offlineDb.getCollection("UserDetails");
                        return userDetailsCollection.findOne({
                            userName: {
                                $eq: userName,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getEvaluateListForUser",
                    function getEvaluateListForUser(userId, qId) {
                        var offlineDb = this.OfflineStorage;
                        var evalCollection = offlineDb.getCollection("EvaluatingFor");
                        var evalForUser = evalCollection.findOne({
                            $and: [
                                {
                                    userId: {
                                        $eq: userId,
                                    },
                                },
                                {
                                    qId: {
                                        $eq: qId,
                                    },
                                },
                            ],
                        });
                        var evalIDList = [];

                        if (evalForUser != null) {
                            var evalIds = evalForUser.evaluatingForIds;
                            evalIDList = evalIds.split("|");
                        }

                        var povCollection = offlineDb.getCollection("Person");
                        var povList = povCollection.find({
                            Id: {
                                $in: evalIDList,
                            },
                        });
                        return povList;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deleteUserManagerForQuestionnaire",
                    function deleteUserManagerForQuestionnaire(
                        userId,
                        qId,
                        evaluatingForId
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var userId = loggedInUser[0].userId;
                        var personId = loggedInUser[0].personId;
                        var removeableEvalList = [];
                        var m2QColl = offlineDb.getCollection("Manager2Questionnaire");
                        var m2q = m2QColl.findOne({
                            $and: [
                                {
                                    userId: {
                                        $eq: userId,
                                    },
                                },
                                {
                                    qId: {
                                        $eq: qId,
                                    },
                                },
                            ],
                        });
                        var evalIds = m2q.evaluatingForIds.split("|"); //Now we find departments for all the users

                        var nonUserSpecificEvals = m2QColl.find({
                            $and: [
                                {
                                    userId: {
                                        $ne: userId,
                                    },
                                },
                                {
                                    qId: {
                                        $eq: qId,
                                    },
                                },
                            ],
                        });
                        var singleEvalId = evaluatingForId;
                        var evalUsed = false;

                        for (var j = 0; j < nonUserSpecificEvals.length; j++) {
                            var nonUserDepts = nonUserSpecificEvals[j];
                            var evalIdsNonUser = nonUserDepts.evaluatingForIds;
                            var nonUserEvalIDList = evalIdsNonUser.split("|");

                            if (nonUserEvalIDList.indexOf(singleEvalId) >= 0) {
                                evalUsed = true;
                                break;
                            }
                        }

                        if (evalUsed === false) {
                            var removeIndex = evalIds.indexOf(singleEvalId);
                            evalIds.splice(removeIndex, 1);
                            var managerCollection = offlineDb.getCollection("Manager");
                            managerCollection.removeWhere(function (manager) {
                                return singleEvalId === manager.Id;
                            });
                        }

                        if (evalIds.length === 0) {
                            m2QColl.remove(m2q);
                        } else {
                            m2q.evaluatingForIds = evalIds.join("|");
                            m2QColl.update(m2q);
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deleteDepartmentForUserQuestionnaire",
                    function deleteDepartmentForUserQuestionnaire(departmentId, userId) {
                        var offlineDb = this.OfflineStorage;
                        var userDepartmentsCollection =
                            offlineDb.getCollection("UserDepartments");
                        var userSpecificDept = userDepartmentsCollection.find({
                            userId: {
                                $eq: userId,
                            },
                        });
                        var deptIDList = [];
                        var removeableDeptList = [];

                        if (userSpecificDept != null) {
                            var deptIds = userSpecificDept.departmentIds;
                            deptIDList = deptIds.split("|");
                            deptIDList = deptIDList.splice(departmentId, 1);
                            userSpecificDept.departmentIds = deptIDList.join("|");
                            userDepartmentsCollection.update(userSpecificDept); //Now we find departments for all the users

                            var nonUserSpecificDepts = userDepartmentsCollection.find({
                                userId: {
                                    $ne: userId,
                                },
                            });
                            var deptUsed = false;

                            for (var j = 0; j < nonUserSpecificDepts.length; j++) {
                                deptUsed = false;
                                var nonUserDepts = nonUserSpecificDepts[i];
                                var deptIds = nonUserDepts.departmentIds;
                                var nonUserDeptIDList = deptIds.split("|");

                                if (nonUserDeptIDList.indexOf(departmentId) >= 0) {
                                    deptUsed = true;
                                    break;
                                }
                            }

                            if (deptUsed === false) {
                                var departmentCollection = offlineDb.getCollection("Department");
                                departmentCollection.removeWhere(function (dept) {
                                    return departmentId.indexOf(dept.Id) === 0;
                                });
                            }

                            offlineDb.saveDatabase(function () {
                                //Stuff to do after the save to local storage.
                            });
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deleteGenericTablesData",
                    function deleteGenericTablesData() {
                        var genericTableNames = [
                            "Category",
                            "Status",
                            "Probability",
                            "Consequence",
                            "Priority",
                            "ProblemArea",
                            "LineOfBusiness",
                            "SafetyDepartment",
                            "Process",
                            "Asset",
                            "ControlLevel",
                            "CustomerFieldValue1",
                            "CustomerFieldValue2",
                            "CustomerFieldValue3",
                            "CustomerListValue1",
                            "CustomerListValue2",
                            "CustomerListValue3",
                            "Manager",
                            "EasyClassification",
                            "Country",
                            "City",
                            "ListValue",
                            "Activity",
                            "ActivityModule",
                            "Custom",
                            "Employee",
                        ];
                        var offlineDb = this.OfflineStorage;

                        for (var i = 0; i < genericTableNames.length; i++) {
                            var tableName = genericTableNames[i];
                            var tableData = offlineDb.getCollection(tableName);
                            tableData.removeWhere(function (data) {
                                return true;
                            });
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deletePersonsAll",
                    function deletePersonsAll() {
                        var offlineDb = this.OfflineStorage;
                        var personColl = offlineDb.getCollection("Person");
                        var personData = personColl.data;

                        for (var i = 0; i < personData.length; i++) {
                            var person = personData[i];
                            var personId = person.Id;
                            var isPersonUsed = false;
                            isPersonUsed =
                                this.getIfPersonUsedInQuestionnairesForUser(personId);

                            if (isPersonUsed === false) {
                                isPersonUsed =
                                    this.getIfActionPlanWizardColumnsUsedForPerson(personId);

                                if (isPersonUsed === false) {
                                    //Next up Askade check if used in askade..
                                    isPersonUsed =
                                        this.getIfAskadeFileTypeWizardColumnsusedForPerson(personId);
                                }
                            }

                            if (isPersonUsed === false) {
                                LocalStorageUtility.deletePerson(personId);
                            }
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deletePersonsForUser",
                    function deletePersonsForUser(userId) {
                        var offlineDb = this.OfflineStorage;
                        var userPersonsCollection = offlineDb.getCollection("UserPersons");
                        var userSpecificPerson = userPersonsCollection.findOne({
                            userId: {
                                $eq: userId,
                            },
                        });
                        var personIDList = [];
                        var removeablePersonList = [];

                        if (userSpecificPerson != null) {
                            var personIds = userSpecificPerson.personIds;
                            personIDList = personIds.split("|");
                        } //Now we find person for all the users

                        var nonUserSpecificPersons = userPersonsCollection.find({
                            userId: {
                                $ne: userId,
                            },
                        });

                        for (var i = 0; i < personIDList.length; i++) {
                            var singlePersonId = personIDList[i];
                            var personUsed = false;

                            for (var j = 0; j < nonUserSpecificPersons.length; j++) {
                                var nonUserPersons = nonUserSpecificPersons[j];
                                var personIds = nonUserPersons.personIds;
                                var nonUserPersonIDList = personIds.split("|");

                                if (nonUserPersonIDList.indexOf(singlePersonId) >= 0) {
                                    personUsed = true;
                                    break;
                                }
                            }

                            if (personUsed === false) {
                                removeablePersonList.push(singlePersonId);
                            }
                        }

                        var personCollection = offlineDb.getCollection("Person");
                        personCollection.removeWhere(function (person) {
                            return removeablePersonList.indexOf(person.Id) >= 0;
                        });

                        if (userSpecificPerson) {
                            userPersonsCollection.remove(userSpecificPerson);
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deleteDepartmentsForUser",
                    function deleteDepartmentsForUser(userId) {
                        var offlineDb = this.OfflineStorage;
                        var userDepartmentsCollection =
                            offlineDb.getCollection("UserDepartments");
                        var userSpecificDept = userDepartmentsCollection.findOne({
                            userId: {
                                $eq: userId,
                            },
                        });
                        var deptIDList = [];
                        var removeableDeptList = [];

                        if (userSpecificDept != null) {
                            var deptIds = userSpecificDept.departmentIds;
                            deptIDList = deptIds.split("|");
                        } //Now we find departments for all the users

                        var nonUserSpecificDepts = userDepartmentsCollection.find({
                            userId: {
                                $ne: userId,
                            },
                        });

                        for (var i = 0; i < deptIDList.length; i++) {
                            var singleDeptId = deptIDList[i];
                            var deptUsed = false;

                            for (var j = 0; j < nonUserSpecificDepts.length; j++) {
                                var nonUserDepts = nonUserSpecificDepts[j];
                                var deptIds = nonUserDepts.departmentIds;
                                var nonUserDeptIDList = deptIds.split("|");

                                if (nonUserDeptIDList.indexOf(singleDeptId) >= 0) {
                                    deptUsed = true;
                                    break;
                                }
                            }

                            if (deptUsed === false) {
                                removeableDeptList.push(singleDeptId);
                            }
                        }

                        var departmentCollection = offlineDb.getCollection("Department");
                        departmentCollection.removeWhere(function (dept) {
                            return removeableDeptList.indexOf(dept.Id) >= 0;
                        });

                        if (userSpecificDept) {
                            userDepartmentsCollection.remove(userSpecificDept);
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deleteUserApplicationsForUser",
                    function deleteUserApplicationsForUser(userId) {
                        var offlineDb = this.OfflineStorage;
                        var userApplicationsCollection =
                            offlineDb.getCollection("UserApplications");
                        var userApplications = userApplicationsCollection.find({
                            userId: {
                                $eq: userId,
                            },
                        });

                        if (userApplications !== null) {
                            for (var i = 0; i < userApplications.length; i++) {
                                var userApplication = userApplications[i];
                                userApplicationsCollection.remove(userApplication);
                            }
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deleteUserApplicationByAppId",
                    function deleteUserApplicationByAppId(appId) {
                        var offlineDb = this.OfflineStorage;
                        var userApplicationsCollection =
                            offlineDb.getCollection("UserApplications");
                        var userApplication = userApplicationsCollection.findOne({
                            applicationId: {
                                $eq: appId,
                            },
                        });

                        if (userApplication !== null) {
                            userApplicationsCollection.remove(userApplication);
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deleteDownloadLogForUser",
                    function deleteDownloadLogForUser(userId) {
                        var offlineDb = this.OfflineStorage;
                        var downloadLogCollection = offlineDb.getCollection("DownloadLog");
                        var downloadLogs = downloadLogCollection.find({
                            userId: {
                                $eq: userId,
                            },
                        });

                        if (downloadLogs !== null) {
                            for (var i = 0; i < downloadLogs.length; i++) {
                                var downloadLog = downloadLogs[i];
                                downloadLogCollection.remove(downloadLog);
                            }
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getUserDepartmentsByUser",
                    function getUserDepartmentsByUser(userId) {
                        var offlineDb = this.OfflineStorage;
                        var userDepartmentsCollection =
                            offlineDb.getCollection("UserDepartments");
                        var userSpecificDept = userDepartmentsCollection.find({
                            userId: {
                                $eq: userId,
                            },
                        });
                        var deptIDList = [];

                        if (userSpecificDept != null) {
                            var deptIds = userSpecificDept.departmentIds;
                            deptIDList = deptIds.split("|");
                        }

                        var departmentCollection = offlineDb.getCollection("Department");
                        var deptList = departmentCollection
                            .find({
                                Id: {
                                    $in: deptIDList,
                                },
                            })
                            .sort(function (a, b) {
                                if (a.level == b.level) return 0;
                                if (a.level > b.level) return 1;
                                if (a.level < b.level) return -1;
                            });
                        return deptList;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getUserApplicationsByUser",
                    function getUserApplicationsByUser(userId) {
                        var offlineDb = this.OfflineStorage;
                        var userApplicationsCollection =
                            offlineDb.getCollection("UserApplications");
                        var userAppList = userApplicationsCollection.find({
                            userId: {
                                $eq: userId,
                            },
                        });
                        return userAppList;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "isIncludeSubDepartment",
                    function isIncludeSubDepartment(userId, applicationId) {
                        var offlineDb = this.OfflineStorage;
                        var appId = applicationId + "";
                        var userAppsCollection = offlineDb.getCollection("UserApplications");
                        var userApp = userAppsCollection.findOne({
                            $and: [
                                {
                                    applicationId: {
                                        $eq: appId,
                                    },
                                },
                                {
                                    userId: {
                                        $eq: userId,
                                    },
                                },
                            ],
                        });
                        return userApp.includeSubDepartments;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getUserDepartmentsByUserId",
                    function getUserDepartmentsByUserId(userId) {
                        var offlineDb = this.OfflineStorage;
                        var userDepartmentsCollection =
                            offlineDb.getCollection("UserDepartments");
                        var userDeptDetails = userDepartmentsCollection.findOne({
                            userId: {
                                $eq: userId,
                            },
                        });

                        if (userDeptDetails != null) {
                            var depts = userDeptDetails.departmentIds;
                            var deptIds = depts.split("|");
                            return deptIds;
                        }

                        return [];
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getUserApplicationsByUserId",
                    function getUserApplicationsByUserId(userId) {
                        var offlineDb = this.OfflineStorage;
                        var userApplicationsCollection =
                            offlineDb.getCollection("UserApplications");
                        return userApplicationsCollection.find({
                            userId: {
                                $eq: userId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deleteColumnGuideByFileColumnId",
                    function deleteColumnGuideByFileColumnId(fileColumnId, fileTypeId) {
                        var offlineDb = this.OfflineStorage;
                        var askadeFileTypeWizardStepColumnGuideCollection =
                            offlineDb.getCollection("AskadeFileTypeWizardStepColumnGuide");
                        return askadeFileTypeWizardStepColumnGuideCollection.removeWhere(
                            function (pAskadeTemplate) {
                                return (
                                    pAskadeTemplate.askWizFileColumnId === fileColumnId &&
                                    pAskadeTemplate.askWizFileTypeId == fileTypeId
                                );
                            }
                        );
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getColumnGuideIdsForDelete",
                    function getColumnGuideIdsForDelete(columnGuideIds, columnId) {
                        var offlineDb = this.OfflineStorage;
                        var askadeWizStepColumnGuideColl = offlineDb.getCollection(
                            "AskadeFileTypeWizardStepColumnGuide"
                        );
                        var personColumnGuideIds = askadeWizStepColumnGuideColl.find({
                            askWizFileColumnId: {
                                $eq: columnId,
                            },
                        });
                        var peronnColumnGuideIdsForDelete = [];

                        for (var i = 0; i < personColumnGuideIds.length; i++) {
                            peronnColumnGuideIdsForDelete.push(personColumnGuideIds[i].Id);
                        }

                        var deleteColumnGuideIds = GeneralUtil.arrayDifference(
                            peronnColumnGuideIdsForDelete,
                            columnGuideIds
                        );
                        return deleteColumnGuideIds;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deleteAkWizardStepColumnGuideById",
                    function deleteAkWizardStepColumnGuideById(columnGuideId) {
                        var offlineDb = this.OfflineStorage;
                        var askStepColumnGuideCollection = offlineDb.getCollection(
                            "AskadeFileTypeWizardStepColumnGuide"
                        );
                        askStepColumnGuideCollection.removeWhere(function (
                            akStepColumnGuide
                        ) {
                            return akStepColumnGuide.Id === columnGuideId;
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getStepIdsForDelete",
                    function getStepIdsForDelete(stepIds, fileTypeId) {
                        var offlineDb = this.OfflineStorage;
                        var askadeFileTypeWizStepCollection = offlineDb.getCollection(
                            "AskadeFileTypeWizardStep"
                        );
                        var stepIdsForFileType = askadeFileTypeWizStepCollection.find({
                            fileTypeId: {
                                $eq: fileTypeId,
                            },
                        });
                        var stepIdsFileType = [];

                        for (var i = 0; i < stepIdsForFileType.length; i++) {
                            stepIdsFileType.push(stepIdsForFileType[i].Id);
                        }

                        var deleteStepIds = GeneralUtil.arrayDifference(
                            stepIdsFileType,
                            stepIds
                        );
                        return deleteStepIds;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getPersonStepColumnAnswerIdsForDelete",
                    function getPersonStepColumnAnswerIdsForDelete(
                        fileColumnIds,
                        personAskadeWizId
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var personAskadeFileTypeWizTemplateCollection =
                            offlineDb.getCollection("PersonAskadeColumnAnswerTemplate");
                        var personColumnAnswerIds =
                            personAskadeFileTypeWizTemplateCollection.find({
                                personAskadeWizId: {
                                    $eq: personAskadeWizId,
                                },
                            });
                        var columnAnswerIds = [];

                        for (var i = 0; i < personColumnAnswerIds.length; i++) {
                            columnAnswerIds.push(personColumnAnswerIds[i].Id);
                        }

                        var deleteColumnAnswerIds = GeneralUtil.arrayDifference(
                            columnAnswerIds,
                            fileColumnIds
                        );
                        return deleteColumnAnswerIds;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getPersonAskadeIdsForDelete",
                    function getPersonAskadeIdsForDelete(personFileTypeIds) {
                        var offlineDb = this.OfflineStorage;
                        var personAskadeFileTypeWizTemplateCollection =
                            offlineDb.getCollection("PersonAskadeFileTypeWizardTemplate");
                        return personAskadeFileTypeWizTemplateCollection.find({
                            fileTypeId: {
                                $containsNone: personFileTypeIds,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getFileTypeIdsForDelete",
                    function getFileTypeIdsForDelete(
                        fileTypeIds,
                        usedFileTypeIds,
                        moduleName
                    ) {
                        var offlineDb = this.OfflineStorage;

                        var typeCode = this._getTypeCodeForModule(moduleName);

                        var askadeFileTypeWizCollection = offlineDb.getCollection(
                            "AskadeFileTypeWizard"
                        );
                        var fileTypeIdsForDelete = askadeFileTypeWizCollection.find({
                            $and: [
                                {
                                    typeCode: {
                                        $eq: typeCode,
                                    },
                                },
                                {
                                    Id: {
                                        $nin: usedFileTypeIds,
                                    },
                                },
                            ],
                        });
                        var deleteFileTypeIds = [];

                        for (var i = 0; i < fileTypeIdsForDelete.length; i++) {
                            deleteFileTypeIds.push(fileTypeIdsForDelete[i].Id);
                        }

                        var deleteAskadeFileTypeIds = GeneralUtil.arrayDifference(
                            deleteFileTypeIds,
                            fileTypeIds
                        );
                        return deleteAskadeFileTypeIds;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deletePersonAskadeColumnAnswerTemplateById",
                    function deletePersonAskadeColumnAnswerTemplateById(columnAnswerId) {
                        var offlineDb = this.OfflineStorage;
                        var pAkColumnAnswerTempColl = offlineDb.getCollection(
                            "PersonAskadeColumnAnswerTemplate"
                        );
                        pAkColumnAnswerTempColl.removeWhere(function (pAkColumnAnswerTemp) {
                            return pAkColumnAnswerTemp.Id === columnAnswerId;
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deleteAllUsersPersonAskadeFileTypeWizardTemplate",
                    function deleteAllUsersPersonAskadeFileTypeWizardTemplate(
                        personAskadeFileTypeWizardTemplateId
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var personAskadeFileTypeWizTemplateCollection =
                            offlineDb.getCollection("PersonAskadeFileTypeWizardTemplate");
                        personAskadeFileTypeWizTemplateCollection.removeWhere(function (
                            pAskadeTemplate
                        ) {
                            return pAskadeTemplate.Id === personAskadeFileTypeWizardTemplateId;
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllAskadeFileTypeWizardsForPerson",
                    function getAllAskadeFileTypeWizardsForPerson(personId, moduleName) {
                        var offlineDb = this.OfflineStorage;
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();

                        var typeCode = this._getTypeCodeForModule(moduleName);

                        var askadeCollection = offlineDb.getCollection(
                            "AskadeFileTypeWizard"
                        );
                        var askadeList = askadeCollection.find({
                            $and: [
                                {
                                    Id: {
                                        $gt: 0,
                                    },
                                },
                                {
                                    typeCode: {
                                        $eq: typeCode,
                                    },
                                },
                            ],
                        });

                        var sortedAskadeList = this._sortString(askadeList);

                        return sortedAskadeList;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllAskadeFileTypeWizards",
                    function getAllAskadeFileTypeWizards(moduleName) {
                        var offlineDb = this.OfflineStorage;
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();

                        var typeCode = this._getTypeCodeForModule(moduleName);

                        var askadeFileTypeWizCollection = offlineDb.getCollection(
                            "AskadeFileTypeWizard"
                        );
                        var akFTColl = askadeFileTypeWizCollection.find({
                            $and: [
                                {
                                    Id: {
                                        $gt: 0,
                                    },
                                },
                                {
                                    typeCode: {
                                        $eq: typeCode,
                                    },
                                },
                            ],
                        });

                        var sortedAkFtColl = this._sortString(akFTColl);

                        return sortedAkFtColl;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAskadeFileTypeWizard",
                    function getAskadeFileTypeWizard(askadeFileTypeWizardId) {
                        var offlineDb = this.OfflineStorage;
                        var askadeFileTypeWizCollection = offlineDb.getCollection(
                            "AskadeFileTypeWizard"
                        );
                        return askadeFileTypeWizCollection.findOne({
                            Id: {
                                $eq: askadeFileTypeWizardId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAskadeFileTypeWizardStep",
                    function getAskadeFileTypeWizardStep(askadeFileTypeWizardStepId) {
                        var offlineDb = this.OfflineStorage;
                        var askadeFileTypeWizStepCollection = offlineDb.getCollection(
                            "AskadeFileTypeWizardStep"
                        );
                        var akStepColl = askadeFileTypeWizStepCollection.findOne({
                            Id: {
                                $eq: askadeFileTypeWizardStepId,
                            },
                        });
                        return akStepColl;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllAskadeFileTypeWizardSteps",
                    function getAllAskadeFileTypeWizardSteps(fileTypeId) {
                        var offlineDb = this.OfflineStorage;
                        var askadeFileTypeWizStepCollection = offlineDb.getCollection(
                            "AskadeFileTypeWizardStep"
                        );
                        var akAllStepColl = askadeFileTypeWizStepCollection.find({
                            fileTypeId: {
                                $eq: fileTypeId,
                            },
                        });
                        return akAllStepColl.sort(function (a, b) {
                            if (a.sortOrder == b.sortOrder) return 0;
                            if (a.sortOrder > b.sortOrder) return 1;
                            if (a.sortOrder < b.sortOrder) return -1;
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAskadeFileTypeWizardStepColumn",
                    function getAskadeFileTypeWizardStepColumn(
                        fileTypeStepId,
                        askadeFileTypeWizardStepColumnId
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var askadeFileTypeWizStepColumnCollection = offlineDb.getCollection(
                            "AskadeFileTypeWizardStepColumn"
                        );
                        var akStepColumnColl = askadeFileTypeWizStepColumnCollection.findOne({
                            $and: [
                                {
                                    Id: {
                                        $eq: askadeFileTypeWizardStepColumnId,
                                    },
                                },
                                {
                                    fileTypeWizardStepId: {
                                        $eq: fileTypeStepId,
                                    },
                                },
                            ],
                        });
                        return akStepColumnColl;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllAskadeFileTypeWizardStepColumns",
                    function getAllAskadeFileTypeWizardStepColumns(
                        askadeFileTypeWizardStepId,
                        fileTypeId
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var columnIdList = [];
                        var askadeFileTypeWizStepColumnCollection = offlineDb.getCollection(
                            "AskadeFileTypeWizardStepColumn"
                        );
                        var akAllStepColumnColl = askadeFileTypeWizStepColumnCollection.find({
                            fileTypeWizardStepId: {
                                $eq: askadeFileTypeWizardStepId,
                            },
                        });
                        return akAllStepColumnColl.sort(function (a, b) {
                            if (a.sortOrder == b.sortOrder) return 0;
                            if (a.sortOrder > b.sortOrder) return 1;
                            if (a.sortOrder < b.sortOrder) return -1;
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAskadeFileTypeWizardStepColumnByColumnId",
                    function getAskadeFileTypeWizardStepColumnByColumnId(fileColumnId) {
                        var offlineDb = this.OfflineStorage;
                        var askadeFileTypeWizStepColumnCollection = offlineDb.getCollection(
                            "AskadeFileTypeWizardStepColumn"
                        );
                        var akStepColumnColl = askadeFileTypeWizStepColumnCollection.findOne({
                            Id: {
                                $eq: fileColumnId,
                            },
                        });
                        return akStepColumnColl;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAskadeFileTypeWizardStepColumnByColumnIdForFilTypeId",
                    function getAskadeFileTypeWizardStepColumnByColumnIdForFilTypeId(
                        fileTypeId,
                        fileColumnId
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var askadeFileTypeWizStepColumnCollection = offlineDb.getCollection(
                            "AskadeFileTypeWizardStepColumn"
                        );
                        var akStepColumnColl = askadeFileTypeWizStepColumnCollection.findOne({
                            $and: [
                                {
                                    Id: {
                                        $eq: askadeFileTypeWizardStepColumnGuideId,
                                    },
                                },
                                {
                                    askWizFileColumnId: {
                                        $eq: fileColumnId,
                                    },
                                },
                            ],
                        });
                        return akStepColumnColl;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAskadeFileTypeWizardStepColumnGuide",
                    function getAskadeFileTypeWizardStepColumnGuide(
                        askadeFileTypeWizardStepColumnGuideId,
                        fileColumnId
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var askadeFileTypeWizStepColumnGuideCollection =
                            offlineDb.getCollection("AskadeFileTypeWizardStepColumnGuide");
                        var akStepColumnGuideColl =
                            askadeFileTypeWizStepColumnGuideCollection.findOne({
                                $and: [
                                    {
                                        Id: {
                                            $eq: askadeFileTypeWizardStepColumnGuideId,
                                        },
                                    },
                                    {
                                        askWizFileColumnId: {
                                            $eq: fileColumnId,
                                        },
                                    },
                                ],
                            });
                        return akStepColumnGuideColl;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllAskadeFileTypeWizardStepColumnsGuide",
                    function getAllAskadeFileTypeWizardStepColumnsGuide(
                        askadeFileTypeWizardStepColumnGuideId,
                        fileTypeId
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var askadeFileTypeWizStepColumnGuideCollection =
                            offlineDb.getCollection("AskadeFileTypeWizardStepColumnGuide");
                        var akAllStepColumnGuideColl =
                            askadeFileTypeWizStepColumnGuideCollection.find({
                                $and: [
                                    {
                                        askWizFileColumnId: {
                                            $eq: askadeFileTypeWizardStepColumnGuideId,
                                        },
                                    },
                                    {
                                        askWizFileTypeId: {
                                            $eq: fileTypeId,
                                        },
                                    },
                                ],
                            });
                        return akAllStepColumnGuideColl.sort(function (a, b) {
                            if (a.sortOrder == b.sortOrder) return 0;
                            if (a.sortOrder > b.sortOrder) return 1;
                            if (a.sortOrder < b.sortOrder) return -1;
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getPersonAskadeFileTypeWizardAttachment",
                    function getPersonAskadeFileTypeWizardAttachment(fileTypeWizarId) {
                        var offlineDb = this.OfflineStorage;
                        var personAskadeFileTypeWizStepColumnGuideCollection =
                            offlineDb.getCollection("PersonAskadeFileTypeWizardAttachment");
                        return personAskadeFileTypeWizStepColumnGuideCollection.findOne({
                            personAskadeFileTypeWizardId: {
                                $eq: fileTypeWizarId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllPersonAskadeFileTypeWizardAttachments",
                    function getAllPersonAskadeFileTypeWizardAttachments(fileTypeWizardId) {
                        var offlineDb = this.OfflineStorage;
                        var personAskadeFileTypeWizStepColumnGuideCollection =
                            offlineDb.getCollection("PersonAskadeFileTypeWizardAttachment");
                        var attachList =
                            personAskadeFileTypeWizStepColumnGuideCollection.find({
                                personAskadeFileTypeWizardId: {
                                    $eq: fileTypeWizardId,
                                },
                            });

                        var akwSortedAttachList = this._sortString(attachList);

                        return akwSortedAttachList;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getPersonAskadeFileTypeWizardAttachmentTemplate",
                    function getPersonAskadeFileTypeWizardAttachmentTemplate(
                        personAskadeFileTypeWizardAttachmentId
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var personAskadeFileTypeWizStepColumnGuideCollection =
                            offlineDb.getCollection(
                                "PersonAskadeFileTypeWizardAttachmentTemplate"
                            );
                        return personAskadeFileTypeWizStepColumnGuideCollection.findOne({
                            personAskadeFileTypeWizardTemplateId: {
                                $eq: personAskadeFileTypeWizardAttachmentId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllPersonAskadeFileTypeWizardAttachmentsTemplate",
                    function getAllPersonAskadeFileTypeWizardAttachmentsTemplate(
                        personAskadeFileTypeWizardAttachmentId
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var personAskadeFileTypeWizStepColumnGuideCollection =
                            offlineDb.getCollection(
                                "PersonAskadeFileTypeWizardAttachmentTemplate"
                            );
                        return personAskadeFileTypeWizStepColumnGuideCollection.find({
                            personAskadeFileTypeWizardTemplateId: {
                                $eq: personAskadeFileTypeWizardAttachmentId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getPersonAskadeFileTypeWizardTemplate",
                    function getPersonAskadeFileTypeWizardTemplate(
                        personAskadeFileTypeWizardTemplateId
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var personAskadeFileTypeWizTemplateCollection =
                            offlineDb.getCollection("PersonAskadeFileTypeWizardTemplate");
                        return personAskadeFileTypeWizTemplateCollection.findOne({
                            $and: [
                                {
                                    fileTypeId: {
                                        $eq: personAskadeFileTypeWizardTemplateId,
                                    },
                                    personId: {
                                        $eq: loggedInUser[0].personId,
                                    },
                                },
                            ],
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllPersonAskadeFileTypeWizardTemplates",
                    function getAllPersonAskadeFileTypeWizardTemplates() {
                        var offlineDb = this.OfflineStorage;
                        var personAskadeFileTypeWizTemplateCollection =
                            offlineDb.getCollection("PersonAskadeFileTypeWizardTemplate");
                        return personAskadeFileTypeWizTemplateCollection.find({
                            Id: {
                                $gt: 0,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllPersonAskadeFileTypeWizards",
                    function getAllPersonAskadeFileTypeWizards() {
                        var offlineDb = this.OfflineStorage;
                        var personAskadeFileTypeWizCollection = offlineDb.getCollection(
                            "PersonAskadeFileTypeWizard"
                        );
                        return personAskadeFileTypeWizCollection.find({
                            Id: {
                                $gt: 0,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getPersonAskadeFileTypeWizard",
                    function getPersonAskadeFileTypeWizard(personAskadeFileTypeWizardId) {
                        var offlineDb = this.OfflineStorage;
                        var personAskadeFileTypeWizCollection = offlineDb.getCollection(
                            "PersonAskadeFileTypeWizard"
                        );
                        return personAskadeFileTypeWizCollection.findOne({
                            Id: {
                                $eq: personAskadeFileTypeWizardId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getPersonAskadeFileTypeWizardByFileTypeId",
                    function getPersonAskadeFileTypeWizardByFileTypeId(fileTypeId) {
                        var offlineDb = this.OfflineStorage;
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var personAskadeFileTypeWizCollection = offlineDb.getCollection(
                            "PersonAskadeFileTypeWizard"
                        );
                        return personAskadeFileTypeWizCollection.find({
                            $and: [
                                {
                                    fileTypeId: {
                                        $eq: fileTypeId,
                                    },
                                },
                                {
                                    personId: {
                                        $eq: loggedInUser[0].personId,
                                    },
                                },
                            ],
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getPersonAskadeColumnAnswerTemplate",
                    function getPersonAskadeColumnAnswerTemplate(
                        personAskadeTemplateId,
                        fileColumnId
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var personAskadeFileTypeWizTemplateCollection =
                            offlineDb.getCollection("PersonAskadeColumnAnswerTemplate");
                        return personAskadeFileTypeWizTemplateCollection.findOne({
                            $and: [
                                {
                                    personAskadeWizId: {
                                        $eq: personAskadeTemplateId,
                                    },
                                },
                                {
                                    fileColumnId: {
                                        $eq: fileColumnId,
                                    },
                                },
                            ],
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getPersonAskadeColumnAnswerTemplateById",
                    function getPersonAskadeColumnAnswerTemplateById(
                        personAskadeColumnAnswerTemplateId
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var personAskadeFileTypeWizTemplateCollection =
                            offlineDb.getCollection("PersonAskadeColumnAnswerTemplate");
                        return personAskadeFileTypeWizTemplateCollection.findOne({
                            Id: {
                                $eq: personAskadeColumnAnswerTemplateId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllPersonAskadeColumnAnswerTemplates",
                    function getAllPersonAskadeColumnAnswerTemplates(
                        personAskadeColumnAnswerTemplateId
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var personAskadeFileTypeWizTemplateCollection =
                            offlineDb.getCollection("PersonAskadeColumnAnswerTemplate");
                        var personAskadeColumnAnswerTemplateList =
                            personAskadeFileTypeWizTemplateCollection.find({
                                personAskadeWizId: {
                                    $eq: personAskadeColumnAnswerTemplateId,
                                },
                            });

                        var akwSortedColumnAnswerTemplatesList = this._sortString(
                            personAskadeColumnAnswerTemplateList
                        );
                        return akwSortedColumnAnswerTemplatesList;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getPersonAskadeColumnAnswer",
                    function getPersonAskadeColumnAnswer(personAskadeColumnAnswerId) {
                        var offlineDb = this.OfflineStorage;
                        var personAskadeColumnAnswerCollection = offlineDb.getCollection(
                            "PersonAskadeColumnAnswer"
                        );
                        return personAskadeColumnAnswerCollection.findOne({
                            Id: {
                                $eq: personAskadeColumnAnswerId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllPersonAskadeColumnAnswers",
                    function getAllPersonAskadeColumnAnswers(personAkWizId) {
                        var offlineDb = this.OfflineStorage;
                        var personAskadeColumnAnswerCollection = offlineDb.getCollection(
                            "PersonAskadeColumnAnswer"
                        );
                        var personAskadeColumnAnswerList =
                            personAskadeColumnAnswerCollection.find({
                                personAskadeWizId: {
                                    $eq: personAkWizId,
                                },
                            });

                        var akwSortedColumnAnswerList = this._sortString(
                            personAskadeColumnAnswerList
                        );
                        return akwSortedColumnAnswerList;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getInProgressAskadeList",
                    function getInProgressAskadeList(moduleName) {
                        return this._getAskadeFileTypeWizardList("InProgress", moduleName);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getCompletedAskadeList",
                    function getCompletedAskadeList(moduleName) {
                        return this._getAskadeFileTypeWizardList("Completed", moduleName);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "_getAskadeFileTypeWizardList",
                    function _getAskadeFileTypeWizardList(state, moduleName) {
                        var offlineDb = this.OfflineStorage;
                        var askadeAnswerList = [];
                        var askadeList = this.getAllAskadeFileTypeWizards(moduleName);

                        for (var i = 0; i < askadeList.length; i++) {
                            var akw = askadeList[i];
                            var fileTypeId = akw.Id; // Getting person answer askade and pushing it to a list.

                            var personAskadeAnswers = this._getPersonAskade(fileTypeId, state);

                            askadeAnswerList.push({
                                fileTypeId: fileTypeId,
                                fileName: akw.name,
                                askadeAnswers: personAskadeAnswers,
                            });
                        }

                        return askadeAnswerList;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "_getPersonAskade",
                    function _getPersonAskade(askadeFileTypeId, state) {
                        var offlineDb = this.OfflineStorage;
                        var personAskadeColl = offlineDb.getCollection(
                            "PersonAskadeFileTypeWizard"
                        );
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var tempAnsweringInProgress = false;
                        var tempAnsweringCompleted = false;

                        switch (state) {
                            case "InProgress":
                                tempAnsweringInProgress = true;
                                break;

                            case "Completed":
                                tempAnsweringCompleted = true;
                                break;

                            default:
                                break;
                        }

                        return personAskadeColl.find({
                            $and: [
                                {
                                    fileTypeId: askadeFileTypeId,
                                },
                                {
                                    answeringInProgress: tempAnsweringInProgress,
                                },
                                {
                                    answeringCompleted: tempAnsweringCompleted,
                                },
                                {
                                    personId: loggedInUser[0].personId,
                                },
                            ],
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllActionPlanWizard",
                    function getAllActionPlanWizard() {
                        var offlineDb = this.OfflineStorage;
                        var apwCollection = offlineDb.getCollection("ActionPlanWizard");
                        return apwCollection.find({
                            Id: {
                                $gt: 0,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getActionPlanWizard",
                    function getActionPlanWizard(actionPlanWizardId) {
                        var offlineDb = this.OfflineStorage;
                        var apwCollection = offlineDb.getCollection("ActionPlanWizard");
                        return apwCollection.findOne({
                            Id: {
                                $eq: actionPlanWizardId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getActionPlanWizardStepByWizard",
                    function getActionPlanWizardStepByWizard(actionPlanWizardId) {
                        var offlineDb = this.OfflineStorage;
                        var apwStepCollection = offlineDb.getCollection(
                            "ActionPlanWizardStep"
                        );
                        var apwStepColl = apwStepCollection.find({
                            actionPlanWizardId: {
                                $eq: actionPlanWizardId,
                            },
                        });
                        return apwStepColl.sort(function (a, b) {
                            if (a.sortOrder == b.sortOrder) return 0;
                            if (a.sortOrder > b.sortOrder) return 1;
                            if (a.sortOrder < b.sortOrder) return -1;
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getActionPlanWizardStep",
                    function getActionPlanWizardStep(actionPlanWizardStepId) {
                        var offlineDb = this.OfflineStorage;
                        var apwStepCollection = offlineDb.getCollection(
                            "ActionPlanWizardStep"
                        );
                        return apwStepCollection.findOne({
                            Id: {
                                $eq: actionPlanWizardStepId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getActionPlanCategoryWizardStepColumnGuide",
                    function getActionPlanCategoryWizardStepColumnGuide(
                        actionplanWizardStepColumnGuideId,
                        apStepId
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var apwStepColumnGuideCollection = offlineDb.getCollection(
                            "ActionPlanWizardStepColumnGuide"
                        );
                        var apStepColumnGuideColl = apwStepColumnGuideCollection.findOne({
                            $and: [
                                {
                                    Id: {
                                        $eq: actionplanWizardStepColumnGuideId,
                                    },
                                },
                                {
                                    apWizStepId: {
                                        $eq: apStepId,
                                    },
                                },
                            ],
                        });
                        return apStepColumnGuideColl;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllActionPlanCategoryWizardStepColumnGuide",
                    function getAllActionPlanCategoryWizardStepColumnGuide(
                        actionplanWizardStepColumnGuideId
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var apwStepColumnGuideCollection = offlineDb.getCollection(
                            "ActionPlanWizardStepColumnGuide"
                        );
                        var apAllStepColumnGuideColl = apwStepColumnGuideCollection.find({
                            apWizStepId: {
                                $eq: actionplanWizardStepColumnGuideId,
                            },
                        });
                        return apAllStepColumnGuideColl.sort(function (a, b) {
                            if (a.sortOrder == b.sortOrder) return 0;
                            if (a.sortOrder > b.sortOrder) return 1;
                            if (a.sortOrder < b.sortOrder) return -1;
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getActionPlanWizardStepColumn",
                    function getActionPlanWizardStepColumn(apwStepColumnId) {
                        var offlineDb = this.OfflineStorage;
                        var apwWizStepColCollection = offlineDb.getCollection(
                            "ActionPlanWizardStepColumn"
                        );
                        return apwWizStepColCollection.findOne({
                            Id: {
                                $eq: apwStepColumnId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getActionPlanWizardStepColumnByStep",
                    function getActionPlanWizardStepColumnByStep(apwStepId) {
                        var offlineDb = this.OfflineStorage;
                        var apwWizStepColCollection = offlineDb.getCollection(
                            "ActionPlanWizardStepColumn"
                        );
                        var apwWizStepColColl = apwWizStepColCollection.find({
                            actionPlanWizardStepId: {
                                $eq: apwStepId,
                            },
                        });
                        return apwWizStepColColl.sort(function (a, b) {
                            if (a.sortOrder == b.sortOrder) return 0;
                            if (a.sortOrder > b.sortOrder) return 1;
                            if (a.sortOrder < b.sortOrder) return -1;
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getInProgressAPWList",
                    function getInProgressAPWList() {
                        var inProgApList = this.getInProgressAPWListForActionPlan();
                        var inProgProbList = this.getInProgressAPWListForProblem();
                        return inProgProbList.concat(inProgApList);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getCompletedAPWList",
                    function getCompletedAPWList() {
                        var compProbList = this.getCompletedAPWListForProblem();
                        var compApList = this.getCompletedAPWListForActionPlan();
                        return compProbList.concat(compApList);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getInProgressAPWListForProblem",
                    function getInProgressAPWListForProblem() {
                        return this._getActionPlanWizardList("InProgress", 1);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getCompletedAPWListForProblem",
                    function getCompletedAPWListForProblem() {
                        return this._getActionPlanWizardList("Completed", 1);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getInProgressAPWListForActionPlan",
                    function getInProgressAPWListForActionPlan() {
                        return this._getActionPlanWizardList("InProgress", 2);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getCompletedAPWListForActionPlan",
                    function getCompletedAPWListForActionPlan() {
                        return this._getActionPlanWizardList("Completed", 2);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "_getActionPlanWizardList",
                    function _getActionPlanWizardList(state, typeCode) {
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var offlineDb = this.OfflineStorage;
                        var apwAnswerList = [];
                        var apwCollection = offlineDb.getCollection("ActionPlanWizard");
                        var apwList = apwCollection.find({
                            $and: [
                                {
                                    typeCode: {
                                        $eq: typeCode,
                                    },
                                },
                                {
                                    Id: {
                                        $gt: 0,
                                    },
                                },
                            ],
                        });

                        for (var i = 0; i < apwList.length; i++) {
                            var apw = apwList[i];
                            var wizId = apw.Id; // Getting person answer apw and pushing it to a list.

                            var personApwAnswers = this._getPersonAPWByActionPlanState(
                                wizId,
                                state
                            );

                            apwAnswerList.push({
                                apwId: wizId,
                                apwName: apw.name,
                                apwAnswers: personApwAnswers,
                            });
                        }

                        return apwAnswerList;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "_getPersonAPWByActionPlanState",
                    function _getPersonAPWByActionPlanState(actionPlanWizId, state) {
                        var offlineDb = this.OfflineStorage;
                        var personActionPlanWizardColl = offlineDb.getCollection(
                            "PersonActionPlanWizard"
                        );
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var tempAnsweringInProgress = false;
                        var tempAnsweringCompleted = false;

                        switch (state) {
                            case "InProgress":
                                tempAnsweringInProgress = true;
                                break;

                            case "Completed":
                                tempAnsweringCompleted = true;
                                break;

                            default:
                                break;
                        }

                        return personActionPlanWizardColl.find({
                            $and: [
                                {
                                    wizardId: actionPlanWizId,
                                },
                                {
                                    answeringInProgress: tempAnsweringInProgress,
                                },
                                {
                                    answeringCompleted: tempAnsweringCompleted,
                                },
                                {
                                    personId: loggedInUser[0].personId,
                                },
                            ],
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getUnAnsweredPersonQuestionnaireNonTemplate",
                    function getUnAnsweredPersonQuestionnaireNonTemplate(questionnaireId) {
                        var offlineDb = this.OfflineStorage;
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var personQuestionnaireColl = offlineDb.getCollection(
                            "PersonQuestionnaire"
                        );
                        var unAnsweredQuestionnaire = personQuestionnaireColl.findOne({
                            $and: [
                                {
                                    questionnaireId: questionnaireId,
                                },
                                {
                                    personId: loggedInUser[0].personId,
                                },
                                {
                                    answeringInProgress: false,
                                },
                                {
                                    answeringCompleted: false,
                                },
                            ],
                        });
                        return unAnsweredQuestionnaire;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getUnAnsweredPersonQuestionnaire",
                    function getUnAnsweredPersonQuestionnaire(questionnaireId) {
                        var offlineDb = this.OfflineStorage;
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var personQuestionnaireColl = offlineDb.getCollection(
                            "PersonQuestionnaireTemplate"
                        );
                        var unAnsweredQuestionnaire = personQuestionnaireColl.findOne({
                            $and: [
                                {
                                    questionnaireId: questionnaireId,
                                },
                                {
                                    personId: loggedInUser[0].personId,
                                },
                            ],
                        });
                        return unAnsweredQuestionnaire;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getUnAnsweredPersonActionPlanWizardByActionPlan",
                    function getUnAnsweredPersonActionPlanWizardByActionPlan(
                        actionPlanWizId
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var personActionPlanWizardColl = offlineDb.getCollection(
                            "PersonActionPlanWizardTemplate"
                        );
                        var personActionPlanWizardTemplate =
                            personActionPlanWizardColl.findOne({
                                $and: [
                                    {
                                        wizardId: actionPlanWizId,
                                    },
                                    {
                                        personId: loggedInUser[0].personId,
                                    },
                                ],
                            }); //This would mean that there is at least one answers for the action plan
                        //that particular action plan or problem either completely answered or in the in progress state
                        //if the value of unAnsweredApOrProblem is null then we take an
                        //already answered/inprogress state answer and make an new entry for new set of answering .

                        return personActionPlanWizardTemplate;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getPersonActionPlanWizard",
                    function getPersonActionPlanWizard(personActionPlanWizId) {
                        var offlineDb = this.OfflineStorage;
                        var personActionPlanWizardColl = offlineDb.getCollection(
                            "PersonActionPlanWizard"
                        );
                        return personActionPlanWizardColl.findOne({
                            Id: {
                                $eq: personActionPlanWizId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getPersonActionPlanWizardByWizardId",
                    function getPersonActionPlanWizardByWizardId(actionPlanWizId) {
                        var offlineDb = this.OfflineStorage;
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var personActionPlanWizardColl = offlineDb.getCollection(
                            "PersonActionPlanWizard"
                        );
                        return personActionPlanWizardColl.find({
                            $and: [
                                {
                                    wizardId: {
                                        $eq: actionPlanWizId,
                                    },
                                },
                                {
                                    personId: {
                                        $eq: loggedInUser[0].personId,
                                    },
                                },
                            ],
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getPersonActionPlanWizardTemplate",
                    function getPersonActionPlanWizardTemplate(wizardId) {
                        var offlineDb = this.OfflineStorage;
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var personId = loggedInUser[0].personId;
                        var personActionPlanWizardTemplateColl = offlineDb.getCollection(
                            "PersonActionPlanWizardTemplate"
                        );
                        return personActionPlanWizardTemplateColl.findOne({
                            $and: [
                                {
                                    Id: {
                                        $eq: wizardId,
                                    },
                                },
                                {
                                    personId: {
                                        $eq: personId,
                                    },
                                },
                            ],
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getPersonActionPlanWizardAnswer",
                    function getPersonActionPlanWizardAnswer(personActionPlanWizAnswerId) {
                        var offlineDb = this.OfflineStorage;
                        var personActionPlanWizardStepAnswerColl = offlineDb.getCollection(
                            "PersonActionPlanWizardStepAnswer"
                        );
                        return personActionPlanWizardStepAnswerColl.findOne({
                            Id: {
                                $eq: personActionPlanWizAnswerId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getPersonActionPlanWizardAnswerTemplate",
                    function getPersonActionPlanWizardAnswerTemplate(
                        personActionPlanWizTemplateAnswerId
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var personActionPlanWizardStepAnswerColl = offlineDb.getCollection(
                            "PersonActionPlanWizardStepAnswerTemplate"
                        );
                        return personActionPlanWizardStepAnswerColl.findOne({
                            Id: {
                                $eq: personActionPlanWizTemplateAnswerId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getPersonActionPlanWizardAnswers",
                    function getPersonActionPlanWizardAnswers(personActionPlanWizId) {
                        var offlineDb = this.OfflineStorage;
                        var personActionPlanWizardStepAnswerColl = offlineDb.getCollection(
                            "PersonActionPlanWizardStepAnswer"
                        );
                        return personActionPlanWizardStepAnswerColl.find({
                            newActionPlanEntityId: {
                                $eq: personActionPlanWizId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getPersonActionPlanWizardAnswersTemplate",
                    function getPersonActionPlanWizardAnswersTemplate(
                        personActionPlanWizId
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var personActionPlanWizardStepAnswerColl = offlineDb.getCollection(
                            "PersonActionPlanWizardStepAnswerTemplate"
                        );
                        return personActionPlanWizardStepAnswerColl.find({
                            newActionPlanEntityId: {
                                $eq: personActionPlanWizId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getPersonActionPlanWizardAttachment",
                    function getPersonActionPlanWizardAttachment(
                        personActionPlanWizAttachmentId
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var personActionPlanWizardAttachmentColl = offlineDb.getCollection(
                            "PersonActionPlanWizardAttachment"
                        );
                        return personActionPlanWizardAttachmentColl.findOne({
                            Id: {
                                $eq: personActionPlanWizAttachmentId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getPersonActionPlanWizardAttachments",
                    function getPersonActionPlanWizardAttachments(personActionPlanWizId) {
                        var offlineDb = this.OfflineStorage;
                        var personActionPlanWizardAttachmentColl = offlineDb.getCollection(
                            "PersonActionPlanWizardAttachment"
                        );
                        return personActionPlanWizardAttachmentColl.find({
                            newActionPlanEntityId: {
                                $eq: personActionPlanWizId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getPersonActionPlanWizardAttachmentsTemplate",
                    function getPersonActionPlanWizardAttachmentsTemplate(
                        personActionPlanWizId
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var personActionPlanWizardAttachmentColl = offlineDb.getCollection(
                            "PersonActionPlanWizardAttachmentTemplate"
                        );
                        return personActionPlanWizardAttachmentColl.find({
                            newActionPlanEntityId: {
                                $eq: personActionPlanWizId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getPersonActionPlanWizardAttachmentTemplate",
                    function getPersonActionPlanWizardAttachmentTemplate(
                        personActionPlanWizAttachmentId
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var personActionPlanWizardAttachmentColl = offlineDb.getCollection(
                            "PersonActionPlanWizardAttachmentTemplate"
                        );
                        return personActionPlanWizardAttachmentColl.findOne({
                            Id: {
                                $eq: personActionPlanWizAttachmentId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getPersonApwStepAnswerTemplateByColumnIdStepId",
                    function getPersonApwStepAnswerTemplateByColumnIdStepId(id, stepId) {
                        var offlineDb = this.OfflineStorage;
                        var personActionPlanWizardStepAnswerColl = offlineDb.getCollection(
                            "PersonActionPlanWizardStepAnswerTemplate"
                        );
                        return personActionPlanWizardStepAnswerColl.findOne({
                            $and: [
                                {
                                    Id: {
                                        $eq: id,
                                    },
                                },
                                {
                                    wizardStepId: {
                                        $eq: stepId,
                                    },
                                },
                            ],
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getPersonApwStepAnswerTemplateByWizColumnIdWizStepId",
                    function getPersonApwStepAnswerTemplateByWizColumnIdWizStepId(
                        columnId,
                        stepId
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var personActionPlanWizardStepAnswerColl = offlineDb.getCollection(
                            "PersonActionPlanWizardStepAnswerTemplate"
                        );
                        return personActionPlanWizardStepAnswerColl.findOne({
                            $and: [
                                {
                                    columnId: {
                                        $eq: columnId,
                                    },
                                },
                                {
                                    wizardStepId: {
                                        $eq: stepId,
                                    },
                                },
                            ],
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addPersonAskadeWizardAttachments",
                    function addPersonAskadeWizardAttachments(
                        personAskadeWizId,
                        attachments
                    ) {
                        var insertList = [];
                        var offlineDb = localStorage.OfflineStorage;
                        var askadeWizAttachmentsColl = offlineDb.getCollection(
                            "PersonAskadeFileTypeWizardAttachmentTemplate"
                        );
                        askadeWizAttachmentsColl.removeWhere(function (attach) {
                            return (
                                attach.personAskadeFileTypeWizardTemplateId === personAskadeWizId
                            );
                        });

                        for (var i = 0; i < attachments.length; i++) {
                            var attachment = {
                                Id: guid(),
                                personAskadeFileTypeWizardTemplateId: personAskadeWizId,
                                fileName: attachments[i].FileName,
                                fileSourceBase64: attachments[i].FileSourceBase64,
                                fileHeader: attachments[i].FileHeader,
                            };
                            insertList.push(attachment);
                        }

                        askadeWizAttachmentsColl.insert(insertList);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "savePersonAskadeWizardInsertOnly",
                    function savePersonAskadeWizardInsertOnly(pAskadewizard, isComplete) {
                        var offlineDb = this.OfflineStorage;
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var personId = loggedInUser[0].personId;
                        var columnGuideFileTypeId =
                            pAskadewizard.AskadeFileTypeWizard.ColumnGuideFileTypeId;
                        var personAkCollInsert = [];
                        var personAkColl = offlineDb.getCollection(
                            "PersonAskadeFileTypeWizard"
                        );
                        var pAkColl = {
                            Id: guid(),
                            fileTypeId: pAskadewizard.FileTypeId,
                            columnGuideFileTypeId: columnGuideFileTypeId,
                            answeringInProgress: !isComplete,
                            answeringCompleted: isComplete,
                            lastAnsweredStepIndex: pAskadewizard.LastAnsweredStepIndex,
                            personId: personId,
                            geoX: pAskadewizard.GeoX === undefined ? null : pAskadewizard.GeoX,
                            geoY: pAskadewizard.GeoY === undefined ? null : pAskadewizard.GeoY,
                            address: pAskadewizard.Address,
                        };
                        personAkCollInsert.push(pAkColl);
                        personAkColl.insert(personAkCollInsert);
                        offlineDb.saveDatabase(function () {
                            //Stuff to do after the save to local storage.
                        });
                        var insertedPAk = personAkColl.findOne({
                            Id: {
                                $eq: pAkColl.Id,
                            },
                        });
                        return insertedPAk;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "savePersonAskadeColumnInsertOnly",
                    function savePersonAskadeColumnInsertOnly(pAskadewizard, pAkId) {
                        var offlineDb = this.OfflineStorage;
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var personId = loggedInUser[0].personId;
                        var personAkColumnCollInsert = [];
                        var personAkColumnColl = offlineDb.getCollection(
                            "PersonAskadeColumnAnswer"
                        );

                        for (var i = 0; i < pAskadewizard.ColumnValues.length; i++) {
                            var column = pAskadewizard.ColumnValues[i]; //if (date !== null && typeof date.getMonth === 'function') {
                            //    var dateString = column.AnswerText.toString();
                            //    var utcDate = moment.utc(dateString).format();
                            //    properAnswerText = utcDate.toString();
                            //} else {
                            //    properAnswerText = column.AnswerText;
                            //}

                            var pAkColumn = {
                                Id: guid(),
                                fileColumnId: column.FileColumnId,
                                personId: personId,
                                personAskadeWizId: pAkId,
                                answerId: column.AnswerId,
                                answerText: column.AnswerText,
                                answerDate: column.AnswerDate,
                                defaultValue: column.DefaultValue,
                                columnSubType: column.ColumnSubType,
                                columnType: column.ColumnType,
                            };
                            personAkColumnCollInsert.push(pAkColumn);
                        }

                        personAkColumnColl.insert(personAkColumnCollInsert);
                        offlineDb.saveDatabase(function () {
                            //Stuff to do after the save to local storage.
                        });
                        var columnList = personAkColumnColl.find({
                            personAskadeWizId: {
                                $eq: pAkId,
                            },
                        });

                        var columnListSorted = this._sortString(columnList);

                        return columnListSorted;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "savePersonAskadeAttachmentInsertOnly",
                    function savePersonAskadeAttachmentInsertOnly(pAskadewizard, pAkId) {
                        var offlineDb = this.OfflineStorage;
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var personId = loggedInUser[0].personId;
                        var personAkAttachCollInsert = [];
                        var personAkAttachColl = offlineDb.getCollection(
                            "PersonAskadeFileTypeWizardAttachment"
                        );

                        for (var i = 0; i < pAskadewizard.Attachments.length; i++) {
                            var attach = pAskadewizard.Attachments[i];
                            var pAkAttach = {
                                Id: guid(),
                                personAskadeFileTypeWizardId: pAkId,
                                fileName: attach.FileName,
                                fileSourceBase64: attach.FileSourceBase64,
                                filePath: attach.FilePath,
                                internalFilePath: attach.InternalFilePath,
                                fileHeader: attach.FileHeader,
                            };
                            personAkAttachCollInsert.push(pAkAttach);
                        }

                        personAkAttachColl.insert(personAkAttachCollInsert);
                        offlineDb.saveDatabase(function () {
                            //Stuff to do after the save to local storage.
                        });
                        var attachList = personAkAttachColl.find({
                            personAskadeFileTypeWizardId: {
                                $eq: pAkId,
                            },
                        });

                        var attachListSorted = this._sortString(attachList);

                        return attachListSorted;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "savePersonAskadeWizardUpdateOnly",
                    function savePersonAskadeWizardUpdateOnly(pAskadewizard, isComplete) {
                        var offlineDb = this.OfflineStorage;
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var personId = loggedInUser[0].personId;
                        var personAkCollUpdate = [];
                        var personAkColl = offlineDb.getCollection(
                            "PersonAskadeFileTypeWizard"
                        );
                        var personAkExisting = personAkColl.findOne({
                            Id: {
                                $eq: pAskadewizard.Id,
                            },
                        });

                        if (personAkExisting != null) {
                            personAkExisting.answeringInProgress = !isComplete;
                            personAkExisting.answeringCompleted = isComplete;
                            personAkExisting.lastAnsweredStepIndex =
                                pAskadewizard.LastAnsweredStepIndex;
                            personAkExisting.geoX = pAskadewizard.GeoX;
                            personAkExisting.geoY = pAskadewizard.GeoY;
                            personAkExisting.address = pAskadewizard.Address;
                            personAkCollUpdate.push(personAkExisting);
                        }

                        var personAkColumnCollUpdate = [];
                        var personAkColumnColl = offlineDb.getCollection(
                            "PersonAskadeColumnAnswer"
                        );

                        for (var i = 0; i < pAskadewizard.ColumnValues.length; i++) {
                            var column = pAskadewizard.ColumnValues[i];
                            var personAkColumnExisting = personAkColumnColl.findOne({
                                $and: [
                                    {
                                        Id: column.Id,
                                    },
                                    {
                                        personAskadeWizId: column.PersonAskadeWizId,
                                    },
                                ],
                            });

                            if (personAkColumnExisting != null) {
                                personAkColumnExisting.fileColumnId = column.FileColumnId;
                                personAkColumnExisting.personId = personId;
                                personAkColumnExisting.personAskadeWizId =
                                    column.PersonAskadeWizId;
                                personAkColumnExisting.answerId = column.AnswerId;
                                personAkColumnExisting.answerDate = column.AnswerDate;
                                personAkColumnExisting.columnSubType = column.ColumnSubType;
                                personAkColumnExisting.columnType = column.ColumnType;
                                personAkColumnExisting.answerText = column.AnswerText;
                                personAkColumnExisting.defaultValue = column.DefaultValue;
                                personAkColumnCollUpdate.push(personAkColumnExisting);
                            }
                        }

                        var personAkAttachCollUpdate = [];
                        var personAkAttachColl = offlineDb.getCollection(
                            "PersonAskadeFileTypeWizardAttachment"
                        );

                        for (var j = 0; j < pAskadewizard.Attachments.length; j++) {
                            var attach = pAskadewizard.Attachments[j];
                            var pAttachId = attach.Id;
                            var personAttachExisting = personAkAttachColl.findOne({
                                Id: {
                                    $eq: pAttachId,
                                },
                            });

                            if (personAttachExisting !== null) {
                                personAttachExisting.fileName = attach.FileName;
                                personAttachExisting.fileSourceBase64 = attach.FileSourceBase64;
                                personAttachExisting.filePath = attach.FilePath;
                                personAttachExisting.internalFilePath = attach.InternalFilePath;
                                personAttachExisting.fileHeader = attach.FileHeader;
                                personAkAttachCollUpdate.push(personAttachExisting);
                            }
                        }

                        personAkAttachColl.update(personAkAttachCollUpdate);
                        personAkColumnColl.update(personAkColumnCollUpdate);
                        personAkColl.update(personAkCollUpdate);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deletePersonAskadeWizard",
                    function deletePersonAskadeWizard(pAkId) {
                        var offlineDb = this.OfflineStorage;
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var personId = loggedInUser[0].personId;
                        var personAskadeColl = offlineDb.getCollection(
                            "PersonAskadeFileTypeWizard"
                        );
                        var answeredAk = personAskadeColl.findOne({
                            Id: {
                                $eq: pAkId,
                            },
                        });
                        var personAskadeAttachmentColl = offlineDb.getCollection(
                            "PersonAskadeFileTypeWizardAttachment"
                        );
                        var attachments = personAskadeAttachmentColl.find({
                            personAskadeFileTypeWizardId: {
                                $eq: pAkId,
                            },
                        });

                        for (var i = 0; i < attachments.length; i++) {
                            var attachment = attachments[i];
                            personAskadeAttachmentColl.remove(attachment);
                        }

                        var personAskadeColumnAnswerColl = offlineDb.getCollection(
                            "PersonAskadeColumnAnswer"
                        );
                        var columnAnswers = personAskadeColumnAnswerColl.find({
                            personAskadeWizId: {
                                $eq: pAkId,
                            },
                        });

                        for (var i = 0; i < columnAnswers.length; i++) {
                            var columnAnswer = columnAnswers[i];
                            personAskadeColumnAnswerColl.remove(columnAnswer);
                        } //Remove/Update answeredApw(uploadedAPW) based on isansweredMultipleTimes flag

                        personAskadeColl.remove(answeredAk);
                        offlineDb.saveDatabase(function () {
                            //Stuff to do after the save to local storage.
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deleteColumnGuideByWizardStepId",
                    function deleteColumnGuideByWizardStepId(wizStepId) {
                        var offlineDb = this.OfflineStorage;
                        var actionPlanWizardStepColumnGuideCollection =
                            offlineDb.getCollection("ActionPlanWizardStepColumnGuide");
                        return actionPlanWizardStepColumnGuideCollection.removeWhere(
                            function (pActionPlanTemplate) {
                                return pActionPlanTemplate.apWizStepId === wizStepId;
                            }
                        );
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllColumnTypeWithDataTypeId",
                    function getAllColumnTypeWithDataTypeId() {
                        var offlineDb = this.OfflineStorage;
                        var askadeWizColumnColl = offlineDb.getCollection(
                            "AskadeFileTypeWizardStepColumn"
                        );
                        var askColumns = askadeWizColumnColl.data;
                        var distinctList = [];

                        for (var i = 0; i < askColumns.length; i++) {
                            var askColumn = askColumns[i];
                            var exists = false;

                            for (var j = 0; j < distinctList.length; j++) {
                                var distItem = distinctList[j];
                                var distColType = distItem.columnType;
                                var distDataTypeId = distItem.dataTypeId;

                                if (
                                    distColType.indexOf(askColumn.columnType) === 0 &&
                                    distDataTypeId.indexOf(askColumn.dataTypeId) === 0
                                ) {
                                    exists = true;
                                }
                            }

                            if (exists === false) {
                                distinctList.push(askColumn);
                            }
                        }

                        return distinctList;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getActionplanColumnIdsForDelete",
                    function getActionplanColumnIdsForDelete(columnIds, stepId) {
                        var offlineDb = this.OfflineStorage;
                        var apwWizStepColCollection = offlineDb.getCollection(
                            "ActionPlanWizardStepColumn"
                        );
                        var columnIdsForDelete = apwWizStepColCollection.find({
                            $and: [
                                {
                                    actionPlanWizardStepId: {
                                        $eq: stepId,
                                    },
                                },
                                {
                                    Id: {
                                        $nin: columnIds,
                                    },
                                },
                            ],
                        });
                        return columnIdsForDelete;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getActionPlanWizardStepIdsForDelete",
                    function getActionPlanWizardStepIdsForDelete(
                        stepIds,
                        actionPlanWizardId
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var apwStepCollection = offlineDb.getCollection(
                            "ActionPlanWizardStep"
                        );
                        var stepIdsForDelete = apwStepCollection.find({
                            $and: [
                                {
                                    actionPlanWizardId: {
                                        $eq: actionPlanWizardId,
                                    },
                                },
                                {
                                    Id: {
                                        $nin: stepIds,
                                    },
                                },
                            ],
                        });
                        return stepIdsForDelete;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getPApWizardStepAnswerIdsForDelete",
                    function getPApWizardStepAnswerIdsForDelete(columnIds, personApwId) {
                        var offlineDb = this.OfflineStorage;
                        var pApwStepAnswerColl = offlineDb.getCollection(
                            "PersonActionPlanWizardStepAnswerTemplate"
                        );
                        var pApwStepAnswerIdsForDelete = pApwStepAnswerColl.find({
                            $and: [
                                {
                                    Id: {
                                        $nin: columnIds,
                                    },
                                },
                                {
                                    newActionPlanEntityId: {
                                        $eq: personApwId,
                                    },
                                },
                            ],
                        });
                        return pApwStepAnswerIdsForDelete;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getPersonActionPlanWizardAttachmentIdsForDelete",
                    function getPersonActionPlanWizardAttachmentIdsForDelete(
                        attachmentIds,
                        personActionPlanWizId
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var personActionPlanWizardAttachmentColl = offlineDb.getCollection(
                            "PersonActionPlanWizardAttachmentTemplate"
                        );
                        var attachIdsForDelete = personActionPlanWizardAttachmentColl.find({
                            $and: [
                                {
                                    newActionPlanEntityId: {
                                        $eq: personActionPlanWizId,
                                    },
                                },
                                {
                                    Id: {
                                        $nin: attachmentIds,
                                    },
                                },
                            ],
                        });
                        return attachIdsForDelete;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getPersonActionPlanWizardIdsForDelete",
                    function getPersonActionPlanWizardIdsForDelete(
                        actionPlanWizId,
                        wizardId
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var personActionPlanWizardColl = offlineDb.getCollection(
                            "PersonActionPlanWizardTemplate"
                        );
                        var personActionPlanWizardTemplateIdsForDelete =
                            personActionPlanWizardColl.find({
                                $and: [
                                    {
                                        wizardId: {
                                            $eq: wizardId,
                                        },
                                    },
                                    {
                                        Id: {
                                            $nin: actionPlanWizId,
                                        },
                                    },
                                ],
                            });
                        return personActionPlanWizardTemplateIdsForDelete;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getActionPlanWizardIdsForDelete",
                    function getActionPlanWizardIdsForDelete(
                        actionPlanWizardIds,
                        usedActionplanIds
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var apwCollection = offlineDb.getCollection("ActionPlanWizard");
                        var apwIdsForDelete = apwCollection.find({
                            $and: [
                                {
                                    Id: {
                                        $nin: actionPlanWizardIds,
                                    },
                                },
                                {
                                    Id: {
                                        $nin: usedActionplanIds,
                                    },
                                },
                            ],
                        });
                        return apwIdsForDelete;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addPersonActionPlanWizardAttachmentTemplate",
                    function addPersonActionPlanWizardAttachmentTemplate(
                        newActionPlanEntId,
                        attachmentJsonData,
                        index
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var attachId = null;
                        var personApwAttachCollTemplate = offlineDb.getCollection(
                            "PersonActionPlanWizardAttachmentTemplate"
                        );
                        var personApwAttachTemplates = personApwAttachCollTemplate.find({
                            newActionPlanEntityId: {
                                $eq: newActionPlanEntId,
                            },
                        });
                        var personApwAttachment = personApwAttachTemplates[index];

                        if (personApwAttachment != null) {
                            personApwAttachment.fileName = attachmentJsonData.FileName;
                            personApwAttachment.fileSourceBase64 =
                                attachmentJsonData.FileSourceBase64;
                            personApwAttachment.fileHeader = attachmentJsonData.FileHeader;
                            personApwAttachCollTemplate.update(personApwAttachment);
                            attachId = personApwAttachment.Id;
                        } else {
                            var personApwAttachmentNew = {
                                Id: guid(),
                                newActionPlanEntityId: newActionPlanEntId,
                                fileName: attachmentJsonData.FileName,
                                fileSourceBase64: attachmentJsonData.FileSourceBase64,
                                fileHeader: attachmentJsonData.FileHeader,
                            };
                            attachId = personApwAttachmentNew.Id;
                            personApwAttachCollTemplate.insert(personApwAttachmentNew);
                        }

                        return attachId;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addPersonActionPlanWizardStepMultiTaskTemplate",
                    function addPersonActionPlanWizardStepMultiTaskTemplate(
                        newActionPlanEntId,
                        wizardStepColumnAnswerJsonData
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var personApwStepAnsCollTemplate = offlineDb.getCollection(
                            "PersonActionPlanMultiTaskTemplate"
                        );
                        var wizardStepId = wizardStepColumnAnswerJsonData.WizardStepId;
                        var columnId = wizardStepColumnAnswerJsonData.ColumnId;
                        var id = null;
                        personApwStepAnsCollTemplate.removeWhere(function (pApwStepAnsCol) {
                            return (
                                pApwStepAnsCol.newActionPlanEntityId === newActionPlanEntId &&
                                pApwStepAnsCol.wizardStepId == wizardStepId &&
                                pApwStepAnsCol.columnId === columnId
                            );
                        }); //var personApwStepColAnswerTemplate = personApwStepAnsCollTemplate.findOne({
                        //    '$and': [{ 'newActionPlanEntityId': { '$eq': newActionPlanEntId } }, { 'wizardStepId': { '$eq': wizardStepId } },
                        //    { 'columnId': { '$eq': columnId } }]
                        //});
                        //if (personApwStepColAnswerTemplate !== null) {
                        //    personApwStepColAnswerTemplate.columnId = wizardStepColumnAnswerJsonData.ColumnId;
                        //    personApwStepColAnswerTemplate.answerId = wizardStepColumnAnswerJsonData.AnswerId;
                        //    personApwStepColAnswerTemplate.answerText = wizardStepColumnAnswerJsonData.AnswerText;
                        //    id = personApwStepColAnswerTemplate.Id;
                        //    personApwStepAnsCollTemplate.update(personApwStepColAnswerTemplate);
                        //}
                        //else {

                        var stepColAnswer = {
                            Id: guid(),
                            newActionPlanEntityId: newActionPlanEntId,
                            wizardStepId: wizardStepColumnAnswerJsonData.WizardStepId,
                            columnId: wizardStepColumnAnswerJsonData.ColumnId,
                            answerId: wizardStepColumnAnswerJsonData.AnswerId,
                            answerText: wizardStepColumnAnswerJsonData.AnswerText,
                            answerDate: null,
                            defaultValue: wizardStepColumnAnswerJsonData.DefaultValue,
                            scope: null,
                            solution: null,
                            deadLine: null,
                            approvedDate: null,
                            assignedToId: null,
                        };
                        id = stepColAnswer.Id;
                        personApwStepAnsCollTemplate.insert(stepColAnswer); //}

                        return id;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addPersonActionPlanWizardStepColumnAnswerTemplate",
                    function addPersonActionPlanWizardStepColumnAnswerTemplate(
                        newActionPlanEntId,
                        wizardStepColumnAnswerJsonData
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var personApwStepAnsCollTemplate = offlineDb.getCollection(
                            "PersonActionPlanWizardStepAnswerTemplate"
                        );
                        var wizardStepId = wizardStepColumnAnswerJsonData.WizardStepId;
                        var columnId = wizardStepColumnAnswerJsonData.ColumnId;
                        var id = null;
                        personApwStepAnsCollTemplate.removeWhere(function (pApwStepAnsCol) {
                            return (
                                pApwStepAnsCol.newActionPlanEntityId === newActionPlanEntId &&
                                pApwStepAnsCol.wizardStepId == wizardStepId &&
                                pApwStepAnsCol.columnId === columnId
                            );
                        }); //var personApwStepColAnswerTemplate = personApwStepAnsCollTemplate.findOne({
                        //    '$and': [{ 'newActionPlanEntityId': { '$eq': newActionPlanEntId } }, { 'wizardStepId': { '$eq': wizardStepId } },
                        //    { 'columnId': { '$eq': columnId } }]
                        //});
                        //if (personApwStepColAnswerTemplate !== null) {
                        //    personApwStepColAnswerTemplate.columnId = wizardStepColumnAnswerJsonData.ColumnId;
                        //    personApwStepColAnswerTemplate.answerId = wizardStepColumnAnswerJsonData.AnswerId;
                        //    personApwStepColAnswerTemplate.answerText = wizardStepColumnAnswerJsonData.AnswerText;
                        //    id = personApwStepColAnswerTemplate.Id;
                        //    personApwStepAnsCollTemplate.update(personApwStepColAnswerTemplate);
                        //}
                        //else {

                        var stepColAnswer = {
                            Id: guid(),
                            newActionPlanEntityId: newActionPlanEntId,
                            wizardStepId: wizardStepColumnAnswerJsonData.WizardStepId,
                            columnId: wizardStepColumnAnswerJsonData.ColumnId,
                            answerId: wizardStepColumnAnswerJsonData.AnswerId,
                            answerText: wizardStepColumnAnswerJsonData.AnswerText,
                            answerDate: null,
                            defaultValue: wizardStepColumnAnswerJsonData.DefaultValue,
                        };
                        id = stepColAnswer.Id;
                        personApwStepAnsCollTemplate.insert(stepColAnswer); //}

                        return id;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addEasyClassificationListData",
                    function addEasyClassificationListData(dataTypeId, genericListData) {
                        if (dataTypeId === "34" || dataTypeId === "1479") {
                            privateMethods.addDataTypeTableEasyData(
                                "EasyClassification",
                                dataTypeId,
                                genericListData
                            );
                        } else {
                            privateMethods.addDataTypeTableListData(
                                "EasyClassification",
                                dataTypeId,
                                genericListData
                            );
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addListValueListData",
                    function addListValueListData(dataTypeId, genericListData) {
                        privateMethods.addDataTypeTableListData(
                            "ListValue",
                            dataTypeId,
                            genericListData
                        );
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addVehicleDamageData",
                    function addVehicleDamageData(dataTypeId, genericListData) {
                        privateMethods.addDataTypeTableListData(
                            "VehicleDamage",
                            dataTypeId,
                            genericListData
                        );
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addInsuranceData",
                    function addInsuranceData(dataTypeId, genericListData) {
                        privateMethods.addInsuranceDetails(
                            "Insurance",
                            dataTypeId,
                            genericListData
                        );
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addListData",
                    function addListData(tableName, tableValues) {
                        switch (tableName) {
                            case "Asset":
                                // Adding asset data seperaterly as part of FT 6861 (Asset data comes with a additional column Filter)
                                this.addAssetDetails(tableValues);
                                break;
                            case "Department":
                                this.addDepartmentData(tableValues);
                                break;
                            case "Person":
                                this.addPersonData(tableValues);
                                break;
                            default:
                                privateMethods.addDataToGenericCollection(tableName, tableValues);
                                break;
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addActionPlanWizardListData",
                    function addActionPlanWizardListData(actionPlanWizardJsonData) {
                        var offlineDb = this.OfflineStorage;
                        var genericTableNames = [
                            "Category",
                            "Status",
                            "Probability",
                            "Consequence",
                            "Priority",
                            "ProblemArea",
                            "LineOfBusiness",
                            "SafetyDepartment",
                            "Process",
                            "ControlLevel",
                            "CustomerFieldValue1",
                            "CustomerFieldValue2",
                            "CustomerFieldValue3",
                            "CustomerListValue1",
                            "CustomerListValue2",
                            "CustomerListValue3",
                        ];

                        for (var i = 0; i < genericTableNames.length; i++) {
                            var tableName = genericTableNames[i];
                            var genericListData = actionPlanWizardJsonData[tableName];
                            privateMethods.addDataToGenericCollection(
                                tableName,
                                genericListData
                            ); //offlineDb.saveDatabase(function () {
                            //    //Stuff to do after the save to local storage.
                            //});
                        } // Adding asset data seperaterly as part of FT 6861 (Asset data comes with a additional column Filter)

                        this.addAssetDetails(actionPlanWizardJsonData["Asset"]);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "savePersonActionPlanWizardAttachmentsOnly",
                    function savePersonActionPlanWizardAttachmentsOnly(pApw, personApwId) {
                        var offlineDb = this.OfflineStorage;
                        var savePersonAPWAttachmentInsert = [];
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var pApwAttachmentColl = offlineDb.getCollection(
                            "PersonActionPlanWizardAttachment"
                        );

                        for (var i = 0; i < pApw.Attachments.length; i++) {
                            var pApwAttach = pApw.Attachments[i];
                            var personApwAttachment = {
                                Id: guid(),
                                newActionPlanEntityId: personApwId,
                                fileName: pApwAttach.FileName,
                                fileSourceBase64: pApwAttach.FileSourceBase64,
                                fileLocation: pApwAttach.FileLocation,
                                internalFileLocation: pApwAttach.InternalFileLocation,
                                fileHeader: pApwAttach.FileHeader,
                            };
                            savePersonAPWAttachmentInsert.push(personApwAttachment);
                        }

                        pApwAttachmentColl.insert(savePersonAPWAttachmentInsert);
                        return pApwAttachmentColl.find({
                            newActionPlanEntityId: {
                                $eq: personApwId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "savePersonActionPlanWizardStepAnswersOnly",
                    function savePersonActionPlanWizardStepAnswersOnly(pApw, personApwId) {
                        var offlineDb = this.OfflineStorage;
                        var savePersonAPWStepAnswerInsert = [];
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var personApwStepAnswersColl = offlineDb.getCollection(
                            "PersonActionPlanWizardStepAnswer"
                        );

                        for (var i = 0; i < pApw.ColumnValues.length; i++) {
                            var pApwColVal = pApw.ColumnValues[i];
                            var stepColAnswer = {
                                Id: guid(),
                                newActionPlanEntityId: personApwId,
                                wizardStepId: pApwColVal.WizardStepId,
                                columnId: pApwColVal.ColumnId,
                                answerId: pApwColVal.AnswerId,
                                answerText: pApwColVal.AnswerText,
                                answerDate: pApwColVal.AnswerDate,
                                defaultValue: pApwColVal.DefaultValue,
                            };
                            savePersonAPWStepAnswerInsert.push(stepColAnswer);
                        }

                        personApwStepAnswersColl.insert(savePersonAPWStepAnswerInsert);
                        return personApwStepAnswersColl.find({
                            newActionPlanEntityId: {
                                $eq: personApwId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deleteMultiTaskById",
                    function deleteMultiTaskById(multiTaskId) {
                        var offlineDb = this.OfflineStorage;
                        var pApwMultiTaskColl = offlineDb.getCollection(
                            "PersonActionPlanMultiTask"
                        );
                        var pApwMultiTask = pApwMultiTaskColl.findOne({
                            Id: {
                                $eq: multiTaskId,
                            },
                        });

                        if (pApwMultiTask) {
                            pApwMultiTaskColl.remove(pApwMultiTask);
                        }

                        return pApwMultiTask;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deleteAllMultiTaskByStepId",
                    function deleteAllMultiTaskByStepId(stepId) {
                        var offlineDb = this.OfflineStorage;
                        var pApwMultiTaskColl = offlineDb.getCollection(
                            "PersonActionPlanMultiTask"
                        );
                        var pApwMultiTasks = pApwMultiTaskColl.find({
                            wizardStepId: {
                                $eq: stepId,
                            },
                        });

                        if (pApwMultiTasks) {
                            pApwMultiTaskColl.remove(pApwMultiTasks);
                        }

                        return pApwMultiTasks;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deleteMultiTaskAttachmentById",
                    function deleteMultiTaskAttachmentById(mtAttach) {
                        var offlineDb = this.OfflineStorage;
                        var pApwMultiTaskAttachColl = offlineDb.getCollection(
                            "PersonActionPlanMultiTaskAttachment"
                        );
                        var pApwMultiTaskAttach = pApwMultiTaskAttachColl.findOne({
                            Id: {
                                $eq: mtAttach.Id,
                            },
                        });

                        if (pApwMultiTaskAttach) {
                            pApwMultiTaskAttachColl.remove(pApwMultiTaskAttach);
                        }

                        return pApwMultiTaskAttach;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deleteAllMultiTaskAttachments",
                    function deleteAllMultiTaskAttachments(multiTaskId) {
                        var offlineDb = this.OfflineStorage;
                        var pApwMultiTaskAttachColl = offlineDb.getCollection(
                            "PersonActionPlanMultiTaskAttachment"
                        );
                        var pApwMultiTaskAttach = pApwMultiTaskAttachColl.find({
                            multiTaskEntityId: {
                                $eq: multiTaskId,
                            },
                        });

                        if (pApwMultiTaskAttach) {
                            pApwMultiTaskAttachColl.remove(pApwMultiTaskAttach);
                        }

                        return pApwMultiTaskAttach;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getPersonMultiTaskIdsForDelete",
                    function getPersonMultiTaskIdsForDelete(stepIds, personApwId) {
                        var offlineDb = this.OfflineStorage;
                        var pApwMultiTaskColl = offlineDb.getCollection(
                            "PersonActionPlanMultiTask"
                        );
                        var pApwMultiTaskIdsForDelete = pApwMultiTaskColl.find({
                            $and: [
                                {
                                    wizardStepId: {
                                        $nin: stepIds,
                                    },
                                    newActionPlanEntityId: {
                                        $eq: personApwId,
                                    },
                                },
                            ],
                        });
                        return pApwMultiTaskIdsForDelete;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deleteMultiTaskByPersonApwId",
                    function deleteMultiTaskByPersonApwId(personApwId) {
                        var offlineDb = localStorage.OfflineStorage;
                        var multiTaskCollection = offlineDb.getCollection(
                            "PersonActionPlanMultiTask"
                        );
                        var multiTaskIdsForDelete = multiTaskCollection.find({
                            newActionPlanEntityId: {
                                $eq: personApwId,
                            },
                        });
                        multiTaskCollection.remove(multiTaskIdsForDelete);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllPersonMultiTaskData",
                    function getAllPersonMultiTaskData(personApwId) {
                        var offlineDb = this.OfflineStorage;
                        var personApwStepAnswersMultiTask = offlineDb.getCollection(
                            "PersonActionPlanMultiTask"
                        );
                        var pApwMultiTaskVal = personApwStepAnswersMultiTask.find({
                            $and: [
                                {
                                    newActionPlanEntityId: {
                                        $eq: personApwId,
                                    },
                                },
                                {
                                    isEmptyMultiTask: {
                                        $eq: false,
                                    },
                                },
                            ],
                        });

                        var descendingSort = this._descendingSort(pApwMultiTaskVal);

                        return descendingSort;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getPersonMultiTaskData",
                    function getPersonMultiTaskData(multiTaskID) {
                        var offlineDb = this.OfflineStorage;
                        var personApwStepAnswersMultiTask = offlineDb.getCollection(
                            "PersonActionPlanMultiTask"
                        );
                        var pApwMultiTaskVal = personApwStepAnswersMultiTask.findOne({
                            Id: {
                                $eq: multiTaskID,
                            },
                        });
                        return pApwMultiTaskVal;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getValidAnsweredPersonMultiTaskData",
                    function getValidAnsweredPersonMultiTaskData(personApwId) {
                        var offlineDb = this.OfflineStorage;
                        var personApwStepAnswersMultiTask = offlineDb.getCollection(
                            "PersonActionPlanMultiTask"
                        );
                        var pApwMultiTaskVal = personApwStepAnswersMultiTask.findOne({
                            $and: [
                                {
                                    newActionPlanEntityId: {
                                        $eq: personApwId,
                                    },
                                },
                                {
                                    isEmptyMultiTask: {
                                        $eq: false,
                                    },
                                },
                            ],
                        });
                        return pApwMultiTaskVal;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getUnAnsweredPersonMultiTaskData",
                    function getUnAnsweredPersonMultiTaskData(personApwId) {
                        var offlineDb = this.OfflineStorage;
                        var personApwStepAnswersMultiTask = offlineDb.getCollection(
                            "PersonActionPlanMultiTask"
                        );
                        var pApwMultiTaskVal = personApwStepAnswersMultiTask.findOne({
                            $and: [
                                {
                                    newActionPlanEntityId: {
                                        $eq: personApwId,
                                    },
                                },
                                {
                                    isEmptyMultiTask: {
                                        $eq: true,
                                    },
                                },
                            ],
                        });
                        return pApwMultiTaskVal;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getPersonActionPlanWizardMultiTaskAttachment",
                    function getPersonActionPlanWizardMultiTaskAttachment(multiTaskId) {
                        var offlineDb = this.OfflineStorage;
                        var personActionPlanMTAttachmentColl = offlineDb.getCollection(
                            "PersonActionPlanMultiTaskAttachment"
                        );
                        return personActionPlanMTAttachmentColl.findOne({
                            multiTaskEntityId: {
                                $eq: multiTaskId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllPersonActionPlanMultiTaskAttachments",
                    function getAllPersonActionPlanMultiTaskAttachments(multiTaskId) {
                        var offlineDb = this.OfflineStorage;
                        var personActionPlanMTAttachmentColl = offlineDb.getCollection(
                            "PersonActionPlanMultiTaskAttachment"
                        );
                        var mtAttachList = personActionPlanMTAttachmentColl.find({
                            multiTaskEntityId: {
                                $eq: multiTaskId,
                            },
                        });

                        var descendingList = this._descendingSort(mtAttachList);

                        return descendingList;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deleteUnUsedMTAttachment",
                    function deleteUnUsedMTAttachment(mtAttach) {
                        var offlineDb = this.OfflineStorage;
                        var personApwMultiTaskAttachment = offlineDb.getCollection(
                            "PersonActionPlanMultiTaskAttachment"
                        );
                        var personMultiTaskAttachNotUsed = personApwMultiTaskAttachment.find({
                            Id: {
                                $eq: mtAttach.Id,
                            },
                        });
                        personApwMultiTaskAttachment.remove(personMultiTaskAttachNotUsed);
                        this.saveOfflineDb();
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "createNewMultiTaskAttachment",
                    function createNewMultiTaskAttachment(multiTaskId) {
                        var offlineDb = this.OfflineStorage;
                        var personApwMultiTaskAttachment = offlineDb.getCollection(
                            "PersonActionPlanMultiTaskAttachment"
                        );
                        var multiTaskAnswer = {
                            Id: guid(),
                            multiTaskEntityId: multiTaskId,
                            fileName: null,
                            fileLocation: null,
                            fileSourceBase64: null,
                            internalFileLocation: null,
                            fileHeader: null,
                            isSavedToDb: false,
                        };
                        personApwMultiTaskAttachment.insert(multiTaskAnswer);
                        this.saveOfflineDb();
                        return personApwMultiTaskAttachment.findOne({
                            Id: {
                                $eq: multiTaskAnswer.Id,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "saveMultiTaskAttachments",
                    function saveMultiTaskAttachments(multiTaskAttachData) {
                        var offlineDb = this.OfflineStorage;
                        var savePersonAPWMultiTaskAttachUpdate = [];
                        var personApwMultiTaskAttachment = offlineDb.getCollection(
                            "PersonActionPlanMultiTaskAttachment"
                        );

                        for (var i = 0; i < multiTaskAttachData.length; i++) {
                            var multiTaskAttach = multiTaskAttachData[i];
                            var personMultiTaskAttach = personApwMultiTaskAttachment.findOne({
                                Id: {
                                    $eq: multiTaskAttach.Id,
                                },
                            });

                            if (personMultiTaskAttach) {
                                personMultiTaskAttach.fileName = multiTaskAttach.FileName;
                                personMultiTaskAttach.fileLocation = multiTaskAttach.FileLocation;
                                personMultiTaskAttach.fileSourceBase64 =
                                    multiTaskAttach.FileSourceBase64;
                                personMultiTaskAttach.fileHeader = multiTaskAttach.FileHeader;
                                personMultiTaskAttach.isSavedToDb = multiTaskAttach.IsSavedToDb;
                                savePersonAPWMultiTaskAttachUpdate.push(personMultiTaskAttach);
                            }
                        }

                        personApwMultiTaskAttachment.update(
                            savePersonAPWMultiTaskAttachUpdate
                        );
                        this.saveOfflineDb();
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "saveMultiTaskAttachment",
                    function saveMultiTaskAttachment(multiTaskAttach) {
                        var offlineDb = this.OfflineStorage;
                        var personApwMultiTaskAttachment = offlineDb.getCollection(
                            "PersonActionPlanMultiTaskAttachment"
                        );
                        var personMultiTaskAttach = personApwMultiTaskAttachment.findOne({
                            Id: {
                                $eq: multiTaskAttach.Id,
                            },
                        });

                        if (personMultiTaskAttach) {
                            personMultiTaskAttach.fileName = multiTaskAttach.FileName;
                            personMultiTaskAttach.fileLocation = multiTaskAttach.FileLocation;
                            personMultiTaskAttach.fileSourceBase64 =
                                multiTaskAttach.FileSourceBase64;
                            personMultiTaskAttach.internalFileLocation =
                                multiTaskAttach.InternalFileLocation;
                            personMultiTaskAttach.fileHeader = multiTaskAttach.FileHeader;
                            personMultiTaskAttach.isSavedToDb = multiTaskAttach.IsSavedToDb;
                        }

                        personApwMultiTaskAttachment.update(personMultiTaskAttach);
                        this.saveOfflineDb();
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "createPersonMultiTaskEntry",
                    function createPersonMultiTaskEntry(
                        personApwId,
                        wizardStepId,
                        personColumnValues
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var personApwStepAnswersMultiTask = offlineDb.getCollection(
                            "PersonActionPlanMultiTask"
                        ); //var personMultiTask = personApwStepAnswersMultiTask.find({ 'newActionPlanEntityId': { '$eq': personApwId } });

                        var multiTaskAnswer = {
                            Id: guid(),
                            newActionPlanEntityId: personApwId,
                            wizardStepId: wizardStepId,
                            scope: null,
                            solution: null,
                            deadLine: null,
                            approvedDate: null,
                            assignedToId: null,
                            isEmptyMultiTask: true,
                            defaultValue: false,
                        };

                        if (personColumnValues) {
                            multiTaskAnswer.assignedToId = personColumnValues.answerId;
                            multiTaskAnswer.defaultValue = personColumnValues.defaultValue;
                        }

                        personApwStepAnswersMultiTask.insert(multiTaskAnswer);
                        this.saveOfflineDb();
                        return personApwStepAnswersMultiTask.findOne({
                            Id: {
                                $eq: multiTaskAnswer.Id,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "saveMultiTaskFromPApwTemplate",
                    function saveMultiTaskFromPApwTemplate(
                        newPAwEntity,
                        personMultiTaskData
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var personApwStepAnswersMultiTask = offlineDb.getCollection(
                            "PersonActionPlanMultiTask"
                        );
                        var pApwMultiTaskVal = personApwStepAnswersMultiTask.findOne({
                            $and: [
                                {
                                    wizardStepId: {
                                        $eq: personMultiTaskData.WizardStepId,
                                    },
                                },
                                {
                                    Id: {
                                        $eq: personMultiTaskData.Id,
                                    },
                                },
                            ],
                        });

                        if (pApwMultiTaskVal !== null) {
                            pApwMultiTaskVal.newActionPlanEntityId = newPAwEntity.Id;
                            pApwMultiTaskVal.scope = personMultiTaskData.Scope;
                            pApwMultiTaskVal.solution = personMultiTaskData.SolutionText;
                            pApwMultiTaskVal.deadLine = personMultiTaskData.DeadlineDate;
                            pApwMultiTaskVal.approvedDate = personMultiTaskData.ApprovedDate;
                            pApwMultiTaskVal.assignedToId =
                                personMultiTaskData.ResponsiblePersonId;
                            pApwMultiTaskVal.isEmptyMultiTask =
                                personMultiTaskData.IsEmptyMultiTask;
                        }

                        personApwStepAnswersMultiTask.update(pApwMultiTaskVal);
                        return personApwStepAnswersMultiTask.findOne({
                            Id: {
                                $eq: personMultiTaskData.Id,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "savePersonActionPlanWizardStepMultiTask",
                    function savePersonActionPlanWizardStepMultiTask(personMultiTaskData) {
                        var offlineDb = this.OfflineStorage;
                        var personApwStepAnswersMultiTask = offlineDb.getCollection(
                            "PersonActionPlanMultiTask"
                        );
                        var pApwMultiTaskVal = personApwStepAnswersMultiTask.findOne({
                            $and: [
                                {
                                    newActionPlanEntityId: {
                                        $eq: personMultiTaskData.PersonAPWId,
                                    },
                                },
                                {
                                    wizardStepId: {
                                        $eq: personMultiTaskData.WizardStepId,
                                    },
                                },
                                {
                                    Id: {
                                        $eq: personMultiTaskData.Id,
                                    },
                                },
                            ],
                        });

                        if (pApwMultiTaskVal !== null) {
                            pApwMultiTaskVal.scope = personMultiTaskData.Scope;
                            pApwMultiTaskVal.solution = personMultiTaskData.SolutionText;
                            pApwMultiTaskVal.deadLine = personMultiTaskData.DeadlineDate;
                            pApwMultiTaskVal.approvedDate = personMultiTaskData.ApprovedDate;
                            pApwMultiTaskVal.assignedToId =
                                personMultiTaskData.ResponsiblePersonId;
                            pApwMultiTaskVal.isEmptyMultiTask =
                                personMultiTaskData.IsEmptyMultiTask;
                        }

                        personApwStepAnswersMultiTask.update(pApwMultiTaskVal);
                        return personApwStepAnswersMultiTask.findOne({
                            Id: {
                                $eq: personMultiTaskData.Id,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "savePersonActionPlanWizardOrProblemTemplateOnly",
                    function savePersonActionPlanWizardOrProblemTemplateOnly(
                        pApw,
                        isAnsweringComplete
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var savePersonAPWTemplateInsert = [];
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var personApwColl = offlineDb.getCollection("PersonActionPlanWizard");
                        var apAnswer = {
                            Id: guid(),
                            wizardId: pApw.Wizard.Id,
                            title: pApw.Title,
                            personId: loggedInUser[0].personId,
                            answeringInProgress: !isAnsweringComplete,
                            answeringCompleted: isAnsweringComplete,
                            lastAnsweredStepIndex: pApw.LastAnsweredStepIndex,
                            geoX: pApw.GeoX,
                            geoY: pApw.GeoY,
                            address: pApw.Address,
                        };
                        savePersonAPWTemplateInsert.push(apAnswer);
                        personApwColl.insert(savePersonAPWTemplateInsert);
                        return personApwColl.findOne({
                            Id: {
                                $eq: apAnswer.Id,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "savePersonActionPlanWizardOrProblem",
                    function savePersonActionPlanWizardOrProblem(
                        pApw,
                        isAnsweringComplete
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var savePersonAPWUpdate = [];
                        var savePersonAPWStepAnswerUpdate = [];
                        var savePersonAPWAttachementUpdate = [];
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var personApwColl = offlineDb.getCollection("PersonActionPlanWizard");
                        var personApwExisting = personApwColl.findOne({
                            Id: {
                                $eq: pApw.Id,
                            },
                        });
                        personApwExisting.title = pApw.Title;
                        personApwExisting.personId = loggedInUser[0].personId; //To be set later on..

                        personApwExisting.answeringInProgress = !isAnsweringComplete;
                        personApwExisting.answeringCompleted = isAnsweringComplete;
                        personApwExisting.lastAnsweredStepIndex = pApw.LastAnsweredStepIndex;
                        personApwExisting.geoX = pApw.GeoX;
                        personApwExisting.geoY = pApw.GeoY;
                        personApwExisting.address = pApw.Address;
                        var personApwStepAnswerCollection = offlineDb.getCollection(
                            "PersonActionPlanWizardStepAnswer"
                        );

                        for (var i = 0; i < pApw.ColumnValues.length; i++) {
                            var pApwColVal = pApw.ColumnValues[i];
                            var pApwStepExisting = personApwStepAnswerCollection.findOne({
                                Id: {
                                    $eq: pApwColVal.Id,
                                },
                            });
                            pApwStepExisting.answerId = pApwColVal.AnswerId;
                            pApwStepExisting.answerDate = pApwColVal.AnswerDate;
                            pApwStepExisting.answerText = pApwColVal.AnswerText;
                            pApwStepExisting.defaultValue = pApwColVal.DefaultValue;
                            savePersonAPWStepAnswerUpdate.push(pApwStepExisting);
                        }

                        savePersonAPWUpdate.push(personApwExisting);
                        var pApwAttachmentColl = offlineDb.getCollection(
                            "PersonActionPlanWizardAttachment"
                        );

                        for (var i = 0; i < pApw.Attachments.length; i++) {
                            var pApwAttach = pApw.Attachments[i];
                            var pApwStepExisting = pApwAttachmentColl.findOne({
                                Id: {
                                    $eq: pApwAttach.Id,
                                },
                            });
                            pApwStepExisting.fileName = pApwAttach.FileName;
                            pApwStepExisting.fileLocation = pApwAttach.FileLocation;
                            pApwStepExisting.fileHeader = pApwAttach.FileHeader;
                            pApwStepExisting.internalFileLocation =
                                pApwAttach.InternalFileLocation;
                            savePersonAPWAttachementUpdate.push(pApwStepExisting);
                        }

                        personApwColl.update(savePersonAPWUpdate);
                        personApwStepAnswerCollection.update(savePersonAPWStepAnswerUpdate);
                        pApwAttachmentColl.update(savePersonAPWAttachementUpdate);
                        return personApwExisting;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deletePersonActionPlanWizard",
                    function deletePersonActionPlanWizard(pApwId) {
                        var offlineDb = this.OfflineStorage;
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var personId = loggedInUser[0].personId; //Gets the sucessfully answered actionplan/problem

                        var personApwColl = offlineDb.getCollection("PersonActionPlanWizard");
                        var answeredApw = personApwColl.findOne({
                            Id: {
                                $eq: pApwId,
                            },
                        });
                        var wizId = answeredApw.wizardId; //Get attachments attached while answering and delete /update to null based on the isansweredMultipleTimes flag

                        var personActionPlanWizardAttachmentColl = offlineDb.getCollection(
                            "PersonActionPlanWizardAttachment"
                        );
                        var attachments = personActionPlanWizardAttachmentColl.find({
                            newActionPlanEntityId: {
                                $eq: pApwId,
                            },
                        });

                        for (var i = 0; i < attachments.length; i++) {
                            var attachment = attachments[i];
                            personActionPlanWizardAttachmentColl.remove(attachment);
                        } //Get answeredColumns answeried and delete /update to null based on the isansweredMultipleTimes flag

                        var personActionPlanWizardStepAnswerColl = offlineDb.getCollection(
                            "PersonActionPlanWizardStepAnswer"
                        );
                        var columnAnswers = personActionPlanWizardStepAnswerColl.find({
                            newActionPlanEntityId: {
                                $eq: pApwId,
                            },
                        });

                        for (var i = 0; i < columnAnswers.length; i++) {
                            var columnAnswer = columnAnswers[i];
                            personActionPlanWizardStepAnswerColl.remove(columnAnswer);
                        } //Remove/Update answeredApw(uploadedAPW) based on isansweredMultipleTimes flag

                        personApwColl.remove(answeredApw);
                        offlineDb.saveDatabase(function () {
                            //Stuff to do after the save to local storage.
                        });
                    }
                ),
                _defineProperty(_localStorage, "getCustomer", function getCustomer() {
                    var offlineDb = this.OfflineStorage;
                    var customerCollection = offlineDb.getCollection("Customers");
                    var customer = customerCollection.findOne({
                        custId: {
                            $gt: 0,
                        },
                    });
                    return customer;
                }),
                _defineProperty(
                    _localStorage,
                    "getCustomerByCustomerId",
                    function getCustomerByCustomerId(custId) {
                        var offlineDb = this.OfflineStorage;
                        var customersCollection = offlineDb.getCollection("Customers");
                        return customersCollection.findOne({
                            Id: {
                                $eq: custId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getCategory",
                    function getCategory(categoryId) {
                        var offlineDb = this.OfflineStorage;
                        var categoryCollection = offlineDb.getCollection("Category");
                        return categoryCollection.findOne({
                            Id: {
                                $eq: categoryId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllCategorys",
                    function getAllCategorys() {
                        var offlineDb = this.OfflineStorage;
                        var categoryCollection = offlineDb.getCollection("Category");
                        var catColl = categoryCollection.find({
                            Id: {
                                $ne: null,
                            },
                        });
                        return this._sortString(catColl);
                    }
                ),
                _defineProperty(_localStorage, "getStatus", function getStatus(statusId) {
                    var offlineDb = this.OfflineStorage;
                    var statusCollection = offlineDb.getCollection("Status");
                    return statusCollection.findOne({
                        Id: {
                            $eq: statusId,
                        },
                    });
                }),
                _defineProperty(_localStorage, "getAllStatuss", function getAllStatuss() {
                    var offlineDb = this.OfflineStorage;
                    var statusCollection = offlineDb.getCollection("Status");
                    var statusColl = statusCollection.find({
                        Id: {
                            $ne: null,
                        },
                    });
                    return this._sortString(statusColl);
                }),
                _defineProperty(
                    _localStorage,
                    "getDepartment",
                    function getDepartment(departmentId) {
                        var offlineDb = this.OfflineStorage;
                        var departmentCollection = offlineDb.getCollection("Department");
                        return departmentCollection.findOne({
                            Id: {
                                $eq: departmentId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllDepartments",
                    function getAllDepartments() {
                        var offlineDb = this.OfflineStorage;
                        var departmentCollection = offlineDb.getCollection("Department");
                        return departmentCollection
                            .find({
                                Id: {
                                    $ne: null,
                                },
                            })
                            .sort(function (a, b) {
                                if (a.level == b.level) return 0;
                                if (a.level > b.level) return 1;
                                if (a.level < b.level) return -1;
                            });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getProbability",
                    function getProbability(probabilityId) {
                        var offlineDb = this.OfflineStorage;
                        var probabilityCollection = offlineDb.getCollection("Probability");
                        return probabilityCollection.findOne({
                            Id: {
                                $eq: probabilityId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllProbabilitys",
                    function getAllProbabilitys() {
                        var offlineDb = this.OfflineStorage;
                        var probabilityCollection = offlineDb.getCollection("Probability");
                        var probColl = probabilityCollection.find({
                            Id: {
                                $ne: null,
                            },
                        });
                        return this._sortString(probColl);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getConsequence",
                    function getConsequence(consequenceId) {
                        var offlineDb = this.OfflineStorage;
                        var consequenceCollection = offlineDb.getCollection("Consequence");
                        return consequenceCollection.findOne({
                            Id: {
                                $eq: consequenceId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllConsequences",
                    function getAllConsequences() {
                        var offlineDb = this.OfflineStorage;
                        var consequenceCollection = offlineDb.getCollection("Consequence");
                        var consColl = consequenceCollection.find({
                            Id: {
                                $ne: null,
                            },
                        });
                        return this._sortString(consColl);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getPriority",
                    function getPriority(priorityId) {
                        var offlineDb = this.OfflineStorage;
                        var priorityCollection = offlineDb.getCollection("Priority");
                        return priorityCollection.findOne({
                            Id: {
                                $eq: priorityId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllPrioritys",
                    function getAllPrioritys() {
                        var offlineDb = this.OfflineStorage;
                        var priorityCollection = offlineDb.getCollection("Priority");
                        var priorityColl = priorityCollection.find({
                            Id: {
                                $ne: null,
                            },
                        });
                        return this._sortString(priorityColl);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getProblemArea",
                    function getProblemArea(problemAreaId) {
                        var offlineDb = this.OfflineStorage;
                        var problemAreaCollection = offlineDb.getCollection("ProblemArea");
                        return problemAreaCollection.findOne({
                            Id: {
                                $eq: problemAreaId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllProblemAreas",
                    function getAllProblemAreas() {
                        var offlineDb = this.OfflineStorage;
                        var problemAreaCollection = offlineDb.getCollection("ProblemArea");
                        var problemAreaColl = problemAreaCollection.find({
                            Id: {
                                $ne: null,
                            },
                        });
                        return this._sortString(problemAreaColl);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getLineOfBusiness",
                    function getLineOfBusiness(lineOfBusinessId) {
                        var offlineDb = this.OfflineStorage;
                        var lineOfBusinessCollection =
                            offlineDb.getCollection("LineOfBusiness");
                        return lineOfBusinessCollection.findOne({
                            Id: {
                                $eq: lineOfBusinessId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllLineOfBusinesss",
                    function getAllLineOfBusinesss() {
                        var offlineDb = this.OfflineStorage;
                        var lineOfBusinessCollection =
                            offlineDb.getCollection("LineOfBusiness");
                        var lobColl = lineOfBusinessCollection.find({
                            Id: {
                                $ne: null,
                            },
                        });
                        return this._sortString(lobColl);
                    }
                ),
                _defineProperty(_localStorage, "getPerson", function getPerson(personId) {
                    var offlineDb = this.OfflineStorage;
                    var personCollection = offlineDb.getCollection("Person");
                    return personCollection.findOne({
                        Id: {
                            $eq: personId,
                        },
                    });
                }),
                _defineProperty(
                    _localStorage,
                    "getAllPersonsIsResponsible",
                    function getAllPersonsIsResponsible() {
                        var offlineDb = this.OfflineStorage;
                        var personResponsibleCollection = offlineDb.getCollection("Person");
                        var personRespColl = personResponsibleCollection.find({
                            isResponsible: {
                                $eq: true,
                            },
                        });
                        return this._sortString(personRespColl);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllPersonsForPointOfView",
                    function getAllPersonsForPointOfView() {
                        var offlineDb = this.OfflineStorage;
                        var personCollection = offlineDb.getCollection("Person");
                        var personColl = personCollection.find({
                            isPointOfView: {
                                $eq: true,
                            },
                        });
                        return this._sortString(personColl);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllPersonsForAskade",
                    function getAllPersonsForAskade() {
                        var offlineDb = this.OfflineStorage;
                        var personCollection = offlineDb.getCollection("Person");
                        var personColl = personCollection.find({
                            isFile: {
                                $eq: true,
                            },
                        });
                        return this._sortString(personColl);
                    }
                ),
                _defineProperty(_localStorage, "getAllPersons", function getAllPersons() {
                    var offlineDb = this.OfflineStorage;
                    var personCollection = offlineDb.getCollection("Person");
                    var personColl = personCollection.find({
                        Id: {
                            $ne: null,
                        },
                    });
                    return this._sortString(personColl);
                }),
                _defineProperty(
                    _localStorage,
                    "getSafetyDepartment",
                    function getSafetyDepartment(safetyDepartmentId) {
                        var offlineDb = this.OfflineStorage;
                        var safetyDepartmentCollection =
                            offlineDb.getCollection("SafetyDepartment");
                        return safetyDepartmentCollection.findOne({
                            Id: {
                                $eq: safetyDepartmentId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllSafetyDepartments",
                    function getAllSafetyDepartments() {
                        var offlineDb = this.OfflineStorage;
                        var safetyDepartmentCollection =
                            offlineDb.getCollection("SafetyDepartment");
                        var safetyDeptColl = safetyDepartmentCollection.find({
                            Id: {
                                $ne: null,
                            },
                        });
                        return this._sortString(safetyDeptColl);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getProcess",
                    function getProcess(processId) {
                        var offlineDb = this.OfflineStorage;
                        var processCollection = offlineDb.getCollection("Process");
                        return processCollection.findOne({
                            Id: {
                                $eq: processId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllProcesss",
                    function getAllProcesss() {
                        var offlineDb = this.OfflineStorage;
                        var processCollection = offlineDb.getCollection("Process");
                        var processColl = processCollection.find({
                            Id: {
                                $ne: null,
                            },
                        });
                        return this._sortString(processColl);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getGeographyLocation",
                    function getGeographyLocation(GeographyLocationId) {
                        var offlineDb = this.OfflineStorage;
                        var GeographyLocationCollection =
                            offlineDb.getCollection("GeographyLocation");
                        return GeographyLocationCollection.findOne({
                            Id: {
                                $eq: GeographyLocationId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllGeographyLocations",
                    function getAllGeographyLocations() {
                        var offlineDb = this.OfflineStorage;
                        var geographyLocationCollection =
                            offlineDb.getCollection("GeographyLocation");

                        var geographyLocationsColl = geographyLocationCollection.find({
                            Id: {
                                $ne: null,
                            },
                        });
                        return this._sortString(geographyLocationsColl);
                    }
                ),
                _defineProperty(_localStorage, "getAsset", function getAsset(assetId) {
                    var offlineDb = this.OfflineStorage;
                    var assetCollection = offlineDb.getCollection("Asset");
                    return assetCollection.findOne({
                        Id: {
                            $eq: assetId,
                        },
                    });
                }),
                _defineProperty(
                    _localStorage,
                    "getChemical",
                    function getChemical(chemicalId) {
                        var offlineDb = this.OfflineStorage;
                        var chemicalCollection = offlineDb.getCollection("Chemical");
                        return chemicalCollection.findOne({
                            Id: {
                                $eq: chemicalId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getActivityModule",
                    function getActivityModule(activityModuleId) {
                        var offlineDb = this.OfflineStorage;
                        var actModuleCollection = offlineDb.getCollection("ActivityModule");
                        return actModuleCollection.findOne({
                            Id: {
                                $eq: activityModuleId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getActivity",
                    function getActivity(activityId) {
                        var offlineDb = this.OfflineStorage;
                        var actCollection = offlineDb.getCollection("Activity");
                        return actCollection.findOne({
                            Id: {
                                $eq: activityId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "_sortString",
                    function _sortString(arrayList) {
                        return arrayList.sort(function (a, b) {
                            if (a.$loki == b.$loki) return 0;
                            if (a.$loki > b.$loki) return 1;
                            if (a.$loki < b.$loki) return -1;
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "_sortList",
                    function _sortString(arrayList) {
                        //Need to remove this full block and handle it inside the SortString function
                        return arrayList.sort(function (a, b) {
                            if (a.sortOrder == b.sortOrder) return 0;
                            if (a.sortOrder > b.sortOrder) return 1;
                            if (a.sortOrder < b.sortOrder) return -1;
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "_descendingSort",
                    function _descendingSort(arrayList) {
                        return arrayList.sort(function (a, b) {
                            return b.$loki - a.$loki;
                        });
                    }
                ),
                _defineProperty(_localStorage, "getAllAssets", function getAllAssets() {
                    var offlineDb = this.OfflineStorage;
                    var assetCollection = offlineDb.getCollection("Asset");
                    var assetColl = assetCollection.find({
                        Id: {
                            $ne: null,
                        },
                    });

                    var sortedList = this._sortString(assetColl);

                    return sortedList;
                }),
                _defineProperty(
                    _localStorage,
                    "getAllChemicals",
                    function getAllChemicals() {
                        var offlineDb = this.OfflineStorage;
                        var chemicalCollection = offlineDb.getCollection("Chemical");
                        var chemicalColl = chemicalCollection.find({
                            Id: {
                                $ne: null,
                            },
                        });
                        var sortedList = this._sortString(chemicalColl);
                        return sortedList;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllActivities",
                    function getAllActivities() {
                        var offlineDb = this.OfflineStorage;
                        var actCollection = offlineDb.getCollection("Activity");
                        var actColl = actCollection.find({
                            Id: {
                                $ne: null,
                            },
                        });

                        var sortedList = this._sortString(actColl);

                        return sortedList;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllActivityModules",
                    function getAllActivityModules() {
                        var offlineDb = this.OfflineStorage;
                        var actModulesCollection = offlineDb.getCollection("ActivityModule");
                        var actModulesColl = actModulesCollection.find({
                            Id: {
                                $ne: null,
                            },
                        });

                        var sortedList = this._sortString(actModulesColl);

                        return sortedList;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getEasyClassification",
                    function getEasyClassification(ecId) {
                        var offlineDb = this.OfflineStorage;
                        var ecCollection = offlineDb.getCollection("EasyClassification");
                        return ecCollection.findOne({
                            Id: {
                                $eq: ecId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getVehicleDamageData",
                    function getVehicleDamageData(ecId) {
                        var offlineDb = this.OfflineStorage;
                        var ecCollection = offlineDb.getCollection("VehicleDamage");
                        return ecCollection.findOne({
                            Id: {
                                $eq: ecId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllEasyClassificationByDataTypeId",
                    function getAllEasyClassificationByDataTypeId(dataTypeId) {
                        var offlineDb = this.OfflineStorage;
                        var ecCollection = offlineDb.getCollection("EasyClassification");
                        var ecColl = ecCollection.find({
                            dataTypeId: {
                                $eq: dataTypeId,
                            },
                        });

                        var sortedList = this._sortString(ecColl);

                        return sortedList;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllVehiclePartByDataTypeId",
                    function getAllVehiclePartByDataTypeId(dataTypeId) {
                        var offlineDb = this.OfflineStorage;
                        var ecCollection = offlineDb.getCollection("VehicleDamage");
                        var ecColl = ecCollection.find({
                            dataTypeId: {
                                $eq: dataTypeId,
                            },
                        });

                        var sortedList = this._sortString(ecColl);

                        return sortedList;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllEasyClassifications",
                    function getAllEasyClassifications() {
                        var offlineDb = this.OfflineStorage;
                        var ecCollection = offlineDb.getCollection("EasyClassification");
                        var ecColl = ecCollection.find({
                            Id: {
                                $ne: null,
                            },
                        });

                        var sortedList = this._sortString(ecColl);

                        return sortedList;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllVehicleDamageData",
                    function getAllVehicleDamageData() {
                        var offlineDb = this.OfflineStorage;
                        var ecCollection = offlineDb.getCollection("VehicleDamage");
                        var ecColl = ecCollection.find({
                            Id: {
                                $ne: null,
                            },
                        });

                        var sortedList = this._sortString(ecColl);

                        return sortedList;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getListValue",
                    function getListValue(lvId) {
                        var offlineDb = this.OfflineStorage;
                        var lvCollection = offlineDb.getCollection("ListValue");
                        return lvCollection.findOne({
                            Id: {
                                $eq: lvId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllListValueByDataTypeId",
                    function getAllListValueByDataTypeId(dataTypeId) {
                        var offlineDb = this.OfflineStorage;
                        var lvCollection = offlineDb.getCollection("ListValue");
                        var lvColl = lvCollection.find({
                            dataTypeId: {
                                $eq: dataTypeId,
                            },
                        });

                        var sortedList = this._sortList(lvColl);

                        return sortedList;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllListValues",
                    function getAllListValues() {
                        var offlineDb = this.OfflineStorage;
                        var lvCollection = offlineDb.getCollection("ListValue");
                        var lvColl = lvCollection.find({
                            Id: {
                                $ne: null,
                            },
                        });

                        var sortedList = this._sortString(lvColl);

                        return sortedList;
                    }
                ),
                _defineProperty(_localStorage, "getCity", function getCity(cityId) {
                    var offlineDb = this.OfflineStorage;
                    var cityCollection = offlineDb.getCollection("City");
                    return cityCollection.findOne({
                        Id: {
                            $eq: cityId,
                        },
                    });
                }),
                _defineProperty(_localStorage, "getAllCities", function getAllCities() {
                    var offlineDb = this.OfflineStorage;
                    var cityCollection = offlineDb.getCollection("City");
                    var cityColl = cityCollection.find({
                        Id: {
                            $ne: null,
                        },
                    });

                    var sortedList = this._sortString(cityColl);

                    return sortedList;
                }),
                _defineProperty(
                    _localStorage,
                    "getCountry",
                    function getCountry(countryId) {
                        var offlineDb = this.OfflineStorage;
                        var countryCollection = offlineDb.getCollection("Country");
                        return countryCollection.findOne({
                            Id: {
                                $eq: countryId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllCountries",
                    function getAllCountries() {
                        var offlineDb = this.OfflineStorage;
                        var countryCollection = offlineDb.getCollection("Country");
                        var countryColl = countryCollection.find({
                            Id: {
                                $ne: null,
                            },
                        });

                        var sortedList = this._sortString(countryColl);

                        return sortedList;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getOwnerLevel",
                    function getOwnerLevel(ownerId) {
                        var offlineDb = this.OfflineStorage;
                        var ownerCollection = offlineDb.getCollection("Owner");
                        return ownerCollection.findOne({
                            Id: {
                                $eq: ownerId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getPersonListForUser",
                    function getPersonListForUser(userId) {
                        var offlineDb = this.OfflineStorage;
                        var userPersonsCollection = offlineDb.getCollection("UserPersons");
                        var userPersonDetails = userPersonsCollection.findOne({
                            userId: {
                                $eq: userId,
                            },
                        });
                        var persons = userPersonDetails.personIds;
                        var personIds = persons.split("|");
                        var personCollection = offlineDb.getCollection("Person");
                        var userPersonList = personCollection.find({
                            Id: {
                                $in: personIds,
                            },
                        });
                        return this._sortString(userPersonList);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllOwnersForUser",
                    function getAllOwnersForUser(userId) {
                        var offlineDb = this.OfflineStorage;

                        var userPersonList = this._getPersonForUser(userId);

                        var personCollection = offlineDb.getCollection("Person");
                        var ownerColl = personCollection.find({
                            isOwner: {
                                $eq: true,
                            },
                        });
                        return this._sortString(ownerColl);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getControlLevel",
                    function getControlLevel(controlLevelId) {
                        var offlineDb = this.OfflineStorage;
                        var controlLevelCollection = offlineDb.getCollection("ControlLevel");
                        return controlLevelCollection.findOne({
                            Id: {
                                $eq: controlLevelId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllControlLevels",
                    function getAllControlLevels() {
                        var offlineDb = this.OfflineStorage;
                        var controlLevelCollection = offlineDb.getCollection("ControlLevel");
                        var controllevelColl = controlLevelCollection.find({
                            Id: {
                                $ne: null,
                            },
                        });
                        return this._sortString(controllevelColl);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getCustomerFieldValue1",
                    function getCustomerFieldValue1(customerFieldValue1Id) {
                        var offlineDb = this.OfflineStorage;
                        var customerFieldValue1Collection = offlineDb.getCollection(
                            "CustomerFieldValue1"
                        );
                        return customerFieldValue1Collection.findOne({
                            Id: {
                                $eq: customerFieldValue1Id,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllCustomerFieldValue1s",
                    function getAllCustomerFieldValue1s() {
                        var offlineDb = this.OfflineStorage;
                        var customerFieldValue1Collection = offlineDb.getCollection(
                            "CustomerFieldValue1"
                        );
                        var custFields1Coll = customerFieldValue1Collection.find({
                            Id: {
                                $ne: null,
                            },
                        });
                        return this._sortString(custFields1Coll);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getCustomerFieldValue2",
                    function getCustomerFieldValue2(customerFieldValue2Id) {
                        var offlineDb = this.OfflineStorage;
                        var customerFieldValue2Collection = offlineDb.getCollection(
                            "CustomerFieldValue2"
                        );
                        return customerFieldValue2Collection.findOne({
                            Id: {
                                $eq: customerFieldValue2Id,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllCustomerFieldValue2s",
                    function getAllCustomerFieldValue2s() {
                        var offlineDb = this.OfflineStorage;
                        var customerFieldValue2Collection = offlineDb.getCollection(
                            "CustomerFieldValue2"
                        );
                        var custFields2Coll = customerFieldValue2Collection.find({
                            Id: {
                                $ne: null,
                            },
                        });
                        return this._sortString(custFields2Coll);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getCustomerFieldValue3",
                    function getCustomerFieldValue3(customerFieldValue3Id) {
                        var offlineDb = this.OfflineStorage;
                        var customerFieldValue3Collection = offlineDb.getCollection(
                            "CustomerFieldValue3"
                        );
                        return customerFieldValue3Collection.findOne({
                            Id: {
                                $eq: customerFieldValue3Id,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllCustomerFieldValue3s",
                    function getAllCustomerFieldValue3s() {
                        var offlineDb = this.OfflineStorage;
                        var customerFieldValue3Collection = offlineDb.getCollection(
                            "CustomerFieldValue3"
                        );
                        var custFields3Coll = customerFieldValue3Collection.find({
                            Id: {
                                $ne: null,
                            },
                        });
                        return this._sortString(custFields3Coll);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getCustomerListValue1",
                    function getCustomerListValue1(customerListValue1Id) {
                        var offlineDb = this.OfflineStorage;
                        var customerListValue1Collection =
                            offlineDb.getCollection("CustomerListValue1");
                        return customerListValue1Collection.findOne({
                            Id: {
                                $eq: customerListValue1Id,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllCustomerListValue1s",
                    function getAllCustomerListValue1s() {
                        var offlineDb = this.OfflineStorage;
                        var customerListValue1Collection =
                            offlineDb.getCollection("CustomerListValue1");
                        var custListValue1Coll = customerListValue1Collection.find({
                            Id: {
                                $ne: null,
                            },
                        });
                        return this._sortString(custListValue1Coll);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getCustomerListValue2",
                    function getCustomerListValue2(customerListValue2Id) {
                        var offlineDb = this.OfflineStorage;
                        var customerListValue2Collection =
                            offlineDb.getCollection("CustomerListValue2");
                        return customerListValue2Collection.findOne({
                            Id: {
                                $eq: customerListValue2Id,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllCustomerListValue2s",
                    function getAllCustomerListValue2s() {
                        var offlineDb = this.OfflineStorage;
                        var customerListValue2Collection =
                            offlineDb.getCollection("CustomerListValue2");
                        var custListValue2Coll = customerListValue2Collection.find({
                            Id: {
                                $ne: null,
                            },
                        });
                        return this._sortString(custListValue2Coll);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getCustomerListValue3",
                    function getCustomerListValue3(customerListValue3Id) {
                        var offlineDb = this.OfflineStorage;
                        var customerListValue3Collection =
                            offlineDb.getCollection("CustomerListValue3");
                        return customerListValue3Collection.findOne({
                            Id: {
                                $eq: customerListValue3Id,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllCustomerListValue3s",
                    function getAllCustomerListValue3s() {
                        var offlineDb = this.OfflineStorage;
                        var customerListValue3Collection =
                            offlineDb.getCollection("CustomerListValue3");
                        var custListValue3Coll = customerListValue3Collection.find({
                            Id: {
                                $ne: null,
                            },
                        });
                        return this._sortString(custListValue3Coll);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getManager",
                    function getManager(managerId) {
                        var offlineDb = this.OfflineStorage;
                        var managerColl = offlineDb.getCollection("Manager");
                        return managerColl.findOne({
                            Id: {
                                $eq: managerId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllManager2Questionnaire",
                    function getAllManager2Questionnaire(userId, qId) {
                        var offlineDb = this.OfflineStorage;
                        var manager2QueEvalForColl = offlineDb.getCollection(
                            "Manager2Questionnaire"
                        );
                        return manager2QueEvalForColl.findOne({
                            $and: [
                                {
                                    userId: {
                                        $eq: userId,
                                    },
                                },
                                {
                                    qId: {
                                        $eq: qId,
                                    },
                                },
                            ],
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getActionPlanWizardAttachments",
                    function getActionPlanWizardAttachments(personApwEntityId) {
                        var offlineDb = this.OfflineStorage;
                        var personApwAttColl = offlineDb.getCollection(
                            "PersonActionPlanWizardAttachment"
                        );
                        var attachList = personApwAttColl.find({
                            newActionPlanEntityId: {
                                $eq: personApwEntityId,
                            },
                        });

                        var apwSortedAttachList = this._sortString(attachList);

                        return apwSortedAttachList;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "saveCustomer",
                    function saveCustomer(customerEntity) {
                        var offlineDb = this.OfflineStorage;
                        var custId = customerEntity.CustomerID;
                        var customersColl = offlineDb.getCollection("Customers");
                        var customer = customersColl.findOne({
                            custId: {
                                $eq: custId,
                            },
                        });
                        customer.isDarkModeEnable = customerEntity.IsDarkModeEnable;
                        customer.isAutoSyncEnabled = customerEntity.IsAutoSyncEnabled;
                        customer.isReadAloudTextEnable = customerEntity.IsReadAloudTextEnable;
                        customer.isTileDisplayEnable = customerEntity.IsTileDisplayEnable;
                        customer.nextUpdate = customerEntity.NextUpdate;
                        customer.disableReadImageFromPhotoLibary =
                            customerEntity.DisableReadImageFromPhotoLibary;
                        customer.enableHighAccuracyForGeoLocation =
                            customerEntity.EnableHighAccuracyForGeoLocation;
                        customer.enableNextAutoUpdate = customerEntity.EnableNextAutoUpdate;
                        customer.displayFavorites = customerEntity.DisplayFavorites;
                        customer.enableNews = customerEntity.EnableNews;
                        customer.disableFavoritesGuide =
                            customerEntity.DisableFavoritesGuideDisplay;
                        customer.autoUploadDelayInMinutes =
                            customerEntity.AutoUploadDelayInMinutes;
                        customersColl.update(customer);
                        offlineDb.saveDatabase(function () {
                            //Stuff to do after the save to local storage.
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "saveImageQualityToCustomer",
                    function saveImageQualityToCustomer(customerEntity) {
                        var offlineDb = this.OfflineStorage;
                        var custId = customerEntity.CustomerID;
                        var custColl = offlineDb.getCollection("Customers");
                        var customer = custColl.findOne({
                            custId: {
                                $eq: custId,
                            },
                        });
                        customer.cameraImageQuality = customerEntity.CameraImageQuality;
                        custColl.update(customer);
                        offlineDb.saveDatabase(function () {
                            //Stuff to do after the save to local storage.
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "saveImageToGallerySettingInCustomer",
                    function saveImageToGallerySettingInCustomer(customerEntity) {
                        var offlineDb = this.OfflineStorage;
                        var custId = customerEntity.CustomerID;
                        var custColl = offlineDb.getCollection("Customers");
                        var customer = custColl.findOne({
                            custId: {
                                $eq: custId,
                            },
                        });
                        customer.saveImageToGallery = customerEntity.SaveImageToGallery;
                        custColl.update(customer);
                        offlineDb.saveDatabase(function () {
                            //Stuff to do after the save to local storage.
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "saveReadAloudSpeed",
                    function saveReadAloudSpeed(customerEntity) {
                        var offlineDb = this.OfflineStorage;
                        var custId = customerEntity.CustomerID;
                        var custColl = offlineDb.getCollection("Customers");
                        var customer = custColl.findOne({
                            custId: {
                                $eq: custId,
                            },
                        });
                        customer.readAloudSpeed = customerEntity.ReadAloudSpeed;
                        custColl.update(customer);
                        offlineDb.saveDatabase(function () {
                            //Stuff to do after the save to local storage.
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addLanguageDetails",
                    function addLanguageDetails(langCode) {
                        var offlineDb = this.OfflineStorage;
                        privateMethods.addPreferredLanguage(langCode);
                        offlineDb.saveDatabase(function () {
                            //Stuff to do after the save to local storage.
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addResourceLanguageDetails",
                    function addResourceLanguageDetails(defaultResource) {
                        // This method is called only during fresh install of the app
                        // for default resource to be inserted or during the update of app
                        // if new default labels are there
                        var offlineDb = this.OfflineStorage;

                        if (defaultResource === null) {
                            defaultResource = getDefaultLabels();
                        }

                        for (var i = 0; i < defaultResource.length; i++) {
                            for (var j = 0; j < defaultResource[i].resources.length; j++) {
                                privateMethods.addResourceLabels(
                                    defaultResource[i].resources[j],
                                    true
                                );
                            }
                        }

                        offlineDb.saveDatabase(function () {
                            //Stuff to do after the save to local storage.
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addResourceData",
                    function addResourceData(resourceData) {
                        // To save Resource related information
                        if (resourceData.Resources !== null) {
                            for (var i = 0; i < resourceData.Resources.length; i++) {
                                var resource = resourceData.Resources[i];
                                privateMethods.addResourceLabels(resource, false);
                            }
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addIconsData",
                    function addIconsData(iconsData) {
                        // To save Icons related information
                        if (iconsData.Icons !== null) {
                            for (var i = 0; i < iconsData.Icons.length; i++) {
                                var icon = iconsData.Icons[i];
                                privateMethods.addIcons(icon);
                            }
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addCustomerData",
                    function addCustomerData(
                        suiteData,
                        custName,
                        onlineVal,
                        isCustomUrlEnabled
                    ) {
                        privateMethods.addCustomer(
                            suiteData,
                            custName,
                            onlineVal,
                            isCustomUrlEnabled
                        );
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "saveUserPreferredLanguage",
                    function saveUserPreferredLanguage(cultureName) {
                        var offlineDb = this.OfflineStorage;
                        var loggedInUserList = this.getUserNameByLoggedInTimeStamp();
                        var loggedInUser = loggedInUserList[0];
                        var userDataCollection = offlineDb.getCollection("UserDetails");
                        var updateUserDetails = userDataCollection.findOne({
                            userName: {
                                $eq: loggedInUser.userName,
                            },
                        });
                        updateUserDetails.userPreferredLanguage = cultureName;
                        userDataCollection.update(updateUserDetails);
                        offlineDb.saveDatabase(function () {
                            //Stuff to do after the save to local storage.
                        });
                        return updateUserDetails.userPreferredLanguage;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "updateUserDetails",
                    function updateUserDetails(userDetailsData, userName) {
                        var offlineDb = this.OfflineStorage;
                        var userDataCollection = offlineDb.getCollection("UserDetails");
                        var updateUserDetails = userDataCollection.findOne({
                            userName: {
                                $eq: userName,
                            },
                        });

                        if (updateUserDetails != null) {
                            updateUserDetails.userId = userDetailsData.UserId;
                            updateUserDetails.firstName = userDetailsData.FirstName;
                            updateUserDetails.lastName = userDetailsData.LastName;
                            updateUserDetails.email = userDetailsData.Email;
                            updateUserDetails.personId = userDetailsData.PersonId;
                            updateUserDetails.primaryDepartmentId =
                                userDetailsData.PrimaryDepartmentId;
                            updateUserDetails.employeeNumber = userDetailsData.EmployeeNumber;
                            updateUserDetails.completeName = userDetailsData.CompleteName;
                            updateUserDetails.isDepartmentManager =
                                userDetailsData.IsDepartmentManager;
                            updateUserDetails.primaryDepartmentName =
                                userDetailsData.PrimaryDepartmentName;
                            updateUserDetails.managerId = userDetailsData.ManagerId;
                            updateUserDetails.managerCompleteName =
                                userDetailsData.ManagerCompleteName;
                            updateUserDetails.userPreferredLanguage =
                                userDetailsData.UserPreferredLanguage;
                            updateUserDetails.enableOnlineDepartments =
                                userDetailsData.EnableOnlineDepartments;
                            updateUserDetails.enableOnlinePersons =
                                userDetailsData.EnableOnlinePersons;
                            updateUserDetails.enableOnlineAssets =
                                userDetailsData.EnableOnlineAssets;
                            updateUserDetails.enableOnlineChemicals =
                                userDetailsData.EnableOnlineChemicals;

                            if (userDetailsData.IsDemoUser) {
                                updateUserDetails.isDemoUser = userDetailsData.IsDemoUser;
                            } else {
                                // Assigning a default value for a scenario where this setting is not present in the Web api version
                                // TODO: Can be removed after 1.1.3
                                updateUserDetails.isDemoUser = false;
                            }

                            userDataCollection.update(updateUserDetails);

                            this.addDepartmentDetailsData(userDetailsData); //Call method to save Applications

                            this.addUserApplicationDetails(userDetailsData); // Add persons related information

                            this.addPersonsDetails(userDetailsData); // Add Asset data to asset table using generic table

                            this.addAssetDetails(userDetailsData.Assets);

                            this.addChemicalDetails(userDetailsData.Chemicals);

                            this.updateCustomerData(userDetailsData.Customer);
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addUserApplicationDetails",
                    function addUserApplicationDetails(userAppData) {
                        //Call method to save Applications
                        var userId = userAppData.UserId; // Fetching existing user applications

                        var existingUserApp = this.getUserApplicationsByUserId(userId); // Comapre existing and new application list for any difference

                        var compareData = existingUserApp.filter(
                            this.compareUserApplicationsList(userAppData.Applications)
                        ); // If any application is missing from the existing arry, set the property to true

                        for (var cd = 0; cd < compareData.length; cd++) {
                            var userAppDeleted = compareData[cd];
                            userAppDeleted.isApplicationModuleDisable = true;
                        }

                        for (var i = 0; i < userAppData.Applications.length; i++) {
                            var uApp = userAppData.Applications[i];
                            privateMethods.addUserApplication(uApp, userId);
                        }

                        this.saveOfflineDb();
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "compareUserApplicationsList",
                    function compareUserApplicationsList(userApplicationList) {
                        return function (current) {
                            return (
                                userApplicationList.filter(function (other) {
                                    return other.Id === current.applicationId;
                                }).length === 0
                            );
                        };
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "insertApplicationDetails",
                    function insertApplicationDetails(suiteData) {
                        // To save Application related information
                        var userAppId = suiteData.UserId;

                        for (var i = 0; i < suiteData.Applications.length; i++) {
                            var uApp = suiteData.Applications[i];
                            privateMethods.addApplicationDetails(uApp);
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addDepartmentDetailsData",
                    function addDepartmentDetailsData(userDeptData) {
                        var userId = userDeptData.UserId;

                        if (angular.isDefined(userDeptData.Departments)) {
                            //Call method to save Deparments
                            var userDepartments = [];
                            userDepartments = privateMethods.addDepartmentDetails(
                                userDeptData.Departments
                            );

                            if (userDeptData.Departments.length > 0) {
                                privateMethods.addUserDepartments(userDepartments, userId);
                            }
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addDepartmentData",
                    function addDepartmentData(userDeptData) {
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var userId = loggedInUser[0].userId;

                        if (angular.isDefined(userDeptData)) {
                            //Call method to save Deparments
                            var userDepartments = [];
                            userDepartments = privateMethods.addDepartmentDetails(userDeptData);

                            if (userDeptData.length > 0) {
                                privateMethods.addUserDepartments(userDepartments, userId);
                            }
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addPersonsDetails",
                    function addPersonsDetails(userDeptData) {
                        var userId = userDeptData.UserId;

                        if (angular.isDefined(userDeptData.Persons)) {
                            var userPersons = [];
                            userPersons = privateMethods.addPerson(userDeptData.Persons);

                            if (userPersons.length > 0) {
                                privateMethods.addUserPersons(userPersons, userId);
                            }
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addChemicalDetails",
                    function addChemicalDetails(chemicalListData) {
                        var offlineDb = localStorage.OfflineStorage;
                        var chemicalTableCollection = offlineDb.getCollection("Chemical");

                        if (chemicalListData != null) {
                            var insertList = [];
                            var updateList = [];

                            for (var i = 0; i < chemicalListData.length; i++) {
                                var chemicalData = chemicalListData[i];
                                var chemicalDataExists = chemicalTableCollection.findOne({
                                    Id: {
                                        $eq: chemicalData.Id,
                                    },
                                });

                                if (chemicalDataExists == null) {
                                    insertList.push({
                                        Id: chemicalData.Id,
                                        text: chemicalData.Text,
                                        filter: chemicalData.Filter,
                                    });
                                } else {
                                    chemicalDataExists.Id = chemicalData.Id;
                                    chemicalDataExists.text = chemicalData.Text;
                                    chemicalDataExists.filter = chemicalData.Filter;
                                    updateList.push(chemicalDataExists);
                                }
                            }

                            chemicalTableCollection.insert(insertList);
                            chemicalTableCollection.update(updateList);
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addAssetDetails",
                    function addAssetDetails(assetListData) {
                        var offlineDb = localStorage.OfflineStorage;
                        var assetTableCollection = offlineDb.getCollection("Asset");

                        if (assetListData != null && assetListData.length > 0) {
                            var insertList = [];
                            var updateList = [];

                            for (var i = 0; i < assetListData.length; i++) {
                                var assetData = assetListData[i];
                                var assetDataExists = assetTableCollection.findOne({
                                    Id: {
                                        $eq: assetData.Id,
                                    },
                                });

                                if (assetDataExists == null) {
                                    insertList.push({
                                        Id: assetData.Id,
                                        text: assetData.Text,
                                        filter: assetData.Filter,
                                    });
                                } else {
                                    assetDataExists.Id = assetData.Id;
                                    assetDataExists.text = assetData.Text;
                                    assetDataExists.filter = assetData.Filter;
                                    updateList.push(assetDataExists);
                                }
                            }

                            var dataList = assetTableCollection.data;
                            var removableData = [];
                            for (var j = 0; j < dataList.length; j++) {
                                if (!updateList.includes(dataList[j])) {
                                    removableData.push(dataList[j]);
                                    break;
                                }
                            }

                            if (removableData.length > 0) {
                                removableData.forEach(function (ColData) {
                                    assetTableCollection.remove(ColData);
                                });
                            }

                            assetTableCollection.insert(insertList);
                            assetTableCollection.update(updateList);
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addPersonData",
                    function addPersonData(personData) {
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var userId = loggedInUser[0].userId;

                        if (angular.isDefined(personData)) {
                            var userPersons = privateMethods.addPerson(personData);

                            if (userPersons.length > 0) {
                                privateMethods.addUserPersons(userPersons, userId);
                            }
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addAssetData",
                    function addAssetData(tableName, assetData) {
                        // Note: tableName parameter is not required for saving asset data. But this is sent from a generic method which saves data of other drop down data
                        this.addAssetDetails(assetData);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addChemicalData",
                    function addChemicalData(tableName, chemicalData) {
                        // Note: tableName parameter is not required for saving chemical data. But this is sent from a generic method which saves data of other drop down data
                        this.addChemicalDetails(chemicalData);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getPreferredLanguage",
                    function getPreferredLanguage() {
                        var offlineDb = this.OfflineStorage;
                        var preferredLanguageCollection =
                            offlineDb.getCollection("PreferredLanguage");
                        return preferredLanguageCollection.find({
                            langCode: {
                                $ne: "",
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllResourceLabels",
                    function getAllResourceLabels() {
                        var offlineDb = this.OfflineStorage;
                        var defaultResourceCollection =
                            offlineDb.getCollection("ResourceLabels");
                        var res = defaultResourceCollection.find({
                            resourceId: {
                                $eq: null,
                            },
                        });
                        return res;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getResourceLabelById",
                    function getResourceLabelById(id) {
                        var offlineDb = this.OfflineStorage;
                        var defaultResourceCollection =
                            offlineDb.getCollection("ResourceLabels");
                        var res = defaultResourceCollection.findOne({
                            resourceId: {
                                $eq: id,
                            },
                        });
                        return res;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addDefaultIcons",
                    function addDefaultIcons(iconData) {
                        var offlineDb = this.OfflineStorage;

                        if (iconData !== null) {
                            privateMethods.addIcons(iconData);
                        } else {
                            var defaultIcon = defaultIcons();

                            for (var i = 0; i < defaultIcon.length; i++) {
                                privateMethods.addIcons(defaultIcon[i]);
                            }
                        }

                        offlineDb.saveDatabase(function () {
                            //Stuff to do after the save to local storage.
                        });
                    }
                ),
                _defineProperty(_localStorage, "getAllIcons", function getAllIcons(id) {
                    var offlineDb = this.OfflineStorage;
                    var iconCollection = offlineDb.getCollection("Icons");
                    var iconVal = iconCollection.findOne({
                        iconId: {
                            $ne: null,
                        },
                    });
                    return iconVal;
                }),
                _defineProperty(_localStorage, "getIconById", function getIconById(id) {
                    var offlineDb = this.OfflineStorage;
                    var iconCollection = offlineDb.getCollection("Icons");
                    var iconVal = iconCollection.findOne({
                        iconId: {
                            $eq: id,
                        },
                    });
                    return iconVal;
                }),
                _defineProperty(
                    _localStorage,
                    "removeDataFromCollection",
                    function removeDataFromCollection(tableName) {
                        var offlineDb = this.OfflineStorage;
                        var collection = offlineDb.getCollection(tableName);
                        collection.removeDataOnly();
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "excludeTableForClear",
                    function excludeTableForClear(tableName, excludeTable) {
                        if (excludeTable.indexOf(tableName) > -1) {
                            return;
                        } else {
                            this.removeDataFromCollection(tableName);
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "removeLocalStorageData",
                    function removeLocalStorageData(excludeTable) {
                        var offlineDb = this.OfflineStorage;
                        var allCollections = offlineDb.listCollections();

                        for (var i = 0; i < allCollections.length; i++) {
                            var collection = allCollections[i];
                            this.excludeTableForClear(collection.name, excludeTable);
                        }

                        return this.saveOfflineDb();
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getApplications",
                    function getApplications() {
                        var offlineDb = this.OfflineStorage;
                        var appColl = offlineDb.getCollection("Application");
                        var userDetailsColl = appColl.find({
                            Id: {
                                $gt: 0,
                            },
                        });
                        return userDetailsColl.sort(function (a, b) {
                            if (a.sortOrder == b.sortOrder) return 0;
                            if (a.sortOrder > b.sortOrder) return 1;
                            if (a.sortOrder < b.sortOrder) return -1;
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getApplication",
                    function getApplication(appId) {
                        var offlineDb = this.OfflineStorage;
                        var appColl = offlineDb.getCollection("Application");
                        return appColl.findOne({
                            Id: {
                                $eq: appId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getApplicationIdByText",
                    function getApplicationIdByText(appText) {
                        var offlineDb = this.OfflineStorage;
                        var appColl = offlineDb.getCollection("Application");
                        var app = appColl.findOne({
                            text: {
                                $eq: appText,
                            },
                        });
                        return app.Id;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getTriggerQuestionsForDependentQuestion",
                    function getTriggerQuestionsForDependentQuestion(dependentQuestionId) {
                        var offlineDb = localStorage.OfflineStorage;
                        var questionTriggerColl = offlineDb.getCollection("QuestionTrigger");
                        return questionTriggerColl.find({
                            questionId: {
                                $eq: dependentQuestionId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getDependentQuestionsForTriggerQuestion",
                    function getDependentQuestionsForTriggerQuestion(triggerQuestionId) {
                        var offlineDb = localStorage.OfflineStorage;
                        var questionTriggerColl = offlineDb.getCollection("QuestionTrigger");
                        return questionTriggerColl.find({
                            triggerQuestionId: {
                                $eq: triggerQuestionId,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getIfDependentQuestion",
                    function getIfDependentQuestion(questionId) {
                        var offlineDb = localStorage.OfflineStorage;
                        var questionTriggerColl = offlineDb.getCollection("QuestionTrigger");
                        var qt = questionTriggerColl.findOne({
                            questionId: {
                                $eq: questionId,
                            },
                        });
                        return qt != null;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getIfTriggerQuestion",
                    function getIfTriggerQuestion(triggerQuestionId) {
                        var offlineDb = localStorage.OfflineStorage;
                        var questionTriggerColl = offlineDb.getCollection("QuestionTrigger");
                        var qt = questionTriggerColl.findOne({
                            triggerQuestionId: {
                                $eq: triggerQuestionId,
                            },
                        });
                        return qt != null;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "checkIfTriggerStepColumn",
                    function checkIfTriggerStepColumn(
                        askadeWizStepId,
                        askadeWizStepFileColumnId
                    ) {
                        var offlineDb = localStorage.OfflineStorage;
                        var askadeFileTypeWizardStepColumnColl = offlineDb.getCollection(
                            "AskadeFileTypeWizardStepColumn"
                        );
                        var evaluatingForRaw = askadeFileTypeWizardStepColumnColl.find({
                            $and: [
                                {
                                    dependantFileColumnId: {
                                        $eq: askadeWizStepFileColumnId,
                                    },
                                },
                                {
                                    "fileTypeWizardStepId: ": {
                                        $eq: askadeWizStepId,
                                    },
                                },
                            ],
                        });
                        return evaluatingForRaw.length > 0;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "checkIfDependentStepColumn",
                    function checkIfDependentStepColumn(
                        askadeWizStepId,
                        askadeWizStepFileColumnId
                    ) {
                        var offlineDb = localStorage.OfflineStorage;
                        var askadeFileTypeWizardStepColumnColl = offlineDb.getCollection(
                            "AskadeFileTypeWizardStepColumn"
                        );
                        var evaluatingForRaw = askadeFileTypeWizardStepColumnColl.findOne({
                            $and: [
                                {
                                    Id: {
                                        $eq: askadeWizStepFileColumnId,
                                    },
                                },
                                {
                                    fileTypeWizardStepId: {
                                        $eq: askadeWizStepId,
                                    },
                                },
                            ],
                        });
                        return evaluatingForRaw.dependantFileColumnId != null;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getEvaluatingForListForQuestionniarePov",
                    function getEvaluatingForListForQuestionniarePov(qId, userId, pov) {
                        var offlineDb = localStorage.OfflineStorage;
                        var evaluatingForPovCollection =
                            offlineDb.getCollection("EvaluatingForPov");
                        var evaluatingForRaw = evaluatingForPovCollection.find({
                            $and: [
                                {
                                    qId: {
                                        $eq: qId,
                                    },
                                },
                                {
                                    userId: {
                                        $eq: userId,
                                    },
                                },
                                {
                                    povName: {
                                        $eq: pov,
                                    },
                                },
                            ],
                        });
                        return evaluatingForRaw;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getQuestionGroupList",
                    function getQuestionGroupList(questionnaireId) {
                        var offlineDb = localStorage.OfflineStorage;
                        var groupCollection = offlineDb.getCollection("QuestionGroup");
                        var groups = groupCollection.find({
                            questionnaireId: questionnaireId,
                        });
                        return groups;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getQuestionIdForDelete",
                    function getQuestionIdForDelete(questionIds, questionGroupId) {
                        var offlineDb = localStorage.OfflineStorage;
                        var questionCollection = offlineDb.getCollection("Question");
                        var deleteQuestionIds = questionCollection.find({
                            $and: [
                                {
                                    Id: {
                                        $nin: questionIds,
                                    },
                                },
                                {
                                    questionGroupId: {
                                        $eq: questionGroupId,
                                    },
                                },
                            ],
                        });
                        return deleteQuestionIds;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getQuestionGroupIdForDelete",
                    function getQuestionGroupIdForDelete(
                        questionGroupIds,
                        questionnaireId
                    ) {
                        var offlineDb = localStorage.OfflineStorage;
                        var questionGroupColl = offlineDb.getCollection("QuestionGroup");
                        var deleteQuestionGroupIds = questionGroupColl.find({
                            $and: [
                                {
                                    Id: {
                                        $nin: questionGroupIds,
                                    },
                                },
                                {
                                    questionnaireId: {
                                        $eq: questionnaireId,
                                    },
                                },
                            ],
                        });
                        return deleteQuestionGroupIds;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getPersonQuestionAnswersForDelete",
                    function getPersonQuestionAnswersForDelete(
                        pQuestionAnswerIds,
                        pQuestionnaireId
                    ) {
                        var offlineDb = localStorage.OfflineStorage;
                        var pQuestionAnswerColl = offlineDb.getCollection(
                            "PersonQuestionAnswerTemplate"
                        );
                        var deletePQustionAnswerIds = pQuestionAnswerColl.find({
                            $and: [
                                {
                                    questionId: {
                                        $nin: pQuestionAnswerIds,
                                    },
                                },
                                {
                                    personQuestionnaireId: {
                                        $eq: pQuestionnaireId,
                                    },
                                },
                            ],
                        });
                        return deletePQustionAnswerIds;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getQuestionnaireIdForDelete",
                    function getQuestionnaireIdForDelete(questionnaireIds, moduleName) {
                        var offlineDb = localStorage.OfflineStorage;
                        var questionnaireCollection =
                            offlineDb.getCollection("Questionnaire");

                        var typeCode = this._getTypeCodeForModule(moduleName);

                        var deleteQuestionnaireIds = questionnaireCollection.find({
                            $and: [
                                {
                                    Id: {
                                        $nin: questionnaireIds,
                                    },
                                },
                                {
                                    typeCode: {
                                        $eq: typeCode,
                                    },
                                },
                            ],
                        });
                        return deleteQuestionnaireIds;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getValuationQuestionIdForDelete",
                    function getValuationQuestionIdForDelete(
                        valuationQuestionIds,
                        questionnaireId
                    ) {
                        var offlineDb = localStorage.OfflineStorage;
                        var valQuestionCollection =
                            offlineDb.getCollection("ValuationQuestion");
                        var deleteValuationQueIds = valQuestionCollection.find({
                            $and: [
                                {
                                    Id: {
                                        $nin: valuationQuestionIds,
                                    },
                                },
                                {
                                    questionnaireId: {
                                        $eq: questionnaireId,
                                    },
                                },
                            ],
                        });
                        return deleteValuationQueIds;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getTriggerQuestionForDelete",
                    function getTriggerQuestionForDelete(questionId, triggerQuestionIds) {
                        var offlineDb = localStorage.OfflineStorage;
                        var questionTriggerColl = offlineDb.getCollection("QuestionTrigger");
                        var deleteTriggerIds = questionTriggerColl.find({
                            $and: [
                                {
                                    questionId: {
                                        $eq: questionId,
                                    },
                                },
                                {
                                    triggerQuestionId: {
                                        $nin: triggerQuestionIds,
                                    },
                                },
                            ],
                        });
                        return deleteTriggerIds;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addQuestionTriggersData",
                    function addQuestionTriggersData(questionTriggers, questionId) {
                        privateMethods.addQuestionTriggers(questionTriggers, questionId);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addQuestionData",
                    function addQuestionData(questionJsonData, questionGroupId) {
                        var offlineDb = localStorage.OfflineStorage;
                        var questionCollection = offlineDb.getCollection("Question");
                        var qExists = questionCollection.findOne({
                            Id: {
                                $eq: questionJsonData.Id,
                            },
                        });
                        var questionId = null;

                        if (qExists === null) {
                            var questionData = {
                                Id: questionJsonData.Id,
                                questionGroupId: questionGroupId,
                                text: questionJsonData.Text,
                                typeCode: questionJsonData.TypeCode,
                                isRequired: questionJsonData.IsRequired,
                                ignoreValuationQuestion: questionJsonData.IgnoreValuationQuestion,
                                enableComment: questionJsonData.EnableComment,
                                enableFileAttachment: questionJsonData.EnableFileAttach,
                                helpLink: questionJsonData.HelpLink,
                                helpText: questionJsonData.HelpText,
                                sortOrder: questionJsonData.SortOrder,
                                triggerRequirement: questionJsonData.TriggerRequirement,
                                answerGroupId: questionJsonData.AnswerGroupId,
                                createdDate: questionJsonData.CreatedDate,
                                showDependencyQuestion:
                                    questionJsonData.ShowTriggerQuestionAnswer,
                                columnType: questionJsonData.ColumnType,
                                columnSubType: questionJsonData.ColumnSubType,
                                dataTypeId: questionJsonData.DataTypeId,
                                isDateDefaultToday: questionJsonData.IsDateDefaultToday,
                                isDateMaximumToday: questionJsonData.IsDateMaximumToday,
                                enableQRCodeReader: questionJsonData.EnableQRCodeReader,
                            };
                            questionId = questionJsonData.Id;
                            questionCollection.insert(questionData);
                        } else {
                            questionId = qExists.Id;
                            qExists.questionGroupId = questionGroupId;
                            qExists.text = questionJsonData.Text;
                            qExists.typeCode = questionJsonData.TypeCode;
                            qExists.isRequired = questionJsonData.IsRequired;
                            qExists.ignoreValuationQuestion =
                                questionJsonData.IgnoreValuationQuestion;
                            qExists.enableComment = questionJsonData.EnableComment;
                            qExists.enableFileAttachment = questionJsonData.EnableFileAttach;
                            qExists.helpLink = questionJsonData.HelpLink;
                            qExists.helpText = questionJsonData.HelpText;
                            qExists.sortOrder = questionJsonData.SortOrder;
                            qExists.triggerRequirement = questionJsonData.TriggerRequirement;
                            qExists.answerGroupId = questionJsonData.AnswerGroupId;
                            qExists.createdDate = questionJsonData.CreatedDate;
                            qExists.showDependencyQuestion =
                                questionJsonData.ShowTriggerQuestionAnswer;
                            qExists.columnType = questionJsonData.ColumnType;
                            qExists.columnSubType = questionJsonData.ColumnSubType;
                            qExists.dataTypeId = questionJsonData.DataTypeId;
                            qExists.isDateDefaultToday = questionJsonData.IsDateDefaultToday;
                            qExists.isDateMaximumToday = questionJsonData.IsDateMaximumToday;
                            qExists.enableQRCodeReader = questionJsonData.EnableQRCodeReader;
                            questionCollection.update(qExists);
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addQuestionGroupData",
                    function addQuestionGroupData(questionnaireJsonData, questionnaireId) {
                        var offlineDb = localStorage.OfflineStorage;
                        var questionGroupCollection =
                            offlineDb.getCollection("QuestionGroup");
                        var questionGroupJsonData = questionnaireJsonData;
                        var questionGroupId = questionGroupJsonData.Id;
                        var qgExists = questionGroupCollection.findOne({
                            $and: [
                                {
                                    Id: {
                                        $eq: questionGroupJsonData.Id,
                                    },
                                },
                                {
                                    questionnaireId: {
                                        $eq: questionnaireId,
                                    },
                                },
                            ],
                        });

                        if (qgExists === null) {
                            var questionnaireGroupData = {
                                Id: questionGroupJsonData.Id,
                                questionnaireId: questionnaireId,
                                answerGroupId: questionGroupJsonData.AnswerGroupId,
                                name: questionGroupJsonData.Name,
                                description: questionGroupJsonData.Description,
                                helpLink: questionGroupJsonData.HelpLink,
                                sortOrder: questionGroupJsonData.SortOrder,
                            };
                            questionGroupCollection.insert(questionnaireGroupData);
                        } else {
                            qgExists.questionnaireId = questionnaireId;
                            qgExists.answerGroupId = questionGroupJsonData.AnswerGroupId;
                            qgExists.name = questionGroupJsonData.Name;
                            qgExists.description = questionGroupJsonData.Description;
                            qgExists.helpLink = questionGroupJsonData.HelpLink;
                            qgExists.sortOrder = questionGroupJsonData.SortOrder;
                            questionGroupCollection.update(qgExists);
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addQuestionnaireData",
                    function addQuestionnaireData(questionnaireJsonData) {
                        var offlineDb = this.OfflineStorage;
                        var questionnaireCollection =
                            offlineDb.getCollection("Questionnaire");
                        var questionnaireId = questionnaireJsonData.Id;
                        var questionnaireExists = questionnaireCollection.findOne({
                            Id: {
                                $eq: questionnaireId,
                            },
                        });

                        if (questionnaireExists === null) {
                            var questionnaireData = {
                                Id: questionnaireId,
                                typeCode: questionnaireJsonData.TypeCode,
                                controlType: questionnaireJsonData.ControlType,
                                name: questionnaireJsonData.Name,
                                description: questionnaireJsonData.Description,
                                extendedDescription: questionnaireJsonData.ExtendedDescription,
                                isRepeatable: questionnaireJsonData.IsRepeatable,
                                isRepeatableOnlyOnceForEvaluatingFor:
                                    questionnaireJsonData.IsRepeatableOnlyOnceForEvaluatingFor,
                                pointOfView: questionnaireJsonData.PointOfView,
                                commentLabel: questionnaireJsonData.CommentLabel,
                                publishedDate: questionnaireJsonData.PublishedDate,
                                expirationDate: questionnaireJsonData.ExpirationDate,
                                createdDate: questionnaireJsonData.CreatedDate,
                                updatedDate: questionnaireJsonData.UpdatedDate,
                                questionBackColor: questionnaireJsonData.QuestionBackColor,
                                questionForeColor: questionnaireJsonData.QuestionForeColor,
                                questionGroupBackColor:
                                    questionnaireJsonData.QuestionGroupBackColor,
                                questionGroupForeColor:
                                    questionnaireJsonData.QuestionGroupForeColor,
                                answerGroupId: questionnaireJsonData.AnswerGroupId,
                                enableAnswerOptionColour:
                                    questionnaireJsonData.EnableAnswerOptionColour,
                                enableTabularAnswering:
                                    questionnaireJsonData.EnableTabularAnswering,
                                tabularAnswerOptionColourType:
                                    questionnaireJsonData.TabularAnswerOptionColourType,
                                questionImageFileBase64: questionnaireJsonData.ImageFileBase64,
                                enableEmail: questionnaireJsonData.EnableEmail,
                                enablePrint: questionnaireJsonData.EnablePrint,
                                translatedPointOfView:
                                    questionnaireJsonData.TranslatedPointOfView,
                                answerOptionFontColour:
                                    questionnaireJsonData.AnswerOptionFontColour,
                                columnSubType: questionnaireJsonData.ColumnSubType,
                                autoUploadDelayInMins:
                                    questionnaireJsonData.AutoUploadDelayInMins,
                                enableEditGeoLocation:
                                    questionnaireJsonData.EnableEditGeoLocation,
                                isSurvey: questionnaireJsonData.IsSurvey,
                                hidePointOfViewOnStartScreen:
                                    questionnaireJsonData.HidePointOfViewOnStartScreen,
                            };
                            questionnaireCollection.insert(questionnaireData);
                        } else {
                            questionnaireExists.typeCode = questionnaireJsonData.TypeCode;
                            questionnaireExists.controlType = questionnaireJsonData.ControlType;
                            questionnaireExists.name = questionnaireJsonData.Name;
                            questionnaireExists.description = questionnaireJsonData.Description;
                            questionnaireExists.extendedDescription =
                                questionnaireJsonData.ExtendedDescription;
                            questionnaireExists.isRepeatable =
                                questionnaireJsonData.IsRepeatable;
                            questionnaireExists.isRepeatableOnlyOnceForEvaluatingFor =
                                questionnaireJsonData.IsRepeatableOnlyOnceForEvaluatingFor;
                            questionnaireExists.pointOfView = questionnaireJsonData.PointOfView;
                            questionnaireExists.commentLabel =
                                questionnaireJsonData.CommentLabel;
                            questionnaireExists.publishedDate =
                                questionnaireJsonData.PublishedDate;
                            questionnaireExists.expirationDate =
                                questionnaireJsonData.ExpirationDate;
                            questionnaireExists.createdDate = questionnaireJsonData.CreatedDate;
                            questionnaireExists.updatedDate = questionnaireJsonData.UpdatedDate;
                            questionnaireExists.questionBackColor =
                                questionnaireJsonData.QuestionBackColor;
                            questionnaireExists.questionForeColor =
                                questionnaireJsonData.QuestionForeColor;
                            questionnaireExists.questionGroupBackColor =
                                questionnaireJsonData.QuestionGroupBackColor;
                            questionnaireExists.questionGroupForeColor =
                                questionnaireJsonData.QuestionGroupForeColor;
                            questionnaireExists.answerGroupId =
                                questionnaireJsonData.AnswerGroupId;
                            questionnaireExists.enableAnswerOptionColour =
                                questionnaireJsonData.EnableAnswerOptionColour;
                            questionnaireExists.enableTabularAnswering =
                                questionnaireJsonData.EnableTabularAnswering;
                            questionnaireExists.tabularAnswerOptionColourType =
                                questionnaireJsonData.TabularAnswerOptionColourType;
                            questionnaireExists.questionImageFileBase64 =
                                questionnaireJsonData.ImageFileBase64;
                            questionnaireExists.enableEmail = questionnaireJsonData.EnableEmail;
                            questionnaireExists.enablePrint = questionnaireJsonData.EnablePrint;
                            questionnaireExists.translatedPointOfView =
                                questionnaireJsonData.TranslatedPointOfView;
                            questionnaireExists.answerOptionFontColour =
                                questionnaireJsonData.AnswerOptionFontColour;
                            questionnaireExists.columnSubType =
                                questionnaireJsonData.ColumnSubType;
                            questionnaireExists.autoUploadDelayInMins =
                                questionnaireJsonData.AutoUploadDelayInMins;
                            questionnaireExists.enableEditGeoLocation =
                                questionnaireJsonData.EnableEditGeoLocation;
                            questionnaireExists.isSurvey = questionnaireJsonData.IsSurvey;
                            questionnaireExists.hidePointOfViewOnStartScreen =
                                questionnaireJsonData.HidePointOfViewOnStartScreen;

                            questionnaireCollection.update(questionnaireExists);
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deletePersonQuestionAnswerByQuestionId",
                    function deletePersonQuestionAnswerByQuestionId(qId) {
                        var offlineDb = this.OfflineStorage;
                        var pqaColl = offlineDb.getCollection("PersonQuestionAnswer");
                        pqaColl.removeWhere(function (pqa) {
                            return pqa.questionId === qId;
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "insertAnswerOptionData",
                    function insertAnswerOptionData(answerOptions, questionId, type) {
                        privateMethods.addAnswerOption(answerOptions, questionId, type);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addQueEvaluatingForData",
                    function addQueEvaluatingForData(
                        evaulatingFor,
                        pointOfView,
                        questionnaireId
                    ) {
                        if (evaulatingFor !== null) {
                            var loggedInUser = this.getUserNameByLoggedInTimeStamp();

                            if (pointOfView !== null) {
                                var tableName = pointOfView; // As of now Department is only sent, so doing a check and inserting to userDepartment table
                                // If pointOfView is other than Department, it has to be handled.

                                if (pointOfView === "Department") {
                                    var deptIds = [];

                                    for (var i = 0; i < evaulatingFor.length; i++) {
                                        var evaulatingData = evaulatingFor[i];
                                        deptIds.push(evaulatingData.Id);
                                    }

                                    privateMethods.addUserDepartments(
                                        deptIds,
                                        loggedInUser[0].userId
                                    );
                                    privateMethods.addEvaluatingForPov(
                                        deptIds,
                                        loggedInUser[0].userId,
                                        tableName,
                                        questionnaireId
                                    );
                                } else if (pointOfView === "Person") {
                                    var personIds = [];

                                    for (var i = 0; i < evaulatingFor.length; i++) {
                                        var evaulatingData = evaulatingFor[i];
                                        personIds.push(evaulatingData.Id);
                                    }

                                    privateMethods.addEvaluatingForPov(
                                        personIds,
                                        loggedInUser[0].userId,
                                        tableName,
                                        questionnaireId
                                    );
                                } else if (pointOfView === "Manager") {
                                    var evaluatingList = [];
                                    privateMethods.addManager2QuestionnaireEvaluatingFor(
                                        evaulatingFor,
                                        loggedInUser[0].userId,
                                        questionnaireId
                                    );
                                } else if (
                                    pointOfView === "Asset" ||
                                    pointOfView === "Chemical"
                                ) {
                                    var assetIds = [];

                                    for (var i = 0; i < evaulatingFor.length; i++) {
                                        var evaulatingData = evaulatingFor[i];
                                        assetIds.push(evaulatingData.Id);
                                    }

                                    privateMethods.addEvaluatingForPov(
                                        assetIds,
                                        loggedInUser[0].userId,
                                        tableName,
                                        questionnaireId
                                    );
                                } else {
                                    privateMethods.addDataToGenericCollection(
                                        tableName,
                                        evaulatingFor
                                    );
                                    var evalIds = [];

                                    for (var i = 0; i < evaulatingFor.length; i++) {
                                        var evaulatingData = evaulatingFor[i];
                                        evalIds.push(evaulatingData.Id);
                                    }

                                    privateMethods.addEvaluatingForPov(
                                        evalIds,
                                        loggedInUser[0].userId,
                                        tableName,
                                        questionnaireId
                                    );
                                }
                            }
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addPersonQuestionnaire",
                    function addPersonQuestionnaire(personQuestionnaireData) {
                        var offlineDb = this.OfflineStorage;
                        var personQuestionnaireCollection = offlineDb.getCollection(
                            "PersonQuestionnaireTemplate"
                        );
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var pqExistsByQuestionnaire = personQuestionnaireCollection.findOne({
                            $and: [
                                {
                                    questionnaireId: {
                                        $eq: personQuestionnaireData.QuestionnaireId,
                                    },
                                },
                                {
                                    personId: {
                                        $eq: loggedInUser[0].personId,
                                    },
                                },
                            ],
                        });
                        var pqId = null;

                        if (pqExistsByQuestionnaire == null) {
                            var pq = {
                                Id:
                                    personQuestionnaireData.Id == null
                                        ? guid()
                                        : personQuestionnaireData.Id,
                                questionnaireId: personQuestionnaireData.QuestionnaireId,
                                answerByPersonId: personQuestionnaireData.AnswerByPersonId,
                                personId: personQuestionnaireData.AnswerByPersonId,
                                departmentId: personQuestionnaireData.DepartmentId,
                                evaluatedForId: personQuestionnaireData.EvaluatedForId,
                                geoX: personQuestionnaireData.GeoX,
                                geoY: personQuestionnaireData.GeoY,
                                initiatedDate: personQuestionnaireData.InitiatedDate,
                                isAnonymous: personQuestionnaireData.IsAnonymous,
                            };
                            pqId = pq.Id;
                            personQuestionnaireCollection.insert(pq);
                        } else {
                            pqId = pqExistsByQuestionnaire.Id;
                            pqExistsByQuestionnaire.answerByPersonId =
                                personQuestionnaireData.AnswerByPersonId;
                            pqExistsByQuestionnaire.departmentId =
                                personQuestionnaireData.DepartmentId;
                            pqExistsByQuestionnaire.evaluatedForId =
                                personQuestionnaireData.EvaluatedForId;
                            pqExistsByQuestionnaire.isAnonymous =
                                personQuestionnaireData.IsAnonymous;
                            personQuestionnaireCollection.update(pqExistsByQuestionnaire);
                        }

                        return pqId;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addPersonQuestionnaireAnswerTemplate",
                    function addPersonQuestionnaireAnswerTemplate(
                        personQuestionAnswer,
                        newPersonQuestionnaireId
                    ) {
                        var offlineDb = localStorage.OfflineStorage;
                        var personQuestionAnswerCollection = offlineDb.getCollection(
                            "PersonQuestionAnswerTemplate"
                        );
                        var questionId = personQuestionAnswer.QuestionId;
                        personQuestionAnswerCollection.removeWhere(function (pQueAns) {
                            return (
                                pQueAns.personQuestionnaireId === newPersonQuestionnaireId &&
                                pQueAns.questionId == questionId
                            );
                        });
                        personQuestionAnswer.PersonQuestionnaireId = newPersonQuestionnaireId;
                        personQuestionAnswer.FileLocation = null;
                        var personQuestionAnswerValue =
                            personQuestionAnswerCollection.findOne({
                                $and: [
                                    {
                                        personQuestionnaireId: {
                                            $eq: newPersonQuestionnaireId,
                                        },
                                    },
                                    {
                                        questionId: {
                                            $eq: questionId,
                                        },
                                    },
                                ],
                            });

                        if (personQuestionAnswerValue === null) {
                            var personQuestionAnswerData = {
                                Id: guid(),
                                personQuestionnaireId: personQuestionAnswer.PersonQuestionnaireId,
                                questionId: personQuestionAnswer.QuestionId,
                                answerId: personQuestionAnswer.AnswerId,
                                answerText: personQuestionAnswer.AnswerText,
                                comment: personQuestionAnswer.Comment,
                                fileName: personQuestionAnswer.FileName,
                                fileSourceBase64: personQuestionAnswer.FileSourceBase64,
                                fileLocation: personQuestionAnswer.FileLocation,
                                internalFileLocation: personQuestionAnswer.InternalFileLocation,
                                createdDate: personQuestionAnswer.CreatedDate,
                            };
                            personQuestionAnswerCollection.insert(personQuestionAnswerData);
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addPersonValuationQuestionAnswerTemplate",
                    function addPersonValuationQuestionAnswerTemplate(
                        pvqAnswers,
                        newPersonQuestionnaireId
                    ) {
                        var offlineDb = localStorage.OfflineStorage;
                        var pvqAnswerCollection = offlineDb.getCollection(
                            "PersonValuationQuestionAnswerTemplate"
                        );
                        pvqAnswerCollection.removeWhere(function (pValQueAns) {
                            return (
                                pValQueAns.personQuestionnaireId === newPersonQuestionnaireId
                            );
                        });
                        var valAnswerArray = [];

                        for (var i = 0; i < pvqAnswers.length; i++) {
                            var pvqAnswer = pvqAnswers[i];
                            var vqId = pvqAnswer.ValuationQuestionId;
                            var queId = pvqAnswer.QuestionId;
                            var pvqaNew = {
                                Id: guid(),
                                personQuestionnaireId: newPersonQuestionnaireId,
                                questionId: queId,
                                valuationQuestionId: vqId,
                                answerId: pvqAnswer.AnswerId,
                                answerText: pvqAnswer.AnswerText,
                            };
                            valAnswerArray.push(pvqaNew);
                        }

                        pvqAnswerCollection.insert(valAnswerArray);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deleteEvaluatingForPov",
                    function deleteEvaluatingForPov(qId) {
                        var offlineDb = localStorage.OfflineStorage;
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var evaluatingForPovCollection =
                            offlineDb.getCollection("EvaluatingForPov");
                        var evalIdsForDelete = evaluatingForPovCollection.find({
                            $and: [
                                {
                                    qId: {
                                        $eq: qId,
                                    },
                                },
                                {
                                    userId: {
                                        $eq: loggedInUser[0].userId,
                                    },
                                },
                            ],
                        });
                        evaluatingForPovCollection.remove(evalIdsForDelete);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addAskadeWizardData",
                    function addAskadeWizardData(askFileType) {
                        var offlineDb = localStorage.OfflineStorage;
                        var askadeFileTypeWizardColl = offlineDb.getCollection(
                            "AskadeFileTypeWizard"
                        );
                        var fileType = askadeFileTypeWizardColl.findOne({
                            Id: {
                                $eq: askFileType.FileTypeId,
                            },
                        });

                        if (fileType === null) {
                            var askadeFileTypeEntry = {
                                Id: askFileType.FileTypeId,
                                columnGuideFileTypeId: askFileType.ColumnGuideFileTypeId,
                                name: askFileType.Name,
                                typeCode: askFileType.TypeCode,
                                noOfAttachments: askFileType.NoOfAttachments,
                                imageFileBase64: askFileType.ImageFileBase64,
                                groupBackColor: askFileType.GroupBackColor,
                                groupForeColor: askFileType.GroupForeColor,
                                backColor: askFileType.BackColor,
                                foreColor: askFileType.ForeColor,
                                enablePrint: askFileType.EnablePrint,
                                enableEmail: askFileType.EnableEmail,
                                autoUploadDelayInMinutes: askFileType.AutoUploadDelayInMinutes,
                                enableEditGeoLocation: askFileType.EnableEditGeoLocation,
                            };
                            askadeFileTypeWizardColl.insert(askadeFileTypeEntry);
                        } else {
                            fileType.name = askFileType.Name;
                            fileType.noOfAttachments = askFileType.NoOfAttachments;
                            fileType.imageFileBase64 = askFileType.ImageFileBase64;
                            fileType.groupBackColor = askFileType.GroupBackColor;
                            fileType.groupForeColor = askFileType.GroupForeColor;
                            fileType.backColor = askFileType.BackColor;
                            fileType.foreColor = askFileType.ForeColor;
                            fileType.enablePrint = askFileType.EnablePrint;
                            fileType.enableEmail = askFileType.EnableEmail;
                            fileType.autoUploadDelayInMinutes =
                                askFileType.AutoUploadDelayInMinutes;
                            fileType.enableEditGeoLocation = askFileType.EnableEditGeoLocation;

                            askadeFileTypeWizardColl.update(fileType);
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addAskadeWizardStepsData",
                    function addAskadeWizardStepsData(askadeFileTypeId, askWizStep) {
                        var offlineDb = localStorage.OfflineStorage;
                        var askadeFileTypeWizardStepColl = offlineDb.getCollection(
                            "AskadeFileTypeWizardStep"
                        );
                        var fileTypeWizStep = askadeFileTypeWizardStepColl.findOne({
                            $and: [
                                {
                                    Id: askWizStep.Id,
                                },
                                {
                                    fileTypeId: askadeFileTypeId,
                                },
                            ],
                        });

                        if (fileTypeWizStep === null) {
                            var askadeFileTypeWizStepEntry = {
                                Id: askWizStep.Id,
                                fileTypeId: askadeFileTypeId,
                                name: askWizStep.Name,
                                description: askWizStep.Description,
                                sortOrder: askWizStep.SortOrder,
                            };
                            askadeFileTypeWizardStepColl.insert(askadeFileTypeWizStepEntry);
                        } else {
                            fileTypeWizStep.fileTypeId = askadeFileTypeId;
                            fileTypeWizStep.name = askWizStep.Name;
                            fileTypeWizStep.description = askWizStep.Description;
                            fileTypeWizStep.sortOrder = askWizStep.SortOrder;
                            askadeFileTypeWizardStepColl.update(fileTypeWizStep);
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addAskadeWizardStepColumnData",
                    function addAskadeWizardStepColumnData(
                        askadeWizStepId,
                        askWizFileColumn
                    ) {
                        var offlineDb = localStorage.OfflineStorage;
                        var askadeWizStepColumnColl = offlineDb.getCollection(
                            "AskadeFileTypeWizardStepColumn"
                        );
                        var fileTypeWizStepColumn = askadeWizStepColumnColl.findOne({
                            $and: [
                                {
                                    Id: askWizFileColumn.FileColumnId,
                                },
                                {
                                    fileTypeWizardStepId: askadeWizStepId,
                                },
                            ],
                        });

                        if (fileTypeWizStepColumn === null) {
                            var askadeWizStepColumnEntry = {
                                Id: askWizFileColumn.FileColumnId,
                                fileTypeWizardStepId: askadeWizStepId,
                                text: askWizFileColumn.Text,
                                helpText: askWizFileColumn.HelpText,
                                sortOrder: askWizFileColumn.SortOrder,
                                columnType: askWizFileColumn.ColumnType,
                                dataTypeId: askWizFileColumn.DataTypeId,
                                isMandatory: askWizFileColumn.IsMandatory,
                                isDateDefaultToday: askWizFileColumn.IsDateDefaultToday,
                                isDateMaximumToday: askWizFileColumn.IsDateMaximumToday,
                                columnSubType: askWizFileColumn.ColumnSubType,
                                columnGuides2FileTypes: askWizFileColumn.ColumnGuides2FileTypes,
                                dependantFileColumnId: askWizFileColumn.DependantFileColumnId,
                                dependantFileColumnValues:
                                    askWizFileColumn.DependantFileColumnValues,
                                enableQRCodeReader: askWizFileColumn.EnableQRCodeReader,
                                disableSearch: askWizFileColumn.DisableSearch,
                            };
                            askadeWizStepColumnColl.insert(askadeWizStepColumnEntry);
                        } else {
                            fileTypeWizStepColumn.fileTypeWizardStepId = askadeWizStepId;
                            fileTypeWizStepColumn.text = askWizFileColumn.Text;
                            fileTypeWizStepColumn.helpText = askWizFileColumn.HelpText;
                            fileTypeWizStepColumn.sortOrder = askWizFileColumn.SortOrder;
                            fileTypeWizStepColumn.columnType = askWizFileColumn.ColumnType;
                            fileTypeWizStepColumn.dataTypeId = askWizFileColumn.DataTypeId;
                            fileTypeWizStepColumn.isMandatory = askWizFileColumn.IsMandatory;
                            fileTypeWizStepColumn.isDateDefaultToday =
                                askWizFileColumn.IsDateDefaultToday;
                            fileTypeWizStepColumn.isDateMaximumToday =
                                askWizFileColumn.IsDateMaximumToday;
                            fileTypeWizStepColumn.columnSubType =
                                askWizFileColumn.ColumnSubType;
                            fileTypeWizStepColumn.columnGuides2FileTypes =
                                askWizFileColumn.ColumnGuides2FileTypes;
                            fileTypeWizStepColumn.enableQRCodeReader =
                                askWizFileColumn.EnableQRCodeReader;
                            fileTypeWizStepColumn.disableSearch =
                                askWizFileColumn.DisableSearch;

                            fileTypeWizStepColumn.dependantFileColumnId =
                                askWizFileColumn.DependantFileColumnId;
                            fileTypeWizStepColumn.dependantFileColumnValues =
                                askWizFileColumn.DependantFileColumnValues;

                            askadeWizStepColumnColl.update(fileTypeWizStepColumn);
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addAskadeWizardStepColumnGuide",
                    function addAskadeWizardStepColumnGuide(
                        askWizColumnId,
                        askFileTypeId,
                        askWizFileColumnGuide
                    ) {
                        var offlineDb = localStorage.OfflineStorage;
                        var askadeWizStepColumnGuideColl = offlineDb.getCollection(
                            "AskadeFileTypeWizardStepColumnGuide"
                        );
                        var fileTypeWizStepColumnGuide = askadeWizStepColumnGuideColl.findOne(
                            {
                                Id: {
                                    $eq: askWizFileColumnGuide.Id,
                                },
                            }
                        );

                        if (fileTypeWizStepColumnGuide === null) {
                            var askadeWizStepColumnGuideEntry = {
                                Id: askWizFileColumnGuide.Id,
                                askWizFileColumnId: askWizColumnId,
                                askWizFileTypeId: askFileTypeId,
                                text: askWizFileColumnGuide.Text,
                                description: askWizFileColumnGuide.Description,
                                sortOrder: askWizFileColumnGuide.SortOrder,
                                includeQuotations: askWizFileColumnGuide.IncludeQuotations,
                            };
                            askadeWizStepColumnGuideColl.insert(askadeWizStepColumnGuideEntry);
                        } else {
                            fileTypeWizStepColumnGuide.askWizFileColumnId = askWizColumnId;
                            fileTypeWizStepColumnGuide.askWizFileTypeId = askFileTypeId;
                            fileTypeWizStepColumnGuide.text = askWizFileColumnGuide.Text;
                            fileTypeWizStepColumnGuide.description =
                                askWizFileColumnGuide.Description;
                            fileTypeWizStepColumnGuide.sortOrder =
                                askWizFileColumnGuide.SortOrder;
                            fileTypeWizStepColumnGuide.includeQuotations =
                                askWizFileColumnGuide.IncludeQuotations;
                            askadeWizStepColumnGuideColl.update(fileTypeWizStepColumnGuide);
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addPersonAskadeFileTypeWizardDataTemplate",
                    function addPersonAskadeFileTypeWizardDataTemplate(fileTypeWizard) {
                        var offlineDb = localStorage.OfflineStorage;
                        var fileTypeAnswer = fileTypeWizard.NewAskade; // TODO: After all the SIT has been updated to NewCase instead of NewAskade, Chaeck and above code can be removed

                        if (!fileTypeAnswer) {
                            fileTypeAnswer = fileTypeWizard.NewCase;
                        }

                        var columnGuideFileTypeId = fileTypeWizard.ColumnGuideFileTypeId;
                        var personAskadeWizardTemplateColl = offlineDb.getCollection(
                            "PersonAskadeFileTypeWizardTemplate"
                        );
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var personId = loggedInUser[0].personId;
                        var personAskadeId = null;
                        var personAskadeWizardTemplateAnswer =
                            personAskadeWizardTemplateColl.findOne({
                                $and: [
                                    {
                                        fileTypeId: {
                                            $eq: fileTypeAnswer.FileTypeId,
                                        },
                                    },
                                    {
                                        personId: personId,
                                    },
                                ],
                            });

                        if (personAskadeWizardTemplateAnswer === null) {
                            var askadeAnswer = {
                                Id: guid(),
                                fileTypeId: fileTypeAnswer.FileTypeId,
                                columnGuideFileTypeId: columnGuideFileTypeId,
                                personId: loggedInUser[0].personId,
                                geoX:
                                    fileTypeAnswer.GeoX === undefined ? null : fileTypeAnswer.GeoX,
                                geoY:
                                    fileTypeAnswer.GeoY === undefined ? null : fileTypeAnswer.GeoY,
                            };
                            personAskadeId = askadeAnswer.Id;
                            personAskadeWizardTemplateColl.insert(askadeAnswer);
                        } else {
                            personAskadeId = personAskadeWizardTemplateAnswer.Id;
                            personAskadeWizardTemplateAnswer.geoX =
                                fileTypeAnswer.GeoX === undefined ? null : fileTypeAnswer.GeoX;
                            personAskadeWizardTemplateAnswer.geoY =
                                fileTypeAnswer.GeoY === undefined ? null : fileTypeAnswer.GeoY;
                            personAskadeWizardTemplateColl.update(
                                personAskadeWizardTemplateAnswer
                            );
                        }

                        return personAskadeId;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addPersonAskadeWizStepColumnAnswer",
                    function addPersonAskadeWizStepColumnAnswer(
                        personAskadeId,
                        columnAnswer,
                        columnSubTypeList
                    ) {
                        var offlineDb = this.OfflineStorage;
                        var personAskadeWizardTemplateColl = offlineDb.getCollection(
                            "PersonAskadeColumnAnswerTemplate"
                        ); // Getting the Column Sub Type value from the array that is passed as parameter.

                        var columnSubType = null;
                        var columnType = null;

                        for (var i = 0; i < columnSubTypeList.length; i++) {
                            var columnSubTypeData = columnSubTypeList[i];

                            if (columnAnswer.FileColumnId === columnSubTypeData.ColumnId) {
                                columnSubType = columnSubTypeData.ColumnSubType;
                                columnType = columnSubTypeData.ColumnType;
                                break;
                            }
                        }

                        personAskadeWizardTemplateColl.removeWhere(function (pAskWiz) {
                            return (
                                pAskWiz.personAskadeWizId === personAskadeId &&
                                pAskWiz.fileColumnId === columnAnswer.FileColumnId
                            );
                        });

                        var columnValue = {
                            Id: guid(),
                            personAskadeWizId: personAskadeId,
                            fileColumnId: columnAnswer.FileColumnId,
                            answerId: columnAnswer.AnswerId,
                            answerText: columnAnswer.AnswerText,
                            columnSubType: columnSubType,
                            columnType: columnType,
                            answerDate: null,
                            defaultValue: columnAnswer.DefaultValue,
                        };
                        personAskadeWizardTemplateColl.insert(columnValue);
                        return columnValue.Id;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addActionPlanData",
                    function addActionPlanData(actionPlanWizardJsonData) {
                        var offlineDb = this.OfflineStorage;
                        var actionPlanWizardCollection =
                            offlineDb.getCollection("ActionPlanWizard");
                        var actionPlanWizardId = actionPlanWizardJsonData.Id;
                        var actionPlanWizardExists = actionPlanWizardCollection.findOne({
                            Id: {
                                $eq: actionPlanWizardId,
                            },
                        });

                        if (actionPlanWizardExists == null) {
                            var actionPlanWizardData = {
                                Id: actionPlanWizardId,
                                columnGuideCategoryId:
                                    actionPlanWizardJsonData.ColumnGuideCategoryId,
                                name: actionPlanWizardJsonData.Name,
                                description: actionPlanWizardJsonData.Description,
                                typeCode: actionPlanWizardJsonData.TypeCode,
                                noOfAttachments: actionPlanWizardJsonData.NoOfAttachments,
                                imageLogoBase64: actionPlanWizardJsonData.ImageFileBase64,
                                groupBackColor: actionPlanWizardJsonData.GroupBackColor,
                                groupForeColor: actionPlanWizardJsonData.GroupForeColor,
                                backColor: actionPlanWizardJsonData.BackColor,
                                foreColor: actionPlanWizardJsonData.ForeColor,
                                // TODO: By default it is set to true (The setting has to be added in Web API)
                                enablePrint: actionPlanWizardJsonData.EnablePrint,
                                enableEmail: actionPlanWizardJsonData.EnableEmail,
                                autoUploadDelayInMinutes:
                                    actionPlanWizardJsonData.AutoUploadDelayInMinutes,
                                enableEditGeoLocation:
                                    actionPlanWizardJsonData.EnableEditGeoLocation,
                            };
                            actionPlanWizardCollection.insert(actionPlanWizardData);
                        } else {
                            actionPlanWizardExists.name = actionPlanWizardJsonData.Name;
                            actionPlanWizardExists.description =
                                actionPlanWizardJsonData.Description;
                            actionPlanWizardExists.typeCode = actionPlanWizardJsonData.TypeCode;
                            actionPlanWizardExists.noOfAttachments =
                                actionPlanWizardJsonData.NoOfAttachments;
                            actionPlanWizardExists.imageLogoBase64 =
                                actionPlanWizardJsonData.ImageFileBase64;
                            actionPlanWizardExists.groupBackColor =
                                actionPlanWizardJsonData.GroupBackColor;
                            actionPlanWizardExists.groupForeColor =
                                actionPlanWizardJsonData.GroupForeColor;
                            actionPlanWizardExists.backColor =
                                actionPlanWizardJsonData.BackColor;
                            actionPlanWizardExists.foreColor =
                                actionPlanWizardJsonData.ForeColor; // TODO: By default it is set to true (The setting has to be added in Web API)

                            actionPlanWizardExists.enablePrint =
                                actionPlanWizardJsonData.EnablePrint;
                            actionPlanWizardExists.enableEmail =
                                actionPlanWizardJsonData.EnableEmail;
                            actionPlanWizardExists.autoUploadDelayInMinutes =
                                actionPlanWizardJsonData.AutoUploadDelayInMinutes;
                            actionPlanWizardExists.enableEditGeoLocation =
                                actionPlanWizardJsonData.EnableEditGeoLocation;

                            actionPlanWizardCollection.update(actionPlanWizardExists);
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addActionPlanWizardStepData",
                    function addActionPlanWizardStepData(
                        actionPlanWizardStepJsonData,
                        actionPlanWizardId
                    ) {
                        var offlineDb = localStorage.OfflineStorage;
                        var actionPlanWizardStepCollection = offlineDb.getCollection(
                            "ActionPlanWizardStep"
                        );
                        var actionPlanWizardStepId = actionPlanWizardStepJsonData.Id;
                        var actionPlanWizardStep = actionPlanWizardStepCollection.findOne({
                            Id: {
                                $eq: actionPlanWizardStepJsonData.Id,
                            },
                        });

                        if (actionPlanWizardStep === null) {
                            var actionPlanWizardStepEntry = {
                                Id: actionPlanWizardStepId,
                                actionPlanWizardId: actionPlanWizardId,
                                title: actionPlanWizardStepJsonData.Title,
                                description: actionPlanWizardStepJsonData.Description,
                                sortOrder: actionPlanWizardStepJsonData.SortOrder,
                                isRequired: actionPlanWizardStepJsonData.IsRequired,
                                associationCode: actionPlanWizardStepJsonData.AssociationCode,
                                columnGuide2Categories:
                                    actionPlanWizardStepJsonData.ColumnGuide2Categories,
                            };
                            actionPlanWizardStepCollection.insert(actionPlanWizardStepEntry);
                        } else {
                            actionPlanWizardStep.title = actionPlanWizardStepJsonData.Title;
                            actionPlanWizardStep.description =
                                actionPlanWizardStepJsonData.Description;
                            actionPlanWizardStep.sortOrder =
                                actionPlanWizardStepJsonData.SortOrder;
                            actionPlanWizardStep.isRequired =
                                actionPlanWizardStepJsonData.IsRequired;
                            actionPlanWizardStep.associationCode =
                                actionPlanWizardStepJsonData.AssociationCode;
                            actionPlanWizardStep.columnGuide2Categories =
                                actionPlanWizardStepJsonData.ColumnGuide2Categories;
                            actionPlanWizardStepCollection.update(actionPlanWizardStep);
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addActionPlanWizardStepColumnGuide",
                    function addActionPlanWizardStepColumnGuide(
                        actionPlanWizardStepId,
                        actionPlanWizardColumnGuideData
                    ) {
                        var offlineDb = localStorage.OfflineStorage;
                        var actionPlanWizStepColumnGuideCollection = offlineDb.getCollection(
                            "ActionPlanWizardStepColumnGuide"
                        );
                        var actionPlanWizStepColumnGuide =
                            actionPlanWizStepColumnGuideCollection.findOne({
                                $and: [
                                    {
                                        Id: {
                                            $eq: actionPlanWizardColumnGuideData.Id,
                                        },
                                    },
                                    {
                                        apWizStepId: {
                                            $eq: actionPlanWizardStepId,
                                        },
                                    },
                                ],
                            });

                        if (actionPlanWizStepColumnGuide === null) {
                            var actionPlanWizStepColumnGuideEntry = {
                                Id: actionPlanWizardColumnGuideData.Id,
                                apWizStepId: actionPlanWizardStepId,
                                text: actionPlanWizardColumnGuideData.Text,
                                description: actionPlanWizardColumnGuideData.Description,
                                sortOrder: actionPlanWizardColumnGuideData.SortOrder,
                                includeQuotations:
                                    actionPlanWizardColumnGuideData.IncludeQuotations,
                            };
                            actionPlanWizStepColumnGuideCollection.insert(
                                actionPlanWizStepColumnGuideEntry
                            );
                        } else {
                            actionPlanWizStepColumnGuide.apWizStepId = actionPlanWizardStepId;
                            actionPlanWizStepColumnGuide.text =
                                actionPlanWizardColumnGuideData.Text;
                            actionPlanWizStepColumnGuide.description =
                                actionPlanWizardColumnGuideData.Description;
                            actionPlanWizStepColumnGuide.sortOrder =
                                actionPlanWizardColumnGuideData.SortOrder;
                            actionPlanWizStepColumnGuide.includeQuotations =
                                actionPlanWizardColumnGuideData.IncludeQuotations;
                            actionPlanWizStepColumnGuideCollection.update(
                                actionPlanWizStepColumnGuide
                            );
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addActionPlanWizardStepColumnData",
                    function addActionPlanWizardStepColumnData(
                        actionPlanWizardStepColumnJsonData,
                        actionPlanWizardStepId
                    ) {
                        var offlineDb = localStorage.OfflineStorage;
                        var actionPlanWizStepColumnCollection = offlineDb.getCollection(
                            "ActionPlanWizardStepColumn"
                        );
                        var actionPlanWizardStepColumn =
                            actionPlanWizStepColumnCollection.findOne({
                                $and: [
                                    {
                                        Id: {
                                            $eq: actionPlanWizardStepColumnJsonData.Id,
                                        },
                                    },
                                    {
                                        actionPlanWizardStepId: {
                                            $eq: actionPlanWizardStepId,
                                        },
                                    },
                                ],
                            });

                        if (actionPlanWizardStepColumn !== null) {
                            actionPlanWizardStepColumn.text =
                                actionPlanWizardStepColumnJsonData.Text;
                            actionPlanWizardStepColumn.translatedText =
                                actionPlanWizardStepColumnJsonData.TranslatedText;
                            actionPlanWizardStepColumn.sortOrder =
                                actionPlanWizardStepColumnJsonData.SortOrder;
                            actionPlanWizardStepColumn.imageLogoBase64 =
                                actionPlanWizardStepColumnJsonData.ImageLogoBase64;
                            actionPlanWizardStepColumn.colourCode =
                                actionPlanWizardStepColumnJsonData.ColourCode;
                            actionPlanWizardStepColumn.parentId =
                                actionPlanWizardStepColumnJsonData.ParentId;
                            actionPlanWizardStepColumn.columnType =
                                actionPlanWizardStepColumnJsonData.ColumnType;
                            actionPlanWizardStepColumn.isMandatory =
                                actionPlanWizardStepColumnJsonData.IsMandatory;
                            actionPlanWizardStepColumn.isDateMaximumToday =
                                actionPlanWizardStepColumnJsonData.IsDateMaximumToday;
                            actionPlanWizardStepColumn.defaultValue =
                                actionPlanWizardStepColumnJsonData.DefaultValue;
                            actionPlanWizardStepColumn.enableQRCodeReader =
                                actionPlanWizardStepColumnJsonData.EnableQRCodeReader;
                            actionPlanWizStepColumnCollection.update(
                                actionPlanWizardStepColumn
                            );
                        } else {
                            var wizardStepColumnEntry = {
                                Id: actionPlanWizardStepColumnJsonData.Id,
                                actionPlanWizardStepId: actionPlanWizardStepId,
                                text: actionPlanWizardStepColumnJsonData.Text,
                                translatedText: actionPlanWizardStepColumnJsonData.TranslatedText,
                                sortOrder: actionPlanWizardStepColumnJsonData.SortOrder,
                                imageLogoBase64:
                                    actionPlanWizardStepColumnJsonData.ImageLogoBase64,
                                colourCode: actionPlanWizardStepColumnJsonData.ColourCode,
                                parentId: actionPlanWizardStepColumnJsonData.ParentId,
                                columnType: actionPlanWizardStepColumnJsonData.ColumnType,
                                isMandatory: actionPlanWizardStepColumnJsonData.IsMandatory,
                                isDateMaximumToday:
                                    actionPlanWizardStepColumnJsonData.IsDateMaximumToday,
                                enableQRCodeReader:
                                    actionPlanWizardStepColumnJsonData.EnableQRCodeReader,
                                defaultValue: actionPlanWizardStepColumnJsonData.DefaultValue,
                            };
                            actionPlanWizStepColumnCollection.insert(wizardStepColumnEntry);
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addPersonActionPlanTemplateData",
                    function addPersonActionPlanTemplateData(actionPlanAnswerJsonData) {
                        var offlineDb = this.OfflineStorage;
                        var personAPWizardTemplateInsert = [];
                        var personAPWizardTemplateUpdate = [];
                        var personActionPlanWizardTemplateColl = offlineDb.getCollection(
                            "PersonActionPlanWizardTemplate"
                        );
                        var loggedInUser = this.getUserNameByLoggedInTimeStamp();
                        var wizardId = actionPlanAnswerJsonData.WizardId;
                        var columnGuideCategoryId =
                            actionPlanAnswerJsonData.ColumnGuideCategoryId;
                        var personApwId = null;
                        var personApw = personActionPlanWizardTemplateColl.findOne({
                            $and: [
                                {
                                    wizardId: {
                                        $eq: wizardId,
                                    },
                                },
                                {
                                    personId: loggedInUser[0].personId,
                                },
                            ],
                        });

                        if (personApw != null) {
                            personApwId = personApw.Id;
                            personApw.wizardId = wizardId;
                            personApw.columnGuideCategoryId = columnGuideCategoryId;
                            personApw.title = actionPlanAnswerJsonData.Title;
                            personApw.personId = loggedInUser[0].personId;
                            personActionPlanWizardTemplateColl.update(personApw);
                        } else {
                            var apAnswer = {
                                Id: actionPlanAnswerJsonData.Id,
                                wizardId: wizardId,
                                title: actionPlanAnswerJsonData.Title,
                                personId: loggedInUser[0].personId,
                            };
                            personApwId = actionPlanAnswerJsonData.Id;
                            personActionPlanWizardTemplateColl.insert(apAnswer);
                        }

                        return personApwId;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addLanguageData",
                    function addLanguageData(suiteData) {
                        var defaultData = [
                            {
                                Id: 1,
                                LanguageName: "Danish",
                                IsDefault: false,
                                LanguageCode: "da",
                                CultureName: "da-DK",
                                IsInActive: false,
                            },
                            {
                                Id: 2,
                                LanguageName: "English",
                                IsDefault: false,
                                LanguageCode: "en",
                                CultureName: "en-US",
                                IsInActive: false,
                            },
                            {
                                Id: 3,
                                LanguageName: "German",
                                IsDefault: false,
                                LanguageCode: "de",
                                CultureName: "de-DE",
                                IsInActive: false,
                            },
                            {
                                Id: 4,
                                LanguageName: "Swedish",
                                IsDefault: false,
                                LanguageCode: "sv",
                                CultureName: "sv-SE",
                                IsInActive: false,
                            },
                            {
                                Id: 5,
                                LanguageName: "Norwegian",
                                IsDefault: false,
                                LanguageCode: "nb",
                                CultureName: "nb-NO",
                                IsInActive: false,
                            },
                            {
                                Id: 6,
                                LanguageName: "Polish",
                                IsDefault: false,
                                LanguageCode: "pl",
                                CultureName: "pl-PL",
                                IsInActive: false,
                            },
                        ];
                        var sysLang = window.localStorage.getItem("userLanguage");

                        if (!sysLang) {
                            sysLang =
                                window.navigator.userLanguage || window.navigator.language;

                            for (var i = 0; i < defaultData.length; i++) {
                                var langVal = defaultData[i].CultureName;

                                if (sysLang.toLowerCase() === langVal.toLowerCase()) {
                                    defaultData[i].IsDefault = true;
                                }
                            }
                        }

                        var languageData = null;

                        if (suiteData == null || suiteData.Languages == null) {
                            languageData = defaultData;
                        } else {
                            languageData = suiteData.Languages;
                        }

                        var offlineDb = this.OfflineStorage;
                        var languageCollection = offlineDb.getCollection("Language");
                        privateMethods.removeCollection("Language");
                        var langInserts = [];
                        var langUpdates = [];
                        var defaultLangCode = null;

                        for (var i = 0; i < languageData.length; i++) {
                            var lanData = languageData[i];
                            var languageDataNew = {
                                Id: lanData.Id,
                                language: lanData.LanguageName,
                                isDefault: lanData.IsDefault,
                                languageCode: lanData.LanguageCode,
                                cultureName: lanData.CultureName,
                                isInactive: lanData.IsInActive,
                            };
                            langInserts.push(languageDataNew);

                            if (lanData.IsDefault) {
                                defaultLangCode = lanData.CultureName;
                            }
                        }

                        languageCollection.insert(langInserts);
                        var userSetLang = window.localStorage.getItem("userLanguage");

                        if (!userSetLang) {
                            window.localStorage.setItem("userLanguage", defaultLangCode);
                            userSetLang = defaultLangCode;
                        } else {
                            var langActive = languageCollection.findOne({
                                $and: [
                                    {
                                        cultureName: {
                                            $eq: userSetLang,
                                        },
                                    },
                                    {
                                        isInactive: {
                                            $eq: true,
                                        },
                                    },
                                ],
                            });

                            if (langActive != null) {
                                window.localStorage.setItem("userLanguage", defaultLangCode);
                            }
                        } //this.saveUserPreferredLanguage(userSetLang);
                    }
                ),
                _defineProperty(_localStorage, "getLanguages", function getLanguages() {
                    var offlineDb = this.OfflineStorage;
                    var languageCollection = offlineDb.getCollection("Language");
                    return languageCollection.find({
                        languageCode: {
                            $ne: "",
                        },
                    });
                }),
                _defineProperty(
                    _localStorage,
                    "getActiveLanguages",
                    function getActiveLanguages() {
                        var offlineDb = this.OfflineStorage;
                        var languageCollection = offlineDb.getCollection("Language");
                        return languageCollection.find({
                            isInactive: {
                                $ne: true,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getDefaultLanguage",
                    function getDefaultLanguage() {
                        var offlineDb = this.OfflineStorage;
                        var languageCollection = offlineDb.getCollection("Language");
                        return languageCollection.findOne({
                            isDefault: {
                                $eq: true,
                            },
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deleteUserRecord",
                    function deleteUserRecord(userId) {
                        // Deleting all user records except current user record
                        var offlineDb = this.OfflineStorage;
                        var userDataCollection = offlineDb.getCollection("UserDetails");
                        var deleteListUserDetails = userDataCollection.find({
                            userId: {
                                $ne: userId,
                            },
                        });

                        for (var i = 0; i < deleteListUserDetails.length; i++) {
                            var deleteUser = deleteListUserDetails[i];
                            userDataCollection.remove(deleteUser);
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addDocumentLibraryData",
                    function addDocumentLibraryData(dlData, filePath, docSortOrder) {
                        var offlineDb = this.OfflineStorage;
                        var userDataCollection = offlineDb.getCollection("DocumentLibrary");
                        var dlDetails = userDataCollection.findOne({
                            Id: {
                                $eq: dlData.Id,
                            },
                        });

                        if (dlDetails !== null) {
                            dlDetails.Id = dlData.Id;
                            dlDetails.text = dlData.Text;
                            dlDetails.documentTypeCode = dlData.DocumentTypeCode;
                            dlDetails.htmlContent = dlData.HtmlContent;
                            dlDetails.linkName = dlData.LinkName;
                            dlDetails.link = dlData.Link;
                            dlDetails.fileName = dlData.FileName;
                            dlDetails.groupName = dlData.GroupName;
                            dlDetails.groupSortOrder = dlData.GroupSortOrder;
                            dlDetails.deviceFilePath = filePath;
                            dlDetails.encriptedFileName = dlData.EncriptedFileName;
                            if (docSortOrder) {
                                dlDetails.sortOrder = docSortOrder;
                            }
                            dlDetails.extendedInfo = dlData.ExtendedInfo;
                            dlDetails.aiAssistanceLink = dlData.AiAssistanceLink;
                            dlDetails.aiAssistanceGroupLink = dlData.AiAssistanceGroupLink;
                            userDataCollection.update(dlDetails);
                        } else {
                            var insertDLData = {
                                Id: dlData.Id,
                                text: dlData.Text,
                                documentTypeCode: dlData.DocumentTypeCode,
                                htmlContent: dlData.HtmlContent,
                                linkName: dlData.LinkName,
                                link: dlData.Link,
                                fileName: dlData.FileName,
                                groupName: dlData.GroupName,
                                groupSortOrder: dlData.GroupSortOrder,
                                deviceFilePath: filePath,
                                sortOrder: docSortOrder,
                                extendedInfo: dlData.ExtendedInfo,
                                encriptedFileName: dlData.EncriptedFileName,
                                aiAssistanceLink: dlData.AiAssistanceLink,
                                aiAssistanceGroupLink: dlData.AiAssistanceGroupLink,
                            };
                            userDataCollection.insert(insertDLData);
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllDLOfTypeDocument",
                    function getAllDLOfTypeDocument(groupName) {
                        var offlineDb = this.OfflineStorage;
                        var documentLibCollection =
                            offlineDb.getCollection("DocumentLibrary");
                        var documentTypeList = documentLibCollection.find({
                            $and: [
                                {
                                    documentTypeCode: {
                                        $eq: "File",
                                    },
                                },
                                {
                                    groupName: {
                                        $eq: groupName,
                                    },
                                },
                            ],
                        }); //return documentTypeList;

                        return documentTypeList.sort(function (a, b) {
                            if (a.sortOrder == b.sortOrder) return 0;
                            if (a.sortOrder > b.sortOrder) return 1;
                            if (a.sortOrder < b.sortOrder) return -1;
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllDLOfTypeLink",
                    function getAllDLOfTypeLink(groupName) {
                        var offlineDb = this.OfflineStorage;
                        var documentLibCollection =
                            offlineDb.getCollection("DocumentLibrary");
                        var linkTypeList = documentLibCollection.find({
                            $and: [
                                {
                                    documentTypeCode: {
                                        $eq: "Link",
                                    },
                                },
                                {
                                    groupName: {
                                        $eq: groupName,
                                    },
                                },
                            ],
                        }); //return linkTypeList;

                        return linkTypeList.sort(function (a, b) {
                            if (a.sortOrder == b.sortOrder) return 0;
                            if (a.sortOrder > b.sortOrder) return 1;
                            if (a.sortOrder < b.sortOrder) return -1;
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllDLOfTypeHTML",
                    function getAllDLOfTypeHTML(groupName) {
                        var offlineDb = this.OfflineStorage;
                        var documentLibCollection =
                            offlineDb.getCollection("DocumentLibrary");
                        var htmlTypeList = documentLibCollection.find({
                            $and: [
                                {
                                    documentTypeCode: {
                                        $eq: "HTML",
                                    },
                                },
                                {
                                    groupName: {
                                        $eq: groupName,
                                    },
                                },
                            ],
                        }); //return htmlTypeList;

                        return htmlTypeList.sort(function (a, b) {
                            if (a.sortOrder == b.sortOrder) return 0;
                            if (a.sortOrder > b.sortOrder) return 1;
                            if (a.sortOrder < b.sortOrder) return -1;
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getDocumentById",
                    function getDocumentById(docId) {
                        var offlineDb = this.OfflineStorage;
                        var documentLibCollection =
                            offlineDb.getCollection("DocumentLibrary");
                        var docValue = documentLibCollection.findOne({
                            Id: {
                                $eq: docId,
                            },
                        });
                        return docValue;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deleteDocumentById",
                    function deleteDocumentById(docId) {
                        var offlineDb = this.OfflineStorage;
                        var documentLibCollection =
                            offlineDb.getCollection("DocumentLibrary");
                        var docData = documentLibCollection.findOne({
                            Id: {
                                $eq: docId,
                            },
                        });
                        documentLibCollection.remove(docData);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deleteDocumentCollection",
                    function deleteDocumentCollection() {
                        var offlineDb = this.OfflineStorage;
                        var documentLibCollection =
                            offlineDb.getCollection("DocumentLibrary");
                        documentLibCollection.removeDataOnly();
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getDocIdsForDelete",
                    function getDocIdsForDelete(docIds) {
                        var offlineDb = this.OfflineStorage;
                        var documentLibCollection =
                            offlineDb.getCollection("DocumentLibrary");
                        var docForDelete = documentLibCollection.find({
                            Id: {
                                $nin: docIds,
                            },
                        });
                        return docForDelete;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllDocumentList",
                    function getAllDocumentList() {
                        var offlineDb = this.OfflineStorage;
                        var documentLibCollection =
                            offlineDb.getCollection("DocumentLibrary");
                        var docList = documentLibCollection.find({
                            Id: {
                                $ne: null,
                            },
                        }); //return this._sortString(docList);

                        return docList.sort(function (a, b) {
                            if (a.sortOrder == b.sortOrder) return 0;
                            if (a.sortOrder > b.sortOrder) return 1;
                            if (a.sortOrder < b.sortOrder) return -1;
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllDocumentByGroupType",
                    function getAllDocumentByGroupType(groupName) {
                        var offlineDb = this.OfflineStorage;
                        var documentLibCollection =
                            offlineDb.getCollection("DocumentLibrary");
                        var docGroupList = documentLibCollection.find({
                            groupName: {
                                $eq: groupName,
                            },
                        }); //return this._sortString(docGroupList);

                        return docGroupList.sort(function (a, b) {
                            if (a.sortOrder == b.sortOrder) return 0;
                            if (a.sortOrder > b.sortOrder) return 1;
                            if (a.sortOrder < b.sortOrder) return -1;
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getUniqueDocGroupName",
                    function getUniqueDocGroupName() {
                        var offlineDb = this.OfflineStorage;
                        var documentLibCollection =
                            offlineDb.getCollection("DocumentLibrary");
                        var docLibList = documentLibCollection.find({
                            Id: {
                                $ne: null,
                            },
                        });
                        var distDocGrpNameList = [];
                        var docList = docLibList.sort(function (a, b) {
                            if (a.sortOrder == b.sortOrder) return 0;
                            if (a.sortOrder > b.sortOrder) return 1;
                            if (a.sortOrder < b.sortOrder) return -1;
                        });

                        var docsWithAiLinks = docList.filter(function (doc) {
                            return doc.aiAssistanceGroupLink !== null;
                        });

                        for (var i = 0; i < docList.length; i++) {
                            var groupName = docList[i].groupName;
                            var groupSortOrder = docList[i].groupSortOrder;
                            var aiLink = docsWithAiLinks.find(function (doc) {
                                return doc.groupName === groupName;
                            });
                            var ifFound = distDocGrpNameList.some(function (docElement) {
                                return docElement.GroupName === groupName;
                            });

                            if (!ifFound) {
                                distDocGrpNameList.push({
                                    GroupName: groupName,
                                    GroupSortOrder: groupSortOrder,
                                    IsGroupToggle: true,
                                    AiAssistanceGroupLink: aiLink
                                        ? aiLink.aiAssistanceGroupLink
                                        : null,
                                });
                            }
                        }

                        return distDocGrpNameList.sort(function (a, b) {
                            if (a.GroupSortOrder == b.GroupSortOrder) return 0;
                            if (a.GroupSortOrder > b.GroupSortOrder) return 1;
                            if (a.GroupSortOrder < b.GroupSortOrder) return -1;
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addToFavorites",
                    function addToFavorites(favData) {
                        var offlineDb = this.OfflineStorage;
                        var favVal = favData;
                        var favListCollection = offlineDb.getCollection("Favorite"); // Getting all the saved values in Fav table so that adding the length value to the UserSortOrder column by default
                        // While inserting for the first time

                        var favListAllData = favListCollection.find({
                            itemId: {
                                $ne: null,
                            },
                        });
                        var userSortOrderVal = 0;

                        if (favListAllData.length !== 0) {
                            userSortOrderVal = favListAllData.length;
                        }

                        var favListData = favListCollection.findOne({
                            itemId: {
                                $eq: favVal.ItemId,
                            },
                        }); // Adding userSortOrder to null as this is for the first time data is added to favorite table

                        if (favListData == null) {
                            var favDataToAdd = {
                                itemId: favData.ItemId,
                                moduleName: favData.ModuleName,
                                groupName: favData.GroupName,
                                userSortOrder: userSortOrderVal,
                            };
                            favListCollection.insert(favDataToAdd);
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addToFavoritesByGroupName",
                    function addToFavoritesByGroupName(favData) {
                        var offlineDb = this.OfflineStorage;
                        var favVal = favData;
                        var favListCollection = offlineDb.getCollection("Favorite"); // Getting all the saved values in Fav table so that adding the length value to the UserSortOrder column by default
                        // While inserting for the first time

                        var favListAllData = favListCollection.find({
                            itemId: {
                                $ne: null,
                            },
                        });
                        var userSortOrderVal = 0;

                        if (favListAllData.length !== 0) {
                            userSortOrderVal = favListAllData.length;
                        }

                        var favListData = favListCollection.findOne({
                            groupName: {
                                $eq: favData.GroupName,
                            },
                        }); // Adding userSortOrder to null as this is for the first time data is added to favorite table

                        if (favListData == null) {
                            var favDataToAdd = {
                                itemId: favData.ItemId,
                                moduleName: favData.ModuleName,
                                groupName: favData.GroupName,
                                userSortOrder: userSortOrderVal,
                            };
                            favListCollection.insert(favDataToAdd);
                        } else {
                            favListData.itemId = favData.ItemId;
                            favListCollection.update(favListData);
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "updateFavorites",
                    function updateFavorites(itemId, favData) {
                        var offlineDb = this.OfflineStorage;
                        var favVal = favData;
                        var favListCollection = offlineDb.getCollection("Favorite");
                        var favListData = favListCollection.findOne({
                            itemId: {
                                $eq: itemId,
                            },
                        });
                        favListData.itemId = favData.ItemId;
                        favListData.moduleName = favData.ModuleName;
                        favListData.groupName = favData.GroupName;
                        favListData.userSortOrder = favData.UserSortOrder;
                        favListCollection.update(favListData);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "updateReOrderIndex",
                    function updateReOrderIndex(favList) {
                        var offlineDb = this.OfflineStorage;

                        for (var i = 0; i < favList.length; i++) {
                            var fav = favList[i];
                            var favListCollection = offlineDb.getCollection("Favorite");
                            var favListData = favListCollection.findOne({
                                itemId: {
                                    $eq: fav.ItemId,
                                },
                            });

                            if (favListData !== null) {
                                favListData.userSortOrder = i;
                            }
                        }

                        return this.saveOfflineDb();
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllFavoriteData",
                    function getAllFavoriteData() {
                        var offlineDb = this.OfflineStorage;
                        var favListCollection = offlineDb.getCollection("Favorite");
                        var favListData = favListCollection.find({
                            itemId: {
                                $ne: null,
                            },
                        }); // By default sort with lokiId as there will be no userSortOrder.
                        // Once updated sort with userSortOrder

                        var sortedList = this._sortString(favListData);

                        var newList = sortedList.sort(function (a, b) {
                            if (a.userSortOrder == b.userSortOrder) return 0;
                            if (a.userSortOrder > b.userSortOrder) return 1;
                            if (a.userSortOrder < b.userSortOrder) return -1;
                        });
                        return newList;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deleteFavoriteData",
                    function deleteFavoriteData(favData) {
                        var offlineDb = this.OfflineStorage;
                        var favListCollection = offlineDb.getCollection("Favorite");
                        var favListData = favListCollection.findOne({
                            $and: [
                                {
                                    moduleName: {
                                        $eq: favData.ModuleName,
                                    },
                                },
                                {
                                    itemId: {
                                        $eq: favData.ItemId,
                                    },
                                },
                            ],
                        });

                        if (favListData) {
                            favListCollection.remove(favListData);
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deleteFavoriteById",
                    function deleteFavoriteById(id) {
                        var offlineDb = this.OfflineStorage;
                        var favListCollection = offlineDb.getCollection("Favorite");
                        var favListData = favListCollection.findOne({
                            itemId: {
                                $eq: id,
                            },
                        });

                        if (favListData) {
                            favListCollection.remove(favListData);
                        }

                        return favListData;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getFavoriteDataByGroupName",
                    function getFavoriteDataByGroupName(id) {
                        var offlineDb = this.OfflineStorage;
                        var favListCollection = offlineDb.getCollection("Favorite");
                        var favListData = favListCollection.findOne({
                            itemId: {
                                $eq: id,
                            },
                        });

                        if (favListData) {
                            favListCollection.remove(favListData);
                        }

                        return favListData;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deleteAllFavorite",
                    function deleteAllFavorite() {
                        var offlineDb = this.OfflineStorage;
                        var favListCollection = offlineDb.getCollection("Favorite");
                        favListCollection.removeDataOnly();
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addNewsData",
                    function addNewsData(newsData, isRead) {
                        var offlineDb = this.OfflineStorage;
                        var newsCollection = offlineDb.getCollection("News");
                        var newsDetails = newsCollection.findOne({
                            Id: {
                                $eq: newsData.Id,
                            },
                        });

                        if (newsDetails !== null) {
                            newsDetails.Id = newsData.Id;
                            newsDetails.header = newsData.Header;
                            newsDetails.teaser = newsData.Teaser;
                            newsDetails.link = newsData.Link;
                            newsDetails.groupName = newsData.GroupName;
                            newsDetails.groupSortOrder = newsData.GroupSortOrder;
                            newsDetails.htmlContent = newsData.HtmlContent;
                            newsDetails.sortOrder = newsData.SortOrder;
                            newsDetails.expiryDate = newsData.ExpiryDate;
                            newsDetails.modifiedDate = newsData.ModifiedDate;
                            newsDetails.isExternal = newsData.IsExternal;
                            newsDetails.isRead = isRead;
                            newsCollection.update(newsDetails);
                        } else {
                            var insertNewsData = {
                                Id: newsData.Id,
                                header: newsData.Header,
                                teaser: newsData.Teaser,
                                link: newsData.Link,
                                groupName: newsData.GroupName,
                                groupSortOrder: newsData.GroupSortOrder,
                                htmlContent: newsData.HtmlContent,
                                sortOrder: newsData.SortOrder,
                                expiryDate: newsData.ExpiryDate,
                                modifiedDate: newsData.ModifiedDate,
                                isExternal: newsData.IsExternal,
                                isRead: isRead,
                            };
                            newsCollection.insert(insertNewsData);
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "addTempNewsData",
                    function addTempNewsData(newsData) {
                        var offlineDb = this.OfflineStorage;
                        var tempNewsCollection = offlineDb.getCollection("TempNews");
                        var newsDetails = tempNewsCollection.findOne({
                            Id: {
                                $eq: newsData.Id,
                            },
                        });

                        if (newsDetails !== null) {
                            newsDetails.Id = newsData.Id;
                            newsDetails.modifiedDate = newsData.ModifiedDate;
                            newsDetails.isRead = newsData.IsRead;
                            tempNewsCollection.update(newsDetails);
                        } else {
                            var insertNewsData = {
                                Id: newsData.Id,
                                modifiedDate: newsData.ModifiedDate,
                                isRead: newsData.IsRead,
                            };
                            tempNewsCollection.insert(insertNewsData);
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllTempNews",
                    function getAllTempNews() {
                        var offlineDb = this.OfflineStorage;
                        var tempNewsCollection = offlineDb.getCollection("TempNews");
                        var newsList = tempNewsCollection.findOne({
                            Id: {
                                $ne: null,
                            },
                        });
                        return newsList;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getTempNewsById",
                    function getTempNewsById(newsId) {
                        var offlineDb = this.OfflineStorage;
                        var tempNewsCollection = offlineDb.getCollection("TempNews");
                        var news = tempNewsCollection.findOne({
                            Id: {
                                $eq: newsId,
                            },
                        });
                        return news;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deleteAllTempNews",
                    function deleteAllTempNews() {
                        var offlineDb = this.OfflineStorage;
                        var tempNewsCollection = offlineDb.getCollection("TempNews");
                        tempNewsCollection.removeDataOnly();
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getNewsById",
                    function getNewsById(newsId) {
                        var offlineDb = this.OfflineStorage;
                        var newsCollection = offlineDb.getCollection("News");
                        var newsValue = newsCollection.findOne({
                            Id: {
                                $eq: newsId,
                            },
                        });
                        return newsValue;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getNewsIdsForDelete",
                    function getNewsIdsForDelete(newsIds) {
                        var offlineDb = this.OfflineStorage;
                        var newsCollection = offlineDb.getCollection("News");
                        var docForDelete = newsCollection.find({
                            Id: {
                                $nin: newsIds,
                            },
                        });
                        return docForDelete;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deleteNewsById",
                    function deleteNewsById(newsId) {
                        var offlineDb = this.OfflineStorage;
                        var newsCollection = offlineDb.getCollection("News");
                        var newsData = newsCollection.findOne({
                            Id: {
                                $eq: newsId,
                            },
                        });

                        if (newsData) {
                            newsCollection.remove(newsData);
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deleteNewsCollection",
                    function deleteNewsCollection() {
                        var offlineDb = this.OfflineStorage;
                        var newsCollection = offlineDb.getCollection("News");
                        newsCollection.removeDataOnly();
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "markNewsAsRead",
                    function markNewsAsRead(newsItem) {
                        var offlineDb = this.OfflineStorage;
                        var newsCollection = offlineDb.getCollection("News");
                        var newsDetails = newsCollection.findOne({
                            Id: {
                                $eq: newsItem.Id,
                            },
                        });

                        if (newsDetails !== null) {
                            newsDetails.isRead = newsItem.IsRead;
                        }

                        this.saveOfflineDb();
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllNewsList",
                    function getAllNewsList() {
                        var offlineDb = this.OfflineStorage;
                        var newsCollection = offlineDb.getCollection("News");
                        var newsList = newsCollection.find({
                            Id: {
                                $ne: null,
                            },
                        });
                        return newsList.sort(function (a, b) {
                            if (a.sortOrder == b.sortOrder) return 0;
                            if (a.sortOrder > b.sortOrder) return 1;
                            if (a.sortOrder < b.sortOrder) return -1;
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllReadNewsList",
                    function getAllReadNewsList() {
                        var offlineDb = this.OfflineStorage;
                        var newsCollection = offlineDb.getCollection("News");
                        var newsList = newsCollection.find({
                            $and: [
                                {
                                    Id: {
                                        $ne: null,
                                    },
                                },
                                {
                                    isRead: {
                                        $eq: true,
                                    },
                                },
                            ],
                        });
                        return newsList.sort(function (a, b) {
                            if (a.sortOrder == b.sortOrder) return 0;
                            if (a.sortOrder > b.sortOrder) return 1;
                            if (a.sortOrder < b.sortOrder) return -1;
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "insertNewsFileData",
                    function insertNewsFileData(newsId, newsFileData, filePath) {
                        var offlineDb = this.OfflineStorage;
                        var newsFileCollection = offlineDb.getCollection("NewsFile");
                        var newsFile = newsFileCollection.findOne({
                            $and: [
                                {
                                    newsId: {
                                        $eq: newsId,
                                    },
                                },
                                {
                                    Id: {
                                        $eq: newsFileData.Id,
                                    },
                                },
                            ],
                        });

                        if (newsFile !== null) {
                            newsFile.fileName = newsFileData.FileName;
                            newsFile.deviceFilePath = filePath;
                            newsFileCollection.update(newsFile);
                        } else {
                            var newsFileVal = {
                                Id: guid(),
                                newsId: newsId,
                                fileName: newsFileData.FileName,
                                deviceFilePath: filePath,
                            };
                            newsFileCollection.insert(newsFileVal);
                        }
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllNewsFileByNewsId",
                    function getAllNewsFileByNewsId(newsId) {
                        var offlineDb = this.OfflineStorage;
                        var newsFileCollection = offlineDb.getCollection("NewsFile");
                        var newsFile = newsFileCollection.find({
                            newsId: {
                                $eq: newsId,
                            },
                        });
                        return this._sortString(newsFile);
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "deleteNewsFileById",
                    function deleteNewsFileById(newsFile) {
                        var offlineDb = this.OfflineStorage;
                        var newsFileCollection = offlineDb.getCollection("NewsFile");
                        var newsFileVal = newsFileCollection.findOne({
                            Id: {
                                $eq: newsFile.Id,
                            },
                        });
                        newsFileCollection.remove(newsFileVal);
                        this.saveOfflineDb();
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getUnReadNewsCount",
                    function getUnReadNewsCount() {
                        var offlineDb = this.OfflineStorage;
                        var newsCollection = offlineDb.getCollection("News");
                        var newsListData = newsCollection.find({
                            isRead: {
                                $eq: false,
                            },
                        });
                        return newsListData.length;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getUniqueNewsGroupName",
                    function getUniqueNewsGroupName() {
                        var offlineDb = this.OfflineStorage;
                        var newsCollection = offlineDb.getCollection("News");
                        var newsListData = newsCollection.find({
                            Id: {
                                $ne: null,
                            },
                        });
                        var newsGrpNameList = [];
                        var newsList = newsListData.sort(function (a, b) {
                            if (a.sortOrder == b.sortOrder) return 0;
                            if (a.sortOrder > b.sortOrder) return 1;
                            if (a.sortOrder < b.sortOrder) return -1;
                        });

                        for (var i = 0; i < newsList.length; i++) {
                            var groupName = newsList[i].groupName;
                            var groupSortOrder = newsList[i].groupSortOrder;
                            var ifFound = newsGrpNameList.some(function (newsElement) {
                                return newsElement.GroupName === groupName;
                            });

                            if (!ifFound) {
                                newsGrpNameList.push({
                                    GroupName: groupName,
                                    GroupSortOrder: groupSortOrder,
                                    IsGroupToggle: true,
                                });
                            }
                        }

                        return newsGrpNameList.sort(function (a, b) {
                            if (a.GroupSortOrder == b.GroupSortOrder) return 0;
                            if (a.GroupSortOrder > b.GroupSortOrder) return 1;
                            if (a.GroupSortOrder < b.GroupSortOrder) return -1;
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllNewsByGroupType",
                    function getAllNewsByGroupType(groupName) {
                        var offlineDb = this.OfflineStorage;
                        var newsCollection = offlineDb.getCollection("News");
                        var newsGroupList = newsCollection.find({
                            groupName: {
                                $eq: groupName,
                            },
                        }); //return this._sortString(docGroupList);

                        return newsGroupList.sort(function (a, b) {
                            if (a.sortOrder == b.sortOrder) return 0;
                            if (a.sortOrder > b.sortOrder) return 1;
                            if (a.sortOrder < b.sortOrder) return -1;
                        });
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllInsurances",
                    function getAllInsurances() {
                        var offlineDb = this.OfflineStorage;
                        var insuranceCollection = offlineDb.getCollection("Insurance");
                        var insuranceColl = insuranceCollection.find({
                            Id: {
                                $ne: null,
                            },
                        });
                        var sortedList = this._sortString(insuranceColl);
                        return sortedList;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getAllInsurancesByDataTypeId",
                    function getAllInsurancesByDataTypeId(dataTypeId) {
                        var offlineDb = this.OfflineStorage;
                        var insuranceCollection = offlineDb.getCollection("Insurance");
                        var insuranceColl = insuranceCollection.find({
                            dataTypeId: {
                                $eq: dataTypeId,
                            },
                        });
                        var sortedList = this._sortString(insuranceColl);
                        return sortedList;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "getQuestionTypeWithDataTypeId",
                    function getQuestionTypeWithDataTypeId(questionIds, questionGroupId) {
                        var offlineDb = localStorage.OfflineStorage;
                        var questionCollection = offlineDb.getCollection("Question");
                        var quesFields = questionCollection.data;
                        var distinctList = [];

                        for (var i = 0; i < quesFields.length; i++) {
                            var quesField = quesFields[i];
                            var exists = false;

                            for (var j = 0; j < distinctList.length; j++) {
                                var distItem = distinctList[j];
                                var distColType = distItem.columnType;
                                var distDataTypeId = distItem.dataTypeId;

                                if (
                                    distColType.indexOf(quesField.columnType) === 0 &&
                                    distDataTypeId.indexOf(quesField.dataTypeId) === 0
                                ) {
                                    exists = true;
                                }
                            }

                            if (exists === false) {
                                var colTyp = quesField.columnType;
                                var dataTyp = quesField.dataTypeId;
                                if (colTyp != null && dataTyp != null) {
                                    distinctList.push(quesField);
                                }
                            }
                        }

                        return distinctList;
                    }
                ),
                _defineProperty(
                    _localStorage,
                    "updateCustomerData",
                    function updateCustomerData(customerData) {
                        var offlineDb = localStorage.OfflineStorage;
                        var offlineDb = localStorage.OfflineStorage;
                        var customerCollection = offlineDb.getCollection("Customers");
                        var singleCustomerExists = customerCollection.findOne({
                            custId: {
                                $eq: customerData.CustomerId,
                            },
                        });
                        if (singleCustomerExists != null) {
                            singleCustomerExists.aiAssistanceGlobalLink =
                                customerData.AiAssistanceGlobalLink;
                            customerCollection.update(singleCustomerExists);
                        }
                        offlineDb.saveDatabase(function () {
                            //Stuff to do after the save to local storage.
                        });
                    }
                ),
                _localStorage);
        return localStorage;
    },
]);


/***/ }),

/***/ "./scripts/WebModule.js":
/*!******************************!*\
  !*** ./scripts/WebModule.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


///<reference path="../scripts/LocalStorageModule.js"
var app = angular.module('WebModule', ['restangular', 'ErrorMod', 'commonUtils']);
app.factory("$exceptionHandler", ['$injector', function ($injector) {
    return function (exception, cause) {
        var localStorageUtility = $injector.get('LocalStorageUtility')
        localStorageUtility.addExceptionToLogTable(exception, cause);
        var rScope = $injector.get('$rootScope');
        rScope.$broadcast('exceptionRefresh', exception, cause);
    };
}]);
/* Provider for restful services..*/

app.config(['RestangularProvider', 'errorLoggerProvider', function (RestangularProvider, errorLoggerProvider) {
    RestangularProvider.setRestangularFields({
        id: '_id'
    });
    RestangularProvider.setErrorInterceptor(function (response, deferred, responseHandler) {
        //Can be used for extra processing of error messages 
        //all of the restangular messages will be caught in this place.
        if (response.status == 401) {
            window.localStorage.removeItem('token');
        }
    });
}]);
app.run(['Restangular', 'AuthenticationService', '$state', 'AppMessages', '$ionicHistory', 'LoaderService', 'PopupUtil', '$cordovaNetwork', '$rootScope', 'ResetPoolUtil', 'LocalStorageUtility', 'ionicToast', function (Restangular, AuthenticationService, $state, AppMessages, $ionicHistory, LoaderService, PopupUtil, $cordovaNetwork, $rootScope, ResetPoolUtil, LocalStorageUtility, ionicToast) {
    function errorHandler(errorResponse) {
        function isDeviceOnline() {
            var isOnline = $cordovaNetwork.isOnline();
            var type = $cordovaNetwork.getNetwork();
            isOnline = isOnline === true || type === 'unknown';
            return isOnline;
        }

        function showError(url) {
            var errorBody = $rootScope.getResourceText("MSG_URL_NOT_FOUND");
            var errorHeader = $rootScope.getResourceText("LIT_MESSAGE");
            if (url) {
                errorHeader = $rootScope.getResourceText("LIT_MOBILE_ERROR") + $rootScope.getResourceText("LIT_MESSAGE");
                errorBody = $rootScope.getResourceText("MSG_MOBILE_URL_INVALID").replace("__Organization__", url);
            }
            AppMessages.Info(errorHeader, errorBody);
        }

        if (errorResponse.data === null) {
            var loaderPromise = LoaderService.hide();
            loaderPromise.then(function (sucess) {
                if (sucess) {
                    var isOnline = isDeviceOnline();
                    var status = errorResponse.status;

                    if (status === -1 || status === 404) {
                        if (isOnline) {
                            try {
                                if (errorResponse.config.url.includes("api/v1/user/details")) {
                                    var customerEnteredUrl = errorResponse.config.url
                                        .split("https://")[1]
                                        .split("/api/v1/user/details")[0];
                                    showError(customerEnteredUrl);
                                } else
                                    showError()
                            } catch (ex) {
                                showError();
                            }
                        }
                    } //Assumed to be a case where the user is tried to download a 
                    //module while the internet is in the disconnection phase So niether 
                    //an active connection nor inactive connection.


                    if (isOnline === false) {
                        AppMessages.Error($rootScope.getResourceText('LIT_ALERT'), $rootScope.getResourceText('MSG_CHECK_INTERNET_CONNECTION'));
                        // This is added if on resume event, if all the conditions are satisfied and is ready for download
                        // Removing the flag if any internet connection breaks in between 
                        var resumeProm = DeviceUtil.getKeyValueWithSharedPreferences("onResume");
                        resumeProm.then(function (fromResume) {
                            DeviceUtil.removeByKeySharedPreferences('onResume');
                        });
                    }
                }
            });
        } else {
            var errorCode = errorResponse.data.Code;
            var errorMessage = errorResponse.data.Message;
            var statusCode = errorResponse.status;
            var loaderPromise = LoaderService.hide();

            switch (statusCode) {
                case 401:
                case -1:
                    {
                        var customer = LocalStorageUtility.getCustomer(); //Fresh install and validation throws an error (deeplinks) check for custom numm and logout

                        var logout = true;

                        if (customer !== null) {
                            logout = customer.isPasswordSaveEnabled;
                        }

                        AuthenticationService.logout(logout);
                        $ionicHistory.nextViewOptions({
                            disableBack: true
                        });
                        ResetPoolUtil.resetPool();
                        $state.go('login');
                    }
                    break;

                case 404:
                    if (!errorCode) {
                        errorCode = $rootScope.getResourceText('LIT_MESSAGE');
                    }

                    errorMessage = $rootScope.getResourceText('MSG_URL_NOT_FOUND');
                    break;
                // This status code is for handling module access when it is removed. (Role change case - and some module is missing compared to existing)

                case 412:
                    if (!errorCode) {
                        errorCode = $rootScope.getResourceText('LIT_MESSAGE');
                    }

                    errorMessage = $rootScope.getResourceText('MSG_UPDATE_MODULE');
                    break;

                case 409:
                    if (!errorCode) {
                        errorCode = $rootScope.getResourceText('LIT_MESSAGE');
                    }

                    errorCode = $rootScope.getResourceText('MSG_MOBILE_PUBLISH_FAIL');
                    errorMessage = $rootScope.getResourceText('MSG_MOBILE_PUBLISH_FAIL');
                    break;

                default:
                    if (!errorCode) {
                        errorCode = $rootScope.getResourceText('LIT_MESSAGE');
                    }
                    if (!errorMessage) {
                        var message = $rootScope.getResourceText('MSG_URL_NOT_FOUND');
                        errorMessage = (message.split('.')[1]).trim();
                    }
                    console.log("Response received with HTTP error code: " + errorResponse.status);
                    break;
            }

            if (errorResponse.data.Code === "NoCPRFound") {
                errorCode = $rootScope.getResourceText('LIT_MESSAGE');
                errorMessage = $rootScope.getResourceText('MSG_MOBILE_CPR_ERROR');
            }

            if (errorResponse.data.Code === "RegistryError") {
                errorCode = $rootScope.getResourceText('LIT_MESSAGE');
                errorMessage = $rootScope.getResourceText('MSG_MOBILE_CPR_ERROR_FROM_REGISTRY');
            }

            loaderPromise.then(function (sucess) {
                if (sucess) {
                    AppMessages.Info(errorCode, errorMessage);
                }
            });
        }
    }

    Restangular.setErrorInterceptor(function (response) {
        errorHandler(response);
        return true; // do not stop the promise chain
    });
}]);
/*
 * QuestionnaireHelperService defines $resource, $q, MobileConfig.
 * @param are the included modules with thier respective parameters $resource, $q, MobileConfig. MobileConfig refers to constants set which can be globally defined.
 * @return the questionnaireHelperService scope which contain various methods to query to the WEB API . The Web API queried takes its base url from the MobileConfig.BaseUrl value,
 */

app.factory('QuestionnaireUtility', ['$q', '$http', 'Restangular', 'DeviceInfoUtil',
    '$injector', 'DeviceUtil', function ($q, $http, Restangular,
        DeviceInfoUtil, $injector, DeviceUtil) {
        var questionnaireHelperService = {
            _pool: {},
            getDeviceInfo: function getDeviceInfo() {
                var deviceInfo = DeviceInfoUtil.getAllDeviceInfo(); // Converting it to string and then assigning it to header section

                var encodedDeviceInfo = btoa(JSON.stringify(deviceInfo));
                this._pool['deviceInfo'] = encodedDeviceInfo;
                return encodedDeviceInfo;
            },
            getDeviceUUIDInfo: function getDeviceUUIDInfo() {
                var deviceInfo = DeviceInfoUtil.getAllDeviceInfo();
                var uuidInfo = deviceInfo.uuid; // Converting it to string and then assigning it to header section
                //var encodedUUIDInfo = btoa(JSON.stringify(uuidInfo));

                this._pool['uuid'] = uuidInfo;
                return uuidInfo;
            },
            getDeviceInfoFromPool: function getDeviceInfoFromPool() {
                var deviceInfo = this._pool['deviceInfo'];

                if (deviceInfo) {
                    return deviceInfo;
                } else {
                    return this.getDeviceInfo();
                }
            },
            getDeviceUUIDFromPool: function getDeviceUUIDFromPool() {
                var uuidInfo = this._pool['uuid'];

                if (uuidInfo) {
                    return uuidInfo;
                } else {
                    return this.getDeviceUUIDInfo();
                }
            },
            getPrefferedLanguage: function getPrefferedLanguage() {
                //var userDetailsManager = $injector.get('userDetailsManager');
                //var userDetails = userDetailsManager.getUserLastLoggedTimeStamp();
                //if (userDetails) {
                //    return userDetails.UserPreferredLanguage;
                //}
                return window.localStorage.getItem('userLanguage');
            },
            refreshCustomerDetails: function refreshCustomerDetails() {
                var pool = this._pool; // During URL validating, if success then Web API returns application and customer details.
                // Thus handling those details.

                var deviceInfo = this.getDeviceInfoFromPool();
                var uuidInfo = this.getDeviceUUIDFromPool();
                var prefferedLang = this.getPrefferedLanguage();
                var def = $q.defer();
                var promiseDeviceUtil = DeviceUtil.getKeyValueWithSharedPreferences('token');
                promiseDeviceUtil.then(function (token) {
                    Restangular.setDefaultHeaders({
                        'HSEQToken': token,
                        'DeviceInfo': deviceInfo,
                        'UUID': uuidInfo,
                        'Accept-Language': prefferedLang
                    });
                    var suiteDetails = Restangular.all('user').one('GetCustomer');
                    var customerApplicationDetailPromise = suiteDetails.get().then(function (successDetailsResponse) {
                        pool = successDetailsResponse;
                        def.resolve(successDetailsResponse);
                    }, function (errorDetailsResponse) {
                        def.reject(errorDetailsResponse);
                    });
                });
                return def;
            },
            // Added for deep link purpose. Based on the token passed customer details are returned
            getCustomerKeyDetails: function getCustomerKeyDetails(token) {
                var pool = this._pool; // During URL validating, if success then Web API returns application and customer details.
                // Thus handling those details.

                var deviceInfo = this.getDeviceInfoFromPool();
                var uuidInfo = this.getDeviceUUIDFromPool();
                var prefferedLang = this.getPrefferedLanguage();
                Restangular.setDefaultHeaders({
                    'HSEQToken': token,
                    'DeviceInfo': deviceInfo,
                    'UUID': uuidInfo,
                    'Accept-Language': prefferedLang
                });
                var suiteDetails = Restangular.all('user').one('GetCustomer');
                var def = $q.defer();
                var customerApplicationDetailPromise = suiteDetails.get().then(function (successDetailsResponse) {
                    pool = successDetailsResponse;
                    def.resolve(successDetailsResponse);
                }, function (errorDetailsResponse) {
                    def.reject(errorDetailsResponse);
                });
                return def;
            },
            // Purpose is to validate the URL formed based on the details entered in the ToggleURL screen and
            // also store the details sent during validation process.
            loadSuiteDetails: function loadSuiteDetails(cKey) {
                var pool = this._pool; // During URL validating, if success then Web API returns application and customer details.
                // Thus handling those details.
                function suiteHandler(deviceInfo, uuidInfo, prefferedLang, token, def) {
                    Restangular.setDefaultHeaders({
                        'HSEQToken': token,
                        'DeviceInfo': deviceInfo,
                        'UUID': uuidInfo,
                        'Accept-Language': prefferedLang
                    });
                    var suiteDetails = Restangular.all('suite').one('details/' + cKey);
                    var customerApplicationDetailPromise = suiteDetails.get().then(function (successDetailsResponse) {
                        pool = successDetailsResponse;
                        def.resolve(successDetailsResponse);
                    }, function (errorDetailsResponse) {
                        def.reject(errorDetailsResponse);
                    });
                }

                var deviceInfo = this.getDeviceInfoFromPool();
                var uuidInfo = this.getDeviceUUIDFromPool();
                var prefferedLang = this.getPrefferedLanguage();
                var def = $q.defer();
                var promiseDeviceUtil = DeviceUtil.getKeyValueWithSharedPreferences('token');
                promiseDeviceUtil.then(function (token) {
                    suiteHandler(deviceInfo, uuidInfo, prefferedLang, token, def);
                }).catch(function (error) {
                    suiteHandler(deviceInfo, uuidInfo, prefferedLang, null, def);
                });
                return def;
            },
            loadUserDetails: function loadUserDetails() {
                var pool = this._pool;
                var deviceInfo = this.getDeviceInfoFromPool();
                var uuidInfo = this.getDeviceUUIDFromPool();
                var prefferedLang = this.getPrefferedLanguage();
                var def = $q.defer();

                var promiseDeviceUtil = DeviceUtil.getKeyValueWithSharedPreferences('token');
                promiseDeviceUtil.then(function (token) {
                    Restangular.setDefaultHeaders({
                        'HSEQToken': token,
                        'DeviceInfo': deviceInfo,
                        'UUID': uuidInfo,
                        'Accept-Language': prefferedLang
                    });
                    var userDetails = Restangular.all('user').one('details/true');
                    var loadUserDetailsPromise = userDetails.get().then(function (successUserDetailResponse) {
                        pool = successUserDetailResponse;
                        def.resolve(successUserDetailResponse);
                    }, function (errorUserDetailResponse) {
                        def.reject(errorUserDetailResponse);
                    });
                });
                return def;
            },
            validateUser: function validateUser(userName, userPassword) {
                //Only method not called from Restangular uses basic $http service to connect to web api.
                //And hence error needs to be handled seperately will not be caught in 
                //the errorHandler in the run method defined above.
                var pool = this._pool;
                var deviceInfo = this.getDeviceInfoFromPool();
                var uuidInfo = this.getDeviceUUIDFromPool();
                var prefferedLang = this.getPrefferedLanguage();
                var url = Restangular.configuration.baseUrl + "/login";
                var def = $q.defer();
                var validatePromise = $http({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Authorization': 'Basic ' + btoa(userName + ":" + userPassword),
                        'DeviceInfo': deviceInfo,
                        'UUID': uuidInfo,
                        'Accept-Language': prefferedLang
                    }
                });
                validatePromise.then(function (successPayload) {
                    pool = successPayload.headers('HSEQToken');
                    def.resolve(successPayload);
                }, function (errorPayload) {
                    def.reject(errorPayload);
                });
                return def;
            },
            loadAllActionPlanWizardForProblem: function loadAllActionPlanWizardForProblem() {
                return this._loadAllActionPlanWizard('problem');
            },
            loadAllActionPlanWizardForActionPlan: function loadAllActionPlanWizardForActionPlan() {
                return this._loadAllActionPlanWizard('actionplan');
            },
            loadAllWizardForCase: function loadAllWizardForCase(moduleName) {
                var pool = this._pool; //By defination $resource returns a promise which can then be furthur resolved.
                var def = $q.defer();
                var deviceInfo = this.getDeviceInfoFromPool();
                var uuidInfo = this.getDeviceUUIDFromPool();
                var prefferedLang = this.getPrefferedLanguage();
                var promiseDeviceUtil = DeviceUtil.getKeyValueWithSharedPreferences('token');
                promiseDeviceUtil.then(function (token) {
                    Restangular.setDefaultHeaders({
                        'HSEQToken': token,
                        'DeviceInfo': deviceInfo,
                        'UUID': uuidInfo,
                        'Accept-Language': prefferedLang
                    });
                    var resourceCase = Restangular.all('case').one(moduleName);
                    resourceCase.get().then(function (successJsonResponse) {
                        def.resolve(successJsonResponse);
                    }, function (errorResponse) {
                        //If the promise is un-successfull the $q.reject method will be used.
                        def.reject(errorResponse);
                    });
                });
                return def;
            },
            _loadAllActionPlanWizard: function _loadAllActionPlanWizard(appArea) {
                // var token = window.localStorage.getItem('token');
                var def = $q.defer();
                var pool = this._pool; //By defination $resource returns a promise which can then be furthur resolved.
                var deviceInfo = this.getDeviceInfoFromPool();
                var uuidInfo = this.getDeviceUUIDFromPool();
                var prefferedLang = this.getPrefferedLanguage();

                var promiseDeviceUtil = DeviceUtil.getKeyValueWithSharedPreferences('token');
                promiseDeviceUtil.then(function (token) {
                    Restangular.setDefaultHeaders({
                        'HSEQToken': token,
                        'DeviceInfo': deviceInfo,
                        'UUID': uuidInfo,
                        'Accept-Language': prefferedLang
                    });
                    var resourceActionPlanWizard = Restangular.all('registration').one(appArea);
                    resourceActionPlanWizard.get().then(function (successJsonResponse) {
                        def.resolve(successJsonResponse);
                    }, function (errorResponse) {
                        //If the promise is un-successfull the $q.reject method will be used.
                        def.reject(errorResponse);
                    });
                });
                return def;
            },
            loadAllQuestionnaires: function loadAllQuestionnaires(moduleName) {
                var def = $q.defer();
                // var token = window.localStorage.getItem('token');
                var pool = this._pool; //By defination $resource returns a promise which can then be furthur resolved.
                var deviceInfo = this.getDeviceInfoFromPool();
                var uuidInfo = this.getDeviceUUIDFromPool();
                var prefferedLang = this.getPrefferedLanguage();
                var promiseDeviceUtil = DeviceUtil.getKeyValueWithSharedPreferences('token');
                promiseDeviceUtil.then(function (token) {
                    Restangular.setDefaultHeaders({
                        'HSEQToken': token,
                        'DeviceInfo': deviceInfo,
                        'UUID': uuidInfo,
                        'Accept-Language': prefferedLang
                    });
                    var resourceQuestionnaire = Restangular.all('questionnaire').one(moduleName);
                    var loadAllQuestionnairesPromise = resourceQuestionnaire.get().then(function (successJsonResponse) {
                        pool = successJsonResponse;
                        def.resolve(successJsonResponse);
                        return successJsonResponse;
                    }, function (errorResponse) {
                        //If the promise is un-successfull the $q.reject method will be used.
                        def.reject(errorResponse);
                    });
                });
                return def;
            },
            loadAllDocumentLibrary: function loadAllDocumentLibrary(moduleName) {
                //var token = window.localStorage.getItem('token');
                var pool = this._pool; //By defination $resource returns a promise which can then be furthur resolved.

                var deviceInfo = this.getDeviceInfoFromPool();
                var uuidInfo = this.getDeviceUUIDFromPool();
                var prefferedLang = this.getPrefferedLanguage();
                var def = $q.defer();

                var promiseDeviceUtil = DeviceUtil.getKeyValueWithSharedPreferences('token');
                promiseDeviceUtil.then(function (token) {
                    Restangular.setDefaultHeaders({
                        'HSEQToken': token,
                        'DeviceInfo': deviceInfo,
                        'UUID': uuidInfo,
                        'Accept-Language': prefferedLang
                    });
                    var downloadDocument = Restangular.all('document').one(moduleName);
                    downloadDocument.get().then(function (successJsonResponse) {
                        def.resolve(successJsonResponse);
                    }, function (errorResponse) {
                        //If the promise is un-successfull the $q.reject method will be used.
                        def.reject(errorResponse);
                    });
                });
                return def;
            },
            postPersonQuestionnaire: function postPersonQuestionnaire(pq, moduleName) {
                //var token = window.localStorage.getItem('token'); //By defination $resource returns a promise which can then be furthur resolved.

                var deviceInfo = this.getDeviceInfoFromPool();
                var uuidInfo = this.getDeviceUUIDFromPool();
                var prefferedLang = this.getPrefferedLanguage();
                var def = $q.defer();

                var promiseDeviceUtil = DeviceUtil.getKeyValueWithSharedPreferences('token');
                promiseDeviceUtil.then(function (token) {
                    Restangular.setDefaultHeaders({
                        'HSEQToken': token,
                        'DeviceInfo': deviceInfo,
                        'UUID': uuidInfo,
                        'Accept-Language': prefferedLang
                    });
                    var resourceQuestionnaire = Restangular.all('questionnaire/' + moduleName);

                    var postPromise = resourceQuestionnaire.post(pq);
                    postPromise.then(function (data) {
                        def.resolve(data);
                    }, function (error) {
                        def.reject(error);
                    });
                });
                return def.promise;
            },
            postPersonActionPlanWizard: function postPersonActionPlanWizard(pApw) {
                // var token = window.localStorage.getItem('token'); //By defination $resource returns a promise which can then be furthur resolved.

                var deviceInfo = this.getDeviceInfoFromPool();
                var uuidInfo = this.getDeviceUUIDFromPool();
                var prefferedLang = this.getPrefferedLanguage();
                var def = $q.defer();

                var promiseDeviceUtil = DeviceUtil.getKeyValueWithSharedPreferences('token');
                promiseDeviceUtil.then(function (token) {
                    Restangular.setDefaultHeaders({
                        'HSEQToken': token,
                        'DeviceInfo': deviceInfo,
                        'UUID': uuidInfo,
                        'Accept-Language': prefferedLang
                    }); //Post with problem or action plan sending the entire request and then based on the 
                    //typecode perform a save that is decide whether problem/actionplan

                    var resourceApw = Restangular.all('registration/actionplan');
                    var postPromise = resourceApw.post(pApw);
                    postPromise.then(function (data) {
                        def.resolve(data);
                    }, function (error) {
                        def.reject(error);
                    });
                });
                return def.promise;
            },
            postPersonAskadeWizard: function postPersonAskadeWizard(pAkEntity) {
                // var token = window.localStorage.getItem('token');
                var deviceInfo = this.getDeviceInfoFromPool();
                var uuidInfo = this.getDeviceUUIDFromPool();
                var prefferedLang = this.getPrefferedLanguage();
                var def = $q.defer();

                var promiseDeviceUtil = DeviceUtil.getKeyValueWithSharedPreferences('token');
                promiseDeviceUtil.then(function (token) {
                    Restangular.setDefaultHeaders({
                        'HSEQToken': token,
                        'DeviceInfo': deviceInfo,
                        'UUID': uuidInfo,
                        'Accept-Language': prefferedLang
                    }); //Posting a person askade wizard.

                    var postAk = Restangular.all('case/askade');
                    var postPromise = postAk.post(pAkEntity);
                    postPromise.then(function (data) {
                        def.resolve(data);
                    }, function (error) {
                        def.reject(error);
                    });
                });

                return def.promise;
            },
            postPersonClaimWizard: function postPersonClaimWizard(pClaimEntity) {
                // var token = window.localStorage.getItem('token');
                var deviceInfo = this.getDeviceInfoFromPool();
                var uuidInfo = this.getDeviceUUIDFromPool();
                var prefferedLang = this.getPrefferedLanguage();
                var def = $q.defer();

                var promiseDeviceUtil = DeviceUtil.getKeyValueWithSharedPreferences('token');
                promiseDeviceUtil.then(function (token) {
                    Restangular.setDefaultHeaders({
                        'HSEQToken': token,
                        'DeviceInfo': deviceInfo,
                        'UUID': uuidInfo,
                        'Accept-Language': prefferedLang
                    }); //Posting a person claim wizard.

                    var postClaim = Restangular.all('case/claim');
                    var postPromise = postClaim.post(pClaimEntity);
                    postPromise.then(function (data) {
                        def.resolve(data);
                    }, function (error) {
                        def.reject(error);
                    });
                });
                return def.promise;
            },
            // This method interacts makes a call to Web API to know if a user token is valid or not
            // This method is called before making an actual request to Web API.
            validateToken: function validateToken() {
                var def = $q.defer();
                var deviceInfo = this.getDeviceInfoFromPool();
                var uuidInfo = this.getDeviceUUIDFromPool();
                var prefferedLang = this.getPrefferedLanguage();
                var promiseDeviceUtil = DeviceUtil.getKeyValueWithSharedPreferences('token');
                promiseDeviceUtil.then(function (token) {
                    try {
                        Restangular.setDefaultHeaders({
                            'HSEQToken': token,
                            'DeviceInfo': deviceInfo,
                            'UUID': uuidInfo,
                            'Accept-Language': prefferedLang
                        });
                        var validateHSEQToken = Restangular.all('user').one('validatetoken');
                        validateHSEQToken.get().then(function (validToken) {
                            def.resolve(true);
                        }, function (inValidToken) {
                            def.reject(false);
                        }, function (errNew) {
                            console.log(errNew);
                        });
                    } catch (e) {
                        console.log(e);
                        def.reject(false);
                    }
                });
                return def.promise;
            },
            getDropDownValuesDetails: function getDropDownValuesDetails(firstParam, dropDownType, appArea, searchText) {
                var pool = this._pool;
                var deviceInfo = this.getDeviceInfoFromPool();
                var uuidInfo = this.getDeviceUUIDFromPool();
                var prefferedLang = this.getPrefferedLanguage();
                var def = $q.defer();

                var promiseDeviceUtil = DeviceUtil.getKeyValueWithSharedPreferences('token');
                promiseDeviceUtil.then(function (token) {
                    Restangular.setDefaultHeaders({
                        'HSEQToken': token,
                        'DeviceInfo': deviceInfo,
                        'UUID': uuidInfo,
                        'Accept-Language': prefferedLang
                    });
                    var userDetails = Restangular.all(firstParam).one(dropDownType + '/' + appArea + '/' + searchText);
                    var loadUserDetailsPromise = userDetails.get().then(function (successUserDetailResponse) {
                        def.resolve(successUserDetailResponse);
                    }, function (errorUserDetailResponse) {
                        def.reject(errorUserDetailResponse);
                    });
                });
                return def;
            },
            getAssetLinkedDocumentData: function getAssetLinkedDocumentData(moduleName, scannedCode) {
                var pool = this._pool;
                var deviceInfo = this.getDeviceInfoFromPool();
                var uuidInfo = this.getDeviceUUIDFromPool();
                var prefferedLang = this.getPrefferedLanguage();
                var def = $q.defer();

                var promiseDeviceUtil = DeviceUtil.getKeyValueWithSharedPreferences('token');
                promiseDeviceUtil.then(function (token) {
                    Restangular.setDefaultHeaders({
                        'HSEQToken': token,
                        'DeviceInfo': deviceInfo,
                        'UUID': uuidInfo,
                        'Accept-Language': prefferedLang
                    });
                    var userDetails = Restangular.all(moduleName + "/document2user/list").one(scannedCode);
                    var loadUserDetailsPromise = userDetails.get().then(function (successUserDetailResponse) {
                        def.resolve(successUserDetailResponse);
                    }, function (errorUserDetailResponse) {
                        def.reject(errorUserDetailResponse);
                    });
                });
                return def;
            },
            postDocumentSign: function postDocumentSign(moduleName, docSign) {
                var deviceInfo = this.getDeviceInfoFromPool();
                var uuidInfo = this.getDeviceUUIDFromPool();
                var prefferedLang = this.getPrefferedLanguage();
                var def = $q.defer();

                var promiseDeviceUtil = DeviceUtil.getKeyValueWithSharedPreferences('token');
                promiseDeviceUtil.then(function (token) {
                    Restangular.setDefaultHeaders({
                        'HSEQToken': token,
                        'DeviceInfo': deviceInfo,
                        'UUID': uuidInfo,
                        'Accept-Language': prefferedLang
                    });
                    var resourceDocument = Restangular.all(moduleName + '/document2user/sign');

                    var postPromise = resourceDocument.post(docSign);
                    postPromise.then(function (data) {
                        def.resolve(data);
                    }, function (error) {
                        def.reject(error);
                    });
                });
                return def.promise;
            },
            uploadErrorLogData: function uploadErrorLogData(errorData) {
                var deviceInfo = this.getDeviceInfoFromPool();
                var uuidInfo = this.getDeviceUUIDFromPool();
                var prefferedLang = this.getPrefferedLanguage();
                var def = $q.defer();
                var promList = [];
                var promiseDeviceUtil = DeviceUtil.getKeyValueWithSharedPreferences('token');

                promiseDeviceUtil.then(function (token) {
                    Restangular.setDefaultHeaders({
                        'HSEQToken': token,
                        'DeviceInfo': deviceInfo,
                        'UUID': uuidInfo,
                        'Accept-Language': prefferedLang
                    });

                    for (var i = 0; i < errorData.length; i++) {
                        var error = errorData[i];
                        var context = 'Name: ' + error.name + ' - Message: ' + error.message;
                        var details = 'InternalCause: ' + error.internalCause + ' - Stack: ' +
                            error.stack + 'ToString: ' + error.toStringValue + 'ExternalCause: ' + error.externalCause;
                        var logDateTime = new Date(error.meta.created).toString();
                        var errorDataWrapper = { Context: context, Details: details, LogDateTime: logDateTime };
                        var uploadErrorLogResource = Restangular.all('user/logerror');
                        var postPromise = uploadErrorLogResource.post(errorDataWrapper);
                        promList.push(postPromise);
                    }
                });
                return promList;
            },
            getNewsDetails: function getNewsDetails() {
                // var token = window.localStorage.getItem('token');
                var pool = this._pool; //By defination $resource returns a promise which can then be furthur resolved.

                var deviceInfo = this.getDeviceInfoFromPool();
                var uuidInfo = this.getDeviceUUIDFromPool();
                var prefferedLang = this.getPrefferedLanguage();
                var def = $q.defer();

                var promiseDeviceUtil = DeviceUtil.getKeyValueWithSharedPreferences('token');
                promiseDeviceUtil.then(function (token) {
                    Restangular.setDefaultHeaders({
                        'HSEQToken': token,
                        'DeviceInfo': deviceInfo,
                        'UUID': uuidInfo,
                        'Accept-Language': prefferedLang
                    });
                    var downloadNews = Restangular.all('news').one('list');
                    downloadNews.get().then(function (successJsonResponse) {
                        def.resolve(successJsonResponse);
                    }, function (errorResponse) {
                        //If the promise is un-successfull the $q.reject method will be used.
                        def.reject(errorResponse);
                    });
                });
                return def;
            },
            getBothNewsDetails: function getBothNewsDetails() {
                // var token = window.localStorage.getItem('token');
                var pool = this._pool; //By defination $resource returns a promise which can then be furthur resolved.
                var deviceInfo = this.getDeviceInfoFromPool();
                var uuidInfo = this.getDeviceUUIDFromPool();
                var prefferedLang = this.getPrefferedLanguage();
                var def = $q.defer();

                var promiseDeviceUtil = DeviceUtil.getKeyValueWithSharedPreferences('token');
                promiseDeviceUtil.then(function (token) {
                    Restangular.setDefaultHeaders({
                        'HSEQToken': token,
                        'DeviceInfo': deviceInfo,
                        'UUID': uuidInfo,
                        'Accept-Language': prefferedLang
                    });
                    var downloadNews = Restangular.all('news').one(false);
                    var downloadExternalNews = Restangular.all('news').one(true);
                    var newsList = [];

                    downloadNews.get().then(function (successJsonResponse) {
                        var news = {
                            'news': successJsonResponse,
                            'isRSSFeed': false
                        };
                        newsList.push(news);
                        downloadExternalNews.get().then(function (successResponse) {
                            var externalNews = {
                                'news': successResponse,
                                'isRSSFeed': true
                            };
                            newsList.push(externalNews);
                            def.resolve(newsList);
                        }, function (errResponse) {
                            def.reject(errResponse);
                        });
                    }, function (errorResponse) {
                        //If the promise is un-successfull the $q.reject method will be used.
                        def.reject(errorResponse);
                    });
                });
                return def;
            },
            reset: function reset() {
                this._pool = {};
            }
        };
        return questionnaireHelperService;
    }]);


/***/ }),

/***/ "./scripts/errorModule.js":
/*!********************************!*\
  !*** ./scripts/errorModule.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var app = angular.module('ErrorMod', []);
  app.provider('errorLogger', function ErrorLoggerProvider() {
    this.$get = ["$injector", function ($injector) {
      return function (exception, cause) {
        var rScope = $injector.get('$rootScope');
        rScope.$broadcast('exception', exception, cause);
      };
    }];
  });
  app.factory('AppMessages', ['PopupUtil', function (PopupUtil) {
    //Single app messages scope with multiple methods for displaying Info call 
    //Info method this should be appended with a image representing an Info similarly an 
    //Error should be shown with a error logo.
    var appMessageScope = {
      Info: function Info(title, message) {
        PopupUtil.hide();
        PopupUtil.alert(title, message);
      },
      Error: function Error(title, message) {
        PopupUtil.hide();
        PopupUtil.alert(title, message);
      },
      Warning: function Warning(title, message) {
        PopupUtil.hide();
        PopupUtil.alert(title, message);
      }
    };
    return appMessageScope;
  }]);
  app.factory('ErrorLogger', ['$rootScope', 'PopupUtil', function ($rootScope, PopupUtil) {
    var errorScope = {
      data: {},
      processError: function processError(errorResponse) {
        var message = 'An unexpected error occured !';
        var data = errorResponse.data;

        if (data != null) {
          message = data.Message;
        }

        $rootScope.$emit('Error', {
          Message: message
        });
      },
      processMessage: function processMessage(title, text) {
        //To be replaced with popuputil todo..
        errorScope.processError({
          data: {
            Message: text
          }
        });
      }
    };
    return errorScope;
  }]);
})();


/***/ }),

/***/ 1:
/*!*****************************************************************************************************************************!*\
  !*** multi ./scripts/errorModule.js ./scripts/WebModule.js ./scripts/LocalStorageModule.js ./scripts/LocalStorageHelper.js ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./scripts/errorModule.js */"./scripts/errorModule.js");
__webpack_require__(/*! ./scripts/WebModule.js */"./scripts/WebModule.js");
__webpack_require__(/*! ./scripts/LocalStorageModule.js */"./scripts/LocalStorageModule.js");
module.exports = __webpack_require__(/*! ./scripts/LocalStorageHelper.js */"./scripts/LocalStorageHelper.js");


/***/ })

/******/ });
//# sourceMappingURL=libapp.bundle.js.map