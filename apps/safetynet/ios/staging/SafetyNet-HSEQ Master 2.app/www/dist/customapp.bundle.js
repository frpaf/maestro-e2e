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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./scripts/app/app.js":
/*!****************************!*\
  !*** ./scripts/app/app.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    var app = angular.module("main", [
        "ionic",
        "ionic.native",
        "ngCordova",
        "questionnaire",
        "actionPlan",
        "commonUtils",
        "ui.router",
        "ionic-datepicker",
        "EntityUtils",
        "documentLibrary",
        "askade",
    ]);
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
    app
        .config([
            "$stateProvider",
            "$urlRouterProvider",
            "$compileProvider",
            "$ionicConfigProvider",
            function (
                $stateProvider,
                $urlRouterProvider,
                $compileProvider,
                $ionicConfigProvider
            ) {
                //Sample Hello world !!
                $ionicConfigProvider.views.swipeBackEnabled(false);
                $compileProvider.debugInfoEnabled(false);
                $stateProvider
                    .state("welcome", {
                        url: "/welcome",
                        templateUrl: "templates/guides/welcome/welcome.html",
                        controller: "guideController",
                    })
                    .state("screen", {
                        url: "/screen",
                        templateUrl: "templates/guides/welcome/screen.html",
                        controller: "guideController",
                    })
                    .state("toggleUrl", {
                        url: "/toggleUrl:isFromLogin",
                        templateUrl: "templates/toggleUrl.html",
                        controller: "toggleUrlController",
                    })
                    .state("login", {
                        url: "/login",
                        templateUrl: "templates/login.html",
                        controller: "loginController",
                    })
                    .state("app", {
                        url: "/app",
                        templateUrl: "templates/mainMenu.html",
                        controller: "sideMenuController",
                    })
                    .state("sideapp", {
                        url: "/sideapp",
                        templateUrl: "templates/favourite_guide/favouriteslideloader.html",
                        controller: "guideController",
                    })
                    .state("app.home", {
                        url: "/home",
                        views: {
                            menuContent: {
                                templateUrl: "templates/home.html",
                                controller: "homeController",
                            },
                        },
                    })
                    .state("app.news", {
                        url: "/news:id",
                        views: {
                            menuContent: {
                                templateUrl: "templates/news/news.html",
                                controller: "newsController",
                            },
                        },
                    })
                    .state("app.favorite", {
                        url: "/favorite",
                        views: {
                            menuContent: {
                                templateUrl: "templates/favorite.html",
                                controller: "favoriteController",
                            },
                        },
                    })
                    .state("app.akwTabs", {
                        url: "/akwTabs:viewTitle:type:modColor",
                        views: {
                            menuContent: {
                                templateUrl: "templates/askade_templates/askadeTabs.html",
                                controller: [
                                    "$scope",
                                    "$stateParams",
                                    "userApplicationsManager",
                                    "userDetailsManager",
                                    function controller(
                                        $scope,
                                        $stateParams,
                                        userApplicationsManager,
                                        userDetailsManager
                                    ) {
                                        $scope.title = $stateParams.viewTitle;
                                        $scope.tabBgColor = $stateParams.modColor;
                                        $scope.moduleName = $stateParams.type;
                                        var userProfile =
                                            userDetailsManager.getUserLastLoggedTimeStamp();
                                        $scope.applicationDetails =
                                            userApplicationsManager.getUserApplicationByText(
                                                userProfile.UserId,
                                                $scope.moduleName
                                            );

                                        $scope.checkClassExists = function (tabId) {
                                            var tabElement = angular.element(
                                                document.querySelector("#" + tabId)
                                            );
                                            var classExisting = tabElement.hasClass("active");
                                            return classExisting;
                                        };
                                    },
                                ],
                            },
                        },
                    })
                    .state("app.akwTabs.active", {
                        url: "/active:typeCode:viewTitle",
                        views: {
                            "active-tab": {
                                templateUrl: "templates/askade_templates/askadeList.html",
                                controller: "askadeListController",
                            },
                        },
                    })
                    .state("app.akwTabs.inProgress", {
                        url: "/inProgress:typeCode:viewTitle",
                        views: {
                            "inProgress-tab": {
                                templateUrl: "templates/askade_templates/inProgress.html",
                                controller: "askadeListController",
                            },
                        },
                    })
                    .state("app.akwTabs.completed", {
                        url: "/completed:typeCode:viewTitle",
                        views: {
                            "completed-tab": {
                                templateUrl: "templates/askade_templates/completed.html",
                                controller: "askadeListController",
                            },
                        },
                    })
                    .state("app.askade", {
                        url: "/askade:id:state:viewTitle:modColor",
                        views: {
                            menuContent: {
                                templateUrl: "templates/askade_templates/askadeTemplate.html",
                                controller: "askadeController",
                            },
                        },
                    })
                    .state("app.surveyTabs", {
                        url: "/surveyTabs:viewTitle:date",
                        views: {
                            menuContent: {
                                templateUrl: "templates/survey/survey.html",
                                controller: "surveyController",
                            }
                        }
                    })
                    .state("app.surveyTabs.active", {
                        url: "/active",
                        views: {
                            "active-tab": {
                                templateUrl: "templates/survey/activeSurvey.html",
                                controller: "surveyController",
                            }
                        }
                    })
                    .state("app.surveyTabs.history", {
                        url: "/history",
                        views: {
                            "history-tab": {
                                templateUrl: "templates/survey/surveyHistory.html",
                                controller: "surveyController",
                            }
                        }
                    })
                    .state("app.qTabs", {
                        url: "/qTabs:viewTitle:type:modColor:date",
                        views: {
                            menuContent: {
                                templateUrl: "templates/questionnaire/questionnaireTabs.html",
                                controller: [
                                    "$scope",
                                    "$stateParams",
                                    "userApplicationsManager",
                                    "userDetailsManager",
                                    function controller(
                                        $scope,
                                        $stateParams,
                                        userApplicationsManager,
                                        userDetailsManager
                                    ) {
                                        $scope.title = $stateParams.viewTitle;
                                        $scope.tabBgColor = $stateParams.modColor;
                                        $scope.moduleName = $stateParams.type;
                                        $scope.date = $stateParams.date;
                                        var userProfile =
                                            userDetailsManager.getUserLastLoggedTimeStamp();
                                        $scope.applicationDetails =
                                            userApplicationsManager.getUserApplicationByText(
                                                userProfile.UserId,
                                                $scope.moduleName
                                            );

                                        $scope.checkClassExists = function (tabId) {
                                            var tabElement = angular.element(
                                                document.querySelector("#" + tabId)
                                            );
                                            var classExisting = tabElement.hasClass("active");
                                            return classExisting;
                                        };
                                    },
                                ],
                            },
                        },
                    })
                    .state("app.startScreen", {
                        url: "/startScreen:id:state:viewTitle:modColor:date",
                        views: {
                            menuContent: {
                                templateUrl: "templates/questionnaire/startScreen.html",
                                controller: "startScreenController",
                            },
                        },
                    })
                    .state("app.qTabs.active", {
                        url: "/active:viewTitle:type",
                        views: {
                            "active-tab": {
                                templateUrl: "templates/questionnaireList.html",
                                controller: "questionnaireListController",
                            },
                        },
                    })
                    .state("app.qTabs.inProgress", {
                        url: "/inProgress:viewTitle:type",
                        views: {
                            "inProgress-tab": {
                                templateUrl: "templates/questionnaire/inprogress.html",
                                controller: "questionnaireListController",
                            },
                        },
                    })
                    .state("app.qTabs.completed", {
                        url: "/completed:viewTitle:type",
                        views: {
                            "completed-tab": {
                                templateUrl: "templates/questionnaire/completed.html",
                                controller: "questionnaireListController",
                            },
                        },
                    })
                    .state("app.apwTabs", {
                        url: "/apwTabs:viewTitle:type:modColor",
                        views: {
                            menuContent: {
                                templateUrl:
                                    "templates/actionplan_templates/actionPlanWizardTabs.html",
                                controller: [
                                    "$scope",
                                    "$stateParams",
                                    "userApplicationsManager",
                                    "userDetailsManager",
                                    function controller(
                                        $scope,
                                        $stateParams,
                                        userApplicationsManager,
                                        userDetailsManager
                                    ) {
                                        $scope.moduleName = $stateParams.type;
                                        $scope.title = $stateParams.viewTitle;
                                        $scope.tabBgColor = $stateParams.modColor;
                                        var userProfile =
                                            userDetailsManager.getUserLastLoggedTimeStamp();
                                        $scope.applicationDetails =
                                            userApplicationsManager.getUserApplicationByText(
                                                userProfile.UserId,
                                                $scope.moduleName
                                            );

                                        $scope.checkClassExists = function (tabId) {
                                            var tabElement = angular.element(
                                                document.querySelector("#" + tabId)
                                            );
                                            var classExisting = tabElement.hasClass("active");
                                            return classExisting;
                                        };
                                    },
                                ],
                            },
                        },
                    })
                    .state("app.apwTabs.active", {
                        url: "/active:typeCode:viewTitle",
                        views: {
                            "active-tab": {
                                templateUrl: "templates/actionPlanList.html",
                                controller: "actionPlanListController",
                            },
                        },
                    })
                    .state("app.apwTabs.inProgress", {
                        url: "/inProgress:typeCode:viewTitle",
                        views: {
                            "inProgress-tab": {
                                templateUrl: "templates/actionplan_templates/inprogress.html",
                                controller: "actionPlanListController",
                            },
                        },
                    })
                    .state("app.apwTabs.completed", {
                        url: "/completed:typeCode:viewTitle",
                        views: {
                            "completed-tab": {
                                templateUrl: "templates/actionplan_templates/completed.html",
                                controller: "actionPlanListController",
                            },
                        },
                    })
                    .state("app.myProfile", {
                        url: "/myProfile",
                        views: {
                            menuContent: {
                                templateUrl: "templates/myProfile.html",
                            },
                        },
                    })
                    .state("app.apv", {
                        url: "/apv:id:state:pov:viewTitle:modColor:date",
                        views: {
                            menuContent: {
                                templateUrl:
                                    "templates/questionnaire/questionnaireTemplate.html",
                                controller: "questionController",
                            },
                        },
                    })
                    .state("app.riskProfile", {
                        url: "/riskProfile:id:state:pov:viewTitle:date",
                        views: {
                            menuContent: {
                                templateUrl:
                                    "templates/questionnaire/questionnaireTemplate.html",
                                controller: "questionController",
                            },
                        },
                    })
                    .state("app.employeeSatisfaction", {
                        url: "/employeeSatisfaction:id:state:pov:viewTitle:date",
                        views: {
                            menuContent: {
                                templateUrl:
                                    "templates/questionnaire/questionnaireTemplate.html",
                                controller: "questionController",
                            },
                        },
                    })
                    .state("app.managementEvaluation", {
                        url: "/managementEvaluation:id:state:pov:viewTitle:date",
                        views: {
                            menuContent: {
                                templateUrl:
                                    "templates/questionnaire/questionnaireTemplate.html",
                                controller: "questionController",
                            },
                        },
                    })
                    .state("app.planOfAction", {
                        url: "/planOfAction:id:state:viewTitle:modColor",
                        views: {
                            menuContent: {
                                templateUrl:
                                    "templates/actionplan_templates/actionplanTemplate.html",
                                controller: "actionPlanController",
                            },
                        },
                    })
                    .state("app.administration", {
                        url: "/administration:viewTitle",
                        views: {
                            menuContent: {
                                templateUrl:
                                    "templates/administration_templates/administration.html",
                                controller: [
                                    "$scope",
                                    "$stateParams",
                                    function controller($scope, $stateParams) {
                                        $scope.title = $stateParams.viewTitle;
                                    },
                                ],
                            },
                        },
                    })
                    .state("app.humanResource", {
                        url: "/humanResource:id:state:pov:viewTitle:date",
                        views: {
                            menuContent: {
                                templateUrl:
                                    "templates/questionnaire/questionnaireTemplate.html",
                                controller: "questionController",
                            },
                        },
                    })
                    .state("app.claimTabs", {
                        url: "/claimTabs:viewTitle:type:modColor",
                        views: {
                            menuContent: {
                                templateUrl: "templates/claim/claimTabs.html",
                                controller: [
                                    "$scope",
                                    "$stateParams",
                                    "userApplicationsManager",
                                    "userDetailsManager",
                                    function controller(
                                        $scope,
                                        $stateParams,
                                        userApplicationsManager,
                                        userDetailsManager
                                    ) {
                                        $scope.title = $stateParams.viewTitle;
                                        $scope.tabBgColor = $stateParams.modColor;
                                        $scope.moduleName = $stateParams.type;
                                        var userProfile =
                                            userDetailsManager.getUserLastLoggedTimeStamp();
                                        $scope.applicationDetails =
                                            userApplicationsManager.getUserApplicationByText(
                                                userProfile.UserId,
                                                $scope.moduleName
                                            );

                                        $scope.checkClassExists = function (tabId) {
                                            var tabElement = angular.element(
                                                document.querySelector("#" + tabId)
                                            );
                                            var classExisting = tabElement.hasClass("active");
                                            return classExisting;
                                        };
                                    },
                                ],
                            },
                        },
                    })
                    .state("app.claimTabs.active", {
                        url: "/active:typeCode:viewTitle",
                        views: {
                            "active-tab": {
                                templateUrl: "templates/askade_templates/askadeList.html",
                                controller: "askadeListController",
                            },
                        },
                    })
                    .state("app.claimTabs.inProgress", {
                        url: "/inProgress:typeCode:viewTitle",
                        views: {
                            "inProgress-tab": {
                                templateUrl: "templates/askade_templates/inProgress.html",
                                controller: "askadeListController",
                            },
                        },
                    })
                    .state("app.claimTabs.completed", {
                        url: "/completed:typeCode:viewTitle",
                        views: {
                            "completed-tab": {
                                templateUrl: "templates/askade_templates/completed.html",
                                controller: "askadeListController",
                            },
                        },
                    })
                    .state("app.claim", {
                        url: "/claim:id:state:viewTitle:modColor",
                        views: {
                            menuContent: {
                                templateUrl: "templates/askade_templates/askadeTemplate.html",
                                controller: "askadeController",
                            },
                        },
                    })
                    .state("app.documentLibrary", {
                        url: "/docummentLibrary:viewTitle:type:modColor:groupName",
                        views: {
                            menuContent: {
                                templateUrl:
                                    "templates/documentLibrary_templates/documentLibraryList.html",
                                controller: "documentLibraryListController",
                            },
                        },
                    }) // Preview related state values
                    .state("app.questionnairePV", {
                        url: "/questionnairePV:id:viewTitle",
                        views: {
                            menuContent: {
                                templateUrl:
                                    "templates/preview_templates/questionnaire/questionnairePreview.html",
                                controller: "questionController",
                            },
                        },
                    })
                    .state("app.planOfActionPV", {
                        url: "/planOfActionPV:id:viewTitle",
                        views: {
                            menuContent: {
                                templateUrl:
                                    "templates/preview_templates/actionPlan/actionPlanPreview.html",
                                controller: "actionPlanController",
                            },
                        },
                    })
                    .state("app.askadePV", {
                        url: "/askadePV:id:viewTitle",
                        views: {
                            menuContent: {
                                templateUrl:
                                    "templates/preview_templates/askade/askadePreview.html",
                                controller: "askadeController",
                            },
                        },
                    })
                    .state("app.rTabs", {
                        url: "/rTabs:viewTitle:type:modColor:date",
                        views: {
                            menuContent: {
                                templateUrl:
                                    "templates/riskProfile_templates/riskProfileTabs.html",
                                controller: [
                                    "$scope",
                                    "$stateParams",
                                    "userApplicationsManager",
                                    "userDetailsManager",
                                    function controller(
                                        $scope,
                                        $stateParams,
                                        userApplicationsManager,
                                        userDetailsManager
                                    ) {
                                        $scope.title = $stateParams.viewTitle;
                                        $scope.tabBgColor = $stateParams.modColor;
                                        $scope.moduleName = $stateParams.type;
                                        $scope.date = $stateParams.date;
                                        var userProfile =
                                            userDetailsManager.getUserLastLoggedTimeStamp();
                                        $scope.applicationDetails =
                                            userApplicationsManager.getUserApplicationByText(
                                                userProfile.UserId,
                                                $scope.moduleName
                                            );

                                        $scope.checkClassExists = function (tabId) {
                                            var tabElement = angular.element(
                                                document.querySelector("#" + tabId)
                                            );
                                            var classExisting = tabElement.hasClass("active");
                                            return classExisting;
                                        };
                                    },
                                ],
                            },
                        },
                    })
                    .state("app.rTabs.active", {
                        url: "/active:viewTitle:type",
                        views: {
                            "active-tab": {
                                templateUrl: "templates/questionnaireList.html",
                                controller: "questionnaireListController",
                            },
                        },
                    })
                    .state("app.rTabs.inProgress", {
                        url: "/inProgress:viewTitle:type",
                        views: {
                            "inProgress-tab": {
                                templateUrl: "templates/questionnaire/inprogress.html",
                                controller: "questionnaireListController",
                            },
                        },
                    })
                    .state("app.rTabs.completed", {
                        url: "/completed:viewTitle:type",
                        views: {
                            "completed-tab": {
                                templateUrl: "templates/questionnaire/completed.html",
                                controller: "questionnaireListController",
                            },
                        },
                    })
                    .state("app.eTabs", {
                        url: "/eTabs:viewTitle:type:modColor:date",
                        views: {
                            menuContent: {
                                templateUrl:
                                    "templates/employeeSatisfaction_templates/employeeSatisfactionTabs.html",
                                controller: [
                                    "$scope",
                                    "$stateParams",
                                    "userApplicationsManager",
                                    "userDetailsManager",
                                    function controller(
                                        $scope,
                                        $stateParams,
                                        userApplicationsManager,
                                        userDetailsManager
                                    ) {
                                        $scope.title = $stateParams.viewTitle;
                                        $scope.tabBgColor = $stateParams.modColor;
                                        $scope.moduleName = $stateParams.type;
                                        $scope.date = $stateParams.date;
                                        var userProfile =
                                            userDetailsManager.getUserLastLoggedTimeStamp();
                                        $scope.applicationDetails =
                                            userApplicationsManager.getUserApplicationByText(
                                                userProfile.UserId,
                                                $scope.moduleName
                                            );

                                        $scope.checkClassExists = function (tabId) {
                                            var tabElement = angular.element(
                                                document.querySelector("#" + tabId)
                                            );
                                            var classExisting = tabElement.hasClass("active");
                                            return classExisting;
                                        };
                                    },
                                ],
                            },
                        },
                    })
                    .state("app.eTabs.active", {
                        url: "/active:viewTitle:type",
                        views: {
                            "active-tab": {
                                templateUrl: "templates/questionnaireList.html",
                                controller: "questionnaireListController",
                            },
                        },
                    })
                    .state("app.eTabs.inProgress", {
                        url: "/inProgress:viewTitle:type",
                        views: {
                            "inProgress-tab": {
                                templateUrl: "templates/questionnaire/inprogress.html",
                                controller: "questionnaireListController",
                            },
                        },
                    })
                    .state("app.eTabs.completed", {
                        url: "/completed:viewTitle:type",
                        views: {
                            "completed-tab": {
                                templateUrl: "templates/questionnaire/completed.html",
                                controller: "questionnaireListController",
                            },
                        },
                    })
                    .state("app.fpTabs", {
                        url: "/fpTabs:viewTitle:type:modColor:date",
                        views: {
                            menuContent: {
                                templateUrl: "templates/frontPlanner/frontPlannerTabs.html",
                                controller: [
                                    "$scope",
                                    "$stateParams",
                                    "userApplicationsManager",
                                    "userDetailsManager",
                                    function controller(
                                        $scope,
                                        $stateParams,
                                        userApplicationsManager,
                                        userDetailsManager
                                    ) {
                                        $scope.title = $stateParams.viewTitle;
                                        $scope.tabBgColor = $stateParams.modColor;
                                        $scope.moduleName = $stateParams.type;
                                        $scope.date = $stateParams.date;
                                        var userProfile =
                                            userDetailsManager.getUserLastLoggedTimeStamp();
                                        $scope.applicationDetails =
                                            userApplicationsManager.getUserApplicationByText(
                                                userProfile.UserId,
                                                $scope.moduleName
                                            );

                                        $scope.checkClassExists = function (tabId) {
                                            var tabElement = angular.element(
                                                document.querySelector("#" + tabId)
                                            );
                                            var classExisting = tabElement.hasClass("active");
                                            return classExisting;
                                        };
                                    },
                                ],
                            },
                        },
                    })
                    .state("app.fpTabs.active", {
                        url: "/active:viewTitle:type",
                        views: {
                            "active-tab": {
                                templateUrl: "templates/questionnaireList.html",
                                controller: "questionnaireListController",
                            },
                        },
                    })
                    .state("app.fpTabs.inProgress", {
                        url: "/inProgress:viewTitle:type",
                        views: {
                            "inProgress-tab": {
                                templateUrl: "templates/questionnaire/inprogress.html",
                                controller: "questionnaireListController",
                            },
                        },
                    })
                    .state("app.fpTabs.completed", {
                        url: "/completed:viewTitle:type",
                        views: {
                            "completed-tab": {
                                templateUrl: "templates/questionnaire/completed.html",
                                controller: "questionnaireListController",
                            },
                        },
                    })
                    .state("app.hTabs", {
                        url: "/hTabs:viewTitle:type:modColor:date",
                        views: {
                            menuContent: {
                                templateUrl:
                                    "templates/humanResource_templates/humanResourceTabs.html",
                                controller: [
                                    "$scope",
                                    "$stateParams",
                                    "userApplicationsManager",
                                    "userDetailsManager",
                                    function controller(
                                        $scope,
                                        $stateParams,
                                        userApplicationsManager,
                                        userDetailsManager
                                    ) {
                                        $scope.title = $stateParams.viewTitle;
                                        $scope.tabBgColor = $stateParams.modColor;
                                        $scope.moduleName = $stateParams.type;
                                        $scope.date = $stateParams.date;
                                        var userProfile =
                                            userDetailsManager.getUserLastLoggedTimeStamp();
                                        $scope.applicationDetails =
                                            userApplicationsManager.getUserApplicationByText(
                                                userProfile.UserId,
                                                $scope.moduleName
                                            );

                                        $scope.checkClassExists = function (tabId) {
                                            var tabElement = angular.element(
                                                document.querySelector("#" + tabId)
                                            );
                                            var classExisting = tabElement.hasClass("active");
                                            return classExisting;
                                        };
                                    },
                                ],
                            },
                        },
                    })
                    .state("app.hTabs.active", {
                        url: "/active:viewTitle:type",
                        views: {
                            "active-tab": {
                                templateUrl: "templates/questionnaireList.html",
                                controller: "questionnaireListController",
                            },
                        },
                    })
                    .state("app.hTabs.inProgress", {
                        url: "/inProgress:viewTitle:type",
                        views: {
                            "inProgress-tab": {
                                templateUrl: "templates/questionnaire/inprogress.html",
                                controller: "questionnaireListController",
                            },
                        },
                    })
                    .state("app.hTabs.completed", {
                        url: "/completed:viewTitle:type",
                        views: {
                            "completed-tab": {
                                templateUrl: "templates/questionnaire/completed.html",
                                controller: "questionnaireListController",
                            },
                        },
                    })
                    .state("app.mTabs", {
                        url: "/mTabs:viewTitle:type:modColor:date",
                        views: {
                            menuContent: {
                                templateUrl:
                                    "templates/managementEvaluation_templates/managementEvaluationTabs.html",
                                controller: [
                                    "$scope",
                                    "$stateParams",
                                    "userApplicationsManager",
                                    "userDetailsManager",
                                    function controller(
                                        $scope,
                                        $stateParams,
                                        userApplicationsManager,
                                        userDetailsManager
                                    ) {
                                        $scope.title = $stateParams.viewTitle;
                                        $scope.tabBgColor = $stateParams.modColor;
                                        $scope.moduleName = $stateParams.type;
                                        $scope.date = $stateParams.date;
                                        var userProfile =
                                            userDetailsManager.getUserLastLoggedTimeStamp();
                                        $scope.applicationDetails =
                                            userApplicationsManager.getUserApplicationByText(
                                                userProfile.UserId,
                                                $scope.moduleName
                                            );

                                        $scope.checkClassExists = function (tabId) {
                                            var tabElement = angular.element(
                                                document.querySelector("#" + tabId)
                                            );
                                            var classExisting = tabElement.hasClass("active");
                                            return classExisting;
                                        };
                                    },
                                ],
                            },
                        },
                    })
                    .state("app.mTabs.active", {
                        url: "/active:viewTitle:type",
                        views: {
                            "active-tab": {
                                templateUrl: "templates/questionnaireList.html",
                                controller: "questionnaireListController",
                            },
                        },
                    })
                    .state("app.mTabs.inProgress", {
                        url: "/inProgress:viewTitle:type",
                        views: {
                            "inProgress-tab": {
                                templateUrl: "templates/questionnaire/inprogress.html",
                                controller: "questionnaireListController",
                            },
                        },
                    })
                    .state("app.mTabs.completed", {
                        url: "/completed:viewTitle:type",
                        views: {
                            "completed-tab": {
                                templateUrl: "templates/questionnaire/completed.html",
                                controller: "questionnaireListController",
                            },
                        },
                    });
            },
        ])
        .run([
            "$rootScope",
            "$state",
            "AuthenticationService",
            "$ionicPlatform",
            "ResetPoolUtil",
            "LocalStorageHelper",
            "$timeout",
            "BackButtonParamService",
            function (
                $rootScope,
                $state,
                AuthenticationService,
                $ionicPlatform,
                ResetPoolUtil,
                LocalStorageHelper,
                $timeout,
                BackButtonParamService
            ) {
                $rootScope.$on(
                    "$stateChangeStart",
                    function (event, next, nextParams, fromState) {
                        var initDbPromise = LocalStorageHelper.initDb();
                        initDbPromise.promise.then(function (success) {
                            var authService = AuthenticationService.authenticateUser();
                            authService
                                .then(function (data) {
                                    if (data === false) {
                                        if (next.name !== "login") {
                                            if (fromState.name !== "login") {
                                                event.preventDefault();
                                                $state.go("login");
                                            }
                                        }
                                    }
                                })
                                .catch(function () {
                                    if (next.name !== "login") {
                                        if (fromState.name !== "login") {
                                            event.preventDefault();
                                            $state.go("login");
                                        }
                                    }
                                });
                            return;
                        });
                    }
                );

                //Maintaining the sync between Hardware back button(Android) and nav bar's back button
                $ionicPlatform.registerBackButtonAction(function (event) {
                    //Pass parameter true to emulate hardware back button click.

                    var parms = BackButtonParamService.getParams();
                    if (parms && parms.shouldExit) {
                        ResetPoolUtil.resetPool();
                        ionic.Platform.exitApp();
                    }

                    $rootScope.myGoBack(true); // Closing the app on hardware back button press

                    if (
                        $state.current.name === "app.home" ||
                        $state.current.name === "login" 
                    ) {
                        ResetPoolUtil.resetPool();
                        ionic.Platform.exitApp();
                    } else if ($state.current.name === "welcome") {
                        // TODO: THis implementation can be changed if the background color of the welcome images are changed to App background color.
                        $rootScope.$emit("RenderButtonBgHeaderColor");
                        $timeout(function () {
                            $rootScope.$emit("OnlyWelcomeBgColor", {
                                isWelcome: false,
                            });
                        }, 200);
                        screen.orientation.unlock();
                    }
                }, 101);
                //window.addEventListener('native.keyboardshow', keyboardShowHandler);
                //window.addEventListener('native.keyboardhide', keyboardHideHandler);

                function keyboardShowHandler(e) {
                    //alert('Keyboard height is: ' + e.keyboardHeight);
                    ionic.keyboard.disable(); //cordova.plugins.Keyboard.disableScroll(true);
                }

                function keyboardHideHandler(e) {
                    //alert('Keyboard height is: ' + e.keyboardHeight);
                    ionic.keyboard.enable(); //cordova.plugins.Keyboard.disableScroll(false);
                }

                $ionicPlatform.ready(function () {
                    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                    // for form inputs)
                    // if (window.cordova && window.cordova.plugins.Keyboard) {
                    //   //cordova.plugins.Keyboard.disableScroll(false);
                    //   cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
                    // }

                    if (window.StatusBar) {
                        // Set the statusbar to use the default style, tweak this to
                        // remove the status bar on iOS or change it to use white instead of dark colors.
                        StatusBar.styleDefault();
                    }
                });
            },
        ]);
})();

// JS interface method to interact with the native code.
window.pushutility = function (str, args, callback) {
    cordova.exec(
        callback,
        function (err) {
            callback("Nothing to echo.");
        },
        "PushUtility",
        "pushutility",
        [str, args]
    );
};

// //NEEDS TO BE REMOVED WHNE DONE
// document.addEventListener('click',function(){
//    window.pushutility('subscribe',['News','ETC','Trees','Vehicle'], function(echoValue) {
//      alert(echoValue); // should alert true.
//    });

//   // window.pushutility('token',[], function(userDeviceToken) {
//   //   alert(userDeviceToken); // should alert true.
//   // });
// });
// // JS interface method to interact with the native code.

window.pushNavigate = function () {

};

window.navigateFromPush = function (routePayload) {
    var appOptionsElement = document.getElementById("_hdnForPush");
    var appOptionsScope = angular.element(appOptionsElement).scope();
    appOptionsScope.processPushNotification(routePayload);
};


/***/ }),

