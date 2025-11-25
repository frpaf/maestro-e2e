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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./scripts/controller/actionPlanController.js":
/*!****************************************************!*\
  !*** ./scripts/controller/actionPlanController.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var app = angular.module("actionPlan").config(['$compileProvider', function( $compileProvider ) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|cdvfile|content|tel|geo|mailto|sms|market):|data:image\//);
}
]);
    app.controller("actionPlanController", [
        "ionicToast",
        "personApwManager",
        "PopupUtil",
        "$scope",
        "$injector",
        "$stateParams",
        "$timeout",
        "$state",
        "ModalUtil",
        "$rootScope",
        "FileUtil",
        "AppMessages",
        "LoaderService",
        "userApplicationsManager",
        "userDetailsManager",
        "customersManager",
        "$ionicScrollDelegate",
        "personApwTemplateManager",
        "ActionPlanMethodFactory",
        "$q",
        "TextToSpeachUtil",
        "SpeachToTextUtil",
        "personApwMultiTaskManager",
        "personActionPlanMultiTaskAttachmentManager",
        "GeneralUtil",
        function (
            ionicToast,
            personApwManager,
            PopupUtil,
            $scope,
            $injector,
            $stateParams,
            $timeout,
            $state,
            ModalUtil,
            $rootScope,
            FileUtil,
            AppMessages,
            LoaderService,
            userApplicationsManager,
            userDetailsManager,
            customersManager,
            $ionicScrollDelegate,
            personApwTemplateManager,
            ActionPlanMethodFactory,
            $q,
            TextToSpeachUtil,
            SpeachToTextUtil,
            personApwMultiTaskManager,
            personActionPlanMultiTaskAttachmentManager,
            GeneralUtil
        ) {
            // Commented the below set of code to check the focus issue when keyboard is hidden still persists.
            //window.addEventListener('native.keyboardhide', function () {
            //    screen.unlockOrientation();
            //    window.blur();
            //});
            var apwId = null,
                pApwId = null;
            var id = $stateParams.id;
            var state = $stateParams.state;
            $scope.title = $stateParams.viewTitle;
            $scope.modColor = $stateParams.modColor; // This boolean value disables the Submit/Back/Next while answering (Handling user interaction after first click)

            $scope.isDisabled = false; // This boolean values is used to disable next/save button on multi task answering
            $scope.isDatePickDisabled = false;
            //$scope.isMultiTaskAnswering = false;
            // Boolean value to show/hide the questionnaire template

            $scope.endOfQuestionnaire = false;
            var personApw = null;
            $scope.userDetail = userDetailsManager.getUserLastLoggedTimeStamp();
            $scope.readAloud = $scope.userDetail.Customer.IsReadAloudTextEnable;
            $scope.androidVersion = SpeachToTextUtil.checkAndroidVersion();
            $scope.DisableUploadPhotoLibary = $scope.userDetail.Customer.DisableReadImageFromPhotoLibary;
            $scope.isEnableLocation = $scope.userDetail.Customer.EnableGeoLocation;
                if (state == "app.apwTabs.active") {
                personApw = personApwTemplateManager.getUnAnsweredPersonActionPlanWizard(
                    id
                );
                personApw.IsTemplate = true;
            } else {
                personApw = personApwManager.getPersonActionPlanWizard(id);
            } // This below method refactors the entity with respect to action plan wizard entity
            // Based on person action plan template/ person action plan entity, action plan wizard entity is generated.

            var pActionPlanWizard = ActionPlanMethodFactory.refactorAPEntity(
                personApw
            );
            $scope.personActionPlanWizard = personApw; // Assing the refactored entity to the scope variable (For view purpose)

            $scope.apwLength = pActionPlanWizard.WizardSteps.length;
            $scope.personWizAttachments = personApw.Attachments;
            $scope.wizard = pActionPlanWizard; // Below variable is used to assign the multi task entity value while answering multi task

            $scope.MultiTaskEntity = null; // Below variable gets a value assigned only during the list display of multi tasks.

            $scope.MultiTaskList = null; // Below two boolean variables 1. IsFreshMultiTask is used to show/hide multi task list and answer screen
            // 2. IsFreshMultiTaskCancel, this is used to check when a cancel button is pressed when answering fresh

            $scope.multiTask = {
                IsFreshMultiTask: null,
                IsFreshMultiTaskCancel: false,
            };
            $scope.isNativeScroll = true;
            var isIOS = ionic.Platform.isAndroid() == false;
            $scope.isIOS = isIOS;
            var multiTaskAttachIdList = [];

            if (personApw.LastAnsweredStepIndex == null) {
                $scope.currentStepIndex = 0;
            } else {
                $scope.currentStepIndex = personApw.LastAnsweredStepIndex;
            } // Saving the $index value of ng-repeat to a scope variable

            $scope.setCount = function (index) {
                $scope.count = index;
            }; //The actual Length is considered here that is +1 for the first title screen.

            $scope.actionPlanStepLength = pActionPlanWizard.WizardSteps.length;

            $scope.previousWizardView = function () {
                //LoaderService.show();  //Hiding the loader for local operations
                // Hiding the keyboard if it is open while navigating to next view
                cordova.plugins.Keyboard.close();
                $scope.isDisabled = true;

                $timeout(function () {
                    if ($scope.currentStepIndex > -1) {
                        var wizardSteps = $scope.wizard.WizardSteps;
                        var currentStep = $scope.currentStepIndex;
                        var step = wizardSteps[currentStep]; // Checking if the step is a multi task step

                        if (step.IsMultiTaskColumnsPresent) {
                            if ($scope.MultiTaskEntity) {
                                $scope.MultiTaskEntity.IsEmptyMultiTask = false;
                                setIsSavedToDbTrue($scope.MultiTaskEntity);
                                var isPersonApwTemplate = checkIfPersonApWIsTemplateForMT(
                                    $scope.MultiTaskEntity
                                );

                                if (!isPersonApwTemplate) {
                                    // Saving normaly if it is not a template
                                    personApwMultiTaskManager.saveMultiTaskEntity(
                                        $scope.MultiTaskEntity
                                    );
                                }

                                $scope.multiTask.IsFreshMultiTask = false; //$scope.isMultiTaskAnswering = false;

                                step.IsMultiTaskStepValid = true;
                                $scope.MultiTaskEntity = null;
                                completeValidation(false);
                            } else {
                                completeValidation(false);
                            }
                        } else {
                            completeValidation(false);
                        }
                    }
                    $scope.isDisabled = false;
                }, 500);
            };

            $scope.showImageViewer = function (pAttachment) {
                if (pAttachment) {
                    if (!pAttachment.MarkedForDelete) {
                        return pAttachment.FileLocation != null;
                    }
                }
                return false;
            };

            $scope.selectFile = function () {
                var unattached = $scope.personActionPlanWizard.Attachments.filter(
                    (a) => a.FileLocation === undefined || a.FileLocation === null
                );
                if (unattached.length > 0) {
                    var currentAttachment = unattached[0];
                    var attachedPromise = PopupUtil.getAttachment(
                        $rootScope.getResourceText("LIT_ATTACHMENTS"),
                        currentAttachment.Id,
                        $scope
                    );
                    attachedPromise.promise.then(
                        function (imageUri) {
                            var pAttach = $scope.getPersonApwAttachments(
                                currentAttachment.Id
                            );
                            PopupUtil.hide(); // The below promise returns the corrected file name if the file name starts with 'content://'

                            var fileInfoPromise = FileUtil.getFilePathAndName(imageUri);
                            fileInfoPromise.promise.then(
                                function (successFileInfo) {
                                    pAttach.FileLocation = successFileInfo.fileLocation;
                                    pAttach.FileName = successFileInfo.fileName;
                                    var urlPathPromise = $rootScope.getInternalUrl(pAttach.FileLocation);
                                    urlPathPromise.then(function(internalUrl){
                                        pAttach.InternalFileLocation = internalUrl;
                                    });
                                    pAttach.MarkedForDelete = false;
                                },
                                function (errorFileInfo) {
                                    // Show some message to the user saying select the image again: TODO
                                }
                            );
                        },
                        function (error) {
                            AppMessages.Error(
                                $rootScope.getResourceText("LIT_MESSAGE"),
                                $rootScope.getResourceText("MSG_NO_CAMERA_FOUND")
                            );
                        }
                    );
                } else {
                    PopupUtil.readAloudAlert(
                        $rootScope.getResourceText("LIT_ADD_PHOTO"),
                        $rootScope.getResourceText(
                            "MSG_MOBILE_TO_THE_MAXIMUM_ATTACHMENTS_REACHED"
                        ) +
                        "(" +
                        $scope.personActionPlanWizard.Attachments.length +
                        "/" +
                        $scope.personActionPlanWizard.Attachments.length +
                        ").<br/><br/>" +
                        $rootScope.getResourceText("MSG_MOBILE_REMOVE_THE_ATTACHMENT"),
                        $scope
                    );
                }
            };

            $scope.close = function () {
                ModalUtil.closeModal($scope);
            };

            $scope.showImage = function (pAtttach) {
                var fileLoc = pAtttach.InternalFileLocation;
                if (fileLoc != null) {
                    ModalUtil.initModal($scope);
                    ModalUtil.openModal($scope, fileLoc);
                }
            };

            $scope.getThumnail = function (pAtttach) {
                var fileLoc = pAtttach.InternalFileLocation;
                var isAndroid = ionic.Platform.isAndroid();
                if(isAndroid === true){
                    return fileLoc;
                }
                if (fileLoc) {
                  var osSpecificLocation = FileUtil.getImageFilePath(fileLoc);
                  return osSpecificLocation;
                }
                return "images/gallery.png";
            };

            $scope.deleteAttachment = function (pAttach) {
                var confirmPromise = PopupUtil.confirm(
                    $rootScope.getResourceText("LIT_DELETE"),
                    $rootScope.getResourceText("MSG_CONFIRM_DELETE_FIELD")
                );
                confirmPromise.then(function (success) {
                    if (success) {
                        pAttach.MarkedForDelete = true;
                        pAttach.FileHeader = null; // PDF was not generating on edit of answer FT 7352

                        pAttach.FileSourceBase64 = null; // Delete the image from system on conformation

                        var filePath = pAttach.FileLocation;
                        var deletePromise = FileUtil.deleteFile(filePath);
                        deletePromise.then(
                            function (success) {
                                // Success
                            },
                            function (error) {
                                // Error
                            }
                        );
                        var pApw = $scope.personActionPlanWizard;
                        personApwManager.savePersonApw(pApw, false);
                    }
                });
            };

            $scope.getPersonApwAttachments = function (attachId) {
                var pAttachments = $scope.personActionPlanWizard.Attachments;

                for (var i = 0; i < pAttachments.length; i++) {
                    var pAttach = pAttachments[i];
                    var pAttachId = pAttach.Id;

                    if (pAttachId === attachId) {
                        return pAttach;
                    }
                }
            };

            $scope.nextWizardView = function () {
                //LoaderService.show();  //Hiding the loader for local operations
                // Hiding the keyboard if it is open while navigating to next view
                cordova.plugins.Keyboard.close();
                $scope.isDisabled = true;
                var that = this;
                $timeout(function () {
                    var wizardSteps = $scope.wizard.WizardSteps;
                    var currentStep = $scope.currentStepIndex;
                    var step = wizardSteps[currentStep]; // Checking if the step is a multi task step

                    if (step.IsMultiTaskColumnsPresent) {
                        // Validatating if title field has a value, when multi task is in the first step
                        var isTitleValid = $scope.validateTitleMultiTaskStep();

                        if (isTitleValid) {
                            // checking if multi task has atleast on entry already done, when any of the columns has required field for multi task
                            var isValidMT = getValidMultiTaskAnswer();

                            if (isValidMT) {
                                // Check is user is currently answering multi task
                                if ($scope.MultiTaskEntity) {
                                    // If answering then validate multi task on next button click
                                    var isMultiTaskValid = that.validateMultiTask(
                                        $scope.MultiTaskEntity
                                    );

                                    if (isMultiTaskValid === false) {
                                        ionicToast.showDefault(
                                            $rootScope.getResourceText("LIT_REQUIRED")
                                        );
                                    } else {
                                        $scope.MultiTaskEntity.IsEmptyMultiTask = false;
                                        setIsSavedToDbTrue($scope.MultiTaskEntity); // Below method called to save multi task gets the new PersonApwId if the person action plan entity is a template
                                        // If its template it saves the person entity to get ne PersonApwId and save multi task.

                                        var isPersonApwTemplate = checkIfPersonApWIsTemplateForMT(
                                            $scope.MultiTaskEntity
                                        );

                                        if (!isPersonApwTemplate) {
                                            // Saving normaly if it is not a template
                                            personApwMultiTaskManager.saveMultiTaskEntity(
                                                $scope.MultiTaskEntity
                                            );
                                        }

                                        $scope.multiTask.IsFreshMultiTask = false; //$scope.isMultiTaskAnswering = false;

                                        step.IsMultiTaskStepValid = true;
                                        $scope.MultiTaskEntity = null;
                                        completeValidation(true);
                                    }
                                } else {
                                    completeValidation(true);
                                }
                            }
                        } else {
                            ionicToast.showDefault(
                                $rootScope.getResourceText("LIT_REQUIRED")
                            );
                            $scope.disabled = false;
                        }
                    } else {
                        var isValid = that.validateCurrentStep();

                        if (isValid === true) {
                            completeValidation(true);
                        }
                    } //var hideProm = LoaderService.hide();
                    //hideProm.then(function () {

                    if (isValid === false) {
                        ionicToast.showDefault($rootScope.getResourceText("LIT_REQUIRED"));
                    }
                    $scope.isDisabled = false;
                }, 500); // Reducing the time out to 0 from 50 (For local operations)
            }; // Moved the common code to a method on Next button click

            function completeValidation(isNext) {
                if (isNext) {
                    $scope.currentStepIndex += 1;
                } else {
                    $scope.currentStepIndex -= 1;
                }
                var pApw = processColumnGuide();
                pApw.LastAnsweredStepIndex = $scope.currentStepIndex;
                $scope.personActionPlanWizard = personApwManager.savePersonApw(
                    pApw,
                    false
                );
                $ionicScrollDelegate.scrollTop(true);
            }

            function setIsSavedToDbTrue(multiTaskEntity) {
                for (var i = 0; i < multiTaskEntity.Attachments.length; i++) {
                    var mtAttach = multiTaskEntity.Attachments[i];

                    if (multiTaskAttachIdList.indexOf(mtAttach.Id) > -1) {
                        mtAttach.IsSavedToDb = true;
                    }
                }
            }

            $scope.showWizardView = function () {
                $scope.pos =
                    (($scope.currentStepIndex + 1) / $scope.actionPlanStepLength) * 100 +
                    "%";
                return $scope.currentStepIndex;
            }; // Callback from the lazy dropdown directive. returns the selected item
            // and selected person entity instance respectively

            $scope.setSelectedItem = function (listItem, selectedEntity) {
                selectedEntity.AnswerText = listItem.Text;
            };

            $scope.showGroupDescription = function (groupName, groupDescription) {
                if (groupDescription == null) {
                    ionicToast.showDefault(groupName);
                    return;
                }

                PopupUtil.readAloudAlert(groupName, groupDescription, $scope);
            };

            $scope.ttsConvert = function (caseInstance, event) {
                // Removing HTML characters if any
                var text = TextToSpeachUtil.stripHTML(caseInstance);
                TextToSpeachUtil.convertTextToSpeach(text);

                if (event) {
                    event.preventDefault(); // added for ionic

                    event.stopPropagation();
                }
            }; // isMultiTask value is set only in multi task template. Other places it is not set so returns undefined

            $scope.startListening = function (entity, type, isMultiTask) {
                // Initiate Speech to text
                // isMultiTask flag is used only for Multi Task solution, for others it will be undefined
                var speech = SpeachToTextUtil.startListening();
                speech.then(
                    function (result) {
                        console.log(result[0]);

                        switch (type) {
                            case "Title":
                                entity.Title = result[0];
                                break;

                            case "ShortText":
                                entity.AnswerText = result[0];
                                break;

                            case "LongText":
                                // Handling for Multi Task Solution text
                                if (isMultiTask) {
                                    entity.SolutionText = result[0];
                                }

                                entity.AnswerText = result[0];
                                break;

                            default:
                        }
                    },
                    function () {}
                );
            };

            function getManagerText(dropDownText, columnType) {
                var managerText = "";

                switch (columnType) {
                    case "CustomerFieldValueDropDown":
                    case "RadComboBox":
                    case "DropDown":
                        managerText = dropDownText;
                        break;

                    default:
                        managerText = columnType.replace("DropDown", "");
                        break;
                }

                return managerText;
            }

            $scope.getDropDownSourceByText = function (dropDownText, columnType) {
                return ActionPlanMethodFactory.getDropDownSourceByText(
                    dropDownText,
                    columnType
                );
            };

            $scope.getPersonApwColumnAnswerById = function (pApwId) {
                var colAnswers = $scope.personActionPlanWizard.ColumnValues;

                for (var i = 0; i < colAnswers.length; i++) {
                    var colAnswer = colAnswers[i];

                    if (colAnswer.Id === pApwId) {
                        return colAnswer;
                    }
                }

                return null;
            };

            $scope.getPersonApwStepAnswer = function (wizardStepId, columnId) {
                var wizStepAnswers = $scope.personActionPlanWizard.ColumnValues;
                return ActionPlanMethodFactory.getPersonApwStepAnswer(
                    wizardStepId,
                    columnId,
                    wizStepAnswers
                );
            };

            $scope.enableNativeScrolling = function (wizStep) {
                var isMultiTask = wizStep.IsMultiTaskColumnsPresent;
                var isIOS = ionic.Platform.isAndroid() == false;
                var isAndroid = ionic.Platform.isAndroid();

                if (isIOS && isMultiTask) {
                    $scope.isNativeScroll = false;
                } else if (isAndroid) {
                    $scope.isNativeScroll = true;
                } else {
                    $scope.isNativeScroll = true;
                }
            }; // Deleting Multi Task Attachment

            $scope.deleteMultiTaskAttachment = function (pAttach, multiTaskEntity) {
                var confirmPromise = PopupUtil.confirm(
                    $rootScope.getResourceText("LIT_DELETE"),
                    $rootScope.getResourceText("MSG_CONFIRM_DELETE_FIELD")
                );
                confirmPromise.then(function (success) {
                    if (success) {
                        pAttach.MarkedForDelete = true; // PDF was not generating on edit of answer FT 7352

                        pAttach.FileSourceBase64 = null;
                    }
                });
            }; // On button click create a new entry in DB

            $scope.createMultiTaskAttachment = function (multiTaskId) {
                var attachedPromise = PopupUtil.getAttachment(
                    $rootScope.getResourceText("LIT_ATTACHMENTS"),
                    multiTaskId,
                    $scope
                );
                attachedPromise.promise.then(
                    function (imageUri) {
                        var multiTaskAttachment = personActionPlanMultiTaskAttachmentManager.createNewMultiTaskAttachment(
                            multiTaskId
                        );
                        $scope.MultiTaskEntity = personApwMultiTaskManager.getMultiTaskData(
                            multiTaskId
                        );
                        PopupUtil.hide(); // The below promise returns the corrected file name if the file name starts with 'content://'

                        var fileInfoPromise = FileUtil.getFilePathAndName(imageUri);
                        fileInfoPromise.promise.then(
                            function (successFileInfo) {
                                multiTaskAttachment.FileLocation = successFileInfo.fileLocation;
                                multiTaskAttachment.FileName = successFileInfo.fileName;
                                multiTaskAttachment.MarkedForDelete = false;
                                multiTaskAttachment.IsSavedToDb = false;
                                multiTaskAttachIdList.push(multiTaskAttachment.Id);
                            },
                            function (errorFileInfo) {
                                // Show some message to the user saying select the image again: TODO
                            }
                        );
                    },
                    function (error) {
                        AppMessages.Error(
                            $rootScope.getResourceText("LIT_MESSAGE"),
                            $rootScope.getResourceText("MSG_NO_CAMERA_FOUND")
                        );
                    }
                );
            };

            $scope.getPersonApwMultiTaskAnswer = function (
                personApwId,
                wizardStep,
                isPreviewAP
            ) {
                var multiTaskAnswers = personApwMultiTaskManager.getAllMultiTaskData(
                    personApwId
                );

                if (multiTaskAnswers.length !== 0) {
                    $scope.multiTask.IsFreshMultiTask = false; // Assign all the multi task values to the below variable

                    $scope.MultiTaskList = multiTaskAnswers;
                    return multiTaskAnswers;
                } else {
                    // Handling for action plan preview, as this method id called in preview mode and for a scenario where
                    // no multi task is answered, it was creating an instance in preview mode. Therefore added a bollean value to handle
                    if (isPreviewAP) {
                        return;
                    } // Checking for a scenario where no multi task is previously added, and in the fresh multi task user click cancel.
                    // To avoid re-creating multi task view this check is added

                    if (!$scope.multiTask.IsFreshMultiTaskCancel) {
                        var multiTaskData = personApwMultiTaskManager.createPersonMultiTaskData(
                            personApwId,
                            wizardStep
                        );
                        $scope.multiTask.IsFreshMultiTask = true;
                        $scope.multiTask.IsFreshMultiTaskCancel = false;
                        $scope.MultiTaskEntity = multiTaskData;
                        return multiTaskData;
                    }
                }
            };

            $scope.loadApwTemplate = function (columnText) {
                //TODO: Handle BooleanDropDown whcih contains only two values true and false.
                columnText =
                    columnText.indexOf("ComboBox") >= 0 ? "DropDown" : columnText;
                columnText =
                    columnText.indexOf("DropDown") >= 0 ? "DropDown" : columnText;

                switch (columnText) {
                    case "RadEditor":
                        //Long text....
                        break;

                    case "DropDown":
                        //All types of dropdown to be handled..
                        return "templates/actionplan_templates/answer_templates/actionPlanDropDownDefault.html";

                    case "DatePicker":
                        //Calender control to be added.
                        //return 'templates/answer_templates/radio.html';
                        return "templates/actionplan_templates/answer_templates/actionPlanDatePicker.html";

                    case "IsComputed":
                        //Mostly, should be a readOnly field. ? TODO check with AFE..
                        //return 'templates/answer_templates/checkBox.html';
                        break;

                    case "CheckBox":
                        //Should be a single checkbox with text
                        return "templates/actionplan_templates/answer_templates/actionPlanCheckBox.html";

                    case "NumericTextBox":
                        //numeric text box..
                        return "templates/actionplan_templates/answer_templates/actionPlanNumeric.html";

                    case 'LongText':
                        //Long text
                        return 'templates/actionplan_templates/answer_templates/actionPlanLongText.html';

                    default:
                        //By default is a short textbox .
                        return "templates/actionplan_templates/answer_templates/actionPlanShortText.html";
                }
            };

            $scope.loadApwMultiTaskTemplate = function (wizardValue) {
                var columnText = wizardValue.ColumnType;
                columnText =
                    columnText.indexOf("ComboBox") >= 0 ? "DropDown" : columnText;
                columnText =
                    columnText.indexOf("DropDown") >= 0 ? "DropDown" : columnText;

                switch (columnText) {
                    case "MultipleSolution":
                        //Long text....
                        return "templates/actionplan_templates/multiTask_templates/multiSolution.html";

                    case "DropDown":
                        //All types of dropdown to be handled..
                        return "templates/actionplan_templates/multiTask_templates/multiTaskDropDown.html";

                    case "DatePicker":
                        if (wizardValue.Text === "MultiTaskDeadline") {
                            return "templates/actionplan_templates/multiTask_templates/multiTaskDatePicker.html";
                        } else {
                            return "templates/actionplan_templates/multiTask_templates/multiTaskDatePickerApproved.html";
                        }

                    //return "templates/actionplan_templates/multiTask_templates/multiTaskDatePicker.html";

                    case "TextBox":
                        if (wizardValue.Text === "MultiTaskSolutionFilesAndLinks") {
                            return "templates/actionplan_templates/multiTask_templates/multiTaskAttachment.html";
                        }

                        return "templates/actionplan_templates/multiTask_templates/multiTaskShortText.html";

                    case "Attachment":
                        return "templates/actionplan_templates/multiTask_templates/multiTaskAttachment.html";

                    default:
                        //By default is a short textbox .
                        return "templates/actionplan_templates/multiTask_templates/multiTaskShortText.html";
                }
            };

            $scope.loadMultiTaskTemplate = function () {
                return "templates/actionplan_templates/mutiSolutionTemplate.html";
            };

            $scope.openMultiTask = function (personApwId, wizardStep) {
                var multiTaskEntity = personApwMultiTaskManager.createPersonMultiTaskData(
                    personApwId,
                    wizardStep
                );
                $scope.MultiTaskEntity = multiTaskEntity;
                $scope.multiTask.IsFreshMultiTask = true; //$scope.isMultiTaskAnswering = true;

                $scope.multiTask.IsFreshMultiTaskCancel = false;
                var wizardSteps = $scope.wizard.WizardSteps;
                var currentStep = $scope.currentStepIndex;
                var step = wizardSteps[currentStep];
                step.IsMultiTaskStepValid = false;
            }; // Before saving multi task check if person action plan entity is a template
            // if template first save Person Action plan entity and get a new PersonActionPlanId

            function checkIfPersonApWIsTemplateForMT(multiTaskEntity) {
                var pApw = $scope.personActionPlanWizard;

                if (pApw.IsTemplate) {
                    $scope.personActionPlanWizard = personApwManager.savePersonApw(
                        pApw,
                        false
                    );
                    personApwMultiTaskManager.saveMultiTaskEntityFromPApwTemplate(
                        $scope.personActionPlanWizard,
                        multiTaskEntity
                    );
                    return true;
                } else {
                    return false;
                }
            }

            $scope.saveMultiTask = function (multiTaskEntity) {
                var isMultiValid = $scope.validateMultiTask(multiTaskEntity);

                if (isMultiValid) {
                    multiTaskEntity.IsEmptyMultiTask = false;
                    setIsSavedToDbTrue(multiTaskEntity);
                    var isPersonApwTemplate = checkIfPersonApWIsTemplateForMT(
                        multiTaskEntity
                    );

                    if (!isPersonApwTemplate) {
                        personApwMultiTaskManager.saveMultiTaskEntity(multiTaskEntity);
                    }

                    $scope.multiTask.IsFreshMultiTask = false; //$scope.isMultiTaskAnswering = false;

                    var wizardSteps = $scope.wizard.WizardSteps;
                    var currentStep = $scope.currentStepIndex;
                    var step = wizardSteps[currentStep];
                    step.IsMultiTaskStepValid = true;
                    $scope.MultiTaskEntity = null;
                } else {
                    ionicToast.showDefault($rootScope.getResourceText("LIT_REQUIRED"));
                }
            };

            $scope.cancelMultiTask = function (multiTaskEntity) {
                var validAnsweredMT = personApwMultiTaskManager.getValidAnsweredMultiTaskData(
                    $scope.personActionPlanWizard.Id
                );

                if (validAnsweredMT) {
                    $scope.multiTask.IsFreshMultiTask = false;

                    for (var i = 0; i < multiTaskEntity.Attachments.length; i++) {
                        var mtAttach = multiTaskEntity.Attachments[i];

                        if (mtAttach.MarkedForDelete) {
                            mtAttach.MarkedForDelete = false;
                        }
                    }

                    if (multiTaskEntity.IsEmptyMultiTask) {
                        personApwMultiTaskManager.deleteMultiTaskById(multiTaskEntity);
                    } else {
                        // Refreshing the model value on cancel press.
                        // For a scenario when user edits created multi task, does change but does not save instead clicks cancel
                        personApwMultiTaskManager.refreshModelValueByMTId(multiTaskEntity);
                    }

                    $scope.multiTask.IsFreshMultiTaskCancel = true;
                    $scope.MultiTaskEntity = null;
                    personActionPlanMultiTaskAttachmentManager.deleteUnusedAttachment(
                        multiTaskEntity
                    );
                    multiTaskAttachIdList = [];
                } else {
                    var isMultiTaskMandatory = $scope.validateMultiTask(multiTaskEntity);

                    if (!isMultiTaskMandatory) {
                        ionicToast.showDefault(
                            $rootScope.getResourceText("MSG_MULTITASK_REQUIRED")
                        );
                    } else {
                        ionicToast.showDefault(
                            $rootScope.getResourceText("MSG_MULTITASK_MANDATORY_ANSWER")
                        );
                    } //personApwMultiTaskManager.refreshModelValueByMTId(multiTaskEntity);
                }
            };

            $scope.editMultiTask = function (multiTaskEntity) {
                var multiTaskForEdit = personApwMultiTaskManager.getMultiTaskData(
                    multiTaskEntity.Id
                );
                $scope.MultiTaskEntity = multiTaskForEdit;
                $scope.multiTask.IsFreshMultiTask = true;
            };

            $scope.deleteMultiTask = function (multiTaskEntity) {
                var confirmPromise = PopupUtil.confirm(
                    $rootScope.getResourceText("LIT_DELETE"),
                    $rootScope.getResourceText("MSG_CONFIRM_DELETE_FIELD")
                );
                confirmPromise.then(function (success) {
                    if (success) {
                        personApwMultiTaskManager.deleteMultiTaskById(multiTaskEntity);
                        var multiTaskAnswers = personApwMultiTaskManager.getAllMultiTaskData(
                            $scope.personActionPlanWizard.Id
                        );
                        $scope.MultiTaskList = multiTaskAnswers; // referesh
                    }
                });
            }; // Added only for Plan of Action preview of answered wizard

            $scope.loadApwPreviewTemplate = function (columnText) {
                return ActionPlanMethodFactory.loadApwPreviewTemplate(columnText);
            }; // Added only for Plan of Action preview for multi task

            $scope.loadMultiTaskPreviewTemplate = function (wizCloumn) {
                return ActionPlanMethodFactory.loadMultiTaskPreviewTemplate(wizCloumn);
            };

            $scope.loadMultiTaskPreview = function () {
                return "templates/preview_templates/actionPlan/multiTaskPV.html";
            };

            var moduleEntity = userApplicationsManager.getUserApplicationByText(
                $scope.userDetail.UserId,
                "ActionPlan"
            );
            $scope.translatedModuleText = moduleEntity.TranslatedText; //This method returns the selected list item value from the drop down list implementation

            $scope.getDropDownText = function (dropDownText, columnType, answerId) {
                return ActionPlanMethodFactory.getDropDownText(
                    dropDownText,
                    columnType,
                    answerId
                );
            };

            function reverse(s) {
                return s.split("").reverse().join("");
            } // currentDate variable can be used to set a date in the calender. (Commented as it is not used)
            //$scope.currentDate = new Date(2014, 11, 25);
            // The below two lines of code can be used to set minimum and maximum selection dates.
            // Below two variables are referenced in the view.
            //$scope.minDate = new Date(2015, 6, 1);
            //$scope.maxDate = new Date(2016, 6, 31);
            // Disabling future dates based on the boolean value

            $scope.checkIsMaxDateDefaultToday = function (
                columnEntity,
                personColumnEntity
            ) {
                var maxDate = null;
                var currentDate = new Date();

                if (columnEntity.IsDateMaximumToday) {
                    maxDate = new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth(),
                        currentDate.getDate()
                    );
                }

                if (columnEntity.IsDateDefaultToday) {
                    personColumnEntity.AnswerDate = currentDate;
                }

                return maxDate;
            }; // Disabling future dates based on the boolean value

            $scope.checkIsMaxDateDefaultTodayMultiTask = function (
                columnEntity,
                multiTaskEntity,
                isDeadLine
            ) {
                var maxDate = null;
                var currentDate = new Date();

                if (columnEntity.IsDateMaximumToday) {
                    maxDate = new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth(),
                        currentDate.getDate()
                    );
                }

                if (columnEntity.IsDateDefaultToday) {
                    if (isDeadLine) {
                        multiTaskEntity.DeadlineDate = currentDate;
                    } else {
                        multiTaskEntity.ApprovedDate = currentDate;
                    }
                }

                return maxDate;
            };

            $scope.currentPersonApwColumn = null;

            $scope.getApwAnswerEntity = function (currPerApwCol) {
                $scope.currentPersonApwColumn = currPerApwCol;
            };

            function getFormattedDate(date) {
                var day = date.getDate(); // yields day

                var month = date.getMonth() + 1; // yields month

                var year = date.getFullYear(); // yields year

                var hour = date.getHours(); // yields hours

                var minute = date.getMinutes(); // yields minutes

                var second = date.getSeconds(); // yields seconds

                if (day < 9) {
                    day = "0" + day;
                }

                if (month < 9) {
                    month = "0" + month;
                } // After this construct a string with the above results as below

                var completeDateTime = day + "/" + month + "/" + year;
                return completeDateTime;
            }

            $scope.setApwDate = function (dateValue) {
                // On select of Date/ Cancel of Date picker remove the lock on orientation.
                // screen.unlockOrientation(); //if (!angular.isUndefined(dateValue)) {
                screen.orientation.unlock();

                //    var answerColId = dateValue.element.ele.answercolid;
                //    var personStepColAnswer = $scope.getPersonApwColumnAnswerById(answerColId);
                //    personStepColAnswer.AnswerDate = dateValue.date;
                //    var tt = personStepColAnswer.AnswerDate.toString();
                //}
            };

            function onLocationSucess(geoPromise, position) {
                var xVal = position.coords.longitude;
                var yVal = position.coords.latitude;
                geoPromise[0].resolve({
                    x: xVal,
                    y: yVal,
                });
            }

            function onLocationFailure(geoPromise, location) {
                geoPromise[0].resolve({
                    x: null,
                    y: null,
                });
            }

            $scope.submitActionPlan = function () {
                $scope.isDisabled = true;

                var that = this;
                $timeout(function () {
                    var wizardSteps = $scope.wizard.WizardSteps;
                    var currentStep = $scope.currentStepIndex;
                    var step = wizardSteps[currentStep]; // Checking if the step is a multi task step

                    if (step.IsMultiTaskColumnsPresent) {
                        // Validatating if title field has a value, when multi task is in the first step
                        var isTitleValid = $scope.validateTitleMultiTaskStep();

                        if (isTitleValid) {
                            // checking if multi task has atleast on entry already done, when any of the columns has required field for multi task
                            var isValidMT = getValidMultiTaskAnswer();

                            if (isValidMT) {
                                // Check is user is currently answering multi task
                                if ($scope.MultiTaskEntity) {
                                    // If answering then validate multi task on submit button click
                                    var isMultiTaskValid = that.validateMultiTask(
                                        $scope.MultiTaskEntity
                                    );

                                    if (isMultiTaskValid === false) {
                                        ionicToast.showDefault(
                                            $rootScope.getResourceText("LIT_REQUIRED")
                                        );
                                        $scope.isDisabled = false;
                                    } else {
                                        $scope.MultiTaskEntity.IsEmptyMultiTask = false;
                                        setIsSavedToDbTrue($scope.MultiTaskEntity); // Below method called to save multi task gets the new PersonApwId if the person action plan entity is a template
                                        // If its template it saves the person entity to get ne PersonApwId and save multi task.

                                        var isPersonApwTemplate = checkIfPersonApWIsTemplateForMT(
                                            $scope.MultiTaskEntity
                                        );

                                        if (!isPersonApwTemplate) {
                                            // Saving normaly if it is not a template
                                            personApwMultiTaskManager.saveMultiTaskEntity(
                                                $scope.MultiTaskEntity
                                            );
                                        }

                                        var timerProm = $timeout(function () {
                                            $scope.multiTask.IsFreshMultiTask = false; //$scope.isMultiTaskAnswering = false;

                                            step.IsMultiTaskStepValid = true;
                                            $scope.MultiTaskEntity = null;
                                            $timeout.cancel(timerProm);
                                        }, 100);
                                        completeValidationOnSubmit();
                                    }
                                } else {
                                    completeValidationOnSubmit();
                                }
                            }
                        } else {
                            ionicToast.showDefault(
                                $rootScope.getResourceText("LIT_REQUIRED")
                            );
                            $scope.isDisabled = false;
                        }
                    } else {
                        var isValid = that.validateCurrentStep();

                        if (isValid === true) {
                            completeValidationOnSubmit();
                        }
                    } //var hideProm = LoaderService.hide();
                    //hideProm.then(function () {

                    if (isValid === false) {
                        ionicToast.showDefault($rootScope.getResourceText("LIT_REQUIRED"));
                        $scope.isDisabled = false;
                    } //});
                }, 500); // Reducing the time out to 0 from 50 (For local operations)
            };

            $scope.loadColumnGuideTemplate = function () {
                return "templates/actionplan_templates/answer_templates/columnGuide.html";
            };

            $scope.getColumnGuideEntity = function (guideId, wizStepId, columnId) {
                return ActionPlanMethodFactory.getColumnGuideEntity(guideId, wizStepId, columnId, $scope.personActionPlanWizard)
            };

            function processColumnGuide() {
                var pApw = $scope.personActionPlanWizard;
                var columnValues = pApw.ColumnValues;
                var seperator = '—';
                var guideSeperator = '–';

                for (var i = 0; i < columnValues.length; i++) {
                    var columnValue = columnValues[i];
                    var guideLength = columnValue.ColumnGuides.length;

                    if (guideLength !== 0) {
                        var guides = columnValue.ColumnGuides;
                        var actual = "";

                        for (var j = 0; j < guides.length; j++) {
                            var guide = guides[j];

                            if (guide.AnswerText != null) {
                                actual += guide.AnswerText + guideSeperator + guide.GuideId + seperator;
                                columnValue.AnswerText = actual;
                            }
                        }
                    }
                }

                return pApw;
            }

            function getValidMultiTaskAnswer() {
                var validAnsweredMT = personApwMultiTaskManager.getValidAnsweredMultiTaskData(
                    $scope.personActionPlanWizard.Id
                );

                if (validAnsweredMT) {
                    return true;
                } else {
                    if ($scope.MultiTaskEntity) {
                        var isMultiTaskMandatory = $scope.validateMultiTask(
                            $scope.MultiTaskEntity
                        );

                        if (!isMultiTaskMandatory) {
                            ionicToast.showDefault(
                                $rootScope.getResourceText("MSG_MULTITASK_REQUIRED")
                            );
                            $scope.isDisabled = false;
                            return isMultiTaskMandatory;
                        }

                        $scope.isDisabled = false;
                        return isMultiTaskMandatory;
                    }

                    ionicToast.showDefault(
                        $rootScope.getResourceText("MSG_MULTITASK_REQUIRED")
                    );
                    $scope.isDisabled = false;
                }
            }

            function isGeoLocationEnabled(isGeoLocatioEditEnabled) {
                var geoLocationPromise = $q.defer();

                if ($scope.isEnableLocation && !isGeoLocatioEditEnabled) {
                    // If Geo location setting is enabled then below lines are executed
                    var geoTimeOut = $scope.userDetail.Customer.GeoLocationTimeout;
                    var geoEnableHighAccuracy =
                        $scope.userDetail.Customer.EnableHighAccuracyForGeoLocation;
                    var options = {
                        timeout: geoTimeOut,
                        enableHighAccuracy: geoEnableHighAccuracy,
                    };
                    var sucessGeo = onLocationSucess.bind(this, [geoLocationPromise]);
                    var failureGeo = onLocationFailure.bind(this, [geoLocationPromise]);
                    navigator.geolocation.getCurrentPosition(
                        sucessGeo,
                        failureGeo,
                        options
                    );
                } else {
                    geoLocationPromise.resolve({
                        x: null,
                        y: null,
                    });
                }
                return geoLocationPromise;
            };
        function completeValidationOnSubmit() { 
          var isGeoLocatioEditEnabled = $scope.wizard.EnableEditGeoLocation;
          var geoLocationPromise = isGeoLocationEnabled(isGeoLocatioEditEnabled);
          geoLocationPromise.promise.then(function (resolvedLocation) {
          //LoaderService.show();  //Hiding the loader for local operations
          // Hiding the keyboard if it is open while navigating to next view
          cordova.plugins.Keyboard.close();
          var pApw = processColumnGuide();
          if(!isGeoLocatioEditEnabled){
            pApw.GeoX = resolvedLocation.x;
            pApw.GeoY = resolvedLocation.y;  
          }
          var module = userApplicationsManager.getUserApplicationByText(
            $scope.userDetail.UserId,
            "ActionPlan"
          );
          personApwManager.savePersonApw(pApw, true);
          var timerPromise = $timeout(function () {
            $state.go(
              "app.apwTabs.completed",
              {
                viewTitle: $scope.title,
                modColor: module.ColourCode,
                type: module.Text,
              },
              {
                reload: false,
                inherit: false,
                notify: true,
              }
            );
            $timeout.cancel(timerPromise);
            $scope.isDisabled = false;
          }, 500); // Removed the timeout of 100 to 0 (Taking time to navigate to completed section)

          $scope.$emit("performSync", {
            modName: "ActionPlan",
            animLoader: false
          });
        });
      }

      $scope.setValue = function (pApw) {
        // Checkbox (Boolean field), ng-model value is assigned to IsBooleanField variable.
        // Therefore on-change assigning IsBooleanField value to AnswerId
        pApw.AnswerId = pApw.IsBooleanField;
        pApw.AnswerText = pApw.AnswerId;
      };

      $scope.validateCurrentStep = function () {
        var currentStep = $scope.currentStepIndex;

        if (currentStep == 0) {
          var titleName = "title_" + $scope.wizard.Id;
          var isValid = $scope.formActionPlan[titleName].$valid;

          if (isValid == true) {
            return this.validateStepDesc();
          }

          return isValid;
        } else {
          return this.validateStepDesc();
        }
      };

      $scope.validateStepDesc = function () {
        var wizardSteps = $scope.wizard.WizardSteps;
        var currentStep = $scope.currentStepIndex;
        var step = wizardSteps[currentStep];

        if (step.IsRequired) {
          var isValid = '';
          if (step.ColumnGuides.length > 0) {
            isValid = this.validateColumnGuides(step);
          }
          else {
            var longTextDescName = "longText_" + step.Id;
            var isValid = $scope.formActionPlan[longTextDescName].$valid;
          }

          if (isValid == true) {
            return this.validateColumns();
          }

          return isValid;
        } else {
          return this.validateColumns();
        }
      };

      $scope.validateColumnGuides = function (step) {
        var columnGuides = step.ColumnGuides;
        for (var i = 0; i < columnGuides.length; i++) {
          var guide = columnGuides[i];
          var longTextDescName = 'longText_' + step.Id + '_' + guide.Id;
          var isValid = $scope.formActionPlan[longTextDescName].$valid;

          if (isValid == true) {
            continue;
          }

          return isValid;
        }
        return true;
       }

      $scope.validateColumns = function () {
        var wizardSteps = $scope.wizard.WizardSteps;
        var currentStep = $scope.currentStepIndex;
        var step = wizardSteps[currentStep];

        for (var i = 0; i < step.Columns.length; i++) {
          var wizColoumn = step.Columns[i];
          var coloumnType = wizColoumn.ColumnType;

          if (wizColoumn.IsRequired) {
            coloumnType =
              coloumnType.indexOf("ComboBox") >= 0 ? "DropDown" : coloumnType;
            coloumnType =
              coloumnType.indexOf("DropDown") >= 0 ? "DropDown" : coloumnType;

            switch (coloumnType) {
              case "RadEditor":
                //Long text.... To be implemented
                break;

              case "DropDown":
                //TODO : Handle validation for collection repeat changes.
                //All types of dropdown to be validated ..
                var dropDownName =
                  "dropDownApw_" + step.Id + "_" + wizColoumn.Id;
                var isValid = $scope.formActionPlan[dropDownName].$valid;

                if (isValid == true) {
                  continue;
                }

                return isValid;

              case "DatePicker":
                // validate date picker value
                var datePickerName =
                  "datePickerApw_" + step.Id + "_" + wizColoumn.Id;
                var isValid = $scope.formActionPlan[datePickerName].$valid;

                if (isValid == true) {
                  continue;
                }

                return isValid;

              case "IsComputed": // TODO: yet to be implemented

              case "CheckBox":
                // Validat a single checkbox
                var checkBoxName = "apwCb_" + step.Id + "_" + wizColoumn.Id;
                var isValid = $scope.formActionPlan[checkBoxName].$valid;

                if (isValid == true) {
                  continue;
                }

                return isValid;

              case "NumericTextBox":
                //validate numeric field for numeric values.
                var numericFieldName =
                  "numText_" + step.Id + "_" + wizColoumn.Id;
                var isValid = $scope.formActionPlan[numericFieldName].$valid;

                if (isValid == true) {
                  continue;
                }

                return isValid;

              default:
                //default coloumn type is short text, validate for value
                var shortTextName =
                  "shortText_" + step.Id + "_" + wizColoumn.Id;
                var isValid = $scope.formActionPlan[shortTextName].$valid;

                if (isValid == true) {
                  continue;
                }

                return isValid;
            }
          }
        }

        return true;
      }; // This method validates if multi task is in the first step, if so the validate the title field

      $scope.validateTitleMultiTaskStep = function () {
        var currentStep = $scope.currentStepIndex;

        if (currentStep === 0) {
          var titleName = "title_" + $scope.wizard.Id;
          var isValid = $scope.formActionPlan[titleName].$valid;

          if (isValid === false) {
            ionicToast.showDefault($rootScope.getResourceText("LIT_REQUIRED"));
            return isValid;
          }

          return isValid;
        }

        return true;
      };

      $scope.validateMultiTask = function (multiTaskEntity) {
        var wizardSteps = $scope.wizard.WizardSteps;
        var currentStep = $scope.currentStepIndex;
        var step = wizardSteps[currentStep];

        if (step.IsMultiTaskColumnsPresent) {
          for (var i = 0; i < step.Columns.length; i++) {
            var wizColoumn = step.Columns[i];
            var coloumnType = wizColoumn.ColumnType;

            if (wizColoumn.IsRequired) {
              coloumnType =
                coloumnType.indexOf("ComboBox") >= 0 ? "DropDown" : coloumnType;
              coloumnType =
                coloumnType.indexOf("DropDown") >= 0 ? "DropDown" : coloumnType;

              switch (coloumnType) {
                case "MultipleSolution":
                  //Long text....
                  var solutionName =
                    "longTextMT_" +
                    multiTaskEntity.WizardStepId +
                    "_" +
                    multiTaskEntity.UniqueId;
                  var isValid = $scope.formActionPlan[solutionName].$valid;

                  if (isValid == true) {
                    continue;
                  }

                  return isValid;

                case "DropDown":
                  //All types of dropdown to be handled..
                  var dropDownMtName =
                    "dropDownApw_" +
                    multiTaskEntity.WizardStepId +
                    "_" +
                    multiTaskEntity.UniqueId;
                  var isDDValid = $scope.formActionPlan[dropDownMtName].$valid;

                  if (isDDValid == true) {
                    continue;
                  }

                  return isDDValid;

                case "DatePicker":
                  if (coloumnType.Text === "MultiTaskDeadline") {
                    var deadLineName =
                      "datePickerApw_" +
                      multiTaskEntity.WizardStepId +
                      "_" +
                      multiTaskEntity.UniqueId;
                    var isDLValid = $scope.formActionPlan[deadLineName].$valid;

                    if (isDLValid == true) {
                      continue;
                    }

                    return isDLValid;
                  } else {
                    var approvedDateName =
                      "datePickerApproved_" +
                      multiTaskEntity.WizardStepId +
                      "_" +
                      multiTaskEntity.UniqueId;
                    var isADValid =
                      $scope.formActionPlan[approvedDateName].$valid;

                    if (isADValid == true) {
                      continue;
                    }

                    return isADValid;
                  }

                case "TextBox":
                  if (coloumnType.Text === "MultiTaskSolutionFilesAndLinks") {
                    return true;
                  }

                  var textName =
                    "dropDownApw_" +
                    multiTaskEntity.WizardStepId +
                    "_" +
                    multiTaskEntity.UniqueId;
                  var isTValid = $scope.formActionPlan[textName].$valid;

                  if (isTValid == true) {
                    continue;
                  }

                  return isTValid;

                case "Attachment":
                default:
                  return true;
              }
            }
          }
        }

        return true;
      }; 

      $scope.checkRequired = function (entity, personApStepColumnAnswer) {
        if (entity.IsRequired == true) {
          var wizId = entity.Id;
          var guideAnswerCounter = 0;
            //this method is used to get the answered values based on that the required field is set
            var guides = ActionPlanMethodFactory.getGuideColumnsEntity(
                wizId,
                $scope.personActionPlanWizard
          );
          if (guides.length != 0) {
            for (var i = 0; i < guides.length; i++) {
              if (guides[i].AnswerText == null || guides[i].AnswerText == "") {
                guideAnswerCounter = guideAnswerCounter + 1;
              }
            }
            if (guideAnswerCounter == guides.length) {
              return true;
            } else {
              return false;
            }
          } else {
              if (personApStepColumnAnswer != undefined) {
                  if (personApStepColumnAnswer.AnswerDate != null) {
                      return false;
                  } else {
                      return true;
                  }
              }
              else
                  return true;
          }
        } else {
            return false;
        }
      }; // This method returns setting value for the dropdown and also checks if device is online.

      $scope.isOnlineDropDownEnable = function (dropDownText, columnType) {
        var enableOnline = false;
        var tableName = ActionPlanMethodFactory.getManagerText(
          dropDownText,
          columnType
        );

        switch (tableName) {
          case "Person":
            enableOnline = $scope.userDetail.EnableOnlinePersons;
            break;

          case "Department":
            enableOnline = $scope.userDetail.EnableOnlineDepartments;
            break;

          case "Asset":
            enableOnline = $scope.userDetail.EnableOnlineAssets;
            break;

          case "Chemical":
            enableOnline = $scope.userDetail.EnableOnlineChemicals;
            break;

          default:
            enableOnline = false;
        }

        return enableOnline;
      };
      //non multi solution
      $scope.showDate = function (wizColumn, personApwStepAnswerColumn) {
        $scope.isDatePickDisabled = true;
        $scope.personApwStepAnswerColumn = personApwStepAnswerColumn;
        var maxDate = this.checkIsMaxDateDefaultToday(
            wizColumn,
            personApwStepAnswerColumn
        );
        var date = personApwStepAnswerColumn.AnswerDate;
        var theme = datePickerTheme();
        var dateValue = GeneralUtil.pickDate(maxDate, date, theme);
        dateValue.then(function (date) {
            $scope.isDatePickDisabled = false;
            $scope.personApwStepAnswerColumn.AnswerDate = date;
        }, function (e) {
            $scope.isDatePickDisabled = false;
        });
      };

      //multisolution Approved date
      $scope.showApprovedDate = function (wizColumn, MultiTaskEntity) {
        $scope.isDatePickDisabled = true;
        var maxDate = this.checkIsMaxDateDefaultTodayMultiTask(
            wizColumn,
            MultiTaskEntity
        );
        var date = MultiTaskEntity.ApprovedDate;
        var theme = datePickerTheme();
        var dateValue = GeneralUtil.pickDate(maxDate, date, theme);
        dateValue.then(function (date) {
            $scope.isDatePickDisabled = false;
            $scope.MultiTaskEntity.ApprovedDate = date;
        }, function (e) {
            $scope.isDatePickDisabled = false;
        });
      };

      //multisolution Deadline date
      $scope.showDeadlineDate = function (wizColumn, MultiTaskEntity) {
        $scope.isDatePickDisabled = true;
        var maxDate = this.checkIsMaxDateDefaultTodayMultiTask(
            wizColumn,
            MultiTaskEntity
        );
        var date = MultiTaskEntity.DeadlineDate;
        var theme = datePickerTheme();
        var dateValue = GeneralUtil.pickDate(maxDate, date, theme);
        dateValue.then(function (date) {
            $scope.isDatePickDisabled = false;
            $scope.MultiTaskEntity.DeadlineDate = date;
        }, function (e) {
            $scope.isDatePickDisabled = false;
        });
      };

      function datePickerTheme() {
        $scope.customer = customersManager.getCustomers();
        if ($scope.customer.IsDarkModeEnable) {
          return 2;
        } else {
          return 3;
        }
      }
    },
  ]);
})();


/***/ }),

/***/ "./scripts/controller/actionPlanListController.js":
/*!********************************************************!*\
  !*** ./scripts/controller/actionPlanListController.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    var app = angular.module('actionPlan');
    app.factory("$exceptionHandler", ['$injector', function ($injector) {
        return function (exception, cause) {
            var localStorageUtility = $injector.get('LocalStorageUtility')
            localStorageUtility.addExceptionToLogTable(exception, cause);
            var rScope = $injector.get('$rootScope');
            rScope.$broadcast('exceptionRefresh', exception, cause);
        };
    }]);
    app.controller('actionPlanListController', ['$scope', '$rootScope', '$state', 'AppMessages', 'actionPlanWizardManager', 'LoaderService', 'personApwManager', '$timeout', '$q', 'LocalStorageHelper', '$stateParams', 'ionicToast', 'userDetailsManager', 'PopupUtil', 'DeviceUtil', 'ActionPlanMethodFactory', 'FileUtil', 'CommonMethodsFactory', 'userApplicationsManager', function ($scope, $rootScope, $state, AppMessages, actionPlanWizardManager, LoaderService, personApwManager, $timeout, $q, LocalStorageHelper, $stateParams, ionicToast, userDetailsManager, PopupUtil, DeviceUtil, ActionPlanMethodFactory, FileUtil, CommonMethodsFactory, userApplicationsManager) {
        //LoaderService.show();  //Hiding the loader for local operations
        ionic.DomUtil.ready(function () {//LoaderService.hide();
        });
        var apwList = [];
        var inProgressCount = 0,
            completedCount = 0,
            activeCount = 0;
        var moduleName = $stateParams.type;
        $scope.title = $stateParams.viewTitle;
        $scope.modColor = $stateParams.modColor;
        $scope.selectedAPW = [];
        var userProfile = userDetailsManager.getUserLastLoggedTimeStamp();
        $scope.customerSetting = userProfile.Customer;
        $scope.userDetailsData = userProfile;
        $scope.applicationDetails = userApplicationsManager.getUserApplicationByText(userProfile.UserId, moduleName);
        $scope.IsDownloadErrorShown = false;

        function getApwList() {
            var tabbedState = $state.current.name;
            var tempList = [];

            switch (tabbedState) {
                case "app.apwTabs.inProgress":
                    tempList = personApwManager.getInProgressPersonAPWList();
                    inProgressCount = tempList.length;
                    break;

                case "app.apwTabs.completed":
                    tempList = personApwManager.getCompletedPersonAPWList();
                    completedCount = tempList.length;
                    break;

                case "app.apwTabs.active":
                    if (!$scope.applicationDetails.IsApplicationModuleDisable) {
                        tempList = actionPlanWizardManager.getActiveActionPlanProblemList();
                        activeCount = tempList.length;
                    }
                    break;
                default:
                    break;
            }

            return tempList;
        }

        refreshActionPlanWithErrorCheck();

        function refreshActionPlanWithErrorCheck() {
            $scope.IsDownloadErrorShown = false;
            refreshActionPlan();
        }
        function refreshActionPlan() {
            var validDownloadActionPlan = userDetailsManager.getIfdownloadValidForType(moduleName);

            if (validDownloadActionPlan === false) {
                if (!$scope.IsDownloadErrorShown) {
                    $scope.IsDownloadErrorShown = true;
                    AppMessages.Error($rootScope.getResourceText('LIT_MESSAGE'), $rootScope.getResourceText('MSG_ERROR_DOWNLOADING_MODULE') + " " + $scope.title + " " + $rootScope.getResourceText('MSG_PLEASE_TRY_AGAIN'));
                }
            } else {
                apwList = getApwList();
                $scope.apwList = apwList;
            }
        }

        $rootScope.$on("refresh", function () {
            refreshActionPlan();
        });

        $scope.getPersonApwStepAnswer = function (wizardStepId, columnId, personAp) {
            var columnValues = personAp.ColumnValues;
            return ActionPlanMethodFactory.getPersonApwStepAnswer(wizardStepId, columnId, columnValues);
        };

        $scope.loadApwPreviewTemplate = function (columnText) {
            return ActionPlanMethodFactory.loadApwPreviewTemplate(columnText);
        }; //This method returns the selected list item value from the drop down list implementation


        $scope.getDropDownText = function (dropDownText, columnType, answerId, isPdf) {
            var columnText = ActionPlanMethodFactory.getDropDownText(dropDownText, columnType, answerId);

            if (isPdf) {
                if (columnText != null) {
                    columnText = columnText.replace(new RegExp(String.fromCharCode(10143), 'g'), '--');
                } else {
                    return null;
                }
            }

            return columnText;
        }; // Added only for Plan of Action PDF of answered wizard

        $scope.getColumnGuideEntity = function (guideId, wizStepId, columnId, papw) {
            return ActionPlanMethodFactory.getColumnGuideEntity(guideId, wizStepId, columnId, papw)
        };

        $scope.loadApwPdfTemplate = function (columnText) {
            //TODO: Handle BooleanDropDown which contains only two values true and false.
            columnText = columnText.indexOf('ComboBox') >= 0 ? 'DropDown' : columnText;
            columnText = columnText.indexOf('DropDown') >= 0 ? 'DropDown' : columnText;

            switch (columnText) {
                case 'RadEditor':
                    //Long text....
                    break;

                case 'DropDown':
                    return "templates/pdf_templates/actionPlan/ap_columnAnswer_template/dropdownPdf.html";

                case 'DatePicker':
                    return "templates/pdf_templates/actionPlan/ap_columnAnswer_template/datePdf.html";

                case 'IsComputed': //Mostly, should be a readOnly field. ? TODO check with AFE..

                case 'CheckBox':
                    return 'templates/pdf_templates/actionPlan/ap_columnAnswer_template/checkBoxPdf.html';

                case 'NumericTextBox':
                    return 'templates/pdf_templates/actionPlan/ap_columnAnswer_template/defaultPdf.html';

                default:
                    return "templates/pdf_templates/actionPlan/ap_columnAnswer_template/defaultPdf.html";
            }
        }; // Added only for Plan of Action PDF of answered wizard


        $scope.loadMultiTaskPdfTemplate = function (wizardValue) {
            var columnText = wizardValue.ColumnType;
            columnText = columnText.indexOf('ComboBox') >= 0 ? 'DropDown' : columnText;
            columnText = columnText.indexOf('DropDown') >= 0 ? 'DropDown' : columnText;

            switch (columnText) {
                case 'MultipleSolution':
                    //Long text....
                    return "templates/pdf_templates/actionPlan/multiTaskPdf/solutionPdf.html";

                case 'DropDown':
                    //All types of dropdown to be handled..
                    return "templates/pdf_templates/actionPlan/multiTaskPdf/dropdownPdf.html";

                case 'DatePicker':
                    if (wizardValue.Text === 'MultiTaskDeadline') {
                        return "templates/pdf_templates/actionPlan/multiTaskPdf/deadLinePdf.html";
                    } else {
                        return "templates/pdf_templates/actionPlan/multiTaskPdf/dateApprovedPdf.html";
                    }

                //return "templates/actionplan_templates/multiTask_templates/multiTaskDatePicker.html";

                case 'TextBox':
                    return "templates/pdf_templates/actionPlan/multiTaskPdf/shortTextPdf.html";

                default:
                    //By default is a short textbox .
                    return "templates/pdf_templates/actionPlan/multiTaskPdf/shortTextPdf.html";
            }
        };

        $scope.updateActionPlan = function () {
            var isUpdatedPromise = CommonMethodsFactory.getData('ActionPlan', $scope.title);
            isUpdatedPromise.then(function (success) {
                LocalStorageHelper.updateUserDetails($scope.userDetailsData.UserName);
                refreshActionPlanWithErrorCheck(); // Stop the ion-refresher from spinning

                $scope.$broadcast('scroll.refreshComplete');
            }, function (fail) {
                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        function uploadPersonApw(pApwId, isMultipleUpload) {
            // LoaderService.show(); // This implementation will change when 
            // Repeatable questionnaire answering gets implemented.
            // Since there will be multiple entries. Get by PersonQuestionnaire (Id column).

            var def = $q.defer();
            var pApw = personApwManager.getPersonActionPlanWizard(pApwId);
            var uploadInProgress = pApw.UploadInProgress;

            if (uploadInProgress == false) {
                var promisesAp = [];
                personApwManager.processDateColumnForActionPlan(pApw);
                personApwManager.processDateColumnForAPMultiTask(pApw);
                var processesPApwPromise = FileUtil.processFile(pApw, true);
                promisesAp.push(processesPApwPromise);
                var mtAttachmentsProm = FileUtil.processFileForMultiTask(pApw.MultiTaskSolutions, true);
                promisesAp.push(mtAttachmentsProm);
                $q.all(promisesAp).then(function (data) {
                    var completePersonApw = data[0];
                    completePersonApw.MultiTaskSolutions = data[1]; //Skip Wizard data..

                    completePersonApw.WizardId = completePersonApw.Wizard.Id;
                    pApw.UploadInProgress = true;
                    pApw.UploadFail = false;
                    var uploadPromise = LocalStorageHelper.uploadPersonActionPlanWizard(completePersonApw);
                    uploadPromise.then(function (serverSucessResponse) {
                        //TODO add a post upload method in the personApwManager like the questionnaire part . 
                        //Currently only removes from the Cache and LocalStorage other 
                        //dependencies not removed like the Category,LineOfBusiness table data.
                        personApwManager.removeInstance(pApw);
                        PopupUtil.hide();
                        var anim = '<lottie-player src="raw/loadingSuccess.json" background="transparent" speed="1" id="loadAnim" autoplay></lottie-player>';
                        var contentTitle = $rootScope.getResourceText('LIT_MOBILE_SUCCESS');
                        var contentLabel = pApw.Wizard.Name + " " + $rootScope.getResourceText('MSG_MOBILE_UPLOADED_REGISTRATION');
                        var contentTimer = 5000;
                        PopupUtil.animTimerPopUp(anim, contentTitle, contentLabel, contentTimer);
                        // ionicToast.showDefault(pApw.Wizard.Name + " " + $rootScope.getResourceText('MSG_IS_SUCCESSFULLY_UPLOADED'));
                        def.resolve(pApwId);
                        refreshActionPlanWithErrorCheck();
                    }, function (error) {
                        pApw.UploadInProgress = false;
                        pApw.UploadFail = true;
                        def.reject(error);

                        if ($scope.selectedAPW.length > 0) {
                            $scope.onSelectForUpload(pApw, $scope);
                        }

                        refreshActionPlanWithErrorCheck();
                    });
                }, function (inCompletePersonApw) {
                    // Check is performed only to validate if it is a file not found error.
                    if (inCompletePersonApw.message === "NOT_FOUND_ERR") {
                        // The boolean flag tells if it is from multiple upload or single upload
                        if (!isMultipleUpload) {
                            // Showing a confirm popup. On 'Ok' move to inprogress else retain in the current screen
                            var confirmPromise = PopupUtil.confirm($rootScope.getResourceText('LIT_MESSAGE'), $rootScope.getResourceText('MSG_ATTACHMENTS_MISSING'));
                            confirmPromise.then(function (success) {
                                if (success) {
                                    //Saving the questionnaire as to move to Inprogress section
                                    personApwManager.savePersonApw(inCompletePersonApw.personEntity, false);
                                    refreshActionPlanWithErrorCheck();
                                }
                            });
                        } else {
                            //Saving the questionnaire as to move to Inprogress section
                            personApwManager.savePersonApw(inCompletePersonApw.personEntity, false);
                        }
                    }

                    inCompletePersonApw.personEntity.UploadInProgress = false;
                    inCompletePersonApw.personEntity.UploadFail = true;
                    def.reject(inCompletePersonApw);

                    if ($scope.selectedAPW.length > 0) {
                        $scope.onSelectForUpload(inCompletePersonApw.personEntity, $scope);
                    }

                    refreshActionPlanWithErrorCheck();
                });
            }
            // PopupUtil.hide();
            return def;
        }

        $scope.uploadApwAnswering = function (pApwId) {
            loadingAnimProcess();
            var checkDeviceOnline = deviceOnlineCheck();

            if (checkDeviceOnline === true) {
                //var tokenValidityPromise = LocalStorageHelper.validateUserToken();
                //  tokenValidityPromise.then(function (tokenValid) {
                uploadPersonApw(pApwId, false);
                //  }, function (tokenInValid) {
                //       PopupUtil.hide();
                //});
            } else {
                PopupUtil.hide();
            }
        };

        $scope.navigateApwAnswering = function (id) {
            //LoaderService.show();  //Hiding the loader for local operations

            /*A timeout is added so that when the LoaderService.show() 
            method is called the UI is not blocked */
            var timerPromise = $timeout(function () {
                $state.go('app.planOfAction', {
                    id: id,
                    state: $state.current.name,
                    viewTitle: $scope.title,
                    modColor: $scope.modColor
                }, {
                    reload: false,
                    inherit: false,
                    notify: true
                });
                $timeout.cancel(timerPromise);
            }, 100);
        };

        $scope.showApwPreview = function (pApw) {
            //LoaderService.show();  //Hiding the loader for local operations
            var processPromise = FileUtil.processFile(pApw, false);
            processPromise.then(function (successPApw) {
                $state.go('app.planOfActionPV', {
                    id: successPApw.Id,
                    viewTitle: $scope.title,
                    modColor: $scope.modColor
                });
            }, function (errorResponse) {
                // Showing a confirm popup. On 'Ok' move to inprogress else retain in the current screen
                var confirmPromise = PopupUtil.confirm($rootScope.getResourceText('LIT_MESSAGE'), $rootScope.getResourceText('MSG_ATTACHMENTS_MISSING'));
                confirmPromise.then(function (success) {
                    if (success) {
                        personApwManager.savePersonApw(errorResponse.personEntity, false);
                        refreshActionPlanWithErrorCheck();
                    }
                });
            });
        };

        $scope.selectedCount = $scope.selectedAPW.length; // Passing the instance to access isSelected variable initilized in ng-init(View)

        $scope.onMultiSelectForUpload = function (answer, instance) {
            if ($scope.selectedAPW.length === 0 && answer.UploadInProgress === false) {
                instance.isSelected = true;
                $scope.selectedAPW.push(answer.Id);
                $scope.selectedCount = $scope.selectedAPW.length;
            }
        }; // Passing the instance to access isSelected variable initilized in ng-init(View)


        $scope.onSelectForUpload = function (answer, instance) {
            if (answer.UploadInProgress === false) {
                if ($scope.selectedAPW.length !== 0) {
                    var index = $scope.selectedAPW.indexOf(answer.Id);

                    if (index > -1) {
                        $scope.selectedAPW.splice(index, 1);
                        instance.isSelected = false;
                    } else {
                        $scope.selectedAPW.push(answer.Id);
                        instance.isSelected = true;
                    }

                    $scope.selectedCount = $scope.selectedAPW.length;
                } else {
                    $scope.showApwPreview(answer);
                }
            }
        };

        $scope.editCompletedAnswer = function (answer) {
            var confirmPromise = PopupUtil.confirm($rootScope.getResourceText('LIT_MESSAGE'), $rootScope.getResourceText('MSG_EDIT'));
            confirmPromise.then(function (success) {
                if (success) {
                    var processPromise = FileUtil.processFile(answer, false);
                    processPromise.then(function (successPApw) {
                        var id = answer.Id;
                        answer.LastAnsweredStepIndex = 0;
                        personApwManager.savePersonApw(answer, false);
                        $scope.navigateApwAnswering(id);
                    }, function (errorResponse) {
                        var confirmPromise = PopupUtil.confirm($rootScope.getResourceText('LIT_MESSAGE'), $rootScope.getResourceText('MSG_ATTACHMENTS_MISSING'));
                        confirmPromise.then(function (success) {
                            if (success) {
                                personApwManager.savePersonApw(errorResponse.personEntity, false);
                                $scope.navigateApwAnswering(errorResponse.personEntity.Id);
                            }
                        });
                    });
                }
            });
        };

        $scope.uploadMutipleQuestionnaire = function () {
            loadingAnimProcess();
            var checkDeviceOnline = deviceOnlineCheck();

            if (checkDeviceOnline === true) {
                var tokenValidityPromise = LocalStorageHelper.validateUserToken();
                tokenValidityPromise.then(function (tokenValid) {
                    var hidePromise = LoaderService.hide();
                    hidePromise.then(function () {
                        for (var i = 0; i < $scope.selectedAPW.length; i++) {
                            var uploadPromise = uploadPersonApw($scope.selectedAPW[i], true);
                            uploadPromise.promise.then(function (success) {
                                var index = $scope.selectedAPW.indexOf(success);

                                if (index > -1) {
                                    $scope.selectedAPW.splice(index, 1);
                                } else {
                                    $scope.selectedAPW = [];
                                }

                                $scope.selectedCount = $scope.selectedAPW.length;
                            }, function (inCompletePersonApw) {
                                PopupUtil.hide();
                                var hidePromise = LoaderService.hide();
                                hidePromise.then(function () {
                                    $scope.selectedAPW = [];
                                }); // Check is performed only to validate if it is a file not found error.

                                if (inCompletePersonApw.message === "NOT_FOUND_ERR") {
                                    // Showing toast message to notify user as to move to inprogress only for multiple upload
                                    ionicToast.showDefault(inCompletePersonApw.personEntity.Wizard.Name + " " + $rootScope.getResourceText("MSG_MOVED_INPROGRESS"));
                                    refreshActionPlanWithErrorCheck();
                                }
                            });
                        }
                    });
                });
            } else {
                PopupUtil.hide();
            }
        };

        $scope.deletePersonApwByPApwId = function (answer) {
            var anim = '<lottie-player src="raw/delete.json" background="transparent" speed="1" id="deleteAnim" autoplay></lottie-player>';
            var confirmPromise = PopupUtil.animConfirm(anim, $rootScope.getResourceText('LIT_DELETE'), $rootScope.getResourceText('MSG_CONFIRM_DELETE_FIELD'));
            // var confirmPromise = PopupUtil.confirm($rootScope.getResourceText('LIT_DELETE'), $rootScope.getResourceText('MSG_CONFIRM_DELETE_FIELD'));
            confirmPromise.then(function (success) {
                if (success) {
                    var pApw = personApwManager.getPersonActionPlanWizard(answer.Id);

                    if ($scope.selectedAPW.length > 0) {
                        $scope.onSelectForUpload(answer, $scope);
                    }

                    personApwManager.removeInstance(pApw);
                    refreshActionPlanWithErrorCheck();
                }
            });
        }; //$scope.deleteActionPlanWizard = function (apWizard) {
        //    var confirmPromise = PopupUtil.confirm($rootScope.getResourceText('LIT_DELETE'), $rootScope.getResourceText('MSG_CONFIRM_DELETE_FIELD'));
        //    confirmPromise.then(function (success) {
        //        if (success) {
        //            LoaderService.show();
        //            var apwData = actionPlanWizardManager.getActionPlanWizard(apWizard.Id);
        //            apWizard = apwData;//.APWData;
        //            var deletePromise = actionPlanWizardManager.deleteActionPlanWizard(apWizard);
        //            deletePromise.then(function (success) {
        //                $timeout(function () {
        //                    refreshActionPlan();
        //                    LoaderService.hide();
        //                }, 100);
        //            }, function (fail) {
        //                $timeout(function () {
        //                    var hidePromise = LoaderService.hide();
        //                    hidePromise.then(function () {
        //                        PopupUtil.alert($rootScope.getResourceText('LIT_MESSAGE'), $rootScope.getResourceText('MSG_NOT_DELETABLE'));
        //                    });
        //                }, 0);
        //            });
        //        }
        //    });
        //}


        function loadingAnimProcess() {
            var anim = '<lottie-player src="raw/loadingNew.json" background="transparent" speed="1" id="loadAnim" loop autoplay></lottie-player>';
            var contentTitle = $rootScope.getResourceText('LIT_MOBILE_UPLOAD');
            var contentLabel = $rootScope.getResourceText('MSG_MOBILE_UPOADING_REGISTRATION');
            PopupUtil.animPopUp(anim, contentTitle, contentLabel);
        }


        function deviceOnlineCheck() {
            var isOnline = DeviceUtil.isDeviceOnline();

            if (isOnline === false) {
                var anim = '<lottie-player src="raw/loadingFailed.json" background="transparent" speed="2" id="loadFailAnim" autoplay></lottie-player>';
                var contentTitle = $rootScope.getResourceText('LIT_MOBILE_ERROR');
                var contentLabel = $rootScope.getResourceText('MSG_MOBILE_INTERNET_ERROR');
                PopupUtil.animAlert(anim, contentTitle, contentLabel);
                // AppMessages.Error($rootScope.getResourceText('LIT_ALERT'), $rootScope.getResourceText('MSG_CHECK_INTERNET_CONNECTION'));
            }

            return isOnline;
        }
    }]);
})();


/***/ }),

/***/ "./scripts/controller/answerOptionColor.js":
/*!*************************************************!*\
  !*** ./scripts/controller/answerOptionColor.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var app = angular.module("questionnaire");
  app.controller("AnswerOptionColorController", [
    "$scope",
    "$rootScope",
    "answerOptionManager",
    "customersManager",
    function ($scope, $rootScope, answerOptionManager, customersManager) {
      $rootScope.$on("RenderStyleQuestionnaire", function (event, data) {
        var qId = data.qId;
        var answerOptions =
          answerOptionManager.getAnswerOptionsByQuestionnaire(qId);
        var cssClasses = "";

        for (var i = 0; i < answerOptions.length; i++) {
          var ao = answerOptions[i];
          var backgroundColor = ao.ColourCode;
          cssClasses +=
            ".answerOption_" +
            ao.Id +
            " input:checked:before, .answerOption_" +
            ao.Id +
            " input:checked + .checkbox-icon:before { background : " +
            backgroundColor +
            " !important; border-color : " +
            backgroundColor +
            " !important;  }  .answerOptionRadio_" +
            ao.Id +
            " .radio-icon { color : " +
            backgroundColor +
            " !important;}";
        }

        $scope.allStyles = cssClasses;
      });
      $rootScope.$on("OnlyWelcomeBgColor", function (event, data) {
        // Adding this color only for the welcome screen as the image color is white
        // This can be removed if the image color is changed to app background color
        if (data.isWelcome) {
          var appBgColorVal = "#ffffff"; // Adding background only if AppBgColor has a value

          if (appBgColorVal !== null || appBgColorVal !== "") {
            var bgColor =
              ".pane { background-color: " + appBgColorVal + "!important;}";
            $scope.welcomeBgColor = bgColor;
          }
        } else {
          // If the passed value is false, remove the property from the index.html file
          $scope.welcomeBgColor = null;
        }
      });
      $rootScope.$on("RenderButtonBgHeaderColor", function () {
        var customer = customersManager.getCustomers();
        StatusBar.show();
        if (customer !== null) {
          var buttonBgColor = customer.ButtonBgColour;
          var headerColor = customer.ColourCode;
          var appBgColorVal = customer.BgColourCode;
          $scope.buttonColor = "";
          $scope.headerColor = ""; // Adding a check for AppBgColor existance, if not defined adding a color code

          if (appBgColorVal == null) {
            appBgColorVal = "#ededed";
          } // Adding background only if AppBgColor has a value

          if (appBgColorVal !== null || appBgColorVal !== "") {
            var bgColor =
              ".pane { background-color: " +
              appBgColorVal +
              "!important;}" +
              ".appBgColor {  background-color: " +
              appBgColorVal +
              "!important;}" +
              ".menu { background-color: " +
              appBgColorVal +
              "!important; }";
            $scope.appBgColor = bgColor;
          }

          if (buttonBgColor !== null || buttonBgColor !== "") {
            var buttonBgClass =
              ".buttonColor{ background-color :" +
              buttonBgColor +
              "!important;" +
              "color: #FFFFFF !important;}" +
              ".popup-buttons .button { background-color: " +
              buttonBgColor +
              "!important;" +
              "color: #FFFFFF !important; border-color: " +
              buttonBgColor +
              "!important}" +
              ".buttonColor.activated { background-color : " +
              buttonBgColor +
              "!important;" +
              ".button-outline.button-outline.activated { background-color : " +
              buttonBgColor +
              "!important;";
            $scope.buttonColor = buttonBgClass;
          } // DatePicker, CheckBox and Radio Button default background color is based on the header color sent from Web API.

          if (headerColor !== null || headerColor !== "") {
            var headerColorClass =
              ".headerFooterColor{ background-color :" +
              headerColor +
              "!important; }" +
              ".datepicker-selected { background-color:#99AFC8; }" +
              ".datepicker-balanced { background-color:" +
              headerColor +
              "; }" +
              ".datepicker-current { color:" +
              headerColor +
              "; }" +
              ".datepicker-balanced-light { background-color:" +
              headerColor +
              "!important; }" +
              ".datepicker-color-balanced-light { color:" +
              headerColor +
              "!important; }" +
              ".fontButtonIcon.icon-left:before { color:" +
              headerColor +
              "!important; }" +
              ".checkbox input:checked+.checkbox-icon:before, .checkbox input:checked:before" +
              " { background:" +
              headerColor +
              "; border-color:" +
              headerColor +
              ";}" +
              ".checkbox input:disabled:checked+.checkbox-icon:before, .checkbox input:disabled:checked:before" +
              " { background:" +
              headerColor +
              "; border-color:" +
              headerColor +
              ";}" +
              ".radio-icon { color : " +
              headerColor +
              " !important;}" +
              ".autoSaveToggle input:checked+.track .handle{ background : " +
              headerColor +
              "!important; }";
            $scope.headerColor = headerColorClass;
            StatusBar.backgroundColorByHexString(headerColor);
            document.documentElement.style.setProperty(
              "--statusbar-bg-color",
              headerColor
            );
          }
        }
      });

      $rootScope.$on("darkThemeBgColor", function (event, data) {
        if (data.isDark) {
          var customer = customersManager.getCustomers();
          var headerColor = customer.ColourCode;
          var appDarkBgColor = "#121212";
          var darkHeaderColor = "#000000";
          var tileListColor = "#1F1F1F";
          var darkButtonBgColor = "#323232";
          var textColor = "#f2f2f2";
          // Adding background only if AppBgColor has a value
          if (appDarkBgColor !== null || appDarkBgColor !== "") {
            var bgColor =
              ".pane { background-color: " +
              appDarkBgColor +
              "!important;}" +
              ".appBgColor {  background-color: " +
              appDarkBgColor +
              "!important;}" +
              ".menu { background-color: " +
              appDarkBgColor +
              "!important; }" +
              ".newsToggle { border-color :" +
              appDarkBgColor +
              "!important; }";
            $scope.darkThemeColor = bgColor;
          }

          // Adding HeaderColor only if darkHeaderColor has a value
          if (darkHeaderColor !== null || darkHeaderColor !== "") {
            var darkHeaderColorClass =
              ".headerFooterColor, .headerColor { background-color :" +
              darkHeaderColor +
              "!important; }" +
              ".datepicker-modal { box-shadow: 1px 1px 3px " +
              darkHeaderColor +
              "; }" +
              ".datepicker-selected { background-color: #B8B8B8 !important; }" +
              ".datepicker-date-col:hover { background-color: #ffffff !important; }" +
              ".datepicker-balanced { background-color:" +
              darkHeaderColor +
              "; }" +
              ".datepicker-current { color:" +
              darkHeaderColor +
              "!important; }" +
              ".datepicker-balanced-light { background-color:" +
              darkHeaderColor +
              "!important; }" +
              ".datepicker-color-balanced-light { color:" +
              darkHeaderColor +
              "!important; }" +
              ".checkbox input:checked+.checkbox-icon:before, .checkbox input:checked:before { background:" +
              darkHeaderColor +
              "; border-color:" +
              darkHeaderColor +
              ";}" +
              ".checkbox input:disabled:checked+.checkbox-icon:before, .checkbox input:disabled:checked:before { background:" +
              darkHeaderColor +
              "; border-color:" +
              darkHeaderColor +
              ";}" +
              ".autoSaveToggle input:checked+.track .handle { background : " +
              headerColor +
              "!important; }" +
              "a.item { border-color:" +
              darkHeaderColor +
              "!important; }" +
              ".cardColor { background-color :" +
              darkHeaderColor +
              "!important; }" +
              ".formNotRequired { border: 2px solid " +
              darkHeaderColor +
              " !important; }" +
              ".formRequired { border-left: 2px solid " +
              darkHeaderColor +
              " !important; border-top: 2px solid " +
              darkHeaderColor +
              " !important; border-bottom: 2px solid " +
              darkHeaderColor +
              " !important; border-right: 2px solid " +
              darkHeaderColor +
              " !important;} " +
              ".resetButton { background-color :" +
              darkHeaderColor +
              "!important; }" +
              ".item { border-color :" +
              darkHeaderColor +
              ";}" +
              "pop-up, body-popup, damage-popup { border: 2px solid " +
              darkHeaderColor +
              "!important; }" +
              ".button-outline.button-outline, .buttonColor.activated { border-color :" +
              darkHeaderColor +
              "; }" +
              ".popUpTitleBackground { background-color :" +
              darkHeaderColor +
              "!important; }" +
              ".tabs { filter: brightness(0.8); }" +
              ".darkText { color: " +
              darkHeaderColor +
              "!important; }" +
              ".animPopUp .popup, .bodyPopUp .popup { border : 2px solid " +
              darkHeaderColor +
              "!important; }" +
              ".popup-head { border-bottom: 1px solid " +
              darkHeaderColor +
              ";}" +
              ".darkMode.activated, .alignSmileyWithAO.activated, list-popup, vqlist-popup { border-color : " +
              darkHeaderColor +
              "!important; }";

            $scope.darkHeaderColor = darkHeaderColorClass;
            StatusBar.backgroundColorByHexString(darkHeaderColor);
            StatusBar.styleLightContent();
            document.documentElement.style.setProperty(
              "--statusbar-bg-color",
              darkHeaderColor
            );
          }

          // Adding ItemListColor only if itemListColor has a value
          if (tileListColor !== null || tileListColor !== "") {
            var itemColorClass =
              "a.item, .listPopUpDataSource { background-color : " +
              tileListColor +
              "!important; }" +
              ".item-right-edit { background : " +
              tileListColor +
              "!important; }" +
              ".item-reorder .button.icon { background-color : " +
              tileListColor +
              "!important; }" +
              ".singleGrid { background-color : " +
              tileListColor +
              "!important;}" +
              ".newSingleGrid { background-color : " +
              tileListColor +
              "!important;}" +
              ".bodySelector { background-color: " +
              tileListColor +
              "!important;}" +
              ".darkMode { background-color : " +
              tileListColor +
              "!important; filter: brightness(1) !important; }" +
              ".item-icon-left{ background-color : " +
              tileListColor +
              ";}" +
              ".newsToggle { background-color : " +
              tileListColor +
              "!important;}" +
              ".popup-head{ background-color : " +
              tileListColor +
              "!important;}" +
              ".popUpContentTitle, .popUpContentLabel, .animPopUp .popup-buttons { background-color: " +
              tileListColor +
              "!important;}" +
              ".item-divider, .bar-subheader { background-color : " +
              tileListColor +
              "; filter: brightness(0.8); }" +
              "item-radio activated { background-color : " +
              tileListColor +
              "!important; }" +
              ".optionsList { background-color : " +
              tileListColor +
              "!important; }" +
              ".newsCardList { background-color : " +
              tileListColor +
              "!important; }" +
              ".favCardList .item-content { background-color : " +
              tileListColor +
              "!important; }" +
              "ion-popover-view { background-color: " +
              tileListColor +
              "!important; }";
            $scope.tileListColor = itemColorClass;
          }

          if (darkButtonBgColor !== null || darkButtonBgColor !== "") {
            var buttonBgClass =
              ".startScreenButton, textarea, .item-input, input[type=text], input[type=number], input[type=tel], .breakWord { background-color: " +
              darkButtonBgColor +
              "!important; }" +
              ".popup-body, .popup-buttons, .displayInGrid, body-popup.button, damage-popup.button, pop-up.button, .item-button-right, .item-radio .item-content  { background-color: " +
              darkButtonBgColor +
              "!important; }" +
              ".item-body, .item-checkbox, .item-text-wrap{ background-color : " +
              darkButtonBgColor +
              "!important; }" +
              ".list.card, .item-input-inset { background-color : " +
              darkButtonBgColor +
              "; }" +
              "ion-item.row.item, .item-icon-right { background-color : " +
              darkButtonBgColor +
              "; }" +
              ".newsItem { background-color : " +
              darkButtonBgColor +
              "; }" +
              ".button button-positive, .button.button-positive.activated { background-color: #797979!important; }" +
              ".dark {background-color : " +
              darkButtonBgColor +
              "; }" +
              ".jSignature { background-color : " +
              darkButtonBgColor +
              " !important; }" +
              ".dark {background-color : " +
              darkButtonBgColor +
              "; }" +
              ".pickerDark { background-color : " +
              darkButtonBgColor +
              "!important; }" +
              "lottie-player { background-color: inherit !important; }" +
              ".apwLabel { background-color : " +
              darkButtonBgColor +
              " !important; }" +
              ".list-inset { background-color : " +
              darkButtonBgColor +
              " !important; }" +
              ".alignSmileyWithAO { background-color : " +
              darkButtonBgColor +
              " !important; }" +
              ".alignSmileyWithAO.activated { background-color : " +
              darkButtonBgColor +
              " !important; }" +
              ".darkCard, list-popup, vqlist-popup { background-color : " +
              darkButtonBgColor +
              " !important; }";
            $scope.darkButtonBgColor = buttonBgClass;
          }

          // Adding textWhiteColor only if textColor has a value
          if (textColor !== null || textColor !== "") {
            var textColorClass =
              ".showFullText {color: " +
              textColor +
              "; }" +
              ".removeTextDecoration, h2.darkText {color: " +
              textColor +
              "!important; }" +
              ".item { color : " +
              textColor +
              "!important;}" +
              ".item h2 { color : " +
              textColor +
              ";}" +
              ".radio-icon { color : " +
              textColor +
              "!important; }" +
              ".item-input textarea, input[type=text] { color : " +
              textColor +
              "!important; } " +
              "input, .input-label { color: " +
              textColor +
              "!important; }" +
              ".popup-title, .popUpTitleBackground, .popup-body { color: " +
              textColor +
              "!important; }" +
              ".cardColor h2,  h3.displayInlineBlock, .title h1, .displayInGrid { color: " +
              textColor +
              "!important; }" +
              ".ionic_toast, .loading { background-color: #696969 !important; color: " +
              textColor +
              ";} " +
              ".fontButtonIcon.icon-left:before { color : " +
              textColor +
              "!important;}" +
              ".ion-ios-refresh-outline, .iconColor { color : #696969; }" +
              ".attachIconColor { color: " +
              textColor +
              " !important; }" +
              ".ion-help-circled { color: " +
              textColor +
              "; }" +
              ".multiTaskItemButton { color: " +
              textColor +
              "; }" +
              ".subSelected { color: " +
              textColor +
              " !important; }" +
              ".darkImg { filter: invert(1); }" +
              ".scrollIndicator { color: " +
              textColor +
              "!important; }" +
              ".subHeaderColor h2 { color: " +
              textColor +
              "!important; }" +
              ".imageAdd, .imageText, textarea { color: " +
              textColor +
              " !important; }" +
              ".jSignature { color : " +
              textColor +
              " !important; }" +
              ".signPaddingRgt { color : " +
              textColor +
              " !important; }" +
              ".buttonValue { color: " +
              textColor +
              " !important; }";
            $scope.textColor = textColorClass;
          }
        } else {
          customer = customersManager.getCustomers();
          headerColor = customer.ColourCode;
          // If the passed value is false, remove the property from the index.html file
          $scope.darkThemeColor = null;
          $scope.darkHeaderColor = null;
          $scope.tileListColor = null;
          $scope.darkButtonBgColor = null;
          $scope.textColor = null;
          StatusBar.backgroundColorByHexString(headerColor);
          document.documentElement.style.setProperty(
            "--statusbar-bg-color",
            headerColor
          );
        }
      });
    },
  ]);
})();


/***/ }),

/***/ "./scripts/controller/appOptionsController.js":
/*!****************************************************!*\
  !*** ./scripts/controller/appOptionsController.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    var app = angular.module("questionnaire");
    app.controller("appOptionsController", [
        "$scope",
        "$state",
        "$rootScope",
        "$ionicHistory",
        "PopOverUtil",
        "EmailUtil",
        "AuthenticationService",
        "userDetailsManager",
        "ResetPoolUtil",
        "customersManager",
        "$ionicPlatform",
        "ionicToast",
        "PopupUtil",
        "LoaderService",
        "CommonMethodsFactory",
        "LocalStorageHelper",
        "newsManager",
        "$timeout",
        "personQuestionnaireManager",
        "questionnaireManager",
        "userApplicationsManager",
        function (
            $scope,
            $state,
            $rootScope,
            $ionicHistory,
            PopOverUtil,
            EmailUtil,
            AuthenticationService,
            userDetailsManager,
            ResetPoolUtil,
            customersManager,
            $ionicPlatform,
            ionicToast,
            PopupUtil,
            LoaderService,
            CommonMethodsFactory,
            LocalStorageHelper,
            newsManager,
            $timeout,
            personQuestionnaireManager,
            questionnaireManager,
            userApplicationsManager
        ) {
            $scope.unReadCount = newsManager.getUnReadNewsCount();

            $rootScope.refreshOptions = function () {
                $rootScope.myProfileText = $rootScope.getResourceText("LIT_MY_PROFILE");
                $rootScope.helpText = $rootScope.getResourceText("LIT_HELP");
                $rootScope.emailAdd = $rootScope.getResourceText("LIT_EMAIL");
                $rootScope.logoutText = $rootScope.getResourceText("LIT_LOGOUT");
            };

            $ionicPlatform.ready(function () {
                $rootScope.refreshOptions();
                PopOverUtil.initPopOver("templates/appOptions.html", $rootScope);

                $rootScope.closePopOver = function () {
                    PopOverUtil.closePopover($rootScope);
                };

                function getUnReadCount() {
                    var unReadVal = newsManager.getUnReadNewsCount();
                    $scope.$emit("unReadValue", unReadVal);
                } // Open a physical file saved in the device

                $scope.userProfile = userDetailsManager.getUserLastLoggedTimeStamp();

                $rootScope.openMoreOptions = function (event) {
                    PopOverUtil.openPopOver($rootScope, event);
                };

                $rootScope.sendSupportEmail = function () {
                    var toAddress = $scope.userProfile.Customer.SupportMail;
                    var subject =
                        $scope.userProfile.Customer.CustomerName +
                        " " +
                        $scope.userProfile.Customer.Title +
                        " - " +
                        $rootScope.getResourceText("LIT_SAFETYNET_SUPPORT");
                    EmailUtil.sendEmail(
                        toAddress,
                        $scope.primaryEmail,
                        null,
                        null,
                        subject,
                        null,
                        true
                    );
                    PopOverUtil.closePopover($rootScope);
                };

                $rootScope.openProfile = function () {
                    PopOverUtil.closePopover($rootScope);
                    $state.go("app.myProfile");
                };

                $rootScope.openLink = function () {
                    var uri = "https://eg.dk/offentlig-digitalisering/eg-safetynet/";
                    var ref = CommonMethodsFactory.openInAppBrowser(uri, "_blank", "location=yes");
                };

                $rootScope.logOut = function () {
                    var customer = customersManager.getCustomers();
                    var title = $rootScope.getResourceText("LIT_MESSAGE");
                    var template = $rootScope.getResourceText("MSG_LOGOUT_CONFIRMTEXT"); // Displaying confirm box in case of multiple user found. On click of Ok previous user data is cleared

                    var confirmPromise = PopupUtil.confirm(title, template);
                    confirmPromise.then(function (success) {
                        if (success) {
                            var existingSubscribedTopicList = window.localStorage.getItem(
                                "subscribedTopicList"
                            );
                            if (!existingSubscribedTopicList) {
                                existingSubscribedTopicList = "";
                            }
                            var topicList = existingSubscribedTopicList.split("|");

                            var unSubscribeList = [];
                            var remainingSubscribedList = [];

                            for (var index = 0; index < topicList.length; index++) {
                                var apiTopic = topicList[index];
                                if (apiTopic && apiTopic.length > 0) {
                                    var topicSplitList = apiTopic.split("-");
                                    if (topicSplitList.length > 2) {
                                        unSubscribeList.push(apiTopic);
                                    } else {
                                        remainingSubscribedList.push(apiTopic);
                                    }
                                }
                            }

                            if (unSubscribeList.length > 0) {
                                window.pushutility(
                                    "unsubscribe",
                                    unSubscribeList,
                                    function (echoValue) {
                                        window.localStorage.setItem(
                                            "subscribedTopicList",
                                            remainingSubscribedList.join("|")
                                        );
                                    }
                                );
                            }

                            AuthenticationService.logout(customer.IsPasswordSaveEnabled);
                            LoaderService.show();
                            var resetProm = userDetailsManager.resetUserData();
                            resetProm.then(function (success) {
                                // window.localStorage.removeItem('AppDetails');
                                // window.localStorage.removeItem('token');
                                window.localStorage.removeItem("userLanguage");
                                $state.go("login");
                                LoaderService.hide();
                                ionicToast.show(
                                    $rootScope.getResourceText("MSG_LOGGED_OUT"),
                                    "bottom",
                                    false,
                                    2500
                                );
                            });
                            ResetPoolUtil.resetPool();
                        }
                    });
                    $ionicHistory.nextViewOptions({
                        disableBack: true,
                    });
                    PopOverUtil.closePopover($rootScope);
                };

                $scope.processPushNotification = function (routePayload) {
                    function parseQuery(queryString) {
                        var query = {};
                        var pairs = (
                            queryString[0] === "?" ? queryString.substr(1) : queryString
                        ).split("&");
                        for (var i = 0; i < pairs.length; i++) {
                            var pair = pairs[i].split("=");
                            query[decodeURIComponent(pair[0])] = decodeURIComponent(
                                pair[1] || ""
                            );
                        }
                        return query;
                    }
                    var payloadData = parseQuery(routePayload);
                    var moduleName = payloadData.moduleName;
                    var qId = payloadData.id;
                    var isInProgress = payloadData.ip === "1" ? true : false;

                    switch (moduleName) {
                        case "News":
                            try {
                                LoaderService.show();
                                var downloadNewsData = LocalStorageHelper.getNewsDataDetails();
                                downloadNewsData.then(
                                    function (success) {
                                        LoaderService.hide();
                                        var notifiedNewsList =
                                            window.localStorage.getItem("notifiedNewsList");
                                        if (!notifiedNewsList) {
                                            notifiedNewsList = "";
                                        }
                                        var notifiedNewsItems = notifiedNewsList.split("|");
                                        var notifiedNewsItem = notifiedNewsItems.includes(qId);

                                        if (!notifiedNewsItem) {
                                            notifiedNewsItems.push(qId);
                                            window.localStorage.setItem(
                                                "notifiedNewsList",
                                                notifiedNewsItems.join("|")
                                            );
                                        }

                                        if ($state.current.name === "app.news") {
                                            $rootScope.$broadcast("showNews", {
                                                newsId: qId,
                                            });
                                        } else {
                                            $state.go("app.news", {
                                                id: qId,
                                            });
                                        }

                                        $scope.$broadcast("scroll.refreshComplete");
                                    },
                                    function (fail) {
                                        // Stop the ion-refresher from spinning
                                        $scope.$broadcast("scroll.refreshComplete");
                                        LoaderService.hide();
                                    }
                                );
                            } catch (error) {
                                alert(error);
                            }
                            break;
                        default:
                            try {
                                LoaderService.show();
                                var isUpdatedPromise = CommonMethodsFactory.getData(
                                    moduleName,
                                    ""
                                );
                                isUpdatedPromise.then(
                                    function (success) {
                                        //refreshModule(moduleName); // Stop the ion-refresher from spinning
                                        $scope.$broadcast("scroll.refreshComplete");
                                        navigateModule(moduleName, qId, isInProgress);
                                    },
                                    function (fail) {
                                        // Stop the ion-refresher from spinning
                                        $scope.$broadcast("scroll.refreshComplete");
                                        LoaderService.hide();
                                    }
                                );
                            } catch (error) {
                                LoaderService.hide();
                            }
                            break;
                    }
                };

                function navigateModule(modTabName, id, isInProgress) {
                    var userApps = userApplicationsManager.getUserApplications(
                        $scope.userProfile.UserId
                    );
                    $timeout(function () {
                        /*A timeout is added so that when the LoaderService.show() 
                      method is called it is not blocked */
                        if (id !== "-1") {
                            var navigateTo = "";
                            var pov = "";
                            var q = questionnaireManager.getQuestionnaireFromPush(id);
                            var existingUnAnsweredPq = null;

                            if (q != null) id = q.Id;

                            if (q != null && q.IsRepeatable === false) {
                                var hasAnswers = personQuestionnaireManager.hasAnswers(id);
                                if (hasAnswers === true) {
                                    //First : Get whether a already answered not inprogress and notcompleted personquestionnaire exists.
                                    var existingUnAnsweredPq =
                                        personQuestionnaireManager.getPersonQuestionnaireByQuestionnaire(
                                            id
                                        );
                                }
                            }

                            if (existingUnAnsweredPq === null) {
                                //Second: We now get from the PersonQuestionnaireTemplate
                                //and save to the PerosnQuestionnaire
                                //with answeringInProgress = false and answeringCompleted = false.
                                var personQueTemplateAnswer =
                                    personQuestionnaireManager.getUnAnsweredPersonQuestionnaire(
                                        id
                                    );
                                if (personQueTemplateAnswer === null) {
                                    return;
                                }
                                var savedPq =
                                    personQuestionnaireManager.savePersonQuestionniare(
                                        personQueTemplateAnswer,
                                        null
                                    );
                                id = savedPq.Id;
                            } else {
                                existingUnAnsweredPq.IsTemplate = false;
                                id = existingUnAnsweredPq.Id;
                            }

                            navigateTo = "app.startScreen";
                            var timerPromise = $timeout(function () {
                                $state.go(
                                    navigateTo,
                                    {
                                        id: id,
                                        state: "app." + modTabName + ".active",
                                        viewTitle: "",
                                        pov: pov,
                                    },
                                    {
                                        reload: false,
                                        inherit: false,
                                        notify: true,
                                    }
                                );
                                $timeout.cancel(timerPromise);
                            }, 100);
                        } else {
                            var routeValue = "";
                            switch (modTabName) {
                                case "Askade":
                                    routeValue = "app.akwTabs";
                                    break;

                                case "ActionPlan":
                                    routeValue = "app.apwTabs";
                                    break;

                                case "Apv":
                                    routeValue = "app.qTabs";
                                    break;

                                case "RiskProfile":
                                    routeValue = "app.rTabs";
                                    break;

                                case "EmployeeSatisfaction":
                                    routeValue = "app.eTabs";
                                    break;

                                case "HumanResource":
                                    routeValue = "app.hTabs";
                                    break;

                                case "Administration":
                                    routeValue = "app.aTabs";
                                    break;

                                case "ManagementEvaluation":
                                    routeValue = "app.mTabs";
                                    break;

                                case "FrontPlanner":
                                    routeValue = "app.fpTabs";
                                    break;

                                case "Claim":
                                    routeValue = "app.claimTabs";
                                    break;
                                // Need to clarify
                                //case 'DocumentLibrary':
                                //    routeValue = "app.documentLibraryTabs";
                                //    break;
                            }

                            var routeBasedOnIsInProgress =
                                isInProgress == true ? ".inProgress" : ".completed";
                            navigateTo = routeValue + routeBasedOnIsInProgress;

                            var userApplication = null;

                            userApps.forEach(function (item) {
                                if (item.Text === modTabName) {
                                    userApplication = item;
                                    return; // Break out of the loop once the item is found
                                }
                            });

                            $state.go(
                                navigateTo,
                                {
                                    viewTitle: userApplication.TranslatedText,
                                    modColor: userApplication.ColourCode,
                                    type: userApplication.Text,
                                },
                                {
                                    reload: false,
                                    inherit: false,
                                    notify: true,
                                }
                            );
                        }
                    }, 50);
                }
            });
        },
    ]);
})();


/***/ }),

/***/ "./scripts/controller/askadeController.js":
/*!************************************************!*\
  !*** ./scripts/controller/askadeController.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

(function () {
    var app = angular.module('askade');

    app.filter('unsafe', ['$sce', function ($sce) {
        return function (input) {
            input = $('<div></div>').html(input).find('em').addClass('fontStyleItalic').end().html();
            return $sce.trustAsHtml(input);
        }
    }]);

    app.controller('askadeController', ['$state', '$stateParams', '$scope',
        'personAskadeFileTypeWizardTemplateManager', 'PopupUtil',
        '$injector', 'LoaderService', '$timeout',
        'personAskadeFileTypeWizardManager', '$rootScope',
        'ModalUtil', 'userDetailsManager', 'customersManager',
        'userApplicationsManager', 'ionicToast',
        'FileUtil',
        '$ionicScrollDelegate', 'AskadeMethodFactory',
        '$q', 'AppMessages', 'GeneralUtil', 'TextToSpeachUtil', 'SpeachToTextUtil', 'DateUtil', '$sce','CommonMethodsFactory',
        function ($state, $stateParams, $scope, personAskadeFileTypeWizardTemplateManager, PopupUtil,
            $injector, LoaderService, $timeout, personAskadeFileTypeWizardManager, $rootScope, ModalUtil,
            userDetailsManager, customersManager, userApplicationsManager, ionicToast, FileUtil, $ionicScrollDelegate,
            AskadeMethodFactory, $q, AppMessages, GeneralUtil, TextToSpeachUtil, SpeachToTextUtil, DateUtil, $sce, CommonMethodsFactory) {
            //window.addEventListener('native.keyboardhide', function () {
            //    //alert(screen.orientation);
            //    screen.unlockOrientation();
            //    window.blur();
            //});

            $scope.openInAppForInlineHtml = function (url) {
                var options =
                    "location=yes,clearcache=yes,clearsessioncache=yes,cleardata=yes";
                var win = CommonMethodsFactory.openInAppBrowser(url, "_blank", options);
            }

            var id = $stateParams.id;
            var state = $stateParams.state;
            $scope.title = $stateParams.viewTitle;
            $scope.modColor = $stateParams.modColor; // This boolean value disables the Submit/Back/Next while answering (Handling user interaction after first click)

            $scope.isDisabled = false; // Boolean value to show/hide the questionnaire template
            $scope.isDatePickDisabled = false;

            $scope.endOfQuestionnaire = false;

            $scope.to_trusted = function (html_code) {
                return $sce.trustAsHtml(html_code);
            }

            var personAkw = null; // Array to save the instances of the directive

            $scope.directiveScopeArray = []; // Scope variables declared for editable time picker

            $scope.data = {};
            $scope.userDetail = userDetailsManager.getUserLastLoggedTimeStamp();
            $scope.readAloud = $scope.userDetail.Customer.IsReadAloudTextEnable;
            $scope.androidVersion = SpeachToTextUtil.checkAndroidVersion();
            $scope.DisableUploadPhotoLibary = $scope.userDetail.Customer.DisableReadImageFromPhotoLibary;
            $scope.isEnableLocation = $scope.userDetail.Customer.EnableGeoLocation;
            $scope.canPickDoc = $scope.userDetail.Customer.AllowedExtensions != null || $scope.userDetail.Customer.AllowedExtensions != '';
            $scope.allowedExtensions = $scope.userDetail.Customer.AllowedExtensions != null ? $scope.userDetail.Customer.AllowedExtensions : null;

            if (state == 'app.akwTabs.active' || state == 'app.claimTabs.active') {
                personAkw = personAskadeFileTypeWizardTemplateManager.getPersonAskadeFileTypeWizardTemplate(id);
                personAkw.IsTemplate = true;
            } else {
                personAkw = personAskadeFileTypeWizardManager.getPersonAskadeFileTypeWizard(id);
            } // This below method refactors the entity with respect to askade wizard entity only
            // Based on person askade template/ person askade entity, askade wizard entity is generated.

            var askadeWizard = AskadeMethodFactory.refactorAKEntity(personAkw); // Saving the $index value of ng-repeat to a scope variable

            $scope.setCount = function (index) {
                $scope.count = index;
            };

            $scope.personAskadeWizard = personAkw; // Assing the refactored entity to the scope variable (For view purpose)

            $scope.$on("backPressed", function (event, data) {
                if (data.state === "app.askade") {
                    if ($scope.formAskade.$dirty === true) {
                        $scope.previousWizardView();
                    }
                }
            });

            $scope.akWizard = askadeWizard;
            $scope.moduleName = $scope.akWizard.ModuleName();
            $scope.akStepsLength = $scope.akWizard.Steps.length;

            //Initial dependency consider use case checkbox dependency where dependnet should be visible on uncheck state of checkbox.
            handleDependency(askadeWizard);

            function getPersonAskadeAnswerByColumnId(fileColumnId, columnValues) {
                for (var i = 0; i < columnValues.length; i++) {
                    var paskAnswer = columnValues[i];
                    if (paskAnswer.FileColumnId === fileColumnId) {
                        return paskAnswer;
                    }
                }
                return null;
            }

            function getAskadeStepColumn(askadeWizard, fileColumnId) {
                var askadewizardSteps = askadeWizard.Steps;
                for (var i = 0; i < askadewizardSteps.length; i++) {
                    var wizardStep = askadewizardSteps[i];
                    var wizardStepColumns = wizardStep.Columns;
                    for (var j = 0; j < wizardStepColumns.length; j++) {
                        var stepColumn = wizardStepColumns[j];
                        if (fileColumnId === stepColumn.FileColumnId) {
                            return stepColumn;
                        }
                    }
                }
                return null;
            }

            function handleDependency(askadeWizard) {
                var allAnswerColumns = $scope.personAskadeWizard.ColumnValues.reverse();
                var fileTypeId = $scope.personAskadeWizard.FileTypeId;
                var steps = askadeWizard.Steps;

                var stepCounter = 0;

                for (var i = 0; i < steps.length; i++) {
                    var step = steps[i];
                    var stepColumns = step.Columns;
                    for (var j = 0; j < stepColumns.length; j++) {
                        var askStepFileColumn = stepColumns[j];
                        var personColumnAnswer = getPersonAskadeAnswerByColumnId(askStepFileColumn.FileColumnId, allAnswerColumns);
                        var triggerFileColumnId = askStepFileColumn.DependantFileColumnId;
                        askStepFileColumn.IsDependencyMet = true;
                        if (triggerFileColumnId) {
                            var triggerAskStepFileColumn = getAskadeStepColumn(askadeWizard, triggerFileColumnId);
                            askStepFileColumn.IsDependencyMet = false;

                            if (triggerAskStepFileColumn && triggerAskStepFileColumn.ColumnGuides.length != 0 && triggerAskStepFileColumn.IsDependencyMet === true) {
                                var triggerAskadeAnswer = getPersonAskadeAnswerByColumnId(triggerAskStepFileColumn.FileColumnId, allAnswerColumns);
                                var guideAnswerList = [];
                                var triggerMatchValue = askStepFileColumn.DependantFileColumnValues;
                                var triggerAnswerList = [];
                                if (triggerMatchValue) {
                                    triggerMatchValue = triggerMatchValue.toLowerCase();
                                    triggerAnswerList = triggerMatchValue.split('||');
                                }
                                if (triggerAskadeAnswer) {
                                    for (var x = 0; x < triggerAskadeAnswer.ColumnGuides.length; x++) {
                                        var guide = triggerAskadeAnswer.ColumnGuides[x];
                                        if (guide.AnswerText)
                                            guideAnswerList.push(guide.AnswerText)
                                    }
                                }
                                if (guideAnswerList.length > 0) {
                                    setDependencyValue(guideAnswerList, triggerAnswerList, askStepFileColumn)
                                }
                            }

                            if (triggerAskStepFileColumn && triggerAskStepFileColumn.ColumnGuides.length == 0 && triggerAskStepFileColumn.IsDependencyMet === true) {
                                var isCheckBox = triggerAskStepFileColumn.ColumnType === "CheckBox";
                                var triggerAskadeAnswer = getPersonAskadeAnswerByColumnId(triggerAskStepFileColumn.FileColumnId, allAnswerColumns);
                                var triggerAnswer = triggerAskadeAnswer.AnswerText;

                                if (isCheckBox) {
                                    if (triggerAskadeAnswer.AnswerId === 1) {
                                        triggerAnswer = "true";
                                    }
                                    else {
                                        triggerAnswer = "false";
                                    }
                                }

                                triggerAnswer = triggerAnswer == null ? '' : triggerAnswer;
                                var triggerMatchValue = askStepFileColumn.DependantFileColumnValues;
                                var triggerAnswerList = [];
                                if (triggerMatchValue) {
                                    triggerMatchValue = triggerMatchValue.toLowerCase();
                                    triggerAnswerList = triggerMatchValue.split('||');
                                }
                                if (triggerAnswer) {
                                    triggerAnswer = triggerAnswer.toLowerCase();
                                }

                                if (triggerAskStepFileColumn.ColumnType === "VehiclePart") {
                                    triggerAnswer = getDamageText(triggerAskStepFileColumn.ColumnType, triggerAskStepFileColumn.DataTypeId, triggerAskadeAnswer.AnswerText);
                                    askStepFileColumn.IsDependencyMet = false;
                                    if (triggerAnswer) {
                                        var answerList = triggerAnswer.split(',');
                                        setDependencyValue(answerList, triggerAnswerList, askStepFileColumn);
                                    }
                                } else {
                                    var triggerListNew = triggerAnswer.split('➟');
                                    if (triggerListNew.length > 0)
                                        triggerAnswer = triggerListNew.join('-->')
                                    askStepFileColumn.IsDependencyMet = triggerAnswerList.indexOf(triggerAnswer) >= 0;
                                }
                            }

                            if (askStepFileColumn.IsDependencyMet === false) {
                                personColumnAnswer.AnswerId = personColumnAnswer.AnswerText = null;
                            }

                            if (!triggerAskStepFileColumn)
                                askStepFileColumn.IsDependencyMet = true;
                        }
                    }

                    if (step.isStepDependencyMet()) {
                        stepCounter = stepCounter + 1;
                        step.isVisible = true;
                    } else {
                        step.isVisible = false;
                    }
                }
                $scope.akStepsLength = stepCounter;

                if ($scope.directiveScopeArray.length !== 0) {
                    handleSignDirectiveOnDepen(steps);
                }
            }

            function setDependencyValue(answerList, triggerAnswerList, askStepFileColumn) {
                for (var i = 0; i < answerList.length; i++) {
                    var answerText = answerList[i].toLowerCase();
                    if (triggerAnswerList.indexOf(answerText) >= 0) {
                        askStepFileColumn.IsDependencyMet = true;
                        break;
                    }
                }
            }

            if ($scope.personAskadeWizard.LastAnsweredStepIndex == null) {
                $scope.currentStepIndex = 0;
            } else {
                $scope.currentStepIndex = $scope.personAskadeWizard.LastAnsweredStepIndex;
            } //The actual Length is considered here that is +1 for the first title screen.

            $scope.textDependencyTrigger = function () {
                handleDependency(askadeWizard);
            }

            $scope.checkChanged = function (personAkStepColumnAnswer) {
                handleDependency(askadeWizard);
            }

            $scope.previousWizardView = function () {
                cordova.plugins.Keyboard.close(); //LoaderService.show();  //Hiding the loader for local operations
                $scope.directiveScopeArray = [];

                $scope.isDisabled = true;
                $timeout(function () {
                    if ($scope.currentStepIndex > -1) {
                        $scope.currentStepIndex -= 1;
                        var pAk = processColumnGuide();
                        $scope.personAskadeWizard = personAskadeFileTypeWizardManager.saveAkWizard(pAk, false);
                    } //LoaderService.hide();


                    $scope.isDisabled = false;
                }, 500); // Reducing the time out to 0 from 50 (For local operations)
            };

            $scope.nextWizardView = function () {
                cordova.plugins.Keyboard.close(); //LoaderService.show();  //Hiding the loader for local operations
                // Iterating through the list of directive array and calling the callback method present in directive.js file

                for (var i = 0; i < $scope.directiveScopeArray.length; i++) {
                    var dirFun = $scope.directiveScopeArray[i];
                    $scope.directiveFn = dirFun.directiveFn;
                    $scope.directiveFn();
                } // clearing the array once signatures are saved


                $scope.directiveScopeArray = [];
                $scope.isDisabled = true;
                var thisIns = this;
                $timeout(function () {
                    var isValid = thisIns.validateAkColumns(); //Changes are persisted to the localstorage every time the user says next.

                    if (isValid === true) {
                        $scope.currentStepIndex += 1;
                        var pAk = processColumnGuide();
                        pAk.LastAnsweredStepIndex = $scope.currentStepIndex;
                        $scope.personAskadeWizard = personAskadeFileTypeWizardManager.saveAkWizard(pAk, false);
                        $ionicScrollDelegate.scrollTop(true);
                    } //var hideProm = LoaderService.hide();
                    //hideProm.then(function () {


                    if (isValid === false) {
                        ionicToast.showDefault($rootScope.getResourceText('LIT_REQUIRED'));
                    } //});


                    $scope.isDisabled = false;
                }, 500); // Reducing the time out to 0 from 50 (For local operations)
            };

            $scope.showGroupDescription = function (stepName, stepDescription) {
                if (stepDescription == null || stepDescription === "") {
                    ionicToast.showDefault(stepName);
                    return;
                }

                PopupUtil.readAloudAlert(stepName, stepDescription, $scope);
            };

            $scope.ttsConvert = function (caseInstance, event) {
                var text = TextToSpeachUtil.stripHTML(caseInstance);
                TextToSpeachUtil.convertTextToSpeach(text);

                if (event) {
                    event.preventDefault(); // added for ionic

                    event.stopPropagation();
                }
            };

            $scope.startListening = function (entity, type) {
                var speech = SpeachToTextUtil.startListening();
                speech.then(function (result) {
                    console.log(result[0]);

                    switch (type) {
                        case 'Title':
                            entity.Title = result[0];
                            break;

                        case 'ShortText':
                            entity.AnswerText = result[0];
                            break;

                        case 'LongText':
                            entity.AnswerText = result[0];
                            break;

                        default:
                    }
                }, function () { });
            }; // Passing whole entity instead of column type as sub column type info is required.
            // Second parameter is used to handle when this method is called without the file entity as the first parameter
            // instead column type is hard coded(Column guide).


            $scope.loadAkTemplate = function (akColumn, isFileColumnEntity) {
                var columnText = akColumn.ColumnType;

                if (!isFileColumnEntity) {
                    columnText = akColumn;
                }

                switch (columnText) {
                    case 'RadEditor':
                        //Long text....
                        break;

                    case 'Category':
                    case 'Status':
                    case 'Probability':
                    case 'Consequence':
                    case 'Priority':
                    case 'ProblemArea':
                    case 'LineOfBusiness':
                    case 'Person':
                    case 'SafetyDepartment':
                    case 'Process':
                    case 'Asset':
                    case 'ControlLevel':
                    case 'CustomerFieldValue1':
                    case 'CustomerFieldValue2':
                    case 'Owner':
                    case 'Manager':
                    case 'Country':
                    case 'City':
                    case 'ListValue':
                    case 'Department':
                    case 'Chemical':
                    case 'GeographyLocation':
                        //All types of dropdown to be handled..
                        return "templates/askade_templates/answer_templates/dropDown.html";
                        break;

                    case 'EasyClassification':
                        if (akColumn.DataTypeId === "34" || akColumn.DataTypeId === "1479") {
                            return "templates/askade_templates/answer_templates/bodyPartSelector.html";
                        }
                        else {
                            return "templates/askade_templates/answer_templates/dropDown.html";
                        }
                        break;
                    case "VehiclePart":
                        return "templates/askade_templates/answer_templates/vehicleDamage.html";
                        break;
                    case 'DatePicker':
                        //Calender control to be added.
                        //return 'templates/answer_templates/radio.html';
                        return "templates/askade_templates/answer_templates/datePicker.html";
                        break;

                    case 'CheckBox':
                        //Should be a single checkbox with text 
                        return 'templates/askade_templates/answer_templates/checkBox.html';
                        break;

                    case 'NumericTextBox':
                        //numeric text box.. 
                        return 'templates/askade_templates/answer_templates/numeric.html';
                        break;

                    case 'TimePicker':
                        return 'templates/askade_templates/answer_templates/timePicker.html';
                        break;

                    case 'EditableTimePicker':
                        return 'templates/askade_templates/answer_templates/editableTimePicker.html';
                        break;

                    case 'TextBox':
                        var multiLineVal = akColumn.ColumnSubType; // Check if sub column type is Multi line and return long text template

                        if (multiLineVal === 'MultiLine') {
                            return 'templates/askade_templates/answer_templates/multiLine.html';
                        }

                        return 'templates/askade_templates/answer_templates/shortText.html';
                        break;

                    case 'LongText':
                        return 'templates/askade_templates/answer_templates/longText.html';
                        break;

                    case 'CountPicker':
                        return 'templates/askade_templates/answer_templates/countPicker.html';

                    case 'HtmlHelpText':
                        return 'templates/askade_templates/answer_templates/htmlText.html';

                    case 'Signature':
                        return 'templates/askade_templates/answer_templates/signature.html';

                    default:
                        //By default is a short textbox .
                        return "templates/askade_templates/answer_templates/shortText.html";
                        break;
                }
            };

            //Below changes is FT10543 - Handling Body parts by manually and visually selecting parts in popup dropdown 
            $scope.manualBodyPart = function () {
                var virtualEle = document.querySelector("body-selector");
                virtualEle.style.display = "none";
                var manualEle = document.querySelector("lazy-body-dropdown");
                manualEle.style.display = "block";
                manualEle.style.position = "relative";
            };

            $scope.loadAskadePreviewTemplate = function (columnText) {
                return AskadeMethodFactory.loadAskadePreviewTemplate(columnText);
            }; //This method returns the selected list item value from the drop down list implementation

            $scope.getDropDownText = function (akColumn, paq, moduleNameVal) {

                if (akColumn.ColumnSubType === "Company" && paq.AnswerId == null)
                    return paq.AnswerText;

                return AskadeMethodFactory.getDropDownText(akColumn.ColumnType, akColumn.DataTypeId, paq.AnswerId, moduleNameVal);
            };

            //used to load the whole data rather then just text
            $scope.getDropDownTextCode = function (columnType, datatypeId, answerId, moduleNameVal) {
                return AskadeMethodFactory.getDropDownTextCode(columnType, datatypeId, answerId, moduleNameVal);
            };

            $scope.getPersonAkStepColoumnAnswer = function (akColumnId) {
                var personAk = $scope.personAskadeWizard;
                return AskadeMethodFactory.getPersonAkStepColoumnAnswer(akColumnId, personAk);
            };

            $scope.getDropDownSourceByText = function (columnType, dataTypeId, columnSubType) {
                return AskadeMethodFactory.getDropDownSourceByText(columnType, dataTypeId, $scope.moduleName, columnSubType);
            };

            $scope.getVehicleDamagePartsText = function (columnType, datatypeId, answerText) {
                return getDamageText(columnType, datatypeId, answerText);
            }

            function getDamageText(columnType, datatypeId, answerText) {
                var source = AskadeMethodFactory.getDropDownSourceByText(columnType, datatypeId, $scope.moduleName, null);
                var selectedText = [];
                if (answerText && source && source.length > 0) {
                    var answerIds = answerText.split(',');
                    for (var i = 0; i < source.length; i++) {
                        for (var j = 0; j < answerIds.length; j++) {
                            if (source[i].Id == answerIds[j]) {
                                selectedText.push(source[i].Text);
                            }
                        }
                    }
                    return selectedText.toString();
                }
                return null;
            }

            $scope.openTimePicker = function (asnwerColumnId, title) {
                var entity = $scope.getPersonAkStepColoumnAnswer(asnwerColumnId);
                var time = [];

                if (entity.AnswerText !== null) {
                    var selectedValue = entity.AnswerText.replace(":", "_");
                    time.push(selectedValue);
                    highlightSelectedValue(selectedValue);
                }

                var timerPromise = PopupUtil.timerPopUp(title, $scope, time);
                timerPromise.then(function (success) {
                    entity.AnswerText = success;
                    handleDependency(askadeWizard);
                });
            };

            $scope.itemSelected = function itemSelected(selectedItem) {
                var selectedItemText = selectedItem.Text;
                handleDependency(askadeWizard, selectedItemText);
            }

            $scope.checkDependency = function checkDependency() {
                handleDependency(askadeWizard);
            }

            $scope.openEditableTimePicker = function (asnwerColumnId, title) {
                $scope.isDatePickDisabled = true;
                var entity = $scope.getPersonAkStepColoumnAnswer(asnwerColumnId);
                $scope.personAkStepColumnAnswer = entity;
                var theme = timePickerTheme();

                var timeValue = GeneralUtil.pickTime(title, theme);
                timeValue.then(function (time) {
                    $scope.isDatePickDisabled = false;
                    $scope.personAkStepColumnAnswer.AnswerText = time;
                    handleDependency(askadeWizard);
                }, function (e) {
                    $scope.isDatePickDisabled = false;
                });
            };

            function timePickerTheme() {
                $scope.customer = $scope.userDetail.Customer;
                if ($scope.customer.IsDarkModeEnable) {
                    return 2;
                }
                else {
                    return 3;
                }
            }

            $scope.$on("EditableTimeVal", function (evt, data) {
                // This event is called only when the validate method a fales value.
                ionicToast.show($rootScope.getResourceText('MSG_TIME_WRONG_FORMAT'), 'bottom', false, 2500);
            });

            function highlightSelectedValue(time) {
                var elId = '#time_' + time;
                $timeout(function () {
                    var myEl = angular.element(elId);
                    myEl.addClass('existingValue');
                }, 10);
            }

            $scope.showWizardView = function () {
                $scope.pos = ($scope.currentStepIndex + 1) / $scope.akStepsLength * 100 + '%';
                return $scope.currentStepIndex;
            }; // currentDate variable can be used to set a date in the calender. (Commented as it is not used)
            //$scope.currentDate = new Date(2014, 11, 25);
            // The below two lines of code can be used to set minimum and maximum selection dates.
            // Below two variables are referenced in the view.
            //$scope.minDate = new Date(2015, 6, 1);
            //$scope.maxDate = new Date(2016, 6, 31);


            $scope.checkIsMaxDateDefaultToday = function (columnEntity, personColumnEntity) {
                var maxDate = null;
                var currentDate = new Date();

                if (columnEntity.IsDateMaximumToday) {
                    maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
                }

                if (columnEntity.IsDateDefaultToday) {
                    personColumnEntity.AnswerDate = currentDate;
                }

                return maxDate;
            };

            $scope.setAkDate = function (date) {
                // On select of Date/ Cancel of Date picker remove the lock on orientation.
                //screen.unlockOrientation();
                screen.orientation.unlock();
                console.log(date);
                handleDependency(askadeWizard);
            };

            function onLocationSucess(geoPromise, position) {
                var xVal = position.coords.longitude;
                var yVal = position.coords.latitude;
                geoPromise[0].resolve({
                    x: xVal,
                    y: yVal
                });
            }

            function onLocationFailure(geoPromise, location) {
                geoPromise[0].resolve({
                    x: null,
                    y: null
                });
            }

            $scope.setDirectiveFn = function (directiveFn, queInst) {
                $timeout(function () {
                    var arrayValue = {
                        'queId': queInst.Id,
                        'directiveFn': directiveFn
                    };

                    for (var i = 0; i < $scope.directiveScopeArray.length; i++) {
                        var diretiveVal = $scope.directiveScopeArray[i];

                        if (diretiveVal.queId === queInst.Id) {
                            $scope.directiveScopeArray.splice(i, 1);
                        }
                    }

                    $scope.directiveScopeArray.push(arrayValue);
                }, 500);
            };

            var handleSignDirectiveOnDepen = function handleSignDirectiveOnDepen(steps) {
                var currentStep = steps[$scope.currentStepIndex];
                var columnList = currentStep.Columns;

                for (var i = 0; i < columnList.length; i++) {
                    var colVal = columnList[i];
                    var colId = colVal.FileColumnId;
                    var isDepnMet = colVal.IsDependencyMet;

                    if (!isDepnMet) {
                        for (var j = 0; j < $scope.directiveScopeArray.length; j++) {
                            var dirColId = $scope.directiveScopeArray[j].colId;

                            if (colId === dirColId) {
                                $scope.directiveScopeArray.splice(j, 1);
                            }
                        }
                    }
                }
            }; // This method is called based on a callback function from the signature directive

            $scope.getImageBase64 = function (signVal, col) {
                var steps = $scope.akWizard.Steps;
                var currentIndex = $scope.currentStepIndex;
                var step = steps[currentIndex];
                var stepId = step.Id;
                var colId = col.FileColumnId;
                var pak = $scope.getPersonAkStepColoumnAnswer(col.FileColumnId);
                pak.AnswerText = null; // Including the boolean value to disable signature canvas after click on Done

                if (signVal === null) {
                    pak.IsDoneSign = false;
                } else {
                    pak.IsDoneSign = true;
                }

                pak.AnswerText = signVal;
                $scope.validateSignCanvas(stepId, colId, col.IsMandatory);
            }; // Manually validating the canvas (Signature)

            $scope.validateSignCanvas = function (stepId, colId, isMandatory) {
                $timeout(function () {
                    var signField = 'answerText_' + stepId + '_' + colId;
                    var isValid = $scope.formAskade[signField].$valid;
                    var idValue = '#answerText_' + stepId + '_' + colId;
                    var signParentEle = angular.element(document.querySelector(idValue));
                    var signElement = signParentEle.find('#jSignature');

                    if (isMandatory === true) {
                        if (isValid) {
                            signElement.addClass('no-errors');
                            signElement.removeClass('has-errors');
                        } else {
                            signElement.addClass('has-errors');
                            signElement.removeClass('no-errors');
                        }
                    }
                });
            };

            $scope.submitAskade = function () {
                $scope.isDisabled = true; // Iterating through the list of directive array and calling the callback method present in directive.js file

                for (var i = 0; i < $scope.directiveScopeArray.length; i++) {
                    var dirFun = $scope.directiveScopeArray[i];
                    $scope.directiveFn = dirFun.directiveFn;
                    $scope.directiveFn();
                }

                $scope.directiveScopeArray = [];
                var isValid = this.validateAkColumns();
                if (isValid) {
                    var isGeoLocatioEditEnabled = $scope.akWizard.EnableEditGeoLocation;
                    var geoLocationPromise = $q.defer();
                    if ($scope.isEnableLocation && isGeoLocatioEditEnabled) {
                        // If Geo location setting is enabled then below lines are executed
                        var geoTimeOut = $scope.userDetail.Customer.GeoLocationTimeout;
                        var geoEnableHighAccuracy = $scope.userDetail.Customer.EnableHighAccuracyForGeoLocation;
                        var options = {
                            timeout: geoTimeOut,
                            enableHighAccuracy: geoEnableHighAccuracy
                        };
                        var sucessGeo = onLocationSucess.bind(this, [geoLocationPromise]);
                        var failureGeo = onLocationFailure.bind(this, [geoLocationPromise]);
                        navigator.geolocation.getCurrentPosition(sucessGeo, failureGeo, options);
                    } else {
                        geoLocationPromise.resolve({
                            x: null,
                            y: null
                        });
                    }

                    var thisIns = this;
                    geoLocationPromise.promise.then(function (resolvedLocation) {
                        cordova.plugins.Keyboard.close(); //LoaderService.show();  //Hiding the loader for local operations

                        $timeout(function () {
                            var pAk = processColumnGuide();
                            if (!isGeoLocatioEditEnabled) {
                                pAk.GeoX = resolvedLocation.x;
                                pAk.GeoY = resolvedLocation.y;
                            }
                            var module = userApplicationsManager.getUserApplicationByText($scope.userDetail.UserId, $scope.akWizard.ModuleName());
                            personAskadeFileTypeWizardManager.saveAkWizard(pAk, true);
                            var timerPromise = $timeout(function () {
                                $state.go(module.RouteValue + '.completed', {
                                    viewTitle: $scope.title,
                                    type: module.Text,
                                    modColor: module.ColourCode
                                }, {
                                    reload: false,
                                    inherit: false,
                                    notify: true
                                });
                                $timeout.cancel(timerPromise);
                                $scope.isDisabled = false;
                            }, 500); // Removed the timeout of 100 to 0 (Taking time to navigate to completed section)

                            $scope.$emit('performSync', {
                                modName: $scope.akWizard.ModuleName(),
                                animLoader: false
                            });

                        }, 500); // Reducing the time out to 0 from 50 (For local operations)
                    });
                } else {
                    ionicToast.showDefault($rootScope.getResourceText('LIT_REQUIRED'));
                    $scope.isDisabled = false;
                }
            };

            $scope.loadColumnGuideTemplate = function () {
                return "templates/askade_templates/answer_templates/columnGuide.html";
            };

            $scope.getColumnGuideEntity = function (guideId, columnId) {
                return AskadeMethodFactory.getColumnGuideEntity(guideId, columnId, $scope.personAskadeWizard);
            };

            function processColumnGuide() {
                var pAk = $scope.personAskadeWizard;
                var columnValues = pAk.ColumnValues;
                var seperator = '—';
                var guideSeperator = '–';

                for (var i = 0; i < columnValues.length; i++) {
                    var columnValue = columnValues[i];
                    var guideLength = columnValue.ColumnGuides.length;

                    if (guideLength !== 0) {
                        var guides = columnValue.ColumnGuides;
                        var actual = "";

                        for (var j = 0; j < guides.length; j++) {
                            var guide = guides[j];

                            if (guide.AnswerText != null) {
                                actual += guide.AnswerText + guideSeperator + guide.GuideId + seperator;
                                columnValue.AnswerText = actual;
                            }
                        }
                    }
                }

                return pAk;
            }

            $scope.showImageViewer = function (pAttachment) {
                if (!pAttachment.MarkedForDelete) {
                    return pAttachment.FilePath != null;
                }

                return false;
            };

            $scope.selectFile = function (isFile, imageUri) {
                var unattached = $scope.personAskadeWizard.Attachments.filter(a => a.FilePath === null);
                if (unattached.length > 0) {
                    var currentAttachment = unattached[0];
                    if (!isFile)
                        AttachPhoto(currentAttachment);
                    else {
                        if (!imageUri) AppMessages.Error($rootScope.getResourceText('LIT_MOBILE_ALLOWED_EXTENSION'), `${$rootScope.getResourceText('MSG_MOBILE_ALLOWED_EXTENSION')} : ${$scope.allowedExtensions}`);
                        UploadFile(imageUri, currentAttachment);
                    }
                }
                else {
                    PopupUtil.readAloudAlert($rootScope.getResourceText('LIT_ADD_PHOTO'), $rootScope.getResourceText('MSG_MOBILE_TO_THE_MAXIMUM_ATTACHMENTS_REACHED') + "(" + $scope.personAskadeWizard.Attachments.length + "/" + $scope.personAskadeWizard.Attachments.length + ").<br/><br/>" + $rootScope.getResourceText('MSG_MOBILE_REMOVE_THE_ATTACHMENT'), $scope);
                }
            };

            function AttachPhoto(currentAttachment) {
                var attachedPromise = PopupUtil.getAttachment($rootScope.getResourceText('LIT_ATTACHMENTS'), currentAttachment.Id, $scope, true);
                attachedPromise.promise.then(function (imageUri) {
                    UploadFile(imageUri, currentAttachment);
                }, function (error) {
                    AppMessages.Error($rootScope.getResourceText('LIT_MESSAGE'), $rootScope.getResourceText('MSG_NO_CAMERA_FOUND'));
                });
            }

            function UploadFile(imageUri, currentAttachment) {
                var pAttach = $scope.getPAskadeAttachments(currentAttachment.Id);
                PopupUtil.hide(); // The below promise returns the corrected file name if the file name starts with 'content://'

                var fileInfoPromise = FileUtil.getFilePathAndName(imageUri);
                fileInfoPromise.promise.then(function (successFileInfo) {
                    pAttach.FilePath = successFileInfo.fileLocation;
                    pAttach.FileName = successFileInfo.fileName;
                    var urlPathPromise = $rootScope.getInternalUrl(pAttach.FilePath);
                    urlPathPromise.then(function (internalUrl) {
                        pAttach.InternalFilePath = internalUrl;
                    });
                    pAttach.MarkedForDelete = false;
                }, function (errorFileInfo) {// Show some message to the user saying select the image again: TODO
                });
            }

            $scope.close = function () {
                ModalUtil.closeModal($scope);
            };

            $scope.showImage = function (pAttach) {
                CommonMethodsFactory.showImage(pAttach, $scope);
            };


            $scope.getThumnail = function (pAtttach) {
                var isPdfFile = pAtttach.FileName && pAtttach.FileName.toLowerCase().endsWith('.pdf');
                if (!isPdfFile) {
                    var fileLoc = pAtttach.InternalFilePath;
                    var isAndroid = ionic.Platform.isAndroid();
                    if (isAndroid === true) {
                        return fileLoc;
                    }
                    if (fileLoc) {
                        var osSpecificLocation = FileUtil.getImageFilePath(fileLoc);
                        return osSpecificLocation;
                    }
                    return "images/gallery.png";
                } else return "images/pdf.png";
            };

            $scope.deleteAttachment = function (pAttach) {
                var confirmPromise = PopupUtil.confirm($rootScope.getResourceText('LIT_DELETE'), $rootScope.getResourceText('MSG_CONFIRM_DELETE_FIELD'));
                confirmPromise.then(function (success) {
                    if (success) {
                        pAttach.MarkedForDelete = true;
                        pAttach.FileHeader = null; // PDF was not generating on edit of answer FT 7352

                        pAttach.FileSourceBase64 = null; // Delete the image from system on conformation

                        var filePath = pAttach.FilePath;
                        var deletePromise = FileUtil.deleteFile(filePath);
                        deletePromise.then(function (success) {// Success
                        }, function (error) {// Error
                        });
                        var pAk = processColumnGuide();
                        personAskadeFileTypeWizardManager.saveAkWizard(pAk, false);
                    }
                });
            };

            $scope.getPAskadeAttachments = function (attachId) {
                var pAttachments = $scope.personAskadeWizard.Attachments;

                for (var i = 0; i < pAttachments.length; i++) {
                    var pAttach = pAttachments[i];
                    var pAttachId = pAttach.Id;

                    if (pAttachId === attachId) {
                        return pAttach;
                    }
                }
            };

            $scope.validateAkColumns = function () {
                var steps = $scope.akWizard.Steps;
                var currentStep = $scope.currentStepIndex;
                var step = steps[currentStep];

                for (var i = 0; i < step.Columns.length; i++) {
                    var column = step.Columns[i];
                    var columnType = column.ColumnType;
                    var columnSubType = column.ColumnSubType;
                    var columnGuides = column.ColumnGuides;

                    if (column.IsMandatory && column.IsDependencyMet === true) {
                        switch (columnType) {
                            case 'RadEditor':
                                //Long text.... To be implemented
                                break;

                            case 'Category':
                            case 'Status':
                            case 'Probability':
                            case 'Consequence':
                            case 'Priority':
                            case 'ProblemArea':
                            case 'LineOfBusiness':
                            case 'Person':
                            case 'SafetyDepartment':
                            case 'Process':
                            case 'Asset':
                            case 'ControlLevel':
                            case 'CustomerFieldValue1':
                            case 'CustomerFieldValue2':
                            case 'Owner':
                            case 'Manager':
                            case 'EasyClassification':
                            case 'Country':
                            case 'City':
                            case 'ListValue':
                            case 'Department':
                            case 'VehiclePart':
                            case 'Chemical':
                            case 'GeographyLocation':
                                //All types of dropdown to be validated ..
                                var dropDownName = 'dropDownAk_' + step.Id + '_' + column.FileColumnId;
                                var isValid = $scope.formAskade[dropDownName].$valid;

                                if (isValid == true) {
                                    continue;
                                }

                                return isValid;

                            case 'DatePicker':
                                // validate date picker value
                                var datePickerName = 'datePickerAk_' + step.Id + '_' + column.FileColumnId;
                                var isValid = $scope.formAskade[datePickerName].$valid;

                                if (isValid == true) {
                                    continue;
                                }

                                return isValid;

                            case 'TimePicker':
                            case 'EditableTimePicker':
                                // validate time picker value
                                var timePickerName = 'timePickerAk_' + step.Id + '_' + column.FileColumnId;
                                var isValid = $scope.formAskade[timePickerName].$valid;

                                if (isValid == true) {
                                    continue;
                                }

                                return isValid;

                            case 'IsComputed': // TODO: yet to be implemented

                            case 'CheckBox':
                                // Validat a single checkbox
                                var checkBoxName = 'akCb_' + step.Id + '_' + column.FileColumnId;
                                var isValid = $scope.formAskade[checkBoxName].$valid;

                                if (isValid == true) {
                                    continue;
                                }

                                return isValid;

                            case 'NumericTextBox':
                                //validate numeric field for numeric values.
                                var numericFieldName = 'numTextAk_' + step.Id + '_' + column.FileColumnId;
                                var isValid = $scope.formAskade[numericFieldName].$valid;

                                if (isValid == true) {
                                    continue;
                                }

                                return isValid;

                            case 'TextBox':
                                //validate shorttext field for numeric values.
                                var isValid = '';

                                if (columnGuides.length > 0) {
                                    isValid = validateColumnGuides(column, step.Id);

                                    if (isValid == true) {
                                        continue;
                                    }
                                } else {
                                    if (columnSubType === "MultiLine") {
                                        var longTextName = 'longTextAk_' + step.Id + '_' + column.FileColumnId;
                                        isValid = $scope.formAskade[longTextName].$valid;

                                        if (isValid == true) {
                                            continue;
                                        }
                                    } else {
                                        var shortTextName = 'shortTextAk_' + step.Id + '_' + column.FileColumnId;
                                        isValid = $scope.formAskade[shortTextName].$valid;

                                        if (isValid == true) {
                                            continue;
                                        }
                                    }
                                }

                                return isValid;

                            case "CountPicker":
                                //default coloumn type is short text, validate for value
                                var countPickerName = 'cp_' + step.Id + '_' + column.FileColumnId;
                                var isValid = $scope.formAskade[countPickerName].$valid;

                                if (isValid == true) {
                                    continue;
                                }

                                return isValid;
                            case "Signature":
                                //validate signature field.
                                var signField = 'answerText_' + step.Id + '_' + column.FileColumnId;
                                var isValid = $scope.formAskade[signField].$valid;

                                if (isValid == true) {
                                    continue;
                                }

                                return isValid;
                            default:
                                //default coloumn type is short text, validate for value
                                var shortTextName = 'shortTextAk_' + step.Id + '_' + column.FileColumnId;
                                var isValid = $scope.formAskade[shortTextName].$valid;

                                if (isValid == true) {
                                    continue;
                                }

                                return isValid;
                        }
                    }
                }

                return true;
            };

            function validateColumnGuides(column, stepId) {
                var columnGuides = column.ColumnGuides;

                for (var i = 0; i < columnGuides.length; i++) {
                    var guide = columnGuides[i];
                    var longTextName = 'longTextAk_' + stepId + '_' + column.FileColumnId + '_' + guide.Id;
                    var isValid = $scope.formAskade[longTextName].$valid;

                    if (isValid == true) {
                        continue;
                    }

                    return isValid;
                }

                return true;
            } // This method returns setting value for the dropdown and also checks if device is online.


            $scope.isOnlineDropDownEnable = function (columnType, dropDownId) {
                var enableOnline = false;

                switch (columnType) {
                    case 'Person':
                        enableOnline = $scope.userDetail.EnableOnlinePersons;
                        break;

                    case 'Department':
                        enableOnline = $scope.userDetail.EnableOnlineDepartments;
                        break;

                    case 'Asset':
                        enableOnline = $scope.userDetail.EnableOnlineAssets;
                        break;

                    case 'Chemical':
                        enableOnline = $scope.userDetail.EnableOnlineChemicals;
                        break;

                    default:
                        enableOnline = false;
                }

                return enableOnline;
            };

            $scope.checkRequired = function (entity, personAkStepColumnAnswer) {
                if (entity.IsMandatory == true) {
                    var columnId = entity.FileColumnId;
                    var guideAnswerCounter = 0;
                    //this method is used to get the answered values based on that the required field is set
                    var guides = AskadeMethodFactory.getGuideColumnsEntity(
                        columnId,
                        $scope.personAskadeWizard
                    );
                    if (guides.length != 0) {
                        for (var i = 0; i < guides.length; i++) {
                            if (guides[i].AnswerText == null || guides[i].AnswerText == "") {
                                guideAnswerCounter = guideAnswerCounter + 1;
                            }
                        }
                        if (guideAnswerCounter == guides.length) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        if (personAkStepColumnAnswer.AnswerDate != null) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                } else {
                    return false;
                }
            };

            $scope.showDate = function (akColumn, personAkStepColumnAnswer) {
                $scope.isDatePickDisabled = true;
                var maxDate = this.checkIsMaxDateDefaultToday(akColumn, personAkStepColumnAnswer);
                var date = personAkStepColumnAnswer.AnswerDate;
                var theme = datePickerTheme();
                $scope.personAkStepColumnAnswer = personAkStepColumnAnswer;
                var dateValue = GeneralUtil.pickDate(maxDate, date, theme);
                dateValue.then(function (date) {
                    $scope.isDatePickDisabled = false;
                    $scope.personAkStepColumnAnswer.AnswerDate = date;
                    var formattedDate = DateUtil.getFormattedValue($scope.personAkStepColumnAnswer.AnswerDate, 'date');
                    $scope.personAkStepColumnAnswer.AnswerText = formattedDate;
                    handleDependency(askadeWizard);
                }, function (e) {
                    $scope.isDatePickDisabled = false;
                });
            };

            function datePickerTheme() {
                $scope.customer = customersManager.getCustomers();
                if ($scope.customer.IsDarkModeEnable) {
                    return 2;
                }
                else {
                    return 3;
                }
            }
        }]);
})();

/***/ }),

/***/ "./scripts/controller/askadeListController.js":
/*!****************************************************!*\
  !*** ./scripts/controller/askadeListController.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var app = angular.module('askade');
app.factory("$exceptionHandler", ['$injector', function ($injector) {
    return function (exception, cause) {
        var localStorageUtility = $injector.get('LocalStorageUtility')
        localStorageUtility.addExceptionToLogTable(exception, cause);
        var rScope = $injector.get('$rootScope');
        rScope.$broadcast('exceptionRefresh', exception, cause);
    };
}]);
app.controller('askadeListController', ['$scope', '$rootScope', '$state', 'AppMessages', 'LoaderService', '$stateParams', 'ionicToast', 'userDetailsManager', 'PopupUtil', 'DeviceUtil', 'askadeFileTypeWizardManager', '$timeout', 'personAskadeFileTypeWizardManager', 'LocalStorageHelper', '$q', 'AskadeMethodFactory', 'FileUtil', 'CommonMethodsFactory', 'userApplicationsManager', function ($scope, $rootScope, $state, AppMessages, LoaderService, $stateParams, ionicToast, userDetailsManager, PopupUtil, DeviceUtil, askadeFileTypeWizardManager, $timeout, personAskadeFileTypeWizardManager, LocalStorageHelper, $q, AskadeMethodFactory, FileUtil, CommonMethodsFactory, userApplicationsManager) {
    //LoaderService.show();  //Hiding the loader for local operations
    ionic.DomUtil.ready(function () {//LoaderService.hide();
    });
    var caseList = [];
    var inProgressCount = 0,
        completedCount = 0,
        activeCount = 0;
    $scope.title = $stateParams.viewTitle;
    $scope.modColor = $stateParams.modColor;
    var moduleName = $stateParams.type;
    $scope.modNameVal = moduleName;
    $scope.selectedAskade = [];
    var userProfile = userDetailsManager.getUserLastLoggedTimeStamp();
    $scope.customerSetting = userProfile.Customer;
    $scope.userDetailsData = userProfile;
    $scope.applicationDetails = userApplicationsManager.getUserApplicationByText(userProfile.UserId, moduleName);
    $scope.IsDownloadErrorShown = false;

    function getCaseList() {
        var tabbedState = $state.current.name;
        var tempCaseList = [];

        switch (tabbedState) {
            case "app.akwTabs.inProgress":
            case "app.claimTabs.inProgress":
                tempCaseList = personAskadeFileTypeWizardManager.getInProgressPCaseList(moduleName);
                inProgressCount = tempCaseList.length;
                break;

            case "app.akwTabs.completed":
            case "app.claimTabs.completed":
                tempCaseList = personAskadeFileTypeWizardManager.getCompletedPCaseList(moduleName);
                completedCount = tempCaseList.length;
                break;

            case "app.akwTabs.active":
            case "app.claimTabs.active":
                if (!$scope.applicationDetails.IsApplicationModuleDisable) {
                    tempCaseList = askadeFileTypeWizardManager.getAllCaseFileTypeWizard(moduleName);
                    activeCount = tempCaseList.length;
                }

                break;

            default:
                break;
        }

        return tempCaseList;
    }

    refreshCaseWithErrorCheck();

    function refreshCaseWithErrorCheck() {
        $scope.IsDownloadErrorShown = false;
        refreshCase();
    }

    function refreshCase() {
        var validCaseDownload = userDetailsManager.getIfdownloadValidForType(moduleName);

        if (validCaseDownload === false) {
            if (!$scope.IsDownloadErrorShown) {
                $scope.IsDownloadErrorShown = true;
                AppMessages.Error($rootScope.getResourceText('LIT_MESSAGE'), $rootScope.getResourceText('MSG_ERROR_DOWNLOADING_MODULE') + " " + $scope.title + " " + $rootScope.getResourceText('MSG_PLEASE_TRY_AGAIN'));
            }
        } else {
            caseList = getCaseList();
            $scope.akwList = caseList;
        }
    }

    $scope.getPersonAkStepColoumnAnswer = function (akColumnId, personAkEntity) {
        return AskadeMethodFactory.getPersonAkStepColoumnAnswer(akColumnId, personAkEntity);
    };

    $scope.loadAskadePreviewTemplate = function (columnText) {
        return AskadeMethodFactory.loadAskadePreviewTemplate(columnText);
    };

    $scope.getColumnGuideEntity = function (guideId, columnId, pAkw) {
        return AskadeMethodFactory.getColumnGuideEntity(guideId, columnId, pAkw);
    }; //This method returns the selected list item value from the drop down list implementation

    $scope.getDropDownText = function (akColumn, paq, moduleNameVal) {

        if (akColumn.ColumnSubType === "Company" && paq.AnswerId == null)
            return paq.AnswerText;

        return AskadeMethodFactory.getDropDownText(akColumn.ColumnType, akColumn.DataTypeId, paq.AnswerId, moduleNameVal);
    };

    $scope.getAttachmentDetails = function (entity) {
        if (entity.Attachments.length == 1 && entity.Attachments[0].FileName.indexOf('.pdf') !== -1) {
            return {
                isPdf: true,
                FileName: entity.Attachments[0].FileName,
            }
        }
        return {
            isPdf: false,
            FileName: entity.Attachments[0].FileName
        }
    }

    $scope.getVehicleDamagePartsText = function (columnType, datatypeId, answerText) {
        var source = AskadeMethodFactory.getDropDownSourceByText(columnType, datatypeId, moduleName, null);
        var selectedText = [];
        if (answerText) {
            var answerIds = answerText.split(',');
            for (var i = 0; i < source.length; i++) {
                for (var j = 0; j < answerIds.length; j++) {
                    if (source[i].Id == answerIds[j]) {
                        selectedText.push(source[i].Text);
                    }
                }
            }
            return selectedText.toString();
        }
        return null;
    }

    $scope.loadAskadePdfTemplate = function (columnText) {
        switch (columnText) {
            case 'RadEditor':
                //Long text....
                break;

            case 'Category':
            case 'Status':
            case 'Probability':
            case 'Consequence':
            case 'Priority':
            case 'ProblemArea':
            case 'LineOfBusiness':
            case 'Person':
            case 'SafetyDepartment':
            case 'Process':
            case 'Asset':
            case 'ControlLevel':
            case 'CustomerFieldValue1':
            case 'CustomerFieldValue2':
            case 'Owner':
            case 'Manager':
            case 'EasyClassification':
            case 'Country':
            case 'City':
            case 'ListValue':
                return "templates/pdf_templates/askade/ak_column_templates/dropdownPdf.html";
                break;
            case 'VehiclePart':
                return "templates/pdf_templates/askade/ak_column_templates/vehicleDamagePdf.html";
                break;
            case 'DatePicker':
                return "templates/pdf_templates/askade/ak_column_templates/datePickerPdf.html";
                break;

            case 'CheckBox':
                return 'templates/pdf_templates/askade/ak_column_templates/checkBoxPdf.html';
                break;

            case 'NumericTextBox':
                return 'templates/pdf_templates/askade/ak_column_templates/defaultPdf.html';
                break;

            case 'TimePicker':
            case 'EditableTimePicker':
                return 'templates/pdf_templates/askade/ak_column_templates/defaultPdf.html';
                break;

            case 'TextBox':
                return 'templates/pdf_templates/askade/ak_column_templates/defaultPdf.html';
                break;

            case 'LongText':
                return 'templates/pdf_templates/askade/ak_column_templates/defaultPdf.html';
                break;

            case 'Signature':
                return null;
                break;

            default:
                //By default is a short textbox .
                return "templates/pdf_templates/askade/ak_column_templates/defaultPdf.html";
                break;
        }
    };

    $rootScope.$on("refresh", function () {
        refreshCase();
    });

    $scope.navigateAskadeAnswering = function (id) {
        //LoaderService.show();  //Hiding the loader for local operations
        var timerPromise = $timeout(function () {
            $state.go('app.askade', {
                id: id,
                state: $state.current.name,
                viewTitle: $scope.title,
                modColor: $scope.modColor
            }, {
                reload: false,
                inherit: false,
                notify: true
            });
            $timeout.cancel(timerPromise);
        }, 100);
    };

    $scope.deletePersonAkByPAkId = function (answer) {
        var anim = '<lottie-player src="raw/delete.json" background="transparent" speed="1" id="deleteAnim" autoplay></lottie-player>';
        var confirmPromise = PopupUtil.animConfirm(anim, $rootScope.getResourceText('LIT_DELETE'), $rootScope.getResourceText('MSG_CONFIRM_DELETE_FIELD'));
        // var confirmPromise = PopupUtil.confirm($rootScope.getResourceText('LIT_DELETE'), $rootScope.getResourceText('MSG_CONFIRM_DELETE_FIELD'));
        confirmPromise.then(function (success) {
            if (success) {
                var pAkW = personAskadeFileTypeWizardManager.getPersonAskadeFileTypeWizard(answer.Id);

                if ($scope.selectedAskade.length > 0) {
                    $scope.onSelectForUpload(answer);
                }

                personAskadeFileTypeWizardManager.removeInstance(pAkW);
                refreshCaseWithErrorCheck();
            }
        });
    }; //$scope.deleteAskadeWizard = function (akWizard) {
    //    var confirmPromise = PopupUtil.confirm($rootScope.getResourceText('LIT_DELETE'), $rootScope.getResourceText('MSG_CONFIRM_DELETE_FIELD'));
    //    confirmPromise.then(function (success) {
    //        if (success) {
    //            LoaderService.show();
    //            var akData = askadeFileTypeWizardManager.getAskadeFileTypeWizard(akWizard);
    //            var deletePromise = askadeFileTypeWizardManager.deleteAskadeWizard(akData);
    //            deletePromise.then(function (success) {
    //                $timeout(function () {
    //                    refreshCase();
    //                    LoaderService.hide();
    //                }, 100);
    //            }, function (fail) {
    //                $timeout(function () {
    //                    var hidePromise = LoaderService.hide();
    //                    hidePromise.then(function () {
    //                        PopupUtil.alert($rootScope.getResourceText('LIT_MESSAGE'), $rootScope.getResourceText('MSG_NOT_DELETABLE'));
    //                    });
    //                });
    //            }); 
    //        }
    //    });
    //}


    $scope.updateAskade = function () {
        var isUpdatedPromise = CommonMethodsFactory.getData(moduleName, $scope.title);
        isUpdatedPromise.then(function (success) {
            LocalStorageHelper.updateUserDetails($scope.userDetailsData.UserName);
            refreshCaseWithErrorCheck(); // Stop the ion-refresher from spinning

            $scope.$broadcast('scroll.refreshComplete');
        }, function (fail) {
            // Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
        });
    };

    function uploadPersonAskade(pAkId, isMultipleUpload) {
        // LoaderService.show(); // This implementation will change when 
        // Repeatable questionnaire answering gets implemented.
        // Since there will be multiple entries. Get by PersonQuestionnaire (Id column).

        var def = $q.defer();
        var pAkW = personAskadeFileTypeWizardManager.getPersonAskadeFileTypeWizard(pAkId);
        var uploadInProgress = pAkW.UploadInProgress;

        if (uploadInProgress == false) {
            //Process date fields to contain date in the dd-MM-yyyy format before uploading.
            personAskadeFileTypeWizardManager.processDateColumnForAskade(pAkW);
            var processesPAkPromise = FileUtil.processFile(pAkW, true);
            processesPAkPromise.then(function (completePersonAskade) {
                completePersonAskade.UploadInProgress = true;
                completePersonAskade.UploadFail = false;
                var currentCompletedAskade = completePersonAskade;
                var uploadPromise;

                if (completePersonAskade.AskadeFileTypeWizard.TypeCode === 8) {
                    uploadPromise = LocalStorageHelper.uploadPersonAskadeWizard(currentCompletedAskade);
                } else {
                    uploadPromise = LocalStorageHelper.uploadPersonClaimWizard(currentCompletedAskade);
                }

                uploadPromise.then(function (serverSucessResponse) {
                    personAskadeFileTypeWizardManager.removeInstance(currentCompletedAskade);
                    PopupUtil.hide();
                    var anim = '<lottie-player src="raw/loadingSuccess.json" background="transparent" speed="1" id="loadAnim" autoplay></lottie-player>';
                    var contentTitle = $rootScope.getResourceText('LIT_MOBILE_SUCCESS');
                    var contentLabel = currentCompletedAskade.AskadeFileTypeWizard.Name + " " + $rootScope.getResourceText('MSG_MOBILE_UPLOADED_REGISTRATION');
                    var contentTimer = 5000;
                    PopupUtil.animTimerPopUp(anim, contentTitle, contentLabel, contentTimer);
                    // ionicToast.showDefault(currentCompletedAskade.AskadeFileTypeWizard.Name + " " + $rootScope.getResourceText('MSG_IS_SUCCESSFULLY_UPLOADED'));
                    def.resolve(pAkId);
                    refreshCaseWithErrorCheck();
                }, function (error) {
                    currentCompletedAskade.UploadInProgress = false;
                    currentCompletedAskade.UploadFail = true;

                    if ($scope.selectedAskade.length > 0) {
                        $scope.onSelectForUpload(currentCompletedAskade, $scope);
                    }

                    def.reject(error);
                    refreshCaseWithErrorCheck();
                });
            }, function (inCompletePersonAkw) {
                // Check is performed only to validate if it is a file not found error.
                if (inCompletePersonAkw.message === "NOT_FOUND_ERR") {
                    // The boolean flag tells if it is from multiple upload or single upload
                    if (!isMultipleUpload) {
                        // Showing a confirm popup. On 'Ok' move to inprogress else retain in the current screen
                        var confirmPromise = PopupUtil.confirm($rootScope.getResourceText('LIT_MESSAGE'), $rootScope.getResourceText('MSG_ATTACHMENTS_MISSING'));
                        confirmPromise.then(function (success) {
                            if (success) {
                                //Saving the questionnaire as to move to Inprogress section
                                personAskadeFileTypeWizardManager.saveAkWizard(inCompletePersonAkw.personEntity, false);
                                refreshCaseWithErrorCheck();
                            }
                        });
                    } else {
                        personAskadeFileTypeWizardManager.saveAkWizard(inCompletePersonAkw.personEntity, false);
                    }
                }

                inCompletePersonAkw.personEntity.UploadInProgress = false;
                inCompletePersonAkw.personEntity.UploadFail = true;

                if ($scope.selectedAskade.length > 0) {
                    $scope.onSelectForUpload(inCompletePersonAkw.personEntity, $scope);
                }

                def.reject(inCompletePersonAkw);
                refreshCaseWithErrorCheck();
            });
        }
        // PopupUtil.hide();
        return def;
    }

    $scope.uploadAskadeAnswering = function (pAkId) {
        loadingAnimProcess();
        var checkDeviceOnline = deviceOnlineCheck();

        if (checkDeviceOnline === true) {
            //var tokenValidityPromise = LocalStorageHelper.validateUserToken();
            //  tokenValidityPromise.then(function (tokenValid) {
            uploadPersonAskade(pAkId, false);
            //  }, function (tokenInValid) {
            //     PopupUtil.hide();
            //});
        } else {
            PopupUtil.hide();
        }
    };

    $scope.showAkPreview = function (pakw) {
        //LoaderService.show();  //Hiding the loader for local operations
        var processPromise = FileUtil.processFile(pakw, false);
        processPromise.then(function (successPakw) {
            $state.go('app.askadePV', {
                id: successPakw.Id,
                viewTitle: $scope.title,
                modColor: $scope.modColor
            });
        }, function (errorResponse) {
            // Showing a confirm popup. On 'Ok' move to inprogress else retain in the current screen
            var confirmPromise = PopupUtil.confirm($rootScope.getResourceText('LIT_MESSAGE'), $rootScope.getResourceText('MSG_ATTACHMENTS_MISSING'));
            confirmPromise.then(function (success) {
                if (success) {
                    personAskadeFileTypeWizardManager.saveAkWizard(errorResponse.personEntity, false);
                    refreshCaseWithErrorCheck();
                }
            });
        });
    };

    $scope.selectedCount = $scope.selectedAskade.length; // Passing the instance to access isSelected variable initilized in ng-init(View)

    $scope.onMultiSelectForUpload = function (answer, instance) {
        if ($scope.selectedAskade.length === 0 && answer.UploadInProgress === false) {
            instance.isSelected = true;
            $scope.selectedAskade.push(answer.Id);
            $scope.selectedCount = $scope.selectedAskade.length;
        }
    }; // Passing the instance to access isSelected variable initilized in ng-init(View)


    $scope.onSelectForUpload = function (answer, instance) {
        if (answer.UploadInProgress === false) {
            if ($scope.selectedAskade.length !== 0) {
                var index = $scope.selectedAskade.indexOf(answer.Id);

                if (index > -1) {
                    $scope.selectedAskade.splice(index, 1);
                    instance.isSelected = false;
                } else {
                    $scope.selectedAskade.push(answer.Id);
                    instance.isSelected = true;
                }

                $scope.selectedCount = $scope.selectedAskade.length;
            } else {
                $scope.showAkPreview(answer);
            }
        }
    };

    $scope.editCompletedAnswer = function (answer) {
        var confirmPromise = PopupUtil.confirm($rootScope.getResourceText('LIT_MESSAGE'), $rootScope.getResourceText('MSG_EDIT'));
        confirmPromise.then(function (success) {
            if (success) {
                var processPromise = FileUtil.processFile(answer, false);
                processPromise.then(function (successPakw) {
                    var id = answer.Id;
                    answer.LastAnsweredStepIndex = 0;
                    personAskadeFileTypeWizardManager.saveAkWizard(answer, false);
                    $scope.navigateAskadeAnswering(id);
                }, function (errorResponse) {
                    var confirmPromise = PopupUtil.confirm($rootScope.getResourceText('LIT_MESSAGE'), $rootScope.getResourceText('MSG_ATTACHMENTS_MISSING'));
                    confirmPromise.then(function (success) {
                        if (success) {
                            personAskadeFileTypeWizardManager.saveAkWizard(errorResponse.personEntity, false);
                            $scope.navigateAskadeAnswering(errorResponse.personEntity.Id);
                        }
                    });
                });
            }
        });
    };

    $scope.uploadMutipleWizards = function () {
        loadingAnimProcess();
        var checkDeviceOnline = deviceOnlineCheck();

        if (checkDeviceOnline === true) {
            var tokenValidityPromise = LocalStorageHelper.validateUserToken();
            tokenValidityPromise.then(function (tokenValid) {
                var hidePromise = LoaderService.hide();
                hidePromise.then(function () {
                    for (var i = 0; i < $scope.selectedAskade.length; i++) {
                        var uploadPromise = uploadPersonAskade($scope.selectedAskade[i], true);
                        uploadPromise.promise.then(function (success) {
                            var index = $scope.selectedAskade.indexOf(success);

                            if (index > -1) {
                                $scope.selectedAskade.splice(index, 1);
                            } else {
                                $scope.selectedAskade = [];
                            }

                            $scope.selectedCount = $scope.selectedAskade.length;
                        }, function (inCompletePersonAkw) {
                            PopupUtil.hide();
                            var hidePromise = LoaderService.hide();
                            hidePromise.then(function () {
                                $scope.selectedAskade = [];
                            }); // Check is performed only to validate if it is a file not found error.

                            if (inCompletePersonAkw.message === "NOT_FOUND_ERR") {
                                // Showing toast message to notify user as to move to inprogress only for multiple upload
                                ionicToast.showDefault(inCompletePersonAkw.personEntity.AskadeFileTypeWizard.Name + " " + $rootScope.getResourceText("MSG_MOVED_INPROGRESS"));
                                refreshCaseWithErrorCheck();
                            }
                        });
                    }
                }, function (tokenInvalid) {
                    var hidePromise = LoaderService.hide();
                    hidePromise.then(function () {
                        $scope.selectedAskade = [];
                    });
                });
            });
        } else {
            PopupUtil.hide();
        }
    };

    function loadingAnimProcess() {
        var anim = '<lottie-player src="raw/loadingNew.json" background="transparent" speed="1" id="loadAnim" loop autoplay></lottie-player>';
        var contentTitle = $rootScope.getResourceText('LIT_MOBILE_UPLOAD');
        var contentLabel = $rootScope.getResourceText('MSG_MOBILE_UPOADING_REGISTRATION');
        PopupUtil.animPopUp(anim, contentTitle, contentLabel);
    }

    function deviceOnlineCheck() {
        var isOnline = DeviceUtil.isDeviceOnline();

        if (isOnline === false) {
            var anim = '<lottie-player src="raw/loadingFailed.json" background="transparent" speed="2" id="loadFailAnim" autoplay></lottie-player>';
            var contentTitle = $rootScope.getResourceText('LIT_MOBILE_ERROR');
            var contentLabel = $rootScope.getResourceText('MSG_MOBILE_INTERNET_ERROR');
            PopupUtil.animAlert(anim, contentTitle, contentLabel);
            // AppMessages.Error($rootScope.getResourceText('LIT_ALERT'), $rootScope.getResourceText('MSG_CHECK_INTERNET_CONNECTION'));
        }

        return isOnline;
    }

    $scope.getStepName = function (name) {
        var regex = /<[^>]*>/g;
        var name = name.replace(regex, "");
        return name;
    };

    $scope.validateStep = function (step) {
        if (step) {
            var columns = step.Columns;
            for (var i = 0; i < columns.length; i++) {
                if (columns[i].ColumnGuides.length == 0 && columns[i].IsDependencyMet === true) {
                    return true;
                } else if (columns[i].ColumnGuides.length != 0 && columns[i].IsDependencyMet === true) {
                    return true;
                }
            }
            return false;
        }
    }
}]);

/***/ }),

/***/ "./scripts/controller/documentLibraryList.js":
/*!***************************************************!*\
  !*** ./scripts/controller/documentLibraryList.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    var app = angular.module('documentLibrary');
    app.factory("$exceptionHandler", ['$injector', function ($injector) {
        return function (exception, cause) {
            var localStorageUtility = $injector.get('LocalStorageUtility')
            localStorageUtility.addExceptionToLogTable(exception, cause);
            var rScope = $injector.get('$rootScope');
            rScope.$broadcast('exceptionRefresh', exception, cause);
        };
    }]);
    app.controller('documentLibraryListController', ['documentLibraryManager', 'PopupUtil', '$scope', '$stateParams', '$state', '$rootScope',
        'FileUtil', 'AppMessages', 'userDetailsManager', 'DocumentLibraryUtil', 'CommonMethodsFactory', '$filter', 'ionicToast', 'favoritesManager', 'LoaderService', '$sce', 'LocalStorageHelper',
        function (documentLibraryManager, PopupUtil, $scope, $stateParams, $state, $rootScope, FileUtil, AppMessages, userDetailsManager, DocumentLibraryUtil, CommonMethodsFactory, $filter, ionicToast,
            favoritesManager, LoaderService, $sce, LocalStorageHelper) {
            $scope.downloadIndicator = {};

            const loadingIndicator = $sce.trustAsHtml("<i class=\"ion-android-alarm-clock  \" style=\"color: #FFAE42;\"></i>");
            const errorIndicator = $sce.trustAsHtml("<i class=\"ion-minus-circled \" style=\"color: red;\"></i>");
            const sucessIndicator = $sce.trustAsHtml("<i class=\"ion-checkmark-circled \" style=\"color: green;\"></i>");

            var inProgressdownloadList = window.localStorage.getItem('documentLibraryDownloadInProgressList');
            var downloadstarted = window.localStorage.getItem('documentLibraryDownloadInStarted');

            if (inProgressdownloadList) {
                var splitList = inProgressdownloadList.split('|') || [];

                for (var i = 0; i < splitList.length; i++) {
                    var docId = splitList[i];
                    $scope.downloadIndicator[docId] = loadingIndicator;
                }
                if (!downloadstarted || (downloadstarted && downloadstarted === '0')) {
                    window.localStorage.removeItem('documentLibraryDownloadInProgressList');
                }
            }

            // Fetching the details passed via route parameters
            var moduleName = $stateParams.type;
            $scope.title = $stateParams.viewTitle;
            $scope.modColor = $stateParams.modColor;
            var groupName = $stateParams.groupName;
            $scope.documentList = []; // Getting icon values

            $scope.searchIcon = $rootScope.getIconValue('Search');
            $scope.closeIcon = $rootScope.getIconValue('Close');
            $scope.searchText = $rootScope.getResourceText('LIT_SEARCH');
            var userProfile = userDetailsManager.getUserLastLoggedTimeStamp();
            $scope.customerSetting = userProfile.Customer;
            $scope.userDetailsData = userProfile;
            $scope.searchModel = null;
            $scope.groupNameList = []; // On load of controller refreshing the values
            $scope.docTreeView = [];
            $scope.IsTreeViewEnabled = $scope.customerSetting.EnableDocumentTreeView;
            $scope.isDropDownOpen = false;
            $scope.IsDownloadErrorShown = false;
            $scope.OpenedDocGroupList = [];

            refreshDocumentLibraryWithErrorCheck();

            function refreshDocumentLibraryWithErrorCheck() {
                $scope.IsDownloadErrorShown = false;
                refreshDocumentLibrary();
            }

            $rootScope.$on('progressEvent', function (event, data) {
                console.log('Progress');
                const keys = Object.keys(data);
                for (const key of keys) {
                    $scope.downloadIndicator[key] = loadingIndicator;
                }
            });

            $rootScope.$on('completedEvent', function (event, data) {
                console.log('completed');
                for (const key of data) {
                    $scope.downloadIndicator[key] = sucessIndicator;
                }
                const completedkeys = Object.keys(data);
                let inProgressList = window.localStorage.getItem('documentLibraryDownloadInProgressList');
                //Remove the completed keys from the inProgressList
                if (inProgressList) {
                    const splitList = inProgressList.split('|') || [];
                    for (const key of completedkeys) {
                        const index = splitList.indexOf(key);
                        if (index > -1) {
                            splitList.splice(index, 1);
                        }
                    }
                    inProgressList = splitList.join('|');
                    window.localStorage.setItem('documentLibraryDownloadInProgressList', inProgressList);
                }
                else {
                    window.localStorage.removeItem('documentLibraryDownloadInProgressList');
                }
                refreshDocumentLibrary();
            });

            $rootScope.$on('errorEvent', function (event, data) {
                console.log('Error');
                for (const key of data) {
                    $scope.downloadIndicator[key] = errorIndicator;
                }
                refreshDocumentLibrary();
            });

            function refreshDocumentLibrary() {
                // If document library is not downloaded display the below message
                var validDownloadDocumentLibrary = userDetailsManager.getIfdownloadValidForType('DocumentLibrary');

                if (validDownloadDocumentLibrary === false) {
                    if (!$scope.IsDownloadErrorShown) {
                        $scope.IsDownloadErrorShown = true;
                        AppMessages.Error($rootScope.getResourceText('LIT_MESSAGE'), $rootScope.getResourceText('MSG_ERROR_DOWNLOADING_MODULE') + " " + $scope.title + " " + $rootScope.getResourceText('MSG_PLEASE_TRY_AGAIN'));
                    }
                } else {
                    if (groupName) {
                        // If user navigates from home screen by clicking on a group type value, then display only that group data
                        $scope.documentList = documentLibraryManager.getAllDocumentByGroupType(groupName);
                        $scope.GroupName = groupName;
                        if ($scope.customerSetting.EnableDocumentTreeView)
                            $scope.docTreeView =
                                documentLibraryManager.getDocumentTreeByGroup(groupName);
                    } else {
                        // Get group names and then filter based on group name to display the list if user has clicked document in home or side menu screen
                        $scope.groupNameList = documentLibraryManager.getUniqueGroupName();
                        if ($scope.customerSetting.EnableDocumentTreeView)
                            $scope.docTreeView =
                                documentLibraryManager.getAllDocumentTreeStructure();
                    }
                }
            } // Method is called after group name list is got.


            $scope.getDocListByGroupName = function (groupName) {
                return documentLibraryManager.getAllDocumentByGroupType(groupName);
            };

            $scope.selectFavoritesOnHold = function (favoriteData) {
                // Below boolean value is added to identify that its is selected in Document list screen and is not a group data
                favoriteData.IsRootData = true;
                ionicToast.showDefault(favoriteData.Text + " " + $rootScope.getResourceText('MSG_MOBILE_FAVORITES_ADDED'));
                favoritesManager.addToFavorites(favoriteData, moduleName);
            };

            $rootScope.$on("refresh", function () {
                refreshDocumentLibrary();
            }); // Click action on list screen based on the document type

            $scope.documentAction = function (event, doc) {
                if (event.target.id != "aichat") {
                    const isOfflneDoc = (doc.LinkName && doc.LinkName.length > 0 && doc.Link && doc.Link.length > 0);
                    if (isOfflneDoc) {
                        if (doc.DeviceFilePath !== null) {
                            $scope.OpenDLFile(doc);
                        }
                        return;
                    }

                    switch (doc.DocumentTypeCode) {
                        case 'Link':
                            break;

                        case 'HTML':
                            DocumentLibraryUtil.openHtmlDocument(doc, $scope);
                            break;

                        case 'File':
                            $scope.OpenDLFile(doc);
                            break;

                        default:
                            return null;
                    }
                }

            }; // Open HTML document via a pop up with in an iframe


            $scope.openHtmlDocument = function (htmlDoc) {
                $scope.docModalTitle = htmlDoc.Text;
                var decodedContent = DocumentLibraryUtil.decodeHTMLString(htmlDoc.HtmlContent); //To prevent the ng-bind-error on click of popup

                var content = angular.element('<div/>').html(decodedContent);
                PopupUtil.htmlDocAlert($scope.docModalTitle, content);
            }; // Open a physical file saved in the device

            $scope.isBackgroundDownloadLink = function (docItem) {
                return (docItem.LinkName && docItem.LinkName.length > 0 && docItem.Link && docItem.Link.length > 0);
            };

            $scope.isOnlineDownloadLink = function (docItem) {
                return !$scope.isBackgroundDownloadLink(docItem);
            };

            $scope.isFileAlreadyDownloaded = function (docItem) {
                const filePath = docItem.DeviceFilePath;

                if (filePath) return true;
                return false;
            };

            $scope.isFileErrored = function (docItem) {
                const isBackDownload = $scope.isBackgroundDownloadLink(docItem);
                const isFileNotDownloaded = $scope.isFileAlreadyDownloaded(docItem) === false;
                var downloadstarted2 = window.localStorage.getItem('documentLibraryDownloadInStarted');

                if (downloadstarted2 === null || (downloadstarted2 && downloadstarted2 === '0')) {
                    return (isBackDownload && isFileNotDownloaded);
                }
            };

            $scope.OpenDLFile = function (doc) {
              if(doc.LinkName && doc.LinkName.indexOf('.') < 0){
                  var ref = CommonMethodsFactory.openInAppBrowser(doc.Link, '_blank', 'location=yes');
              }
              else if (doc.DeviceFilePath !== null) {
                var fileName = doc.FileName;
                var filePath = doc.DeviceFilePath;
                var re = /(?:\.([^.]+))?$/;
                var getExtension = re.exec(fileName)[1];
                var contentType = FileUtil.getContentType(getExtension);
                FileUtil.openFile(filePath, contentType);
              }
            }; // For collapsible dropdown while displaying all the documents based on group name


            $scope.toggleGroup = function (event, group, searchText) {
                if ((searchText == null || searchText.Text === "") && event.target.id != "aichat") {
                    group.IsGroupToggle = !group.IsGroupToggle;
                }
            };

            $scope.isGroupShown = function (group) {
                return group.IsGroupToggle;
            }; // Method used to open the collapsible dropdown based on the search text value present.


            $scope.checkIfToggleList = function (docList, searchVal) {
                if (searchVal != null && searchVal.Text !== "") {
                    var list = $filter('filter')(docList, searchVal);
                    return list.length !== 0;
                } else {
                    return false;
                }
            }; // Method used for pull to refresh implementation


            $scope.updateDocument = function () {
                var isUpdatedPromise = CommonMethodsFactory.getData(moduleName, $scope.title);
                isUpdatedPromise.then(function (success) {
                    LocalStorageHelper.updateUserDetails($scope.userDetailsData.UserName);
                    refreshDocumentLibraryWithErrorCheck(); // Stop the ion-refresher from spinning

                    $scope.$broadcast('scroll.refreshComplete');
                }, function (fail) {
                    // Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                });
            };

            $scope.showExtendedInfo = function (doc) {
                ionicToast.showDefault(doc.ExtendedInfo);
                event.stopPropagation();
            };

            $scope.openAiLink = function (doc) {
                var ref = CommonMethodsFactory.openInAppBrowser(doc.AiAssistanceLink, '_blank', 'location=yes');
            }

            $scope.openAiGroupLink = function (docList) {
                var doc = docList.find(doc => doc.AiAssistanceGroupLink != null);
                if (doc) {
                    var ref = CommonMethodsFactory.openInAppBrowser(doc.AiAssistanceGroupLink, '_blank', 'location=yes');
                }
            }

            $scope.getGroupChatIconVisibility = function (docList) {
                return docList.some(doc => doc.AiAssistanceGroupLink != null);
            }

            $scope.clearSearch = function (searchVal) {
                searchVal.Text = "";
            };

            $scope.download = function (Doc) {
                var fileName = Doc.LinkName;
                var re = /(?:\.([^.]+))?$/;
                var getExtension = re.exec(fileName)[1];
                var contentType = FileUtil.getContentType(getExtension);
                var uri = Doc.Link;
                // Those links which are documents associated with extention gets downloaded
                // and those without are opened in a inappbrowser
                if (getExtension !== undefined) {
                    var ft = new FileTransfer();
                    if (ionic.Platform.isIOS()) {
                        var file = cordova.file.dataDirectory + Doc.LinkName;
                    } else {
                        var file = cordova.file.externalDataDirectory + Doc.LinkName;
                    }
                    LoaderService.show();
                    ft.download(
                        uri,
                        file,
                        function (success) {
                            LoaderService.hide();
                            FileUtil.openFile(file, contentType);
                        },
                        function (error) {
                            LoaderService.hide();
                            console.log(error);
                        }
                    );
                } else {
                    // Code to open the link in inappbrowser
                    var ref = CommonMethodsFactory.openInAppBrowser(uri, "_blank", "location=yes");
                }
            };

            $scope.loadChildren = function (childrens) {
                $scope.Children = childrens;
                return "templates/documentLibrary_templates/treeView.html";
            };

            $scope.toggleDropDown = function () {
                $scope.isDropDownOpen = !$scope.isDropDownOpen;
                if (!$scope.isDropDownOpen) {
                    $scope.OpenedDocGroupList = [];
                    for (var i = 0; i < $scope.docTreeView.length; i++) {
                        collapseAll($scope.docTreeView[i])
                    }
                }
            };

            function collapseAll(data) {
                data.IsOpen = false;
                if (data.Children.length > 0) {
                    for (var i = 0; i < data.Children.length; i++) {
                        collapseAll(data.Children[i]);
                    }
                }
            }

            $scope.isOpen = function (data) {
                if ($scope.OpenedDocGroupList.includes(data.Name)) {
                    data.IsOpen = true;
                }
                return data.IsOpen || $scope.isDropDownOpen;
            };

            $scope.expandClose = function (data) {
                if ($scope.OpenedDocGroupList.includes(data.Name))
                    $scope.OpenedDocGroupList.splice($scope.OpenedDocGroupList.indexOf(data.Name), 1);
                else $scope.OpenedDocGroupList.push(data.Name);
                data.IsOpen = !data.IsOpen;
            }

            $scope.loadTreeView = function () {
                return "templates/documentLibrary_templates/documentLibraryTree.html";
            }

            $scope.documentTreeAction = function (doc) {
                const isOfflneDoc = (doc.LinkName && doc.LinkName.length > 0 && doc.Link && doc.Link.length > 0);
                if (isOfflneDoc) {
                    if (doc.DeviceFilePath !== null) {
                        $scope.OpenDLFile(doc);
                    }
                    return;
                }

                switch (doc.DocumentTypeCode) {
                    case "Link":
                        DocumentLibraryUtil.download(doc);
                        break;

                    case "HTML":
                        DocumentLibraryUtil.openHtmlDocument(doc, $scope);
                        break;

                    case "File":
                        $scope.OpenDLFile(doc);
                        break;

                    default:
                        return null;
                }
            };
        }]);
})();


/***/ }),

/***/ "./scripts/controller/favorite.js":
/*!****************************************!*\
  !*** ./scripts/controller/favorite.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var app = angular.module('questionnaire');
  app.controller('favoriteController', ['$scope', 'HomeScreenUtil', '$state', '$timeout',
    'personQuestionnaireManager', 'DocumentLibraryUtil', 'PopupUtil', 'FileUtil',
    'favoritesManager', '$rootScope', 'LoaderService', 'LocalStorageHelper',
      'newsManager', 'userDetailsManager', '$ionicHistory', 'DeviceUtil', 'CommonMethodsFactory', function ($scope, HomeScreenUtil, $state, $timeout, personQuestionnaireManager,
      DocumentLibraryUtil, PopupUtil, FileUtil, favoritesManager,
      $rootScope, LoaderService, LocalStorageHelper,
      newsManager, userDetailsManager, $ionicHistory, DeviceUtil, CommonMethodsFactory) {
      $scope.displayReorderIcon = false;
      $scope.userProfile = userDetailsManager.getUserLastLoggedTimeStamp();
      var customer = HomeScreenUtil.getCustomer();
      var isAutoSync = customer.IsAutoSyncEnabled;
      var fromLogin = window.localStorage.getItem('fromLogin');
      if (fromLogin === "true") {
        autoDownloadSync();
      }

      function autoDownloadSync() {
        // Check isAutoSync enabled of customer setting, if true auto download else show a pop up
        if (isAutoSync === false) {
          var confirmPromise = PopupUtil.confirm($rootScope.getResourceText('LIT_MESSAGE'), $rootScope.getResourceText('MSG_DOWNLOAD_TO_ANSWER'));
          confirmPromise.then(function (success) {
              if (success) {
                LoaderService.show($rootScope.getResourceText('MSG_UPDATING_CHANNELS'));// Setting back the counter to 0, as the user selected on downloading module.

              $timeout(function () {
                downloadDefinations();
              }, 500);
            } else {
              // Removing the entries if user clicks on cancel when autosync is false.
              // fromLogin = second login don't download module
              // loginRedirect = Don't shown the error list of invalid download.
              window.localStorage.removeItem('fromLogin');
                //  window.localStorage.removeItem('loginRedirect');
                var delLoginRedirectProm = DeviceUtil.removeByKeySharedPreferences('loginRedirect');
                delLoginRedirectProm.then(function () {
                    // On successful deletion this function will be called.
                });

                // var fromResume = window.localStorage.getItem('onResume'); // This is added if on resume event, if all the conditions are satisfied and is ready for download
              // If user clicks on cancel button removing onResume boolean value.
              var resumeProm = DeviceUtil.getKeyValueWithSharedPreferences("onResume");
              resumeProm.then(function (fromResume) {
                DeviceUtil.removeByKeySharedPreferences('onResume');
              });
            }
          });
        } else {
          //LoaderService.show($rootScope.getResourceText('MSG_UPDATING_CHANNELS'));
          $timeout(function () {
            var messageUpdChannels = $rootScope.getResourceText('MSG_UPDATING_CHANNELS');
            LoaderService.show(messageUpdChannels); // Before downloading all data for the modules, getting suite details.
            // After successfull download refresh sidemenu and button color events

            var suiteUserPromise = HomeScreenUtil.updateSuiteUserDetails();
            suiteUserPromise.then(function () {
              downloadDefinations();
              $scope.$emit('sideMenuRefresh');
              //$scope.$emit('RenderButtonBgHeaderColor');
                $rootScope.$emit('darkModeEnable');
            });
          }, 500);
        }
      } // Downloading all the modules which the LocalStorageHelper method promise returns and refresh the screen on each module download.


      function downloadDefinations() {
        var customerName = customer.UniqueUrlPart;
        var onlineValue = customer.OnlineVal;
        var userName = $scope.userProfile.UserName;
          var cKey = customer.CKey;
          var suitePromise = LocalStorageHelper.initSuiteDetails(customerName, onlineValue, cKey, customer.IsCustomUrlEnabled);
        suitePromise.then(function (sucess) {
          var userDetailsPromise = LocalStorageHelper.initUserDetails(userName);
          userDetailsPromise.then(function (res) {
            //Next navigate to the Home screen disabling the back for the 
            //next view else the back button will be shown in the home screen.
            $ionicHistory.nextViewOptions({
              disableBack: true
            });
            $ionicHistory.clearHistory();
            $rootScope.$broadcast('initDownload');
            LoaderService.show($rootScope.getResourceText('MSG_UPDATING_CHANNELS'));
          }, function (error) {
             var loaderPromise = LoaderService.hide();
             loaderPromise.then(function () {
              ionicToast.showDefault($rootScope.getResourceText('MSG_NO_CHANNELS'));
              window.localStorage.removeItem('fromLogin');
             });
          });
          // $scope.$emit('RenderButtonBgHeaderColor');
            $rootScope.$emit('darkModeEnable');
          $rootScope.refreshOptions();
        });
      }

      $scope.isFileAlreadyDownloaded = function (docItem) {
        if(docItem){
          const filePath = docItem.DeviceFilePath;
          if(filePath)return true;
        }
        return false;
    };

      $rootScope.$on('favRefresh', function (event, data) {
        var fromLoginVal = window.localStorage.getItem('fromLogin');

        if (fromLoginVal) {
          window.localStorage.removeItem('fromLogin');
        }

        var resumeProm = DeviceUtil.getKeyValueWithSharedPreferences("onResume");
        resumeProm.then(function (fromResume) {
          if (fromResume === "true") {
            document.removeEventListener('resume', onResume.bind(this), true);
          }
        });
      }); // This method gets all the data from each module and clubs it into a single array. 

      $scope.allFavoritesDataList = function () {
        return favoritesManager.getAllFavData();
      };

      $scope.allModList = $scope.allFavoritesDataList();

      $scope.navigateToAnswering = function (userApp, answeringInstance) {
        var moduleVal = userApp.Text;
        var title = userApp.TranslatedText;
        var color = userApp.ColourCode;

        switch (moduleVal) {
          case 'RiskProfile':
          case 'EmployeeSatisfaction':
          case 'ManagementEvaluation':
          case 'HumanResource':
          case 'FrontPlanner':
          case 'Apv':
            // navigate to answering
            var id = answeringInstance.Id;
            var navigateTo = "";
            var pov = "";
            var timerPromise = $timeout(function () {
              var stateVal = $state.current.name;
              var stateVal = 'app.qTabs.active';
              navigateTo = "app.startScreen"; //First : Get whether a already answered not inprogress and notcompleted personquestionnaire exists.

              var existingUnAnsweredPq = personQuestionnaireManager.getUnAnsweredPersonQuestionnaireNonTemplate(id);

              if (existingUnAnsweredPq === null) {  
                //Second: We now get from the PersonQuestionnaireTemplate 
                //and save to the PerosnQuestionnaire 
                //with answeringInProgress = false and answeringCompleted = false.
                var personQueTemplateAnswer = personQuestionnaireManager.getUnAnsweredPersonQuestionnaire(id);
                var savedPq = personQuestionnaireManager.savePersonQuestionniare(personQueTemplateAnswer, null);
                id = savedPq.Id;
              } else { 
                existingUnAnsweredPq.IsTemplate = false;
                id = existingUnAnsweredPq.Id;
              }
                 
              $state.go(navigateTo, {
                id: id,
                state: stateVal,
                viewTitle: title,
                pov: pov,
                modColor: color
              }, {
                reload: false,
                inherit: false,
                notify: true
              });
              $timeout.cancel(timerPromise);
            }, 100);
            break;

          case 'ActionPlan':
            //LoaderService.show();  //Hiding the loader for local operations
            // navigate to answering.
            var id = answeringInstance.Id;
            var timerPromise = $timeout(function () {
              var stateVal = $state.current.name;
              var stateVal = 'app.apwTabs.active';
              $state.go('app.planOfAction', {
                id: id,
                state: stateVal,
                viewTitle: title,
                modColor: color
              }, {
                reload: false,
                inherit: false,
                notify: true
              });
              $timeout.cancel(timerPromise);
            }, 100); //LoaderService.hide();

            break;

          case 'Askade':
            //LoaderService.show();  //Hiding the loader for local operations
            // navigate to answering.
            var id = answeringInstance.FileTypeId;
            var timerPromise = $timeout(function () {
              var stateVal = $state.current.name;
              var stateVal = 'app.akwTabs.active';
              $state.go('app.askade', {
                id: id,
                state: stateVal,
                viewTitle: title,
                modColor: color
              }, {
                reload: false,
                inherit: false,
                notify: true
              });
              $timeout.cancel(timerPromise);
            }, 100); //LoaderService.hide();

            break;

          case 'Claim':
            //LoaderService.show();  //Hiding the loader for local operations
            // navigate to answering.
            var id = answeringInstance.FileTypeId;
            var timerPromise = $timeout(function () {
              var stateVal = $state.current.name;
              var stateVal = 'app.claimTabs.active';
              $state.go('app.claim', {
                id: id,
                state: stateVal,
                viewTitle: title,
                modColor: color
              }, {
                reload: false,
                inherit: false,
                notify: true
              });
              $timeout.cancel(timerPromise);
            }, 100); //LoaderService.hide();

            break;

          default:
            break;
        }
      };

      $scope.openDocument = function (doc) {
        if (doc.GroupName) {
          var stateVal = 'app.documentLibrary';
          $state.go(stateVal, {
            viewTitle: doc.UserApp.TranslatedText,
            type: doc.UserApp.Text,
            modColor: doc.UserApp.ColourCode,
            groupName: doc.GroupName
          });
        } else {
          switch (doc.ItemData.DocumentTypeCode) {
            case 'Link':
              break;

            case 'HTML':
              $scope.openHtmlDocument(doc.ItemData);
              break;

            case 'File':
              $scope.OpenDLFile(doc.ItemData);
              break;

            default:
              return null;
          }
        }
      }; // Open HTML document via a pop up with in an iframe


      $scope.openHtmlDocument = function (htmlDoc) {
        $scope.docModalTitle = htmlDoc.Text;
        var decodedContent = DocumentLibraryUtil.decodeHTMLString(htmlDoc.HtmlContent);
        var content = angular.element('<div/>').html(decodedContent);
        PopupUtil.htmlDocAlert($scope.docModalTitle, content);
      }; // Open a physical file saved in the device


      $scope.OpenDLFile = function (doc) {
        var fileName = doc.FileName;
        var filePath = doc.DeviceFilePath;
        var re = /(?:\.([^.]+))?$/;
        var getExtension = re.exec(fileName)[1];
        var contentType = FileUtil.getContentType(getExtension);
        FileUtil.openFile(filePath, contentType);
      };

      $scope.removeFromFavourites = function (deleteItem) {
          var anim = '<lottie-player src="raw/delete.json" background="transparent" speed="1" id="deleteAnim" autoplay></lottie-player>';
          var contentTitle = $rootScope.getResourceText('LIT_MOBILE_REMOVE');
          var contentLabel = $rootScope.getResourceText('MSG_MOBILE_REMOVE_FAVORITES');
        var confirmPromise = PopupUtil.animConfirm(anim, contentTitle, contentLabel);
          confirmPromise.then(function (success) {
              if (success) {
                  favoritesManager.deleteFromFavorites(deleteItem);
                  refreshFavouritePage();
              }
          });
      };

        $scope.openDocWithLink = function (Doc) {
            var fileName = Doc.LinkName;
            var re = /(?:\.([^.]+))?$/;
            var getExtension = re.exec(fileName)[1];
            var contentType = FileUtil.getContentType(getExtension);
            var uri = Doc.Link;
            // Those links which are documents associated with extention gets downloaded
            // and those without are opened in a inappbrowser
            if (getExtension !== undefined) {
                var ft = new FileTransfer();
                if (ionic.Platform.isIOS()) {
                    var file = cordova.file.dataDirectory + Doc.LinkName;
                } else {
                    var file = cordova.file.externalDataDirectory + Doc.LinkName;
                }
                LoaderService.show();
                ft.download(
                    uri,
                    file,
                    function (success) {
                        LoaderService.hide();
                        FileUtil.openFile(file, contentType);
                    },
                    function (error) {
                        LoaderService.hide();
                        console.log(error);
                    }
                );
            } else {
                // Code to open the link in inappbrowser
                var ref = CommonMethodsFactory.openInAppBrowser(uri, "_blank", "location=yes");
            }
        };

      function refreshFavouritePage() {
        $timeout(function () {
          $scope.allModList = $scope.allFavoritesDataList();
        }, 150);
      }

        $scope.onReorder = function (fromIndex, toIndex) {
            var moved = $scope.allModList.splice(fromIndex, 1);
            var item = moved[0];
            $scope.allModList.splice(toIndex, 0, item);
            favoritesManager.updateReOrderIndex($scope.allModList);
        };
    }]);
})();


/***/ }),

/***/ "./scripts/controller/guideController.js":
/*!***********************************************!*\
  !*** ./scripts/controller/guideController.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var app = angular.module("questionnaire");
  app.controller("guideController", [
    "$scope",
    "$rootScope",
    "$http",
    "$timeout",
    "DeviceUtil",
    "$state",
    function ($scope, $rootScope, $http, $timeout, DeviceUtil, $state) {
      var isIntuneSetUpValue = false;
      var promiseDeviceUtil =
        DeviceUtil.getKeyValueWithSharedPreferences("isIntuneSetUp");
      promiseDeviceUtil.then(
        function (intuneSetpUp) {
          isIntuneSetUpValue = intuneSetpUp;
        },
        function (err) {}
      );

      var resourcesData = [
        {
          cultureCode: "en",
          resources: {
            LIT_MOBILE_GUIDE_END: "Let's get started!",
            MSG_MOBILE_WELCOME_TO: "Welcome To HSEQ Master",
            MSG_MOBILE_WELCOME_LETS_SETUP: "Get started with the app!",
            MSG_MOBILE_WELCOME_FIND_ORGANIZATION: "Find your organization",
            MSG_MOBILE_WELCOME_LINK1:
              "If you have received an HSEQ Master link",
            MSG_MOBILE_WELCOME_LINK2:
              "from your organization, then exit the app",
            MSG_MOBILE_WELCOME_LINK3: "and follow the link.",
            MSG_MOBILE_WELCOME_OR: "or",
            MSG_MOBILE_WELCOME_FIND_MANUALLY: "FIND MANUALLY",
            MSG_MOBILE_WELCOME_MAKE_DIFFERENCE: "Start making a difference",
            MSG_MOBILE_WELCOME_HELPS_OTHERS1: "The HSEQ Master app helps you",
            MSG_MOBILE_WELCOME_HELPS_OTHERS2: "to make a difference to others.",
            MSG_MOBILE_WELCOME_MAKE_REGISTRATION1:
              "Make quick and easy registrations",
            MSG_MOBILE_WELCOME_MAKE_REGISTRATION2:
              "directly from your mobile device.",
            LIT_MOBILE_WELCOME_SKIP: "SKIP",
            LIT_MOBILE_WELCOME_NEXT: "NEXT",
            LIT_MOBILE_WELCOME_DONE: "DONE",
            LIT_MOBILE_WELCOME_BACK: "BACK",
            LIT_MOBILE_HEADER_TITLE: "SafetyNet",
            LIT_MOBILE_WELCOME_TOGGLE: "Toggle",
            LIT_MOBILE_WELCOME_USERNAME: "Username",
            LIT_MOBILE_WELCOME_PASSWORD: "Password",
            LIT_MOBILE_WELCOME_LOGIN: "Login",
            MSG_MOBILE_LOGIN_PASSWORD_TEXT:
              "Velkommen - log ind med dit Safetynet brugernavn og adgangskode.",
            MSG_MOBILE_WELCOME_SELECTED_CUSTOMER: "Selected Customer is ",
            LIT_MOBILE_DEMODK: "DEMODK",
            MSG_MOBILE_WELCOME_DEMODK_LINK:
              "online.safetynet.dk/YourOrganization",
            LIT_MOBILE_WELCOME_CONNECT_TO: "Connect to ",
            LIT_BACK: "Back",
            LIT_MOBILE_WELCOME_SUBMIT: "Submit",
            LIT_MOBILE_WELCOME_TEXT: "Welcome to Safetynet login.",
            LIT_MOBILE_LOGIN_WAYS:
              "You can log in to your organization in two ways:",
            LIT_MOBILE_CUSTOMER_ENVIRONMENT:
              "Tap the field below to scan a QR code or to enter the organization login URL.",
            LIT_MOBILE_TOKEN_LOGIN:
              "Tap the field below if you have received a token URL by email to log in to your organization’s SafetyNet.",
            LIT_MOBILE_TOKEN_SCAN_PLACEHOLDER:
              "Scan QR code or Enter Token URL",
            LIT_CONTINUE: "Continue",
          },
        },
        {
          cultureCode: "da",
          resources: {
            LIT_MOBILE_GUIDE_END: "Lad os komme igang!",
            MSG_MOBILE_WELCOME_TO: "Velkommen til HSEQ Master",
            MSG_MOBILE_WELCOME_LETS_SETUP: "Kom i gang med appen!",
            MSG_MOBILE_WELCOME_FIND_ORGANIZATION: "Find din organisation",
            MSG_MOBILE_WELCOME_LINK1:
              "Hvis du har modtaget et HSEQ Master link",
            MSG_MOBILE_WELCOME_LINK2: "fra din organisation, så gå ud af appen",
            MSG_MOBILE_WELCOME_LINK3: "og følg linket.",
            MSG_MOBILE_WELCOME_OR: "eller",
            MSG_MOBILE_WELCOME_FIND_MANUALLY: "FIND MANUELT",
            MSG_MOBILE_WELCOME_MAKE_DIFFERENCE: "Begynd at gøre en forskel",
            MSG_MOBILE_WELCOME_HELPS_OTHERS1:
              "HSEQ Master appen hjælper dig med",
            MSG_MOBILE_WELCOME_HELPS_OTHERS2: "at gøre en forskel for andre.",
            MSG_MOBILE_WELCOME_MAKE_REGISTRATION1:
              "Lav hurtige og nemme registreringer",
            MSG_MOBILE_WELCOME_MAKE_REGISTRATION2:
              "direkte fra din mobile enhed.",
            LIT_MOBILE_WELCOME_SKIP: "HOP OVER",
            LIT_MOBILE_WELCOME_NEXT: "NÆSTE",
            LIT_MOBILE_WELCOME_DONE: "FÆRDIG",
            LIT_MOBILE_WELCOME_BACK: "TILBAGE",
            LIT_MOBILE_HEADER_TITLE: "SafetyNet",
            LIT_MOBILE_WELCOME_TOGGLE: "Skift",
            LIT_MOBILE_WELCOME_USERNAME: "Brugernavn",
            LIT_MOBILE_WELCOME_PASSWORD: "Adgangskode",
            LIT_MOBILE_WELCOME_LOGIN: "Log på",
            MSG_MOBILE_LOGIN_PASSWORD_TEXT:
              "Velkommen - log ind med dit Safetynet brugernavn og adgangskode.",
            MSG_MOBILE_WELCOME_SELECTED_CUSTOMER: "valgt kunde er ",
            LIT_MOBILE_DEMODK: "DEMODK",
            MSG_MOBILE_WELCOME_DEMODK_LINK:
              "online.safetynet.dk/YourOrganization",
            LIT_MOBILE_WELCOME_CONNECT_TO: "Forbinde til ",
            LIT_BACK: "Tilbage",
            LIT_MOBILE_WELCOME_SUBMIT: "Gem",
            LIT_MOBILE_WELCOME_TEXT: "Velkommen til Safetynet-login.",
            LIT_MOBILE_LOGIN_WAYS:
              "Du kan logge ind på din organisation på to måder:",
            LIT_MOBILE_CUSTOMER_ENVIRONMENT:
              "Tryk på feltet herunder for at scanne en QR-kode eller for at indsætte URL-adresse til organisations log in.",
            LIT_MOBILE_TOKEN_LOGIN:
              "Tryk på feltet herunder, hvis du har modtaget en token-URL på e-mail, for at logge ind på organisations SafetyNet.",
            LIT_MOBILE_TOKEN_SCAN_PLACEHOLDER:
              "Scan for QR kode eller Indsæt Token url",
            LIT_CONTINUE: "Fortsæt",
          },
        },
        {
          cultureCode: "sv",
          resources: {
            LIT_MOBILE_GUIDE_END: "Låt oss komma igång!",
            MSG_MOBILE_WELCOME_TO: "Välkommen till HSEQ Master",
            MSG_MOBILE_WELCOME_LETS_SETUP: "Kom igång med appen!",
            MSG_MOBILE_WELCOME_FIND_ORGANIZATION: "Hitta din organisation",
            MSG_MOBILE_WELCOME_LINK1: "Om du har fått en HSEQ Master-länk",
            MSG_MOBILE_WELCOME_LINK2:
              "från din organisation och avsluta sedan appen",
            MSG_MOBILE_WELCOME_LINK3: "och följ länken.",
            MSG_MOBILE_WELCOME_OR: "eller",
            MSG_MOBILE_WELCOME_FIND_MANUALLY: "HITTA MANUELLT",
            MSG_MOBILE_WELCOME_MAKE_DIFFERENCE: "Börja göra en skillnad",
            MSG_MOBILE_WELCOME_HELPS_OTHERS1: "HSEQ Master-appen hjälper dig",
            MSG_MOBILE_WELCOME_HELPS_OTHERS2: "att göra en skillnad för andra.",
            MSG_MOBILE_WELCOME_MAKE_REGISTRATION1:
              "Gör snabba och enkla registreringar",
            MSG_MOBILE_WELCOME_MAKE_REGISTRATION2:
              "direkt från din mobila enhet.",
            LIT_MOBILE_WELCOME_SKIP: "HOPPA ÖVER",
            LIT_MOBILE_WELCOME_NEXT: "NÄSTA",
            LIT_MOBILE_WELCOME_DONE: "KLAR",
            LIT_MOBILE_WELCOME_BACK: "TILLBAKA",
            LIT_MOBILE_HEADER_TITLE: "SafetyNet",
            LIT_MOBILE_WELCOME_TOGGLE: "Flytta",
            LIT_MOBILE_WELCOME_USERNAME: "Användarnamn",
            LIT_MOBILE_WELCOME_PASSWORD: "Lösenord",
            LIT_MOBILE_WELCOME_LOGIN: "Logga in",
            MSG_MOBILE_LOGIN_PASSWORD_TEXT:
              "Välkommen - logga in med ditt SafetyNet användarnamn och lösenord.",
            MSG_MOBILE_WELCOME_SELECTED_CUSTOMER: "Vald kund är ",
            LIT_MOBILE_DEMODK: "DEMODK",
            MSG_MOBILE_WELCOME_DEMODK_LINK:
              "online.safetynet.dk/YourOrganization",
            LIT_MOBILE_WELCOME_CONNECT_TO: "Koppla till ",
            LIT_BACK: "Tillbaka",
            LIT_MOBILE_WELCOME_SUBMIT: "Skicka in",
            LIT_MOBILE_WELCOME_TEXT: "Välkommen till Safetynet-inloggning.",
            LIT_MOBILE_LOGIN_WAYS:
              "Du kan logga in på din organisation på två sätt:",
            LIT_MOBILE_CUSTOMER_ENVIRONMENT:
              "Tryck på fältet nedan för att skanna en QR-kod eller för att ange URL-adress för att logga in på organisationen.",
            LIT_MOBILE_TOKEN_LOGIN:
              "Klicka på fältet nedan om du har fått en token-URL via e-post för att logga in på organisationens SafetyNet.",
            LIT_MOBILE_TOKEN_SCAN_PLACEHOLDER:
              "Skanna QR-koden eller klistra in Token-UR",
            LIT_CONTINUE: "Fortsätt",
          },
        },
        {
          cultureCode: "nb",
          resources: {
            LIT_MOBILE_GUIDE_END: "La oss komme i gang!",
            MSG_MOBILE_WELCOME_TO: "Velkommen til HSEQ Master",
            MSG_MOBILE_WELCOME_LETS_SETUP: "Kom i gang med appen!",
            MSG_MOBILE_WELCOME_FIND_ORGANIZATION: "Finn din organisasjon",
            MSG_MOBILE_WELCOME_LINK1:
              "Hvis du har mottatt en HSEQ Master-kobling",
            MSG_MOBILE_WELCOME_LINK2:
              "fra organisasjonen din, og avslutt deretter appen",
            MSG_MOBILE_WELCOME_LINK3: "og følg lenken.",
            MSG_MOBILE_WELCOME_OR: "eller",
            MSG_MOBILE_WELCOME_FIND_MANUALLY: "FINN MANUELT",
            MSG_MOBILE_WELCOME_MAKE_DIFFERENCE: "Begynn å gjøre en forskjell",
            MSG_MOBILE_WELCOME_HELPS_OTHERS1: "HSEQ Master-appen hjelper deg",
            MSG_MOBILE_WELCOME_HELPS_OTHERS2: "å gjøre en forskjell for andre.",
            MSG_MOBILE_WELCOME_MAKE_REGISTRATION1:
              "Gjør raske og enkle registreringer",
            MSG_MOBILE_WELCOME_MAKE_REGISTRATION2:
              "direkte fra din mobile enhet.",
            LIT_MOBILE_WELCOME_SKIP: "HOPPE",
            LIT_MOBILE_WELCOME_NEXT: "NESTE",
            LIT_MOBILE_WELCOME_DONE: "FERDIG",
            LIT_MOBILE_WELCOME_BACK: "TILBAKE",
            LIT_MOBILE_HEADER_TITLE: "SafetyNet",
            LIT_MOBILE_WELCOME_TOGGLE: "veksle",
            LIT_MOBILE_WELCOME_USERNAME: "Brukernavn",
            LIT_MOBILE_WELCOME_PASSWORD: "Passord",
            LIT_MOBILE_WELCOME_LOGIN: "Logg Inn",
            MSG_MOBILE_LOGIN_PASSWORD_TEXT:
              "Velkommen - vennligst logg inn med ditt SafetyNet brukernavn og passord.",
            MSG_MOBILE_WELCOME_SELECTED_CUSTOMER: "Valgt kunde er ",
            LIT_MOBILE_DEMODK: "DEMODK",
            MSG_MOBILE_WELCOME_DEMODK_LINK:
              "online.safetynet.dk/YourOrganization",
            LIT_MOBILE_WELCOME_CONNECT_TO: "Koble til ",
            LIT_BACK: "Tilbake",
            LIT_MOBILE_WELCOME_SUBMIT: "sende inn",
            LIT_MOBILE_WELCOME_TEXT: "Velkommen til Safetynet-pålogging.",
            LIT_MOBILE_LOGIN_WAYS:
              "Du kan logge inn på organisasjonen din på to måter:",
            LIT_MOBILE_CUSTOMER_ENVIRONMENT:
              "Trykk på feltet herunder for å skanne en QR-kode eller for å sette inn URL-adresse for organisasjonens innlogging.",
            LIT_MOBILE_TOKEN_LOGIN:
              "Trykk på feltet nedenfor hvis du har mottatt en token-URL på e-post, for å logge inn på organisasjonens SafetyNet.",
            LIT_MOBILE_TOKEN_SCAN_PLACEHOLDER:
              "Skann QR-kode eller lim inn Token-URL",
            LIT_CONTINUE: "Fortsett",
          },
        },
        {
          cultureCode: "de",
          resources: {
            LIT_MOBILE_GUIDE_END: "Fangen wir an!",
            MSG_MOBILE_WELCOME_TO: "Willkommen bei HSEQ Master",
            MSG_MOBILE_WELCOME_LETS_SETUP: "Beginnen Sie mit der App!",
            MSG_MOBILE_WELCOME_FIND_ORGANIZATION:
              "Finden Sie Ihre Organisation",
            MSG_MOBILE_WELCOME_LINK1:
              "Wenn Sie einen HSEQ-Master-Link erhalten haben",
            MSG_MOBILE_WELCOME_LINK2:
              "Beenden Sie dann die App aus Ihrer Organisation",
            MSG_MOBILE_WELCOME_LINK3: "und folgen Sie dem Link.",
            MSG_MOBILE_WELCOME_OR: "oder",
            MSG_MOBILE_WELCOME_FIND_MANUALLY: "MANUELL FINDEN",
            MSG_MOBILE_WELCOME_MAKE_DIFFERENCE: "Machen Sie einen Unterschied",
            MSG_MOBILE_WELCOME_HELPS_OTHERS1: "Die HSEQ Master App hilft Ihnen",
            MSG_MOBILE_WELCOME_HELPS_OTHERS2: "für andere etwas bewirken.",
            MSG_MOBILE_WELCOME_MAKE_REGISTRATION1:
              "Machen Sie schnelle und einfache Registrierungen",
            MSG_MOBILE_WELCOME_MAKE_REGISTRATION2:
              "direkt von Ihrem mobilen Gerät.",
            LIT_MOBILE_WELCOME_SKIP: "ZURÜCK",
            LIT_MOBILE_WELCOME_NEXT: "NÄCHSTER",
            LIT_MOBILE_WELCOME_DONE: "ERLEDIGT",
            LIT_MOBILE_WELCOME_BACK: "ZURÜCK",
            LIT_MOBILE_HEADER_TITLE: "SafetyNet",
            LIT_MOBILE_WELCOME_TOGGLE: "Umschalten",
            LIT_MOBILE_WELCOME_USERNAME: "Nutzername",
            LIT_MOBILE_WELCOME_PASSWORD: "Passwort",
            LIT_MOBILE_WELCOME_LOGIN: "Einloggen",
            MSG_MOBILE_LOGIN_PASSWORD_TEXT:
              "Willkommen - bitte melden Sie sich mit Ihrem SafetyNet-Benutzernamen und Passwort an.",
            MSG_MOBILE_WELCOME_SELECTED_CUSTOMER: "Ausgewählter Kunde ist ",
            LIT_MOBILE_DEMODK: "DEMODK",
            MSG_MOBILE_WELCOME_DEMODK_LINK:
              "online.safetynet.dk/YourOrganization",
            LIT_MOBILE_WELCOME_CONNECT_TO: "Verbunden mit ",
            LIT_BACK: "Zurück",
            LIT_MOBILE_WELCOME_SUBMIT: "einreichen",
            LIT_MOBILE_WELCOME_TEXT: "Willkommen beim Safetynet-Login.",
            LIT_MOBILE_LOGIN_WAYS:
              "Sie können sich auf zwei Arten in Ihre Organisation einloggen:",
            LIT_MOBILE_CUSTOMER_ENVIRONMENT:
              "Drücken Sie das Feld unten, um einen QR-Code zu scannen oder um die URL-Adresse für den Login der Organisation einzufügen.",
            LIT_MOBILE_TOKEN_LOGIN:
              "Klicken Sie auf das Feld unten, wenn Sie eine Token-URL per E-Mail erhalten haben, um sich bei der Sicherheitsnetz Ihres Unternehmens anzumelden.",
            LIT_MOBILE_TOKEN_SCAN_PLACEHOLDER:
              "Scanne den QR-Code oder füge die Token-URL ein",
            LIT_CONTINUE: "Fortsæt",
          },
        },
      ];

      var guideResourceData = [
        {
          cultureCode: "en",
          resources: {
            LIT_MOBILE_GUIDE_ICON_LIST: "ion-ios-list",
            LIT_MOBILE_GUIDE_ICON_CREATE: "ion-android-create",
            LIT_MOBILE_GUIDE_ICON_WARNING: "ion-android-warning",
            LIT_MOBILE_GUIDE_ICON_PAPER: "ion-ios-paper",
            LIT_MOBILE_GUIDE_ICON_CLIPBOARD: "ion-clipboard",
            LIT_MOBILE_GUIDE_ICON_DOCUMENT: "ion-document",
            LIT_MOBILE_GUIDE_SIDEMENU_TEXT1: "Case Management",
            LIT_MOBILE_GUIDE_SIDEMENU_TEXT2: "Claims",
            LIT_MOBILE_GUIDE_SIDEMENU_TEXT3: "Plan of Action",
            LIT_MOBILE_GUIDE_SIDEMENU_TEXT4: "APV",
            LIT_MOBILE_GUIDE_SIDEMENU_TEXT5: "Risk Profile",
            LIT_MOBILE_GUIDE_SIDEMENU_TEXT6: "Documentation",
            LIT_MOBILE_GUIDE_FAVORITES: "Favourites",
            MSG_MOBILE_GUIDE_TITLE1: "Accident",
            MSG_MOBILE_GUIDE_TITLE2: "Near-miss accident",
            MSG_MOBILE_GUIDE_TITLE3: "Violence or Threats",
            MSG_MOBILE_GUIDE_TITLE4: "Damage to vehicles",
            MSG_MOBILE_GUIDE_TITLE5: "Damage to buildings",
            MSG_MOBILE_GUIDE_TITLE6: "Registrer et Problem",
            MSG_MOBILE_GUIDE_TITLE7: "Sikkerhedsrundgang",
            MSG_MOBILE_GUIDE_TITLE8: "Kalibrering - Installationstester",
            MSG_MOBILE_GUIDE_TITLE9: "Opret en simpel Handlingsplan",
            MSG_MOBILE_GUIDE_TITLE10: "APV 2019",
            MSG_MOBILE_GUIDE_TITLE11: "Processer",
            MSG_MOBILE_GUIDE_TITLE12: "ISAE 3000",
            MSG_MOBILE_GUIDE_TITLE13: "Quality",
            MSG_MOBILE_GUIDE_TITLE14: "Documents",
            MSG_MOBILE_GUIDE_DOC1: "Registeret et problem på 2 minutter.",
            MSG_MOBILE_GUIDE_DOC2: "Start sikkerhedsrundgangen her",
            MSG_MOBILE_GUIDE_DOC3: "Registrer kalibrerings resultatet her!",
            MSG_MOBILE_GUIDE_DOC4:
              "Opret en forenklet handlingsplan med denne guide",
            MSG_MOBILE_GUIDE_DOC5: "Start the yearly WPA",
            MSG_MOBILE_GUIDE_INSTRUCTION1: "Find your favorites by going to",
            MSG_MOBILE_GUIDE_INSTRUCTION2: "the side menu. Tap the menu",
            MSG_MOBILE_GUIDE_INSTRUCTION3: "icon and then the star icon.",
            MSG_MOBILE_FAVGUIDE_INSTRUCTION1: "Press and hold the guide",
            MSG_MOBILE_FAVGUIDE_INSTRUCTION2: "to rearrange your favorites.",
            MSG_MOBILE_FAVGUIDE_INSTRUCTION3: "Press the star icon",
            MSG_MOBILE_FAVGUIDE_INSTRUCTION4: "to remove a favorite.",
          },
        },
        {
          cultureCode: "da",
          resources: {
            LIT_MOBILE_GUIDE_ICON_LIST: "ion-ios-list",
            LIT_MOBILE_GUIDE_ICON_CREATE: "ion-android-create",
            LIT_MOBILE_GUIDE_ICON_WARNING: "ion-android-warning",
            LIT_MOBILE_GUIDE_ICON_PAPER: "ion-ios-paper",
            LIT_MOBILE_GUIDE_ICON_CLIPBOARD: "ion-clipboard",
            LIT_MOBILE_GUIDE_ICON_DOCUMENT: "ion-document",
            LIT_MOBILE_GUIDE_SIDEMENU_TEXT1: "Hændelser",
            LIT_MOBILE_GUIDE_SIDEMENU_TEXT2: "Forsikringskrav",
            LIT_MOBILE_GUIDE_SIDEMENU_TEXT3: "Handlingsplaner",
            LIT_MOBILE_GUIDE_SIDEMENU_TEXT4: "APV",
            LIT_MOBILE_GUIDE_SIDEMENU_TEXT5: "Tilsyn",
            LIT_MOBILE_GUIDE_SIDEMENU_TEXT6: "Dokumentation",
            LIT_MOBILE_GUIDE_FAVORITES: "Foretrukne",
            MSG_MOBILE_GUIDE_TITLE1: "Registrer Arbejdsulykke",
            MSG_MOBILE_GUIDE_TITLE2: "Registrer Nærved-hændelse",
            MSG_MOBILE_GUIDE_TITLE3: "Registrer Vold eller Trusler",
            MSG_MOBILE_GUIDE_TITLE4: "Registrer en køretøjsskade",
            MSG_MOBILE_GUIDE_TITLE5: "Registrer en bygningsskade",
            MSG_MOBILE_GUIDE_TITLE6: "Registrer et Problem",
            MSG_MOBILE_GUIDE_TITLE7: "Sikkerhedsrundgang",
            MSG_MOBILE_GUIDE_TITLE8: "Kalibrering - Installationstester",
            MSG_MOBILE_GUIDE_TITLE9: "Opret en simpel Handlingsplan",
            MSG_MOBILE_GUIDE_TITLE10: "APV 2019",
            MSG_MOBILE_GUIDE_TITLE11: "Processer",
            MSG_MOBILE_GUIDE_TITLE12: "ISAE 3000",
            MSG_MOBILE_GUIDE_TITLE13: "Quality",
            MSG_MOBILE_GUIDE_TITLE14: "Dokumenter",
            MSG_MOBILE_GUIDE_DOC1: "Registeret et problem på 2 minutter.",
            MSG_MOBILE_GUIDE_DOC2: "Start sikkerhedsrundgangen her",
            MSG_MOBILE_GUIDE_DOC3: "Registrer kalibrerings resultatet her!",
            MSG_MOBILE_GUIDE_DOC4:
              "Opret en forenklet handlingsplan med denne guide",
            MSG_MOBILE_GUIDE_DOC5: "Start årets APV.",
            MSG_MOBILE_GUIDE_INSTRUCTION1: "Find dine favoritter ved at gå til",
            MSG_MOBILE_GUIDE_INSTRUCTION2: "sidemenuen. Tryk på menu",
            MSG_MOBILE_GUIDE_INSTRUCTION3:
              "ikonet og derefter på stjerne ikonet.",
            MSG_MOBILE_FAVGUIDE_INSTRUCTION1: "Tryk og hold på guide for",
            MSG_MOBILE_FAVGUIDE_INSTRUCTION2: "at omarrangere dine favoritter.",
            MSG_MOBILE_FAVGUIDE_INSTRUCTION3: "Tryk på stjerne for",
            MSG_MOBILE_FAVGUIDE_INSTRUCTION4: "at fjerne en favorit.",
          },
        },
        {
          cultureCode: "sv",
          resources: {
            LIT_MOBILE_GUIDE_ICON_LIST: "ion-ios-list",
            LIT_MOBILE_GUIDE_ICON_CREATE: "ion-android-create",
            LIT_MOBILE_GUIDE_ICON_WARNING: "ion-android-warning",
            LIT_MOBILE_GUIDE_ICON_PAPER: "ion-ios-paper",
            LIT_MOBILE_GUIDE_ICON_CLIPBOARD: "ion-clipboard",
            LIT_MOBILE_GUIDE_ICON_DOCUMENT: "ion-document",
            LIT_MOBILE_GUIDE_SIDEMENU_TEXT1: "Ärende",
            LIT_MOBILE_GUIDE_SIDEMENU_TEXT2: "Kvalitet&Miljö",
            LIT_MOBILE_GUIDE_SIDEMENU_TEXT3: "Handlingsplan",
            LIT_MOBILE_GUIDE_SIDEMENU_TEXT4: "Uppföljning & kontroll",
            LIT_MOBILE_GUIDE_SIDEMENU_TEXT5: "Revision",
            LIT_MOBILE_GUIDE_SIDEMENU_TEXT6: "Dokumentation",
            LIT_MOBILE_GUIDE_FAVORITES: "Favoriter",
            MSG_MOBILE_GUIDE_TITLE1: "Registrer Arbejdsulykke",
            MSG_MOBILE_GUIDE_TITLE2: "Registrer Nærved-hændelse",
            MSG_MOBILE_GUIDE_TITLE3: "Registrer Vold eller Trusler",
            MSG_MOBILE_GUIDE_TITLE4: "Registrer en køretøjsskade",
            MSG_MOBILE_GUIDE_TITLE5: "Registrer en bygningsskade",
            MSG_MOBILE_GUIDE_TITLE6: "Registrer et Problem",
            MSG_MOBILE_GUIDE_TITLE7: "Sikkerhedsrundgang",
            MSG_MOBILE_GUIDE_TITLE8: "Kalibrering - Installationstester",
            MSG_MOBILE_GUIDE_TITLE9: "Opret en simpel Handlingsplan",
            MSG_MOBILE_GUIDE_TITLE10: "APV 2019",
            MSG_MOBILE_GUIDE_TITLE11: "Processer",
            MSG_MOBILE_GUIDE_TITLE12: "ISAE 3000",
            MSG_MOBILE_GUIDE_TITLE13: "Quality",
            MSG_MOBILE_GUIDE_TITLE14: "Dokument",
            MSG_MOBILE_GUIDE_DOC1: "Registeret et problem på 2 minutter.",
            MSG_MOBILE_GUIDE_DOC2: "Start sikkerhedsrundgangen her",
            MSG_MOBILE_GUIDE_DOC3: "Registrer kalibrerings resultatet her!",
            MSG_MOBILE_GUIDE_DOC4:
              "Opret en forenklet handlingsplan med denne guide",
            MSG_MOBILE_GUIDE_DOC5: "Start årets APV.",
            MSG_MOBILE_GUIDE_INSTRUCTION1:
              "Hitta dina favoriter genom att gå till",
            MSG_MOBILE_GUIDE_INSTRUCTION2: "sidmenyn. Klicka på menyn",
            MSG_MOBILE_GUIDE_INSTRUCTION3: "ikonen och sedan på stjärnikonen.",
            MSG_MOBILE_FAVGUIDE_INSTRUCTION1: "Tryck och håll på guide för",
            MSG_MOBILE_FAVGUIDE_INSTRUCTION2: "att ordna om dina favoriter.",
            MSG_MOBILE_FAVGUIDE_INSTRUCTION3: "Tryck stjärnan för",
            MSG_MOBILE_FAVGUIDE_INSTRUCTION4: "att ta bort en favorit.",
          },
        },
        {
          cultureCode: "nb",
          resources: {
            LIT_MOBILE_GUIDE_ICON_LIST: "ion-ios-list",
            LIT_MOBILE_GUIDE_ICON_CREATE: "ion-android-create",
            LIT_MOBILE_GUIDE_ICON_WARNING: "ion-android-warning",
            LIT_MOBILE_GUIDE_ICON_PAPER: "ion-ios-paper",
            LIT_MOBILE_GUIDE_ICON_CLIPBOARD: "ion-clipboard",
            LIT_MOBILE_GUIDE_ICON_DOCUMENT: "ion-document",
            LIT_MOBILE_GUIDE_SIDEMENU_TEXT1: "Arbeidsskade",
            LIT_MOBILE_GUIDE_SIDEMENU_TEXT2: "Forsikringskrav",
            LIT_MOBILE_GUIDE_SIDEMENU_TEXT3: "Handlingsplan",
            LIT_MOBILE_GUIDE_SIDEMENU_TEXT4: "Arbeidsmiljøundersøkelse",
            LIT_MOBILE_GUIDE_SIDEMENU_TEXT5: "Spørreundersøkelser",
            LIT_MOBILE_GUIDE_SIDEMENU_TEXT6: "Dokumentasjon",
            LIT_MOBILE_GUIDE_FAVORITES: "Favoritter",
            MSG_MOBILE_GUIDE_TITLE1: "Registrer Arbejdsulykke",
            MSG_MOBILE_GUIDE_TITLE2: "Registrer Nærved-hændelse",
            MSG_MOBILE_GUIDE_TITLE3: "Registrer Vold eller Trusler",
            MSG_MOBILE_GUIDE_TITLE4: "Registrer en køretøjsskade",
            MSG_MOBILE_GUIDE_TITLE5: "Registrer en bygningsskade",
            MSG_MOBILE_GUIDE_TITLE6: "Registrer et Problem",
            MSG_MOBILE_GUIDE_TITLE7: "Sikkerhedsrundgang",
            MSG_MOBILE_GUIDE_TITLE8: "Kalibrering - Installationstester",
            MSG_MOBILE_GUIDE_TITLE9: "Opret en simpel Handlingsplan",
            MSG_MOBILE_GUIDE_TITLE10: "APV 2019",
            MSG_MOBILE_GUIDE_TITLE11: "Processer",
            MSG_MOBILE_GUIDE_TITLE12: "ISAE 3000",
            MSG_MOBILE_GUIDE_TITLE13: "Quality",
            MSG_MOBILE_GUIDE_TITLE14: "Dokumenter",
            MSG_MOBILE_GUIDE_DOC1: "Registeret et problem på 2 minutter.",
            MSG_MOBILE_GUIDE_DOC2: "Start sikkerhedsrundgangen her",
            MSG_MOBILE_GUIDE_DOC3: "Registrer kalibrerings resultatet her!",
            MSG_MOBILE_GUIDE_DOC4:
              "Opret en forenklet handlingsplan med denne guide",
            MSG_MOBILE_GUIDE_DOC5: "Start årets APV.",
            MSG_MOBILE_GUIDE_INSTRUCTION1: "Finn favorittene dine ved å gå til",
            MSG_MOBILE_GUIDE_INSTRUCTION2: "sidemenyen. Trykk på menyen",
            MSG_MOBILE_GUIDE_INSTRUCTION3:
              "ikonet og deretter på stjerneikonet.",
            MSG_MOBILE_FAVGUIDE_INSTRUCTION1: "Trykk og hold på guide for",
            MSG_MOBILE_FAVGUIDE_INSTRUCTION2:
              "å omorganisere favorittene dine.",
            MSG_MOBILE_FAVGUIDE_INSTRUCTION3: "Trykk på stjerne for",
            MSG_MOBILE_FAVGUIDE_INSTRUCTION4: "å fjerne en favoritt.",
          },
        },
        {
          cultureCode: "de",
          resources: {
            LIT_MOBILE_GUIDE_ICON_LIST: "ion-ios-list",
            LIT_MOBILE_GUIDE_ICON_CREATE: "ion-android-create",
            LIT_MOBILE_GUIDE_ICON_WARNING: "ion-android-warning",
            LIT_MOBILE_GUIDE_ICON_PAPER: "ion-ios-paper",
            LIT_MOBILE_GUIDE_ICON_CLIPBOARD: "ion-clipboard",
            LIT_MOBILE_GUIDE_ICON_DOCUMENT: "ion-document",
            LIT_MOBILE_GUIDE_SIDEMENU_TEXT1: "Arbeitsunfall",
            LIT_MOBILE_GUIDE_SIDEMENU_TEXT2: "Versicherungsansprüche",
            LIT_MOBILE_GUIDE_SIDEMENU_TEXT3: "Aktionsplan",
            LIT_MOBILE_GUIDE_SIDEMENU_TEXT4: "Arbeitsplatzbeurteilung",
            LIT_MOBILE_GUIDE_SIDEMENU_TEXT5: "Risikoprofil",
            LIT_MOBILE_GUIDE_SIDEMENU_TEXT6: "Dokumentation",
            LIT_MOBILE_GUIDE_FAVORITES: "Favorit",
            MSG_MOBILE_GUIDE_TITLE1: "Registrer Arbejdsulykke",
            MSG_MOBILE_GUIDE_TITLE2: "Registrer Nærved-hændelse",
            MSG_MOBILE_GUIDE_TITLE3: "Registrer Vold eller Trusler",
            MSG_MOBILE_GUIDE_TITLE4: "Registrer en køretøjsskade",
            MSG_MOBILE_GUIDE_TITLE5: "Registrer en bygningsskade",
            MSG_MOBILE_GUIDE_TITLE6: "Registrer et Problem",
            MSG_MOBILE_GUIDE_TITLE7: "Sikkerhedsrundgang",
            MSG_MOBILE_GUIDE_TITLE8: "Kalibrering - Installationstester",
            MSG_MOBILE_GUIDE_TITLE9: "Opret en simpel Handlingsplan",
            MSG_MOBILE_GUIDE_TITLE10: "APV 2019",
            MSG_MOBILE_GUIDE_TITLE11: "Processer",
            MSG_MOBILE_GUIDE_TITLE12: "ISAE 3000",
            MSG_MOBILE_GUIDE_TITLE13: "Quality",
            MSG_MOBILE_GUIDE_TITLE14: "Unterlagen",
            MSG_MOBILE_GUIDE_DOC1: "Registeret et problem på 2 minutter.",
            MSG_MOBILE_GUIDE_DOC2: "Start sikkerhedsrundgangen her",
            MSG_MOBILE_GUIDE_DOC3: "Registrer kalibrerings resultatet her!",
            MSG_MOBILE_GUIDE_DOC4:
              "Opret en forenklet handlingsplan med denne guide",
            MSG_MOBILE_GUIDE_DOC5: "Start årets APV.",
            MSG_MOBILE_GUIDE_INSTRUCTION1: "Finden sie ihre favoriten, gehen",
            MSG_MOBILE_GUIDE_INSTRUCTION2:
              "sie zum seitenmenü. Tippen sie auf das menüsymbol",
            MSG_MOBILE_GUIDE_INSTRUCTION3: "und dann auf das sternsymbol.",
            MSG_MOBILE_FAVGUIDE_INSTRUCTION1:
              "Tippen und halten sie das führungs,",
            MSG_MOBILE_FAVGUIDE_INSTRUCTION2:
              "um ihre favoriten neu anzuordnen.",
            MSG_MOBILE_FAVGUIDE_INSTRUCTION3: "Halten den stern gedrückt,",
            MSG_MOBILE_FAVGUIDE_INSTRUCTION4:
              "um einen favoriten zu entfernen.",
          },
        },
      ];

      $scope.slideHasChanged = function (index) {
        $scope.screenIndex = index;
        $scope.welcomeIndex = index;
      };

      function getLineHeight() {
        var deviceHeight = window.screen.height * window.devicePixelRatio;
        var screenHeight = window.screen.height;
        var isIOS = ionic.Platform.isIOS() && ionic.Platform.isIPad() === false;
        var isIPAD = ionic.Platform.isIPad();
        if (isIOS) {
          if (screenHeight <= 800) {
            return 57;
          } else {
            return 50;
          }
        } else if (isIPAD) {
          if (screenHeight < 1080) {
            return 72;
          } else {
            return 67;
          }
        } else {
          if (deviceHeight <= 2000) {
            return 56;
          } else if (deviceHeight <= 2300) {
            return 52;
          } else if (deviceHeight <= 2500) {
            return 50;
          } else {
            return 55;
          }
        }
      }

      $scope.getLineHeightForWelcome = function () {
        var lineHeight = getLineHeight();
        lineHeight = lineHeight + 13 + "%";
        return {
          top: lineHeight,
        };
      };

      $scope.getLineHeightForFav = function () {
        var isIOS = ionic.Platform.isIOS() && ionic.Platform.isIPad() === false;
        var isIPAD = ionic.Platform.isIPad();
        var screenHeight = window.screen.height;
        var lineHeight = getLineHeight();
        if (isIOS) {
          if (screenHeight < 800) {
            lineHeight = lineHeight + 8;
          } else {
            lineHeight = lineHeight + 13;
          }
        } else if (isIPAD) {
          if (screenHeight < 1080) {
            lineHeight = lineHeight + 5;
          } else {
            lineHeight = lineHeight + 10;
          }
        } else {
          lineHeight = lineHeight + 13;
        }
        lineHeight = lineHeight + "%";
        return {
          top: lineHeight,
        };
      };

      $scope.onWelcomeScreenFinish = function () {
        var tokenSharedProm =
          DeviceUtil.getKeyValueWithSharedPreferences("token");
        $scope.$emit("RenderButtonBgHeaderColor");
        $timeout(function () {
          $scope.$emit("OnlyWelcomeBgColor", {
            isWelcome: false,
          });
        }, 200);
        //screen.unlockOrientation();
        if (ionic.Platform.isAndroid()) {
          screen.orientation.unlock();
        }
        tokenSharedProm
          .then(function (token) {
            $state.go("app.home");
          })
          .catch(function (err) {});
        StatusBar.show();
        onGuideFinish();
      };

      $scope.loadStyleProperties = function () {
        $timeout(function () {
          $scope.$emit("OnlyWelcomeBgColor", {
            isWelcome: true,
          });
        }, 500);
        this.loadStatusBar(true);
      };

      $scope.loadStatusBar = function (shouldHide) {
        var bgColor = "#ffffff";
        if (shouldHide) {
          StatusBar.hide();
          bgColor = "#ffffff";
        } else {
          StatusBar.show();
          bgColor = "#5176A1";
        }
        StatusBar.backgroundColorByHexString(bgColor);
        document.documentElement.style.setProperty(
          "--statusbar-bg-color",
          bgColor
        );
      };

      $scope.next = function () {
        $scope.$broadcast("slideBox.nextSlide");
      };

      $scope.welcomeNext = function () {
        $scope.welcomeIndex = $scope.welcomeIndex + 1;
        $scope.$broadcast("slideBox.nextSlide");
      };

      navigator.globalization.getPreferredLanguage(function (language) {
        var lang = language.value;
        window.localStorage.setItem("deviceLang", lang);
      });

      function getResourceByResourceSet(resourceSet, id) {
        var language = window.localStorage.getItem("deviceLang");
        var resourceLabelText = "";

        if (language) {
          var twoLetterLang = language.substring(0, 2);
          var languageBasedResourceSet = resourceSet.filter(function (rs) {
            return rs.cultureCode === twoLetterLang;
          });

          if (!languageBasedResourceSet) {
            languageBasedResourceSet = resourceSet.filter(function (rs) {
              return rs.cultureCode === "da";
            });
          }
          var langResourceSet = languageBasedResourceSet[0].resources;
          resourceLabelText = langResourceSet[id];
        }

        if (resourceLabelText.length === 0) {
          resourceLabelText = id;
        }
        return resourceLabelText;
      }

      $rootScope.getResourceLabelText = function (id) {
        return getResourceByResourceSet(resourcesData, id);
      };

      $rootScope.getGuideResourceLabelText = function (id) {
        return getResourceByResourceSet(guideResourceData, id);
      };

      $scope.slideChanged = function (index) {
        $scope.slideIndex = index;
        $scope.favGuideScreenIndex = index;
        $scope.loadSlides(index);
      };

      $scope.loadSlides = function (index) {
        if (index !== null && index !== undefined && index === 0) {
          $scope.slidesPath = "templates/favourite_guide/homeGuide.html";
        } else if (index === 1) {
          $scope.slidesPath = "templates/favourite_guide/favouriteGuide.html";
        } else {
          // since the page is loaded based on index value the inital index value is null so this
          // else condition is used to display the initial page
          $scope.slidesPath = "templates/favourite_guide/homeGuide.html";
        }
      };

      $scope.getDeviceVal = function () {
        var agent = navigator.userAgent;
        var isAndroid = agent.indexOf("Android") > 0;
        var isSmallScreen =
          screen.width < 767 || (isAndroid && screen.width < 1000);

        if (isSmallScreen) {
          return true;
        } else {
          return false;
        }
      };

      function onGuideFinish() {
        if (isIntuneSetUpValue) {
          $state.go("login");
        } else {
          $state.go("toggleUrl");
        }
      }
    },
  ]);
})();


/***/ }),

/***/ "./scripts/controller/home.js":
/*!************************************!*\
  !*** ./scripts/controller/home.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    var app = angular.module("questionnaire");

    app.constant("NewsBellLoad", {
        newsUpdated: false,
    });

    app.run([
        "LoaderService",
        "$state",
        "$rootScope",
        "$ionicHistory",
        "$ionicPlatform",
        "$timeout",
        "PopupUtil",
        function (
            LoaderService,
            $state,
            $rootScope,
            $ionicHistory,
            $ionicPlatform,
            $timeout,
            PopupUtil
        ) {
            //Consider removeing this since the pop up is now
            //handled in the errorModule.js methods defined.
            function errorMessage() {
                //Processing post message...
            }

            $rootScope.$on("Error", function (event, data) {
                LoaderService.hide();
                navigator.notification.alert(
                    data.Message,
                    errorMessage,
                    "safetyNet",
                    "Ok"
                );
            }); //MainMenu.html controller is homeController hence added a method in home.js

            $rootScope.myGoBack = function (hardwareNavigate) {
                var state = $state.current.name;

                switch (state) {
                    //APV
                    case "app.qTabs.active":
                    case "app.qTabs.inProgress":
                    case "app.qTabs.completed": //ActionPlan

                    case "app.apwTabs.active":
                    case "app.apwTabs.inProgress":
                    case "app.apwTabs.completed": //RiskProfile

                    case "app.rTabs.active":
                    case "app.rTabs.inProgress":
                    case "app.rTabs.completed": //EmployeeSatisfaction

                    case "app.eTabs.active":
                    case "app.eTabs.inProgress":
                    case "app.eTabs.completed": //HumanResource

                    case "app.hTabs.active":
                    case "app.hTabs.inProgress":
                    case "app.hTabs.completed": //ManagementEvaluation

                    case "app.mTabs.active":
                    case "app.mTabs.inProgress":
                    case "app.mTabs.completed":
                    case "app.fpTabs.active":
                    case "app.fpTabs.inProgress":
                    case "app.fpTabs.completed": //  Askade

                    case "app.akwTabs.active":
                    case "app.akwTabs.inProgress":
                    case "app.akwTabs.completed": //  Claim

                    case "app.claimTabs.active":
                    case "app.claimTabs.inProgress":
                    case "app.claimTabs.completed":
                        // Handling the scenario where user finishes answering and presses submit button,
                        // then on hardware back button / nav bar's back button press, the app should be taken to home screen
                        var from = $ionicHistory.backView().stateName;

                        if (
                            from === "app.apv" ||
                            from === "app.planOfAction" ||
                            from === "app.riskProfile" ||
                            from === "app.humanResource" ||
                            from === "app.employeeSatisfaction" ||
                            from === "app.managementEvaluation" ||
                            from === "app.askade" ||
                            from === "app.claim"
                        ) {
                            $ionicHistory.nextViewOptions({
                                disableBack: true,
                            });
                            $state.go("app.home");
                            hardwareNavigate = false;
                        } else {
                            hardwareNavigate = true;
                        }

                        break;

                    case "app.startScreen":
                        var fromView = $ionicHistory.backView().stateName;

                        if (
                            fromView === "app.apv" ||
                            fromView === "app.riskProfile" ||
                            fromView === "app.humanResource" ||
                            fromView === "app.employeeSatisfaction" ||
                            fromView === "app.managementEvaluation"
                        ) {
                            $ionicHistory.removeBackView();
                            $ionicHistory.goBack();
                            hardwareNavigate = false;
                        } else {
                            hardwareNavigate = true;
                        }

                        break;

                    case "app.myProfile":
                        var saveCheck = angular
                            .element(document.querySelector(".saveSettings"))
                            .css("border");

                        if (saveCheck.includes("rgb(184, 62, 44)")) {
                            hardwareNavigate = false;
                            var anim =
                                '<lottie-player src="raw/generalQuestion.json" background="transparent" speed="1" id="questionAnim" autoplay></lottie-player>';
                            var contentTitle = $rootScope.getResourceText("LIT_SAVE");
                            var contentLabel = $rootScope.getResourceText(
                                "MSG_MOBILE_UNSAVE_SETTING"
                            );
                            var confirmPromise = PopupUtil.animConfirm(
                                anim,
                                contentTitle,
                                contentLabel
                            );
                            if (confirmPromise) {
                                confirmPromise.then(function (success) {
                                    if (success) {
                                        $rootScope.unSaveChanges();
                                        $timeout(function () {
                                            $ionicHistory.goBack();
                                        }, 5000);
                                        hardwareNavigate = true;
                                    } else {
                                        hardwareNavigate = true;
                                        $ionicHistory.goBack();
                                    }
                                });
                            }
                        } else {
                            hardwareNavigate = true;
                            $ionicHistory.goBack();
                        }
                        break;

                    case "app.favorite":
                    case "app.surveyTabs.active":
                    case "app.surveyTabs.history":
                        $ionicHistory.nextViewOptions({
                            disableBack: true,
                        });
                        $state.go("app.home");
                        hardwareNavigate = false;
                        break;

                    default:
                        hardwareNavigate = true;
                        break;
                }

                if (hardwareNavigate === true) {
                    $ionicHistory.goBack();
                }

                var data = { hardwareBack: hardwareNavigate, state };
                $rootScope.$broadcast("backPressed", data);
            };
        },
    ]);
    app.controller("homeController", [
        "$scope",
        "$state",
        "$rootScope",
        "LoaderService",
        "LocalStorageHelper",
        "$timeout",
        "AppMessages",
        "$q",
        "ionicToast",
        "HomeScreenUtil",
        "PopupUtil",
        "DeviceUtil",
        "personQuestionnaireManager",
        "ResetPoolUtil",
        "$ionicPlatform",
        "favoritesManager",
        "newsManager",
        "NewsBellLoad",
        "AuthenticationService",
        "$interval",
        "customersManager",
        "personApwManager",
        "personAskadeFileTypeWizardManager",
        "CommonMethodsFactory",
        "GeneralUtil",
        function (
            $scope,
            $state,
            $rootScope,
            LoaderService,
            LocalStorageHelper,
            $timeout,
            AppMessages,
            $q,
            ionicToast,
            HomeScreenUtil,
            PopupUtil,
            DeviceUtil,
            personQuestionnaireManager,
            ResetPoolUtil,
            $ionicPlatform,
            favoritesManager,
            newsManager,
            NewsBellLoad,
            AuthenticationService,
            $interval,
            customersManager,
            personApwManager,
            personAskadeFileTypeWizardManager,
            CommonMethodsFactory,
            GeneralUtil
        ) {

            function keyboardShowHandler(e) {
                cordova.plugins.Keyboard.disableScroll(true);
                var footerList = document.getElementsByClassName("footer");
                if (footerList.length > 0) {
                    footerList[0].style.display = "none";
                }
            }

            function keyboardHideHandler(e) {
                cordova.plugins.Keyboard.disableScroll(false);
                var footerList = document.getElementsByClassName("footer");
                if (footerList.length > 0) {
                    footerList[0].style.display = "block";
                }
            }

            $ionicPlatform.ready(function () {
                window.addEventListener("native.keyboardshow", keyboardShowHandler);
                window.addEventListener("native.keyboardhide", keyboardHideHandler);

                var loggedInUserDetails = HomeScreenUtil.getUserDetails();

                function subscribeTopics(subscriptionTopicList) {
                    if (subscriptionTopicList) {
                        var topicSplitList = subscriptionTopicList.split("|");

                        var existingSubscribedTopicList = window.localStorage.getItem(
                            "subscribedTopicList"
                        );
                        if (!existingSubscribedTopicList) {
                            existingSubscribedTopicList = "";
                        }

                        var apiTopicList = topicSplitList;
                        var existingSubscribedTopicListData =
                            existingSubscribedTopicList.split("|");

                        var newSubscriptionList = [];
                        for (var index = 0; index < apiTopicList.length; index++) {
                            var apiTopic = apiTopicList[index];
                            if (existingSubscribedTopicListData.indexOf(apiTopic) < 0) {
                                newSubscriptionList.push(apiTopic);
                            }
                        }
                        var allTopics =
                            existingSubscribedTopicListData.concat(newSubscriptionList);
                        window.localStorage.setItem(
                            "subscribedTopicList",
                            allTopics.join("|")
                        );

                        if (newSubscriptionList.length > 0) {
                            window.pushutility(
                                "subscribe",
                                newSubscriptionList,
                                function (echoValue) {
                                    //console.log(echoValue); // should alert true.
                                }
                            );
                        }
                    }
                }

                var subscriptionTopicList =
                    loggedInUserDetails.NotificationSubscriptionTopics;
                var localNotificationTimeInterval =
                    loggedInUserDetails.LocalNotificationTimeInterval;

                if (!localNotificationTimeInterval) {
                    localNotificationTimeInterval = 5;
                }

                setTimeout(function () {
                    subscribeTopics(subscriptionTopicList);
                }, 1000);

                function addMinutes(date, minutesToAdd) {
                    var dateString = date;
                    var parts = dateString.split(" ");
                    var dateParts = parts[0].split("-");
                    var timeParts = parts[1].split(":");
                    var year = parseInt(dateParts[2], 10);
                    var month = parseInt(dateParts[1], 10) - 1; // Months are zero-based
                    var day = parseInt(dateParts[0], 10);
                    var hours = parseInt(timeParts[0], 10);
                    var minutes = parseInt(timeParts[1], 10);
                    var seconds = parseInt(timeParts[2], 10);

                    var date = new Date(year, month, day, hours, minutes, seconds);
                    date.setMinutes(date.getMinutes() + minutesToAdd);
                    return date;
                }

                function checkIfAnswerNeedsTobeNotified(
                    questionnaireId,
                    questionnaireName,
                    notifyUsersViaLocalNotificationAfterTimeElapsed,
                    questionnaireAnswers,
                    dataTextField
                ) {
                    var needsToBeNotified = false;
                    var questionnairesPending = [];

                    questionnaireAnswers.forEach(function (answerForQuestionnaire) {
                        var answer = answerForQuestionnaire[dataTextField];
                        var newDateWithUpdatedTimeLimit = addMinutes(
                            answer.CompletedDate,
                            notifyUsersViaLocalNotificationAfterTimeElapsed
                        );
                        var presentDate = new Date();

                        if (presentDate > newDateWithUpdatedTimeLimit) {
                            var hasQuestionnaire = questionnairesPending.some(function (
                                item
                            ) {
                                return item.Id === questionnaireId;
                            });
                            if (hasQuestionnaire === false) {
                                questionnairesPending.push({
                                    Id: questionnaireId,
                                    Name: questionnaireName,
                                });
                            }
                        }
                    });
                    //alert(questionnairesPending);
                    return questionnairesPending;
                }

                function processLocalNotification(
                    completedQuestionnairesList,
                    dataTextAnswerField,
                    dataTextValueField,
                    moduleName,
                    questionnaireTimeLimit,
                    isInPgrogress
                ) {
                    var inProgressText = isInPgrogress ? "InProgress" : "";
                    if (completedQuestionnairesList.length === 0) {
                        //No Answers if previously marked for local notification remove them then....
                        window.localStorage.setItem(
                            "notifiedQuestionnaires" + moduleName,
                            "" + inProgressText
                        );
                    }
                    //alert(moduleName + "#########" + completedQuestionnairesList.length);
                    if (completedQuestionnairesList.length > 0) {
                        var notifiedQuestionnaires = window.localStorage.getItem(
                            "notifiedQuestionnaires" + moduleName + inProgressText
                        );
                        notifiedQuestionnaires = notifiedQuestionnaires
                            ? notifiedQuestionnaires
                            : "";

                        var alreadyNotifiedQuestionnairesList =
                            notifiedQuestionnaires === ""
                                ? []
                                : notifiedQuestionnaires.split("*");

                        var needsToBeNotifiedList = [];
                        if (completedQuestionnairesList.length > 0) {
                            completedQuestionnairesList.forEach(function (questionnaireItem) {
                                var questionnaireAnswers = questionnaireItem.Answers;
                                var questionnaire =
                                    questionnaireAnswers[0][dataTextAnswerField][
                                    dataTextValueField
                                    ];
                                var newId = questionnaire.Id
                                    ? questionnaire.Id
                                    : questionnaire.FileTypeId;

                                if (questionnaireAnswers.length === 0) {
                                    // A questionnaire which is answered and is notified but now there are no answers (Deleted/Uploaded/Reset from the clearing storage space..)
                                    // needs to be removed...

                                    var indexToBeRemoved =
                                        alreadyNotifiedQuestionnairesList.indexOf(newId);
                                    if (indexToBeRemoved >= 0) {
                                        alreadyNotifiedQuestionnairesList.splice(
                                            indexToBeRemoved,
                                            1
                                        );
                                    }
                                    window.localStorage.setItem(
                                        moduleName + inProgressText + newId,
                                        ""
                                    );
                                }
                                var newListneedsToBeNotifiedList =
                                    checkIfAnswerNeedsTobeNotified(
                                        newId,
                                        questionnaire.Name,
                                        questionnaireTimeLimit,
                                        questionnaireAnswers,
                                        dataTextAnswerField
                                    );

                                needsToBeNotifiedList = needsToBeNotifiedList.concat(
                                    newListneedsToBeNotifiedList
                                );
                            });
                            //alert(moduleName + "%%%%%%" + needsToBeNotifiedList.length);
                        }
                        var remainingToBeNotifiedList = [];
                        needsToBeNotifiedList.forEach(function (ntb) {
                            if (alreadyNotifiedQuestionnairesList.indexOf(ntb.Id) < 0) {
                                remainingToBeNotifiedList.push(ntb);
                                alreadyNotifiedQuestionnairesList.push(ntb.Id);
                                window.localStorage.setItem(
                                    moduleName + inProgressText + ntb.Id,
                                    Date.now().toString()
                                );
                            }
                            var lastQuestionnairePublishDateNotification =
                                window.localStorage.getItem(
                                    moduleName + inProgressText + ntb.Id
                                );
                            if (lastQuestionnairePublishDateNotification) {
                                var newTimeStamp =
                                    parseInt(lastQuestionnairePublishDateNotification) +
                                    questionnaireTimeLimit * 60000;
                                var newDate = new Date(newTimeStamp);
                                var presentReDate = new Date();

                                //alert(newTimeStamp);d
                                //alert(newDate);
                                //alert(presentReDate);
                                //alert(Date.now() > newTimeStamp);

                                if (Date.now() > newTimeStamp) {
                                    var indexToBeRemovedNoti =
                                        alreadyNotifiedQuestionnairesList.indexOf(ntb.Id);
                                    if (indexToBeRemovedNoti >= 0) {
                                        //alreadyNotifiedQuestionnairesList.splice(indexToBeRemovedNoti, 1);
                                        remainingToBeNotifiedList.push(ntb);
                                        //window.localStorage.setItem('notifiedQuestionnaires'+ moduleName, alreadyNotifiedQuestionnairesList.join('|'));
                                        window.localStorage.setItem(
                                            moduleName + inProgressText + ntb.Id,
                                            Date.now().toString()
                                        );
                                    }
                                }
                            }
                        });
                        //alert(moduleName + "---" + remainingToBeNotifiedList.length);
                        if (remainingToBeNotifiedList.length > 0) {
                            //alert(remainingToBeNotifiedList.length+'--'+moduleName);
                            window.localStorage.setItem(
                                "notifiedQuestionnaires" + moduleName + inProgressText,
                                alreadyNotifiedQuestionnairesList.join("*")
                            );

                            // Extract only the Name values
                            var namesArray = remainingToBeNotifiedList.map(function (item) {
                                return item.Name;
                            });

                            // Join the names with a comma
                            var joinedNames = namesArray.join(", ");

                            //Notify locally
                            /*window.pushutility('shownotification',['Kemisk risikovurdering af kemikalie - 14636 -v23.1.13 - department publish','In this updated version of the code, we added the routeData parameter to the method signature. We then create a mutable copy of routeData and update its title and','t=1&t2=e'], function(echoValue) {
                        });*/
                            var isInProgressQS = isInPgrogress ? "&ip=1" : "";
                            var routeData =
                                "moduleName=" + moduleName + "&id=-1" + isInProgressQS;

                            var inProgressNotifText = isInPgrogress
                                ? "in-progress "
                                : "completed ";

                            var notifTitle =
                                "Pending " +
                                inProgressNotifText +
                                " list that needs action : " +
                                moduleName;
                            /** */
                            setTimeout(function () {
                                window.pushutility(
                                    "shownotification",
                                    [notifTitle, joinedNames, routeData],
                                    function (echoValue) { }
                                );
                            }, 2000);
                            //alert(routeData);
                        }
                    }
                }
                //Start
                function userDefinedAutoUploadInX() {
                    var timeStamp = window.localStorage.getItem("ts");
                    if (!timeStamp) {
                        window.localStorage.setItem("ts", Date.now());
                    }

                    if ($rootScope.userDefinedPromise != null) {
                        $interval.cancel($rootScope.userDefinedPromise);
                    }

                    var userDefinedIntervalPromise = $interval(function () {
                        var customer = customersManager.getCustomers();
                        //Will be null on reset
                        if (customer != null) {
                            var isOnline = DeviceUtil.isDeviceOnline();
                            var isAutoUploadDelayInMinutesEnabled =
                                customer.AutoUploadDelayInMinutes != 0 &&
                                customer.AutoUploadDelayInMinutes != null &&
                                customer.AutoUploadDelayInMinutes != undefined;
                            if (
                                customer.IsAutoSyncEnabled &&
                                isAutoUploadDelayInMinutesEnabled &&
                                isOnline === true &&
                                !customer.IsDemoCustomer
                            ) {
                                var userDefinedTimeoutInMinutes =
                                    customer.AutoUploadDelayInMinutes;
                                var userDefinedTimeoutInSeconds =
                                    userDefinedTimeoutInMinutes * 60;
                                var timeStamp = parseInt(window.localStorage.getItem("ts"));
                                var elaspedTimeInSeconds = (Date.now() - timeStamp) / 1000;
                                var promiseDeviceUtil =
                                    DeviceUtil.getKeyValueWithSharedPreferences("token");
                                promiseDeviceUtil.then(
                                    function (loggedToken) {
                                        if (elaspedTimeInSeconds >= userDefinedTimeoutInSeconds) {
                                            window.localStorage.setItem("ts", Date.now());
                                            $rootScope.$emit("performSyncBackground", {});
                                        }
                                    },
                                    function (reason) {
                                        $interval.cancel(userDefinedIntervalPromise);
                                        if (elaspedTimeInSeconds < userDefinedTimeoutInSeconds) {
                                            window.localStorage.removeItem("ts");
                                            $interval.cancel($rootScope.userDefinedPromise);
                                        }
                                    }
                                );
                            } else {
                                var pendingUploadforQuestionnaires =
                                    HomeScreenUtil.hasAllModuleQuestionnaireCompletedWithAutoUploadDelayElapsed();
                                var pendingUploadforActionPlans =
                                    HomeScreenUtil.hasDelayedActionPlans2Upload();
                                var pendingUploadforAskade =
                                    HomeScreenUtil.hasDelayedAskadeList2Upload();
                                var pendingUploadforClaims =
                                    HomeScreenUtil.hasDelayedClaimList2Upload();

                                if (
                                    pendingUploadforQuestionnaires ||
                                    pendingUploadforActionPlans ||
                                    pendingUploadforAskade ||
                                    pendingUploadforClaims
                                ) {
                                    $rootScope.$emit("performSyncBackgroundForAutoUpload", {});
                                }
                            }

                            var questionnaireTimeLimit = localNotificationTimeInterval;
                            //var questionnaireTimeLimit = 1;
                            $scope.userApplicationsDetails.forEach(function (userApp, ij) {
                                // Rest of the code inside the loop
                                var completedQuestionnairesList = [];
                                var moduleName = userApp.Text;

                                switch (moduleName) {
                                    case "Askade":
                                    case "Claim":
                                        {
                                            var completedAskadeList =
                                                personAskadeFileTypeWizardManager.getCompletedPCaseList(
                                                    moduleName
                                                );
                                            if (completedAskadeList.length > 0) {
                                                //alert(JSON.stringify(completedAskadeList[0]));
                                                setTimeout(function () {
                                                    processLocalNotification(
                                                        completedAskadeList,
                                                        "PersonAskadeAnswer",
                                                        "AskadeFileTypeWizard",
                                                        moduleName,
                                                        questionnaireTimeLimit,
                                                        false
                                                    );
                                                }, 500);
                                            }

                                            //For inProgress section
                                            var InprogressAskadeList =
                                                personAskadeFileTypeWizardManager.getInProgressPCaseList(
                                                    moduleName
                                                );

                                            if (InprogressAskadeList.length > 0) {
                                                setTimeout(function () {
                                                    processLocalNotification(
                                                        InprogressAskadeList,
                                                        "PersonAskadeAnswer",
                                                        "AskadeFileTypeWizard",
                                                        moduleName,
                                                        questionnaireTimeLimit,
                                                        true
                                                    );
                                                }, 700);
                                            }
                                        }

                                        break;
                                    case "ActionPlan":
                                        {
                                            var completedActionPlanList =
                                                personApwManager.getCompletedPersonAPWList();
                                            if (completedActionPlanList.length > 0) {
                                                setTimeout(function () {
                                                    processLocalNotification(
                                                        completedActionPlanList,
                                                        "PersonApwAnswer",
                                                        "Wizard",
                                                        moduleName,
                                                        questionnaireTimeLimit,
                                                        false
                                                    );
                                                }, 500);
                                            }

                                            //In-Progress action plan

                                            var inProgressActionPlanList =
                                                personApwManager.getInProgressPersonAPWList();
                                            if (inProgressActionPlanList.length > 0) {
                                                setTimeout(function () {
                                                    processLocalNotification(
                                                        inProgressActionPlanList,
                                                        "PersonApwAnswer",
                                                        "Wizard",
                                                        moduleName,
                                                        questionnaireTimeLimit,
                                                        true
                                                    );
                                                }, 800);
                                            }
                                        }
                                        break;
                                    case "RiskProfile":
                                    case "Apv":
                                    case "EmployeeSatisfaction":
                                    case "ManagementEvaluation":
                                    case "HumanResource":
                                        {
                                            completedQuestionnairesList =
                                                personQuestionnaireManager.getCompletedQuestionnairesList(
                                                    moduleName
                                                );
                                            if (completedQuestionnairesList.length > 0) {
                                                setTimeout(function () {
                                                    processLocalNotification(
                                                        completedQuestionnairesList,
                                                        "PersonQuestionnaire",
                                                        "Questionnaire",
                                                        moduleName,
                                                        questionnaireTimeLimit,
                                                        false
                                                    );
                                                }, 900);
                                            }

                                            //In-Progress questionnaire modules...
                                            var inprogressQuestionnairesList =
                                                personQuestionnaireManager.getInProgressQuestionnairesList(
                                                    moduleName
                                                );

                                            if (inprogressQuestionnairesList.length > 0) {
                                                setTimeout(function () {
                                                    processLocalNotification(
                                                        inprogressQuestionnairesList,
                                                        "PersonQuestionnaire",
                                                        "Questionnaire",
                                                        moduleName,
                                                        questionnaireTimeLimit,
                                                        true
                                                    );
                                                }, 777);
                                            }
                                        }
                                        break;
                                    case "DocumentLibrary":
                                        break;
                                    default:
                                        break;
                                }
                            });

                            //------END-------------
                        }
                    }, 5000);

                    $rootScope.userDefinedPromise = userDefinedIntervalPromise;
                }
                //End

                userDefinedAutoUploadInX();

                if (LocalStorageHelper.IsInititalized()) {
                    var onResume = function onResume() {
                        // App is restored from pause state.
                        // Get the current state name. Check if the current is not equal to login or toggleUrl.
                        // This is because user has logged out of the application.
                        var currentStateName = $state.current.name;

                        if (
                            currentStateName !== "login" &&
                            currentStateName !== "toggleUrl"
                        ) {
                            // Refresh customer values in resume event
                            var customerVal = HomeScreenUtil.getCustomer();
                            isAutoSync = customerVal.IsAutoSyncEnabled;

                            //Need to add cleanup and missing survey calls here

                            var resumeProm =
                                DeviceUtil.getKeyValueWithSharedPreferences("onResume");
                            resumeProm.then(function (fromResume) {
                                if (customerVal.NextUpdate) {
                                    // Get the difference date between start date and current date
                                    var diffDate = HomeScreenUtil.getLastDownloadStartDate();

                                    if (diffDate >= customerVal.NextUpdate) {
                                        window.localStorage.setItem("onResume", true); // Navigate back to home screen when user pauses the app while in other screen
                                        // By this home controller values are refreshed which are not yet loaded
                                        var resumeProm =
                                            DeviceUtil.setKeyValueWithSharedPreferences(
                                                "onResume",
                                                true
                                            );
                                        resumeProm.then(function () {
                                            $state.go("app.home");
                                            $timeout(function () {
                                                autoDownloadOnNextUpdate();
                                            }, 10);
                                        });
                                    }
                                }
                            });
                        }
                    };

                    //To update bell Icon whenever we open the app
                    //Timeout is added because loading Toast message is not shown
                    setTimeout(function () {
                        if (NewsBellLoad.newsUpdated == false) {
                            NewsBellLoad.newsUpdated = true;
                            // LoaderService.show();
                            var downloadNewsData = LocalStorageHelper.getNewsDataDetails();
                            downloadNewsData.then(
                                function (success) {
                                    getUnReadCount();
                                    // LoaderService.hide();
                                },
                                function (fail) {
                                    LoaderService.hide();
                                }
                            );
                        }
                    }, 400);

                    var autoDownloadOnNextUpdate = function autoDownloadOnNextUpdate() {
                        var customerVal = HomeScreenUtil.getCustomer(); // Only if below boolean variable is enabled then download of all the modules data is done.

                        var enableNextAutoUpdate = customerVal.EnableNextAutoUpdate;

                        if (enableNextAutoUpdate) {
                            $timeout(function () {
                                var messageUpdChannels = $rootScope.getResourceText(
                                    "MSG_UPDATING_CHANNELS"
                                );
                                LoaderService.show(messageUpdChannels); // Set the onResume flag variable to true

                                window.localStorage.setItem("onResume", true); // Before downloading all data for the modules, getting suite details.
                                // After successfull download refresh sidemenu and button color events
                                var resumeProm = DeviceUtil.setKeyValueWithSharedPreferences(
                                    "onResume",
                                    true
                                );
                                resumeProm.then(function () {
                                    var suiteUserPromise =
                                        HomeScreenUtil.updateSuiteUserDetails();
                                    suiteUserPromise.then(
                                        function () {
                                            $rootScope.totalCounter = 0;
                                            downloadDefinations();
                                            $scope.$emit("sideMenuRefresh");
                                            // $scope.$emit('RenderButtonBgHeaderColor');
                                            $rootScope.$emit("darkModeEnable");
                                        },
                                        function (fail) {
                                            // Removing the boolean field if any error occurs while downloading user details
                                            var resumeProm =
                                                DeviceUtil.getKeyValueWithSharedPreferences("onResume");
                                            resumeProm.then(function (fromResume) {
                                                DeviceUtil.removeByKeySharedPreferences("onResume");
                                            });
                                        }
                                    );
                                });
                            }, 500);
                        } else {
                            // Removing onResume flag if enableNextAutoUpdate is false

                            var resumeProm =
                                DeviceUtil.getKeyValueWithSharedPreferences("onResume");
                            resumeProm.then(function (fromResume) {
                                DeviceUtil.removeByKeySharedPreferences("onResume");
                            });
                        }
                    };

                    var autoDownloadSync = function autoDownloadSync() {
                        // Check isAutoSync enabled of customer setting, if true auto download else show a pop up
                        if (isAutoSync === false) {
                            // Incrementing the counter, so that Invalid module list pop up is not shown when autosync is false
                            $rootScope.totalCounter += 1;
                            var confirmPromise = PopupUtil.confirm(
                                $rootScope.getResourceText("LIT_MESSAGE"),
                                $rootScope.getResourceText("MSG_DOWNLOAD_TO_ANSWER")
                            );
                            confirmPromise.then(function (success) {
                                if (success) {
                                    LoaderService.show(
                                        $rootScope.getResourceText("MSG_UPDATING_CHANNELS")
                                    ); // Setting back the counter to 0, as the user selected on downloading module.

                                    $timeout(function () {
                                        $rootScope.totalCounter = 0;
                                        downloadDefinations();
                                        getUnReadCount();
                                    }, 500);
                                } else {
                                    // Removing the entries if user clicks on cancel when autosync is false.
                                    // fromLogin = second login don't download module
                                    // loginRedirect = Don't shown the error list of invalid download.
                                    window.localStorage.removeItem("fromLogin");
                                    // window.localStorage.removeItem('loginRedirect');
                                    var delLoginRedirectPrm =
                                        DeviceUtil.removeByKeySharedPreferences("loginRedirect");
                                    delLoginRedirectPrm.then(function () {
                                        // On successful deletion this function will be called.
                                    });
                                    // This is added if on resume event, if all the conditions are satisfied and is ready for download
                                    // If user clicks on cancel button removing onResume boolean value.
                                    var resumeProm =
                                        DeviceUtil.getKeyValueWithSharedPreferences("onResume");
                                    resumeProm.then(function (fromResume) {
                                        DeviceUtil.removeByKeySharedPreferences("onResume");
                                    });
                                }
                            });
                        } else {
                            //LoaderService.show($rootScope.getResourceText('MSG_UPDATING_CHANNELS'));
                            $timeout(function () {
                                var messageUpdChannels = $rootScope.getResourceText(
                                    "MSG_UPDATING_CHANNELS"
                                );
                                LoaderService.show(messageUpdChannels); // Before downloading all data for the modules, getting suite details.
                                // After successfull download refresh sidemenu and button color events
                                var suiteUserPromise = HomeScreenUtil.updateSuiteUserDetails();
                                suiteUserPromise.then(function () {
                                    $rootScope.totalCounter = 0;
                                    downloadDefinations();
                                    getUnReadCount();
                                    $scope.$emit("sideMenuRefresh");
                                    // $scope.$emit('RenderButtonBgHeaderColor');
                                    $rootScope.$emit("darkModeEnable");
                                });
                            }, 500);
                        }
                    }; // Downloading all the modules which the LocalStorageHelper method promise returns and refresh the screen on each module download.

                    var downloadDefinations = function downloadDefinations() {
                        var logIdPromList = LocalStorageHelper.initDownloadNew();
                        var promList = logIdPromList.promiseList;
                        $scope.logId = logIdPromList.logId;
                        promiseListLength = promList.length; // If there are no channels are configured then display a toast message

                        if (promList.length > 0) {
                            for (var i = 0; i < promList.length; i++) {
                                promList[i].then(
                                    function (successMod) {
                                        $rootScope.totalCounter += 1;
                                        $timeout(function () {
                                            $rootScope.$emit("refresh");
                                        }, 100);
                                        if ($rootScope.totalCounter === 1) {
                                            // Removing the fromLogin Boolean value once a module is downloaded,
                                            // This scenario is for, when the user closes the app and returns back the auto download should not happen.
                                            window.localStorage.removeItem("fromLogin");
                                        }
                                        if ($rootScope.totalCounter === promList.length) {
                                            triggerDocumentPopUp();
                                            LoaderService.hide();
                                        }
                                    },
                                    function (fail) {
                                        $rootScope.totalCounter += 1;
                                        console.log(fail);
                                        if ($rootScope.totalCounter === promList.length) {
                                            triggerDocumentPopUp();
                                            LoaderService.hide();
                                        }
                                    }
                                );
                            }
                        } else {
                            var loaderPromise = LoaderService.hide();
                            loaderPromise.then(function () {
                                ionicToast.showDefault(
                                    $rootScope.getResourceText("MSG_NO_CHANNELS")
                                );
                                window.localStorage.removeItem("fromLogin");
                            });
                        }
                    };

                    function triggerDocumentPopUp() {
                        var scannedCodePromise = DeviceUtil.getKeyValueWithSharedPreferences("scannedCode");
                        scannedCodePromise.then(function (scannedCode) {
                            $rootScope.$emit("ShowAssetPopUp", { code: scannedCode });
                        });
                    }
                    var getUnReadCount = function getUnReadCount() {
                        var unReadVal = newsManager.getUnReadNewsCount();
                        $scope.$emit("unReadValue", unReadVal);
                    }; // Calling the below method on load of home screen for a scenario where user has clicked master reset button
                    // After deleting all the existing data control navigates to home screen

                    var refreshAll = function refreshAll() {

                        if (isAPVDownloadValid === true) {
                            refreshApv(apvDisplayData, apvInprogressCount, apvCompletedCount);
                        }

                        if (isActionPlanDownloadValid === true) {
                            refreshApw(apwDisplayData, apwInprogressCount, apwCompletedCount);
                        }

                        if (isRiskProfileDownloadValid === true) {
                            refreshRiskProfile(
                                riskProfileDisplayData,
                                riskProfileInprogressCount,
                                riskProfileCompletedCount
                            );
                        }

                        if (isEmployeeSatisfactionDownloadValid === true) {
                            refreshEmployeeSatisfaction(
                                employeeSatisfactionDisplayData,
                                employeeSatisfactionInprogressCount,
                                employeeSatisfactionCompletedCount
                            );
                        }

                        if (isHumanResourceDownloadValid === true) {
                            refreshHumanResource(
                                humanResourceDisplayData,
                                humanResourceInprogressCount,
                                humanResourceCompletedCount
                            );
                        }

                        if (isManagementEvaluationDownloadValid === true) {
                            refreshManagementEvaluation(
                                managementEvaluationDisplayData,
                                managementEvaluationInprogressCount,
                                managementEvaluationCompletedCount
                            );
                        }

                        if (isFrontPlannerDownloadValid === true) {
                            refreshFrontPlanner(
                                frontPlannerDisplayData,
                                frontPlannerInprogressCount,
                                frontPlannerCompletedCount
                            );
                        }

                        if (isAskadeDownloadValid === true) {
                            refreshAskade(
                                askadeDisplayData,
                                askadeInprogressCount,
                                askadeCompletedCount
                            );
                        }

                        if (isClaimDownloadValid === true) {
                            refreshClaim(
                                claimDisplayData,
                                claimInprogressCount,
                                claimCompletedCount
                            );
                        }

                        if (isDLDownloadValid === true) {
                            refreshDocumentLibrary(dlDocumentData);
                        }

                        if (isAPVDownloadValid === true || isRiskProfileDownloadValid === true || isFrontPlannerDownloadValid === true ||
                            isEmployeeSatisfactionDownloadValid === true || isManagementEvaluationDownValid === true || isHumanResourceDownValid === true) {
                            SetWeek();
                        }
                    };

                    var refreshByModule = function refreshByModule(
                        moduleName,
                        displayData,
                        inprogressCount,
                        completedCount
                    ) {
                        switch (moduleName) {
                            case "RiskProfile":
                                refreshRiskProfile(
                                    displayData,
                                    inprogressCount,
                                    completedCount
                                );
                                break;

                            case "EmployeeSatisfaction":
                                refreshEmployeeSatisfaction(
                                    displayData,
                                    inprogressCount,
                                    completedCount
                                );
                                break;

                            case "ManagementEvaluation":
                                refreshManagementEvaluation(
                                    displayData,
                                    inprogressCount,
                                    completedCount
                                );
                                break;

                            case "FrontPlanner":
                                refreshFrontPlanner(
                                    displayData,
                                    inprogressCount,
                                    completedCount
                                );
                                break;

                            case "HumanResource":
                                refreshHumanResource(
                                    displayData,
                                    inprogressCount,
                                    completedCount
                                );
                                break;

                            case "Apv":
                                refreshApv(displayData, inprogressCount, completedCount);
                                break;

                            case "Askade":
                                refreshAskade(displayData, inprogressCount, completedCount);
                                break;

                            case "Claim":
                                refreshClaim(displayData, inprogressCount, completedCount);
                                break;

                            case "DocumentLibrary":
                                refreshDocumentLibrary(displayData);
                                break;

                            default:
                                break;
                        }
                    };

                    var refreshApv = function refreshApv(
                        apvData,
                        inProgressCount,
                        completedCount
                    ) {
                        $scope.questionnaireList = apvData;
                        $scope.questionnaireInProgressList = inProgressCount;
                        $scope.questionnaireCompletedList = completedCount;
                    };

                    var refreshApw = function refreshApw(
                        apwData,
                        inProgressCount,
                        completedCount
                    ) {
                        $scope.actionPlanWizardList = apwData;
                        $scope.actionPlanWizardInProgressList = inProgressCount;
                        $scope.actionPlanWizardCompletedList = completedCount;
                    };

                    var refreshRiskProfile = function refreshRiskProfile(
                        riskProfileData,
                        inProgressCount,
                        completedCount
                    ) {
                        $scope.riskProfileList = riskProfileData;
                        $scope.riskProfileInProgressList = inProgressCount;
                        $scope.riskProfileCompletedList = completedCount;
                    };

                    var refreshHumanResource = function refreshHumanResource(
                        hrData,
                        inProgressCount,
                        completedCount
                    ) {
                        $scope.humanResourceList = hrData;
                        $scope.humanResourceInProgressList = inProgressCount;
                        $scope.humanResourceCompletedList = completedCount;
                    };

                    var refreshEmployeeSatisfaction =
                        function refreshEmployeeSatisfaction(
                            esData,
                            inProgressCount,
                            completedCount
                        ) {
                            $scope.employeeSatisfactionList = esData;
                            $scope.employeeSatisfactionInProgressList = inProgressCount;
                            $scope.employeeSatisfactionCompletedList = completedCount;
                        };

                    var refreshManagementEvaluation =
                        function refreshManagementEvaluation(
                            meData,
                            inProgressCount,
                            completedCount
                        ) {
                            $scope.managementEvaluationList = meData;
                            $scope.managementEvaluationInProgressList = inProgressCount;
                            $scope.managementEvaluationCompletedList = completedCount;
                        };

                    var refreshFrontPlanner = function refreshFrontPlanner(
                        fpData,
                        inProgressCount,
                        completedCount
                    ) {
                        $scope.frontPlannerList = fpData;
                        $scope.frontPlannerInProgressList = inProgressCount;
                        $scope.frontPlannerCompletedList = completedCount;
                    };

                    var refreshAskade = function refreshAskade(
                        askadeData,
                        inProgressCount,
                        completedCount
                    ) {
                        $scope.askadeList = askadeData;
                        $scope.askadeInProgressList = inProgressCount;
                        $scope.askadeCompletedList = completedCount;
                    };

                    var refreshDocumentLibrary = function refreshDocumentLibrary(
                        dlDocumentData
                    ) {
                        $scope.documentTypeList = dlDocumentData;
                    };

                    var refreshClaim = function refreshClaim(
                        claimData,
                        inProgressCount,
                        completedCount
                    ) {
                        $scope.claimList = claimData;
                        $scope.claimInProgressList = inProgressCount;
                        $scope.claimCompletedList = completedCount;
                    };

                    var validateData = function validateData(invalidList) {
                        var downloadListMessage = invalidList.join();

                        if (invalidList.length > 0) {
                            AppMessages.Error(
                                $rootScope.getResourceText("LIT_MESSAGE"),
                                $rootScope.getResourceText("MSG_ERROR_DOWNLOADING_MODULE") +
                                " " +
                                downloadListMessage +
                                " " +
                                $rootScope.getResourceText("MSG_PLEASE_TRY_AGAIN")
                            );
                        }

                        // window.localStorage.removeItem('loginRedirect');
                        var delLoginRedirectPrm =
                            DeviceUtil.removeByKeySharedPreferences("loginRedirect");
                        delLoginRedirectPrm.then(function () {
                            // On successful deletion this function will be called.
                        });
                    };

                    var refreshWithNewData = function refreshWithNewData() {
                        //Apv
                        var isAPVDownValid = HomeScreenUtil.isAPVDownloadValid();
                        var updatedAPVList = HomeScreenUtil.getApvDisplayData();
                        var updatedAPVInProgress = HomeScreenUtil.getApvInProgressCount();
                        var updatedAPVCompleted = HomeScreenUtil.getApvCompletedCount(); //Action Plan

                        var isActionPlanDownValid =
                            HomeScreenUtil.isActionPlanDownloadValid();
                        var updatedActionPlanProblemList =
                            HomeScreenUtil.getActionPlanProblemDisplayData();
                        var updatedActionPlanProblemInProgress =
                            HomeScreenUtil.getActionPlanProblemInprogressCount();
                        var updatedActionPlanProblemCompleted =
                            HomeScreenUtil.getActionPlanProblemCompletedCount(); //Risk Profile

                        var isRiskProfileDownValid =
                            HomeScreenUtil.isRiskProfileDownloadValid();
                        var updatedRiskProfileList =
                            HomeScreenUtil.getRiskProfileDisplayData();
                        var updatedRiskProfileInProgress =
                            HomeScreenUtil.getRiskProfileInProgressCount();
                        var updatedRiskProfileCompleted =
                            HomeScreenUtil.getRiskProfileCompletedCount(); // Employee Satisfaction

                        var isEmployeeSatisfactionDownValid =
                            HomeScreenUtil.isEmployeeSatisfactionDownloadValid();
                        var updatedEmployeeSatisfactionList =
                            HomeScreenUtil.getEmployeeSatisfactionDisplayData();
                        var updatedEmployeeSatisfactionInProgress =
                            HomeScreenUtil.getEmployeeSatisfactionInProgressCount();
                        var updatedEmployeeSatisfactionCompleted =
                            HomeScreenUtil.getEmployeeSatisfactionCompletedCount(); //Human Resource

                        var isHumanResourceDownValid =
                            HomeScreenUtil.isHumanResourceDownloadValid();
                        var updatedHumanResourceList =
                            HomeScreenUtil.getHumanResourceDisplayData();
                        var updatedHumanResourceInProgress =
                            HomeScreenUtil.getHumanResourceInProgressCount();
                        var updatedHumanResourceCompleted =
                            HomeScreenUtil.getHumanResourceCompletedCount(); // Management Evaluation

                        var isManagementEvaluationDownValid =
                            HomeScreenUtil.isManagementEvaluationDownloadValid();
                        var updatedManagementEvaluationList =
                            HomeScreenUtil.getManagementEvaluationDisplayData();
                        var updatedManagementEvaluationInProgress =
                            HomeScreenUtil.getManagementEvaluationInProgressCount();
                        var updatedManagementEvaluationCompleted =
                            HomeScreenUtil.getManagementEvaluationCompletedCount(); // FrontPlanner

                        var isFrontPlannerDownValid =
                            HomeScreenUtil.isFrontPlannerDownloadValid();
                        var updatedFrontPlannerList =
                            HomeScreenUtil.getFrontPlannerDisplayData();
                        var updatedFrontPlannerInProgress =
                            HomeScreenUtil.getFrontPlannerInProgressCount();
                        var updatedFrontPlannerCompleted =
                            HomeScreenUtil.getFrontPlannerCompletedCount(); // Askade

                        var isAskadeDownValid = HomeScreenUtil.isAskadeDownloadValid();
                        var updatedAskadeList = HomeScreenUtil.getAskadeDisplayData();
                        var updatedAskadeInProgress =
                            HomeScreenUtil.getAskadeInprogressCount();
                        var updatedAskadeCompleted =
                            HomeScreenUtil.getAskadeCompletedCount(); // Claim

                        var isClaimDownValid = HomeScreenUtil.isClaimDownloadValid();
                        var updatedClaimList = HomeScreenUtil.getClaimDisplayData();
                        var updatedClaimInProgress =
                            HomeScreenUtil.getClaimInprogressCount();
                        var updatedClaimCompleted = HomeScreenUtil.getClaimCompletedCount();

                        // Document Library
                        var isDLDownValid = HomeScreenUtil.isDLDownloadValid();
                        var updatedDLDocumentList = HomeScreenUtil.getDLDocumentTypeData();

                        if (isAskadeDownValid === true) {
                            refreshAskade(
                                updatedAskadeList,
                                updatedAskadeInProgress,
                                updatedAskadeCompleted
                            );
                        }

                        if (isClaimDownValid === true) {
                            refreshClaim(
                                updatedClaimList,
                                updatedClaimInProgress,
                                updatedClaimCompleted
                            );
                        }

                        if (isAPVDownValid === true) {
                            refreshApv(
                                updatedAPVList,
                                updatedAPVInProgress,
                                updatedAPVCompleted
                            );
                        }

                        if (isActionPlanDownValid === true) {
                            refreshApw(
                                updatedActionPlanProblemList,
                                updatedActionPlanProblemInProgress,
                                updatedActionPlanProblemCompleted
                            );
                        }

                        if (isRiskProfileDownValid === true) {
                            refreshRiskProfile(
                                updatedRiskProfileList,
                                updatedRiskProfileInProgress,
                                updatedRiskProfileCompleted
                            );
                        }

                        if (isEmployeeSatisfactionDownValid === true) {
                            refreshEmployeeSatisfaction(
                                updatedEmployeeSatisfactionList,
                                updatedEmployeeSatisfactionInProgress,
                                updatedEmployeeSatisfactionCompleted
                            );
                        }

                        if (isHumanResourceDownValid === true) {
                            refreshHumanResource(
                                updatedHumanResourceList,
                                updatedHumanResourceInProgress,
                                updatedHumanResourceCompleted
                            );
                        }

                        if (isManagementEvaluationDownValid === true) {
                            refreshManagementEvaluation(
                                updatedManagementEvaluationList,
                                updatedManagementEvaluationInProgress,
                                updatedManagementEvaluationCompleted
                            );
                        }

                        if (isFrontPlannerDownValid === true) {
                            refreshFrontPlanner(
                                updatedFrontPlannerList,
                                updatedFrontPlannerInProgress,
                                updatedFrontPlannerCompleted
                            );
                        }

                        if (isDLDownValid === true) {
                            refreshDocumentLibrary(updatedDLDocumentList);
                        } //if ($scope.isTileDisplayEnable) {

                        if (isAPVDownValid === true || isRiskProfileDownValid === true || isFrontPlannerDownValid === true ||
                            isEmployeeSatisfactionDownValid === true || isManagementEvaluationDownValid === true || isHumanResourceDownValid === true) {
                            SetWeek();
                        }

                        customer = HomeScreenUtil.getCustomer();
                        $scope.isTileDisplayEnable = customer.IsTileDisplayEnable;
                        $scope.loadHomeTemplate(); //$scope.allModList = $scope.allHomeScreenModuleDataList();
                        //}
                    };

                    // Boolean value set only in the login view, so as to start the download the module
                    var fromLogin = window.localStorage.getItem("fromLogin");
                    $scope.showHome = false;
                    $scope.isDeviceIPad = false; // Adding default empty array values

                    $scope.allModData = [];
                    $scope.allModList = [];
                    ionic.DomUtil.ready(function () {
                        $scope.showHome = true;
                    });
                    var isIPad = ionic.Platform.isIPad();

                    if (isIPad) {
                        $scope.isDeviceIPad = true;
                    } else {
                        $scope.isDeviceIPad = false;
                    }

                    var customer = HomeScreenUtil.getCustomer();
                    var isAutoSync = customer.IsAutoSyncEnabled; // Handling the scenario for the second login where data is present, and a download is not necessary
                    var invalidDownladList = HomeScreenUtil.getInvalidDownloadList(); // Initializing the variables with a default value

                    var promiseListLength = 0;
                    $rootScope.totalCounter = 0;
                    $scope.isTileDisplayEnable = customer.IsTileDisplayEnable; // Addng a emit of Side menu refresh for a scenario where module has no access but user would have pending answers.
                    // When manually user deletes the answer if module has no access that should bee deleted.

                    $scope.$emit("sideMenuRefresh"); // Below condition satisfies only when the user is navigating from the login screen,
                    // Other wise it enters into else condition.

                    var guideInstructionProm =
                        DeviceUtil.getKeyValueWithSharedPreferences("guideInstruction");
                    guideInstructionProm
                        .then(function (data) { })
                        .catch(function () {
                            var setProm = DeviceUtil.setKeyValueWithSharedPreferences(
                                "guideInstruction",
                                false
                            );
                            setProm.then(function () {
                                LoaderService.hide();
                                if (!customer.DisableFavoritesGuideDisplay) {
                                    $state.go("sideapp");
                                }
                            });
                        });

                    if (fromLogin === "true") {
                        autoDownloadSync();
                    } else {
                        if (customer.NextUpdate) {
                            // Fetch the date difference (Difference between start date and current date)
                            // Get the onResume flag saved in localstorage and check for null. (If on resume event already a download is initiated)
                            var diffDate = HomeScreenUtil.getLastDownloadStartDate();
                            var resumeProm =
                                DeviceUtil.getKeyValueWithSharedPreferences("onResume");
                            resumeProm
                                .then(function (fromPause) {
                                    if (diffDate >= customer.NextUpdate) {
                                        autoDownloadOnNextUpdate();
                                    }
                                })
                                .catch(function (error) {
                                    if (diffDate >= customer.NextUpdate) {
                                        autoDownloadOnNextUpdate();
                                    }
                                });
                        }
                    }

                    $timeout(function () {
                        //   var loginRedirect = window.localStorage.getItem('loginRedirect');
                        var getLoginRedirectPrm =
                            DeviceUtil.getKeyValueWithSharedPreferences("loginRedirect");
                        getLoginRedirectPrm
                            .then(function (loginRedirect) {
                                if (loginRedirect === "true" && isAutoSync === true) {
                                    var invalidList = HomeScreenUtil.getInvalidDownloadList();
                                    validateData(invalidList);
                                }
                            })
                            .catch(function (error) {
                                if (isAutoSync === true) {
                                    var invalidList = HomeScreenUtil.getInvalidDownloadList();
                                    validateData(invalidList);
                                }
                            });
                    }, 1000);
                }

                document.addEventListener("resume", onResume.bind(this), false);

                getUnReadCount(); // Keeping a watch on the totalCounter variable, so as to check if there is any error while downloading the modules.
                // At the end clearing the watch - this can be used to clear watch var unBindWatch = (Not used as it was not triggering watch after autoUpdate onResume event)

                $rootScope.$watch(
                    "totalCounter",
                    function (totalCounter) {
                        if (totalCounter === promiseListLength && totalCounter > 0) {
                            //LoaderService.hide();
                            LocalStorageHelper.addEndDateForDownloadAll($scope.logId); // Clearing pool so as to handle any update in the downloaded data (When user has previously downloaded data).

                            ResetPoolUtil.resetPool();
                            $timeout(function () {
                                // On successful download in resume event clear OnResume flag
                                var resumeProm =
                                    DeviceUtil.getKeyValueWithSharedPreferences("onResume");
                                resumeProm.then(function (fromResume) {
                                    if (fromResume === "true") {
                                        window.localStorage.removeItem("onResume");
                                        document.removeEventListener(
                                            "resume",
                                            onResume.bind(this),
                                            true
                                        );
                                    }
                                });

                                //   var loginRedirect = window.localStorage.getItem('loginRedirect');
                                var getLoginRedirectProm =
                                    DeviceUtil.getKeyValueWithSharedPreferences("loginRedirect");
                                getLoginRedirectProm
                                    .then(function (loginRedirect) {
                                        // data variable will contain data retrived from SharedPreferences.
                                        if (loginRedirect === "true") {
                                            var invalidList = HomeScreenUtil.getInvalidDownloadList();
                                            //validateData(invalidList);
                                        }
                                    })
                                    .catch(function (error) { });
                                getUnReadCount();
                            }, 1000); // Clearing the watch instance
                            //unBindWatch();
                        }
                    },
                    true
                );

                $scope.title = customer.Title;
                $scope.headerColor = customer.ColourCode;
                $scope.questionnaireList = [];
                $scope.actionPlanWizardList = []; // Below array list definition are added for a check in the view

                $scope.claimList = [];
                $scope.askadeList = [];
                $scope.riskProfileList = [];
                $scope.employeeSatisfactionList = [];
                $scope.humanResourceList = [];
                $scope.administrationList = [];
                $scope.managementEvaluationList = [];
                $scope.frontPlannerList = [];
                $scope.documentTypeList = [];

                //Survey Data
                var currentDate = new Date().getDate();
                var currentDay = new Date(currentDate).getDay();
                $scope.SurveyDate = new Date().setDate(currentDate - currentDay);
                $scope.todayDate = new Date();
                $scope.showToday = true;
                $scope.SurveyExists = false;
                $scope.week = [];
                $scope.moreText = $rootScope.getResourceText("LIT_MOBILE_SHOW_MORE");
                $scope.showMore = false;
                $scope.showHistory = false;
                $scope.X = 0;
                var regText = $rootScope.getResourceText('MSG_MOBILE_MISSING_REGISTRATION');
                $scope.missingRegistration = regText.replace('__X__', 0);
                // InProgress Count

                $scope.questionnaireInProgressList = 0;
                $scope.actionPlanWizardInProgressList = 0; // Below array list definition are added for a check in the view

                $scope.claimInProgressList = 0;
                $scope.askadeInProgressList = 0;
                $scope.riskProfileInProgressList = 0;
                $scope.employeeSatisfactionInProgressList = 0;
                $scope.humanResourceInProgressList = 0;
                $scope.administrationInProgressList = 0;
                $scope.managementEvaluationInProgressList = 0;
                $scope.frontPlannerInProgressList = 0; // Completed Count

                $scope.questionnaireCompletedList = 0;
                $scope.actionPlanWizardCompletedList = 0; // Below array list definition are added for a check in the view

                $scope.askadeCompletedList = 0;
                $scope.claimCompletedList = 0;
                $scope.riskProfileCompletedList = 0;
                $scope.employeeSatisfactionCompletedList = 0;
                $scope.humanResourceCompletedList = 0;
                $scope.administrationCompletedList = 0;
                $scope.managementEvaluationCompletedList = 0;
                $scope.frontPlannerCompletedList = 0; // Module specific downloadValid, active, inProgress and completed details
                // APV

                var isAPVDownloadValid = HomeScreenUtil.isAPVDownloadValid();
                var apvDisplayData = HomeScreenUtil.getApvDisplayData();
                var apvInprogressCount = HomeScreenUtil.getApvInProgressCount();
                var apvCompletedCount = HomeScreenUtil.getApvCompletedCount(); // Plan of Action

                var isActionPlanDownloadValid =
                    HomeScreenUtil.isActionPlanDownloadValid();
                var apwDisplayData = HomeScreenUtil.getActionPlanProblemDisplayData();
                var apwInprogressCount =
                    HomeScreenUtil.getActionPlanProblemInprogressCount();
                var apwCompletedCount =
                    HomeScreenUtil.getActionPlanProblemCompletedCount(); // Risk Profile

                var isRiskProfileDownloadValid =
                    HomeScreenUtil.isRiskProfileDownloadValid();
                var riskProfileDisplayData = HomeScreenUtil.getRiskProfileDisplayData();
                var riskProfileInprogressCount =
                    HomeScreenUtil.getRiskProfileInProgressCount();
                var riskProfileCompletedCount =
                    HomeScreenUtil.getRiskProfileCompletedCount(); // Employee Satisfaction

                var isEmployeeSatisfactionDownloadValid =
                    HomeScreenUtil.isEmployeeSatisfactionDownloadValid();
                var employeeSatisfactionDisplayData =
                    HomeScreenUtil.getEmployeeSatisfactionDisplayData();
                var employeeSatisfactionInprogressCount =
                    HomeScreenUtil.getEmployeeSatisfactionInProgressCount();
                var employeeSatisfactionCompletedCount =
                    HomeScreenUtil.getEmployeeSatisfactionCompletedCount(); // Human Resource

                var isHumanResourceDownloadValid =
                    HomeScreenUtil.isHumanResourceDownloadValid();
                var humanResourceDisplayData =
                    HomeScreenUtil.getHumanResourceDisplayData();
                var humanResourceInprogressCount =
                    HomeScreenUtil.getHumanResourceInProgressCount();
                var humanResourceCompletedCount =
                    HomeScreenUtil.getHumanResourceCompletedCount(); // Management Evaluation

                var isManagementEvaluationDownloadValid =
                    HomeScreenUtil.isManagementEvaluationDownloadValid();
                var managementEvaluationDisplayData =
                    HomeScreenUtil.getManagementEvaluationDisplayData();
                var managementEvaluationInprogressCount =
                    HomeScreenUtil.getManagementEvaluationInProgressCount();
                var managementEvaluationCompletedCount =
                    HomeScreenUtil.getManagementEvaluationCompletedCount(); // FrontPlanner

                var isFrontPlannerDownloadValid =
                    HomeScreenUtil.isFrontPlannerDownloadValid();
                var frontPlannerDisplayData =
                    HomeScreenUtil.getFrontPlannerDisplayData();
                var frontPlannerInprogressCount =
                    HomeScreenUtil.getFrontPlannerInProgressCount();
                var frontPlannerCompletedCount =
                    HomeScreenUtil.getFrontPlannerCompletedCount(); // Askade

                var isAskadeDownloadValid = HomeScreenUtil.isAskadeDownloadValid();
                var askadeDisplayData = HomeScreenUtil.getAskadeDisplayData();
                var askadeInprogressCount = HomeScreenUtil.getAskadeInprogressCount();
                var askadeCompletedCount = HomeScreenUtil.getAskadeCompletedCount(); // Claim

                var isClaimDownloadValid = HomeScreenUtil.isClaimDownloadValid();
                var claimDisplayData = HomeScreenUtil.getClaimDisplayData();
                var claimInprogressCount = HomeScreenUtil.getClaimInprogressCount();
                var claimCompletedCount = HomeScreenUtil.getClaimCompletedCount();

                // Document Library
                var isDLDownloadValid = HomeScreenUtil.isDLDownloadValid();
                var dlDocumentData = HomeScreenUtil.getDLDocumentTypeData(); //The below feresh is added to bind empty grid data to the home screen and then update modules

                refreshAll();
                $scope.userApplicationsDetails = HomeScreenUtil.getUserApplications();

                $scope.getData = function (moduleName, moduleTranslatedName) {
                    var updateTextForModule =
                        $rootScope.getResourceText("LIT_UPDATING") +
                        " " +
                        moduleTranslatedName;
                    LoaderService.show(updateTextForModule);
                    var isOnline = DeviceUtil.isDeviceOnline();
                    if (isOnline === false) {
                        AppMessages.Error(
                            $rootScope.getResourceText("LIT_ALERT"),
                            $rootScope.getResourceText("MSG_CHECK_INTERNET_CONNECTION")
                        );
                        LoaderService.hide();
                    } else {
                        var tokenValidityPromise = LocalStorageHelper.validateUserToken();
                        tokenValidityPromise.then(
                            function (tokenValid) {
                                var refreshDeptsPersonsPromise =
                                    LocalStorageHelper.refreshDepartmentsPersonsDetails();
                                refreshDeptsPersonsPromise.then(
                                    function (success) {
                                        if (LocalStorageHelper.IsInititalized()) {
                                            switch (moduleName) {
                                                case "RiskProfile":
                                                case "EmployeeSatisfaction":
                                                case "ManagementEvaluation":
                                                case "HumanResource":
                                                case "FrontPlanner":
                                                case "Apv":
                                                    var promQue =
                                                        LocalStorageHelper.updateDownloadQuestionnaireData(
                                                            moduleName
                                                        );
                                                    promQue.then(
                                                        function (sucess) {
                                                            var loaderPromise = LoaderService.hide();
                                                            loaderPromise.then(function (sucess) {
                                                                if (sucess) {
                                                                    var downloadValid =
                                                                        HomeScreenUtil.isDownloadValid(moduleName);

                                                                    if (downloadValid === false) {
                                                                        AppMessages.Error(
                                                                            $rootScope.getResourceText("LIT_MESSAGE"),
                                                                            $rootScope.getResourceText(
                                                                                "MSG_ERROR_DOWNLOADING_MODULE"
                                                                            ) +
                                                                            " " +
                                                                            moduleTranslatedName +
                                                                            " " +
                                                                            $rootScope.getResourceText(
                                                                                "MSG_PLEASE_TRY_AGAIN"
                                                                            )
                                                                        );
                                                                    } else {
                                                                        // Clearing pool so as to handle any update in the downloaded data (When user has previously downloaded data).
                                                                        ResetPoolUtil.resetPool();
                                                                        $rootScope.$emit("refresh");
                                                                    }
                                                                }
                                                            });
                                                        },
                                                        function (errorResponse) {
                                                            LoaderService.hide();
                                                        }
                                                    );
                                                    break;

                                                case "ActionPlan":
                                                    var promisesApList =
                                                        LocalStorageHelper.updateDownloadActionPlanOrProblem();
                                                    promisesApList.then(
                                                        function (resultSet) {
                                                            var loaderPromise = LoaderService.hide();
                                                            loaderPromise.then(function (sucess) {
                                                                if (sucess) {
                                                                    var apDownloadValid =
                                                                        HomeScreenUtil.isActionPlanDownloadValid();

                                                                    if (apDownloadValid === true) {
                                                                        // Clearing pool so as to handle any update in the downloaded data (When user has previously downloaded data).
                                                                        ResetPoolUtil.resetPool();
                                                                        $rootScope.$emit("refresh");
                                                                    } else {
                                                                        //refreshApw(apwList);
                                                                        AppMessages.Error(
                                                                            $rootScope.getResourceText("LIT_MESSAGE"),
                                                                            $rootScope.getResourceText(
                                                                                "MSG_ERROR_DOWNLOADING_MODULE"
                                                                            ) +
                                                                            " " +
                                                                            moduleTranslatedName +
                                                                            " " +
                                                                            $rootScope.getResourceText(
                                                                                "MSG_PLEASE_TRY_AGAIN"
                                                                            )
                                                                        );
                                                                    }
                                                                }
                                                            });
                                                        },
                                                        function (errorResponse) {
                                                            console.log(
                                                                "Plan of Action Error :" + errorResponse
                                                            );
                                                            LoaderService.hide();
                                                        }
                                                    );
                                                    break;

                                                case "Askade":
                                                case "Claim":
                                                    var askadeListPromise =
                                                        LocalStorageHelper.updateDownloadCase(moduleName);
                                                    askadeListPromise.then(
                                                        function (successAskadeList) {
                                                            var loaderPromise = LoaderService.hide();
                                                            loaderPromise.then(function (sucess) {
                                                                if (sucess) {
                                                                    var validAskadeDownload =
                                                                        HomeScreenUtil.isDownloadValid(moduleName);

                                                                    if (validAskadeDownload === true) {
                                                                        // Clearing pool so as to handle any update in the downloaded data (When user has previously downloaded data).
                                                                        ResetPoolUtil.resetPool();
                                                                        $rootScope.$emit("refresh");
                                                                    } else {
                                                                        //refreshApw(apwList);
                                                                        AppMessages.Error(
                                                                            $rootScope.getResourceText("LIT_MESSAGE"),
                                                                            $rootScope.getResourceText(
                                                                                "MSG_ERROR_DOWNLOADING_MODULE"
                                                                            ) +
                                                                            " " +
                                                                            moduleTranslatedName +
                                                                            " " +
                                                                            $rootScope.getResourceText(
                                                                                "MSG_PLEASE_TRY_AGAIN"
                                                                            )
                                                                        );
                                                                    }
                                                                }
                                                            });
                                                        },
                                                        function (errorResponse) {
                                                            console.log("Askade Error :" + errorResponse);
                                                            LoaderService.hide();
                                                        }
                                                    );
                                                    break;

                                                case "DocumentLibrary":
                                                    var documentListPromise =
                                                        LocalStorageHelper.initDownloadDocumentLibrary(
                                                            moduleName
                                                        );
                                                    documentListPromise.then(
                                                        function (successDLList) {
                                                            var loaderPromise = LoaderService.hide();
                                                            loaderPromise.then(function (sucess) {
                                                                if (sucess) {
                                                                    var validDLDownload =
                                                                        HomeScreenUtil.isDownloadValid(moduleName);

                                                                    if (validDLDownload === true) {
                                                                        // Clearing pool so as to handle any update in the downloaded data (When user has previously downloaded data).
                                                                        ResetPoolUtil.resetPool();
                                                                        $rootScope.$emit("refresh");
                                                                    } else {
                                                                        //refreshApw(apwList);
                                                                        AppMessages.Error(
                                                                            $rootScope.getResourceText("LIT_MESSAGE"),
                                                                            $rootScope.getResourceText(
                                                                                "MSG_ERROR_DOWNLOADING_MODULE"
                                                                            ) +
                                                                            " " +
                                                                            moduleTranslatedName +
                                                                            " " +
                                                                            $rootScope.getResourceText(
                                                                                "MSG_PLEASE_TRY_AGAIN"
                                                                            )
                                                                        );
                                                                    }
                                                                }
                                                            });
                                                        },
                                                        function (errorResponse) {
                                                            console.log(
                                                                "Document Library Error :" + errorResponse
                                                            );
                                                            LoaderService.hide();
                                                            AppMessages.Error(
                                                                $rootScope.getResourceText("LIT_MESSAGE"),
                                                                $rootScope.getResourceText(
                                                                    "MSG_ERROR_DOWNLOADING_MODULE"
                                                                ) +
                                                                " " +
                                                                moduleTranslatedName +
                                                                " " +
                                                                $rootScope.getResourceText(
                                                                    "MSG_PLEASE_TRY_AGAIN"
                                                                )
                                                            );
                                                        }
                                                    );
                                                    break;

                                                default:
                                                    LoaderService.hide();
                                                    break;
                                            }
                                        }
                                    },
                                    function (errorResponse) {
                                        LoaderService.hide();
                                    }
                                );
                            },
                            function (errorResponse) {
                                LoaderService.hide();
                            }
                        );
                    }
                };

                $scope.navigateToAnswering = function (userApp, answeringInstance) {
                    var moduleVal = userApp.Text;
                    var title = userApp.TranslatedText;
                    var color = userApp.ColourCode;

                    switch (moduleVal) {
                        case "RiskProfile":
                        case "EmployeeSatisfaction":
                        case "ManagementEvaluation":
                        case "HumanResource":
                        case "FrontPlanner":
                        case "Apv":
                            //LoaderService.show();  //Hiding the loader for local operations
                            // navigate to answering
                            var id = answeringInstance.Id;
                            var navigateTo = "";
                            var pov = "";
                            var timerPromise = $timeout(function () {
                                var stateVal = $state.current.name;
                                var stateVal = "app.qTabs.active";
                                navigateTo = "app.startScreen"; //First : Get whether a already answered not inprogress and notcompleted personquestionnaire exists.

                                var existingUnAnsweredPq =
                                    personQuestionnaireManager.getUnAnsweredPersonQuestionnaireNonTemplate(
                                        id
                                    );

                                if (existingUnAnsweredPq === null) {
                                    //Second: We now get from the PersonQuestionnaireTemplate
                                    //and save to the PerosnQuestionnaire
                                    //with answeringInProgress = false and answeringCompleted = false.
                                    var personQueTemplateAnswer =
                                        personQuestionnaireManager.getUnAnsweredPersonQuestionnaire(
                                            id
                                        );
                                    var savedPq =
                                        personQuestionnaireManager.savePersonQuestionniare(
                                            personQueTemplateAnswer,
                                            null
                                        );
                                    id = savedPq.Id;
                                } else {
                                    existingUnAnsweredPq.IsTemplate = false;
                                    id = existingUnAnsweredPq.Id;
                                }

                                $state.go(
                                    navigateTo,
                                    {
                                        id: id,
                                        state: stateVal,
                                        viewTitle: title,
                                        pov: pov,
                                        modColor: color,
                                    },
                                    {
                                        reload: false,
                                        inherit: false,
                                        notify: true,
                                    }
                                );
                                $timeout.cancel(timerPromise);
                            }, 100);
                            break;

                        case "ActionPlan":
                            //LoaderService.show();  //Hiding the loader for local operations
                            // navigate to answering.
                            var id = answeringInstance.Id;
                            var timerPromise = $timeout(function () {
                                var stateVal = $state.current.name;
                                var stateVal = "app.apwTabs.active";
                                $state.go(
                                    "app.planOfAction",
                                    {
                                        id: id,
                                        state: stateVal,
                                        viewTitle: title,
                                        modColor: color,
                                    },
                                    {
                                        reload: false,
                                        inherit: false,
                                        notify: true,
                                    }
                                );
                                $timeout.cancel(timerPromise);
                            }, 100); //LoaderService.hide();

                            break;

                        case "Askade":
                            //LoaderService.show();  //Hiding the loader for local operations
                            // navigate to answering.
                            var id = answeringInstance.FileTypeId;
                            var timerPromise = $timeout(function () {
                                var stateVal = $state.current.name;
                                var stateVal = "app.akwTabs.active";
                                $state.go(
                                    "app.askade",
                                    {
                                        id: id,
                                        state: stateVal,
                                        viewTitle: title,
                                        modColor: color,
                                    },
                                    {
                                        reload: false,
                                        inherit: false,
                                        notify: true,
                                    }
                                );
                                $timeout.cancel(timerPromise);
                            }, 100); //LoaderService.hide();

                            break;

                        case "Claim":
                            //LoaderService.show();  //Hiding the loader for local operations
                            // navigate to answering.
                            var id = answeringInstance.FileTypeId;
                            var timerPromise = $timeout(function () {
                                var stateVal = $state.current.name;
                                var stateVal = "app.claimTabs.active";
                                $state.go(
                                    "app.claim",
                                    {
                                        id: id,
                                        state: stateVal,
                                        viewTitle: title,
                                        modColor: color,
                                    },
                                    {
                                        reload: false,
                                        inherit: false,
                                        notify: true,
                                    }
                                );
                                $timeout.cancel(timerPromise);
                            }, 100); //LoaderService.hide();

                            break;

                        case "DocumentLibrary":
                            var stateVal = "app.documentLibrary";
                            $state.go(stateVal, {
                                viewTitle: userApp.TranslatedText,
                                type: userApp.Text,
                                modColor: userApp.ColourCode,
                                groupName: answeringInstance.GroupName,
                            });
                            break;

                        default:
                            break;
                    }
                };

                $scope.navigateToSurvey = function (date) {
                    var timerPromise = $timeout(function () {
                        var state = "app.surveyTabs.active";

                        var activeList = CommonMethodsFactory.getActiveSurveyForTheDate(date);
                        var historyList = CommonMethodsFactory.getSurveyHistoryForTheDate(date);

                        if (activeList.length == 0 && historyList.length > 0) state = "app.surveyTabs.history"; 

                        $state.go(
                            state,
                            {
                                viewTitle: 'survey',
                                date: date
                            },
                            {
                                reload: false,
                                inherit: false,
                                notify: true,
                            }
                        );
                        $timeout.cancel(timerPromise);
                    }, 100);
                }
                $scope.selectFavoritesOnHold = function (favoriteData, userApp) {
                    var moduleName = null;

                    if (!favoriteData.UserApp) {
                        moduleName = userApp.Text;
                    } else {
                        moduleName = favoriteData.UserApp.Text;
                    }

                    switch (moduleName) {
                        case "Apv":
                        case "RiskProfile":
                        case "EmployeeSatisfaction":
                        case "ManagementEvaluation":
                        case "Insurance":
                        case "HumanResource":
                        case "FrontPlanner":
                            var selectedname = favoriteData.Name;
                            favoriteData.IsFavorite = true;
                            favoritesManager.addToFavorites(favoriteData, moduleName);
                            break;

                        case "ActionPlan":
                            var selectedname = favoriteData.Name;
                            favoriteData.IsFavorite = true;
                            favoritesManager.addToFavorites(favoriteData, moduleName);
                            break;

                        case "Askade":
                        case "Claim":
                            var selectedname = favoriteData.Name;
                            favoriteData.IsFavorite = true;
                            favoritesManager.addToFavorites(favoriteData, moduleName);
                            break;

                        case "DocumentLibrary":
                            var selectedname = favoriteData.GroupName;
                            favoritesManager.addToFavorites(favoriteData, moduleName);
                            break;

                        default:
                            return false;
                    }
                    var anim =
                        '<lottie-player src="raw/favoriteAdd.json" background="transparent" speed="0.4" id="favAnim" autoplay></lottie-player>';
                    var contentTitle = $rootScope.getResourceText("LIT_MOBILE_FAVORITES");
                    var contentLabel =
                        selectedname +
                        " " +
                        $rootScope.getResourceText("MSG_MOBILE_FAVORITES_ADDED");
                    var contentTimer = 2500;
                    PopupUtil.animTimerPopUp(
                        anim,
                        contentTitle,
                        contentLabel,
                        contentTimer
                    );

                    // ionicToast.showDefault(selectedname + " " + $rootScope.getResourceText('MSG_MOBILE_FAVORITES_ADDED'));
                };

                $scope.openAiLink = function (doc) {
                    if (doc.AiAssistanceGroupLink)
                        var ref = CommonMethodsFactory.openInAppBrowser(doc.AiAssistanceGroupLink, '_blank', 'location=yes');
                }

                $scope.navigateToListScreen = function (userApp) {
                    switch (userApp.Text) {
                        case "RiskProfile":
                        case "EmployeeSatisfaction":
                        case "ManagementEvaluation":
                        case "HumanResource":
                        case "FrontPlanner":
                        case "Apv":
                        case "ActionPlan":
                        case "Askade":
                        case "Claim":
                            var timerPromise = $timeout(function () {
                                var stateVal = userApp.RouteValue + ".active";

                                if (userApp.IsApplicationModuleDisable) {
                                    stateVal = userApp.RouteValue + ".inProgress";
                                    var compCount = $scope.checkCompletedCount(userApp.Text);

                                    if (compCount > 0) {
                                        stateVal = userApp.RouteValue + ".completed";
                                    }
                                }

                                $state.go(
                                    stateVal,
                                    {
                                        viewTitle: userApp.TranslatedText,
                                        modColor: userApp.ColourCode,
                                        type: userApp.Text,
                                    },
                                    {
                                        reload: false,
                                        inherit: false,
                                        notify: true,
                                    }
                                );
                                $timeout.cancel(timerPromise);
                            }, 100);
                            break;

                        case "DocumentLibrary":
                            //LoaderService.show();  //Hiding the loader for local operations
                            // navigate to answering.
                            var timerPromise = $timeout(function () {
                                var stateVal = "app.documentLibrary";
                                $state.go(
                                    stateVal,
                                    {
                                        viewTitle: userApp.TranslatedText,
                                        modColor: userApp.ColourCode,
                                        type: userApp.Text,
                                        groupName: null,
                                    },
                                    {
                                        reload: false,
                                        inherit: false,
                                        notify: true,
                                    }
                                );
                                $timeout.cancel(timerPromise);
                            }, 100); //LoaderService.hide();

                            break;

                        default:
                            break;
                    }
                };

                $scope.checkCompletedCount = function (moduleVal) {
                    switch (moduleVal) {
                        case "Askade":
                            return $scope.askadeCompletedList;

                        case "ActionPlan":
                            return $scope.actionPlanWizardCompletedList;

                        case "Apv":
                            return $scope.questionnaireCompletedList;

                        case "Claim":
                            return $scope.claimCompletedList;

                        case "RiskProfile":
                            return $scope.riskProfileCompletedList;

                        case "EmployeeSatisfaction":
                            return $scope.employeeSatisfactionCompletedList;

                        case "HumanResource":
                            return $scope.humanResourceCompletedList;

                        case "Administration":
                            return $scope.administrationCompletedList;

                        case "ManagementEvaluation":
                            return $scope.managementEvaluationCompletedList;

                        case "FrontPlanner":
                            return $scope.frontPlannerCompletedList;

                        case "DocumentLibrary":
                            return [];

                        default:
                            break;
                    }
                };

                $scope.checkInprogressCount = function (moduleVal) {
                    switch (moduleVal) {
                        case "Askade":
                            return $scope.askadeInProgressList;

                        case "ActionPlan":
                            return $scope.actionPlanWizardInProgressList;

                        case "Apv":
                            return $scope.questionnaireInProgressList;

                        case "Claim":
                            return $scope.claimInProgressList;

                        case "RiskProfile":
                            return $scope.riskProfileInProgressList;

                        case "EmployeeSatisfaction":
                            return $scope.employeeSatisfactionInProgressList;

                        case "HumanResource":
                            return $scope.humanResourceInProgressList;

                        case "Administration":
                            return $scope.administrationInProgressList;

                        case "ManagementEvaluation":
                            return $scope.managementEvaluationInProgressList;

                        case "FrontPlanner":
                            return $scope.frontPlannerInProgressList;

                        case "DocumentLibrary":
                            return [];

                        default:
                            break;
                    }
                };

                $scope.checkModule = function (module) {
                    var moduleVal = module.Text;

                    if (!module.IsApplicationModuleDisable) {
                        switch (moduleVal) {
                            case "Askade":
                                return $scope.askadeList;

                            case "ActionPlan":
                                return $scope.actionPlanWizardList;

                            case "Apv":
                                return $scope.questionnaireList;

                            case "Claim":
                                return $scope.claimList;

                            case "RiskProfile":
                                return $scope.riskProfileList;

                            case "EmployeeSatisfaction":
                                return $scope.employeeSatisfactionList;

                            case "HumanResource":
                                return $scope.humanResourceList;

                            case "Administration":
                                return $scope.administrationList;

                            case "ManagementEvaluation":
                                return $scope.managementEvaluationList;

                            case "FrontPlanner":
                                return $scope.frontPlannerList;

                            case "DocumentLibrary":
                                return $scope.documentTypeList;

                            default:
                                break;
                        }
                    }

                    return [];
                }; // This method gets all the data from each module and clubs it into a single array.

                $scope.allHomeScreenModuleDataList = function () {
                    var allList = [];
                    var allModuleData = {};

                    for (var i = 0; i < $scope.userApplicationsDetails.length; i++) {
                        var userApp = $scope.userApplicationsDetails[i];
                        var moduleSpecificData = $scope.checkModule(userApp);
                        moduleSpecificData.forEach(function (e) {
                            e.UserApp = userApp;

                            switch (userApp.Text) {
                                case "Askade":
                                case "Claim":
                                    e.ImageVal = e.ImageFileBase64;
                                    break;

                                case "ActionPlan":
                                    e.ImageVal = e.ImageLogoBase64;
                                    break;

                                case "Apv":
                                case "RiskProfile":
                                case "EmployeeSatisfaction":
                                case "HumanResource":
                                case "ManagementEvaluation":
                                case "FrontPlanner":
                                    e.ImageVal = e.QuestionImageFileBase64;
                                    break;

                                case "Administration":
                                    break;

                                case "DocumentLibrary":
                                    e.ImageVal = null;
                                    break;

                                default:
                                    break;
                            }
                        });
                        allList.push.apply(allList, moduleSpecificData);

                        if (userApp.Text === "DocumentLibrary") {
                            allModuleData["DocumentLibraryData"] = {
                                DocumentLibrary: moduleSpecificData,
                                UserApp: userApp,
                            };
                        }
                    }

                    allModuleData["moduleData"] = allList;
                    return allModuleData;
                };

                $scope.loadHomeTemplate = function () {
                    if ($scope.isTileDisplayEnable) {
                        $scope.homeTemplatePath = "templates/homeTileDisplay.html";
                        $scope.showDownArrow = true;
                        scrollIconUpdate();
                    } else {
                        $scope.homeTemplatePath = "templates/homeListDisplay.html";
                    }
                }; // Assign values to the below variables only if it is Tile Display
                // All published modules data are added to a single variable and passed to the view to display in tile view

                if ($scope.isTileDisplayEnable) {
                    $scope.allModData = $scope.allHomeScreenModuleDataList();
                    $scope.allModList = $scope.allModData.moduleData;
                }

                $scope.loadListTemplate = function (moduleVal) {
                    switch (moduleVal) {
                        case "Askade":
                        case "Claim":
                            return "templates/homeView_templates/askadeWizardList.html";

                        case "ActionPlan":
                            return "templates/homeView_templates/apwWizardList.html";

                        case "Apv":
                        case "RiskProfile":
                        case "EmployeeSatisfaction":
                        case "HumanResource":
                        case "ManagementEvaluation":
                        case "FrontPlanner":
                            return "templates/homeView_templates/apvQueList.html";

                        case "Administration":
                            return "";

                        case "DocumentLibrary":
                            return "templates/homeView_templates/docLibList.html";
                        case "Survey":
                            return "templates/homeView_templates/surveyList.html";

                        default:
                            break;
                    }
                };

                $scope.getTileDisplayVal = function () {
                    var agent = navigator.userAgent;
                    var isIPad = agent.indexOf("iPad") > 0;
                    var isIOS = agent.indexOf("iPhone") > 0 || agent.indexOf("iPod") > 0;
                    var isAndroid = agent.indexOf("Android") > 0;
                    var isSmallScreen =
                        screen.width < 767 || (isAndroid && screen.width < 1000);
                    var isMobile = isIOS || isAndroid;
                    var isTablet = isIPad || (isMobile && !isSmallScreen);
                    var isIPadDev = ionic.Platform.isIPad();
                    var isIOSd = ionic.Platform.isAndroid() == false;
                    var isAndroidd = ionic.Platform.isAndroid();

                    if (isSmallScreen) {
                        return 2;
                    } else if (isIPadDev || isTablet) {
                        return 3;
                    } else {
                        return 3;
                    }
                };

                $rootScope.$on("refresh", function () {
                    refreshWithNewData(); //Get updated new channels.

                    $scope.userApplicationsDetails = HomeScreenUtil.getUserApplications();

                    if ($scope.isTileDisplayEnable) {
                        $scope.allModData = $scope.allHomeScreenModuleDataList();
                        $scope.allModList = $scope.allModData.moduleData;
                    }
                });

                $scope.updateDefinations = function () {
                    LoaderService.show(
                        $rootScope.getResourceText("MSG_UPDATING_CHANNELS")
                    );
                    var userName = $scope.userDetails.UserName;
                    var userDetailsPromise = LocalStorageHelper.initUserDetails(userName);
                    userDetailsPromise.then(function (res) {
                        $rootScope.$broadcast("initDownload");
                    });
                    $scope.$broadcast("scroll.refreshComplete");
                };
                LoaderService.hide(); // Tis is added only to close the loader message, which is been shown in login controller and hide was handled on $stateChangeSuccess method.

                function scrollIconUpdate() {
                    if ($scope.getTileDisplayVal() === 2) {
                        if (
                            $scope.allModList.length === 0 ||
                            $scope.allModList.length <= 4
                        ) {
                            $scope.showDownArrow = false;
                        }
                    } else {
                        if (
                            $scope.allModList.length === 0 ||
                            $scope.allModList.length <= 9
                        ) {
                            $scope.showDownArrow = false;
                        }
                    }
                }

                $scope.myFunction = function ($event) {
                    $timeout(function () {
                        var attrElement = angular.element(".scrollIndicator");
                        for (var i = 0; i < attrElement.length; i++) {
                            attrElement[i].style.display = "none";
                        }
                    }, 300);
                };

                function SetWeek() {

                    if (!$scope.todayDate) $scope.todayDate = new Date();

                    var day = $scope.todayDate.getDay();
                    var isTodayMonday = day == 1;

                    if (isTodayMonday) {
                        $scope.showHistory = false;
                    }

                    if (day == 0 || day == 6) $scope.showToday = false;

                    if (day != 0) {
                        var days = AddDaysToWeek(day);
                        var daysInWeek = CommonMethodsFactory.checkIsSurveyExistForTheDays(days);
                        if (daysInWeek.length > 0) {
                            $scope.SurveyExists = true;
                            $scope.week = daysInWeek;

                            if (daysInWeek.length > 1) $scope.showHistory = true;
                            else $scope.showHistory = false;

                        }
                        getMissedSurveyDaysCount();
                    }
                }
                    
                function AddDaysToWeek(currentDay) {
                    var days = [];
                    for (var i = currentDay; i > 0; i--) {
                        var date = new Date($scope.todayDate);
                        var previouseDay = new Date(date.setDate($scope.todayDate.getDate() - i));
                        if (previouseDay.getDay() != 0 && previouseDay.getDay() != 6)
                            days.push(previouseDay);
                    }
                    if (currentDay != 0 && currentDay != 6)
                        days.push($scope.todayDate);
                    if (days.length > 3) $scope.showMore = true;
                    return days.reverse();
                }

                $scope.setShowMore = function () {
                    $scope.showMore = !$scope.showMore;
                    if ($scope.showMore)
                        $scope.moreText = $rootScope.getResourceText("LIT_MOBILE_SHOW_MORE");
                    else $scope.moreText = $rootScope.getResourceText("LIT_MOBILE_SHOW_LESS");
                }

                $scope.showDay = function (index) {
                    if (index === 0) {
                        var date = $scope.week[index];
                        if (date.getDate() === $scope.todayDate.getDate()) return false;
                        else return true;
                    }
                    else if (index === 1 || index === 2) return true;
                    else if (!$scope.showMore && index != 0 && index != 1 && index != 2) return true;
                    else return false;
                }

                $scope.getDateText = function (day) {
                    if ($scope.todayDate.getDate() - 1 == day.getDate())
                        return $rootScope.getResourceText("LIT_MOBILE_YESTERDAY");
                    else return day.toDateString();
                }

                // SurveyToFix - Need to handle the clean up as a part of survey screen in the next deployment 
                //CleanUpOldSurveyData();

                //function CleanUpOldSurveyData() {
                //    CommonMethodsFactory.cleanUpSurvey();
                //}

                function getMissedSurveyDaysCount() {
                    var daysInAWeek = AddDaysToWeek($scope.todayDate.getDay());
                    var count = CommonMethodsFactory.getMissedDaysList(daysInAWeek);
                    $scope.missingRegistration = regText.replace('__X__', count);
                }

                $scope.showDate = function () {
                    var that = this;
                    $scope.isDatePickDisabled = true;
                    var maxDate = new Date().setDate(currentDate - currentDay);
                    var date = $scope.SurveyDate;
                    var theme = datePickerTheme();
                    var dateValue = GeneralUtil.pickDate(maxDate, date, theme);
                    dateValue.then(function (date) {
                        $scope.isDatePickDisabled = false;
                        $scope.SurveyDate = date;
                        that.navigateToSurvey(date);
                    }, function (e) {
                        $scope.isDatePickDisabled = false;
                    });
                };

                function datePickerTheme() {
                    $scope.customer = customersManager.getCustomers();
                    if ($scope.customer.IsDarkModeEnable) {
                        return 2;
                    } else {
                        return 3;
                    }
                }

                $scope.showCustomDatePicker = function () {
                    $scope.customer = customersManager.getCustomers();
                    return $scope.customer.IsCustomDatePickerEnabledForSurveyHistory;
                }

                $scope.showSurvey = function () {
                    $scope.customer = customersManager.getCustomers();
                    return $scope.customer.IsSurveyEnabled;
                }
            });
        },
    ]);
})();


/***/ }),

/***/ "./scripts/controller/loginController.js":
/*!***********************************************!*\
  !*** ./scripts/controller/loginController.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    var app = angular.module('questionnaire');

    app.controller('loginController', ['$scope', '$state', '$rootScope', '$ionicHistory', '$http', 'PopupUtil', 'LocalStorageHelper', 'LoaderService', 'PopOverUtil', 'customersManager', 'Restangular', 'LocalStorageUtility', 'resourceLanguageManager', 'preferredLanguageManager', 'ionicToast', 'AppMessages', '$timeout', 'DeviceUtil', 'userDetailsManager', 'ResetPoolUtil', 'CommonMethodsFactory', 'favoritesManager', '$compile', '$ionicPlatform', 'ToggleUrlMethodFactory',
        function ($scope, $state, $rootScope, $ionicHistory, $http, PopupUtil, LocalStorageHelper, LoaderService, PopOverUtil, customersManager, Restangular, LocalStorageUtility, resourceLanguageManager, preferredLanguageManager, ionicToast, AppMessages, $timeout, DeviceUtil, userDetailsManager, ResetPoolUtil, CommonMethodsFactory, favoritesManager, $compile, $ionicPlatform, ToggleUrlMethodFactory) {

            var isIntuneSetUpValue = false;
            var promiseDeviceUtil = DeviceUtil.getKeyValueWithSharedPreferences('isIntuneSetUp');
            promiseDeviceUtil.then(function (intuneSetpUp) {
                isIntuneSetUpValue = intuneSetpUp;
            }, function (err) {
            });

            var refreshCustomerPromise = DeviceUtil.getKeyValueWithSharedPreferences('refreshCustomer');
            refreshCustomerPromise.then(function (refreshCustomer) {
                if (refreshCustomer)
                    onResume();
            });

            var simpleGetter = CryptoJS.AES;
            $scope.data = {};
            $scope.disableLoginPanelForCustomer = false;

            var resourceText = null; // Method used to refresh the details of the demo customer.
            // Method is executed only during fresh installation of the app

            $ionicPlatform.ready(function () {
                $scope.searchIcon = $rootScope.getIconValue('Search');
                $scope.closeIcon = $rootScope.getIconValue('Close');
                $scope.searchText = $rootScope.getResourceText('LIT_SEARCH');
                $scope.qrScannerIcon = $rootScope.getIconValue('Scanner');
                $scope.flipCameraIcon = $rootScope.getIconValue('Flip');
                $scope.flashCameraIcon = $rootScope.getIconValue('Flash');
                $scope.scannerCloseIcon = $rootScope.getIconValue('ScannerClose');
            });

            var existingSubscribedTopicList = window.localStorage.getItem('subscribedTopicList');
            $scope.data.subScriptionList = existingSubscribedTopicList;

            document.addEventListener("resume", onResume.bind(this), false);
            document.addEventListener("pause", onPause.bind(this), false);

            function onPause() {
                DeviceUtil.setKeyValueWithSharedPreferences("refreshCustomer", true);
                DeviceUtil.setKeyValueWithSharedPreferences("stopLoginUpdateForDeepLink", false);
            }

            if (isDeviceOnline()) {
                // var isFreshInstall = window.localStorage.getItem('isFreshInstall');
                // var guideInstruction = window.localStorage.getItem('guideInstruction');
                //var getGuideInstPrm = DeviceUtil.getKeyValueWithSharedPreferences('guideInstruction')
                var getInstallProm = DeviceUtil.getKeyValueWithSharedPreferences('isFreshInstall');
                getInstallProm.then(function (data) {
                    // data variable will contain data retrived from SharedPreferences.
                    onlineFreshInstallProcess(data);
                }).catch(function () {
                    onlineFreshInstallProcess(null);
                });
            }
            else {
                // isFreshInstall = window.localStorage.getItem('isFreshInstall');
                var getInstallPrm = DeviceUtil.getKeyValueWithSharedPreferences('isFreshInstall');
                getInstallPrm.then(function (data) {
                    // data variable will contain data retrived from SharedPreferences.
                    offlineFreshInstallProcess(data);
                }).catch(function () {
                    offlineFreshInstallProcess(null);
                });
            }

            function onlineFreshInstallProcess(isFreshInstall) {
                if (isFreshInstall === null) {
                    // window.localStorage.setItem('isFreshInstall', false);
                    var setInstallProm = DeviceUtil.setKeyValueWithSharedPreferences('isFreshInstall', false);
                    setInstallProm.then(function () {
                        // executes this method when data is saved sucessfully.
                    });
                    screen.orientation.lock("portrait");
                    $state.go('welcome');
                } // FT 7332 Deep link login issue, Added a check to handle the issue

                // var isfromDeepLink = window.localStorage.getItem('fromDeepLink'); 

                var getLinkProm = DeviceUtil.getKeyValueWithSharedPreferences('fromDeepLink');
                getLinkProm.then(function (data) {
                    // data variable will contain data retrived from SharedPreferences.
                    deepLinkProcess(data, isFreshInstall);
                }).catch(function () {
                    deepLinkProcess(null, isFreshInstall);
                });
            }

            $scope.showLocalNotification = function () {
                window.pushutility('shownotification', ['News', 'ETC', 'Trees', 'Vehicle'], function (echoValue) {
                });
            }


            //      alert(echoValue); // should alert true.
            //    });
            function deepLinkProcess(isfromDeepLink, isFreshInstall) {
                // var getGuideInstPrm = DeviceUtil.getKeyValueWithSharedPreferences('guideInstruction'); // Boolean value is null for new user it is taken here to show favourite guide screen for new users 
                // getGuideInstPrm.then(function (data) {
                // data variable will contain data retrived from SharedPreferences.
                //    guideInstruction = data;
                //  }).catch(function () {
                //     guideInstruction = null;
                //   });

                if ((!isfromDeepLink || isfromDeepLink !== "1") && isIntuneSetUpValue === false) {
                    var customerData = customersManager.getCustomers();
                    if (isFreshInstall === null && customerData === null) {
                        LoaderService.show();
                        var onlineData = "test";
                        var custNameData = "DemoDK";
                        var baseUrlValue = CommonMethodsFactory.getBaseUrl(onlineData);
                        Restangular.setBaseUrl('https://' + baseUrlValue + '/' + custNameData + '/api/v1/');
                        var defaultLangPromise = LocalStorageHelper.setUserDefaultLanguage(custNameData, onlineData, null);
                        defaultLangPromise.then(function () {
                            var suitePromise = LocalStorageHelper.initSuiteDetails(custNameData, onlineData, null, false);
                            suitePromise.then(function (success) {
                                var loaderProm = LoaderService.hide();
                                loaderProm.then(function () {
                                    // $scope.$emit('RenderButtonBgHeaderColor');
                                    $rootScope.$emit('darkModeEnable');
                                    $rootScope.$broadcast("refreshLogin");
                                    // window.localStorage.setItem('isFreshInstall', false);
                                    var setInstallProm = DeviceUtil.setKeyValueWithSharedPreferences('isFreshInstall', false);
                                    setInstallProm.then(function () {
                                        // executes this method when data is saved sucessfully.
                                    });
                                });
                            }, function (error) {
                                LoaderService.hide();
                                return;
                            });
                        }, function (error) {
                            LoaderService.hide();
                        });
                    }
                }
            }

            function offlineFreshInstallProcess(isFreshInstall) {
                if (isFreshInstall === null) {
                    // window.localStorage.setItem('isFreshInstall', false);
                    var setInstallProm = DeviceUtil.setKeyValueWithSharedPreferences('isFreshInstall', false);
                    setInstallProm.then(function () {
                        // executes this method when data is saved sucessfully.
                    });
                    screen.orientation.lock("portrait");
                    $state.go('welcome');
                }
            }

            // var token = window.localStorage.getItem('token');
            var promiseDeviceUtil = DeviceUtil.getKeyValueWithSharedPreferences('token');
            promiseDeviceUtil.then(function (token) {
            }).catch(function (error) {
                var promiseDeviceUtil = DeviceUtil.getKeyValueWithSharedPreferences('AppDetails');
                promiseDeviceUtil.then(function (completeName) {
                    if (completeName !== null) {
                        var completedNameValue = processName(completeName.toString(), true);
                        var appDetails = completedNameValue.split('|');
                        $scope.data.username = appDetails[0];
                        $scope.data.password = appDetails[1];
                    }
                });
                LoaderService.hide();
            });
            $rootScope.$on('refreshLogin', function (event, data) {
                $scope.customer = customersManager.getCustomers();
                $scope.frontPageText = null;
                $scope.customerName = null;
                $scope.colourCode = null;
                var custLogo = angular.element(document.querySelector('#imageLogo'));

                if (custLogo.length !== 0) {
                    if ($scope.customer != null) {
                        custLogo[0].innerHTML = $scope.customer.ImageLogoBase64;
                        $scope.title = $scope.customer.Title;
                        $scope.frontPageText = $scope.customer.FrontPageText;
                        $scope.headerColor = $scope.customer.ColourCode;
                        $scope.disableLoginPanelForCustomer = $scope.customer.DisableLoginPanel;
                    } else {
                        custLogo.append("<img src=\"data:image/png;base64,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\" />");
                        $scope.title = "SafetyNet / HSEQ Master";
                        $scope.frontPageText = "<p>Welcome - please login with your SafetyNet username and password<br /> Velkommen - log ind med dit Safetynet brugernavn og adgangskode.</p>";
                    }
                }
            });

            function isDeviceOnline() {
                var isOnline = DeviceUtil.isDeviceOnline();
                return isOnline;
            }

            $scope.openInAppForInlineHtml = function (url, target) {
                var options =
                    "location=yes,clearcache=yes,clearsessioncache=yes,cleardata=yes";
                var win = CommonMethodsFactory.openInAppBrowser(url, target, options);
            }

            $scope.openInApp = function (loginUrl, target) {
                CommonMethodsFactory.handleFrontPageLinks(loginUrl, target);
            };

            PopOverUtil.initPopOver('templates/loginOptions.html', $rootScope);

            function onResume() {
                var updatePromise = DeviceUtil.getKeyValueWithSharedPreferences("stopLoginUpdateForDeepLink");
                updatePromise.then(function (isFromDeepLink) {
                    if (!isFromDeepLink) {
                        UpdateSuiteDetails();
                    }
                }).catch(function () {
                    updateSuiteDetails();
                });
            }

            function UpdateSuiteDetails() {
                LoaderService.show();
                if ($state.current.name === "login" && LocalStorageHelper.IsInititalized() && isDeviceOnline()) {
                    var customerDetails = customersManager.getCustomers();
                    if (customerDetails != null) {
                        var custName = customerDetails.UniqueUrlPart;
                        var onlineVal = customerDetails.OnlineVal;
                        var isCustomUrlEnabled = customerDetails.IsCustomUrlEnabled;
                        var ckey = customerDetails.CKey;
                        var suteDetailsPromise = LocalStorageHelper.updateSuiteDetails(custName, onlineVal, isCustomUrlEnabled, ckey);
                        suteDetailsPromise.then(function (success) {
                            var updatedCustomer = customersManager.getCustomers();
                            showScanner(updatedCustomer);
                            if (updatedCustomer != null) {
                                $scope.isSSOEnabled = updatedCustomer.IsSSOEnabled;
                                $scope.frontPageText = getHtml(updatedCustomer.FrontPageText);
                                setFrontPageText($scope.frontPageText);
                                DeviceUtil.removeByKeySharedPreferences('refreshCustomer');
                            }
                            return removeEvent()
                        }, function (error) {
                            return removeEvent()
                        });
                    } else removeEvent();
                } else removeEvent();
            }

            function removeEvent() {
                LoaderService.hide();
                document.removeEventListener("resume", onResume.bind(this), false);
                document.removeEventListener("pause", onPause.bind(this), false);
            }

            function setFrontPageText(text) {
                var text = getHtml(text);
                var frontPageTextBindEle = angular.element(document.querySelector('#frontPageBind'));
                frontPageTextBindEle.ngBindHtml = text;
            }

            $scope.customer = customersManager.getCustomers();
            $scope.isSSOEnabled = false;
            $scope.frontPageText = null;
            $scope.customerName = null;
            $scope.colourCode = null;
            var custLogo = angular.element(document.querySelector('#imageLogo'));

            if (custLogo.length !== 0) {
                if ($scope.customer != null) {
                    custLogo.append($scope.customer.ImageLogoBase64);
                    $scope.title = $scope.customer.Title;
                    $scope.isSSOEnabled = $scope.customer.IsSSOEnabled;
                    $scope.frontPageText = $scope.customer.FrontPageText;
                    $scope.headerColor = $scope.customer.ColourCode;
                    $scope.disableLoginPanelForCustomer = $scope.customer.DisableLoginPanel;
                } else {
                    if (custLogo.children().length === 0) {
                        custLogo.append("<img src=\"data:image/png;base64,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\" />");
                    }

                    $scope.title = "SafetyNet / HSEQ Master";
                    $scope.frontPageText = "<p>Welcome - please login with your SafetyNet username and password<br /> Velkommen - log ind med dit Safetynet brugernavn og adgangskode.</p>";
                }
            }

            $scope.openMoreOptions = function (event) {
                PopOverUtil.openPopOver($scope, event);
            };

            $scope.setCheckPreferences = function (event) {
                var preferencePromise = DeviceUtil.setKeyValueWithSharedPreferences("CKey", "Hello");
                preferencePromise.then(function () {// executes this method when data is saved sucessfully.
                });
            };

            $scope.getCheckPreferences = function (event) {
                var testProm = DeviceUtil.getKeyValueWithSharedPreferences("CKey");
                testProm.then(function (data) {
                    // data variable will contain data retrived from SharedPreferences.
                    alert(data);
                });
            };

            $scope.delCheckPreferences = function (event) {
                var testProm = DeviceUtil.removeByKeySharedPreferences("CKey");
                testProm.then(function () {// On successful deletion this function will be called.
                    // alert('Deleted shared preferences..');
                });
            };

            $scope.fetchUserDetails = function (data) {
                var userDetailsPromise = LocalStorageHelper.initUserDetails(data.username.toLowerCase());
                userDetailsPromise.then(function (successUserDetailsResponse) {

                    var guideInstructionProm = DeviceUtil.getKeyValueWithSharedPreferences('guideInstruction');
                    guideInstructionProm.then(function (data) {
                        // Based on the customer setting value display Favorites screen
                        if ($scope.customer && $scope.customer.DisplayFavorites) {
                            var isFavEmpty = favoritesManager.isFavEmpty();

                            if (!isFavEmpty) {
                                $state.go("app.favorite", {
                                    reload: true
                                });
                            } else {
                                $state.go("app.home", {
                                    reload: true
                                });
                            }
                        } else {
                            $state.go('app.home');
                        }
                    }).catch(function () {
                        var setProm = DeviceUtil.setKeyValueWithSharedPreferences('guideInstruction', false);
                        setProm.then(function () {
                            LoaderService.hide();
                            var customer = customersManager.getCustomers();
                            if (!customer.DisableFavoritesGuideDisplay) {
                                var guideConfirmPromise = PopupUtil.confirm($rootScope.getResourceText('LIT_MESSAGE'), $rootScope.getResourceText('MSG_MOBILE_CONFIRM_TO_SHOW_FAVORITE_GUIDE'));
                                guideConfirmPromise.then(function (success) {
                                    var setGuidePromise = DeviceUtil.setKeyValueWithSharedPreferences('guideInstruction', false);
                                    setGuidePromise.then(function () {
                                        if (success) {
                                            $state.go('sideapp');
                                        }
                                        else {
                                            $state.go('app.home');
                                        }
                                    });
                                });
                            }
                            else {
                                $state.go('app.home');
                            }
                        });
                    });

                    // Deleting all user records except current user record
                    userDetailsManager.deleteUserRecord();
                    window.localStorage.setItem('fromLogin', true);
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                }, function (errorResp) {
                    LoaderService.hide();
                });
            };

            function processName(completeName, iscompleted) {
                var timer = window.localStorage.getItem('timer');

                if (iscompleted === false) {
                    return simpleGetter.encrypt(completeName, timer);
                } else {
                    return simpleGetter.decrypt(completeName, timer).toString(CryptoJS.enc.Utf8);
                }
            }

            $scope.login = function (data) {
                cordova.plugins.Keyboard.close();

                if (isDeviceOnline()) {
                    if (data.username === null || data.username === '' || angular.isUndefined(data.username) || data.password === null || data.password === '' || angular.isUndefined(data.password)) {
                        ionicToast.showDefault($rootScope.getResourceText('LIT_PLEASE_ENTER_THE_DETAILS'));
                    } else {
                        //  window.localStorage.setItem('loginRedirect', 'true');
                        var setLoginRedirectProm = DeviceUtil.setKeyValueWithSharedPreferences('loginRedirect', "true");
                        setLoginRedirectProm.then(function () {
                            // executes this method when data is saved sucessfully.
                        });
                        loginToApp(data);
                    }
                } else {
                    AppMessages.Error($rootScope.getResourceText('LIT_LOGIN_FAILED'), $rootScope.getResourceText('MSG_CHECK_INTERNET_CONNECTION'));
                }
            };

            function loginToApp(data) {
                var baseUrl;
                var isCustomUrlEnabled = false;

                if ($scope.customer != null) {
                    var onlineVal = $scope.customer.OnlineVal;
                    var custName = $scope.customer.UniqueUrlPart;
                    var ckey = $scope.customer.CKey;
                    isCustomUrlEnabled = $scope.customer.IsCustomUrlEnabled;

                    if (!isCustomUrlEnabled) {
                        var onlineValueForBaseUrl = onlineVal;
                        if (onlineVal.toLowerCase() === 'cloud' && custName.toLowerCase() === 'cloud1') {
                            onlineValueForBaseUrl = 'cloudfp';
                        }

                        baseUrl = CommonMethodsFactory.getBaseUrl(onlineValueForBaseUrl);
                    } else baseUrl = $scope.customer.CustomUrl;
                } else {
                    var onlineVal = "test";
                    var custName = "DemoDK";
                    baseUrl = CommonMethodsFactory.getBaseUrl(onlineVal);
                }

                if (isCustomUrlEnabled) {
                    if (baseUrl.includes("api/v1")) Restangular.setBaseUrl('https://' + baseUrl);
                    else Restangular.setBaseUrl('https://' + baseUrl + '/api/v1/');
                }
                else Restangular.setBaseUrl('https://' + baseUrl + '/' + custName + '/api/v1/'); //Restangular.setBaseUrl('http://192.168.1.23/safetynet_sh/api/v1/');
                //Restangular.setBaseUrl('http://localhost:16755/api/v1/');
                //Restangular.setBaseUrl('http://192.168.1.6/s16/api/v1/');

                LocalStorageHelper.validateUserCredentials(data.username.toLowerCase(), data.password).then(function (success) {
                    window.localStorage.setItem('timer', new Date().getTime());
                    var completeName = data.username + '|' + data.password;
                    var completedNameValue = processName(completeName, false);
                    DeviceUtil.setKeyValueWithSharedPreferences("AppDetails", completedNameValue.toString());
                    //window.localStorage.setItem('AppDetails', completedNameValue.toString());
                    LoaderService.show(); // Irrespective of the whether firectly login or from the toggle screen call the initSuiteDetails so that 
                    // customer table related stuff gets updated at the last possible step.

                    var deviceLangPromise = LocalStorageHelper.setUserDeviceLanguage(ckey);
                    deviceLangPromise.then(function () {
                        var defaultLangPromise = LocalStorageHelper.setUserDefaultLanguage(custName, onlineVal, ckey);
                        defaultLangPromise.then(function () {
                            downloadSuiteDetails(custName, onlineVal, ckey, data, isCustomUrlEnabled);
                        });
                    });
                }, function (error) {
                    var loderProm = LoaderService.hide();
                    loderProm.then(function (sucess) {
                        if (sucess) {
                            if (error.data === null) {
                                var status = error.status;

                                if (status === -1 || status === 404) {
                                    var errorHeader = $rootScope.getResourceText('LIT_MESSAGE');
                                    var errorBody = $rootScope.getResourceText('MSG_URL_NOT_FOUND');
                                    AppMessages.Info(errorHeader, errorBody);
                                }
                            } else {
                                var errorMessage = error.data.Message;
                                var errorCode = error.data.Code;

                                if (!errorCode) {
                                    errorCode = $rootScope.getResourceText('LIT_MESSAGE');
                                }

                                AppMessages.Error(errorCode, errorMessage);
                            }
                        }
                    });
                });
            }

            function downloadSuiteDetails(custName, onlineVal, cKeyValue, data, isCustomUrlEnabled) {
                var suiteRefreshPromise = LocalStorageHelper.refreshSuiteDetails(custName, onlineVal, isCustomUrlEnabled);
                suiteRefreshPromise.then(function (cKey) {
                    customersManager.reset();
                    var cKeyValue = cKey.CKey;
                    var suitePromise = LocalStorageHelper.initSuiteDetails(custName, onlineVal, cKeyValue, isCustomUrlEnabled);
                    suitePromise.then(function (success) {
                        $scope.fetchUserDetails(data);
                        // $scope.$emit('RenderButtonBgHeaderColor');
                        $rootScope.$emit('darkModeEnable');
                    }, function (error) {
                        LoaderService.hide();
                    });
                });
            }

            $rootScope.toggleUrl = function () {
                PopOverUtil.closePopover($scope);
                $state.go('toggleUrl', { isFromLogin: true });
            };

            $scope.getExtendedHtml = function (extDescHtml) {
                return getHtml(extDescHtml);
            };

            function getHtml(extDescHtml) {
                var htmlDiv = document.createElement('div');
                htmlDiv.innerHTML = extDescHtml;
                var anchorCollection = htmlDiv.getElementsByTagName('a');

                for (var i = 0; i < anchorCollection.length; i++) {
                    var aElement = anchorCollection[i];
                    //var hrefAttr = aElement.removeAttribute('target'); // Commented below code as external links in IOS were not working with the below line of code
                    //TODO: Investigate the whole method as to why it was added. (*Link with just a document download was not working in IOS,
                    //When added this method it downloaded the file)
                    //aElement.setAttribute('target', '_system');
                }

                var modifiedHtml = htmlDiv.innerHTML;
                htmlDiv = null;
                return modifiedHtml;
            };

            $scope.ScanQRCode = function () {
                ToggleUrlMethodFactory.ScanQRCode($scope, true);
            };

            showScanner($scope.customer);

            function showScanner(customer) {
                if (customer == null)
                    $scope.showScanner = true;
                else
                    $scope.showScanner = customer.CustomUrl.toLowerCase() === "demodk";
            }

            var loginPageRefreshListner = $rootScope.$on("refreshLoginPage", function () {
                console.log("Listening")
                UpdateSuiteDetails();
            });

            var destroListener = $scope.$on('$destroy', function () {
                loginPageRefreshListner();
                destroListener();
            });

        }]);
})();


/***/ }),

/***/ "./scripts/controller/newsController.js":
/*!**********************************************!*\
  !*** ./scripts/controller/newsController.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    var app = angular.module('questionnaire');
    app.controller('newsController', ['$scope', 'PopupUtil', '$ionicPlatform', 'newsManager', 'LocalStorageHelper', 'LoaderService',
        'DocumentLibraryUtil', 'ModalUtil', '$sce', 'userDetailsManager', 'FileUtil', '$stateParams', '$rootScope',
        function ($scope, PopupUtil, $ionicPlatform, newsManager,
            LocalStorageHelper, LoaderService, DocumentLibraryUtil, ModalUtil, $sce,
            userDetailsManager, FileUtil, $stateParams, $rootScope) {

            $rootScope.$on("showNews", function (e, data) {
                $scope.showNews(data.newsId)
            });

            $scope.showNotificationIcon = function (news) {
                var newsId = news.Id;
                var notifiedNewsList = window.localStorage.getItem('notifiedNewsList');
                if (notifiedNewsList) {
                    var alreadyNotifiedList = notifiedNewsList.split('|');
                    return alreadyNotifiedList.includes(newsId);
                }
                return false;
            }

            $ionicPlatform.ready(function () {
                $scope.newsGroupList = newsManager.getNewsByUniqueGroupName();
                $scope.userDetail = userDetailsManager.getUserLastLoggedTimeStamp();

                if ($scope.newsGroupList.length === 0) {
                    LoaderService.show();
                    var downloadNewsData = LocalStorageHelper.getNewsDataDetails();
                    downloadNewsData.then(function (success) {
                        $scope.newsGroupList = newsManager.getNewsByUniqueGroupName();
                        getUnReadCount();
                        LoaderService.hide();
                    });
                } // Method is called after group name list is got.


                $scope.getNewsListByGroupName = function (groupName) {
                    var newsList = newsManager.getAllNewsByGroupType(groupName);

                    if (newsList.length === 0) {
                        $scope.newsGroupList = newsManager.getNewsByUniqueGroupName();
                        getUnReadCount();
                    }

                    return newsList;
                };

                $scope.isGroupShown = function (group) {
                    return group.IsGroupToggle;
                }; // For collapsible dropdown while displaying all the documents based on group name


                $scope.toggleGroup = function (group) {
                    group.IsGroupToggle = !group.IsGroupToggle;
                };

                $scope.updateNews = function () {
                    LoaderService.show();
                    var downloadNewsData = LocalStorageHelper.getNewsDataDetails();
                    downloadNewsData.then(function (success) {
                        $scope.newsGroupList = newsManager.getNewsByUniqueGroupName();
                        $scope.$broadcast('scroll.refreshComplete');
                        getUnReadCount();
                        LoaderService.hide();
                    }, function (fail) {
                        // Stop the ion-refresher from spinning
                        $scope.$broadcast('scroll.refreshComplete');
                        LoaderService.hide();
                    });
                };



                $scope.unReadCount = newsManager.getUnReadNewsCount();

                $scope.openHtmlDocument = function (newsData) {
                    newsData.IsRead = true; // Saving updated isRead property in DB

                    newsManager.markAsRead(newsData);
                    $scope.newsModalTitle = newsData.Header;
                    var decodedContent = "";
                    if (newsData.HtmlContent != null) {
                        decodedContent = DocumentLibraryUtil.decodeHTMLString(newsData.HtmlContent); //To prevent the ng-bind-error on click of popup
                    }
                    var content = angular.element('<div/>').html(decodedContent);
                    PopupUtil.htmlDocAlert($scope.newsModalTitle, content);
                    getUnReadCount();
                };

                function getUnReadCount() {
                    var unReadVal = newsManager.getUnReadNewsCount();
                    $scope.$emit('unReadValue', unReadVal);
                } // Open a physical file saved in the device

                $scope.showNews = function (id) {
                    var notifiedNews = newsManager.getNewsById(id);
                    if (notifiedNews !== null) {
                        $scope.openHtmlDocument(notifiedNews);
                    }
                }

                $scope.showFileList = function (news) {
                    var files = news.Files;
                    var title = news.Header;

                    if (files.length > 1) {
                        PopupUtil.showFileList(title, files, $scope);
                    } else {
                        var file = files[0];
                        $scope.openFile(file);
                    }
                };

                $scope.openFile = function (file) {
                    var fileName = file.FileName;
                    var filePath = file.DeviceFilePath;
                    var re = /(?:\.([^.]+))?$/;
                    var getExtension = re.exec(fileName)[1];
                    var contentType = FileUtil.getContentType(getExtension);
                    FileUtil.openFile(filePath, contentType);
                };

                var id = $stateParams.id;
                if (id) {
                    $scope.showNews(id);
                }
            });
        }]);
})();


/***/ }),

/***/ "./scripts/controller/question.js":
/*!****************************************!*\
  !*** ./scripts/controller/question.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    var app = angular.module('questionnaire');
    app.controller('questionController', ['$rootScope', '$scope', 'LocalStorageHelper',
        'personQuestionnaireManager', 'LoaderService', '$stateParams', '$state',
        'ionicToast', 'AppMessages', 'ModalUtil', '$ionicHistory', 'answerOptionManager',
        'PopupUtil', 'FileUtil', '$timeout', 'userApplicationsManager', 'userDetailsManager',
        '$ionicScrollDelegate', 'QuestionnaireMethodFactory', '$q', 'TextToSpeachUtil', 'SpeachToTextUtil',
        'GeneralUtil', 'customersManager', 'valuationAnswerOptionManager', 'CommonMethodsFactory', 'DateUtil',
        function ($rootScope, $scope, LocalStorageHelper, personQuestionnaireManager, LoaderService, $stateParams, $state,
            ionicToast, AppMessages, ModalUtil, $ionicHistory, answerOptionManager, PopupUtil, FileUtil, $timeout, userApplicationsManager,
            userDetailsManager, $ionicScrollDelegate, QuestionnaireMethodFactory, $q, TextToSpeachUtil, SpeachToTextUtil, GeneralUtil, customersManager,
            valuationAnswerOptionManager, CommonMethodsFactory, DateUtil) {
            //LoaderService.show();  //Hiding the loader for local operations
            var id = $stateParams.id;
            var personQue = personQuestionnaireManager.getPersonQuestionnaire(id); //Now we need to reset the IsDependencyMet property of the for the 
            //question since an instance of a question is referenced by mutiple answers of the same questionnaire.
            //So before the start of answering of a questionnaire clear IsDependentQUestions IsDependencyMet flag to false.
            // This below method refactors the entity with respect to questionnaire entity only
            // Based on person questionnaire template/ person questionnaire entity, questionnaire entity is generated.

            var questionnaireEntity = QuestionnaireMethodFactory.refactorQueEntity(personQue);

            function setInitialDependencyQuestions(questionGroups, answers) {
                QuestionnaireMethodFactory.setInitialDependency(questionGroups, answers);
            } // Assing the refactored entity to the scope variable (For view purpose)


            var groups = questionnaireEntity.Groups;
            setInitialDependencyQuestions(groups, personQue.Answers);
            $scope.validQuestionnaireGroups = QuestionnaireMethodFactory.validateQuestionGroupsInDependency(groups);
            $scope.title = $stateParams.viewTitle;
            $scope.modColor = $stateParams.modColor; // This boolean value disables the Submit/Back/Next while answering (Handling user interaction after first click)

            $scope.isDisabled = false;
            $scope.isDatePickDisabled = false;
            window.addEventListener('native.keyboardhide', function () {
                //screen.unlockOrientation();
                window.blur();
            });
            $scope.pq = personQue; // Array to save the instances of the directive

            $scope.directiveScopeArray = []; // Assing the refactored entity to the scope variable (For view purpose)

            $scope.questionnaire = questionnaireEntity;
            $scope.modName = $scope.questionnaire.ModuleName();

            $scope.navigatingGroupIndex = $scope.currentGroupIndex = 0; // Boolean value to show/hide the questionnaire template

            $scope.endOfQuestionnaire = false;
            $scope.questionnaireGroupLength = $scope.validQuestionnaireGroups.length - 1;
            $scope.userDetail = userDetailsManager.getUserLastLoggedTimeStamp();
            $scope.readAloud = $scope.userDetail.Customer.IsReadAloudTextEnable;
            $scope.androidVersion = SpeachToTextUtil.checkAndroidVersion();
            $scope.DisableUploadPhotoLibary = $scope.userDetail.Customer.DisableReadImageFromPhotoLibary; //By default LastGroupIndex can be -1, so during this scenario setting the currentGroupIndex to 0.
            $scope.isEnableLocation = $scope.userDetail.Customer.EnableGeoLocation;
            $scope.canPickDoc = $scope.userDetail.Customer.AllowedExtensions != null || $scope.userDetail.Customer.AllowedExtensions != '';
            $scope.allowedExtensions = $scope.userDetail.Customer.AllowedExtensions != null ? $scope.userDetail.Customer.AllowedExtensions : null;

            if ($scope.pq.LastGroupIndex == null || $scope.pq.LastGroupIndex === -1) {
                $scope.currentGroupIndex = 0;
            } else {
                $scope.navigatingGroupIndex = $scope.currentGroupIndex = $scope.pq.LastGroupIndex;
            } //$scope.pq.DepartmentId = evalId; // As of now this is commented. Should have the default value (i.e., at the time of download)
            //Save start screen changes..
            // Performing a check, as on preview of a questionnaire it was moving to in-progress from completed.


            if ($state.current.name === 'app.qTabs.inProgress') {
                personQuestionnaireManager.savePersonQuestionniare($scope.pq, false);
            } // Saving the $index value of ng-repeat to a scope variable


            $scope.setCount = function (index) {
                $scope.count = index;
            };

            $scope.listReOrdered = function (pqaAnswer, reOrderedList) {
                var answerId = reOrderedList.join('|');
                return pqaAnswer.AnswerId = answerId;
            }

            $scope.showNext = function (currentGroupIndex) {
                var tempCurrentGroupIndex = currentGroupIndex + 1;
                var allGroups = $scope.questionnaire.Groups;
                var validGroups = QuestionnaireMethodFactory.validateQuestionGroupsInDependency(allGroups);

                while (tempCurrentGroupIndex < allGroups.length) {
                    var currentGroup = allGroups[tempCurrentGroupIndex];

                    if (isValidGroup(validGroups, currentGroup) === true) {
                        return true;
                    }

                    tempCurrentGroupIndex = tempCurrentGroupIndex + 1;
                }

                return false;
            };

            $scope.getCorrectCurrentGroupIndex = function (currentGroupIndex, isNext) {
                var allGroups = $scope.questionnaire.Groups;
                var validGroups = QuestionnaireMethodFactory.validateQuestionGroupsInDependency(allGroups);
                var groupLength = allGroups.length;
                var tempCurrentGrpIndex = currentGroupIndex;
                var i = 0;

                while (i < groupLength) {
                    if (isNext === true) {
                        tempCurrentGrpIndex += 1;
                    } else {
                        tempCurrentGrpIndex -= 1;
                    }

                    var currentGroup = allGroups[tempCurrentGrpIndex];

                    if (isValidGroup(validGroups, currentGroup) === true) {
                        break;
                    }

                    i++;
                }

                $scope.questionnaireGroupLength = validGroups.length - 1;
                return tempCurrentGrpIndex;
            };

            $scope.startListening = function (entity, type) {
                var speech = SpeachToTextUtil.startListening();
                speech.then(function (result) {
                    console.log(result[0]);

                    switch (type) {
                        case 'Comment':
                            entity.Comment = result[0];
                            break;

                        case 'ShortText':
                            entity.AnswerText = result[0];
                            break;

                        case 'LongText':
                            entity.AnswerText = result[0];
                            break;

                        default:
                    }
                }, function () { });
            };

            function isValidGroup(validGroups, currentGroup) {
                for (var i = 0; i < validGroups.length; i++) {
                    var vg = validGroups[i];

                    if (vg.Id === currentGroup.Id) {
                        return true;
                    }
                }

                return false;
            }

            $scope.showGroupDescription = function (groupName, groupDescription) {
                if (groupDescription === null) {
                    ionicToast.showDefault(groupName);
                    return;
                }

                PopupUtil.readAloudAlert(groupName, groupDescription, $scope);
            };

            $scope.showImageViewer = function (pqaView) {
                if (!pqaView.MarkedForDelete) {
                    return pqaView.FileLocation !== null;
                }

                return false;
            };

            $scope.selectFile = function (isFile, pqaArg, imageUri) {
                var pqa = pqaArg;

                if (!isFile) AttachPhoto(pqa);
                else {
                    if (!imageUri) AppMessages.Error($rootScope.getResourceText('LIT_MOBILE_ALLOWED_EXTENSION'), `${$rootScope.getResourceText('MSG_MOBILE_ALLOWED_EXTENSION')} : ${$scope.allowedExtensions}`);
                    else UploadFile(imageUri, pqa);
                }
            };
            
            function AttachPhoto(pqa) {
                var attachedPromise = PopupUtil.getAttachment($rootScope.getResourceText('LIT_ATTACHMENTS'), null, $scope, true);
                attachedPromise.promise.then(function (imageUri) {
                    UploadFile(imageUri, pqa);
                }, function (error) {
                    AppMessages.Error($rootScope.getResourceText('LIT_MESSAGE'), $rootScope.getResourceText('MSG_NO_CAMERA_FOUND'));
                });
            }

            function UploadFile(imageUri, pqa) {
                var personQueAnswer = pqa;
                PopupUtil.hide(); // The below promise returns the corrected file name if the file name starts with 'content://'

                var fileInfoPromise = FileUtil.getFilePathAndName(imageUri);
                fileInfoPromise.promise.then(function (successFileInfo) {
                    personQueAnswer.FileLocation = successFileInfo.fileLocation;
                    personQueAnswer.FileName = successFileInfo.fileName;
                    var urlPathPromise = $rootScope.getInternalUrl(personQueAnswer.FileLocation);
                    urlPathPromise.then(function (internalUrl) {
                        personQueAnswer.InternalFileLocation = internalUrl;
                    });
                    personQueAnswer.MarkedForDelete = false;
                }, function (errorFileInfo) {// Show some message to the user saying select the image again: TODO
                });
            }

            $scope.showImage = function (pqaView) {
                CommonMethodsFactory.showImage(pqaView, $scope);
            };

            $scope.getThumnail = function (pqaView) {
                var isPdfFile = pqaView.FileName && pqaView.FileName.toLowerCase().endsWith('.pdf');

                if (!isPdfFile) {
                    var fileLoc = pqaView.InternalFileLocation;
                    var isAndroid = ionic.Platform.isAndroid();
                    if (isAndroid === true) {
                        return fileLoc;
                    }

                    if (fileLoc) {
                        var osSpecificLocation = FileUtil.getImageFilePath(fileLoc);
                        return osSpecificLocation;
                    }
                    return "images/gallery.png";
                } else return "images/pdf.png";
            };

            $scope.deleteQuestionImage = function (pqaView) {
                var confirmPromise = PopupUtil.confirm($rootScope.getResourceText('LIT_DELETE'), $rootScope.getResourceText('MSG_CONFIRM_DELETE_FIELD'));
                confirmPromise.then(function (success) {
                    if (success) {
                        pqaView.MarkedForDelete = true; // PDF was not generating on edit of answer FT 7352

                        pqaView.FileSourceBase64 = null; // Delete the image from system on conformation

                        var filePath = pqaView.FileLocation;
                        var deletePromise = FileUtil.deleteFile(filePath);
                        deletePromise.then(function (success) {// Success
                            pqaView.FileLocation = null;
                        }, function (error) {// Error
                        });
                    }
                });
            };

            $scope.close = function () {
                ModalUtil.closeModal($scope);
            };

            $scope.ttsConvert = function (queInstance, event) {
                var text = TextToSpeachUtil.stripHTML(queInstance);
                TextToSpeachUtil.convertTextToSpeach(text);

                if (event) {
                    event.preventDefault(); // added for ionic

                    event.stopPropagation();
                }
            };

            $scope.getPersonQuestionAnswer = function (questionId) {
                var pqa = $scope.pq.Answers;
                return QuestionnaireMethodFactory.getPersonQuestionAnswer(questionId, pqa);
            }; // Fetching the person valuation question answer to save or display

            $scope.getPersonVQAnswer = function (qId, vqId) {
                var pvqaEntity = $scope.pq.ValuationAnswers;
                return QuestionnaireMethodFactory.getPersonVQAnswer(qId, vqId, pvqaEntity);
            };

            $scope.loadTemplate = function (q) {
                switch (q.TypeCode) {
                    case 0:
                        return "templates/answer_templates/shortText.html";

                    case 1:
                        return 'templates/answer_templates/longText.html';

                    case 2:
                        if ($scope.questionnaire.ControlType === "List") {
                            return "templates/questionnaire/listDropDownTemplates/listDropDown.html";
                        }
                        return "templates/answer_templates/radio.html";

                    case 3:
                        if ($scope.questionnaire.ControlType === "List") {
                            return "templates/questionnaire/listDropDownTemplates/listDropDown.html";
                        }
                        return "templates/answer_templates/checkBox.html";

                    case 4:
                        return 'templates/answer_templates/signature.html';
                    case 5:
                        if (q.ColumnType != null) {
                            return loadDataTypeTemplate(q.ColumnType);
                        } else {
                            return "templates/answer_templates/shortText.html";
                        }
                    case 6:
                        return 'templates/questionnaire/ranking.html';

                    default:
                        return 'templates/answer_templates/buttonGroup.html';
                }
            };

            $scope.getFontColor = function (color) {
                if (color === null || color === undefined) {
                    return "#000000";
                }
                var newcolor = color.startsWith("#") ? color.slice(1) : color;
                let r = parseInt(newcolor.slice(0, 2), 16);
                let g = parseInt(newcolor.slice(2, 4), 16);
                let b = parseInt(newcolor.slice(4, 6), 16);
                let val = (r * 299 + g * 587 + b * 144) / 1000;
                return val >= 128 ? "#000000" : color;
            };

            function loadDataTypeTemplate(dataType) {

                switch (dataType) {
                    case 'Department':
                    case 'LineOfBusiness':
                    case 'ListValue':
                    case 'Person':
                    case 'EasyClassification':
                    case 'ProblemArea':
                    case 'SafetyDepartment':
                    case 'Asset':
                    case 'Insurance':
                    case 'City':
                    case 'Country':
                    case 'GeographyLocation':
                    case 'Chemical':
                        return 'templates/questionnaire/dataTypes/dropDownDefault.html';
                    case 'EditableTimePicker':
                        return 'templates/questionnaire/dataTypes/editabletimepicker.html';
                    case 'TimePicker':
                        return 'templates/questionnaire/dataTypes/timepicker.html';
                    case 'DatePicker':
                        return 'templates/questionnaire/dataTypes/datePicker.html';
                    case 'TextBox':
                        return 'templates/questionnaire/dataTypes/shortText.html';
                    case 'Numeric':
                        return 'templates/questionnaire/dataTypes/numeric.html';
                    case 'CheckBox':
                        return 'templates/questionnaire/dataTypes/checkBox.html';
                    case 'CountPicker':
                        return 'templates/questionnaire/dataTypes/countPicker.html';
                    case 'HtmlHelpText':
                        return 'templates/questionnaire/dataTypes/htmlText.html';
                }
            }

            $scope.setValue = function (pqaView) {
                var chkBox = pqaView.IsBooleanField;
                pqaView.AnswerText = chkBox;
            }
            $scope.setDirectiveFn = function (directiveFn, queInst) {
                $timeout(function () {
                    var arrayValue = {
                        'queId': queInst.Id,
                        'directiveFn': directiveFn
                    };

                    for (var i = 0; i < $scope.directiveScopeArray.length; i++) {
                        var diretiveVal = $scope.directiveScopeArray[i];

                        if (diretiveVal.queId === queInst.Id) {
                            $scope.directiveScopeArray.splice(i, 1);
                        }
                    }

                    $scope.directiveScopeArray.push(arrayValue);
                }, 500);
            };

            var handleSignDirectiveOnDepen = function handleSignDirectiveOnDepen(groups) {
                var currentGroup = groups[$scope.currentGroupIndex];
                var questionList = currentGroup.Questions;

                for (var i = 0; i < questionList.length; i++) {
                    var queVal = questionList[i];
                    var queId = queVal.Id;
                    var isDepnMet = queVal.IsDependencyMet;

                    if (!isDepnMet) {
                        for (var j = 0; j < $scope.directiveScopeArray.length; j++) {
                            var dirQueId = $scope.directiveScopeArray[j].queId;

                            if (queId === dirQueId) {
                                $scope.directiveScopeArray.splice(j, 1);
                            }
                        }
                    }
                }
            }; // This method is called based on a callback function from the signature directive


            $scope.getImageBase64 = function (signVal, que) {
                var groups = $scope.questionnaire.Groups;
                var currentIndex = $scope.currentGroupIndex;
                var group = groups[currentIndex];
                var qgId = group.Id;
                var qId = que.Id;
                var pqa = $scope.getPersonQuestionAnswer(que.Id);
                pqa.AnswerImage = null; // Including the boolean value to disable signature canvas after click on Done

                if (signVal === null) {
                    pqa.IsDoneSign = false;
                } else {
                    pqa.IsDoneSign = true;
                }

                pqa.AnswerImage = signVal;
                $scope.validateSignCanvas(qgId, qId, que.IsRequired);
            };

            $scope.previewSignImageLoc = function (answerImage) {
                if (answerImage) {
                    return answerImage;
                }
            }; // Returns the valuation template path


            $scope.loadValuationTemplate = function () {
                return "templates/questionnaire/valuation/valuationTemplate.html";
            }; // returns valuation answer templates based on the type of the question


            $scope.loadValuationAnswerTemplate = function (questionType) {
                switch (questionType) {
                    case 0:
                        return "templates/questionnaire/valuation/valuationAnswer/shortText.html";

                    case 1:
                        return 'templates/questionnaire/valuation/valuationAnswer/longText.html';

                    case 2:
                        if ($scope.questionnaire.ControlType === "List") {
                            return "templates/questionnaire/listDropDownTemplates/vqListDropDown.html";
                        }
                        return "templates/questionnaire/valuation/valuationAnswer/radio.html";

                    case 3:
                        if ($scope.questionnaire.ControlType === "List") {
                            return "templates/questionnaire/listDropDownTemplates/vqListDropDown.html";
                        }
                        return "templates/questionnaire/valuation/valuationAnswer/checkBox.html";

                    case 4:
                        return 'templates/questionnaire/valuation/valuationAnswer/dropDown.html';

                    case 6:
                        return 'templates/questionnaire/valuation/valuationAnswer/ranking.html';
                    default:
                        return 'templates/questionnaire/valuation/valuationAnswer/buttonGroup.html';
                }
            }; // This method is called only during preview of a questionnaire. As both answering and preview uses same controller


            $scope.loadValuationAnswerPreviewTemplate = function (questionType) {
                switch (questionType) {
                    case 0:
                        return "templates/preview_templates/questionnaire/valuation/shortTextVQPV.html";

                    case 1:
                        return 'templates/preview_templates/questionnaire/valuation/longTextVQPV.html';

                    case 2:
                        return 'templates/preview_templates/questionnaire/valuation/radioVQPV.html';

                    case 3:
                        return 'templates/preview_templates/questionnaire/valuation/checkBoxVQPV.html';

                    case 6:
                        return 'templates/preview_templates/questionnaire/valuation/rankingVQPV.html';
                    default:
                        return;
                }
            }; // This method is called only during preview of a questionnaire. As both answering and preview uses same controller


            $scope.loadPreviewTemplate = function (qId, questionType) {
                switch (questionType) {
                    case 0:
                        return "templates/preview_templates/questionnaire/shortTextPV.html";

                    case 1:
                        return 'templates/preview_templates/questionnaire/longTextPV.html';

                    case 2:
                        return 'templates/preview_templates/questionnaire/radioPV.html';

                    case 3:
                        return 'templates/preview_templates/questionnaire/checkBoxPV.html';

                    case 4:
                        return 'templates/preview_templates/questionnaire/signaturePV.html';

                    case 6:
                        return 'templates/preview_templates/questionnaire/rankingPV.html';

                    default:
                        return "templates/preview_templates/questionnaire/longTextPV.html";;
                }
            };

            $scope.getAnswerIds = function (savedAnswerId) {
                var seperator = '|';
                var answerIds = [];

                if (savedAnswerId !== null) {
                    answerIds = savedAnswerId.split(seperator);
                }

                return answerIds;
            };

            $scope.processAnswerIds = function (savedAnswerId, selectedAnswerId, isAdd) {
                var seperator = '|';
                var answerIds = this.getAnswerIds(savedAnswerId);

                if (isAdd) {
                    answerIds.push(selectedAnswerId);
                } else {
                    var removeIndex = answerIds.indexOf(selectedAnswerId);
                    answerIds.splice(removeIndex, 1);
                }

                return answerIds.join(seperator);
            }; // To handle the questionnaire dependency infinite loop issue 


            var triggerQueId = [];

            $scope.textDependencyTrigger = function (questionEntity, personQuestionAnswerEntity) {
                triggerQueId = [];
                handleTrigger(questionEntity, personQuestionAnswerEntity);
            };

            function handleTrigger(questionEntity, personQuestionAnswerEntity) {
                if (questionEntity.IsTriggerQuestion === true) {
                    //Access all the Dependent Questions and set the value of the answer selected.
                    var deptQuestions = questionEntity.DependentQuestions;

                    for (var i = 0; i < deptQuestions.length; i++) {
                        var dependentQuestionEntity = deptQuestions[i];
                        var isDepQueDependencyAlreadyMet = dependentQuestionEntity.IsDependencyMet;
                        var pqaTrigger = $scope.getPersonQuestionAnswer(dependentQuestionEntity.Id);

                        if (questionEntity.IsDependencyMet === false) {
                            pqaTrigger.FileName = pqaTrigger.FileLocation = pqaTrigger.AnswerText = pqaTrigger.AnswerId = pqaTrigger.Comment = null;
                        }

                        var depMet = dependentQuestionEntity.isDependencyMet($scope.pq.Answers);

                        if (depMet === false) {
                            pqaTrigger.FileName = pqaTrigger.FileLocation = pqaTrigger.AnswerText = pqaTrigger.AnswerId = pqaTrigger.Comment = null;
                        }

                        if (dependentQuestionEntity.IsTriggerQuestion === true) {
                            var depQueEntityId = dependentQuestionEntity.Id; // Check if the id present in the array, if present then skip (dependency is checked)

                            if (triggerQueId.indexOf(depQueEntityId) > -1) {
                                handleTrigger(dependentQuestionEntity, pqaTrigger);
                            }
                        }

                        triggerQueId.push(questionEntity.Id); //if (dependentQuestionEntity.IsDependencyMet === false) {
                        //    pqaTrigger.FileName = pqaTrigger.FileLocation = pqaTrigger.AnswerText = pqaTrigger.AnswerId = pqaTrigger.Comment = null;
                        //}
                    }
                }

                var groups = questionnaireEntity.Groups;
                $scope.validQuestionnaireGroups = QuestionnaireMethodFactory.validateQuestionGroupsInDependency(groups);
                $scope.questionnaireGroupLength = $scope.validQuestionnaireGroups.length - 1; // On dependency trigger check if signature instance have to be added to the array or removed

                if ($scope.directiveScopeArray.length !== 0) {
                    handleSignDirectiveOnDepen(groups);
                }
            }

            $scope.setAnswerOptionSelected = function (answerOptionId, checkStatus, question) {
                var pqa = this.getPersonQuestionAnswer(question.Id);
                var savedAnswerId = pqa.AnswerId;
                pqa.AnswerId = savedAnswerId = this.processAnswerIds(savedAnswerId, answerOptionId, checkStatus);
                handleTrigger(question, pqa);
            };

            $scope.checkCommentRequiredRadio = function (ao, pq) {
                // IsCommentRequired and IsFileAttachmentRequired entity at personQuestion level is set to true/false based on the
                // AnswerOption CommentRequired and FileAttachmentRequired entity
                pq.IsCommentRequired = ao.CommentRequired;
                pq.IsFileAttachmentRequired = ao.FileAttachmentRequired;
            };

            $scope.checkCommentRequiredCheckBox = function (ao, pq, checkStatus) {
                // IsCommentRequired and IsFileAttachmentRequired entity at personQuestion level is set to true/false based on the
                // AnswerOption CommentRequired and FileAttachmentRequired entity
                // checkStatus is the ng-model value of the checkbox which is a boolean value
                if (ao.CommentRequired) {
                    if (checkStatus) {
                        pq.IsCommentRequired = ao.CommentRequired;
                    } else {
                        // Assigning checkStatus value to the entity for the scenario where user unchecks the selected
                        // checkbox, where comment is mandatory for the answer option. (To make the comment not mandatory) 
                        pq.IsCommentRequired = false;
                    }
                }

                if (ao.FileAttachmentRequired) {
                    if (checkStatus) {
                        pq.IsFileAttachmentRequired = ao.FileAttachmentRequired;
                    } else {
                        // Assigning checkStatus value to the entity for the scenario where user unchecks the selected
                        // checkbox, where fileAttachment is mandatory for the answer option. (To make the file attachment not mandatory) 
                        pq.IsFileAttachmentRequired = false;
                    }
                }
            };

            $scope.checkCommentRequired = function (q, pqa) {
                pqa.IsCommentRequired = false;

                for (var i = 0; i < q.AnswerOptions.length; i++) {
                    var ao = q.AnswerOptions[i];

                    if (ao.CommentRequired) {
                        if (pqa.AnswerId) {
                            var ids = pqa.AnswerId.split('|');

                            if (ids.indexOf(ao.Id) >= 0) {
                                pqa.IsCommentRequired = true;
                                return;
                            }

                            ;
                        }
                    }
                }

                return;
            };

            $scope.checkFileAttachmentRequired = function (q, pqa) {
                pqa.IsFileAttachmentRequired = false;

                for (var i = 0; i < q.AnswerOptions.length; i++) {
                    var ao = q.AnswerOptions[i];

                    if (ao.FileAttachmentRequired) {
                        if (pqa.AnswerId) {
                            var ids = pqa.AnswerId.split('|');

                            if (ids.indexOf(ao.Id) >= 0) {
                                pqa.IsFileAttachmentRequired = true;
                                return;
                            }
                        }
                    }
                }

                return;
            };

            $scope.moveCursorToComment = function (pqaView, event) {
                setTimeout(function () {
                    if (pqaView.IsCommentRequired === true && pqaView.AnswerId !== null) {
                        angular.element(event.target).parents('.item-body').find('.commentBox').focus();
                    }
                }, 500);
            }

            $scope.showDependencyQueAns = function (que) {
                if (que.ShowDependencyQuestion) {
                    ionicToast.show(que.DependencyMetText, 'middle', false, 2500);
                }
            }; // Not used in the view currently


            $scope.setAnswerOptionSelectedRadio = function (answerOptionId, question) {
                //Needs to be checked if already set by the model 
                //then remove the below lines of code.
                var pqa = this.getPersonQuestionAnswer(question.Id);
                pqa.AnswerId = answerOptionId;
                handleTrigger(question, pqa);
            };

            $scope.getDefaultStatus = function (questionId, answerOptionId) {
                var pqaEntity = $scope.pq.Answers;
                return QuestionnaireMethodFactory.getDefaultStatus(questionId, answerOptionId, pqaEntity);
            }; // Below set of methods are used for valuation question answer
            // set the answer option selected to the model (ther by to the DB)
            // check the status is a check box is previously selected or is selected by the user
            // To set the selected answer for radio button


            $scope.setPVQAnswerOptionSelected = function (qId, vqId, aoId, status) {
                var pvqa = this.getPersonVQAnswer(qId, vqId);
                var savedAnswerId = pvqa.AnswerId;
                pvqa.AnswerId = savedAnswerId = this.processAnswerIds(savedAnswerId, aoId, status);
            };

            $scope.getVQDefaultStatus = function (qId, vqId, aoId) {
                var pvqaEntity = $scope.pq.ValuationAnswers;
                return QuestionnaireMethodFactory.getVQDefaultStatus(qId, vqId, aoId, pvqaEntity);
            };

            $scope.setSelected = function (question, answerOptionId, event) {
                var pqa = this.getPersonQuestionAnswer(question.Id);

                if (pqa.TempAnswerId == question.Id + '|' + event.target.value) {
                    pqa.AnswerId = pqa.TempAnswerId = null;
                } else {
                    pqa.TempAnswerId = question.Id + '|' + pqa.AnswerId;
                }

                handleTrigger(question, pqa);
            };

            function isAnswerExist(type, answerIds, optionId, checkStatus) {
                var isExist = false;
                if (answerIds) {
                    switch (type) {
                        case 'radio':
                            isExist = answerIds === optionId;
                            break;
                        case 'checkbox':
                            isExist = checkStatus && answerIds.split("|").includes(optionId) > -1;
                            break;
                        default:
                            isExist = answerIds === optionId;
                            break;
                    }
                }
                return isExist;
            }

            $scope.getBackColor = function (que, questionId, answerOption, type, checkStatus) {
                var pqa = this.getPersonQuestionAnswer(questionId);

                if (pqa && isAnswerExist(type, pqa.AnswerId, answerOption.Id, checkStatus) && que.EnableAnswerOptionColour)
                    return answerOption.ColourCode;
                else
                    return "#ffffff";
            }

            $scope.getColor = function (que, questionId, answerOption, color, type, checkStatus) {
                var backColor = this.getBackColor(que, questionId, answerOption, type, checkStatus);

                var r = parseInt(backColor.substring(1, 3), 16);
                var g = parseInt(backColor.substring(3, 5), 16);
                var b = parseInt(backColor.substring(5, 7), 16);
                var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
                return color === "#000000" || "#FFFFFF" ? (yiq >= 128) ? "#000000" : "#FFFFFF" : color;
            }

            $scope.setVQSelected = function (qId, vqId, aoId, event) {
                var pvqa = this.getPersonVQAnswer(qId, vqId);

                if (pvqa.TempVQAnswerId == qId + '|' + vqId + '|' + event.target.value) {
                    pvqa.AnswerId = pvqa.TempVQAnswerId = null;
                } else {
                    pvqa.TempVQAnswerId = qId + '|' + vqId + '|' + pvqa.AnswerId;
                }
            };

            $scope.setVQAnswerOptionSelectedRadio = function (qId, vqId, aoId) {
                var pvqa = this.getPersonVQAnswer(qId, vqId);
                pvqa.AnswerId = aoId;
            };

            $scope.getDropDownText = function (answerId) {
                if (answerId !== null) {
                    var answerEntity = answerOptionManager.getAnswerOption(answerId);
                    var answerText = answerEntity.Text;
                    return answerText;
                }
            };

            $scope.showView = function () {
                $scope.pos = ($scope.navigatingGroupIndex + 1) / ($scope.questionnaireGroupLength + 1) * 100 + '%';
                return $scope.currentGroupIndex;
            };

            $scope.previousView = function () {
                // Hiding the keyboard if it is open while navigating to next view
                cordova.plugins.Keyboard.close();
                $scope.directiveScopeArray = [];
                $scope.isDisabled = true; //LoaderService.show();  //Hiding the loader for local operations

                $timeout(function () {
                    if ($scope.currentGroupIndex === 0) {
                        var backView = $ionicHistory.backView().stateName;
                        $scope.currentGroupIndex = -1;

                        switch (backView) {
                            case 'app.qTabs.active':
                            case 'app.qTabs.inProgress':
                            case 'app.qTabs.completed':
                            case 'app.rTabs.active':
                            case 'app.rTabs.inProgress':
                            case 'app.rTabs.completed':
                            case 'app.eTabs.active':
                            case 'app.eTabs.inProgress':
                            case 'app.eTabs.completed':
                            case 'app.hTabs.active':
                            case 'app.hTabs.inProgress':
                            case 'app.hTabs.completed':
                            case 'app.mTabs.active':
                            case 'app.mTabs.inProgress':
                            case 'app.mTabs.completed':
                            case 'app.fpTabs.active':
                            case 'app.fpTabs.inProgress':
                            case 'app.fpTabs.completed':
                                $state.go('app.startScreen', {
                                    id: id,
                                    state: $ionicHistory.currentView().stateName,
                                    viewTitle: $scope.title,
                                    modColor: $scope.modColor
                                }, {
                                    reload: false,
                                    inherit: false,
                                    notify: true
                                });
                                break;

                            case 'app.startScreen':
                                $ionicHistory.goBack();
                                break;

                            default:
                                $ionicHistory.goBack();
                        }
                    } else {
                        $scope.pq = personQuestionnaireManager.savePersonQuestionniare($scope.pq, false);
                        $scope.currentGroupIndex = $scope.getCorrectCurrentGroupIndex($scope.currentGroupIndex, false);
                        $scope.navigatingGroupIndex = $scope.navigatingGroupIndex - 1;
                    } //LoaderService.hide();


                    $scope.isDisabled = false;
                }, 500);
            };

            $scope.nextView = function () {
                //LoaderService.show();  //Hiding the loader for local operations
                // Hiding the keyboard if it is open while navigating to next view
                cordova.plugins.Keyboard.close(); // Iterating through the list of directive array and calling the callback method present in directive.js file

                for (var i = 0; i < $scope.directiveScopeArray.length; i++) {
                    var dirFun = $scope.directiveScopeArray[i];
                    $scope.directiveFn = dirFun.directiveFn;
                    $scope.directiveFn();
                } // clearing the array once signatures are saved


                $scope.directiveScopeArray = [];
                $scope.isDisabled = true;
                var that = this;
                $timeout(function () {
                    var isValid = that.validateCurrentGroup();

                    if (isValid === true) {
                        $scope.pq.LastGroupIndex = $scope.currentGroupIndex; //Changes are persisted to the localstorage every time the user says next.

                        $scope.pq = personQuestionnaireManager.savePersonQuestionniare($scope.pq, false);
                        $scope.currentGroupIndex = $scope.getCorrectCurrentGroupIndex($scope.currentGroupIndex, true);
                        $scope.navigatingGroupIndex = $scope.navigatingGroupIndex + 1;
                        $ionicScrollDelegate.scrollTop(true);
                    } //var hideProm = LoaderService.hide();
                    //hideProm.then(function () {


                    if (isValid === false) {
                        ionicToast.showDefault($rootScope.getResourceText('LIT_REQUIRED'));
                    } //});


                    $scope.isDisabled = false;
                }, 500); // Reducing the time out to 0 from 50 (For local operations)
            };

            function getTabName(moduleName) {
                switch (moduleName) {
                    case 'RiskProfile':
                        return 'rTabs';

                    case 'EmployeeSatisfaction':
                        return 'eTabs';

                    case 'ManagementEvaluation':
                        return 'mTabs';

                    case 'HumanResource':
                        return 'hTabs';

                    case 'Apv':
                        return 'qTabs';

                    case 'FrontPlanner':
                        return 'fpTabs';
                }
            }

            function onLocationSucess(geoPromise, position) {
                var xVal = position.coords.longitude;
                var yVal = position.coords.latitude;
                geoPromise[0].resolve({
                    x: xVal,
                    y: yVal
                });
            }

            function onLocationFailure(geoPromise, location) {
                geoPromise[0].resolve({
                    x: null,
                    y: null
                });
            }

            $scope.submit = function () {
                $scope.isDisabled = true; // Iterating through the list of directive array and calling the callback method present in directive.js file

                for (var i = 0; i < $scope.directiveScopeArray.length; i++) {
                    var dirFun = $scope.directiveScopeArray[i];
                    $scope.directiveFn = dirFun.directiveFn;
                    $scope.directiveFn();
                }

                $scope.directiveScopeArray = [];

                var isValid = this.validateCurrentGroup();

                if (isValid) {
                    var isGeoLocatioEditEnabled = $scope.questionnaire.EnableEditGeoLocation;
                    var geoLocationPromise = $q.defer();

                    if ($scope.isEnableLocation && isGeoLocatioEditEnabled) {
                        // If Geo location setting is enabled then below lines are executed
                        var geoTimeOut = $scope.userDetail.Customer.GeoLocationTimeout;
                        var geoEnableHighAccuracy = $scope.userDetail.Customer.EnableHighAccuracyForGeoLocation;
                        var options = {
                            timeout: geoTimeOut,
                            enableHighAccuracy: geoEnableHighAccuracy
                        };
                        var sucessGeo = onLocationSucess.bind(this, [geoLocationPromise]);
                        var failureGeo = onLocationFailure.bind(this, [geoLocationPromise]);
                        navigator.geolocation.getCurrentPosition(sucessGeo, failureGeo, options);
                    } else {
                        geoLocationPromise.resolve({
                            x: null,
                            y: null
                        });
                    }

                    var that = this;
                    geoLocationPromise.promise.then(function (resolvedLocation) {
                        //LoaderService.show();  //Hiding the loader for local operationsLoaderService.show();
                        //Hiding the keyboard if it is open while navigating to next view
                        cordova.plugins.Keyboard.close();
                        if (!isGeoLocatioEditEnabled) {
                            $scope.pq.GeoX = resolvedLocation.x;
                            $scope.pq.GeoY = resolvedLocation.y;
                        }
                        $timeout(function () {
                            var moduleName = $scope.questionnaire.ModuleName();
                            var isSurveyQuestionnaire = $scope.questionnaire.IsSurvey;
                            var module = userApplicationsManager.getUserApplication($scope.userDetail.UserId, $scope.questionnaire.TypeCode); //isAnsweringComplete will be true here..

                            personQuestionnaireManager.savePersonQuestionniare($scope.pq, true);

                            if (isSurveyQuestionnaire) {
                                CommonMethodsFactory.uploadSurvey($scope.pq.Id, moduleName);
                            }

                            $scope.pq = null;
                            $scope.questionnaire = null;
                            $scope.currentGroupIndex = 0;
                            $scope.questionnaireGroupLength = 0;
                            $scope.endOfQuestionnaire = true;
                            var thisRef = this; //To do Completed to be changed..

                            var timerPromise = $timeout(function () {
                                var tabName = getTabName(moduleName);
                                var navigateTo = 'app.' + tabName + '.completed';
                                if (isSurveyQuestionnaire) {
                                    moduleName = 'Survey';
                                    navigateTo = "app.surveyTabs.history";
                                }

                                $state.go(navigateTo, {
                                    viewTitle: $scope.title,
                                    type: moduleName,
                                    modColor: module.ColourCode,
                                    date: $stateParams.date
                                }, {
                                    reload: false,
                                    inherit: false,
                                    notify: true
                                });
                                $timeout.cancel(timerPromise);
                                $scope.isDisabled = false;
                                $scope.$emit('performSync', {
                                    modName: moduleName,
                                    animLoader: false
                                });
                            }, 300);

                        }, 500); // Reducing the time out to 0 from 50 (For local operations)
                    });
                } else {
                    ionicToast.showDefault($rootScope.getResourceText('LIT_REQUIRED'));
                    $scope.isDisabled = false;
                }
            }; // Each answer type is validated for a valid entered answer, then if Valuation questions are enabled and are mandatory
            // then the control goes to validate all valuation question for the curren question type and returns a boolean value.


            $scope.validateCurrentGroup = function () {
                var groups = $scope.questionnaire.Groups;
                var currentIndex = $scope.currentGroupIndex;
                var group = groups[currentIndex];

                for (var i = 0; i < group.Questions.length; i++) {
                    var question = group.Questions[i];
                    var questionType = question.TypeCode;
                    var pqa = this.getPersonQuestionAnswer(question.Id); // Checking IsRequired and IsCommentRequired and IsFileAttachmentRequired field so as to handle the scenario where question is not mandatory
                    // but the comment and file attachment is mandatory based on the answer option selected.

                    var isRequired = question.IsRequired || pqa.IsCommentRequired || pqa.IsFileAttachmentRequired;
                    console.log(questionType);

                    if (isRequired) {
                        switch (questionType) {
                            case 0:
                                if (question.IsDependencyMet === false) {
                                    continue;
                                }

                                var shortTextId = 'shortText_' + group.Id + '_' + question.Id;
                                var isValid = $scope.formQuestionnaire[shortTextId].$valid;

                                if (isValid === true) {
                                    var vqValid = this.validateVQforCurrentGroup(question, group.Id);

                                    if (vqValid === true) {
                                        continue;
                                    }

                                    return vqValid;
                                }

                                return isValid;

                            case 1:
                                if (question.IsDependencyMet === false) {
                                    continue;
                                }

                                var longTextId = 'longText_' + group.Id + '_' + question.Id;
                                var isltValid = $scope.formQuestionnaire[longTextId].$valid;

                                if (isltValid === true) {
                                    var vqValid = this.validateVQforCurrentGroup(question, group.Id);

                                    if (vqValid === true) {
                                        continue;
                                    }

                                    return vqValid;
                                }

                                return isltValid;

                            case 2:
                                if (question.IsDependencyMet === false) {
                                    continue;
                                }

                                if ($scope.questionnaire.ControlType === "List") {
                                    var isValidRadioList = this.validateList(
                                        group.Id,
                                        question.Id,
                                        isRequired
                                    );
                                } else {
                                    var isValidRadioList = this.validateRadioButton(
                                        group.Id,
                                        question.Id,
                                        isRequired
                                    );
                                }

                                if (isValidRadioList === true) {
                                    // validating both valuation question, comment and file attachment
                                    var vqValid = this.validateVQforCurrentGroup(question, group.Id);
                                    var commentValid = validateCommentField(group, question);
                                    var fileAttachmentValid = validateFileAttachmentField(question, pqa);
                                    var isQuestionValid = vqValid && commentValid && fileAttachmentValid;

                                    if (isQuestionValid) {
                                        continue;
                                    }

                                    return isQuestionValid;
                                }

                                return isValidRadioList;

                            case 3:
                                if (question.IsDependencyMet === false) {
                                    continue;
                                }

                                if ($scope.questionnaire.ControlType === "List") {
                                    var isValidCheckBoxList = this.validateList(
                                        group.Id,
                                        question.Id,
                                        isRequired
                                    );
                                } else {
                                    var isValidCheckBoxList = this.validateCheckbox(
                                        group.Id,
                                        question.Id,
                                        isRequired
                                    );
                                }

                                if (isValidCheckBoxList === true) {
                                    // validating both valuation question, comment and file attachment
                                    var vqValid = this.validateVQforCurrentGroup(question, group.Id);
                                    var commentValid = validateCommentField(group, question);
                                    var fileAttachmentValid = validateFileAttachmentField(question, pqa);
                                    var isQuestionValid = vqValid && commentValid && fileAttachmentValid;

                                    if (isQuestionValid) {
                                        continue;
                                    }

                                    return isQuestionValid;
                                }

                                return isValidCheckBoxList;

                            case 4:
                                if (question.IsDependencyMet === false) {
                                    continue;
                                }

                                var pqa = $scope.getPersonQuestionAnswer(question.Id);

                                if (pqa.AnswerImage) {
                                    var vqValid = this.validateVQforCurrentGroup(question, group.Id);

                                    if (vqValid === true) {
                                        continue;
                                    }

                                    return vqValid;
                                }

                                return false;

                            case 5:
                                if (question.IsDependencyMet === false) {
                                    continue;
                                }

                                var isDataTypeValid = dataTypeValid(question, group);

                                if (isDataTypeValid === true) {
                                    var vqValid = this.validateVQforCurrentGroup(question, group.Id);

                                    if (vqValid === true) {
                                        continue;
                                    }

                                    return vqValid;
                                }

                                return isDataTypeValid;
                            case 6:
                                return true;
                            default:
                                //Needs to be ..
                                return 'templates/answer_templates/buttonGroup.html';
                        }
                    }
                }

                return true;
            };

            function dataTypeValid(q, g) {
                switch (q.ColumnType) {
                    case "Department":
                    case "LineOfBusiness":
                    case "ListValue":
                    case "Person":
                    case "EasyClassification":
                    case "ProblemArea":
                    case "SafetyDepartment":
                    case "Asset":
                    case "Insurance":
                    case 'City':
                    case 'Country':
                    case 'GeographyLocation':
                    case 'Chemical':
                        var dataTypeId = "dropDownQue_" + g.Id + "_" + q.Id;
                        break;
                    case "EditableTimePicker":
                    case 'TimePicker':
                        var dataTypeId = "timePickerPAQ_" + g.Id + "_" + q.Id;
                        break;
                    case "DatePicker":
                        var dataTypeId = "datePickerPaq_" + g.Id + "_" + q.Id;
                        break;
                    case "Numeric":
                        var dataTypeId = "numText_" + g.Id + "_" + q.Id;
                        break;
                    case "CheckBox":
                        var dataTypeId = "queCb_" + g.Id + "_" + q.Id;
                        break;
                    case "CountPicker":
                        var dataTypeId = "cp_" + g.Id + "_" + q.Id;
                        break;
                    case "TextBox":
                    default:
                        var dataTypeId = "shortText_" + g.Id + "_" + q.Id;
                        break;
                }

                var isValid = $scope.formQuestionnaire[dataTypeId].$valid;
                return isValid;
            } // Manually validating the canvas (Signature)
            $scope.validateSignCanvas = function (qgId, qId, isRequired) {
                $timeout(function () {
                    var signField = 'answerImage_' + qgId + '_' + qId;
                    var isValid = $scope.formQuestionnaire[signField].$valid;
                    var idValue = '#answerImage_' + qgId + '_' + qId;
                    var signParentEle = angular.element(document.querySelector(idValue));
                    var signElement = signParentEle.find('#jSignature');

                    if (isRequired === true) {
                        if (isValid) {
                            signElement.addClass('no-errors');
                            signElement.removeClass('has-errors');
                        } else {
                            signElement.addClass('has-errors');
                            signElement.removeClass('no-errors');
                        }
                    }
                });
            }; // Validate comment field. This method will be called for each question for which EnableComment will be true.


            function validateCommentField(group, question) {
                //Default value is true
                var isCommentValid = true;

                if (question.EnableComment === true) {
                    var commentTextId = 'commentText_' + group.Id + '_' + question.Id;
                    isCommentValid = $scope.formQuestionnaire[commentTextId].$valid;

                    if (isCommentValid === true) {
                        return isCommentValid;
                    }
                } // For the scenario where Enable comment is false return true. and if Enable comment is true return the validated value.


                return isCommentValid;
            } // Validate file attachment field. This method will be called for each question for which EnableFileAttachment will be true.

            function validateFileAttachmentField(question, pqa) {
                //Default value is true
                var isFileAttachmentValid = true;

                if (question.EnableFile === true) {
                    if (pqa.IsFileAttachmentRequired) {
                        isFileAttachmentValid = pqa.FileLocation != null ? true : false;
                    }

                    if (isFileAttachmentValid === true) {
                        return isFileAttachmentValid;
                    }
                } // For the scenario where Enable comment is false return true. and if Enable comment is true return the validated value.

                return isFileAttachmentValid;
            } // Validation for valuation question, which returns a boolean value if valuation is mandatory.


            $scope.validateVQforCurrentGroup = function (question, groupId) {
                if (!question.IgnoreValuationQuestion) {
                    var valuationQuestions = $scope.questionnaire.ValuationQuestion;

                    for (var i = 0; i < valuationQuestions.length; i++) {
                        var vq = valuationQuestions[i];
                        var questionType = vq.TypeCode;

                        if (vq.IsRequired && question.IsRequired) {
                            switch (questionType) {
                                case 0:
                                    var shortTextId = 'shortText_' + groupId + '_' + question.Id + '_' + vq.Id;
                                    var isValid = $scope.formQuestionnaire[shortTextId].$valid;

                                    if (isValid === true) {
                                        continue;
                                    }

                                    return isValid;

                                case 1:
                                    var longTextId = 'longText_' + groupId + '_' + question.Id + '_' + vq.Id;
                                    var isltValid = $scope.formQuestionnaire[longTextId].$valid;

                                    if (isltValid === true) {
                                        continue;
                                    }

                                    return isltValid;

                                case 2:
                                    if ($scope.questionnaire.ControlType === "List") {
                                        var isValidRadioList = this.validateListVQ(
                                            groupId,
                                            question.Id,
                                            vq.Id,
                                            vq.IsRequired
                                        );
                                    } else {
                                        var isValidRadioList = this.validateVQRadioButton(
                                            groupId,
                                            question.Id,
                                            vq.Id,
                                            vq.IsRequired
                                        );
                                    }

                                    if (isValidRadioList === true) {
                                        continue;
                                    }

                                    return isValidRadioList;

                                case 3:
                                    if ($scope.questionnaire.ControlType === "List") {
                                        var isValidCheckBoxList = this.validateListVQ(
                                            groupId,
                                            question.Id,
                                            vq.Id,
                                            vq.IsRequired
                                        );
                                    } else {
                                        var isValidCheckBoxList = this.validateVQCheckbox(
                                            groupId,
                                            question.Id,
                                            vq.Id,
                                            vq.IsRequired
                                        );
                                    }

                                    if (isValidCheckBoxList === true) {
                                        continue;
                                    }

                                    return isValidCheckBoxList;
                                // Not implemented as of now

                                case 4:
                                    var dropDownId = 'dropDownAPV_' + group.Id + '_' + question.Id;
                                    var isValid = $scope.formQuestionnaire[dropDownId].$valid;

                                    if (isValid === true) {
                                        continue;
                                    }

                                    return isValid;

                                default:
                                    //Needs to be ..
                                    return 'templates/answer_templates/buttonGroup.html';
                            }
                        } else {
                            continue;
                        }
                    }

                    return true;
                }

                return true;
            };

            $scope.getRequiredForRadioButtonList = function (questionGroupID, questionID, required, isDependencyQuestionVisible) {
                if (isDependencyQuestionVisible === true) {
                    return $scope.validateRadioButton(questionGroupID, questionID, required);
                }

                return false;
            };

            $scope.getRequiredForCheckboxList = function (questionGroupID, questionID, required, isDependencyQuestionVisible) {
                if (isDependencyQuestionVisible === true) {
                    return $scope.validateCheckbox(questionGroupID, questionID, required);
                }

                return false;
            };

            $scope.validateRadioButton = function (groupID, questionID, required) {
                return $scope.validateAnswerList(groupID, questionID, required, true);
            };

            $scope.validateAnswerList = function (groupID, questionID, required, isRadioButton) {
                if (required) {
                    var concatId = '_' + groupID + '_' + questionID;
                    var answerListName = isRadioButton ? 'rb' + concatId : 'cb' + concatId;
                    var cbid = "#border" + "_" + groupID + "_" + questionID;
                    var checkedLength = $(cbid).find('input[name="' + answerListName + '"]:checked').length;
                    return !(checkedLength === 0);
                }

                return false;
            };

            $scope.validateCheckbox = function (groupID, questionID, required) {
                return $scope.validateAnswerList(groupID, questionID, required, false);
            }; // Valuation Template (checkbox and radio button validation)


            $scope.getRequiredForVQRadioButtonList = function (questionGroupID, questionID, vqId, required) {
                return $scope.validateVQRadioButton(questionGroupID, questionID, vqId, required);
            };

            $scope.getRequiredForVQCheckboxList = function (questionGroupID, questionID, vqId, required) {
                return $scope.validateVQCheckbox(questionGroupID, questionID, vqId, required);
            };

            $scope.validateVQRadioButton = function (groupID, questionID, vqId, required) {
                return $scope.validateVQAnswerList(groupID, questionID, vqId, required, true);
            };

            $scope.validateVQAnswerList = function (groupID, questionID, vqId, required, isRadioButton) {
                if (required) {
                    var concatId = '_' + groupID + '_' + questionID + '_' + vqId;
                    var answerListName = isRadioButton ? 'rb' + concatId : 'cb' + concatId;
                    var cbid = "#border" + "_" + groupID + "_" + questionID + '_' + vqId;
                    var checkedLength = $(cbid).find('input[name="' + answerListName + '"]:checked').length;
                    return !(checkedLength === 0);
                }

                return false;
            };

            $scope.validateVQCheckbox = function (groupID, questionID, vqId, required) {
                return $scope.validateVQAnswerList(groupID, questionID, vqId, required, false);
            };

            $scope.showHelpText = function (que) {
                if (que.HelpText) {
                    PopupUtil.readAloudAlert($rootScope.getResourceText('LIT_MESSAGE'), que.HelpText, $scope);
                }
            };

            $scope.openHelpLink = function (que) {
                var linkVal = que.HelpLink;

                if (linkVal.indexOf('https') < 0 && linkVal.indexOf('http') < 0) {
                    linkVal = "https://" + que.HelpLink;
                }

                var ref = CommonMethodsFactory.openInAppBrowser(linkVal, "_blank", "location=yes");

            }; //$timeout(function () { // Hiding (Commenting) time out for local operations in the phone.
            //LoaderService.hide();
            //}, 500);

            $scope.getQuestionnaireDropDownText = function (columnType, datatypeId, answerId, moduleNameVal) {
                return QuestionnaireMethodFactory.getDropDownText(columnType, datatypeId, answerId, moduleNameVal);
            };

            $scope.getDropDownSourceByText = function (columnType, dataTypeId, columnSubType) {
                return QuestionnaireMethodFactory.getDropDownSourceByText(columnType, dataTypeId, $scope.modName, columnSubType);
            };

            $scope.isOnlineDropDownEnable = function (columnType, dropDownId) {
                var enableOnline = false;

                switch (columnType) {
                    case 'Person':
                        enableOnline = $scope.userDetail.EnableOnlinePersons;
                        break;

                    case 'Department':
                        enableOnline = $scope.userDetail.EnableOnlineDepartments;
                        break;

                    case 'Asset':
                        enableOnline = $scope.userDetail.EnableOnlineAssets;
                        break;

                    default:
                        enableOnline = false;
                }

                return enableOnline;
            };

            $scope.checkIsMaxDateDefaultToday = function (queEntity, personqueEntity) {
                var maxDate = null;
                var currentDate = new Date();

                if (queEntity.IsDateMaximumToday) {
                    maxDate = new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth(),
                        currentDate.getDate()
                    );
                }

                if (queEntity.IsDateDefaultToday) {
                    personqueEntity.AnswerText = currentDate;
                }

                return maxDate;
            }; // Disabling future dates based on the boolean value

            $scope.openTimePicker = function (title, pqaView) {
                var time = [];

                if (pqaView.AnswerText !== null) {
                    var selectedValue = pqaView.AnswerText.replace(":", "_");
                    time.push(selectedValue);
                    highlightSelectedValue(selectedValue);
                }

                var timerPromise = PopupUtil.timerPopUp(title, $scope, time);
                timerPromise.then(function (success) {
                    pqaView.AnswerText = success;
                });
            };

            $scope.showTime = function (title, pqaView) {
                $scope.isDatePickDisabled = true;
                var theme = pickerTheme();

                var timeValue = GeneralUtil.pickTime(title, theme);
                timeValue.then(function (time) {
                    $scope.isDatePickDisabled = false;
                    pqaView.AnswerText = time;
                }, function (e) {
                    $scope.isDatePickDisabled = false;
                });
            };

            $scope.showDate = function (paqColumn, pqaView) {
                $scope.isDatePickDisabled = true;
                var maxDate = this.checkIsMaxDateDefaultToday(
                    paqColumn,
                    pqaView
                );
                var date = pqaView.AnswerText;
                if (date != null || date != undefined) {
                    var dateArray = date.split("-");
                    if (dateArray.length === 3) {
                        dateArray[1] = dateArray[1] - 1;
                        date = new Date(Date.UTC(dateArray[2], dateArray[1], dateArray[0]));
                    } else {
                        date = null;
                    }
                }
                var theme = pickerTheme();
                var dateValue = GeneralUtil.pickDate(maxDate, date, theme);
                dateValue.then(function (date) {
                    $scope.isDatePickDisabled = false;
                    var date = getDateFormate(date);
                    pqaView.AnswerText = date;
                }, function (e) {
                    $scope.isDatePickDisabled = false;
                });
            };

            function getDateFormate(d) {
                var dd = d.getDate();
                var mm = d.getMonth() + 1;
                var yyyy = d.getFullYear();
                if (dd.toString().length < 2) {
                    dd = '0' + dd;
                }
                if (mm.toString().length < 2) {
                    mm = '0' + mm;
                }
                var FinalDate = dd + '-' + mm + '-' + yyyy;
                return FinalDate;
            }
            function pickerTheme() {
                $scope.customer = customersManager.getCustomers();
                if ($scope.customer.IsDarkModeEnable) {
                    return 2;
                } else {
                    return 3;
                }
            }
            $scope.checkIsDateRequired = function (q, pqaView) {
                if (q.IsRequired) {
                    if (pqaView.AnswerText != null || pqaView.AnswerText != undefined) {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return false;
                }
            }

            $scope.validateList = function (groupID, questionID, required) {
                if (required) {
                    var listId = "lst_" + groupID + "_" + questionID;
                    var isValidList = $scope.formQuestionnaire[listId].$valid;
                    return isValidList;
                } else {
                    return false;
                }
            };

            $scope.validateListVQ = function (
                groupID,
                questionID,
                vqId,
                required
            ) {
                if (required) {
                    var listId = "vqlst_" + groupID + "_" + questionID + "_" + vqId;
                    var isValidList = $scope.formQuestionnaire[listId].$valid;
                    return isValidList;
                } else {
                    return false;
                }
            };

            $scope.getSelectedPQText = function (q) {
                var paq = this.getPersonQuestionAnswer(q.Id);
                var answerId = paq.AnswerId;
                if (answerId) {
                    if (answerId.indexOf("|") > -1) {
                        var answerIds = answerId.split("|");
                        var concatAnswerText = "";

                        for (var i = 0; i < answerIds.length; i++) {
                            var aId = answerIds[i];

                            if (aId) {
                                var answerOption = answerOptionManager.getAnswerOption(aId);
                                var aoText = answerOption.Text;
                                concatAnswerText += aoText + ", ";
                            }
                        }

                        var formattedString = concatAnswerText.trim();
                        return (formattedString.substring(0, formattedString.length - 1) + ".");
                    } else {
                        var AnswerOption = answerOptionManager.getAnswerOption(answerId);
                        var aoText = AnswerOption.Text;
                        return aoText;
                    }
                }
            };

            $scope.getSelectedVQText = function (q, vq) {
                var pvqa = this.getPersonVQAnswer(q.Id, vq.Id);
                var valuationAOId = pvqa.AnswerId;
                if (valuationAOId) {
                    if (valuationAOId.indexOf("|") > -1) {
                        var vanswerIds = valuationAOId.split("|");
                        var concatAnswerText = "";

                        for (var i = 0; i < vanswerIds.length; i++) {
                            var vaId = vanswerIds[i];

                            if (vaId) {
                                var vAnswerOption = valuationAnswerOptionManager.getValuationAnswerOptionByVAOId(vaId);
                                var vaoText = vAnswerOption.Text;
                                concatAnswerText += vaoText + ", ";
                            }
                        }

                        var formattedString = concatAnswerText.trim();
                        return (formattedString.substring(0, formattedString.length - 1) + ".");
                    } else {
                        var vAnswerOption = valuationAnswerOptionManager.getValuationAnswerOptionByVAOId(valuationAOId);
                        var vao = vAnswerOption.Text;
                        return vao;
                    }
                }
            };

            $scope.getRequiredForListDropDown = function (q, vq) {
                if (q.IsRequired) {
                    if (vq.IsRequired) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            };
        }]);
})();


/***/ }),

/***/ "./scripts/controller/questionnaireList.js":
/*!*************************************************!*\
  !*** ./scripts/controller/questionnaireList.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    var app = angular.module('questionnaire');
    app.run(['LoaderService', '$rootScope', function (LoaderService, $rootScope) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            var to = toState.name;
            var from = fromState.name;

            if (from.indexOf(to) >= 0) {
                event.preventDefault();
            } else {//LoaderService.show();  //Hiding the loader for local operations
            }
        });
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {//LoaderService.hide();
        });
    }]);
    app.controller('questionnaireListController', ['$scope', '$state', 'questionnaireManager', 'personQuestionnaireManager', 'personQuestionAnswerManager', '$rootScope', 'LocalStorageHelper', 'LoaderService', '$timeout', '$cordovaFile', '$cordovaFileTransfer', '$ionicSideMenuDelegate', '$q', '$ionicLoading', 'AppMessages', '$ionicHistory', 'questionGroupManager', 'questionManager', 'answerOptionManager', '$stateParams', 'ionicToast', 'userDetailsManager', 'PopupUtil', 'DeviceUtil', 'QuestionnaireMethodFactory', 'valuationAnswerOptionManager', 'FileUtil', 'CommonMethodsFactory', 'userApplicationsManager', function ($scope, $state, questionnaireManager, personQuestionnaireManager, personQuestionAnswerManager, $rootScope, LocalStorageHelper, LoaderService, $timeout, $cordovaFile, $cordovaFileTransfer, $ionicSideMenuDelegate, $q, $ionicLoading, AppMessages, $ionicHistory, questionGroupManager, questionManager, answerOptionManager, $stateParams, ionicToast, userDetailsManager, PopupUtil, DeviceUtil, QuestionnaireMethodFactory, valuationAnswerOptionManager, FileUtil, CommonMethodsFactory, userApplicationsManager) {
        var moduleName = $stateParams.type; //LoaderService.show();  //Hiding the loader for local operations

        ionic.DomUtil.ready(function () {//LoaderService.hide();
        });
        $scope.currentState = $state.current.name; //LoaderService.show();  //Hiding the loader for local operations

        var qList = [];
        $scope.selectedQuestionnaires = [];
        $scope.title = $stateParams.viewTitle;
        $scope.modColor = $stateParams.modColor;
        var userDetails = userDetailsManager.getUserLastLoggedTimeStamp();
        $scope.personId = userDetails.PersonId;
        $scope.customerSetting = userDetails.Customer;
        $scope.userDetailsData = userDetails;
        $scope.applicationDetails = userApplicationsManager.getUserApplicationByText(userDetails.UserId, moduleName);
        $scope.IsDownloadErrorShown = false;

        function getQList() {
            var tabbedState = $scope.currentState;
            var qListTemp = [];

            switch (tabbedState) {
                case "app.mTabs.inProgress":
                case "app.hTabs.inProgress":
                case "app.eTabs.inProgress":
                case "app.rTabs.inProgress":
                case "app.qTabs.inProgress":
                case "app.fpTabs.inProgress":
                    qListTemp = personQuestionnaireManager.getInProgressQuestionnairesList(moduleName);
                    break;

                case "app.mTabs.completed":
                case "app.hTabs.completed":
                case "app.eTabs.completed":
                case "app.rTabs.completed":
                case "app.qTabs.completed":
                case "app.fpTabs.completed":
                    qListTemp = personQuestionnaireManager.getCompletedQuestionnairesList(moduleName);
                    break;

                case "app.mTabs.active":
                case "app.hTabs.active":
                case "app.eTabs.active":
                case "app.rTabs.active":
                case "app.qTabs.active":
                case "app.fpTabs.active":
                    if (!$scope.applicationDetails.IsApplicationModuleDisable) {
                        qListTemp = questionnaireManager.getActiveQuestionnairesList(moduleName);
                    }

                    break;

                default:
                    break;
            }

            return qListTemp;
        }

        refreshDataWithErrorCheck(moduleName);

        function refreshDataWithErrorCheck(modName) {
            $scope.IsDownloadErrorShown = false;
            refreshModule(modName);
        }

        function refreshModule(moduleName) {
            var validDownload = userDetailsManager.getIfdownloadValidForType(moduleName);

            if (validDownload === true) {
                qList = getQList();
                $scope.questionnaireList = qList;
            } else if (!$scope.IsDownloadErrorShown) {
                $scope.IsDownloadErrorShown = true;
                AppMessages.Error($rootScope.getResourceText('LIT_MESSAGE'), $rootScope.getResourceText('MSG_ERROR_DOWNLOADING_MODULE') + " " + $scope.title + " " + $rootScope.getResourceText('MSG_PLEASE_TRY_AGAIN'));
            }
        }

        $scope.validQuestionnaireGroups = function (groups) {
            return QuestionnaireMethodFactory.validateQuestionGroupsInDependency(groups);
        };

        $scope.getPersonQuestionAnswer = function (questionId, pqa) {
            return QuestionnaireMethodFactory.getPersonQuestionAnswer(questionId, pqa);
        };

        $scope.loadMailAOTemplate = function (questionType) {
            return QuestionnaireMethodFactory.loadMailAOTemplate(questionType);
        };

        $scope.loadMailVAOTemplate = function (questionType) {
            return QuestionnaireMethodFactory.loadMailVAOTemplate(questionType);
        };

        $scope.getAnswerOptionTextById = function (answerOptionId) {
            var answerOption = answerOptionManager.getAnswerOption(answerOptionId);
            var aoText = answerOption.Text;
            return aoText;
        };

        $scope.getValuationAnswerOptionTextByVAOId = function (valuationAOId) {
            var vAnswerOption = valuationAnswerOptionManager.getValuationAnswerOptionByVAOId(valuationAOId);
            var vaoText = vAnswerOption.Text;
            return vaoText;
        };

        $scope.getDefaultStatus = function (questionId, answerOptionId, pqaEntity) {
            return QuestionnaireMethodFactory.getDefaultStatus(questionId, answerOptionId, pqaEntity);
        };

        $scope.getVQDefaultStatus = function (qId, vqId, aoId, pvqaEntity) {
            return QuestionnaireMethodFactory.getVQDefaultStatus(qId, vqId, aoId, pvqaEntity);
        };

        $scope.getPersonVQAnswer = function (qId, vqId, pvqaEntity) {
            return QuestionnaireMethodFactory.getPersonVQAnswer(qId, vqId, pvqaEntity);
        }; // This method is called only during preview of a questionnaire. As both answering and preview uses same controller

        $scope.getAttachmentDetails = function (entity) {
            if (entity.FileName != null && entity.FileName.indexOf('.pdf') !== -1) {
                return {
                    isPdf: true,
                    FileName: entity.FileName,
                }
            }
            return {
                isPdf: false,
                FileName: entity.FileName
            }
        }

        $scope.loadPdfAOTemplate = function (q) {
            switch (q.TypeCode) {
                case 0:
                    return 'templates/pdf_templates/questionnaire/questionnairePdf_answerOption/textAOTemplate.html';

                case 1:
                    return 'templates/pdf_templates/questionnaire/questionnairePdf_answerOption/textAOTemplate.html';

                case 2:
                    return 'templates/pdf_templates/questionnaire/questionnairePdf_answerOption/commonAOTemplate.html';

                case 3:
                case 6:
                    return 'templates/pdf_templates/questionnaire/questionnairePdf_answerOption/commonAOTemplate.html';

                case 4:
                    // This returned null as Siganture is a image format and it needs to be loaded before only to render properly while pdf is loaded
                    return null;

                case 5:
                    if (q.ColumnType != null) {
                        return loadDtTemplatePdf(q);
                    } else {
                        return 'templates/pdf_templates/questionnaire/questionnairePdf_answerOption/commonAOTemplate.html';
                    }
                case 3:
                    return 'templates/pdf_templates/questionnaire/questionnairePdf_answerOption/commonAOTemplate.html';
                default:
                    return;
            }
        }; // This method is called only during preview of a questionnaire. As both answering and preview uses same controller

        function loadDtTemplatePdf(q) {
            switch (q.ColumnType) {
                case 'HtmlText':
                case 'CountPicker':
                case 'Department':
                case 'LineOfBusiness':
                case 'ListValue':
                case 'Person':
                case 'EasyClassification':
                case 'ProblemArea':
                case 'SafetyDepartment':
                case 'Asset':
                case 'Insurance':
                case 'TextBox':
                case 'City':
                case 'Country':
                case 'GeographyLocation':
                case 'Chemical':
                case 'EditableTimePicker':
                case 'TimePicker':
                    return 'templates/pdf_templates/questionnaire/dataTypePdf/textTemplate.html';
                case 'DatePicker':
                    return 'templates/pdf_templates/questionnaire/dataTypePdf/dateTemplate.html';
                case 'CheckBox':
                    return 'templates/pdf_templates/questionnaire/dataTypePdf/checkBoxTemplate.html';
                default:
                    return;
            }
        };

        $scope.getCheckBoxVal = function (chk) {
            return (chk == 1);
        }

        $scope.loadPdfVAOTemplate = function (questionType) {
            switch (questionType) {
                case 0:
                    return 'templates/pdf_templates/questionnaire/questionnairePdf_answerOption/vAOTextTemplate.html';

                case 1:
                    return 'templates/pdf_templates/questionnaire/questionnairePdf_answerOption/vAOTextTemplate.html';

                case 2:
                    return 'templates/pdf_templates/questionnaire/questionnairePdf_answerOption/vAOTemplate.html';

                case 3:
                    return 'templates/pdf_templates/questionnaire/questionnairePdf_answerOption/vAOTemplate.html';

                case 4:
                case 6:
                    return 'templates/pdf_templates/questionnaire/questionnairePdf_answerOption/vAOTemplate.html';

                default:
                    return;
            }
        };

        $scope.getAnswerOptionTextByAnswerId = function (answerId) {
            if (answerId) {
                if (answerId.indexOf('|') > -1) {
                    var answerIds = answerId.split('|');
                    var concatAnswerText = "";

                    for (var i = 0; i < answerIds.length; i++) {
                        var aId = answerIds[i];

                        if (aId) {
                            var answerOption = answerOptionManager.getAnswerOption(aId);
                            var aoText = answerOption.Text;
                            concatAnswerText += aoText + ", ";
                        }
                    }

                    var formattedString = concatAnswerText.trim();
                    return formattedString.substring(0, formattedString.length - 1) + ".";
                } else {
                    return $scope.getAnswerOptionTextById(answerId);
                }
            }
        };

        $scope.getVAnswerOptionTextByAnswerId = function (valuationAOId) {
            if (valuationAOId) {
                if (valuationAOId.indexOf('|') > -1) {
                    var vanswerIds = valuationAOId.split('|');
                    var concatAnswerText = "";

                    for (var i = 0; i < vanswerIds.length; i++) {
                        var vaId = vanswerIds[i];

                        if (vaId) {
                            var vAnswerOption = valuationAnswerOptionManager.getValuationAnswerOptionByVAOId(vaId);
                            var vaoText = vAnswerOption.Text;
                            concatAnswerText += vaoText + ", ";
                        }
                    }

                    var formattedString = concatAnswerText.trim();
                    return formattedString.substring(0, formattedString.length - 1) + ".";
                } else {
                    return $scope.getValuationAnswerOptionTextByVAOId(valuationAOId);
                }
            }
        };

        function navigateModule(modTabName, id) {
            $timeout(function () {
                /*A timeout is added so that when the LoaderService.show() 
                method is called it is not blocked */
                var navigateTo = "";
                var pov = "";

                if ($state.current.name == "app." + modTabName + ".active") {
                    //First : Get whether a already answered not inprogress and notcompleted personquestionnaire exists.
                    var existingUnAnsweredPq = personQuestionnaireManager.getUnAnsweredPersonQuestionnaireNonTemplate(id);

                    if (existingUnAnsweredPq === null) {
                        //Second: We now get from the PersonQuestionnaireTemplate 
                        //and save to the PerosnQuestionnaire 
                        //with answeringInProgress = false and answeringCompleted = false.
                        var personQueTemplateAnswer = personQuestionnaireManager.getUnAnsweredPersonQuestionnaire(id);
                        var savedPq = personQuestionnaireManager.savePersonQuestionniare(personQueTemplateAnswer, null);
                        id = savedPq.Id;
                    } else {
                        existingUnAnsweredPq.IsTemplate = false;
                        id = existingUnAnsweredPq.Id;
                    }

                    navigateTo = "app.startScreen";
                } else {
                    var pq = personQuestionnaireManager.getPersonQuestionnaire(id);
                    navigateTo = "app.startScreen";
                    if (pq.LastGroupIndex !== -1) {
                        navigateTo = "app.apv";
                        var queId = pq.Questionnaire.Id;
                        pov = pq.Questionnaire.PointOfView;
                        var queIdForColoring = "-1";

                        if (pq.Questionnaire.EnableAnswerOptionColour === true) {
                            queIdForColoring = queId;
                        }

                        $scope.$emit('RenderStyleQuestionnaire', {
                            qId: queIdForColoring
                        });
                    }
                }

                var timerPromise = $timeout(function () {
                    $state.go(navigateTo, {
                        id: id,
                        state: $state.current.name,
                        viewTitle: $scope.title,
                        pov: pov,
                        modColor: $scope.modColor
                    }, {
                        reload: false,
                        inherit: false,
                        notify: true
                    });
                    $timeout.cancel(timerPromise);
                }, 100);
            }, 50);
        }

        $scope.navigateAnswering = function (id) {
            //LoaderService.show();  //Hiding the loader for local operations
            switch (moduleName) {
                case 'RiskProfile':
                    navigateModule('rTabs', id);
                    break;

                case 'EmployeeSatisfaction':
                    navigateModule('eTabs', id);
                    break;

                case 'ManagementEvaluation':
                    navigateModule('mTabs', id);
                    break;

                case 'HumanResource':
                    navigateModule('hTabs', id);
                    break;

                case 'Apv':
                    navigateModule('qTabs', id);
                    break;

                case 'FrontPlanner':
                    navigateModule('fpTabs', id);
                    break;

                default:
                    break;
            }
        };

        $scope.updateQuestionnaire = function () {
            var isUpdatedPromise = CommonMethodsFactory.getData(moduleName, $scope.title);
            isUpdatedPromise.then(function (success) {
                LocalStorageHelper.updateUserDetails($scope.userDetailsData.UserName);
                refreshDataWithErrorCheck(moduleName); // Stop the ion-refresher from spinning

                $scope.$broadcast('scroll.refreshComplete');
            }, function (fail) {
                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        function uploadPersonQuestionnaire(pqId, isMultipleUpload) {
            var def = $q.defer();
            $timeout(function () {
                // This implementation will change when 
                // Repeatable questionnaire answering gets implemented.
                // Since there will be multiple entries. Get by PersonQuestionnaire (Id column).
                var pq = personQuestionnaireManager.getPersonQuestionnaire(pqId); //If multiple processes try to upload the same questionaire hence the check.

                var uploadInProgress = pq.UploadInProgress;

                if (uploadInProgress === false) {
                    var processesPqPromise = FileUtil.processFile(pq, true);
                    processesPqPromise.then(function (completePersonQuestionnaire) {
                        //Skip Questionnaire data..
                        var uploadedPromise = LocalStorageHelper.uploadPersonQuestionnaire(completePersonQuestionnaire, moduleName);
                        pq.UploadInProgress = true;
                        pq.UploadFail = false;
                        uploadedPromise.then(function (aoData) {
                            personQuestionnaireManager.uploadPostProcess(pq);
                            PopupUtil.hide();
                            var anim = '<lottie-player src="raw/loadingSuccess.json" background="transparent" speed="1" id="loadAnim" autoplay></lottie-player>';
                            var contentTitle = $rootScope.getResourceText('LIT_MOBILE_SUCCESS');
                            var contentLabel = pq.Questionnaire.Name + " " + $rootScope.getResourceText('MSG_MOBILE_UPLOADED_REGISTRATION');
                            var contentTimer = 5000;
                            PopupUtil.animTimerPopUp(anim, contentTitle, contentLabel, contentTimer);
                            // ionicToast.showDefault(pq.Questionnaire.Name + " " + $rootScope.getResourceText('MSG_IS_SUCCESSFULLY_UPLOADED'));
                            def.resolve(pqId);
                            refreshDataWithErrorCheck(moduleName);
                        }, function (error) {
                            pq.UploadInProgress = false;
                            pq.UploadFail = true;

                            if ($scope.selectedQuestionnaires.length > 0) {
                                $scope.onSelectForUpload(pq, $scope);
                            }

                            def.reject(error);
                            refreshDataWithErrorCheck(moduleName);
                        });
                    }, function (inCompletePq) {
                        // Check is performed only to validate if it is a file not found error.
                        if (inCompletePq.message === "NOT_FOUND_ERR") {
                            // The boolean flag tells if it is from multiple upload or single upload
                            if (!isMultipleUpload) {
                                // Showing a confirm popup. On 'Ok' move to inprogress else retain in the current screen
                                var confirmPromise = PopupUtil.confirm($rootScope.getResourceText('LIT_MESSAGE'), $rootScope.getResourceText('MSG_ATTACHMENTS_MISSING'));
                                confirmPromise.then(function (success) {
                                    if (success) {
                                        //Saving the questionnaire as to move to Inprogress section
                                        personQuestionnaireManager.savePersonQuestionniare(inCompletePq.personEntity, false);
                                        refreshDataWithErrorCheck(moduleName);
                                    }
                                });
                            } else {
                                //Saving the questionnaire as to move to Inprogress section
                                personQuestionnaireManager.savePersonQuestionniare(inCompletePq.personEntity, false);
                            }
                        }

                        inCompletePq.personEntity.UploadInProgress = false;
                        inCompletePq.personEntity.UploadFail = true;

                        if ($scope.selectedQuestionnaires.length > 0) {
                            $scope.onSelectForUpload(inCompletePq.personEntity, $scope);
                        }

                        def.reject(inCompletePq);
                        refreshDataWithErrorCheck(moduleName);
                    });
                }
            }, 50);
            // PopupUtil.hide();
            return def;
        }

        $scope.uploadAnswering = function (pqId) {
            loadingAnimProcess();
            var checkDeviceOnline = deviceOnlineCheck();

            if (checkDeviceOnline === true) {
                //var tokenValidityPromise = LocalStorageHelper.validateUserToken();
                //  tokenValidityPromise.then(function (tokenValid) {
                uploadPersonQuestionnaire(pqId, false);
                //  }, function (tokenInValid) {
                //   PopupUtil.hide();
                //});
            } else {
                PopupUtil.hide();
            }
        };

        $rootScope.$on("refresh", function () {
            refreshModule(moduleName);
        });

        $scope.showPreview = function (personQue) {
            $timeout(function () {
                var processPromise = FileUtil.processFile(personQue, false);
                processPromise.then(function (successPersonQue) {
                    var questionnaire = successPersonQue.Questionnaire;
                    var queIdForColoring = "-1";

                    if (personQue.Questionnaire.EnableAnswerOptionColour === true) {
                        queIdForColoring = questionnaire.Id;
                    }

                    $scope.$emit('RenderStyleQuestionnaire', {
                        qId: queIdForColoring
                    });
                    $state.go('app.questionnairePV', {
                        id: successPersonQue.Id,
                        viewTitle: $scope.title,
                        modColor: $scope.modColor
                    });
                }, function (errorPersonQue) {
                    // Showing a confirm popup. On 'Ok' move to inprogress else retain in the current screen
                    var confirmPromise = PopupUtil.confirm($rootScope.getResourceText('LIT_MESSAGE'), $rootScope.getResourceText('MSG_ATTACHMENTS_MISSING'));
                    confirmPromise.then(function (success) {
                        if (success) {
                            personQuestionnaireManager.savePersonQuestionniare(errorPersonQue.personEntity, false);
                            refreshDataWithErrorCheck(moduleName);
                        }
                    });
                });
            }, 50);
        };

        $scope.selectedCount = $scope.selectedQuestionnaires.length; // Passing the instance to access isSelected variable initilized in ng-init(View)

        $scope.onMultiSelectForUpload = function (answer, instance) {
            if ($scope.selectedQuestionnaires.length === 0 && answer.UploadInProgress === false) {
                instance.isSelected = true;
                $scope.selectedQuestionnaires.push(answer.Id);
                $scope.selectedCount = $scope.selectedQuestionnaires.length;
            }
        }; // Passing the instance to access isSelected variable initilized in ng-init(View)


        $scope.onSelectForUpload = function (answer, instance) {
            if (answer.UploadInProgress === false) {
                if ($scope.selectedQuestionnaires.length !== 0) {
                    var index = $scope.selectedQuestionnaires.indexOf(answer.Id);

                    if (index > -1) {
                        $scope.selectedQuestionnaires.splice(index, 1);
                        instance.isSelected = false;
                    } else {
                        $scope.selectedQuestionnaires.push(answer.Id);
                        instance.isSelected = true;
                    }

                    $scope.selectedCount = $scope.selectedQuestionnaires.length;
                } else {
                    $scope.showPreview(answer);
                }
            }
        };

        $scope.editCompletedAnswer = function (answer) {
            var confirmPromise = PopupUtil.confirm($rootScope.getResourceText('LIT_MESSAGE'), $rootScope.getResourceText('MSG_EDIT'));
            confirmPromise.then(function (success) {
                if (success) {
                    var processPromise = FileUtil.processFile(answer, false);
                    processPromise.then(function (successPersonQue) {
                        var id = answer.Id;
                        answer.LastGroupIndex = 0;
                        personQuestionnaireManager.savePersonQuestionniare(answer, false);
                        $scope.navigateAnswering(id);
                    }, function (errorPersonQue) {
                        var confirmPromise = PopupUtil.confirm($rootScope.getResourceText('LIT_MESSAGE'), $rootScope.getResourceText('MSG_ATTACHMENTS_MISSING'));
                        confirmPromise.then(function (success) {
                            if (success) {
                                personQuestionnaireManager.savePersonQuestionniare(errorPersonQue.personEntity, false);
                                $scope.navigateAnswering(errorPersonQue.personEntity.Id);
                            }
                        });
                    });
                }
            });
        };

        $scope.uploadMutipleQuestionnaire = function () {
            loadingAnimProcess();
            var checkDeviceOnline = deviceOnlineCheck();

            if (checkDeviceOnline === true) {
                var tokenValidityPromise = LocalStorageHelper.validateUserToken();
                tokenValidityPromise.then(function (tokenValid) {
                    var hidePromise = LoaderService.hide();
                    hidePromise.then(function () {
                        for (var i = 0; i < $scope.selectedQuestionnaires.length; i++) {
                            var uploadPromise = uploadPersonQuestionnaire($scope.selectedQuestionnaires[i], true);
                            uploadPromise.promise.then(function (success) {
                                var index = $scope.selectedQuestionnaires.indexOf(success);

                                if (index > -1) {
                                    $scope.selectedQuestionnaires.splice(index, 1);
                                    $scope.selectedCount = $scope.selectedQuestionnaires.length;
                                } else {
                                    $scope.selectedQuestionnaires = [];
                                }
                            }, function (inCompletePq) {
                                PopupUtil.hide();
                                var hidePromise = LoaderService.hide();
                                hidePromise.then(function () {
                                    $scope.selectedQuestionnaires = [];
                                }); // Check is performed only to validate if it is a file not found error.

                                if (inCompletePq.message === "NOT_FOUND_ERR") {
                                    // Showing toast message to notify user as to move to inprogress only for multiple upload
                                    ionicToast.showDefault(inCompletePq.personEntity.Questionnaire.Name + " " + $rootScope.getResourceText("MSG_MOVED_INPROGRESS"));
                                    refreshDataWithErrorCheck(moduleName);
                                }
                            });
                        }
                    });
                });
            } else {
                PopupUtil.hide();
            }
        };

        $scope.deletePersonQuestionnaireByPqId = function (answer) {
            var anim = '<lottie-player src="raw/delete.json" background="transparent" speed="1" id="deleteAnim" autoplay></lottie-player>';
            var confirmPromise = PopupUtil.animConfirm(anim, $rootScope.getResourceText('LIT_DELETE'), $rootScope.getResourceText('MSG_CONFIRM_DELETE_FIELD'));
            //  var confirmPromise = PopupUtil.confirm($rootScope.getResourceText('LIT_DELETE'), $rootScope.getResourceText('MSG_CONFIRM_DELETE_FIELD'));
            confirmPromise.then(function (success) {
                if (success) {
                    if ($scope.selectedQuestionnaires.length > 0) {
                        $scope.onSelectForUpload(answer, $scope);
                    }

                    personQuestionnaireManager.deletePersonQuestionnaireByPqId(answer.Id);
                    refreshDataWithErrorCheck(moduleName);
                }
            });
        }; //$scope.deleteQuestionnaire = function (que) {
        //    var confirmPromise = PopupUtil.confirm($rootScope.getResourceText('LIT_DELETE'), $rootScope.getResourceText('MSG_CONFIRM_DELETE_FIELD'));
        //    confirmPromise.then(function (success) {
        //        if (success) {
        //            LoaderService.show();
        //            que = questionnaireManager.loadQuestionnaireDeep(que.Id);
        //            var deletePromise = questionnaireManager.deleteQuestionnaire(que);
        //            deletePromise.then(function (success) {
        //                $timeout(function () {
        //                    refreshModule(moduleName);
        //                    LoaderService.hide();
        //                }, 100);
        //            }, function (fail) {
        //                $timeout(function () {
        //                    var hidePromise = LoaderService.hide();
        //                    hidePromise.then(function () {
        //                        PopupUtil.alert($rootScope.getResourceText('LIT_MESSAGE'), $rootScope.getResourceText('MSG_NOT_DELETABLE'));
        //                    });
        //                }, 0);
        //            });
        //        }
        //    });
        //}

        function loadingAnimProcess() {
            var anim = '<lottie-player src="raw/loadingNew.json" background="transparent" speed="1" id="loadAnim" loop autoplay></lottie-player>';
            var contentTitle = $rootScope.getResourceText('LIT_MOBILE_UPLOAD');
            var contentLabel = $rootScope.getResourceText('MSG_MOBILE_UPOADING_REGISTRATION');
            PopupUtil.animPopUp(anim, contentTitle, contentLabel);
        }

        function deviceOnlineCheck() {
            var isOnline = DeviceUtil.isDeviceOnline();

            if (isOnline === false) {
                var anim = '<lottie-player src="raw/loadingFailed.json" background="transparent" speed="2" id="loadFailAnim" autoplay></lottie-player>';
                var contentTitle = $rootScope.getResourceText('LIT_MOBILE_ERROR');
                var contentLabel = $rootScope.getResourceText('MSG_MOBILE_INTERNET_ERROR');
                PopupUtil.animAlert(anim, contentTitle, contentLabel);
                // AppMessages.Error($rootScope.getResourceText('LIT_ALERT'), $rootScope.getResourceText('MSG_CHECK_INTERNET_CONNECTION'));
            }

            return isOnline;
        } //LoaderService.hide();

    }]);
})();


/***/ }),

/***/ "./scripts/controller/sideMenuController.js":
/*!**************************************************!*\
  !*** ./scripts/controller/sideMenuController.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    var app = angular.module('questionnaire');
    app.controller('sideMenuController', ['$scope', '$ionicSideMenuDelegate', 'LoaderService', 'PopupUtil', 'LocalStorageHelper', 'customersManager', 'userDetailsManager', 'userApplicationsManager', '$state', '$rootScope', '$timeout', 'ResetPoolUtil', '$ionicPlatform', 'ionicToast', 'personQuestionnaireManager', 'personApwManager', 'personAskadeFileTypeWizardManager', 'newsManager', 'CommonMethodsFactory', function ($scope, $ionicSideMenuDelegate, LoaderService, PopupUtil, LocalStorageHelper, customersManager, userDetailsManager, userApplicationsManager, $state, $rootScope, $timeout, ResetPoolUtil, $ionicPlatform, ionicToast, personQuestionnaireManager, personApwManager, personAskadeFileTypeWizardManager, newsManager, CommonMethodsFactory) {
        function getSideMenuItems() {
            $scope.userDetails = userDetailsManager.getUserLastLoggedTimeStamp();

            if ($scope.userDetails != null && $scope.userDetails != undefined) {
                $scope.userApplicationsDetails = userApplicationsManager.getUserApplications($scope.userDetails.UserId);
            }
        }

        if (LocalStorageHelper.IsInititalized()) getSideMenuItems();

        $scope.openChatWindow = function () {
            var customer = customersManager.getCustomers();
            var uri = customer.AiAssistanceGlobalLink;
            if(uri)
                var ref = CommonMethodsFactory.openInAppBrowser(uri, "_blank", "location=yes");
        };

        $scope.navigateToListScreen = function (userApp) {
            switch (userApp.Text) {
                case 'RiskProfile':
                case 'EmployeeSatisfaction':
                case 'ManagementEvaluation':
                case 'HumanResource':
                case 'FrontPlanner':
                case 'Apv':
                case 'ActionPlan':
                case 'Askade':
                case 'Claim':
                    var timerPromise = $timeout(function () {
                        var stateVal = userApp.RouteValue + ".active";

                        if (userApp.IsApplicationModuleDisable) {
                            stateVal = userApp.RouteValue + ".inProgress";
                            var compCount = getCompletedCount(userApp.Text);

                            if (compCount > 0) {
                                stateVal = userApp.RouteValue + ".completed";
                            }
                        }

                        $state.go(stateVal, {
                            viewTitle: userApp.TranslatedText,
                            modColor: userApp.ColourCode,
                            type: userApp.Text
                        }, {
                            reload: false,
                            inherit: false,
                            notify: true
                        });
                        $timeout.cancel(timerPromise);
                    }, 100);
                    break;

                case 'DocumentLibrary':
                    // navigate to group data list.
                    var timerPromise = $timeout(function () {
                        var stateVal = "app.documentLibrary";
                        $state.go(stateVal, {
                            viewTitle: userApp.TranslatedText,
                            modColor: userApp.ColourCode,
                            type: userApp.Text
                        }, {
                            reload: false,
                            inherit: false,
                            notify: true
                        });
                        $timeout.cancel(timerPromise);
                    }, 100);
                    break;

                default:
                    break;
            }

            $scope.closeSideMenu();
        };

        function getCompletedCount(moduleName) {
            var completedCount = 0;

            switch (moduleName) {
                case 'RiskProfile':
                case 'EmployeeSatisfaction':
                case 'ManagementEvaluation':
                case 'HumanResource':
                case 'FrontPlanner':
                case 'Apv':
                    completedCount = personQuestionnaireManager.getCompletedQuestionnairesListCount(moduleName);
                    return completedCount;

                case 'ActionPlan':
                    completedCount = personApwManager.getCompletedPersonAPWListCount();
                    return completedCount;

                case 'Askade':
                case 'Claim':
                    completedCount = personAskadeFileTypeWizardManager.getCompletedPAskadeCount(moduleName);
                    return completedCount;

                default:
                    return completedCount;
            }
        }

        $scope.$on('initDownload', function (event, data) {
            getSideMenuItems();
            downloadAll();
        }); // On call of this event list items in side menu is refreshed

        $scope.$on('sideMenuRefresh', function (event, data) {
            getSideMenuItems();
        });

        function downloadAll() {
            $timeout(function () {
                var tokenValidityPromise = LocalStorageHelper.validateUserToken();
                tokenValidityPromise.then(function (tokenValid) {
                    // Initializing the variables with a default value
                    var promiseListLength = 0;
                    $scope.totalCounter = 0;

                    if (LocalStorageHelper.IsInititalized()) {
                        var refreshDeptsPersonsPromise = LocalStorageHelper.refreshDepartmentsPersonsDetails();
                        refreshDeptsPersonsPromise.then(function (success) {
                            var logIdPromList = LocalStorageHelper.initDownloadNew();
                            var promList = logIdPromList.promiseList;
                            $scope.logId = logIdPromList.logId;
                            promiseListLength = promList.length; // If there are no channels are configured then display a toast message

                            if (promList.length > 0) {
                                for (var i = 0; i < promList.length; i++) {
                                    promList[i].then(function (successMod) {
                                        $scope.totalCounter += 1;
                                        $scope.$emit('refresh');
                                    }, function (fail) {
                                        $scope.totalCounter += 1;
                                        console.log(fail);
                                    });
                                }
                            } else {
                                var loaderPromise = LoaderService.hide();
                                loaderPromise.then(function () {
                                    ionicToast.showDefault($rootScope.getResourceText('MSG_NO_CHANNELS'));
                                });
                            }
                        }, function (errorResponse) {
                            LoaderService.hide();
                        });
                    } // Keeping a watch on the totalCounter variable, so as to check if there is any error while downloading the modules.
                    // At the end clearing the watch


                    var unBindWatch = $scope.$watch("totalCounter", function (totalCounter) {
                        if (totalCounter === promiseListLength && totalCounter > 0) {
                            LocalStorageHelper.addEndDateForDownloadAll($scope.logId); // Clearing pool so as to handle any update in the downloaded data (When user has previously downloaded data).

                            ResetPoolUtil.resetPool();
                            getSideMenuItems();
                            $rootScope.$emit("refresh");
                            $rootScope.$emit("favRefresh");
                            $scope.unReadCount = newsManager.getUnReadNewsCount();
                            unBindWatch();
                            LoaderService.hide();
                        }
                    });
                }, function (errorResponse) {
                    LoaderService.hide();
                });
            }, 0);
        }

        $scope.unReadCount = newsManager.getUnReadNewsCount();
        $scope.$on('unReadValue', function (event, data) {
            $scope.unReadCount = data;
        });

        $scope.getAllData = function () {
            LoaderService.show($rootScope.getResourceText('MSG_UPDATING_CHANNELS'));
            var customer = $scope.userDetails.Customer;
            var customerName = customer.UniqueUrlPart;
            var onlineValue = customer.OnlineVal;
            var userName = $scope.userDetails.UserName;
            var cKey = customer.CKey;
            var suitePromise = LocalStorageHelper.initSuiteDetails(customerName, onlineValue, cKey, customer.IsCustomUrlEnabled);
            suitePromise.then(function (sucess) {
                var userDetailsPromise = LocalStorageHelper.initUserDetails(userName);
                userDetailsPromise.then(function (res) {
                    downloadAll();
                    getSideMenuItems();
                });
                darkModeEnable();
            });
            $ionicSideMenuDelegate.toggleLeft();
        };

        function darkModeEnable() {
            var customer = customersManager.getCustomers();
            if (customer.IsDarkModeEnable) {
                $scope.$emit('darkThemeBgColor', { isDark: true });
            }
            else {
                $scope.$emit('darkThemeBgColor', { isDark: false });
                $scope.$emit('RenderButtonBgHeaderColor');
            }
        }

        $scope.closeSideMenu = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.getAiChatIconVisibility = function () {
            var customer = customersManager.getCustomers();
            return customer.AiAssistanceGlobalLink != null;
        };
    }]);
})();


/***/ }),

/***/ "./scripts/controller/startScreenController.js":
/*!*****************************************************!*\
  !*** ./scripts/controller/startScreenController.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    var app = angular.module('questionnaire');
    app.controller('startScreenController', ['$scope', 'userDetailsManager', 'personQuestionnaireManager', '$stateParams', 'LoaderService', '$timeout', '$state', '$rootScope', 'questionnaireManager', 'DateUtil', 'ionicToast', 'TextToSpeachUtil', 'CommonMethodsFactory', 'PopupUtil',
        function ($scope, userDetailsManager, personQuestionnaireManager, $stateParams, LoaderService, $timeout, $state, $rootScope, questionnaireManager, DateUtil, ionicToast, TextToSpeachUtil, CommonMethodsFactory, PopupUtil) {
            var state = $stateParams.state;
            var userDetails = userDetailsManager.getUserLastLoggedTimeStamp();
            var id = $stateParams.id;
            $scope.title = $stateParams.viewTitle;
            $scope.modColor = $stateParams.modColor;
            $scope.evaluateId = null;
            var personQue = null;
            $scope.deptName = null;
            $scope.readAloud = userDetails.Customer.IsReadAloudTextEnable;
            $scope.isEnableLocation = userDetails.Customer.EnableGeoLocation;
            $scope.answeringDate = $stateParams.date;

            switch (state) {
                //case "app.mTabs.active":
                //case "app.hTabs.active":
                //case "app.eTabs.active":
                //case "app.rTabs.active":
                //case "app.qTabs.active":
                //    personQue = personQuestionnaireManager.getUnAnsweredPersonQuestionnaire(id);
                //    break;
                default:
                    personQue = personQuestionnaireManager.getPersonQuestionnaire(id);

                    if (personQue.Questionnaire.IsSurvey && !$scope.answeringDate) {
                        var questionnaireId = personQue.Questionnaire.Id;
                        $scope.answeringDate = new Date();
                        var surveyHistoryList = CommonMethodsFactory.getActiveSurveyForTheDate($scope.date);
                        var allReadyAnsweredSurveyQuestionnaireIds = [];
                        for (var i = 0; i < surveyHistoryList.length; i++) {
                            allReadyAnsweredSurveyQuestionnaireIds.push(surveyHistoryList[i].Id);
                        }

                        if (allReadyAnsweredSurveyQuestionnaireIds.includes(questionnaireId)) {
                            var title = $rootScope.getResourceText('LIT_MESSAGE');
                            var message = $rootScope.getResourceText('MSG_MOBILE_SURVEY_ANSWERED_MESSAGE');
                            var body = message.replace("${surveyName}", personQue.Questionnaire.Name);

                            var confirmPopup = PopupUtil.showConfirm(title, body);
                            if (confirmPopup) {
                                $state.go('app.surveyTabs.history', {
                                    date: $scope.answeringDate
                                });
                            } else {
                                $state.go("app.home");
                            }
                        }
                    }

                    /* When considering the case of answering for Point of view as Manager 
                    and the person is to be evaluated only once
                    IsRepeatableOnlyOnceForEvaluating then it is important to 
                    not show the person the second time the user answers the same questionnaire 
                    Also when answering from the InProgress section if the user has selected 
                    a manager then the person must be shown on the start screen.
                    Hence in order to differentiate when to show the evaluating manager that is when answering 
                    from InProgress mode and not when answering from the Active mode.*/

                    personQuestionnaireManager.reloadDependencies(personQue);
                    break;
            }

            $scope.pq = personQue;
            $scope.questionnaire = personQue.Questionnaire;
            var pov = $scope.questionnaire.PointOfView;
            var povId = null; // performing a check if user has a pre-defined drop down value selected and retrieving its data

            function getSelectedListEntity(list, povId) {
                for (var i = 0; i < list.length; i++) {
                    var listEntity = list[i];

                    if (listEntity && listEntity.Id === povId) {
                        return listEntity;
                    }
                }

                return null;
            } // Setting the retrieved data to the scope variables

            function setSelectedListEntity(listEntity) {
                if (listEntity != null) {
                    $scope.evaluateId = listEntity.Id;
                    $scope.deptName = listEntity.Text;
                }
            } // On load of this controller this piece of code is executed to fetch the list for drop down and pre-defined value of drop down

            povId = personQue.EvaluatedForId;

            if (povId !== null || angular.isDefined(povId)) {
                $scope.evaluatingList = $scope.questionnaire.EvaluatingFor;
                var selectedEntity = getSelectedListEntity($scope.evaluatingList, povId);
                setSelectedListEntity(selectedEntity);
            } // Callback method which gets the data from the lazy drop down directive and sets to scope variable
            // selectedEntity parameter returns empty string as its not defined in the view (Not necessary for Startscreen, used in action plan)

            $scope.setListEntity = function (listEntity, selectedEntity) {
                setSelectedListEntity(listEntity);
            }; // Look for a text to be displayed on the drop down

            $scope.checkDropDownText = function () {
                if ($scope.deptName !== null) {
                    return $scope.deptName;
                } else {
                    return $rootScope.getResourceText('LIT_NO_VALUE_SELECTED');
                }
            };

            $scope.showGroupDescription = function (groupName, groupDescription) {
                if (groupDescription === null) {
                    ionicToast.showDefault(groupName);
                    return;
                }
            };

            $scope.ttsConvert = function (queInstance, event) {
                var text = TextToSpeachUtil.stripHTML(queInstance);
                TextToSpeachUtil.convertTextToSpeach(text, 'questionnaire');

                if (event) {
                    event.preventDefault(); // added for ionic

                    event.stopPropagation();
                }
            };

            $scope.getDropDownVisibility = function () {
                if ($scope.questionnaire.PointOfView === "Department" && $scope.questionnaire.HidePointOfViewOnStartScreen)
                    return false;
                else
                    return true;
            }

            $scope.getExtendedHtml = function (extDescHtml) {
                var htmlDiv = document.createElement('div');
                htmlDiv.innerHTML = extDescHtml;
                var anchorCollection = htmlDiv.getElementsByTagName('a');

                //for (var i = 0; i < anchorCollection.length; i++) {
                //  var aElement = anchorCollection[i];
                //  var hrefAttr = aElement.removeAttribute('target'); // Commented below code as external links in IOS were not working with the below line of code
                //  // TODO: Investigate the whole method as to why it was added. (*Link with just a document download was not working in IOS,
                //  // When added this method it downloaded the file)
                //  //aElement.setAttribute('target', '_system');
                //}

                var modifiedHtml = htmlDiv.innerHTML;
                htmlDiv = null;
                return modifiedHtml;
            };

            $scope.onStartAnswering = function () {
                //LoaderService.show();  //Hiding the loader for local operations
                var state = $stateParams.state;
                var queId = $scope.questionnaire.Id;
                $scope.pq.EvaluatedForId = $scope.evaluateId;
                $scope.pq.LastGroupIndex = -1; // Initiated date is assigned only if the Web API returns the initiated date as null.
                // So initiated date is initialized only once, that is at the start screen (if null)

                if ($scope.pq.InitiatedDate == null) {
                    var date = new Date();
                    var initiatedDate = DateUtil.getFormattedValue(date, "dateTime");
                    $scope.pq.InitiatedDate = initiatedDate;
                }

                if ($scope.questionnaire.IsSurvey) {
                    $scope.pq.InitiatedDate = DateUtil.getFormattedValue(new Date($scope.answeringDate), "dateTime");
                }

                $scope.pq = personQuestionnaireManager.savePersonQuestionniare($scope.pq, false);
                var id = $scope.pq.Id;
                var timerPromise = $timeout(function () {
                    var queIdForColoring = "-1";

                    if ($scope.questionnaire.EnableAnswerOptionColour === true) {
                        queIdForColoring = queId;
                    }

                    $scope.$emit('RenderStyleQuestionnaire', {
                        qId: queIdForColoring
                    });
                    $state.go('app.apv', {
                        id: id,
                        state: state,
                        pov: pov,
                        viewTitle: $scope.title,
                        modColor: $scope.modColor,
                        date: $scope.answeringDate
                    }, {
                        reload: false,
                        inherit: false,
                        notify: true
                    });
                    $timeout.cancel(timerPromise);
                }, 0); // Reducing the time out to 0 from 100 (For local operations)
            }; // This method checks if the questionnaire entity has Evaluating For list. If true then display only that data
            // and online search option is not shown.

            $scope.isEvaluatingForEmpty = function (tableName) {
                var userId = userDetails.UserId;
                var evalList = questionnaireManager.getEvalIdsList($scope.questionnaire.Id, userId, $scope.questionnaire.PointOfView);

                if (evalList.length === 0) {
                    return $scope.isOnlineDropDownEnable(tableName);
                }

                return false;
            }; // This method returns setting value for the dropdown and also checks if device is online.

            $scope.isOnlineDropDownEnable = function (tableName) {
                var enableOnline = false; // Here the preference is for the EvaluatingFor List which is part of questionnaire entity while downloading.
                // If that is empty then enable online search

                switch (tableName) {
                    case 'Person':
                        enableOnline = userDetails.EnableOnlinePersons;
                        break;

                    case 'Department':
                        enableOnline = userDetails.EnableOnlineDepartments;
                        break;

                    case 'Asset':
                        enableOnline = userDetails.EnableOnlineAssets;
                        break;

                    case 'Chemical':
                        enableOnline = userDetails.EnableOnlineChemicals;
                        break;

                    default:
                        enableOnline = false;
                }

                return enableOnline;
            };
        }]);
})();


/***/ }),

/***/ "./scripts/controller/surveyController.js":
/*!************************************************!*\
  !*** ./scripts/controller/surveyController.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    var app = angular.module("questionnaire");
    app.controller("surveyController", [
        "$rootScope",
        "$scope",
        "$state",
        "$ionicPlatform",
        "userDetailsManager",
        "$stateParams",
        "CommonMethodsFactory",
        "$timeout",
        "personQuestionnaireManager",
        "QuestionnaireMethodFactory",
        "DateUtil",
        "answerOptionManager",
        "valuationAnswerOptionManager",
        function (
            $rootScope,
            $scope,
            $state,
            $ionicPlatform,
            userDetailsManager,
            $stateParams,
            CommonMethodsFactory,
            $timeout,
            personQuestionnaireManager,
            QuestionnaireMethodFactory,
            DateUtil,
            answerOptionManager,
            valuationAnswerOptionManager
        ) {
            $ionicPlatform.ready(function () {
                if ($stateParams.date) {
                    $scope.date = $stateParams.date;
                    $scope.AnswerDate = new Date($scope.date);
                }

                $scope.title = $stateParams.viewTitle;
                $scope.userDetail = userDetailsManager.getUserLastLoggedTimeStamp();
                $scope.UserName = $scope.userDetail.UserName;
                $scope.SurveyList = [];

                $scope.SurveyList = getSurveyData();

                function getSurveyData() {
                    var queList = [];
                    if ($scope.date) {
                        var activePath = $state.current.name;
                        switch (activePath) {
                            case "app.surveyTabs.history":
                                queList = CommonMethodsFactory.getSurveyHistoryForTheDate($scope.date);
                                break;
                            default:
                                if ($scope.AnswerDate.getDay() != 6)
                                    queList = CommonMethodsFactory.getActiveSurveyForTheDate($scope.date);
                                break;
                        }
                    }
                    return queList;
                }

                $scope.navigateAnswering = function (answeringInstance) {
                    var id = answeringInstance.Id;
                    var navigateTo = "";
                    var pov = "";
                    var timerPromise = $timeout(function () {
                        var stateVal = $state.current.name;
                        var stateVal = "app.qTabs.active";
                        navigateTo = "app.startScreen";

                        //First : Get whether a already answered not inprogress and notcompleted personquestionnaire exists.
                        var existingUnAnsweredPq =
                            personQuestionnaireManager.getUnAnsweredPersonQuestionnaireNonTemplate(
                                id
                            );

                        if (existingUnAnsweredPq === null) {
                            //Second: We now get from the PersonQuestionnaireTemplate
                            //and save to the PerosnQuestionnaire
                            //with answeringInProgress = false and answeringCompleted = false.
                            var personQueTemplateAnswer =
                                personQuestionnaireManager.getUnAnsweredPersonQuestionnaire(
                                    id
                                );

                            var savedPq =
                                personQuestionnaireManager.savePersonQuestionniare(
                                    personQueTemplateAnswer,
                                    null
                                );
                            id = savedPq.Id;
                        } else {
                            existingUnAnsweredPq.IsTemplate = false;
                            id = existingUnAnsweredPq.Id;
                        }

                        

                        $state.go(
                            navigateTo,
                            {
                                id: id,
                                state: stateVal,
                                viewTitle: $scope.title,
                                pov: pov,
                                isSurvey: true,
                                date: $scope.date,
                            },
                            {
                                reload: false,
                                inherit: false,
                                notify: true,
                            }
                        );
                        $timeout.cancel(timerPromise);
                    }, 100);

                }

                $scope.validQuestionnaireGroups = function (groups) {
                    return QuestionnaireMethodFactory.validateQuestionGroupsInDependency(groups);
                };

                $scope.getPersonQuestionAnswer = function (questionId, pqa) {
                    return QuestionnaireMethodFactory.getPersonQuestionAnswer(questionId, pqa);
                };

                $scope.getPersonVQAnswer = function (qId, vqId, pvqaEntity) {
                    return QuestionnaireMethodFactory.getPersonVQAnswer(qId, vqId, pvqaEntity);
                };

                $scope.loadPdfAOTemplate = function (q) {
                    switch (q.TypeCode) {
                        case 0:
                            return 'templates/pdf_templates/questionnaire/questionnairePdf_answerOption/textAOTemplate.html';

                        case 1:
                            return 'templates/pdf_templates/questionnaire/questionnairePdf_answerOption/textAOTemplate.html';

                        case 2:
                            return 'templates/pdf_templates/questionnaire/questionnairePdf_answerOption/commonAOTemplate.html';

                        case 3:
                        case 6:
                            return 'templates/pdf_templates/questionnaire/questionnairePdf_answerOption/commonAOTemplate.html';

                        case 4:
                            // This returned null as Siganture is a image format and it needs to be loaded before only to render properly while pdf is loaded
                            return null;

                        case 5:
                            if (q.ColumnType != null) {
                                return loadDtTemplatePdf(q);
                            } else {
                                return 'templates/pdf_templates/questionnaire/questionnairePdf_answerOption/commonAOTemplate.html';
                            }
                        case 3:
                            return 'templates/pdf_templates/questionnaire/questionnairePdf_answerOption/commonAOTemplate.html';
                        default:
                            return;
                    }
                };

                function loadDtTemplatePdf(q) {
                    switch (q.ColumnType) {
                        case 'HtmlText':
                        case 'CountPicker':
                        case 'Department':
                        case 'LineOfBusiness':
                        case 'ListValue':
                        case 'Person':
                        case 'EasyClassification':
                        case 'ProblemArea':
                        case 'SafetyDepartment':
                        case 'Asset':
                        case 'Insurance':
                        case 'TextBox':
                        case 'City':
                        case 'Country':
                        case 'GeographyLocation':
                        case 'Chemical':
                        case 'EditableTimePicker':
                        case 'TimePicker':
                            return 'templates/pdf_templates/questionnaire/dataTypePdf/textTemplate.html';
                        case 'DatePicker':
                            return 'templates/pdf_templates/questionnaire/dataTypePdf/dateTemplate.html';
                        case 'CheckBox':
                            return 'templates/pdf_templates/questionnaire/dataTypePdf/checkBoxTemplate.html';
                        default:
                            return;
                    }
                };

                $scope.loadPdfVAOTemplate = function (questionType) {
                    switch (questionType) {
                        case 0:
                            return 'templates/pdf_templates/questionnaire/questionnairePdf_answerOption/vAOTextTemplate.html';

                        case 1:
                            return 'templates/pdf_templates/questionnaire/questionnairePdf_answerOption/vAOTextTemplate.html';

                        case 2:
                            return 'templates/pdf_templates/questionnaire/questionnairePdf_answerOption/vAOTemplate.html';

                        case 3:
                            return 'templates/pdf_templates/questionnaire/questionnairePdf_answerOption/vAOTemplate.html';

                        case 4:
                        case 6:
                            return 'templates/pdf_templates/questionnaire/questionnairePdf_answerOption/vAOTemplate.html';

                        default:
                            return;
                    }
                };

                $scope.getAttachmentDetails = function (entity) {
                    if (entity.FileName != null && entity.FileName.indexOf('.pdf') !== -1) {
                        return {
                            isPdf: true,
                            FileName: entity.FileName,
                        }
                    }
                    return {
                        isPdf: false,
                        FileName: entity.FileName
                    }
                }

                $scope.getAnswerOptionTextByAnswerId = function (answerId) {
                    if (answerId) {
                        if (answerId.indexOf('|') > -1) {
                            var answerIds = answerId.split('|');
                            var concatAnswerText = "";

                            for (var i = 0; i < answerIds.length; i++) {
                                var aId = answerIds[i];

                                if (aId) {
                                    var answerOption = answerOptionManager.getAnswerOption(aId);
                                    var aoText = answerOption.Text;
                                    concatAnswerText += aoText + ", ";
                                }
                            }

                            var formattedString = concatAnswerText.trim();
                            return formattedString.substring(0, formattedString.length - 1) + ".";
                        } else {
                            return $scope.getAnswerOptionTextById(answerId);
                        }
                    }
                };

                $scope.getVAnswerOptionTextByAnswerId = function (valuationAOId) {
                    if (valuationAOId) {
                        if (valuationAOId.indexOf('|') > -1) {
                            var vanswerIds = valuationAOId.split('|');
                            var concatAnswerText = "";

                            for (var i = 0; i < vanswerIds.length; i++) {
                                var vaId = vanswerIds[i];

                                if (vaId) {
                                    var vAnswerOption = valuationAnswerOptionManager.getValuationAnswerOptionByVAOId(vaId);
                                    var vaoText = vAnswerOption.Text;
                                    concatAnswerText += vaoText + ", ";
                                }
                            }

                            var formattedString = concatAnswerText.trim();
                            return formattedString.substring(0, formattedString.length - 1) + ".";
                        } else {
                            return $scope.getValuationAnswerOptionTextByVAOId(valuationAOId);
                        }
                    }
                };

                $scope.getValuationAnswerOptionTextByVAOId = function (valuationAOId) {
                    var vAnswerOption = valuationAnswerOptionManager.getValuationAnswerOptionByVAOId(valuationAOId);
                    var vaoText = vAnswerOption.Text;
                    return vaoText;
                };

                $scope.getAnswerOptionTextById = function (answerOptionId) {
                    var answerOption = answerOptionManager.getAnswerOption(answerOptionId);
                    var aoText = answerOption.Text;
                    return aoText;
                };

                // SurveyToFix - Need to handle for the next release
                //$scope.showDate = function () {
                //    $scope.isDatePickDisabled = true;
                //    var date = $scope.AnswerDate;
                //    var theme = datePickerTheme();
                //    var dateValue = GeneralUtil.pickDate(null, date, theme);
                //    dateValue.then(function (date) {
                //        $scope.isDatePickDisabled = false;
                //        $scope.date = $scope.AnswerDate = date;
                //        getSurveyData();
                //    }, function (e) {
                //        $scope.isDatePickDisabled = false;
                //    });
                //};

                //function datePickerTheme() {
                //    $scope.customer = customersManager.getCustomers();
                //    if ($scope.customer.IsDarkModeEnable) {
                //        return 2;
                //    } else {
                //        return 3;
                //    }
                //}
            });
        },
    ]);
})();

/***/ }),

/***/ "./scripts/controller/toggleUrl.js":
/*!*****************************************!*\
  !*** ./scripts/controller/toggleUrl.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var app = angular.module("questionnaire");
  app.controller("toggleUrlController", [
    "$scope",
    "$state",
    "$stateParams",
    "PopupUtil",
    "LocalStorageHelper",
    "LocalStorageUtility",
    "Restangular",
    "customersManager",
    "ionicToast",
    "$ionicHistory",
    "LoaderService",
    "$rootScope",
    "DeviceUtil",
    "AppMessages",
    "$timeout",
    "CommonMethodsFactory",
    "documentLibraryManager",
    "$ionicPlatform",
    "ToggleUrlMethodFactory",
    "BackButtonParamService",
    function (
      $scope,
      $state,
      $stateParams,
      PopupUtil,
      LocalStorageHelper,
      LocalStorageUtility,
      Restangular,
      customersManager,
      ionicToast,
      $ionicHistory,
      LoaderService,
      $rootScope,
      DeviceUtil,
      AppMessages,
      $timeout,
      CommonMethodsFactory,
      documentLibraryManager,
      $ionicPlatform,
      ToggleUrlMethodFactory,
      BackButtonParamService
    ) {
      $scope.showBack = Boolean($stateParams.isFromLogin);
      BackButtonParamService.setParams({ shouldExit: !$scope.showBack });
      $scope.data = {};
      $scope.data.textBoxVal = false;
      $scope.data.tokenBoxVal = false;
      $scope.data.defaultTypeVal = false;
      $scope.customerDetails = null;
      $scope.customerSelectMessage = null;
      $scope.closeIcon = $rootScope.getIconValue("Close");

      var customer = customersManager.getCustomers();

      var isIntuneSetUpValue = false;
      var promiseDeviceUtil =
        DeviceUtil.getKeyValueWithSharedPreferences("isIntuneSetUp");
      promiseDeviceUtil.then(
        function (intuneSetpUp) {
          isIntuneSetUpValue = intuneSetpUp;
        },
        function (err) {}
      );

      function isDeviceOnline() {
        var isOnline = DeviceUtil.isDeviceOnline();
        return isOnline;
      }

      if (isDeviceOnline()) {
        // var isFreshInstall = window.localStorage.getItem('isFreshInstall');
        // var guideInstruction = window.localStorage.getItem('guideInstruction');
        //var getGuideInstPrm = DeviceUtil.getKeyValueWithSharedPreferences('guideInstruction')
        var getInstallProm =
          DeviceUtil.getKeyValueWithSharedPreferences("isFreshInstall");
        getInstallProm
          .then(function (data) {
            // data variable will contain data retrived from SharedPreferences.
            onlineFreshInstallProcess(data);
          })
          .catch(function () {
            onlineFreshInstallProcess(null);
          });
      } else {
        // isFreshInstall = window.localStorage.getItem('isFreshInstall');
        var getInstallPrm =
          DeviceUtil.getKeyValueWithSharedPreferences("isFreshInstall");
        getInstallPrm
          .then(function (data) {
            // data variable will contain data retrived from SharedPreferences.
            offlineFreshInstallProcess(data);
          })
          .catch(function () {
            offlineFreshInstallProcess(null);
          });
      }

      function onlineFreshInstallProcess(isFreshInstall) {
        if (isFreshInstall === null) {
          // window.localStorage.setItem('isFreshInstall', false);
          var setInstallProm = DeviceUtil.setKeyValueWithSharedPreferences(
            "isFreshInstall",
            false
          );
          setInstallProm.then(function () {
            // executes this method when data is saved sucessfully.
          });
          if (ionic.Platform.isAndroid() == true) {
            screen.orientation.lock("portrait");
          }
          $state.go("welcome");
        } // FT 7332 Deep link login issue, Added a check to handle the issue

        // var isfromDeepLink = window.localStorage.getItem('fromDeepLink');

        var getLinkProm =
          DeviceUtil.getKeyValueWithSharedPreferences("fromDeepLink");
        getLinkProm
          .then(function (data) {
            // data variable will contain data retrived from SharedPreferences.
            deepLinkProcess(data, isFreshInstall);
          })
          .catch(function () {
            //deepLinkProcess(null, isFreshInstall);
          });
      }

      function deepLinkProcess(isfromDeepLink, isFreshInstall) {
        if (
          (!isfromDeepLink || isfromDeepLink !== "1") &&
          isIntuneSetUpValue === false
        ) {
          var customerData = customersManager.getCustomers();
          if (isFreshInstall === null && customerData === null) {
            LoaderService.show();
            var onlineData = "test";
            var custNameData = "DemoDK";
            var baseUrlValue = CommonMethodsFactory.getBaseUrl(onlineData);
            Restangular.setBaseUrl(
              "https://" + baseUrlValue + "/" + custNameData + "/api/v1/"
            );
            var defaultLangPromise = LocalStorageHelper.setUserDefaultLanguage(
              custNameData,
              onlineData,
              null
            );
            defaultLangPromise.then(
              function () {
                var suitePromise = LocalStorageHelper.initSuiteDetails(
                  custNameData,
                  onlineData,
                  null,
                  false
                );
                suitePromise.then(
                  function (success) {
                    var loaderProm = LoaderService.hide();
                    loaderProm.then(function () {
                      // $scope.$emit('RenderButtonBgHeaderColor');
                      $rootScope.$emit("darkModeEnable");
                      $rootScope.$broadcast("refreshLogin");
                      // window.localStorage.setItem('isFreshInstall', false);
                      var setInstallProm =
                        DeviceUtil.setKeyValueWithSharedPreferences(
                          "isFreshInstall",
                          false
                        );
                      setInstallProm.then(function () {
                        // executes this method when data is saved sucessfully.
                      });
                    });
                  },
                  function (error) {
                    LoaderService.hide();
                    return;
                  }
                );
              },
              function (error) {
                LoaderService.hide();
              }
            );
          }
        }
      }

      function offlineFreshInstallProcess(isFreshInstall) {
        if (isFreshInstall === null) {
          // window.localStorage.setItem('isFreshInstall', false);
          var setInstallProm = DeviceUtil.setKeyValueWithSharedPreferences(
            "isFreshInstall",
            false
          );
          setInstallProm.then(function () {
            // executes this method when data is saved sucessfully.
          });
          if (ionic.Platform.isAndroid() == true) {
            screen.orientation.lock("portrait");
          }
          $state.go("welcome");
        }
      }

      checkIfCustomerExists();

      $ionicPlatform.ready(function () {
        $scope.searchIcon = $rootScope.getIconValue("Search");
        $scope.closeIcon = $rootScope.getIconValue("Close");
        $scope.searchText = $rootScope.getResourceText("LIT_SEARCH");
        $scope.qrScannerIcon = $rootScope.getIconValue("Scanner");
        $scope.flipCameraIcon = $rootScope.getIconValue("Flip");
        $scope.flashCameraIcon = $rootScope.getIconValue("Flash");
        $scope.scannerCloseIcon = $rootScope.getIconValue("ScannerClose");
      });

      function checkIfCustomerExists() {
        $rootScope.$emit("RenderButtonBgHeaderColor");
        if (customer != null) {
          $scope.title = customer.Title;
          $scope.headerColor = customer.ColourCode;
          var cName = customer.UniqueUrlPart;

          if (cName && cName.toLowerCase() === "demo_sit") {
            cName = "Demo";
          }

          $scope.data.customerName = cName;
          var onlineVal = customer.OnlineVal;

          if (onlineVal == "cloud") {
            onlineVal = "cloudse";
          }

          $scope.data.choice = onlineVal;
          $scope.data.ckey = customer.CKey;
          $scope.customerDetails = customer;

          var url = CommonMethodsFactory.getBaseUrl(onlineVal);
          $scope.data.customerUrl = url + "/" + cName;
          if (customer.CKey)
            $scope.data.customerUrl =
              $scope.data.customerUrl + "?ckey=" + customer.CKey;
          $scope.data.textBoxVal = true;

          StatusBar.backgroundColorByHexString($scope.headerColor);
          document.documentElement.style.setProperty(
            "--statusbar-bg-color",
            $scope.headerColor
          );
        } else {
          //   $scope.data.customerUrl = "test.safetynet.dk/demodk?ckey=DemoDK";
          //   $scope.data.customerName = "Demo";
          //   $scope.data.choice = "test";
          $scope.title = "SafetyNet-HSEQ";
          //   $scope.data.textBoxVal = true;
          StatusBar.backgroundColorByHexString("#5176A1");
          document.documentElement.style.setProperty(
            "--statusbar-bg-color",
            "#5176A1"
          );
        }
      }

      $scope.goBack = function () {
        $ionicHistory.goBack();
      };

      $scope.changeEnvironmentSelection = function (data, itemType) {
        if (itemType === "textBox") {
          data.textBoxVal = true;
          data.tokenBoxVal = false;
        } else {
          data.tokenBoxVal = true;
          data.textBoxVal = false;
        }
      };

      $scope.validateUrl = function (data) {
        ToggleUrlMethodFactory.validateUrl(data);
      };

      $scope.scanQRCode = function (shouldScan) {
        if (shouldScan)
          ToggleUrlMethodFactory.ScanQRCode($scope, false, ".scanInput");
      };

      $scope.scanURL = function (event, shouldScan) {
        event.preventDefault();
        if (shouldScan)
          ToggleUrlMethodFactory.ScanQRCode($scope, false, ".urlScan");
      };

      $scope.directLogin = function (token) {
        if (token) {
          LoaderService.show();
          $rootScope.$emit("CallParentMethod", {
            data: token,
            shouldShowToaster: false,
          });
        } else {
          ionicToast.showDefault(
            $rootScope.getResourceText("MSG_MOBILE_LOGIN_EMPTY_TOKEN")
          );
        }
      };

      $scope.navigateToLogin = function (data) {
        if (data.customerUrl) this.validateUrl(data);
        else this.directLogin(data.customerToken);
      };

      $scope.clearSearch = function () {
        $scope.data.customerUrl = null;
        $scope.data.customerToken = null;
        $scope.data.textBoxVal = false;
        $scope.data.tokenBoxVal = false;
      };
    },
  ]);
})();


/***/ }),

/***/ "./scripts/controller/userProfileController.js":
/*!*****************************************************!*\
  !*** ./scripts/controller/userProfileController.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var app = angular.module('questionnaire');
  app.controller('userProfileController', ['$scope', 'userDetailsManager', 'LocalStorageHelper',
    'PopupUtil', '$rootScope', 'LoaderService', '$injector', 'customersManager',
    '$timeout', '$ionicHistory', '$state', 'ResetPoolUtil', 'DeviceUtil',
    'AppMessages', '$cordovaDevice', '$cordovaAppVersion', 'ionicToast',
    'languageManager', '$q', 'documentLibraryManager', function ($scope, userDetailsManager, LocalStorageHelper,
      PopupUtil, $rootScope, LoaderService, $injector, customersManager, $timeout,
      $ionicHistory, $state, ResetPoolUtil, DeviceUtil, AppMessages,
      $cordovaDevice, $cordovaAppVersion, ionicToast, languageManager, $q, documentLibraryManager) {
      $rootScope.langSelectedData = null;
      $scope.form = {};
      $scope.userDetails = {};
      userProfileDetails();

      $rootScope.$on('exceptionRefresh', function (exception, cause) {
        refreshErrorList();
      });

      function refreshErrorList() {
        $scope.errorList = LocalStorageHelper.getErrorData();
      }
      refreshErrorList();

      $scope.showErrorDetails = function showErrorDetails(error) {
        PopupUtil.hide();
        PopupUtil.alert(error.toStringValue, error.stack);
      }

      $scope.getUserClass = function (isManager) {
        if (isManager) {
          return $rootScope.getIconValue('Positive');
        }

        return $rootScope.getIconValue('Negative');
      };

      var existingSubscribedTopicList = window.localStorage.getItem('subscribedTopicList');
      $scope.userDetails.subScriptionList = existingSubscribedTopicList;

      function userProfileDetails() {
        // Default variable for save button in settings section (Displays white border) 
        $scope.isSaved = false;
        $scope.userProfile = userDetailsManager.getUserLastLoggedTimeStamp();
        var userPrefLang = $scope.userProfile.UserPreferredLanguage;

        if (userPrefLang == null) {
          userPrefLang = window.localStorage.getItem('userLanguage');
        }

      $scope.langSelectedData = userPrefLang;
      $scope.userDetails.isDarkMode = $scope.userProfile.Customer.IsDarkModeEnable;
      $scope.userDetails.checkStatus = $scope.userProfile.Customer.IsAutoSyncEnabled;
      $scope.userDetails.isReadAloud = $scope.userProfile.Customer.IsReadAloudTextEnable;
      $scope.userDetails.isTileDisplay = $scope.userProfile.Customer.IsTileDisplayEnable;
      $scope.userDetails.isSaveImageToGallery = $scope.userProfile.Customer.SaveImageToGallery;
      $scope.userDetails.isDemoCust = $scope.userProfile.Customer.IsDemoCustomer;
      $scope.userDetails.isDemoUserBool = $scope.userProfile.IsDemoUser;
      $scope.userDetails.nextUpdate = $scope.userProfile.Customer.NextUpdate;
      $scope.userDetails.disableUserSetting = $scope.userProfile.Customer.DisableUserSetting;
      $scope.userDetails.isNextAutoUpdateEnable = $scope.userProfile.Customer.EnableNextAutoUpdate;
      $scope.userDetails.isLocationHighAccuracyEnable = $scope.userProfile.Customer.EnableHighAccuracyForGeoLocation;
      $scope.userDetails.isDisplayFavorites = $scope.userProfile.Customer.DisplayFavorites;
      var customerConfig = customersManager.getCustomers();
      $scope.userDetails.customerColor = customerConfig.ColourCode;
      $scope.maxImageQuality = "100";
      $scope.userDetails.imageQuality = $scope.userProfile.Customer.CameraImageQuality;
      $scope.userDetails.readAloudSpeed = $scope.userProfile.Customer.ReadAloudSpeed;
      $scope.userDetails.webAPIVersion = $scope.userProfile.Customer.VersionInfo;
      $scope.languageList = languageManager.getActiveLanguages();
      $scope.userDetails.customerFullName = $scope.userProfile.Customer.CustomerName;
      $scope.userDetails.customerUrlPart = $scope.userProfile.Customer.EnvironmentName;
    }

      $scope.saveCustomer = function (isDarkMode, checked, isReadAloud, nextUpdate, isTileDisplay) {
        $scope.userProfile.Customer.IsDarkModeEnable = isDarkMode;
        $scope.userProfile.Customer.IsAutoSyncEnabled = checked;
        $scope.userProfile.Customer.IsReadAloudTextEnable = isReadAloud;
        $scope.userProfile.Customer.NextUpdate = nextUpdate;
        $scope.userProfile.Customer.IsTileDisplayEnable = isTileDisplay;
        $scope.userProfile.Customer.EnableNextAutoUpdate = $scope.userDetails.isNextAutoUpdateEnable;
        $scope.userProfile.Customer.EnableHighAccuracyForGeoLocation = $scope.userDetails.isLocationHighAccuracyEnable;
        $scope.userProfile.Customer.DisplayFavorites = $scope.userDetails.isDisplayFavorites;
        userDetailsManager.saveUserCustomer($scope.userProfile.Customer);

        if (checked === true) {
          $scope.$emit('performSync', {
            modName: 'All',
            animLoader: true
          });
        }
        $scope.$emit('darkModeEnable');
      };

      $scope.saveImageToGallerySetting = function (checked) {
        $scope.userProfile.Customer.SaveImageToGallery = checked;
        userDetailsManager.saveImageToGallerySetting($scope.userProfile.Customer);
      };

      $scope.saveImageQuality = function (imageQuality) {
        $scope.userProfile.Customer.CameraImageQuality = imageQuality;
        userDetailsManager.saveCameraImageQualityToCustomer($scope.userProfile.Customer);
      };

    $scope.saveReadAloudSpeed = function (readAloudSpeed) {
      $scope.userProfile.Customer.ReadAloudSpeed = readAloudSpeed;
      userDetailsManager.saveReadAloudSpeedToCustomer($scope.userProfile.Customer);
    };

    $scope.increaseSpeed = function increaseSpeed() {
      var speedVal = Number($scope.userDetails.readAloudSpeed);
      if (speedVal < 10) {
        $scope.form.formMyProfileSetting.$dirty = true;
        speedVal += 0.1;
      }
      $scope.userDetails.readAloudSpeed = speedVal.toFixed(1).toString();
    }

    $scope.decreaseSpeed = function decreaseSpeed(){
      var speedVal = Number($scope.userDetails.readAloudSpeed);
      if (speedVal > 7.5) {
        $scope.form.formMyProfileSetting.$dirty = true;
        speedVal -= 0.1;
      }
      $scope.userDetails.readAloudSpeed = speedVal.toFixed(1).toString();
    }
    $scope.saveSettings = function () {
      if ($scope.userDetails.nextUpdate > 0) {
        // Setting it to true on save click
        $scope.isSaved = true;
        $timeout(function () {
          $scope.saveImageQuality($scope.userDetails.imageQuality);
          $scope.saveReadAloudSpeed($scope.userDetails.readAloudSpeed);
          $scope.saveImageToGallerySetting($scope.userDetails.isSaveImageToGallery);
            $scope.saveCustomer($scope.userDetails.isDarkMode, $scope.userDetails.checkStatus, $scope.userDetails.isReadAloud, $scope.userDetails.nextUpdate, $scope.userDetails.isTileDisplay); // Reseting the form and assigning isSaved to false

            $scope.form.formMyProfileSetting.$setPristine();
            $scope.isSaved = false;
            successSaveSettings();
          }, 1);
        } else {
          ionicToast.showDefault($rootScope.getResourceText('LIT_REQUIRED'));
        }
      };

      function successSaveSettings() {
        if (!$scope.userProfile.Customer.IsAutoSyncEnabled) {
          var anim = '<lottie-player src="raw/saveSuccess.json" background="transparent" speed="1" id="uploadAnim" autoplay></lottie-player>';
          var contentTitle = "{{getResourceText('LIT_SAVE')}}";
          var contentLabel = "{{getResourceText('MSG_MOBILE_SAVE_SETTING')}}";
          var contentTimer = 3000;
          PopupUtil.animTimerPopUp(anim, contentTitle, contentLabel, contentTimer);
        }
      }

      $rootScope.unSaveChanges = function () {
        $scope.saveSettings();
      }// Collapsible advance settings

      $scope.settings = {
        show: false
      };

      $scope.toggleGroup = function (settings) {
        settings.show = !settings.show;
      };

      $scope.isGroupShown = function (settings) {
        return settings.show;
      }; // Collapsible for Language


      $scope.languageToggle = {
        show: false
      };

      $scope.toggleLanguage = function (languageToggle) {
        languageToggle.show = !languageToggle.show;
      };

      $scope.isLanguageShown = function (languageToggle) {
        return languageToggle.show;
      };

      $scope.saveSelectedLanguage = function (oldModelValue, langEntity) {
        if ($scope.userProfile.UserPreferredLanguage !== langEntity.CultureName) {
          var userName = $scope.userProfile.UserName;
          var oldUserLangPref = $scope.userProfile.UserPreferredLanguage;
          $scope.resetUserDataForLanguage(langEntity, oldModelValue);
        }
      };

      $scope.saveLanguage = function (langEntity) {
        var userLanguage = userDetailsManager.saveUserPreferredLanguage(langEntity.CultureName);
        $scope.langSelectedData = $scope.userProfile.UserPreferredLanguage = userLanguage;
        window.localStorage.setItem('userLanguage', langEntity.CultureName);
      };

      $scope.undoLanguage = function (oldUserLangPref) {
        $scope.langSelectedData = $scope.userProfile.UserPreferredLanguage = oldUserLangPref;
      };

      $scope.getFullImagePath = function (lang) {
        return "images/flags/" + lang.LanguageCode + ".png";
      };

      $scope.resetUserDataForLanguage = function (langEntity, oldUserLangPref) {
        var langConfirm = $rootScope.getResourceText('MSG_UPDATE_LANG_CONFIRM');
        langConfirm = langConfirm.replace('__LANG__', langEntity.Language);
        var confirmPromise = getResetConfirm($rootScope.getResourceText('LIT_UPDATE_DEF'), langConfirm);

        if (confirmPromise) {
          confirmPromise.then(function (success) {
            if (success) {
              LoaderService.show();
              $scope.saveLanguage(langEntity);
              var customer = $scope.userProfile.Customer;
              var customerName = customer.UniqueUrlPart;
              var onlineValue = customer.OnlineVal;
              var userName = $scope.userProfile.UserName;
              var cKey = customer.CKey;
                var suitePromise = LocalStorageHelper.initSuiteDetails(customerName, onlineValue, cKey, customer.IsCustomUrlEnabled);
              suitePromise.then(function (successSuite) {
                var userPromise = LocalStorageHelper.initUserDetails(userName);
                userPromise.then(function (successUserDetails) {
                  LoaderService.show();
                  $rootScope.$broadcast('initDownload');
                  $scope.$emit('sideMenuRefresh');
                  $scope.$emit('darkModeEnable');
                  userProfileDetails();
                  ResetPoolUtil.resetPool();
                  $rootScope.refreshOptions();
                });
              });
            } else {
              $scope.langSelectedData = oldUserLangPref;
              $scope.undoLanguage(oldUserLangPref);
            }
          });
        }
      };

      function getResetConfirm(confirmTitle, confirmMessage) {
        var isOnline = DeviceUtil.isDeviceOnline();

        if (isOnline === true) {
          var anim = '<lottie-player src="raw/generalQuestion.json" background="transparent" speed="1" id="questionAnim" autoplay></lottie-player>';
          return PopupUtil.animConfirm(anim, confirmTitle, confirmMessage);
          // return PopupUtil.confirm(confirmTitle, confirmMessage);
        } else {
          AppMessages.Error($rootScope.getResourceText('LIT_ALERT'), $rootScope.getResourceText('MSG_CHECK_INTERNET_CONNECTION'));
        }

        return null;
      }

      $scope.clearErrors = function () {
          var anim = '<lottie-player src="raw/delete.json" background="transparent" speed="1" id="deleteAnim" autoplay></lottie-player>';
          var contentTitle = $rootScope.getResourceText('LIT_MOBILE_REMOVE');
          var contentLabel = $rootScope.getResourceText('MSG_MOBILE_CLEAR_ERROR_LOG');
          var confirmPromise = PopupUtil.animConfirm(anim, contentTitle, contentLabel);
          confirmPromise.then(function (success) {
              if (success) {
                  LocalStorageHelper.clearErrorLog();
                  refreshErrorList();
              }
          });
      }

      $scope.uploadAllLogData = function () {
        LocalStorageHelper.postErrorLogData();
      }

      $scope.checkIsDisabled = function(){
        var errorData = LocalStorageHelper.getErrorData();
        if (errorData.length > 0) return false;
        else return true;
      }
      function reset() {
        LoaderService.show();
        $timeout(function () {
          // Removing actual document library files stored in filesystem before doing a reset.
          var resetProm = userDetailsManager.resetUserData();
          resetProm.then(function (success) {
            ResetPoolUtil.resetPool();
            var customer = $scope.userProfile.Customer;
            var customerName = customer.UniqueUrlPart;
            var onlineValue = customer.OnlineVal;
            var userName = $scope.userProfile.UserName;
            var cKey = customer.CKey;
            var suitePromise = LocalStorageHelper.initSuiteDetails(customerName, onlineValue, cKey, customer.IsCustomUrlEnabled);
            suitePromise.then(function (sucess) {
              var userDetailsPromise = LocalStorageHelper.initUserDetails(userName);
              userDetailsPromise.then(function (res) {
                //Next navigate to the Home screen disabling the back for the 
                //next view else the back button will be shown in the home screen.
                $ionicHistory.nextViewOptions({
                  disableBack: true
                });
                $ionicHistory.clearHistory();
                $state.go("app.home").then(function () {
                  $timeout(function () {
                    $rootScope.$broadcast('initDownload');
                    LoaderService.show($rootScope.getResourceText('MSG_UPDATING_CHANNELS'));
                  }, 500);
                });
              });
              // $scope.$emit('RenderButtonBgHeaderColor');
              $scope.$emit('darkModeEnable');
              $rootScope.refreshOptions();
            });
          });
        }, 500);
      }

      $scope.resetUserData = function () {
        var confirmPromise = getResetConfirm($rootScope.getResourceText('LIT_RESET_DATA'), $rootScope.getResourceText('MSG_CONFIRM_MOBILE_RESET_DATA'));

        if (confirmPromise) {
          confirmPromise.then(function (success) {
            if (success) {
              reset();
            }
          });
        }
      };

      $cordovaAppVersion.getVersionNumber().then(function (version) {
        var buildVersion = version;
        var cordovaVersion = $cordovaDevice.getCordova();
        $scope.appVersion = buildVersion + "." + cordovaVersion.replace(/\./g, '');
      }, false);

      $scope.updateUserSpecificDetails = function (resetArea) {
        var isOnline = DeviceUtil.isDeviceOnline();

        if (isOnline === true) {
          switch (resetArea) {
            case 'Departments':
              var template = $rootScope.getResourceText('MSG_CONFIRM_RESET_DEPARTMENTS');
              break;

            case 'Applications':
              var template = $rootScope.getResourceText('MSG_CONFIRM_RESET_APPLICATIONS');
              break;

            case 'Persons':
              var template = $rootScope.getResourceText('MSG_CONFIRM_RESET_PERSONS');
              break;

            case 'Resources':
              var template = $rootScope.getResourceText('MSG_CONFIRM_RESET_RESOURCES');
              break;

            case 'Icons':
              var template = $rootScope.getResourceText('MSG_CONFIRM_RESET_ICONS');
              break;

            case 'Suite':
              var template = $rootScope.getResourceText('MSG_CONFIRM_RESET_APP_SETTINGS');
              break;

            case 'User Details':
              var template = $rootScope.getResourceText('MSG_CONFIRM_RESET_USER_DETAILS');
              break;

            default:
              var template = $rootScope.getResourceText('MSG_CONFIRM_MOBILE_RESET_DATA');
          }

          var title = $rootScope.getResourceText('LIT_RESET_DATA');
          var confirmPromise = PopupUtil.confirm(title, template);
          confirmPromise.then(function (success) {
            if (success) {
              LoaderService.show();
              var refreshPromiise = userDetailsManager.updateUserSpecificDetails(resetArea);
              refreshPromiise.then(function () {
                $scope.$emit('refresh');
                $scope.$emit('sideMenuRefresh');
                $scope.$emit('darkModeEnable');
                userProfileDetails();
                LoaderService.hide();
              }, function () {
                LoaderService.hide();
              });
            }
          });
        } else {
          AppMessages.Error($rootScope.getResourceText('LIT_ALERT'), $rootScope.getResourceText('MSG_CHECK_INTERNET_CONNECTION'));
        }
      };

      $scope.$on('darkModeEnable', function (event, data) {
        darkModeEnable();
      });

      function darkModeEnable() {
        $scope.customer = customersManager.getCustomers();
        if ($scope.customer.IsDarkModeEnable) {
          $scope.$emit('darkThemeBgColor', { isDark: true });
        }
        else {
          $scope.$emit('darkThemeBgColor', { isDark: false });
          $scope.$emit('RenderButtonBgHeaderColor');
        }
      }

    }]);
})();


/***/ }),

/***/ "./scripts/factoryService/commonMethods.js":
/*!*************************************************!*\
  !*** ./scripts/factoryService/commonMethods.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var app = angular.module("commonMethods", []);
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
app.factory("ActionPlanMethodFactory", [
  "$injector",
  "userApplicationsManager",
  "userDetailsManager",
  "$rootScope",
  function (
    $injector,
    userApplicationsManager,
    userDetailsManager,
    $rootScope
  ) {
    var actionPlanMethods = {
      getPersonApwStepAnswer: function getPersonApwStepAnswer(
        wizardStepId,
        columnId,
        columnValues
      ) {
        var wizStepAnswers = columnValues;

        for (var i = 0; i < wizStepAnswers.length; i++) {
          var stepAnswer = wizStepAnswers[i];

          if (
            stepAnswer.WizardStepId == wizardStepId &&
            stepAnswer.ColumnId == columnId
          ) {
            return stepAnswer;
          }
        }

        return null;
      },
      loadApwPreviewTemplate: function loadApwPreviewTemplate(columnText) {
        //TODO: Handle BooleanDropDown which contains only two values true and false.
        columnText =
          columnText.indexOf("ComboBox") >= 0 ? "DropDown" : columnText;
        columnText =
          columnText.indexOf("DropDown") >= 0 ? "DropDown" : columnText;

        switch (columnText) {
          case "RadEditor":
            //Long text....
            break;

          case "DropDown":
            return "templates/preview_templates/actionPlan/dropDownApwPV.html";

          case "DatePicker":
            return "templates/preview_templates/actionPlan/datePickerApwPV.html";

          case "IsComputed":
            //Mostly, should be a readOnly field. ? TODO check with AFE..
            break;

          case "CheckBox":
            return "templates/preview_templates/actionPlan/checkBoxApwPV.html";

          case "NumericTextBox":
            return "templates/preview_templates/actionPlan/numericApwPV.html";

          default:
            return "templates/preview_templates/actionPlan/shortTextApwPV.html";
        }
      },
      // Template load for Multi task
      loadMultiTaskPreviewTemplate: function loadMultiTaskPreviewTemplate(
        wizardValue
      ) {
        var columnText = wizardValue.ColumnType;
        columnText =
          columnText.indexOf("ComboBox") >= 0 ? "DropDown" : columnText;
        columnText =
          columnText.indexOf("DropDown") >= 0 ? "DropDown" : columnText;

        switch (columnText) {
          case "MultipleSolution":
            //Long text....
            return "templates/preview_templates/actionPlan/multiTask/multiTaskSolutionPV.html";

          case "DropDown":
            //All types of dropdown to be handled..
            return "templates/preview_templates/actionPlan/multiTask/multiTaskDropDownPV.html";

          case "DatePicker":
            if (wizardValue.Text === "MultiTaskDeadline") {
              return "templates/preview_templates/actionPlan/multiTask/multiTaskDeadLinePV.html";
            } else {
              return "templates/preview_templates/actionPlan/multiTask/multiTaskDatePickerPV.html";
            }

          //return "templates/actionplan_templates/multiTask_templates/multiTaskDatePicker.html";

          case "TextBox":
            if (wizardValue.Text === "MultiTaskSolutionFilesAndLinks") {
              return "templates/preview_templates/actionPlan/multiTask/multiTaskAttachmentPV.html";
            }

            return "templates/preview_templates/actionPlan/multiTask/multiTaskShortTextPV.html";

          case "Attachment":
            return "templates/preview_templates/actionPlan/multiTask/multiTaskAttachmentPV.html";

          default:
            //By default is a short textbox .
            return "templates/preview_templates/actionPlan/multiTask/multiTaskShortTextPV.html";
        }
      },
      getDropDownText: function getDropDownText(
        dropDownText,
        columnType,
        answerId
      ) {
        var columnList = this.getDropDownSourceByText(dropDownText, columnType);

        for (var i = 0; i < columnList.length; i++) {
          if (columnList[i].Id === answerId) {
            return columnList[i].Text;
          }
        }
      },
      getDropDownSourceByText: function getDropDownSourceByText(
        dropDownText,
        columnType
      ) {
        var userDetail = userDetailsManager.getUserLastLoggedTimeStamp();

        if (columnType === "BooleanDropDown") {
          var boolDataSource = [];
          boolDataSource.push({
            Text: $rootScope.getResourceText("LIT_YES"),
            Id: "true",
          });
          boolDataSource.push({
            Text: $rootScope.getResourceText("LIT_NO"),
            Id: "false",
          });
          return boolDataSource;
        } else {
          var userApplication =
            userApplicationsManager.getUserApplicationByText(
              userDetail.UserId,
              "ActionPlan"
            );
          var userId = userDetail.UserId;
          var appId = userApplication.ID;
          var managerText = this.getManagerText(dropDownText, columnType);
          var isPersonDropDown = false;

          if (managerText === "Person") {
            isPersonDropDown = true;
          }

          if (isPersonDropDown === true) {
            try {
              var dropDownList = [];
              var personManager = $injector.get("personManager");
              var reponsiblePersonsColumnTypes = [
                "AssignedTo",
                "ShortTermSolutionResponsible",
                "LongTermSolutionResponsible",
                "FollowUpSolutionResponsible",
              ];

              if (dropDownText === "Owner") {
                dropDownList = personManager.getAllOwners(userId, appId);
              } else if (
                reponsiblePersonsColumnTypes.indexOf(dropDownText) >= 0
              ) {
                dropDownList = personManager.getAllPersonsResponsible(
                  userId,
                  appId
                );
              } else {
                dropDownList = personManager.getAllPersonsByApplication(
                  userId,
                  appId
                );
              }

              return dropDownList;
            } catch (e) {}
          } else if (managerText === "Department") {
            try {
              var departmentManager = $injector.get("departmentManager");
              var dropDownList = departmentManager.getDepartmentsByUser(
                userId,
                appId
              );
              return dropDownList;
            } catch (e) {}

            return [];
          } else {
            var factoryText = this.camelCase(managerText) + "Manager";
            var factoryMethodName = "getAll" + managerText;

            try {
              var factoryManager = $injector.get(factoryText);
              var dropDownList = factoryManager.executeFunctionByName(
                factoryMethodName,
                null
              );
              return dropDownList;
            } catch (e) {}
          }

          return [];
        }
      },
      getManagerText: function getManagerText(dropDownText, columnType) {
        var managerText = "";

        switch (columnType) {
          case "CustomerFieldValueDropDown":
          case "RadComboBox":
          case "DropDown":
            managerText = dropDownText;
            break;

          default:
            managerText = columnType.replace("DropDown", "");
            break;
        }

        return managerText;
      },
      camelCase: function camelCase(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
          if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces

          return index == 0 ? match.toLowerCase() : match.toUpperCase();
        });
      },
      // Below method refactors the entity. Based on answering from In Progress/ New tab,
      // Person action plan entity is selected (Template/ Non template). Based on the selected entity, action plan entity is generated
      refactorAPEntity: function refactorAPEntity(pApw) {
        var newPApw = [];
        angular.copy(pApw, newPApw);
        var pAPWId = newPApw.Id; // Fetching person column values

        var personColumnValues = newPApw.ColumnValues;
        var wizardStepIds = [];
        var wizardStepColumnIds = []; // Adding step ids and step column ids to seperate array

        for (var i = 0; i < personColumnValues.length; i++) {
          var personColumnValue = personColumnValues[i];
          wizardStepIds.push(personColumnValue.WizardStepId);
          wizardStepColumnIds.push(personColumnValue.ColumnId);
        } // Fetching unique ids (Discard repetative ids)

        var uniqueWizardStepIds = wizardStepIds.filter(function (
          elem,
          index,
          self
        ) {
          return index == self.indexOf(elem);
        });
        var uniqueWizardStepColumnIds = wizardStepColumnIds.filter(function (
          elem,
          index,
          self
        ) {
          return index == self.indexOf(elem);
        }); // In the new implementation if a step/column is deleted in the web
        // it is only deleted from the template, not from the main action plan enetity
        // Therefore refactoring (deleting) the step/ column which are not part of
        // person entity.

        var wizardSteps = newPApw.Wizard.WizardSteps;
        var stepsIterationList = [];

        for (var i = 0; i < wizardSteps.length; i++) {
          // Based on this flag is step required or not is decided
          var isStepPresent = false;
          var step = wizardSteps[i];
          var stepId = step.Id;

          for (var j = 0; j < uniqueWizardStepIds.length; j++) {
            var uniqueStepId = uniqueWizardStepIds[j]; // Check if step is required

            if (stepId === uniqueStepId) {
              var columns = step.Columns;
              var columnIterationList = []; // make boolean variable to true

              isStepPresent = true;

              for (var k = 0; k < columns.length; k++) {
                var column = columns[k];
                var columnId = column.Id;
                var isColumnIdPresent = false;

                for (var l = 0; l < uniqueWizardStepColumnIds.length; l++) {
                  var uniqueColumnId = uniqueWizardStepColumnIds[l]; // Check is a column is necessary

                  if (columnId === uniqueColumnId) {
                    isColumnIdPresent = true;
                    break;
                  }
                }

                if (!isColumnIdPresent) {
                  // Column is not necessary, so adding it to delete list
                  columnIterationList.push(k);
                }
              } // Sorting the column ids

              columnIterationList = columnIterationList.sort(function (a, b) {
                return b - a;
              });

              for (var l = 0; l < columnIterationList.length; l++) {
                // Deleting columns from the entity
                var iterationValue = columnIterationList[l];
                step.Columns.splice(iterationValue, 1);
              }
            }
          }

          if (!isStepPresent) {
            // Step is not necessary, so adding it to delete list
            stepsIterationList.push(i);
          }
        } // Sorting the step ids

        stepsIterationList = stepsIterationList.sort(function (a, b) {
          return b - a;
        });

        for (var l = 0; l < stepsIterationList.length; l++) {
          // Deleting steps from the entity
          var stepIterationValue = stepsIterationList[l];
          newPApw.Wizard.WizardSteps.splice(stepIterationValue, 1);
        } // returning the wizard entity

        return newPApw.Wizard;
      },
      getColumnGuideEntity: function getColumnGuideEntity(
        guideId,
        wizStepId,
        columnId,
        pApw
      ) {
        var pApEntity = this.getPersonApwStepAnswer(
          wizStepId,
          columnId,
          pApw.ColumnValues
        );
        var guides = pApEntity.ColumnGuides;

        for (var i = 0; i < guides.length; i++) {
          var guide = guides[i];

          if (guide.GuideId === guideId) {
            return guide;
          }
        }
      },
      getGuideColumnsEntity: function getGuideColumnsEntity(wizStepId, pApw) {
        var pApEntity = this.getPersonApwStepAnswer(
          wizStepId,
          null,
          pApw.ColumnValues
        );
        var guides = pApEntity.ColumnGuides;
        return guides;
      },
    };
    return actionPlanMethods;
  },
]); // Below factory methods are used by both Askade and Claim modules.
// TODO : Factory name has to be renamed.

app.factory("AskadeMethodFactory", [
  "$injector",
  "userDetailsManager",
  "userApplicationsManager",
  function ($injector, userDetailsManager, userApplicationsManager) {
    var askadeMethods = {
      getPersonAkStepColoumnAnswer: function getPersonAkStepColoumnAnswer(
        akColumnId,
        akPersonEntity
      ) {
        var akPersonColEntity = akPersonEntity.ColumnValues;

        for (var i = 0; i < akPersonColEntity.length; i++) {
          var entity = akPersonColEntity[i];

          if (akColumnId === entity.FileColumnId) {
            return entity;
          }
        }
      },
      loadAskadePreviewTemplate: function loadAskadePreviewTemplate(
        columnText
      ) {
        switch (columnText) {
          case "RadEditor":
            //Long text....
            break;

          case "Category":
          case "Status":
          case "Probability":
          case "Consequence":
          case "Priority":
          case "ProblemArea":
          case "LineOfBusiness":
          case "Person":
          case "SafetyDepartment":
          case "Process":
          case "Asset":
          case "ControlLevel":
          case "CustomerFieldValue1":
          case "CustomerFieldValue2":
          case "Owner":
          case "Manager":
          case "EasyClassification":
          case "Country":
          case "City":
          case "ListValue":
            return "templates/preview_templates/askade/dropDownPV.html";

          case "VehiclePart":
            return "templates/preview_templates/askade/vehicleDamagePV.html";

          case "DatePicker":
            return "templates/preview_templates/askade/datePickerPV.html";

          case "CheckBox":
            return "templates/preview_templates/askade/checkBoxPV.html";

          case "NumericTextBox":
            return "templates/preview_templates/askade/shortLongNumericPV.html";

          case "TimePicker":
          case "EditableTimePicker":
            return "templates/preview_templates/askade/timePickerPV.html";

          case "TextBox":
            return "templates/preview_templates/askade/shortLongNumericPV.html";

          case "LongText":
            return "templates/preview_templates/askade/shortLongNumericPV.html";

          case "Signature":
            return "templates/preview_templates/askade/signaturePV.html";

          default:
            //By default is a short textbox .
            return "templates/preview_templates/askade/shortLongNumericPV.html";
        }
      },
      getColumnGuideEntity: function getColumnGuideEntity(
        guideId,
        columnId,
        pAkw
      ) {
        var pAkEntity = this.getPersonAkStepColoumnAnswer(columnId, pAkw);
        var guides = pAkEntity.ColumnGuides;

        for (var i = 0; i < guides.length; i++) {
          var guide = guides[i];

          if (guide.GuideId === guideId) {
            return guide;
          }
        }
      },
      getGuideColumnsEntity: function getGuideColumnsEntity(columnId, pAkw) {
        var pAkEntity = this.getPersonAkStepColoumnAnswer(columnId, pAkw);
        var guides = pAkEntity.ColumnGuides;
        return guides;
      },
      getDropDownText: function getDropDownText(
        columnType,
        datatypeId,
        answerId,
        moduleNameVal
      ) {
        var columnList = this.getDropDownSourceByText(
          columnType,
          datatypeId,
          moduleNameVal
        );

        for (var i = 0; i < columnList.length; i++) {
          if (columnList[i].Id === answerId) {
            return columnList[i].Text;
          }
        }
      },
      getDropDownTextCode: function getDropDownTextCode(
        columnType,
        datatypeId,
        answerId,
        moduleNameVal
      ) {
        var columnList = this.getDropDownSourceByText(
          columnType,
          datatypeId,
          moduleNameVal
        );

        for (var i = 0; i < columnList.length; i++) {
          if (columnList[i].Id === answerId) {
            return columnList[i];
          }
        }
      },
      getDropDownSourceByText: function getDropDownSourceByText(
        columnType,
        dataTypeId,
        moduleName,
        columnSubType
      ) {
        var userDetail = userDetailsManager.getUserLastLoggedTimeStamp();
        var userApplication = userApplicationsManager.getUserApplicationByText(
          userDetail.UserId,
          moduleName
        );
        var userId = userDetail.UserId;
        var appId = userApplication.ID;
        var factoryText = this.camelCase(columnType) + "Manager";
        var dropDownList = [];

        switch (columnType) {
          case "Person":
            var personManager = $injector.get("personManager");

            if (columnSubType === "All") {
              dropDownList = personManager.getAllPersonsList(userDetail.UserId);
            } else {
              dropDownList = personManager.getAllPersonForAskade(
                userDetail.UserId
              );
            }

            break;

          case "EasyClassification":
            var easyClassficationManager = $injector.get(
              "easyClassificationManager"
            );
            dropDownList =
              easyClassficationManager.getAllEasyClassificationByDataTypeId(
                dataTypeId
              );
            break;

          case "VehiclePart":
            var vehiclePartManager = $injector.get("VehiclePartManager");
            dropDownList =
              vehiclePartManager.getAllVehiclePartByDataTypeId(dataTypeId);
            break;

          case "ListValue":
            var listValueManager = $injector.get("listValueManager");
            dropDownList =
              listValueManager.getAllListValueByDataTypeId(dataTypeId);
            break;

          case "Department":
            try {
              var departmentManager = $injector.get("departmentManager");
              var dropDownList = departmentManager.getDepartmentsByUser(
                userId,
                appId
              );
              return dropDownList;
            } catch (e) {}

            return [];

          default:
            {
              var factoryMethodName = "getAll" + columnType;

              try {
                var factoryManager = $injector.get(factoryText);
                dropDownList = factoryManager.executeFunctionByName(
                  factoryMethodName,
                  null
                );
              } catch (e) {}
            }
            break;
        }

        return dropDownList;
      },
      camelCase: function camelCase(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
          if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces

          return index == 0 ? match.toLowerCase() : match.toUpperCase();
        });
      },
      // Below method refactors the entity. Based on answering from In Progress/ New tab,
      // Person askade entity is selected (Template/Non template). Based on the selected entity, askade entity is generated
      refactorAKEntity: function refactorAKEntity(pAkw) {
        var newPAkw = [];
        angular.copy(pAkw, newPAkw); // Fetching person column values

        var askadeWizard = newPAkw.AskadeFileTypeWizard;
        var personColumnValues = newPAkw.ColumnValues;
        var steps = newPAkw.AskadeFileTypeWizard.Steps;
        var stepsIterationList = []; // In the new implementation if a step/column is deleted in the web, then
        // it is only deleted from the template, not from the main askade enetity
        // Therefore refactoring (deleting) the step/ column which are not part of
        // person entity.

        function getPersonAskadeAnswerByColumnId(fileColumnId, columnValues) {
          for (var i = 0; i < columnValues.length; i++) {
            var paskAnswer = columnValues[i];
            if (paskAnswer.FileColumnId === fileColumnId) {
              return paskAnswer;
            }
          }
          return null;
        }

        var that = this;
        function getDamageText(columnType, datatypeId, answerText, module) {
          var source = that.getDropDownSourceByText(
            columnType,
            datatypeId,
            module,
            null
          );
          var selectedText = [];
          if (answerText && source && source.length > 0) {
            var answerIds = answerText.split(",");
            for (var i = 0; i < source.length; i++) {
              for (var j = 0; j < answerIds.length; j++) {
                if (source[i].Id == answerIds[j]) {
                  selectedText.push(source[i].Text);
                }
              }
            }
            return selectedText.toString();
          }
          return null;
        }

        function getAskadeStepColumn(askadeWizard, fileColumnId) {
          var askadewizardSteps = askadeWizard.Steps;
          for (var i = 0; i < askadewizardSteps.length; i++) {
            var wizardStep = askadewizardSteps[i];
            var wizardStepColumns = wizardStep.Columns;
            for (var j = 0; j < wizardStepColumns.length; j++) {
              var stepColumn = wizardStepColumns[j];
              if (fileColumnId === stepColumn.FileColumnId) {
                return stepColumn;
              }
            }
          }
          return null;
        }

        function setDependencyValue(
          answerList,
          triggerAnswerList,
          askStepFileColumn
        ) {
          for (var i = 0; i < answerList.length; i++) {
            var answerText = answerList[i].toLowerCase();
            if (triggerAnswerList.indexOf(answerText) >= 0) {
              askStepFileColumn.IsDependencyMet = true;
              break;
            }
          }
        }

        for (var i = 0; i < steps.length; i++) {
          // Based on this flag is step required or not is decided
          var isStepRequired = true;
          var step = steps[i];
          var stepId = step.Id;
          var columns = step.Columns;
          var columnIterationList = [];

          for (var k = 0; k < columns.length; k++) {
            var column = columns[k];
            var columnId = column.FileColumnId; // Based on this flag is column required or not is decided

            var isColumnIdPresent = false;

            for (var l = 0; l < personColumnValues.length; l++) {
              var personColumnValue = personColumnValues[l];
              var personColumnId = personColumnValue.FileColumnId; // Check, is a column necessary

              if (columnId === personColumnId) {
                isColumnIdPresent = true;
                break;
              }
            }
            if (!isColumnIdPresent) {
              // Column is not necessary, so adding it to delete list
              columnIterationList.push(k); // if both columnIterationList (List which tells which column is not required) length
              // and column length is same the step is not required as there are no columns published

              if (columnIterationList.length === columns.length) {
                isStepRequired = false;
              }
            }

            var askStepFileColumn = column;
            var allAnswerColumns = personColumnValues;
            var triggerFileColumnId = askStepFileColumn.DependantFileColumnId;
            askStepFileColumn.IsDependencyMet = true;

            if (triggerFileColumnId) {
              var triggerAskStepFileColumn = getAskadeStepColumn(
                askadeWizard,
                triggerFileColumnId
              );
              askStepFileColumn.IsDependencyMet = false;

              if (
                triggerAskStepFileColumn &&
                triggerAskStepFileColumn.ColumnGuides.length != 0 &&
                triggerAskStepFileColumn.IsDependencyMet === true
              ) {
                var triggerAskadeAnswer = getPersonAskadeAnswerByColumnId(
                  triggerAskStepFileColumn.FileColumnId,
                  allAnswerColumns
                );
                var guideAnswerList = [];
                var triggerMatchValue =
                  askStepFileColumn.DependantFileColumnValues;
                var triggerAnswerList = [];
                if (triggerMatchValue) {
                  triggerMatchValue = triggerMatchValue.toLowerCase();
                  triggerAnswerList = triggerMatchValue.split("||");
                }
                if (triggerAskadeAnswer) {
                  for (
                    var x = 0;
                    x < triggerAskadeAnswer.ColumnGuides.length;
                    x++
                  ) {
                    var guide = triggerAskadeAnswer.ColumnGuides[x];
                    if (guide.AnswerText)
                      guideAnswerList.push(guide.AnswerText);
                  }
                }
                if (guideAnswerList.length > 0) {
                  setDependencyValue(
                    guideAnswerList,
                    triggerAnswerList,
                    askStepFileColumn
                  );
                }
              }

              if (
                triggerAskStepFileColumn &&
                triggerAskStepFileColumn.ColumnGuides.length == 0 &&
                triggerAskStepFileColumn.IsDependencyMet === true
              ) {
                var isCheckBox =
                  triggerAskStepFileColumn.ColumnType === "CheckBox";
                var triggerAskadeAnswer = getPersonAskadeAnswerByColumnId(
                  triggerAskStepFileColumn.FileColumnId,
                  allAnswerColumns
                );
                var triggerAnswer = null;
                if (triggerAskadeAnswer)
                  triggerAnswer = triggerAskadeAnswer.AnswerText;

                if (isCheckBox) {
                  if (triggerAskadeAnswer.AnswerId === 1) {
                    triggerAnswer = "true";
                  } else {
                    triggerAnswer = "false";
                  }
                }

                triggerAnswer = triggerAnswer == null ? "" : triggerAnswer;
                var triggerMatchValue =
                  askStepFileColumn.DependantFileColumnValues;
                var triggerAnswerList = [];
                if (triggerMatchValue) {
                  triggerMatchValue = triggerMatchValue.toLowerCase();
                  triggerAnswerList = triggerMatchValue.split("||");
                }
                if (triggerAnswer) {
                  triggerAnswer = triggerAnswer.toLowerCase();
                }
                if (triggerAskStepFileColumn.ColumnType === "VehiclePart") {
                  triggerAnswer = getDamageText(
                    triggerAskStepFileColumn.ColumnType,
                    triggerAskStepFileColumn.DataTypeId,
                    triggerAskadeAnswer.AnswerText,
                    askadeWizard.ModuleName()
                  );
                  askStepFileColumn.IsDependencyMet = false;
                  if (triggerAnswer) {
                    var answerList = triggerAnswer.split(",");
                    setDependencyValue(
                      answerList,
                      triggerAnswerList,
                      askStepFileColumn
                    );
                  }
                } else {
                  askStepFileColumn.IsDependencyMet =
                    triggerAnswerList.indexOf(triggerAnswer) >= 0;
                }
              }
            }
          }

          columnIterationList = columnIterationList.sort(function (a, b) {
            return b - a;
          });

          for (var l = 0; l < columnIterationList.length; l++) {
            // Deleting columns from the entity
            var iterationValue = columnIterationList[l];
            step.Columns.splice(iterationValue, 1);
          }

          if (!isStepRequired) {
            // Step is not necessary, so adding it to delete list
            stepsIterationList.push(i);
          }
        }

        stepsIterationList = stepsIterationList.sort(function (a, b) {
          return b - a;
        });

        for (var l = 0; l < stepsIterationList.length; l++) {
          // Deleting steps from the entity
          var stepIterationValue = stepsIterationList[l];
          newPAkw.AskadeFileTypeWizard.Steps.splice(stepIterationValue, 1);
        } // returning asksde entity

        return newPAkw.AskadeFileTypeWizard;
      },
    };
    return askadeMethods;
  },
]);
app.factory("QuestionnaireMethodFactory", [
  "personQuestionnaireManager",
  "userApplicationsManager",
  "userDetailsManager",
  "$injector",
  function (
    personQuestionnaireManager,
    userApplicationsManager,
    userDetailsManager,
    $injector
  ) {
    var questionnaireMethods = {
      validateQuestionGroupsInDependency:
        function validateQuestionGroupsInDependency(groups) {
          var validGroups = [];

          for (var i = 0; i < groups.length; i++) {
            var gp = groups[i];
            var groupValid = false;
            var groupQuestions = gp.Questions;

            for (var j = 0; j < groupQuestions.length; j++) {
              var gq = groupQuestions[j];

              if (gq.IsDependencyMet === true) {
                groupValid = true;
                break;
              }
            }

            if (groupValid === true) {
              validGroups.push(gp);
            }
          }

          return validGroups;
        },
      getPersonQuestionAnswer: function getPersonQuestionAnswer(
        questionId,
        pqa
      ) {
        for (var i = 0; i < pqa.length; i++) {
          var pqaQuestion = pqa[i];
          var pqaQuestionId = pqaQuestion.QuestionId;

          if (pqaQuestionId === questionId) {
            return pqaQuestion;
          }
        }
      },
      loadMailAOTemplate: function loadMailAOTemplate(questionType) {
        switch (questionType) {
          case 0:
          case 1:
            return "templates/mail_templates/questionnaireMail_answerOption/answerOptionTextTemplate.html";

          case 2:
          case 3:
          case 4:
            return "templates/mail_templates/questionnaireMail_answerOption/answerOptionTemplate.html";

          default:
            return;
        }
      },
      loadMailVAOTemplate: function loadMailVAOTemplate(questionType) {
        switch (questionType) {
          case 0:
          case 1:
            return "templates/mail_templates/questionnaireMail_answerOption/valuationAOTextTemplate.html";

          case 2:
          case 3:
          case 4:
            return "templates/mail_templates/questionnaireMail_answerOption/valuationAOTemplate.html";

          default:
            return;
        }
      },
      getDefaultStatus: function getDefaultStatus(
        questionId,
        answerOptionId,
        pqaEntity
      ) {
        var pqa = this.getPersonQuestionAnswer(questionId, pqaEntity);
        var savedAnswerId = pqa.AnswerId;
        var answerIds = this.getAnswerIds(savedAnswerId);
        var checked = answerIds.indexOf(answerOptionId) >= 0;
        return checked;
      },
      getAnswerIds: function getAnswerIds(savedAnswerId) {
        var seperator = "|";
        var answerIds = [];

        if (savedAnswerId !== null) {
          answerIds = savedAnswerId.split(seperator);
        }

        return answerIds;
      },
      getVQDefaultStatus: function getVQDefaultStatus(
        qId,
        vqId,
        aoId,
        pvqaEntity
      ) {
        var pvqa = this.getPersonVQAnswer(qId, vqId, pvqaEntity);
        var savedAnswerId = pvqa.AnswerId;
        var answerIds = this.getAnswerIds(savedAnswerId);
        var checked = answerIds.indexOf(aoId) >= 0;
        return checked;
      },
      getPersonVQAnswer: function getPersonVQAnswer(qId, vqId, pvqa) {
        for (var i = 0; i < pvqa.length; i++) {
          var pVQuestion = pvqa[i];
          var pVQuestionId = pVQuestion.ValuationQuestionId;
          var pQuestionId = pVQuestion.QuestionId;

          if (pVQuestionId === vqId && pQuestionId === qId) {
            return pVQuestion;
          }
        }
      },
      getDropDownText: function getDropDownText(
        columnType,
        datatypeId,
        answerId,
        moduleNameVal
      ) {
        var columnList = this.getDropDownSourceByText(
          columnType,
          datatypeId,
          moduleNameVal
        );

        for (var i = 0; i < columnList.length; i++) {
          if (columnList[i].Id === answerId) {
            return columnList[i].Text;
          }
        }
      },
      getDropDownSourceByText: function getDropDownSourceByText(
        columnType,
        dataTypeId,
        moduleName,
        columnSubType
      ) {
        var userDetail = userDetailsManager.getUserLastLoggedTimeStamp();
        var userApplication = userApplicationsManager.getUserApplicationByText(
          userDetail.UserId,
          moduleName
        );
        var userId = userDetail.UserId;
        var appId = userApplication.ID;
        var factoryText = this.camelCase(columnType) + "Manager";
        var dropDownList = [];

        switch (columnType) {
          case "Person":
            var personManager = $injector.get("personManager");

            if (columnSubType === "All") {
              dropDownList = personManager.getAllPersonsList(userDetail.UserId);
            } else {
              dropDownList = personManager.getAllPersonForQuestionnaire(
                userDetail.UserId
              );
            }

            break;

          case "EasyClassification":
            var easyClassficationManager = $injector.get(
              "easyClassificationManager"
            );
            dropDownList =
              easyClassficationManager.getAllEasyClassificationByDataTypeId(
                dataTypeId
              );
            break;

          case "ListValue":
            var listValueManager = $injector.get("listValueManager");
            dropDownList =
              listValueManager.getAllListValueByDataTypeId(dataTypeId);
            break;

          case "Insurance":
            var insuranceManager = $injector.get("insuranceManager");
            dropDownList =
              insuranceManager.getAllInsurancesByDataTypeId(dataTypeId);
            break;

          case "Department":
            try {
              var departmentManager = $injector.get("departmentManager");
              var dropDownList = departmentManager.getDepartmentsByUser(
                userId,
                appId
              );
              return dropDownList;
            } catch (e) {}

            return [];

          default:
            {
              var factoryMethodName = "getAll" + columnType;

              try {
                var factoryManager = $injector.get(factoryText);
                dropDownList = factoryManager.executeFunctionByName(
                  factoryMethodName,
                  null
                );
              } catch (e) {}
            }
            break;
        }

        return dropDownList;
      },
      camelCase: function camelCase(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
          if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces

          return index == 0 ? match.toLowerCase() : match.toUpperCase();
        });
      },
      // Below method refactors the entity. Based on answering from In Progress/ New tab,
      // Person questionnaire entity is selected (Template/Non template). Based on the selected entity, questionnaire entity is generated
      refactorQueEntity: function refactorQueEntity(pq) {
        var newPq = [];
        angular.copy(pq, newPq);
        var pqId = newPq.Id;
        var isTemplate = newPq.IsTemplate;
        var personAnswerList = []; // Fetching person Answers

        if (!isTemplate) {
          personAnswerList =
            personQuestionnaireManager.getPersonQuestionAnswers(pqId);
        } else {
          personAnswerList =
            personQuestionnaireManager.getPersonQuestionAnswersFromTemplate(
              pqId
            );
        }

        var queGroups = newPq.Questionnaire.Groups;
        var valuationQues = newPq.Questionnaire.ValuationQuestion;
        var groupIterationList = []; // In the new implementation if a group/question is deleted in the web, then
        // it is only deleted from the template, not from the main questionnaire entity
        // Therefore refactoring (deleting) the group/question which are not part of
        // person entity.

        for (var i = 0; i < queGroups.length; i++) {
          // Based on this flag is group required or not is decided
          var isGroupRequired = true;
          var group = queGroups[i];
          var questions = group.Questions;
          var queIterationList = [];

          for (var j = 0; j < questions.length; j++) {
            var question = questions[j];
            var questionId = question.Id; // Including this flag to handle two values for ignore valuation questions setting
            // (before and after download test scenario)

            var ignoreValuation = true; // Based on this flag is step required or not is decided

            var isQueIdPresent = false;

            for (var k = 0; k < personAnswerList.length; k++) {
              var pQueId = personAnswerList[k].QuestionId; // Check if question id is present in the person question id list

              if (questionId === pQueId) {
                isQueIdPresent = true;
                break;
              }
            }

            if (!isQueIdPresent) {
              // question is not required
              queIterationList.push(j); // if both queIterationList (List which tells which question is not required) length
              // and questions length is same then question group is not required as there are no questions published

              if (queIterationList.length === questions.length) {
                isGroupRequired = false;
              }
            } // This is for the scenario where valuation skip flag(question level) is true for the first time when downloaded and answered.
            // Then the flag value is changed in the server level. This was throwing error in the app.

            var valAnswers = newPq.ValuationAnswers;

            for (var valAns = 0; valAns < valAnswers.length; valAns++) {
              var valAnswer = valAnswers[valAns];
              var queId = valAnswer.QuestionId;

              if (questionId === queId) {
                ignoreValuation = false;
              }
            }

            if (ignoreValuation) {
              question.IgnoreValuationQuestion = true;
            } else {
              question.IgnoreValuationQuestion = false;
            }
          }

          queIterationList = queIterationList.sort(function (a, b) {
            return b - a;
          });

          for (var l = 0; l < queIterationList.length; l++) {
            // Deleting questions from the entity
            var iterationValue = queIterationList[l];
            group.Questions.splice(iterationValue, 1);
          }

          if (!isGroupRequired) {
            // Group is not required
            groupIterationList.push(i);
          }
        }

        groupIterationList = groupIterationList.sort(function (a, b) {
          return b - a;
        });

        for (var l = 0; l < groupIterationList.length; l++) {
          // Deleting group
          var groupIterationValue = groupIterationList[l];
          newPq.Questionnaire.Groups.splice(groupIterationValue, 1);
        } // Similar to question check for valuation question from valuation answer template

        var valIterationList = [];

        for (var i = 0; i < valuationQues.length; i++) {
          var valQueId = valuationQues[i].Id;
          var valAnswers = newPq.ValuationAnswers;
          var isValQueIdPresent = false;

          for (var j = 0; j < valAnswers.length; j++) {
            var valAnsQueId = valAnswers[j].ValuationQuestionId;

            if (valQueId === valAnsQueId) {
              isValQueIdPresent = true;
              break;
            }
          }

          if (!isValQueIdPresent) {
            var valIterationVal = valIterationList[i];
            valIterationList.push(i);
          }
        }

        valIterationList = valIterationList.sort(function (a, b) {
          return b - a;
        });

        for (var i = 0; i < valIterationList.length; i++) {
          var valIterationValue = valIterationList[i];
          newPq.Questionnaire.ValuationQuestion.splice(valIterationValue, 1);
        } // return questionnaire entity

        return newPq.Questionnaire;
      },
      setInitialDependency: function setInitialDependency(
        questionGroups,
        answers
      ) {
        for (var i = 0; i < questionGroups.length; i++) {
          var gp = questionGroups[i];
          var groupValid = false;
          var groupQuestions = gp.Questions;

          for (var j = 0; j < groupQuestions.length; j++) {
            var gq = groupQuestions[j];

            if (gq.IsDependentQuestion === true) {
              gq.isDependencyMet(answers);
            }
          }
        }
      },
    };
    return questionnaireMethods;
  },
]);
app.factory("CommonMethodsFactory", [
  "$rootScope",
  "DeviceUtil",
  "AppMessages",
  "LoaderService",
  "LocalStorageHelper",
  "userDetailsManager",
  "$q",
  "ResetPoolUtil",
  "customersManager",
  "QuestionnaireUtility",
  "DocumentLibraryUtil",
  "PopupUtil",
  "FileUtil",
  "ModalUtil",
  "questionnaireManager",
  "personQuestionnaireManager",
  "DateUtil",
  "$timeout",
  function (
    $rootScope,
    DeviceUtil,
    AppMessages,
    LoaderService,
    LocalStorageHelper,
    userDetailsManager,
    $q,
    ResetPoolUtil,
    customersManager,
    QuestionnaireUtility,
    DocumentLibraryUtil,
    PopupUtil,
    FileUtil,
    ModalUtil,
    questionnaireManager,
    personQuestionnaireManager,
    DateUtil,
    $timeout
  ) {
    var commonMethodsReturn = {
      getData: function getData(moduleName, moduleTranslatedName) {
        var updateTextForModule =
          $rootScope.getResourceText("LIT_UPDATING") +
          " " +
          moduleTranslatedName;
        LoaderService.show(updateTextForModule);
        var def = $q.defer();
        var isOnline = DeviceUtil.isDeviceOnline();

        if (isOnline === false) {
          AppMessages.Error(
            $rootScope.getResourceText("LIT_ALERT"),
            $rootScope.getResourceText("MSG_CHECK_INTERNET_CONNECTION")
          );
          LoaderService.hide();
          def.reject(false);
        } else {
          var tokenValidityPromise = LocalStorageHelper.validateUserToken();
          tokenValidityPromise.then(function (tokenValid) {
            if (LocalStorageHelper.IsInititalized()) {
              switch (moduleName) {
                case "RiskProfile":
                case "EmployeeSatisfaction":
                case "ManagementEvaluation":
                case "HumanResource":
                case "FrontPlanner":
                case "Apv":
                  var promQue =
                    LocalStorageHelper.updateDownloadQuestionnaireData(
                      moduleName
                    );
                  promQue.then(
                    function (sucess) {
                      var loaderPromise = LoaderService.hide();
                      loaderPromise.then(function (sucess) {
                        if (sucess) {
                          var downloadValid =
                            userDetailsManager.getIfdownloadValidForType(
                              moduleName
                            );

                          if (downloadValid === false) {
                            AppMessages.Error(
                              $rootScope.getResourceText("LIT_MESSAGE"),
                              $rootScope.getResourceText(
                                "MSG_ERROR_DOWNLOADING_MODULE"
                              ) +
                                " " +
                                moduleTranslatedName +
                                " " +
                                $rootScope.getResourceText(
                                  "MSG_PLEASE_TRY_AGAIN"
                                )
                            );
                            def.reject(false);
                          } else {
                            def.resolve(true);
                          }
                        }
                      });
                    },
                    function (errorResponse) {
                      LoaderService.hide();
                      def.reject(false);
                    }
                  );
                  break;

                case "ActionPlan":
                  var promisesApList =
                    LocalStorageHelper.updateDownloadActionPlanOrProblem();
                  $q.all(promisesApList).then(
                    function (resultSet) {
                      var loaderPromise = LoaderService.hide();
                      loaderPromise.then(function (sucess) {
                        if (sucess) {
                          var apDownloadValid =
                            userDetailsManager.getIfdownloadValidForType(
                              "ActionPlan"
                            );

                          if (apDownloadValid === true) {
                            def.resolve(true);
                          } else {
                            AppMessages.Error(
                              $rootScope.getResourceText("LIT_MESSAGE"),
                              $rootScope.getResourceText(
                                "MSG_ERROR_DOWNLOADING_MODULE"
                              ) +
                                " " +
                                moduleTranslatedName +
                                " " +
                                $rootScope.getResourceText(
                                  "MSG_PLEASE_TRY_AGAIN"
                                )
                            );
                            def.reject(false);
                          }
                        }
                      });
                    },
                    function (errorResponse) {
                      console.log("Plan of Action Error :" + errorResponse);
                      LoaderService.hide();
                      def.reject(false);
                    }
                  );
                  break;

                case "Askade":
                case "Claim":
                  var askadeListPromise =
                    LocalStorageHelper.updateDownloadCase(moduleName);
                  askadeListPromise.then(
                    function (successAskadeList) {
                      var loaderPromise = LoaderService.hide();
                      loaderPromise.then(function (sucess) {
                        if (sucess) {
                          var validAskadeDownload =
                            userDetailsManager.getIfdownloadValidForType(
                              "Askade"
                            );

                          if (validAskadeDownload === true) {
                            def.resolve(true);
                          } else {
                            AppMessages.Error(
                              $rootScope.getResourceText("LIT_MESSAGE"),
                              $rootScope.getResourceText(
                                "MSG_ERROR_DOWNLOADING_MODULE"
                              ) +
                                " " +
                                moduleTranslatedName +
                                " " +
                                $rootScope.getResourceText(
                                  "MSG_PLEASE_TRY_AGAIN"
                                )
                            );
                            def.reject(false);
                          }
                        }
                      });
                    },
                    function (errorResponse) {
                      console.log("Askade Error :" + errorResponse);
                      LoaderService.hide();
                      def.reject(false);
                    }
                  );
                  break;

                case "DocumentLibrary":
                  var documentListPromise =
                    LocalStorageHelper.initDownloadDocumentLibrary(moduleName);
                  documentListPromise.then(
                    function (successDLList) {
                      var loaderPromise = LoaderService.hide();
                      loaderPromise.then(function (sucess) {
                        if (sucess) {
                          var validDLDownload =
                            userDetailsManager.getIfdownloadValidForType(
                              moduleName
                            );

                          if (validDLDownload === true) {
                            // Clearing pool so as to handle any update in the downloaded data (When user has previously downloaded data).
                            ResetPoolUtil.resetPool();
                            $rootScope.$emit("refresh");
                            def.resolve(true);
                          } else {
                            //refreshApw(apwList);
                            AppMessages.Error(
                              $rootScope.getResourceText("LIT_MESSAGE"),
                              $rootScope.getResourceText(
                                "MSG_ERROR_DOWNLOADING_MODULE"
                              ) +
                                " " +
                                moduleTranslatedName +
                                " " +
                                $rootScope.getResourceText(
                                  "MSG_PLEASE_TRY_AGAIN"
                                )
                            );
                            def.reject(false);
                          }
                        }
                      });
                    },
                    function (errorResponse) {
                      console.log("Document Library Error :" + errorResponse);
                      def.reject(false);
                      LoaderService.hide();
                      AppMessages.Error(
                        $rootScope.getResourceText("LIT_MESSAGE"),
                        $rootScope.getResourceText(
                          "MSG_ERROR_DOWNLOADING_MODULE"
                        ) +
                          " " +
                          moduleTranslatedName +
                          " " +
                          $rootScope.getResourceText("MSG_PLEASE_TRY_AGAIN")
                      );
                    }
                  );
                  break;

                default:
                  LoaderService.hide();
                  def.reject(false);
                  break;
              }
            }
          });
        }

        return def.promise;
      },
      getBaseUrl: function getBaseUrl(onlineValue) {
        var baseUrl;

        switch (onlineValue) {
          case "online":
          case "online2":
          case "online3":
          case "online4":
          case "online5":
          case "test":
            baseUrl = onlineValue + ".safetynet.dk";
            break;

          case "cloudfp":
            baseUrl = "cloud.frontplanner.com";
            break;

          case "cloudse":
            baseUrl = "cloud.safetyNet4u.se";
            break;

          case "cloud":
            baseUrl = "cloud.safetyNet4u.se";
            break;

          default:
            //alert('An unhandled url exception occured. Please concat your administrator!');
            baseUrl = "invalid.un.handled.url";
            return false;
        }

        return baseUrl;
      },
      getEnvironmentDomainDetails: function getEnvironmentDomainDetails(
        deepLink
      ) {
        var environmentValue = deepLink.$link.path;
        var baseUrlVal = deepLink.$link.host;
        var splitUrl = baseUrlVal.split(".");
        var subDomain = splitUrl[0];
        var splitEnvValue = environmentValue.split("/");
        var environment = splitEnvValue[1];
        var details = {
          environment: environment,
          subDomain: subDomain,
        };
        return details;
      },
      getUrlDetails: function getUrlDetails(customerUrl) {
        var urlVal = customerUrl.replace(/^https?\:\/\//i, "");
        var splitUrlValues = urlVal.split("/");
        var environmentValue = splitUrlValues[1].toLowerCase();
        var onlineValStr = splitUrlValues[0];
        var onlineVal = onlineValStr
          .substr(0, onlineValStr.indexOf("."))
          .toLowerCase();
        var cKey = null;
        var environmentVal = null;

        if (environmentValue.indexOf("?") !== -1) {
          var envSplitVal = environmentValue.split("?");
          environmentVal = envSplitVal[0];
        } else {
          environmentVal = environmentValue;
        }

        if (urlVal.indexOf("?") !== -1) {
          var splitVariable = urlVal.split("?");

          if (splitVariable[1].indexOf("&") !== -1) {
            var newSplitVariable = splitVariable[1].split("&");

            for (var i = 0; i < newSplitVariable.length; i++) {
              var checkVal = newSplitVariable[i];

              if (checkVal.toLowerCase().indexOf("ckey") !== -1) {
                var ckeyVal = checkVal.split("=");
                cKey = ckeyVal[1];
              }
            }
          } else {
            var ckeyVal = splitVariable[1].toLowerCase().split("=");
            cKey = ckeyVal[1];
          }
        }

        var details = {
          environment: environmentVal,
          subDomain: onlineVal,
          cKey: cKey,
        };
        return details;
      },
      getCustomUrlDetails: function getCustomUrlDetails(customUrl) {
        var url = customUrl.replace(/^https?\:\/\//i, "");
        var splitValues = url.toLowerCase().split("/login");
        var baseUrl = splitValues[0];
        var ckey = null;
        if (url.indexOf("ckey") != -1) {
          ckey = url.split("ckey=")[1];
        }

        var details = {
          baseUrl: baseUrl,
          ckey: ckey,
        };

        return details;
      },
      validateSearchText: function validateSearchText(searchText) {
        var pattern = new RegExp("([%&*+:\\\\/<>])");

        if (pattern.test(searchText)) {
          return false;
        } else {
          return true;
        }
      },
      getCustomerSpecificUrlForMap: function getCustomerSpecificUrlForMap(
        GeoX,
        GeoY
      ) {
        var customer = customersManager.getCustomers();
        if (customer) {
          var extraUrl = `geoIds=${GeoX},${GeoY}`;
          var encriptedString = btoa(extraUrl);
          if (customer.IsCustomUrlEnabled) {
            var url = `https://${customer.CustomUrl}/Mobile/GeoLocationMobile.aspx?m=${encriptedString}`;
            return url;
          } else {
            var onlineVal = customer.OnlineVal;
            var custName = customer.UniqueUrlPart;

            var onlineValueForBaseUrl = onlineVal;
            if (
              onlineVal.toLowerCase() === "cloud" &&
              custName.toLowerCase() === "cloud1"
            ) {
              onlineValueForBaseUrl = "cloudfp";
            }
            var baseUrl = this.getBaseUrl(onlineValueForBaseUrl);

            var url = `https://${baseUrl}/${custName}/Mobile/GeoLocationMobile.aspx?m=${encriptedString}`;
            return url;
          }
        }
      },
      encodeToBase64: function encodeToBase64(val) {
        return btoa(encodeURIComponent(val));
      },
      getScannedDocuments: function getScannedDocuments(code, scope) {
        var assetDocPromise = QuestionnaireUtility.getAssetLinkedDocumentData(
          "asset",
          code
        );
        assetDocPromise.promise.then(
          function (successPersonResponse) {
            if (successPersonResponse.length > 0) {
              var docList = [];
              var docListPromise = DocumentLibraryUtil.checkIfDLFileSaveLocally(
                successPersonResponse,
                "DocumentLibrary"
              );
              docListPromise.then(
                function (success) {
                  for (var i = 0; i < success.length; i++) {
                    var doc = success[i];
                    var docItem = doc.data;
                    docItem.DeviceFilePath = doc.filePath;
                    docItem.Type = doc.type;

                    if (doc.HtmlContent) {
                      var encodedHTML = DocumentLibraryUtil.encodeHTMLString(
                        doc.HtmlContent
                      );
                      doc.HtmlContent = encodedHTML;
                    }

                    docList.push(docItem);
                  }
                  LoaderService.hide();
                  PopupUtil.showDocFileList(
                    `${successPersonResponse[0].RelatedItemText}'s documents`,
                    docList,
                    scope
                  );
                },
                function (err) {
                  console.log(err);
                  LoaderService.hide();
                }
              );
            } else {
              LoaderService.hide();
              var errMessage = $rootScope.getResourceText(
                "MSG_MOBILE_NO_DOCUMENTS_FOUND"
              );
              var title = $rootScope.getResourceText("LIT_MESSAGE");
              PopupUtil.alert(title, errMessage);
            }
          },
          function (err) {
            console.error(err);
            LoaderService.hide();
          }
        );
      },
      handleFrontPageLinks: function handleFrontPageLinks(loginUrl, target) {
        var link;
        var nameInterval;
        var options =
          "location=yes,clearcache=yes,clearsessioncache=yes,cleardata=yes";
        var win = this.openInAppBrowser(loginUrl, target, options);
        if (win != null) {
          win.addEventListener("loadstop", function () {
            nameInterval = setInterval(function () {
              win.executeScript(
                {
                  code: "if(window.localStorage){window.localStorage.getItem('link');}",
                },
                function (values) {
                  link = values[0];
                  if (link && link.length > 0) {
                    win.executeScript({
                      code: "if(window.localStorage){window.localStorage.removeItem('link');}",
                    });
                    window.localStorage.setItem("link", link);
                    win.close();
                    PopupUtil.hide();
                    var anim =
                      '<lottie-player src="raw/loadingNew.json" background="transparent" speed="1" id="loadAnim" loop autoplay></lottie-player>';
                    var contentTitle =
                      $rootScope.getResourceText("LIT_LOGIN_TEXT");
                    var contentLabel =
                      $rootScope.getResourceText("MSG_WAIT_TO_LOGIN");
                    PopupUtil.animPopUp(anim, contentTitle, contentLabel); // Show Loading Animation while Login
                  }
                }
              );
            }, 100);
          });

          win.addEventListener("exit", function () {
            clearInterval(nameInterval);
            var newLink = window.localStorage.getItem("link");
            var code = window.localStorage.getItem("scannedCode");
            console.log(code);
            window.localStorage.removeItem("link");
            if (newLink) {
              var urlData = newLink.split("/");
              if (urlData.length > 0) {
                var loginParams = urlData[urlData.length - 1];
                $rootScope.$emit("CallParentMethod", {
                  data: loginParams,
                  shouldShowToaster: true,
                });
              }
            }
          });
        }
      },

      showImage: function showImage(attachment, scope) {
        var fileLoc = null;
        if (attachment.InternalFilePath) fileLoc = attachment.InternalFilePath;
        if (attachment.InternalFileLocation)
          fileLoc = attachment.InternalFileLocation;
        if (fileLoc) {
          var fileName = attachment.FileName;
          var isPdfFile = fileName && fileName.toLowerCase().endsWith(".pdf");
          if (fileLoc != null && !isPdfFile) {
            ModalUtil.initModal(scope);
            ModalUtil.openModal(scope, fileLoc);
          } else if (fileLoc != null && isPdfFile) {
            var re = /(?:\.([^.]+))?$/;
            var getExtension = re.exec(fileName)[1];
            var contentType = FileUtil.getContentType(getExtension);

            if (ionic.Platform.isIOS()) {
              var file = cordova.file.dataDirectory + fileName;
            } else {
              var file = cordova.file.externalDataDirectory + fileName;
            }

            FileUtil.openFile(file, contentType);
          }
        }
      },

      //Below code is the logic for survey
      checkIsSurveyExistForTheDays: function checkIsSurveyExistForTheDays(
        surveyDays
      ) {
        var ValidDays = [];
        var queList = questionnaireManager.getActiveSurveyQuestionnairesList();

        for (var i = 0; i < queList.length; i++) {
          var que = queList[i];

          var publishedDay = this.getTimeStamp(que.PublishedDate);

          var expiryDay = null;
          if (que.ExpirationDate)
            expiryDay = this.getTimeStamp(que.ExpirationDate);

          for (var j = 0; j < surveyDays.length; j++) {
            var checkDate = this.getTimeStamp(surveyDays[j]);
            if (
              this.checkDates(publishedDay, expiryDay, checkDate) &&
              !ValidDays.includes(surveyDays[j])
            ) {
              ValidDays.push(surveyDays[j]);
            }
          }
        }
        return ValidDays;
      },
      checkIsSurveyExistForTheDay: function checkIsSurveyExistForTheDay(
        surveyDay,
        publishedDay,
        expiryDay
      ) {
        publishedDay = this.getTimeStamp(publishedDay);
        expiryDay = this.getTimeStamp(expiryDay);
        var checkDate = this.getTimeStamp(surveyDay);
        return this.checkDates(publishedDay, expiryDay, checkDate);
      },
      checkDates: function checkDates(publishedDay, expiryDay, dayToCheck) {
        if (publishedDay && expiryDay)
          return (
            moment(dayToCheck).isSameOrAfter(publishedDay) &&
            moment(dayToCheck).isSameOrBefore(expiryDay)
          );
        if (!publishedDay && expiryDay)
          return moment(dayToCheck).isSameOrBefore(expiryDay);
        if (publishedDay && !expiryDay)
          return moment(dayToCheck).isSameOrAfter(publishedDay);
      },
      getTimeStamp: function getTimeStamp(date) {
        return DateUtil.getTimeStamp(
          DateUtil.getFormattedValue(new Date(date), "date")
        );
      },
      getActiveSurveyForTheDate: function getActiveSurveyForTheDate(day) {
        var queAList = questionnaireManager.getActiveSurveyQuestionnairesList();
        var surveyList = [];
        var surveyHistoryList = this.getSurveyHistoryForTheDate(day);
        var allReadyAnsweredSurvey = [];
        for (var i = 0; i < surveyHistoryList.length; i++) {
          allReadyAnsweredSurvey.push(surveyHistoryList[i].Id);
        }

        for (var i = 0; i < queAList.length; i++) {
          var que = queAList[i];

          if (!allReadyAnsweredSurvey.includes(que.Id)) {
            var publishedDay = this.getTimeStamp(que.PublishedDate);
            var expiryDay = null;

            if (que.ExpirationDate)
              expiryDay = this.getTimeStamp(que.ExpirationDate);

            var checkDate = this.getTimeStamp(day);
            if (this.checkDates(publishedDay, expiryDay, checkDate)) {
              if (
                !personQuestionnaireManager.checkIfAnswerExistsForADay(
                  que.Id,
                  day
                )
              )
                surveyList.push(que);
            }
          }
        }
        return surveyList;
      },
      getSurveyHistoryForTheDate: function getSurveyHistoryForTheDate(day) {
        var queCList =
          personQuestionnaireManager.getCompletedSurveyQuestionnairesList();
        var customer = customersManager.getCustomers();

        var surveyHistoryList = [];
        for (var i = 0; i < queCList.length; i++) {
          var que = queCList[i];
          var answers = [];
          var dateToCheck = DateUtil.getFormattedValue(new Date(day), "date");
          for (var j = 0; j < que.Answers.length; j++) {
            var ans = que.Answers[j];
            var completedDate = ans.InitiatedDate.split(" ")[0];
            var isInRange = true;
            if (customer.IsCustomDatePickerEnabledForSurveyHistory) {
              var surveyHistoryFromDate = ans.SurveyHistoryFromDate;
              if (ans.SurveyHistoryFromDate != null)
                surveyHistoryFromDate = DateUtil.getTimeStamp(
                  ans.SurveyHistoryFromDate.split(" ")[0]
                );

              var surveyHistoryToDate = ans.SurveyHistoryToDate;
              if (ans.SurveyHistoryToDate != null)
                surveyHistoryToDate = DateUtil.getTimeStamp(
                  ans.SurveyHistoryToDate.split(" ")[0]
                );

              if (
                !new Date(surveyHistoryFromDate) ||
                !new Date(surveyHistoryToDate)
              )
                isInRange = this.checkDates(
                  surveyHistoryFromDate,
                  surveyHistoryToDate,
                  DateUtil.getTimeStamp(dateToCheck)
                );
            }

            if (isInRange && completedDate === dateToCheck) answers.push(ans);
          }
          if (answers.length > 0)
            surveyHistoryList.push({
              Name: que.Name,
              Id: que.Id,
              Answers: answers,
            });
        }
        return surveyHistoryList;
      },
      cleanUpSurvey: function cleanUpSurvey() {
        var qaSList =
          personQuestionnaireManager.getCompletedSurveyQuestionnairesList();
        for (var i = 0; i < qaSList.length; i++) {
          var qa = qaSList[i];
          for (var j = 0; j < qa.Answers.length; j++) {
            var ans = qa.Answers[j];
            var pqEntity = ans.PersonQuestionnaire;
            if (pqEntity) {
              var completedDate =
                moment(
                  DateUtil.getValidDateTimeFormat(pqEntity.CompletedDate)
                ).unix() * 1000;
              if (
                !this.checkDates(
                  DateUtil.getWeekWorkingStartDay(true),
                  DateUtil.getWeekWorkingEndDay(true),
                  completedDate
                )
              ) {
                personQuestionnaireManager.cleanUpSurvey(pqEntity);
              }
            }
          }
        }
      },
      getMissedDaysList: function getMissedDaysList(surveyDays) {
        var validSurveyDays = this.checkIsSurveyExistForTheDays(surveyDays);
        var missedDays = 0;
        if (validSurveyDays.length > 0) {
          var answerList = [];
          var surveyList = [];
          for (var i = 0; i < validSurveyDays.length; i++) {
            var day = validSurveyDays[i];
            surveyList = this.getActiveSurveyForTheDate(day);
            answerList = this.getSurveyHistoryForTheDate(day);

            if (
              answerList.length > 0 &&
              surveyList.length > 0 &&
              !this.checkAnsweredAgainstActiveListOfSurvey(
                surveyList,
                answerList
              )
            )
              missedDays++;
            else if (surveyList.length > 0) missedDays++;
          }
        }

        return missedDays;
      },
      checkAnsweredAgainstActiveListOfSurvey:
        function checkAnsweredAgainstActiveListOfSurvey(
          surveyList,
          answerList
        ) {
          var isSurveyAnswered = true;
          for (var i = 0; i < surveyList.length; i++) {
            var survey = surveyList[i];
            var surveyId = survey.Id;
            for (var j = 0; j < answerList.length; j++) {
              var answer = answerList[j];
              if (surveyId === answer.Id && answer.Answers === 0) {
                return false;
              }
            }
          }
          return isSurveyAnswered;
        },
      uploadSurvey: function uploadSurvey(pqId, moduleName) {
        var def = $q.defer();
        $timeout(function () {
          var pq = personQuestionnaireManager.getPersonQuestionnaire(pqId); //If multiple processes try to upload the same questionaire hence the check.

          var uploadInProgress = pq.UploadInProgress;

          if (uploadInProgress === false) {
            var processesPqPromise = FileUtil.processFile(pq, true);
            processesPqPromise.then(
              function (completePersonQuestionnaire) {
                //Skip Questionnaire data..
                var uploadedPromise =
                  LocalStorageHelper.uploadPersonQuestionnaire(
                    completePersonQuestionnaire,
                    moduleName
                  );
                pq.UploadInProgress = true;
                pq.UploadFail = false;
                uploadedPromise.then(
                  function (aoData) {
                    pq.UploadInProgress = false;
                    personQuestionnaireManager.uploadPostProcess(pq);
                    PopupUtil.hide();
                    var anim =
                      '<lottie-player src="raw/loadingSuccess.json" background="transparent" speed="1" id="loadAnim" autoplay></lottie-player>';
                    var contentTitle =
                      $rootScope.getResourceText("LIT_MOBILE_SUCCESS");
                    var contentLabel =
                      pq.Questionnaire.Name +
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
                    def.resolve(pqId);
                  },
                  function (error) {
                    pq.UploadInProgress = false;
                    pq.UploadFail = true;
                    def.reject(error);
                  }
                );
              },
              function (inCompletePq) {
                // Check is performed only to validate if it is a file not found error.
                if (inCompletePq.message === "NOT_FOUND_ERR") {
                  // The boolean flag tells if it is from multiple upload or single upload
                  personQuestionnaireManager.savePersonQuestionniare(
                    inCompletePq.personEntity,
                    false
                  );
                }

                inCompletePq.personEntity.UploadInProgress = false;
                inCompletePq.personEntity.UploadFail = true;

                def.reject(inCompletePq);
              }
            );
          }
        }, 50);
        return def.promise;
      },
      openInAppBrowser: function openInAppBrowser(url, target, options) {
        LoaderService.show();
        if (ionic.Platform.isIOS() || ionic.Platform.isIPad()) {
          ASWebAuthSessionPlugin.isAvailable(function (available) {
            if (available) {
              LoaderService.hide();
              ASWebAuthSessionPlugin.isAvailable(function (available) {
                if (available) {
                  LoaderService.hide();
                  ASWebAuthSessionPlugin.start(
                    url,
                    "faapp",
                    function (successUrl) {
                      LoaderService.show();
                      $rootScope.$emit("CallParentMethod", {
                        data: successUrl.split("applink/")[1],
                      });
                    },
                    function (error) {
                      LoaderService.hide();
                      console.error("❌ " + error);
                    }
                  );
                } else {
                  SafariViewController.isAvailable(function (sfAvailable) {
                    if (sfAvailable) {
                      SafariViewController.show(
                        {
                          url: url,
                          hidden: false, // default false. You can use this to load cookies etc in the background (see issue #1 for details).
                          animated: false, // default true, note that 'hide' will reuse this preference (the 'Done' button will always animate though)
                          transition: "curl", // (this only works in iOS 9.1/9.2 and lower) unless animated is false you can choose from: curl, flip, fade, slide (default)
                          enterReaderModeIfAvailable: false, // default false
                          tintColor: "#00ffff", // default is ios blue
                          barColor: "#0000ff", // on iOS 10+ you can change the background color as well
                          controlTintColor: "#ffffff", // on iOS 10+ you can override the default tintColor
                        },
                        // this success handler will be invoked for the lifecycle events 'opened', 'loaded' and 'closed'
                        function (result) {
                          if (result.event === "opened") {
                          } else if (result.event === "loaded") {
                          } else if (result.event === "closed") {
                          }
                        },
                        function (msg) {
                          console.log("KO: " + msg);
                        }
                      );
                    } else {
                      // potentially powered by InAppBrowser because that (currently) clobbers window.open
                      SafariViewController.hide();
                      var win = cordova.InAppBrowser.open(url, target, options);
                      return win;
                    }
                    return null;
                  });
                }
                return null;
              });
            }
          });
        } else {
          return cordova.InAppBrowser.open(url, target, options);
        }
      },
    };
    return commonMethodsReturn;
  },
]);
app.factory("ToggleUrlMethodFactory", [
  "$state",
  "$rootScope",
  "ionicToast",
  "CommonMethodsFactory",
  "AppMessages",
  "LoaderService",
  "Restangular",
  "DeviceUtil",
  "LocalStorageHelper",
  "PopupUtil",
  "documentLibraryManager",
  "$timeout",
  "customersManager",
  function (
    $state,
    $rootScope,
    ionicToast,
    CommonMethodsFactory,
    AppMessages,
    LoaderService,
    Restangular,
    DeviceUtil,
    LocalStorageHelper,
    PopupUtil,
    documentLibraryManager,
    $timeout,
    customersManager
  ) {
    var toggleUrlMethods = {
      //To Do Make a seperate method to set the url and if popup select is no reset the url to old values
      validateUrl: function validateUrl(data) {
        cordova.plugins.Keyboard.close();
        var custUrl = data.customerUrl;

        if (data.defaultTypeVal) {
          custUrl = "test.safetynet.dk/DemoDK";
        }

        if (custUrl) {
          data.isCustomeURLEnabled = this.CheckIfCustomURL(custUrl);
          var checkVailUrl = this.ValidURL(custUrl, data);

          if (checkVailUrl) {
            this.CheckIsItSameCustomer(custUrl, data);
          } else {
            var errorHeader =
              $rootScope.getResourceText("LIT_MOBILE_ERROR") +
              $rootScope.getResourceText("LIT_MESSAGE");
            var errorBody = $rootScope
              .getResourceText("MSG_MOBILE_URL_INVALID")
              .replace("__Organization__", custUrl);
            AppMessages.Info(errorHeader, errorBody);
          }
        }
      },
      CheckIsItSameCustomer: function CheckIsItSameCustomer(url, data) {
        var customer = customersManager.getCustomers();
        var details = CommonMethodsFactory.getUrlDetails(url);
        var custName = details.environment;
        var onlineVal = details.subDomain;
        var ckeyVal = details.cKey != null ? details.cKey.toLowerCase() : "";
        custName = custName == null ? "" : custName.toLowerCase();
        var customUrlDetails = CommonMethodsFactory.getCustomUrlDetails(url);

        if (customer != null) {
          var isDifferentCustomer = true;
          var uniquePart =
            customer.UniqueUrlPart == null
              ? ""
              : customer.UniqueUrlPart.toLowerCase();

          if (!data.isCustomeURLEnabled)
            isDifferentCustomer =
              customer.OnlineVal !== onlineVal || uniquePart != custName;
          else isDifferentCustomer = uniquePart != customUrlDetails.baseUrl;

          if (!isDifferentCustomer)
            isDifferentCustomer = customer.CKey.toLowerCase() !== ckeyVal;

          if (isDifferentCustomer) {
            var resetPromise = LoaderService.hide();
            var that = this;
            resetPromise.then(function (success) {
              if (success) {
                var title = $rootScope.getResourceText("LIT_RESET_DATA");
                var template = $rootScope.getResourceText(
                  "MSG_DELETE_DATA_FROM_PHONE"
                );
                var confirmPromise = PopupUtil.confirm(title, template);
                confirmPromise.then(function (success) {
                  LoaderService.show();
                  $timeout(function () {
                    if (success) {
                      if (!data.isCustomeURLEnabled)
                        that.CustomerURL(custName, onlineVal, ckeyVal);
                      else
                        that.CustomURL(
                          customUrlDetails.baseUrl,
                          customUrlDetails.ckey
                        );
                    } else {
                      LoaderService.hide();
                    }
                  }, 100);
                });
              }
            });
          } else {
            var message = $rootScope
              .getResourceText("MSG_MOBILE_URL_SUCCESS")
              .replace("__Organization__", uniquePart);
            ionicToast.showDefault(message);
            this.darkModeEnable();
            setTimeout(function () {
              $state.go("login");
            }, 1000);
          }
        } else {
          if (!data.isCustomeURLEnabled)
            this.CustomerURL(custName, onlineVal, ckeyVal);
          else this.CustomURL(customUrlDetails.baseUrl, customUrlDetails.ckey);
        }
      },
      CheckIfCustomURL: function CheckIfCustomURL(url) {
        url = url.toLowerCase();
        return (
          !url.includes("test.ss.dk") &&
          !url.includes("test.safetynet.dk") &&
          !url.includes("safetynet.dk") &&
          !url.includes(".dk") &&
          !url.includes("safetynet4u.se") &&
          !url.includes("cloud.frontplanner.com")
        );
      },
      CustomerURL: function CustomerURL(custName, onlineVal, ckeyVal) {
        var ckey = null;

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

        if (
          angular.isUndefined(custName) ||
          custName === null ||
          angular.isUndefined(onlineVal) ||
          onlineVal === null
        ) {
          ionicToast.showDefault(
            $rootScope.getResourceText("LIT_PLEASE_ENTER_THE_DETAILS")
          );
        } else {
          var isOnline = DeviceUtil.isDeviceOnline();

          if (isOnline === false) {
            AppMessages.Error(
              $rootScope.getResourceText("LIT_ALERT"),
              $rootScope.getResourceText("MSG_CHECK_INTERNET_CONNECTION")
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
              ); //Restangular.setBaseUrl('http://192.168.1.6/s16/api/v1/');

              var validate = Restangular.all("suite").one("details/" + ckey);
              var that = this;
              validate.get().then(
                function (success) {
                  that.addToCustomer(custName, onlineVal, ckey, false);
                  LoaderService.hide();
                  return success;
                },
                function (error) {
                  console.log(error);
                }
              );
            } else {
              var errorHeader =
                $rootScope.getResourceText("LIT_MOBILE_ERROR") +
                $rootScope.getResourceText("LIT_MESSAGE");
              var errorBody = $rootScope
                .getResourceText("MSG_MOBILE_URL_INVALID")
                .replace("__Organization__", baseUrl);
              AppMessages.Error(errorHeader, errorBody);
              LoaderService.hide();
            }
          }
        }
      },
      CustomURL: function CustomURL(baseUrl, ckey) {
        var isOnline = DeviceUtil.isDeviceOnline();

        if (isOnline === false) {
          AppMessages.Error(
            $rootScope.getResourceText("LIT_ALERT"),
            $rootScope.getResourceText("MSG_CHECK_INTERNET_CONNECTION")
          );
          LoaderService.hide();
        } else {
          LoaderService.show();

          if (baseUrl) {
            if (baseUrl.includes("api/v1"))
              Restangular.setBaseUrl("https://" + baseUrl);
            else Restangular.setBaseUrl("https://" + baseUrl + "/api/v1/");

            var validate = Restangular.all("suite").one("details/" + ckey);
            var that = this;
            validate.get().then(
              function (success) {
                that.addToCustomer(baseUrl, null, ckey, true);
                LoaderService.hide();
                return success;
              },
              function (error) {
                console.log(error);
              }
            );
          } else {
            var errorHeader =
              $rootScope.getResourceText("LIT_MOBILE_ERROR") +
              $rootScope.getResourceText("LIT_MESSAGE");
            var errorBody = $rootScope
              .getResourceText("MSG_MOBILE_URL_INVALID")
              .replace("__Organization__", baseUrl);
            AppMessages.Error(errorHeader, errorBody);
            LoaderService.hide();
          }
        }
      },
      ValidURL: function ValidURL(str, data) {
        str = str.toLowerCase();
        var pattern = new RegExp(
          "^(http://|https://)?((?:[a-zA-Z0-9][a-zA-Z0-9]+))(\\.)((?:[a-zA-Z0-9][a-zA-Z0-9]+))(\\.)((?:[a-zA-Z][a-zA-Z]+))(\\/)((?:[a-zA-Z][a-zA-Z]*))(_?)((?:[a-zA-Z][a-zA-Z]*))"
        );

        if (data.isCustomeURLEnabled)
          pattern = new RegExp("^(http://|https://)(.*)");

        if (!pattern.test(str)) {
          return false;
        } else {
          return true;
        }
      },
      addToCustomer: function addToCustomer(
        custName,
        onlineVal,
        ckey,
        isCustomUrlEnabled
      ) {
        var customer = customersManager.getCustomers();
        window.localStorage.removeItem("userLanguage");
        var defaultLangPromise = LocalStorageHelper.setUserDefaultLanguage(
          custName,
          onlineVal,
          ckey
        );
        var that = this;
        defaultLangPromise.then(function () {
          if (customer != null) {
            var resetDocumentPromise =
              documentLibraryManager.removeDocumentLibrary();
            resetDocumentPromise.then(
              function () {
                var resetPromise = LocalStorageHelper.reset([]);
                resetPromise.promise.then(function () {
                  var suitePromise = LocalStorageHelper.initSuiteDetails(
                    custName,
                    onlineVal,
                    ckey,
                    isCustomUrlEnabled
                  );
                  suitePromise.then(
                    function (success) {
                      var loaderProm = LoaderService.hide();
                      loaderProm.then(function () {
                        that.darkModeEnable();
                        var message = $rootScope
                          .getResourceText("MSG_MOBILE_URL_SUCCESS")
                          .replace("__Organization__", custName);
                        ionicToast.showDefault(message);
                        $state.go("login");
                        $rootScope.$emit("refreshLoginPage");
                      });
                    },
                    function (error) {
                      LoaderService.hide();
                      return;
                    }
                  );
                });
              },
              function (error) {
                LoaderService.hide();
              }
            );
          } else {
            var suitePromise = LocalStorageHelper.initSuiteDetails(
              custName,
              onlineVal,
              ckey,
              isCustomUrlEnabled
            );
            suitePromise.then(
              function (success) {
                that.darkModeEnable();
                var message = $rootScope
                  .getResourceText("MSG_MOBILE_URL_SUCCESS")
                  .replace("__Organization__", custName);
                ionicToast.showDefault(message);
                $state.go("login");
                $rootScope.$emit("refreshLoginPage");
              },
              function (error) {
                console.log(error);
                return;
              }
            );
          }
        });
      },
      darkModeEnable: function darkModeEnable() {
        var customer = customersManager.getCustomers();
        if (customer.IsDarkModeEnable) {
          $rootScope.$emit("darkThemeBgColor", { isDark: true });
        } else {
          $rootScope.$emit("darkThemeBgColor", { isDark: false });
          $rootScope.$emit("RenderButtonBgHeaderColor");
        }
      },
      ScanQRCode: function ScanQRCode(scope, isAutomatic, inputValue) {
        cordova.plugins.Keyboard.close();
        var that = this;
        if (scope.scanItems === null || scope.scanItems === undefined) {
          var mainView = document.querySelector(".scannerView");
          var scannerButton = document.querySelector(".scannerButtons");
          var cancle = document.querySelector(".cancleScan");
          var flash = document.querySelector(".flashCam");
          var flipCamera = document.querySelector(".flipCam");
          var androidView = document.querySelector(".platform-android");
          var bodyView = document.querySelector("body");

          scope.scanItems = {
            scannerView: mainView,
            scannerButton: scannerButton,
            cancleButton: cancle,
            flashCamera: flash,
            flipCamera: flipCamera,
            androidView: androidView,
            bodyView: bodyView,
          };
        } else {
          var mainView = scope.scanItems.scannerView;
          var scannerButton = scope.scanItems.scannerButton;
          var cancle = scope.scanItems.cancleButton;
          var flash = scope.scanItems.flashCamera;
          var flipCamera = scope.scanItems.flipCamera;
          var androidView = scope.scanItems.androidView;
          var bodyView = scope.scanItems.bodyView;
        }

        var readInputVal;
        if (inputValue) {
          readInputVal = document.querySelector(inputValue);
        }

        document.addEventListener("backbutton", function () {
          if (androidView) {
            androidView.style.setProperty(
              "background-color",
              "var(--statusbar-bg-color, #2c3445)",
              "important"
            );
          }
          if (!ionic.Platform.isAndroid() && bodyView) {
            bodyView.style.visibility = "visible";
          }
          mainView.style.visibility = "visible";
          scannerButton.style.setProperty("visibility", "hidden", "important");
        });

        window.QRScanner.prepare(onDone);

        function onDone(err, status) {
          if (err) {
            console.error(err);
          }
          if (status.authorized) {
            cancle.addEventListener("click", function () {
              if (status.lightEnabled === true) {
                window.QRScanner.disableLight(function () {
                  status.lightEnabled = false;
                });
              }
              window.QRScanner.cancelScan();
            });

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

            flipCamera.addEventListener("click", function () {
              if (status.currentCamera === 0) {
                window.QRScanner.useFrontCamera(function () {
                  status.currentCamera = 1;
                });
              } else {
                window.QRScanner.useBackCamera(function () {
                  status.currentCamera = 0;
                });
              }
            });

            if (androidView) {
              androidView.style.setProperty(
                "background-color",
                "transparent",
                "important"
              );
            }
            if (!ionic.Platform.isAndroid() && bodyView) {
              bodyView.style.visibility = "hidden";
            }
            mainView.style.visibility = "hidden";
            scannerButton.style.setProperty(
              "visibility",
              "visible",
              "important"
            );
            window.QRScanner.show(function () {
              window.QRScanner.scan(displayContents);
            });
          }
        }

        function displayContents(err, text) {
          if (err) {
            if (err.name === "SCAN_CANCELED") {
              if (androidView) {
                androidView.style.setProperty(
                  "background-color",
                  "var(--statusbar-bg-color, #2c3445)",
                  "important"
                );
              }
              if (!ionic.Platform.isAndroid() && bodyView) {
                bodyView.style.visibility = "visible";
              }
              mainView.style.visibility = "visible";
              scannerButton.style.setProperty(
                "visibility",
                "hidden",
                "important"
              );
              window.QRScanner.destroy();
            } else {
              console.error(err._message);
            }
          } else {
            window.QRScanner.disableLight();
            if (androidView) {
              androidView.style.setProperty(
                "background-color",
                "var(--statusbar-bg-color, #2c3445)",
                "important"
              );
            }
            if (!ionic.Platform.isAndroid() && bodyView) {
              bodyView.style.visibility = "visible";
            }
            mainView.style.visibility = "visible";
            scannerButton.style.setProperty(
              "visibility",
              "hidden",
              "important"
            );
            window.QRScanner.destroy();
            var extractedUrl = that.getUrlFromToken(text);
            if (!isAutomatic) {
              if (inputValue === ".scanInput") {
                scope.data.textBoxVal = false;
                scope.data.tokenBoxVal = true;
                scope.data.customerToken = extractedUrl;
              } else {
                scope.data.textBoxVal = true;
                scope.data.tokenBoxVal = false;
                scope.data.customerUrl = extractedUrl;
              }

              if (readInputVal) {
                readInputVal.value = extractedUrl;
                readInputVal.focus();
              }
              scope.$apply();
            } else {
              that.validateUrl({
                customerUrl: extractedUrl,
              });
            }
          }
        }
      },
      getUrlFromToken: function getUrlFromToken(url) {
        var encriptedToken = url.split("customerurl/")[1];
        if (encriptedToken) {
          var decodedParams = decodeURIComponent(encriptedToken);
          var actualParams = atob(decodedParams);
          var replacer = /(<([^>]+)>)/gi;
          var sanitizedData = actualParams.replace(replacer, "");
          if (sanitizedData.indexOf("url") !== -1) {
            var extractedUrl = sanitizedData.split("url=")[1];
            return extractedUrl;
          }
        }
        return url;
      },
    };
    return toggleUrlMethods;
  },
]);
app.factory("BackButtonParamService", function () {
  var params = {};
  var backButtonParams = {
    setParams: function (newParams) {
      params = newParams;
    },
    getParams: function () {
      return params;
    },
  };
  return backButtonParams;
});


/***/ }),

/***/ "./scripts/factoryService/homeService.js":
/*!***********************************************!*\
  !*** ./scripts/factoryService/homeService.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    var app = angular.module('factoryService', []);
    app.factory("$exceptionHandler", ['$injector', function ($injector) {
        return function (exception, cause) {
            var localStorageUtility = $injector.get('LocalStorageUtility')
            localStorageUtility.addExceptionToLogTable(exception, cause);
            var rScope = $injector.get('$rootScope');
            rScope.$broadcast('exceptionRefresh', exception, cause);
        };
    }]);
    app.service('HomeScreenUtil', ['$q', '$rootScope', 'customersManager', 'userDetailsManager', 'questionnaireManager', 'personQuestionnaireManager', 'personApwManager', 'actionPlanWizardManager', 'userApplicationsManager', 'askadeFileTypeWizardManager', 'personAskadeFileTypeWizardManager', 'documentLibraryManager', 'GeneralUtil', 'LocalStorageHelper', function ($q, $rootScope, customersManager, userDetailsManager, questionnaireManager, personQuestionnaireManager, personApwManager, actionPlanWizardManager, userApplicationsManager, askadeFileTypeWizardManager, personAskadeFileTypeWizardManager, documentLibraryManager, GeneralUtil, LocalStorageHelper) {
        var homeScreenUtilScope = {
            getUserDetailsAndCustomer: function getUserDetailsAndCustomer() {
                return userDetailsManager.getUserLastLoggedTimeStamp();
            },
            getUserDetails: function () {
                return userDetailsManager.getUserLastLoggedTimeStamp();
            },
            getCustomer: function getCustomer() {
                return customersManager.getCustomers();
            },
            isDownloadValid: function isDownloadValid(moduleName) {
                return userDetailsManager.getIfdownloadValidForType(moduleName);
            },
            isAPVDownloadValid: function isAPVDownloadValid() {
                return userDetailsManager.getIfdownloadValidForType('Apv');
            },
            isActionPlanDownloadValid: function isActionPlanDownloadValid() {
                return userDetailsManager.getIfdownloadValidForType('ActionPlan');
            },
            isRiskProfileDownloadValid: function isRiskProfileDownloadValid() {
                return userDetailsManager.getIfdownloadValidForType('RiskProfile');
            },
            isEmployeeSatisfactionDownloadValid: function isEmployeeSatisfactionDownloadValid() {
                return userDetailsManager.getIfdownloadValidForType('EmployeeSatisfaction');
            },
            isHumanResourceDownloadValid: function isHumanResourceDownloadValid() {
                return userDetailsManager.getIfdownloadValidForType('HumanResource');
            },
            isManagementEvaluationDownloadValid: function isManagementEvaluationDownloadValid() {
                return userDetailsManager.getIfdownloadValidForType('ManagementEvaluation');
            },
            isFrontPlannerDownloadValid: function isFrontPlannerDownloadValid() {
                return userDetailsManager.getIfdownloadValidForType('FrontPlanner');
            },
            isAskadeDownloadValid: function isAskadeDownloadValid() {
                return userDetailsManager.getIfdownloadValidForType('Askade');
            },
            isClaimDownloadValid: function isClaimDownloadValid() {
                return userDetailsManager.getIfdownloadValidForType('Claim');
            },
            isDLDownloadValid: function isDLDownloadValid() {
                return userDetailsManager.getIfdownloadValidForType('DocumentLibrary');
            },
            getActionPlanProblemDisplayData: function getActionPlanProblemDisplayData() {
                var actionPlanWizardList = actionPlanWizardManager.getActiveActionPlanProblemList();
                return actionPlanWizardList;
            },
            getActionPlanProblemInprogressCount: function getActionPlanProblemInprogressCount() {
                var inprogressCount = personApwManager.getInProgressPersonAPWListCount();
                return inprogressCount;
            },
            getActionPlanProblemCompletedCount: function getActionPlanProblemCompletedCount() {
                var completedCount = personApwManager.getCompletedPersonAPWListCount();
                return completedCount;
            },
            getActionPlanProblemCompletedWithAutoUploadDelayElapsed: function getActionPlanProblemCompletedWithAutoUploadDelayElapsed() {
                var completedDelayedList = personApwManager.getCompletedPersonAPWListWithDelayedUpload();
                return completedDelayedList;
            },
            hasDelayedActionPlans2Upload: function hasDelayedActionPlans2Upload() {
                return personApwManager.hasDelayedActionPlans2Upload();
            },
            getModuleQuestionnaireCompletedWithAutoUploadDelayElapsed:
                function getModuleQuestionnaireCompletedWithAutoUploadDelayElapsed(moduleName) {
                    var allQuestionnairesList = [];
                    var completedDelayedList = personQuestionnaireManager.getCompletedPersonQuestionnaireListWithDelayedUpload(moduleName);
                    allQuestionnairesList = allQuestionnairesList.concat(completedDelayedList);
                    return allQuestionnairesList;
                },
            getAllModuleQuestionnaireCompletedWithAutoUploadDelayElapsed: function getAllModuleQuestionnaireCompletedWithAutoUploadDelayElapsed() {
                var allModules = ['Apv', 'RiskProfile', 'EmployeeSatisfaction', 'HumanResource', 'ManagementEvaluation', 'FrontPlanner'];
                var allQuestionnairesList = [];
                for (var i = 0; i < allModules.length; i++) {
                    var questionnaireName = allModules[i];
                    var completedDelayedList = personQuestionnaireManager.getCompletedPersonQuestionnaireListWithDelayedUpload(questionnaireName);
                    allQuestionnairesList = allQuestionnairesList.concat(completedDelayedList);
                }
                return allQuestionnairesList;
            },
            hasAllModuleQuestionnaireCompletedWithAutoUploadDelayElapsed: function hasAllModuleQuestionnaireCompletedWithAutoUploadDelayElapsed() {
                var allModules = ['Apv', 'RiskProfile', 'EmployeeSatisfaction', 'HumanResource', 'ManagementEvaluation', 'FrontPlanner'];
                for (var i = 0; i < allModules.length; i++) {
                    var questionnaireName = allModules[i];
                    if (personQuestionnaireManager.hasDelayedQuestionnaireList2Upload(questionnaireName)) {
                        return true;
                    }
                }
                return false;
            },
            getQuestionnaireCompletedWithAutoUploadDelayElapsed: function getQuestionnaireCompletedWithAutoUploadDelayElapsed(moduleName) {
                var completedDelayedList = personQuestionnaireManager.getCompletedPersonQuestionnaireListWithDelayedUpload(moduleName);
                return completedDelayedList;
            },
            hasDelayedQuestionnaireList2Upload: function hasDelayedQuestionnaireList2Upload(moduleName) {
                return personQuestionnaireManager.hasDelayedQuestionnaireList2Upload(moduleName);
            },
            getApvDisplayData: function getApvDisplayData() {
                return this.getDisplayData('Apv');
            },
            getApvInProgressCount: function getApvInProgressCount() {
                return this.getQueInProgCompListCount('Apv', 'InProgress');
            },
            getApvCompletedCount: function getApvCompletedCount() {
                return this.getQueInProgCompListCount('Apv', 'Completed');
            },
            getRiskProfileDisplayData: function getRiskProfileDisplayData() {
                return this.getDisplayData('RiskProfile');
            },
            getRiskProfileInProgressCount: function getRiskProfileInProgressCount() {
                return this.getQueInProgCompListCount('RiskProfile', 'InProgress');
            },
            getRiskProfileCompletedCount: function getRiskProfileCompletedCount() {
                return this.getQueInProgCompListCount('RiskProfile', 'Completed');
            },
            getEmployeeSatisfactionDisplayData: function getEmployeeSatisfactionDisplayData() {
                return this.getDisplayData('EmployeeSatisfaction');
            },
            getEmployeeSatisfactionInProgressCount: function getEmployeeSatisfactionInProgressCount() {
                return this.getQueInProgCompListCount('EmployeeSatisfaction', 'InProgress');
            },
            getEmployeeSatisfactionCompletedCount: function getEmployeeSatisfactionCompletedCount() {
                return this.getQueInProgCompListCount('EmployeeSatisfaction', 'Completed');
            },
            getHumanResourceDisplayData: function getHumanResourceDisplayData() {
                return this.getDisplayData('HumanResource');
            },
            getHumanResourceInProgressCount: function getHumanResourceInProgressCount() {
                return this.getQueInProgCompListCount('HumanResource', 'InProgress');
            },
            getHumanResourceCompletedCount: function getHumanResourceCompletedCount() {
                return this.getQueInProgCompListCount('HumanResource', 'Completed');
            },
            getManagementEvaluationDisplayData: function getManagementEvaluationDisplayData() {
                return this.getDisplayData('ManagementEvaluation');
            },
            getManagementEvaluationInProgressCount: function getManagementEvaluationInProgressCount() {
                return this.getQueInProgCompListCount('ManagementEvaluation', 'InProgress');
            },
            getManagementEvaluationCompletedCount: function getManagementEvaluationCompletedCount() {
                return this.getQueInProgCompListCount('ManagementEvaluation', 'Completed');
            },
            getFrontPlannerDisplayData: function getFrontPlannerDisplayData() {
                return this.getDisplayData('FrontPlanner');
            },
            getFrontPlannerInProgressCount: function getFrontPlannerInProgressCount() {
                return this.getQueInProgCompListCount('FrontPlanner', 'InProgress');
            },
            getFrontPlannerCompletedCount: function getFrontPlannerCompletedCount() {
                return this.getQueInProgCompListCount('FrontPlanner', 'Completed');
            },
            getDisplayData: function getDisplayData(moduleName) {
                var questionnaireList = questionnaireManager.getActiveQuestionnairesList(moduleName);
                return questionnaireList;
            },
            getQueInProgCompListCount: function getQueInProgCompListCount(moduleName, type) {
                switch (type) {
                    case 'InProgress':
                        var inprogressCount = personQuestionnaireManager.getInProgressQuestionnairesListCount(moduleName);
                        return inprogressCount;

                    case 'Completed':
                        var completedCount = personQuestionnaireManager.getCompletedQuestionnairesListCount(moduleName);
                        return completedCount;
                }
            },
            getUserApplications: function getUserApplications() {
                var userDetails = userDetailsManager.getUserLastLoggedTimeStamp();
                return userApplicationsManager.getUserApplications(userDetails.UserId);
            },
            getInvalidDownloadList: function getInvalidDownloadList() {
                return userDetailsManager.getIfdownloadValidForAll();
            },
            getAskadeDisplayData: function getAskadeDisplayData() {
                var askadeList = askadeFileTypeWizardManager.getAllCaseFileTypeWizard('Askade');
                return askadeList;
            },
            getAskadeInprogressCount: function getAskadeInprogressCount() {
                var inprogressCountAskade = personAskadeFileTypeWizardManager.getInProgressPAskadeCount('Askade');
                return inprogressCountAskade;
            },
            getAskadeCompletedCount: function getAskadeCompletedCount() {
                var completedCountAskade = personAskadeFileTypeWizardManager.getCompletedPAskadeCount('Askade');
                return completedCountAskade;
            },
            getAskadeCompletedWithAutoUploadDelayElapsed: function getAskadeCompletedWithAutoUploadDelayElapsed() {
                var completedDelayedList = personAskadeFileTypeWizardManager.getCompletedPersonAskadeListWithDelayedUpload('Askade');
                return completedDelayedList;
            },
            hasDelayedAskadeList2Upload: function hasDelayedAskadeList2Upload() {
                return personAskadeFileTypeWizardManager.hasDelayedAskadeList2Upload('Askade');
            },
            getClaimCompletedWithAutoUploadDelayElapsed: function getClaimCompletedWithAutoUploadDelayElapsed() {
                var completedDelayedList = personAskadeFileTypeWizardManager.getCompletedPersonAskadeListWithDelayedUpload('Claim');
                return completedDelayedList;
            },
            hasDelayedClaimList2Upload: function hasDelayedAskadeList2Upload() {
                return personAskadeFileTypeWizardManager.hasDelayedAskadeList2Upload('Claim');
            },
            getClaimDisplayData: function getClaimDisplayData() {
                var claimList = askadeFileTypeWizardManager.getAllCaseFileTypeWizard('Claim');
                return claimList;
            },
            getClaimInprogressCount: function getClaimInprogressCount() {
                var inprogressCountClaim = personAskadeFileTypeWizardManager.getInProgressPAskadeCount('Claim');
                return inprogressCountClaim;
            },
            getClaimCompletedCount: function getClaimCompletedCount() {
                var completedCountClaim = personAskadeFileTypeWizardManager.getCompletedPAskadeCount('Claim');
                return completedCountClaim;
            },
            getDLDocumentTypeData: function getDLDocumentTypeData() {
                var documentTypeList = documentLibraryManager.getUniqueGroupName();
                return documentTypeList;
            },
            getAllDocumentListData: function getAllDocumentListData() {
                var documentList = documentLibraryManager.getAllDocumentList();
                return documentList;
            },
            getLastDownloadStartDate: function getLastDownloadStartDate() {
                var leastDate = userDetailsManager.getLastDownloadedStartDate();
                var differenceDate = GeneralUtil.differenceDate(leastDate);
                return differenceDate;
            },
            updateSuiteUserDetails: function updateSuiteUserDetails() {
                var userDetails = this.getUserDetailsAndCustomer();
                var customerData = userDetails.Customer;
                var customerName = customerData.UniqueUrlPart;
                var onlineValue = customerData.OnlineVal;
                var userName = userDetails.UserName;
                var cKey = customerData.CKey;
                var def = $q.defer();
                var suitePromise = LocalStorageHelper.initSuiteDetails(customerName, onlineValue, cKey, customerData.IsCustomUrlEnabled);
                suitePromise.then(function (sucess) {
                    var userDetailsPromise = LocalStorageHelper.initUserDetails(userName);
                    userDetailsPromise.then(function (res) {
                        def.resolve(true);
                    }, function (fail) {
                        def.reject(false);
                    });
                }, function (fail) {
                    def.reject(false);
                });
                return def.promise;
            }
        };
        return homeScreenUtilScope;
    }]);
})();


/***/ }),

/***/ 3:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./scripts/controller/actionPlanController.js ./scripts/controller/actionPlanListController.js ./scripts/controller/answerOptionColor.js ./scripts/controller/appOptionsController.js ./scripts/controller/askadeController.js ./scripts/controller/askadeListController.js ./scripts/controller/documentLibraryList.js ./scripts/controller/favorite.js ./scripts/controller/home.js ./scripts/controller/loginController.js ./scripts/controller/newsController.js ./scripts/controller/question.js ./scripts/controller/questionnaireList.js ./scripts/controller/sideMenuController.js ./scripts/controller/startScreenController.js ./scripts/controller/toggleUrl.js ./scripts/controller/userProfileController.js ./scripts/controller/guideController.js ./scripts/factoryService/commonMethods.js ./scripts/factoryService/homeService.js ./scripts/controller/surveyController.js ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./scripts/controller/actionPlanController.js */"./scripts/controller/actionPlanController.js");
__webpack_require__(/*! ./scripts/controller/actionPlanListController.js */"./scripts/controller/actionPlanListController.js");
__webpack_require__(/*! ./scripts/controller/answerOptionColor.js */"./scripts/controller/answerOptionColor.js");
__webpack_require__(/*! ./scripts/controller/appOptionsController.js */"./scripts/controller/appOptionsController.js");
__webpack_require__(/*! ./scripts/controller/askadeController.js */"./scripts/controller/askadeController.js");
__webpack_require__(/*! ./scripts/controller/askadeListController.js */"./scripts/controller/askadeListController.js");
__webpack_require__(/*! ./scripts/controller/documentLibraryList.js */"./scripts/controller/documentLibraryList.js");
__webpack_require__(/*! ./scripts/controller/favorite.js */"./scripts/controller/favorite.js");
__webpack_require__(/*! ./scripts/controller/home.js */"./scripts/controller/home.js");
__webpack_require__(/*! ./scripts/controller/loginController.js */"./scripts/controller/loginController.js");
__webpack_require__(/*! ./scripts/controller/newsController.js */"./scripts/controller/newsController.js");
__webpack_require__(/*! ./scripts/controller/question.js */"./scripts/controller/question.js");
__webpack_require__(/*! ./scripts/controller/questionnaireList.js */"./scripts/controller/questionnaireList.js");
__webpack_require__(/*! ./scripts/controller/sideMenuController.js */"./scripts/controller/sideMenuController.js");
__webpack_require__(/*! ./scripts/controller/startScreenController.js */"./scripts/controller/startScreenController.js");
__webpack_require__(/*! ./scripts/controller/toggleUrl.js */"./scripts/controller/toggleUrl.js");
__webpack_require__(/*! ./scripts/controller/userProfileController.js */"./scripts/controller/userProfileController.js");
__webpack_require__(/*! ./scripts/controller/guideController.js */"./scripts/controller/guideController.js");
__webpack_require__(/*! ./scripts/factoryService/commonMethods.js */"./scripts/factoryService/commonMethods.js");
__webpack_require__(/*! ./scripts/factoryService/homeService.js */"./scripts/factoryService/homeService.js");
module.exports = __webpack_require__(/*! ./scripts/controller/surveyController.js */"./scripts/controller/surveyController.js");


/***/ })

/******/ });
//# sourceMappingURL=contrllapp.bundle.js.map