/***/ "./scripts/app/directives.js":
/*!***********************************!*\
  !*** ./scripts/app/directives.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var app = angular.module('directives', []);
app.factory("$exceptionHandler", ['$injector', function ($injector) {
    return function (exception, cause) {
        var localStorageUtility = $injector.get('LocalStorageUtility')
        localStorageUtility.addExceptionToLogTable(exception, cause);
        var rScope = $injector.get('$rootScope');
        rScope.$broadcast('exceptionRefresh', exception, cause);
    };
}]);

app.directive("postscriptinlinehtml", function () {
    return {
        priority: 10, // adjust this value ;)
        link: function (scope, element, attrs) {
            scope.$watch(attrs.ngBindHtml, function (newvalue) {
                element
                    .find("a")
                    .off()
                    .on("click", function (event) {
                        event.preventDefault();
                        var clicked = element.attr("clicked");
                        var target = event.target.attributes["target"] ? event.target.attributes["target"].value : "_blank";
                        if (!clicked) {
                            element.attr("clicked", "1");
                            if (scope.openInAppForInlineHtml) scope.openInAppForInlineHtml(event.target.attributes.href.value, target);
                        } else {
                            if (scope.openInAppForInlineHtml) scope.openInAppForInlineHtml(event.target.attributes.href.value, target);
                            element.removeAttr("clicked");
                        }
                    });
            });
        },
    };
});

app.directive("postscript", function () {
    return {
        priority: 10, // adjust this value ;)
        link: function (scope, element, attrs) {
            scope.$watch(attrs.href, function (newvalue) {
                element
                    .off()
                    .on("click", function (event) {
                        var load = function load() {
                            event.preventDefault();
                            var clicked = element.attr("clicked");
                            var targetNode = getTargetNode(event.target);
                            if (targetNode != null) {
                                var target = targetNode.attributes["target"] ? targetNode.attributes["target"].value : "_blank";
                                if (!clicked) {
                                    element.attr("clicked", "1");
                                    if (scope.openInApp) scope.openInApp(targetNode.attributes.href.value, target);
                                } else {
                                    if (scope.openInApp) scope.openInApp(targetNode.attributes.href.value, target);
                                    element.removeAttr("clicked");
                                }
                            }
                        }

                        var getTargetNode = function getTargetNode(targetNode) {
                            if (targetNode.nodeName !== "A") {
                                targetNode = targetNode.parentElement;
                            }
                            return targetNode;
                        }

                        load();
                    });
            });
        },
    };
});

app.directive("handlelink", ["CommonMethodsFactory", function (CommonMethodsFactory) {
    return {
        priority: 10, // adjust this value ;)
        link: function (scope, element, attrs) {
            scope.$watch(attrs.ngBindHtml, function (newvalue) {
                element
                    .find("a")
                    .off()
                    .on("click", function (event) {
                        event.preventDefault();
                        var target = "_system";

                        var options =
                            "location=yes,clearcache=yes,clearsessioncache=yes,cleardata=yes";
                        var win = CommonMethodsFactory.openInAppBrowser(event.target.attributes.href.value, target, options);
                    });
            });
        },
    };
}]);

app.directive('sanitizescript', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attributes, ngModelController) {
            ngModelController.$parsers.push(function (valueFromInput) {
                // put the inverse logic, to transform formatted data into model data
                // what you return here, will be stored in the $scope
                var replacer = /(<([^>]+)>)/ig;
                var sanitized = valueFromInput.replace(replacer, '');
                element.val(sanitized);
                return sanitized;
            });
        }
    };
});

app.directive('sanitizenumber', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attributes, ngModelController) {
            ngModelController.$parsers.push(function (valueFromInput) {
                var userPrefLang = window.localStorage.getItem('userLanguage');
                //Taking last entered value
                var lastValue = valueFromInput[valueFromInput.length - 1];
                if (lastValue !== undefined)
                    //checking if the entered value is a number or not
                    var numberCheck = Number.isInteger(Number.parseInt(lastValue));
                //if the entered value is not a number then if loop will execute
                if (numberCheck === false) {
                    //replacing the characters with ","
                    var replacer = /[A-Za-z_\W]+/g;
                    var sanitized = valueFromInput.replace(replacer, ",");
                    //checking for number of dots in a inputvalue
                    var multipleComma = sanitized.match(/\,/g).length;
                    //if the inputvalue has only one dot then if loop will execute
                    if (multipleComma < 2) {
                        if (sanitized[0] === ',') {
                            sanitized = '0,';
                        }
                        //if the userPreredfLanguage is english then we are replacing "," with "."
                        if (userPrefLang === "en-US") {
                            var economy = sanitized.replace(',', '.')
                            var lastValue = economy[13];
                            if (lastValue === '.') {
                                economy = '';
                            }
                            element.val(economy);
                            return economy;
                        }
                        var lastValue = sanitized[13];
                        if (lastValue === ',') {
                            sanitized = '';
                        }
                        element.val(sanitized);
                        return sanitized;
                    }
                    //if there are more then one "," clearing the inputvalue
                    sanitized = '';
                    element.val(sanitized);
                    return sanitized;
                }
                if (userPrefLang === "en-US") {
                    var patt = /^\d{0,14}\.?\d{1,2}$/;
                } else {
                    var patt = /^\d{0,14}\,?\d{1,2}$/;
                }
                var deci = valueFromInput.match(patt);
                if (deci === null) {
                    element.val(deci);
                    return deci;
                } else {
                    element.val(deci.input);
                    return deci.input;
                }
            });
        }
    };
});

app.directive('questionnaireTemplate', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/questionnaire_templates/questionnaireTemplate.html'
    };
});
app.directive('groupTemplate', function () {
    return {
        restrict: 'E',
        templateUrl: function templateUrl(templateElement, attrs) {
            return attrs.templateurl;
        }
    };
});
app.directive("questionTemplate", function () {
    return {
        restrict: "E",
        templateUrl: function templateUrl(templateElement, attrs) {
            return attrs.templateurl;
        }
    };
});
app.directive("shortText", function () {
    return {
        restrict: "A",
        templateUrl: "templates/answer_templates/shortText.html"
    };
});
app.directive('longText', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/answer_templates/longText.html'
    };
});
app.directive('buttonGroup', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/answer_templates/buttonGroup.html'
    };
});
app.directive('multiOptionMultipleChoice', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/answer_templates/checkBox.html'
    };
});
app.directive('multiOptionSingleChoice', function () {
    return {
        restrict: 'A',
        templateUrl: 'templates/answer_templates/radio.html'
    };
});
app.directive('ngAutoExpand', function () {
    return {
        restrict: 'A',
        link: function link(scope, element, attr) {
            var update = function update() {
                element.css("height", "auto");
                element.css("height", element[0].scrollHeight + "px");
            };

            scope.$watch(attr.ngModel, function () {
                update();
            });
            scope.$watch(function () {
                return element.is(':visible');
            }, function () {
                update();
            });
        }
    };
});

app.directive("timepicker", [
    "$rootScope",
    function ($rootScope) {
        var popUpData = {
            restrict: "E",
            tagName: "div",
            templateUrl: "templates/answer_templates/timePicker.html",
            transclude: true,
            transElement: null,
            popUpElement: null,
            require: "ngModel",
            link: function link(scope, element, attr, ctrl) {
                var eleScope = element.scope();

                scope.hour = null;
                scope.minute = null;

                var inputEle = element.find("input");

                var hourInputEle = inputEle[0];
                var minuteInputEl = inputEle[1];

                $(hourInputEle).focusout(function (e) {
                    if (scope.hour < 10) {
                        scope.$apply(function () {
                            scope.hour = pad(scope.hour);
                            scope.minute = pad(scope.minute);
                            ctrl.$setViewValue(getFinalTime());
                        });
                    }
                });

                $(minuteInputEl).focusout(function (e) {
                    if (scope.minute < 10) {
                        scope.$apply(function () {
                            scope.hour = pad(scope.hour);
                            scope.minute = pad(scope.minute);
                            ctrl.$setViewValue(getFinalTime());
                        });
                    }
                });

                var render = function (val) {
                    if (ctrl.$modelValue) {
                        var timeVal = ctrl.$modelValue;
                        var time = timeVal.split(":");
                        scope.hour = time[0];
                        scope.minute = time[1];
                    }
                };

                scope.$watch(attr["ngModel"], render);
                render();

                var pad = function (val) {
                    if (val == null || val == "") {
                        return "00";
                    }

                    if (angular.isDefined(val) && val.toString().length < 2) {
                        return "0" + val;
                    } else {
                        return val;
                    }
                };

                scope.pressed = function (val) {
                    if (val) {
                        if (scope.hour && scope.hour.length == 2) {
                            scope.hour = null;
                        }
                    } else {
                        if (scope.minute && scope.minute.length == 2) {
                            scope.minute = null;
                        }
                    }
                };

                scope.updateHours = function () {
                    var hours = getHours();
                    var minutes = getMinutes();
                    if (angular.isDefined(hours) && angular.isDefined(minutes)) {
                        scope.hour = hours;
                        scope.minute = minutes;
                        ctrl.$setViewValue(getFinalTime());
                        if (scope.hour && scope.hour.length == 2) {
                            minuteInputEl.focus();
                        }
                    }
                };

                scope.updateMinutes = function () {
                    var hours = getHours();
                    var minutes = getMinutes();
                    if (angular.isDefined(hours) && angular.isDefined(minutes)) {
                        scope.hour = hours;
                        scope.minute = minutes;
                        ctrl.$setViewValue(getFinalTime());
                    }
                };

                var emptyVal = "00";
                var getHours = function () {
                    var hour = scope.hour;
                    var isValid = hour >= 0 && hour < 24 && hour != null;
                    if (isValid) {
                        return hour;
                    } else if (hour > 23) {
                        return (hour = "23");
                    } else {
                        return emptyVal;
                    }
                };

                var getMinutes = function () {
                    var minute = scope.minute;
                    var isValid = minute >= 0 && minute < 60 && minute != null;
                    if (isValid) {
                        return minute;
                    } else if (minute > 59) {
                        return (minute = "59");
                    } else {
                        return emptyVal;
                    }
                };

                var getFinalTime = function () {
                    var timeVal = scope.hour + ":" + scope.minute;
                    return timeVal;
                };
            },
        };
        return popUpData;
    },
]);

app.directive('countpicker', ["$rootScope", function ($rootScope) {
    var popUpData = {
        restrict: 'E',
        tagName: 'div',
        templateUrl: 'templates/answer_templates/countPicker.html',
        transclude: true,
        transElement: null,
        popUpElement: null,
        require: 'ngModel',
        link: function link(scope, element, attr, ctrl) {
            var counter = 0, min = 0, max = 100000, step = 1, disablenegativeValue = false, defaultValue;

            scope.countername = attr.namevalue;

            if (attr.disablenegative) {
                disablenegativeValue = attr.disablenegative === "1" ? true : false;
            }

            if (attr.step) {
                step = parseInt(attr.step);
            }

            if (attr.count) {
                counter = parseInt(attr.count);
            }

            var render = function (val) {
                if (ctrl.$modelValue) {
                    counter = scope.countValue = parseInt(ctrl.$modelValue);
                }
            };

            scope.$watch(attr['ngModel'], render);
            render();

            if (attr.minvalue) {
                min = parseInt(attr.minvalue);
            }

            if (attr.maxvalue) {
                max = parseInt(attr.maxvalue);
            }

            scope.add = function () {
                counter = counter + step;
                if (counter > max) {
                    counter = max;
                }
                scope.countValue = counter;
                ctrl.$setViewValue(counter.toString());
            }

            scope.subtract = function () {
                counter = counter - step;

                if (disablenegativeValue === true) {
                    if (counter < min) {
                        counter = min;
                    }
                }

                ctrl.$setViewValue(counter.toString());
                scope.countValue = counter;
            }
        }
    };
    return popUpData;
}]);

app.directive("ranking", [
    "$rootScope",
    "$ionicScrollDelegate",
    function ($rootScope, $ionicScrollDelegate) {
        var popUpData = {
            restrict: "E",
            tagName: "div",
            templateUrl: "templates/answer_templates/ranking.html",
            transclude: true,
            transElement: null,
            popUpElement: null,
            require: "ngModel",
            scope: {
                onListReordered: "=reorder",
            },
            link: function link(scope, element, attr, ctrl, ngModel) {
                var options = JSON.parse(attr.reorderoptions);
                var answer = JSON.parse(attr.answer);

                var answerId = answer[attr.datatextfield];
                var answerIds = [];
                if (answerId) {
                    answerIds = answerId.split("|");
                }

                var sortedList = options;
                if (answerIds.length > 0) {
                    var sortedList = [];
                    for (var i = 0; i < answerIds.length; i++) {
                        var selectedId = answerIds[i];
                        var item = options.find((x) => x.Id === selectedId);
                        sortedList.push(item);
                    }
                }
                else {
                    var defaultSelectionIds = sortedList.map((t) => t[attr.valueid]);
                    var mergedDefaultSelection = defaultSelectionIds.join('|');
                    console.log(mergedDefaultSelection);
                    ctrl.$setViewValue(mergedDefaultSelection);
                }

                var cloneReorderOptions = Object.assign([], sortedList);
                scope.reorderoptions = cloneReorderOptions;

                function preventBehavior(e) {
                    e.preventDefault();
                };

                scope.onReorderButtonTouch = function () {
                    document.addEventListener("touchmove", preventBehavior, { passive: false });
                };

                scope.onReorderButtonRelease = function () {
                    document.removeEventListener("touchmove", preventBehavior);
                };

                scope.moveItem = function (item, fromIndex, toIndex) {
                    var otherOptions = scope.reorderoptions;
                    otherOptions.splice(fromIndex, 1);
                    otherOptions.splice(toIndex, 0, item);

                    scope.reorderoptions = otherOptions;

                    if (!angular.isUndefined(scope.onListReordered)) {
                        var answer = JSON.parse(attr.answer);
                        var orderedIds = scope.reorderoptions.map((t) => t[attr.valueid]);
                        var selectedConcatedIds = scope.onListReordered(answer, orderedIds);

                        ctrl.$setViewValue(selectedConcatedIds);
                    }
                };
            },
        };
        return popUpData;
    },
]);

/* A dropdown which based on a template shows the list in 
which the on search filters the list. */

/* TODO: Consider moving $rootScope out of the directive, it is used to get the icon and resource text */

app.directive('lazyDropdown', ["$rootScope", "ionicToast", "$ionicPlatform", "$cordovaNetwork", "LocalStorageHelper", "dropdownValueManager", "CommonMethodsFactory", "LoaderService", "$timeout", function ($rootScope, ionicToast, $ionicPlatform, $cordovaNetwork, LocalStorageHelper, dropdownValueManager, CommonMethodsFactory, LoaderService, $timeout) {
    return {
        restrict: 'AEC',
        templateUrl: 'templates/listPopUp.html',
        scope: {
            onItemSelected: '=',
            datasource: '=',
            textField: '=',
            valueField: '=',
            selectedDisplayText: '=',
            selectedDataEntity: '=',
            entity: '=',
            entityText: '=',
            isSearchDisabled: '='
        },
        require: 'ngModel',
        link: function link(scope, element, attr, modelCtrl) {
            // screen.lockOrientation('portrait');
            var eleScope = element.scope();
            scope.dataTextField = eleScope[attr.textField];
            scope.dataValueField = attr.valueField;
            scope.dataSelectedTextField = attr.selectedDisplayText;

            scope.isQRCodeReaderEnabled = eleScope[attr.qrCodeReaderEnabled];
            scope.isSearchDisabled = eleScope[attr.isSearchDisabled];

            scope.isAddVisible = false;
            scope.AddText = $rootScope.getResourceText('LIT_MOBILE_ADD_ITEM');

            scope.dataEntity = attr.entity;
            scope.dataEntityText = attr.entityText;

            var dropdownTypeVal = attr.dropdowntype;
            var moduleNameVal = attr.type;
            var columnTypeVal = attr.columntype;
            var enableOnlineSearchVal = attr.enableonline; // Assigning Column sub type value passed from drop down html template

            var columnSubTypeVal = attr.columnSubType;
            $ionicPlatform.ready(function () {
                scope.searchIcon = $rootScope.getIconValue('Search');
                scope.closeIcon = $rootScope.getIconValue('Close');
                scope.searchText = $rootScope.getResourceText('LIT_SEARCH');
                scope.qrScannerIcon = $rootScope.getIconValue('Scanner');
                scope.flipCameraIcon = $rootScope.getIconValue('Flip');
                scope.flashCameraIcon = $rootScope.getIconValue('Flash');
                scope.scannerCloseIcon = $rootScope.getIconValue('ScannerClose');
            });

            scope.searchModel = { Text: "" };
            var itemListName = attr.datasource; // Defining empty lists to add the drop down data

            var itemList = [];
            var itemListData = [];
            var dropDownType = null;
            var columnType = null;
            var columnSubType = null;
            var isDeviceOnline = $cordovaNetwork.isOnline();
            var type = $cordovaNetwork.getNetwork();
            isDeviceOnline = isDeviceOnline === true || type === 'unknown';
            scope.enableOnline = false;
            scope.isOnlineSearch = false; // Below boolean variable is used to highlight web api returned values
            scope.isSmallScreenDevice = false;// Below boolean variable is used to highlight web api returned values
            scope.isOnlineDropDownData = false; // Storing the list data in a temporary list array till the filter is applied
            scope.subType = eleScope[columnSubTypeVal];

            if (screen.height < 700) {
                scope.isSmallScreenDevice = true;
            }

            itemListData = eleScope[itemListName];
            columnType = eleScope[columnTypeVal];
            dropDownType = eleScope[dropdownTypeVal];
            var moduleName = eleScope[moduleNameVal];
            columnSubType = eleScope[columnSubTypeVal]; // Adding filtered list to the actual defined list above

            itemList = dropdownValueManager.filterDropDownDataByModule(itemListData, moduleName, columnType, columnSubType); // Formating columntype value to fetch table name

            var tabname = dropdownValueManager.getTableNameText(dropDownType, columnType, moduleName);
            scope.enableOnline = eleScope[enableOnlineSearchVal]; // If device is online, then enable online button in view or else disable.

            if (isDeviceOnline) {
                scope.isOnlineSearch = eleScope[enableOnlineSearchVal];
            }

            scope.onlineVal = $rootScope.getResourceText('LIT_ONLINE');
            scope.offlineVal = $rootScope.getResourceText('LIT_OFFLINE');

            scope.updateIsOnlineSearch = function (isOnlineSearchValue) {
                if (isDeviceOnline) {
                    scope.isOnlineSearch = !isOnlineSearchValue;

                    if (!scope.isOnlineSearch) {
                        // Assigning local data from the mobile to datasource, when user toggles to offline search mode.
                        scope.dataSource = itemList;
                        scope.isOnlineDropDownData = false;
                    }
                } else {
                    ionicToast.showDefault($rootScope.getResourceText('MSG_CHECK_INTERNET_CONNECTION'));
                }
            }; // Setting max character length (TODO can be added as a setting)


            var maxCharLength = 2; // Method called when online search setting value is true

            scope.callWebApi = function (searchText) {
                // Checking if isOnlineSearch is true (as this can be turned off by the user in view)
                LoaderService.hide();
                if (scope.isOnlineSearch) {
                    var enteredText = searchText[scope.dataTextField];

                    if (enteredText.length >= maxCharLength) {
                        // Check if device is online
                        if (isDeviceOnline) {
                            // Check if entered string is valid
                            var isValidText = CommonMethodsFactory.validateSearchText(enteredText);
                            enteredText = CommonMethodsFactory.encodeToBase64(enteredText);
                            //if (isValidText) {
                            var newItemList = []; // Making a web api call for online search
                            // Also filter is applied if the online search performed has a  valid columnsubtype value

                            var dropdownPromise = dropdownValueManager.getDropDownValueBasedOnSearchFilter('search', tabname, moduleName, enteredText, columnSubType);
                            dropdownPromise.then(function (success) {
                                // Filtering the downloaded data before displaying to user
                                // Passing column sub type to filter dropdown based on coluumn sub type  if present
                                newItemList = dropdownValueManager.filterDropDownBasedOnModule(moduleName, success, tabname, dropDownType, columnSubType); // Adding the check for department because adding DisplayText property directly to the Online retreived data.
                                // Once user selects a value the value will be inserted.

                                if (tabname === 'Department') {
                                    newItemList = dropdownValueManager.addDisplayTextToOnlineSearchData(newItemList);
                                } // If filtered data list is not empty assign filtered values
                                // else assign local database fetched values


                                if (newItemList.length !== 0) {
                                    scope.dataSource = newItemList; // Boolean variable is used to highlight the new downloaded data.
                                    checkShouldShowAddItemButton(searchText, true);
                                    scope.isOnlineDropDownData = true;
                                } else {
                                    scope.dataSource = itemList;
                                    checkShouldShowAddItemButton(searchText, true);
                                    scope.isOnlineDropDownData = false;
                                }
                            });
                            //} else {
                            //    ionicToast.showDefault($rootScope.getResourceText('MSG_DATA_NOT_VALID'));
                            //}
                        } else {
                            // in the case of device offline assing local data to drop down
                            scope.dataSource = itemList;
                            scope.isOnlineDropDownData = false;
                        }
                    }
                }
                checkShouldShowAddItemButton(searchText, !scope.isOnlineSearch);
            }; // selectedDataEntity attribute returns the specified entity from the view.
            // selEntity variable will have a value which the user selects in the drop down.
            // Default value is initilized to null.


            var selEntity = ''; // Checking if the attribute is defined in the view. If defined assigning the entity to selEntity variable. 

            if (attr.selectedDataEntity) {
                var selectedEntity = attr.selectedDataEntity;
                selEntity = eleScope[selectedEntity];
            } // method is called when user selects a drop down data and isOnlineSearch value should be true

            function checkShouldShowAddItemButton(searchObj, shouldVerify) {
                var isVisible = false;
                if (shouldVerify) {
                    var enteredText = searchObj[scope.dataTextField];
                    isVisible = !scope.dataSource.some(function (item) { return item.Text.includes(enteredText) }) && scope.subType === "Company";
                }
                scope.isAddVisible = isVisible;
            }

            scope.AddItem = function () {
                scope.tapped(scope.searchModel);
            }

            function insertDropDownData(itemData) {
                dropdownValueManager.insertDropDownData(tabname, itemData);
            }

            function getDefaultText(itemList, valueId) {
                for (var i = 0; i < itemList.length; i++) {
                    var item = itemList[i];
                    var selectedId = item[scope.dataValueField];

                    if (selectedId == valueId) {
                        // Handling for the scenario where drop downs will have a pre-defined value
                        if (!angular.isUndefined(scope.onItemSelected)) {
                            scope.onItemSelected(item, selEntity);
                        }
                        return item[scope.dataTextField];
                    }
                }
            }

            var valueId = scope.$parent.$eval(attr.ngModel); // Displaying default value for a drop down based on the boolean value 'defaultValue'

            var defaultValue = scope.$parent.$eval(attr.dropdownDefaultValue);

            if (valueId != null && defaultValue) {
                scope.selectedText = getDefaultText(itemList, valueId);
            }

            scope.clearSearch = function () {
                scope.isAddVisible = false;
                scope.searchModel = { Text: "" }; // Adding this for a scenario, where user has searched for a text, but the result is not what he/she wanted
                // then wants to select a value from local data. so on clear button clicked assigning back to the view.

                scope.dataSource = itemList;
                scope.isOnlineDropDownData = false;
            };

            scope.showFullValue = function () {
                ionicToast.showDefault(scope.selectedText);
            };

            scope.closeKeyBoard = function () {
                cordova.plugins.Keyboard.close();
            };

            scope.getItemWidthForWindow = function () {
                return '100%';
            };

            scope.disableTagButton = function (selectedText) {
                if (selectedText != null) {
                    return {
                        'visibility': 'hidden'
                    };
                }

                return {
                    'visibility': 'visible'
                };
            };

            scope.getDeviceHeight = function () {
                return window.screen.height * window.devicePixelRatio;
            };

            scope.getItemHeightForWindow = function () {
                var deviceHeight = window.screen.height * window.devicePixelRatio;
                var isIOS = (ionic.Platform.isAndroid() == false);
                if (isIOS) {
                    if (deviceHeight <= 960) {
                        return '150px';
                    } else {
                        return '300px';
                    }
                } else {
                    if (deviceHeight <= 500) {
                        return '50px';
                    } else if (deviceHeight <= 750) {
                        return '65px';
                    } else if (deviceHeight <= 1000) {
                        return '260px';
                    } else {
                        return '300px';
                    }
                }
            };

            scope.getPlatformSpecificTemplate = function () {
                // Currently handling only for IOS and Android
                var isIOS = (ionic.Platform.isAndroid() == false);
                if (isIOS) {
                    return 'templates/dropDown_template/iosTemplate.html';
                }
                else {
                    return 'templates/dropDown_template/androidTemplate.html';
                }

            };

            scope.getItemHeight = function (item) {
                var valueField = item[scope.dataTextField];

                if (valueField == undefined) {
                    valueField = '';
                }

                var length = valueField.length;
                var height = length * 1.5;

                if (height < 40) {
                    height = 40;
                }

                return height + 'px';
            };

            scope.dataSource = itemList;

            scope.showCompleteItemText = function (item) {
                ionicToast.showDefault(item.Text);
            };

            scope.tapped = function (item) {
                try {
                    console.log(item);
                    var currValue = modelCtrl.$modelValue;
                    var valueField = item[scope.dataValueField];
                    var textField = item[scope.dataSelectedTextField];
                    modelCtrl.$setViewValue(valueField);
                    modelCtrl.$render();

                    if (scope.dataEntityText) {
                        scope.entity[scope.dataEntityText] = textField;
                    }

                    if (!angular.isUndefined(scope.onItemSelected)) {
                        // Callback function called defined in the respective controllers.
                        scope.onItemSelected(item, selEntity);
                    }

                    if (scope.isOnlineSearch) {
                        // Save selected drop down data to local database
                        insertDropDownData(item);
                    }

                    var completed = eleScope.$emit('Completed', {
                        data: textField
                    });

                    $timeout(function () {
                        scope.$apply();
                    })
                    if (ionic.Platform.isAndroid() == true)
                        screen.orientation.unlock();
                } catch (e) {
                    console.log(e);
                }
            };

            scope.openScanner = function () {
                //when scanner icon is clickd multiple times then if loop fails and loads previously 
                //loaded values from else loop this prevents from calling document.queryselector every time when scan icon is 
                //clicked
                cordova.plugins.Keyboard.close();
                if (scope.scanItems === null || scope.scanItems === undefined) {
                    var popupView = document.querySelector(".popup-container");
                    var mainView = document.querySelector(".scannerView");
                    var scannerButton = document.querySelector(".scannerButtons");
                    var cancle = document.querySelector(".cancleScan");
                    var flash = document.querySelector(".flashCam");
                    var flipCamera = document.querySelector(".flipCam");
                    var readInputVal = document.querySelector(".searchTextVal");
                    var androidView = document.querySelector(".platform-android");

                    scope.scanItems = {
                        popupContainer: popupView,
                        scannerView: mainView,
                        scannerButton: scannerButton,
                        cancleButton: cancle,
                        flashCamera: flash,
                        flipCamera: flipCamera,
                        read: readInputVal,
                        androidView: androidView
                    };
                } else {
                    var popupView = scope.scanItems.popupContainer;
                    var mainView = scope.scanItems.scannerView;
                    var scannerButton = scope.scanItems.scannerButton;
                    var cancle = scope.scanItems.cancleButton;
                    var flash = scope.scanItems.flashCamera;
                    var flipCamera = scope.scanItems.flipCamera;
                    var readInputVal = scope.scanItems.read;
                    var androidView = scope.scanItems.androidView;
                }

                //blur is added because the Keyboard gets shown when scanning
                //readInputVal.blur();

                //the back button handled for android using an backbutton event
                document.addEventListener('backbutton', function () {
                    if (androidView)
                        androidView.style.setProperty("background-color", "var(--statusbar-bg-color, #2c3445)", "important");
                    mainView.style.visibility = "visible";
                    scannerButton.style.setProperty("visibility", "hidden", "important");
                });

                window.QRScanner.prepare(onDone);

                function onDone(err, status) {
                    if (err) {
                        console.error(err);
                    }
                    if (status.authorized) {
                        //cancle camera is handled here
                        cancle.addEventListener("click", function () {
                            if (status.lightEnabled === true) {
                                window.QRScanner.disableLight(function () {
                                    status.lightEnabled = false;
                                });
                            }
                            window.QRScanner.cancelScan();
                        });

                        //flash light is handled here
                        flash.addEventListener("click", function () {
                            if (status.lightEnabled === false) {
                                window.QRScanner.enableLight(function () {
                                    status.lightEnabled = true;
                                });
                            } else {
                                window.QRScanner.disableLight(function () {
                                    status.lightEnabled = false;
                                });
                            }
                        });

                        //camera fip is handled here
                        flipCamera.addEventListener('click', function () {
                            if (status.currentCamera === 0) {
                                window.QRScanner.useFrontCamera(function () {
                                    status.currentCamera = 1;
                                });
                            } else {
                                window.QRScanner.useBackCamera(function () {
                                    status.currentCamera = 0;
                                });
                            }
                        })

                        //when the scanner is get called the popupview and the body both will be made hidden and the buttons will be made visible
                        if (androidView)
                            androidView.style.setProperty("background-color", "transparent", "important");
                        popupView.style.visibility = "hidden";
                        mainView.style.visibility = "hidden";
                        scannerButton.style.setProperty("visibility", "visible", "important");
                        window.QRScanner.show(function () {
                            window.QRScanner.scan(displayContents);
                        });
                    }
                }

                function displayContents(err, text) {
                    if (err) {
                        // when the cancle event is gets triggered error loop will be called
                        if (err.name === "SCAN_CANCELED") {
                            //the popupView and body will be set back t0 visible and the buttons to hidden
                            if (androidView)
                                androidView.style.setProperty("background-color", "var(--statusbar-bg-color, #2c3445)", "important");
                            popupView.style.visibility = "visible";
                            mainView.style.visibility = "visible";
                            scannerButton.style.setProperty("visibility", "hidden", "important");
                            // destroy is called because it will close the camera/video preview
                            window.QRScanner.destroy();
                        } else {
                            console.error(err._message);
                        }
                    } else {
                        //if in case the light is on after scanning the below method will off the flash lisht
                        window.QRScanner.disableLight();
                        //and the popupView and body will be set back t0 visible and the buttons to hidden
                        if (androidView)
                            androidView.style.setProperty("background-color", "var(--statusbar-bg-color, #2c3445)", "important");
                        popupView.style.visibility = "visible";
                        mainView.style.visibility = "visible";
                        scannerButton.style.setProperty("visibility", "hidden", "important");
                        window.QRScanner.destroy();
                        scope.searchModel = { Text: "" };
                        //scanned data is passed to call the webapi
                        readInputVal.focus();
                        scope.searchModel[scope.dataTextField] = text;
                        scope.callWebApi(scope.searchModel);
                    }
                }
            };
        }
    };
}]);
/* Pop up to display content defined in the pop-up directive .
Please refer actionplanDropDownDefault.html page for its implementation.*/

app.directive('popUp', ["$ionicPopup", "$rootScope", function ($ionicPopup, $rootScope) {
    var popUpData = {
        restrict: 'E',
        tagName: 'button',
        transclude: true,
        transElement: null,
        popUpElement: null,
        require: 'ngModel',
        link: {
            post: function post(scope, el, att, ctrl, transclude) {
                var selectedText = att.displayText;
                var isAssignIdText = att.assignIdText;
                scope.$on('Completed', function (obj, val) {
                    selectedText = val.data;

                    if (isAssignIdText != null) {
                        if (ctrl.$viewValue != selectedText) {
                            ctrl.$setViewValue(selectedText);
                        }
                    }

                    el.html(selectedText);
                    popUpData.popUpElement.close();
                });
                el.html(selectedText);
            },
            pre: function pre(scope, el, attrs, ctrl, transclude) {
                popUpData.transElement = transclude();
                el.bind('tap', function () {
                    var html = popUpData.transElement;
                    popUpData.popUpElement = $ionicPopup.show({
                        template: html,
                        title: attrs.title,
                        cssClass: 'listPopUpClass',
                        scope: scope,
                        buttons: [{
                            text: $rootScope.getResourceText('LIT_CANCEL_TEXT')
                        }]
                    });
                    popUpData.popUpElement.then(function (res) {
                        if (ionic.Platform.isAndroid() == true)
                            screen.orientation.unlock();
                    });
                });
            }
        }
    };
    return popUpData;
}]);
app.directive('menuToggle', function () {
    return {
        restrict: 'AC',
        link: function link($scope, $element, $attr) {
            $scope.$on('$ionicView.beforeEnter', function (ev, viewData) {
                if (viewData.enableBack === true) {
                    $element.addClass('hide');
                }
            });
        }
    };
}); // Enable slide feature for range/slider control when side menu is active on the view

app.directive('range', rangeDirective);

function rangeDirective() {
    return {
        restrict: 'C',
        link: function link(scope, element, attr) {
            element.bind('touchstart mousedown', function (event) {
                event.stopPropagation();
                event.stopImmediatePropagation();
            });
        }
    };
}

app.directive('mailTemplate', ["EmailUtil", function (EmailUtil) {
    return {
        restrict: 'EA',
        replace: true,
        controller: ['$scope', '$injector', 'userDetailsManager', 'userApplicationsManager', '$state', '$timeout', 'FileUtil', 'PopupUtil', '$rootScope', function ($scope, $injector, userDetailsManager, userApplicationsManager, $state, $timeout, FileUtil, PopupUtil, $rootScope) {
            $scope.sendEmail = function (personEntity, module) {
                var base64Promise;
                var apViewId = '';
                $scope.userDetail = userDetailsManager.getUserLastLoggedTimeStamp();

                switch (module) {
                    case 'ActionPlan':
                        var actionPlanMethodFactory = $injector.get('ActionPlanMethodFactory');
                        var personApwManager = $injector.get('personApwManager');
                        var apEntity = actionPlanMethodFactory.refactorAPEntity(personEntity); //Returns Action plan entity, and directly assign this to the wizard scope variable

                        $scope.personActionPlanWizard = personEntity;
                        $scope.wizard = apEntity;
                        $scope.actionPlanMail = "templates/mail_templates/actionPlanMail.html";
                        var moduleEntity = userApplicationsManager.getUserApplicationByText($scope.userDetail.UserId, 'ActionPlan');
                        $scope.translatedModuleText = moduleEntity.TranslatedText;
                        apViewId = '#actionPlanMail_' + personEntity.Id;
                        base64Promise = FileUtil.processFile(personEntity, true);
                        break;

                    case 'Askade':
                        var askadeMethodFactory = $injector.get('AskadeMethodFactory');
                        var personAskadeFileTypeWizardManager = $injector.get('personAskadeFileTypeWizardManager');
                        var askadeEntity = askadeMethodFactory.refactorAKEntity(personEntity); //Returns Askade entity, and directly assign this to the wizard scope variable

                        $scope.personAskadeWizard = personEntity;
                        $scope.akWizard = askadeEntity;
                        $scope.askadeMail = "templates/mail_templates/askadeMail.html";
                        var moduleEntity = userApplicationsManager.getUserApplicationByText($scope.userDetail.UserId, 'Askade');
                        $scope.translatedModuleText = moduleEntity.TranslatedText;
                        apViewId = '#askadeMail_' + personEntity.Id;
                        base64Promise = FileUtil.processFile(personEntity, true);
                        break;

                    case 'Questionnaire':
                        var questionnaireMethodFactory = $injector.get('QuestionnaireMethodFactory'); //Returns Questionnaire entity, and directly assign this to the questionnaire scope variable

                        var questionnaireEntity = questionnaireMethodFactory.refactorQueEntity(personEntity);
                        $scope.pq = personEntity;
                        $scope.questionnaire = questionnaireEntity; // Initiating initial dependency method

                        questionnaireMethodFactory.setInitialDependency($scope.questionnaire.Groups, personEntity.Answers);
                        $scope.questionnaireMail = "templates/mail_templates/questionnaireMail.html"; // Fetching current module's traanslated text.

                        var moduleEntity = userApplicationsManager.getUserApplicationByText($scope.userDetail.UserId, $scope.questionnaire.ModuleName());
                        $scope.translatedModuleText = moduleEntity.TranslatedText;
                        apViewId = '#questionnaireMail_' + personEntity.Id;
                        var personQuestionnaireManager = $injector.get('personQuestionnaireManager');
                        var base64QuePromise = FileUtil.processFile(personEntity, true);
                        base64QuePromise.then(function (pq) {
                            var htmlBodyData = '';
                            var timePromise = $timeout(function () {
                                var mailEl = angular.element(document.querySelector(apViewId));
                                htmlBodyData = mailEl.html();
                                var sendQueAttachments = [];
                                var pqAnswers = pq.Answers;

                                for (var i = 0; i < pqAnswers.length; i++) {
                                    var fileName = pqAnswers[i].FileName;

                                    if (fileName != null) {
                                        var convertedString = pqAnswers[i].FileSourceBase64; // Splitting the generated base64 string

                                        var base64parts = convertedString.split(','); // Changing the structure of the first part of the string (for the mail client)

                                        base64parts[0] = "base64:" + fileName + "//";
                                        var base64 = base64parts.join("");
                                        sendQueAttachments.push("" + base64);
                                    }
                                }

                                EmailUtil.sendEmail($scope.userDetail.Email, null, null, sendQueAttachments, "HSEQ Master", htmlBodyData, true);
                                mailEl.remove();
                                $scope.questionnaireMail = null;
                                $timeout.cancel(timePromise);
                            }, 1500);
                        }, function (inCompletePq) {
                            // Check is performed only to validate if it is a file not found error.
                            if (inCompletePq.message === "NOT_FOUND_ERR") {
                                // Showing a confirm popup. On 'Ok' move to inprogress else retain in the current screen
                                var confirmPromise = PopupUtil.confirm($rootScope.getResourceText('LIT_MESSAGE'), $rootScope.getResourceText('MSG_ATTACHMENTS_MISSING'));
                                confirmPromise.then(function (success) {
                                    if (success) {
                                        //Saving the questionnaire as to move to Inprogress section
                                        personQuestionnaireManager.savePersonQuestionniare(inCompletePq.personEntity, false);
                                        $rootScope.$emit("refresh");
                                    }
                                });
                            }
                        });
                        break;

                    default:
                        break;
                }

                if (base64Promise) {
                    base64Promise.then(function (pAw) {
                        var htmlBodyData = '';
                        setTimeout(function () {
                            var mailEl = angular.element(document.querySelector(apViewId));
                            htmlBodyData = mailEl.html();
                            var sendAttachments = [];
                            var attachments = pAw.Attachments;

                            for (var i = 0; i < attachments.length; i++) {
                                var fileName = attachments[i].FileName;

                                if (fileName != null) {
                                    var convertedString = attachments[i].FileSourceBase64; // Splitting the generated base64 string

                                    var base64parts = convertedString.split(','); // Changing the structure of the first part of the string (for the mail client)

                                    base64parts[0] = "base64:" + fileName + "//";
                                    var base64 = base64parts.join("");
                                    sendAttachments.push("" + base64);
                                }
                            }

                            EmailUtil.sendEmail($scope.userDetail.Email, null, null, sendAttachments, "HSEQ Master", htmlBodyData, true); // Removing the rendered view after email activity is called

                            mailEl.remove(); // Re-initilizing the variable to null;

                            $scope.askadeMail = null;
                            $scope.actionPlanMail = null;
                        }, 1500);
                    }, function (inCompletePersonA) {
                        // Check is performed only to validate if it is a file not found error.
                        if (inCompletePersonA.message === "NOT_FOUND_ERR") {
                            // Showing a confirm popup. On 'Ok' move to inprogress else retain in the current screen
                            var confirmPromise = PopupUtil.confirm($rootScope.getResourceText('LIT_MESSAGE'), $rootScope.getResourceText('MSG_ATTACHMENTS_MISSING'));
                            confirmPromise.then(function (success) {
                                if (success) {
                                    if (module === 'Askade') {
                                        //Saving the Askade wizard as to move to Inprogress section
                                        personAskadeFileTypeWizardManager.saveAkWizard(inCompletePersonA.personEntity, false);
                                        $rootScope.$emit("refresh");
                                    } else if (module === 'ActionPlan') {
                                        //Saving the Action plan wizard as to move to Inprogress section
                                        personApwManager.savePersonApw(inCompletePersonApw.personEntity, false);
                                        $rootScope.$emit("refresh");
                                    }
                                }
                            });
                        }
                    });
                }
            };
        }]
    };
}]);
app.directive('pdfTemplate', ["PdfUtil", function (PdfUtil) {
    return {
        restrict: 'EA',
        replace: true,
        link: function link(scope, element, attrs) {
            scope.isPdfEmail = attrs.isPdfEmail;
        },
        controller: ['$scope', '$injector', 'customersManager', '$state', '$timeout', 'FileUtil', 'PopupUtil', '$rootScope', 'LoaderService', '$q', function ($scope, $injector, customersManager, $state, $timeout, FileUtil, PopupUtil, $rootScope, LoaderService, $q) {
            $scope.genPdf = function (personEntity, module) {
                LoaderService.show();
                var base64Promise;
                var customerName = customersManager.getCustomers().CustomerName;

                switch (module) {
                    case 'ActionPlan':
                        var actionPlanMethodFactory = $injector.get('ActionPlanMethodFactory');
                        var personApwManager = $injector.get('personApwManager'); // Initialysing an array to add the promises used for attachments in multi task and normal action plan

                        var promisesAp = [];
                        var apEntity = actionPlanMethodFactory.refactorAPEntity(personEntity); //Returns Action Plan entity, and directly assign this to the wizard scope variable

                        $scope.personActionPlanWizard = personEntity;
                        $scope.wizard = apEntity;
                        $scope.multiTaskSol = personEntity.MultiTaskSolutions;
                        $scope.actionPlanPdf = "templates/pdf_templates/actionPlan/actionPlanPdf.html";
                        base64Promise = FileUtil.processFile(personEntity, true);
                        promisesAp.push(base64Promise);
                        var mtAttachmentsProm = FileUtil.processFileForMultiTask(personEntity.MultiTaskSolutions, true);
                        promisesAp.push(mtAttachmentsProm);
                        $q.all(promisesAp).then(function (data) {
                            // Here first array holds attachments of plan of action as it was added first.
                            var pApw = data[0]; // Second position has multi task attachments

                            pApw.MultiTaskSolutions = data[1];
                            setTimeout(function () {
                                var promise = PdfUtil.genPDFDocumentForPlanOfAction(pApw, $scope.wizard, customerName, $scope.isPdfEmail);
                                promise.then(function () {
                                    var apPdfId = angular.element(document.querySelector('#actionPlanPdf_' + pApw.Id));
                                    apPdfId.remove();
                                    $scope.actionPlanPdf = null;
                                    LoaderService.hide();
                                }, function () {
                                    LoaderService.hide();
                                    console.log('PDF generation Fail');
                                });
                            }, 500);
                        }, function (inCompletePersonApw) {
                            LoaderService.hide(); // Check is performed only to validate if it is a file not found error.

                            if (inCompletePersonApw.message === "NOT_FOUND_ERR") {
                                // Showing a confirm popup. On 'Ok' move to inprogress else retain in the current screen
                                var confirmPromise = PopupUtil.confirm($rootScope.getResourceText('LIT_MESSAGE'), $rootScope.getResourceText('MSG_ATTACHMENTS_MISSING'));
                                confirmPromise.then(function (success) {
                                    if (success) {
                                        //Saving the questionnaire as to move to Inprogress section
                                        personApwManager.savePersonApw(inCompletePersonApw.personEntity, false);
                                        $rootScope.$emit("refresh");
                                    }
                                });
                            }
                        });
                        break;

                    case 'Askade':
                        var askadeMethodFactory = $injector.get('AskadeMethodFactory');
                        var personAskadeFileTypeWizardManager = $injector.get('personAskadeFileTypeWizardManager');
                        var askadeEntity = askadeMethodFactory.refactorAKEntity(personEntity); //Returns Askade entity, and directly assign this to the wizard scope variable

                        $scope.personAskadeWizard = personEntity;
                        $scope.akWizard = askadeEntity;
                        $scope.askadePdf = "templates/pdf_templates/askade/askadePdf.html";
                        base64Promise = FileUtil.processFile(personEntity, true);
                        base64Promise.then(function (pAkw) {
                            setTimeout(function () {
                                var promise = PdfUtil.genPdfForAskade(pAkw, $scope.akWizard, customerName, $scope.isPdfEmail);
                                promise.then(function () {
                                    var apPdfId = angular.element(document.querySelector('#askadePdf_' + pAkw.Id));
                                    apPdfId.remove();
                                    $scope.askadePdf = null;
                                    LoaderService.hide();
                                }, function () {
                                    console.log('PDF generation Fail');
                                    LoaderService.hide();
                                });
                            }, 500);
                        }, function (inCompletePersonAkw) {
                            LoaderService.hide(); // Check is performed only to validate if it is a file not found error.

                            if (inCompletePersonAkw.message === "NOT_FOUND_ERR") {
                                // Showing a confirm popup. On 'Ok' move to inprogress else retain in the current screen
                                var confirmPromise = PopupUtil.confirm($rootScope.getResourceText('LIT_MESSAGE'), $rootScope.getResourceText('MSG_ATTACHMENTS_MISSING'));
                                confirmPromise.then(function (success) {
                                    if (success) {
                                        personAskadeFileTypeWizardManager.saveAkWizard(inCompletePersonA.personEntity, false);
                                        $rootScope.$emit("refresh");
                                    }
                                });
                            }
                        });
                        break;

                    case 'Questionnaire':
                        var questionnaireMethodFactory = $injector.get('QuestionnaireMethodFactory'); //Returns Questionnaire entity, and directly assign this to the questionnaire scope variable

                        var questionnaireEntity = questionnaireMethodFactory.refactorQueEntity(personEntity);
                        $scope.pq = personEntity;
                        $scope.questionnaire = questionnaireEntity; // Initiating initial dependency method

                        questionnaireMethodFactory.setInitialDependency($scope.questionnaire.Groups, personEntity.Answers);
                        $scope.questionnairePdf = "templates/pdf_templates/questionnaire/questionnairePdf.html";
                        var personQuestionnaireManager = $injector.get('personQuestionnaireManager');
                        var base64QuePromise = FileUtil.processFile(personEntity, true);
                        base64QuePromise.then(function (pq) {
                            var timePromise = $timeout(function () {
                                var promise = PdfUtil.getPDFDocumentForQuestionnaire(pq, $scope.questionnaire, customerName, $scope.isPdfEmail);
                                promise.then(function () {
                                    var apPdfId = angular.element(document.querySelector('#questionnairePdf_' + pq.Id));
                                    apPdfId.remove();
                                    $scope.questionnairePdf = null;
                                    LoaderService.hide();
                                }, function () {
                                    LoaderService.hide();
                                    console.log('PDF generation Fail');
                                });
                                $timeout.cancel(timePromise);
                            }, 1000);
                        }, function (inCompletePq) {
                            LoaderService.hide(); // Check is performed only to validate if it is a file not found error.

                            if (inCompletePq.message === "NOT_FOUND_ERR") {
                                // Showing a confirm popup. On 'Ok' move to inprogress else retain in the current screen
                                var confirmPromise = PopupUtil.confirm($rootScope.getResourceText('LIT_MESSAGE'), $rootScope.getResourceText('MSG_ATTACHMENTS_MISSING'));
                                confirmPromise.then(function (success) {
                                    if (success) {
                                        //Saving the questionnaire as to move to Inprogress section
                                        personQuestionnaireManager.savePersonQuestionniare(inCompletePq.personEntity, false);
                                        $rootScope.$emit("refresh");
                                    }
                                });
                            }
                        });
                        break;

                    default:
                        break;
                }
            };
        }]
    };
}]);
app.directive('jSignature', ["$rootScope", "$timeout", function ($rootScope, $timeout) {
    return {
        restrict: 'E',
        template: '<div id="signature">' + '<div id="jSignature" style="height: 250px;"></div>' + '<div class="signBtnCenter">' + '<button class="col col-20 button button-small button-clear button-dark signPaddingRgt" on-tap="reset()">{{clear}}</button>' + '<button id="done" class="col col-20 button button-small button-clear button-dark signPaddingRgt" on-tap="getSignedData()">{{done}}</button>' + '</div' + '</div>',
        scope: {
            defaultsig: '=',
            width: '@',
            height: '@',
            color: '@',
            bgColor: '@',
            lineWidth: '@',
            cssclass: '@',
            save: '=',
            instance: '=',
            isDone: '=',
            setFn: '&'
        },
        link: function link($scope, $element, attr, modelCtrl) {
            $scope.initialized = false; // Initalize default setting values to JSignature control

            var options = {
                width: $scope.width,
                height: $scope.height,
                color: $scope.color,
                'background-color': $scope.bgColor,
                lineWidth: 1,
                'decor-color': 'transparent',
                cssclass: $scope.cssclass
            };

            $scope.initialize = function () {
                if (!$scope.initialized) {
                    // Call resize canvas method to get the proper height and width which is suitable to real device.
                    $timeout(function () {
                        var details = resizeCanvas(); // Subrtacting 43 to adjust the width and center align

                        options.width = details.width - 43;
                        options.height = details.height; // Initialize JSignature control

                        $element.find('#jSignature').jSignature(options);
                        $element.find('.jSignature')[0].getContext("2d").scale(details.ratio, details.ratio); // change non-opaque pixels to white and for the stroke getting thicker issue

                        var ctx = $element.find('.jSignature')[0].getContext("2d");
                        var imgData = ctx.getImageData(0, 0, options.width, options.height);
                        var data = imgData.data;

                        for (var i = 0; i < data.length; i += 4) {
                            if (data[i + 3] < 255) {
                                data[i] = 255;
                                data[i + 1] = 255;
                                data[i + 2] = 255;
                                data[i + 3] = 255;
                            }
                        }

                        ctx.putImageData(imgData, 0, 0); // Once completed change the boolean value to true

                        $scope.initialized = true;
                    }, 500);
                }
            };

            function resizeCanvas() {
                var details = {}; // The first parameter should be based on window.orientaion(Assigning it to 0 to handle Landscape mode signature)

                var ratio = Math.max( false || 1, 1);

                if (ratio === 1) {
                    details.width = options.width * ratio;
                    details.height = options.height * ratio;
                    details.ratio = ratio;
                }

                return details;
            } // Fetch Label values for the control


            $scope.clear = $rootScope.getResourceText('LIT_CLEAR');
            $scope.done = $rootScope.getResourceText('LIT_DONE'); // Get the instance of the object which can be passed to the controller for easy save or reset values in Data models

            var instance = attr.instance;
            var elemScope = $element.scope();
            var instanceVal = elemScope[instance];
            var personInstance = attr.isDone;
            var personInstanceVal = elemScope[personInstance];
            var isDoneSignVal = personInstanceVal.IsDoneSign;
            var isButtonShown = personInstanceVal.ShowButton;

            if (isButtonShown == false) {
                var doneButton = $element.find('#done');
                doneButton.addClass('hide');
            }

            if (isDoneSignVal) {
                $timeout(function () {
                    var canvasElement = $element.find('.jSignature');
                    canvasElement.addClass('disableElement');
                }, 0);
            }

            $scope.reset = function () {
                $element.jSignature('reset'); // Saving a null value so as to handle the issue where stroke was getting thicker on edit or while navigating back to the group

                $scope.save(null, instanceVal);
                $scope.editSign();
            };

            $scope.editSign = function () {
                // To re-enable the blocked UI element this method can be called
                var canvasElement = $element.find('.jSignature');
                var hasClass = canvasElement.hasClass('disableElement');

                if (hasClass) {
                    canvasElement.removeClass('disableElement');
                }
            };

            $scope.getSignedData = function () {
                // Check if canvas is empty or not
                if ($element.jSignature('getData', 'native').length !== 0) {
                    // Get the signed data from the canvas
                    var pngImg = $element.jSignature('getData');
                    var canvasElement = $element.find('.jSignature'); // Check if the element has a class 'disableElement', if so then dont save the data as UI is blocked

                    var hasClass = canvasElement.hasClass('disableElement');

                    if (!hasClass) {
                        // Before saving the data add a 'disableElement' class, to block UI of the canvas from further editing
                        // and not to disturb the signature while scrolling
                        canvasElement.addClass('disableElement'); // Save the value to data model, by calling the function in respective controller

                        $scope.save(pngImg, instanceVal);
                    }
                }
            };

            $scope.setFn({
                theDirFn: $scope.getSignedData,
                queInst: instanceVal
            });

            $scope.setData = function (sig) {
                var datapair = null;
                if (sig) {
                    datapair = sig;
                } // Set the previously saved signed while editing the questionnaire/case

                $element.jSignature('setData', datapair);
            };

            $scope.initialize();
            $scope.$watch('defaultsig', function (sig) {
                if (sig) {
                    $timeout(function () {
                        // Check if canvas is empty or not (Also to handle stroke getting thicker issue)
                        // Commented below line to handle an issue while working on signature save on Done/Submit button
                        //if ($element.jSignature('getData', 'native').length === 0) {
                        $scope.setData(sig); //}

                        return;
                    }, 700);
                }
            });
        }
    };
}]);
app.directive("bodySelector", [
    "$rootScope",
    "ionicToast",
    "PopupUtil",
    "$ionicPlatform",
    "$cordovaNetwork",
    "LocalStorageHelper",
    "dropdownValueManager",
    "CommonMethodsFactory",
    "DeviceUtil",
    function (
        $rootScope,
        ionicToast,
        PopupUtil,
        $ionicPlatform,
        $cordovaNetwork,
        LocalStorageHelper,
        dropdownValueManager,
        CommonMethodsFactory,
        DeviceUtil
    ) {
        return {
            restrict: "AE",
            templateUrl: "templates/bodyGuide.html",
            link: function link(scope, element, attr, modelCtrl) {
                scope.visualBodyPart = function () {
                    var virtualEle = document.querySelector("body-selector");
                    virtualEle.style.display = "none";
                    var manualEle = document.querySelector("visual-selector");
                    manualEle.style.display = "block";
                    //Handle body parts image height for different screens
                    var popupBodyEle = document.querySelector(".popup-body");
                    var bodyImageEle = document.querySelector(".bodyParts");
                    if (screen.width <= 370) {
                        bodyImageEle.style.height = popupBodyEle.clientHeight - 10 + "px";
                    }
                    else if (screen.width > 370) {
                        bodyImageEle.style.height = popupBodyEle.clientHeight - 30 + "px";
                    }
                    var visualSelectedText =
                        DeviceUtil.getKeyValueWithSharedPreferences("visualPartSaved");
                    visualSelectedText.then(function (data) {
                        if (data === null) {
                            $rootScope.$emit("backSubButton", {
                                data: "defaultButton",
                            });
                        } else {
                            $rootScope.$emit("backSubButton", {
                                data: "visualButtons",
                            });
                            if (
                                data.Code == "A12" ||
                                data.Code == "A11" ||
                                data.Code == "H11" ||
                                data.Code == "H12" ||
                                data.Code == "F12" ||
                                data.Code == "F13" ||
                                data.Code == "R8" ||
                                data.Code == "L11" ||
                                data.Code == "L12" ||
                                data.Code == "C0" ||
                                data.Code == "R0" ||
                                data.Code == "O0" ||
                                data.Code == "O1" ||
                                data.Code == "C1" ||
                                data.Code == "C3" ||
                                data.Code == "C4" ||
                                data.Code == "H1" ||
                                data.Code == "N2"
                            ) {
                                angular.element(data.SelectedId).addClass("subSelected");
                            } else {
                                angular.element(data.SelectedId).addClass("higlightCircle");
                            }
                        }
                    });
                };

                $rootScope.$on("BackVisualTapped", function (event) {
                    $rootScope.defaultParts();
                    $rootScope.$emit("backSubButton", {
                        data: "defaultButton",
                    });
                });
            },
        };
    },
]);

app.directive("visualSelector", [
    "$rootScope",
    "ionicToast",
    "PopupUtil",
    "DeviceUtil",
    "AskadeMethodFactory",
    "$ionicPlatform",
    "$cordovaNetwork",
    "LocalStorageHelper",
    "dropdownValueManager",
    "CommonMethodsFactory",
    function (
        $rootScope,
        ionicToast,
        PopupUtil,
        DeviceUtil,
        AskadeMethodFactory,
        $ionicPlatform,
        $cordovaNetwork,
        LocalStorageHelper,
        dropdownValueManager,
        CommonMethodsFactory
    ) {
        return {
            restrict: "AE",
            templateUrl: "templates/bodySelectorPopUp.html",
            link: function link(scope, element, attr, modelCtrl) {
                //when the visual select loads if the value is selected before its shown if not setDefaultProm fails
                var setDefaultProm =
                    DeviceUtil.getKeyValueWithSharedPreferences("visualPart");
                setDefaultProm.then(function (data) {
                    if (data != null && easyList.length != 0) {
                        scope.easyDropDown = easyDropDownFunction(data);
                    }
                });

                var easyList = [];
                scope.partsType;

                $rootScope.$on("bodyPartsScope", function (obj, val) {
                    easyList.push(val.data);
                    if (easyList[0].dropDownTypeVal === "34") {
                        scope.partsType = true;
                    } else {
                        scope.partsType = false;
                    }
                    var dropDownSec = null;
                    scope.easyDropDown = easyDropDownFunction(dropDownSec);
                });

                $rootScope.defaultParts = function () {
                    scope.Image = scope.Images[0];
                    var dropDownSec = null;
                    scope.easyDropDown = easyDropDownFunction(dropDownSec);
                };

                $rootScope.getClass = function (parts, item) {
                    var isIpad = ionic.Platform.isIPad();
                    var isTablet = ionic.Platform.isAndroid() && screen.width > 600;
                    var className = null;
                    if (parts) {
                        if (isTablet || isIpad) {
                            className = item.Code + "tab";
                        } else {
                            className = item.Code;
                        }
                    } else {
                        if (isIpad || isTablet) {
                            className = item.Code + "subTab";
                        } else {
                            className = item.Code + "sub";
                        }
                    }

                    if (
                        item.Code == "A12" ||
                        item.Code == "A11" ||
                        item.Code == "H11" ||
                        item.Code == "H12" ||
                        item.Code == "F12" ||
                        item.Code == "F13" ||
                        item.Code == "R8" ||
                        item.Code == "L11" ||
                        item.Code == "L12" ||
                        item.Code == "C0" ||
                        item.Code == "R0" ||
                        item.Code == "O0" ||
                        item.Code == "O1" ||
                        item.Code == "C1" ||
                        item.Code == "C3" ||
                        item.Code == "C4" ||
                        item.Code == "H1" ||
                        item.Code == "N2"
                    ) {
                        return className;
                    } else {
                        return "circleSpot " + className;
                    }
                };

                scope.Images = [
                    { Id: 1, Part: "body", Photo: "images/BodyParts/FullBody.png" },
                    { Id: 2, Part: "head", Photo: "images/BodyParts/head.png" },
                    { Id: 3, Part: "front", Photo: "images/BodyParts/FrontBack.png" },
                    { Id: 4, Part: "hand", Photo: "images/BodyParts/hand.png" },
                    { Id: 5, Part: "leg", Photo: "images/BodyParts/leg.png" },
                ];

                scope.Image = scope.Images[0];

                scope.showSection = function (section, event) {
                    if (
                        section.Code != "A12" &&
                        section.Code != "A11" &&
                        section.Code != "H11" &&
                        section.Code != "H12" &&
                        section.Code != "F12" &&
                        section.Code != "F13" &&
                        section.Code != "R8" &&
                        section.Code != "L11" &&
                        section.Code != "L12" &&
                        section.Code != "C0" &&
                        section.Code != "R0" &&
                        section.Code != "O0" &&
                        section.Code != "O1" &&
                        section.Code != "C1" &&
                        section.Code != "C3" &&
                        section.Code != "C4" &&
                        section.Code != "H1" &&
                        section.Code != "N2"
                    ) {
                        ionicToast.showDefault(section.Text);
                    }
                    if (section.IsSelectable === true) {
                        heighlightSelected(section, event);
                    } else {
                        scope.easyDropDown = easyDropDownFunction(section);
                    }
                };

                scope.getText = function (item) {
                    if (
                        item.Code == "A12" ||
                        item.Code == "A11" ||
                        item.Code == "H11" ||
                        item.Code == "H12" ||
                        item.Code == "F12" ||
                        item.Code == "F13" ||
                        item.Code == "R8" ||
                        item.Code == "L11" ||
                        item.Code == "L12" ||
                        item.Code == "C0" ||
                        item.Code == "R0" ||
                        item.Code == "O0" ||
                        item.Code == "O1" ||
                        item.Code == "C1" ||
                        item.Code == "C3" ||
                        item.Code == "C4" ||
                        item.Code == "H1" ||
                        item.Code == "N2"
                    ) {
                        return item.Text;
                    }
                };

                function heighlightSelected(sec, e) {
                    var bpHeighlightObj = document.querySelectorAll(".higlightCircle");
                    var selectedObj = document.querySelectorAll(".subSelected");
                    clearClassList(bpHeighlightObj, "higlightCircle");
                    clearClassList(selectedObj, "subSelected");
                    var elementClass = e.srcElement.className;
                    var partId = elementClass.split(" ").splice(-1);
                    var selectedTextValue = "." + partId;
                    if (
                        partId[0].includes("A12") ||
                        partId[0].includes("A11") ||
                        partId[0].includes("H11") ||
                        partId[0].includes("H12") ||
                        partId[0].includes("F12") ||
                        partId[0].includes("F13") ||
                        partId[0].includes("R8") ||
                        partId[0].includes("L11") ||
                        partId[0].includes("L12") ||
                        partId[0].includes("C0") ||
                        partId[0].includes("R0") ||
                        partId[0].includes("O0") ||
                        partId[0].includes("O1") ||
                        partId[0].includes("C1") ||
                        partId[0].includes("C3") ||
                        partId[0].includes("C4") ||
                        partId[0].includes("H1") ||
                        partId[0].includes("N2")
                    ) {
                        angular.element(selectedTextValue).addClass("subSelected");
                    } else {
                        angular.element(selectedTextValue).addClass("higlightCircle");
                    }

                    sec.SelectedId = selectedTextValue;

                    var setProm = DeviceUtil.setKeyValueWithSharedPreferences(
                        "visualPart",
                        sec
                    );
                    setProm.then(function () { });
                }

                function clearClassList(elements, className) {
                    if (elements.length > 0) {
                        for (var i = 0; i < elements.length; i++) {
                            if (className == "higlightCircle") {
                                elements[i].classList.remove("higlightCircle");
                            } else {
                                elements[i].classList.remove("subSelected");
                            }
                        }
                    }
                }


                function easyDropDownFunction(section) {
                    var bpList = [];
                    var bpDropDownList = easyList[0].columnsListSource;
                    if (section === null) {
                        for (var i = 0; i < bpDropDownList.length; i++) {
                            if (bpDropDownList[i].ParentCode === "") {
                                bpList.push(bpDropDownList[i]);
                            }
                        }
                        return bpList;
                    } else {
                        if (section.ParentCode === "" && section.IsSelectable === false) {
                            var easyCode = section.Code;
                            for (var i = 0; i < bpDropDownList.length; i++) {
                                if (easyCode === bpDropDownList[i].ParentCode) {
                                    bpList.push(bpDropDownList[i]);
                                }
                            }
                            showImageSection(section.Code);
                            $rootScope.$emit("backSubButton", {
                                data: "visualButtons",
                            });
                            return bpList;
                        } else if (section.IsSelectable === true) {
                            var easyParentCode = section.ParentCode;
                            for (var i = 0; i < bpDropDownList.length; i++) {
                                if (easyParentCode === bpDropDownList[i].ParentCode) {
                                    bpList.push(bpDropDownList[i]);
                                }
                            }
                            showImageSection(section.ParentCode);
                            return bpList;
                        }
                    }
                }

                function showImageSection(Code) {
                    switch (Code) {
                        case "H0":
                            scope.Image = scope.Images[1];
                            break;
                        case "N0":
                            scope.Image = scope.Images[2];
                            break;
                        case "R0":
                            scope.Image = scope.Images[2];
                            break;
                        case "F0":
                            scope.Image = scope.Images[2];
                            break;
                        case "A0":
                            scope.Image = scope.Images[3];
                            break;
                        case "L0":
                            scope.Image = scope.Images[4];
                            break;
                        case "C0":
                            scope.Image = scope.Images[0];
                            break;
                    }
                }
            },
        };
    },
]);

app.directive('bodyPopup', ["$ionicPopup", "$rootScope", "DeviceUtil", function ($ionicPopup, $rootScope, DeviceUtil) {
    var popUpData = {
        restrict: 'E',
        tagName: 'button',
        transclude: true,
        transElement: null,
        popUpElement: null,
        require: 'ngModel',
        link: {
            post: function post(scope, el, att, ctrl, transclude) {
                var selectedText = att.displayText;
                var isAssignIdText = att.assignIdText;
                var src = scope.code;
                scope.$on('Completed', function (obj, val) {
                    selectedText = val.data;

                    if (isAssignIdText != null) {
                        if (ctrl.$viewValue != selectedText) {
                            ctrl.$setViewValue(selectedText);
                        }
                    }

                    el.html(selectedText);
                    popUpData.popUpElement.close();
                });
                //if selected text is empty the body selector works normally if there is a selected text then the selected text is showed in the visual select
                if (selectedText === "") {
                    DeviceUtil.setKeyValueWithSharedPreferences("visualPart", null);
                } else {
                    src.SelectedId = "." + src.Code;
                    DeviceUtil.setKeyValueWithSharedPreferences("visualPart", src);
                }
                el.html(selectedText);
            },
            pre: function pre(scope, el, attrs, ctrl, transclude) {
                popUpData.transElement = transclude();
                el.bind('tap', function () {
                    $rootScope.$on("backSubButton", function (obj, val) {
                        var backButtonObj = document.getElementsByClassName("backSub");
                        var visualButObj = document.getElementsByClassName("cancelBut");
                        var visualOkButObj = document.getElementsByClassName("okButton");
                        var manualBackObj = document.getElementsByClassName("manualBack");
                        var visualBackObj = document.getElementsByClassName("visualBack");
                        if (val.data === true) {
                            for (var i = 0; i < backButtonObj.length; i++) {
                                backButtonObj[i].classList.remove("backSubButton");
                                backButtonObj[i].classList.add("backSubBut");
                            }
                            for (var j = 0; j < visualBackObj.length; j++) {
                                visualBackObj[j].classList.remove("backSubBut");
                                visualBackObj[j].style.display = "none";
                            }
                        }
                        else if (val.data === "visualButtons") {
                            for (i = 0; i < visualButObj.length; i++) {
                                visualButObj[i].style.display = "none";
                            }
                            for (j = 0; j < backButtonObj.length; j++) {
                                backButtonObj[j].classList.remove("backSubButton");
                                backButtonObj[j].classList.add("backSubBut");
                            }
                            for (var k = 0; k < visualOkButObj.length; k++) {
                                visualOkButObj[k].classList.remove("backSubButton");
                                visualOkButObj[k].style.display = "block";
                            }
                            for (var l = 0; l < manualBackObj.length; l++) {
                                manualBackObj[l].style.display = "none";
                                manualBackObj[l].classList.remove("backSubBut");
                            }
                        }
                        else if (val.data === "defaultButton") {
                            for (i = 0; i < manualBackObj.length; i++) {
                                manualBackObj[i].style.display = "none";
                            }
                            for (j = 0; j < backButtonObj.length; j++) {
                                backButtonObj[j].classList.remove("backSubBut");
                                backButtonObj[j].classList.add("backSubButton");
                            }
                            for (k = 0; k < visualButObj.length; k++) {
                                visualButObj[k].style.display = "block";
                            }
                            for (l = 0; l < visualOkButObj.length; l++) {
                                visualOkButObj[l].style.display = "none";
                            }
                        }
                        else {
                            for (i = 0; i < backButtonObj.length; i++) {
                                backButtonObj[i].classList.remove("backSubBut");
                                backButtonObj[i].classList.add("backSubButton");
                            }
                        }
                    });
                    var html = popUpData.transElement;
                    popUpData.popUpElement = $ionicPopup.show({
                        template: html,
                        title: attrs.title,
                        cssClass: 'listPopUpClass',
                        scope: scope,
                        buttons: [{
                            text: $rootScope.getResourceText('LIT_BACK'),
                            type: "backSub backSubButton visualBack",
                            onTap: function onTap(e) {
                                $rootScope.$emit('BackVisualTapped');
                                e.preventDefault();
                            }
                        }, {
                            text: $rootScope.getResourceText('LIT_BACK'),
                            type: "backSub backSubButton manualBack",
                            onTap: function onTap(e) {
                                $rootScope.$emit('BackTapped');
                                e.preventDefault();
                            }
                        }, {
                            type: "cancelBut",
                            text: $rootScope.getResourceText('LIT_CANCEL_TEXT'),
                        }, {
                            type: "backSubButton okButton",
                            text: $rootScope.getResourceText('LIT_OK'),
                            onTap: function onTap(e) {
                                var getVisualProm = DeviceUtil.getKeyValueWithSharedPreferences('visualPart');
                                getVisualProm.then(function (data) {
                                    if (data !== null) {
                                        var setProm = DeviceUtil.setKeyValueWithSharedPreferences(
                                            "visualPartSaved",
                                            data
                                        );
                                        $rootScope.saveVisualParts(data);
                                    }
                                });
                            }
                        }]
                    });
                    popUpData.popUpElement.then(function (res) {
                        if (ionic.Platform.isAndroid() == true)
                            screen.orientation.unlock();
                    });
                });
            }
        }
    };
    return popUpData;
}]);
app.directive('lazyBodyDropdown', ["$rootScope", "ionicToast", "$ionicPlatform", "$cordovaNetwork", "LocalStorageHelper", "dropdownValueManager", "CommonMethodsFactory", "$ionicScrollDelegate", "LoaderService", "DeviceUtil", function ($rootScope, ionicToast, $ionicPlatform, $cordovaNetwork, LocalStorageHelper, dropdownValueManager, CommonMethodsFactory, $ionicScrollDelegate, LoaderService, DeviceUtil) {
    return {
        restrict: 'AE',
        templateUrl: 'templates/listPopUp.html',
        scope: {
            onItemSelected: '=itemselected',
            datasource: '=',
            textField: '=',
            valueField: '=',
            selectedDisplayText: '=',
            selectedDataEntity: '=',
            entity: '=',
            entityText: '='
        },
        require: 'ngModel',
        link: function link(scope, element, attr, modelCtrl) {
            if (ionic.Platform.isAndroid() == true)
                screen.orientation.lock("portrait");
            var eleScope = element.scope();
            scope.dataTextField = eleScope[attr.textField];
            scope.dataValueField = attr.valueField;
            scope.dataSelectedTextField = attr.selectedDisplayText;
            scope.isSmallScreenDevice = false;

            scope.isQRCodeReaderEnabled = eleScope[attr.qrCodeReaderEnabled];
            scope.isSearchable = true;

            scope.isAddVisible = false;
            scope.AddText = $rootScope.getResourceText('LIT_MOBILE_ADD_ITEM');

            scope.dataEntity = attr.entity;
            scope.dataEntityText = attr.entityText;

            var dropdownTypeVal = attr.dropdowntype;
            var moduleNameVal = attr.type;
            var columnTypeVal = attr.columntype;
            var enableOnlineSearchVal = attr.enableonline; // Assigning Column sub type value passed from drop down html template

            if (screen.height < 700) {
                scope.isSmallScreenDevice = true;
            }

            var columnSubTypeVal = attr.columnSubType;
            $ionicPlatform.ready(function () {
                scope.searchIcon = $rootScope.getIconValue('Search');
                scope.closeIcon = $rootScope.getIconValue('Close');
                scope.searchText = $rootScope.getResourceText('LIT_SEARCH');
                scope.qrScannerIcon = $rootScope.getIconValue('Scanner');
                scope.flipCameraIcon = $rootScope.getIconValue('Flip');
                scope.flashCameraIcon = $rootScope.getIconValue('Flash');
                scope.scannerCloseIcon = $rootScope.getIconValue('ScannerClose');
            });

            // Below changes are handled for only Body parts Dropdown in Hierarchy View - FT10543
            var easyColType = eleScope.columnType;
            var easyListSource = eleScope.columnsListSource;
            scope.easyDataList;
            var dataStore;

            scope.showParentValueHeader = false; // Parent Value in Header is set to false in default
            scope.selectedItemValue;
            scope.emptyDataList;
            var emptyData;

            $rootScope.$emit('bodyPartsScope', { data: eleScope });

            if (easyColType === 'EasyClassification') {
                easyListSource = eleScope.columnsListSource;
                var bodyTypeVal = eleScope.dropDownTypeVal;
                $rootScope.$emit('bodyTypeListVal', { data: bodyTypeVal });
                treeViewEasy(easyListSource);
            }

            function treeViewEasy(easyData) {
                dataStore = [];
                for (var i = 0; i < easyListSource.length; i++) {
                    if (easyListSource[i].ParentCode === "") {
                        dataStore.push(easyListSource[i]);
                    }
                }
                scope.easyDataList = dataStore;
            }

            scope.showSub = function (item) {
                //making the visual select null to reset it back to normal
                DeviceUtil.setKeyValueWithSharedPreferences("visualPart", null);
                var selectedText = item[scope.dataTextField];
                emptyData = [];
                for (var i = 0; i < easyListSource.length; i++) {
                    if (selectedText === easyListSource[i].Text && easyListSource[i].IsSelectable === false && item[scope.dataValueField] === easyListSource[i].Id) {
                        var easyCode = easyListSource[i].Code;
                        for (var j = 0; j < easyListSource.length; j++) {
                            if (easyCode === easyListSource[j].ParentCode) {
                                $rootScope.$emit("backSubButton", {
                                    data: true
                                });
                                scope.selectedItemValue = selectedText;  // show parent value as header in popup
                                scope.showParentValueHeader = true; // enable header in popup
                                emptyData.push(easyListSource[j]);
                                $ionicScrollDelegate.$getByHandle('childScroll').scrollTop();
                                scope.easyDataList = emptyData;
                            }
                        }
                    }
                }
                if (emptyData.length === 0) {
                    for (var k = 0; k < easyListSource.length; k++) {
                        if (selectedText === easyListSource[k].Text && easyListSource[k].IsSelectable === true) {
                            var selectedItemData = easyListSource[k];
                            scope.tapped(selectedItemData);
                        }
                    }
                }
                scope.buttonText = $rootScope.getResourceText('LIT_BACK');
            };

            $rootScope.$on('BackTapped', function (event, data) {
                scope.showParentValueHeader = false;
                $rootScope.$emit("backSubButton", {
                    data: false
                });
                var easyData = scope.selectedItemValue;
                treeViewEasy(easyData);
            });

            scope.searchModel = { Text: "" };
            var itemListName = attr.datasource; // Defining empty lists to add the drop down data

            var itemList = [];
            var itemListData = [];
            var dropDownType = null;
            var columnType = null;
            var columnSubType = null;
            var isDeviceOnline = $cordovaNetwork.isOnline();
            var type = $cordovaNetwork.getNetwork();
            isDeviceOnline = isDeviceOnline === true || type === 'unknown';
            scope.enableOnline = false;
            scope.isOnlineSearch = false; // Below boolean variable is used to highlight web api returned values

            scope.isOnlineDropDownData = false; // Storing the list data in a temporary list array till the filter is applied

            itemListData = eleScope[itemListName];
            columnType = eleScope[columnTypeVal];
            dropDownType = eleScope[dropdownTypeVal];
            var moduleName = eleScope[moduleNameVal];
            columnSubType = eleScope[columnSubTypeVal]; // Adding filtered list to the actual defined list above

            itemList = dropdownValueManager.filterDropDownDataByModule(itemListData, moduleName, columnType, columnSubType); // Formating columntype value to fetch table name

            var tabname = dropdownValueManager.getTableNameText(dropDownType, columnType, moduleName);
            scope.enableOnline = eleScope[enableOnlineSearchVal]; // If device is online, then enable online button in view or else disable.

            if (isDeviceOnline) {
                scope.isOnlineSearch = eleScope[enableOnlineSearchVal];
            }

            scope.onlineVal = $rootScope.getResourceText('LIT_ONLINE');
            scope.offlineVal = $rootScope.getResourceText('LIT_OFFLINE');

            scope.updateIsOnlineSearch = function (isOnlineSearchValue) {
                if (isDeviceOnline) {
                    scope.isOnlineSearch = !isOnlineSearchValue;

                    if (!scope.isOnlineSearch) {
                        // Assigning local data from the mobile to datasource, when user toggles to offline search mode.
                        scope.dataSource = itemList;
                        scope.isOnlineDropDownData = false;
                    }
                } else {
                    ionicToast.showDefault($rootScope.getResourceText('MSG_CHECK_INTERNET_CONNECTION'));
                }
            }; // Setting max character length (TODO can be added as a setting)


            var maxCharLength = 3; // Method called when online search setting value is true

            scope.callWebApi = function (searchText) {
                // Checking if isOnlineSearch is true (as this can be turned off by the user in view)
                LoaderService.hide();
                if (scope.isOnlineSearch) {
                    var enteredText = searchText[scope.dataTextField];

                    if (enteredText.length > maxCharLength) {
                        // Check if device is online
                        if (isDeviceOnline) {
                            // Check if entered string is valid
                            var isValidText = CommonMethodsFactory.validateSearchText(enteredText);
                            enteredText = CommonMethodsFactory.encodeToBase64(enteredText);
                            /* if (isValidText) {*/
                            var newItemList = []; // Making a web api call for online search
                            // Also filter is applied if the online search performed has a  valid columnsubtype value

                            var dropdownPromise = dropdownValueManager.getDropDownValueBasedOnSearchFilter('search', tabname, moduleName, enteredText, columnSubType);
                            dropdownPromise.then(function (success) {
                                // Filtering the downloaded data before displaying to user
                                // Passing column sub type to filter dropdown based on coluumn sub type  if present
                                newItemList = dropdownValueManager.filterDropDownBasedOnModule(moduleName, success, tabname, dropDownType, columnSubType); // Adding the check for department because adding DisplayText property directly to the Online retreived data.
                                // Once user selects a value the value will be inserted.

                                if (tabname === 'Department') {
                                    newItemList = dropdownValueManager.addDisplayTextToOnlineSearchData(newItemList);
                                } // If filtered data list is not empty assign filtered values
                                // else assign local database fetched values


                                if (newItemList.length !== 0) {
                                    scope.dataSource = newItemList; // Boolean variable is used to highlight the new downloaded data.

                                    scope.isOnlineDropDownData = true;
                                } else {
                                    scope.dataSource = itemList;
                                    scope.isOnlineDropDownData = false;
                                }
                            });
                            //} else {
                            //    ionicToast.showDefault($rootScope.getResourceText('MSG_DATA_NOT_VALID'));
                            //}
                        } else {
                            // in the case of device offline assing local data to drop down
                            scope.dataSource = itemList;
                            scope.isOnlineDropDownData = false;
                        }
                    }
                }
            }; // selectedDataEntity attribute returns the specified entity from the view.
            // selEntity variable will have a value which the user selects in the drop down.
            // Default value is initilized to null.


            var selEntity = ''; // Checking if the attribute is defined in the view. If defined assigning the entity to selEntity variable. 

            if (attr.selectedDataEntity) {
                var selectedEntity = attr.selectedDataEntity;
                selEntity = eleScope[selectedEntity];
            } // method is called when user selects a drop down data and isOnlineSearch value should be true


            function insertDropDownData(itemData) {
                dropdownValueManager.insertDropDownData(tabname, itemData);
            }

            function getDefaultText(itemList, valueId) {
                for (var i = 0; i < itemList.length; i++) {
                    var item = itemList[i];
                    var selectedId = item[scope.dataValueField];

                    if (selectedId == valueId) {
                        // Handling for the scenario where drop downs will have a pre-defined value
                        if (!angular.isUndefined(scope.onItemSelected)) {
                            scope.onItemSelected(item, selEntity);
                        }
                        return item[scope.dataTextField];
                    }
                }
            }

            var valueId = scope.$parent.$eval(attr.ngModel); // Displaying default value for a drop down based on the boolean value 'defaultValue'

            var defaultValue = scope.$parent.$eval(attr.dropdownDefaultValue);

            if (valueId != null && defaultValue) {
                scope.selectedText = getDefaultText(itemList, valueId);
            }

            scope.clearSearch = function () {
                scope.searchModel = { Text: "" }; // Adding this for a scenario, where user has searched for a text, but the result is not what he/she wanted
                // then wants to select a value from local data. so on clear button clicked assigning back to the view.

                scope.dataSource = itemList;
                scope.isOnlineDropDownData = false;
            };

            scope.showFullValue = function () {
                ionicToast.showDefault(scope.selectedText);
            };

            scope.closeKeyBoard = function () {
                cordova.plugins.Keyboard.close();
            };

            scope.getItemWidthForWindow = function () {
                return '100%';
            };

            scope.disableTagButton = function (selectedText) {
                if (selectedText != null) {
                    return {
                        'visibility': 'hidden'
                    };
                }

                return {
                    'visibility': 'visible'
                };
            };

            scope.getDeviceHeight = function () {
                return window.screen.height * window.devicePixelRatio;
            };

            scope.getItemHeightForWindow = function () {
                var deviceHeight = window.screen.height * window.devicePixelRatio;
                var isIOS = (ionic.Platform.isAndroid() == false);
                if (isIOS) {
                    if (deviceHeight <= 960) {
                        return '150px';
                    } else {
                        return '300px';
                    }
                } else {
                    if (deviceHeight <= 500) {
                        return '50px';
                    } else if (deviceHeight <= 750) {
                        return '65px';
                    } else if (deviceHeight <= 1000) {
                        return '260px';
                    } else {
                        return '300px';
                    }
                }
            };

            scope.getPlatformSpecificTemplate = function () {
                // Currently handling only for IOS and Android
                var isIOS = (ionic.Platform.isAndroid() == false);
                if (isIOS) {
                    if (eleScope.columnType === 'EasyClassification') {
                        return 'templates/bodyPart_dropDown_template/iosTemplate.html';
                    }
                } else {
                    if (eleScope.columnType === 'EasyClassification') {
                        return 'templates/bodyPart_dropDown_template/androidTemplate.html';
                    }
                }
            };

            scope.getItemHeight = function (item) {
                var valueField = item[scope.dataTextField];

                if (valueField == undefined) {
                    valueField = '';
                }

                var length = valueField.length;
                var height = length * 1.5;

                if (height < 40) {
                    height = 40;
                }

                return height + 'px';
            };

            scope.dataSource = itemList;

            scope.showCompleteItemText = function (item) {
                ionicToast.showDefault(item.Text);
            };

            $rootScope.saveVisualParts = function (data) {
                scope.tapped(data);
            };

            scope.tapped = function (item) {
                try {
                    var currValue = modelCtrl.$modelValue;
                    var valueField = item[scope.dataValueField];
                    var textField = item[scope.dataSelectedTextField];
                    modelCtrl.$setViewValue(valueField);
                    modelCtrl.$render();

                    if (scope.dataEntityText) {
                        scope.entity[scope.dataEntityText] = textField;
                    }

                    if (!angular.isUndefined(scope.onItemSelected)) {
                        // Callback function called defined in the respective controllers.
                        scope.onItemSelected(item, selEntity);
                    }

                    if (scope.isOnlineSearch) {
                        // Save selected drop down data to local database
                        insertDropDownData(item);
                    }

                    var completed = eleScope.$emit('Completed', {
                        data: textField
                    });
                    if (ionic.Platform.isAndroid() == true)
                        screen.orientation.unlock();
                } catch (e) {
                    console.log(e);
                }
            };
            scope.openScanner = function () {
                //when scanner icon is clickd multiple times then if loop fails and loads previously 
                //loaded values from else loop this prevents from calling document.queryselector every time when scan icon is 
                //clicked
                cordova.plugins.Keyboard.close();
                if (scope.scanItems === null || scope.scanItems === undefined) {
                    var popupView = document.querySelector(".popup-container");
                    var mainView = document.querySelector(".scannerView");
                    var scannerButton = document.querySelector(".scannerButtons");
                    var cancle = document.querySelector(".cancleScan");
                    var flash = document.querySelector(".flashCam");
                    var flipCamera = document.querySelector(".flipCam");
                    var readInputVal = document.querySelector(".searchTextVal");
                    var dropDownPosition = document.querySelector(".lazyDropDownPositionFix");
                    var androidView = document.querySelector(".platform-android");

                    scope.scanItems = {
                        popupContainer: popupView,
                        scannerView: mainView,
                        scannerButton: scannerButton,
                        cancleButton: cancle,
                        flashCamera: flash,
                        flipCamera: flipCamera,
                        read: readInputVal,
                        bodyPosition: dropDownPosition,
                        androidView: androidView
                    };
                } else {
                    var popupView = scope.scanItems.popupContainer;
                    var mainView = scope.scanItems.scannerView;
                    var scannerButton = scope.scanItems.scannerButton;
                    var cancle = scope.scanItems.cancleButton;
                    var flash = scope.scanItems.flashCamera;
                    var flipCamera = scope.scanItems.flipCamera;
                    var readInputVal = scope.scanItems.read;
                    var dropDownPosition = scope.scanItems.bodyPosition;
                    var androidView = scope.scanItems.androidView;
                }

                //blur is added because the Keyboard gets shown when scanning
                //readInputVal.blur();

                //the back button handled for android using an backbutton event
                document.addEventListener('backbutton', function () {
                    if (androidView)
                        androidView.style.setProperty("background-color", "var(--statusbar-bg-color, #2c3445)", "important");
                    mainView.style.visibility = "visible";
                    dropDownPosition.style.setProperty("position", "relative");
                    scannerButton.style.setProperty("visibility", "hidden", "important");
                });

                window.QRScanner.prepare(onDone);

                function onDone(err, status) {
                    if (err) {
                        console.error(err);
                    }
                    if (status.authorized) {
                        //cancle camera is handled here
                        cancle.addEventListener("click", function () {
                            if (status.lightEnabled === true) {
                                window.QRScanner.disableLight(function () {
                                    status.lightEnabled = false;
                                });
                            }
                            window.QRScanner.cancelScan();
                        });

                        //flash light is handled here
                        flash.addEventListener("click", function () {
                            if (status.lightEnabled === false) {
                                window.QRScanner.enableLight(function () {
                                    status.lightEnabled = true;
                                });
                            } else {
                                window.QRScanner.disableLight(function () {
                                    status.lightEnabled = false;
                                });
                            }
                        });

                        //camera fip is handled here
                        flipCamera.addEventListener('click', function () {
                            if (status.currentCamera === 0) {
                                window.QRScanner.useFrontCamera(function () {
                                    status.currentCamera = 1;
                                });
                            } else {
                                window.QRScanner.useBackCamera(function () {
                                    status.currentCamera = 0;
                                });
                            }
                        })

                        //when the scanner is get called the popupview and the body both will be made hidden and the buttons will be made visible
                        if (androidView)
                            androidView.style.setProperty("background-color", "transparent", "important");
                        popupView.style.visibility = "hidden";
                        mainView.style.visibility = "hidden";
                        dropDownPosition.style.setProperty("position", "");
                        scannerButton.style.setProperty("visibility", "visible", "important");
                        window.QRScanner.show(function () {
                            window.QRScanner.scan(displayContents);
                        });
                    }
                }

                function displayContents(err, text) {
                    if (err) {
                        // when the cancle event is gets triggered error loop will be called
                        if (err.name === "SCAN_CANCELED") {
                            //the popupView and body will be set back t0 visible and the buttons to hidden
                            if (androidView)
                                androidView.style.setProperty("background-color", "var(--statusbar-bg-color, #2c3445)", "important");
                            popupView.style.visibility = "visible";
                            mainView.style.visibility = "visible";
                            dropDownPosition.style.setProperty("position", "relative");
                            scannerButton.style.setProperty("visibility", "hidden", "important");
                            // destroy is called because it will close the camera/video preview
                            window.QRScanner.destroy();
                        } else {
                            console.error(err._message);
                        }
                    } else {
                        //if in case the light is on after scanning the below method will off the flash lisht
                        window.QRScanner.disableLight();
                        //and the popupView and body will be set back t0 visible and the buttons to hidden
                        if (androidView)
                            androidView.style.setProperty("background-color", "var(--statusbar-bg-color, #2c3445)", "important");
                        popupView.style.visibility = "visible";
                        mainView.style.visibility = "visible";
                        dropDownPosition.style.setProperty("position", "relative");
                        scannerButton.style.setProperty("visibility", "hidden", "important");
                        window.QRScanner.destroy();
                        scope.searchModel = { Text: "" };
                        //scanned data is passed to call the webapi
                        readInputVal.focus();
                        scope.searchModel[scope.dataTextField] = text;
                        scope.callWebApi(scope.searchModel);
                    }
                }
            };
        }
    };
}]);

app.directive('sortable', ['$ionicGesture', '$ionicScrollDelegate', function ($ionicGesture, $ionicScrollDelegate) {
    return {
        restrict: 'A',
        scope: {
            draggable: '@',
            sorted: '&'
        },
        link: function (scope, element, attrs) {

            var settings = {
                draggable: scope.draggable ? scope.draggable : '.card',
                duration: 200
            };

            var dragging = null, placeholder = null, offsetY = 0, marginTop = 0;
            var cardSet, initialIndex, currentIndex, animating = false;

            var placeholderHeight;
            var scrollInterval;

            var createPlaceholder = function createPlaceholder(height) {
                // Use marginTop to compensate for extra margin when animating the placeholder
                return $('<div></div>')
                    .css({
                        height: height + 'px',
                        marginTop: (currentIndex > 0 ? -marginTop : -1) + 'px'
                    })
                    .addClass('placeholder');
            };

            var touchHold = function touchHold(e) {
                // Get the element we're about to start dragging
                dragging = angular.element(e.target).closest(settings.draggable);
                if (!dragging.length) dragging = null;

                if (dragging) {
                    // Get the initial index
                    initialIndex = currentIndex = dragging.index(settings.draggable);

                    var position = dragging.position();

                    // Get relative position of touch
                    var clientY = e.gesture.touches[0].clientY;
                    offsetY = clientY - position.top - element.offset().top;

                    // Switch to Absolute position at same location
                    dragging.css({
                        position: 'absolute',
                        zIndex: 1000,
                        left: position.left + 'px',
                        top: position.top + 'px',
                        width: dragging.outerWidth() + 'px'
                    })
                        .addClass('dragging');

                    // Get the set of cards that were re-ordering with
                    cardSet = element.find(settings.draggable + ':not(.dragging)');

                    // We need to know the margin size so we can compensate for having two
                    // margins where we previously had one (due to the placeholder being there)
                    marginTop = parseInt(dragging.css('marginTop')) + 1;

                    // Replace with placeholder (add the margin for when placeholder is full size)
                    placeholderHeight = dragging.outerHeight() + marginTop;
                    placeholder = createPlaceholder(placeholderHeight);
                    placeholder.insertAfter(dragging);

                    // Interval to handle auto-scrolling window when at top or bottom
                    // initAutoScroll();
                    // scrollInterval = setInterval(autoScroll, 20);
                }
            };
            var holdGesture = $ionicGesture.on('hold', touchHold, element);

            var touchMove = function touchMove(e) {
                if (dragging) {
                    e.stopPropagation();
                    touchY = e.touches ? e.touches[0].clientY : e.clientY;
                    var newTop = touchY - offsetY - element.offset().top;

                    // Reposition the dragged element
                    dragging.css('top', newTop + 'px');

                    // Check for position in the list
                    var newIndex = 0;
                    cardSet.each(function (i) {
                        if (newTop > $(this).position().top) {
                            newIndex = i + 1;
                        }
                    });

                    if (!animating && newIndex !== currentIndex) {
                        currentIndex = newIndex;

                        var oldPlaceholder = placeholder;
                        // Animate in a new placeholder
                        placeholder = createPlaceholder(1);

                        // Put it in the right place
                        if (newIndex < cardSet.length) {
                            placeholder.insertBefore(cardSet.eq(newIndex));
                        } else {
                            placeholder.insertAfter(cardSet.eq(cardSet.length - 1));
                        }

                        // Animate the new placeholder to full height
                        animating = true;
                        setTimeout(function () {
                            placeholder.css('height', placeholderHeight + 'px');
                            // Animate out the old placeholder
                            oldPlaceholder.css('height', 1);

                            setTimeout(function () {
                                oldPlaceholder.remove();
                                animating = false;
                            }, settings.duration);
                        }, 50);
                    }
                }
            };

            var touchMoveGesture = $ionicGesture.on('touchmove', touchMove, element);
            var mouseMoveGesture = $ionicGesture.on('mousemove', touchMove, element);

            var touchRelease = function touchRelease(e) {
                if (dragging) {
                    // Set element back to normal
                    dragging.css({
                        position: '',
                        zIndex: '',
                        left: '',
                        top: '',
                        width: ''
                    }).removeClass('dragging');

                    // Remove placeholder
                    placeholder.remove();
                    placeholder = null;

                    if (initialIndex !== currentIndex && scope.sorted) {
                        // Call the callback with the instruction to re-order
                        scope.$fromIndex = initialIndex;
                        scope.$toIndex = currentIndex;
                        scope.$apply(scope.sorted);
                    }
                    dragging = null;

                    clearInterval(scrollInterval);
                }
            };
            var releaseGesture = $ionicGesture.on('release', touchRelease, element);

            scope.$on('$destroy', function () {
                $ionicGesture.off(holdGesture, 'hold', touchHold);
                $ionicGesture.off(touchMoveGesture, 'touchmove', touchMove);
                $ionicGesture.off(mouseMoveGesture, 'mousemove', touchMove);
                $ionicGesture.off(releaseGesture, 'onReorder', touchRelease);
            });

            var touchY, scrollHeight, containerTop, maxScroll;
            var scrollBorder = 80, scrollSpeed = 0.2;
            // Setup the autoscroll based on the current scroll window size
            var initAutoScroll = function initAutoScroll() {
                touchY = -1;
                var scrollArea = element.closest('.scroll');
                var container = scrollArea.parent();
                scrollHeight = container.height();
                containerTop = container.position().top;
                maxScroll = scrollArea.height() - scrollHeight;
            };

            // Autoscroll function to scroll window up and down when
            // the touch point is close to the top or bottom
            var autoScroll = function autoScroll() {
                var scrollChange = 0;
                if (touchY >= 0 && touchY < containerTop + scrollBorder) {
                    // Should scroll up
                    scrollChange = touchY - (containerTop + scrollBorder);
                } else if (touchY >= 0 && touchY > scrollHeight - scrollBorder) {
                    // Should scroll down
                    scrollChange = touchY - (scrollHeight - scrollBorder);
                }

                if (scrollChange !== 0) {
                    // get the updated scroll position
                    var newScroll = $ionicScrollDelegate.getScrollPosition().top + scrollSpeed * scrollChange;
                    // Apply scroll limits
                    if (newScroll < 0)
                        newScroll = 0;
                    else if (newScroll > maxScroll)
                        newScroll = maxScroll;

                    // Set the scroll position
                    $ionicScrollDelegate.scrollTo(0, newScroll, false);
                }
            };

        }
    };
}]);

app.directive("vqlistPopup", [
    "$ionicPopup",
    "$rootScope",
    function ($ionicPopup, $rootScope) {
        var vqListPopUpData = {
            restrict: "E",
            tagName: "button",
            transclude: true,
            transElement: null,
            popUpElement: null,
            require: "ngModel",
            link: {
                post: function post(scope, el, att, ctrl, transclude) {
                    var selectedText = att.displayText;
                    scope.$on("Completed", function (obj, val) {
                        selectedText = val.data;

                        el.html(selectedText);
                        vqListPopUpData.popUpElement.close();
                    });
                    el.html(selectedText);
                },
                pre: function pre(scope, el, attrs, ctrl, transclude) {
                    vqListPopUpData.transElement = transclude();
                    el.bind("tap", function () {
                        var html = vqListPopUpData.transElement;
                        vqListPopUpData.popUpElement = $ionicPopup.show({
                            template: html,
                            title: attrs.title,
                            cssClass: "listPopUpClass",
                            scope: scope,
                            buttons: [
                                {
                                    text: $rootScope.getResourceText("LIT_CANCEL_TEXT"),
                                },
                            ],
                        });
                        vqListPopUpData.popUpElement.then(function (res) {
                            if (ionic.Platform.isAndroid() == true)
                                screen.orientation.unlock();
                        });
                    });
                },
            },
        };
        return vqListPopUpData;
    },
]);

app.directive("listPopup", [
    "$ionicPopup",
    "$rootScope",
    function ($ionicPopup, $rootScope) {
        var listPopUpData = {
            restrict: "E",
            tagName: "button",
            transclude: true,
            transElement: null,
            popUpElement: null,
            require: "ngModel",
            link: {
                post: function post(scope, el, att, ctrl, transclude) {
                    var selectedText = att.displayText;
                    scope.$on("Completed", function (obj, val) {
                        selectedText = val.data;

                        el.html(selectedText);
                        listPopUpData.popUpElement.close();
                    });
                    el.html(selectedText);
                },
                pre: function pre(scope, el, attrs, ctrl, transclude) {
                    listPopUpData.transElement = transclude();
                    el.bind("tap", function () {
                        var html = listPopUpData.transElement;
                        listPopUpData.popUpElement = $ionicPopup.show({
                            template: html,
                            title: attrs.title,
                            cssClass: "listPopUpClass",
                            scope: scope,
                            buttons: [
                                {
                                    text: $rootScope.getResourceText("LIT_CANCEL_TEXT"),
                                },
                            ],
                        });
                        listPopUpData.popUpElement.then(function (res) {
                            if (ionic.Platform.isAndroid() == true)
                                screen.orientation.unlock();
                        });
                    });
                },
            },
        };
        return listPopUpData;
    },
]);

app.directive("listDropdown", [
    "QuestionnaireMethodFactory",
    function (QuestionnaireMethodFactory) {
        return {
            restrict: "AE",
            templateUrl:
                "templates/questionnaire/listDropDownTemplates/quesListPopup.html",
            scope: {
                datasource: "=",
                textField: "=",
                valueField: "=",
                getStatus: "=",
                getPQText: "=",
                personQue: "=",
            },
            require: "ngModel",
            link: function link(scope, element, attr, modelCtrl, $scope) {
                var eleScope = element.scope();
                var itemListName = attr.datasource;
                var question = attr.question;
                var itemListData = [];
                var q = [];
                var paqView = [];
                itemListData = eleScope[itemListName];
                q = eleScope[question];
                paqView = eleScope.getPersonQue(q.Id);
                scope.dataSource = itemListData;
                scope.closeKeyBoard = function () {
                    cordova.plugins.Keyboard.close();
                };

                scope.getSpecificTemplate = function () {
                    switch (q.TypeCode) {
                        case 2:
                            return "templates/questionnaire/listDropDownTemplates/specificTemplate/radio.html";
                        case 3:
                            return "templates/questionnaire/listDropDownTemplates/specificTemplate/checkBox.html";
                        default:
                            return null;
                    }
                };

                scope.getDefaultStatus = function (answerOptionId) {
                    var pqaEntity = eleScope.pq.Answers;
                    return QuestionnaireMethodFactory.getDefaultStatus(
                        q.Id,
                        answerOptionId,
                        pqaEntity
                    );
                };

                scope.getPersonQue = function () {
                    return paqView;
                };

                scope.setCheckBoxVal = function (answerOptionId, checkstatus) {
                    eleScope.setCheckVal(answerOptionId, checkstatus, q);
                    ansTapped();
                };

                scope.setRadioBoxVal = function (answerOptionId, event) {
                    eleScope.setRadioVal(q, answerOptionId, event);
                    ansTapped();
                };

                scope.CommentRequiredCheckBox = function (answerOption, status) {
                    eleScope.chkCRCheckBox(answerOption, paqView, status);
                }

                scope.CommentRequiredRadio = function (answerOption) {
                    eleScope.chkCRRadio(answerOption, paqView);
                }

                scope.getItemHeightForWindow = function () {
                    var deviceHeight = window.screen.height * window.devicePixelRatio;
                    var isIOS = ionic.Platform.isAndroid() == false;
                    if (isIOS) {
                        if (deviceHeight <= 960) {
                            return "150px";
                        } else {
                            return "300px";
                        }
                    } else {
                        if (deviceHeight <= 500) {
                            return "50px";
                        } else if (deviceHeight <= 750) {
                            return "65px";
                        } else if (deviceHeight <= 1000) {
                            return "260px";
                        } else {
                            return "300px";
                        }
                    }
                };

                function ansTapped() {
                    try {
                        var textField = eleScope.getPQText(q);
                        if (textField === undefined) {
                            textField = "";
                        }
                        var completed = eleScope.$emit("Completed", {
                            data: textField,
                        });
                        if (ionic.Platform.isAndroid() == true)
                            screen.orientation.unlock();
                    } catch (e) {
                        console.log(e);
                    }
                }
            },
        };
    },
]);

app.directive("vqlistDropdown", [
    "QuestionnaireMethodFactory",
    function (QuestionnaireMethodFactory) {
        return {
            restrict: "AE",
            templateUrl:
                "templates/questionnaire/listDropDownTemplates/quesListPopup.html",
            scope: {
                datasource: "=",
                textField: "=",
                valueField: "=",
                getStatus: "=",
                getVQText: "=",
                personQue: "=",
            },
            require: "ngModel",
            link: function link(scope, element, attr, modelCtrl, $scope) {
                var eleScope = element.scope();
                var itemListName = attr.datasource;
                var question = attr.question;
                var valuationQue = attr.valuationQue;
                var itemListData = [];
                var q = [];
                var vq = [];
                itemListData = eleScope[itemListName];
                q = eleScope[question];
                vq = eleScope.valuationQue;
                scope.dataSource = itemListData;

                scope.closeKeyBoard = function () {
                    cordova.plugins.Keyboard.close();
                };

                scope.getPersonQue = function () {
                    return eleScope.getPersonQue(q.Id, vq.Id);
                };

                scope.getSpecificTemplate = function () {
                    switch (vq.TypeCode) {
                        case 2:
                            return "templates/questionnaire/listDropDownTemplates/specificTemplate/radio.html";
                        case 3:
                            return "templates/questionnaire/listDropDownTemplates/specificTemplate/checkBox.html";
                        default:
                            return null;
                    }
                };

                scope.getDefaultStatus = function (answerOptionId) {
                    var pvqaEntity = eleScope.pq.ValuationAnswers;
                    return QuestionnaireMethodFactory.getVQDefaultStatus(
                        q.Id,
                        vq.Id,
                        answerOptionId,
                        pvqaEntity
                    );
                };

                scope.setCheckBoxVal = function (answerOptionId, checkstatus) {
                    eleScope.setCheckVal(q.Id, vq.Id, answerOptionId, checkstatus);
                    ansTapped();
                };

                scope.setRadioBoxVal = function (answerOptionId, event) {
                    eleScope.setRadioVal(q.Id, vq.Id, answerOptionId, event);
                    ansTapped();
                };

                scope.getItemHeightForWindow = function () {
                    var deviceHeight = window.screen.height * window.devicePixelRatio;
                    var isIOS = ionic.Platform.isAndroid() == false;
                    if (isIOS) {
                        if (deviceHeight <= 960) {
                            return "150px";
                        } else {
                            return "300px";
                        }
                    } else {
                        if (deviceHeight <= 500) {
                            return "50px";
                        } else if (deviceHeight <= 750) {
                            return "65px";
                        } else if (deviceHeight <= 1000) {
                            return "260px";
                        } else {
                            return "300px";
                        }
                    }
                };

                function ansTapped() {
                    try {
                        var textField = eleScope.getVQText(q, vq);
                        if (textField === undefined) {
                            textField = "";
                        }
                        var completed = eleScope.$emit("Completed", {
                            data: textField,
                        });
                        if (ionic.Platform.isAndroid() == true)
                            screen.orientation.unlock();
                    } catch (e) {
                        console.log(e);
                    }
                }
            },
        };
    },
]);

app.directive("mapTemplate", function () {
    return {
        restrict: "EA",
        replace: true,
        link: function link(scope, element, attrs) {
            scope.isPdfEmail = attrs.isPdfEmail;
        },
        controller: ["$scope", "$injector", "customersManager", "userDetailsManager", "$state", "$timeout", "FileUtil", "PopupUtil", "$rootScope", "LoaderService", "CommonMethodsFactory", "personQuestionnaireManager", "$q",
            function ($scope, $injector, customersManager, userDetailsManager, $state, $timeout, FileUtil, PopupUtil, $rootScope, LoaderService, CommonMethodsFactory, personQuestionnaireManager, $q) {
                $scope.isDisabled = true;
                $scope.customClass = "ErrorClass";
                var userDetails = userDetailsManager.getUserLastLoggedTimeStamp();
                var geoTimeOut = userDetails.Customer.GeoLocationTimeout;
                var geoEnableHighAccuracy =
                    userDetails.Customer.EnableHighAccuracyForGeoLocation;
                var options = {
                    timeout: geoTimeOut,
                    enableHighAccuracy: geoEnableHighAccuracy,
                };
                if ($scope.data.GeoX && $scope.data.GeoY) {
                    $scope.customClass = "SuccessClass";
                    if ($scope.data.Address) {
                        $scope.isDisabled = false;
                    }
                } else {
                    LoaderService.show();
                    navigator.geolocation.getCurrentPosition(
                        function (s) {
                            LoaderService.hide();
                            $scope.customClass = "SuccessClass";
                            $scope.data.GeoY = s.coords.latitude;
                            $scope.data.GeoX = s.coords.longitude;
                        },
                        function (e) {
                            LoaderService.hide();
                            $scope.customClass = "ErrorClass";
                        },
                        options
                    );
                }
                $scope.openMap = function () {
                    var GeoX = $scope.data.GeoY;
                    var GeoY = $scope.data.GeoX;
                    var isEnableLocation = userDetails.Customer.EnableGeoLocation;
                    var geoLocationPromise = $q.defer();
                    LoaderService.show();

                    if (isEnableLocation) {
                        if (GeoX && GeoY) {
                            ShowMap(GeoX, GeoY);
                        } else {
                            var sucessGeo = onLocationSucess.bind(this, [geoLocationPromise]);
                            var failureGeo = onLocationFailure.bind(this, [
                                geoLocationPromise,
                            ]);
                            navigator.geolocation.getCurrentPosition(
                                sucessGeo,
                                failureGeo,
                                options
                            );
                        }
                    } else {
                        geoLocationPromise.resolve({
                            x: null,
                            y: null,
                        });
                    }

                    geoLocationPromise.promise.then(function (resolvedLocation) {
                        var x = resolvedLocation.x;
                        var y = resolvedLocation.y;
                        if (x && y) {
                            ShowMap(x, y);
                        }
                    });
                };

                function onLocationSucess(geoPromise, position) {
                    var xVal = position.coords.latitude;
                    var yVal = position.coords.longitude;
                    geoPromise[0].resolve({
                        x: xVal,
                        y: yVal,
                    });
                }

                function onLocationFailure(geoPromise, location) {
                    LoaderService.hide();
                    var title = $rootScope.getResourceText(
                        "LIT_MOBILE_ENABLE_LOCATION_ACCESS"
                    );
                    var resourceText = $rootScope.getResourceText("MSG_MOBILE_MAP_ERROR");
                    PopupUtil.alert(title, resourceText);
                    geoPromise[0].resolve({
                        x: null,
                        y: null,
                    });
                }

                function ShowMap(GeoX, GeoY) {
                    LoaderService.hide();
                    var val;
                    var nameInterval;
                    var output = null;
                    var options =
                        "location=yes,clearcache=yes,clearsessioncache=yes,cleardata=yes";
                    var url = CommonMethodsFactory.getCustomerSpecificUrlForMap(GeoX, GeoY);
                    var win = CommonMethodsFactory.openInAppBrowser(url, "_blank", options);
                    var locationPickPromise = $q.defer();

                    if (win != null) {
                        win.addEventListener("loadstop", function () {
                            nameInterval = setInterval(function () {
                                win.executeScript(
                                    {
                                        code: "if(window.localStorage){window.localStorage.getItem('GeoLocationValues');}",
                                    },
                                    function (values) {
                                        val = values[0];
                                        if (val && val.length > 0) {
                                            win.executeScript({
                                                code: "if(window.localStorage){window.localStorage.removeItem('GeoLocationValues');}",
                                            });
                                            window.localStorage.setItem("GeoLocationValues", val);
                                        }
                                    }
                                );
                            }, 100);
                        });

                        win.addEventListener("exit", function () {
                            clearInterval(nameInterval);
                            var GeoLocationValues = window.localStorage.getItem("GeoLocationValues");
                            window.localStorage.removeItem("GeoLocationValues");
                            if (GeoLocationValues) {
                                output = JSON.parse(GeoLocationValues);
                                locationPickPromise.resolve({
                                    GeoX: output.loc.lat,
                                    GeoY: output.loc.long,
                                    Address: output.address
                                });
                            }
                        });
                    }


                    $rootScope.$on("getGeoLocationValues", function (event, data) {
                        output = JSON.parse(data);
                        locationPickPromise.resolve({
                            GeoX: output.loc.lat,
                            GeoY: output.loc.long,
                            Address: output.address
                        });
                    });

                    locationPickPromise.promise.then(function (resolvedLocation) {
                        $scope.customClass = "SuccessClass";
                        var GeoX = resolvedLocation.GeoX;
                        var GeoY = resolvedLocation.GeoY;
                        $scope.data.GeoX = GeoY;
                        $scope.data.GeoY = GeoX;
                        $scope.isDisabled = false;
                        if (resolvedLocation.Address) {
                            $scope.isDisabled = false;
                            $scope.data.Address = Address(resolvedLocation.Address);
                        }
                    });
                }

                function Address(a) {
                    var body = null;
                    for (var i = 0; i < a.length; i++) {
                        if (body != null && i != a.length - 1) {
                            body += `${a[i].long_name}, `;
                        } else if (i == a.length - 1) {
                            body += `${a[i].long_name}`;
                        } else {
                            body = `${a[i].long_name}, `;
                        }
                    }
                    var divElement = `<span>${body}</span>`;
                    return divElement;
                }
            },
        ],
    };
});

app.directive("damagePopup", ["$ionicPopup", "$rootScope", "$timeout",
    function ($ionicPopup, $rootScope, $timeout) {
        var popUpData = {
            restrict: "E",
            tagName: "button",
            transclude: true,
            transElement: null,
            popUpElement: null,
            require: "ngModel",
            link: {
                post: function post(scope, el, att, ctrl, transclude) {
                    var selectedText = att.displayText;
                    if (!selectedText && scope.personAkStepColumnAnswer && scope.personAkStepColumnAnswer.AnswerText) {
                        scope.$emit("SetSelectedText", {
                            ids: scope.personAkStepColumnAnswer.AnswerText.split(',')
                        })
                    }
                    scope.$on("Completed", function (obj, val) {
                        selectedText = val.data;

                        el.html(selectedText);
                        popUpData.popUpElement.close();
                    });
                    el.html(selectedText);
                },
                pre: function pre(scope, el, attrs, ctrl, transclude) {
                    var selectedListIds = [];
                    var unSelectedIds = [];
                    var data = scope.columnsListSource;
                    scope.$on("SelectedListId", function (obj, val) {
                        if (selectedListIds.length > 0) {
                            for (var i = 0; i < selectedListIds.length; i++) {
                                if (!val.status) {
                                    unSelectedIds.push(val.Id);
                                    if (selectedListIds[i] == val.Id)
                                        var slicedId = selectedListIds.splice(selectedListIds.indexOf(val.Id), 1);
                                    break;
                                } else if (val.status) {
                                    selectedListIds.push(val.Id);
                                    break;
                                }
                            }
                        } else {
                            if (val.status) {
                                selectedListIds.push(val.Id);
                            } else {
                                unSelectedIds.push(val.Id);
                            }
                        }
                    });
                    scope.$on("SetSelectedText", function (obj, val) {
                        var selectedText = null;
                        for (var i = 0; i < data.length; i++) {
                            for (var j = 0; j < val.ids.length; j++) {
                                if (data[i].Id == val.ids[j]) {
                                    if (selectedText == null)
                                        selectedText = data[i].Text;
                                    else
                                        selectedText = selectedText + ',' + data[i].Text;
                                }
                            }
                        }
                        if (scope.personAkStepColumnAnswer)
                            scope.personAkStepColumnAnswer.AnswerText = val.ids.toString();
                        var completed = scope.$emit('Completed', {
                            data: selectedText
                        });
                    });
                    popUpData.transElement = transclude();
                    el.bind("tap", function () {
                        var html = popUpData.transElement;
                        popUpData.popUpElement = $ionicPopup.show({
                            template: html,
                            title: attrs.title,
                            cssClass: "listPopUpClass",
                            scope: scope,
                            buttons: [
                                {
                                    text: $rootScope.getResourceText("LIT_CANCEL_TEXT"),
                                },
                                {
                                    type: "DamageVisualSelectButton okButton",
                                    text: $rootScope.getResourceText("LIT_OK"),
                                    onTap: function (e) {
                                        var seletedIds = $("#sedan").mapster('get');
                                        selectedListIds = seletedIds.split(',');
                                        scope.$emit("SetSelectedText", {
                                            ids: selectedListIds
                                        })
                                        $("#sedan").mapster('unbind');
                                        $rootScope.checkDependency();
                                        selectedListIds = [];
                                    }
                                },
                                {
                                    type: "DamageListSelectButton okButton",
                                    text: $rootScope.getResourceText("LIT_OK"),
                                    onTap: function (e) {
                                        var previousSelectedids = [];
                                        //need to pass the previous selected values along with new selected ids
                                        if (scope.personAkStepColumnAnswer && scope.personAkStepColumnAnswer.AnswerText)
                                            previousSelectedids = scope.personAkStepColumnAnswer.AnswerText.split(',');

                                        if (previousSelectedids.length > 0) {

                                            if (unSelectedIds.length > 0) {
                                                for (var i = 0; i < unSelectedIds.length; i++) {
                                                    if (previousSelectedids.includes(unSelectedIds[i]))
                                                        var slicedPreviousid = previousSelectedids.splice(previousSelectedids.indexOf(unSelectedIds[i]), 1);
                                                }
                                            }

                                            if (selectedListIds.length > 0) {
                                                for (var i = 0; i < previousSelectedids.length; i++) {
                                                    if (!selectedListIds.includes(previousSelectedids[i])) {
                                                        selectedListIds.push(previousSelectedids[i]);
                                                    }
                                                }
                                            } else {
                                                selectedListIds = previousSelectedids;
                                            }
                                        }

                                        scope.$emit("SetSelectedText", {
                                            ids: selectedListIds
                                        });
                                        $rootScope.checkDependency();
                                        selectedListIds = [];
                                        unSelectedIds = [];
                                    }
                                },
                            ],
                        });
                        popUpData.popUpElement.then(function (res) {
                            if (ionic.Platform.isAndroid() == true)
                                screen.orientation.unlock();
                        });
                    });
                },
            },
        };
        return popUpData;
    },
]);

app.directive("damageSelector", ["$rootScope", "DeviceUtil", function ($rootScope,) {
    return {
        restrict: "AE",
        templateUrl: "templates/VehicleDamage/damagePicker.html",
        link: function link(scope, element, attr, modelCtrl) {
            if (ionic.Platform.isAndroid() == true)
                screen.orientation.lock("portrait");
            scope.pickDamagePartVisually = function () {
                scope.$emit("VisualDamage", {});
                var virtualEle = document.querySelector("damage-selector");
                if (virtualEle)
                    virtualEle.style.display = "none";
                var manualEle = document.querySelector("vehicle-damage");
                if (manualEle)
                    manualEle.style.display = "block";

                var elementOkButton = document.getElementsByClassName("DamageVisualSelectButton");
                if (elementOkButton.length > 0) {
                    elementOkButton[0].classList.remove("DamageVisualSelectButton");
                }
            };
            scope.pickDamagePartManually = function () {
                var virtualEle = document.querySelector("damage-selector");
                virtualEle.style.display = "none";
                var manualEle = document.querySelector("vehicle-damage-list");
                manualEle.style.display = "block";
                manualEle.style.position = "relative";
                var elementOkButton = document.getElementsByClassName("DamageListSelectButton");
                if (elementOkButton.length > 0) {
                    elementOkButton[0].classList.remove("DamageListSelectButton");
                }
            };
        },
    };
},
]);

app.directive("vehicleDamage", ["$rootScope", "ionicToast", "$timeout",
    function ($rootScope, ionicToast, $timeout) {
        return {
            restrict: "AE",
            templateUrl: "templates/VehicleDamage/damage.html",
            link: function link(scope, element, attr, modelCtrl) {
                var preselectedarea = [];
                var data = scope.columnsListSource;
                if (scope.personAkStepColumnAnswer) {
                    var selectedIds = scope.personAkStepColumnAnswer.AnswerText;
                    if (selectedIds) {
                        selectedIds = selectedIds.split(',');
                        for (var i = 0; i < selectedIds.length; i++) {
                            preselectedarea.push({
                                key: selectedIds[i],
                                selected: true,
                            })
                        }
                    }
                }

                scope.$on("VisualDamage", function () {
                    $timeout(function () {
                        ImageMap();
                    }, 200);
                });
                function ImageMap() {
                    var $sedanCar = $("#sedan");

                    $(document).ready(function () {
                        var opts;
                        var mapsterConfigured = function () {
                            opts = $sedanCar.mapster("get_options", null, true);
                        };
                        var handleCLick = function (e) {
                            if (data.length > 0) {
                                tosterText(e.key);
                            }
                        }

                        function tosterText(key) {
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].Id == key) {
                                    return ionicToast.showDefault(data[i].Text);
                                }
                            }
                        }

                        var default_options = {
                            enableAutoResizeSupport: true,
                            autoResize: true,
                            autoResizeDelay: 0,
                            autoResizeDuration: 0,
                            resize: true,
                            fillOpacity: 0.5,
                            render_highlight: {
                                fillColor: "0075ff",
                                stroke: true,
                            },
                            render_select: {
                                fillColor: "ff000c",
                                stroke: false,
                            },
                            mouseoutDelay: 0,
                            fadeInterval: 50,
                            isSelectable: true,
                            singleSelect: false,
                            mapKey: "data-id",
                            mapValue: "data-text",
                            listKey: "name",
                            listSelectedAttribute: "checked",
                            onConfigured: mapsterConfigured,
                            areas: preselectedarea,
                            onClick: function (data) {
                                $timeout(function () {
                                    handleCLick(data);
                                })
                            }
                        };

                        $sedanCar.mapster(default_options);
                    });
                }
            },
        };
    },
]);

app.directive('vehicleDamageList', ["$rootScope", "ionicToast", "$ionicPlatform", "$cordovaNetwork", "LocalStorageHelper", "dropdownValueManager", "CommonMethodsFactory", "$ionicScrollDelegate", "LoaderService", "DeviceUtil", function ($rootScope, ionicToast, $ionicPlatform, $cordovaNetwork, LocalStorageHelper, dropdownValueManager, CommonMethodsFactory, $ionicScrollDelegate, LoaderService, DeviceUtil) {
    return {
        restrict: 'AE',
        templateUrl: 'templates/listPopUp.html',
        scope: {
            onItemSelected: '=itemselected',
            datasource: '=',
            textField: '=',
            valueField: '=',
            selectedDisplayText: '=',
            selectedDataEntity: '=',
            entity: '=',
            entityText: '='
        },
        require: 'ngModel',
        link: function link(scope, element, attr, modelCtrl) {
            if (ionic.Platform.isAndroid() == true)
                screen.orientation.lock("portrait");
            var eleScope = element.scope();
            scope.dataTextField = eleScope[attr.textField];
            scope.dataValueField = attr.valueField;
            scope.dataSelectedTextField = attr.selectedDisplayText;
            scope.isSmallScreenDevice = false;

            scope.isQRCodeReaderEnabled = true;
            scope.isSearchable = true;

            scope.isAddVisible = false;
            scope.AddText = $rootScope.getResourceText('LIT_MOBILE_ADD_ITEM');

            var entityName = attr.entity;
            scope.dataEntityText = attr.entityText;

            var itemListName = attr.datasource;
            var data = eleScope[itemListName];
            var entity = eleScope[entityName];

            scope.itemListData = data;

            if (screen.height < 700) {
                scope.isSmallScreenDevice = true;
            }
            $ionicPlatform.ready(function () {
                scope.searchIcon = $rootScope.getIconValue('Search');
                scope.closeIcon = $rootScope.getIconValue('Close');
                scope.searchText = $rootScope.getResourceText('LIT_SEARCH');
                scope.qrScannerIcon = $rootScope.getIconValue('Scanner');
                scope.flipCameraIcon = $rootScope.getIconValue('Flip');
                scope.flashCameraIcon = $rootScope.getIconValue('Flash');
                scope.scannerCloseIcon = $rootScope.getIconValue('ScannerClose');
            });


            scope.showParentValueHeader = false;
            scope.searchModel = { Text: "" };

            var isDeviceOnline = $cordovaNetwork.isOnline();
            var type = $cordovaNetwork.getNetwork();
            isDeviceOnline = isDeviceOnline === true || type === "unknown";
            scope.enableOnline = false;
            scope.isOnlineSearch = false; // Below boolean variable is used to highlight web api returned values

            scope.enableOnline = false; // If device is online, then enable online button in view or else disable.

            if (isDeviceOnline) {
                scope.isOnlineSearch = false;
            }

            scope.onlineVal = $rootScope.getResourceText('LIT_ONLINE');
            scope.offlineVal = $rootScope.getResourceText('LIT_OFFLINE');

            scope.updateIsOnlineSearch = function (isOnlineSearchValue) {
                if (isDeviceOnline) {
                    scope.isOnlineSearch = !isOnlineSearchValue;

                    if (!scope.isOnlineSearch) {
                        // Assigning local data from the mobile to datasource, when user toggles to offline search mode.
                        scope.dataSource = itemList;
                        scope.isOnlineDropDownData = false;
                    }
                } else {
                    ionicToast.showDefault($rootScope.getResourceText('MSG_CHECK_INTERNET_CONNECTION'));
                }
            };


            var maxCharLength = 3; // Method called when online search setting value is true

            scope.callWebApi = function (searchText) {
                LoaderService.hide();
            };

            scope.setCheckBoxVal = function (id, status) {
                if (id) {
                    scope.$emit("SelectedListId", {
                        Id: id,
                        status: status
                    })
                }
            }

            scope.getDefaultStatus = function (id) {
                if (entity && entity.AnswerText) {
                    var selectedIds = entity.AnswerText.split(',');
                    for (var i = 0; i < selectedIds.length; i++) {
                        if (selectedIds[i] == id) {
                            return true;
                        }
                    }
                }
                return false;
            }

            scope.clearSearch = function () {
                scope.searchModel = { Text: "" };
            };

            scope.showFullValue = function () {
                ionicToast.showDefault(scope.selectedText);
            };

            scope.closeKeyBoard = function () {
                cordova.plugins.Keyboard.close();
            };

            scope.getItemWidthForWindow = function () {
                return '100%';
            };

            scope.getDeviceHeight = function () {
                return window.screen.height * window.devicePixelRatio;
            };

            scope.getItemHeightForWindow = function () {
                var deviceHeight = window.screen.height * window.devicePixelRatio;
                var isIOS = (ionic.Platform.isAndroid() == false);
                if (isIOS) {
                    if (deviceHeight <= 960) {
                        return '150px';
                    } else {
                        return '300px';
                    }
                } else {
                    if (deviceHeight <= 500) {
                        return '50px';
                    } else if (deviceHeight <= 750) {
                        return '65px';
                    } else if (deviceHeight <= 1000) {
                        return '260px';
                    } else {
                        return '300px';
                    }
                }
            };

            scope.getPlatformSpecificTemplate = function () {
                //If it doesnt work properly in iOS need to add this below code with iOS specific template
                // Currently handling only for IOS and Android
                //var isIOS = (ionic.Platform.isAndroid() == false);
                //if (isIOS) {
                //    return 'templates/VehicleDamage/AndroidVehicleDamageList.html';
                //} else {
                //    return 'templates/VehicleDamage/AndroidVehicleDamageList.html';
                //}
                return 'templates/VehicleDamage/AndroidVehicleDamageList.html';
            };

            scope.getItemHeight = function (item) {
                var valueField = item[scope.dataTextField];

                if (valueField == undefined) {
                    valueField = '';
                }

                var length = valueField.length;
                var height = length * 1.5;

                if (height < 40) {
                    height = 40;
                }

                return height + 'px';
            };

            scope.showCompleteItemText = function (item) {
                ionicToast.showDefault(item.Text);
            };

            scope.openScanner = function () {
                //when scanner icon is clickd multiple times then if loop fails and loads previously 
                //loaded values from else loop this prevents from calling document.queryselector every time when scan icon is 
                //clicked
                cordova.plugins.Keyboard.close();
                if (scope.scanItems === null || scope.scanItems === undefined) {
                    var popupView = document.querySelector(".popup-container");
                    var mainView = document.querySelector(".scannerView");
                    var scannerButton = document.querySelector(".scannerButtons");
                    var cancle = document.querySelector(".cancleScan");
                    var flash = document.querySelector(".flashCam");
                    var flipCamera = document.querySelector(".flipCam");
                    var readInputVal = document.querySelector(".searchTextVal");
                    var dropDownPosition = document.querySelector(".lazyDropDownPositionFix");
                    var androidView = document.querySelector(".platform-android");

                    scope.scanItems = {
                        popupContainer: popupView,
                        scannerView: mainView,
                        scannerButton: scannerButton,
                        cancleButton: cancle,
                        flashCamera: flash,
                        flipCamera: flipCamera,
                        read: readInputVal,
                        bodyPosition: dropDownPosition,
                        androidView: androidView
                    };
                } else {
                    var popupView = scope.scanItems.popupContainer;
                    var mainView = scope.scanItems.scannerView;
                    var scannerButton = scope.scanItems.scannerButton;
                    var cancle = scope.scanItems.cancleButton;
                    var flash = scope.scanItems.flashCamera;
                    var flipCamera = scope.scanItems.flipCamera;
                    var readInputVal = scope.scanItems.read;
                    var dropDownPosition = scope.scanItems.bodyPosition;
                }

                //blur is added because the Keyboard gets shown when scanning
                //readInputVal.blur();

                //the back button handled for android using an backbutton event
                document.addEventListener('backbutton', function () {
                    if (androidView)
                        androidView.style.setProperty("background-color", "var(--statusbar-bg-color, #2c3445)", "important");
                    mainView.style.visibility = "visible";
                    dropDownPosition.style.setProperty("position", "relative");
                    scannerButton.style.setProperty("visibility", "hidden", "important");
                });

                window.QRScanner.prepare(onDone);

                function onDone(err, status) {
                    if (err) {
                        console.error(err);
                    }
                    if (status.authorized) {
                        //cancle camera is handled here
                        cancle.addEventListener("click", function () {
                            if (status.lightEnabled === true) {
                                window.QRScanner.disableLight(function () {
                                    status.lightEnabled = false;
                                });
                            }
                            window.QRScanner.cancelScan();
                        });

                        //flash light is handled here
                        flash.addEventListener("click", function () {
                            if (status.lightEnabled === false) {
                                window.QRScanner.enableLight(function () {
                                    status.lightEnabled = true;
                                });
                            } else {
                                window.QRScanner.disableLight(function () {
                                    status.lightEnabled = false;
                                });
                            }
                        });

                        //camera fip is handled here
                        flipCamera.addEventListener('click', function () {
                            if (status.currentCamera === 0) {
                                window.QRScanner.useFrontCamera(function () {
                                    status.currentCamera = 1;
                                });
                            } else {
                                window.QRScanner.useBackCamera(function () {
                                    status.currentCamera = 0;
                                });
                            }
                        })

                        //when the scanner is get called the popupview and the body both will be made hidden and the buttons will be made visible
                        if (androidView)
                            androidView.style.setProperty("background-color", "transparent", "important");
                        popupView.style.visibility = "hidden";
                        mainView.style.visibility = "hidden";
                        dropDownPosition.style.setProperty("position", "");
                        scannerButton.style.setProperty("visibility", "visible", "important");
                        window.QRScanner.show(function () {
                            window.QRScanner.scan(displayContents);
                        });
                    }
                }

                function displayContents(err, text) {
                    if (err) {
                        // when the cancle event is gets triggered error loop will be called
                        if (err.name === "SCAN_CANCELED") {
                            //the popupView and body will be set back t0 visible and the buttons to hidden
                            if (androidView)
                                androidView.style.setProperty("background-color", "var(--statusbar-bg-color, #2c3445)", "important");
                            popupView.style.visibility = "visible";
                            mainView.style.visibility = "visible";
                            dropDownPosition.style.setProperty("position", "relative");
                            scannerButton.style.setProperty("visibility", "hidden", "important");
                            // destroy is called because it will close the camera/video preview
                            window.QRScanner.destroy();
                        } else {
                            console.error(err._message);
                        }
                    } else {
                        //if in case the light is on after scanning the below method will off the flash lisht
                        window.QRScanner.disableLight();
                        //and the popupView and body will be set back t0 visible and the buttons to hidden
                        if (androidView)
                            androidView.style.setProperty("background-color", "var(--statusbar-bg-color, #2c3445)", "important");
                        popupView.style.visibility = "visible";
                        mainView.style.visibility = "visible";
                        dropDownPosition.style.setProperty("position", "relative");
                        scannerButton.style.setProperty("visibility", "hidden", "important");
                        window.QRScanner.destroy();
                        scope.searchModel = { Text: "" };
                        //scanned data is passed to call the webapi
                        readInputVal.focus();
                        scope.searchModel[scope.dataTextField] = text;
                        scope.callWebApi(scope.searchModel);
                    }
                }
            };

            $rootScope.checkDependency = function () {
                scope.handleDependency();
            }

            scope.handleDependency = function () {
                if (!angular.isUndefined(scope.onItemSelected)) {
                    scope.onItemSelected();
                }
            }
        }
    };
}]);

app.directive('assetScanner', ["QuestionnaireUtility", "PopupUtil", "LoaderService", "userDetailsManager", "userApplicationsManager", "$rootScope", "FileUtil", "DocumentLibraryUtil", "CommonMethodsFactory",
    function (QuestionnaireUtility, PopupUtil, LoaderService, userDetailsManager, userApplicationsManager, $rootScope, FileUtil, DocumentLibraryUtil, CommonMethodsFactory) {
        return {
            restrict: 'A',
            template: '<button class="scanCamCss button notificationIcon button-clear" ng-click="openScanner()"><img src="images/qrcode-wh.png" /></button>',
            link: function (scope, element, attrs) {
                scope.code = null;
                scope.isSmallScreenDevice = false;
                scope.assetScanItems = null;
                scope.popup = null;
                scope.title = null;
                scope.headerColor = "rgb(104, 33, 122)";
                scope.showList = true;
                scope.isDocOpened = false;
                scope.isDocReadyForSign = false;
                scope.currentOpenedDoc = null;
                scope.signatureVal = {
                    IsDoneSign: false,
                    ShowButton: false
                };
                scope.postData = {
                    assetId: null,
                    qrCodeFieldValue: null,
                    documentVersionId: null,
                    userId: null,
                    signatureImage: null,
                    signedDate: null,
                    comment: null
                };
                scope.directiveScope = null;
                scope.DocSignedList = [];
                scope.DocToBeSignedList = [];
                scope.DocNoSignList = [];
                scope.toogleList = {
                    showSigned: false,
                    showToSign: true,
                    showNoSIgn: false
                }

                scope.userDetails = userDetailsManager.getUserLastLoggedTimeStamp();
                scope.userApplicationsDetails = userApplicationsManager.getUserApplications(scope.userDetails.UserId);

                for (var i = 0; i < scope.userApplicationsDetails.length; i++) {
                    if (scope.userApplicationsDetails[i].Text == 'DocumentLibrary') scope.headerColor = scope.userApplicationsDetails[i].ColourCode;
                }

                if (screen.height < 700) {
                    scope.isSmallScreenDevice = true;
                }

                scope.open = function () {
                    scope.showList = false;
                    scope.isDocOpened = true;
                }

                scope.getItemHeightForWindow = function () {
                    var deviceHeight = window.screen.height * window.devicePixelRatio;
                    var isIOS = (ionic.Platform.isAndroid() == false);
                    if (isIOS) {
                        if (deviceHeight <= 960) {
                            return '150px';
                        } else {
                            return '300px';
                        }
                    } else {
                        if (deviceHeight <= 500) {
                            return '50px';
                        } else if (deviceHeight <= 750) {
                            return '65px';
                        } else if (deviceHeight <= 1000) {
                            return '260px';
                        } else {
                            return '300px';
                        }
                    }
                };


                scope.openScanner = function () {
                    /*document.body.style.backgroundColor = "transparent";
                    var assetScannerButton = document.querySelector(".assetScannerButtons");
                    var assetCancle = document.querySelector(".assetCancleScan");
                    var assetFlash = document.querySelector(".assetFlashCam");
                    window.QRScanner.prepare(function () {
                        document.body.style.visibility = "hidden";
                        assetScannerButton.style.setProperty("visibility", "visible", "important");
                        assetCancle.style.setProperty("visibility", "visible", "important");
                        assetFlash.style.setProperty("visibility", "visible", "important");
                        window.QRScanner.show();
                    });*/

                    //document.body.style.backgroundColor = "transparent";
                    document.body.style.setProperty("background-color", "transparent", "important");
                    var assetScannerButton = document.querySelector(".assetScannerButtons");
                    var assetCancle = document.querySelector(".assetCancleScan");
                    var assetFlash = document.querySelector(".assetFlashCam");
                    var scannerView = document.querySelector(".scannerView");

                    window.QRScanner.prepare(function (err, status) {


                        document.body.style.visibility = "hidden";
                        assetScannerButton.style.setProperty("visibility", "visible", "important");
                        scannerView.style.setProperty("visibility", "hidden", "important");
                        assetCancle.style.setProperty("visibility", "visible", "important");
                        assetFlash.style.setProperty("visibility", "visible", "important");


                        if (status.authorized) {
                            assetCancle.addEventListener("click", function () {
                                if (status.lightEnabled === true) {
                                    window.QRScanner.disableLight(function () {
                                        status.lightEnabled = false;
                                    });
                                }
                                window.QRScanner.cancelScan();
                            });

                            assetFlash.addEventListener("click", function () {
                                if (status.lightEnabled === false) {
                                    window.QRScanner.enableLight(function () {
                                        status.lightEnabled = true;
                                    });
                                } else {
                                    window.QRScanner.disableLight(function () {
                                        status.lightEnabled = false;
                                    });
                                }
                            });

                            window.QRScanner.show(function () {
                                window.QRScanner.scan(function (err, text) {
                                    if (err) {
                                        // when the cancle event is gets triggered error loop will be called
                                        if (err.name === "SCAN_CANCELED") {
                                            window.QRScanner.destroy();
                                        } else {
                                            console.error(err._message);
                                        }
                                    } else {
                                        //if in case the light is on after scanning the below method will off the flash lisht
                                        window.QRScanner.disableLight();
                                        window.QRScanner.destroy();

                                        scope.code = getCode(text);
                                        scope.callWebApi(btoa(scope.code));
                                    }

                                    document.body.style.setProperty("background-color", "var(--statusbar-bg-color, #2c3445)", "important");
                                    document.body.style.visibility = "visible";
                                    scannerView.style.setProperty("visibility", "visible", "important");
                                    assetScannerButton.style.setProperty("visibility", "hidden", "important");
                                    assetCancle.style.setProperty("visibility", "hidden", "important");
                                    assetFlash.style.setProperty("visibility", "hidden", "important");
                                });
                            });
                        }

                    });

                };

                function getCode(text) {
                    if (text.split('documentscan').length > 1)
                        return atob(decodeURIComponent(text.split('scan/')[1])).split('=')[1]
                    else return text;
                }

                var popupListener = $rootScope.$on("ShowAssetPopUp", function (event, data) {
                    var code = data.code;
                    if ($rootScope.ShowAssetPopUp) {
                        $rootScope.ShowAssetPopUp = false;
                        scope.callWebApi(btoa(code));
                    }
                });

                var destroListener = scope.$on('$destroy', function () {
                    popupListener();
                    destroListener();
                });


                scope.callWebApi = function (code) {
                    LoaderService.show();
                    CommonMethodsFactory.getScannedDocuments(code, scope);
                };

                scope.ReadAgain = function () {
                    scope.openDoc(scope.currentOpenedDoc);
                }

                scope.openFile = function (file) {
                    scope.openDoc(file);
                    if (!file.isChecked && !file.IsSigned && file.IsAllowedToSign) {
                        scope.currentOpenedDoc = file;
                        scope.currentOpenedDoc.isChecked = true;
                        scope.currentOpenedDoc.IsSigned = true;
                        scope.currentOpenedDoc.IsAllowedToSign = false;
                        scope.showList = false;
                        scope.isDocOpened = true;
                    }
                }

                scope.filterData = function () {
                    for (var i = 0; i < scope.files.length; i++) {
                        var file = scope.files[i];
                        if (file.IsSigned == undefined && file.IsAllowedToSign == undefined) scope.DocToBeSignedList.push(file);
                        if (file.IsSigned && !file.IsAllowedToSign) scope.DocSignedList.push(file);
                        if (!file.IsSigned && file.IsAllowedToSign) scope.DocToBeSignedList.push(file);
                        if (!file.IsSigned && !file.IsAllowedToSign) scope.DocNoSignList.push(file);
                    }
                    scope.files = [];
                }

                scope.filterSignData = function (file) {
                    scope.DocSignedList.push(file);
                    for (var i = 0; i < scope.DocToBeSignedList.length; i++) {
                        if (scope.DocToBeSignedList[i].Id == file.Id) {
                            scope.DocToBeSignedList.splice(i, 1);
                        }
                    }

                    if (scope.DocToBeSignedList.length == 0) scope.toogleList.showSigned = true;
                }

                scope.toggleGroup = function (type) {
                    switch (type) {
                        case "Signed":
                            toogle(!scope.toogleList.showSigned, false, false);
                            break;
                        case "ToBeSigned":
                            toogle(false, !scope.toogleList.showToSign, false);
                            break;
                        case "NoSign":
                            toogle(false, false, !scope.toogleList.showNoSIgn);
                            break;
                    }
                }

                function toogle(showSigned, showToSign, showNoSIgn) {
                    scope.toogleList.showSigned = showSigned;
                    scope.toogleList.showToSign = showToSign;
                    scope.toogleList.showNoSIgn = showNoSIgn;
                }

                scope.closePopUp = function () {
                    scope.showList = true;
                    scope.isDocOpened = false;
                    scope.isDocReadyForSign = false;
                    scope.postData.signatureImage = null;
                    scope.DocSignedList = [];
                    scope.DocToBeSignedList = [];
                    scope.DocNoSignList = [];
                    scope.popup.close();
                }

                scope.getTitle = function () {
                    return scope.title;
                }

                scope.cancle = function () {
                    scope.currentOpenedDoc.isChecked = false;
                    scope.currentOpenedDoc.IsSigned = false;
                    scope.currentOpenedDoc.IsAllowedToSign = true;
                    scope.showList = true;
                    scope.isDocOpened = false;
                    scope.isDocReadyForSign = false;
                    scope.postData.signatureImage = null;
                }

                scope.showSign = function () {
                    scope.isDocOpened = false;
                    scope.isDocReadyForSign = true;
                }

                scope.getImageIcon = function (docCode) {
                    switch (docCode) {
                        case 'Link':
                            return $rootScope.getIconValue('LinkOutline');

                        case 'HTML':
                            return $rootScope.getIconValue('Html');

                        case 'File':
                            return $rootScope.getIconValue('Document');

                        default:
                            return '';
                    }
                }

                scope.isBackgroundDownloadLink = function (docItem) {
                    return (docItem.LinkName && docItem.LinkName.length > 0 && docItem.Link && docItem.Link.length > 0);
                };

                scope.isOnlineDownloadLink = function (docItem) {
                    return !scope.isBackgroundDownloadLink(docItem);
                };

                scope.getImageBase64 = function (signVal) {
                    scope.signatureVal.IsDoneSign = true;
                    scope.postData.signatureImage = signVal;
                }

                scope.setDirective = function (drtFun, instance) {
                    scope.directiveScope = drtFun;
                }

                scope.save = function () {

                    scope.directiveScope();

                    if (scope.postData.signatureImage) {
                        scope.postData.assetId = scope.currentOpenedDoc.RelatedId;
                        scope.postData.documentVersionId = scope.currentOpenedDoc.Id;
                        scope.postData.userId = scope.userDetails.UserId;
                        scope.postData.qrCodeFieldValue = scope.code;
                        scope.postData.signedDate = new Date();
                        LoaderService.show();
                        var postPromise = QuestionnaireUtility.postDocumentSign('asset', scope.postData);
                        postPromise.then(
                            function (success) {
                                LoaderService.hide();
                                scope.showList = true;
                                scope.isDocOpened = false;
                                scope.isDocReadyForSign = false;
                                scope.postData.signatureImage = null;
                                scope.filterSignData(scope.currentOpenedDoc);
                            },
                            function (error) {
                                LoaderService.hide();
                                console.log(error);
                            }
                        );
                    } else {
                        var errMessage = $rootScope.getResourceText("MSG_MOBILE_DOCUMENT_SIGN_ERROR");
                        var title = $rootScope.getResourceText("LIT_ERROR");
                        PopupUtil.alert(title, errMessage);
                    }

                }

                scope.openDoc = function (file) {
                    console.log(file);

                    switch (file.DocumentTypeCode) {
                        case "Link":
                            DocumentLibraryUtil.download(file);
                            break;

                        case "HTML":
                            LoaderService.hide();
                            DocumentLibraryUtil.openHtmlDocument(file, scope);
                            break;

                        case "File":
                            FileUtil.openFile(file.DeviceFilePath, file.Type);
                            break;

                        default:
                            return null;
                    }
                }

                scope.getList = function () {
                    return 'templates/asset_document_templates/list.html';
                }

                scope.getPlatformSpecificTemplate = function () {
                    // Currently handling only for IOS and Android
                    var isIOS = (ionic.Platform.isAndroid() == false);
                    if (isIOS) {
                        return 'templates/asset_document_templates/IosTemplate.html';
                    }
                    else {
                        return 'templates/asset_document_templates/AndroidTemplate.html';
                    }

                };
            }
        };
    }]);

app.directive('fileUploader', ["$rootScope", "$q", function ($rootScope, $q) {
    return {
        restrict: "E",
        templateUrl: "templates/fileUploader.html",
        scope: {
            upload: '=',
            attachments: '=',
            extensions: '@',
            mod: '@',
            entity: '='
        },
        link: function link($scope, $element, attr, modelCtrl) {
            $scope.SelectFileText = $rootScope.getResourceText('LIT_MOBILE_SELECT_FILE');
            $scope.FolderIcon = $rootScope.getIconValue('Folder');

            var labelEle = $element.find('.fileSelectorLabel');
            var divEle = $element.find(".fileUploadBlock");
            labelEle.bind('click', function () {
                switch ($scope.mod) {
                    case 'askade':
                        if ($scope.attachments && $scope.attachments.filter(a => a.FilePath === null).length > 0) {
                            $element.find('input')[0].click();
                            divEle[0].style.display = "flex";
                        }
                        else $scope.upload(false);
                        break;
                    default:
                        $element.find('input')[0].click();
                        divEle[0].style.display = "flex";
                        break;
                }
            });

            $scope.UploadFile = function () {
                var deferedPromise = $q.defer();
                var inputEle = $element.find('input');

                if (inputEle.length > 0) {
                    var file = inputEle[0].files[0];
                    if (file) {
                        var extension = file.type.split('/')[1];
                        if ($scope.extensions != null && $scope.extensions.includes(extension)) {
                            var reader = new FileReader();
                            reader.readAsArrayBuffer(file);
                            reader.onloadend = readerSuccess;

                            function readerSuccess(event) {

                                var isIPad = ionic.Platform.isIPad();
                                var isIOS = ionic.Platform.isIOS();
                                var isAndroid = ionic.Platform.isAndroid();
                                var directoryToPath = "";

                                var blob = new Blob([new Uint8Array(reader.result)], { type: file.type });
                                if (isIPad || isIOS) {
                                    directoryToPath = cordova.file.dataDirectory;
                                } else if (isAndroid) {
                                    directoryToPath = cordova.file.externalDataDirectory;
                                }

                                var size = blob.size;

                                window.resolveLocalFileSystemURL(directoryToPath, function (fs) {

                                    var extension = `.${file.type.split('/')[1]}`;
                                    var fileObj = file.name.split(extension);
                                    var fileName = fileObj[0] + new Date().getTime() + extension;

                                    fs.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
                                        fileEntry.createWriter(function (writer) {
                                            writer.onwriteend = function (e) {
                                                deferedPromise.resolve(e.target.localURL);
                                                inputEle[0].value = "";
                                                divEle[0].style.display = "none";
                                            };

                                            writer.onerror = function (e) {
                                                deferedPromise.reject("NOT VALID EXTENSION");
                                            };

                                            writer.write(blob);
                                        });
                                    });
                                })
                            }
                        }
                        else
                            deferedPromise.reject("NOT VALID EXTENSION");
                    } else deferedPromise.reject();

                    deferedPromise.promise.then((success) => {
                        UploadToThatMod(success, null);
                    }, (error) => {
                        UploadToThatMod(null, error);
                    })
                }
            }

            function UploadToThatMod(success, error) {
                switch ($scope.mod) {
                    case "askade":
                        if (success) $scope.upload(true, success);
                        else $scope.upload(true, null);
                        break;
                    case "apv":
                        if (success) $scope.upload(true, $scope.entity, success);
                        else $scope.upload(true, $scope.entity, null);
                        break;
                }
            }
        }
    }
}]);

/***/ }),

/***/ "./scripts/app/main.js":
/*!*****************************!*\
  !*** ./scripts/app/main.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var app = angular.module("questionnaire", [
    "EntityUtils",
    "LocalStorageUtils",
    "directives",
    "commonUtils",
    "ionic-toast",
    "Modal-Popup",
    "Camera-Gallery",
    "factoryService",
    "commonMethods",
    "commonUtils",
  ]);
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
  app
    .config([
      "$ionicConfigProvider",
      function ($ionicConfigProvider) {
        $ionicConfigProvider.views.maxCache(0);
      },
    ])
    .run([
      "LocalStorageHelper",
      "$cordovaSplashscreen",
      "LocalStorageUtility",
      "customersManager",
      "$rootScope",
      "resourceLanguageManager",
      "iconsManager",
      "$cordovaNetwork",
      "questionnaireManager",
      "personQuestionnaireManager",
      "$timeout",
      "actionPlanWizardManager",
      "personApwManager",
      "ionicToast",
      "Restangular",
      "userDetailsManager",
      "userApplicationsManager",
      "personAskadeFileTypeWizardManager",
      "LoaderService",
      "FileUtil",
      "$ionicPlatform",
      "$cordovaDeeplinks",
      "$state",
      "$ionicHistory",
      "AuthenticationService",
      "ResetPoolUtil",
      "PopupUtil",
      "CommonMethodsFactory",
      "documentLibraryManager",
      "favoritesManager",
      "DeviceUtil",
      "$q",
      "HomeScreenUtil",
      "ToggleUrlMethodFactory",
      "AppMessages",
      function (
        LocalStorageHelper,
        $cordovaSplashscreen,
        LocalStorageUtility,
        customersManager,
        $rootScope,
        resourceLanguageManager,
        iconsManager,
        $cordovaNetwork,
        questionnaireManager,
        personQuestionnaireManager,
        $timeout,
        actionPlanWizardManager,
        personApwManager,
        ionicToast,
        Restangular,
        userDetailsManager,
        userApplicationsManager,
        personAskadeFileTypeWizardManager,
        LoaderService,
        FileUtil,
        $ionicPlatform,
        $cordovaDeeplinks,
        $state,
        $ionicHistory,
        AuthenticationService,
        ResetPoolUtil,
        PopupUtil,
        CommonMethodsFactory,
        documentLibraryManager,
        favoritesManager,
        DeviceUtil,
        $q,
        HomeScreenUtil,
        ToggleUrlMethodFactory,
        AppMessages
      ) {
        $rootScope.getInternalUrl = function getInternalUrl(imgUri) {
          var prom = $q.defer();
          window.resolveLocalFileSystemURL(imgUri, function success(fileEntry) {
            if (ionic.Platform.isAndroid() === true)
              return prom.resolve(window.Ionic.WebView.convertFileSrc(imgUri));
            var resolvedInteralUrl = fileEntry.toInternalURL();
            prom.resolve(resolvedInteralUrl);
          });
          return prom.promise;
        };

        document.addEventListener("deviceready", function () {
          if (
            window.device.platform != "Android" &&
            IonicDeeplink.notifyWebReady
          ) {
            IonicDeeplink.notifyWebReady(function (success) {
              console.log("From Deeplink", success);
            });
          }
        });

        window.handleDeepLink = function (routePayload) {
          setTimeout(function () {
            if (routePayload && routePayload.originalURL) {
              LoaderService.show();
              var link = routePayload.originalURL;
              if (link && link.split("applink/").length > 1) {
                var token = link.split("applink/")[1];
                var code = null;
                if (token.split("?code=").length > 1) {
                  code = token.split("?code=")[1];
                  token = token.split("?code=")[0];
                }
                if (code) {
                  code = atob(code);
                  DeviceUtil.setKeyValueWithSharedPreferences(
                    "scannedCode",
                    code
                  );
                  $rootScope.ShowAssetPopUp = true;
                }
                if (token) {
                  $rootScope.$emit("CallParentMethod", {
                    data: token,
                    shouldShowToaster: true,
                  });
                }
                if (link.split("?geo=").length > 1) {
                  var geoData = link.split("?geo=")[1];
                  $rootScope.$emit("getGeoLocationValues", { data: geoData });
                }
              }
            }
          }, 500);
        };

        $ionicPlatform.ready(function () {
          //DeviceUtil.setKeyValueWithSharedPreferences('CustomerURL', 'https://test.safetynet.dk/Carlsberg_SIT');
          var initDbPromise = LocalStorageHelper.initDb();

          var isIPad = ionic.Platform.isIPad();
          var isIOS = ionic.Platform.isIOS();

          //cordova.plugins.Keyboard.disableScroll(false);
          $rootScope.getResourceText = function (resourceId) {
            var resourceText =
              resourceLanguageManager.getResourceById(resourceId);

            if (
              resourceText.ResourceText === null ||
              angular.isUndefined(resourceText.ResourceText)
            ) {
              var defaultText = resourceText.DefaultText;

              if (defaultText === null || angular.isUndefined(defaultText)) {
                return resourceText.ResourceId;
              } else {
                return defaultText;
              }
            } else {
              return resourceText.ResourceText;
            }
          };

          $rootScope.getIconValue = function (id) {
            try {
              return iconsManager.getIcon(id);
            } catch (error) {}
          };

          $rootScope.onOrientationChangeForCalender = function () {
            if (ionic.Platform.isAndroid() === true) {
              screen.orientation.lock("portrait");
            }
          };

          $rootScope.closeLoader = function () {
            LoaderService.hide();
          };

          // Below code needs to be removed in the next release..
          var isFreshInstall = window.localStorage.getItem("isFreshInstall");
          var loginRedirect = window.localStorage.getItem("loginRedirect");
          var token = window.localStorage.getItem("token");
          var AppDetails = window.localStorage.getItem("AppDetails");

          window.localStorage.removeItem("documentLibraryDownloadInStarted");
          window.localStorage.removeItem(
            "documentLibraryDownloadInProgressList"
          );

          var isRedirectToWelcome = false;
          var toBeUpdatedBuild =
            isFreshInstall !== null ||
            loginRedirect != null ||
            token != null ||
            AppDetails != null;
          if (toBeUpdatedBuild === true) {
            isFreshInstall = isFreshInstall === null ? true : isFreshInstall;
            isFreshInstall = true;

            var setInstallProm = DeviceUtil.setKeyValueWithSharedPreferences(
              "isFreshInstall",
              isFreshInstall
            );
            setInstallProm.then(function () {
              window.localStorage.removeItem("isFreshInstall");
              if (ionic.Platform.isAndroid() === true) {
                screen.orientation.lock("portrait");
              }
              isRedirectToWelcome = true;
              $state.go("welcome");
            });

            loginRedirect = loginRedirect === null ? "false" : loginRedirect;
            var setLoginRedirectProm =
              DeviceUtil.setKeyValueWithSharedPreferences(
                "loginRedirect",
                loginRedirect
              );
            setLoginRedirectProm.then(function () {
              window.localStorage.removeItem("loginRedirect");
            });

            if (token !== null) {
              var tokenSharedProm = DeviceUtil.setKeyValueWithSharedPreferences(
                "token",
                token
              );
              tokenSharedProm.then(function (token) {
                window.localStorage.removeItem("token");
              });
            }

            var appDetailsSharedProm =
              DeviceUtil.setKeyValueWithSharedPreferences(
                "AppDetails",
                AppDetails
              );
            appDetailsSharedProm.then(function (token) {
              window.localStorage.removeItem("AppDetails");
            });
          }

          $ionicPlatform.ready(function () {
            initDbPromise.promise.then(function (success) {
              var customer = customersManager.getCustomers();
              var userLoggedIn =
                userDetailsManager.getUserLastLoggedTimeStamp();

              if (customer == null) {
                var resourceDefaultData = null;
                var defaultIcon = null;
                LocalStorageUtility.addResourceLanguageDetails(
                  resourceDefaultData
                );
                LocalStorageUtility.addDefaultIcons(defaultIcon);
              } else {
                var onlineVal = customer.OnlineVal;
                var custName = customer.UniqueUrlPart;
                var ckey = customer.CKey;
                var isCustomUrlEnabled = customer.IsCustomUrlEnabled;

                if (!isCustomUrlEnabled) {
                  var onlineValueForBaseUrl = onlineVal;
                  if (
                    onlineVal.toLowerCase() === "cloud" &&
                    custName.toLowerCase() === "cloud1"
                  ) {
                    onlineValueForBaseUrl = "cloudfp";
                  }

                  var baseUrl = CommonMethodsFactory.getBaseUrl(
                    onlineValueForBaseUrl
                  );
                  Restangular.setBaseUrl(
                    "https://" + baseUrl + "/" + custName + "/api/v1/"
                  );
                  //Restangular.setBaseUrl('http://192.168.1.6/s16/api/v1/');

                  // $rootScope.$emit('RenderButtonBgHeaderColor');
                } else {
                  var baseUrl = custName;
                  if (baseUrl.includes("api/v1"))
                    Restangular.setBaseUrl("https://" + baseUrl);
                  else
                    Restangular.setBaseUrl("https://" + baseUrl + "/api/v1/");
                }
                darkModeEnable();
              }

              if (isRedirectToWelcome === false) {
                bootStrap();
              }

              $rootScope.$on("CallParentMethod", function (event, dataParams) {
                loginViaDeepLink(dataParams.data, dataParams.shouldShowToaster);
              });

              function loginViaDeepLink(params, shouldShowToaster) {
                try {
                  var decodedParams = decodeURIComponent(params);
                  if (decodedParams.includes("code")) {
                    var dParams = decodedParams.split("?code=");
                    var code = dParams[1];
                    decodedParams = dParams[0];
                    code = atob(code);
                    DeviceUtil.setKeyValueWithSharedPreferences(
                      "scannedCode",
                      code
                    );
                    $rootScope.ShowAssetPopUp = true;
                  }

                  var actualParams = atob(decodedParams); //tempTokens = actualParams;

                  //Remove script thats form the parsed string. However the content
                  //inside the script tag will be retained as string
                  var replacer = /(<([^>]+)>)/gi;
                  var sanitizedData = actualParams.replace(replacer, "");

                  var allTokens = sanitizedData.split("|");
                  var tokenFull = allTokens[0];
                  var token = tokenFull.split("=")[1];
                  var custNameFull = allTokens[1];
                  var linkCustName = custNameFull.split("=")[1];
                  var onlineValFull = allTokens[2];
                  var linkOnlineVal = allTokens[2].split("=")[1];
                  var linkUserName = allTokens[3].split("=")[1];
                  var deepLinkCKey = ckey;
                  var onlineValWithCKey = linkCustName.split("-");

                  if (onlineValWithCKey.length == 2) {
                    linkCustName = onlineValWithCKey[0];
                    deepLinkCKey = onlineValWithCKey[1];
                  }

                  var userProfile =
                    userDetailsManager.getUserLastLoggedTimeStamp();
                  var customer = customersManager.getCustomers();
                  var currentOnlineVal = "";
                  var currentCustName = "";
                  var currentCkey = "";

                  if (customer) {
                    // Only if customer data exists get the value
                    currentOnlineVal = customer.OnlineVal;
                    currentCustName = customer.UniqueUrlPart;
                    currentCkey = customer.CKey;
                  }
                  if (userProfile) {
                    var uName = userProfile.UserName; // Adding toUpperCase(), so that it is not case sensitive
                    var template = "";

                    if (
                      currentCustName.toUpperCase() !==
                        linkCustName.toUpperCase() ||
                      currentOnlineVal.toUpperCase() !==
                        linkOnlineVal.toUpperCase()
                    ) {
                      // Check for other environment and sub domain.
                      // If the condition is satisfied reset the application.
                      template = $rootScope.getResourceText(
                        "MSG_DELETE_DATA_FROM_PHONE"
                      );
                      resetApplicationData(allTokens, template);
                    } else {
                      if (token === "-1") {
                        if (
                          currentCustName.toUpperCase() !==
                            linkCustName.toUpperCase() ||
                          currentOnlineVal.toUpperCase() !==
                            linkOnlineVal.toUpperCase()
                        ) {
                          forCKeyOrUserChanged(
                            deepLinkCKey,
                            currentCkey,
                            undefined,
                            undefined,
                            allTokens
                          );
                        }

                        LoaderService.hide();
                      } else {
                        // Once it is sure environment and sub domain is not changed during deep link login
                        // get the customer key based on the token recevied from the link
                        var ckeyPromise = LocalStorageHelper.getCKeyData(token);
                        ckeyPromise.then(function (successCKey) {
                          // Once a token got from link, if valid (success response) then add to local storage
                          // Setting the token value to null, as in the next execution of methods token is added
                          // from the deep link and is saved to localstorage.
                          //window.localStorage.setItem('token', null);
                          DeviceUtil.setKeyValueWithSharedPreferences(
                            "token",
                            null
                          );
                          forCKeyOrUserChanged(
                            successCKey.CKey,
                            currentCkey,
                            uName,
                            linkUserName,
                            allTokens
                          );
                        });
                      }
                    }
                  } else {
                    // If user profile does not exists. (First time use of application)
                    addUserNameTokenCustomer(allTokens);
                  } //Temp code..
                } catch (err) {
                  LoaderService.hide();
                  if (shouldShowToaster)
                    ionicToast.showDefault(
                      $rootScope.getResourceText("MSG_MOBILE_LOGIN_EMPTY_TOKEN")
                    );
                  else {
                    var errorHeader =
                      $rootScope.getResourceText("LIT_MOBILE_ERROR") +
                      $rootScope.getResourceText("LIT_MESSAGE");
                    var errorBody = $rootScope.getResourceText(
                      "MSG_MOBILE_TOKEN_INVALID"
                    );
                    AppMessages.Error(errorHeader, errorBody);
                  }
                  console.log(err);
                }
              }

              // var token = window.localStorage.getItem('token');
              var token = null;
              $cordovaDeeplinks
                .route({
                  "/:environmentId/api/v1/suite/applink/:applinkId": {
                    target: "/:environmentId/api/v1/suite/applink",
                    parent: "products",
                  },
                })
                .subscribe(function (match) {
                  // window.localStorage.setItem('fromDeepLink', '1');
                  $ionicPlatform.ready(function () {
                    initDbPromise.promise.then(
                      function (success) {
                        var params = match.$args.applinkId;
                        var decodedParams = decodeURIComponent(params);
                        var actualParams = atob(decodedParams);
                        //Remove script thats form the parsed string. However the content
                        //inside the script tag will be retained as string
                        var replacer = /(<([^>]+)>)/gi;
                        var sanitizedData = actualParams.replace(replacer, "");

                        if (
                          sanitizedData.indexOf("url") !== -1 &&
                          sanitizedData.split("url=")[1].includes("http")
                        ) {
                          var data = {
                            customerUrl: sanitizedData.split("url=")[1],
                          };
                          ToggleUrlMethodFactory.validateUrl(data);
                        } else {
                          var promiseDeviceUtil =
                            DeviceUtil.getKeyValueWithSharedPreferences(
                              "token"
                            );
                          promiseDeviceUtil.then(function (token) {
                            $state.go("app.myProfile");
                          });

                          DeviceUtil.setKeyValueWithSharedPreferences(
                            "stopLoginUpdateForDeepLink",
                            true
                          );

                          var setLinkProm =
                            DeviceUtil.setKeyValueWithSharedPreferences(
                              "fromDeepLink",
                              "1"
                            );
                          setLinkProm.then(function () {
                            // executes this method when data is saved sucessfully.
                          });
                          LoaderService.show(
                            $rootScope.getResourceText("MSG_WAIT_TO_LOGIN")
                          );
                          var code =
                            match.$args.code != null
                              ? atob(match.$args.code)
                              : null;

                          if (code) {
                            DeviceUtil.setKeyValueWithSharedPreferences(
                              "scannedCode",
                              code
                            );
                            $rootScope.ShowAssetPopUp = true;
                          }

                          var allTokens = sanitizedData.split("|");
                          var tokenFull = allTokens[0];
                          var token = tokenFull.split("=")[1];
                          var custNameFull = allTokens[1];
                          var linkCustName = custNameFull.split("=")[1];
                          var onlineValFull = allTokens[2];
                          var linkOnlineVal = allTokens[2].split("=")[1];
                          var linkUserName = allTokens[3].split("=")[1];
                          var deepLinkCKey = ckey;
                          var onlineValWithCKey = linkCustName.split("-");

                          if (onlineValWithCKey.length == 2) {
                            linkCustName = onlineValWithCKey[0];
                            deepLinkCKey = onlineValWithCKey[1];
                          }

                          var userProfile =
                            userDetailsManager.getUserLastLoggedTimeStamp();
                          var customer = customersManager.getCustomers();
                          var currentOnlineVal = "";
                          var currentCustName = "";
                          var currentCkey = "";

                          if (customer) {
                            // Only if customer data exists get the value
                            currentOnlineVal = customer.OnlineVal;
                            currentCustName = customer.UniqueUrlPart;
                            currentCkey = customer.CKey;
                          }
                          if (userProfile) {
                            var uName = userProfile.UserName; // Adding toUpperCase(), so that it is not case sensitive
                            var template = "";

                            if (
                              currentCustName.toUpperCase() !==
                                linkCustName.toUpperCase() ||
                              currentOnlineVal.toUpperCase() !==
                                linkOnlineVal.toUpperCase()
                            ) {
                              // Check for other environment and sub domain.
                              // If the condition is satisfied reset the application.
                              template = $rootScope.getResourceText(
                                "MSG_DELETE_DATA_FROM_PHONE"
                              );
                              resetApplicationData(allTokens, template);
                            } else {
                              if (token === "-1") {
                                if (
                                  currentCustName.toUpperCase() !==
                                    linkCustName.toUpperCase() ||
                                  currentOnlineVal.toUpperCase() !==
                                    linkOnlineVal.toUpperCase()
                                ) {
                                  forCKeyOrUserChanged(
                                    deepLinkCKey,
                                    currentCkey,
                                    undefined,
                                    undefined,
                                    allTokens
                                  );
                                }

                                LoaderService.hide();
                              } else {
                                // Once it is sure environment and sub domain is not changed during deep link login
                                // get the customer key based on the token recevied from the link
                                var ckeyPromise =
                                  LocalStorageHelper.getCKeyData(token);
                                ckeyPromise.then(function (successCKey) {
                                  // Once a token got from link, if valid (success response) then add to local storage
                                  // Setting the token value to null, as in the next execution of methods token is added
                                  // from the deep link and is saved to localstorage.
                                  //window.localStorage.setItem('token', null);
                                  DeviceUtil.setKeyValueWithSharedPreferences(
                                    "token",
                                    null
                                  );
                                  forCKeyOrUserChanged(
                                    successCKey.CKey,
                                    currentCkey,
                                    uName,
                                    linkUserName,
                                    allTokens
                                  );
                                });
                              }
                            }
                          } else {
                            // If user profile does not exists. (First time use of application)
                            addUserNameTokenCustomer(allTokens);
                          } //Temp code..
                        }
                      },
                      function (nomatch) {
                        console.log(nomatch);
                        console.warn("No match", nomatch);
                      }
                    );
                  });
                });

              function darkModeEnable() {
                var customer = customersManager.getCustomers();
                if (customer.IsDarkModeEnable) {
                  $rootScope.$emit("darkThemeBgColor", { isDark: true });
                } else {
                  $rootScope.$emit("darkThemeBgColor", { isDark: false });
                  $rootScope.$emit("RenderButtonBgHeaderColor");
                }
              }

              function forCKeyOrUserChanged(
                customerKey,
                currentCustomerKey,
                userName,
                currentUserName,
                allTokens
              ) {
                var template = "";
                if (
                  customerKey.toUpperCase() !== currentCustomerKey.toUpperCase()
                ) {
                  // If the customer key is not same, compared to previous login
                  // reset the application
                  template = $rootScope.getResourceText(
                    "MSG_DELETE_DATA_FROM_PHONE"
                  );
                  resetApplicationData(allTokens, template);
                }
                // } else if (userName.toUpperCase() !== currentUserName.toUpperCase()) {
                //   //For a scenario where a user is already logged in and another
                //   //user is trying to log in of same environment, sub domain and customer key
                //   // via deep link, prompt the user to confirm on delete and log in

                //   /* Currently disabled becase on logout data from current user is deleted */
                //   // template = $rootScope.getResourceText('MSG_MULTIPLE_USER_FOUND');
                //   // resetApplicationData(allTokens, template);
                // }
                else {
                  // This is for the scenario where the same logged in user has clicked
                  // deep link.
                  // var token = window.localStorage.getItem('token'); // Adding a "null" check because localstorage returns string value
                  var promiseDeviceUtil =
                    DeviceUtil.getKeyValueWithSharedPreferences("token");
                  promiseDeviceUtil.then(function (token) {
                    LocalStorageHelper.reset();
                    ResetPoolUtil.resetPool();
                    if (token === null || token === "-1" || token === "null") {
                      // For the scenario where logged in user has manually logged out of application
                      addUserNameTokenCustomer(allTokens);
                    } else {
                      // For a scenario where token is still present from the previous login user.
                      // In this case just validate the token received from the link
                      // window.localStorage.setItem('token', token);
                      var tokenSharedProm =
                        DeviceUtil.setKeyValueWithSharedPreferences(
                          "token",
                          token
                        );
                      tokenSharedProm.then(function () {
                        var tokenPromise = validateToken();
                        tokenPromise.then(
                          function (sucessResp) {
                            LoaderService.hide();
                            console.log("token valid");
                          },
                          function (fail) {
                            console.log(fail);
                          }
                        );
                      });
                    }
                  });
                }
              }

              function resetApplicationData(allTokens, template) {
                var title = $rootScope.getResourceText("LIT_MESSAGE");
                var loaderPromise = LoaderService.hide();
                loaderPromise.then(function () {
                  // Displaying confirm box in case of multiple user found. On click of Ok previous user data is cleared
                  var confirmPromise = PopupUtil.confirm(title, template);
                  confirmPromise.then(function (success) {
                    LoaderService.show(
                      $rootScope.getResourceText("MSG_WAIT_TO_LOGIN")
                    );
                    $timeout(function () {
                      if (success) {
                        // Reset all the data
                        // Removing actual document library files stored in filesystem before doing a reset.
                        var resetDocumentPromise =
                          documentLibraryManager.removeDocumentLibrary();
                        resetDocumentPromise.then(
                          function () {
                            LocalStorageHelper.reset();
                            ResetPoolUtil.resetPool();
                            //window.localStorage.removeItem('AppDetails');
                            //window.localStorage.removeItem('token');
                            window.localStorage.removeItem("userLanguage");
                            $state.go("login");
                            addUserNameTokenCustomer(allTokens);
                          },
                          function (error) {
                            LoaderService.hide();
                          }
                        );
                      } else {
                        LoaderService.hide();
                      }
                    }, 100);
                  });
                });
              }

              function validateToken() {
                var tokenValidityPromise =
                  LocalStorageHelper.validateUserToken();
                tokenValidityPromise.then(
                  function (sucessResp) {},
                  function (failResp) {
                    $ionicHistory.nextViewOptions({
                      disableBack: true,
                    });
                    ionicToast.showDefault(
                      $rootScope.getResourceText("LIT_SESSION_TIMEOUT")
                    );
                    window.localStorage.removeItem("AppDetails");
                    var currentState = $state.current.name;

                    if (currentState !== "login") {
                      $state.go("login");
                    }
                  }
                );
                return tokenValidityPromise;
              }

              // var guideInstruction = window.localStorage.getItem('guideInstruction');
              //var getGuideInstPrm = DeviceUtil.getKeyValueWithSharedPreferences('guideInstruction')

              function onUserDetailsFetched() {
                $ionicHistory.nextViewOptions({
                  disableBack: true,
                });

                window.localStorage.setItem("fromLogin", true);
                $rootScope.$emit("refresh");

                var guideInstructionProm =
                  DeviceUtil.getKeyValueWithSharedPreferences(
                    "guideInstruction"
                  );
                guideInstructionProm
                  .then(function (data) {
                    if (!userLoggedIn) {
                      userLoggedIn =
                        userDetailsManager.getUserLastLoggedTimeStamp();
                    }

                    if (userLoggedIn) {
                      var message = $rootScope
                        .getResourceText("MSG_MOBILE_URL_SUCCESS")
                        .replace(
                          "__Organization__",
                          userLoggedIn.Customer.UniqueUrlPart
                        );
                      ionicToast.showDefault(message);
                    } else {
                      var message = $rootScope
                        .getResourceText("MSG_MOBILE_URL_SUCCESS")
                        .replace("__Organization__", "");
                      ionicToast.showDefault(message);
                    }

                    if (userLoggedIn.Customer.DisplayFavorites) {
                      var isFavEmpty = favoritesManager.isFavEmpty();
                      if (!isFavEmpty) {
                        window.localStorage.removeItem("fromLogin");
                        $state.go("app.favorite", {
                          reload: true,
                        });
                      } else {
                        $state.go("app.home", {
                          reload: true,
                        });
                      }
                    } else {
                      $state.go("app.home", {
                        reload: true,
                      });
                    }
                  })
                  .catch(function () {
                    var customer = customersManager.getCustomers();

                    if (customer) {
                      var message = $rootScope
                        .getResourceText("MSG_MOBILE_URL_SUCCESS")
                        .replace("__Organization__", customer.UniqueUrlPart);
                      ionicToast.showDefault(message);
                    } else {
                      var message = $rootScope
                        .getResourceText("MSG_MOBILE_URL_SUCCESS")
                        .replace("__Organization__", "");
                      ionicToast.showDefault(message);
                    }

                    if (!customer.DisableFavoritesGuideDisplay) {
                      var guideConfirmPromise = PopupUtil.confirm(
                        $rootScope.getResourceText("LIT_MESSAGE"),
                        $rootScope.getResourceText(
                          "MSG_MOBILE_CONFIRM_TO_SHOW_FAVORITE_GUIDE"
                        )
                      );
                      guideConfirmPromise.then(function (success) {
                        var setGuidePromise =
                          DeviceUtil.setKeyValueWithSharedPreferences(
                            "guideInstruction",
                            false
                          );
                        setGuidePromise.then(function () {
                          if (success) {
                            $state.go("sideapp");
                          } else {
                            $state.go("app.home");
                          }
                        });
                      });
                    } else {
                      $state.go("app.home");
                    }
                  });
                LoaderService.hide();
              }

              function fetchUserDetails(userName) {
                PopupUtil.hide(); // Hide Loading Animation shown while Login
                LoaderService.show();
                var userDetailsPromise =
                  LocalStorageHelper.initUserDetails(userName);
                userDetailsPromise.then(
                  function (successUserDetailsResponse) {
                    onUserDetailsFetched();
                  },
                  function (errorResp) {
                    LoaderService.hide();
                  }
                );
              }

              function addToCustomer(
                customer,
                custName,
                onlineVal,
                userName,
                isCustomUrlEnabled
              ) {
                if (customer != null) {
                  var uniquePart =
                    customer.UniqueUrlPart == null
                      ? ""
                      : customer.UniqueUrlPart.toLowerCase();
                  custName = custName == null ? "" : custName.toLowerCase();

                  if (
                    customer.OnlineVal !== onlineVal ||
                    uniquePart != custName
                  ) {
                    var resetPromise = LoaderService.hide();
                    resetPromise.then(function (success) {
                      if (success) {
                        var title =
                          $rootScope.getResourceText("LIT_RESET_DATA");
                        var template = $rootScope.getResourceText(
                          "MSG_DELETE_DATA_FROM_PHONE"
                        );
                        var confirmPromise = PopupUtil.confirm(title, template);
                        confirmPromise.then(function (success) {
                          LoaderService.show();
                          $timeout(function () {
                            if (success) {
                              // Adding Reset pool method
                              // Removing the userLanguage value from localstorage, for a scenario where when user profile
                              // is not present customer specific language is not displayed FT 7105
                              ResetPoolUtil.resetPool();
                              window.localStorage.removeItem("userLanguage"); // Removing actual document library files stored in filesystem before doing a reset

                              var resetDocumentPromise =
                                documentLibraryManager.removeDocumentLibrary();
                              resetDocumentPromise.then(
                                function () {
                                  var excludeList = ["UserDetails"];
                                  var resetPromise =
                                    LocalStorageHelper.reset(excludeList);
                                  resetPromise.promise.then(function () {
                                    fetchOtherDetails(
                                      custName,
                                      onlineVal,
                                      userName,
                                      isCustomUrlEnabled
                                    );
                                  });
                                },
                                function (error) {
                                  LoaderService.hide();
                                }
                              );
                            } else {
                              LoaderService.hide();
                            }
                          }, 100);
                        });
                      }
                    });
                  } else {
                    fetchOtherDetails(
                      custName,
                      onlineVal,
                      userName,
                      isCustomUrlEnabled
                    );
                  }
                } else {
                  fetchOtherDetails(
                    custName,
                    onlineVal,
                    userName,
                    isCustomUrlEnabled
                  );
                }
              }

              function fetchOtherDetails(
                custName,
                onlineVal,
                userName,
                isCustomUrlEnabled
              ) {
                //var deviceLangPromise = LocalStorageHelper.setUserDeviceLanguage(ckey);
                //deviceLangPromise.then(function () {
                var defaultLangPromise =
                  LocalStorageHelper.setUserDefaultLanguage(
                    custName,
                    onlineVal,
                    ckey
                  );
                defaultLangPromise.then(function () {
                  downloadOtherDetails(
                    custName,
                    onlineVal,
                    ckey,
                    userName,
                    isCustomUrlEnabled
                  );
                });
                //});
              }

              function downloadOtherDetails(
                custName,
                onlineVal,
                cKeyValue,
                userName,
                isCustomUrlEnabled
              ) {
                var refPromise = LocalStorageHelper.getEmptyPromise({
                  CKey: cKeyValue,
                });

                if (userName !== "ChangeEnvironment") {
                  var refPromise = LocalStorageHelper.refreshSuiteDetails(
                    custName,
                    onlineVal,
                    isCustomUrlEnabled
                  );
                }

                refPromise.then(function (cKey) {
                  var customerKey = cKey.CKey;
                  var suitePromise = LocalStorageHelper.initSuiteDetails(
                    custName,
                    onlineVal,
                    customerKey,
                    isCustomUrlEnabled
                  );
                  suitePromise.then(
                    function (success) {
                      // $rootScope.$emit('RenderButtonBgHeaderColor');
                      darkModeEnable();
                      $timeout(function () {
                        $rootScope.$emit("OnlyWelcomeBgColor", {
                          isWelcome: false,
                        });
                      }, 200);

                      if (userName && userName !== "ChangeEnvironment") {
                        fetchUserDetails(userName);
                        $rootScope.$emit("refresh");
                      } else {
                        window.localStorage.removeItem("userLanguage");
                        $state.go("login");
                        $rootScope.$broadcast("refreshLogin");
                        LoaderService.hide();
                      }
                    },
                    function (error) {
                      console.log(error);
                      return;
                    }
                  );
                });
              }

              function addUserNameTokenCustomer(allTokens) {
                var tokenFull = allTokens[0];
                var token = tokenFull.split("=")[1];
                var custNameFull = allTokens[1];
                var custName = custNameFull.split("=")[1];
                var onlineValFull = allTokens[2];
                var onlineVal = allTokens[2].split("=")[1];
                var userName = allTokens[3].split("=")[1];
                var deepLinkCKey = "";
                var onlineValWithCKey = custName.split("-");
                var isCustomUrlEnabled =
                  allTokens[allTokens.length - 1].split("=")[1] === "True";

                if (!isCustomUrlEnabled) {
                  if (onlineValWithCKey.length == 2) {
                    custName = onlineValWithCKey[0];
                    ckey = deepLinkCKey = onlineValWithCKey[1];
                  }

                  if (onlineVal == "cloud") {
                    onlineVal = "cloudse";
                  }

                  var onlineValueForBaseUrl = onlineVal;
                  if (
                    onlineVal.toLowerCase() === "cloud" &&
                    custName.toLowerCase() === "cloud1"
                  ) {
                    onlineValueForBaseUrl = "cloudfp";
                  }

                  var baseUrl = CommonMethodsFactory.getBaseUrl(
                    onlineValueForBaseUrl
                  );
                  Restangular.setBaseUrl(
                    "https://" + baseUrl + "/" + custName + "/api/v1/"
                  ); //Restangular.setBaseUrl('http://192.168.1.25/s16/api/v1/');
                } else {
                  var baseUrl = custName;
                  if (baseUrl.includes("api/v1"))
                    Restangular.setBaseUrl("https://" + baseUrl);
                  else
                    Restangular.setBaseUrl("https://" + baseUrl + "/api/v1/");
                }

                if (token === "-1") {
                  var customer = customersManager.getCustomers();
                  addToCustomer(
                    customer,
                    custName,
                    onlineVal,
                    userName,
                    isCustomUrlEnabled
                  );
                } else {
                  // window.localStorage.setItem('token', token);
                  //alert('Hello');
                  var tokenSharedProm =
                    DeviceUtil.setKeyValueWithSharedPreferences("token", token);
                  tokenSharedProm.then(function (token2) {
                    var tokenPromise = validateToken();
                    tokenPromise.then(
                      function (sucessResp) {
                        LocalStorageUtility.addUserNameToken(token, userName);
                        var customer = customersManager.getCustomers();
                        addToCustomer(
                          customer,
                          custName,
                          onlineVal,
                          userName,
                          isCustomUrlEnabled
                        );
                      },
                      function (fail) {
                        console.log(fail);
                      }
                    );
                  });
                }
              }

              function isDeviceOnline() {
                var isOnline = $cordovaNetwork.isOnline();
                var type = $cordovaNetwork.getNetwork();
                isOnline = isOnline === true || type === "unknown";
                return isOnline;
              } // listen for Online event

              $rootScope.$on("performSync", function (e, data) {
                $timeout(function () {
                  var moduleName = data.modName;
                  // var token = window.localStorage.getItem('token');
                  var promiseDeviceUtil =
                    DeviceUtil.getKeyValueWithSharedPreferences("token");
                  promiseDeviceUtil.then(function (token) {
                    if (token != null) {
                      var customer = customersManager.getCustomers();
                      LoaderService.show();
                      var isAutoUploadDelayInMinutesDisabled =
                        customer.AutoUploadDelayInMinutes == 0 ||
                        customer.AutoUploadDelayInMinutes == null ||
                        customer.AutoUploadDelayInMinutes == undefined;
                      if (
                        customer.IsAutoSyncEnabled &&
                        isAutoUploadDelayInMinutesDisabled &&
                        isDeviceOnline() &&
                        !customer.IsDemoCustomer
                      ) {
                        var tokenValidityPromise =
                          LocalStorageHelper.validateUserToken();
                        tokenValidityPromise.then(
                          function (tokenValid) {
                            var hidePromise = LoaderService.hide();
                            hidePromise.then(function () {
                              switch (moduleName) {
                                case "ActionPlan":
                                  processCompletedActionPlansProblems(false);
                                  break;

                                case "All":
                                  runForAllModules();
                                  break;

                                case "Askade":
                                case "Claim":
                                  processCompletedAskadeWizards(
                                    moduleName,
                                    false
                                  );
                                  break;

                                default:
                                  processCompletedQuestionnaires(
                                    moduleName,
                                    false
                                  );
                                  break;
                              }
                            });
                            successAnimLoader(data.animLoader);
                          },
                          function (tokenInValid) {
                            LoaderService.hide();
                          }
                        );
                      } else {
                        LoaderService.hide();
                        successAnimLoader(data.animLoader);
                      }
                    }
                  });
                }, 100);
              });

              //Close Animation Popup when clicked anywhere on the screen
              document.onclick = function (e) {
                var animEle = document.getElementsByClassName("animPopUpClose");
                if (animEle.length > 0) {
                  PopupUtil.hideAnimPopUp();
                }
              };

              $rootScope.$on(
                "performSyncBackgroundForAutoUpload",
                function (e, data) {
                  runForAllModulesBackgroundForAutoUpload();
                }
              );

              function runForAllModulesBackgroundForAutoUpload() {
                processAllDelayedAnswers();
              }

              $rootScope.$on("performSyncBackground", function (e, data) {
                runForAllModulesBackground();
              });

              function runForAllModulesBackground() {
                LoaderService.show();
                var tokenValidityPromise =
                  LocalStorageHelper.validateUserToken();
                tokenValidityPromise.then(function (tokenValid) {
                  var userDetails =
                    userDetailsManager.getUserLastLoggedTimeStamp();

                  if (userDetails != null && userDetails != undefined) {
                    var userApplicationsDetails =
                      userApplicationsManager.getUserApplications(
                        userDetails.UserId
                      );
                  }

                  var hidePromise = LoaderService.hide();
                  hidePromise.then(function () {
                    $timeout(function backGround() {
                      if (userApplicationsDetails !== null) {
                        for (
                          var i = 0;
                          i < userApplicationsDetails.length;
                          i++
                        ) {
                          var modName = userApplicationsDetails[i].Text;

                          switch (modName) {
                            case "ActionPlan":
                              processCompletedActionPlansProblems(true);
                              break;
                            case "Apv":
                            case "RiskProfile":
                            case "EmployeeSatisfaction":
                            case "ManagementEvaluation":
                            case "HumanResource":
                            case "FrontPlanner":
                              processCompletedQuestionnaires(modName, true);
                              break;
                            case "Askade":
                            case "Claim":
                              processCompletedAskadeWizards(modName, true);
                              break;
                            default:
                              break;
                          }
                        }
                      }
                    }, 100);
                  });
                });
              }

              function runForAllModules() {
                LoaderService.show();
                var tokenValidityPromise =
                  LocalStorageHelper.validateUserToken();
                tokenValidityPromise.then(
                  function (tokenValid) {
                    var hidePromise = LoaderService.hide();
                    hidePromise.then(function () {
                      $timeout(function () {
                        var userDetails =
                          userDetailsManager.getUserLastLoggedTimeStamp();

                        if (userDetails != null && userDetails != undefined) {
                          var userApplicationsDetails =
                            userApplicationsManager.getUserApplications(
                              userDetails.UserId
                            );
                        }

                        if (userApplicationsDetails !== null) {
                          for (
                            var i = 0;
                            i < userApplicationsDetails.length;
                            i++
                          ) {
                            var modName = userApplicationsDetails[i].Text;

                            switch (modName) {
                              case "ActionPlan":
                                processCompletedActionPlansProblems(false);
                                break;

                              case "Apv":
                              case "RiskProfile":
                              case "EmployeeSatisfaction":
                              case "ManagementEvaluation":
                              case "HumanResource":
                              case "FrontPlanner":
                                processCompletedQuestionnaires(modName, false);
                                break;

                              case "Askade":
                              case "Claim":
                                processCompletedAskadeWizards(modName, false);
                                break;

                              default:
                                break;
                            }
                          }
                        }
                      }, 100);
                    });
                  },
                  function (tokenInValid) {
                    LoaderService.hide();
                  }
                );
              } // listen for Online event

              $rootScope.$on(
                "$cordovaNetwork:online",
                function (event, networkState) {
                  // var token = window.localStorage.getItem('token');
                  var promiseDeviceUtil =
                    DeviceUtil.getKeyValueWithSharedPreferences("token");
                  promiseDeviceUtil.then(function (token) {
                    if (token != null) {
                      var customer = customersManager.getCustomers();
                      var isAutoUploadDelayInMinutesDisabled =
                        customer &&
                        (customer.AutoUploadDelayInMinutes == 0 ||
                          customer.AutoUploadDelayInMinutes == null ||
                          customer.AutoUploadDelayInMinutes == undefined);
                      if (
                        customer &&
                        customer.IsAutoSyncEnabled &&
                        isAutoUploadDelayInMinutesDisabled &&
                        !customer.IsDemoCustomer
                      ) {
                        runForAllModules();
                      }
                    }
                  });
                }
              );

              function successAnimLoader(loaderCheck) {
                if (loaderCheck) {
                  $timeout(function () {
                    var anim =
                      '<lottie-player src="raw/saveSuccess.json" background="transparent" speed="1" id="uploadAnim" autoplay></lottie-player>';
                    var contentTitle = "{{getResourceText('LIT_SAVE')}}";
                    var contentLabel =
                      "{{getResourceText('MSG_MOBILE_SAVE_SETTING')}}";
                    var contentTimer = 3000;
                    PopupUtil.animTimerPopUp(
                      anim,
                      contentTitle,
                      contentLabel,
                      contentTimer
                    );
                  }, 1500);
                }
              }

              function processCompletedQuestionnaires(moduleName, skipLoader) {
                var completedQuestionnairesList =
                  personQuestionnaireManager.getCompletedQuestionnairesList(
                    moduleName
                  );

                for (var i = 0; i < completedQuestionnairesList.length; i++) {
                  var questionnaireList = completedQuestionnairesList[i];

                  for (var j = 0; j < questionnaireList.Answers.length; j++) {
                    var answeredQuestionnaireEntry =
                      questionnaireList.Answers[j];
                    var pqId =
                      answeredQuestionnaireEntry.PersonQuestionnaire.Id;
                    var pq =
                      personQuestionnaireManager.getPersonQuestionnaire(pqId); //If multiple processes try to upload the same questionaire hence the check.
                    helperProcessQuestionnaireAnswers(
                      [pq],
                      moduleName,
                      skipLoader
                    );
                  }
                }
              }

              function helperProcessQuestionnaireAnswers(
                completedAnswers,
                moduleName,
                skipLoader
              ) {
                for (var i = 0; i < completedAnswers.length; i++) {
                  var pq = completedAnswers[i];
                  var uploadInProgress = pq.UploadInProgress;
                  if (uploadInProgress == false && pq.hasDelayElapsed()) {
                    var processesPqPromise = FileUtil.processFile(pq, true);
                    var questionnaire = pq.Questionnaire;
                    processesPqPromise.then(
                      function (completePersonQuestionnaire) {
                        //Skip Questionnaire data..
                        //pq.Questionnaire = null;
                        if (
                          completePersonQuestionnaire.UploadInProgress == false
                        ) {
                          var uploadedPromise =
                            LocalStorageHelper.uploadPersonQuestionnaire(
                              completePersonQuestionnaire,
                              moduleName
                            );
                          completePersonQuestionnaire.UploadInProgress = true;
                          completePersonQuestionnaire.UploadFail = false;
                          var completedPq = completePersonQuestionnaire;
                          uploadedPromise.then(
                            function (aoData) {
                              //pq.Questionnaire = questionnaire;
                              personQuestionnaireManager.uploadPostProcess(
                                completedPq
                              ); //Notify the questionnaire list tab for change in the completed list
                              //and hence perform refresh operation on the completed list.

                              $rootScope.$emit("refresh");
                              if (skipLoader === false) {
                                var anim =
                                  '<lottie-player src="raw/loadingSuccess.json" background="transparent" speed="1" id="loadAnim" autoplay></lottie-player>';
                                var contentTitle =
                                  $rootScope.getResourceText(
                                    "LIT_MOBILE_SUCCESS"
                                  );
                                var contentLabel =
                                  completedPq.Questionnaire.Name +
                                  " " +
                                  $rootScope.getResourceText(
                                    "MSG_MOBILE_UPLOADED_REGISTRATION"
                                  );
                                var contentTimer = 5000;
                                PopupUtil.animTimerPopUp(
                                  anim,
                                  contentTitle,
                                  contentLabel,
                                  contentTimer
                                );
                              }
                            },
                            function (error) {
                              //pq.Questionnaire = questionnaire;
                              completedPq.UploadInProgress = false;
                              completedPq.UploadFail = true; //Notify the questionnaire list tab for change in the completed list
                              //which was uploaded to be reset to ready for upload once again.
                              //and hence perform refresh operation on the completed list.

                              $rootScope.$emit("refresh");
                            }
                          );
                        }
                      },
                      function (inCompletePq) {
                        // Check is performed only to validate if it is a file not found error.
                        if (inCompletePq.message === "NOT_FOUND_ERR") {
                          //Saving the questionnaire as to move to Inprogress section
                          personQuestionnaireManager.savePersonQuestionniare(
                            inCompletePq.personEntity,
                            false
                          ); // Showing toast message to notify user as to move to inprogress

                          ionicToast.showDefault(
                            inCompletePq.personEntity.Questionnaire.Name +
                              " " +
                              $rootScope.getResourceText("MSG_MOVED_INPROGRESS")
                          );
                        }

                        inCompletePq.UploadInProgress = false;
                        inCompletePq.UploadFail = true;
                        $rootScope.$emit("refresh");
                      }
                    );
                  }
                }
              }

              function helperProcessCompletedAnswerActionPlan(
                apwList,
                skipLoader
              ) {
                for (var j = 0; j < apwList.length; j++) {
                  var pApw = apwList[j];
                  var uploadInProgress = pApw.UploadInProgress;
                  if (uploadInProgress == false && pApw.hasDelayElapsed()) {
                    personApwManager.processDateColumnForActionPlan(pApw);
                    var processesPApwPromise = FileUtil.processFile(pApw, true);
                    processesPApwPromise.then(
                      function (completePersonApw) {
                        //Skip Wizard data..
                        completePersonApw.WizardId = pApw.Wizard.Id;
                        completePersonApw.UploadInProgress = true;
                        completePersonApw.UploadFail = false;
                        var completedPApw = completePersonApw;
                        var uploadPromise =
                          LocalStorageHelper.uploadPersonActionPlanWizard(
                            completePersonApw
                          );
                        uploadPromise.then(
                          function (serverSucessResponse) {
                            //TODO add a post upload method in the personApwManager like the questionnaire part .
                            //Currently only removes from the Cache and LocalStorage other
                            //dependencies not removed like the Category,LineOfBusiness table data.
                            personApwManager.removeInstance(completePersonApw);
                            $rootScope.$emit("refresh");
                            if (skipLoader === false) {
                              var anim =
                                '<lottie-player src="raw/loadingSuccess.json" background="transparent" speed="1" id="loadAnim" autoplay></lottie-player>';
                              var contentTitle =
                                $rootScope.getResourceText(
                                  "LIT_MOBILE_SUCCESS"
                                );
                              var contentLabel =
                                completePersonApw.Wizard.Name +
                                " " +
                                $rootScope.getResourceText(
                                  "MSG_MOBILE_UPLOADED_REGISTRATION"
                                );
                              var contentTimer = 5000;
                              PopupUtil.animTimerPopUp(
                                anim,
                                contentTitle,
                                contentLabel,
                                contentTimer
                              );
                            }
                          },
                          function (pApw) {
                            completedPApw.UploadInProgress = false;
                            completedPApw.UploadFail = true;
                          }
                        );
                      },
                      function (inCompletePersonApw) {
                        // Check is performed only to validate if it is a file not found error.
                        if (inCompletePersonApw.message === "NOT_FOUND_ERR") {
                          //Saving the questionnaire as to move to Inprogress section
                          personApwManager.savePersonApw(
                            inCompletePersonApw.personEntity,
                            false
                          ); // Showing toast message to notify user as to move to inprogress

                          ionicToast.showDefault(
                            inCompletePersonApw.personEntity.Wizard.Name +
                              " " +
                              $rootScope.getResourceText("MSG_MOVED_INPROGRESS")
                          );
                        }

                        inCompletePersonApw.UploadInProgress = false;
                        inCompletePersonApw.UploadFail = true;
                        $rootScope.$emit("refresh");
                      }
                    );
                  }
                }
              }

              function processCompletedActionPlansProblems(skipLoader) {
                var completedApwList =
                  personApwManager.getCompletedPersonAPWList();

                for (var i = 0; i < completedApwList.length; i++) {
                  var apwList = completedApwList[i];

                  for (var j = 0; j < apwList.Answers.length; j++) {
                    var answeredApwEntry = apwList.Answers[j];
                    var pqApwId = answeredApwEntry.PersonApwAnswer.Id;
                    var pApw =
                      personApwManager.getPersonActionPlanWizard(pqApwId); //If multiple processes try to upload the same questionaire hence the check.

                    helperProcessCompletedAnswerActionPlan([pApw], skipLoader);
                  }
                }
              }

              function processAllDelayedAnswers() {
                var apwList =
                  HomeScreenUtil.getActionPlanProblemCompletedWithAutoUploadDelayElapsed();
                helperProcessCompletedAnswerActionPlan(apwList, true);

                var askadeList =
                  HomeScreenUtil.getAskadeCompletedWithAutoUploadDelayElapsed();
                helperProcessCompletedAnswersAskade(askadeList, "Askade", true);

                var claimsList =
                  HomeScreenUtil.getClaimCompletedWithAutoUploadDelayElapsed();
                helperProcessCompletedAnswersAskade(claimsList, "Claim", true);

                var allModules = [
                  "Apv",
                  "RiskProfile",
                  "EmployeeSatisfaction",
                  "HumanResource",
                  "ManagementEvaluation",
                  "FrontPlanner",
                ];
                for (var i = 0; i < allModules.length; i++) {
                  var moduleName = allModules[i];
                  var questionnairesList =
                    HomeScreenUtil.getModuleQuestionnaireCompletedWithAutoUploadDelayElapsed(
                      moduleName
                    );
                  helperProcessQuestionnaireAnswers(
                    questionnairesList,
                    moduleName,
                    true
                  );
                }
              }

              function helperProcessCompletedAnswersAskade(
                completedAkwList,
                moduleName,
                skipLoader
              ) {
                for (var i = 0; i < completedAkwList.length; i++) {
                  var pAkW = completedAkwList[i];
                  var uploadInProgress = pAkW.UploadInProgress;
                  if (uploadInProgress == false && pAkW.hasDelayElapsed()) {
                    //Process date fields to contain date in the dd-MM-yyyy format before uploading.
                    personAskadeFileTypeWizardManager.processDateColumnForAskade(
                      pAkW
                    );
                    var processesPAkPromise = FileUtil.processFile(pAkW, true);
                    processesPAkPromise.then(
                      function (completePersonAskade) {
                        //completePersonApw.WizardId = completePersonApw.Wizard.Id;
                        completePersonAskade.UploadInProgress = true;
                        completePersonAskade.UploadFail = false;
                        var currentCompletedAk = completePersonAskade;
                        var uploadPromise;

                        console.log(moduleName);
                        if (moduleName === "Askade") {
                          uploadPromise =
                            LocalStorageHelper.uploadPersonAskadeWizard(
                              currentCompletedAk
                            );
                        } else {
                          uploadPromise =
                            LocalStorageHelper.uploadPersonClaimWizard(
                              currentCompletedAk
                            );
                        }

                        uploadPromise.then(
                          function (serverSucessResponse) {
                            personAskadeFileTypeWizardManager.removeInstance(
                              currentCompletedAk
                            );

                            if (skipLoader === false) {
                              var anim =
                                '<lottie-player src="raw/loadingSuccess.json" background="transparent" speed="1" id="loadAnim" autoplay></lottie-player>';
                              var contentTitle =
                                $rootScope.getResourceText(
                                  "LIT_MOBILE_SUCCESS"
                                );
                              var contentLabel =
                                currentCompletedAk.AskadeFileTypeWizard.Name +
                                " " +
                                $rootScope.getResourceText(
                                  "MSG_MOBILE_UPLOADED_REGISTRATION"
                                );
                              var contentTimer = 5000;
                              PopupUtil.animTimerPopUp(
                                anim,
                                contentTitle,
                                contentLabel,
                                contentTimer
                              );
                            }

                            $rootScope.$emit("refresh");
                          },
                          function (error) {
                            currentCompletedAk.UploadInProgress = false;
                            currentCompletedAk.UploadFail = true;
                          }
                        );
                      },
                      function (inCompletePersonAkw) {
                        // Check is performed only to validate if it is a file not found error.
                        if (inCompletePersonAkw.message === "NOT_FOUND_ERR") {
                          //Saving the questionnaire as to move to Inprogress section
                          personAskadeFileTypeWizardManager.saveAkWizard(
                            inCompletePersonAkw.personEntity,
                            false
                          ); // Showing toast message to notify user as to move to inprogress

                          ionicToast.showDefault(
                            inCompletePersonAkw.personEntity
                              .AskadeFileTypeWizard.Name +
                              " " +
                              $rootScope.getResourceText("MSG_MOVED_INPROGRESS")
                          );
                        }

                        inCompletePersonAkw.UploadInProgress = false;
                        inCompletePersonAkw.UploadFail = true;
                        $rootScope.$emit("refresh");
                      }
                    );
                  }
                }
              }

              function processCompletedAskadeWizards(moduleName, skipLoader) {
                var completedAskadeList =
                  personAskadeFileTypeWizardManager.getCompletedPCaseList(
                    moduleName
                  );

                for (var i = 0; i < completedAskadeList.length; i++) {
                  var askadeList = completedAskadeList[i];

                  for (var j = 0; j < askadeList.Answers.length; j++) {
                    var answeredAkEntry = askadeList.Answers[j];
                    var pAkId = answeredAkEntry.PersonAskadeAnswer.Id;
                    var pAkW =
                      personAskadeFileTypeWizardManager.getPersonAskadeFileTypeWizard(
                        pAkId
                      );

                    helperProcessCompletedAnswersAskade(
                      [pAkW],
                      moduleName,
                      skipLoader
                    );
                  }
                }
              }

              if (isIPad === false && isIOS === false) {
                window.addEventListener("native.keyboardhide", function () {
                  if (ionic.Platform.isAndroid() === true) {
                    var activeElement = document.activeElement;
                    var activeElementType = activeElement.type;

                    if (
                      activeElementType === "textarea" ||
                      activeElementType === "text" ||
                      activeElementType === "numeric"
                    ) {
                      activeElement.blur();
                    }

                    screen.orientation.unlock();
                  }
                });

                document.activeElement.addEventListener(
                  "focus",
                  function () {
                    var activeElement = document.activeElement;
                    var activeElementType = activeElement.type;

                    if (ionic.Platform.isAndroid() === true) {
                      var landscapeOrientation = [-90, 90];

                      if (
                        landscapeOrientation.indexOf(window.orientation) >= 0
                      ) {
                        //landscape..
                        if (
                          activeElementType === "textarea" ||
                          activeElementType === "text" ||
                          activeElementType === "numeric"
                        ) {
                          screen.orientation.lock("portrait");
                          cordova.plugins.Keyboard.show();
                        }
                      }
                    }
                  },
                  true
                );

                window.addEventListener("orientationchange", function (e) {
                  var landscapeOrientation = [-90, 90];
                  var keyboardVisible = cordova.plugins.Keyboard.isVisible;

                  if (landscapeOrientation.indexOf(window.orientation) >= 0) {
                    var activeElement = document.activeElement;
                    var activeElementType = activeElement.type;

                    if (
                      activeElementType === "textarea" ||
                      activeElementType === "text" ||
                      activeElementType === "numeric"
                    ) {
                      if (ionic.Platform.isAndroid() === true) {
                        if (keyboardVisible === true) {
                          screen.lockOrientation("portrait");
                          screen.orientation.lock("portrait");
                        }
                      } else {
                        cordova.plugins.Keyboard.close();
                        activeElement.blur();
                      }
                    }
                  }
                });
              }

              // Creating new directoried for storing images and PDF in the run method.

              function createDirectories() {
                var subDirName = "TempFiles";
                var dirExistProm = FileUtil.checkDirectoryExists(subDirName);
                dirExistProm.then(
                  function (success) {
                    // Folder is present
                  },
                  function (fail) {
                    var dirCreateProm = FileUtil.createSubDirectory(subDirName);
                    dirCreateProm.then(function (success) {
                      // Folder was not present, but it is created
                    });
                  }
                );
                var subDirImageName = "ImageFiles";
                var directoryExistProm =
                  FileUtil.checkDirectoryExists(subDirImageName);
                directoryExistProm.then(
                  function (success) {
                    // Folder is present
                  },
                  function (fail) {
                    var directoryCreateProm =
                      FileUtil.createSubDirectory(subDirImageName);
                    directoryCreateProm.then(function (success) {
                      // Folder was not present, but it is created
                    });
                  }
                );
              }

              createDirectories();
              $rootScope.$on("createDirectories", function (e, data) {
                // This is called when a Master reset is called.
                // During reset all the directories are deleted, so creating fresh directory.
                createDirectories();
              });

              function statusBarColorCheck() {
                var customer = customersManager.getCustomers();
                if (customer.IsDarkModeEnable) {
                  var darkHeaderColor = "#000000";
                  StatusBar.backgroundColorByHexString(darkHeaderColor);
                } else {
                  var userLoggedIn =
                    userDetailsManager.getUserLastLoggedTimeStamp();
                  StatusBar.backgroundColorByHexString(
                    userLoggedIn.Customer.ColourCode
                  );
                }
              }

              function addToCustomerUrl(
                custName,
                onlineVal,
                ckey,
                isCustomUrl
              ) {
                var suitePromise = LocalStorageHelper.initSuiteDetails(
                  custName,
                  onlineVal,
                  ckey,
                  isCustomUrl
                );
                suitePromise.then(
                  function (success) {
                    darkModeEnable();
                    $rootScope.$broadcast("refreshLogin");
                    setAppEnvironment;
                  },
                  function (error) {
                    console.log(error);
                    return;
                  }
                );
              }

              //setAppEnvironment takes a customer url and sets the environment mainly used for intune set up
              function setAppEnvironment(customerUrl) {
                var setGuidePromise =
                  DeviceUtil.setKeyValueWithSharedPreferences(
                    "isIntuneSetUp",
                    true
                  );
                var domainData =
                  CommonMethodsFactory.getUrlDetails(customerUrl);
                var custName = domainData.environment;
                var onlineVal = domainData.subDomain;
                var ckeyVal = domainData.cKey;
                var ckey = null;
                var isOnline = DeviceUtil.isDeviceOnline();

                if (ckeyVal) {
                  ckey = ckeyVal;
                }

                var onlineValueForBaseUrl = onlineVal;
                if (
                  onlineVal.toLowerCase() === "cloud" &&
                  custName.toLowerCase() === "cloud1"
                ) {
                  onlineValueForBaseUrl = "cloudfp";
                }

                var customer = customersManager.getCustomers();
                var changeCustomer = false;

                if (customer != null) {
                  var uniquePart =
                    customer.UniqueUrlPart == null
                      ? ""
                      : customer.UniqueUrlPart.toLowerCase();
                  custName = custName == null ? "" : custName.toLowerCase();

                  if (
                    customer.OnlineVal !== onlineVal ||
                    uniquePart != custName
                  ) {
                    changeCustomer = true;
                  }
                }

                if (customer == null) {
                  changeCustomer = true;
                }

                if (changeCustomer == true)
                  if (isOnline === false) {
                    AppMessages.Error(
                      $rootScope.getResourceText("LIT_ALERT"),
                      $rootScope.getResourceText(
                        "MSG_CHECK_INTERNET_CONNECTION"
                      )
                    );
                    LoaderService.hide();
                  } else {
                    LoaderService.show();
                    var baseUrl = CommonMethodsFactory.getBaseUrl(
                      onlineValueForBaseUrl
                    );

                    if (baseUrl) {
                      Restangular.setBaseUrl(
                        "https://" + baseUrl + "/" + custName + "/" + "api/v1/"
                      );
                      var validate = Restangular.all("suite").one(
                        "details/" + ckey
                      );

                      validate.get().then(
                        function (success) {
                          addToCustomerUrl(
                            custName,
                            onlineVal,
                            ckey,
                            customer && customer.IsCustomUrlEnabled
                          );
                          LoaderService.hide();
                          return success;
                        },
                        function (error) {
                          console.log(error);
                        }
                      );
                    } else {
                      // AppMessages.Error($rootScope.getResourceText('LIT_ALERT'),
                      // $rootScope.getResourceText('MSG_URL_NOT_VALID'));
                      LoaderService.hide();
                    }
                  }
              }
              function bootStrap() {
                if (userLoggedIn != null) {
                  var isUserDetailsValid =
                    userDetailsManager.getIfdownloadValidForType("UserDetails");
                  if (isUserDetailsValid === false) {
                    //Removing both appdetails and token for an unsuccessfull download off SuiteDetails/UserDetails
                    AuthenticationService.logout(false);
                    $ionicHistory.nextViewOptions({
                      disableBack: true,
                    });
                    ResetPoolUtil.resetPool();
                    $state.go("login");
                  }

                  // var loggedToken = window.localStorage.getItem('token');
                  var promiseDeviceUtil =
                    DeviceUtil.getKeyValueWithSharedPreferences("token");
                  promiseDeviceUtil
                    .then(function (loggedToken) {
                      if (loggedToken != null) {
                        console.log(loggedToken);
                        // Based on the customer setting value display Favorites screen
                        if (userLoggedIn.Customer.DisplayFavorites) {
                          var isFavEmpty = favoritesManager.isFavEmpty();
                          if (!isFavEmpty) {
                            $state.go("app.favorite", {
                              reload: true,
                            });
                          } else {
                            $state.go("app.home", {
                              reload: true,
                            });
                          }
                        } else {
                          $state.go("app.home", {
                            reload: true,
                          });
                        }
                      } else {
                        ResetPoolUtil.resetPool();
                        $state.go("login");
                      }
                    })
                    .catch(function () {
                      ResetPoolUtil.resetPool();
                      $state.go("login");
                    });
                  statusBarColorCheck();
                  // StatusBar.backgroundColorByHexString(userLoggedIn.Customer.ColourCode);
                } else {
                  $ionicHistory.nextViewOptions({
                    disableBack: true,
                  });
                  var promiseDeviceUtil =
                    DeviceUtil.getKeyValueWithSharedPreferences(
                      "isIntuneSetUp"
                    );
                  promiseDeviceUtil.then(
                    function (intuneSetpUp) {
                      if (intuneSetpUp) {
                        $state.go("login");
                      } else {
                        $state.go("toggleUrl");
                      }
                    },
                    function (err) {
                      $state.go("toggleUrl");
                    }
                  );
                }
              }

              var preferencePromise =
                DeviceUtil.getKeyValueWithSharedPreferencesForString(
                  "CustomerURL",
                  ""
                );
              preferencePromise.then(
                function (customerUrl) {
                  customerUrl = customerUrl.replace(/['"]+/g, "");
                  if (customerUrl) {
                    setAppEnvironment(customerUrl);
                  }
                },
                function (error) {
                  console.log(error);
                }
              );

              var preferencePromise =
                DeviceUtil.getKeyValueWithSharedPreferencesForString(
                  "route",
                  ""
                );
              preferencePromise.then(
                function (route) {
                  if (route && route.length > 0) {
                    setTimeout(function () {
                      window.navigateFromPush(route);
                      window.handleDeepLink(route);
                    }, 700);
                    DeviceUtil.removeByKeySharedPreferences("route");
                  }
                },
                function (error) {
                  alert(error);
                }
              );
            });
          });
        });
      },
    ]);
})();

(function () {
  var app = angular
    .module("actionPlan", [
      "EntityUtils",
      "LocalStorageUtils",
      "directives",
      "commonUtils",
      "ionic-toast",
      "Modal-Popup",
      "Camera-Gallery",
    ])
    .config([
      "$ionicConfigProvider",
      function ($ionicConfigProvider) {
        $ionicConfigProvider.views.maxCache(0);
      },
    ]);
})();

(function () {
  var app = angular.module("documentLibrary", []);
})();

(function () {
  var app = angular.module("documentLibrary", []);
})();

(function () {
  var app = angular.module("askade", []);
})();


/***/ }),

/***/ "./scripts/app/popup.js":
/*!******************************!*\
  !*** ./scripts/app/popup.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var app = angular.module('Modal-Popup', []);
app.factory("$exceptionHandler",  ['$injector', function($injector) {
    return function (exception, cause) {
        var localStorageUtility = $injector.get('LocalStorageUtility')
        localStorageUtility.addExceptionToLogTable(exception,cause);
        var rScope = $injector.get('$rootScope');
        rScope.$broadcast('exceptionRefresh', exception, cause);
    };
 }]);
app.factory('ModalUtil', ["$ionicModal", "IOSUtil", function ($ionicModal, IOSUtil) {
    var modelUtil = {
        //Cleanup the video modal when we're done with it!
        initModal: function initModal(currentScope) {
            var template = '<div class="modal" ng-click="close()"><ion-content><img ng-src="{{src}}" src="{{src}}" style="display:block; width:90%; max-width:600px; margin:auto" /></ion-content></div>';
            currentScope.Modal = $ionicModal.fromTemplate(template, {
                scope: currentScope,
                animation: 'slide-in-up'
            });
        },
        getImageFilePath:function(imageSource){
            var isIPad = ionic.Platform.isIPad();
            var isIOS = ionic.Platform.isIOS();

            if (isIPad || isIOS) {
                var findIndex = imageSource.lastIndexOf('/');
                var fileName = imageSource.substring(findIndex + 1, imageSource.length);
                var directoryPath = imageSource.replace(fileName, '');
                directoryPath = IOSUtil.correctIOSPath(directoryPath);
                imageSource = directoryPath + fileName;
                imageSource = window.Ionic.WebView.convertFileSrc(imageSource);
            }
            return imageSource;
        },
        openModal: function openModal(currentScope, imageSource) {
            // Adding IOS check, so as to handle path issue after the change related to moving files to a specific folder.
            // In IOS on app update path name used to update because of this attachments were missing
            var isIPad = ionic.Platform.isIPad();
            var isIOS = ionic.Platform.isIOS();
            if (isIPad || isIOS) {
                var findIndex = imageSource.lastIndexOf('/');
                var fileName = imageSource.substring(findIndex + 1, imageSource.length);
                var directoryPath = imageSource.replace(fileName, '');
                directoryPath = IOSUtil.correctIOSPath(directoryPath);
                imageSource = directoryPath + fileName;
                imageSource = window.Ionic.WebView.convertFileSrc(imageSource);
            }
            currentScope.src = imageSource;
            currentScope.Modal.show();
        },
        closeModal: function closeModal(currentScope) {
            currentScope.Modal.hide(); // Removes modal instance
            currentScope.Modal.remove();
        }
    };
    return modelUtil;
}]);
app.factory('PopupUtil', ['$q', '$ionicPopup', '$timeout', 'PictureUtil', '$rootScope', 'GeneralUtil', 'FileUtil', function ($q, $ionicPopup, $timeout, PictureUtil, $rootScope, GeneralUtil, FileUtil) {
    var popUpScope = {
        popUpHandle: {},
        listPopup: {},
        timerPopup: {},
        getAttachment: function getAttachment(title, id, currentScope, canPickDoc) {
            // An elaborate, custom popup
            currentScope.qId = id;
            var deferedPromise = $q.defer();
            var extensions = currentScope.userDetail.Customer.AllowedExtensions != null ? currentScope.userDetail.Customer.AllowedExtensions : null;
            
            var allowedExtensions = extensions;
            if (allowedExtensions != null) {
                allowedExtensions = allowedExtensions.split(',');
                var alteredExtensions = [];
                for (var i = 0; i < allowedExtensions.length; i++) {
                    alteredExtensions.push(`.${allowedExtensions[i]}`);
                }
                currentScope.allowedExtensions = alteredExtensions.join();
            }

            if (currentScope.allowedExtensions != null)
                currentScope.canPickDoc = canPickDoc;

            currentScope.captureImage = function (id) {
                deferedPromise = PictureUtil.takePicturePromise(deferedPromise);
                popUpScope.popUpHandle.close();
            };

            currentScope.chooseImage = function (id) {
                deferedPromise = PictureUtil.selectGalleryImagesPromise(deferedPromise);
                popUpScope.popUpHandle.close();
            };

            popUpScope.popUpHandle = $ionicPopup.show({
                templateUrl: "templates/selectFilePopUp.html",
                title: "<div class='popUpTitleBackground'>" + title + "</div>",
                scope: currentScope
            });

            $timeout(function () {
                currentScope.gallerySelected = false;
                popUpScope.popUpHandle.close(); //close the popup after 3 seconds for some reason
            }, 3000);

            return deferedPromise;
        },
        showFileSelector: function showFileSelector(title, questionId, currentScope) {
            // An elaborate, custom popup
            currentScope.qId = questionId;
            popUpScope.popUpHandle = $ionicPopup.show({
                templateUrl: "templates/selectFilePopUp.html",
                title: "<div class='popUpTitleBackground'>" + title + "</div>",
                scope: currentScope
            });
            popUpHandle.then(function (res) {
                console.log('Tapped!', res);
            });
            $timeout(function () {
                popUpScope.popUpHandle.close(); //close the popup after 3 seconds for some reason
            }, 5000);
        },
        showFileList: function showFileList(title, files, currentScope) {
            // An elaborate, custom popup
            currentScope.files = files;
            popUpScope.popUpHandle = $ionicPopup.show({
                templateUrl: "templates/news/fileList.html",
                title: "<div>" + title + "</div>",
                cssClass: 'listPopUpClass',
                scope: currentScope,
                buttons: [{
                    text: $rootScope.getResourceText('LIT_CANCEL_TEXT')
                }]
            });
            popUpScope.popUpHandle.then(function (res) {//console.log('Tapped!', res);
            });
        },
        hide: function hide() {
            if (popUpScope.popUpHandle.close) {
                popUpScope.popUpHandle.close();
            }
        },
        confirm: function confirm(title, body) {
            var confirmPopup = $ionicPopup.confirm({
                title: "<div class='popUpTitleBackground'>" + title + "</div>",
                template: body,
                okText: $rootScope.getResourceText('LIT_OK'),
                cancelText: $rootScope.getResourceText('LIT_CANCEL_TEXT')
            });
            confirmPopup.then(function (res) {
                if (res) {
                    confirmPopup.close();
                    return true;
                } else {
                    confirmPopup.close();
                    return false;
                }
            });
            return confirmPopup;
        },
        readAloudAlert: function readAloudAlert(title, message, scope) {
            var alertPopup = $ionicPopup.alert({
                title: "<div class='popUpTitleBackground'>" + title + "</div>",
                template: "<div class='buttons displayInlineBlock verticalTopAlign popUpSpeakerIcon' ng-if='readAloud'>" + "<div class= 'icon displayInlineBlock helpLinkIcon'>" + "<img ng-src='images/speaker.png' ng-click=\"ttsConvert(\'" + message.replace("'", "\\'") + "\')\" />" + "</div >" + "</div ><ion-scroll class='disclaimer-text'>" + message + "</ion-scroll>",
                scope: scope,
                buttons: [{
                    text: $rootScope.getResourceText('LIT_OK'),
                    type: 'button button-outline'
                }]
            });
        },
        alert: function alert(title, message) {
            var alertPopup = $ionicPopup.alert({
                title: "<div class='popUpTitleBackground'>" + title + "</div>",
                template: "<ion-scroll class='disclaimer-text'>" + message + "</ion-scroll>",
                buttons: [{
                    text: $rootScope.getResourceText('LIT_OK'),
                    type: 'button button-outline'
                }]
            });
        },
        // HTML pop for Document library of type HTML
        htmlDocAlert: function htmlDocAlert(title, htmlContent) {
            var alertPopup = $ionicPopup.alert({
                title: "<div class='popUpTitleBackground'>" + title + "</div>",
                template: "<ion-content class='popupHtmlCss' scroll='true' overflow-scroll='true'>" + "<div>" + htmlContent.html() + "</div>" + "</ion-content>",
                cssClass: "docHtmlView",
                buttons: [{
                    text: $rootScope.getResourceText('LIT_OK'),
                    type: 'button button-outline'
                }]
            });
            return alertPopup;
        },
        listPopUp: function listPopUp(title, searchText, currentScope) {
            var deferred = $q.defer();
            var source = currentScope.dataSource;
            currentScope.search = searchText;

            currentScope.getSelectedValue = function (item) {
                currentScope.SelectedValue = item;
                deferred.resolve(item);
            };

            popUpScope.listPopup = $ionicPopup.show({
                templateUrl: "templates/listPopUp.html",
                title: title,
                cssClass: 'listPopUpClass',
                scope: currentScope,
                buttons: [{
                    text: $rootScope.getResourceText('LIT_CANCEL_TEXT')
                }]
            });
            return deferred.promise;
        },
        hideListPopUp: function hideListPopUp() {
            popUpScope.listPopup.close();
        },
        timerPopUp: function timerPopUp(title, currentScope, time) {
            var deferred = $q.defer();

            currentScope.getTimeSelected = function (item, event) {
                deferred.resolve(item);
                for (var i = 0; i < time.length; i++) {
                    var elId = 'time_' + time[i];
                    var element = document.getElementById(elId);
                    element.classList.remove("existingValue");
                }
                var timeId = event.srcElement.id;
                var timeIdValue = '#' + timeId;
                angular.element(timeIdValue).addClass("existingValue");
                $timeout(function () {
                    popUpScope.timerPopup.close();
                }, 100);
            };

            popUpScope.timerPopup = $ionicPopup.show({
                templateUrl: "templates/timePickerTemplate.html",
                title: title,
                scope: currentScope,
                buttons: [{
                    text: $rootScope.getResourceText('LIT_CANCEL_TEXT')
                }]
            });
            return deferred.promise;
        },
        bodyPartConfirm: function bodyPartConfirm(title) {
            var confirmPopup = $ionicPopup.confirm({
                title: "<div class='popUpTitleBackground'>" + title + "</div>",
                templateUrl: "templates/bodySelectorPopUp.html",
                cssClass: "bodyPopUp",
                okText: $rootScope.getResourceText('LIT_OK'),
                cancelText: $rootScope.getResourceText('LIT_BACK')
            });
            confirmPopup.then(function (res) {
                if (res) {
                    confirmPopup.close();
                    return true;
                } else {
                    confirmPopup.close();
                    return false;
                }
            });
            return confirmPopup;
        },

        //animated popup handling
        animTimerPopUp: function animTimerPopUp(anim, title, label, timer) {
            popUpScope.popUpHandle = $ionicPopup.show({
                template: anim +
                    '<div class="popUpContentTitle">' + title + '</div>' +
                    '<div class="popUpContentLabel">' + label + '</div>',
                cssClass: 'animPopUp animPopUpClose'
            });
            $timeout(function () {
                popUpScope.popUpHandle.close(); //close the popup after 3 seconds for some reason
            }, timer);
        },
        animPopUp: function animPopUp(anim, title, label) {
            popUpScope.popUpHandle = $ionicPopup.show({
                template: anim +
                    '<div class="popUpContentTitle">' + title + '</div>' +
                    '<div class="popUpContentLabel">' + label + '</div>',
                cssClass: 'animPopUp animPopUpClose'
            });
        },
        hideAnimPopUp: function hideAnimPopUp() {
            popUpScope.popUpHandle.close();
        },
        animConfirm: function animConfirm(icon, title, label) {
            var confirmPopup = $ionicPopup.confirm({
                template: icon +
                    '<div class="popUpContentTitle">' + title + '</div>' +
                    '<div class="popUpContentLabel">' + label + '</div>',
                cssClass: 'animPopUp',
                okText: $rootScope.getResourceText('LIT_OK'),
                cancelText: $rootScope.getResourceText('LIT_CANCEL_TEXT')
            });
            confirmPopup.then(function (res) {
                if (res) {
                    confirmPopup.close();
                    return true;
                } else {
                    confirmPopup.close();
                    return false;
                }
            });
            return confirmPopup;
        },
        animAlert: function animAlert(icon, title, label) {
            var alertPopup = $ionicPopup.alert({
                template: icon +
                    '<div class="popUpContentTitle">' + title + '</div>' +
                    '<div class="popUpContentLabel">' + label + '</div>',
                cssClass: 'animPopUp',
                buttons: [{
                    text: $rootScope.getResourceText('LIT_OK'),
                    type: 'button button-outline'
                }]
            });
        },
        showDocFileList: function showDocFileList(title, files, currentScope) {
            // An elaborate, custom popup
            currentScope.files = files;
            currentScope.title = title;
            popUpScope.popUpHandle = $ionicPopup.show({
                templateUrl: "templates/asset_document_templates/docList.html",
                cssClass: 'listPopUpClass assetPopUp',
                scope: currentScope
            });
            currentScope.popup = popUpScope.popUpHandle;
            
        },
    };
    return popUpScope;
}]);
app.factory('PopOverUtil', ["$ionicPopover", function ($ionicPopover) {
    var popOverUtil = {
        initPopOver: function initPopOver(templateUrl, currentScope) {
            $ionicPopover.fromTemplateUrl(templateUrl, {
                scope: currentScope
            }).then(function (popover) {
                currentScope.popover = popover;
            }, function (err) {
                var t = '';
            });
        },
        openPopOver: function openPopOver(currentScope, event) {
            currentScope.popover.show(event);
        },
        closePopover: function closePopover(currentScope) {
            currentScope.popover.hide();
        }
    };
    return popOverUtil;
}]);


/***/ }),

/***/ 0:
/*!***********************************************************************************************************!*\
  !*** multi ./scripts/app/app.js ./scripts/app/main.js ./scripts/app/popup.js ./scripts/app/directives.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./scripts/app/app.js */"./scripts/app/app.js");
__webpack_require__(/*! ./scripts/app/main.js */"./scripts/app/main.js");
__webpack_require__(/*! ./scripts/app/popup.js */"./scripts/app/popup.js");
module.exports = __webpack_require__(/*! ./scripts/app/directives.js */"./scripts/app/directives.js");


/***/ })

/******/ });
//# sourceMappingURL=customapp.bundle.js.map