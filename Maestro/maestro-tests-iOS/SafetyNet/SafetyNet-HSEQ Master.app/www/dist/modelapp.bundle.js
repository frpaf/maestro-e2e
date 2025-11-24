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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./scripts/DataModels.js":
/*!*******************************!*\
  !*** ./scripts/DataModels.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var app = angular.module('DataEntityModule', []);
app.factory("$exceptionHandler", ['$injector', function ($injector) {
    return function (exception, cause) {
        var localStorageUtility = $injector.get('LocalStorageUtility')
        localStorageUtility.addExceptionToLogTable(exception, cause);
        var rScope = $injector.get('$rootScope');
        rScope.$broadcast('exceptionRefresh', exception, cause);
    };
}]);

app.factory('PersonQuestionnaire', ['$cordovaFile', '$rootScope', 'DateUtil', function ($cordovaFile, $rootScope, DateUtil) {
    function PersonQuestionnaire() { }

    PersonQuestionnaire.prototype = {
        setData: function setData(personQuestionnaireSource) {
            if (personQuestionnaireSource != null) {
                this.Id = personQuestionnaireSource.Id;
                this.QuestionnaireId = personQuestionnaireSource.questionnaireId;
                this.PersonId = personQuestionnaireSource.personId;
                this.DepartmentId = personQuestionnaireSource.departmentId;
                this.EvaluatedForId = personQuestionnaireSource.evaluatedForId;
                this.GeoX = personQuestionnaireSource.geoX;
                this.GeoY = personQuestionnaireSource.geoY;
                this.AnswerByPersonId = personQuestionnaireSource.answerByPersonId;
                this.InitiatedDate = personQuestionnaireSource.initiatedDate;
                this.SurveyCompletedDate = personQuestionnaireSource.surveyCompletedDate;
                this.CreatedDate = personQuestionnaireSource.meta.created;
                this.IsAnonymous = personQuestionnaireSource.isAnonymous;
                this.Address = personQuestionnaireSource.address;
                this.SurveyHistoryFromDate = personQuestionnaireSource.surveyHistoryFromDate;
                this.SurveyHistoryToDate = personQuestionnaireSource.surveyHistoryToDate;

                if (personQuestionnaireSource.meta.updated != null) {
                    var date = new Date(personQuestionnaireSource.meta.updated);
                    var formatedCompleteDate = DateUtil.getFormattedValue(date, 'dateTime');
                    this.CompletedDate = formatedCompleteDate;
                } else {
                    var date = new Date(personQuestionnaireSource.meta.created);
                    var formatedCompleteDate = DateUtil.getFormattedValue(date, 'dateTime');
                    this.CompletedDate = formatedCompleteDate;
                }

                this.AnsweringInProgress = personQuestionnaireSource.answeringInProgress;
                this.AnsweringCompleted = personQuestionnaireSource.answeringCompleted;
                this.IsTemplate = false; //This is declared here and the value to this will be set 
                //in the personQuestionnaireManager .

                this.Questionnaire = null;
                this.LastGroupIndex = personQuestionnaireSource.lastGroupIndex;
                this.Answers = [];
                this.ValuationAnswers = [];
                this.UploadInProgress = false;
                this.UploadFail = false;
                this.IsNavigateFromInProgress = false;
            }
        },
        prepareImages: function prepareImages() {
            var instance = this;
            var pqaArray = [];

            for (var i = 0; i < this.Answers.length; i++) {
                var pqa = this.Answers[i];
                var imagePromise = pqa.process();

                if (imagePromise != null) {
                    pqaArray.push({
                        'PqaId': pqa.Id,
                        'ImagePromise': imagePromise
                    });
                }
            }

            return pqaArray;
        },
        // The below method is not used, but could be used for PDF with attachments in PDF (Questionnaire Module)
        prepareImagesForPdf: function prepareImagesForPdf() {
            var thisRef = this;
            var answerImagesArray = [];

            for (var i = 0; i < this.Answers.length; i++) {
                var pqa = this.Answers[i];
                var answerImagePromise = pqa.answerImage();

                if (answerImagePromise != null) {
                    answerImagesArray.push({
                        'PqaId': pqa.Id,
                        'answerImagePromise': answerImagePromise
                    });
                }
            }

            return answerImagesArray;
        },
        hasDelayElapsed: function () {
            if (!this.CompletedDate) {
                return false;
            }

            var delayInMinutes = this.Questionnaire.AutoUploadDelayInMins;
            if (!delayInMinutes) {
                return true;
            }
            //timestamp
            var completedDateTimeStamp = moment(this.CompletedDate, [
                "DD-MM-YYYY hh:mm:ss",
            ])
                .add(delayInMinutes, "minutes")
                .valueOf();
            var elaspedTimeInSeconds = (completedDateTimeStamp - Date.now()) / 1000;
            return elaspedTimeInSeconds <= 0;
        },
    };
    return PersonQuestionnaire;
}]);
app.factory('PersonQuestionAnswer', ['$cordovaFile', '$q', function ($cordovaFile, $q) {
    function PersonQuestionAnswer() { }

    PersonQuestionAnswer.prototype = {
        setData: function setData(personQuestionAnswerSource) {
            if (personQuestionAnswerSource != null) {
                this.Id = personQuestionAnswerSource.Id;
                this.PersonQuestionnaireId = personQuestionAnswerSource.personQuestionnaireId;
                this.QuestionId = personQuestionAnswerSource.questionId;
                this.AnswerId = personQuestionAnswerSource.answerId;
                this.AnswerText = personQuestionAnswerSource.answerText;
                this.AnswerImage = personQuestionAnswerSource.answerImage;
                this.Comment = personQuestionAnswerSource.comment;
                this.FileName = personQuestionAnswerSource.fileName;
                this.FileLocation = personQuestionAnswerSource.fileLocation;
                this.CreatedDate = personQuestionAnswerSource.createdDate;
                this.FileSourceBase64 = personQuestionAnswerSource.fileSourceBase64;
                this.InternalFileLocation = personQuestionAnswerSource.internalFileLocation;
                this.FileSource = null;
                this.Question = null;
                this.IsTemplate = false;
                this.IsDoneSign = personQuestionAnswerSource.isDoneSign; // This entity will be set to true or false based on the AnswerOption.CommentRequired field
                // By default it is set to false
                // In question level IsCommentRequired is added to handle the complexity in the view (Comment HTML view have to be repeated)

                this.IsCommentRequired = false; // This entity will be set to true or false based on the AnswerOption.FileAttachmentRequired field
                // By default it is set to false
                this.IsFileAttachmentRequired = false; // MarkForDelete feature (Deleting image at the time of submit/next button press)

                this.MarkedForDelete = false;
                this.TempAnswerId = null;

                if (this.AnswerId) {
                    this.TempAnswerId = this.QuestionId + '|' + this.AnswerId;
                }
            }
        },
        process: function process() {
            if (this.FileName != null) {
                var directoryPath = this.FileLocation.replace(this.FileName, '');
                return $cordovaFile.readAsDataURL(directoryPath, this.FileName);
            }

            return null;
        },
        // The below method is not used, but could be used for PDF with attachments in PDF (Questionnaire Module)
        answerImage: function answerImage() {
            var imagePromise = $q.defer();

            if (this.FileName != null) {
                var personAttachment = new Image();
                personAttachment.src = this.FileLocation;

                personAttachment.onload = function () {
                    imagePromise.resolve(personAttachment);
                };
            } else {
                return null;
            }

            return imagePromise.promise;
        }
    };
    return PersonQuestionAnswer;
}]);
app.factory('PersonValuationQuestionAnswer', [function () {
    function PersonValuationQuestionAnswer() { }

    PersonValuationQuestionAnswer.prototype = {
        setData: function setData(personValuationQuestionAnswerSource) {
            this.Id = personValuationQuestionAnswerSource.Id;
            this.PersonQuestionnaireId = personValuationQuestionAnswerSource.personQuestionnaireId;
            this.QuestionId = personValuationQuestionAnswerSource.questionId;
            this.ValuationQuestionId = personValuationQuestionAnswerSource.valuationQuestionId;
            this.AnswerId = personValuationQuestionAnswerSource.answerId;
            this.AnswerText = personValuationQuestionAnswerSource.answerText;
            this.IsTemplate = false;
            this.TempVQAnswerId = null;

            if (this.AnswerId) {
                this.TempVQAnswerId = this.QuestionId + '|' + this.ValuationQuestionId + '|' + this.AnswerId;
            }
        }
    };
    return PersonValuationQuestionAnswer;
}]);
app.factory('Questionnaire', function () {
    //Constructor
    function Questionnaire() { }

    Questionnaire.prototype = {
        getModuleName: function getModuleName(typeCode) {
            switch (typeCode) {
                case 1:
                    return 'Apv';

                case 2:
                    return 'RiskProfile';

                case 3:
                    return 'ActioPlan';

                case 4:
                    return 'Problem';

                case 5:
                    return 'Administration';

                case 6:
                    return 'EmployeeSatisfaction';

                case 7:
                    return 'ManagementEvaluation';

                case 8:
                    return 'Askade';

                case 9:
                    return 'Insurance';

                case 10:
                    return 'HumanResource';

                case 11:
                    return 'FrontPlanner';

                case 12:
                    return 'DocumentLibrary';

                default:
                    return -1;
            }
        },
        setData: function setData(questionnaireSource) {
            this.Id = questionnaireSource.Id;
            this.TypeCode = questionnaireSource.typeCode;
            this.ControlType = questionnaireSource.controlType;

            this.ModuleName = function () {
                return this.getModuleName(this.TypeCode);
            };

            this.Name = questionnaireSource.name;
            this.Description = questionnaireSource.description;
            this.ExtendedDescription = questionnaireSource.extendedDescription;
            this.AnswerGroupId = questionnaireSource.answerGroupId;
            this.IsRepeatable = questionnaireSource.isRepeatable;
            this.IsRepeatableOnlyOnceForEvaluatingFor = questionnaireSource.isRepeatableOnlyOnceForEvaluatingFor;
            this.PointOfView = questionnaireSource.pointOfView;
            this.TranslatedPointOfView = questionnaireSource.translatedPointOfView;
            this.CommentLabel = questionnaireSource.commentLabel;
            this.PublishedDate = questionnaireSource.publishedDate;
            this.ExpirationDate = questionnaireSource.expirationDate;
            this.CreatedDate = questionnaireSource.createdDate;
            this.UpdatedDate = questionnaireSource.updatedDate;
            this.QuestionBackColor = questionnaireSource.questionBackColor;
            this.QuestionForeColor = questionnaireSource.questionForeColor;
            this.QuestionGroupBackColor = questionnaireSource.questionGroupBackColor;
            this.QuestionGroupForeColor = questionnaireSource.questionGroupForeColor;
            this.QuestionImageFileBase64 = questionnaireSource.questionImageFileBase64;

            if (questionnaireSource.answerOptionFontColour) {
                this.AnswerOptionFontColour = questionnaireSource.answerOptionFontColour;
            } else {
                // Setting black color by default if answerOptionFontColour does not has a value
                //TODO: This can be removed in next release 1.1.5
                this.AnswerOptionFontColour = "#000000";
            }

            this.EnableAnswerOptionColour = questionnaireSource.enableAnswerOptionColour;
            this.EnableTabularAnswering = questionnaireSource.enableTabularAnswering;
            this.TabularAnswerOptionColourType = questionnaireSource.tabularAnswerOptionColourType;
            this.EnableEmail = questionnaireSource.enableEmail;
            this.EnablePrint = questionnaireSource.enablePrint;
            this.ColumnSubType = questionnaireSource.columnSubType;
            this.AutoUploadDelayInMins = questionnaireSource.autoUploadDelayInMins;
            this.EnableEditGeoLocation = questionnaireSource.enableEditGeoLocation;
            this.IsSurvey = questionnaireSource.isSurvey;
            this.HidePointOfViewOnStartScreen = questionnaireSource.hidePointOfViewOnStartScreen;

            this.Groups = [];
            this.EvaluatingFor = [];
            this.ValuationQuestion = [];
        }
    };
    return Questionnaire;
});
app.factory('QuestionGroup', function () {
    //-------------------------
    function QuestionGroup() { } //-------------------------


    QuestionGroup.prototype = {
        setData: function setData(questionGroupSource) {
            this.Id = questionGroupSource.Id;
            this.QuestionnaireId = questionGroupSource.questionnaireId;
            this.AnswerGroupId = questionGroupSource.answerGroupId;
            this.Name = questionGroupSource.name;
            this.Description = questionGroupSource.description;
            this.HelpLink = questionGroupSource.helpLink;
            this.SortOrder = questionGroupSource.sortOrder;
            this.Questions = [];
        }
    }; //-------------------------

    return QuestionGroup;
});
app.factory('Question', ['$rootScope', function ($rootScope) {
    //Constructor
    function Question() { }

    Question.prototype = {
        setData: function setData(questionSource) {
            this.Id = questionSource.Id;
            this.Text = questionSource.text;
            this.TypeCode = questionSource.typeCode;
            this.IsRequired = questionSource.isRequired;
            this.IgnoreValuationQuestion = questionSource.ignoreValuationQuestion;
            this.EnableComment = questionSource.enableComment;
            this.EnableFile = questionSource.enableFileAttachment;
            this.EnableQRCodeReader = questionSource.enableQRCodeReader;
            this.HelpLink = questionSource.helpLink;
            this.HelpText = questionSource.helpText;
            this.SortOrder = questionSource.sortOrder;
            this.TriggerRequirement = questionSource.triggerRequirement;
            this.AnswerGroupId = questionSource.answerGroupId;
            this.CreatedDate = questionSource.createdDate;
            this.AnswerOptions = [];
            this.IsTriggerQuestion = false;
            this.IsDependentQuestion = false;
            this.ShowDependencyQuestion = questionSource.showDependencyQuestion;
            this.ColumnType = questionSource.columnType;
            this.ColumnSubType = questionSource.columnSubType;
            this.DataTypeId = questionSource.dataTypeId;
            this.IsDateDefaultToday = questionSource.isDateDefaultToday;
            this.IsDateMaximumToday = questionSource.isDateMaximumToday; //Below array will contain only when the question is a trigger question.

            this.DependentQuestions = [];
            this.QuestionTriggers = [];
            this.DependencyMetText = null;
            this.IsDependencyMet = false;
        },
        initialDependencyMet: function initialDependencyMet() {
            if (this.IsDependentQuestion === true) {
                for (var i = 0; i < this.QuestionTriggers.length; i++) {
                    var qt = this.QuestionTriggers[i];

                    if (qt.TriggerAnswerTextCode === 2) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }

            return true;
        },
        isDependencyMet: function isDependencyMet(pqAnswers) {
            var qtList = this.QuestionTriggers;
            var triggerRequirement = this.TriggerRequirement;
            this.DependencyMetText = '';

            function contains(sourceArray, destinationArray) {
                var elementExists = true;

                for (var i = 0; i < sourceArray.length; i++) {
                    var sourceElement = sourceArray[i];

                    if (destinationArray.indexOf(sourceElement) < 0) {
                        elementExists = false;
                        break;
                    }
                }

                return elementExists;
            }

            function getPersonQuestionAnswer(triggerQuestionId, pqaAnswers) {
                for (var i = 0; i < pqaAnswers.length; i++) {
                    var pqaQuestion = pqaAnswers[i];
                    var pqaQuestionId = pqaQuestion.QuestionId;

                    if (pqaQuestionId === triggerQuestionId) {
                        return pqaQuestion;
                    }
                }
            }

            var isDepMet = false;
            var triggerAnswersList = [];
            var triggerAnswersListCustom = [];
            var actualTriggerAnswersList = [];
            var isTextDependency = false;

            for (var i = 0; i < qtList.length; i++) {
                var qtEnt = qtList[i];
                var triggerPqa = getPersonQuestionAnswer(qtEnt.TriggerQuestionId, pqAnswers);

                if (qtEnt.TriggerAnswerTextCode === 1 || qtEnt.TriggerAnswerTextCode === 2) {
                    var answerText = triggerPqa.AnswerText === null ? '' : triggerPqa.AnswerText;
                    var tq = triggerPqa.Question;

                    if (qtEnt.TriggerAnswerTextCode === 2) {
                        if (answerText.length === 0) {
                            isDepMet = true;
                            this.DependencyMetText += tq.Text + ':' + $rootScope.getResourceText('TriggerAnswerTextType_NoText') + '\n';
                        }
                    } else {
                        if (answerText.length > 0) {
                            isDepMet = true;
                            this.DependencyMetText += tq.Text + ':' + answerText + '\n';
                        }
                    }

                    isTextDependency = true;
                } else {
                    var otherAnswers = triggerPqa.AnswerId === null ? [] : triggerPqa.AnswerId.split('|').filter(String);

                    for (var j = 0; j < otherAnswers.length; j++) {
                        var answerOption = otherAnswers[j];
                        var ans = triggerPqa.QuestionId + '_' + answerOption;

                        if (triggerAnswersList.indexOf(ans) < 0) {
                            triggerAnswersListCustom.push({
                                'TriggerId': triggerPqa.QuestionId,
                                'AnswerId': answerOption,
                                'TriggerPq': triggerPqa
                            });
                            triggerAnswersList.push(ans);
                        }
                    }

                    actualTriggerAnswersList.push(qtEnt.TriggerQuestionId + '_' + qtEnt.TriggerAnswerId);
                }
            }

            function getDependencyQuestion(triggerQuestion, answerId) {
                var questionText = triggerQuestion.Text;
                var answerText = '';
                var ansOptions = triggerQuestion.AnswerOptions;

                for (var i = 0; i < ansOptions.length; i++) {
                    var aoption = ansOptions[i];

                    if (aoption.Id === answerId) {
                        answerText = aoption.Text;
                        break;
                    }
                }

                return {
                    'Question': questionText,
                    'Answer': answerText
                };
            }

            function getAllDependencyText(triggerAnswersListCustom, dependencyText, isDepMet) {
                var isDependencyMet = isDepMet;
                var answersList = {};

                for (var i = 0; i < triggerAnswersListCustom.length; i++) {
                    var triggerAnswer = triggerAnswersListCustom[i];
                    var tpq = triggerAnswer.TriggerPq;
                    var triggerCompleteAnswer = triggerAnswer.TriggerId + '_' + triggerAnswer.AnswerId;

                    if (actualTriggerAnswersList.indexOf(triggerCompleteAnswer) >= 0) {
                        isDependencyMet = true;
                        var qa = getDependencyQuestion(tpq.Question, triggerAnswer.AnswerId);
                        var qtext = qa.Question;
                        var q = answersList[qtext];

                        if (q == null) {
                            q = [];
                            q.push(qa.Answer);
                        } else {
                            q.push(qa.Answer);
                        }

                        answersList[qtext] = q;
                    }
                }

                for (var p in answersList) {
                    if (!answersList.hasOwnProperty(p)) {
                        continue;
                    }

                    var valList = answersList[p];
                    dependencyText += p + ': ' + valList.join(',') + '\n';
                }

                return {
                    'Text': dependencyText,
                    'DependencyMet': isDependencyMet
                };
            }

            switch (triggerRequirement) {
                case 1:
                    var dep = getAllDependencyText(triggerAnswersListCustom, this.DependencyMetText, isDepMet);
                    isDepMet = dep.DependencyMet;
                    this.DependencyMetText = dep.Text;
                    break;

                case 2:
                    //For case All..
                    var isTextDependencymet = isDepMet;
                    isDepMet = contains(actualTriggerAnswersList, triggerAnswersList);

                    if (isTextDependency === true) {
                        isDepMet = isTextDependencymet && isDepMet;
                    }

                    if (isDepMet) {
                        var dep = getAllDependencyText(triggerAnswersListCustom, this.DependencyMetText, isDepMet);
                        this.DependencyMetText = dep.Text;
                    }

                    break;

                default:
                    break;
            }

            this.DependencyMetText = this.DependencyMetText.trim();
            this.IsDependencyMet = isDepMet;
            return isDepMet;
        }
    };
    return Question;
}]);
app.factory('ValuationQuestion', function () {
    function ValuationQuestion() { }

    ValuationQuestion.prototype = {
        setData: function setData(valuationQuestionSource) {
            this.Id = valuationQuestionSource.Id;
            this.Text = valuationQuestionSource.text;
            this.QuestionnaireId = valuationQuestionSource.questionnaireId;
            this.TypeCode = valuationQuestionSource.typeCode;
            this.IsRequired = valuationQuestionSource.isRequired;
            this.HelpLink = valuationQuestionSource.helpLink;
            this.HelpText = valuationQuestionSource.helpText;
            this.SortOrder = valuationQuestionSource.sortOrder;
            this.ValuationAnswerGroupId = valuationQuestionSource.valuationAnswerGroupId;
            this.ValuationAnswerOption = [];
        }
    };
    return ValuationQuestion;
});
app.factory('AnswerGroup', function () {
    //Constructor
    function AnswerGroup() { }

    AnswerGroup.prototype = {
        setData: function setData(answerGroupSource) {
            this.Id = answerGroupSource.Id;
            this.Name = answerGroupSource.name;
        }
    };
    return AnswerGroup;
});
app.factory('AnswerOption', function () {
    //Constructor
    function AnswerOption() { }

    AnswerOption.prototype = {
        setData: function setData(answerOptionSource) {
            this.Id = answerOptionSource.Id;
            this.QuestionId = answerOptionSource.questionId;
            this.AnswerGroupId = answerOptionSource.answerGroupId;
            this.Text = answerOptionSource.text;
            this.ImageFile = answerOptionSource.imageFileBase64;
            this.Value = answerOptionSource.value;
            this.SortOrder = answerOptionSource.sortOrder;
            this.ColourCode = answerOptionSource.colourCode;
            this.CommentRequired = answerOptionSource.commentRequired;
            this.FileAttachmentRequired = answerOptionSource.fileAttachmentRequired;
            this.CreatedDate = answerOptionSource.createdDate;
        }
    };
    return AnswerOption;
});
app.factory('ValuationAnswerOption', function () {
    //Constructor
    function ValuationAnswerOption() { }

    ValuationAnswerOption.prototype = {
        setData: function setData(valuationAnswerOptionSource) {
            this.Id = valuationAnswerOptionSource.Id;
            this.QuestionId = valuationAnswerOptionSource.questionId;
            this.AnswerGroupId = valuationAnswerOptionSource.answerGroupId;
            this.Text = valuationAnswerOptionSource.text;
            this.ImageFile = valuationAnswerOptionSource.imageFileBase64;
            this.Value = valuationAnswerOptionSource.value;
            this.SortOrder = valuationAnswerOptionSource.sortOrder;
            this.ColourCode = valuationAnswerOptionSource.colourCode;
            this.CommentRequired = valuationAnswerOptionSource.commentRequired;
            this.CreatedDate = valuationAnswerOptionSource.createdDate;
        }
    };
    return ValuationAnswerOption;
});
app.factory('UserDetails', function () {
    function UserDetails() { }

    UserDetails.prototype = {
        setData: function setData(userDetailsSource) {
            this.UserName = userDetailsSource.userName;
            this.Token = userDetailsSource.token;
            this.UserId = userDetailsSource.userId;
            this.FirstName = userDetailsSource.firstName;
            this.LastName = userDetailsSource.lastName;
            this.Email = userDetailsSource.email;
            this.PersonId = userDetailsSource.personId;
            this.PrimaryDepartmentId = userDetailsSource.primaryDepartmentId;
            this.LoggedInTimeStamp = userDetailsSource.loggedInTimeStamp;
            this.EmployeeNumber = userDetailsSource.employeeNumber;
            this.CompleteName = userDetailsSource.completeName;
            this.IsDepartmentManager = userDetailsSource.isDepartmentManager;
            this.PrimaryDepartmentName = userDetailsSource.primaryDepartmentName;
            this.ManagerId = userDetailsSource.managerId;
            this.ManagerCompleteName = userDetailsSource.managerCompleteName;
            this.UserPreferredLanguage = userDetailsSource.userPreferredLanguage;
            this.EnableOnlineDepartments = userDetailsSource.enableOnlineDepartments;
            this.EnableOnlinePersons = userDetailsSource.enableOnlinePersons;
            this.EnableOnlineAssets = userDetailsSource.enableOnlineAssets;
            this.EnableOnlineChemicals = userDetailsSource.enableOnlineChemicals;
            this.IsDemoUser = userDetailsSource.isDemoUser;
            this.NotificationSubscriptionTopics = userDetailsSource.notificationSubscriptionTopics;
            this.LocalNotificationTimeInterval = userDetailsSource.localNotificationTimeInterval;
            this.Departments = [];
        }
    };
    return UserDetails;
});
app.factory('UserApplications', function () {
    function UserApplications() { }

    UserApplications.prototype = {
        setData: function setData(userApplicationsSource) {
            var routeValue;
            this.UserId = userApplicationsSource.userId;
            this.ID = userApplicationsSource.Id;
            this.IncludeSubDepartments = userApplicationsSource.includeSubDepartments;
            this.IsApplicationModuleDisable = userApplicationsSource.isApplicationModuleDisable;
        }
    };
    return UserApplications;
});
app.factory('Application', function () {
    function Application() { }

    Application.prototype = {
        setData: function setData(userApplicationSource, applicationData) {
            var routeValue;
            this.ID = userApplicationSource.Id;
            this.Text = userApplicationSource.text;
            this.TranslatedText = userApplicationSource.translatedText;
            this.SortOrder = userApplicationSource.sortOrder;
            this.ImageLogoBase64 = userApplicationSource.imageLogoBase64;
            this.ColourCode = userApplicationSource.colourCode;
            this.ParentId = userApplicationSource.parentId;
            this.IconClass = userApplicationSource.iconClass;
            this.IsApplicationModuleDisable = applicationData.isApplicationModuleDisable;

            switch (this.Text) {
                case 'Askade':
                    routeValue = "app.akwTabs";
                    break;

                case 'ActionPlan':
                    routeValue = "app.apwTabs";
                    break;

                case 'Apv':
                    routeValue = "app.qTabs";
                    break;

                case 'RiskProfile':
                    routeValue = "app.rTabs";
                    break;

                case 'EmployeeSatisfaction':
                    routeValue = "app.eTabs";
                    break;

                case 'HumanResource':
                    routeValue = "app.hTabs";
                    break;

                case 'Administration':
                    routeValue = "app.aTabs";
                    break;

                case 'ManagementEvaluation':
                    routeValue = "app.mTabs";
                    break;

                case 'FrontPlanner':
                    routeValue = "app.fpTabs";
                    break;

                case 'Claim':
                    routeValue = "app.claimTabs";
                    break;
                // Need to clarify
                //case 'DocumentLibrary':
                //    routeValue = "app.documentLibraryTabs";
                //    break;
            }

            this.RouteValue = routeValue;
        }
    };
    return Application;
});
app.factory('ActionPlanWizard', function () {
    function ActionPlanWizard() { }

    ActionPlanWizard.prototype = {
        setData: function setData(actionPlanWizardSource) {
            this.Id = actionPlanWizardSource.Id;
            this.ColumnGuideCategoryId = actionPlanWizardSource.columnGuideCategoryId;
            this.Name = actionPlanWizardSource.name;
            this.Description = actionPlanWizardSource.description;
            this.TypeCode = actionPlanWizardSource.typeCode;
            this.NoOfAttachments = actionPlanWizardSource.noOfAttachments;
            this.ImageLogoBase64 = actionPlanWizardSource.imageLogoBase64;
            this.GroupBackColor = actionPlanWizardSource.groupBackColor;
            this.GroupForeColor = actionPlanWizardSource.groupForeColor;
            this.BackColor = actionPlanWizardSource.backColor;
            this.ForeColor = actionPlanWizardSource.foreColor;
            this.EnablePrint = actionPlanWizardSource.enablePrint;
            this.EnableEmail = actionPlanWizardSource.enableEmail;
            this.AutoUploadDelayInMinutes = actionPlanWizardSource.autoUploadDelayInMinutes;
            this.EnableEditGeoLocation = actionPlanWizardSource.enableEditGeoLocation;

            this.WizardSteps = [];
        }
    };
    return ActionPlanWizard;
});
app.factory('ActionPlanWizardStep', function () {
    function ActionPlanWizardStep() { }

    ActionPlanWizardStep.prototype = {
        setData: function setData(actionPlanWizardStepSource) {
            this.Id = actionPlanWizardStepSource.Id;
            this.ActionPlanWizardId = actionPlanWizardStepSource.actionPlanWizardId;
            this.Title = actionPlanWizardStepSource.title;
            this.Description = actionPlanWizardStepSource.description;
            this.SortOrder = actionPlanWizardStepSource.sortOrder;
            this.IsRequired = actionPlanWizardStepSource.isRequired;
            this.AssociationCode = actionPlanWizardStepSource.associationCode;
            this.ColumnGuide2Categories = actionPlanWizardStepSource.columnGuide2Categories;
            this.ColumnGuides = [];

            if (this.AssociationCode === "None") {
                this.IsContentAssociation = false;
            } else {
                this.IsContentAssociation = true;
            }

            this.IsMultiTaskStepValid = false;
            this.IsMultiTaskColumnsPresent = false;
            this.Columns = [];
        }
    };
    return ActionPlanWizardStep;
});
app.factory('ActionPlanWizardStepColumnGuide', function () {
    function ActionPlanWizardStepColumnGuide() { }

    ActionPlanWizardStepColumnGuide.prototype = {
        setData: function setData(actionPlanWizardStepColumnGuideSource) {
            this.Id = actionPlanWizardStepColumnGuideSource.Id;
            this.ApWizStepId = actionPlanWizardStepColumnGuideSource.apWizStepId;
            this.Text = actionPlanWizardStepColumnGuideSource.text;
            this.Description = actionPlanWizardStepColumnGuideSource.description;
            this.SortOrder = actionPlanWizardStepColumnGuideSource.sortOrder;
            this.IncludeQuotations = actionPlanWizardStepColumnGuideSource.includeQuotations;
        }
    };
    return ActionPlanWizardStepColumnGuide;
});
app.factory('ActionPlanWizardStepColumn', function () {
    function ActionPlanWizardStepColumn() { }

    ActionPlanWizardStepColumn.prototype = {
        setData: function setData(actionPlanWizardStepColumnSource) {
            this.Id = actionPlanWizardStepColumnSource.Id;
            this.ActionPlanWizardStepId = actionPlanWizardStepColumnSource.actionPlanWizardStepId;
            this.Text = actionPlanWizardStepColumnSource.text;
            this.TranslatedText = actionPlanWizardStepColumnSource.translatedText;
            this.SortOrder = actionPlanWizardStepColumnSource.sortOrder;
            this.ImageLogoBase64 = actionPlanWizardStepColumnSource.imageLogoBase64;
            this.ColourCode = actionPlanWizardStepColumnSource.colourCode;
            this.ParentId = actionPlanWizardStepColumnSource.parentId;
            this.ColumnType = actionPlanWizardStepColumnSource.columnType;
            this.IsRequired = actionPlanWizardStepColumnSource.isMandatory;
            this.IsDateMaximumToday = actionPlanWizardStepColumnSource.isDateMaximumToday;
            this.DefaultValue = actionPlanWizardStepColumnSource.defaultValue;
            this.IsMultiTaskColumn = false;
            this.EnableQRCodeReader = actionPlanWizardStepColumnSource.enableQRCodeReader;

            if (this.Text.indexOf("MultiTask") !== -1) {
                this.IsMultiTaskColumn = true;
            }
        }
    };
    return ActionPlanWizardStepColumn;
});
app.factory('PersonActionPlanWizard', ['$cordovaFile', 'DateUtil', function ($cordovaFile, DateUtil) {
    function PersonActionPlanWizard() { }

    PersonActionPlanWizard.prototype = {
        setData: function setData(personActionPlanWizardSource) {
            this.Id = personActionPlanWizardSource.Id;
            this.ColumnGuideCategoryId = personActionPlanWizardSource.columnGuideCategoryId;
            this.Title = personActionPlanWizardSource.title;
            this.PersonId = personActionPlanWizardSource.personId;
            this.AnsweringInProgress = personActionPlanWizardSource.answeringInProgress;
            this.AnsweringCompleted = personActionPlanWizardSource.answeringCompleted;
            this.CreatedDate = personActionPlanWizardSource.meta.created;
            this.IsTemplate = false;
            this.GeoX = personActionPlanWizardSource.geoX;
            this.GeoY = personActionPlanWizardSource.geoY;
            this.Address = personActionPlanWizardSource.address;

            if (personActionPlanWizardSource.meta.updated != null) {
                var date = new Date(personActionPlanWizardSource.meta.updated);
                var formatedCompleteDate = DateUtil.getFormattedValue(date, 'dateTime');
                this.CompletedDate = formatedCompleteDate;
            } else {
                var date = new Date(personActionPlanWizardSource.meta.created);
                var formatedCompleteDate = DateUtil.getFormattedValue(date, 'dateTime');
                this.CompletedDate = formatedCompleteDate;
            }

            if (angular.isUndefined(personActionPlanWizardSource.lastAnsweredStepIndex)) {
                this.LastAnsweredStepIndex = null;
            } else {
                this.LastAnsweredStepIndex = personActionPlanWizardSource.lastAnsweredStepIndex;
            }

            this.Wizard = null;
            this.WizardId = null;
            this.ColumnValues = [];
            this.Attachments = [];
            this.MultiTaskSolutions = [];
            this.UploadInProgress = false;
            this.UploadFail = false;
        },
        hasDelayElapsed: function () {
            if (!this.CompletedDate) {
                return false;
            }

            var delayInMinutes = this.Wizard.AutoUploadDelayInMinutes;
            if (!delayInMinutes) {
                return true;
            }
            //timestamp
            var completedDateTimeStamp = moment(this.CompletedDate, [
                "DD-MM-YYYY hh:mm:ss",
            ])
                .add(delayInMinutes, "minutes")
                .valueOf();
            var elaspedTimeInSeconds = (completedDateTimeStamp - Date.now()) / 1000;
            return elaspedTimeInSeconds <= 0;
        },
        prepareAttachments: function prepareAttachments() {
            var instance = this;
            var pApwArray = [];

            for (var i = 0; i < this.Attachments.length; i++) {
                var pApwAttach = this.Attachments[i];
                var fileName = pApwAttach.FileName;

                if (fileName != null) {
                    var directoryPath = pApwAttach.FileLocation.replace(fileName, '');
                    var attachPromise = $cordovaFile.readAsDataURL(directoryPath, fileName);
                    pApwArray.push({
                        'pAttachId': pApwAttach.Id,
                        'AttachPromise': attachPromise
                    });
                }
            }

            return pApwArray;
        }
    };
    return PersonActionPlanWizard;
}]);
app.factory('PersonActionPlanWizardTemplate', ['$cordovaFile', 'DateUtil', function ($cordovaFile, DateUtil) {
    function PersonActionPlanWizard() { }

    PersonActionPlanWizard.prototype = {
        setData: function setData(personActionPlanWizardSource) {
            this.Id = personActionPlanWizardSource.Id;
            this.ColumnGuideCategoryId = personActionPlanWizardSource.columnGuideCategoryId;
            this.Title = personActionPlanWizardSource.title;
            this.PersonId = personActionPlanWizardSource.personId;
            this.AnsweringInProgress = personActionPlanWizardSource.answeringInProgress;
            this.AnsweringCompleted = personActionPlanWizardSource.answeringCompleted;
            this.CreatedDate = personActionPlanWizardSource.meta.created;
            this.IsTemplate = false;
            this.GeoX = personActionPlanWizardSource.geoX;
            this.GeoY = personActionPlanWizardSource.geoY;
            this.Address = personActionPlanWizardSource.address;

            if (personActionPlanWizardSource.meta.updated != null) {
                var date = new Date(personActionPlanWizardSource.meta.updated);
                var formatedCompleteDate = DateUtil.getFormattedValue(date, 'dateTime');
                this.CompletedDate = formatedCompleteDate;
            } else {
                var date = new Date(personActionPlanWizardSource.meta.created);
                var formatedCompleteDate = DateUtil.getFormattedValue(date, 'dateTime');
                this.CompletedDate = formatedCompleteDate;
            }

            if (angular.isUndefined(personActionPlanWizardSource.lastAnsweredStepIndex)) {
                this.LastAnsweredStepIndex = null;
            } else {
                this.LastAnsweredStepIndex = personActionPlanWizardSource.lastAnsweredStepIndex;
            }

            this.Wizard = null;
            this.WizardId = null;
            this.ColumnValues = [];
            this.Attachments = [];
            this.UploadInProgress = false;
            this.UploadFail = false;
        },
        prepareAttachments: function prepareAttachments() {
            var instance = this;
            var pApwArray = [];

            for (var i = 0; i < this.Attachments.length; i++) {
                var pApwAttach = this.Attachments[i];
                var fileName = pApwAttach.FileName;

                if (fileName != null) {
                    var directoryPath = pApwAttach.FileLocation.replace(fileName, '');
                    var attachPromise = $cordovaFile.readAsDataURL(directoryPath, fileName);
                    pApwArray.push({
                        'pAttachId': pApwAttach.Id,
                        'AttachPromise': attachPromise
                    });
                }
            }

            return pApwArray;
        }
    };
    return PersonActionPlanWizard;
}]);
app.factory('PersonActionPlanWizardStepAnswer', function () {
    function PersonActionPlanWizardStepAnswer() { }

    PersonActionPlanWizardStepAnswer.prototype = {
        setData: function setData(personApwStepAnswerSource) {
            this.Id = personApwStepAnswerSource.Id;
            this.ColumnId = personApwStepAnswerSource.columnId;
            this.AnswerId = personApwStepAnswerSource.answerId;
            this.IsBooleanField = parseInt(this.AnswerId);
            this.AnswerText = personApwStepAnswerSource.answerText;
            this.AnswerDate = personApwStepAnswerSource.answerDate;
            this.WizardStepId = personApwStepAnswerSource.wizardStepId;
            this.DefaultValue = personApwStepAnswerSource.defaultValue;
            this.ColumnGuides = [];
            this.IsColumnGuide = false;
        }
    };
    return PersonActionPlanWizardStepAnswer;
});
app.factory('PersonActionPlanWizardStepAnswerTemplate', function () {
    function PersonActionPlanWizardStepAnswer() { }

    PersonActionPlanWizardStepAnswer.prototype = {
        setData: function setData(personApwStepAnswerSource) {
            this.Id = personApwStepAnswerSource.Id;
            this.ColumnId = personApwStepAnswerSource.columnId;
            this.AnswerId = personApwStepAnswerSource.answerId;
            this.IsBooleanField = parseInt(this.AnswerId);
            this.AnswerText = personApwStepAnswerSource.answerText;
            this.AnswerDate = personApwStepAnswerSource.answerDate;
            this.WizardStepId = personApwStepAnswerSource.wizardStepId;
            this.DefaultValue = personApwStepAnswerSource.defaultValue;
            this.ColumnGuides = [];
            this.IsColumnGuide = false;
        }
    };
    return PersonActionPlanWizardStepAnswer;
});
app.factory('PersonActionPlanColumnGuideAnswer', function () {
    function PersonActionPlanColumnGuideAnswer() { }

    PersonActionPlanColumnGuideAnswer.prototype = {
        setData: function setData(guideData) {
            this.GuideId = guideData.Id;
            this.ActionPlanWizStepId = guideData.apWizStepId;
            this.AnswerText = null;
        }
    };
    return PersonActionPlanColumnGuideAnswer;
});
app.factory('PersonActionPlanMultiTask', function () {
    function PersonActionPlanMultiTask() { }

    PersonActionPlanMultiTask.prototype = {
        setData: function setData(personApwMultiTaskSource) {
            this.Id = personApwMultiTaskSource.Id;
            this.UniqueId = personApwMultiTaskSource.$loki;
            this.PersonAPWId = personApwMultiTaskSource.newActionPlanEntityId;
            this.WizardStepId = personApwMultiTaskSource.wizardStepId;
            this.Scope = personApwMultiTaskSource.scope;
            this.SolutionText = personApwMultiTaskSource.solution;
            this.DeadlineDate = personApwMultiTaskSource.deadLine;
            this.ApprovedDate = personApwMultiTaskSource.approvedDate;
            this.ResponsiblePersonId = personApwMultiTaskSource.assignedToId;
            this.IsEmptyMultiTask = personApwMultiTaskSource.isEmptyMultiTask;
            this.DefaultValue = personApwMultiTaskSource.defaultValue; //this.DefaultValueId = personApwMultiTaskSource.defaultValueId;

            this.Attachments = [];
        }
    };
    return PersonActionPlanMultiTask;
});
app.factory('PersonActionPlanMultiTaskAttachment', function () {
    function PersonActionPlanMultiTaskAttachment() { }

    PersonActionPlanMultiTaskAttachment.prototype = {
        setData: function setData(personApwMultiTaskAttachmentSrc) {
            this.Id = personApwMultiTaskAttachmentSrc.Id;
            this.MultiTaskId = personApwMultiTaskAttachmentSrc.multiTaskEntityId;
            this.FileName = personApwMultiTaskAttachmentSrc.fileName;
            this.FileLocation = personApwMultiTaskAttachmentSrc.fileLocation;
            this.FileSourceBase64 = personApwMultiTaskAttachmentSrc.fileSourceBase64;
            this.FileHeader = personApwMultiTaskAttachmentSrc.fileHeader; //Only removes the filelocation..
            this.InternalFileLocation = personApwMultiTaskAttachmentSrc.internalFileLocation;
            this.MarkedForDelete = false;
            this.IsSavedToDb = personApwMultiTaskAttachmentSrc.isSavedToDb;
        }
    };
    return PersonActionPlanMultiTaskAttachment;
});
app.factory('PersonActionPlanWizardAttachment', function () {
    function PersonActionPlanWizardAttachment() { }

    PersonActionPlanWizardAttachment.prototype = {
        setData: function setData(personActionPlanWizardStepAnswer) {
            this.Id = personActionPlanWizardStepAnswer.Id;
            this.FileName = personActionPlanWizardStepAnswer.fileName;
            this.FileLocation = personActionPlanWizardStepAnswer.fileLocation;
            this.FileSourceBase64 = personActionPlanWizardStepAnswer.fileSourceBase64;
            this.FileHeader = personActionPlanWizardStepAnswer.fileHeader; //Only removes the filelocation..
            this.InternalFileLocation = personActionPlanWizardStepAnswer.internalFileLocation;
            this.MarkedForDelete = false;
        }
    };
    return PersonActionPlanWizardAttachment;
});
app.factory('PersonActionPlanWizardAttachmentTemplate', function () {
    function PersonActionPlanWizardAttachmentTemplate() { }

    PersonActionPlanWizardAttachmentTemplate.prototype = {
        setData: function setData(personActionPlanWizardStepAnswer) {
            this.Id = personActionPlanWizardStepAnswer.Id;
            this.FileName = personActionPlanWizardStepAnswer.fileName;
            this.FileLocation = personActionPlanWizardStepAnswer.fileLocation;
            this.FileSourceBase64 = personActionPlanWizardStepAnswer.fileSourceBase64;
            this.InternalFileLocation = personActionPlanWizardStepAnswer.internalFileLocation;
            this.FileHeader = personActionPlanWizardStepAnswer.fileHeader; //Only removes the filelocation..

            this.MarkedForDelete = false;
        }
    };
    return PersonActionPlanWizardAttachmentTemplate;
});
app.factory('Department', function () {
    function Department() { }

    Department.prototype = {
        setData: function setData(departmentSource) {
            this.Id = departmentSource.Id;
            this.Text = departmentSource.text.replace(new RegExp('-->', 'g'), String.fromCharCode(10143));
            this.DisplayText = this.getDeptDisplayText(this.Text);
            this.Level = departmentSource.level;
            this.ParentId = departmentSource.parentId;
            this.IsSubEntity = departmentSource.isSubEntity;
            this.Height = "70";
        },
        getDeptDisplayText: function getDeptDisplayText(completeText) {
            var str = completeText;
            var indices = [];

            for (var i = 0; i < str.length; i++) {
                if (str[i] === String.fromCharCode(10143)) indices.push(i);
            }

            if (indices.length > 1) {
                var stringCutLength = this.getDeviceScreenWidth();
                var lastTwoStrings = completeText.slice(completeText.lastIndexOf(String.fromCharCode(10143), completeText.lastIndexOf(String.fromCharCode(10143)) - 1));
                var splitString = lastTwoStrings.split(String.fromCharCode(10143));
                var vala, valb; // Some times ' --> ' will be the first character of the string, so to handle this scenario
                // both in 0 and 1 position of the array split string is handled.

                if (splitString[0]) {
                    vala = splitString[0].substring(0, stringCutLength) + String.fromCharCode(10143);
                    valb = vala + splitString[1];
                } else if (splitString[1]) {
                    vala = splitString[1].substring(0, stringCutLength) + String.fromCharCode(10143);
                    valb = vala + splitString[2];
                }

                return valb;
            } else {
                return completeText;
            }
        },
        getDeviceScreenWidth: function getDeviceScreenWidth() {
            var screenWidth = screen.width;

            if (screenWidth < 360) {
                return 8;
            } else if (screenWidth > 360 && screenWidth < 500) {
                return 10;
            } else if (screenWidth > 500 && screenWidth < 750) {
                return 12;
            } else if (screenWidth > 750 && screenWidth < 1000) {
                return 14;
            } else {
                return 16;
            }
        }
    };
    return Department;
});
app.factory('Customers', function () {
    function Customers() { }

    Customers.prototype = {
        setData: function setData(customersSource) {
            this.CustomerID = customersSource.custId;
            this.Title = customersSource.title;
            this.CustomerName = customersSource.customerName;
            this.FrontPageText = customersSource.frontPageText;
            this.ImageLogoBase64 = customersSource.imageLogoBase64;
            this.ColourCode = customersSource.colourCode;
            this.BgColourCode = customersSource.bgColourCode;
            this.DarkBgColourCode = customersSource.darkBgColourCode;
            this.DarkHeaderColourCode = customersSource.darkHeaderColourCode;
            this.DarkTileColourCode = customersSource.darkTileColourCode;
            this.DarkButtonColourCode = customersSource.darkButtonColourCode;
            this.DarkTextColourCode = customersSource.darkTextColourCode;
            this.OnlineVal = customersSource.onlineVal;
            this.UniqueUrlPart = customersSource.uniqueUrlPart;
            this.IsDarkModeEnable = customersSource.isDarkModeEnable;
            this.IsAutoSyncEnabled = customersSource.isAutoSyncEnabled;
            this.ButtonBgColour = customersSource.buttonBackColour;
            this.CameraImageQuality = customersSource.cameraImageQuality; // Default setting value to false, future web API can return the value;

            this.SaveImageToGallery = customersSource.saveImageToGallery;
            this.IsPasswordSaveEnabled = customersSource.isPasswordSaveEnabled;
            this.IsDemoCustomer = customersSource.isDemoCustomer;
            this.VersionInfo = customersSource.versionInfo;
            this.SupportMail = customersSource.supportMail;
            this.CKey = customersSource.cKey;
            this.EnableGeoLocation = customersSource.enableGeoLocation;
            this.EnableHighAccuracyForGeoLocation = customersSource.enableHighAccuracyForGeoLocation;
            this.GeoLocationTimeout = customersSource.geoLocationTimeout;
            this.DisableLoginPanel = customersSource.disableLoginPanel;

            if (customersSource.isCustomUrlEnabled) this.EnvironmentName = customersSource.customUrl;
            else this.EnvironmentName = this.OnlineVal.toUpperCase() + ' / ' + this.UniqueUrlPart.toUpperCase();

            this.IsReadAloudTextEnable = customersSource.isReadAloudTextEnable;
            this.IsTileDisplayEnable = customersSource.isTileDisplayEnable;
            this.DisableFavoritesGuideDisplay = customersSource.disableFavoritesGuide;
            this.NextUpdate = customersSource.nextUpdate; // nextUpdate check code can be removed once Web API sends the number of days
            this.ReadAloudSpeed = customersSource.readAloudSpeed;

            if (!customersSource.nextUpdate) {
                this.NextUpdate = 10;
            }

            this.DisableReadImageFromPhotoLibary = customersSource.disableReadImageFromPhotoLibary;
            this.EnableTreeView = customersSource.enableTreeView;
            this.EnableNextAutoUpdate = customersSource.enableNextAutoUpdate;
            this.DisableUserSetting = customersSource.disableUserSetting;
            this.DisplayFavorites = customersSource.displayFavorites;
            this.EnableNews = customersSource.enableNews;
            this.AutoUploadDelayInMinutes = customersSource.autoUploadDelayInMinutes;
            this.EnableDocumentTreeView = customersSource.enableDocumentTreeView;
            this.IsCustomUrlEnabled = customersSource.isCustomUrlEnabled;
            this.CustomUrl = customersSource.customUrl;
            this.AllowedExtensions = customersSource.allowedExtensions;
            this.SpecialCharactersToMask = customersSource.specialCharactersToMask;
            this.IsCustomDatePickerEnabledForSurveyHistory = customersSource.isCustomDatePickerEnabledForSurveyHistory;
            this.AiAssistanceGlobalLink = customersSource.aiAssistanceGlobalLink;
            this.IsSurveyEnabled = customersSource.isSurveyEnabled;
            this.IsQrCodeForAssetDocEnabled = customersSource.isQrCodeForAssetDocEnabled;
            this.IsSSOEnabled = customersSource.isSSOEnabled;
        }
    };
    return Customers;
});
app.factory('LanguageResourceLabel', function () {
    function LanguageResourceLabel() { }

    LanguageResourceLabel.prototype = {
        setData: function setData(id, languageResourceData) {
            if (languageResourceData !== null) {
                this.ResourceId = languageResourceData.resourceId;
                this.ResourceText = languageResourceData.resourceText;
                this.DefaultText = languageResourceData.defaultText;
            } else {
                this.ResourceId = id;
                this.ResourceText = null;
                this.DefaultText = null;
            }
        }
    };
    return LanguageResourceLabel;
});
app.factory('PreferredLanguage', function () {
    function PreferredLanguage() { }

    PreferredLanguage.prototype = {
        setData: function setData(preferredLang) {
            this.PreferredLanguage = preferredLang;
        }
    };
    return PreferredLanguage;
});
app.factory('Icons', function () {
    function Icons() { }

    Icons.prototype = {
        setData: function setData(id, iconsData) {
            this.IconId = iconsData.iconId;
            this.IconText = iconsData.iconText;
            this.DefaultIcon = iconsData.defaultIcon;
        }
    };
    return Icons;
});
app.factory('QuestionTrigger', function () {
    function QuestionTrigger() { }

    QuestionTrigger.prototype = {
        setData: function setData(qtData) {
            this.QuestionId = qtData.questionId;
            this.TriggerQuestionId = qtData.triggerQuestionId;
            this.TriggerAnswerId = qtData.triggerAnswerId;
            this.TriggerAnswerTextCode = qtData.triggerAnswerTextCode;
        }
    };
    return QuestionTrigger;
});
/* Gen code */

app.factory('Category', function () {
    function Category() { }

    Category.prototype = {
        setData: function setData(categorySource) {
            this.Id = categorySource.Id;
            this.Text = categorySource.text;
            this.Height = "50";
        }
    };
    return Category;
});
app.factory('Status', function () {
    function Status() { }

    Status.prototype = {
        setData: function setData(statusSource) {
            this.Id = statusSource.Id;
            this.Text = statusSource.text;
            this.Height = "50";
        }
    };
    return Status;
});
app.factory('Probability', function () {
    function Probability() { }

    Probability.prototype = {
        setData: function setData(probabilitySource) {
            this.Id = probabilitySource.Id;
            this.Text = probabilitySource.text;
            this.Height = "50";
        }
    };
    return Probability;
});
app.factory('Consequence', function () {
    function Consequence() { }

    Consequence.prototype = {
        setData: function setData(consequenceSource) {
            this.Id = consequenceSource.Id;
            this.Text = consequenceSource.text;
            this.Height = "50";
        }
    };
    return Consequence;
});
app.factory('Priority', function () {
    function Priority() { }

    Priority.prototype = {
        setData: function setData(prioritySource) {
            this.Id = prioritySource.Id;
            this.Text = prioritySource.text;
            this.Height = "50";
        }
    };
    return Priority;
});
app.factory('ProblemArea', function () {
    function ProblemArea() { }

    ProblemArea.prototype = {
        setData: function setData(problemAreaSource) {
            this.Id = problemAreaSource.Id;
            this.Text = problemAreaSource.text;
            this.Height = "70";
        }
    };
    return ProblemArea;
});
app.factory('LineOfBusiness', function () {
    function LineOfBusiness() { }

    LineOfBusiness.prototype = {
        setData: function setData(lineOfBusinessSource) {
            this.Id = lineOfBusinessSource.Id;
            this.Text = lineOfBusinessSource.text;
            this.Height = "50";
        }
    };
    return LineOfBusiness;
});
app.factory('Person', function () {
    function Person() { }

    Person.prototype = {
        setData: function setData(personSource) {
            this.Id = personSource.Id;
            this.Text = personSource.text;
            this.IsOwner = personSource.isOwner;
            this.IsMyManager = personSource.isMyManager;
            this.IsResponsible = personSource.isResponsible;
            this.IsPointOfView = personSource.isPointOfView;
            this.IsSubEntity = personSource.isSubEntity;
            this.IsFileUser = personSource.isFileUser;
            this.IsFile = personSource.isFile;
            this.Height = "50";
        }
    };
    return Person;
});
app.factory('SafetyDepartment', function () {
    function SafetyDepartment() { }

    SafetyDepartment.prototype = {
        setData: function setData(safetyDepartmentSource) {
            this.Id = safetyDepartmentSource.Id;
            this.Text = safetyDepartmentSource.text;
            this.Height = "70";
        }
    };
    return SafetyDepartment;
});
app.factory('Process', function () {
    function Process() { }

    Process.prototype = {
        setData: function setData(processSource) {
            this.Id = processSource.Id;
            this.Text = processSource.text;
            this.Height = "50";
        }
    };
    return Process;
});
app.factory('GeographyLocation', function () {
    function GeographyLocation() { }

    GeographyLocation.prototype = {
        setData: function setData(GeographyLocationSource) {
            this.Id = GeographyLocationSource.Id;
            this.Text = GeographyLocationSource.text;
            this.Height = "50";
        }
    };
    return GeographyLocation;
});
app.factory('Asset', function () {
    function Asset() { }

    Asset.prototype = {
        setData: function setData(assetSource) {
            this.Id = assetSource.Id;
            this.Text = assetSource.text;
            this.Height = "50";
            this.Filter = assetSource.filter;
        }
    };
    return Asset;
});
app.factory('Chemical', function () {
    function Chemical() { }

    Chemical.prototype = {
        setData: function setData(chemicalSource) {
            this.Id = chemicalSource.Id;
            this.Text = chemicalSource.text;
            this.Height = "50";
            this.Filter = chemicalSource.filter;
        }
    };
    return Chemical;
});
app.factory('Activity', function () {
    function Activity() { }

    Activity.prototype = {
        setData: function setData(activitySource) {
            this.Id = activitySource.Id;
            this.Text = activitySource.text;
            this.Height = "50";
        }
    };
    return Activity;
});
app.factory('ActivityModule', function () {
    function ActivityModule() { }

    ActivityModule.prototype = {
        setData: function setData(activityModuleSource) {
            this.Id = activityModuleSource.Id;
            this.Text = activityModuleSource.text;
            this.Height = "50";
        }
    };
    return ActivityModule;
});
app.factory('ControlLevel', function () {
    function ControlLevel() { }

    ControlLevel.prototype = {
        setData: function setData(controlLevelSource) {
            this.Id = controlLevelSource.Id;
            this.Text = controlLevelSource.text;
            this.Height = "50";
        }
    };
    return ControlLevel;
});
app.factory('CustomerFieldValue1', function () {
    function CustomerFieldValue1() { }

    CustomerFieldValue1.prototype = {
        setData: function setData(customerFieldValue1Source) {
            this.Id = customerFieldValue1Source.Id;
            this.Text = customerFieldValue1Source.text;
            this.Height = "50";
        }
    };
    return CustomerFieldValue1;
});
app.factory('CustomerFieldValue2', function () {
    function CustomerFieldValue2() { }

    CustomerFieldValue2.prototype = {
        setData: function setData(customerFieldValue2Source) {
            this.Id = customerFieldValue2Source.Id;
            this.Text = customerFieldValue2Source.text;
            this.Height = "50";
        }
    };
    return CustomerFieldValue2;
});
app.factory('CustomerFieldValue3', function () {
    function CustomerFieldValue3() { }

    CustomerFieldValue3.prototype = {
        setData: function setData(customerFieldValue3Source) {
            this.Id = customerFieldValue3Source.Id;
            this.Text = customerFieldValue3Source.text;
            this.Height = "50";
        }
    };
    return CustomerFieldValue3;
});
app.factory('CustomerListValue1', function () {
    function CustomerListValue1() { }

    CustomerListValue1.prototype = {
        setData: function setData(customerListValue1Source) {
            this.Id = customerListValue1Source.Id;
            this.Text = customerListValue1Source.text;
            this.Height = "50";
        }
    };
    return CustomerListValue1;
});
app.factory('CustomerListValue2', function () {
    function CustomerListValue2() { }

    CustomerListValue2.prototype = {
        setData: function setData(customerListValue2Source) {
            this.Id = customerListValue2Source.Id;
            this.Text = customerListValue2Source.text;
            this.Height = "50";
        }
    };
    return CustomerListValue2;
});
app.factory('CustomerListValue3', function () {
    function CustomerListValue3() { }

    CustomerListValue3.prototype = {
        setData: function setData(customerListValue3Source) {
            this.Id = customerListValue3Source.Id;
            this.Text = customerListValue3Source.text;
            this.Height = "50";
        }
    };
    return CustomerListValue3;
});
app.factory('Owner', function () {
    function Owner() { }

    Owner.prototype = {
        setData: function setData(ownerSource) {
            this.Id = ownerSource.Id;
            this.Text = ownerSource.text;
            this.Height = "50";
        }
    };
    return Owner;
});
app.factory('Manager', function () {
    function Manager() { }

    Manager.prototype = {
        setData: function setData(managerSource) {
            this.Id = managerSource.Id;
            this.Text = managerSource.text;
            this.SortOrder = managerSource.$loki;
            this.Height = "50";
        }
    };
    return Manager;
});
app.factory('EasyClassification', function () {
    function EasyClassification() { }

    EasyClassification.prototype = {
        setData: function setData(ecSource) {
            if (ecSource.dataTypeId === "34" || ecSource.dataTypeId === "1479") {
                this.Id = ecSource.Id;
                this.DataTypeId = ecSource.dataTypeId;
                this.Text = ecSource.text;
                this.Code = ecSource.code;
                this.ParentCode = ecSource.parentCode;
                this.IsSelectable = ecSource.isSelectable;
                this.Height = "70";
            }
            else {
                this.Id = ecSource.Id;
                this.DataTypeId = ecSource.dataTypeId;
                this.Text = ecSource.text;
            }
        }
    };
    return EasyClassification;
});
app.factory('VehicleDamage', function () {
    function VehicleDamage() { }

    VehicleDamage.prototype = {
        setData: function setData(ecSource) {
            this.Id = ecSource.Id;
            this.DataTypeId = ecSource.dataTypeId;
            this.Text = ecSource.text;
        }
    };
    return VehicleDamage;
});
app.factory('ListValue', function () {
    function ListValue() { }

    ListValue.prototype = {
        setData: function setData(listValueSource) {
            this.Id = listValueSource.Id;
            this.DataTypeId = listValueSource.dataTypeId;
            this.Text = listValueSource.text;
            this.sortOrder = listValueSource.sortOrder;
            this.Height = "50";
        }
    };
    return ListValue;
});
app.factory('City', function () {
    function City() { }

    City.prototype = {
        setData: function setData(citySource) {
            this.Id = citySource.Id;
            this.Text = citySource.text;
            this.Height = "50";
        }
    };
    return City;
});
app.factory('Country', function () {
    function Country() { }

    Country.prototype = {
        setData: function setData(countrySource) {
            this.Id = countrySource.Id;
            this.Text = countrySource.text;
            this.Height = "50";
        }
    };
    return Country;
}); //Askade DataModels..

app.factory('AskadeFileTypeWizard', function () {
    function AskadeFileTypeWizard() { }

    AskadeFileTypeWizard.prototype = {
        getModuleName: function getModuleName(typeCode) {
            switch (typeCode) {
                case 8:
                    return 'Askade';

                case 13:
                    return 'Claim';

                default:
                    return -1;
            }
        },
        setData: function setData(askadeFileTypeWizardSource) {
            this.FileTypeId = askadeFileTypeWizardSource.Id;
            this.ColumnGuideFileTypeId = askadeFileTypeWizardSource.columnGuideFileTypeId;
            this.Name = askadeFileTypeWizardSource.name;
            this.TypeCode = askadeFileTypeWizardSource.typeCode;

            this.ModuleName = function () {
                return this.getModuleName(this.TypeCode);
            };

            this.NoOfAttachments = askadeFileTypeWizardSource.noOfAttachments;
            this.ImageFileBase64 = askadeFileTypeWizardSource.imageFileBase64;
            this.GroupBackColor = askadeFileTypeWizardSource.groupBackColor;
            this.GroupForeColor = askadeFileTypeWizardSource.groupForeColor;
            this.BackColor = askadeFileTypeWizardSource.backColor;
            this.ForeColor = askadeFileTypeWizardSource.foreColor;
            this.EnableEmail = askadeFileTypeWizardSource.enableEmail;
            this.EnablePrint = askadeFileTypeWizardSource.enablePrint;
            this.AutoUploadDelayInMinutes = askadeFileTypeWizardSource.autoUploadDelayInMinutes;
            this.EnableEditGeoLocation = askadeFileTypeWizardSource.enableEditGeoLocation;
            this.Steps = [];
        }
    };
    return AskadeFileTypeWizard;
});
app.factory('AskadeFileTypeWizardStep', function () {
    function AskadeFileTypeWizardStep() { }

    AskadeFileTypeWizardStep.prototype = {
        setData: function setData(askadeFileTypeWizardStepSource) {
            this.Id = askadeFileTypeWizardStepSource.Id;
            this.Name = askadeFileTypeWizardStepSource.name;
            this.Description = askadeFileTypeWizardStepSource.description;
            this.SortOrder = askadeFileTypeWizardStepSource.sortOrder;
            this.FileTypeId = askadeFileTypeWizardStepSource.fileTypeId;
            this.Columns = [];
        },
        isStepDependencyMet: function stepDependencyMet() {
            var isDependencyMet = false;
            for (var i = 0; i < this.Columns.length; i++) {
                var stepColumn = this.Columns[i];
                if (stepColumn.IsDependencyMet === true) {
                    return true;
                }
            }
            return isDependencyMet;
        }
    };
    return AskadeFileTypeWizardStep;
});
app.factory('AskadeFileTypeWizardStepColumn', function () {
    function AskadeFileTypeWizardStepColumn() { }

    AskadeFileTypeWizardStepColumn.prototype = {
        setData: function setData(askadeFileTypeWizardStepColumnSource) {
            this.FileColumnId = askadeFileTypeWizardStepColumnSource.Id;
            this.FileTypeWizardStepId = askadeFileTypeWizardStepColumnSource.fileTypeWizardStepId;
            this.Text = askadeFileTypeWizardStepColumnSource.text;
            this.HelpText = askadeFileTypeWizardStepColumnSource.helpText;
            this.SortOrder = askadeFileTypeWizardStepColumnSource.sortOrder;
            this.ColumnType = askadeFileTypeWizardStepColumnSource.columnType;
            this.DataTypeId = askadeFileTypeWizardStepColumnSource.dataTypeId;
            this.IsMandatory = askadeFileTypeWizardStepColumnSource.isMandatory;
            this.EnableQRCodeReader = askadeFileTypeWizardStepColumnSource.enableQRCodeReader;
            this.IsDateDefaultToday = askadeFileTypeWizardStepColumnSource.isDateDefaultToday;
            this.IsDateMaximumToday = askadeFileTypeWizardStepColumnSource.isDateMaximumToday;
            this.ColumnSubType = askadeFileTypeWizardStepColumnSource.columnSubType;
            this.ColumnGuides2FileTypes = askadeFileTypeWizardStepColumnSource.columnGuides2FileTypes;
            this.ColumnGuides = [];
            this.DisableSearch = askadeFileTypeWizardStepColumnSource.disableSearch;

            this.DependantFileColumnId = askadeFileTypeWizardStepColumnSource.dependantFileColumnId;
            this.DependantFileColumnValues = askadeFileTypeWizardStepColumnSource.dependantFileColumnValues;
            this.IsDependencyMet = true;
        }
    };
    return AskadeFileTypeWizardStepColumn;
});
app.factory('AskadeFileTypeWizardStepColumnGuide', function () {
    function AskadeFileTypeWizardStepColumnGuide() { }

    AskadeFileTypeWizardStepColumnGuide.prototype = {
        setData: function setData(askadeFileTypeWizardStepColumnGuideSource) {
            this.Id = askadeFileTypeWizardStepColumnGuideSource.Id;
            this.AskWizFileColumnId = askadeFileTypeWizardStepColumnGuideSource.askWizFileColumnId;
            this.AskWizFileTypeId = askadeFileTypeWizardStepColumnGuideSource.askWizFileTypeId;
            this.Text = askadeFileTypeWizardStepColumnGuideSource.text;
            this.Description = askadeFileTypeWizardStepColumnGuideSource.description;
            this.SortOrder = askadeFileTypeWizardStepColumnGuideSource.sortOrder;
            this.IncludeQuotations = askadeFileTypeWizardStepColumnGuideSource.includeQuotations;
        }
    };
    return AskadeFileTypeWizardStepColumnGuide;
});
app.factory('PersonAskadeFileTypeWizardAttachmentTemplate', function () {
    function PersonAskadeFileTypeWizardAttachmentTemplate() { }

    PersonAskadeFileTypeWizardAttachmentTemplate.prototype = {
        setData: function setData(askadeFileTypeWizardAttachmentSource) {
            this.Id = askadeFileTypeWizardAttachmentSource.Id;
            this.PersonAskadeFileTypeWizardId = askadeFileTypeWizardAttachmentSource.personAskadeFileTypeWizardId;
            this.FileName = askadeFileTypeWizardAttachmentSource.fileName;
            this.FileSourceBase64 = askadeFileTypeWizardAttachmentSource.fileSourceBase64;
            this.FileHeader = askadeFileTypeWizardAttachmentSource.fileHeader; // Check for bot undefined or null else assign the retrieved db value to model.

            if (askadeFileTypeWizardAttachmentSource.filePath == null) {
                this.FilePath = null;
            } else {
                this.FilePath = askadeFileTypeWizardAttachmentSource.filePath;
            }
            this.InternalFilePath = askadeFileTypeWizardAttachmentSource.internalFilePath;
            this.MarkedForDelete = false;
        }
    };
    return PersonAskadeFileTypeWizardAttachmentTemplate;
});
app.factory('PersonAskadeFileTypeWizardAttachment', function () {
    function PersonAskadeFileTypeWizardAttachment() { }

    PersonAskadeFileTypeWizardAttachment.prototype = {
        setData: function setData(askadeFileTypeWizardAttachmentSource) {
            this.Id = askadeFileTypeWizardAttachmentSource.Id;
            this.PersonAskadeFileTypeWizardId = askadeFileTypeWizardAttachmentSource.personAskadeFileTypeWizardId;
            this.FileName = askadeFileTypeWizardAttachmentSource.fileName;
            this.FileSourceBase64 = askadeFileTypeWizardAttachmentSource.fileSourceBase64;
            this.FileHeader = askadeFileTypeWizardAttachmentSource.fileHeader; // Check for bot undefined or null else assign the retrieved db value to model.

            if (askadeFileTypeWizardAttachmentSource.filePath == null) {
                this.FilePath = null;
            } else {
                this.FilePath = askadeFileTypeWizardAttachmentSource.filePath;
            }
            this.InternalFilePath = askadeFileTypeWizardAttachmentSource.internalFilePath;
            this.MarkedForDelete = false;
        }
    };
    return PersonAskadeFileTypeWizardAttachment;
});
app.factory('PersonAskadeFileTypeWizardTemplate', ['DateUtil', function (DateUtil) {
    function PersonAskadeFileTypeWizardTemplate() { }

    PersonAskadeFileTypeWizardTemplate.prototype = {
        setData: function setData(personAskadeFileTypeWizardTemplateSource) {
            this.Id = personAskadeFileTypeWizardTemplateSource.Id;
            this.FileTypeId = personAskadeFileTypeWizardTemplateSource.fileTypeId;
            this.ColumnGuideFileTypeId = personAskadeFileTypeWizardTemplateSource.columnGuideFileTypeId;
            this.AnsweringInProgress = personAskadeFileTypeWizardTemplateSource.answeringInProgress;
            this.AnsweringCompleted = personAskadeFileTypeWizardTemplateSource.answeringCompleted;
            this.CreatedDate = personAskadeFileTypeWizardTemplateSource.meta.created;
            this.GeoX = personAskadeFileTypeWizardTemplateSource.geoX;
            this.GeoY = personAskadeFileTypeWizardTemplateSource.geoY;
            this.Address = personAskadeFileTypeWizardTemplateSource.address;

            if (personAskadeFileTypeWizardTemplateSource.meta.updated != null) {
                var date = new Date(personAskadeFileTypeWizardTemplateSource.meta.updated);
                var formatedCompleteDate = DateUtil.getFormattedValue(date, 'dateTime');
                this.CompletedDate = formatedCompleteDate;
            } else {
                var date = new Date(personAskadeFileTypeWizardTemplateSource.meta.created);
                var formatedCompleteDate = DateUtil.getFormattedValue(date, 'dateTime');
                this.CompletedDate = formatedCompleteDate;
            }

            if (angular.isUndefined(personAskadeFileTypeWizardTemplateSource.lastAnsweredStepIndex)) {
                this.LastAnsweredStepIndex = null;
            } else {
                this.LastAnsweredStepIndex = personAskadeFileTypeWizardTemplateSource.lastAnsweredStepIndex;
            }

            this.IsTemplate = false;
            this.AskadeFileTypeWizard = null;
            this.ColumnValues = [];
            this.Attachments = [];
        }
    };
    return PersonAskadeFileTypeWizardTemplate;
}]);
app.factory('PersonAskadeColumnAnswerTemplate', function () {
    function PersonAskadeColumnAnswerTemplate() { }

    PersonAskadeColumnAnswerTemplate.prototype = {
        setData: function setData(personAskadeColumnAnswerTemplateSource) {
            this.Id = personAskadeColumnAnswerTemplateSource.Id;
            this.FileColumnId = personAskadeColumnAnswerTemplateSource.fileColumnId;
            this.AnswerId = personAskadeColumnAnswerTemplateSource.answerId;
            this.AnswerText = personAskadeColumnAnswerTemplateSource.answerText;
            this.AnswerDate = personAskadeColumnAnswerTemplateSource.answerDate;
            this.DefaultValue = personAskadeColumnAnswerTemplateSource.defaultValue;
            this.ColumnSubType = personAskadeColumnAnswerTemplateSource.columnSubType;
            this.ColumnType = personAskadeColumnAnswerTemplateSource.columnType;
            this.PersonAskadeWizId = personAskadeColumnAnswerTemplateSource.personAskadeWizId;
            this.ColumnGuides = [];
            this.IsColumnGuide = false;
        }
    };
    return PersonAskadeColumnAnswerTemplate;
});
app.factory('PersonAskadeFileTypeWizard', ['DateUtil', '$cordovaFile', function (DateUtil, $cordovaFile) {
    function PersonAskadeFileTypeWizard() { }

    PersonAskadeFileTypeWizard.prototype = {
        setData: function setData(personAskadeFileTypeWizardSource) {
            this.Id = personAskadeFileTypeWizardSource.Id;
            this.FileTypeId = personAskadeFileTypeWizardSource.fileTypeId;
            this.ColumnGuideFileTypeId = personAskadeFileTypeWizardSource.columnGuideFileTypeId;
            this.AnsweringInProgress = personAskadeFileTypeWizardSource.answeringInProgress;
            this.AnsweringCompleted = personAskadeFileTypeWizardSource.answeringCompleted;
            this.CreatedDate = personAskadeFileTypeWizardSource.meta.created;
            this.GeoX = personAskadeFileTypeWizardSource.geoX;
            this.GeoY = personAskadeFileTypeWizardSource.geoY;
            this.Address = personAskadeFileTypeWizardSource.address;

            if (personAskadeFileTypeWizardSource.meta.updated != null) {
                var date = new Date(personAskadeFileTypeWizardSource.meta.updated);
                var formatedCompleteDate = DateUtil.getFormattedValue(date, 'dateTime');
                this.CompletedDate = formatedCompleteDate;
            } else {
                var date = new Date(personAskadeFileTypeWizardSource.meta.created);
                var formatedCompleteDate = DateUtil.getFormattedValue(date, 'dateTime');
                this.CompletedDate = formatedCompleteDate;
            }

            if (angular.isUndefined(personAskadeFileTypeWizardSource.lastAnsweredStepIndex)) {
                this.LastAnsweredStepIndex = null;
            } else {
                this.LastAnsweredStepIndex = personAskadeFileTypeWizardSource.lastAnsweredStepIndex;
            }

            this.IsTemplate = false;
            this.AskadeFileTypeWizard = null;
            this.ColumnValues = [];
            this.Attachments = [];
            this.UploadInProgress = false;
            this.UploadFail = false;
        },
        hasDelayElapsed: function () {
            if (!this.CompletedDate) {
                return false;
            }

            var delayInMinutes = this.AskadeFileTypeWizard.AutoUploadDelayInMinutes;
            if (!delayInMinutes) {
                return true;
            }
            //timestamp
            var completedDateTimeStamp = moment(this.CompletedDate, [
                "DD-MM-YYYY hh:mm:ss",
            ])
                .add(delayInMinutes, "minutes")
                .valueOf();
            var elaspedTimeInSeconds = (completedDateTimeStamp - Date.now()) / 1000;
            return elaspedTimeInSeconds <= 0;
        },
        prepareAttachments: function prepareAttachments() {
            var instance = this;
            var pAskadeArray = [];

            for (var i = 0; i < this.Attachments.length; i++) {
                var pAskadeAttach = this.Attachments[i];
                var fileName = pAskadeAttach.FileName;

                if (fileName != null) {
                    var directoryPath = pAskadeAttach.FilePath.replace(fileName, '');
                    var attachPromise = $cordovaFile.readAsDataURL(directoryPath, fileName);
                    pAskadeArray.push({
                        'pAttachId': pAskadeAttach.Id,
                        'AttachPromise': attachPromise
                    });
                }
            }

            return pAskadeArray;
        }
    };
    return PersonAskadeFileTypeWizard;
}]);
app.factory('PersonAskadeColumnAnswer', function () {
    function PersonAskadeColumnAnswer() { }

    PersonAskadeColumnAnswer.prototype = {
        setData: function setData(personAskadeColumnAnswerSource) {
            this.Id = personAskadeColumnAnswerSource.Id;
            this.FileColumnId = personAskadeColumnAnswerSource.fileColumnId;
            this.AnswerId = personAskadeColumnAnswerSource.answerId;
            this.AnswerText = personAskadeColumnAnswerSource.answerText;
            this.AnswerDate = personAskadeColumnAnswerSource.answerDate !== null ? new Date(personAskadeColumnAnswerSource.answerDate) : null;
            this.ColumnSubType = personAskadeColumnAnswerSource.columnSubType;
            this.ColumnType = personAskadeColumnAnswerSource.columnType;
            this.PersonAskadeWizId = personAskadeColumnAnswerSource.personAskadeWizId;
            this.DefaultValue = personAskadeColumnAnswerSource.defaultValue;
            this.ColumnGuides = [];
            this.IsColumnGuide = false;
        }
    };
    return PersonAskadeColumnAnswer;
});
app.factory('PersonAskadeColumnGuideAnswer', function () {
    function PersonAskadeColumnGuideAnswer() { }

    PersonAskadeColumnGuideAnswer.prototype = {
        setData: function setData(guideData) {
            this.GuideId = guideData.Id;
            this.FileColumnId = guideData.askWizFileColumnId;
            this.AnswerText = null;
        }
    };
    return PersonAskadeColumnGuideAnswer;
});
app.factory('Language', function () {
    function Language() { }

    Language.prototype = {
        setData: function setData(languageData) {
            this.Id = languageData.Id;
            this.Language = languageData.language;
            this.IsDefault = languageData.isDefault;
            this.LanguageCode = languageData.languageCode;
            this.CultureName = languageData.cultureName;
            this.IsInactive = languageData.isInactive;
            this.LanguageImage = languageData.languageImage;
        }
    };
    return Language;
}); // This is not used as of now. But this can be used for Drop down values which are part of list pop up html.

app.factory('DropDownValue', function () {
    function DropDownValue() { }

    DropDownValue.prototype = {
        setData: function setData(dropdownData) {
            this.Text = dropdownData.Text;
            this.Id = dropdownData.Id;
        }
    };
    return DropDownValue;
});
app.factory('DocumentLibrary', ['$rootScope', function ($rootScope) {
    function DocumentLibrary() { }

    DocumentLibrary.prototype = {
        setData: function setData(documentLibraryData) {
            this.Id = documentLibraryData.Id;
            this.Text = documentLibraryData.text;
            this.DocumentTypeCode = documentLibraryData.documentTypeCode;
            this.HtmlContent = documentLibraryData.htmlContent;
            this.LinkName = documentLibraryData.linkName;
            this.Link = this.getProperUrl(documentLibraryData.link);
            this.FileName = documentLibraryData.fileName;
            this.DeviceFilePath = documentLibraryData.deviceFilePath;
            this.GroupName = documentLibraryData.groupName;
            this.GroupSortOrder = documentLibraryData.groupSortOrder;
            this.SortOrder = documentLibraryData.sortOrder;
            this.ListIcon = this.getImageIcon();
            this.ExtendedInfo = documentLibraryData.extendedInfo;
            this.IsRootData = false;
            this.AiAssistanceLink = documentLibraryData.aiAssistanceLink;
            this.AiAssistanceGroupLink = documentLibraryData.aiAssistanceGroupLink;
        },
        getImageIcon: function getImageIcon() {
            switch (this.DocumentTypeCode) {
                case 'Link':
                    return $rootScope.getIconValue('LinkOutline');

                case 'HTML':
                    return $rootScope.getIconValue('Html');

                case 'File':
                    return $rootScope.getIconValue('Document');

                default:
                    return '';
            }
        },
        getProperUrl: function getProperUrl(link) {
            var url = link;

            if (url) {
                if (!(url.indexOf("http://") === 0 || url.indexOf("https://") === 0)) {
                    return 'https://' + url;
                }
            }

            return url;
        }
    };
    return DocumentLibrary;
}]);
app.factory('Favorite', function () {
    function Favorite() { }

    Favorite.prototype = {
        setData: function setData(favData) {
            this.ItemId = favData.itemId;
            this.ModuleName = favData.moduleName;
            this.GroupName = favData.groupName;
            this.UserSortOrder = favData.userSortOrder;
            this.ItemData = [];
            this.UserApp = [];
        }
    };
    return Favorite;
});
app.factory('News', function () {
    function News() { }

    News.prototype = {
        setData: function setData(newsData) {
            this.Id = newsData.Id;
            this.Header = newsData.header;
            this.Teaser = newsData.teaser;
            this.Link = newsData.link;
            this.GroupName = newsData.groupName;
            this.GroupSortOrder = newsData.groupSortOrder;
            this.HtmlContent = newsData.htmlContent;
            this.SortOrder = newsData.sortOrder;
            this.ExpiryDate = newsData.expiryDate;
            this.ModifiedDate = newsData.modifiedDate;
            this.IsExternal = newsData.isExternal;
            this.IsRead = newsData.isRead;
            this.Files = [];
        }
    };
    return News;
});
app.factory('NewsFile', function () {
    function NewsFile() { }

    NewsFile.prototype = {
        setData: function setData(newsFileData) {
            this.Id = newsFileData.Id;
            this.NewsId = newsFileData.newsId;
            this.FileName = newsFileData.fileName;
            this.DeviceFilePath = newsFileData.deviceFilePath;
        }
    };
    return NewsFile;
});
app.factory('Insurance', function () {
    function Insurance() { }

    Insurance.prototype = {
        setData: function setData(insuranceSource) {
            this.Id = insuranceSource.Id;
            this.DataTypeId = insuranceSource.dataTypeId;
            this.Text = insuranceSource.text;
            this.Height = "50";
        }
    };
    return Insurance;
});


/***/ }),

/***/ "./scripts/EntityHelper.js":
/*!*********************************!*\
  !*** ./scripts/EntityHelper.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var app = angular.module('EntityUtils', ['DataEntityModule', 'LocalStorage']);
app.factory("$exceptionHandler", ['$injector', function ($injector) {
    return function (exception, cause) {
        var localStorageUtility = $injector.get('LocalStorageUtility')
        localStorageUtility.addExceptionToLogTable(exception, cause);
        var rScope = $injector.get('$rootScope');
        rScope.$broadcast('exceptionRefresh', exception, cause);
    };
}]);
app.factory('personQuestionnaireManager', ['PersonQuestionnaire', 'LocalStorageUtility', 'personQuestionAnswerManager', 'questionnaireManager', '$injector', '$q', 'DateUtil', 'personValuationQuestionAnswerManager', 'FileUtil', function (PersonQuestionnaire, LocalStorageUtility, personQuestionAnswerManager, questionnaireManager, $injector, $q, DateUtil, personValuationQuestionAnswerManager, FileUtil) {
    var questionnaireManagerScope = {
        _dataReset: false,
        _pool: {},
        removeInstance: function removeInstance(pq) {
            var personQuestionnaireId = pq.Id;
            var pool = this._pool;
            delete pool[personQuestionnaireId];
        },
        _retrieveInstance: function _retrieveInstance(personQuestionnaireId, personQuestionnaireData) {
            var instance = this._pool[personQuestionnaireId];

            if (instance) {
                instance.setData(personQuestionnaireData);
            } else {
                instance = new PersonQuestionnaire();
                instance.setData(personQuestionnaireData);
                this._pool[personQuestionnaireId] = instance;
            }

            return instance;
        },
        _search: function _search(personQuestionnaireId) {
            return this._pool[personQuestionnaireId];
        },
        _load: function _load(personQuestionnaire) {
            return this._retrieveInstance(personQuestionnaire.Id, personQuestionnaire);
        },
        _loadByPqId: function _loadByPqId(personQuestionnaireId) {
            var pq = LocalStorageUtility.getPersonQuestionnaireById(personQuestionnaireId);

            var pqEntity = this._load(pq);

            this._loadDependencies(pqEntity);

            return pqEntity;
        },
        _processEvaluatingFor: function _processEvaluatingFor(pqEntity) {
            var q = pqEntity.Questionnaire;
            var pov = q.PointOfView;

            if (pov === "Manager") {
                var evalList = pqEntity.Questionnaire.EvaluatingFor; //When in InProgress mode for a manager evaluation there will be an evaluatingForId
                //using this Id we set the dropdownlist to the previously selected value.

                var evalId = pqEntity.EvaluatedForId;

                if (evalId !== null) {
                    //InProgress mode
                    var manager2QuestionnaireManager = $injector.get('manager2QuestionnaireManager');
                    var managerEnt = manager2QuestionnaireManager.getUserManager(evalId);
                    var exists = false;

                    for (var i = 0; i < evalList.length; i++) {
                        var evalData = evalList[i];

                        if (evalData.Id === managerEnt.Id) {
                            exists = true;
                            break;
                        }
                    }

                    if (exists === false) {
                        evalList.push(managerEnt);
                    }
                }

                var sortedEvalList = evalList.sort(function (a, b) {
                    if (a.SortOrder === b.SortOrder) return 0;
                    if (a.SortOrder > b.SortOrder) return 1;
                    if (a.SortOrder < b.SortOrder) return -1;
                });
                pqEntity.Questionnaire.EvaluatingFor = sortedEvalList;
            }
        },
        _loadDependencies: function _loadDependencies(pqEntity) {
            pqEntity.Answers = personQuestionAnswerManager.loadByPersonQuestionnaire(pqEntity.Id);
            pqEntity.Questionnaire = questionnaireManager.loadQuestionnaireDeep(pqEntity.QuestionnaireId);
            pqEntity.ValuationAnswers = personValuationQuestionAnswerManager.loadPVQAnswer(pqEntity.Id);

            this._processEvaluatingFor(pqEntity);
        },
        _loadByQId: function _loadByQId(questionnaireId) {
            var pq = LocalStorageUtility.getPersonQuestionnaireByQuestionnaire(questionnaireId);

            var pqEntity = this._load(pq);

            this._loadDependencies(pqEntity);

            return pqEntity;
        },
        _loadAnswerListByQId: function _loadAnswerListByQId(questionnaireId, state) {
            var pqList = LocalStorageUtility.getPersonQuestionnaireListByQuestionnaireId(questionnaireId, state);

            var pqEntityList = [];

            for (var i = 0; i < pqList.length; i++) {
                var pq = pqList[i];

                var pqEntity = this._load(pq);

                this._loadDependencies(pqEntity);

                pqEntityList.push(pqEntity);
            }


            return pqEntityList;
        },
        hasAnswers: function hasAnswersByQuestionnaire(questionnaireId) {
            var pq = LocalStorageUtility.getPersonQuestionnaireByQuestionnaire(questionnaireId);
            return pq !== null;
        },
        refreshPool: function refreshPool(oldEntity, newEntitySource) {
            var key = oldEntity.Id;
            var newKey = newEntitySource.Id;
            var pool = this._pool;
            delete pool[key];
            return this._retrieveInstance(newKey, newEntitySource);
        },
        _savePq: function _savePq(pq, isAnsweringComplete) {
            // Check for a file which is marked for delete and set to null
            for (var i = 0; i < pq.Answers.length; i++) {
                var pqA = personQuestionAnswerManager.getPersonQuestionAnswer(pq.Answers[i].Id);

                if (pqA.MarkedForDelete === true) {
                    pqA.FileName = null;
                    pqA.FileLocation = null;
                    pqA.InternalFileLocation = null;
                }
            }

            var pqEntity;

            if (pq.IsTemplate) {
                var newPq = LocalStorageUtility.savePersonQuestionnaireTemplate(pq, isAnsweringComplete);
                LocalStorageUtility.saveOfflineDb();
                var newPqas = LocalStorageUtility.savePersonQuestionAnswersTemplate(pq.Answers, newPq.Id);
                LocalStorageUtility.saveOfflineDb();
                var newPVQAs = LocalStorageUtility.savePersonValuationQAsTemplate(pq.ValuationAnswers, newPq.Id);
                LocalStorageUtility.saveOfflineDb();

                for (var i = 0; i < newPqas.length; i++) {
                    var pqa = newPqas[i];
                    var oldEntity = pq.Answers[i];
                    personQuestionAnswerManager.refreshPool(oldEntity, pqa);
                }

                for (var j = 0; j < newPVQAs.length; j++) {
                    var pvqa = newPVQAs[j];
                    var oldReference = pq.ValuationAnswers[j];
                    personValuationQuestionAnswerManager.refreshPool(oldReference, pvqa);
                }

                pqEntity = this.refreshPool(pq, newPq);

                this._loadDependencies(pqEntity);
            } else {
                var updatedPq = LocalStorageUtility.savePersonQuestionnaire(pq, isAnsweringComplete);
                LocalStorageUtility.saveOfflineDb();

                var pqEntity = this._load(updatedPq);

                this._loadDependencies(pqEntity);
            }

            return pqEntity;
        },

        /* Public Methods */

        /* Use this function in order to get a personQuestionnaire instance by it's id */
        getPersonQuestionnaire: function getPersonQuestionnaire(personQuestionnaireId) {
            var pq = this._search(personQuestionnaireId);

            if (!pq) {
                pq = this._loadByPqId(personQuestionnaireId);

                this._loadDependencies(pq);
            }

            return pq;
        },
        reloadDependencies: function reloadDependencies(pqEntity) {
            this._loadDependencies(pqEntity);
        },
        getPersonQuestionnaireByQuestionnaire: function getPersonQuestionnaireByQuestionnaire(questionnaireId) {
            var pq = this._loadByQId(questionnaireId);

            pq.Answers = personQuestionAnswerManager.loadByPersonQuestionnaire(pq.Id);
            pq.Questionnaire = questionnaireManager.getQuestionnaire(pq.QuestionnaireId);
            pq.ValuationAnswers = personValuationQuestionAnswerManager.loadPVQAnswer(pq.Id);
            return pq;
        },

        /* This method returns an entry to the un answered questionnaire */
        getUnAnsweredPersonQuestionnaireNonTemplate: function getUnAnsweredPersonQuestionnaireNonTemplate(qId) {
            var personQue = LocalStorageUtility.getUnAnsweredPersonQuestionnaireNonTemplate(qId);

            if (personQue !== null) {
                var pqId = personQue.Id;

                var pq = this._retrieveInstance(pqId, personQue);

                pq.IsTemplate = true;
                pq.Answers = personQuestionAnswerManager.getPersonQuestionAnswersFromTemplate(pq.Id);
                pq.Questionnaire = questionnaireManager.loadQuestionnaireDeep(pq.QuestionnaireId);
                pq.ValuationAnswers = personValuationQuestionAnswerManager.loadPVQAnswerByTemplate(pq.Id);
                return pq;
            }

            return null;
        },
        getUnAnsweredPersonQuestionnaire: function getUnAnsweredPersonQuestionnaire(qId) {
            var personQue = LocalStorageUtility.getUnAnsweredPersonQuestionnaire(qId);
            if (personQue !== null) {
                var pqId = personQue.Id;

                var pq = this._retrieveInstance(pqId, personQue);

                pq.IsTemplate = true;
                pq.Answers = personQuestionAnswerManager.getPersonQuestionAnswersFromTemplate(pq.Id);
                pq.Questionnaire = questionnaireManager.loadQuestionnaireDeep(pq.QuestionnaireId);
                pq.ValuationAnswers = personValuationQuestionAnswerManager.loadPVQAnswerByTemplate(pq.Id);
                return pq;
            }
            return null;
        },
        savePersonQuestionniare: function savePersonQuestionniare(pq, isAnsweringComplete) {
            return this._savePq(pq, isAnsweringComplete);
        },
        _processValuationQuestions: function _processValuationQuestions(q) {
            var valQuestions = q.ValuationQuestions;

            if (valQuestions != null) {
                for (var i = 0; i < valQuestions.length; i++) {
                    var valuationAnswerGroupId = valQuestions[i].valuationAnswerGroupId;

                    if (valuationAnswerGroupId !== null) {
                        var isValAnswerGroupUsed = LocalStorageUtility.getUsedValuationAnswerGroupCountInAllQuestionnaires(valuationAnswerGroupId, q.Id);

                        if (isValAnswerGroupUsed === false) {
                            //Means no reference of the ValuationAnswerGroup is found in other questionnaires 
                            //and hence is Ok to delete from the db.
                            LocalStorageUtility.deleteValuationAnswerGroup(valuationAnswerGroupId);
                            LocalStorageUtility.deleteValuationAnswerOptionByValuationGroup(valuationAnswerGroupId);
                        }
                    }
                }
            }
        },
        _processAnswerGroup: function _processAnswerGroup(answerGroupId, qId, deletdAnswerGroupIdList) {
            var isAnswerGroupUsed = LocalStorageUtility.getUsedAnswerGroupCountInAllQuestionnaires(answerGroupId, qId);

            if (isAnswerGroupUsed == false) {
                //Means no reference of the AnswerGroup is found in other questionnaires 
                //and hence is Ok to delete from the db.
                // Adding the deleted answer group id to a list, as to not delete it again and cause an error.
                LocalStorageUtility.deleteAnswerGroup(answerGroupId);
                LocalStorageUtility.deleteAnswerOptionsByAnswerGroup(answerGroupId);
                deletdAnswerGroupIdList.push(answerGroupId);
            }

            return isAnswerGroupUsed;
        },
        _removeAnswerOptionsForQuestionnaire: function _removeAnswerOptionsForQuestionnaire(q) {
            var qgs = q.Groups;
            var factoryToLoad = 'answerOptionManager';
            var answerOptionManager = $injector.get(factoryToLoad);

            for (var i = 0; i < qgs.length; i++) {
                var qg = qgs[i];
                var questions = qg.Questions;

                for (var j = 0; j < questions.length; j++) {
                    var que = questions[j];
                    var aos = que.AnswerOptions;
                    answerOptionManager.removeAnswerOptions(aos);
                }
            }
        },
        _processAnswerOptionsForQuestionnaire: function _processAnswerOptionsForQuestionnaire(q) {
            // Check deletdAnswerGroupIdList before calling _processAnswerGroup method.
            // This is to check if the answer group id is already deleted.
            var deletdAnswerGroupIdList = [];
            var isAnswerGroupUsed = false;
            var qId = q.Id;

            if (q.AnswerGroupId != null) {
                //The AnswerGroup is defined at the questionnaire level get 
                //the answergroup id and see if it is being used in any other questionnaire
                if (deletdAnswerGroupIdList.indexOf(q.AnswerGroupId) === -1) {
                    isAnswerGroupUsed = this._processAnswerGroup(q.AnswerGroupId, qId, deletdAnswerGroupIdList);
                }
            } else {
                //Loop through each group and check if there are answergroup exists 
                var qgs = q.Groups;

                for (var i = 0; i < qgs.length; i++) {
                    var qg = qgs[i];
                    var answerGroupId = qg.AnswerGroupId;

                    if (answerGroupId != null) {
                        if (deletdAnswerGroupIdList.indexOf(answerGroupId) === -1) {
                            isAnswerGroupUsed = this._processAnswerGroup(answerGroupId, qId, deletdAnswerGroupIdList);
                        }
                    } else {
                        //This means that there are no AnswerGroups that are defined by the QuestionGroup 
                        //and all answer options will be directly linked to the question . 
                        //Hence delete the AnswerOptions based on the question
                        var questions = qg.Questions;

                        for (var j = 0; j < questions.length; j++) {
                            var que = questions[j];
                            var questionLevelAnswerGroupId = que.AnswerGroupId;

                            if (questionLevelAnswerGroupId != null) {
                                if (deletdAnswerGroupIdList.indexOf(questionLevelAnswerGroupId) === -1) {
                                    isAnswerGroupUsed = this._processAnswerGroup(questionLevelAnswerGroupId, qId, deletdAnswerGroupIdList);
                                }
                            } else {
                                var aos = que.AnswerOptions;

                                for (var k = 0; k < aos.length; k++) {
                                    var ao = aos[k];
                                    LocalStorageUtility.deleteAnswerOption(ao.Id);
                                }
                            }
                        }
                    }
                }
            } //Common code if the condition isAnswerGroupUsed == false is true then the above code will remove 
            //only from the LocalStorage and hence needs to be removed from the cached data too.


            if (isAnswerGroupUsed == false) {
                this._removeAnswerOptionsForQuestionnaire(q);
            }

            deletdAnswerGroupIdList = [];
            return isAnswerGroupUsed;
        },
        _getAnsweredQuestionnaires: function _getAnsweredQuestionnaires(answeredList) {
            var completedGroupedData = [];

            for (var i = 0; i < answeredList.length; i++) {
                var questionnaireAnswer = answeredList[i];
                var groupedAnswers = [];
                var questionnaireId = questionnaireAnswer.qId;
                var pqAnswers = questionnaireAnswer.Answers;
                var sortedPqAnswers = pqAnswers.sort(function (a, b) {
                    if (a.meta.created > b.meta.created) return -1;
                    if (a.meta.created < b.meta.created) return 1;
                    return 0;
                });

                for (var j = 0; j < sortedPqAnswers.length; j++) {
                    var pq = sortedPqAnswers[j];
                    var pqId = pq.Id;

                    var pqEntity = this._search(pqId);

                    if (pqEntity == null) {
                        pqEntity = this._loadByPqId(pqId);
                    }

                    var evaluatedId = pqEntity.EvaluatedForId;
                    var evalText = questionnaireManager.getEvaluatingFor(questionnaireId, evaluatedId);
                    var dateString = pqEntity.CompletedDate;
                    var initiatedDate = pqEntity.InitiatedDate;
                    var surveyCompletedDate = pqEntity.SurveyCompletedDate;
                    var surveyHistoryFromDate = pqEntity.SurveyHistoryFromDate;
                    var surveyHistoryToDate = pqEntity.SurveyHistoryToDate;

                    if (angular.isUndefined(pqEntity.CompletedDate)) {
                        var dateSaved = pqEntity.CreatedDate;
                        var currentDate = new Date(dateSaved);
                        var completeDateTime = DateUtil.getFormattedValue(currentDate, DateUtil.getDateTime());
                        dateString = completeDateTime;
                    }

                    if (angular.isUndefined(pqEntity.InitiatedDate)) {
                        var dateSaved = pqEntity.CreatedDate;
                        var currentDate = new Date(dateSaved);
                        var completeDateTime = DateUtil.getFormattedValue(currentDate, DateUtil.getDateTime());
                        initiatedDate = completeDateTime;
                    }

                    if (angular.isUndefined(pqEntity.SurveyCompletedDate) && !angular.isUndefined(pqEntity.CompletedDate))
                        surveyCompletedDate = pqEntity.CompletedDate;

                    groupedAnswers.push({
                        'PersonQuestionnaire': pqEntity,
                        'Label': evalText,
                        'TimeStamp': dateString,
                        'InitiatedDate': initiatedDate,
                        'SurveyHistoryFromDate': surveyHistoryFromDate,
                        'SurveyHistoryToDate': surveyHistoryToDate,
                        'SurveyCompletedDate': surveyCompletedDate
                    });
                }

                if (sortedPqAnswers.length > 0) {
                    completedGroupedData.push({
                        'Name': questionnaireAnswer.qName,
                        'Id': questionnaireId,
                        'Answers': groupedAnswers
                    });
                }
            }

            return completedGroupedData;
        },

        /**
         * Post processing after successfull upload of personquestionnaire.
         * @param {string} pq - The title of the book.
         */
        uploadPostProcess: function uploadPostProcess(pq) {
            //We have sucessfully uploaded the questionnaire now clen up used resources.
            var q = pq.Questionnaire;

            var isSurveyQuestionnaire = q.IsSurvey;

            if (!isSurveyQuestionnaire) {
                this.cleanUpAfterUpload(pq, q);
            }
        },
        cleanUpAfterUpload: function cleanUpAfterUpload(pq, q) {
            var qId = q.Id;
            var pqId = pq.Id;
            var isQRepeatable = q.IsRepeatable;

            if (isQRepeatable === true) {
                if (q.IsRepeatableOnlyOnceForEvaluatingFor === true) {
                    LocalStorageUtility.deleteEvaluatingForQuestionnaireForUser(pq); //refresh the questionnaire entity for new values in the list..
                    //questionnaireManager.loadQuestionnaireDeep(pq.Questionnaire.Id);

                    isQRepeatable = LocalStorageUtility.getEvaluatingForQuestionnaireCount(qId);
                }
            }

            if (isQRepeatable == false) {
                //Get questionnaire recipient count if for a questionnaire 
                //there are more then 1 recipients then do not delete the questionnaire instead
                //delete the entry from the QuestionnaireRecipient table .
                //The questionnaire along with all its Groups and Questions 
                //will be deleted when the last person uploading to the server is returned.
                var qgs = q.Groups;

                if (qgs.length !== 0) {
                    var groupId = qgs[0].Id;
                    var isUsed = LocalStorageUtility.checkIfGroupIsUsed(groupId);

                    if (!isUsed) {
                        //This method below will contain checks to remove and 
                        //AnswerGroup and AnswerOption for the questionnaire.
                        this._processValuationQuestions(q);

                        this._processAnswerOptionsForQuestionnaire(q);

                        var questionManager = $injector.get('questionManager');
                        var questionGroupManager = $injector.get('questionGroupManager');

                        for (var i = 0; i < qgs.length; i++) {
                            var qg = qgs[i];
                            var questions = qg.Questions;

                            for (var j = 0; j < questions.length; j++) {
                                var que = questions[j];
                                LocalStorageUtility.deleteQuestion(que.Id);
                                questionManager.removeInstance(que);
                            }

                            LocalStorageUtility.deleteQuestionGroup(qg.Id);
                            questionGroupManager.removeInstance(qg);
                        }
                    }

                    LocalStorageUtility.deleteQuestionnaire(q.Id);
                    questionnaireManager.removeInstance(q);
                    var pqTemplate = LocalStorageUtility.getPersonQuestionnaireByQuestionnaireTemplate(q.Id);
                    var answers = LocalStorageUtility.getPersonQuestionAnswersFromTemplate(pqTemplate.Id);
                    var valuationAnswers = LocalStorageUtility.getPersonValuationQuestionAnswersFromTemplate(pqTemplate.Id);
                    LocalStorageUtility.deletePersonValuationQuestionAnswerTemplate(pqTemplate.Id);
                    LocalStorageUtility.deletePersonQuestionAnswersTemplate(pqTemplate.Id);

                    this._removeInstancesPersonQuestionAnswer(answers); //remove PersonValuationQuestionAnswer instances..


                    this._removeInstancesPersonPVQAnswer(valuationAnswers);

                    LocalStorageUtility.deletePersonQuestionnaireTemplate(pqTemplate.Id);
                    this.removeInstance(pqTemplate);
                }
            } //else {
            //    if (q.IsRepeatableOnlyOnceForEvaluatingFor === true) {
            //        LocalStorageUtility.deleteEvaluatingForQuestionnaireForUser(pq);
            //        //refresh the questionnaire entity for new values in the list..
            //        questionnaireManager.loadQuestionnaireDeep(pq.Questionnaire.Id);
            //    }
            //}
            //Irrespective of questionnaire being repeatable or not delete the person questionnaire .


            LocalStorageUtility.deletePersonQuestionAnswers(pqId);
            LocalStorageUtility.deletePersonValuationQuestionAnswers(pqId);
            var answers = pq.Answers;

            this._removeInstancesPersonQuestionAnswer(answers);

            var valuationAnswers = pq.ValuationAnswers;

            this._removeInstancesPersonPVQAnswer(valuationAnswers);

            LocalStorageUtility.deletePersonQuestionnaire(pqId);
            this.removeInstance(pq);
            LocalStorageUtility.saveOfflineDb();
        },
        _removeInstancesPersonQuestionAnswer: function _removeInstancesPersonQuestionAnswer(answers) {
            var personQuestionAnswerManager = $injector.get('personQuestionAnswerManager');

            for (var i = 0; i < answers.length; i++) {
                var pqa = answers[i]; // On succes upload delete the image from the file system

                var filePath = pqa.FileLocation;

                if (filePath) {
                    var deletePromise = FileUtil.deleteFile(filePath);
                    deletePromise.then(function (success) {// Success
                    }, function (error) {// Error
                    });
                }

                personQuestionAnswerManager.removeInstance(pqa);
            }
        },
        _removeInstancesPersonPVQAnswer: function _removeInstancesPersonPVQAnswer(pqvanswers) {
            for (var i = 0; i < pqvanswers.length; i++) {
                var pvqa = pqvanswers[i];
                personValuationQuestionAnswerManager.removeInstance(pvqa);
            }
        },
        prepareForUpload: function prepareForUpload(pq) {
            var processedPq = $q.defer();
            var mappedPqaWithImages = pq.prepareImages();
            var keyPqas = [],
                pqaPromises = [];

            for (var i = 0; i < mappedPqaWithImages.length; i++) {
                var mappedPromise = mappedPqaWithImages[i];
                var pqaKey = mappedPromise.PqaId;
                var pqaPromise = mappedPromise.ImagePromise;
                keyPqas.push(pqaKey);
                pqaPromises.push(pqaPromise);
            }

            $q.all(pqaPromises).then(function (resultSet) {
                var processedImageLength = resultSet.length;

                for (var i = 0; i < processedImageLength; i++) {
                    var pqaId = keyPqas[i];
                    var pqa = personQuestionAnswerManager.getPersonQuestionAnswer(pqaId);
                    var promisedImageData = resultSet[i];
                    pqa.FileSourceBase64 = promisedImageData;
                }

                processedPq.resolve(pq);
            }, function (errorResponse) {
                processedPq.reject(pq);
            });
            return processedPq;
        },
        // The below method is not used, but could be used for PDF with attachments in PDF (Questionnaire Module)
        prepareImagesForPdf: function prepareImagesForPdf(pq) {
            var imgPromise = $q.defer();
            var answerImagesList = pq.prepareImagesForPdf();
            var returnAnswerImage = [];
            var keyPqas = [],
                imagePromises = [];

            for (var i = 0; i < answerImagesList.length; i++) {
                var imagePromise = answerImagesList[i];
                var pqaKey = imagePromise.PqaId;
                var ansImgPromise = imagePromise.answerImagePromise;
                keyPqas.push(pqaKey);
                imagePromises.push(ansImgPromise);
            }

            $q.all(imagePromises).then(function (resultSet) {
                var processedAnsImage = resultSet.length;

                for (var i = 0; i < processedAnsImage; i++) {
                    var pqaId = keyPqas[i]; //var pqa = personQuestionAnswerManager.getPersonQuestionAnswer(pqaId);

                    var processedAnsImageData = resultSet[i];
                    returnAnswerImage.push({
                        'Id': pqaId,
                        'answerImgPromise': processedAnsImageData
                    });
                }

                imgPromise.resolve(returnAnswerImage);
            }, function (errorResponse) {
                imgPromise.reject(null);
            });
            return imgPromise;
        },
        getInProgressQuestionnairesList: function getInProgressQuestionnairesList(moduleName) {
            var answeredList = LocalStorageUtility.getInProgressQueList(moduleName);
            return this._getAnsweredQuestionnaires(answeredList);
        },
        getCompletedQuestionnairesList: function getCompletedQuestionnairesList(moduleName) {
            var answeredList = LocalStorageUtility.getCompletedQueList(moduleName);
            return this._getAnsweredQuestionnaires(answeredList);
        },
        getCompletedSurveyQuestionnairesList: function getCompletedSurveyQuestionnairesList() {
            var answeredList = LocalStorageUtility.getAllCompletedQuestionnaireForSurvey();
            return this._getAnsweredQuestionnaires(answeredList);
        },
        checkIfAnswerExistsForADay: function checkIfAnswerExistsForADay(questionnaireId, date) {
            var pqaList = this._loadAnswerListByQId(questionnaireId, "Completed");
            for (var i = 0; i < pqaList.length; i++) {
                var paq = pqaList[i];
                var completedDate = paq.InitiatedDate.split(' ')[0];
                date = DateUtil.getFormattedValue(new Date(date), "date");
                if (completedDate === date) {
                    return true;
                }
            }
            return false;
        },
        cleanUpSurvey: function cleanUpSurvey(pqEntity) {
            this.cleanUpAfterUpload(pqEntity, pqEntity.Questionnaire);
        },
        getCompletedPersonQuestionnaireListWithDelayedUpload: function getCompletedPersonQuestionnaireListWithDelayedUpload(moduleName) {
            var completedList = this.getCompletedQuestionnairesList(moduleName);
            var completedDelayedList = [];

            for (var i = 0; i < completedList.length; i++) {
                var pqAnswersForQuestionnaire = completedList[i];
                var pqAnswers = pqAnswersForQuestionnaire.Answers;
                for (var j = 0; j < pqAnswers.length; j++) {
                    var pq = pqAnswers[j].PersonQuestionnaire;
                    var autoUploadDelayInMins = pq.Questionnaire.AutoUploadDelayInMins;
                    if (autoUploadDelayInMins && autoUploadDelayInMins > 0) {
                        completedDelayedList.push(pq);
                    }
                }
            }
            return completedDelayedList;
        },
        hasDelayedQuestionnaireList2Upload: function hasDelayedQuestionnaireList2Upload(moduleName) {
            var completedList = this.getCompletedPersonQuestionnaireListWithDelayedUpload(moduleName);
            for (var i = 0; i < completedList.length; i++) {
                var pq = completedList[i];
                if (pq.UploadInProgress == false && pq.hasDelayElapsed()) {
                    return true;
                }
            }
            return false;
        },
        getInProgressQuestionnairesListCount: function getInProgressQuestionnairesListCount(moduleName) {
            var inprogressQueCount = 0;
            var answeredInprogressList = LocalStorageUtility.getInProgressQueList(moduleName);

            var inprogressQue = this._getAnsweredQuestionnaires(answeredInprogressList);

            for (var i = 0; i < inprogressQue.length; i++) {
                var inprog = inprogressQue[i].Answers;
                inprogressQueCount += inprog.length;
            }

            return inprogressQueCount;
        },
        getCompletedQuestionnairesListCount: function getCompletedQuestionnairesListCount(moduleName) {
            var completedQueCount = 0;
            var answeredCompletedList = LocalStorageUtility.getCompletedQueList(moduleName);

            var completedQue = this._getAnsweredQuestionnaires(answeredCompletedList);

            for (var i = 0; i < completedQue.length; i++) {
                var comp = completedQue[i].Answers;
                completedQueCount += comp.length;
            }

            return completedQueCount;
        },
        _deletePersonQuestionnaireAnswers: function _deletePersonQuestionnaireAnswers(pqId, pq) {
            LocalStorageUtility.deletePersonQuestionAnswers(pqId);
            var answers = pq.Answers;

            this._removeInstancesPersonQuestionAnswer(answers);
        },
        _deletePersonQuestionnaire: function _deletePersonQuestionnaire(pqId, pq) {
            LocalStorageUtility.deletePersonQuestionnaire(pqId);
            this.removeInstance(pq);
        },
        _deletePersonVQAnswers: function _deletePersonVQAnswers(pqId, pq) {
            personValuationQuestionAnswerManager.deleteFromLocalStorage(pqId);
            var pqvanswers = pq.ValuationAnswers;

            for (var i = 0; i < pqvanswers.length; i++) {
                var pvqa = pqvanswers[i];
                personValuationQuestionAnswerManager.removeInstance(pvqa);
            }
        },
        deletePersonQuestionnaireByPqId: function deletePersonQuestionnaireByPqId(pqId) {
            var pq = this.getPersonQuestionnaire(pqId);

            this._deletePersonQuestionnaireAnswers(pqId, pq);

            this._deletePersonQuestionnaire(pqId, pq);

            this._deletePersonVQAnswers(pqId, pq);

            LocalStorageUtility.saveOfflineDb();
        },
        updateDownloadedQuestionnaire: function updateDownloadedQuestionnaire(downloadedJsonResponse, moduleName) {
            var def = $q.defer(); // Initilizing arrays to store the ids, which have been deleted at server.
            // Based on the below arrays delete at each level happens.

            var deleteQuestionnaireIdList = [];
            var deleteGroupIdList = [];
            var deleteQuestionIdlist = [];
            var deleteTriggerIds = [];
            var deletePQueAnsIds = []; // Adding all questionnaire ids to an array (which will be downloaded)

            var allQuestionnaireIdList = [];

            for (var i = 0; i < downloadedJsonResponse.length; i++) {
                var questionnaire = downloadedJsonResponse[i];
                var questionnaireId = questionnaire.Id; // Adding questionnaire data

                LocalStorageUtility.addQuestionnaireData(questionnaire);
                allQuestionnaireIdList.push(questionnaireId);
                var groups = questionnaire.Groups;
                var allGroupIdList = [];

                for (var j = 0; j < groups.length; j++) {
                    var group = groups[j];
                    var groupId = group.Id; // Adding questionnaire group data

                    LocalStorageUtility.addQuestionGroupData(group, questionnaireId);
                    allGroupIdList.push(groupId);
                    var questions = group.Questions;
                    var allQuestionIdList = [];

                    for (var k = 0; k < questions.length; k++) {
                        var question = questions[k];
                        var questionId = question.Id; // Adding Question data

                        LocalStorageUtility.addQuestionData(question, groupId);
                        allQuestionIdList.push(questionId); // Iterating all the triggers for a question

                        var questionTriggers = question.QuestionTriggers;
                        var addTriggersQuestionIdsList = [];
                        var addTriggerAnswerIdsList = [];

                        for (var l = 0; l < questionTriggers.length; l++) {
                            var questionTrigger = questionTriggers[l];
                            addTriggersQuestionIdsList.push(questionTrigger.TriggerQuestionId);
                        } // Adding trigger data at question level


                        LocalStorageUtility.addQuestionTriggersData(questionTriggers, questionId); // Based on question id and trigger question id get the triggers which are deleted at the server 
                        // and should reflect same on the mobile

                        var triggerIdsForDelete = LocalStorageUtility.getTriggerQuestionForDelete(questionId, addTriggersQuestionIdsList);

                        for (var l = 0; l < triggerIdsForDelete.length; l++) {
                            var questionTrigger = triggerIdsForDelete[l];
                            var uniqueTriggerId = questionTrigger.questionId + '_' + questionTrigger.triggerQuestionId;
                            deleteTriggerIds.push(uniqueTriggerId);
                        } // Adding Answer options 


                        var answerOptions = question.AnswerOptions;

                        if (answerOptions != null) {
                            LocalStorageUtility.insertAnswerOptionData(answerOptions, questionId, 'questionData');
                        }
                    } // Fetch question ids which have to be deleted, (Questions which are deleted at the server)


                    var deleteQuestionIds = LocalStorageUtility.getQuestionIdForDelete(allQuestionIdList, groupId);

                    for (var l = 0; l < deleteQuestionIds.length; l++) {
                        var questionIdForDelete = deleteQuestionIds[l].Id;
                        deleteQuestionIdlist.push(questionIdForDelete);
                    }
                } // Fetch group ids which have to be deleted from the app. (Groups that are deleted at the server)


                var deleteQuestionGroupIds = LocalStorageUtility.getQuestionGroupIdForDelete(allGroupIdList, questionnaireId);

                for (var j = 0; j < deleteQuestionGroupIds.length; j++) {
                    var deleteQueGroupId = deleteQuestionGroupIds[j].Id;
                    deleteGroupIdList.push(deleteQueGroupId);
                } // Add Answer group data


                var answerGroups = questionnaire.AnswerGroups;

                if (answerGroups != null) {
                    LocalStorageUtility.addAnswerGroupData(answerGroups);
                }

                var valuationQuestions = questionnaire.ValuationQuestions; // Adding vauation questions data

                LocalStorageUtility.addValuationQuestionData(valuationQuestions, questionnaireId); // Adding valuation answer group data

                var valuationAnswerGroups = questionnaire.ValuationAnswerGroups;
                LocalStorageUtility.addValuationAnswerGroup(valuationAnswerGroups); // Adding evaluation for data

                var evaluatingFor = questionnaire.EvaluatingFor;
                LocalStorageUtility.deleteEvaluatingForPov(questionnaireId);
                LocalStorageUtility.addQueEvaluatingForData(evaluatingFor, questionnaire.PointOfView, questionnaireId); // Person Questionnnaire

                var allNewPQIdList = [];
                var newPersonQuestionnaire = questionnaire.NewPersonQuestionnaire;
                var pqId = null; // Adding person questionnaire data

                pqId = LocalStorageUtility.addPersonQuestionnaire(newPersonQuestionnaire);
                allNewPQIdList.push(pqId); // Person Questionnaire Answers

                var allPQAnswerIdList = []; // Adding person questionnaire answer data

                var newPersonQuestionAnswer = questionnaire.NewPersonQuestionnaire.Answers;

                for (var j = 0; j < newPersonQuestionAnswer.length; j++) {
                    var newPqAnswer = newPersonQuestionAnswer[j];
                    var pQQuestionId = newPqAnswer.QuestionId;
                    LocalStorageUtility.addPersonQuestionnaireAnswerTemplate(newPqAnswer, pqId);
                    allPQAnswerIdList.push(pQQuestionId);
                } // Fetch personQuestionAnswer ids which have to be deleted from the app.


                var deletePersonQuestionAnswerIds = LocalStorageUtility.getPersonQuestionAnswersForDelete(allPQAnswerIdList, pqId);

                for (var j = 0; j < deletePersonQuestionAnswerIds.length; j++) {
                    var deletePQueAnsId = deletePersonQuestionAnswerIds[j].Id;
                    var deleteQuestionId = deletePersonQuestionAnswerIds[j].questionId;
                    var idColl = {
                        'Id': deletePQueAnsId,
                        'questionId': deleteQuestionId
                    };
                    deletePQueAnsIds.push(idColl);
                }

                var newPersonQuestionValuationAnswer = questionnaire.NewPersonQuestionnaire.ValuationAnswers; // Adding person questionnaire valuation answer data

                LocalStorageUtility.addPersonValuationQuestionAnswerTemplate(newPersonQuestionValuationAnswer, pqId);

                var surveyHistory = questionnaire.SurveyHistory;
                if (surveyHistory != null && surveyHistory.length > 0) this.updateDownloadedSurveyAnswers(surveyHistory);

            } // Fetching the questionnaire ids which are unpublished at server, which have to be reflected in app


            var deleteQuestionnaireIds = LocalStorageUtility.getQuestionnaireIdForDelete(allQuestionnaireIdList, moduleName);

            for (var i = 0; i < deleteQuestionnaireIds.length; i++) {
                var questionnaireIdForDelete = deleteQuestionnaireIds[i].Id;
                deleteQuestionnaireIdList.push(questionnaireIdForDelete);
            }

            var questionManager = $injector.get('questionManager');
            var questionGroupManager = $injector.get('questionGroupManager'); // Question level Delete related code
            // Deleting data from only template table

            for (var i = 0; i < deletePQueAnsIds.length; i++) {
                var que = questionManager.getQuestion(deletePQueAnsIds[i].questionId);
                LocalStorageUtility.deletePersonQuestionAnswersTemplateById(deletePQueAnsIds[i].Id);
                LocalStorageUtility.saveOfflineDb();
                questionManager.removeInstance(que);
            } // Deleting questionnaire data


            for (var i = 0; i < deleteQuestionnaireIdList.length; i++) {
                var qId = deleteQuestionnaireIdList[i];
                var q = questionnaireManager.getQuestionnaire(qId); //pQuestionnaire.Questionnaire;

                var personQuestionnaireManager = $injector.get('personQuestionnaireManager');

                personQuestionnaireManager._processValuationQuestions(q);

                personQuestionnaireManager._processAnswerOptionsForQuestionnaire(q);

                var favoritesManager = $injector.get('favoritesManager');
                favoritesManager.deleteFavoritesById(qId);
                var qgs = q.Groups;

                for (var j = 0; j < qgs.length; j++) {
                    var qg = qgs[j];
                    var questions = qg.Questions;

                    for (var k = 0; k < questions.length; k++) {
                        var que = questions[k];
                        LocalStorageUtility.deleteQuestion(que.Id);
                        questionManager.removeInstance(que);
                    }

                    LocalStorageUtility.deleteQuestionGroup(qg.Id);
                    questionGroupManager.removeInstance(qg);
                }

                LocalStorageUtility.deleteQuestionnaire(q.Id);
                this.removeInstance(q);
                var pqTemplates = LocalStorageUtility.getPersonQuestionnaireByQuestionnaireId(q.Id);

                for (var z = 0; z < pqTemplates.length; z++) {
                    var pqTemplate = pqTemplates[z];
                    var answers = LocalStorageUtility.getPersonQuestionAnswersFromTemplate(pqTemplate.Id);
                    var valuationAnswers = LocalStorageUtility.getPersonValuationQuestionAnswersFromTemplate(pqTemplate.Id);
                    LocalStorageUtility.deletePersonValuationQuestionAnswerTemplate(pqTemplate.Id);
                    LocalStorageUtility.deletePersonQuestionAnswersTemplate(pqTemplate.Id);

                    personQuestionnaireManager._removeInstancesPersonQuestionAnswer(answers); //remove PersonValuationQuestionAnswer instances..


                    personQuestionnaireManager._removeInstancesPersonPVQAnswer(valuationAnswers);

                    LocalStorageUtility.deletePersonQuestionnaireTemplate(pqTemplate.Id);
                    personQuestionnaireManager.removeInstance(pqTemplate);
                }

                var personQuestionnaires = LocalStorageUtility.getPersonQuestionnairesByQuestionnaire(q.Id);

                for (var ques = 0; ques < personQuestionnaires.length; ques++) {
                    var pQuestionnaire = personQuestionnaires[ques];
                    this.deletePersonQuestionnaireByPqId(pQuestionnaire.Id);
                }
            } // Clearing the pool in all the levels


            questionnaireManager.resetPoolQuestionnaire(); // Saving the data

            var savepromise = LocalStorageUtility.saveOfflineDb();
            savepromise.promise.then(function () {
                def.resolve();
            });
            return def.promise;
        },
        updateDownloadedSurveyAnswers: function updateDownloadedSurveyAnswers(surveyHistory) {
            for (var i = 0; i < surveyHistory.length; i++) {

                var newPersonQuestionnaire = surveyHistory[i];
                var questionnaireId = newPersonQuestionnaire.QuestionnaireId;

                if (newPersonQuestionnaire.InitiatedDate.indexOf('/') != -1) {
                    newPersonQuestionnaire.InitiatedDate = DateUtil.getFormattedValue(new Date(newPersonQuestionnaire.InitiatedDate), 'dateTime');
                } else newPersonQuestionnaire.InitiatedDate = newPersonQuestionnaire.InitiatedDate;

                if (newPersonQuestionnaire.CompletedDate.indexOf('/') != -1) {
                    newPersonQuestionnaire.SurveyCompletedDate = DateUtil.getFormattedValue(new Date(newPersonQuestionnaire.CompletedDate), 'dateTime');
                }else newPersonQuestionnaire.SurveyCompletedDate = newPersonQuestionnaire.CompletedDate;

                var shouldCreateNewPQ = this.checkIfAnswersExist(questionnaireId, newPersonQuestionnaire);
                if (shouldCreateNewPQ) {
                    newPersonQuestionnaire.LastGroupIndex = 0;

                    var paq = LocalStorageUtility.savePersonQuestionnaireTemplate(newPersonQuestionnaire, true);

                    var newPersonQuestionAnswer = newPersonQuestionnaire.Answers;

                    LocalStorageUtility.savePersonQuestionAnswersTemplate(newPersonQuestionAnswer, paq.Id);

                    var newPersonQuestionValuationAnswer = newPersonQuestionnaire.ValuationAnswers;

                    LocalStorageUtility.savePersonValuationQAsTemplate(newPersonQuestionValuationAnswer, paq.Id);
                }
            }
        },
        checkIfAnswersExist: function checkIfAnswersExist(questionnaireId, newPersonQuestionnaire) {
            var allAnsweredSurvey = this.getCompletedSurveyQuestionnairesList();
            for (var i = 0; i < allAnsweredSurvey.length; i++) {
                var answeredSurvey = allAnsweredSurvey[i];
                if (answeredSurvey.Id == questionnaireId) {
                    for (var j = 0; j < answeredSurvey.Answers.length; j++) {
                        var answeredPQ = answeredSurvey.Answers[j].PersonQuestionnaire;

                        if (answeredPQ.InitiatedDate.split(' ')[0] == newPersonQuestionnaire.InitiatedDate.split(' ')[0])
                            return false;
                    }
                }
            }
            return true;
        },
        getPersonQuestionAnswers: function getPersonQuestionAnswers(pqId) {
            return personQuestionAnswerManager.loadByPersonQuestionnaire(pqId);
        },
        getPersonQuestionAnswersFromTemplate: function getPersonQuestionAnswersFromTemplate(pqId) {
            return personQuestionAnswerManager.getPersonQuestionAnswersFromTemplate(pqId);
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    return questionnaireManagerScope;
}]);
app.factory('personQuestionAnswerManager', ['PersonQuestionAnswer', 'LocalStorageUtility', 'questionManager', function (PersonQuestionAnswer, LocalStorageUtility, questionManager) {
    var personQuestionAnswerManager = {
        _pool: {},
        _retrieveInstance: function _retrieveInstance(personQuestionAnswerId, personQuestionAnswerData) {
            var pqaId = personQuestionAnswerId;
            var instance = this._pool[pqaId];

            if (instance) {
                instance.setData(personQuestionAnswerData);
            } else {
                instance = new PersonQuestionAnswer();
                instance.setData(personQuestionAnswerData);
                this._pool[pqaId] = instance;
            }

            return instance;
        },
        refreshPool: function refreshPool(oldEntity, newEntitySource) {
            var key = oldEntity.Id;
            var newKey = newEntitySource.Id;
            var pool = this._pool;
            delete pool[key];
            return this._retrieveInstance(newKey, newEntitySource);
        },
        removeInstance: function removeInstance(pqa) {
            var pqaId = pqa.Id;
            var pool = this._pool;
            delete pool[pqaId];
        },
        _searchByPersonQuestion: function _searchByPersonQuestion(personQuestionAnswerId) {
            return this._pool[personQuestionAnswerId];
        },
        _searchByPersonQuestionnaire: function _searchByPersonQuestionnaire(personQuestionnaireId) {
            var pqaPool = this._pool;
            var personQuestionnaireAnswers = [];

            for (var p in pqaPool) {
                if (!pqaPool.hasOwnProperty(p)) {
                    continue;
                }

                var val = pqaPool[p];

                if (val.PersonQuestionnaireId == personQuestionnaireId) {
                    personQuestionnaireAnswers.push(val);
                }
            }

            return personQuestionnaireAnswers;
        },
        _processAnswers: function _processAnswers(answers, isTemplate) {
            var entityAnswers = [];

            for (var i = 0; i < answers.length; i++) {
                var pqaData = answers[i];

                var pqaEntity = this._retrieveInstance(pqaData.Id, pqaData);

                pqaEntity.IsTemplate = isTemplate;
                var question = pqaEntity.Question;

                if (question == null) {
                    pqaEntity.Question = questionManager.getQuestion(pqaEntity.QuestionId);
                }

                entityAnswers.push(pqaEntity);
            }

            return entityAnswers;
        },
        _loadByPersonQuestionnaire: function _loadByPersonQuestionnaire(personQuestionnaireId) {
            var pqaCollection = LocalStorageUtility.getPersonQuestionAnswers(personQuestionnaireId);
            return this._processAnswers(pqaCollection, false);
        },
        _loadAnswersPqFromTemplate: function _loadAnswersPqFromTemplate(personQuestionnaireId) {
            var pqaCollection = LocalStorageUtility.getPersonQuestionAnswersFromTemplate(personQuestionnaireId);
            return this._processAnswers(pqaCollection, true);
        },

        /* Public Methods */

        /* Use this function in order to get a personQuestionAnswer instance by it's id */
        loadByPersonQuestionnaire: function loadByPersonQuestionnaire(personQuestionnaireId) {
            this._loadByPersonQuestionnaire(personQuestionnaireId);

            return this.getPersonQuestionAnswers(personQuestionnaireId);
        },
        getPersonQuestionAnswersFromTemplate: function getPersonQuestionAnswersFromTemplate(pqId) {
            var answers = this._searchByPersonQuestionnaire(pqId);

            if (answers.length === 0) {
                return this._loadAnswersPqFromTemplate(pqId);
            }

            return answers;
        },
        getPersonQuestionAnswers: function getPersonQuestionAnswers(personQuestionnaireId) {
            return this._searchByPersonQuestionnaire(personQuestionnaireId);
        },
        getPersonQuestionAnswer: function getPersonQuestionAnswer(personQuestionAnswerId) {
            return this._searchByPersonQuestion(personQuestionAnswerId);
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    return personQuestionAnswerManager;
}]);
app.factory('personValuationQuestionAnswerManager', ['PersonValuationQuestionAnswer', 'LocalStorageUtility', function (PersonValuationQuestionAnswer, LocalStorageUtility) {
    var personVQAManagerScope = {
        _pool: {},
        _retrieveInstance: function _retrieveInstance(personVQAId, personVQAData) {
            var instance = this._pool[personVQAId];

            if (instance) {
                instance.setData(personVQAData);
            } else {
                instance = new PersonValuationQuestionAnswer();
                instance.setData(personVQAData);
                this._pool[personVQAId] = instance;
            }

            return instance;
        },
        refreshPool: function refreshPool(oldEntity, newEntitySource) {
            var key = oldEntity.Id;
            var newKey = newEntitySource.Id;
            var pool = this._pool;
            delete pool[key];
            return this._retrieveInstance(newKey, newEntitySource);
        },
        removeInstance: function removeInstance(pvqa) {
            var pvqaId = pvqa.Id;
            var pool = this._pool;
            delete pool[pvqaId];
        },
        deleteFromLocalStorage: function deleteFromLocalStorage(pqId) {
            LocalStorageUtility.deletePersonValuationQuestionAnswers(pqId);
        },
        _searchByPersonQuestionnaire: function _searchByPersonQuestionnaire(personQuestionnaireId) {
            var pvqaPool = this._pool;
            var personVQAnswers = [];

            for (var p in pvqaPool) {
                if (!pvqaPool.hasOwnProperty(p)) {
                    continue;
                }

                var val = pvqaPool[p];

                if (val.PersonQuestionnaireId == personQuestionnaireId) {
                    personVQAnswers.push(val);
                }
            }

            return personVQAnswers;
        },
        _processValuationAnswer: function _processValuationAnswer(vAnswers, isTemplate) {
            var entityVAnswers = [];

            for (var i = 0; i < vAnswers.length; i++) {
                var pvqaData = vAnswers[i];

                var pvqaEntity = this._retrieveInstance(pvqaData.Id, pvqaData);

                pvqaEntity.IsTemplate = isTemplate;
                entityVAnswers.push(pvqaEntity);
            }

            return entityVAnswers;
        },
        _loadByPVQAnswer: function _loadByPVQAnswer(personQuestionnaireId) {
            var pvqaEntity = LocalStorageUtility.getPersonValuationQuestionAnswers(personQuestionnaireId);
            return this._processValuationAnswer(pvqaEntity, false);
        },
        _loadByPVQAnswerTemplate: function _loadByPVQAnswerTemplate(personQuestionnaireId) {
            var pvqaEntity = LocalStorageUtility.getPersonValuationQuestionAnswersFromTemplate(personQuestionnaireId);
            return this._processValuationAnswer(pvqaEntity, true);
        },
        loadPVQAnswer: function loadPVQAnswer(personQuestionnaireId) {
            var vqAnswers = this._searchByPersonQuestionnaire(personQuestionnaireId);

            if (vqAnswers.length === 0) {
                return this._loadByPVQAnswer(personQuestionnaireId);
            }

            return vqAnswers;
        },
        loadPVQAnswerByTemplate: function loadPVQAnswerByTemplate(personQuestionnaireId) {
            var vqAnswers = this._searchByPersonQuestionnaire(personQuestionnaireId);

            if (vqAnswers.length === 0) {
                return this._loadByPVQAnswerTemplate(personQuestionnaireId);
            }

            return vqAnswers;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    return personVQAManagerScope;
}]);
app.factory('questionnaireManager', ['Questionnaire', 'LocalStorageUtility', 'questionGroupManager', 'userDetailsManager', '$injector', 'valuationQuestionManager', '$q', function (Questionnaire, LocalStorageUtility, questionGroupManager, userDetailsManager, $injector, valuationQuestionManager, $q) {
    var questionnaireManagerScope = {
        _pool: {},
        _retrieveInstance: function _retrieveInstance(questionnaireId, questionnaireData) {
            var instance = this._pool[questionnaireId];

            if (instance) {
                instance.setData(questionnaireData);
            } else {
                instance = new Questionnaire();
                instance.setData(questionnaireData);
                this._pool[questionnaireId] = instance;
            }

            return instance;
        },
        removeInstance: function removeInstance(q) {
            var qId = q.Id;
            var pool = this._pool;
            delete pool[qId];
        },
        _search: function _search(questionnaireId) {
            return this._pool[questionnaireId];
        },
        _load: function _load(questionnaireId, questionnaireData) {
            return this._retrieveInstance(questionnaireId, questionnaireData);
        },
        loadQuestionnaireDeep: function loadQuestionnaireDeep(qId) {
            return this.loadQuestionnaire(qId);
        },
        getQuestionnaire: function getQuestionnaire(questionnaireId) {
            var q = this._search(questionnaireId);

            if (!q) {
                q = this.loadQuestionnaire(questionnaireId);
            }

            return q;
        },
        getEvaluatingFor: function getEvaluatingFor(qId, evaluatedId) {
            var queEntity = this._search(qId);

            if (queEntity.PointOfView === "Manager") {
                var managerSource = LocalStorageUtility.getManager(evaluatedId);
                return managerSource.text;
            } else {
                var evaluatingFor = queEntity.EvaluatingFor;

                for (var i = 0; i < evaluatingFor.length; i++) {
                    var evalEntity = evaluatingFor[i];

                    if (evalEntity.Id == evaluatedId) {
                        var evalText = evalEntity.TranslatedText;

                        if (evalText == null) {
                            evalText = evalEntity.Text;
                        }

                        return evalText;
                    }
                }
            }
        },
        getActiveQuestionnairesList: function getActiveQuestionnairesList(moduleName) {
            var queList = LocalStorageUtility.getActiveQuestionnairesList(moduleName);
            return this.getQuestionnaireList(queList);
        },
        getActiveSurveyQuestionnairesList: function getActiveSurveyQuestionnairesList() {
            var queList = LocalStorageUtility.getAllQuestionnaireForSurvey();
            return this.getQuestionnaireList(queList);
        },
        getQuestionnaireList: function getQuestionnaireList(queList) {
            //As of now not going to add to the cache since its only binding to the list ...
            var questionnaireList = [];

            for (var i = 0; i < queList.length; i++) {
                var questionnaireData = queList[i];
                var instance = new Questionnaire();
                instance.setData(questionnaireData);
                questionnaireList.push(instance);
            }

            return questionnaireList;
        },
        loadQuestionnaire: function loadQuestionnaire(questionnaireId) {
            var q = LocalStorageUtility.getQuestionnaireById(questionnaireId);
            var qgs = questionGroupManager.getQuestionGroups(questionnaireId);

            var entityQ = this._load(questionnaireId, q);

            entityQ.Groups = qgs;
            var typeCode = entityQ.TypeCode;
            var userDetails = userDetailsManager.getUserLastLoggedTimeStamp();
            entityQ.EvaluatingFor = this.getEvaluatingForList(entityQ.PointOfView, userDetails.UserId, typeCode, questionnaireId);
            var valuationQuestions = valuationQuestionManager.getValuationQuestion(questionnaireId);
            entityQ.ValuationQuestion = valuationQuestions;
            return entityQ;
        },
        // Fetching the list to be displayed as drop down
        // For departments only, performing a check and assigning a factory method name (To fetch user specific departments)
        getEvaluatingForList: function getEvaluatingForList(pov, userId, appId, qId) {
            var factoryToLoad = this._camelCase(pov) + 'Manager';

            if (pov === "Department") {
                //First get those which are only for the user questionnaire 
                var evalList = LocalStorageUtility.getEvaluatingForListForQuestionniarePov(qId, userId, pov);

                if (evalList.length > 0) {
                    var deptEntityList = [];

                    for (var i = 0; i < evalList.length; i++) {
                        var evalId = evalList[i].evalId;
                        var factoryMethodName = 'getDepartment';
                        var params = [evalId];

                        var listForDropDown = this._getListFromGenericCollection(factoryToLoad, factoryMethodName, params);

                        deptEntityList.push(listForDropDown);
                    }

                    return deptEntityList;
                } else {
                    var factoryMethodName = 'getDepartmentsByUser';
                    var params = [userId, appId];

                    var listForDropDown = this._getListFromGenericCollection(factoryToLoad, factoryMethodName, params);

                    return listForDropDown;
                }
            } else if (pov === "Manager") {
                var manager2QuestionnaireManager = $injector.get('manager2QuestionnaireManager');
                var evaluateList = manager2QuestionnaireManager.getAllUserManagersForQuestionnaire(userId, qId);
                return evaluateList;
            } else if (pov === "Person") {
                var evalList = LocalStorageUtility.getEvaluatingForListForQuestionniarePov(qId, userId, pov);

                if (evalList.length > 0) {
                    var personEntityList = [];

                    for (var i = 0; i < evalList.length; i++) {
                        var evalId = evalList[i].evalId;
                        var factoryMethodName = 'getPerson';
                        var params = [evalId];

                        var listForDropDown = this._getListFromGenericCollection(factoryToLoad, factoryMethodName, params);

                        personEntityList.push(listForDropDown);
                    }

                    return personEntityList;
                } else {
                    var personManager = $injector.get('personManager');
                    var listForDropDown = personManager.getAllPersonsByPovAndApplication(userId, appId);
                    return listForDropDown;
                }
            } else if (pov === "Activity" || pov === "ActivityModule") {
                var povCamelled = this._camelCase(pov);

                var evalList = LocalStorageUtility.getEvaluatingForListForQuestionniarePov(qId, userId, pov);

                if (evalList.length > 0) {
                    var entityList = [];

                    for (var i = 0; i < evalList.length; i++) {
                        var evalId = evalList[i].evalId;
                        var factoryMethodName = 'get' + pov;
                        var params = [evalId];

                        var listForDropDown = this._getListFromGenericCollection(factoryToLoad, factoryMethodName, params);

                        entityList.push(listForDropDown);
                    }

                    return entityList;
                } else {//TODO Handle for scenerio where the EvaluatingFor list 
                    //returns an empty array for Activity and ActivityModule
                }
            } else {
                var factoryMethodName = 'getAll' + pov; // TODO: here user id param is hard coded to null as user specific POV list yet to be implemented

                var params = null;

                var listForDropDown = this._getListFromGenericCollection(factoryToLoad, factoryMethodName, params);

                return listForDropDown;
            }
        },
        // This method fetches list from the generic managers in Entity helper
        _getListFromGenericCollection: function _getListFromGenericCollection(factoryToLoad, factoryMethodName, params) {
            try {
                var factoryManager = $injector.get(factoryToLoad);
                var evaluateList = factoryManager.executeFunctionByName(factoryMethodName, params);
                return evaluateList;
            } catch (e) { }

            return [];
        },
        _camelCase: function _camelCase(str) {
            return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
                if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces

                return index == 0 ? match.toLowerCase() : match.toUpperCase();
            });
        },
        deleteQuestionnaire: function deleteQuestionnaire(q) {
            var deletePromise = $q.defer();
            var qId = q.Id;
            var personQuestionnaireManager = $injector.get('personQuestionnaireManager'); // Get person questionnaire instance, if true, questionnaire is being used

            var pQuestionnaires = LocalStorageUtility.getPersonQuestionnairesByQuestionnaire(qId);
            var hasInstance = false;

            for (var j = 0; j < pQuestionnaires.length; j++) {
                var pQuestionnaire = pQuestionnaires[j];
                var pQueInstance = personQuestionnaireManager.getPersonQuestionnaire(pQuestionnaire.Id);
                var lastGroupindex = pQueInstance.LastGroupIndex;

                if (lastGroupindex) {
                    hasInstance = true;
                    break;
                }
            }

            if (!hasInstance) {
                var qgs = q.Groups;

                if (qgs.length !== 0) {
                    var groupId = qgs[0].Id;
                    var isUsed = LocalStorageUtility.checkIfGroupIsUsed(groupId);

                    if (!isUsed) {
                        //This method below will contain checks to remove and 
                        //AnswerGroup and AnswerOption for the questionnaire.
                        personQuestionnaireManager._processValuationQuestions(q);

                        personQuestionnaireManager._processAnswerOptionsForQuestionnaire(q);

                        var questionManager = $injector.get('questionManager');
                        var qgs = q.Groups;

                        for (var i = 0; i < qgs.length; i++) {
                            var qg = qgs[i];
                            var questions = qg.Questions;

                            for (var j = 0; j < questions.length; j++) {
                                var que = questions[j];
                                LocalStorageUtility.deleteQuestion(que.Id);
                                questionManager.removeInstance(que);
                            }

                            LocalStorageUtility.deleteQuestionGroup(qg.Id);
                            questionGroupManager.removeInstance(qg);
                        }
                    }
                }

                LocalStorageUtility.deleteQuestionnaire(q.Id);
                this.removeInstance(q);
                var pqTemplate = LocalStorageUtility.getPersonQuestionnaireByQuestionnaireTemplate(q.Id);
                var answers = LocalStorageUtility.getPersonQuestionAnswersFromTemplate(pqTemplate.Id);
                var valuationAnswers = LocalStorageUtility.getPersonValuationQuestionAnswersFromTemplate(pqTemplate.Id);
                LocalStorageUtility.deletePersonValuationQuestionAnswerTemplate(pqTemplate.Id);
                LocalStorageUtility.deletePersonQuestionAnswersTemplate(pqTemplate.Id);

                personQuestionnaireManager._removeInstancesPersonQuestionAnswer(answers); //remove PersonValuationQuestionAnswer instances..


                personQuestionnaireManager._removeInstancesPersonPVQAnswer(valuationAnswers);

                LocalStorageUtility.deletePersonQuestionnaireTemplate(pqTemplate.Id);
                personQuestionnaireManager.removeInstance(pqTemplate);
            } else {
                // If questionnaire is present in in-progress/completed section
                // do not delete the questionnaire.
                deletePromise.reject(false);
            } // Save database changes.


            var savePromise = LocalStorageUtility.saveOfflineDb();
            savePromise.promise.then(function () {
                deletePromise.resolve(true);
            });
            return deletePromise.promise;
        },
        // This method returns the list of evaluated id list which are sent as part of evaluatingfor array in questionnaire
        // Used for online dropdown search
        getEvalIdsList: function getEvalIdsList(qId, userId, pov) {
            return LocalStorageUtility.getEvaluatingForListForQuestionniarePov(qId, userId, pov);
        },
        resetPoolQuestionnaire: function resetPoolQuestionnaire() {
            var questionnaireFactories = ['personQuestionnaireManager', 'personQuestionAnswerManager', 'personValuationQuestionAnswerManager', 'questionnaireManager', 'questionGroupManager', 'questionManager', 'answerOptionManager', 'valuationQuestionManager', 'valuationAnswerOptionManager'];

            for (var i = 0; i < questionnaireFactories.length; i++) {
                var factoryToReset = questionnaireFactories[i];
                var factoryManager = $injector.get(factoryToReset);
                factoryManager.reset();
            }
        },
        getQuestionnaireFromPush: function getQuestionnaireFromPush(questionnaireId) {
            var queList = LocalStorageUtility.getAllQuestionnaires();
            var que = queList.filter(q => q.Id == questionnaireId);
            if (que.length > 0) return this.getQuestionnaire(que[0].Id);
            else {
                for (var i = 0; i < queList.length; i++) {
                    var queId = queList[i].Id.split('_')[0];
                    if (queId == questionnaireId.split('_')[0]) return this.getQuestionnaire(queList[i].Id);
                }
            }
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    return questionnaireManagerScope;
}]);
app.factory('questionGroupManager', ['QuestionGroup', 'LocalStorageUtility', 'questionManager', function (QuestionGroup, LocalStorageUtility, questionManager) {
    var questionGroupManagerScope = {
        _prefixConstant: '_',
        _pool: {},
        _retrieveInstance: function _retrieveInstance(questionGroupId, questionGroupData) {
            var instance = this._pool[this._prefixConstant + questionGroupId];

            if (instance) {
                instance.setData(questionGroupData);
            } else {
                instance = new QuestionGroup();
            }

            instance.setData(questionGroupData);
            this._pool[this._prefixConstant + questionGroupId] = instance;
            return instance;
        },
        removeInstance: function removeInstance(qg) {
            var qgId = qg.Id;
            var pool = this._pool;
            delete pool[this._prefixConstant + qgId];
        },
        _search: function _search(questionGroupId) {
            return this._pool[this._prefixConstant + questionGroupId];
        },
        _load: function _load(questionGroupId) {
            var qg = LocalStorageUtility.getQuestionGroup(questionGroupId);
            return this._retrieveInstance(questionGroupId, qg);
        },
        getQuestionGroups: function getQuestionGroups(questionnaireId) {
            var qgs = this._searchQuestionGroup(questionnaireId);

            if (qgs.length == 0) {
                return this._loadQuestionGroup(questionnaireId);
            }

            return qgs;
        },
        loadQuestionGroup: function loadQuestionGroup(questionnaireId) {
            return this._loadQuestionGroup(questionnaireId);
        },
        getQuestionGroup: function getQuestionGroup(questionGroupId) {
            var qgs = this._search(questionGroupId);

            if (!qgs) {
                return this._load(questionGroupId);
            }

            return qgs;
        },
        _loadQuestionGroup: function _loadQuestionGroup(questionnaireId) {
            var qgCollection = LocalStorageUtility.getQuestionGroupByQuestionnaireId(questionnaireId);
            var qgs = [];

            for (var i = 0; i < qgCollection.length; i++) {
                var qgData = qgCollection[i];

                var qg = this._retrieveInstance(qgData.Id, qgData);

                qg.Questions = questionManager.getQuestions(qg.Id);
                qgs.push(qg);
            }

            return qgs;
        },
        getQuestionGroupByGroupId: function getQuestionGroupByGroupId(questionGroupId) {
            return this._loadQuestionGroupByGroupId(questionGroupId);
        },
        _loadQuestionGroupByGroupId: function _loadQuestionGroupByGroupId(questionGroupId) {
            var qgCollection = LocalStorageUtility.getQuestionGroup(questionGroupId);
            var qg = '';

            if (qgCollection) {
                var qgData = qgCollection;
                qg = this._retrieveInstance(qgData.Id, qgData);
                qg.Questions = questionManager.getQuestions(qg.Id);
            }

            return qg;
        },
        _searchQuestionGroup: function _searchQuestionGroup(questionnaireId) {
            var qgPool = this._pool;
            var questionGroups = [];

            for (var p in qgPool) {
                if (!qgPool.hasOwnProperty(p)) {
                    continue;
                }

                var val = qgPool[p];

                if (val.QuestionnaireId == questionnaireId) {
                    questionGroups.push(val);
                }
            }

            return questionGroups;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    return questionGroupManagerScope;
}]);
app.factory('questionManager', ['Question', 'QuestionTrigger', 'LocalStorageUtility', 'answerOptionManager', function (Question, QuestionTrigger, LocalStorageUtility, answerOptionManager) {
    var questionScope = {
        _prefixConstant: '_',
        _pool: {},
        _retrieveInstance: function _retrieveInstance(questionId, questionData) {
            var instance = this._pool[this._prefixConstant + questionId];

            if (instance) {
                instance.setData(questionData);
            } else {
                instance = new Question();
                instance.setData(questionData);
                this._pool[this._prefixConstant + questionId] = instance;
            }

            return instance;
        },
        removeInstance: function removeInstance(que) {
            var queId = que.Id;
            var pool = this._pool;
            delete pool[this._prefixConstant + queId];
        },
        _search: function _search(questionId) {
            return this._pool[this._prefixConstant + questionId];
        },
        _load: function _load(questionId) {
            var questionData = LocalStorageUtility.getQuestion(questionId);
            return this._retrieveInstance(questionId, questionData);
        },
        getQuestion: function getQuestion(questionId) {
            var q = this._search(questionId);

            if (!q) {
                return this._load(questionId);
            }

            return q;
        },
        getQuestions: function getQuestions(questionGroupId) {
            var questionsCollection = LocalStorageUtility.getQuestionByQuestionGroupId(questionGroupId);
            var qs = [];

            for (var i = 0; i < questionsCollection.length; i++) {
                var qData = questionsCollection[i];
                var questionId = qData.Id;

                var q = this._retrieveInstance(questionId, qData);

                var isTriggerQuestion = LocalStorageUtility.getIfTriggerQuestion(questionId);
                var isDependentQuestion = LocalStorageUtility.getIfDependentQuestion(questionId);
                q.IsTriggerQuestion = isTriggerQuestion;
                q.IsDependentQuestion = isDependentQuestion;

                if (isTriggerQuestion === true) {
                    q.DependentQuestions = this.getDependentQuestionsforTriggerQuestion(q.Id);
                }

                if (isDependentQuestion === true) {
                    q.QuestionTriggers = this.getQuestionTriggersForDependentQuestion(q.Id);
                }

                q.IsDependencyMet = q.initialDependencyMet();
                q.AnswerOptions = answerOptionManager.getAnswerOptionsByQuestion(questionId);
                qs.push(q);
            }

            return qs;
        },
        getQuestionTriggersForDependentQuestion: function getQuestionTriggersForDependentQuestion(dependentQuestionId) {
            var qtList = LocalStorageUtility.getTriggerQuestionsForDependentQuestion(dependentQuestionId);
            var questionTriggers = [];

            for (var i = 0; i < qtList.length; i++) {
                var qt = qtList[i];
                var qtEnt = new QuestionTrigger();
                qtEnt.setData(qt);
                questionTriggers.push(qtEnt);
            }

            return questionTriggers;
        },
        getDependentQuestionsforTriggerQuestion: function getDependentQuestionsforTriggerQuestion(triggerQuestionId) {
            var dependentQuestionList = LocalStorageUtility.getDependentQuestionsForTriggerQuestion(triggerQuestionId);
            var depQueList = [];

            for (var i = 0; i < dependentQuestionList.length; i++) {
                var question = dependentQuestionList[i];
                var questionId = question.questionId;
                var queEntity = this.getQuestion(questionId);
                depQueList.push(queEntity);
            }

            return depQueList;
        },
        getAnswerOptionByQuestion: function getAnswerOptionByQuestion(questionId) {//LocalStorageUtility.getqu
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    return questionScope;
}]);
app.factory('answerOptionManager', ['AnswerOption', 'LocalStorageUtility', function (AnswerOption, LocalStorageUtility) {
    var answerOptionScope = {
        _prefixConstant: '_',
        _pool: {},
        _retrieveInstance: function _retrieveInstance(answerOptionId, answerData) {
            var instance = this._pool[this._prefixConstant + answerOptionId];

            if (instance) {
                instance.setData(answerData);
            } else {
                instance = new AnswerOption();
                instance.setData(answerData);
                this._pool[this._prefixConstant + answerOptionId] = instance;
            }

            return instance;
        },
        removeInstance: function removeInstance(ao) {
            var aoId = ao.Id;
            var pool = this._pool;
            delete pool[this._prefixConstant + aoId];
        },
        removeAnswerOptions: function removeAnswerOptions(aoList) {
            for (var i = 0; i < aoList.length; i++) {
                this.removeInstance(aoList[i]);
            }
        },
        _search: function _search(answerOptionId) {
            return this._pool[this._prefixConstant + answerOptionId];
        },
        _load: function _load(answerOptionId) {
            var answerData = LocalStorageUtility.getAnswerOption(answerOptionId);
            return this._retrieveInstance(answerOptionId, answerData);
        },
        getAnswerOption: function getAnswerOption(answerOptionId) {
            return this._load(answerOptionId);
        },
        getAnswerOptionsByQuestion: function getAnswerOptionsByQuestion(questionId) {
            var answerOptionsCollection = LocalStorageUtility.getAnswerOptionsByQuestion(questionId);
            var ao = [];

            for (var i = 0; i < answerOptionsCollection.length; i++) {
                var aoData = answerOptionsCollection[i];

                var aoSingle = this._retrieveInstance(aoData.Id, aoData);

                ao.push(aoSingle);
            }

            return ao;
        },
        getAnswerOptionsByQuestionnaire: function getAnswerOptionsByQuestionnaire(questionnaireId) {
            var answerOptionsCollection = LocalStorageUtility.getAnswerOptionsByQuestionnaire(questionnaireId);
            var ao = [];

            for (var i = 0; i < answerOptionsCollection.length; i++) {
                var aoData = answerOptionsCollection[i];

                var aoSingle = this._retrieveInstance(aoData.Id, aoData);

                ao.push(aoSingle);
            }

            return ao;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    return answerOptionScope;
}]);
app.factory('valuationQuestionManager', ['ValuationQuestion', 'LocalStorageUtility', 'valuationAnswerOptionManager', function (ValuationQuestion, LocalStorageUtility, valuationAnswerOptionManager) {
    var valuationQuestionScope = {
        _prefixConstant: '_',
        _pool: {},
        _retrieveInstance: function _retrieveInstance(valuationQuestionId, valuationQuestionData) {
            var instance = this._pool[this._prefixConstant + valuationQuestionId];

            if (instance) {
                instance.setData(valuationQuestionData);
            } else {
                instance = new ValuationQuestion();
                instance.setData(valuationQuestionData);
                this._pool[this._prefixConstant + valuationQuestionId] = instance;
            }

            return instance;
        },
        _search: function _search(valuationQuestionId) {
            return this._pool[this._prefixConstant + valuationQuestionId];
        },
        _load: function _load(valuationQuestionId, valuationQuestionData) {
            return this._retrieveInstance(valuationQuestionId, valuationQuestionData);
        },
        _removeInstance: function _removeInstance(valuationQueId) {
            var valuationQueInstance = this._pool;
            delete valuationQueInstance[this._prefixConstant + valuationQueId];
        },
        removeValuationQueById: function removeValuationQueById(valuationQueId) {
            this._removeInstance(valuationQueId);
        },
        getValuationQuestion: function getValuationQuestion(questionnaireId) {
            var valuationQuestionsCollection = LocalStorageUtility.getValuationQuestionsByQuestionnaireId(questionnaireId);
            var vqc = [];

            for (var i = 0; i < valuationQuestionsCollection.length; i++) {
                var valuationQuestionData = valuationQuestionsCollection[i];

                var vq = this._load(valuationQuestionData.Id, valuationQuestionData);

                vq.ValuationAnswerOption = valuationAnswerOptionManager.getValuationAnswerOptionByVQId(valuationQuestionData.Id);
                vqc.push(vq);
            }

            return vqc;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    return valuationQuestionScope;
}]);
app.factory('valuationAnswerOptionManager', ['ValuationAnswerOption', 'LocalStorageUtility', function (ValuationAnswerOption, LocalStorageUtility) {
    var valuationAnswerOptionScope = {
        _prefixConstant: '_',
        _pool: {},
        _retrieveInstance: function _retrieveInstance(vAnswerOptionId, vAnswerOptionData) {
            var instance = this._pool[this._prefixConstant + vAnswerOptionId];

            if (instance) {
                instance.setData(vAnswerOptionData);
            } else {
                instance = new ValuationAnswerOption();
                instance.setData(vAnswerOptionData);
                this._pool[this._prefixConstant + vAnswerOptionId] = instance;
            }

            return instance;
        },
        _search: function _search(vAnswerOptionId) {
            return this._pool[this._prefixConstant + vAnswerOptionId];
        },
        _load: function _load(vAnswerOptionId, vAnswerOptionData) {
            return this._retrieveInstance(vAnswerOptionId, vAnswerOptionData);
        },
        _removeInstance: function _removeInstance(vAnswerOptionId) {
            var vAOInstance = this._pool;
            delete vAOInstance[this._prefixConstant + vAnswerOptionId];
        },
        removeVAnsweroptionById: function removeVAnsweroptionById(vAnswerOptionId) {
            this._removeInstance(vAnswerOptionId);
        },
        getValuationAnswerOptionByVQId: function getValuationAnswerOptionByVQId(valuationQueId) {
            var vAOCollection = LocalStorageUtility.getValuationAnswerOptionsByValuationQuestion(valuationQueId);
            var vAO = [];

            for (var i = 0; i < vAOCollection.length; i++) {
                var vAOData = vAOCollection[i];

                var vAOSingleVal = this._load(vAOData.Id, vAOData);

                vAO.push(vAOSingleVal);
            }

            return vAO;
        },
        getValuationAnswerOptionByVAOId: function getValuationAnswerOptionByVAOId(valuationAOId) {
            var valuationAO = this._pool[this._prefixConstant + valuationAOId];

            if (!valuationAO) {
                valuationAO = LocalStorageUtility.getValuationAnswerOptionByVAOId(valuationAOId);
            }

            return valuationAO;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    return valuationAnswerOptionScope;
}]);
app.factory('userDetailsManager', ['UserDetails', 'LocalStorageUtility', 'departmentManager', 'customersManager', 'LocalStorageHelper', '$q', '$rootScope', 'documentLibraryManager', 'FileUtil', 'newsManager', function (UserDetails, LocalStorageUtility, departmentManager, customersManager, LocalStorageHelper, $q, $rootScope, documentLibraryManager, FileUtil, newsManager) {
    var userDetailsScope = {
        _pool: {},
        _retrieveInstance: function _retrieveInstance(userName, userDetailsData) {
            var instance = this._pool[userName];

            if (instance) {
                instance.setData(userDetailsData);
            } else {
                instance = new UserDetails();
                instance.setData(userDetailsData);
                this._pool[userName] = instance;
            }

            return instance;
        },
        _search: function _search(userName) {
            return this._pool[userName];
        },
        _load: function _load(userName) {
            var userDetails = LocalStorageUtility.getUserDetailsByUserName(userName);

            var userEntity = this._retrieveInstance(userName, userDetails); //userEntity.Departments = departmentManager.getDepartmentsByUser(userEntity.UserId);


            var customer = customersManager.getCustomers();
            userEntity.Customer = customer;
            return userEntity;
        },
        _loadByLastTimeStamp: function _loadByLastTimeStamp() {
            var userDetails = LocalStorageUtility.getUserNameByLoggedInTimeStamp();

            if (userDetails.length > 0) {
                var user = userDetails[0];

                var userEntity = this._retrieveInstance(user.userName, user); //userEntity.Departments = departmentManager.getDepartmentsByUser(userEntity.UserId);


                var customer = customersManager.getCustomers();
                userEntity.Customer = customer;
                return userEntity;
            }

            return null;
        },
        saveUserCustomer: function saveUserCustomer(customerEntity) {
            customersManager.saveCustomer(customerEntity);
        },
        saveCameraImageQualityToCustomer: function saveCameraImageQualityToCustomer(custEntity) {
            customersManager.saveCameraImageQuality(custEntity);
        },
        saveImageToGallerySetting: function saveImageToGallerySetting(customerEntity) {
            customersManager.saveImageToGallerySetting(customerEntity);
        },
        saveReadAloudSpeedToCustomer: function saveReadAloudSpeedToCustomer(custEntity) {
            customersManager.saveReadAloudSpeed(custEntity);
        },
        getUserDetailsData: function getUserDetailsData(userName) {
            return this._load(userName);
        },
        getUserLastLoggedTimeStamp: function getUserLastLoggedTimeStamp() {
            return this._loadByLastTimeStamp();
        },
        getIfdownloadValidForAll: function getIfdownloadValidForAll() {
            return LocalStorageUtility.getIfdownloadValidForAll();
        },
        getIfdownloadValidForType: function getIfdownloadValidForType(type) {
            return LocalStorageUtility.getIfdownloadValidForType(type);
        },
        reset: function reset() {
            this._pool = {};
        },
        removeImagesPDF: function removeImagesPDF() {
            // This method is called while master reset is done
            var promiseList = [];
            var subDirPDFFiles = 'TempFiles';
            var deleteFilePromise = FileUtil.deleteDirectory(subDirPDFFiles);
            promiseList.push(deleteFilePromise);
            var subDirImageFiles = 'ImageFiles';
            var deleteImagePromise = FileUtil.deleteDirectory(subDirImageFiles);
            promiseList.push(deleteImagePromise);
            return promiseList;
        },
        resetUserData: function resetUserData() {
            var def = $q.defer();
            var userDetails = this.getUserLastLoggedTimeStamp();
            var personId = userDetails.PersonId;
            var userId = userDetails.UserId;
            var promListLength = 0;
            $rootScope.totalCountPdfImage = 0;
            var pdfImageClearPromList = this.removeImagesPDF();
            promListLength = pdfImageClearPromList.length;

            if (pdfImageClearPromList.length > 0) {
                for (var i = 0; i < pdfImageClearPromList.length; i++) {
                    var promise = pdfImageClearPromList[i];
                    promise.then(function (success) {
                        $rootScope.totalCountPdfImage += 1;
                    }, function (fail) {
                        $rootScope.totalCountPdfImage += 1;
                    });
                }
            }

            var unBindWatch = $rootScope.$watch("totalCountPdfImage", function (totalCountPdfImage) {
                if (totalCountPdfImage === promListLength && totalCountPdfImage > 0) {
                    // Removing actual document library files stored in filesystem before doing a reset.
                    var promArray = [];
                    var docPromise = documentLibraryManager.removeDocumentLibrary();
                    var newsDelProm = newsManager.deleteAllNewsOnReset();
                    promArray.push(docPromise);
                    promArray.push(newsDelProm);
                    $q.all(promArray).then(function (success) {
                        LocalStorageUtility.removeActionPlanWizardData(personId);
                        LocalStorageUtility.removeAskadeData(personId);
                        LocalStorageUtility.removeQuestionnaireData();
                        LocalStorageUtility.deleteGenericTablesData();
                        LocalStorageUtility.deletePersonsAll();
                        LocalStorageUtility.deleteAllFavorite();
                        LocalStorageUtility.deleteDepartmentsForUser(userId);
                        LocalStorageUtility.deletePersonsForUser(userId);
                        LocalStorageUtility.deleteUserApplicationsForUser(userId);
                        LocalStorageUtility.deleteDownloadLogForUser(userId);
                        var saveProm = LocalStorageUtility.saveOfflineDb();
                        saveProm.promise.then(function (success) {
                            // Performing an emit, so as to create the sub folders for images and temp after reset
                            $rootScope.$emit('createDirectories');
                            def.resolve();
                        });
                    }); // Added to prevent mutiple times $watch getting called/ Clearing the watch instance

                    unBindWatch();
                }
            });
            return def.promise;
        },
        saveUserPreferredLanguage: function saveUserPreferredLanguage(language) {
            return LocalStorageUtility.saveUserPreferredLanguage(language);
        },
        updateUserSpecificDetails: function updateUserSpecificDetails(resetArea) {
            var def = $q.defer();
            var userDetails = this.getUserLastLoggedTimeStamp();
            var custName = userDetails.Customer.UniqueUrlPart;
            var onlineVal = userDetails.Customer.OnlineVal;
            var ckey = userDetails.Customer.CKey;
            var isCustomUrlEnabled = userDetails.Customer.IsCustomUrlEnabled;
            var userName = userDetails.UserName;
            var userId = userDetails.UserId;

            switch (resetArea) {
                case 'Departments':
                    // TODO: Below line is commented as if selected department in In-Progrss/Completed section 
                    // is deleted in the Web then it will throw an error (should be handled)
                    //LocalStorageUtility.deleteDepartmentsForUser(userId);
                    // TODO: if there is nothing in inprogress/completed, then delete and re-download the departments
                    var updateDeptPromise = LocalStorageHelper.updateDepartmentDetails(userId);
                    updateDeptPromise.then(function () {
                        $rootScope.$emit('refreshUserProfile');
                        def.resolve();
                    }, function () {
                        def.reject();
                    });
                    break;

                case 'Applications':
                    // Removed delete of user application on refresh of Application. As if access is removed for the channel and the channel
                    // has pending answer, channel should not be deleted.
                    //LocalStorageUtility.deleteUserApplicationsForUser(userId);
                    var updateAppPromise = LocalStorageHelper.updateUserApplicationsDetails(userId);
                    updateAppPromise.then(function () {
                        def.resolve();
                    }, function () {
                        def.reject();
                    });
                    break;

                case 'Persons':
                    // Below line is commented as if selected person in In-Progrss/Completed section 
                    // is deleted in the Web then it will throw an error (should be handled)
                    //LocalStorageUtility.deletePersonsForUser(userId);
                    // TODO: if there is nothing in inprogress/completed, then delete and re-download the departments
                    var updatePersonPromise = LocalStorageHelper.updatePersonDetails(userId);
                    updatePersonPromise.then(function () {
                        def.resolve();
                    }, function () {
                        def.reject();
                    });
                    break;

                case 'Resources':
                    var updateResourcePromise = LocalStorageHelper.updateResourceDetails();
                    updateResourcePromise.then(function () {
                        def.resolve();
                    }, function () {
                        def.reject();
                    });
                    break;

                case 'Icons':
                    var updateIconsPromise = LocalStorageHelper.updateIconsDetails();
                    updateIconsPromise.then(function () {
                        def.resolve();
                    }, function () {
                        def.reject();
                    });
                    break;

                case 'Suite':
                    var updateSuitePromise = LocalStorageHelper.updateSuiteDetails(custName, onlineVal, isCustomUrlEnabled, ckey);
                    updateSuitePromise.then(function () {
                        // $rootScope.$emit('RenderButtonBgHeaderColor');
                        $rootScope.$emit('darkModeEnable');
                        def.resolve();
                    }, function () {
                        def.reject();
                    });
                    break;

                case 'User Details':
                    var updateUserDetailPromise = LocalStorageHelper.updateUserDetails(userName);
                    updateUserDetailPromise.then(function () {
                        def.resolve();
                    }, function () {
                        def.reject();
                    });
                    break;

                default:
                    break;
            }

            return def.promise;
        },
        // Deleting all user records except current user record
        deleteUserRecord: function deleteUserRecord() {
            var currentUserRecord = this.getUserLastLoggedTimeStamp();
            var currentUserId = currentUserRecord.UserId;
            LocalStorageUtility.deleteUserRecord(currentUserId);
            LocalStorageUtility.saveOfflineDb();
        },
        getLastDownloadedStartDate: function getLastDownloadedStartDate() {
            var downlodedList = LocalStorageUtility.getDownloadLogList();

            for (var i = 0; i < downlodedList.length; i++) {
                var val = downlodedList[i]; // Discarding UserDetails as this is not downloaded again after login.

                if (val.type === "UserDetails") {
                    var index = downlodedList.indexOf(val);

                    if (index > -1) {
                        downlodedList.splice(index, 1);
                    }
                }
            }

            var leastDate = new Date(Math.min.apply(null, downlodedList.map(function (e) {
                return new Date(e.startDate);
            })));
            return leastDate;
        }
    };
    return userDetailsScope;
}]);
app.factory('userApplicationsManager', ['Application', 'LocalStorageUtility', 'personQuestionnaireManager', 'personApwManager', 'personAskadeFileTypeWizardManager', 'questionnaireManager', 'actionPlanWizardManager', 'askadeFileTypeWizardManager', 'documentLibraryManager', function (Application, LocalStorageUtility, personQuestionnaireManager, personApwManager, personAskadeFileTypeWizardManager, questionnaireManager, actionPlanWizardManager, askadeFileTypeWizardManager, documentLibraryManager) {
    var userApplicationsScope = {
        _pool: {},
        _retrieveInstance: function _retrieveInstance(userId, applicationData) {
            var appId = applicationData.applicationId;
            var poolId = userId + '|' + appId;
            var instance = this._pool[poolId];
            var application = LocalStorageUtility.getApplication(appId);

            if (instance) {
                instance.setData(application, applicationData);
            } else {
                instance = new Application();
                instance.setData(application, applicationData);
                this._pool[poolId] = instance;
            }

            return instance;
        },
        _search: function _search(poolId) {
            return this._pool[poolId];
        },
        _load: function _load(userId, userApp) {
            return this._retrieveInstance(userId, userApp);
        },
        getUserApplicationByText: function getUserApplicationByText(userId, appText) {
            var appId = LocalStorageUtility.getApplicationIdByText(appText);
            return this.getUserApplication(userId, appId);
        },
        getUserApplication: function getUserApplication(userId, applicationId) {
            var poolId = userId + '|' + applicationId;

            var appEnt = this._search(poolId);

            if (!appEnt) {
                var app = LocalStorageUtility.getApplication(applicationId);
                appEnt = this._load(userId, app);
            }

            return appEnt;
        },
        getUserApplications: function getUserApplications(userId) {
            var userApplications = [];
            var userApps = LocalStorageUtility.getUserApplicationsByUser(userId);

            for (var i = 0; i < userApps.length; i++) {
                var userApp = userApps[i];
                var isModuleDisable = userApp.isApplicationModuleDisable; // Application Disable value is set if the channel has been removed

                if (!isModuleDisable) {
                    // If it is not disabled add the user application.
                    var poolId = userId + '|' + userApp.applicationId;

                    var userApplication = this._search(poolId);

                    if (userApplication === undefined) {
                        var userAppEnt = this._load(userId, userApp);

                        userApplications.push(userAppEnt);
                    } else {
                        userApplications.push(userApplication);
                    }
                } else {
                    // If application is removed. Check if any pending answers present.
                    // If present channel should not be deleted.
                    var appVal = LocalStorageUtility.getApplication(userApp.applicationId);
                    var isModuleValidCount = this.checkInProgressCompleted(appVal.text);

                    if (isModuleValidCount > 0) {
                        // Dont delete the channel/module
                        var poolId = userId + '|' + userApp.applicationId;

                        var userAppEnt = this._load(userId, userApp);

                        userApplications.push(userAppEnt);
                    } else {
                        // Delete channel/module and data
                        var appData = LocalStorageUtility.getApplication(userApp.applicationId);
                        this.deletePublishedData(appData.text);
                        this.deleteUserApplicationByAppId(userApp.applicationId);
                    }
                }
            }

            return userApplications.sort(function (a, b) {
                if (a.SortOrder == b.SortOrder) return 0;
                if (a.SortOrder > b.SortOrder) return 1;
                if (a.SortOrder < b.SortOrder) return -1;
            });
        },
        checkInProgressCompleted: function checkInProgressCompleted(moduleName) {
            var isValidModuleCount = 0;

            switch (moduleName) {
                case 'Apv':
                case 'RiskProfile':
                case 'EmployeeSatisfaction':
                case 'ManagementEvaluation':
                case 'Insurance':
                case 'HumanResource':
                case 'FrontPlanner':
                    var inprogressCountQue = personQuestionnaireManager.getInProgressQuestionnairesListCount(moduleName);
                    var completedCountQue = personQuestionnaireManager.getCompletedQuestionnairesListCount(moduleName);
                    isValidModuleCount = inprogressCountQue + completedCountQue;
                    return isValidModuleCount;

                case 'ActionPlan':
                    var inprogressCountAPW = personApwManager.getInProgressPersonAPWListCount();
                    var completedCountAPW = personApwManager.getCompletedPersonAPWListCount();
                    isValidModuleCount = inprogressCountAPW + completedCountAPW;
                    return isValidModuleCount;

                case 'Askade':
                case 'Claim':
                    var inprogressCountCase = personAskadeFileTypeWizardManager.getInProgressPAskadeCount(moduleName);
                    var completedCountCase = personAskadeFileTypeWizardManager.getCompletedPAskadeCount(moduleName);
                    isValidModuleCount = inprogressCountCase + completedCountCase;
                    return isValidModuleCount;

                case 'DocumentLibrary':
                    return 0;

                default:
                    return false;
            }
        },
        deletePublishedData: function deletePublishedData(moduleName) {
            switch (moduleName) {
                case 'Apv':
                case 'RiskProfile':
                case 'EmployeeSatisfaction':
                case 'ManagementEvaluation':
                case 'Insurance':
                case 'HumanResource':
                case 'FrontPlanner':
                    var publishedQue = questionnaireManager.getActiveQuestionnairesList(moduleName);

                    for (var i = 0; i < publishedQue.length; i++) {
                        var q = publishedQue[i];
                        questionnaireManager.deleteQuestionnaire(q);
                    }

                    break;

                case 'ActionPlan':
                    var publishedAP = actionPlanWizardManager.getActiveActionPlanProblemList();

                    for (var i = 0; i < publishedAP.length; i++) {
                        var pApw = publishedAP[i];
                        actionPlanWizardManager.deleteActionPlanWizard(pApw);
                    }

                    break;

                case 'Askade':
                case 'Claim':
                    var publishedCase = askadeFileTypeWizardManager.getAllCaseFileTypeWizard(moduleName);

                    for (var i = 0; i < publishedCase.length; i++) {
                        var pAkW = publishedCase[i];
                        askadeFileTypeWizardManager.deleteAskadeWizard(pAkW);
                    }

                    break;

                case 'DocumentLibrary':
                    var docPromise = documentLibraryManager.removeDocumentLibrary();
                    docPromise.then(function () {// Success
                    });
                    break;

                default:
                    break;
            }
        },
        deleteUserApplicationByAppId: function deleteUserApplicationByAppId(appId) {
            LocalStorageUtility.deleteUserApplicationByAppId(appId);
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    return userApplicationsScope;
}]);
/*ActionPlan*/

app.factory('actionPlanWizardStepColumnManager', ['ActionPlanWizardStepColumn', 'LocalStorageUtility', function (ActionPlanWizardStepColumn, LocalStorageUtility) {
    var actionPlanWizardStepColumnManagerScope = {
        _prefixConstant: '_',
        _pool: {},
        _retrieveInstance: function _retrieveInstance(apwStepColumnId, apwStepColumnData) {
            var instance = this._pool[this._prefixConstant + apwStepColumnId];

            if (instance) {
                instance.setData(apwStepColumnData);
            } else {
                instance = new ActionPlanWizardStepColumn();
                instance.setData(apwStepColumnData);
                this._pool[this._prefixConstant + apwStepColumnId] = instance;
            }

            return instance;
        },
        _search: function _search(apwStepColumnId) {
            return this._pool[this._prefixConstant + apwStepColumnId];
        },
        _load: function _load(apwStepColumnId, apwStepColumnData) {
            return this._retrieveInstance(apwStepColumnId, apwStepColumnData);
        },
        getApwStepColumn: function getApwStepColumn(apwStepColumnId) {
            var apwStepColumn = this._search(apwStepColumnId);

            if (!apwStepColumn) {
                apwStepColumn = this.loadActionPlanWizardStepColumn(apwStepColumnId);
            }

            return apwStepColumn;
        },
        getApwStepColumnByStepId: function getApwStepColumnByStepId(apwStepId) {
            var stepColumns = LocalStorageUtility.getActionPlanWizardStepColumnByStep(apwStepId);
            var entityStepColumns = [];

            for (var i = 0; i < stepColumns.length; i++) {
                var stepCol = stepColumns[i];

                var entiyStepColumn = this._load(stepCol.Id, stepCol);

                entityStepColumns.push(entiyStepColumn);
            }

            return entityStepColumns;
        },
        loadActionPlanWizardStepColumn: function loadActionPlanWizardStepColumn(apwStepColumnId) {
            var apwStepColumn = LocalStorageUtility.getActionPlanWizardStepColumn(apwStepColumnId);
            return this._load(apwStepColumnId, apwStepColumn);
        },
        removeInstance: function removeInstance(stepCol) {
            var colId = stepCol.Id;
            var pool = this._pool;
            delete pool[this._prefixConstant + colId];
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    return actionPlanWizardStepColumnManagerScope;
}]); //ActionPlanWizardStepColumnGuide-------------------------------------------

app.factory('actionPlanWizardStepColumnGuideManager', ['ActionPlanWizardStepColumnGuide', 'LocalStorageUtility', function (ActionPlanWizardStepColumnGuide, LocalStorageUtility) {
    var actionPlanWizardStepColumnGuideManagerScope = {
        _prefixConstant: '_',
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(apCategoryWizardStepColumnGuideId, apCategoryWizardStepColumnGuideData) {
            var instance = this._pool[this._prefixConstant + apCategoryWizardStepColumnGuideId];

            if (instance) {
                instance.setData(apCategoryWizardStepColumnGuideData);
            } else {
                instance = new ActionPlanWizardStepColumnGuide();
                instance.setData(apCategoryWizardStepColumnGuideData);
                this._pool[this._prefixConstant + apCategoryWizardStepColumnGuideId] = instance;
            }

            return instance;
        },
        _search: function _search(apCategoryWizardStepColumnGuideId) {
            return this._pool[this._prefixConstant + apCategoryWizardStepColumnGuideId];
        },
        _load: function _load(apCategoryWizardStepColumnGuideId, apCategoryWizardStepColumnGuideData) {
            return this._retrieveInstance(apCategoryWizardStepColumnGuideId, apCategoryWizardStepColumnGuideData);
        },
        loadApCategoryWizardStepColumnGuide: function loadApCategoryWizardStepColumnGuide(apCategoryWizardStepColumnGuideId, apWizStepId) {
            var apCategoryWizardStepColumnGuide = LocalStorageUtility.getActionPlanCategoryWizardStepColumnGuide(apCategoryWizardStepColumnGuideId, apWizStepId);
            return this._load(apCategoryWizardStepColumnGuideId, apCategoryWizardStepColumnGuide);
        },
        getApCategoryWizardStepColumnGuide: function getApCategoryWizardStepColumnGuide(apCategoryWizardStepColumnGuideId, apWizStepId) {
            var apCategoryWizardStepColumnGuide = this._search(apCategoryWizardStepColumnGuideId);

            if (!apCategoryWizardStepColumnGuide) {
                apCategoryWizardStepColumnGuide = this.loadApCategoryWizardStepColumnGuide(apCategoryWizardStepColumnGuideId, apWizStepId);
            }

            return apCategoryWizardStepColumnGuide;
        },
        getApCategoryWizardStepColumnGuideById: function getApCategoryWizardStepColumnGuideById(apCategoryWizardStepColumnGuideId) {
            var apCategoryWizardStepColumnGuide = this._search(apCategoryWizardStepColumnGuideId);

            if (apCategoryWizardStepColumnGuide) {
                return apCategoryWizardStepColumnGuide;
            }

            return null;
        },
        getAllApCategoryWizardStepColumnsGuide: function getAllApCategoryWizardStepColumnsGuide(apWizStepId) {
            var apCategoryWizardStepColumnGuides = LocalStorageUtility.getAllActionPlanCategoryWizardStepColumnGuide(apWizStepId);
            var entityApCategoryWizardStepColumnGuides = [];

            for (var i = 0; i < apCategoryWizardStepColumnGuides.length; i++) {
                var apCategoryWizardStepColumnGuide = apCategoryWizardStepColumnGuides[i];

                var entiyApCategoryWizardStepColumnGuide = this._load(apCategoryWizardStepColumnGuide.Id, apCategoryWizardStepColumnGuide);

                entityApCategoryWizardStepColumnGuides.push(entiyApCategoryWizardStepColumnGuide);
            }

            return entityApCategoryWizardStepColumnGuides.reverse();
        },
        removeInstance: function removeInstance(colGuide) {
            var guideId = colGuide.Id;
            var pool = this._pool;
            delete pool[this._prefixConstant + guideId];
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = actionPlanWizardStepColumnGuideManagerScope;
    return actionPlanWizardStepColumnGuideManagerScope;
}]);
app.factory('actionPlanWizardStepManager', ['ActionPlanWizardStep', 'LocalStorageUtility', 'actionPlanWizardStepColumnManager', 'actionPlanWizardStepColumnGuideManager', function (ActionPlanWizardStep, LocalStorageUtility, actionPlanWizardStepColumnManager, actionPlanWizardStepColumnGuideManager) {
    var actionPlanWizardStepScope = {
        _prefixConstant: '_',
        _pool: {},
        _retrieveInstance: function _retrieveInstance(actionPlanWizardStepId, actionPlanWizardStepData) {
            var instance = this._pool[this._prefixConstant + actionPlanWizardStepId];

            if (instance) {
                instance.setData(actionPlanWizardStepData);
            } else {
                instance = new ActionPlanWizardStep();
                instance.setData(actionPlanWizardStepData);
                this._pool[this._prefixConstant + actionPlanWizardStepId] = instance;
            }

            return instance;
        },
        _search: function _search(actionPlanWizardStepId) {
            return this._pool[this._prefixConstant + actionPlanWizardStepId];
        },
        _load: function _load(actionPlanWizardStepId) {
            var actionPlanWizardStepData = LocalStorageUtility.getActionPlanWizardStep(actionPlanWizardStepId);
            return this._retrieveInstance(actionPlanWizardStepId, actionPlanWizardStepData);
        },
        getActionPlanWizardStep: function getActionPlanWizardStep(actionPlanWizardStepId) {
            var apwStep = this._search(actionPlanWizardStepId);

            if (!apwStep) {
                return this._load(actionPlanWizardStepId);
            }

            return apwStep;
        },
        getActionPlanWizardSteps: function getActionPlanWizardSteps(apwId) {
            var apwStepsCollection = LocalStorageUtility.getActionPlanWizardStepByWizard(apwId);
            var entityApwSteps = [];

            for (var i = 0; i < apwStepsCollection.length; i++) {
                var apwStepData = apwStepsCollection[i];
                var apwStepId = apwStepData.Id;

                var entityWizardStep = this._retrieveInstance(apwStepId, apwStepData);

                var columnGuideFileTypeList = entityWizardStep.ColumnGuide2Categories; // Below check is added to handle if latest app is run on Web API <548

                if (columnGuideFileTypeList) {
                    if (columnGuideFileTypeList.length !== 0) {
                        entityWizardStep.ColumnGuides = actionPlanWizardStepColumnGuideManager.getAllApCategoryWizardStepColumnsGuide(entityWizardStep.Id);
                    } else {
                        entityWizardStep.ColumnGuides = actionPlanWizardStepColumnGuideManager.getAllApCategoryWizardStepColumnsGuide(entityWizardStep.Id);
                    }
                } else {
                    entityWizardStep.ColumnGuides = actionPlanWizardStepColumnGuideManager.getAllApCategoryWizardStepColumnsGuide(entityWizardStep.Id);
                }

                entityWizardStep.Columns = actionPlanWizardStepColumnManager.getApwStepColumnByStepId(apwStepId); // Check if step is a multi task

                for (var j = 0; j < entityWizardStep.Columns.length; j++) {
                    var column = entityWizardStep.Columns[j];

                    if (column.IsMultiTaskColumn) {
                        entityWizardStep.IsMultiTaskColumnsPresent = true;
                        break;
                    }
                }

                entityApwSteps.push(entityWizardStep);
            }

            return entityApwSteps;
        },
        getActionPlanWizardStepColumnByColumnId: function getActionPlanWizardStepColumnByColumnId(apWizStepId) {
            var apStepColumn = LocalStorageUtility.getActionPlanWizardStep(apWizStepId);
            if (apStepColumn != null) {
                var entiyActionPlanWizardStepColumn = this._load(apStepColumn.Id, apStepColumn);

                var columnGuideCategoryList = entiyActionPlanWizardStepColumn.ColumnGuide2Categories; // Below check is added to handle if latest app is run on Web API <548

                if (columnGuideCategoryList) {
                    if (columnGuideCategoryList.length !== 0) {
                        entiyActionPlanWizardStepColumn.ColumnGuides = actionPlanWizardStepColumnGuideManager.getAllApCategoryWizardStepColumnsGuide(apWizStepId);
                    } else {
                        entiyActionPlanWizardStepColumn.ColumnGuides = actionPlanWizardStepColumnGuideManager.getAllApCategoryWizardStepColumnsGuide(apWizStepId);
                    }
                } else {
                    entiyActionPlanWizardStepColumn.ColumnGuides = actionPlanWizardStepColumnGuideManager.getAllApCategoryWizardStepColumnsGuide(apWizStepId);
                }

                entiyActionPlanWizardStepColumn.Columns = actionPlanWizardStepColumnManager.getApwStepColumnByStepId(apWizStepId); // Check if step is a multi task

                for (var j = 0; j < entiyActionPlanWizardStepColumn.Columns.length; j++) {
                    var column = entiyActionPlanWizardStepColumn.Columns[j];

                    if (column.IsMultiTaskColumn) {
                        entiyActionPlanWizardStepColumn.IsMultiTaskColumnsPresent = true;
                        break;
                    }
                }

                return entiyActionPlanWizardStepColumn;
            }
            return null;
        },
        removeInstance: function removeInstance(step) {
            var stepId = step.Id;
            var pool = this._pool;
            delete pool[this._prefixConstant + stepId];
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    return actionPlanWizardStepScope;
}]);
app.factory('actionPlanWizardManager', ['ActionPlanWizard', 'LocalStorageUtility', 'actionPlanWizardStepManager', 'userDetailsManager', '$injector', '$q', 'actionPlanWizardStepColumnManager', 'personApwStepAnswerManager', function (ActionPlanWizard, LocalStorageUtility, actionPlanWizardStepManager, userDetailsManager, $injector, $q, actionPlanWizardStepColumnManager, personApwStepAnswerManager) {
    var actionPlanWizardScope = {
        _prefixConstant: '_',
        _pool: {},
        _retrieveInstance: function _retrieveInstance(actionPlanWizardId, actionPlanWizardData) {
            var instance = this._pool[this._prefixConstant + actionPlanWizardId];

            if (instance) {
                instance.setData(actionPlanWizardData);
            } else {
                instance = new ActionPlanWizard();
                instance.setData(actionPlanWizardData);
                this._pool[this._prefixConstant + actionPlanWizardId] = instance;
            }

            return instance;
        },
        _search: function _search(actionPlanWizardId) {
            return this._pool[this._prefixConstant + actionPlanWizardId];
        },
        _load: function _load(actionPlanWizardId) {
            var actionPlanWizardData = LocalStorageUtility.getActionPlanWizard(actionPlanWizardId);

            var apwEntity = this._retrieveInstance(actionPlanWizardId, actionPlanWizardData);

            apwEntity.WizardSteps = actionPlanWizardStepManager.getActionPlanWizardSteps(actionPlanWizardId);
            return apwEntity;
        },
        getActionPlanWizard: function getActionPlanWizard(actionPlanWizardId) {
            var apw = this._search(actionPlanWizardId);

            if (!apw) {
                return this._load(actionPlanWizardId);
            }

            return apw;
        },
        getAllActionPlanWizard: function getAllActionPlanWizard() {
            var apwCollection = LocalStorageUtility.getAllActionPlanWizard();
            var entityApwCollections = [];

            for (var i = 0; i < apwCollection.length; i++) {
                var apwData = apwCollection[i];
                var apwId = apwData.Id;

                var entityWizard = this._retrieveInstance(apwId, apwData);

                entityWizard.WizardSteps = actionPlanWizardStepManager.getActionPlanWizardSteps(apwId);
                entityApwCollections.push(entityWizard);
            }

            return entityApwCollections;
        },
        getCompletedActionPlanWizardList: function getCompletedActionPlanWizardList() {
            return LocalStorageUtility.getCompletedActionPlanWizardList();
        },
        getActiveActionPlanList: function getActiveActionPlanList() {
            return LocalStorageUtility.getActiveApwListForActionPlan();
        },
        getActiveProblemList: function getActiveProblemList() {
            return LocalStorageUtility.getActiveApwListForProblem();
        },
        getActiveActionPlanProblemList: function getActiveActionPlanProblemList() {
            var loggedInUser = userDetailsManager.getUserLastLoggedTimeStamp();
            var personId = loggedInUser.PersonId;
            var apList = LocalStorageUtility.getActionPlanListForPerson(personId);
            var entityApwCollections = [];

            for (var i = 0; i < apList.length; i++) {
                var apwData = apList[i];
                var apwId = apwData.Id;

                var apw = this._search(apwId);

                if (apw == null) {
                    apw = this._load(apwId);
                }

                entityApwCollections.push(apw);
            }

            return entityApwCollections.reverse();
        },
        deleteActionPlanWizard: function deleteActionPlanWizard(apWizard) {
            var deletePromise = $q.defer();
            var wizardId = apWizard.Id; // Get person questionnaire instance, if true, plan of action is being used

            var pApw = LocalStorageUtility.getPersonActionPlanWizardByWizardId(wizardId);

            if (pApw.length === 0) {
                // Get recipient count, check for plan of action being used by another user
                // if the count is greater than 1, remove plan of action id from recipient table
                var personApwTemplateManager = $injector.get('personApwTemplateManager');
                var personApwManager = $injector.get('personApwManager');
                var apwSteps = apWizard.WizardSteps;

                for (var i = 0; i < apwSteps.length; i++) {
                    var apwStep = apwSteps[i];
                    var apwStepColumn = apwStep.Columns;

                    for (var j = 0; j < apwStepColumn.length; j++) {
                        var col = apwStepColumn[j];
                        var colId = col.Id;
                        LocalStorageUtility.deleteActionPlanWizardStepColumn(colId, apwStep.Id);
                        var stepAnswer = LocalStorageUtility.deletePApWizardStepAnswerTemplate(colId, apwStep.Id); //personApwStepAnswerManager.removeInstance(stepAnswer);

                        actionPlanWizardStepColumnManager.removeInstance(col);
                    }

                    var stepId = apwStep.Id;
                    LocalStorageUtility.deleteActionPlanWizardStep(stepId);
                    actionPlanWizardStepManager.removeInstance(apwStep);
                }

                var pAwEntity = personApwTemplateManager.getUnAnsweredPersonActionPlanWizard(wizardId);
                personApwTemplateManager.clearInstance(pAwEntity);
                this.removeInstance(apWizard);
                LocalStorageUtility.deleteActionPlanWizard(wizardId);
                LocalStorageUtility.deletePersonActionPlanAttachTemplate(wizardId);
                LocalStorageUtility.deletePersonActionPlanWizardTemplate(wizardId);
            } else {
                // If plan of action is present in in-progress/completed section
                // do not delete the plan of action.
                deletePromise.reject(false);
            } // Save database changes.


            var savePromise = LocalStorageUtility.saveOfflineDb();
            savePromise.promise.then(function (success) {
                deletePromise.resolve(true);
            });
            return deletePromise.promise;
        },
        removeInstance: function removeInstance(wizard) {
            var wizardId = wizard.Id;
            var pool = this._pool;
            delete pool[this._prefixConstant + wizardId];
        },
        resetActionPlanPool: function resetActionPlanPool() {
            var actionPlanFactories = ['actionPlanWizardStepColumnManager', 'actionPlanWizardStepColumnGuideManager', 'actionPlanWizardStepManager', 'actionPlanWizardManager', 'personApwStepAnswerManager', 'personApwStepAnswerTemplateManager', 'personApwAttachmentManager', 'personApwAttachmentTemplateManager', 'personApwManager', 'personApwTemplateManager', 'actionPlanWizardStepColumnGuideAnswerManager'];

            for (var i = 0; i < actionPlanFactories.length; i++) {
                var factoryToReset = actionPlanFactories[i];
                var factoryManager = $injector.get(factoryToReset);
                factoryManager.reset();
            }
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    return actionPlanWizardScope;
}]);
/* ActionPlan/Problem Answering.. */

app.factory('personApwStepAnswerManager', ['PersonActionPlanWizardStepAnswer', 'LocalStorageUtility', 'actionPlanWizardStepManager', 'actionPlanWizardStepColumnGuideAnswerManager', function (PersonActionPlanWizardStepAnswer, LocalStorageUtility, actionPlanWizardStepManager, actionPlanWizardStepColumnGuideAnswerManager) {
    var personApwStepAnswerManagerScope = {
        _pool: {},
        _retrieveInstance: function _retrieveInstance(personApwStepAnswerId, personApwStepAnswerData) {
            var instance = this._pool[personApwStepAnswerId];

            if (instance) {
                instance.setData(personApwStepAnswerData);
            } else {
                instance = new PersonActionPlanWizardStepAnswer();
                instance.setData(personApwStepAnswerData);
                this._pool[personApwStepAnswerId] = instance;
            }

            return instance;
        },
        removeInstance: function removeInstance(personApwStepAnswer) {
            var pApwStepAnswerId = personApwStepAnswer.Id;
            var pool = this._pool;
            delete pool[pApwStepAnswerId];
        },
        refreshPool: function refreshPool(oldEntity, newEntitySource) {
            var key = oldEntity.Id;
            var newKey = newEntitySource.Id;
            var pool = this._pool;
            delete pool[key];
            return this._retrieveInstance(newKey, newEntitySource);
        },
        _search: function _search(personApwStepAnswerId) {
            return this._pool[personApwStepAnswerId];
        },
        _load: function _load(personApwStepAnswerId, personApwStepAnswerData) {
            return this._retrieveInstance(personApwStepAnswerId, personApwStepAnswerData);
        },
        getPersonApwStepAnswer: function getPersonApwStepAnswer(personApwStepAnswerId) {
            var personApwStepAnswer = this._search(personApwStepAnswerId);

            return personApwStepAnswer;
        },
        _getApwAnswers: function _getApwAnswers(answers) {
            var entityPersonApwStepAnswers = [];

            for (var i = 0; i < answers.length; i++) {
                var personApwStepAnswer = answers[i];

                var entiyPersonApwStepAnswer = this._load(personApwStepAnswer.Id, personApwStepAnswer);

                if (entiyPersonApwStepAnswer.ColumnId == null) {
                    var wizStepId = entiyPersonApwStepAnswer.WizardStepId;
                    var stepColumnVal = actionPlanWizardStepManager.getActionPlanWizardStepColumnByColumnId(wizStepId);
                    var columnGuideCategoryList = stepColumnVal != null && stepColumnVal.ColumnGuide2Categories; // Below check is added to handle, if the latest app is run in only version of the API (<548)

                    if (columnGuideCategoryList) {
                        // If column level has ColumnGuide2Categories list
                        if (columnGuideCategoryList.length !== 0) {
                            entiyPersonApwStepAnswer.ColumnGuides = actionPlanWizardStepColumnGuideAnswerManager.getColumnGuideByFileColumn(wizStepId);
                            entiyPersonApwStepAnswer.IsColumnGuide = entiyPersonApwStepAnswer.ColumnGuides.length > 0;
                        } else {
                            entiyPersonApwStepAnswer.ColumnGuides = actionPlanWizardStepColumnGuideAnswerManager.getColumnGuideByFileColumn(wizStepId);
                            entiyPersonApwStepAnswer.IsColumnGuide = entiyPersonApwStepAnswer.ColumnGuides.length > 0;
                        }
                    } else {
                        entiyPersonApwStepAnswer.ColumnGuides = actionPlanWizardStepColumnGuideAnswerManager.getColumnGuideByFileColumn(wizStepId);
                        entiyPersonApwStepAnswer.IsColumnGuide = entiyPersonApwStepAnswer.ColumnGuides.length > 0;
                    }

                    if (entiyPersonApwStepAnswer.AnswerText !== null) {
                        var answerText = entiyPersonApwStepAnswer.AnswerText;
                        var guides = entiyPersonApwStepAnswer.ColumnGuides;
                        actionPlanWizardStepColumnGuideAnswerManager.addGuideAnswerFromColumnAnswer(answerText, guides);
                    }
                }
                entityPersonApwStepAnswers.push(entiyPersonApwStepAnswer);
            }

            return entityPersonApwStepAnswers;
        },
        getPersonApwStepAnswerFromTemplate: function getPersonApwStepAnswerFromTemplate(personApwId) {
            var personApwStepAnswers = LocalStorageUtility.getPersonActionPlanWizardAnswersTemplate(personApwId);
            return this._getApwAnswers(personApwStepAnswers);
        },
        getPersonApwStepAnswers: function getPersonApwStepAnswers(personApwId) {
            var personApwStepAnswers = LocalStorageUtility.getPersonActionPlanWizardAnswers(personApwId);
            return this._getApwAnswers(personApwStepAnswers);
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    return personApwStepAnswerManagerScope;
}]);
app.factory('personApwStepAnswerTemplateManager', ['PersonActionPlanWizardStepAnswerTemplate', 'LocalStorageUtility', 'actionPlanWizardStepManager', 'actionPlanWizardStepColumnGuideAnswerManager', function (PersonActionPlanWizardStepAnswerTemplate, LocalStorageUtility, actionPlanWizardStepManager, actionPlanWizardStepColumnGuideAnswerManager) {
    var personApwStepAnswerManagerScope = {
        _pool: {},
        _retrieveInstance: function _retrieveInstance(personApwStepAnswerId, personApwStepAnswerData) {
            var instance = this._pool[personApwStepAnswerId];

            if (instance) {
                instance.setData(personApwStepAnswerData);
            } else {
                instance = new PersonActionPlanWizardStepAnswerTemplate();
                instance.setData(personApwStepAnswerData);
                this._pool[personApwStepAnswerId] = instance;
            }

            return instance;
        },
        removeInstance: function removeInstance(personApwStepAnswer) {
            var pApwStepAnswerId = personApwStepAnswer.Id;
            var pool = this._pool;
            delete pool[pApwStepAnswerId];
        },
        refreshPool: function refreshPool(oldEntity, newEntitySource) {
            var key = oldEntity.Id;
            var newKey = newEntitySource.Id;
            var pool = this._pool;
            delete pool[key];
            return this._retrieveInstance(newKey, newEntitySource);
        },
        _search: function _search(personApwStepAnswerId) {
            return this._pool[personApwStepAnswerId];
        },
        _load: function _load(personApwStepAnswerId, personApwStepAnswerData) {
            return this._retrieveInstance(personApwStepAnswerId, personApwStepAnswerData);
        },
        getPersonApwStepAnswer: function getPersonApwStepAnswer(personApwStepAnswerId) {
            var personApwStepAnswer = this._search(personApwStepAnswerId);

            return personApwStepAnswer;
        },
        _getApwAnswers: function _getApwAnswers(answers) {
            var entityPersonApwStepAnswers = [];

            for (var i = 0; i < answers.length; i++) {
                var personApwStepAnswer = answers[i];

                var entiyPersonApwStepAnswer = this._load(personApwStepAnswer.Id, personApwStepAnswer);

                if (entiyPersonApwStepAnswer.ColumnId == null) {
                    var wizStepId = entiyPersonApwStepAnswer.WizardStepId;
                    var stepColumnVal = actionPlanWizardStepManager.getActionPlanWizardStepColumnByColumnId(wizStepId);
                    var columnGuideCategoryList = stepColumnVal != null && stepColumnVal.ColumnGuide2Categories; // Below check is added to handle, if the latest app is run in only version of the API (<548)

                    if (columnGuideCategoryList) {
                        // If column level has ColumnGuide2Categories list
                        if (columnGuideCategoryList.length !== 0) {
                            entiyPersonApwStepAnswer.ColumnGuides = actionPlanWizardStepColumnGuideAnswerManager.getColumnGuideByFileColumn(wizStepId);
                            entiyPersonApwStepAnswer.IsColumnGuide = entiyPersonApwStepAnswer.ColumnGuides.length > 0;
                        } else {
                            entiyPersonApwStepAnswer.ColumnGuides = actionPlanWizardStepColumnGuideAnswerManager.getColumnGuideByFileColumn(wizStepId);
                            entiyPersonApwStepAnswer.IsColumnGuide = entiyPersonApwStepAnswer.ColumnGuides.length > 0;
                        }
                    } else {
                        entiyPersonApwStepAnswer.ColumnGuides = actionPlanWizardStepColumnGuideAnswerManager.getColumnGuideByFileColumn(wizStepId);
                        entiyPersonApwStepAnswer.IsColumnGuide = entiyPersonApwStepAnswer.ColumnGuides.length > 0;
                    }

                    if (entiyPersonApwStepAnswer.AnswerText !== null) {
                        var answerText = entiyPersonApwStepAnswer.AnswerText;
                        var guides = entiyPersonApwStepAnswer.ColumnGuides;
                        actionPlanWizardStepColumnGuideAnswerManager.addGuideAnswerFromColumnAnswer(answerText, guides);
                    }
                }

                entityPersonApwStepAnswers.push(entiyPersonApwStepAnswer);
            }

            return entityPersonApwStepAnswers;
        },
        getPersonApwStepAnswerFromTemplate: function getPersonApwStepAnswerFromTemplate(personApwId) {
            var personApwStepAnswers = LocalStorageUtility.getPersonActionPlanWizardAnswersTemplate(personApwId);
            return this._getApwAnswers(personApwStepAnswers);
        },
        getPersonApwStepAnswers: function getPersonApwStepAnswers(personApwId) {
            var personApwStepAnswers = LocalStorageUtility.getPersonActionPlanWizardAnswers(personApwId);
            return this._getApwAnswers(personApwStepAnswers);
        },
        getPersonApwStepAnswerByColumnIdStepId: function getPersonApwStepAnswerByColumnIdStepId(id, StepId) {
            var personApwStepAnswer = LocalStorageUtility.getPersonApwStepAnswerTemplateByColumnIdStepId(id, StepId);
            return this._load(personApwStepAnswer.Id, personApwStepAnswer);
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    return personApwStepAnswerManagerScope;
}]);
app.factory('actionPlanWizardStepColumnGuideAnswerManager', ['PersonActionPlanColumnGuideAnswer', 'LocalStorageUtility', function (PersonActionPlanColumnGuideAnswer, LocalStorageUtility) {
    var personActionPlanColumnGuideAnswerManagerScope = {
        _prefixConstant: '_',
        _pool: {},
        _retrieveInstance: function _retrieveInstance(personActionPlanColumnGuideId, personActionPlanColumnGuideData) {
            var instance = this._pool[personActionPlanColumnGuideId + this._prefixConstant + personActionPlanColumnGuideData.apWizStepId];

            if (instance) {
                instance.setData(personActionPlanColumnGuideData);
            } else {
                instance = new PersonActionPlanColumnGuideAnswer();
                instance.setData(personActionPlanColumnGuideData);
                this._pool[personActionPlanColumnGuideId + this._prefixConstant + personActionPlanColumnGuideData.apWizStepId] = instance;
            }

            return instance;
        },
        _search: function _search(personActionPlanColumnGuideId) {
            return this._pool[personActionPlanColumnGuideId];
        },
        _load: function _load(personActionPlanColumnGuideId, personActionPlanColumnGuideData) {
            return this._retrieveInstance(personActionPlanColumnGuideId, personActionPlanColumnGuideData);
        },
        loadPAkColumnGuideByFileColumnId: function loadPAkColumnGuideByFileColumnId(wizStepId) {
            var pAkColumnGuides = LocalStorageUtility.getAllActionPlanCategoryWizardStepColumnGuide(wizStepId);
            var pGuideList = [];

            for (var i = 0; i < pAkColumnGuides.length; i++) {
                var columnGuide = pAkColumnGuides[i];

                var guide = this._load(columnGuide.Id, columnGuide);
                pGuideList.push(guide);
            }

            return pGuideList.reverse();
        },
        addGuideAnswerFromColumnAnswer: function addGuideAnswerFromColumnAnswer(columnAnswerText, pGuideList) {
            if (columnAnswerText.indexOf('—') === -1) {
                return;
            } else {
                var guideAnswer = [];
                guideAnswer = columnAnswerText.split('—');

                for (var i = 0; i < pGuideList.length; i++) {
                    var guide = pGuideList[i];

                    for (var j = 0; j < guideAnswer.length; j++) {
                        var guideVal = guideAnswer[j].split("–");
                        var guideText = guideVal[0];
                        var guideId = guideVal[1];

                        if (guideId === guide.GuideId) {
                            guide.AnswerText = guideText;
                        }
                    }
                }
            }
        },
        getColumnGuideByFileColumn: function getColumnGuideByFileColumn(wizStepId) {
            return this.loadPAkColumnGuideByFileColumnId(wizStepId);
        },
        refreshPool: function refreshPool(oldEntity, newEntitySource) {
            var key = oldEntity.GuideId;
            var stepWizId = oldEntity.ActionPlanWizStepId;
            var newKey = newEntitySource.GuideId;
            var pool = this._pool;
            delete pool[key + this._prefixConstant + stepWizId];
            return this._load(newKey, newEntitySource);
        },
        removeInstance: function removeInstance(pApColumnGuide) {
            var pApGuideAnswerId = pApColumnGuide.GuideId;
            var pApGuideWizStepId = pApColumnGuide.ActionPlanWizStepId;
            var pool = this._pool;
            delete pool[pApGuideAnswerId + this._prefixConstant + pApGuideWizStepId];
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    return personActionPlanColumnGuideAnswerManagerScope;
}]);
app.factory('personApwMultiTaskManager', ['LocalStorageUtility', 'PersonActionPlanMultiTask', 'personActionPlanMultiTaskAttachmentManager', 'FileUtil', function (LocalStorageUtility, PersonActionPlanMultiTask, personActionPlanMultiTaskAttachmentManager, FileUtil) {
    var personApwMultiTaskManager = {
        _pool: {},
        _retrieveInstance: function _retrieveInstance(pApwMultiTaskId, personMultiTaskData) {
            var instance = this._pool[pApwMultiTaskId];

            if (instance) {
                instance.setData(personMultiTaskData);
            } else {
                instance = new PersonActionPlanMultiTask();
                instance.setData(personMultiTaskData);
                this._pool[pApwMultiTaskId] = instance;
            }

            return instance;
        },
        removeInstance: function removeInstance(personMultiTask) {
            var pApwId = personMultiTask.Id;
            var pool = this._pool;
            delete pool[pApwId];
        },
        _search: function _search(pApwMultiTaskId) {
            return this._pool[pApwMultiTaskId];
        },
        _load: function _load(pApwMultiTaskId, pApwMultiTaskData) {
            var mtEntity = this._retrieveInstance(pApwMultiTaskId, pApwMultiTaskData);

            mtEntity.Attachments = personActionPlanMultiTaskAttachmentManager.getAllPersonActionPlanMTAttachments(mtEntity.Id);
            return mtEntity;
        },
        refreshPool: function refreshPool(oldEntity, newEntitySource) {
            var key = oldEntity.Id;
            var newKey = newEntitySource.Id;
            var pool = this._pool;
            delete pool[key];
            return this._retrieveInstance(newKey, newEntitySource);
        },
        createPersonMultiTaskData: function createPersonMultiTaskData(personActionPlanId, wizardStep) {
            var unAnsweredMT = LocalStorageUtility.getUnAnsweredPersonMultiTaskData(personActionPlanId);

            if (unAnsweredMT) {
                LocalStorageUtility.deleteMultiTaskById(unAnsweredMT.Id);
                LocalStorageUtility.saveOfflineDb();
            }

            var wizColumns = wizardStep.Columns;
            var personColumnValue = null;

            for (var i = 0; i < wizColumns.length; i++) {
                var columnVal = wizColumns[i];

                if (columnVal.ColumnType === "PersonDropDown") {
                    var columnId = columnVal.Id;
                    personColumnValue = LocalStorageUtility.getPersonApwStepAnswerTemplateByWizColumnIdWizStepId(columnId, wizardStep.Id);
                    break;
                }
            }

            var newMultiTaskEntry = LocalStorageUtility.createPersonMultiTaskEntry(personActionPlanId, wizardStep.Id, personColumnValue);
            LocalStorageUtility.saveOfflineDb();
            return this._load(newMultiTaskEntry.Id, newMultiTaskEntry);
        },
        savePersonMultiTaskData: function savePersonMultiTaskData(personMultiTaskData) {
            var multiTaskSave = LocalStorageUtility.savePersonActionPlanWizardStepMultiTask(personMultiTaskData);
            return this._load(multiTaskSave.Id, multiTaskSave);
        },
        getAllMultiTaskData: function getAllMultiTaskData(personApwId) {
            var multiTaskList = [];
            var allMultiTaskData = LocalStorageUtility.getAllPersonMultiTaskData(personApwId);

            for (var i = 0; i < allMultiTaskData.length; i++) {
                var multiTaskData = allMultiTaskData[i];

                var entityData = this._search(multiTaskData.Id);

                if (!entityData) {
                    entityData = this._load(multiTaskData.Id, multiTaskData);
                }

                entityData.Attachments = personActionPlanMultiTaskAttachmentManager.getAllPersonActionPlanMTAttachments(entityData.Id);
                multiTaskList.push(entityData);
            }

            return multiTaskList;
        },
        getMultiTaskData: function getMultiTaskData(multiTaskId) {
            var multiTask = LocalStorageUtility.getPersonMultiTaskData(multiTaskId);

            if (multiTask) {
                var entityData = this._search(multiTask.Id);

                if (!entityData) {
                    entityData = this._load(multiTask.Id, multiTask);
                }

                entityData.Attachments = personActionPlanMultiTaskAttachmentManager.getAllPersonActionPlanMTAttachments(entityData.Id);
                return entityData;
            }
        },
        getValidAnsweredMultiTaskData: function getValidAnsweredMultiTaskData(personApwId) {
            var multiTask = LocalStorageUtility.getValidAnsweredPersonMultiTaskData(personApwId);

            if (multiTask) {
                var entityData = this._search(multiTask.Id);

                if (!entityData) {
                    entityData = this._load(multiTask.Id, multiTask);
                }

                entityData.Attachments = personActionPlanMultiTaskAttachmentManager.getAllPersonActionPlanMTAttachments(entityData.Id);
                return entityData;
            }
        },
        deleteMultiTaskById: function deleteMultiTaskById(multiTaskEntity) {
            LocalStorageUtility.deleteMultiTaskById(multiTaskEntity.Id);
            personActionPlanMultiTaskAttachmentManager.deleteAllMultiTaskAttachments(multiTaskEntity.Id);
            LocalStorageUtility.saveOfflineDb();
            this.removeInstance(multiTaskEntity);
        },
        saveMultiTaskEntity: function saveMultiTaskEntity(multiTaskEntity) {
            var savedMultiTask = LocalStorageUtility.savePersonActionPlanWizardStepMultiTask(multiTaskEntity);
            var mtAttachments = multiTaskEntity.Attachments;

            for (var i = 0; i < mtAttachments.length; i++) {
                var mtAttach = mtAttachments[i];

                if (mtAttach.MarkedForDelete) {
                    //Delete the image from system on conformation
                    var filePath = mtAttach.FileLocation;
                    var deletePromise = FileUtil.deleteFile(filePath);
                    deletePromise.then(function (success) {// Success
                    }, function (error) {// Error
                    });
                    mtAttach.FileLocation = null;
                    mtAttach.FileName = null;
                    mtAttach.FileHeader = null;
                }

                personActionPlanMultiTaskAttachmentManager.saveMultiTaskAttachment(mtAttach);
            }

            LocalStorageUtility.saveOfflineDb();

            var newMultiTaskEntity = this._load(savedMultiTask.Id, savedMultiTask);

            return newMultiTaskEntity;
        },
        saveMultiTaskEntityFromPApwTemplate: function saveMultiTaskEntityFromPApwTemplate(newPApwEntity, multiTaskEntity) {
            var savedMultiTask = LocalStorageUtility.saveMultiTaskFromPApwTemplate(newPApwEntity, multiTaskEntity);
            var mtAttachments = multiTaskEntity.Attachments;

            for (var i = 0; i < mtAttachments.length; i++) {
                var mtAttach = mtAttachments[i];

                if (mtAttach.MarkedForDelete) {
                    //Delete the image from system on conformation
                    var filePath = mtAttach.FileLocation;
                    var deletePromise = FileUtil.deleteFile(filePath);
                    deletePromise.then(function (success) {// Success
                    }, function (error) {// Error
                    });
                    mtAttach.FileLocation = null;
                    mtAttach.FileName = null;
                    mtAttach.FileHeader = null;
                }

                personActionPlanMultiTaskAttachmentManager.saveMultiTaskAttachment(mtAttach);
            }

            LocalStorageUtility.saveOfflineDb();
            var updateEntity = this.refreshPool(multiTaskEntity, savedMultiTask);
            return updateEntity;
        },
        refreshModelValueByMTId: function refreshModelValueByMTId(multiTaskEntity) {
            var multiTask = LocalStorageUtility.getPersonMultiTaskData(multiTaskEntity.Id);
            var updateEntity = this.refreshPool(multiTaskEntity, multiTask);
            return updateEntity;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    return personApwMultiTaskManager;
}]);
app.factory('personActionPlanMultiTaskAttachmentManager', ['PersonActionPlanMultiTaskAttachment', 'LocalStorageUtility', '$q', 'FileUtil', function (PersonActionPlanMultiTaskAttachment, LocalStorageUtility, $q, FileUtil) {
    var personAPMultiTaskAttachmentManager = {
        _pool: {},
        _retrieveInstance: function _retrieveInstance(personMTAttachId, personMTAttachData) {
            var instance = this._pool[personMTAttachId];

            if (instance) {
                instance.setData(personMTAttachData);
            } else {
                instance = new PersonActionPlanMultiTaskAttachment();
                instance.setData(personMTAttachData);
                this._pool[personMTAttachId] = instance;
            }

            return instance;
        },
        removeInstance: function removeInstance(personMTAttachData) {
            var pApwMtAttachId = personMTAttachData.Id;
            var pool = this._pool;
            delete pool[pApwMtAttachId];
        },
        _search: function _search(pApwMTAttachmentId) {
            return this._pool[pApwMTAttachmentId];
        },
        _load: function _load(pApwAttachmentId, pApwAttachmentData) {
            return this._retrieveInstance(pApwAttachmentId, pApwAttachmentData);
        },
        refreshPool: function refreshPool(oldEntity, newEntitySource) {
            var key = oldEntity.Id;
            var newKey = newEntitySource.Id;
            var pool = this._pool;
            delete pool[key];
            return this._retrieveInstance(newKey, newEntitySource);
        },
        _getAttachments: function _getAttachments(personMTAttachments) {
            var entityPersonMTAttachments = [];

            for (var i = 0; i < personMTAttachments.length; i++) {
                var pAttach = personMTAttachments[i];
                var pAttachId = pAttach.Id;

                var entityAttach = this._search(pAttachId);

                if (!entityAttach) {
                    var entityAttach = this._load(pAttachId, pAttach);
                }

                entityPersonMTAttachments.push(entityAttach);
            }

            return entityPersonMTAttachments;
        },
        getPersonActionPlanWizardMTAttachments: function getPersonActionPlanWizardMTAttachments(multiTaskId) {
            var pApwAttachments = LocalStorageUtility.getPersonActionPlanWizardMultiTaskAttachment(multiTaskId);
            return this._getAttachments(pApwAttachments);
        },
        getAllPersonActionPlanMTAttachments: function getAllPersonActionPlanMTAttachments(multiTaskId) {
            var pApwAttachments = LocalStorageUtility.getAllPersonActionPlanMultiTaskAttachments(multiTaskId);
            return this._getAttachments(pApwAttachments);
        },
        createNewMultiTaskAttachment: function createNewMultiTaskAttachment(multiTaskId) {
            var multiTaskAttachment = LocalStorageUtility.createNewMultiTaskAttachment(multiTaskId);
            return this._load(multiTaskAttachment.Id, multiTaskAttachment);
        },
        deleteUnusedAttachment: function deleteUnusedAttachment(multiTaskEntity) {
            var mtAttachments = multiTaskEntity.Attachments;

            for (var i = 0; i < mtAttachments.length; i++) {
                var mtAttach = mtAttachments[i];

                if (!mtAttach.IsSavedToDb) {
                    // Delete the image from system on conformation
                    var filePath = mtAttach.FileLocation;
                    var deletePromise = FileUtil.deleteFile(filePath);
                    deletePromise.then(function (success) {// Success
                    }, function (error) {// Error
                    });
                    LocalStorageUtility.deleteUnUsedMTAttachment(mtAttach);
                }
            }
        },
        saveMultiTaskAttachments: function saveMultiTaskAttachments(multiTaskAttachments) {
            var def = $q.defer();
            LocalStorageUtility.saveMultiTaskAttachments(multiTaskAttachments);
            var saveProm = LocalStorageUtility.saveOfflineDb();
            saveProm.promise.then(function (success) {
                def.resolve();
            });
            return def.promise;
        },
        saveMultiTaskAttachment: function saveMultiTaskAttachment(mtAttach) {
            var def = $q.defer();
            LocalStorageUtility.saveMultiTaskAttachment(mtAttach);
            var saveProm = LocalStorageUtility.saveOfflineDb();
            saveProm.promise.then(function (success) {
                def.resolve();
            });
            return def.promise;
        },
        deleteMultiTaskAttachmentById: function deleteMultiTaskAttachmentById(mtAttach) {
            var deletedMtAttachment = LocalStorageUtility.deleteMultiTaskAttachmentById(mtAttach);
            LocalStorageUtility.saveOfflineDb();
            this.removeInstance(deletedMtAttachment);
        },
        deleteAllMultiTaskAttachments: function deleteAllMultiTaskAttachments(multiTaskId) {
            var deletedMTAttachments = LocalStorageUtility.deleteAllMultiTaskAttachments(multiTaskId);
            LocalStorageUtility.saveOfflineDb();

            for (var mt = 0; mt < deletedMTAttachments.length; mt++) {
                var mtAttach = deletedMTAttachments[mt];
                this.removeInstance(mtAttach);
            }
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    return personAPMultiTaskAttachmentManager;
}]);
app.factory('personApwAttachmentManager', ['PersonActionPlanWizardAttachment', 'LocalStorageUtility', function (PersonActionPlanWizardAttachment, LocalStorageUtility) {
    var personApwAttachmentManager = {
        _pool: {},
        _retrieveInstance: function _retrieveInstance(personAttachId, personAttachData) {
            var instance = this._pool[personAttachId];

            if (instance) {
                instance.setData(personAttachData);
            } else {
                instance = new PersonActionPlanWizardAttachment();
                instance.setData(personAttachData);
                this._pool[personAttachId] = instance;
            }

            return instance;
        },
        removeInstance: function removeInstance(personApwAttach) {
            var pApwAttachId = personApwAttach.Id;
            var pool = this._pool;
            delete pool[pApwAttachId];
        },
        _search: function _search(pApwAttachmentId) {
            return this._pool[pApwAttachmentId];
        },
        _load: function _load(pApwAttachmentId, pApwAttachmentData) {
            return this._retrieveInstance(pApwAttachmentId, pApwAttachmentData);
        },
        refreshPool: function refreshPool(oldEntity, newEntitySource) {
            var key = oldEntity.Id;
            var newKey = newEntitySource.Id;
            var pool = this._pool;
            delete pool[key];
            return this._retrieveInstance(newKey, newEntitySource);
        },
        _getAttachments: function _getAttachments(personAttachments) {
            var entityPersonAttachments = [];

            for (var i = 0; i < personAttachments.length; i++) {
                var pAttach = personAttachments[i];
                var pAttachId = pAttach.Id;

                var entityAttach = this._search(pAttachId);

                if (!entityAttach) {
                    var entityAttach = this._load(pAttachId, pAttach);
                }

                entityPersonAttachments.push(entityAttach);
            }

            return entityPersonAttachments;
        },
        getPersonActionPlanWizardAttachmentsTemplate: function getPersonActionPlanWizardAttachmentsTemplate(pApwId) {
            var pApwAttachments = LocalStorageUtility.getPersonActionPlanWizardAttachmentsTemplate(pApwId);
            return this._getAttachments(pApwAttachments);
        },
        getPersonActionPlanWizardAttachments: function getPersonActionPlanWizardAttachments(pApwId) {
            var pApwAttachments = LocalStorageUtility.getActionPlanWizardAttachments(pApwId);
            return this._getAttachments(pApwAttachments);
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    return personApwAttachmentManager;
}]);
app.factory('personApwAttachmentTemplateManager', ['PersonActionPlanWizardAttachmentTemplate', 'LocalStorageUtility', function (PersonActionPlanWizardAttachmentTemplate, LocalStorageUtility) {
    var personApwAttachmentManager = {
        _pool: {},
        _retrieveInstance: function _retrieveInstance(personAttachId, personAttachData) {
            var instance = this._pool[personAttachId];

            if (instance) {
                instance.setData(personAttachData);
            } else {
                instance = new PersonActionPlanWizardAttachmentTemplate();
                instance.setData(personAttachData);
                this._pool[personAttachId] = instance;
            }

            return instance;
        },
        removeInstance: function removeInstance(personApwAttach) {
            var pApwAttachId = personApwAttach.Id;
            var pool = this._pool;
            delete pool[pApwAttachId];
        },
        _search: function _search(pApwAttachmentId) {
            return this._pool[pApwAttachmentId];
        },
        _load: function _load(pApwAttachmentId, pApwAttachmentData) {
            return this._retrieveInstance(pApwAttachmentId, pApwAttachmentData);
        },
        refreshPool: function refreshPool(oldEntity, newEntitySource) {
            var key = oldEntity.Id;
            var newKey = newEntitySource.Id;
            var pool = this._pool;
            delete pool[key];
            return this._retrieveInstance(newKey, newEntitySource);
        },
        _getAttachments: function _getAttachments(personAttachments) {
            var entityPersonAttachments = [];

            for (var i = 0; i < personAttachments.length; i++) {
                var pAttach = personAttachments[i];
                var pAttachId = pAttach.Id; //var entityAttach = this._search(pAttachId);
                //if (!entityAttach) {

                var entityAttach = this._load(pAttachId, pAttach); //}


                entityPersonAttachments.push(entityAttach);
            }

            return entityPersonAttachments;
        },
        getPersonActionPlanWizardAttachmentsTemplate: function getPersonActionPlanWizardAttachmentsTemplate(pApwId) {
            var pApwAttachments = LocalStorageUtility.getPersonActionPlanWizardAttachmentsTemplate(pApwId);
            return this._getAttachments(pApwAttachments);
        },
        getPersonActionPlanWizardAttachments: function getPersonActionPlanWizardAttachments(pApwId) {
            var pApwAttachments = LocalStorageUtility.getActionPlanWizardAttachments(pApwId);
            return this._getAttachments(pApwAttachments);
        },
        getPersonAttachmentTemplateById: function getPersonAttachmentTemplateById(pApwAttachId) {
            var pApwAttachment = LocalStorageUtility.getPersonActionPlanWizardAttachmentTemplate(pApwAttachId);
            return this._load(pApwAttachment.Id, pApwAttachment);
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    return personApwAttachmentManager;
}]);
app.factory('personApwManager', ['PersonActionPlanWizard', 'LocalStorageUtility', 'personApwStepAnswerManager', 'actionPlanWizardManager', 'personApwAttachmentManager', '$q', 'DateUtil', 'FileUtil', 'actionPlanWizardStepColumnManager', 'actionPlanWizardStepManager', 'personApwTemplateManager', 'personApwStepAnswerTemplateManager', 'personApwAttachmentTemplateManager', 'personApwMultiTaskManager', '$injector', function (PersonActionPlanWizard, LocalStorageUtility, personApwStepAnswerManager, actionPlanWizardManager, personApwAttachmentManager, $q, DateUtil, FileUtil, actionPlanWizardStepColumnManager, actionPlanWizardStepManager, personApwTemplateManager, personApwStepAnswerTemplateManager, personApwAttachmentTemplateManager, personApwMultiTaskManager, $injector) {
    var personApwManagerScope = {
        _pool: {},
        _retrieveInstance: function _retrieveInstance(personApwId, personApwData) {
            var instance = this._pool[personApwId];

            if (instance) {
                instance.setData(personApwData);
            } else {
                instance = new PersonActionPlanWizard();
                instance.setData(personApwData);
                this._pool[personApwId] = instance;
            }

            return instance;
        },
        removeInstance: function removeInstance(personApw) {
            var pApwId = personApw.Id;
            var pool = this._pool;

            for (var i = 0; i < personApw.ColumnValues.length; i++) {
                var personColumnAnswer = personApw.ColumnValues[i];
                personApwStepAnswerManager.removeInstance(personColumnAnswer);
            }

            for (var mt = 0; mt < personApw.MultiTaskSolutions.length; mt++) {
                var multiTask = personApw.MultiTaskSolutions[mt];
                personApwMultiTaskManager.deleteMultiTaskById(multiTask);
            }

            for (var i = 0; i < personApw.Attachments.length; i++) {
                var personAttachment = personApw.Attachments[i]; // On succes upload delete the image from the file system

                var filePath = personAttachment.FileLocation;

                if (filePath) {
                    var deletePromise = FileUtil.deleteFile(filePath);
                    deletePromise.then(function (success) {// Success
                    }, function (error) {// Error
                    });
                }

                personApwAttachmentManager.removeInstance(personAttachment);
            }

            delete pool[pApwId];
            LocalStorageUtility.deletePersonActionPlanWizard(pApwId);
        },
        _search: function _search(personApwId) {
            var personApwAnswer = this._pool[personApwId];

            if (personApwAnswer == null) {
                personApwAnswer = this._load(personApwId);
            }

            return personApwAnswer;
        },
        _loadFromTemplate: function _loadFromTemplate(personApwId) {
            var personApwData = LocalStorageUtility.getPersonActionPlanWizardTemplate(personApwId);

            var personApwEntity = this._retrieveInstance(personApwData.Id, personApwData);

            var wizardId = personApwData.wizardId;
            personApwEntity.Wizard = actionPlanWizardManager.getActionPlanWizard(wizardId);
            personApwEntity.ColumnValues = personApwStepAnswerManager.getPersonApwStepAnswerFromTemplate(personApwId);
            personApwEntity.MultiTaskSolutions = personApwMultiTaskManager.getAllMultiTaskData(personApwId);
            personApwEntity.Attachments = personApwAttachmentManager.getPersonActionPlanWizardAttachmentsTemplate(personApwId);
            return personApwEntity;
        },
        _load: function _load(personApwId) {
            var personApwData = LocalStorageUtility.getPersonActionPlanWizard(personApwId);

            var personApwEntity = this._retrieveInstance(personApwId, personApwData);

            var wizardId = personApwData.wizardId;
            personApwEntity.Wizard = actionPlanWizardManager.getActionPlanWizard(wizardId);
            personApwEntity.ColumnValues = personApwStepAnswerManager.getPersonApwStepAnswers(personApwId);
            personApwEntity.Attachments = personApwAttachmentManager.getPersonActionPlanWizardAttachments(personApwId);
            personApwEntity.MultiTaskSolutions = personApwMultiTaskManager.getAllMultiTaskData(personApwId);
            return personApwEntity;
        },
        _savePersonApw: function _savePersonApw(pApw, isAnsweringComplete) {
            var personAttachmentList = pApw.Attachments;

            for (var j = 0; j < personAttachmentList.length; j++) {
                var attachment = personAttachmentList[j];
                var markedForDelete = attachment.MarkedForDelete;

                if (markedForDelete === true) {
                    attachment.FileLocation = null;
                    attachment.InternalFileLocation = null;
                    attachment.FileName = null;
                }
            }

            if (pApw.IsTemplate != true) {
                LocalStorageUtility.savePersonActionPlanWizardOrProblem(pApw, isAnsweringComplete);
                LocalStorageUtility.saveOfflineDb();
                return this._load(pApw.Id);
            } else {
                var pApwOnly = LocalStorageUtility.savePersonActionPlanWizardOrProblemTemplateOnly(pApw, isAnsweringComplete);
                var stepAnswers = LocalStorageUtility.savePersonActionPlanWizardStepAnswersOnly(pApw, pApwOnly.Id);

                for (var i = 0; i < pApw.ColumnValues.length; i++) {
                    var stepAnswerOld = pApw.ColumnValues[i];
                    var stepAnswerNew = stepAnswers[i];
                    personApwStepAnswerManager.refreshPool(stepAnswerOld, stepAnswerNew);
                }

                var personApwAttachments = LocalStorageUtility.savePersonActionPlanWizardAttachmentsOnly(pApw, pApwOnly.Id);

                for (var i = 0; i < pApw.Attachments.length; i++) {
                    var attachmentOld = pApw.Attachments[i];
                    var attachmentNew = personApwAttachments[i];
                    personApwAttachmentManager.refreshPool(attachmentOld, attachmentNew);
                }

                LocalStorageUtility.saveOfflineDb();
                return this.refreshPool(pApw, pApwOnly);
            }
        },
        refreshPool: function refreshPool(oldEntity, newEntitySource) {
            var key = oldEntity.Id;
            var newKey = newEntitySource.Id;
            var pool = this._pool;
            delete pool[key];
            return this._load(newKey);
        },
        _getAnsweredApwList: function _getAnsweredApwList(answerList) {
            var completedList = [];

            for (var i = 0; i < answerList.length; i++) {
                var apw = answerList[i];
                var wizId = apw.apwId;
                var personApwAnswers = apw.apwAnswers;
                var sortedPersonApwAnswers = personApwAnswers.sort(function (a, b) {
                    if (a.meta.created > b.meta.created) return -1;
                    if (a.meta.created < b.meta.created) return 1;
                    return 0;
                });
                var groupedPersonByDate = [];

                for (var j = 0; j < sortedPersonApwAnswers.length; j++) {
                    var personApwAnswer = sortedPersonApwAnswers[j];
                    var id = personApwAnswer.Id;

                    var apwEntity = this._search(id);

                    var dateSaved = apwEntity.CompletedDate;

                    if (angular.isUndefined(apwEntity.CompletedDate)) {
                        var savedDate = apwEntity.CreatedDate;
                        var currentDate = new Date(savedDate);
                        var completeDateTime = DateUtil.getFormattedValue(currentDate, DateUtil.getDateTime());
                        dateSaved = completeDateTime;
                    }

                    groupedPersonByDate.push({
                        'PersonApwAnswer': apwEntity,
                        'Label': personApwAnswer.title,
                        'TimeStamp': dateSaved
                    });
                }

                if (sortedPersonApwAnswers.length > 0) {
                    completedList.push({
                        'WizName': apw.apwName,
                        'Answers': groupedPersonByDate
                    });
                }
            }

            return completedList;
        },
        savePersonApw: function savePersonApw(pApw, isAnsweringComplete) {
            return this._savePersonApw(pApw, isAnsweringComplete);
        },
        getPersonActionPlanWizard: function getPersonActionPlanWizard(personApwId) {
            //var personApw = this._search(personApwId);
            //if (!personApw) {
            return this._load(personApwId); //}
            //return personApw;
        },

        /* This method returns an entry to the un answered action plan/problem */
        getUnAnsweredPersonActionPlanWizard: function getUnAnsweredPersonActionPlanWizard(apwId) {
            var personApw = LocalStorageUtility.getUnAnsweredPersonActionPlanWizardByActionPlan(apwId);
            return this._loadFromTemplate(personApw.Id);
        },
        getInProgressPersonAPWList: function getInProgressPersonAPWList() {
            var inProgressList = LocalStorageUtility.getInProgressAPWList();
            return this._getAnsweredApwList(inProgressList);
        },
        getCompletedPersonAPWList: function getCompletedPersonAPWList() {
            var completedList = LocalStorageUtility.getCompletedAPWList();
            return this._getAnsweredApwList(completedList);
        },
        getCompletedPersonAPWListWithDelayedUpload: function getCompletedPersonAPWListWithDelayedUpload() {
            var completedList = this.getCompletedPersonAPWList();
            var completedDelayedList = [];

            for (var i = 0; i < completedList.length; i++) {
                var personApwAllAnswers = completedList[i];
                var personApwAnswers = personApwAllAnswers.Answers;

                for (var j = 0; j < personApwAnswers.length; j++) {
                    var personApw = personApwAnswers[j].PersonApwAnswer;
                    var autoUploadDelayInMins = personApw.Wizard.AutoUploadDelayInMinutes;
                    if (autoUploadDelayInMins && autoUploadDelayInMins > 0) {
                        completedDelayedList.push(personApw);
                    }
                }
            }
            return completedDelayedList;
        },
        hasDelayedActionPlans2Upload: function hasDelayedActionPlans2Upload() {
            var completedList = this.getCompletedPersonAPWListWithDelayedUpload();
            for (var i = 0; i < completedList.length; i++) {
                var personApw = completedList[i];
                if (personApw.UploadInProgress == false && personApw.hasDelayElapsed()) {
                    return true;
                }
            }
            return false;
        },
        getInProgressPersonAPWListCount: function getInProgressPersonAPWListCount() {
            var countInprogressApw = 0;
            var inProgressListApw = LocalStorageUtility.getInProgressAPWList();

            var inProgress = this._getAnsweredApwList(inProgressListApw);

            for (var i = 0; i < inProgress.length; i++) {
                var inprog = inProgress[i].Answers;
                countInprogressApw += inprog.length;
            }

            return countInprogressApw;
        },
        getCompletedPersonAPWListCount: function getCompletedPersonAPWListCount() {
            var countCompletedApw = 0;
            var completedListApw = LocalStorageUtility.getCompletedAPWList();

            var completed = this._getAnsweredApwList(completedListApw);

            for (var i = 0; i < completed.length; i++) {
                var comp = completed[i].Answers;
                countCompletedApw += comp.length;
            }

            return countCompletedApw;
        },
        getInProgressPersonAPWListForProblem: function getInProgressPersonAPWListForProblem() {
            var inProgressList = LocalStorageUtility.getInProgressAPWListForProblem();
            return this._getAnsweredApwList(inProgressList);
        },
        getInProgressPersonAPWListForActionPlan: function getInProgressPersonAPWListForActionPlan() {
            var inProgressList = LocalStorageUtility.getInProgressAPWListForActionPlan();
            return this._getAnsweredApwList(inProgressList);
        },
        getCompletedPersonAPWListForProblem: function getCompletedPersonAPWListForProblem() {
            var completedList = LocalStorageUtility.getCompletedAPWListForProblem();
            return this._getAnsweredApwList(completedList);
        },
        getCompletedPersonAPWListForActionPlan: function getCompletedPersonAPWListForActionPlan() {
            var completedList = LocalStorageUtility.getCompletedAPWListForActionPlan();
            return this._getAnsweredApwList(completedList);
        },
        _getApwAttachment: function _getApwAttachment(pApw, pAttachId) {
            for (var i = 0; i < pApw.Attachments.length; i++) {
                var apwAttach = pApw.Attachments[i];

                if (apwAttach.Id == pAttachId) {
                    return apwAttach;
                }
            }

            return null;
        },
        prepareForUpload: function prepareForUpload(pApw) {
            var processedPqApw = $q.defer();
            var mappedApwWithAttachments = pApw.prepareAttachments();
            var keyAttachments = [];
            var pApwPromises = [];
            var thisVal = this;

            for (var i = 0; i < mappedApwWithAttachments.length; i++) {
                var mappedPromise = mappedApwWithAttachments[i];
                var pApwKey = mappedPromise.pAttachId;
                var pApwPromise = mappedPromise.AttachPromise;
                keyAttachments.push(pApwKey);
                pApwPromises.push(pApwPromise);
            }

            $q.all(pApwPromises).then(function (resultSet) {
                var processedImageLength = resultSet.length;

                for (var i = 0; i < processedImageLength; i++) {
                    var pAttachId = keyAttachments[i];

                    var pAttach = thisVal._getApwAttachment(pApw, pAttachId);

                    var promisedAttachData = resultSet[i];
                    pAttach.FileSourceBase64 = promisedAttachData;
                }

                processedPqApw.resolve(pApw);
            }, function (errorResponse) {
                processedPqApw.reject(pApw);
            });
            return processedPqApw;
        },
        processDateColumnForActionPlan: function processDateColumnForActionPlan(pApw) {
            var columnAnswers = pApw.ColumnValues;

            for (var i = 0; i < columnAnswers.length; i++) {
                var columnAnswer = columnAnswers[i];

                if (columnAnswer.AnswerDate !== null) {
                    columnAnswer.AnswerText = DateUtil.getUTCDate(columnAnswer.AnswerDate);
                }
            }
        },
        processDateColumnForAPMultiTask: function processDateColumnForAPMultiTask(pApw) {
            var multiTaskSols = pApw.MultiTaskSolutions;

            for (var i = 0; i < multiTaskSols.length; i++) {
                var multiTask = multiTaskSols[i];

                if (multiTask.DeadlineDate !== null) {
                    multiTask.DeadlineDate = DateUtil.getUTCDate(multiTask.DeadlineDate);
                }

                if (multiTask.ApprovedDate !== null) {
                    multiTask.ApprovedDate = DateUtil.getUTCDate(multiTask.ApprovedDate);
                }
            }
        },
        updateDownloadActionPlanData: function updateDownloadActionPlanData(downloadedJsonResponse) {
            var def = $q.defer(); // Storing the ids at all level that have to be deleted as this was deleted in the server

            var deleteActionPlanIds = [];
            var deleteActionPlanStepIds = [];
            var deleteActionPlanStepColumnIds = [];
            var deletePersonActionPlanIds = [];
            var deletePersonColumnValuesIds = [];
            var deletePersonAttachmentsIds = [];
            var deletePersonMultiTaskIds = []; //var multiTaskIds = [];
            //var substringVal = 'MultiTask';
            // Adding action plan and person action plan ids to array which are downloaded

            var allActionPlanIds = [];
            var allPersonActionPlanIds = []; // Adding the action plan ids which have a person instance (inprogress/completed)

            var usedActionPlanIds = [];

            for (var i = 0; i < downloadedJsonResponse.length; i++) {
                var actionPlanWizard = downloadedJsonResponse[i];
                var actionPlanId = actionPlanWizard.Id; // Adding Action plan data

                LocalStorageUtility.addActionPlanData(actionPlanWizard);
                allActionPlanIds.push(actionPlanId);
                var actionplanSteps = actionPlanWizard.WizardSteps; // Adding the step id which are downloaded

                var allActionPlanStepIds = [];

                for (var j = 0; j < actionplanSteps.length; j++) {
                    var actionPlanStep = actionplanSteps[j];
                    var actionplanStepId = actionPlanStep.Id; // Adding action plan wizard step data

                    LocalStorageUtility.addActionPlanWizardStepData(actionPlanStep, actionPlanId);
                    allActionPlanStepIds.push(actionplanStepId);
                    var actionPlanStepColumns = actionPlanStep.Columns;

                    var allFileColumnGuideIds = [];
                    var columnnGuides = actionPlanStep.ColumnGuides;

                    LocalStorageUtility.deleteColumnGuideByWizardStepId(actionplanStepId); //Check to handle if app uses older version of api
                    if (columnnGuides) {
                        for (var l = 0; l < columnnGuides.length; l++) {
                            var columnGuide = columnnGuides[l];
                            var columnGuideId = columnGuide.Id; // Adding wizard step column guide data

                            LocalStorageUtility.addActionPlanWizardStepColumnGuide(actionplanStepId, columnGuide);
                            allFileColumnGuideIds.push(columnGuideId);
                        }
                    }// Adding the step column id which are downloaded

                    var allActionPlanStepColumnIds = []; // Boolean flag to check if a step has multi task columns
                    //var hasMultiTask = false;

                    for (var k = 0; k < actionPlanStepColumns.length; k++) {
                        var apStepColumn = actionPlanStepColumns[k];
                        var apStepColumnId = apStepColumn.Id; //if (apStepColumn.Text.indexOf(substringVal) !== -1) {
                        //    //multiTaskIds.push(apStepColumnId);
                        //    hasMultiTask = true;
                        //}
                        // Adding wizard step column dta

                        LocalStorageUtility.addActionPlanWizardStepColumnData(apStepColumn, actionplanStepId);
                        allActionPlanStepColumnIds.push(apStepColumnId);
                    }

                    LocalStorageUtility.saveOfflineDb(); //if (hasMultiTask) {
                    //    multiTaskIds.push(actionplanStepId);
                    //}
                    // Fetching the column ids which have to be deleted as this is disabled in the server

                    var deleteColumnIds = LocalStorageUtility.getActionplanColumnIdsForDelete(allActionPlanStepColumnIds, actionplanStepId);

                    for (var k = 0; k < deleteColumnIds.length; k++) {
                        var column = deleteColumnIds[k];
                        var uniqueColumnId = column.Id + '_' + column.actionPlanWizardStepId;
                        deleteActionPlanStepColumnIds.push(uniqueColumnId);
                    }
                }

                LocalStorageUtility.saveOfflineDb(); // Fetching the wizard step ids which have to be deleted as this is disabled in server

                var deleteStepIds = LocalStorageUtility.getActionPlanWizardStepIdsForDelete(allActionPlanStepIds, actionPlanId);

                for (var j = 0; j < deleteStepIds.length; j++) {
                    var step = deleteStepIds[j];
                    deleteActionPlanStepIds.push(step.Id);
                }

                var personActionPlan = actionPlanWizard.NewActionPlan;
                var personActionPlanId = personActionPlan.Id; //var deleteMultiTaskIds = LocalStorageUtility.getPersonMultiTaskIdsForDelete(multiTaskIds, personActionPlanId);
                //for (var ml = 0; ml < deleteMultiTaskIds.length; ml++) {
                //    var multiTask = deleteMultiTaskIds[ml];
                //    deletePersonMultiTaskIds.push(multiTask.Id);
                //}
                // Adding person action plan template data to DB

                var personApwId = LocalStorageUtility.addPersonActionPlanTemplateData(personActionPlan);
                allPersonActionPlanIds.push(personApwId);
                var personAPColumnValues = personActionPlan.ColumnValues; // Adding the person column value id which are downloaded

                var allPersonColumnValuesIds = [];

                for (var k = 0; k < personAPColumnValues.length; k++) {
                    var personColumnValue = personAPColumnValues[k];
                    var personColumnValueId = null; //if (multiTaskIds.indexOf(substringVal) !== -1) { 
                    //    var multiTaskId = LocalStorageUtility.addPersonActionPlanWizardStepColumnAnswerTemplate(personApwId, personColumnValue);
                    //    allPersonColumnValuesIds.push(multiTaskId);
                    //} else {
                    // Adding person action plan wizard step column answwer template

                    var id = LocalStorageUtility.addPersonActionPlanWizardStepColumnAnswerTemplate(personApwId, personColumnValue);
                    allPersonColumnValuesIds.push(id); //}
                }

                LocalStorageUtility.saveOfflineDb(); // Fetching person wizard step answer ids which have to be deleted as this is disapled in server

                var deletePersonColumnValues = LocalStorageUtility.getPApWizardStepAnswerIdsForDelete(allPersonColumnValuesIds, personApwId);

                for (var k = 0; k < deletePersonColumnValues.length; k++) {
                    var personColumnValue = deletePersonColumnValues[k];
                    var uniqueColumnId = personColumnValue.Id + '_' + personColumnValue.wizardStepId;
                    deletePersonColumnValuesIds.push(uniqueColumnId);
                } //var deletePersonMultiTaskValues = LocalStorageUtility.


                var personAttachments = personActionPlan.Attachments;
                var allAttchmentIds = [];

                for (var k = 0; k < personAttachments.length; k++) {
                    var pAttachment = personAttachments[k]; // Adding person action plan wizard attachment

                    var attachId = LocalStorageUtility.addPersonActionPlanWizardAttachmentTemplate(personApwId, pAttachment, k);
                    allAttchmentIds.push(attachId);
                }

                LocalStorageUtility.saveOfflineDb(); // Fetching person action plan wizard attachment ids for delete

                var pAttachmentIdsForDelete = LocalStorageUtility.getPersonActionPlanWizardAttachmentIdsForDelete(allAttchmentIds, personApwId);

                for (var k = 0; k < pAttachmentIdsForDelete.length; k++) {
                    var attach = pAttachmentIdsForDelete[k];
                    deletePersonAttachmentsIds.push(attach.Id);
                } // Fetching person action plan wizard ids which are deleted in the server but is still present in the app.


                var personAPIdsForDelete = LocalStorageUtility.getPersonActionPlanWizardIdsForDelete(allPersonActionPlanIds, actionPlanId);

                for (var j = 0; j < personAPIdsForDelete.length; j++) {
                    var personActionPlan = personAPIdsForDelete[j];
                    deletePersonActionPlanIds.push(personActionPlan.Id);
                }

                LocalStorageUtility.saveOfflineDb();
            } // Fetching action plan ids for delete


            var actionPlanIdsForDelete = LocalStorageUtility.getActionPlanWizardIdsForDelete(allActionPlanIds, usedActionPlanIds);

            for (var i = 0; i < actionPlanIdsForDelete.length; i++) {
                var ap = actionPlanIdsForDelete[i];
                deleteActionPlanIds.push(ap.Id);
            }

            LocalStorageUtility.saveOfflineDb();

            for (var i = 0; i < deletePersonAttachmentsIds.length; i++) {
                var pAttachId = deletePersonAttachmentsIds[i];
                var pAttachInstance = personApwAttachmentTemplateManager.getPersonAttachmentTemplateById(pAttachId);
                LocalStorageUtility.deletePersonActionPlanAttachTemplateById(pAttachId);
                personApwAttachmentTemplateManager.removeInstance(pAttachInstance);
            } // Deleting person column values


            for (var i = 0; i < deletePersonColumnValuesIds.length; i++) {
                var ids = deletePersonColumnValuesIds[i];
                var result = ids.split('_');
                var id = result[0];
                var wizardStepId = result[1];
                var pAkStepAnswerInstance = personApwStepAnswerTemplateManager.getPersonApwStepAnswerByColumnIdStepId(id, wizardStepId);
                LocalStorageUtility.deletePApWizardStepAnswerTemplate(id, wizardStepId);
                personApwStepAnswerTemplateManager.removeInstance(pAkStepAnswerInstance);
            }

            LocalStorageUtility.saveOfflineDb(); //for (var mlDel = 0; mlDel < deletePersonMultiTaskIds.length; mlDel++) {
            //    var mulTskId = deletePersonMultiTaskIds[mlDel];
            //    var personMultiTaskInstance = LocalStorageUtility.deletePApMultiTask(mulTskId);
            //    personApwMultiTaskManager.removeInstance(personMultiTaskInstance);
            //}
            // Deleting action plan ids

            for (var i = 0; i < deleteActionPlanIds.length; i++) {
                var wizardId = deleteActionPlanIds[i];
                var apWizard = actionPlanWizardManager.getActionPlanWizard(wizardId);
                var apwSteps = apWizard.WizardSteps;
                var favoritesManager = $injector.get('favoritesManager');
                favoritesManager.deleteFavoritesById(wizardId);

                for (var j = 0; j < apwSteps.length; j++) {
                    var apwStep = apwSteps[j];
                    var apwStepColumn = apwStep.Columns;

                    for (var k = 0; k < apwStepColumn.length; k++) {
                        var col = apwStepColumn[k];
                        var colId = col.Id;
                        LocalStorageUtility.deleteActionPlanWizardStepColumn(colId, apwStep.Id);
                        var stepAnswer = LocalStorageUtility.deletePApWizardStepAnswerTemplate(colId, apwStep.Id);
                        actionPlanWizardStepColumnManager.removeInstance(col);
                    }

                    var stepId = apwStep.Id;
                    LocalStorageUtility.deleteActionPlanWizardStep(stepId);
                    actionPlanWizardStepManager.removeInstance(apwStep);
                }

                var pAwEntity = personApwTemplateManager.getUnAnsweredPersonActionPlanWizard(wizardId);
                personApwTemplateManager.clearInstance(pAwEntity);
                actionPlanWizardManager.removeInstance(apWizard);
                LocalStorageUtility.deleteActionPlanWizard(wizardId);
                LocalStorageUtility.deletePersonActionPlanAttachTemplate(wizardId);
                LocalStorageUtility.deletePersonActionPlanWizardTemplate(wizardId);
                var personActionPlanWiz = LocalStorageUtility.getPersonActionPlanWizardByWizardId(wizardId);

                for (var wiz = 0; wiz < personActionPlanWiz.length; wiz++) {
                    var pAPWizard = personActionPlanWiz[wiz];
                    LocalStorageUtility.deleteMultiTaskByPersonApwId(pAPWizard.Id);
                    LocalStorageUtility.deletePersonActionPlanWizard(pAPWizard.Id);
                }
            } // Clearing all the values stored in pool


            actionPlanWizardManager.resetActionPlanPool();
            var savePromise = LocalStorageUtility.saveOfflineDb();
            savePromise.promise.then(function () {
                def.resolve();
            });
            return def.promise;
        },
        fetchActionPlanWizardMultiTask: function fetchActionPlanWizardMultiTask(columnData, actionplanStepId) {
            LocalStorageUtility.addActionPlanWizardStepColumnData(columnData, actionplanStepId);
            allActionPlanStepColumnIds.push(apStepColumnId);
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    return personApwManagerScope;
}]);
app.factory('personApwTemplateManager', ['PersonActionPlanWizardTemplate', 'LocalStorageUtility', 'personApwStepAnswerTemplateManager', 'actionPlanWizardManager', 'personApwAttachmentTemplateManager', '$q', 'DateUtil', 'FileUtil', function (PersonActionPlanWizard, LocalStorageUtility, personApwStepAnswerTemplateManager, actionPlanWizardManager, personApwAttachmentTemplateManager, $q, DateUtil, FileUtil) {
    var personApwManagerScope = {
        _pool: {},
        _retrieveInstance: function _retrieveInstance(personApwId, personApwData) {
            var instance = this._pool[personApwId];

            if (instance) {
                instance.setData(personApwData);
            } else {
                instance = new PersonActionPlanWizard();
                instance.setData(personApwData);
                this._pool[personApwId] = instance;
            }

            return instance;
        },
        removeInstance: function removeInstance(personApw) {
            var pApwId = personApw.Id;
            var pool = this._pool;

            for (var i = 0; i < personApw.ColumnValues.length; i++) {
                var personColumnAnswer = personApw.ColumnValues[i];
                personApwStepAnswerTemplateManager.removeInstance(personColumnAnswer);
            }

            for (var i = 0; i < personApw.Attachments.length; i++) {
                var personAttachment = personApw.Attachments[i]; // On succes upload delete the image from the file system

                var filePath = personAttachment.FilePath;

                if (filePath) {
                    var deletePromise = FileUtil.deleteFile(filePath);
                    deletePromise.then(function (success) {// Success
                    }, function (error) {// Error
                    });
                }

                personApwAttachmentTemplateManager.removeInstance(personAttachment);
            }

            delete pool[pApwId];
            LocalStorageUtility.deletePersonActionPlanWizard(pApwId);
        },
        clearInstance: function clearInstance(personApw) {
            var pApwId = personApw.Id;
            var pool = this._pool;

            for (var i = 0; i < personApw.ColumnValues.length; i++) {
                var personColumnAnswer = personApw.ColumnValues[i];
                personApwStepAnswerTemplateManager.removeInstance(personColumnAnswer);
            }

            for (var i = 0; i < personApw.Attachments.length; i++) {
                var personAttachment = personApw.Attachments[i]; // On succes upload delete the image from the file system

                var filePath = personAttachment.FilePath;

                if (filePath) {
                    var deletePromise = FileUtil.deleteFile(filePath);
                    deletePromise.then(function (success) {// Success
                    }, function (error) {// Error
                    });
                }

                personApwAttachmentTemplateManager.removeInstance(personAttachment);
            }

            delete pool[pApwId];
        },
        _search: function _search(personApwId) {
            var personApwAnswer = this._pool[personApwId];

            if (personApwAnswer == null) {
                personApwAnswer = this._load(personApwId);
            }

            return personApwAnswer;
        },
        _loadFromTemplate: function _loadFromTemplate(personApwId) {
            var personApwData = LocalStorageUtility.getPersonActionPlanWizardTemplate(personApwId);

            var personApwEntity = this._retrieveInstance(personApwData.Id, personApwData);

            var wizardId = personApwData.wizardId;
            personApwEntity.Wizard = actionPlanWizardManager.getActionPlanWizard(wizardId);
            personApwEntity.MultiTaskSolutions = null;
            personApwEntity.ColumnValues = personApwStepAnswerTemplateManager.getPersonApwStepAnswerFromTemplate(personApwId);
            personApwEntity.Attachments = personApwAttachmentTemplateManager.getPersonActionPlanWizardAttachmentsTemplate(personApwId);
            return personApwEntity;
        },
        _load: function _load(personApwId) {
            var personApwData = LocalStorageUtility.getPersonActionPlanWizard(personApwId);

            var personApwEntity = this._retrieveInstance(personApwId, personApwData);

            var wizardId = personApwData.wizardId;
            personApwEntity.Wizard = actionPlanWizardManager.getActionPlanWizard(wizardId);
            personApwEntity.ColumnValues = personApwStepAnswerTemplateManager.getPersonApwStepAnswers(personApwId);
            personApwEntity.Attachments = personApwAttachmentTemplateManager.getPersonActionPlanWizardAttachments(personApwId);
            return personApwEntity;
        },
        refreshPool: function refreshPool(oldEntity, newEntitySource) {
            var key = oldEntity.Id;
            var newKey = newEntitySource.Id;
            var pool = this._pool;
            delete pool[key];
            return this._load(newKey);
        },
        getPersonActionPlanWizard: function getPersonActionPlanWizard(personApwId) {
            var personApw = this._search(personApwId);

            if (!personApw) {
                return this._load(personApwId);
            }

            return personApw;
        },

        /* This method returns an entry to the un answered action plan/problem */
        getUnAnsweredPersonActionPlanWizard: function getUnAnsweredPersonActionPlanWizard(apwId) {
            var personApw = LocalStorageUtility.getUnAnsweredPersonActionPlanWizardByActionPlan(apwId);
            return this._loadFromTemplate(personApw.Id);
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    return personApwManagerScope;
}]);
/*Gen code*/
//Category-------------------------------------------

app.factory('categoryManager', ['Category', 'LocalStorageUtility', function (Category, LocalStorageUtility) {
    var categoryManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(categoryId, categoryData) {
            var instance = this._pool[categoryId];

            if (instance) {
                instance.setData(categoryData);
            } else {
                instance = new Category();
                instance.setData(categoryData);
                this._pool[categoryId] = instance;
            }

            return instance;
        },
        _search: function _search(categoryId) {
            return this._pool[categoryId];
        },
        _load: function _load(categoryId, categoryData) {
            return this._retrieveInstance(categoryId, categoryData);
        },
        loadCategory: function loadCategory(categoryId) {
            var category = LocalStorageUtility.getCategory(categoryId);
            return this._load(categoryId, category);
        },
        getCategory: function getCategory(categoryId) {
            var category = this._search(categoryId);

            if (!category) {
                category = this.loadCategory(categoryId);
            }

            return category;
        },
        getAllCategory: function getAllCategory() {
            var categorys = LocalStorageUtility.getAllCategorys();
            var entityCategorys = [];

            for (var i = 0; i < categorys.length; i++) {
                var category = categorys[i];

                var entiyCategory = this._load(category.Id, category);

                entityCategorys.push(entiyCategory);
            }

            return entityCategorys;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = categoryManagerScope;
    return categoryManagerScope;
}]); //Status-------------------------------------------

app.factory('statusManager', ['Status', 'LocalStorageUtility', function (Status, LocalStorageUtility) {
    var statusManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(statusId, statusData) {
            var instance = this._pool[statusId];

            if (instance) {
                instance.setData(statusData);
            } else {
                instance = new Status();
                instance.setData(statusData);
                this._pool[statusId] = instance;
            }

            return instance;
        },
        _search: function _search(statusId) {
            return this._pool[statusId];
        },
        _load: function _load(statusId, statusData) {
            return this._retrieveInstance(statusId, statusData);
        },
        loadStatus: function loadStatus(statusId) {
            var status = LocalStorageUtility.getStatus(statusId);
            return this._load(statusId, status);
        },
        getStatus: function getStatus(statusId) {
            var status = this._search(statusId);

            if (!status) {
                status = this.loadStatus(statusId);
            }

            return status;
        },
        getAllStatus: function getAllStatus() {
            var statuss = LocalStorageUtility.getAllStatuss();
            var entityStatuss = [];

            for (var i = 0; i < statuss.length; i++) {
                var status = statuss[i];

                var entiyStatus = this._load(status.Id, status);

                entityStatuss.push(entiyStatus);
            }

            return entityStatuss;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = statusManagerScope;
    return statusManagerScope;
}]); //Department-------------------------------------------

app.factory('departmentManager', ['Department', 'LocalStorageUtility', function (Department, LocalStorageUtility) {
    var departmentManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(departmentId, departmentData) {
            var instance = this._pool[departmentId];

            if (instance) {
                instance.setData(departmentData);
            } else {
                instance = new Department();
                instance.setData(departmentData);
                this._pool[departmentId] = instance;
            }

            return instance;
        },
        _search: function _search(departmentId) {
            return this._pool[departmentId];
        },
        _load: function _load(departmentId, departmentData) {
            return this._retrieveInstance(departmentId, departmentData);
        },
        loadDepartment: function loadDepartment(departmentId) {
            var department = LocalStorageUtility.getDepartment(departmentId);

            if (department) {
                return this._load(departmentId, department);
            }

            return null;
        },
        getDepartment: function getDepartment(departmentId) {
            var department = this._search(departmentId);

            if (!department) {
                department = this.loadDepartment(departmentId);
            }

            return department;
        },
        getAllDepartment: function getAllDepartment() {
            var departments = LocalStorageUtility.getAllDepartments();
            var entityDepartments = [];

            for (var i = 0; i < departments.length; i++) {
                var department = departments[i];

                var entiyDepartment = this._load(department.Id, department);

                entityDepartments.push(entiyDepartment);
            }

            return entityDepartments;
        },
        getDepartmentsByUser: function getDepartmentsByUser(userId, applicationId) {
            var entityDepartments = [];
            var userDepartments = LocalStorageUtility.getUserDepartmentsByUserId(userId);
            var includeSubDepartments = LocalStorageUtility.isIncludeSubDepartment(userId, applicationId);

            for (var i = 0; i < userDepartments.length; i++) {
                var deptId = userDepartments[i];
                var entiyDepartment = this.getDepartment(deptId);

                if (entiyDepartment) {
                    if (includeSubDepartments === false) {
                        if (entiyDepartment.IsSubEntity === false) {
                            entityDepartments.push(entiyDepartment);
                        }
                    } else {
                        entityDepartments.push(entiyDepartment);
                    }
                }
            }

            return entityDepartments;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = departmentManagerScope;
    return departmentManagerScope;
}]); //Probability-------------------------------------------

app.factory('probabilityManager', ['Probability', 'LocalStorageUtility', function (Probability, LocalStorageUtility) {
    var probabilityManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(probabilityId, probabilityData) {
            var instance = this._pool[probabilityId];

            if (instance) {
                instance.setData(probabilityData);
            } else {
                instance = new Probability();
                instance.setData(probabilityData);
                this._pool[probabilityId] = instance;
            }

            return instance;
        },
        _search: function _search(probabilityId) {
            return this._pool[probabilityId];
        },
        _load: function _load(probabilityId, probabilityData) {
            return this._retrieveInstance(probabilityId, probabilityData);
        },
        loadProbability: function loadProbability(probabilityId) {
            var probability = LocalStorageUtility.getProbability(probabilityId);
            return this._load(probabilityId, probability);
        },
        getProbability: function getProbability(probabilityId) {
            var probability = this._search(probabilityId);

            if (!probability) {
                probability = this.loadProbability(probabilityId);
            }

            return probability;
        },
        getAllProbability: function getAllProbability() {
            var probabilitys = LocalStorageUtility.getAllProbabilitys();
            var entityProbabilitys = [];

            for (var i = 0; i < probabilitys.length; i++) {
                var probability = probabilitys[i];

                var entiyProbability = this._load(probability.Id, probability);

                entityProbabilitys.push(entiyProbability);
            }

            return entityProbabilitys;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = probabilityManagerScope;
    return probabilityManagerScope;
}]); //Consequence-------------------------------------------

app.factory('consequenceManager', ['Consequence', 'LocalStorageUtility', function (Consequence, LocalStorageUtility) {
    var consequenceManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(consequenceId, consequenceData) {
            var instance = this._pool[consequenceId];

            if (instance) {
                instance.setData(consequenceData);
            } else {
                instance = new Consequence();
                instance.setData(consequenceData);
                this._pool[consequenceId] = instance;
            }

            return instance;
        },
        _search: function _search(consequenceId) {
            return this._pool[consequenceId];
        },
        _load: function _load(consequenceId, consequenceData) {
            return this._retrieveInstance(consequenceId, consequenceData);
        },
        loadConsequence: function loadConsequence(consequenceId) {
            var consequence = LocalStorageUtility.getConsequence(consequenceId);
            return this._load(consequenceId, consequence);
        },
        getConsequence: function getConsequence(consequenceId) {
            var consequence = this._search(consequenceId);

            if (!consequence) {
                consequence = this.loadConsequence(consequenceId);
            }

            return consequence;
        },
        getAllConsequence: function getAllConsequence() {
            var consequences = LocalStorageUtility.getAllConsequences();
            var entityConsequences = [];

            for (var i = 0; i < consequences.length; i++) {
                var consequence = consequences[i];

                var entiyConsequence = this._load(consequence.Id, consequence);

                entityConsequences.push(entiyConsequence);
            }

            return entityConsequences;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = consequenceManagerScope;
    return consequenceManagerScope;
}]); //Priority-------------------------------------------

app.factory('priorityManager', ['Priority', 'LocalStorageUtility', function (Priority, LocalStorageUtility) {
    var priorityManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(priorityId, priorityData) {
            var instance = this._pool[priorityId];

            if (instance) {
                instance.setData(priorityData);
            } else {
                instance = new Priority();
                instance.setData(priorityData);
                this._pool[priorityId] = instance;
            }

            return instance;
        },
        _search: function _search(priorityId) {
            return this._pool[priorityId];
        },
        _load: function _load(priorityId, priorityData) {
            return this._retrieveInstance(priorityId, priorityData);
        },
        loadPriority: function loadPriority(priorityId) {
            var priority = LocalStorageUtility.getPriority(priorityId);
            return this._load(priorityId, priority);
        },
        getPriority: function getPriority(priorityId) {
            var priority = this._search(priorityId);

            if (!priority) {
                priority = this.loadPriority(priorityId);
            }

            return priority;
        },
        getAllPriority: function getAllPriority() {
            var prioritys = LocalStorageUtility.getAllPrioritys();
            var entityPrioritys = [];

            for (var i = 0; i < prioritys.length; i++) {
                var priority = prioritys[i];

                var entiyPriority = this._load(priority.Id, priority);

                entityPrioritys.push(entiyPriority);
            }

            return entityPrioritys;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = priorityManagerScope;
    return priorityManagerScope;
}]); //ProblemArea-------------------------------------------

app.factory('problemAreaManager', ['ProblemArea', 'LocalStorageUtility', function (ProblemArea, LocalStorageUtility) {
    var problemAreaManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(problemAreaId, problemAreaData) {
            var instance = this._pool[problemAreaId];

            if (instance) {
                instance.setData(problemAreaData);
            } else {
                instance = new ProblemArea();
                instance.setData(problemAreaData);
                this._pool[problemAreaId] = instance;
            }

            return instance;
        },
        _search: function _search(problemAreaId) {
            return this._pool[problemAreaId];
        },
        _load: function _load(problemAreaId, problemAreaData) {
            return this._retrieveInstance(problemAreaId, problemAreaData);
        },
        loadProblemArea: function loadProblemArea(problemAreaId) {
            var problemArea = LocalStorageUtility.getProblemArea(problemAreaId);
            return this._load(problemAreaId, problemArea);
        },
        getProblemArea: function getProblemArea(problemAreaId) {
            var problemArea = this._search(problemAreaId);

            if (!problemArea) {
                problemArea = this.loadProblemArea(problemAreaId);
            }

            return problemArea;
        },
        getAllProblemArea: function getAllProblemArea() {
            var problemAreas = LocalStorageUtility.getAllProblemAreas();
            var entityProblemAreas = [];

            for (var i = 0; i < problemAreas.length; i++) {
                var problemArea = problemAreas[i];

                var entiyProblemArea = this._load(problemArea.Id, problemArea);

                entityProblemAreas.push(entiyProblemArea);
            }

            return entityProblemAreas;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = problemAreaManagerScope;
    return problemAreaManagerScope;
}]); //LineOfBusiness-------------------------------------------

app.factory('lineOfBusinessManager', ['LineOfBusiness', 'LocalStorageUtility', function (LineOfBusiness, LocalStorageUtility) {
    var lineOfBusinessManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(lineOfBusinessId, lineOfBusinessData) {
            var instance = this._pool[lineOfBusinessId];

            if (instance) {
                instance.setData(lineOfBusinessData);
            } else {
                instance = new LineOfBusiness();
                instance.setData(lineOfBusinessData);
                this._pool[lineOfBusinessId] = instance;
            }

            return instance;
        },
        _search: function _search(lineOfBusinessId) {
            return this._pool[lineOfBusinessId];
        },
        _load: function _load(lineOfBusinessId, lineOfBusinessData) {
            return this._retrieveInstance(lineOfBusinessId, lineOfBusinessData);
        },
        loadLineOfBusiness: function loadLineOfBusiness(lineOfBusinessId) {
            var lineOfBusiness = LocalStorageUtility.getLineOfBusiness(lineOfBusinessId);
            return this._load(lineOfBusinessId, lineOfBusiness);
        },
        getLineOfBusiness: function getLineOfBusiness(lineOfBusinessId) {
            var lineOfBusiness = this._search(lineOfBusinessId);

            if (!lineOfBusiness) {
                lineOfBusiness = this.loadLineOfBusiness(lineOfBusinessId);
            }

            return lineOfBusiness;
        },
        getAllLineOfBusiness: function getAllLineOfBusiness() {
            var lineOfBusinesss = LocalStorageUtility.getAllLineOfBusinesss();
            var entityLineOfBusinesss = [];

            for (var i = 0; i < lineOfBusinesss.length; i++) {
                var lineOfBusiness = lineOfBusinesss[i];

                var entiyLineOfBusiness = this._load(lineOfBusiness.Id, lineOfBusiness);

                entityLineOfBusinesss.push(entiyLineOfBusiness);
            }

            return entityLineOfBusinesss;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = lineOfBusinessManagerScope;
    return lineOfBusinessManagerScope;
}]); //Person-------------------------------------------

app.factory('personManager', ['Person', 'LocalStorageUtility', function (Person, LocalStorageUtility) {
    var personManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(personId, personData) {
            var instance = this._pool[personId];

            if (instance) {
                instance.setData(personData);
            } else {
                instance = new Person();
                instance.setData(personData);
                this._pool[personId] = instance;
            }

            return instance;
        },
        _search: function _search(personId) {
            return this._pool[personId];
        },
        _load: function _load(personId, personData) {
            return this._retrieveInstance(personId, personData);
        },
        loadPerson: function loadPerson(personId) {
            var person = LocalStorageUtility.getPerson(personId);
            return this._load(personId, person);
        },
        getPerson: function getPerson(personId) {
            var person = this._search(personId);

            if (!person) {
                person = this.loadPerson(personId);
            }

            return person;
        },
        _getOnlyPersonsEntity: function _getOnlyPersonsEntity(persons, personProperty) {
            var entityPersons = [];

            for (var i = 0; i < persons.length; i++) {
                var personData = persons[i];
                var personId = personData.Id;

                var entityPerson = this._search(personId);

                if (!entityPerson) {
                    entityPerson = this._retrieveInstance(personId, personData);
                }

                if (entityPerson[personProperty] === true) {
                    entityPersons.push(entityPerson);
                }
            }

            return entityPersons;
        },
        getAllPersonsResponsible: function getAllPersonsResponsible(userId, applicationId) {
            var userPersonList = LocalStorageUtility.getPersonListForUser(userId);
            return this._getOnlyPersonsEntity(userPersonList, 'IsResponsible');
        },
        getAllPersonForAskade: function getAllPersonForAskade(userId) {
            var userPersonList = LocalStorageUtility.getPersonListForUser(userId);
            return this._getOnlyPersonsEntity(userPersonList, 'IsFile');
        },
        getAllPersonForQuestionnaire: function getAllPersonForQuestionnaire(userId) {
            var userPersonList = LocalStorageUtility.getPersonListForUser(userId);
            return this._getOnlyPersonsEntity(userPersonList, 'IsFile');
        },
        getAllPersonsList: function getAllPersonsList(userId) {
            var userPersonList = LocalStorageUtility.getPersonListForUser(userId);
            var personList = [];

            for (var i = 0; i < userPersonList.length; i++) {
                var person = userPersonList[i];
                var personId = person.Id;

                var entityPerson = this._search(personId);

                if (!entityPerson) {
                    entityPerson = this._retrieveInstance(personId, personData);
                }

                personList.push(entityPerson);
            }

            return personList;
        },
        getAllOwners: function getAllOwners(userId, applicationId) {
            var userPersonList = LocalStorageUtility.getPersonListForUser(userId);
            return this._getOnlyPersonsEntity(userPersonList, 'IsOwner');
        },
        getAllPersonsByPovAndApplication: function getAllPersonsByPovAndApplication(userId, applicationId) {
            var userPersonList = LocalStorageUtility.getPersonListForUser(userId);
            return this._getAllPersonByApplication(userPersonList, userId, applicationId, 'IsPointOfView');
        },
        getAllPersonsByApplication: function getAllPersonsByApplication(userId, applicationId) {
            var userPersonList = LocalStorageUtility.getPersonListForUser(userId);
            var entityPersons = [];
            var includeSubDepartments = LocalStorageUtility.isIncludeSubDepartment(userId, applicationId);

            for (var i = 0; i < userPersonList.length; i++) {
                var personData = userPersonList[i];
                var personId = personData.Id;

                var personEntity = this._search(personId);

                if (!personEntity) {
                    personEntity = this._retrieveInstance(personId, personData);
                }

                if (includeSubDepartments === false) {
                    if (personEntity.IsSubEntity === false) {
                        entityPersons.push(personEntity);
                    }
                } else {
                    entityPersons.push(personEntity);
                }
            }

            return entityPersons;
        },
        _getAllPersonByApplication: function _getAllPersonByApplication(personsOrOwners, userId, applicationId, personProperty) {
            var entityPersons = [];
            var includeSubDepartments = LocalStorageUtility.isIncludeSubDepartment(userId, applicationId);

            for (var i = 0; i < personsOrOwners.length; i++) {
                var personData = personsOrOwners[i];
                var personId = personData.Id;

                var personEntity = this._search(personId);

                if (!personEntity) {
                    personEntity = this._retrieveInstance(personId, personData);
                }

                if (personEntity[personProperty] === true) {
                    if (includeSubDepartments === false) {
                        if (personEntity.IsSubEntity === false) {
                            entityPersons.push(personEntity);
                        }
                    } else {
                        entityPersons.push(personEntity);
                    }
                }
            }

            return entityPersons;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = personManagerScope;
    return personManagerScope;
}]); //SafetyDepartment-------------------------------------------

app.factory('safetyDepartmentManager', ['SafetyDepartment', 'LocalStorageUtility', function (SafetyDepartment, LocalStorageUtility) {
    var safetyDepartmentManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(safetyDepartmentId, safetyDepartmentData) {
            var instance = this._pool[safetyDepartmentId];

            if (instance) {
                instance.setData(safetyDepartmentData);
            } else {
                instance = new SafetyDepartment();
                instance.setData(safetyDepartmentData);
                this._pool[safetyDepartmentId] = instance;
            }

            return instance;
        },
        _search: function _search(safetyDepartmentId) {
            return this._pool[safetyDepartmentId];
        },
        _load: function _load(safetyDepartmentId, safetyDepartmentData) {
            return this._retrieveInstance(safetyDepartmentId, safetyDepartmentData);
        },
        loadSafetyDepartment: function loadSafetyDepartment(safetyDepartmentId) {
            var safetyDepartment = LocalStorageUtility.getSafetyDepartment(safetyDepartmentId);
            return this._load(safetyDepartmentId, safetyDepartment);
        },
        getSafetyDepartment: function getSafetyDepartment(safetyDepartmentId) {
            var safetyDepartment = this._search(safetyDepartmentId);

            if (!safetyDepartment) {
                safetyDepartment = this.loadSafetyDepartment(safetyDepartmentId);
            }

            return safetyDepartment;
        },
        getAllSafetyDepartment: function getAllSafetyDepartment() {
            var safetyDepartments = LocalStorageUtility.getAllSafetyDepartments();
            var entitySafetyDepartments = [];

            for (var i = 0; i < safetyDepartments.length; i++) {
                var safetyDepartment = safetyDepartments[i];

                var entiySafetyDepartment = this._load(safetyDepartment.Id, safetyDepartment);

                entitySafetyDepartments.push(entiySafetyDepartment);
            }

            return entitySafetyDepartments;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = safetyDepartmentManagerScope;
    return safetyDepartmentManagerScope;
}]); //Process-------------------------------------------

app.factory('processManager', ['Process', 'LocalStorageUtility', function (Process, LocalStorageUtility) {
    var processManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(processId, processData) {
            var instance = this._pool[processId];

            if (instance) {
                instance.setData(processData);
            } else {
                instance = new Process();
                instance.setData(processData);
                this._pool[processId] = instance;
            }

            return instance;
        },
        _search: function _search(processId) {
            return this._pool[processId];
        },
        _load: function _load(processId, processData) {
            return this._retrieveInstance(processId, processData);
        },
        loadProcess: function loadProcess(processId) {
            var process = LocalStorageUtility.getProcess(processId);
            return this._load(processId, process);
        },
        getProcess: function getProcess(processId) {
            var process = this._search(processId);

            if (!process) {
                process = this.loadProcess(processId);
            }

            return process;
        },
        getAllProcess: function getAllProcess() {
            var processs = LocalStorageUtility.getAllProcesss();
            var entityProcesss = [];

            for (var i = 0; i < processs.length; i++) {
                var process = processs[i];

                var entiyProcess = this._load(process.Id, process);

                entityProcesss.push(entiyProcess);
            }

            return entityProcesss;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = processManagerScope;
    return processManagerScope;
}]);


//Geography Location
app.factory('geographyLocationManager', ['GeographyLocation', 'LocalStorageUtility', function (GeographyLocation, LocalStorageUtility) {
    var GeographyLocationManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(GeographyLocationId, GeographyLocationData) {
            var instance = this._pool[GeographyLocationId];

            if (instance) {
                instance.setData(GeographyLocationData);
            } else {
                instance = new GeographyLocation();
                instance.setData(GeographyLocationData);
                this._pool[GeographyLocationId] = instance;
            }
            return instance;
        },
        _search: function _search(GeographyLocationId) {
            return this._pool[GeographyLocationId];
        },
        _load: function _load(GeographyLocationId, GeographyLocationData) {
            return this._retrieveInstance(GeographyLocationId, GeographyLocationData);
        },
        loadGeographyLocation: function loadGeographyLocation(GeographyLocationId) {
            var GeographyLocation = LocalStorageUtility.getGeographyLocation(GeographyLocationId);
            return this._load(GeographyLocationId, GeographyLocation);
        },
        getGeographyLocation: function getGeographyLocation(GeographyLocationId) {
            var GeographyLocation = this._search(GeographyLocationId);

            if (!GeographyLocation) {
                GeographyLocation = this.loadGeographyLocation(GeographyLocationId);
            }

            return GeographyLocation;
        },
        getAllGeographyLocation: function getAllGeographyLocation() {
            var GeographyLocations = LocalStorageUtility.getAllGeographyLocations();
            var entityGeographyLocations = [];

            for (var i = 0; i < GeographyLocations.length; i++) {
                var GeographyLocation = GeographyLocations[i];

                var entiyGeographyLocation = this._load(GeographyLocation.Id, GeographyLocation);

                entityGeographyLocations.push(entiyGeographyLocation);
            }

            return entityGeographyLocations;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = GeographyLocationManagerScope;
    return GeographyLocationManagerScope;
}]);

//Chemical....
app.factory('chemicalManager', ['Chemical', 'LocalStorageUtility',
    function (Chemical, LocalStorageUtility) {
        var chemicalManagerScope = {
            _pool: {},
            executeFunctionByName: function executeFunctionByName(functionName, params) {
                return service[functionName].apply(this, params);
            },
            _retrieveInstance: function _retrieveInstance(chemicalId, chemicalData) {
                var instance = this._pool[chemicalId];

                if (instance) {
                    instance.setData(chemicalData);
                } else {
                    instance = new Chemical();
                    instance.setData(chemicalData);
                    this._pool[chemicalId] = instance;
                }
                return instance;
            },
            _search: function _search(chemicalId) {
                return this._pool[chemicalId];
            },
            _load: function _load(chemicalId, chemicalData) {
                return this._retrieveInstance(chemicalId, chemicalData);
            },
            loadChemical: function loadChemical(chemicalId) {
                var chemical = LocalStorageUtility.getChemical(chemicalId);
                return this._load(chemicalId, chemical);
            },
            getChemical: function getChemical(chemicalId) {
                var chemical = this._search(chemicalId);

                if (!chemical) {
                    chemical = this.loadChemical(chemicalId);
                }
                return chemical;
            },
            getAllChemical: function getAllChemical() {
                var chemicals = LocalStorageUtility.getAllChemicals();
                var entityChemicals = [];

                for (var i = 0; i < chemicals.length; i++) {
                    var chemical = chemicals[i];
                    var entiyChemical = this._load(chemical.Id, chemical);
                    entityChemicals.push(entiyChemical);
                }

                return entityChemicals;
            },
            reset: function reset() {
                this._pool = {};
            }
        };
        var service = chemicalManagerScope;
        return chemicalManagerScope;
    }]);

//Insurance
app.factory('insuranceManager', ['Insurance', 'LocalStorageUtility',
    function (Insurance, LocalStorageUtility) {
        var insuranceManagerScope = {
            _pool: {},
            executeFunctionByName: function executeFunctionByName(functionName, params) {
                return service[functionName].apply(this, params);
            },
            _retrieveInstance: function _retrieveInstance(insuranceId, insuranceData) {
                var instance = this._pool[insuranceId];

                if (instance) {
                    instance.setData(insuranceData);
                } else {
                    instance = new Insurance();
                    instance.setData(insuranceData);
                    this._pool[insuranceId] = instance;
                }
                return instance;
            },
            _search: function _search(insuranceId) {
                return this._pool[insuranceId];
            },
            _load: function _load(insuranceId, insuranceData) {
                return this._retrieveInstance(insuranceId, insuranceData);
            },
            loadInsurance: function loadInsurance(insuranceId) {
                var insurance = LocalStorageUtility.getInsurance(insuranceId);
                return this._load(insuranceId, insurance);
            },
            getInsurance: function getInsurance(insuranceId) {
                var insurance = this._search(insuranceId);

                if (!insurance) {
                    insurance = this.loadInsurance(insuranceId);
                }
                return insurance;
            },
            getAllInsurance: function getAllInsurance() {
                var insurances = LocalStorageUtility.getAllInsurances();
                var entityInsurances = [];

                for (var i = 0; i < insurances.length; i++) {
                    var insurance = insurances[i];
                    var entiyInsurance = this._load(insurance.Id, insurance);
                    entityInsurances.push(entiyInsurance);
                }

                return entiyInsurance;
            },
            getAllInsurancesByDataTypeId: function getAllInsurancesByDataTypeId(dataTypeId) {
                var insuranceList = LocalStorageUtility.getAllInsurancesByDataTypeId(dataTypeId);
                var entityInsuranceList = [];

                for (var i = 0; i < insuranceList.length; i++) {
                    var insurance = insuranceList[i];

                    var entiyInsurance = this._load(insurance.Id, insurance);

                    entityInsuranceList.push(entiyInsurance);
                }

                return entityInsuranceList;
            },
            reset: function reset() {
                this._pool = {};
            }
        };
        var service = insuranceManagerScope;
        return insuranceManagerScope;
    }]);

//Asset-------------------------------------------
app.factory('assetManager', ['Asset', 'LocalStorageUtility', function (Asset, LocalStorageUtility) {
    var assetManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(assetId, assetData) {
            var instance = this._pool[assetId];

            if (instance) {
                instance.setData(assetData);
            } else {
                instance = new Asset();
                instance.setData(assetData);
                this._pool[assetId] = instance;
            }

            return instance;
        },
        _search: function _search(assetId) {
            return this._pool[assetId];
        },
        _load: function _load(assetId, assetData) {
            return this._retrieveInstance(assetId, assetData);
        },
        loadAsset: function loadAsset(assetId) {
            var asset = LocalStorageUtility.getAsset(assetId);
            return this._load(assetId, asset);
        },
        getAsset: function getAsset(assetId) {
            var asset = this._search(assetId);

            if (!asset) {
                asset = this.loadAsset(assetId);
            }

            return asset;
        },
        getAllAsset: function getAllAsset() {
            var assets = LocalStorageUtility.getAllAssets();
            var entityAssets = [];

            for (var i = 0; i < assets.length; i++) {
                var asset = assets[i];

                var entiyAsset = this._load(asset.Id, asset);

                entityAssets.push(entiyAsset);
            }

            return entityAssets;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = assetManagerScope;
    return assetManagerScope;
}]);

//ControlLevel-------------------------------------------
app.factory('controlLevelManager', ['ControlLevel', 'LocalStorageUtility', function (ControlLevel, LocalStorageUtility) {
    var controlLevelManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(controlLevelId, controlLevelData) {
            var instance = this._pool[controlLevelId];

            if (instance) {
                instance.setData(controlLevelData);
            } else {
                instance = new ControlLevel();
                instance.setData(controlLevelData);
                this._pool[controlLevelId] = instance;
            }

            return instance;
        },
        _search: function _search(controlLevelId) {
            return this._pool[controlLevelId];
        },
        _load: function _load(controlLevelId, controlLevelData) {
            return this._retrieveInstance(controlLevelId, controlLevelData);
        },
        loadControlLevel: function loadControlLevel(controlLevelId) {
            var controlLevel = LocalStorageUtility.getControlLevel(controlLevelId);
            return this._load(controlLevelId, controlLevel);
        },
        getControlLevel: function getControlLevel(controlLevelId) {
            var controlLevel = this._search(controlLevelId);

            if (!controlLevel) {
                controlLevel = this.loadControlLevel(controlLevelId);
            }

            return controlLevel;
        },
        getAllControlLevel: function getAllControlLevel() {
            var controlLevels = LocalStorageUtility.getAllControlLevels();
            var entityControlLevels = [];

            for (var i = 0; i < controlLevels.length; i++) {
                var controlLevel = controlLevels[i];

                var entiyControlLevel = this._load(controlLevel.Id, controlLevel);

                entityControlLevels.push(entiyControlLevel);
            }

            return entityControlLevels;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = controlLevelManagerScope;
    return controlLevelManagerScope;
}]); //CustomerFieldValue1-------------------------------------------

app.factory('customerFieldValue1Manager', ['CustomerFieldValue1', 'LocalStorageUtility', function (CustomerFieldValue1, LocalStorageUtility) {
    var customerFieldValue1ManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(customerFieldValue1Id, customerFieldValue1Data) {
            var instance = this._pool[customerFieldValue1Id];

            if (instance) {
                instance.setData(customerFieldValue1Data);
            } else {
                instance = new CustomerFieldValue1();
                instance.setData(customerFieldValue1Data);
                this._pool[customerFieldValue1Id] = instance;
            }

            return instance;
        },
        _search: function _search(customerFieldValue1Id) {
            return this._pool[customerFieldValue1Id];
        },
        _load: function _load(customerFieldValue1Id, customerFieldValue1Data) {
            return this._retrieveInstance(customerFieldValue1Id, customerFieldValue1Data);
        },
        loadCustomerFieldValue1: function loadCustomerFieldValue1(customerFieldValue1Id) {
            var customerFieldValue1 = LocalStorageUtility.getCustomerFieldValue1(customerFieldValue1Id);
            return this._load(customerFieldValue1Id, customerFieldValue1);
        },
        getCustomerFieldValue1: function getCustomerFieldValue1(customerFieldValue1Id) {
            var customerFieldValue1 = this._search(customerFieldValue1Id);

            if (!customerFieldValue1) {
                customerFieldValue1 = this.loadCustomerFieldValue1(customerFieldValue1Id);
            }

            return customerFieldValue1;
        },
        getAllCustomerFieldValue1: function getAllCustomerFieldValue1() {
            var customerFieldValue1s = LocalStorageUtility.getAllCustomerFieldValue1s();
            var entityCustomerFieldValue1s = [];

            for (var i = 0; i < customerFieldValue1s.length; i++) {
                var customerFieldValue1 = customerFieldValue1s[i];

                var entiyCustomerFieldValue1 = this._load(customerFieldValue1.Id, customerFieldValue1);

                entityCustomerFieldValue1s.push(entiyCustomerFieldValue1);
            }

            return entityCustomerFieldValue1s;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = customerFieldValue1ManagerScope;
    return customerFieldValue1ManagerScope;
}]); //CustomerFieldValue2-------------------------------------------

app.factory('customerFieldValue2Manager', ['CustomerFieldValue2', 'LocalStorageUtility', function (CustomerFieldValue2, LocalStorageUtility) {
    var customerFieldValue2ManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(customerFieldValue2Id, customerFieldValue2Data) {
            var instance = this._pool[customerFieldValue2Id];

            if (instance) {
                instance.setData(customerFieldValue2Data);
            } else {
                instance = new CustomerFieldValue2();
                instance.setData(customerFieldValue2Data);
                this._pool[customerFieldValue2Id] = instance;
            }

            return instance;
        },
        _search: function _search(customerFieldValue2Id) {
            return this._pool[customerFieldValue2Id];
        },
        _load: function _load(customerFieldValue2Id, customerFieldValue2Data) {
            return this._retrieveInstance(customerFieldValue2Id, customerFieldValue2Data);
        },
        loadCustomerFieldValue2: function loadCustomerFieldValue2(customerFieldValue2Id) {
            var customerFieldValue2 = LocalStorageUtility.getCustomerFieldValue2(customerFieldValue2Id);
            return this._load(customerFieldValue2Id, customerFieldValue2);
        },
        getCustomerFieldValue2: function getCustomerFieldValue2(customerFieldValue2Id) {
            var customerFieldValue2 = this._search(customerFieldValue2Id);

            if (!customerFieldValue2) {
                customerFieldValue2 = this.loadCustomerFieldValue2(customerFieldValue2Id);
            }

            return customerFieldValue2;
        },
        getAllCustomerFieldValue2: function getAllCustomerFieldValue2() {
            var customerFieldValue2s = LocalStorageUtility.getAllCustomerFieldValue2s();
            var entityCustomerFieldValue2s = [];

            for (var i = 0; i < customerFieldValue2s.length; i++) {
                var customerFieldValue2 = customerFieldValue2s[i];

                var entiyCustomerFieldValue2 = this._load(customerFieldValue2.Id, customerFieldValue2);

                entityCustomerFieldValue2s.push(entiyCustomerFieldValue2);
            }

            return entityCustomerFieldValue2s;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = customerFieldValue2ManagerScope;
    return customerFieldValue2ManagerScope;
}]); //CustomerFieldValue3-------------------------------------------

app.factory('customerFieldValue3Manager', ['CustomerFieldValue3', 'LocalStorageUtility', function (CustomerFieldValue3, LocalStorageUtility) {
    var customerFieldValue3ManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(customerFieldValue3Id, customerFieldValue3Data) {
            var instance = this._pool[customerFieldValue3Id];

            if (instance) {
                instance.setData(customerFieldValue3Data);
            } else {
                instance = new CustomerFieldValue3();
                instance.setData(customerFieldValue3Data);
                this._pool[customerFieldValue3Id] = instance;
            }

            return instance;
        },
        _search: function _search(customerFieldValue3Id) {
            return this._pool[customerFieldValue3Id];
        },
        _load: function _load(customerFieldValue3Id, customerFieldValue3Data) {
            return this._retrieveInstance(customerFieldValue3Id, customerFieldValue3Data);
        },
        loadCustomerFieldValue3: function loadCustomerFieldValue3(customerFieldValue3Id) {
            var customerFieldValue3 = LocalStorageUtility.getCustomerFieldValue3(customerFieldValue3Id);
            return this._load(customerFieldValue3Id, customerFieldValue3);
        },
        getCustomerFieldValue3: function getCustomerFieldValue3(customerFieldValue3Id) {
            var customerFieldValue3 = this._search(customerFieldValue3Id);

            if (!customerFieldValue3) {
                customerFieldValue3 = this.loadCustomerFieldValue3(customerFieldValue3Id);
            }

            return customerFieldValue3;
        },
        getAllCustomerFieldValue3: function getAllCustomerFieldValue3() {
            var customerFieldValue3s = LocalStorageUtility.getAllCustomerFieldValue3s();
            var entityCustomerFieldValue3s = [];

            for (var i = 0; i < customerFieldValue3s.length; i++) {
                var customerFieldValue3 = customerFieldValue3s[i];

                var entiyCustomerFieldValue3 = this._load(customerFieldValue3.Id, customerFieldValue3);

                entityCustomerFieldValue3s.push(entiyCustomerFieldValue3);
            }

            return entityCustomerFieldValue3s;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = customerFieldValue3ManagerScope;
    return customerFieldValue3ManagerScope;
}]); //customerListValue1-------------------------------------------

app.factory('customerListValue1Manager', ['CustomerListValue1', 'LocalStorageUtility', function (CustomerListValue1, LocalStorageUtility) {
    var customerListValue1ManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(customerListValue1Id, customerListValue1Data) {
            var instance = this._pool[customerListValue1Id];

            if (instance) {
                instance.setData(customerListValue1Data);
            } else {
                instance = new CustomerListValue1();
                instance.setData(customerListValue1Data);
                this._pool[customerListValue1Id] = instance;
            }

            return instance;
        },
        _search: function _search(customerListValue1Id) {
            return this._pool[customerListValue1Id];
        },
        _load: function _load(customerListValue1Id, customerListValue1Data) {
            return this._retrieveInstance(customerListValue1Id, customerListValue1Data);
        },
        loadCustomerListValue1: function loadCustomerListValue1(customerListValue1Id) {
            var customerListValue1 = LocalStorageUtility.getCustomerListValue1(customerListValue1Id);
            return this._load(customerListValue1Id, customerListValue1);
        },
        getCustomerListValue1: function getCustomerListValue1(customerListValue1Id) {
            var customerListValue1 = this._search(customerListValue1Id);

            if (!customerListValue1) {
                customerListValue1 = this.loadCustomerListValue1(customerListValue1Id);
            }

            return customerListValue1;
        },
        getAllCustomerListValue1: function getAllCustomerListValue1() {
            var customerListValue1s = LocalStorageUtility.getAllCustomerListValue1s();
            var entityCustomerListValue1s = [];

            for (var i = 0; i < customerListValue1s.length; i++) {
                var customerListValue1 = customerListValue1s[i];

                var entityCustomerListValue1 = this._load(customerListValue1.Id, customerListValue1);

                entityCustomerListValue1s.push(entityCustomerListValue1);
            }

            return entityCustomerListValue1s;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = customerListValue1ManagerScope;
    return customerListValue1ManagerScope;
}]); //CustomerListValue2-------------------------------------------

app.factory('customerListValue2Manager', ['CustomerListValue2', 'LocalStorageUtility', function (CustomerListValue2, LocalStorageUtility) {
    var customerListValue2ManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(customerListValue2Id, customerListValue2Data) {
            var instance = this._pool[customerListValue2Id];

            if (instance) {
                instance.setData(customerListValue2Data);
            } else {
                instance = new CustomerListValue2();
                instance.setData(customerListValue2Data);
                this._pool[customerListValue2Id] = instance;
            }

            return instance;
        },
        _search: function _search(customerListValue2Id) {
            return this._pool[customerListValue2Id];
        },
        _load: function _load(customerListValue2Id, customerListValue2Data) {
            return this._retrieveInstance(customerListValue2Id, customerListValue2Data);
        },
        loadCustomerListValue2: function loadCustomerListValue2(customerListValue2Id) {
            var customerListValue2 = LocalStorageUtility.getCustomerListValue2(customerListValue2Id);
            return this._load(customerListValue2Id, customerListValue2);
        },
        getCustomerListValue2: function getCustomerListValue2(customerListValue2Id) {
            var customerListValue2 = this._search(customerListValue2Id);

            if (!customerListValue2) {
                customerListValue2 = this.loadCustomerListValue2(customerListValue2Id);
            }

            return customerListValue2;
        },
        getAllCustomerListValue2: function getAllCustomerListValue2() {
            var customerListValue2s = LocalStorageUtility.getAllCustomerListValue2s();
            var entityCustomerListValue2s = [];

            for (var i = 0; i < customerListValue2s.length; i++) {
                var customerListValue2 = customerListValue2s[i];

                var entityCustomerListValue2 = this._load(customerListValue2.Id, customerListValue2);

                entityCustomerListValue2s.push(entityCustomerListValue2);
            }

            return entityCustomerListValue2s;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = customerListValue2ManagerScope;
    return customerListValue2ManagerScope;
}]); //CustomerListValue3-------------------------------------------

app.factory('customerListValue3Manager', ['CustomerListValue3', 'LocalStorageUtility', function (CustomerListValue3, LocalStorageUtility) {
    var customerListValue3ManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(customerListValue3Id, customerListValue3Data) {
            var instance = this._pool[customerListValue3Id];

            if (instance) {
                instance.setData(customerListValue3Data);
            } else {
                instance = new CustomerListValue3();
                instance.setData(customerListValue3Data);
                this._pool[customerListValue3Id] = instance;
            }

            return instance;
        },
        _search: function _search(customerListValue3Id) {
            return this._pool[customerListValue3Id];
        },
        _load: function _load(customerListValue3Id, customerListValue3Data) {
            return this._retrieveInstance(customerListValue3Id, customerListValue3Data);
        },
        loadCustomerListValue3: function loadCustomerListValue3(customerListValue3Id) {
            var customerListValue3 = LocalStorageUtility.getCustomerListValue3(customerListValue3Id);
            return this._load(customerListValue3Id, customerListValue3);
        },
        getCustomerListValue3: function getCustomerListValue3(customerListValue3Id) {
            var customerListValue3 = this._search(customerListValue3Id);

            if (!customerListValue3) {
                customerListValue3 = this.loadCustomerListValue3(customerListValue3Id);
            }

            return customerListValue3;
        },
        getAllCustomerListValue3: function getAllCustomerListValue3() {
            var customerListValue3s = LocalStorageUtility.getAllCustomerListValue3s();
            var entityCustomerListValue3s = [];

            for (var i = 0; i < customerListValue3s.length; i++) {
                var customerListValue3 = customerListValue3s[i];

                var entityCustomerListValue3 = this._load(customerListValue3.Id, customerListValue3);

                entityCustomerListValue3s.push(entityCustomerListValue3);
            }

            return entityCustomerListValue3s;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = customerListValue3ManagerScope;
    return customerListValue3ManagerScope;
}]);
app.factory('favoritesManager', ['LocalStorageUtility', 'documentLibraryManager', 'Favorite', 'askadeFileTypeWizardManager', 'actionPlanWizardManager', 'questionnaireManager', 'userApplicationsManager', 'userDetailsManager', function (LocalStorageUtility, documentLibraryManager, Favorite, askadeFileTypeWizardManager, actionPlanWizardManager, questionnaireManager, userApplicationsManager, userDetailsManager) {
    var favoriteScope = {
        _pool: {},
        _retrieveInstance: function _retrieveInstance(favItemId, favData) {
            var instance = this._pool[favItemId];

            if (instance) {
                instance.setData(favData);
            } else {
                instance = new Favorite();
                instance.setData(favData);
                this._pool[favItemId] = instance;
            }

            return instance;
        },
        _search: function _search(favItemId) {
            return this._pool[favItemId];
        },
        _load: function _load(favItemId, favData) {
            return this._retrieveInstance(favItemId, favData);
        },
        addToFavorites: function addToFavorites(itemData, moduleName) {
            var docFavList = {};

            switch (moduleName) {
                case 'Askade':
                case 'Claim':
                    docFavList = {
                        'ItemId': itemData.FileTypeId,
                        'ModuleName': moduleName,
                        'GroupName': null
                    };
                    break;

                case 'ActionPlan':
                    docFavList = {
                        'ItemId': itemData.Id,
                        'ModuleName': moduleName,
                        'GroupName': null
                    };
                    break;

                case 'Apv':
                case 'RiskProfile':
                case 'EmployeeSatisfaction':
                case 'ManagementEvaluation':
                case 'Insurance':
                case 'HumanResource':
                case 'FrontPlanner':
                    docFavList = {
                        'ItemId': itemData.Id,
                        'ModuleName': moduleName,
                        'GroupName': null
                    };
                    break;

                case 'DocumentLibrary':
                    var isRootData = itemData.IsRootData;

                    if (!isRootData) {
                        var groupName = itemData.GroupName;
                        var seperator = '|';
                        var docIdList = [];
                        var docList = documentLibraryManager.getAllDocumentByGroupType(groupName);

                        for (var i = 0; i < docList.length; i++) {
                            var doc = docList[i];
                            docIdList.push(doc.Id);
                        }

                        if (docIdList.length === 1) {
                            var idList = docIdList.join(seperator); // idList will not have '|', so adding manually when length is 1

                            idList += seperator;
                        } else {
                            var idList = docIdList.join(seperator);
                        }

                        docFavList = {
                            'ItemId': idList,
                            'ModuleName': moduleName,
                            'GroupName': groupName
                        };
                    } else {
                        docFavList = {
                            'ItemId': itemData.Id,
                            'ModuleName': moduleName,
                            'GroupName': null
                        };
                    }

                    break;

                default:
                    break;
            }

            if (docFavList.GroupName) {
                LocalStorageUtility.addToFavoritesByGroupName(docFavList);
            } else {
                LocalStorageUtility.addToFavorites(docFavList);
            }

            LocalStorageUtility.saveOfflineDb();
        },
        isFavEmpty: function isFavEmpty() {
            var favDataList = LocalStorageUtility.getAllFavoriteData();
            return favDataList.length === 0;
        },
        updateReOrderIndex: function updateReOrderIndex(favList) {
            LocalStorageUtility.updateReOrderIndex(favList);
        },
        getOnlyDataFromFavCollection: function getOnlyDataFromFavCollection() {
            var favDataList = LocalStorageUtility.getAllFavoriteData();
            var favData = [];

            for (var i = 0; i < favDataList.length; i++) {
                var itemId = favDataList[i].itemId;

                var data = this._load(itemId, favDataList[i]);

                favData.push(data);
            }

            return favData;
        },
        getAllFavData: function getAllFavData() {
            var favDataList = LocalStorageUtility.getAllFavoriteData();
            var userDetails = userDetailsManager.getUserLastLoggedTimeStamp();
            var selectedFavList = [];

            for (var i = 0; i < favDataList.length; i++) {
                var favData = favDataList[i];
                var itemID = favData.itemId;

                var favoritesList = this._load(itemID, favData);

                var moduleName = favoritesList.ModuleName;

                switch (moduleName) {
                    case 'Askade':
                    case 'Claim':
                        var caseWizard = askadeFileTypeWizardManager.getAskadeFileTypeWizardById(itemID);
                        favoritesList.UserApp = userApplicationsManager.getUserApplicationByText(userDetails.UserId, moduleName);
                        favoritesList.ItemData = caseWizard;
                        selectedFavList.push(favoritesList);
                        break;

                    case 'ActionPlan':
                        var actionPlanWizard = actionPlanWizardManager.getActionPlanWizard(itemID);
                        favoritesList.UserApp = userApplicationsManager.getUserApplicationByText(userDetails.UserId, moduleName);
                        favoritesList.ItemData = actionPlanWizard;
                        selectedFavList.push(favoritesList);
                        break;

                    case 'Apv':
                    case 'RiskProfile':
                    case 'EmployeeSatisfaction':
                    case 'ManagementEvaluation':
                    case 'Insurance':
                    case 'HumanResource':
                    case 'FrontPlanner':
                        var questionnaire = questionnaireManager.getQuestionnaire(itemID);
                        favoritesList.UserApp = userApplicationsManager.getUserApplicationByText(userDetails.UserId, moduleName);
                        favoritesList.ItemData = questionnaire;
                        selectedFavList.push(favoritesList);
                        break;

                    case 'DocumentLibrary':
                        favoritesList.UserApp = userApplicationsManager.getUserApplicationByText(userDetails.UserId, moduleName);
                        var groupname = favoritesList.GroupName;

                        if (groupname) {
                            favoritesList.ItemData = null;
                        } else {
                            var docData = documentLibraryManager.getDocumentById(itemID);
                            favoritesList.ItemData = docData;
                        }

                        selectedFavList.push(favoritesList);

                    default:
                }
            }

            return selectedFavList;
        },
        deleteFromFavorites: function deleteFromFavorites(favData) {
            var favDataList = LocalStorageUtility.deleteFavoriteData(favData);
            LocalStorageUtility.saveOfflineDb();
            this.removeInstance(favData);
        },
        deleteFavoritesById: function deleteFavoritesById(id) {
            var favDataFromDB = LocalStorageUtility.deleteFavoriteById(id);

            if (favDataFromDB) {
                var favData = this._search(id);

                LocalStorageUtility.saveOfflineDb();
                this.removeInstance(favData);
            }
        },
        deleteAllFavorites: function deleteAllFavorites() {
            LocalStorageUtility.deleteAllFavorite(id);
            LocalStorageUtility.saveOfflineDb();
            this.reset();
        },
        deleteFavForDocumentLibrary: function deleteFavForDocumentLibrary(docId) {
            var allFavData = this.getOnlyDataFromFavCollection();

            for (var i = 0; i < allFavData.length; i++) {
                var currentVal = allFavData[i].ItemId;
                var itemId = allFavData[i].ItemId;
                var tempIdVal = itemId;
                var seperatorLength = tempIdVal.replace(/[^|]/g, "").length;

                if (itemId.indexOf('|') > -1) {
                    if (itemId.substring(itemId.length - 1) !== "|") {
                        // Seperator is present in itemId
                        var idList = itemId.split('|');
                        var index = idList.indexOf(docId);

                        if (index > -1 && idList.length > 1) {
                            idList.splice(index, 1);

                            if (idList.length === 1) {
                                var joinIds = idList.join('|'); // joinIds will not have '|', so adding manually when length is 1

                                joinIds += '|';
                            } else {
                                var joinIds = idList.join('|');
                            }

                            allFavData[i].ItemId = joinIds;
                            LocalStorageUtility.updateFavorites(currentVal, allFavData[i]);
                        }
                    } else {
                        var removedDelimeterData = itemId.replace('|', '');

                        if (removedDelimeterData === docId) {
                            this.deleteFavoritesById(itemId);
                            this.removeInstance(allFavData[i]);
                        }
                    }
                } else {
                    if (itemId === docId) {
                        this.deleteFavoritesById(itemId);
                        this.removeInstance(allFavData[i]);
                    }
                }
            }

            LocalStorageUtility.saveOfflineDb();
        },
        removeInstance: function removeInstance(favData) {
            var favItemId = favData.ItemId;
            var pool = this._pool;
            delete pool[favItemId];
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    return favoriteScope;
}]); //customersManager ---------------

app.factory('customersManager', ['Customers', 'LocalStorageUtility', function (Customers, LocalStorageUtility) {
    var customersScope = {
        _pool: {},
        _retrieveInstance: function _retrieveInstance(custId, customersData) {
            var instance = this._pool[custId];

            if (instance) {
                instance.setData(customersData);
            } else {
                instance = new Customers();
                instance.setData(customersData);
                this._pool[custId] = instance;
            }

            return instance;
        },
        _search: function _search(custId) {
            return this._pool[custId];
        },
        _loadCustomer: function _loadCustomer() {
            var customer = LocalStorageUtility.getCustomer();

            if (customer != null) {
                var instance = new Customers();
                instance.setData(customer);
                return instance;
            }

            return null;
        },
        getCustomers: function getCustomers() {
            return this._loadCustomer();
        },
        saveCustomer: function saveCustomer(customer) {
            LocalStorageUtility.saveCustomer(customer);
        },
        saveCameraImageQuality: function saveCameraImageQuality(customer) {
            LocalStorageUtility.saveImageQualityToCustomer(customer);
        },
        saveImageToGallerySetting: function saveImageToGallerySetting(customer) {
            LocalStorageUtility.saveImageToGallerySettingInCustomer(customer);
        },
        saveReadAloudSpeed: function saveReadAloudSpeed(customer) {
            LocalStorageUtility.saveReadAloudSpeed(customer);
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    return customersScope;
}]); // resource label manager

app.factory('resourceLanguageManager', ['LocalStorageUtility', 'LanguageResourceLabel', function (LocalStorageUtility, LanguageResourceLabel) {
    var languageManagerScope = {
        _pool: {},
        _retrieveInstance: function _retrieveInstance(id, resourceData) {
            var instance = this._pool[id];

            if (instance) {
                instance.setData(id, resourceData);
            } else {
                instance = new LanguageResourceLabel();
                instance.setData(id, resourceData);
                this._pool[id] = instance;
            }

            return instance;
        },
        _search: function _search(id) {
            return this._pool[id];
        },
        _load: function _load(id, resourceData) {
            return this._retrieveInstance(id, resourceData);
        },
        getResourceById: function getResourceById(id) {
            return this.loadResourceLabel(id);
        },
        loadResourceLabel: function loadResourceLabel(id) {
            var resourceData = LocalStorageUtility.getResourceLabelById(id);
            return this._load(id, resourceData);
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    return languageManagerScope;
}]); // preferred manager

app.factory('preferredLanguageManager', ['LocalStorageUtility', 'PreferredLanguage', function (LocalStorageUtility, PreferredLanguage) {
    var preferredLanguageManagerScope = {
        _pool: {},
        _retrieveInstance: function _retrieveInstance(langCode, preferredLang) {
            var instance = this._pool[langCode];

            if (instance) {
                instance.setData(preferredLang);
            } else {
                instance = new PreferredLanguage();
                instance.setData(preferredLang);
                this._pool[langCode] = instance;
            }

            return instance;
        },
        _load: function _load(langCode, preferredLang) {
            return this._retrieveInstance(langCode, preferredLang);
        },
        getDefaultLanguage: function getDefaultLanguage() {
            return this.loadDefaultLanguage();
        },
        loadDefaultLanguage: function loadDefaultLanguage() {
            var langData = LocalStorageUtility.getPreferredLanguage();
            return this._load(langData.langCode, langData.language);
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    return preferredLanguageManagerScope;
}]); // icons manager

app.factory('iconsManager', ['LocalStorageUtility', 'Icons', function (LocalStorageUtility, Icons) {
    var iconManagerScope = _defineProperty({
        _pool: {},
        _retrieveInstance: function _retrieveInstance(id, iconData) {
            var instance = this._pool[id];

            if (instance) {
                instance.setData(id, iconData);
            } else {
                instance = new Icons();
                instance.setData(id, iconData);
                this._pool[id] = instance;
            }

            return instance;
        },
        _search: function _search(id) {
            return this._pool[id];
        },
        _load: function _load(id, iconData) {
            return this._retrieveInstance(id, iconData);
        },
        getIcon: function getIcon(id) {
            var icon = this._getIconVal(id);

            if (icon.IconText === null || angular.isUndefined(icon.IconText)) {
                var defaultIcon = icon.DefaultIcon;

                if (defaultIcon === null || angular.isUndefined(defaultIcon)) {
                    return icon.IconId;
                } else {
                    return defaultIcon;
                }
            } else {
                return icon.IconText;
            }
        },
        _getIconVal: function _getIconVal(id) {
            var iconVal = this._search(id);

            if (!iconVal) {
                return this.loadIcon(id);
            }

            return iconVal;
        },
        loadIcon: function loadIcon(id) {
            var resourceData = LocalStorageUtility.getIconById(id);
            return this._load(id, resourceData);
        },
        reset: function reset() {
            this._pool = {};
        }
    }, "reset", function reset() {
        this._pool = {};
    });

    return iconManagerScope;
}]); //Manager2QuestionnaireEvaluatingFor-------------------------------------------

app.factory('manager2QuestionnaireManager', ['Manager', 'LocalStorageUtility', function (Manager, LocalStorageUtility) {
    var manager2QuestionnaireManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(managerId, managerData) {
            var instance = this._pool[managerId];

            if (instance) {
                instance.setData(managerData);
            } else {
                instance = new Manager();
                instance.setData(managerData);
                this._pool[managerId] = instance;
            }

            return instance;
        },
        _search: function _search(poolId) {
            return this._pool[poolId];
        },
        _load: function _load(managerId, managerData) {
            return this._retrieveInstance(managerId, managerData);
        },
        isManagerQuestionnaireBeingAnsweredForUser: function isManagerQuestionnaireBeingAnsweredForUser(managerId, questionnaireId) {
            var loggedInUser = LocalStorageUtility.getUserNameByLoggedInTimeStamp();
            var personId = loggedInUser[0].personId;
            var answeredPq = LocalStorageUtility.getPersonQuestionnaire(personId, managerId, questionnaireId);
            return answeredPq != null;
        },
        getUserManager: function getUserManager(managerId) {
            var managerEnt = this._search(managerId);

            if (!managerEnt) {
                var managerSource = LocalStorageUtility.getManager(managerId);
                managerEnt = this._load(managerId, managerSource);
            }

            return managerEnt;
        },
        getAllUserManagersForQuestionnaire: function getAllUserManagersForQuestionnaire(userId, questionnaireId) {
            var managersForQue = LocalStorageUtility.getAllManager2Questionnaire(userId, questionnaireId);
            var managerIds = managersForQue.evaluatingForIds.split('|').filter(Boolean);
            var entityManagerColl = [];

            for (var i = 0; i < managerIds.length; i++) {
                var managerId = managerIds[i];

                if (this.isManagerQuestionnaireBeingAnsweredForUser(managerId, questionnaireId) === false) {
                    var managerEnt = this.getUserManager(managerId);
                    entityManagerColl.push(managerEnt);
                }
            }

            return entityManagerColl;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = manager2QuestionnaireManagerScope;
    return manager2QuestionnaireManagerScope;
}]); // Easy Classification Manager

app.factory('easyClassificationManager', ['EasyClassification', 'LocalStorageUtility', function (EasyClassification, LocalStorageUtility) {
    var easyClassificationManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(ecId, ecData) {
            var instance = this._pool[ecId];

            if (instance) {
                instance.setData(ecData);
            } else {
                instance = new EasyClassification();
                instance.setData(ecData);
                this._pool[ecId] = instance;
            }

            return instance;
        },
        _search: function _search(ecId) {
            return this._pool[ecId];
        },
        _load: function _load(ecId, ecData) {
            return this._retrieveInstance(ecId, ecData);
        },
        loadEasyClassification: function loadEasyClassification(ecId) {
            var ec = LocalStorageUtility.getEasyClassification(ecId);
            return this._load(ecId, ec);
        },
        getEasyClassification: function getEasyClassification(ecId) {
            var ec = this._search(ecId);

            if (!ec) {
                ec = this.loadEasyClassification(ecId);
            }

            return ec;
        },
        getAllEasyClassificationByDataTypeId: function getAllEasyClassificationByDataTypeId(dataTypeId) {
            var ecList = LocalStorageUtility.getAllEasyClassificationByDataTypeId(dataTypeId);
            var entityECList = [];

            for (var i = 0; i < ecList.length; i++) {
                var ec = ecList[i];

                var entiyEC = this._load(ec.Id, ec);

                entityECList.push(entiyEC);
            }

            return entityECList;
        },
        getAllEasyClassification: function getAllEasyClassification() {
            var ecList = LocalStorageUtility.getAllEasyClassifications();
            var entityECList = [];

            for (var i = 0; i < ecList.length; i++) {
                var ec = ecList[i];

                var entiyEC = this._load(ec.Id, ec);

                entityECList.push(entiyEC);
            }

            return entityECList;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = easyClassificationManagerScope;
    return easyClassificationManagerScope;
}]); //VehiclePart Manager

app.factory('VehiclePartManager', ['VehicleDamage', 'LocalStorageUtility', function (VehicleDamage, LocalStorageUtility) {
    var VehiclePartManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(ecId, ecData) {
            var instance = this._pool[ecId];

            if (instance) {
                instance.setData(ecData);
            } else {
                instance = new VehicleDamage();
                instance.setData(ecData);
                this._pool[ecId] = instance;
            }

            return instance;
        },
        _search: function _search(ecId) {
            return this._pool[ecId];
        },
        _load: function _load(ecId, ecData) {
            return this._retrieveInstance(ecId, ecData);
        },
        loadVehicleDamageData: function loadVehicleDamageData(ecId) {
            var ec = LocalStorageUtility.getVehicleDamageData(ecId);
            return this._load(ecId, ec);
        },
        getVehicleDamageData: function getVehicleDamageData(ecId) {
            var ec = this._search(ecId);

            if (!ec) {
                ec = this.loadVehicleDamageData(ecId);
            }

            return ec;
        },
        getAllVehiclePartByDataTypeId: function getAllVehiclePartByDataTypeId(dataTypeId) {
            var ecList = LocalStorageUtility.getAllVehiclePartByDataTypeId(dataTypeId);
            var entityECList = [];

            for (var i = 0; i < ecList.length; i++) {
                var ec = ecList[i];

                var entiyEC = this._load(ec.Id, ec);

                entityECList.push(entiyEC);
            }

            return entityECList;
        },
        VehicleDamageData: function VehicleDamageData() {
            var ecList = LocalStorageUtility.getAllVehicleDamageData();
            var entityECList = [];

            for (var i = 0; i < ecList.length; i++) {
                var ec = ecList[i];

                var entiyEC = this._load(ec.Id, ec);

                entityECList.push(entiyEC);
            }

            return entityECList;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = VehiclePartManagerScope;
    return VehiclePartManagerScope;
}]);// List Value Manager

app.factory('listValueManager', ['ListValue', 'LocalStorageUtility', function (ListValue, LocalStorageUtility) {
    var listValueManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(lvId, lvData) {
            var instance = this._pool[lvId];

            if (instance) {
                instance.setData(lvData);
            } else {
                instance = new ListValue();
                instance.setData(lvData);
                this._pool[lvId] = instance;
            }

            return instance;
        },
        _search: function _search(lvId) {
            return this._pool[lvId];
        },
        _load: function _load(lvId, lvData) {
            return this._retrieveInstance(lvId, lvData);
        },
        loadListValue: function loadListValue(lvId) {
            var lv = LocalStorageUtility.getListValue(lvId);
            return this._load(lvId, lv);
        },
        getListValue: function getListValue(lvId) {
            var lv = this._search(lvId);

            if (!lv) {
                lv = this.loadListValue(lvId);
            }

            return lv;
        },
        getAllListValueByDataTypeId: function getAllListValueByDataTypeId(dataTypeId) {
            var lvList = LocalStorageUtility.getAllListValueByDataTypeId(dataTypeId);
            var entityLVList = [];

            for (var i = 0; i < lvList.length; i++) {
                var lv = lvList[i];

                var entiyLV = this._load(lv.Id, lv);

                entityLVList.push(entiyLV);
            }

            return entityLVList;
        },
        getAllListValue: function getAllListValue() {
            var lvList = LocalStorageUtility.getAllListValues();
            var entityLVList = [];

            for (var i = 0; i < lvList.length; i++) {
                var lv = lvList[i];

                var entiyLV = this._load(lv.Id, lv);

                entityLVList.push(entiyLV);
            }

            return entityLVList;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = listValueManagerScope;
    return listValueManagerScope;
}]); // City Manager

app.factory('cityManager', ['City', 'LocalStorageUtility', function (City, LocalStorageUtility) {
    var cityManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(cityId, cityData) {
            var instance = this._pool[cityId];

            if (instance) {
                instance.setData(cityData);
            } else {
                instance = new City();
                instance.setData(cityData);
                this._pool[cityId] = instance;
            }

            return instance;
        },
        _search: function _search(cityId) {
            return this._pool[cityId];
        },
        _load: function _load(cityId, cityData) {
            return this._retrieveInstance(cityId, cityData);
        },
        loadCity: function loadCity(cityId) {
            var city = LocalStorageUtility.getCity(cityId);
            return this._load(cityId, city);
        },
        getCity: function getCity(cityId) {
            var city = this._search(cityId);

            if (!city) {
                city = this.loadCity(cityId);
            }

            return city;
        },
        getAllCity: function getAllCity() {
            var cityList = LocalStorageUtility.getAllCities();
            var entityCityList = [];

            for (var i = 0; i < cityList.length; i++) {
                var city = cityList[i];

                var entiyCity = this._load(city.Id, city);

                entityCityList.push(entiyCity);
            }

            return entityCityList;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = cityManagerScope;
    return cityManagerScope;
}]); // Country Manager

app.factory('countryManager', ['Country', 'LocalStorageUtility', function (Country, LocalStorageUtility) {
    var countryManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(countryId, countryData) {
            var instance = this._pool[countryId];

            if (instance) {
                instance.setData(countryData);
            } else {
                instance = new Country();
                instance.setData(countryData);
                this._pool[countryId] = instance;
            }

            return instance;
        },
        _search: function _search(countryId) {
            return this._pool[countryId];
        },
        _load: function _load(countryId, countryData) {
            return this._retrieveInstance(countryId, countryData);
        },
        loadCountry: function loadCountry(countryId) {
            var country = LocalStorageUtility.getCountry(countryId);
            return this._load(countryId, country);
        },
        getCountry: function getCountry(countryId) {
            var country = this._search(countryId);

            if (!country) {
                country = this.loadCountry(countryId);
            }

            return country;
        },
        getAllCountry: function getAllCountry() {
            var countryList = LocalStorageUtility.getAllCountries();
            var entityCountryList = [];

            for (var i = 0; i < countryList.length; i++) {
                var country = countryList[i];

                var entiyCountry = this._load(country.Id, country);

                entityCountryList.push(entiyCountry);
            }

            return entityCountryList;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = countryManagerScope;
    return countryManagerScope;
}]); //Askade Entity helper methods..
//Activity-------------------------------------------

app.factory('activityManager', ['Activity', 'LocalStorageUtility', function (Activity, LocalStorageUtility) {
    var activityManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(activityId, activityData) {
            var instance = this._pool[activityId];

            if (instance) {
                instance.setData(activityData);
            } else {
                instance = new Activity();
                instance.setData(activityData);
                this._pool[activityId] = instance;
            }

            return instance;
        },
        _search: function _search(activityId) {
            return this._pool[activityId];
        },
        _load: function _load(activityId, activityData) {
            return this._retrieveInstance(activityId, activityData);
        },
        loadActivity: function loadActivity(activityId) {
            var activity = LocalStorageUtility.getActivity(activityId);
            return this._load(activityId, activity);
        },
        getActivity: function getActivity(activityId) {
            var activity = this._search(activityId);

            if (!activity) {
                activity = this.loadActivity(activityId);
            }

            return activity;
        },
        getAllActivity: function getAllActivity() {
            var acts = LocalStorageUtility.getAllActivities();
            var entityActs = [];

            for (var i = 0; i < acts.length; i++) {
                var act = acts[i];

                var entiyAct = this._load(act.Id, act);

                entityActs.push(entiyAct);
            }

            return entityActs;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = activityManagerScope;
    return activityManagerScope;
}]); //ActivityModule-------------------------------------------

app.factory('activityModuleManager', ['ActivityModule', 'LocalStorageUtility', function (ActivityModule, LocalStorageUtility) {
    var activityModuleManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(activityModuleId, activityModuleData) {
            var instance = this._pool[activityModuleId];

            if (instance) {
                instance.setData(activityModuleData);
            } else {
                instance = new ActivityModule();
                instance.setData(activityModuleData);
                this._pool[activityModuleId] = instance;
            }

            return instance;
        },
        _search: function _search(activityModuleId) {
            return this._pool[activityModuleId];
        },
        _load: function _load(activityModuleId, activityModuleData) {
            return this._retrieveInstance(activityModuleId, activityModuleData);
        },
        loadActivityModule: function loadActivityModule(activityModuleId) {
            var activityModule = LocalStorageUtility.getActivityModule(activityModuleId);
            return this._load(activityModuleId, activityModule);
        },
        getActivityModule: function getActivityModule(activityModuleId) {
            var activityModule = this._search(activityModuleId);

            if (!activityModule) {
                activityModule = this.loadActivityModule(activityModuleId);
            }

            return activityModule;
        },
        getAllActivityModule: function getAllActivityModule() {
            var actMods = LocalStorageUtility.getAllActivityModules();
            var entityActMods = [];

            for (var i = 0; i < actMods.length; i++) {
                var actMod = actMods[i];

                var entiyActMod = this._load(actMod.Id, actMod);

                entityActMods.push(entiyActMod);
            }

            return entityActMods;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = activityModuleManagerScope;
    return activityModuleManagerScope;
}]); //AskadeFileTypeWizard-------------------------------------------

app.factory('askadeFileTypeWizardManager', ['AskadeFileTypeWizard', 'LocalStorageUtility', 'askadeFileTypeWizardStepManager', 'userDetailsManager', '$injector', '$q', 'askadeFileTypeWizardStepColumnManager', 'askadeFileTypeWizardStepColumnGuideManager', function (AskadeFileTypeWizard, LocalStorageUtility, askadeFileTypeWizardStepManager, userDetailsManager, $injector, $q, askadeFileTypeWizardStepColumnManager, askadeFileTypeWizardStepColumnGuideManager) {
    var askadeFileTypeWizardManagerScope = {
        _prefixConstant: '_',
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(askadeFileTypeWizardId, askadeFileTypeWizardData) {
            var instance = this._pool[this._prefixConstant + askadeFileTypeWizardId];

            if (instance) {
                instance.setData(askadeFileTypeWizardData);
            } else {
                instance = new AskadeFileTypeWizard();
                instance.setData(askadeFileTypeWizardData);
                this._pool[this._prefixConstant + askadeFileTypeWizardId] = instance;
            }

            return instance;
        },
        _search: function _search(askadeFileTypeWizardId) {
            return this._pool[this._prefixConstant + askadeFileTypeWizardId];
        },
        _load: function _load(askadeFileTypeWizardId, askadeFileTypeWizardData) {
            return this._retrieveInstance(askadeFileTypeWizardId, askadeFileTypeWizardData);
        },
        loadAskadeFileTypeWizard: function loadAskadeFileTypeWizard(askadeFileTypeWizardId) {
            var askadeFileTypeWizard = LocalStorageUtility.getAskadeFileTypeWizard(askadeFileTypeWizardId);
            return this._load(askadeFileTypeWizardId, askadeFileTypeWizard);
        },
        getAskadeFileTypeWizard: function getAskadeFileTypeWizard(askadeFileTypeWizard) {
            var askadeFileTypeWizardSearchInstance = this._search(askadeFileTypeWizard.FileTypeId);

            if (!askadeFileTypeWizardSearchInstance) {
                askadeFileTypeWizardSearchInstance = this.loadAskadeFileTypeWizard(askadeFileTypeWizard.FileTypeId);
            }

            askadeFileTypeWizardSearchInstance.Steps = askadeFileTypeWizardStepManager.getAllAskadeFileTypeWizardStep(askadeFileTypeWizard);
            return askadeFileTypeWizardSearchInstance;
        },
        getAskadeFileTypeWizardById: function getAskadeFileTypeWizardById(askadeFileTypeWizardId) {
            var askadeFileTypeWizardSearchInstance = this._search(askadeFileTypeWizardId);

            if (!askadeFileTypeWizardSearchInstance) {
                askadeFileTypeWizardSearchInstance = this.loadAskadeFileTypeWizard(askadeFileTypeWizardId);
            }

            askadeFileTypeWizardSearchInstance.Steps = askadeFileTypeWizardStepManager.getAllAskadeFileTypeWizardStep(askadeFileTypeWizardSearchInstance);
            return askadeFileTypeWizardSearchInstance;
        },
        getAllCaseFileTypeWizard: function getAllCaseFileTypeWizard(moduleName) {
            var loggedInUser = userDetailsManager.getUserLastLoggedTimeStamp();
            var personId = loggedInUser.PersonId;
            var askadeFileTypeWizards = LocalStorageUtility.getAllAskadeFileTypeWizardsForPerson(personId, moduleName);
            var entityAskadeFileTypeWizards = [];

            for (var i = 0; i < askadeFileTypeWizards.length; i++) {
                var askadeFileTypeWizard = askadeFileTypeWizards[i];

                var entiyAskadeFileTypeWizard = this._search(askadeFileTypeWizard.Id);

                if (!entiyAskadeFileTypeWizard) {
                    entiyAskadeFileTypeWizard = this._load(askadeFileTypeWizard.Id, askadeFileTypeWizard);
                }

                entityAskadeFileTypeWizards.push(entiyAskadeFileTypeWizard);
            }

            return entityAskadeFileTypeWizards;
        },
        deleteAskadeWizard: function deleteAskadeWizard(akWizard) {
            var deletePromise = $q.defer();
            var fileTypeId = akWizard.FileTypeId; // Get person Askade instance, if true, Askade is being used

            var pAkw = LocalStorageUtility.getPersonAskadeFileTypeWizardByFileTypeId(fileTypeId);

            if (pAkw.length === 0) {
                var personAskadeColumnAnswerTemplateManager = $injector.get('personAskadeColumnAnswerTemplateManager');
                var personAskadeFileTypeWizardAttachmentTemplateManager = $injector.get('personAskadeFileTypeWizardAttachmentTemplateManager');
                var personAskadeFileTypeWizardTemplateManager = $injector.get('personAskadeFileTypeWizardTemplateManager');
                var pAkTemplate = LocalStorageUtility.getPersonAskadeFileTypeWizardTemplate(fileTypeId);
                var akwSteps = akWizard.Steps;

                for (var i = 0; i < akwSteps.length; i++) {
                    var akwStep = akwSteps[i];
                    var akwStepColumn = akwStep.Columns;
                    var stepId = akwStep.Id;

                    for (var j = 0; j < akwStepColumn.length; j++) {
                        var col = akwStepColumn[j];
                        var colGuide = col.ColumnGuides;
                        var columnId = col.FileColumnId;

                        for (var k = 0; k < colGuide.length; k++) {
                            var guide = colGuide[k];
                            var guideId = guide.Id;
                            LocalStorageUtility.deleteAkWizardStepColumnGuide(guideId, columnId);
                            askadeFileTypeWizardStepColumnGuideManager.removeInstance(guide);
                        }

                        var personACAnswerEntity = personAskadeColumnAnswerTemplateManager.getPersonAskadeColumnAnswerTemplate(pAkTemplate.Id, columnId);
                        personAskadeColumnAnswerTemplateManager.removeInstance(personACAnswerEntity);
                        LocalStorageUtility.deleteAkWizardStepColumn(columnId, stepId);
                        LocalStorageUtility.deletePersonAskadeColumnAnswerTemplate(columnId, fileTypeId);
                        askadeFileTypeWizardStepColumnManager.removeInstance(col);
                    }

                    LocalStorageUtility.deleteAskadeWizardStep(stepId);
                    askadeFileTypeWizardStepManager.removeInstance(akwStep);
                }

                var allAttachTemplate = personAskadeFileTypeWizardAttachmentTemplateManager.getAllPersonAskadeFileTypeWizardAttachmentTemplate(pAkTemplate.Id);

                for (var l = 0; l < allAttachTemplate.length; l++) {
                    var attachTemp = allAttachTemplate[l];
                    personAskadeFileTypeWizardAttachmentTemplateManager.removeInstance(attachTemp);
                }

                var personAkTemplateEntity = personAskadeFileTypeWizardTemplateManager.getPersonAskadeFileTypeWizardTemplate(fileTypeId);
                personAskadeFileTypeWizardTemplateManager.removeInstance(personAkTemplateEntity);
                LocalStorageUtility.deleteAskadeWizard(fileTypeId);
                LocalStorageUtility.deletePersonAskadeAttachmentTemplate(fileTypeId);
                LocalStorageUtility.deletePersonAskadeTemplate(fileTypeId);
                this.removeInstance(akWizard);
            } else {
                // If askade is present in in-progress/completed section
                // do not delete the askade.
                deletePromise.reject(false);
            } // Save to database


            var savePromise = LocalStorageUtility.saveOfflineDb();
            savePromise.promise.then(function (success) {
                deletePromise.resolve(true);
            });
            return deletePromise.promise;
        },
        removeInstance: function removeInstance(wizard) {
            var wizardId = wizard.FileTypeId;
            var pool = this._pool;
            delete pool[this._prefixConstant + wizardId];
        },
        resetPoolAskade: function resetPoolAskade() {
            var askadeFactiories = ['askadeFileTypeWizardManager', 'askadeFileTypeWizardStepManager', 'askadeFileTypeWizardStepColumnManager', 'askadeFileTypeWizardStepColumnGuideManager', 'personAskadeFileTypeWizardAttachmentManager', 'personAskadeFileTypeWizardAttachmentTemplateManager', 'personAskadeFileTypeWizardTemplateManager', 'personAskadeColumnAnswerTemplateManager', 'personAskadeColumnAnswerManager', 'personAskadeFileTypeWizardManager', 'personAskadeColumnGuideAnswerManager'];

            for (var i = 0; i < askadeFactiories.length; i++) {
                var factoryToReset = askadeFactiories[i];
                var factoryManager = $injector.get(factoryToReset);
                factoryManager.reset();
            }
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = askadeFileTypeWizardManagerScope;
    return askadeFileTypeWizardManagerScope;
}]); //AskadeFileTypeWizardStep-------------------------------------------

app.factory('askadeFileTypeWizardStepManager', ['AskadeFileTypeWizardStep', 'LocalStorageUtility', 'askadeFileTypeWizardStepColumnManager', function (AskadeFileTypeWizardStep, LocalStorageUtility, askadeFileTypeWizardStepColumnManager) {
    var askadeFileTypeWizardStepManagerScope = {
        _prefixConstant: '_',
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(askadeFileTypeWizardStepId, askadeFileTypeWizardStepData) {
            var instance = this._pool[this._prefixConstant + askadeFileTypeWizardStepId];

            if (instance) {
                instance.setData(askadeFileTypeWizardStepData);
            } else {
                instance = new AskadeFileTypeWizardStep();
                instance.setData(askadeFileTypeWizardStepData);
                this._pool[this._prefixConstant + askadeFileTypeWizardStepId] = instance;
            }

            return instance;
        },
        _search: function _search(askadeFileTypeWizardStepId) {
            return this._pool[this._prefixConstant + askadeFileTypeWizardStepId];
        },
        _load: function _load(askadeFileTypeWizardStepId, askadeFileTypeWizardStepData) {
            return this._retrieveInstance(askadeFileTypeWizardStepId, askadeFileTypeWizardStepData);
        },
        loadAskadeFileTypeWizardStep: function loadAskadeFileTypeWizardStep(askadeFileTypeWizardStepId) {
            var askadeFileTypeWizardStep = LocalStorageUtility.getAskadeFileTypeWizardStep(askadeFileTypeWizardStepId);
            return this._load(askadeFileTypeWizardStepId, askadeFileTypeWizardStep);
        },
        getAskadeFileTypeWizardStep: function getAskadeFileTypeWizardStep(askadeFileTypeWizardStepId) {
            var askadeFileTypeWizardStep = this._search(askadeFileTypeWizardStepId);

            if (!askadeFileTypeWizardStep) {
                askadeFileTypeWizardStep = this.loadAskadeFileTypeWizardStep(askadeFileTypeWizardStepId);
            }

            return askadeFileTypeWizardStep;
        },
        getAllAskadeFileTypeWizardStep: function getAllAskadeFileTypeWizardStep(askFileTypeWiz) {
            var fileTypeId = askFileTypeWiz.FileTypeId;
            var askadeFileTypeWizardSteps = LocalStorageUtility.getAllAskadeFileTypeWizardSteps(fileTypeId);
            var entityAskadeFileTypeWizardSteps = [];

            for (var i = 0; i < askadeFileTypeWizardSteps.length; i++) {
                var askadeFileTypeWizardStep = askadeFileTypeWizardSteps[i];

                var entiyAskadeFileTypeWizardStep = this._load(askadeFileTypeWizardStep.Id, askadeFileTypeWizardStep);

                entiyAskadeFileTypeWizardStep.Columns = askadeFileTypeWizardStepColumnManager.getAllAskadeFileTypeWizardStepColumn(entiyAskadeFileTypeWizardStep.Id, askFileTypeWiz);
                entityAskadeFileTypeWizardSteps.push(entiyAskadeFileTypeWizardStep);
            }

            return entityAskadeFileTypeWizardSteps;
        },
        removeInstance: function removeInstance(step) {
            var stepId = step.Id;
            var pool = this._pool;
            delete pool[this._prefixConstant + stepId];
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = askadeFileTypeWizardStepManagerScope;
    return askadeFileTypeWizardStepManagerScope;
}]); //AskadeFileTypeWizardStepColumn-------------------------------------------

app.factory('askadeFileTypeWizardStepColumnManager', ['AskadeFileTypeWizardStepColumn', 'LocalStorageUtility', 'askadeFileTypeWizardStepColumnGuideManager', function (AskadeFileTypeWizardStepColumn, LocalStorageUtility, askadeFileTypeWizardStepColumnGuideManager) {
    var askadeFileTypeWizardStepColumnManagerScope = {
        _prefixConstant: '_',
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(askadeFileTypeWizardStepColumnId, askadeFileTypeWizardStepColumnData) {
            var instance = this._pool[this._prefixConstant + askadeFileTypeWizardStepColumnId];

            if (instance) {
                instance.setData(askadeFileTypeWizardStepColumnData);
            } else {
                instance = new AskadeFileTypeWizardStepColumn();
                instance.setData(askadeFileTypeWizardStepColumnData);
                this._pool[this._prefixConstant + askadeFileTypeWizardStepColumnId] = instance;
            }

            return instance;
        },
        _search: function _search(askadeFileTypeWizardStepColumnId) {
            return this._pool[this._prefixConstant + askadeFileTypeWizardStepColumnId];
        },
        _load: function _load(askadeFileTypeWizardStepColumnId, askadeFileTypeWizardStepColumnData) {
            return this._retrieveInstance(askadeFileTypeWizardStepColumnId, askadeFileTypeWizardStepColumnData);
        },
        loadAskadeFileTypeWizardStepColumn: function loadAskadeFileTypeWizardStepColumn(fileStepId, askadeFileTypeWizardStepColumnId) {
            var askadeFileTypeWizardStepColumn = LocalStorageUtility.getAskadeFileTypeWizardStepColumn(fileStepId, askadeFileTypeWizardStepColumnId);
            return this._load(askadeFileTypeWizardStepColumnId, askadeFileTypeWizardStepColumn);
        },
        getAskadeFileTypeWizardStepColumn: function getAskadeFileTypeWizardStepColumn(fileStepId, askadeFileTypeWizardStepColumnId) {
            var askadeFileTypeWizardStepColumn = this._search(askadeFileTypeWizardStepColumnId);

            if (!askadeFileTypeWizardStepColumn) {
                askadeFileTypeWizardStepColumn = this.loadAskadeFileTypeWizardStepColumn(fileStepId, askadeFileTypeWizardStepColumnId);
            }

            return askadeFileTypeWizardStepColumn;
        },
        getAllAskadeFileTypeWizardStepColumn: function getAllAskadeFileTypeWizardStepColumn(fileTypeWizardStepId, askFileTypeWiz) {
            var fileTypeId = askFileTypeWiz.FileTypeId;
            var columnGuideFileTypeId = askFileTypeWiz.ColumnGuideFileTypeId;
            var askadeFileTypeWizardStepColumns = LocalStorageUtility.getAllAskadeFileTypeWizardStepColumns(fileTypeWizardStepId, fileTypeId);
            var entityAskadeFileTypeWizardStepColumns = [];

            for (var i = 0; i < askadeFileTypeWizardStepColumns.length; i++) {
                var askadeFileTypeWizardStepColumn = askadeFileTypeWizardStepColumns[i];

                var entiyAskadeFileTypeWizardStepColumn = this._load(askadeFileTypeWizardStepColumn.Id, askadeFileTypeWizardStepColumn);

                var columnGuideFileTypeList = entiyAskadeFileTypeWizardStepColumn.ColumnGuides2FileTypes; // Below check is added to handle if latest app is run on Web API <548

                if (columnGuideFileTypeList) {
                    if (columnGuideFileTypeList.length !== 0) {
                        if (columnGuideFileTypeList.indexOf(columnGuideFileTypeId) > -1) {
                            entiyAskadeFileTypeWizardStepColumn.ColumnGuides = askadeFileTypeWizardStepColumnGuideManager.getAllAskadeFileTypeWizardStepColumnsGuide(entiyAskadeFileTypeWizardStepColumn.FileColumnId, fileTypeId);
                        }
                    } else {
                        entiyAskadeFileTypeWizardStepColumn.ColumnGuides = askadeFileTypeWizardStepColumnGuideManager.getAllAskadeFileTypeWizardStepColumnsGuide(entiyAskadeFileTypeWizardStepColumn.FileColumnId, fileTypeId);
                    }
                } else {
                    entiyAskadeFileTypeWizardStepColumn.ColumnGuides = askadeFileTypeWizardStepColumnGuideManager.getAllAskadeFileTypeWizardStepColumnsGuide(entiyAskadeFileTypeWizardStepColumn.FileColumnId, fileTypeId);
                }

                entityAskadeFileTypeWizardStepColumns.push(entiyAskadeFileTypeWizardStepColumn);
            }

            return entityAskadeFileTypeWizardStepColumns;
        },
        getFileTypeWizardStepColumnByColumnId: function getFileTypeWizardStepColumnByColumnId(fileColumnId) {
            var akStepColumn = LocalStorageUtility.getAskadeFileTypeWizardStepColumnByColumnId(fileColumnId);
            if (akStepColumn != null) {
                var entiyAskadeFileTypeWizardStepColumn = this._load(akStepColumn.Id, akStepColumn);
                return entiyAskadeFileTypeWizardStepColumn;
            }
            return null;
        },
        getFileTypeWizardStepColumnByFileTypeIdAndColumnId: function getFileTypeWizardStepColumnByFileTypeIdAndColumnId(fileTypeId, fileColumnId) {
            var askadeFileTypeWizardSteps = LocalStorageUtility.getAllAskadeFileTypeWizardSteps(fileTypeId);
            for (var i = 0; i < askadeFileTypeWizardSteps.length; i++) {
                var askStep = askadeFileTypeWizardSteps[i];
                var askStepId = askStep.Id;
                var askWizStep = this.getAskadeFileTypeWizardStepColumn(askStepId, fileColumnId);
                if (askWizStep) {
                    return askWizStep;
                }
            }
            return null;
        },
        removeInstance: function removeInstance(col) {
            var colId = col.FileColumnId;
            var pool = this._pool;
            delete pool[this._prefixConstant + colId];
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = askadeFileTypeWizardStepColumnManagerScope;
    return askadeFileTypeWizardStepColumnManagerScope;
}]); //AskadeFileTypeWizardStepColumnGuide-------------------------------------------

app.factory('askadeFileTypeWizardStepColumnGuideManager', ['AskadeFileTypeWizardStepColumnGuide', 'LocalStorageUtility', function (AskadeFileTypeWizardStepColumnGuide, LocalStorageUtility) {
    var askadeFileTypeWizardStepColumnGuideManagerScope = {
        _prefixConstant: '_',
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(askadeFileTypeWizardStepColumnGuideId, askadeFileTypeWizardStepColumnGuideData) {
            var instance = this._pool[this._prefixConstant + askadeFileTypeWizardStepColumnGuideId];

            if (instance) {
                instance.setData(askadeFileTypeWizardStepColumnGuideData);
            } else {
                instance = new AskadeFileTypeWizardStepColumnGuide();
                instance.setData(askadeFileTypeWizardStepColumnGuideData);
                this._pool[this._prefixConstant + askadeFileTypeWizardStepColumnGuideId] = instance;
            }

            return instance;
        },
        _search: function _search(askadeFileTypeWizardStepColumnGuideId) {
            return this._pool[this._prefixConstant + askadeFileTypeWizardStepColumnGuideId];
        },
        _load: function _load(askadeFileTypeWizardStepColumnGuideId, askadeFileTypeWizardStepColumnGuideData) {
            return this._retrieveInstance(askadeFileTypeWizardStepColumnGuideId, askadeFileTypeWizardStepColumnGuideData);
        },
        loadAskadeFileTypeWizardStepColumnGuide: function loadAskadeFileTypeWizardStepColumnGuide(askadeFileTypeWizardStepColumnGuideId, fileColumnId) {
            var askadeFileTypeWizardStepColumnGuide = LocalStorageUtility.getAskadeFileTypeWizardStepColumnGuide(askadeFileTypeWizardStepColumnGuideId, fileColumnId);
            return this._load(askadeFileTypeWizardStepColumnGuideId, askadeFileTypeWizardStepColumnGuide);
        },
        getAskadeFileTypeWizardStepColumnGuide: function getAskadeFileTypeWizardStepColumnGuide(askadeFileTypeWizardStepColumnGuideId, fileColumnId) {
            var askadeFileTypeWizardStepColumnGuide = this._search(askadeFileTypeWizardStepColumnGuideId);

            if (!askadeFileTypeWizardStepColumnGuide) {
                askadeFileTypeWizardStepColumnGuide = this.loadAskadeFileTypeWizardStepColumnGuide(askadeFileTypeWizardStepColumnGuideId, fileColumnId);
            }

            return askadeFileTypeWizardStepColumnGuide;
        },
        getAskadeFileTypeWizardStepColumnGuideById: function getAskadeFileTypeWizardStepColumnGuideById(askadeFileTypeWizardStepColumnGuideId) {
            var askadeFileTypeWizardStepColumnGuide = this._search(askadeFileTypeWizardStepColumnGuideId);

            if (askadeFileTypeWizardStepColumnGuide) {
                return askadeFileTypeWizardStepColumnGuide;
            }

            return null;
        },
        getAllAskadeFileTypeWizardStepColumnsGuide: function getAllAskadeFileTypeWizardStepColumnsGuide(fileColumnId, fileTypeId) {
            var askadeFileTypeWizardStepColumnGuides = LocalStorageUtility.getAllAskadeFileTypeWizardStepColumnsGuide(fileColumnId, fileTypeId);
            var entityAskadeFileTypeWizardStepColumnGuides = [];

            for (var i = 0; i < askadeFileTypeWizardStepColumnGuides.length; i++) {
                var askadeFileTypeWizardStepColumnGuide = askadeFileTypeWizardStepColumnGuides[i];

                var entiyAskadeFileTypeWizardStepColumnGuide = this._load(askadeFileTypeWizardStepColumnGuide.Id, askadeFileTypeWizardStepColumnGuide);

                entityAskadeFileTypeWizardStepColumnGuides.push(entiyAskadeFileTypeWizardStepColumnGuide);
            }

            return entityAskadeFileTypeWizardStepColumnGuides;
        },
        removeInstance: function removeInstance(colGuide) {
            var guideId = colGuide.Id;
            var pool = this._pool;
            delete pool[this._prefixConstant + guideId];
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = askadeFileTypeWizardStepColumnGuideManagerScope;
    return askadeFileTypeWizardStepColumnGuideManagerScope;
}]); //PersonAskadeFileTypeWizardAttachment-------------------------------------------

app.factory('personAskadeFileTypeWizardAttachmentManager', ['PersonAskadeFileTypeWizardAttachment', 'LocalStorageUtility', function (PersonAskadeFileTypeWizardAttachment, LocalStorageUtility) {
    var personAskadeFileTypeWizardAttachmentManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(personAskadeFileTypeWizardAttachmentId, personAskadeFileTypeWizardAttachmentData) {
            var instance = this._pool[personAskadeFileTypeWizardAttachmentId];

            if (instance) {
                instance.setData(personAskadeFileTypeWizardAttachmentData);
            } else {
                instance = new PersonAskadeFileTypeWizardAttachment();
                instance.setData(personAskadeFileTypeWizardAttachmentData);
                this._pool[personAskadeFileTypeWizardAttachmentId] = instance;
            }

            return instance;
        },
        _search: function _search(personAskadeFileTypeWizardAttachmentId) {
            return this._pool[personAskadeFileTypeWizardAttachmentId];
        },
        _load: function _load(personAskadeFileTypeWizardAttachmentId, personAskadeFileTypeWizardAttachmentData) {
            return this._retrieveInstance(personAskadeFileTypeWizardAttachmentId, personAskadeFileTypeWizardAttachmentData);
        },
        loadPersonAskadeFileTypeWizardAttachment: function loadPersonAskadeFileTypeWizardAttachment(personAskadeFileTypeWizardAttachmentId) {
            var personAskadeFileTypeWizardAttachment = LocalStorageUtility.getPersonAskadeFileTypeWizardAttachment(personAskadeFileTypeWizardAttachmentId);
            return this._load(personAskadeFileTypeWizardAttachmentId, personAskadeFileTypeWizardAttachment);
        },
        getPersonAskadeFileTypeWizardAttachment: function getPersonAskadeFileTypeWizardAttachment(personAskadeFileTypeWizardAttachmentId) {
            var personAskadeFileTypeWizardAttachment = this._search(personAskadeFileTypeWizardAttachmentId);

            if (!personAskadeFileTypeWizardAttachment) {
                personAskadeFileTypeWizardAttachment = this.loadPersonAskadeFileTypeWizardAttachment(personAskadeFileTypeWizardAttachmentId);
            }

            return personAskadeFileTypeWizardAttachment;
        },
        getAllPersonAskadeFileTypeWizardAttachment: function getAllPersonAskadeFileTypeWizardAttachment(fileTypeId) {
            var personAskadeFileTypeWizardAttachments = LocalStorageUtility.getAllPersonAskadeFileTypeWizardAttachments(fileTypeId);
            var entityPersonAskadeFileTypeWizardAttachments = [];

            for (var i = 0; i < personAskadeFileTypeWizardAttachments.length; i++) {
                var personAskadeFileTypeWizardAttachment = personAskadeFileTypeWizardAttachments[i];

                var entiyPersonAskadeFileTypeWizardAttachment = this._load(personAskadeFileTypeWizardAttachment.Id, personAskadeFileTypeWizardAttachment);

                entityPersonAskadeFileTypeWizardAttachments.push(entiyPersonAskadeFileTypeWizardAttachment);
            }

            return entityPersonAskadeFileTypeWizardAttachments;
        },
        refreshPool: function refreshPool(oldEntity, newEntitySource) {
            var key = oldEntity.Id;
            var newKey = newEntitySource.Id;
            var pool = this._pool;
            delete pool[key];
            return this._load(newKey, newEntitySource);
        },
        removeInstance: function removeInstance(pAskadeAttach) {
            var attachId = pAskadeAttach.Id;
            var pool = this._pool;
            delete pool[attachId];
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = personAskadeFileTypeWizardAttachmentManagerScope;
    return personAskadeFileTypeWizardAttachmentManagerScope;
}]); //PersonAskadeFileTypeWizardAttachmentTemplate-------------------------------------------

app.factory('personAskadeFileTypeWizardAttachmentTemplateManager', ['PersonAskadeFileTypeWizardAttachmentTemplate', 'LocalStorageUtility', function (PersonAskadeFileTypeWizardAttachment, LocalStorageUtility) {
    var personAskadeFileTypeWizardAttachmentManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(personAskadeFileTypeWizardAttachmentId, personAskadeFileTypeWizardAttachmentData) {
            var instance = this._pool[personAskadeFileTypeWizardAttachmentId];

            if (instance) {
                instance.setData(personAskadeFileTypeWizardAttachmentData);
            } else {
                instance = new PersonAskadeFileTypeWizardAttachment();
                instance.setData(personAskadeFileTypeWizardAttachmentData);
                this._pool[personAskadeFileTypeWizardAttachmentId] = instance;
            }

            return instance;
        },
        _search: function _search(personAskadeFileTypeWizardAttachmentId) {
            return this._pool[personAskadeFileTypeWizardAttachmentId];
        },
        _load: function _load(personAskadeFileTypeWizardAttachmentId, personAskadeFileTypeWizardAttachmentData) {
            return this._retrieveInstance(personAskadeFileTypeWizardAttachmentId, personAskadeFileTypeWizardAttachmentData);
        },
        loadPersonAskadeFileTypeWizardAttachment: function loadPersonAskadeFileTypeWizardAttachment(personAskadeFileTypeWizardAttachmentId) {
            var personAskadeFileTypeWizardAttachment = LocalStorageUtility.getPersonAskadeFileTypeWizardAttachmentTemplate(personAskadeFileTypeWizardAttachmentId);
            return this._load(personAskadeFileTypeWizardAttachmentId, personAskadeFileTypeWizardAttachment);
        },
        getPersonAskadeFileTypeWizardAttachmentTemplate: function getPersonAskadeFileTypeWizardAttachmentTemplate(personAskadeFileTypeWizardAttachmentId) {
            var personAskadeFileTypeWizardAttachment = this._search(personAskadeFileTypeWizardAttachmentId);

            if (!personAskadeFileTypeWizardAttachment) {
                personAskadeFileTypeWizardAttachment = this.loadPersonAskadeFileTypeWizardAttachment(personAskadeFileTypeWizardAttachmentId);
            }

            return personAskadeFileTypeWizardAttachment;
        },
        getAllPersonAskadeFileTypeWizardAttachmentTemplate: function getAllPersonAskadeFileTypeWizardAttachmentTemplate(id) {
            var personAskadeFileTypeWizardAttachments = LocalStorageUtility.getAllPersonAskadeFileTypeWizardAttachmentsTemplate(id);
            var entityPersonAskadeFileTypeWizardAttachments = [];

            for (var i = 0; i < personAskadeFileTypeWizardAttachments.length; i++) {
                var personAskadeFileTypeWizardAttachment = personAskadeFileTypeWizardAttachments[i];

                var entiyPersonAskadeFileTypeWizardAttachment = this._load(personAskadeFileTypeWizardAttachment.Id, personAskadeFileTypeWizardAttachment);

                entityPersonAskadeFileTypeWizardAttachments.push(entiyPersonAskadeFileTypeWizardAttachment);
            }

            return entityPersonAskadeFileTypeWizardAttachments;
        },
        removeInstance: function removeInstance(pAkAttachTemp) {
            var tempAttachId = pAkAttachTemp.Id;
            var pool = this._pool;
            delete pool[tempAttachId];
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = personAskadeFileTypeWizardAttachmentManagerScope;
    return personAskadeFileTypeWizardAttachmentManagerScope;
}]); //PersonAskadeFileTypeWizardTemplate-------------------------------------------

app.factory('personAskadeFileTypeWizardTemplateManager', ['PersonAskadeFileTypeWizardTemplate', 'LocalStorageUtility', 'personAskadeColumnAnswerTemplateManager', 'personAskadeFileTypeWizardAttachmentTemplateManager', 'askadeFileTypeWizardManager', function (PersonAskadeFileTypeWizardTemplate, LocalStorageUtility, personAskadeColumnAnswerTemplateManager, personAskadeFileTypeWizardAttachmentTemplateManager, askadeFileTypeWizardManager) {
    var personAskadeFileTypeWizardTemplateManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(personAskadeFileTypeWizardTemplateId, personAskadeFileTypeWizardTemplateData) {
            var instance = this._pool[personAskadeFileTypeWizardTemplateId];

            if (instance) {
                instance.setData(personAskadeFileTypeWizardTemplateData);
            } else {
                instance = new PersonAskadeFileTypeWizardTemplate();
                instance.setData(personAskadeFileTypeWizardTemplateData);
                this._pool[personAskadeFileTypeWizardTemplateId] = instance;
            }

            return instance;
        },
        _search: function _search(personAskadeFileTypeWizardTemplateId) {
            return this._pool[personAskadeFileTypeWizardTemplateId];
        },
        _load: function _load(personAskadeFileTypeWizardTemplateId, personAskadeFileTypeWizardTemplateData) {
            return this._retrieveInstance(personAskadeFileTypeWizardTemplateId, personAskadeFileTypeWizardTemplateData);
        },
        loadPersonAskadeFileTypeWizardTemplate: function loadPersonAskadeFileTypeWizardTemplate(personAskadeFileTypeWizardTemplateId) {
            var personAskadeFileTypeWizardTemplate = LocalStorageUtility.getPersonAskadeFileTypeWizardTemplate(personAskadeFileTypeWizardTemplateId);

            var personAskadeFTWizardEntity = this._load(personAskadeFileTypeWizardTemplateId, personAskadeFileTypeWizardTemplate);

            personAskadeFTWizardEntity.ColumnValues = personAskadeColumnAnswerTemplateManager.getAllPersonAskadeColumnAnswerTemplate(personAskadeFTWizardEntity);
            personAskadeFTWizardEntity.Attachments = personAskadeFileTypeWizardAttachmentTemplateManager.getAllPersonAskadeFileTypeWizardAttachmentTemplate(personAskadeFTWizardEntity.Id);
            personAskadeFTWizardEntity.AskadeFileTypeWizard = askadeFileTypeWizardManager.getAskadeFileTypeWizard(personAskadeFTWizardEntity);
            return personAskadeFTWizardEntity;
        },
        getPersonAskadeFileTypeWizardTemplate: function getPersonAskadeFileTypeWizardTemplate(personAskadeFileTypeWizardTemplateId) {
            var pAkFileTypeWizard = this._search(personAskadeFileTypeWizardTemplateId); //if (!pAkFileTypeWizard) {// TODO Check this flow, if check needs to get the value from search


            var pAkw = this.loadPersonAskadeFileTypeWizardTemplate(personAskadeFileTypeWizardTemplateId);
            pAkFileTypeWizard = pAkw; //}

            return pAkFileTypeWizard;
        },
        getAllPersonAskadeFileTypeWizardTemplate: function getAllPersonAskadeFileTypeWizardTemplate() {
            var personAskadeFileTypeWizardTemplates = LocalStorageUtility.getAllPersonAskadeFileTypeWizardTemplates();
            var entityPersonAskadeFileTypeWizardTemplates = [];

            for (var i = 0; i < personAskadeFileTypeWizardTemplates.length; i++) {
                var personAskadeFileTypeWizardTemplate = personAskadeFileTypeWizardTemplates[i];

                var entiyPersonAskadeFileTypeWizardTemplate = this._load(personAskadeFileTypeWizardTemplate.Id, personAskadeFileTypeWizardTemplate);

                entityPersonAskadeFileTypeWizardTemplates.push(entiyPersonAskadeFileTypeWizardTemplate);
            }

            return entityPersonAskadeFileTypeWizardTemplates;
        },
        removeInstance: function removeInstance(pAkTemp) {
            var tempPersonAskadeId = pAkTemp.Id;
            var pool = this._pool;
            delete pool[tempPersonAskadeId];
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = personAskadeFileTypeWizardTemplateManagerScope;
    return personAskadeFileTypeWizardTemplateManagerScope;
}]); //PersonAskadeColumnAnswerTemplate-------------------------------------------

app.factory('personAskadeColumnAnswerTemplateManager', ['PersonAskadeColumnAnswerTemplate', 'LocalStorageUtility', 'personAskadeColumnGuideAnswerManager', 'askadeFileTypeWizardManager', 'askadeFileTypeWizardStepColumnManager', function (PersonAskadeColumnAnswerTemplate, LocalStorageUtility, personAskadeColumnGuideAnswerManager, askadeFileTypeWizardManager, askadeFileTypeWizardStepColumnManager) {
    var personAskadeColumnAnswerTemplateManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(personAskadeColumnAnswerTemplateId, personAskadeColumnAnswerTemplateData) {
            var instance = this._pool[personAskadeColumnAnswerTemplateId];

            if (instance) {
                instance.setData(personAskadeColumnAnswerTemplateData);
            } else {
                instance = new PersonAskadeColumnAnswerTemplate();
                instance.setData(personAskadeColumnAnswerTemplateData);
                this._pool[personAskadeColumnAnswerTemplateId] = instance;
            }

            return instance;
        },
        _search: function _search(personAskadeColumnAnswerTemplateId) {
            return this._pool[personAskadeColumnAnswerTemplateId];
        },
        _load: function _load(personAskadeColumnAnswerTemplateId, personAskadeColumnAnswerTemplateData) {
            return this._retrieveInstance(personAskadeColumnAnswerTemplateId, personAskadeColumnAnswerTemplateData);
        },
        loadPersonAskadeColumnAnswerTemplate: function loadPersonAskadeColumnAnswerTemplate(personAskadeColumnAnswerTemplateId) {
            var personAskadeColumnAnswerTemplate = LocalStorageUtility.getPersonAskadeColumnAnswerTemplateById(personAskadeColumnAnswerTemplateId);
            return this._load(personAskadeColumnAnswerTemplateId, personAskadeColumnAnswerTemplate);
        },
        loadPersonAskadeColumnAnswerTemplateByPAIdAndColumnId: function loadPersonAskadeColumnAnswerTemplateByPAIdAndColumnId(personAskadeTemplateId, columnId) {
            var personAskadeColumnAnswerTemplate = LocalStorageUtility.getPersonAskadeColumnAnswerTemplate(personAskadeTemplateId, columnId);

            if (personAskadeColumnAnswerTemplate != null) {
                return this._load(personAskadeColumnAnswerTemplate.Id, personAskadeColumnAnswerTemplate);
            }

            return null;
        },
        getPersonAskadeColumnAnswerTemplate: function getPersonAskadeColumnAnswerTemplate(personAskadeTemplateId, columnId) {
            personAskadeColumnAnswerTemplate = this.loadPersonAskadeColumnAnswerTemplateByPAIdAndColumnId(personAskadeTemplateId, columnId);
            return personAskadeColumnAnswerTemplate;
        },
        getPersonAskadeColumnAnswerTemplateById: function getPersonAskadeColumnAnswerTemplateById(personAskadeColumnAnswerTemplateId) {
            var personAskadeColumnAnswerTemplate = this._search(personAskadeColumnAnswerTemplateId);

            if (!personAskadeColumnAnswerTemplate) {
                personAskadeColumnAnswerTemplate = this.loadPersonAskadeColumnAnswerTemplate(personAskadeColumnAnswerTemplateId);
            }

            return personAskadeColumnAnswerTemplate;
        },
        getAllPersonAskadeColumnAnswerTemplate: function getAllPersonAskadeColumnAnswerTemplate(personAskadeEntity) {
            var id = personAskadeEntity.Id;
            var FileTypeId = personAskadeEntity.FileTypeId;
            var columnGuideFileTypeId = personAskadeEntity.ColumnGuideFileTypeId;
            var personAskadeColumnAnswerTemplates = LocalStorageUtility.getAllPersonAskadeColumnAnswerTemplates(id);
            var entityPersonAskadeColumnAnswerTemplates = [];

            for (var i = 0; i < personAskadeColumnAnswerTemplates.length; i++) {
                var personAskadeColumnAnswerTemplate = personAskadeColumnAnswerTemplates[i];

                var entiyPersonAskadeColumnAnswerTemplate = this._load(personAskadeColumnAnswerTemplate.Id, personAskadeColumnAnswerTemplate);

                var fileColumnId = entiyPersonAskadeColumnAnswerTemplate.FileColumnId;
                var stepColumnVal = askadeFileTypeWizardStepColumnManager.getFileTypeWizardStepColumnByColumnId(fileColumnId);
                var columnGuideFileTypeList = stepColumnVal.ColumnGuides2FileTypes; // Below check is added to handle, if the latest app is run in only version of the API (<548)

                if (columnGuideFileTypeList) {
                    if (columnGuideFileTypeList.length !== 0) {
                        if (columnGuideFileTypeList.indexOf(columnGuideFileTypeId) > -1) {
                            entiyPersonAskadeColumnAnswerTemplate.ColumnGuides = personAskadeColumnGuideAnswerManager.getColumnGuideByFileColumn(fileColumnId, FileTypeId);
                            entiyPersonAskadeColumnAnswerTemplate.IsColumnGuide = true;
                        }
                    } else {
                        entiyPersonAskadeColumnAnswerTemplate.ColumnGuides = personAskadeColumnGuideAnswerManager.getColumnGuideByFileColumn(fileColumnId, FileTypeId);
                        entiyPersonAskadeColumnAnswerTemplate.IsColumnGuide = true;
                    }
                } else {
                    entiyPersonAskadeColumnAnswerTemplate.ColumnGuides = personAskadeColumnGuideAnswerManager.getColumnGuideByFileColumn(fileColumnId, FileTypeId);
                    entiyPersonAskadeColumnAnswerTemplate.IsColumnGuide = true;
                }

                entityPersonAskadeColumnAnswerTemplates.push(entiyPersonAskadeColumnAnswerTemplate);
            }

            return entityPersonAskadeColumnAnswerTemplates;
        },
        removeInstance: function removeInstance(pAkColumnAnswerTemp) {
            var tempPAkColumnAnswerId = pAkColumnAnswerTemp.Id;
            var pool = this._pool;
            delete pool[tempPAkColumnAnswerId];
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = personAskadeColumnAnswerTemplateManagerScope;
    return personAskadeColumnAnswerTemplateManagerScope;
}]); //PersonAskadeColumnAnswer-------------------------------------------

app.factory('personAskadeColumnAnswerManager', ['PersonAskadeColumnAnswer', 'LocalStorageUtility', 'personAskadeColumnGuideAnswerManager', 'askadeFileTypeWizardStepColumnManager', function (PersonAskadeColumnAnswer, LocalStorageUtility, personAskadeColumnGuideAnswerManager, askadeFileTypeWizardStepColumnManager) {
    var personAskadeColumnAnswerManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(personAskadeColumnAnswerId, personAskadeColumnAnswerData) {
            var instance = this._pool[personAskadeColumnAnswerId];

            if (instance) {
                instance.setData(personAskadeColumnAnswerData);
            } else {
                instance = new PersonAskadeColumnAnswer();
                instance.setData(personAskadeColumnAnswerData);
                this._pool[personAskadeColumnAnswerId] = instance;
            }

            return instance;
        },
        _search: function _search(personAskadeColumnAnswerId) {
            return this._pool[personAskadeColumnAnswerId];
        },
        _load: function _load(personAskadeColumnAnswerId, personAskadeColumnAnswerData) {
            return this._retrieveInstance(personAskadeColumnAnswerId, personAskadeColumnAnswerData);
        },
        loadPersonAskadeColumnAnswer: function loadPersonAskadeColumnAnswer(personAskadeColumnAnswerId) {
            var personAskadeColumnAnswer = LocalStorageUtility.getPersonAskadeColumnAnswer(personAskadeColumnAnswerId);
            return this._load(personAskadeColumnAnswerId, personAskadeColumnAnswer);
        },
        getPersonAskadeColumnAnswer: function getPersonAskadeColumnAnswer(personAskadeColumnAnswerId) {
            var personAskadeColumnAnswer = this._search(personAskadeColumnAnswerId);

            if (!personAskadeColumnAnswer) {
                personAskadeColumnAnswer = this.loadPersonAskadeColumnAnswer(personAskadeColumnAnswerId);
            }

            return personAskadeColumnAnswer;
        },
        getAllPersonAskadeColumnAnswer: function getAllPersonAskadeColumnAnswer(personAskadeEntity) {
            var akwizId = personAskadeEntity.Id;
            var FileTypeId = personAskadeEntity.FileTypeId;
            var columnGuideFileTypeId = personAskadeEntity.ColumnGuideFileTypeId;
            var personAskadeColumnAnswers = LocalStorageUtility.getAllPersonAskadeColumnAnswers(akwizId);
            var entityPersonAskadeColumnAnswers = [];

            for (var i = 0; i < personAskadeColumnAnswers.length; i++) {
                var personAskadeColumnAnswer = personAskadeColumnAnswers[i];

                var entiyPersonAskadeColumnAnswer = this._load(personAskadeColumnAnswer.Id, personAskadeColumnAnswer);

                var fileColumnId = entiyPersonAskadeColumnAnswer.FileColumnId;
                var stepColumnVal = askadeFileTypeWizardStepColumnManager.getFileTypeWizardStepColumnByColumnId(fileColumnId);
                var columnGuideFileTypeList = stepColumnVal.ColumnGuides2FileTypes; // Below check is added to handle, if the latest app is run in only version of the API (<548)

                if (columnGuideFileTypeList) {
                    // If column level has ColumnGuides2FileTypes list
                    if (columnGuideFileTypeList.length !== 0) {
                        // Check if current file type is in the list
                        if (columnGuideFileTypeList.indexOf(columnGuideFileTypeId) > -1) {
                            entiyPersonAskadeColumnAnswer.ColumnGuides = personAskadeColumnGuideAnswerManager.getColumnGuideByFileColumn(fileColumnId, FileTypeId);
                            entiyPersonAskadeColumnAnswer.IsColumnGuide = entiyPersonAskadeColumnAnswer.ColumnGuides.length > 0;
                        }
                    } else {
                        entiyPersonAskadeColumnAnswer.ColumnGuides = personAskadeColumnGuideAnswerManager.getColumnGuideByFileColumn(fileColumnId, FileTypeId);
                        entiyPersonAskadeColumnAnswer.IsColumnGuide = entiyPersonAskadeColumnAnswer.ColumnGuides.length > 0;
                    }
                } else {
                    entiyPersonAskadeColumnAnswer.ColumnGuides = personAskadeColumnGuideAnswerManager.getColumnGuideByFileColumn(fileColumnId, FileTypeId);
                    entiyPersonAskadeColumnAnswer.IsColumnGuide = entiyPersonAskadeColumnAnswer.ColumnGuides.length > 0;
                }

                if (entiyPersonAskadeColumnAnswer.AnswerText !== null) {
                    var answerText = entiyPersonAskadeColumnAnswer.AnswerText;
                    var guides = entiyPersonAskadeColumnAnswer.ColumnGuides;
                    personAskadeColumnGuideAnswerManager.addGuideAnswerFromColumnAnswer(answerText, guides);
                }

                entityPersonAskadeColumnAnswers.push(entiyPersonAskadeColumnAnswer);
            }

            return entityPersonAskadeColumnAnswers;
        },
        refreshPool: function refreshPool(oldEntity, newEntitySource) {
            var key = oldEntity.Id;
            var newKey = newEntitySource.Id;
            var pool = this._pool;
            delete pool[key];
            return this._load(newKey, newEntitySource);
        },
        removeInstance: function removeInstance(pAskadeColumnAnswer) {
            var pAskadeColumnAnswerId = pAskadeColumnAnswer.Id;
            var pool = this._pool;
            delete pool[pAskadeColumnAnswerId];
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = personAskadeColumnAnswerManagerScope;
    return personAskadeColumnAnswerManagerScope;
}]); //PersonAskadeFileTypeWizard-------------------------------------------

app.factory('personAskadeFileTypeWizardManager', ['PersonAskadeFileTypeWizard', 'LocalStorageUtility', 'personAskadeColumnAnswerManager', 'personAskadeFileTypeWizardAttachmentManager', 'askadeFileTypeWizardManager', 'personAskadeColumnGuideAnswerManager', '$q', 'DateUtil', 'FileUtil', '$injector', 'askadeFileTypeWizardStepColumnGuideManager', 'askadeFileTypeWizardStepColumnManager', 'askadeFileTypeWizardStepManager', 'personAskadeColumnAnswerTemplateManager', 'personAskadeFileTypeWizardAttachmentTemplateManager', 'personAskadeFileTypeWizardTemplateManager', function (PersonAskadeFileTypeWizard, LocalStorageUtility, personAskadeColumnAnswerManager, personAskadeFileTypeWizardAttachmentManager, askadeFileTypeWizardManager, personAskadeColumnGuideAnswerManager, $q, DateUtil, FileUtil, $injector, askadeFileTypeWizardStepColumnGuideManager, askadeFileTypeWizardStepColumnManager, askadeFileTypeWizardStepManager, personAskadeColumnAnswerTemplateManager, personAskadeFileTypeWizardAttachmentTemplateManager, personAskadeFileTypeWizardTemplateManager) {
    var personAskadeFileTypeWizardManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(personAskadeFileTypeWizardId, personAskadeFileTypeWizardData) {
            var instance = this._pool[personAskadeFileTypeWizardId];

            if (instance) {
                instance.setData(personAskadeFileTypeWizardData);
            } else {
                instance = new PersonAskadeFileTypeWizard();
                instance.setData(personAskadeFileTypeWizardData);
                this._pool[personAskadeFileTypeWizardId] = instance;
            }

            return instance;
        },
        _search: function _search(personAskadeFileTypeWizardId) {
            return this._pool[personAskadeFileTypeWizardId];
        },
        _load: function _load(personAskadeFileTypeWizardId, personAskadeFileTypeWizardData) {
            return this._retrieveInstance(personAskadeFileTypeWizardId, personAskadeFileTypeWizardData);
        },
        loadPersonAskadeFileTypeWizard: function loadPersonAskadeFileTypeWizard(personAskadeFileTypeWizardId) {
            var personAskadeFileTypeWizard = LocalStorageUtility.getPersonAskadeFileTypeWizard(personAskadeFileTypeWizardId);

            var personAskadeFTWizardEntity = this._load(personAskadeFileTypeWizardId, personAskadeFileTypeWizard);

            personAskadeFTWizardEntity.ColumnValues = personAskadeColumnAnswerManager.getAllPersonAskadeColumnAnswer(personAskadeFTWizardEntity);
            personAskadeFTWizardEntity.Attachments = personAskadeFileTypeWizardAttachmentManager.getAllPersonAskadeFileTypeWizardAttachment(personAskadeFTWizardEntity.Id);
            personAskadeFTWizardEntity.AskadeFileTypeWizard = askadeFileTypeWizardManager.getAskadeFileTypeWizard(personAskadeFTWizardEntity);
            return personAskadeFTWizardEntity;
        },
        getPersonAskadeFileTypeWizard: function getPersonAskadeFileTypeWizard(personAskadeFileTypeWizardId) {
            var personAskadeFileTypeWizard = this._search(personAskadeFileTypeWizardId); //if (!personAskadeFileTypeWizard) { // TODO: Removing the check temp


            personAskadeFileTypeWizard = this.loadPersonAskadeFileTypeWizard(personAskadeFileTypeWizardId); //}

            return personAskadeFileTypeWizard;
        },
        getAllPersonAskadeFileTypeWizard: function getAllPersonAskadeFileTypeWizard() {
            var personAskadeFileTypeWizards = LocalStorageUtility.getAllPersonAskadeFileTypeWizards();
            var entityPersonAskadeFileTypeWizards = [];

            for (var i = 0; i < personAskadeFileTypeWizards.length; i++) {
                var personAskadeFileTypeWizard = personAskadeFileTypeWizards[i];

                var entiyPersonAskadeFileTypeWizard = this._load(personAskadeFileTypeWizard.Id, personAskadeFileTypeWizard);

                entityPersonAskadeFileTypeWizards.push(entiyPersonAskadeFileTypeWizard);
            }

            return entityPersonAskadeFileTypeWizards;
        },
        saveAkWizard: function saveAkWizard(pAkWizard, isComplete) {
            return this._saveAkWizard(pAkWizard, isComplete);
        },
        _saveAkWizard: function _saveAkWizard(pAkWizard, isComplete) {
            var pAttachments = pAkWizard.Attachments;

            for (var j = 0; j < pAttachments.length; j++) {
                var pAttachment = pAttachments[j];
                var markedForDelete = pAttachment.MarkedForDelete;

                if (markedForDelete === true) {
                    pAttachment.FileName = null;
                    pAttachment.FilePath = null;
                }
            }

            if (pAkWizard.IsTemplate !== true) {
                LocalStorageUtility.savePersonAskadeWizardUpdateOnly(pAkWizard, isComplete);
                LocalStorageUtility.saveOfflineDb();
                var newPAk = this.loadPersonAskadeFileTypeWizard(pAkWizard.Id);
                return newPAk;
            } else {
                var pAkw = LocalStorageUtility.savePersonAskadeWizardInsertOnly(pAkWizard, isComplete);
                var columnAnswers = LocalStorageUtility.savePersonAskadeColumnInsertOnly(pAkWizard, pAkw.Id);

                for (var i = 0; i < pAkWizard.ColumnValues.length; i++) {
                    var columnAnswerOld = pAkWizard.ColumnValues[i];
                    var columnAnswerNew = columnAnswers[i];
                    personAskadeColumnAnswerManager.refreshPool(columnAnswerOld, columnAnswerNew);
                }

                var personAskadeAttachments = LocalStorageUtility.savePersonAskadeAttachmentInsertOnly(pAkWizard, pAkw.Id);

                for (var i = 0; i < pAkWizard.Attachments.length; i++) {
                    var attachmentOld = pAkWizard.Attachments[i];
                    var attachmentNew = personAskadeAttachments[i];
                    personAskadeFileTypeWizardAttachmentManager.refreshPool(attachmentOld, attachmentNew);
                }

                return this.refreshPool(pAkWizard, pAkw);
            }
        },
        getInProgressPCaseList: function getInProgressPCaseList(moduleName) {
            var inProgressList = LocalStorageUtility.getInProgressAskadeList(moduleName);
            return this._formatAnsweredList(inProgressList);
        },
        getCompletedPCaseList: function getCompletedPCaseList(moduleName) {
            var inCompletedList = LocalStorageUtility.getCompletedAskadeList(moduleName);
            return this._formatAnsweredList(inCompletedList);
        },
        getInProgressPAskadeCount: function getInProgressPAskadeCount(moduleName) {
            var inProgressCount = 0;
            var inProgressList = LocalStorageUtility.getInProgressAskadeList(moduleName);

            var inProgress = this._formatAnsweredList(inProgressList);

            for (var i = 0; i < inProgress.length; i++) {
                var inprog = inProgress[i].Answers;
                inProgressCount += inprog.length;
            }

            return inProgressCount;
        },
        getCompletedPAskadeCount: function getCompletedPAskadeCount(moduleName) {
            var completedCount = 0;
            var completedList = LocalStorageUtility.getCompletedAskadeList(moduleName);

            var completed = this._formatAnsweredList(completedList);

            for (var i = 0; i < completed.length; i++) {
                var complete = completed[i].Answers;
                completedCount += complete.length;
            }

            return completedCount;
        },
        getCompletedPersonAskadeListWithDelayedUpload: function getCompletedPersonAskadeListWithDelayedUpload(moduleName) {
            var completedList = this.getCompletedPCaseList(moduleName);
            var completedDelayedList = [];

            for (var i = 0; i < completedList.length; i++) {
                var personAskadeAllAnswers = completedList[i];
                var personAskadeAnswers = personAskadeAllAnswers.Answers;

                for (var j = 0; j < personAskadeAnswers.length; j++) {
                    var personAskade = personAskadeAnswers[j].PersonAskadeAnswer;
                    var autoUploadDelayInMins = personAskade.AskadeFileTypeWizard.AutoUploadDelayInMinutes;
                    if (autoUploadDelayInMins && autoUploadDelayInMins > 0) {
                        completedDelayedList.push(personAskade);
                    }
                }
            }
            return completedDelayedList;
        },
        hasDelayedAskadeList2Upload: function hasDelayedAskadeList2Upload(moduleName) {
            var completedList = this.getCompletedPersonAskadeListWithDelayedUpload(moduleName);
            for (var i = 0; i < completedList.length; i++) {
                var personAskade = completedList[i];
                if (personAskade.UploadInProgress == false && personAskade.hasDelayElapsed()) {
                    return true;
                }
            }
            return false;
        },
        _formatAnsweredList: function _formatAnsweredList(answerList) {
            var answeredAskadeList = [];

            for (var i = 0; i < answerList.length; i++) {
                var akw = answerList[i];
                var fileTypeId = akw.fileTypeId;
                var personAskadeAnswers = akw.askadeAnswers;
                var sortedPersonAskadeAnswers = personAskadeAnswers.sort(function (a, b) {
                    if (a.meta.created > b.meta.created) return -1;
                    if (a.meta.created < b.meta.created) return 1;
                    return 0;
                });
                var groupedPersonByDate = [];

                for (var j = 0; j < sortedPersonAskadeAnswers.length; j++) {
                    var personAskadeAnswer = sortedPersonAskadeAnswers[j];
                    var id = personAskadeAnswer.Id;

                    var askadeEntity = this._search(id);

                    if (!askadeEntity) {
                        askadeEntity = this.loadPersonAskadeFileTypeWizard(id);
                    }

                    var dateSaved = askadeEntity.CompletedDate;

                    if (angular.isUndefined(askadeEntity.CompletedDate)) {
                        var savedDate = askadeEntity.CreatedDate;
                        var currentDate = new Date(savedDate);
                        var completeDateTime = DateUtil.getFormattedValue(currentDate, DateUtil.getDateTime());
                        dateSaved = completeDateTime;
                    }

                    groupedPersonByDate.push({
                        'PersonAskadeAnswer': askadeEntity,
                        'Label': personAskadeAnswer.name,
                        'TimeStamp': dateSaved
                    });
                }

                if (sortedPersonAskadeAnswers.length > 0) {
                    answeredAskadeList.push({
                        'Name': akw.fileName,
                        'Answers': groupedPersonByDate
                    });
                }
            }

            return answeredAskadeList;
        },
        refreshPool: function refreshPool(oldEntity, newEntitySource) {
            var key = oldEntity.Id;
            var newKey = newEntitySource.Id;
            var pool = this._pool;
            delete pool[key];
            return this.loadPersonAskadeFileTypeWizard(newKey, newEntitySource);
        },
        removeInstance: function removeInstance(pAkEntity) {
            var pAkId = pAkEntity.Id;
            var pool = this._pool;

            for (var i = 0; i < pAkEntity.ColumnValues.length; i++) {
                var personColumnAnswer = pAkEntity.ColumnValues[i];
                var columnGuides = personColumnAnswer.ColumnGuides;

                if (columnGuides.length > 0) {
                    for (var j = 0; j < columnGuides.length; j++) {
                        var columnGuide = columnGuides[j];
                        personAskadeColumnGuideAnswerManager.removeInstance(columnGuide);
                    }
                }

                personAskadeColumnAnswerManager.removeInstance(personColumnAnswer);
            }

            for (var i = 0; i < pAkEntity.Attachments.length; i++) {
                var personAttachment = pAkEntity.Attachments[i];
                var filePath = personAttachment.FilePath;

                if (filePath) {
                    var deletePromise = FileUtil.deleteFile(filePath);
                    deletePromise.then(function (success) {// Success
                    }, function (error) {// Error
                    });
                }

                personAskadeFileTypeWizardAttachmentManager.removeInstance(personAttachment);
            }

            delete pool[pAkId];
            LocalStorageUtility.deletePersonAskadeWizard(pAkId);
        },
        prepareAskadeWizUpload: function prepareAskadeWizUpload(pAkWiz) {
            var processedPAk = $q.defer();
            var mappedAskadeWithAttachments = pAkWiz.prepareAttachments();
            var keyAttachments = [];
            var pAkPromises = [];
            var thisVal = this;

            for (var i = 0; i < mappedAskadeWithAttachments.length; i++) {
                var mappedPromise = mappedAskadeWithAttachments[i];
                var pAkKey = mappedPromise.pAttachId;
                var pAkPromise = mappedPromise.AttachPromise;
                keyAttachments.push(pAkKey);
                pAkPromises.push(pAkPromise);
            }

            $q.all(pAkPromises).then(function (resultSet) {
                var processedImageLength = resultSet.length;

                for (var i = 0; i < processedImageLength; i++) {
                    var pAttachId = keyAttachments[i];

                    var pAttach = thisVal._getAskadeAttachment(pAkWiz, pAttachId);

                    var promisedAttachData = resultSet[i];
                    pAttach.FileSourceBase64 = promisedAttachData;
                }

                processedPAk.resolve(pAkWiz);
            }, function (errorResponse) {
                processedPAk.reject(pAkWiz);
            });
            return processedPAk;
        },
        _getAskadeAttachment: function _getAskadeAttachment(pAk, pAttachId) {
            for (var i = 0; i < pAk.Attachments.length; i++) {
                var askadeAttach = pAk.Attachments[i];

                if (askadeAttach.Id == pAttachId) {
                    return askadeAttach;
                }
            }

            return null;
        },
        processDateColumnForAskade: function processDateColumnForAskade(pAsk) {
            var columnAnswers = pAsk.ColumnValues;

            for (var i = 0; i < columnAnswers.length; i++) {
                var columnAnswer = columnAnswers[i];

                if (columnAnswer.AnswerDate !== null) {
                    columnAnswer.AnswerText = DateUtil.getFormattedValue(columnAnswer.AnswerDate, 'date');
                }
            }
        },
        updateDownloadWizards: function updateDownloadWizards(caseFileTypeWizards, moduleName) {

            var def = $q.defer(); // Storing all the ids at all the levels in the below initilized arrays

            var deleteFileTypeIdList = [];
            var deleteStepIdList = [];
            var deleteFileColumnGuideIdList = [];
            var deletePersonAskadeIdList = [];
            var deletePersonStepColumnIdList = []; // Adding all the file type and person file type ids to the array which are dowwnloaded

            var allFileTypeIds = [];
            var allPersonAskadeIds = []; // Adding file type ids which have a person instance (inprogress/completed)

            var usedFileTypeIds = [];

            for (var i = 0; i < caseFileTypeWizards.length; i++) {
                var fileTypeWizard = caseFileTypeWizards[i];
                var fileTypeId = fileTypeWizard.FileTypeId;
                var columnSubTypeList = []; // Adding askade wizard data

                LocalStorageUtility.addAskadeWizardData(fileTypeWizard);
                allFileTypeIds.push(fileTypeId); // Adding all the step ids which are downloaded

                var allStepIds = [];
                var fileSteps = fileTypeWizard.Steps;

                for (var j = 0; j < fileSteps.length; j++) {
                    var fileStep = fileSteps[j];
                    var fileStepId = fileStep.Id; // Adding wizard step data

                    LocalStorageUtility.addAskadeWizardStepsData(fileTypeId, fileStep);
                    allStepIds.push(fileStepId); // Adding all the column ids which are downloaded

                    var allFileColumnIds = [];
                    var fileStepColumns = fileStep.Columns;

                    for (var k = 0; k < fileStepColumns.length; k++) {
                        var fileStepColumn = fileStepColumns[k];
                        var fileColumnId = fileStepColumn.FileColumnId;
                        var columnSubTypeInsertVal = {
                            "ColumnId": fileColumnId,
                            "ColumnType": fileStepColumn.ColumnType,
                            "ColumnSubType": fileStepColumn.ColumnSubType
                        }; // Adding wizard step column data

                        LocalStorageUtility.addAskadeWizardStepColumnData(fileStepId, fileStepColumn);
                        allFileColumnIds.push(fileColumnId);
                        LocalStorageUtility.saveOfflineDb(); // Adding columnSubTypeInsertVal object to a list, so as to add the ColumnSubType value to Person table.

                        columnSubTypeList.push(columnSubTypeInsertVal); // Adding all the column guide ids which are downloaded

                        var allFileColumnGuideIds = [];
                        var columnnGuides = fileStepColumn.ColumnGuides;

                        LocalStorageUtility.deleteColumnGuideByFileColumnId(fileColumnId, fileTypeId);
                        for (var l = 0; l < columnnGuides.length; l++) {
                            var columnGuide = columnnGuides[l];
                            var columnGuideId = columnGuide.Id; // Adding wizard step column guide data

                            LocalStorageUtility.addAskadeWizardStepColumnGuide(fileColumnId, fileTypeId, columnGuide);
                            allFileColumnGuideIds.push(columnGuideId);
                        }

                        LocalStorageUtility.saveOfflineDb(); // Fetching the ids of column guide which have to be deleted in app. (As this is deleted in server)

                        var colummnGuideIdsForDelete = LocalStorageUtility.getColumnGuideIdsForDelete(allFileColumnGuideIds, fileColumnId);

                        for (var l = 0; l < colummnGuideIdsForDelete.length; l++) {
                            var columnGuideId = colummnGuideIdsForDelete[l];
                            deleteFileColumnGuideIdList.push(columnGuideId);
                        }
                    }
                } // Fetching the ids of step ids which have to be deleted in app. (As this is deleted in server)


                var stepIdsForDelete = LocalStorageUtility.getStepIdsForDelete(allStepIds, fileTypeId);

                for (var j = 0; j < stepIdsForDelete.length; j++) {
                    var stepId = stepIdsForDelete[j];
                    deleteStepIdList.push(stepId);
                }

                var personAskadeWizs = fileTypeWizard.NewAskade; // TODO: After all the SIT has been updated to NewCase instead of NewAskade, Chaeck and above code can be removed

                if (!personAskadeWizs) {
                    personAskadeWizs = fileTypeWizard.NewCase;
                }

                var personAskadeId = personAskadeWizs.FileTypeId; // Adding person askade template data

                var personAskadeWizId = LocalStorageUtility.addPersonAskadeFileTypeWizardDataTemplate(fileTypeWizard);
                allPersonAskadeIds.push(personAskadeId);
                LocalStorageUtility.saveOfflineDb();
                var allPersonStepColumnAnswerIds = [];
                var personColumnValues = personAskadeWizs.ColumnValues;

                for (var k = 0; k < personColumnValues.length; k++) {
                    var personColumnValue = personColumnValues[k];
                    var fileColumnId = personColumnValue.FileColumnId; // Adding person wizard step column data

                    var columnAnswerId = LocalStorageUtility.addPersonAskadeWizStepColumnAnswer(personAskadeWizId, personColumnValue, columnSubTypeList);
                    allPersonStepColumnAnswerIds.push(columnAnswerId);
                }

                LocalStorageUtility.saveOfflineDb(); // Fetching the ids of person column answer ids which have to be deleted in app. (As this is deleted in server)

                var personStepColumnAnswerIdsForDelete = LocalStorageUtility.getPersonStepColumnAnswerIdsForDelete(allPersonStepColumnAnswerIds, personAskadeWizId);

                for (var k = 0; k < personStepColumnAnswerIdsForDelete.length; k++) {
                    var personColumnAnswerId = personStepColumnAnswerIdsForDelete[k];
                    deletePersonStepColumnIdList.push(personColumnAnswerId);
                }

                var personAttachments = personAskadeWizs.Attachments; // Adding person attachments data

                LocalStorageUtility.addPersonAskadeWizardAttachments(personAskadeWizId, personAttachments);
                LocalStorageUtility.saveOfflineDb();
            } // Fetching the ids of person askade ids which have to be deleted in app. (As this is deleted in server)


            var personAskadeIdsForDelete = LocalStorageUtility.getPersonAskadeIdsForDelete(allPersonAskadeIds);

            for (var j = 0; j < personAskadeIdsForDelete.length; j++) {
                var personAskadeId = personAskadeIdsForDelete[j].Id;
                deletePersonAskadeIdList.push(personAskadeId);
            } // Fetching the ids of file type ids which have to be deleted in app. (As this is deleted in server)


            var fileTypeIdsForDelete = LocalStorageUtility.getFileTypeIdsForDelete(allFileTypeIds, usedFileTypeIds, moduleName);

            for (var j = 0; j < fileTypeIdsForDelete.length; j++) {
                var fileTypeIdForDelete = fileTypeIdsForDelete[j];
                deleteFileTypeIdList.push(fileTypeIdForDelete);
            } // Delete related code


            LocalStorageUtility.saveOfflineDb(); // Deleting person step column

            for (var i = 0; i < deletePersonStepColumnIdList.length; i++) {
                var stepColumnAnswerId = deletePersonStepColumnIdList[i];
                var personColumnAnswerInstance = personAskadeColumnAnswerTemplateManager.getPersonAskadeColumnAnswerTemplateById(stepColumnAnswerId);
                LocalStorageUtility.deletePersonAskadeColumnAnswerTemplateById(stepColumnAnswerId);

                if (personColumnAnswerInstance) {
                    personAskadeColumnAnswerTemplateManager.removeInstance(personColumnAnswerInstance);
                }
            }

            LocalStorageUtility.saveOfflineDb(); // Deleting file type ids 

            for (var i = 0; i < deleteFileTypeIdList.length; i++) {
                var askadeIdDelete = deleteFileTypeIdList[i];
                var pAkTemplate = LocalStorageUtility.getPersonAskadeFileTypeWizardTemplate(askadeIdDelete);
                var askadeWizDelete = askadeFileTypeWizardManager.loadAskadeFileTypeWizard(askadeIdDelete);
                var akWizard = askadeFileTypeWizardManager.getAskadeFileTypeWizard(askadeWizDelete);
                var askadeIdDelete = askadeWizDelete.FileTypeId;
                var favoritesManager = $injector.get('favoritesManager');
                favoritesManager.deleteFavoritesById(askadeIdDelete);
                var akwSteps = akWizard.Steps;

                for (var j = 0; j < akwSteps.length; j++) {
                    var akwStep = akwSteps[j];
                    var akwStepColumn = akwStep.Columns;
                    var stepId = akwStep.Id;

                    for (var k = 0; k < akwStepColumn.length; k++) {
                        var col = akwStepColumn[k];
                        var colGuide = col.ColumnGuides;
                        var columnId = col.FileColumnId;

                        for (var l = 0; l < colGuide.length; l++) {
                            var guide = colGuide[l];
                            var guideId = guide.Id;
                            LocalStorageUtility.deleteAkWizardStepColumnGuide(guideId, columnId);
                            askadeFileTypeWizardStepColumnGuideManager.removeInstance(guide);
                        }

                        LocalStorageUtility.deleteAkWizardStepColumn(columnId, stepId);
                        LocalStorageUtility.deletePersonAskadeColumnAnswerTemplate(columnId, askadeIdDelete);
                        askadeFileTypeWizardStepColumnManager.removeInstance(col);
                    }

                    LocalStorageUtility.deleteAskadeWizardStep(stepId);
                    askadeFileTypeWizardStepManager.removeInstance(akwStep);
                }

                var allAttachTemplate = personAskadeFileTypeWizardAttachmentTemplateManager.getAllPersonAskadeFileTypeWizardAttachmentTemplate(pAkTemplate.Id);

                for (var l = 0; l < allAttachTemplate.length; l++) {
                    var attachTemp = allAttachTemplate[l];
                    personAskadeFileTypeWizardAttachmentTemplateManager.removeInstance(attachTemp);
                }

                var personAkTemplateEntity = personAskadeFileTypeWizardTemplateManager.getPersonAskadeFileTypeWizardTemplate(askadeIdDelete);
                personAskadeFileTypeWizardTemplateManager.removeInstance(personAkTemplateEntity);
                LocalStorageUtility.deleteAskadeWizard(askadeIdDelete);
                LocalStorageUtility.deletePersonAskadeAttachmentTemplate(askadeIdDelete);
                LocalStorageUtility.deletePersonAskadeTemplate(askadeIdDelete);
                var personAskadeWizs = LocalStorageUtility.getPersonAskadeFileTypeWizardByFileTypeId(askadeIdDelete);

                for (var wiz = 0; wiz < personAskadeWizs.length; wiz++) {
                    var pAskadeWizard = personAskadeWizs[wiz];
                    LocalStorageUtility.deletePersonAskadeWizard(pAskadeWizard.Id);
                }

                askadeFileTypeWizardManager.removeInstance(akWizard);
                LocalStorageUtility.deleteAllUsersPersonAskadeFileTypeWizardTemplate(askadeIdDelete);
            } // Clearing complete Askade related pool


            askadeFileTypeWizardManager.resetPoolAskade();
            var savePromise = LocalStorageUtility.saveOfflineDb();
            savePromise.promise.then(function () {
                def.resolve();
            });
            return def.promise;
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = personAskadeFileTypeWizardManagerScope;
    return personAskadeFileTypeWizardManagerScope;
}]); //----------------------------------PersonAskadeColumnGuideAnswer------------------------------------------

app.factory('personAskadeColumnGuideAnswerManager', ['PersonAskadeColumnGuideAnswer', 'LocalStorageUtility', function (PersonAskadeColumnGuideAnswer, LocalStorageUtility) {
    var personAskadeColumnGuideAnswerManagerScope = {
        _pool: {},
        executeFunctionByName: function executeFunctionByName(functionName, params) {
            return service[functionName].apply(this, params);
        },
        _retrieveInstance: function _retrieveInstance(personAskadeColumnGuideId, personAskadeColumnGuideData) {
            var instance = this._pool[personAskadeColumnGuideId];

            if (instance) {
                instance.setData(personAskadeColumnGuideData);
            } else {
                instance = new PersonAskadeColumnGuideAnswer();
                instance.setData(personAskadeColumnGuideData);
                this._pool[personAskadeColumnGuideId] = instance;
            }

            return instance;
        },
        _search: function _search(personAskadeColumnGuideId) {
            return this._pool[personAskadeColumnGuideId];
        },
        _load: function _load(personAskadeColumnGuideId, personAskadeColumnGuideData) {
            return this._retrieveInstance(personAskadeColumnGuideId, personAskadeColumnGuideData);
        },
        loadPAkColumnGuideByFileColumnId: function loadPAkColumnGuideByFileColumnId(fileColumnId, fileTypeId) {
            var pAkColumnGuides = LocalStorageUtility.getAllAskadeFileTypeWizardStepColumnsGuide(fileColumnId, fileTypeId);
            var pGuideList = [];

            for (var i = 0; i < pAkColumnGuides.length; i++) {
                var columnGuide = pAkColumnGuides[i];

                var guide = this._load(columnGuide.Id, columnGuide);

                pGuideList.push(guide);
            }

            return pGuideList;
        },
        addGuideAnswerFromColumnAnswer: function addGuideAnswerFromColumnAnswer(columnAnswerText, pGuideList) {
            if (columnAnswerText.indexOf('—') === -1) {
                return;
            } else {
                var guideAnswer = [];
                guideAnswer = columnAnswerText.split('—');

                for (var i = 0; i < pGuideList.length; i++) {
                    var guide = pGuideList[i];

                    for (var j = 0; j < guideAnswer.length; j++) {
                        var guideVal = guideAnswer[j].split("–");
                        var guideText = guideVal[0];
                        var guideId = guideVal[1];

                        if (guideId === guide.GuideId) {
                            guide.AnswerText = guideText;
                        }
                    }
                }
            }
        },
        getColumnGuideByFileColumn: function getColumnGuideByFileColumn(fileColumnId, fileTypeId) {
            return this.loadPAkColumnGuideByFileColumnId(fileColumnId, fileTypeId);
        },
        refreshPool: function refreshPool(oldEntity, newEntitySource) {
            var key = oldEntity.GuideId;
            var newKey = newEntitySource.GuideId;
            var pool = this._pool;
            delete pool[key];
            return this._load(newKey, newEntitySource);
        },
        removeInstance: function removeInstance(pAskadeColumnGuide) {
            var pAskadeGuideAnswerId = pAskadeColumnGuide.GuideId;
            var pool = this._pool;
            delete pool[pAskadeGuideAnswerId];
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    var service = personAskadeColumnGuideAnswerManagerScope;
    return personAskadeColumnGuideAnswerManagerScope;
}]); // drop down value

app.factory('dropdownValueManager', ['LocalStorageHelper', 'DropDownValue', '$q', 'LocalStorageUtility', 'userDetailsManager', 'userApplicationsManager', function (LocalStorageHelper, DropDownValue, $q, LocalStorageUtility, userDetailsManager, userApplicationsManager) {
    var dropdownValueManager = {
        _prefixConstant: '_',
        _pool: {},
        _retrieveInstance: function _retrieveInstance(dropDownId, dropDownData) {
            var instance = this._pool[this._prefixConstant + dropDownId];

            if (instance) {
                instance.setData(dropDownData);
            } else {
                instance = new DropDownValue();
                instance.setData(dropDownData);
                this._pool[this._prefixConstant + dropDownId] = instance;
            }

            return instance;
        },
        _search: function _search(dropDownId) {
            return this._pool[this._prefixConstant + dropDownId];
        },
        _load: function _load(dropDownId, dropDownData) {
            return this._retrieveInstance(dropDownId, dropDownData);
        },
        filterBasedOnTabNameAskade: function filterBasedOnTabNameAskade(tableType, dropDownType, dropDownData, columnSubType) {
            // Filtering new data downloaded before displaying it to user.
            // An empty array defined to add filtered data for the display
            var newDropDownArray = [];

            switch (tableType) {
                case 'Person':
                    // Filtering based on Column sub type
                    if (columnSubType) {
                        switch (columnSubType) {
                            case 'User':
                                for (var i = 0; i < dropDownData.length; i++) {
                                    var data = dropDownData[i];

                                    if (data.IsFileUser === true) {
                                        newDropDownArray.push(data);
                                    }
                                }

                                return newDropDownArray;

                            case 'All':
                                return dropDownData;

                            default:
                                return dropDownData;
                        }
                    } else {
                        for (var i = 0; i < dropDownData.length; i++) {
                            var data = dropDownData[i];

                            if (data.IsFile === true) {
                                newDropDownArray.push(data);
                            }
                        }
                    }

                    break;

                case 'Department':
                    newDropDownArray = dropDownData;
                    break;

                case 'Asset':
                    if (columnSubType) {
                        for (var i = 0; i < dropDownData.length; i++) {
                            var item = dropDownData[i];

                            if (item.Filter === columnSubType) {
                                newDropDownArray.push(item);
                            }
                        }
                    } else {
                        newDropDownArray = dropDownData;
                    }

                    break;
                case 'Chemical':
                    if (columnSubType) {
                        for (var i = 0; i < dropDownData.length; i++) {
                            var item = dropDownData[i];

                            if (item.Filter === columnSubType) {
                                newDropDownArray.push(item);
                            }
                        }
                    } else {
                        newDropDownArray = dropDownData;
                    }
                    break;
                default:
                    break;
            }

            return newDropDownArray;
        },
        filterBasedOnTabNameActionPlan: function filterBasedOnTabNameActionPlan(tableType, dropDownType, dropDownData, moduleName) {
            // Filtering new data downloaded before displaying it to user.
            var userDetail = userDetailsManager.getUserLastLoggedTimeStamp();
            var userApplication = userApplicationsManager.getUserApplicationByText(userDetail.UserId, moduleName);
            var userId = userDetail.UserId;
            var applicationId = userApplication.ID; // An empty array defined to add filtered data for the display

            var newDropDownArray = [];

            switch (tableType) {
                case 'Person':
                    var includeSubDepartments = LocalStorageUtility.isIncludeSubDepartment(userId, applicationId);

                    for (var i = 0; i < dropDownData.length; i++) {
                        var data = dropDownData[i];
                        var dropDownList = [];
                        var reponsiblePersonsColumnTypes = ['AssignedTo', 'ShortTermSolutionResponsible', 'LongTermSolutionResponsible', 'FollowUpSolutionResponsible'];

                        if (dropDownType === "Owner") {
                            if (data.IsOwner === true) {
                                newDropDownArray.push(data);
                            }
                        } else if (reponsiblePersonsColumnTypes.indexOf(dropDownType) >= 0) {
                            if (data.IsResponsible === true) {
                                newDropDownArray.push(data);
                            }
                        } else {
                            if (includeSubDepartments === false) {
                                if (data.IsSubEntity === false) {
                                    newDropDownArray.push(data);
                                }
                            } else {
                                newDropDownArray.push(data);
                            }
                        }
                    }

                    break;

                case 'Department':
                    newDropDownArray = this.departmentDropDownFilter(userId, applicationId, dropDownData);
                    break;

                case 'Chemical':
                case 'Asset':
                    // Todo need to check anything else apart from this
                    newDropDownArray = dropDownData;

                default:
                    break;
            }

            return newDropDownArray;
        },
        filterBasedOnTabNameQuestionnaire: function filterBasedOnTabNameQuestionnaire(tableType, dropDownType, dropDownData, moduleName) {
            // Filtering new data downloaded before displaying it to user.
            var userDetail = userDetailsManager.getUserLastLoggedTimeStamp();
            var userApplication = userApplicationsManager.getUserApplicationByText(userDetail.UserId, moduleName);
            var userId = userDetail.UserId;
            var applicationId = userApplication.ID; // An empty array defined to add filtered data for the display

            var newDropDownArray = [];

            switch (tableType) {
                case 'Person':
                    var includeSubDepartments = LocalStorageUtility.isIncludeSubDepartment(userId, applicationId);

                    for (var i = 0; i < dropDownData.length; i++) {
                        var data = dropDownData[i];

                        if (data.IsPointOfView === true) {
                            if (includeSubDepartments === false) {
                                if (data.IsSubEntity === false) {
                                    newDropDownArray.push(data);
                                }
                            } else {
                                newDropDownArray.push(data);
                            }
                        } else {
                            newDropDownArray.push(data);
                        }
                    }

                    break;

                case 'Department':
                    newDropDownArray = this.departmentDropDownFilter(userId, applicationId, dropDownData);
                    break;

                case 'Chemical':
                case 'Asset':
                    // Todo need to check anything else apart from this
                    newDropDownArray = dropDownData;

                default:
                    break;
            }

            return newDropDownArray;
        },
        departmentDropDownFilter: function departmentDropDownFilter(userId, applicationId, dropDownData) {
            var newDropDownArray = [];
            var includeSubDepartments = LocalStorageUtility.isIncludeSubDepartment(userId, applicationId);

            for (var i = 0; i < dropDownData.length; i++) {
                var data = dropDownData[i];

                if (includeSubDepartments === false) {
                    if (data.IsSubEntity === false) {
                        newDropDownArray.push(data);
                    }
                } else {
                    newDropDownArray.push(data);
                }
            }

            return newDropDownArray;
        },
        filterDropDownBasedOnModule: function filterDropDownBasedOnModule(moduleName, dropDownData, tableType, dropDownType, columnSubType) {
            // Data retrieved after the search has to be filtered based on the module before displaying.
            // Based on the module and the flags as part of the data, fresh downloaded data is filtered based on module.
            switch (moduleName) {
                case 'Askade':
                case 'Claim':
                    return this.filterBasedOnTabNameAskade(tableType, dropDownType, dropDownData, columnSubType);
                    break;

                case 'ActionPlan':
                    return this.filterBasedOnTabNameActionPlan(tableType, dropDownType, dropDownData, moduleName);
                    break;

                case 'Apv':
                case 'RiskProfile':
                case 'EmployeeSatisfaction':
                case 'ManagementEvaluation':
                case 'Insurance':
                case 'HumanResource':
                case 'FrontPlanner':
                case 'DocumentLibrary':
                    return this.filterBasedOnTabNameQuestionnaire(tableType, dropDownType, dropDownData, moduleName);
                    break;

                default:
            }
        },
        getTableNameText: function getTableNameText(dropDownText, columnType, moduleName) {
            // Method is used to format the column type and retrieve table name
            // For other modules other than action plan direct replace is done, incase if it has DropDown text.
            if (moduleName.toLowerCase() === 'actionplan') {
                var tableText = '';

                switch (columnType) {
                    case "CustomerFieldValueDropDown":
                    case "RadComboBox":
                    case "DropDown":
                        tableText = dropDownText;
                        break;

                    default:
                        tableText = columnType.replace('DropDown', '');
                        break;
                }

                return tableText;
            }

            var tableName = columnType.replace('DropDown', '');
            return tableName;
        },
        insertDropDownData: function insertDropDownData(tableName, itemData) {
            // Based on the table type data is inserted into the table.
            // This method is used to insert the data which user searched when online search is enabled
            var array = [];
            array.push(itemData);

            switch (tableName) {
                case 'Person':
                    LocalStorageUtility.addPersonData(array);
                    break;

                case 'Department':
                    LocalStorageUtility.addDepartmentData(array);
                    break;

                case 'Asset':
                    LocalStorageUtility.addAssetData(tableName, array);
                    break;

                case 'Chemical':
                    LocalStorageUtility.addChemicalData(tableName, array);
                    break;

                default:
                    break;
            }
        },
        // If search filter (columnsubtype) has a value then perform online search filter
        getDropDownValueBasedOnSearchFilter: function getDropDownValueBasedOnSearchFilter(searchKeyParam, tabname, moduleName, searchText, searchFilter) {
            var def = $q.defer();

            if (searchFilter) {
                var dropDownPromise = LocalStorageHelper.getDropDownDetailsWithSearchFilter(searchKeyParam, tabname, moduleName, searchText, searchFilter);
                dropDownPromise.then(function (successResponse) {
                    def.resolve(successResponse);
                }, function (errorResponse) {
                    def.reject(errorResponse);
                });
            } else {
                var dropDownPromise = LocalStorageHelper.getDropDownDetails(searchKeyParam, tabname, moduleName, searchText);
                dropDownPromise.then(function (successResponse) {
                    def.resolve(successResponse);
                }, function (errorResponse) {
                    def.reject(errorResponse);
                });
            }

            return def.promise;
        },
        filterDropDownDataByModule: function filterDropDownDataByModule(itemList, moduleName, columnType, columnSubType) {
            // This method is used for Column Sub type filtering of data for display 
            switch (moduleName) {
                case 'Askade':
                case 'Claim':
                case "Apv":
                case "RiskProfile":
                case "EmployeeSatisfaction":
                case "ManagementEvaluation":
                case "HumanResource":
                case "FrontPlanner":
                    return this.filterDropDownData(itemList, columnType, columnSubType);

                default:
                    return itemList;
            }
        },
        // This method can be used to filter based on the column type if it has a filter enabled
        filterDropDownData: function filterDropDownData(itemList, columnType, columnSubType) {
            switch (columnType) {
                case 'Asset':
                    if (columnSubType) {
                        var filteredItemList = [];

                        for (var i = 0; i < itemList.length; i++) {
                            var item = itemList[i];

                            switch (columnSubType) {
                                case 'Building':
                                case 'MovableProperty':
                                    if (item.Filter === columnSubType || item.Filter === 'BuildingAndMovableProperty') {
                                        filteredItemList.push(item);
                                    }

                                    break;

                                case 'BuildingAndMovableProperty':
                                case 'Vehicle':
                                case 'Miscellaneous':
                                    if (item.Filter === columnSubType) {
                                        filteredItemList.push(item);
                                    }

                                    break;

                                default:
                                    // Filtering Assets based on column sub type (For unknown column subtype which might be added later)
                                    if (item.Filter === columnSubType) {
                                        filteredItemList.push(item);
                                    }

                                    break;
                            }
                        }

                        return filteredItemList;
                    }

                    return itemList;

                case 'Person':
                    if (columnSubType) {
                        var filteredItemList = [];

                        switch (columnSubType) {
                            case 'User':
                                for (var i = 0; i < itemList.length; i++) {
                                    var item = itemList[i];

                                    if (item.IsFileUser === true) {
                                        filteredItemList.push(item);
                                    }
                                }

                                return filteredItemList;

                            case 'All':
                                return itemList;

                            default:
                                return itemList;
                        }
                    }

                    return itemList;

                default:
                    return itemList;
            }
        },
        addDisplayTextToOnlineSearchData: function addDisplayTextToOnlineSearchData(onlineSearchData) {
            for (var i = 0; i < onlineSearchData.length; i++) {
                var onlineText = onlineSearchData[i];
                var displayText = this.getDeptDisplayText(onlineText.Text);
                onlineText.DisplayText = displayText;
            }

            return onlineSearchData;
        },
        // Below method trims the Department text value to a last child and its immediate parent
        getDeptDisplayText: function getDeptDisplayText(completeText) {
            // As the web api request returns '-->' and in the app it is show based on a String Char Code.
            // Therefore replacing the string
            completeText = completeText.replace(/-->/gi, String.fromCharCode(10143));
            var str = completeText;
            var indices = [];

            for (var i = 0; i < str.length; i++) {
                if (str[i] === String.fromCharCode(10143)) indices.push(i);
            }

            if (indices.length > 1) {
                var stringCutLength = this.getDeviceScreenWidth();
                var lastTwoStrings = completeText.slice(completeText.lastIndexOf(String.fromCharCode(10143), completeText.lastIndexOf(String.fromCharCode(10143)) - 1));
                var splitString = lastTwoStrings.split(String.fromCharCode(10143));
                var vala, valb; // Some times ' --> ' will be the first character of the string, so to handle this scenario
                // both in 0 and 1 position of the array split string is handled.

                if (splitString[0]) {
                    vala = splitString[0].substring(0, stringCutLength) + String.fromCharCode(10143);
                    valb = vala + splitString[1];
                } else if (splitString[1]) {
                    vala = splitString[1].substring(0, stringCutLength) + String.fromCharCode(10143);
                    valb = vala + splitString[2];
                }

                return valb;
            } else {
                return completeText;
            }
        },
        getDeviceScreenWidth: function getDeviceScreenWidth() {
            var screenWidth = screen.width;

            if (screenWidth < 360) {
                return 8;
            } else if (screenWidth > 360 && screenWidth < 500) {
                return 10;
            } else if (screenWidth > 500 && screenWidth < 750) {
                return 12;
            } else if (screenWidth > 750 && screenWidth < 1000) {
                return 14;
            } else {
                return 16;
            }
        },
        removeInstance: function removeInstance(dropdown) {
            var dropdownId = dropdown.Id;
            var pool = this._pool;
            delete pool[this._prefixConstant + dropdownId];
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    return dropdownValueManager;
}]); //------------------------------------ Language manager ----------------------------------------------

app.factory('languageManager', ['LocalStorageUtility', 'Language', function (LocalStorageUtility, Language) {
    var languageManagerScope = {
        _pool: {},
        _retrieveInstance: function _retrieveInstance(langCode, languageData) {
            var instance = this._pool[langCode];

            if (instance) {
                instance.setData(languageData);
            } else {
                instance = new Language();
                instance.setData(languageData);
                this._pool[langCode] = instance;
            }

            return instance;
        },
        _load: function _load(langCode, languageData) {
            return this._retrieveInstance(langCode, languageData);
        },
        getLanguages: function getLanguages() {
            return this._loadLanguages();
        },
        _loadLanguages: function _loadLanguages() {
            var langData = LocalStorageUtility.getLanguages();
            var langList = [];

            for (var i = 0; i < langData.length; i++) {
                var languageData = langData[i];

                var lang = this._load(languageData.languageCode, languageData);

                langList.push(lang);
            }

            return langList;
        },
        getActiveLanguages: function getActiveLanguages() {
            var langData = LocalStorageUtility.getActiveLanguages();
            var langList = [];

            for (var i = 0; i < langData.length; i++) {
                var languageData = langData[i];

                var lang = this._load(languageData.languageCode, languageData);

                langList.push(lang);
            }

            return langList;
        },
        getDefaultLanguage: function getDefaultLanguage() {
            var langData = LocalStorageUtility.getDefaultLanguage();
            return this._load(langData.languageCode, langData);
        },
        getDefaultDownloadedLanguage: function getDefaultDownloadedLanguage() {
            var langData = LocalStorageUtility.getDefaultDownloadedLanguage();
            return this._load(langData.languageCode, langData);
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    return languageManagerScope;
}]); // ---------------------------------- Document Library manager -----------------------------------

app.factory('documentLibraryManager', ['LocalStorageUtility', 'DocumentLibrary', 'FileUtil', '$q', 'DocumentLibraryUtil', '$injector', function (LocalStorageUtility, DocumentLibrary, FileUtil, $q, DocumentLibraryUtil, $injector) {
    var documentLibraryManagerScope = {
        _prefixConstant: '_',
        _pool: {},
        _retrieveInstance: function _retrieveInstance(documentId, documentLibData) {
            var instance = this._pool[this._prefixConstant + documentId];

            if (instance) {
                instance.setData(documentLibData);
            } else {
                instance = new DocumentLibrary();
                instance.setData(documentLibData);
                this._pool[this._prefixConstant + documentId] = instance;
            }

            return instance;
        },
        _load: function _load(documentId, documentLibData) {
            return this._retrieveInstance(documentId, documentLibData);
        },
        getAllDLOfTypeDocument: function getAllDLOfTypeDocument(groupName) {
            var documentList = LocalStorageUtility.getAllDLOfTypeDocument(groupName);
            var documentTypeList = [];

            for (var i = 0; i < documentList.length; i++) {
                var document = documentList[i];

                var documentVal = this._load(document.Id, document);

                documentTypeList.push(documentVal);
            }

            return documentTypeList;
        },
        getAllDLOfTypeLink: function getAllDLOfTypeLink(groupName) {
            var linkList = LocalStorageUtility.getAllDLOfTypeLink(groupName);
            var linkTypeList = [];

            for (var i = 0; i < linkList.length; i++) {
                var link = linkList[i];

                var linkVal = this._load(link.Id, link);

                linkTypeList.push(linkVal);
            }

            return linkTypeList;
        },
        getAllDLOfTypeHTML: function getAllDLOfTypeHTML(groupName) {
            var htmlList = LocalStorageUtility.getAllDLOfTypeHTML(groupName);
            var htmlTypeList = [];

            for (var i = 0; i < htmlList.length; i++) {
                var html = htmlList[i];

                var htmlVal = this._load(html.Id, html);

                htmlTypeList.push(htmlVal);
            }

            return htmlTypeList;
        },
        getDocumentById: function getDocumentById(docId) {
            var docValue = LocalStorageUtility.getDocumentById(docId);

            if (docValue) {
                return this._load(docValue.Id, docValue);
            }
        },
        getUniqueGroupName: function getUniqueGroupName() {
            var uniqueGroupNameList = LocalStorageUtility.getUniqueDocGroupName();
            return uniqueGroupNameList;
        },
        getAllDocumentList: function getAllDocumentList() {
            var docList = LocalStorageUtility.getAllDocumentList();
            var listOfDoc = [];

            for (var i = 0; i < docList.length; i++) {
                var docValue = docList[i];

                if (docValue) {
                    var docVal = this._load(docValue.Id, docValue);

                    listOfDoc.push(docVal);
                }
            }

            return listOfDoc;
        },
        getAllDocumentByGroupType: function getAllDocumentByGroupType(groupName) {
            var docGroupList = LocalStorageUtility.getAllDocumentByGroupType(groupName);
            var listOfGroupDoc = [];

            for (var i = 0; i < docGroupList.length; i++) {
                var docValue = docGroupList[i];

                if (docValue) {
                    var docVal = this._load(docValue.Id, docValue);

                    listOfGroupDoc.push(docVal);
                }
            }

            return listOfGroupDoc;
        },
        getDocumentTreeByGroup: function getDocumentTreeByGroup(groupName) {
            var parent = null;
            var docTreeView = [];
            parent = this.getTree(groupName);
            docTreeView.push(parent);
            return docTreeView;
        },
        getAllDocumentTreeStructure: function getAllDocumentTreeStructure() {
            var parent = null;
            var groupNameList = this.getUniqueGroupName();
            var docTreeView = [];
            for (var i = 0; i < groupNameList.length; i++) {
                var group = groupNameList[i];
                var groupName = group.GroupName;
                parent = this.getTree(groupName);
                docTreeView.push(parent);
            }

            return docTreeView;
        },
        getTree: function getTree(groupName) {
            var docList = this.getAllDocumentByGroupType(groupName);
            var children = [];
            var parent = {
                Name: groupName,
                IsOpen: false,
                Children: [],
                NoOfLevels: 0,
            };
            for (var j = 0; j < docList.length; j++) {
                var doc = docList[j];
                if (doc.ExtendedInfo != null) {
                    var docTreeList = doc.ExtendedInfo.split(">");

                    if (docTreeList.length != 0) {
                        if (docTreeList.length == 1) {
                            if (parent.docList != null && parent.docList.length != 0)
                                parent.docList.push(doc);
                            else parent.docList = [doc];
                        } else {
                            this.generateTreeViewForChild(
                                parent,
                                docTreeList,
                                children,
                                doc
                            );
                        }
                    } else {
                        parent = {
                            Name: groupName,
                            IsOpen: false,
                            Children: [],
                            docList: docList,
                            NoOfLevels: 0,
                        };
                    }
                } else {
                    if (parent.docList != null && parent.docList.length != 0)
                        parent.docList.push(doc);
                    else parent.docList = [doc];
                }
            }

            for (var k = 0; k < children.length; k++) {
                var child = children[k];
                if (child.ParentName == parent.Name) {
                    if (parent.Children != null && parent.Children.length > 0)
                        parent.Children.push(child);
                    else parent.Children = [child];
                } else if (parent.Children.length != 0) {
                    this.pushToChildren(parent.Children, child);
                }
            }
            return parent;
        },
        generateTreeViewForChild: function generateTreeViewForChild(
            parent,
            docTreeList,
            children,
            doc
        ) {
            var NoOfLevels = docTreeList.length - 1;
            for (var i = 1; i < docTreeList.length; i++) {
                var childName = docTreeList[i];
                var parentName = docTreeList[i - 1];
                var child = null;
                var isChildPresent = false;
                if (children.length != 0) {
                    for (var j = 0; j < children.length; j++) {
                        var ch = children[j];
                        if (ch.Name.trim() == childName.trim()) {
                            child = ch;
                            break;
                        }
                    }
                    if (child != null) {
                        isChildPresent = true;
                        if (childName == docTreeList[docTreeList.length - 1]) {
                            if (child.docList != null && child.docList.length != 0)
                                child.docList.push(doc);
                            else child.docList = [doc];
                        }
                    }
                }
                if (!isChildPresent) {
                    if (i == docTreeList.length - 1)
                        child = this.getChild(parentName, childName, doc, i);
                    else child = this.getChild(parentName, childName, null, i);
                    children.push(child);
                }
            }
            parent.NoOfLevels = NoOfLevels;
            return children;
        },
        getChild: function getChild(parentName, name, doc, level) {
            return {
                Name: name.trim(),
                ParentName: parentName.trim(),
                IsOpen: false,
                Children: [],
                docList: [doc],
                level: level,
            };
        },
        pushToChildren: function pushToChildren(children, child) {
            for (var i = 0; i < children.length; i++) {
                var parentChild = children[i];
                if (parentChild.Name == child.ParentName) {
                    if (parentChild.Children != null && parentChild.Children.length > 0)
                        parentChild.Children.push(child);
                    else parentChild.Children = [child];
                } else if (parentChild.Children.length != 0) {
                    this.pushToChildren(parentChild.Children, child);
                }
            }
        },
        updateDownloadDocumentLibrary: function updateDownloadDocumentLibrary(docDataList) {
            var defDownProm = $q.defer();
            var thisReference = this;
            var checkSubDirectoryExists = false;
            var subDirName = 'DocumentLibrary'; // Check if Document library folder is created
            var dirExistProm = FileUtil.checkDirectoryExists(subDirName);
            var filteredList = docDataList.filter(docItem => docItem.LinkName && docItem.LinkName.length > 0 && docItem.Link && docItem.Link.length > 0);

            dirExistProm.then(function (success) {
                var saveProm = thisReference.saveToDatabase(docDataList, subDirName);
                saveProm.then(function (success) {
                    defDownProm.resolve(filteredList);
                });
            }, function (fail) {
                // If not created, create a folder
                var dirCreateProm = FileUtil.createSubDirectory(subDirName);
                dirCreateProm.then(function (success) {
                    var saveProm = thisReference.saveToDatabase(docDataList, subDirName);
                    saveProm.then(function (success) {
                        defDownProm.resolve(filteredList);
                    });
                });
            });
            return defDownProm.promise;
        },
        saveToDatabase: function saveToDatabase(docDataList, subDirName) {
            var def = $q.defer(); // Storing the downloaded ids in a array

            var docIdsList = [];
            var docDeleteFilePath = [];
            var docFileDeleteCount = 0;
            var thisRef = this;
            var docCounter = 0;
            var dataRetrievedListPromise = DocumentLibraryUtil.checkIfDLFileSaveLocally(docDataList, subDirName);
            dataRetrievedListPromise.then(function (successList) {
                var dataRetrievedList = successList;
                for (var i = 0; i < dataRetrievedList.length; i++) {
                    var dataRetrieved = dataRetrievedList[i];
                    var docDataValue = dataRetrieved.data;

                    if (docDataValue.HtmlContent) {
                        var encodedHTML = DocumentLibraryUtil.encodeHTMLString(docDataValue.HtmlContent);
                        docDataValue.HtmlContent = encodedHTML;
                    }

                    var docId = docDataValue.Id;
                    var docValue = LocalStorageUtility.getDocumentById(docId);

                    if (docValue) {
                        if (docValue.documentTypeCode === 'File') {
                            if (docDataValue.DocumentTypeCode === 'Link') {
                                docDeleteFilePath.push(docValue.deviceFilePath);
                            }
                        }
                    }

                    LocalStorageUtility.addDocumentLibraryData(docDataValue, dataRetrieved.filePath, dataRetrieved.sortOrder);
                    docIdsList.push(docDataValue.Id);
                }

                var savePromise = LocalStorageUtility.saveOfflineDb();
                savePromise.promise.then(function (success) {
                    var fileDeleteProm = thisRef.deleteSavedFile(docDeleteFilePath);
                    fileDeleteProm.then(function () {
                        var docIdsForDelete = LocalStorageUtility.getDocIdsForDelete(docIdsList);
                        for (var j = 0; j < docIdsForDelete.length; j++) {
                            var docDataDelete = docIdsForDelete[j];
                            var favoritesManager = $injector.get('favoritesManager');
                            favoritesManager.deleteFavForDocumentLibrary(docDataDelete.Id);
                            var delProm = thisRef.deleteDocumentById(docDataDelete.Id);
                            delProm.then(function (success) {
                                // A doc entry is deleted
                                docCounter += 1;
                                if (docCounter === docIdsForDelete.length) {
                                    var savePromise = LocalStorageUtility.saveOfflineDb();
                                    savePromise.promise.then(function (success) {
                                        def.resolve(true);
                                    }, function () {
                                        def.reject(false);
                                    });
                                }
                            }, function (error) {
                                docCounter += 1; // Need to clarify
                            });
                        } // Nothing to delete from the table

                        if (docIdsForDelete.length === 0) {
                            def.resolve(true);
                        }
                    });
                });
            }, function (error) {
                def.reject(false);
                console.log(error);
            });
            return def.promise;
        },
        deleteSavedFile: function deleteSavedFile(docFileDeleteList) {
            var delProm = $q.defer();
            var delCount = 0;

            if (docFileDeleteList.length !== 0) {
                for (var i = 0; i < docFileDeleteList.length; i++) {
                    var path = docFileDeleteList[i];
                    var deletePromise = this.deleteSingleDocumentFileRef(path);
                    deletePromise.then(function (success) {
                        delCount += 1;

                        if (delCount === docFileDeleteList.length) {
                            delProm.resolve(true);
                        }
                    }, function (fail) {
                        // Incrementing the count in fail scenario also, because if a file is not deleted it does not cause the error in app
                        delCount += 1;

                        if (delCount === docFileDeleteList.length) {
                            delProm.resolve(true);
                        }
                    });
                }
            } else {
                delProm.resolve(true);
            }

            return delProm.promise;
        },
        // Passing the index value, actual list when removeDocumentLibrary method called and promise instance
        // Here promise instance is passed as the  deletion of the documents is completed promise can be resolved
        deleteDocumentById: function deleteDocumentById(docId, indexVal, docList, defMainRemoveProm) {
            var deletePromise = $q.defer();
            var docData = this.getDocumentById(docId);
            var thisRef = this; // Check if the file is of type File --> if file, delete the saved document

            var docType = docData.DocumentTypeCode;

            if (docType === 'File') {
                var filePath = docData.DeviceFilePath;
                var fileDeletePromise = this.deleteSingleDocumentFileRef(filePath);
                fileDeletePromise.then(function (success) {
                    var deleteProm = thisRef.deleteDocumentReference(docData);
                    deleteProm.then(function (success) {
                        deletePromise.resolve(true);
                    }, function (error) {
                        deletePromise.reject(false);
                    });
                }, function (error) {
                    // Error file not deleted
                    var delProm = thisRef.deleteDocumentReference(docData);
                    delProm.then(function (success) {
                        deletePromise.resolve(true);
                    }, function (error) {
                        deletePromise.reject(false);
                    });
                });
            } else {
                var deleteProm = this.deleteDocumentReference(docData);
                deleteProm.then(function () {
                    deletePromise.resolve(true);
                }, function (error) {
                    deletePromise.reject(false);
                });
            }

            return deletePromise.promise;
        },
        nextDocumentData: function nextDocumentData(indexVal, docList, defMainRemoveProm) {
            // This method is called till all the documents are deleted and then the promise passed is resolved
            if (indexVal < docList.length - 1) {
                var newIndex = ++indexVal;
                this.deleteDocumentById(docList[newIndex].Id, newIndex, docList, defMainRemoveProm);
            } else {
                defMainRemoveProm.resolve();
            }
        },
        // This method deletes single files from the folder path specified
        deleteSingleDocumentFileRef: function deleteSingleDocumentFileRef(filePath) {
            var def = $q.defer();
            var deleteFilePromise = FileUtil.deleteFile(filePath);
            deleteFilePromise.then(function (success) {
                def.resolve();
            }, function (error) {
                def.reject();
            });
            return def.promise;
        },
        // This method deletes the Document library folder
        deleteDocumentFileReference: function deleteDocumentFileReference() {
            var def = $q.defer();
            var subDirName = 'DocumentLibrary';
            var deleteFilePromise = FileUtil.deleteDirectory(subDirName);
            deleteFilePromise.then(function (success) {
                def.resolve();
            }, function (error) {
                def.reject();
            });
            return def.promise;
        },
        deleteDocumentReference: function deleteDocumentReference(docData) {
            var deletePromise = $q.defer(); // Deleteing the reference from DB and from pool

            LocalStorageUtility.deleteDocumentById(docData.Id);
            this.removeInstance(docData); // Save to database

            var savePromise = LocalStorageUtility.saveOfflineDb();
            savePromise.promise.then(function (success) {
                deletePromise.resolve(true);
            }, function () {
                deletePromise.reject(false);
            });
            return deletePromise.promise;
        },
        removeDocumentLibrary: function removeDocumentLibrary() {
            var defMainRemoveProm = $q.defer();
            var dirDelProm = this.deleteDocumentFileReference();
            dirDelProm.then(function (success) {
                LocalStorageUtility.deleteDocumentCollection();
                defMainRemoveProm.resolve();
            }, function (fail) {
                // Adding the below code in fail scenario also, because even when documents are not deleted data should be deleted from the DB
                LocalStorageUtility.deleteDocumentCollection();
                defMainRemoveProm.resolve();
            });
            return defMainRemoveProm.promise;
        },
        removeInstance: function removeInstance(docData) {
            var docId = docData.Id;
            var pool = this._pool;
            delete pool[this._prefixConstant + docId];
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    return documentLibraryManagerScope;
}]);
app.factory('newsManager', ['News', 'LocalStorageUtility', '$q', 'FileUtil', 'DocumentLibraryUtil', 'newsFileManager', 'DateUtil', function (News, LocalStorageUtility, $q, FileUtil, DocumentLibraryUtil, newsFileManager, DateUtil) {
    var newsManagerService = {
        _prefixConstant: '_',
        _pool: {},
        _retrieveInstance: function _retrieveInstance(newsId, newsData) {
            var instance = this._pool[this._prefixConstant + newsId];

            if (instance) {
                instance.setData(newsData);
            } else {
                instance = new News();
                instance.setData(newsData);
                this._pool[this._prefixConstant + newsId] = instance;
            }

            return instance;
        },
        _load: function _load(newsId, newsData) {
            return this._retrieveInstance(newsId, newsData);
        },
        getNewsById: function getNewsById(newsId) {
            var newsData = null;
            var newsValue = LocalStorageUtility.getNewsById(newsId);

            if (newsValue) {
                newsData = this._load(newsValue.Id, newsValue);
                newsData.Files = newsFileManager.getAllNewsFilesByNewsId(newsValue.Id);
            }

            return newsData;
        },
        getAllNewsList: function getAllNewsList() {
            var newsValue = LocalStorageUtility.getAllNewsList();
            var newList = [];

            if (newsValue.length > 0) {
                for (var i = 0; i < newsValue.length; i++) {
                    var news = this._load(newsValue[i].Id, newsValue[i]);

                    news.Files = newsFileManager.getAllNewsFilesByNewsId(newsValue[i].Id);
                    newList.push(news);
                }
            }

            return newList;
        },
        getAllNewsListWhichAreRead: function getAllNewsListWhichAreRead() {
            var newsValue = LocalStorageUtility.getAllReadNewsList();
            var newList = [];

            if (newsValue.length > 0) {
                for (var i = 0; i < newsValue.length; i++) {
                    var news = this._load(newsValue[i].Id, newsValue[i]);

                    news.Files = newsFileManager.getAllNewsFilesByNewsId(newsValue[i].Id);
                    newList.push(news);
                }
            }

            return newList;
        },
        updateNews: function updateNews(newsData) {
            var defDownProm = $q.defer();
            var thisReference = this;
            var checkSubDirectoryExists = false;
            var subDirName = 'News'; // Check if News folder is created

            if (newsData.length !== 0) {
                var dirExistProm = FileUtil.checkDirectoryExists(subDirName);
                dirExistProm.then(function (success) {
                    var saveProm = thisReference.saveToDatabase(newsData, subDirName);
                    saveProm.then(function (success) {
                        defDownProm.resolve();
                    });
                }, function (fail) {
                    // If not created, create a folder
                    var dirCreateProm = FileUtil.createSubDirectory(subDirName);
                    dirCreateProm.then(function (success) {
                        var saveProm = thisReference.saveToDatabase(newsData, subDirName);
                        saveProm.then(function (success) {
                            defDownProm.resolve();
                        });
                    });
                });
            } else {
                thisReference.deleteAllNewsOnReset();
                defDownProm.resolve();
            }

            return defDownProm.promise;
        },
        saveToDatabase: function saveToDatabase(newsDataList, subDirName) {
            var def = $q.defer(); // Storing the downloaded ids in a array

            var newsIdsList = [];
            var thisRef = this;
            var newsCounter = 0;

            for (var i = 0; i < newsDataList.length; i++) {
                var newsDataValue = newsDataList[i];

                if (newsDataValue.HtmlContent) {
                    var encodedHTML = DocumentLibraryUtil.encodeHTMLString(newsDataValue.HtmlContent);
                    newsDataValue.HtmlContent = encodedHTML;
                }

                var newsId = newsDataValue.Id;
                var newsValue = LocalStorageUtility.getNewsById(newsId); // Below variable will have value only when user clicks on manual reset from the app

                //var tempNews = LocalStorageUtility.getTempNewsById(newsId);
                var isRead = false;

                if (newsValue) {
                    if (newsValue.modifiedDate < newsDataValue.ModifiedDate) {
                        isRead = false;
                    } else if (newsValue.isRead) {
                        isRead = true;
                    }
                }

                //if (tempNews) {
                //  isRead = tempNews.isRead;

                //  if (tempNews.modifiedDate < newsDataValue.ModifiedDate) {
                //    isRead = false;
                //  }
                //}

                var expiredDate = newsDataValue.ExpiryDate;
                var currDate = new Date();

                if (expiredDate) {
                    var currentDateVal = DateUtil.getFormattedValue(currDate, 'date');
                    var currentDateStamp = DateUtil.getTimeStamp(currentDateVal);
                    var expiredDateSamp = DateUtil.getTimeStamp(expiredDate);

                    if (!(currentDateStamp >= expiredDateSamp)) {
                        var promise = this._addNewsData(newsDataValue, isRead, subDirName);

                        promise.then(function (idSuccess) {
                            newsIdsList.push(idSuccess);
                            newsCounter += 1;

                            if (newsDataList.length === newsCounter) {
                                thisRef._afterInsertSave(newsIdsList, def);
                            }
                        });
                    } else {
                        // Here incrementing the counter value, so that promise is executed by satisying the if condition.
                        // When the code comes to the else part only counter is incremented and the corresponding 
                        // news list will be deleted later as the condition is not satified
                        newsCounter += 1;
                    }
                } else {
                    var promise = this._addNewsData(newsDataValue, isRead, subDirName);

                    promise.then(function (idSuccess) {
                        newsIdsList.push(idSuccess);
                        newsCounter += 1;

                        if (newsDataList.length === newsCounter) {
                            thisRef._afterInsertSave(newsIdsList, def);
                        }
                    });
                }
            }

            return def.promise;
        },
        _afterInsertSave: function _afterInsertSave(newsIdsList, def) {
            var thisRef = this;
            var newsCounter = 0;
            var savePromise = LocalStorageUtility.saveOfflineDb();
            savePromise.promise.then(function (success) {
                // Deleting all the data from the temp news table once data is added back to the main table
                LocalStorageUtility.deleteAllTempNews();
                var newsIdsForDelete = LocalStorageUtility.getNewsIdsForDelete(newsIdsList);

                for (var j = 0; j < newsIdsForDelete.length; j++) {
                    var newsDataDelete = newsIdsForDelete[j];
                    var delProm = thisRef.deleteNewsById(newsDataDelete.Id);
                    delProm.then(function (success) {
                        // A doc entry is deleted
                        newsCounter += 1;

                        if (newsCounter === newsIdsForDelete.length) {
                            var savePromise = LocalStorageUtility.saveOfflineDb();
                            savePromise.promise.then(function (success) {
                                def.resolve(true);
                            }, function () {
                                def.reject(false);
                            });
                        }
                    }, function (error) {
                        newsCounter += 1; // Need to clarify
                    });
                } // Nothing to delete from the table


                if (newsIdsForDelete.length === 0) {
                    def.resolve(true);
                }
            });
        },
        _addNewsData: function _addNewsData(newsDataValue, isRead, subDirName) {
            var insertProm = $q.defer();
            LocalStorageUtility.addNewsData(newsDataValue, isRead);
            var fileList = newsDataValue.Files;

            if (fileList.length !== 0) {
                //Delete all existing files when downloading for the second time
                var delProm = newsFileManager.deleteAllFilesByNewsId(newsDataValue.Id);
                delProm.then(function (success) {
                    var newsFileInsertProm = newsFileManager.insertFileData(newsDataValue.Id, fileList, subDirName);
                    newsFileInsertProm.then(function (success) {
                        insertProm.resolve(newsDataValue.Id);
                    }, function (fail) {
                        insertProm.reject(fail);
                    });
                });
            } else {
                insertProm.resolve(newsDataValue.Id);
            }

            return insertProm.promise;
        },
        getNewsByUniqueGroupName: function getNewsByUniqueGroupName() {
            var uniqueNewsGroupNameList = LocalStorageUtility.getUniqueNewsGroupName();
            return uniqueNewsGroupNameList;
        },
        getAllNewsByGroupType: function getAllNewsByGroupType(groupName) {
            var newsGroupList = LocalStorageUtility.getAllNewsByGroupType(groupName);
            var listOfGroupNews = [];

            for (var i = 0; i < newsGroupList.length; i++) {
                var newsValue = newsGroupList[i];

                if (newsValue) {
                    var newsVal = this._load(newsValue.Id, newsValue);

                    newsVal.Files = newsFileManager.getAllNewsFilesByNewsId(newsValue.Id);
                    var expiredDate = newsVal.ExpiryDate;
                    var currDate = new Date();

                    if (expiredDate) {
                        var currentDateVal = DateUtil.getFormattedValue(currDate, 'date');
                        var currentDateStamp = DateUtil.getTimeStamp(currentDateVal);
                        var expiredDateSamp = DateUtil.getTimeStamp(expiredDate);

                        if (currentDateStamp >= expiredDateSamp) {
                            this.deleteNewsById(newsVal.Id);
                        } else {
                            listOfGroupNews.push(newsVal);
                        }
                    } else {
                        listOfGroupNews.push(newsVal);
                    }
                }
            }

            return listOfGroupNews;
        },
        getUnReadNewsCount: function getUnReadNewsCount() {
            var unReadCount = LocalStorageUtility.getUnReadNewsCount();
            return unReadCount;
        },
        deleteNewsById: function deleteNewsById(newsId) {
            var deletePromise = $q.defer();
            var newsData = this.getNewsById(newsId);
            var thisRef = this; // Check if the file is of type File --> if file, delete the saved document

            var newsFiles = newsData.Files;

            if (newsFiles.length !== 0) {
                var fileDeletePromise = newsFileManager.deleteFileData(newsFiles);
                fileDeletePromise.then(function (success) {
                    var deleteProm = thisRef.deleteNewsReference(newsData);
                    deleteProm.then(function (success) {
                        deletePromise.resolve(true);
                    }, function (error) {
                        deletePromise.reject(false);
                    });
                }, function (error) {
                    // Error file not deleted
                    var delProm = thisRef.deleteNewsReference(newsData);
                    delProm.then(function (success) {
                        deletePromise.resolve(true);
                    }, function (error) {
                        deletePromise.reject(false);
                    });
                });
            } else {
                var deleteProm = this.deleteNewsReference(newsData);
                deleteProm.then(function () {
                    deletePromise.resolve(true);
                }, function (error) {
                    deletePromise.reject(false);
                });
            }

            return deletePromise.promise;
        },
        deleteNewsReference: function deleteNewsReference(newsData) {
            var deletePromise = $q.defer(); // Deleteing the reference from DB and from pool

            LocalStorageUtility.deleteNewsById(newsData.Id);
            this.removeInstance(newsData); // Save to database

            var savePromise = LocalStorageUtility.saveOfflineDb();
            savePromise.promise.then(function (success) {
                deletePromise.resolve(true);
            }, function () {
                deletePromise.reject(false);
            });
            return deletePromise.promise;
        },
        getAllReadNewsAndMoveToTemp: function getAllReadNewsAndMoveToTemp() {
            var def = $q.defer();
            var existingNews = this.getAllNewsListWhichAreRead();

            if (existingNews.length !== 0) {
                for (var i = 0; i < existingNews.length; i++) {
                    var individualNews = existingNews[i];
                    LocalStorageUtility.addTempNewsData(individualNews);
                }

                var savePromise = LocalStorageUtility.saveOfflineDb();
                savePromise.promise.then(function (success) {
                    def.resolve(true);
                }, function (fail) {
                    def.reject(false);
                });
            } else {
                def.resolve(true);
            }

            return def.promise;
        },
        deleteAllNewsOnReset: function deleteAllNewsOnReset() {
            var def = $q.defer();
            var thisRef = this;
            var delCount = 0;
            var moveReadNewsProm = this.getAllReadNewsAndMoveToTemp();
            moveReadNewsProm.then(function (success) {
                var allNews = thisRef.getAllNewsList();

                if (allNews.length !== 0) {
                    for (var i = 0; i < allNews.length; i++) {
                        var news = allNews[i];
                        var delProm = thisRef.deleteNewsById(news.Id);
                        delProm.then(function (success) {
                            delCount += 1;

                            if (delCount === allNews.length) {
                                def.resolve(true);
                            }
                        }, function () {
                            // Adding the same code as above for a scenario when physical file is not deleted.
                            // TODO:// this can be handled 
                            delCount += 1;

                            if (delCount === allNews.length) {
                                def.resolve(true);
                            }
                        });
                    }
                } else {
                    def.resolve(true);
                }
            });
            return def.promise;
        },
        markAsRead: function markAsRead(newsData) {
            LocalStorageUtility.markNewsAsRead(newsData);
        },
        removeInstance: function removeInstance(newsData) {
            var newsId = newsData.Id;
            var pool = this._pool;
            delete pool[this._prefixConstant + newsId];
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    return newsManagerService;
}]);
app.factory('newsFileManager', ['NewsFile', 'LocalStorageUtility', '$q', 'FileUtil', 'DocumentLibraryUtil', function (News, LocalStorageUtility, $q, FileUtil, DocumentLibraryUtil) {
    var newsFileManagerService = {
        _prefixConstant: '_',
        _pool: {},
        _retrieveInstance: function _retrieveInstance(newsFileId, newsFileData) {
            var instance = this._pool[this._prefixConstant + newsFileId];

            if (instance) {
                instance.setData(newsFileData);
            } else {
                instance = new News();
                instance.setData(newsFileData);
                this._pool[this._prefixConstant + newsFileId] = instance;
            }

            return instance;
        },
        _load: function _load(newsFileId, newsFileData) {
            return this._retrieveInstance(newsFileId, newsFileData);
        },
        insertFileData: function insertFileData(newsId, newsFileData, subDirName) {
            var newsFileProm = $q.defer();
            var fileCounter = 0; // Same Util is used that was used for Document Library

            var dataRetrievedListPromise = DocumentLibraryUtil.checkIfDLFileSaveLocally(newsFileData, subDirName);
            dataRetrievedListPromise.then(function (successList) {
                for (var i = 0; i < successList.length; i++) {
                    var fileData = successList[i].data;
                    var filePath = successList[i].filePath;
                    LocalStorageUtility.insertNewsFileData(newsId, fileData, filePath);
                    fileCounter += 1;
                }

                if (newsFileData.length === fileCounter) {
                    newsFileProm.resolve(true);
                }
            }, function (fail) {
                //fileCounter + 1;
                //if (newsFileData.length === fileCounter) {
                newsFileProm.reject(false); //}
            });
            return newsFileProm.promise;
        },
        getAllNewsFilesByNewsId: function getAllNewsFilesByNewsId(newsId) {
            var fileList = LocalStorageUtility.getAllNewsFileByNewsId(newsId);
            var fileArray = [];

            for (var i = 0; i < fileList.length; i++) {
                var file = fileList[i];
                fileArray.push(this._load(file.Id, file));
            }

            return fileArray;
        },
        deleteAllFilesByNewsId: function deleteAllFilesByNewsId(newsId) {
            var fileList = this.getAllNewsFilesByNewsId(newsId);
            var deleteProm = this.deleteFileData(fileList);
            return deleteProm;
        },
        deleteFileData: function deleteFileData(fileList) {
            var deleteFileProm = $q.defer();
            var fileCounter = 0;

            if (fileList.length === 0) {
                deleteFileProm.resolve(true);
            }

            for (var i = 0; i < fileList.length; i++) {
                var file = fileList[i];
                var filePath = file.DeviceFilePath;
                this.deleteFileRefFromDB(file);
                var fileDeletePromise = this.deleteFileRef(filePath);
                fileDeletePromise.then(function (success) {
                    fileCounter += 1;

                    if (fileList.length === fileCounter) {
                        deleteFileProm.resolve(true);
                    }
                }, function (error) {
                    // Error file not deleted
                    fileCounter += 1;

                    if (fileList.length === fileCounter) {
                        deleteFileProm.resolve(true);
                    }
                });
            }

            return deleteFileProm.promise;
        },
        deleteFileRefFromDB: function deleteFileRefFromDB(file) {
            LocalStorageUtility.deleteNewsFileById(file);
            this.removeInstance(file);
        },
        // This method deletes single files from the folder path specified
        deleteFileRef: function deleteFileRef(filePath) {
            var def = $q.defer();
            var deleteFilePromise = FileUtil.deleteFile(filePath);
            deleteFilePromise.then(function (success) {
                def.resolve();
            }, function (error) {
                def.reject();
            });
            return def.promise;
        },
        removeInstance: function removeInstance(newsFileData) {
            var newsFileId = newsFileData.Id;
            var pool = this._pool;
            delete pool[this._prefixConstant + newsFileId];
        },
        reset: function reset() {
            this._pool = {};
        }
    };
    return newsFileManagerService;
}]);


/***/ }),

/***/ "./scripts/camera-gallery.js":
/*!***********************************!*\
  !*** ./scripts/camera-gallery.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var app = angular.module("Camera-Gallery", []);
app.factory("$exceptionHandler",  ['$injector', function($injector) {
  return function (exception, cause) {
      var localStorageUtility = $injector.get('LocalStorageUtility')
      localStorageUtility.addExceptionToLogTable(exception,cause);
      var rScope = $injector.get('$rootScope');
      rScope.$broadcast('exceptionRefresh', exception, cause);
  };
 }]);
 
 app.factory("PictureUtil", [
  "$cordovaCamera",
  "$rootScope",
  "customersManager",
  "$q",
  "$cordovaFile",
  function ($cordovaCamera, $rootScope, customersManager, $q, $cordovaFile) {
    // Take picture (CAMERA/GALLERY)
    var scopesNew = {
      processImagePromise: function processImagePromise(
        pictureSource,
        deferedPromise
      ) {
        var customerConfig = customersManager.getCustomers();
        var cameraImageQuality = customerConfig.CameraImageQuality;
        var isSaveToGallery = customerConfig.SaveImageToGallery;

        if (!navigator.camera) {
          deferedPromise.reject("false");
          return;
        }

        var destinationType = navigator.camera.DestinationType.FILE_URI;
        var options = {
          quality: cameraImageQuality,
          destinationType: destinationType,
          sourceType: pictureSource,
          correctOrientation: true,
          saveToPhotoAlbum: isSaveToGallery,
        };
        var cameraPromise = $cordovaCamera.getPicture(options);
        var currRef = this;
        cameraPromise.then(function (imageUri) {
          //Based on the platform change the directory path and move the file to a persistent location
          var fileMovePromise = currRef.getPlatformSetting(imageUri);
          fileMovePromise.then(
            function (imagePath) {
              //On Success return the file path and call $cordovaCamera.cleanup
              deferedPromise.resolve(imagePath);
              $cordovaCamera.cleanup();
            },
            function (fail) {
              deferedPromise.reject("false");
              $cordovaCamera.cleanup();
            }
          );
        });
        return deferedPromise;
      },
      processSelectedImage: function processSelectedImage(deferedPromise) {
        var options = {
          maximumImagesCount: 1,
          quality: 65,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        };
        var currRef = this;
        $cordovaCamera.getPicture(options).then(
          function (results) {
            var fileMovePromise = currRef.getPlatformSetting(results);
            fileMovePromise.then(
              function (imagePath) {
                deferedPromise.resolve(imagePath); //On Success return the file path and call $cordovaCamera.cleanup
                $cordovaCamera.cleanup();
              },
              function (fail) {
                deferedPromise.reject("false");
                $cordovaCamera.cleanup();
              }
            );
          },
          function (error) {
            console.log(error);
          }
        );
        return deferedPromise;
      },
      processImage: function processImage(pictureSource, data) {
        //If no camera then return.
        console.log(navigator.camera);

        if (!navigator.camera) {
          deferedPromise.reject("false");
          return;
        }

        var destinationType = navigator.camera.DestinationType.FILE_URI;
        var options = {
          quality: 50,
          destinationType: destinationType,
          sourceType: pictureSource,
          encodingType: Camera.EncodingType.PNG,
        };
        $cordovaCamera.getPicture(options).then(
          function (imageUri) {
            $rootScope.$emit("Picture", {
              ImageUrl: imageUri,
              data: data,
            });
            $cordovaCamera.cleanup();
            return imageUri;
          },
          function (err) {
            alert(err);
          },
          options
        );
      },
      takePicture: function takePicture(data) {
        return this.processImage(Camera.PictureSourceType.CAMERA, data);
      },
      selectGalleryImages: function selectGalleryImages(data) {
        return this.processImage(Camera.PictureSourceType.PHOTOLIBRARY, data);
      },
      takePicturePromise: function takePicturePromise(deferedPromise) {
        var prom = this.processImagePromise(
          Camera.PictureSourceType.CAMERA,
          deferedPromise
        );
        return prom;
      },
      selectGalleryImagesPromise: function selectGalleryImagesPromise(
        deferedPromise
      ) {
        return this.processSelectedImage(deferedPromise);
      },
      // Check if the image exists
      isImageExists: function isImageExists(entity) {
        var deferred = $q.defer();
        var image = new Image();

        image.onerror = function () {
          deferred.reject(entity);
        };

        image.onload = function () {
          deferred.resolve(entity);
        };

        image.src =
          entity.FileLocation != null ? entity.FileLocation : entity.FilePath;
        return deferred.promise;
      },
      // Based on the platform add the cordova.file.* [Location name - from cordova file documentation] for each platform
      getPlatformSetting: function getPlatformSetting(imageUri) {
        var def = $q.defer();
        var directoryToPath = ""; // Get the current file name

        var fileName = imageUri.replace(/^.*[\\\/]/, ""); // Get the current file location address

        var directoryFromPath = imageUri.replace(fileName, ""); // Check for the platform

        var isIPad = ionic.Platform.isIPad();
        var isIOS = ionic.Platform.isIOS();
        var isAndroid = ionic.Platform.isAndroid();
        var isWindowsPhone = ionic.Platform.isWindowsPhone(); // If IPad or IOS

        if (isIPad || isIOS) {
          directoryToPath = cordova.file.dataDirectory + "ImageFiles/";
          this.moveImageFile(def, directoryFromPath, directoryToPath, imageUri);
        } else if (isAndroid) {
          // If Android
          directoryToPath = cordova.file.externalDataDirectory + "ImageFiles/";

          var currentName = imageUri.replace(/^.*[\\\/]/, "");
          var imageType = currentName.substr(
            (~-currentName.lastIndexOf(".") >>> 0) + 2
          ); //Create a new name for the photo

          var d = new Date(),
          n = d.getTime(),
          newName = n + "." + imageType; //Move the file to permanent storage

          var sourceFilePath = imageUri;
          if(imageUri.indexOf('file')< 0){
            var sourceFilePath = 'file:///'+directoryFromPath + currentName;
          }
          var destinationFilePath = directoryToPath + newName;
          var destinationDirectoryPath = directoryToPath;

          // Access the file system
          window.resolveLocalFileSystemURL(sourceFilePath, function(fileEntry) {
              // Check if the destination directory exists
              window.resolveLocalFileSystemURL(destinationDirectoryPath, function(destinationDirEntry) {
                  copyFileToDestination(fileEntry, destinationFilePath);
              }, function(error) {
                  // Destination directory doesn't exist, create it
                  window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function(directoryEntry) {
                      directoryEntry.getDirectory('ImageFiles', { create: true }, function(newDirEntry) {
                          copyFileToDestination(fileEntry, destinationFilePath);
                      }, function(error) {
                          console.error('Error creating directory:', error);
                      });
                  }, function(error) {
                      console.error('Error resolving base directory:', error);
                  });
              });
          }, function(error) {
              console.error('Error resolving source file:', error);
          });

          // Function to copy file to destination
          function copyFileToDestination(fileEntry, destinationPath) {
              var fileName = destinationPath.substr(destinationPath.lastIndexOf('/') + 1);
              window.resolveLocalFileSystemURL(destinationPath.substring(0, destinationPath.lastIndexOf('/')), function(directoryEntry) {
                fileEntry.copyTo(directoryEntry, fileName, function(newFileEntry) {
                    console.log('File written successfully:', newFileEntry.toInternalURL());
                    def.resolve(destinationPath);
                }, function(error) {
                    console.error('Error writing file:', error);
                    def.reject();
                });
              }, function(error) {
                console.error('Error resolving destination directory:', error);
                def.reject();
              });
          }
        } else if (isWindowsPhone) {
          //TODO: needs to be handled
        }

        return def.promise;
      },
      moveImageFile: function moveImageFile(def, from, to, imageUri) {
        // current file name
        var currentName = imageUri.replace(/^.*[\\\/]/, "");
        var imageType = currentName.substr(
          (~-currentName.lastIndexOf(".") >>> 0) + 2
        ); //Create a new name for the photo

        var d = new Date(),
          n = d.getTime(),
          newName = n + "." + imageType; //Move the file to permanent storage
        $cordovaFile.moveFile(from, currentName, to, newName).then(
          function (success) {
            //On success the file is moved to a new location
            var fileName = newName;
            def.resolve(to + fileName);
          },
          function (error) {
            //an error occured
            console.log(error);
            def.reject();
          }
        );
      },
    };
    return scopesNew;
  },
]);



/***/ }),

/***/ "./scripts/common.js":
/*!***************************!*\
  !*** ./scripts/common.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    var app = angular.module('commonUtils', ['angularMoment']);
    app.factory("$exceptionHandler", ['$injector', function ($injector) {
        return function (exception, cause) {
            var localStorageUtility = $injector.get('LocalStorageUtility')
            localStorageUtility.addExceptionToLogTable(exception, cause);
            var rScope = $injector.get('$rootScope');
            rScope.$broadcast('exceptionRefresh', exception, cause);
        };
    }]);
    app.factory('LoaderService', ['$ionicLoading', '$timeout', '$q', '$rootScope',
        function ($ionicLoading, $timeout, $q, $rootScope) {
            return {
                show: function show(templateVal) {
                    if (templateVal == null) {
                        templateVal = $rootScope.getResourceText('LIT_LOADING');
                    }

                    $ionicLoading.show({
                        animation: 'fade-in',
                        showBackdrop: true,
                        minWidth: 200,
                        showDelay: false,
                        template: "<button class='button button-clear loaderCloseBtn' style='line-height: normal; min-height: 0; min-width: 0;' ng-click='closeLoader()'><i class='" + $rootScope.getIconValue('CloseCircled') + "'></i></button>" + templateVal
                    });
                },
                hide: function hide() {
                    var def = $q.defer();
                    $timeout(function () {
                        $ionicLoading.hide();
                        def.resolve(true);
                    }, 300);
                    return def.promise;
                }
            };
        }]);

    app.factory('AuthenticationService', ['$q', 'DeviceUtil', function ($q, DeviceUtil) {
        var isAuthenticated = {
            authenticateUser: function authenticateUser() {
                // var token = window.localStorage.getItem('token');
                var promiseDeviceUtil = DeviceUtil.getKeyValueWithSharedPreferences('token');
                return promiseDeviceUtil;
            },
            logout: function logout(isPassSaveEnabled) {
                if (isPassSaveEnabled === false) {
                    DeviceUtil.removeByKeySharedPreferences('AppDetails');
                }
                DeviceUtil.removeByKeySharedPreferences('token');
            }
        }
        return isAuthenticated;
    }]);

    app.factory('EmailUtil', ["$cordovaEmailComposer", "AppMessages", function ($cordovaEmailComposer, AppMessages) {
        var emailFunction = {
            sendEmail: function sendEmail(toAddress, ccAddress, bccAddress, attachments, subject, body, isHtml) {
                //$cordovaEmailComposer.isAvailable().then(function () {
                // Hardcoding the value of isHTML to false as the new Email plugin doesnt render body content in Outlook app
                var email = {
                    to: toAddress,
                    cc: ccAddress,
                    bcc: bccAddress,
                    attachments: attachments,
                    subject: subject,
                    body: body,
                    isHtml: false
                };

                try {
                    $cordovaEmailComposer.open(email).then(null, function () {
                        // User exits Email
                        console.log("User exited Mail Application");
                    });
                } catch (e) {
                    console.log("Email is not availiable");
                    AppMessages.Error($rootScope.getResourceText('LIT_MESSAGE'), $rootScope.getResourceText('MSG_MAILCLIENT_NOT_AVAILABLE'));
                } //}, function () {
                //});

            }
        };
        return emailFunction;
    }]);
    app.factory('DateUtil', ['moment', function (moment) {
        //Refere this link for moment js https://momentjs.com/docs/#/use-it/
        var dateUtil = {
            getUTCDate: function getUTCDate(dateValue) {
                var utcDate = moment.utc(dateValue).format();
                return utcDate.toString();
            },
            getFormattedValue: function getFormattedValue(date, type) {
                var day = date.getDate(); // yields day

                var month = date.getMonth() + 1; // yields month

                var year = date.getFullYear(); // yields year

                var hour = date.getHours(); // yields hours 

                var minute = date.getMinutes(); // yields minutes

                var second = date.getSeconds(); // yields seconds

                if (day <= 9) {
                    day = '0' + day;
                }

                if (month <= 9) {
                    month = '0' + month;
                }

                if (hour <= 9) {
                    hour = '0' + hour;
                }

                if (minute <= 9) {
                    minute = '0' + minute;
                }

                if (second <= 9) {
                    second = '0' + second;
                }

                switch (type) {
                    case 'date':
                        var formattedDate = day + "-" + month + "-" + year;
                        return formattedDate;

                    case 'dateTime':
                        var formattedDateTime = day + "-" + month + "-" + year + " " + hour + ':' + minute + ':' + second;
                        return formattedDateTime;

                    case 'time':
                        var formattedTime = hour + ':' + minute + ':' + second;
                        return formattedTime;

                    default:
                        break;
                }
            },
            getDate: function getDate() {
                return 'date';
            },
            getDateTime: function getDateTime() {
                return 'dateTime';
            },
            getTime: function getTime() {
                return 'time';
            },
            getTimeStamp: function getTimeStamp(dateValue) {
                var splitDate = dateValue.split('-'); // Month is zero-indexed so subtract one from the month inside the constructor

                var date = new Date(splitDate[2], splitDate[1] - 1, splitDate[0]); //Y M D 

                var timeStamp = date.getTime();
                return timeStamp;
            },
            getValidDateTimeFormat: function getValidDateTimeFormat(dateValue) {
                if (dateValue && dateValue.split(' ').length == 2) {
                    var dateSplit = dateValue.split(' ');
                    var extractedDate = dateSplit[0];
                    var extractedTime = dateSplit[1];
                    var correctedDate = extractedDate.split('-').reverse().join('-');
                    var correctedDateFromate = new Date(`${correctedDate} ${extractedTime}`);
                    return correctedDateFromate;
                }
                return dateValue;
            },
            getWeekWorkingStartDay: function getWeekStartDay(needTimeStamp) {
                var day = moment().day('Monday');
                if (needTimeStamp) return day.unix() * 1000;
                return day;
            },
            getWeekWorkingEndDay: function getWeekEndDay(needTimeStamp) {
                var day = moment().day('Saturday');
                if (needTimeStamp) return day.unix() * 1000;
                return day;
            },
        };
        return dateUtil;
    }]);
    app.factory('FileUtil', ['$q', '$cordovaFile', '$cordovaFileOpener2', 'ionicToast', '$rootScope', 'IOSUtil', function ($q, $cordovaFile, $cordovaFileOpener2, ionicToast, $rootScope, IOSUtil) {
        var correctFileImagePath = {
            getImageFilePath: function (imageSource) {
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
            getFilePathAndName: function getFilePathAndName(fileLocation) {
                var def = $q.defer();

                if (fileLocation.indexOf("content://") > -1) {
                    window.FilePath.resolveNativePath(fileLocation, function (result) {
                        // This is executed only id the file location contains content:// as the file path.
                        // FilePath is executed from the cordova.filepath plugin.
                        imageURI = 'file://' + result;

                        var fileName = imageURI.substring(imageURI.lastIndexOf('/') + 1);
                        var fileInfo = {
                            'fileLocation': imageURI,
                            'fileName': fileName
                        };
                        def.resolve(fileInfo);
                        return fileInfo;
                    }, function (error) {
                        // On an error send the error response
                        def.reject(error);
                        return;
                    });
                    return def;
                } else {
                    // handling the scenario where the file location string does not contain 'content://' key word
                    var fileName = fileLocation.substring(fileLocation.lastIndexOf('/') + 1);
                    var fileInfo = {
                        'fileLocation': fileLocation,
                        'fileName': fileName
                    };
                    def.resolve(fileInfo);
                    return def;
                }
            },
            getFileLocation: function getFileLocation(fileLocation) {
                var fileLocPromise = this.getFilePathAndName(fileLocation);
                fileLocPromise.promise.then(function (success) {
                    return success.fileLocation;
                });
            },
            getFileName: function getFileName(fileLocation) {
                var fl = this.getFileLocation(fileLocation);
                var fileName = fl.substring(fl.lastIndexOf('/') + 1);
                return fileName;
            },
            processFileForMultiTask: function processFileForMultiTask(multiTaskEntity, isBase64) {
                var mtDef = $q.defer();
                var myPromiseList = [];
                var fullfilledPromise = [];

                for (var mtEntity = 0; mtEntity < multiTaskEntity.length; mtEntity++) {
                    var personEntity = multiTaskEntity[mtEntity];
                    var processFileProm = this.processFile(personEntity, isBase64);
                    myPromiseList.push(processFileProm);
                }

                $q.all(myPromiseList).then(function (successPromise) {
                    fullfilledPromise = successPromise;

                    if (multiTaskEntity.length === successPromise.length) {
                        mtDef.resolve(fullfilledPromise);
                    }
                }, function (errorPromise) {
                    mtDef.reject(errorPromise);
                });
                return mtDef.promise;
            },
            // This method is equal to prepareForUpload for all module, only during upload isBase64 is true.
            processFile: function processFile(personEntity, isBase64) {
                // Addind counter variables to handle multiple promise scenario
                var pAttachFailCount = 0,
                    pAttachCount = 0; // variable to assign error in the failure promise.

                var errorMsg = ''; // Custom promise

                var def = $q.defer();
                /* //TODO: The implementation can be changed to differentiate between Askade, Action plan and Questionnaire entity
                            The below implementation is done to handle upload scenario, where if the upload fails the UploadFail flag should be
                            set to true. 
                            Below implementation is done to avoid to fetch the person entity instance of each module from the entity helper each time.*/

                var entityAttachments = '';

                if (personEntity.Attachments) {
                    entityAttachments = personEntity.Attachments;
                } else {
                    entityAttachments = personEntity.Answers;
                }

                if (entityAttachments.length !== 0) {
                    for (var i = 0; i < entityAttachments.length; i++) {
                        var pAttach = entityAttachments[i];
                        var thisRef = this;

                        var imagePromise = this._process(pAttach, isBase64);

                        imagePromise.then(function (successImage) {
                            // Counter incremented on succes response
                            pAttachCount += 1; // If both success counter and entityAttachment length 
                            //is same after all promise execution resolve the promise

                            thisRef._checkPromise(pAttachCount, pAttachFailCount, entityAttachments.length, personEntity, def, errorMsg);
                        }, function (error) {
                            // Fail counter incremented on error response
                            pAttachFailCount += 1;
                            errorMsg = error; // Getting the total count of both success and error, 
                            // Total count is equal to attachments length then return reject the promise

                            thisRef._checkPromise(pAttachCount, pAttachFailCount, entityAttachments.length, personEntity, def, errorMsg);
                        });
                    }
                } else {
                    def.resolve(personEntity);
                }

                return def.promise;
            },
            _checkPromise: function _checkPromise(successAtachCount, failAttachCount, attachLength, entity, def, error) {
                if (successAtachCount === attachLength) {
                    // Condition is executed only when all the images attached are existing/ converted to base64
                    def.resolve(entity);
                } else if (failAttachCount > 0 && attachLength === successAtachCount + failAttachCount) {
                    // This condition is executed only if attached image is not present and a error is thrown
                    var promiseRejectValue = {
                        personEntity: entity,
                        message: error.message
                    };
                    def.reject(promiseRejectValue);
                } else {
                    return;
                }
            },
            _process: function _process(pAttachEntity, isBase64) {
                var deferred = $q.defer();
                var fileName = pAttachEntity.FileName;

                if (fileName != null) {
                    var fileLocation = pAttachEntity.FileLocation != null ? pAttachEntity.FileLocation : pAttachEntity.FilePath;
                    var directoryPath = fileLocation.replace(fileName, ''); // Fetching the correct path for IOS else return saved path

                    directoryPath = IOSUtil.correctIOSPath(directoryPath);

                    if (isBase64) {
                        this._convertFile(pAttachEntity, directoryPath, fileName, deferred);
                    } else {
                        this._checkFileExists(pAttachEntity, directoryPath, fileName, deferred);
                    }
                } else {
                    // Handling the scenario if file is not added by the user
                    deferred.resolve(null);
                }

                return deferred.promise;
            },
            _checkFileExists: function _checkFileExists(pAttachEntity, directoryPath, fileName, deferred) {
                // Check the file existance
                var promise = $cordovaFile.checkFile(directoryPath, fileName);
                promise.then(function (success) {
                    deferred.resolve(success);
                }, function (error) {
                    // Only is file not found error is thrown mark the file fot delete
                    if (error.message === "NOT_FOUND_ERR") {
                        pAttachEntity.MarkedForDelete = true;
                    } // Reject the promise in both scenario


                    deferred.reject(error);
                });
            },
            _convertFile: function _convertFile(pAttachEntity, directoryPath, fileName, deferred) {
                // Converting the file path to base64 string
                var promise = $cordovaFile.readAsDataURL(directoryPath, fileName);
                promise.then(function (success) {
                    pAttachEntity.FileSourceBase64 = success;
                    deferred.resolve(success);
                }, function (error) {
                    // Only is file not found error is thrown mark the file fot delete
                    if (error.message === "NOT_FOUND_ERR") {
                        pAttachEntity.MarkedForDelete = true;
                    } // Reject the promise in both scenario


                    deferred.reject(error);
                });
            },
            convertFileToBase64: function convertFileToBase64(pAttachEntity) {
                return this._process(pAttachEntity, true);
            },
            deleteFile: function deleteFile(filePath) {
                // Method to delete the file from the file system.
                var fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
                filePath = filePath.replace(fileName, ''); // Fetching the correct path for IOS else return saved path

                filePath = IOSUtil.correctIOSPath(filePath);
                return $cordovaFile.removeFile(filePath, fileName);
            },
            deleteDirectory: function deleteDirectory(subDirName) {
                // Method to delete the directory from the file system.
                //return $cordovaFile.removeDir(filePath, subDirName); // This did not work
                var defDeleteDir = $q.defer();
                var parentPath = ""; // Based on the platform assign the location path where the new file has to be written
                var isIOS = (ionic.Platform.isAndroid() == false);

                if (isIOS) {
                    parentPath = cordova.file.dataDirectory; //cordova.file.documentsDirectory
                } else {
                    parentPath = cordova.file.externalDataDirectory;
                } // Check if the folder/file exists


                window.resolveLocalFileSystemURL(parentPath, function (directoryEntry) {
                    directoryEntry.getDirectory(subDirName, {
                        create: true,
                        exclusive: false
                    }, function (entry) {
                        // On success remove the directory
                        entry.removeRecursively(function () {
                            defDeleteDir.resolve();
                        }, function () {
                            defDeleteDir.reject();
                        });
                    }, function () {
                        defDeleteDir.reject();
                    });
                }, function (exportFail) {
                    defDeleteDir.reject();
                });
                return defDeleteDir.promise;
            },
            saveFile: function saveFile(base64String, fileName) {
                // Split the base64 string in data and contentType
                var blocks = base64String.split(";"); // Get the content type

                var contentType = blocks[0].split(":")[1]; // get the real base64 content of the file

                var b64String = blocks[1].split(",")[1];
                b64String = base64String.replace(/^[^,]+,/, '');
                b64String = b64String.replace(/\s/g, ''); // Initializing directory name to TempFiles instead of passing a boolean true value for isPDF.
                // Before isPDF = true was used to open the generated pdf directly if device had any supporting apps to open.
                // Instead of boolean value a check can be used aganist TempFiles. 
                // TODO:// This can be changed if required

                var dirName = 'TempFiles';
                this.saveFileLocally(b64String, contentType, fileName, dirName);
            },
            saveFileLocally: function saveFileLocally(base64String, contentType, fileName, dirName) {
                var def = $q.defer(); // settind the sliceSize to 512 (This can be changed, but works better with 512)

                var sliceSize = sliceSize || 512;
                var regex = "^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$"; // Validating if the base64 string is a valid string or not
                //if (base64String.match(regex)) {

                var byteCharacters = atob(base64String);
                var byteArrays = []; // From base64 string creating the blob object

                for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                    var slice = byteCharacters.slice(offset, offset + sliceSize);
                    var byteNumbers = new Array(slice.length);

                    for (var i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }

                    var byteArray = new Uint8Array(byteNumbers);
                    byteArrays.push(byteArray);
                } // Blob object from base64 string


                var blob = new Blob(byteArrays, {
                    type: contentType
                }); //var blob = b64toBlob(b64Data, contentType);
                //var blobUrl = URL.createObjectURL(blob);

                var pathFile = "";
                var contentFile = blob; // Based on the platform assign the location path where the new file has to be written

                var isIOS = (ionic.Platform.isAndroid() == false);
                if (isIOS) {
                    pathFile = cordova.file.dataDirectory; //cordova.file.documentsDirectory
                    //TODO: URL encoding does not work for ios devices hence appending timestamp as file names.
                    //TODO: Change solution to download files with special and danish characters.

                    //var timestamp = Date.now();
                    //var ext = fileName.substr(fileName.lastIndexOf('.') + 1);
                    //fileName = timestamp + "." + ext;
                } else {
                    pathFile = cordova.file.externalDataDirectory;
                } // These are sub folder paths are used to save generated files


                pathFile = pathFile + dirName; //if (!isPDF) {
                //    pathFile = pathFile + 'DocumentLibrary';
                //} else {
                //    pathFile = pathFile + 'TempFiles';
                //}

                var thisRef = this; // Creating a file in the location specified. The last boolean parameter specified
                // tells if the file has to be replaced if the creating file already exists in the location. 

                $cordovaFile.writeFile(pathFile, fileName, contentFile, true).then(function (success) {
                    // on success open the file
                    // Here it is known that user wants to directly open the generated file
                    if (dirName === "TempFiles") {
                        thisRef.openFile(pathFile + '/' + fileName, contentType);
                    } else {
                        def.resolve(pathFile + '/' + fileName);
                    }
                }, function (error) {
                    ionicToast.showDefault($rootScope.getResourceText('MGS_ERROR'));
                    def.reject();
                }); //}

                return def.promise;
            },
            // This method is used to create a sub folder by passing the sub folder name
            createSubDirectory: function createSubDirectory(subDirName) {
                var defCreatDir = $q.defer();
                var parentPath = ""; // Based on the platform assign the location path where the new file has to be written

                var isIOS = (ionic.Platform.isAndroid() == false);
                if (isIOS) {
                    parentPath = cordova.file.dataDirectory; //cordova.file.documentsDirectory
                } else {
                    parentPath = cordova.file.externalDataDirectory;
                }

                window.resolveLocalFileSystemURL(parentPath, function (directoryEntry) {
                    directoryEntry.getDirectory(subDirName, {
                        create: true
                    }, function (subdirEntry) {
                        defCreatDir.resolve();
                    }, function (exportFail) {
                        defCreatDir.reject();
                    });
                }, function (exportFail) {
                    defCreatDir.reject();
                });
                return defCreatDir.promise;
            },
            // Check if sub folder exists
            checkDirectoryExists: function checkDirectoryExists(dirName) {
                var defDirExists = $q.defer();
                var parentPath = ""; // Based on the platform assign the location path where the new file has to be written

                var isIOS = (ionic.Platform.isAndroid() == false);
                if (isIOS) {
                    parentPath = cordova.file.dataDirectory; //cordova.file.documentsDirectory
                } else {
                    parentPath = cordova.file.externalDataDirectory;
                }

                window.resolveLocalFileSystemURL(parentPath, function (directoryEntry) {
                    directoryEntry.getDirectory(dirName, {
                        create: false
                    }, function (subdirEntry) {
                        defDirExists.resolve();
                    }, function (exportFail) {
                        defDirExists.reject();
                    });
                }, function (exportFail) {
                    defDirExists.reject();
                });
                return defDirExists.promise;
            },
            openFile: function openFile(filePath, contentType) {
                // Based on the file path and content type, if a suitable app is installed on the 
                // mobile, then the file is opened using the app.
                $cordovaFileOpener2.open(filePath, contentType).then(function (success) { }, function (error) {
                    if (error.status === 9 && error.message.indexOf('File not found') > -1) {
                        ionicToast.showDefault($rootScope.getResourceText('MSG_FILE_NOT_FOUND'));
                    } else if (error.status === 9 || error.message.indexOf('Activity Not Found') > -1) {
                        ionicToast.showDefault($rootScope.getResourceText('MSG_APP_NOT_FOUND'));
                    } else {
                        ionicToast.showDefault($rootScope.getResourceText('MSG_ERROR'));
                    }
                });
            },
            getContentType: function getContentType(fileExtension) {
                switch (fileExtension) {
                    case 'docx':
                        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

                    case 'xls':
                    case 'xlt':
                    case 'xla':
                        return 'application/vnd.ms-excel';

                    case 'xlsx':
                        return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

                    case 'doc':
                    case 'dot':
                        return 'application/msword';

                    case 'pdf':
                        return 'application/pdf';

                    case 'txt':
                        return 'text/plain';

                    case 'ppt':
                    case 'pot':
                    case 'pps':
                    case 'ppa':
                        return 'application/vnd.ms-powerpoint';

                    case 'pptx':
                        return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';

                    case 'png':
                        return 'image/png';

                    case 'jpeg':
                    case 'jpg':
                        return 'image/jpeg';

                    case 'gif':
                        return 'image/gif';

                    case 'bmp':
                        return 'image/bmp';

                    case 'docm':
                        return 'application/vnd.ms-word.document.macroEnabled.12';

                    case 'xlsm':
                        return 'application/vnd.ms-excel.sheet.macroEnabled.12';

                    case 'msg':
                        return 'application/vnd.ms-outlook';

                    case 'html':
                    case 'htm':
                        return 'text/html';

                    case 'svg':
                        return 'image/svg+xml';

                    case 'xml':
                        return 'application/xml';

                    case 'pptm':
                        return 'application/vnd.ms-powerpoint.presentation.macroEnabled.12';

                    case 'mpp':
                        return 'application/vnd.ms-project';

                    case 'mpeg':
                    case 'mpg':
                        return 'video/mpeg';

                    case 'mkv':
                        return 'video/x-matroska';

                    case 'flv':
                        return 'video/x-flv';

                    case 'vob':
                        return 'video/x-ms-vob';

                    case 'mp4':
                        return 'video/mp4';

                    case 'avi':
                        return 'video/msvideo';

                    case 'wmv':
                        return 'video/x-ms-wmv';

                    case 'mov':
                        return 'video/quicktime';

                    case '3gp':
                        return 'video/3gpp';

                    default:
                        null;
                }
            },
            getFileContentAsBase64: function getFileContentAsBase64(path, callback) {
                var defDirExists = $q.defer();
                window.resolveLocalFileSystemURL(path, gotFile, fail);

                function fail(e) {
                    //alert('Cannot found requested file');
                }

                function gotFile(fileEntry) {
                    fileEntry.file(function (file) {
                        var reader = new FileReader();
                        reader.onloadend = function (e) {
                            var content = this.result;
                            callback(content);
                            defDirExists.resolve(content);
                        };
                        // The most important point, use the readAsDatURL Method from the file plugin
                        reader.readAsDataURL(file);
                    });
                }
                return defDirExists.promise;
            }
        };
        return correctFileImagePath;
    }]);
    app.factory('DeviceUtil', ['$cordovaNetwork', '$q', function ($cordovaNetwork, $q) {
        var deviceScope = {
            isDeviceOnline: function isDeviceOnline() {
                var isOnline = $cordovaNetwork.isOnline();
                var type = $cordovaNetwork.getNetwork();
                isOnline = isOnline === true || type === 'unknown';
                return isOnline;
            },
            getSharedPreferences: function getSharedPreferences() {
                var sharedPreferences = window.plugins.SharedPreferences.getInstance('HSEQAppSettings');
                return sharedPreferences;
            },
            setKeyValueWithSharedPreferences: function setKeyValueWithSharedPreferences(key, value) {
                var prom = $q.defer();
                var sharedPreferences = deviceScope.getSharedPreferences();
                sharedPreferences.put(key, value, function (data) {
                    prom.resolve(data);
                }, function (err) {
                    prom.reject(err);
                });
                return prom.promise;
            },
            getKeyValueWithSharedPreferencesForString: function getKeyValueWithSharedPreferencesForString(key, defaultValue) {
                var prom = $q.defer();
                var sharedPreferences = deviceScope.getSharedPreferences();
                sharedPreferences.getString(key, defaultValue, function (data) {
                    prom.resolve(data);
                }, function (err) {
                    prom.reject(err);
                });
                return prom.promise;
            },
            getKeyValueWithSharedPreferences: function getKeyValueWithSharedPreferences(key) {
                var prom = $q.defer();
                var sharedPreferences = deviceScope.getSharedPreferences();
                sharedPreferences.get(key, function (data) {
                    prom.resolve(data);
                }, function (err) {
                    prom.reject(err);
                });
                return prom.promise;
            },
            removeByKeySharedPreferences: function removeByKeySharedPreferences(key) {
                var prom = $q.defer();
                var sharedPreferences = deviceScope.getSharedPreferences();
                sharedPreferences.del(key, function () {
                    prom.resolve(true);
                }, function (err) {
                    prom.reject(err);
                });
                return prom.promise;
            }
        };
        return deviceScope;
    }]); // This Util clears all the pool data. [This needs to be updated whenever new Managers are added in Entity Helper including Dropdown table manager]

    app.factory('ResetPoolUtil', ["$injector", function ($injector) {
        var resetPoolEntity = {
            resetPool: function resetPool() {
                var factoryArray = ['personQuestionnaireManager', 'personQuestionAnswerManager', 'personValuationQuestionAnswerManager', 'questionnaireManager', 'questionGroupManager', 'questionManager', 'answerOptionManager', 'valuationQuestionManager', 'valuationAnswerOptionManager', 'userDetailsManager', 'userApplicationsManager', 'actionPlanWizardStepColumnManager', 'actionPlanWizardStepManager', 'actionPlanWizardManager', 'actionPlanWizardStepColumnGuideManager', 'actionPlanWizardStepColumnGuideAnswerManager', 'personApwStepAnswerManager', 'personApwStepAnswerTemplateManager', 'personApwAttachmentManager', 'personApwAttachmentTemplateManager', 'personApwManager', 'personApwTemplateManager', 'resourceLanguageManager', 'iconsManager', 'customersManager', 'askadeFileTypeWizardManager', 'askadeFileTypeWizardStepManager', 'askadeFileTypeWizardStepColumnManager', 'askadeFileTypeWizardStepColumnGuideManager', 'personAskadeFileTypeWizardAttachmentManager', 'personAskadeFileTypeWizardAttachmentTemplateManager', 'personAskadeFileTypeWizardTemplateManager', 'personAskadeColumnAnswerTemplateManager', 'personAskadeColumnAnswerManager', 'personAskadeFileTypeWizardManager', 'personAskadeColumnGuideAnswerManager', 'activityModuleManager', 'documentLibraryManager', 'dropdownValueManager', 'newsManager', 'newsFileManager', 'favoritesManager'];
                var genericTableNames = ['category', 'status', 'department', 'probability', 'consequence', 'priority', 'problemArea', 'lineOfBusiness', 'person', 'safetyDepartment', 'process', 'asset', 'controlLevel', 'customerFieldValue1', 'customerFieldValue2', 'customerFieldValue3', 'customerListValue1', 'customerListValue2', 'customerListValue3', 'manager2Questionnaire', 'easyClassification', 'listValue', 'city', 'country', 'activity', 'chemical'];

                for (var i = 0; i < factoryArray.length; i++) {
                    var factoryToLoad = factoryArray[i];
                    var factoryManager = $injector.get(factoryToLoad);
                    factoryManager.reset();
                }

                for (var i = 0; i < genericTableNames.length; i++) {
                    var factoryToLoad = genericTableNames[i];
                    factoryToLoad = factoryToLoad + 'Manager';
                    var factoryManager = $injector.get(factoryToLoad);
                    factoryManager.reset();
                }
            }
        };
        return resetPoolEntity;
    }]);
    app.factory('PdfUtil', ["EmailUtil", "customersManager", "$rootScope", "$q", "userDetailsManager", "FileUtil", function (EmailUtil, customersManager, $rootScope, $q, userDetailsManager, FileUtil) {
        var pdfUtil = {
            getPDFDocumentForQuestionnaire: function getPDFDocumentForQuestionnaire(personEntity, questionnaireEntity, customerName, isPdfEmail) {
                try {
                    var loadImage = function loadImage(answer) {
                        return $q(function (resolve, reject) {
                            if (answer.FileSourceBase64 !== null) {

                                if (answer.FileName.indexOf('.pdf') !== -1) {
                                    isPdf = true;
                                    return resolve(answer.FileName);
                                };

                                var image = new Image();
                                image.qId = answer.QuestionId;
                                image.src = answer.FileSourceBase64;
                                image.addEventListener('load', function () {
                                    preloadedQuestionImages[this.qId] = this;
                                    resolve(image);
                                });

                                image.onerror = function (e) {
                                    reject(e);
                                };
                            } else {
                                resolve(true);
                            }
                        });
                    };

                    var def = $q.defer();
                    var preloadedQuestionImages = [];
                    var promises = [];
                    var isPdf = false;
                    var that = this;
                    personEntity.Answers.forEach(function (answer) {
                        promises.push(loadImage(answer));
                        promises.push(that.loadCustomerImage(preloadedQuestionImages));
                        promises.push(that.loadBase64Image(answer, preloadedQuestionImages));
                    });
                    $q.all(promises).then(function (results) {
                        var questionnaire = questionnaireEntity;
                        var heigth = 100; // Initializing JSPDF

                        var doc = new jsPDF('p', 'pt'); // Initializing page count

                        var currentpage = 0;
                        var attachList = []; // Defining Header Image : TODO: Image could be added, (Attachment issue in PDF, thus not part of the implementation)
                        //var headerImage = new Image();
                        // This variable gives the height value where next table has to be added if a question has image included 

                        var heightAfterImage = 0;
                        var heightAfterAnsImg = 0;
                        var ansImagHeightVal = 0; //var customer = customersManager.getCustomers();
                        //var customerImage = customer.ImageLogoBase64;
                        //var imageData = customerImage.substring(10, customerImage.length - 4);
                        //headerImage.src = imageData;
                        //var imageData = headerImage;
                        // Function to get a entity based on the id

                        function getSelectedListEntity(list, povId) {
                            for (var i = 0; i < list.length; i++) {
                                var listEntity = list[i];

                                if (listEntity.Id === povId) {
                                    var formattedText = listEntity.Text.replace(new RegExp(String.fromCharCode(10143), 'g'), '--');
                                    return formattedText;
                                }
                            }

                            return null;
                        } // Function to get a answered question entity


                        function getPersonQuestionAnswer(questionId) {
                            var pqa = personEntity.Answers;

                            for (var i = 0; i < pqa.length; i++) {
                                var pqaQuestion = pqa[i];
                                var pqaQuestionId = pqaQuestion.QuestionId;

                                if (pqaQuestionId === questionId) {
                                    return pqaQuestion;
                                }
                            }
                        } // Fetching questionGroup back colour and converting to rgb


                        var qgBackColor = questionnaire.QuestionGroupBackColor;
                        var qgRgbValue = [];

                        if (qgBackColor != null) {
                            qgRgbValue = that.convertHexToRgb(qgBackColor);
                        } else {
                            qgRgbValue = {
                                r: 221,
                                g: 223,
                                b: 225
                            };
                        } // Fetching questionnire Group fore color and converting to rgb


                        var qgForeColor = questionnaire.QuestionGroupForeColor;
                        var qgForeRgbValue = [];

                        if (qgForeColor != null) {
                            qgForeRgbValue = that.convertHexToRgb(qgForeColor);
                        } else {
                            qgForeRgbValue = {
                                r: 80,
                                g: 80,
                                b: 80
                            };
                        } // Fetching question back colour and converting to rgb.


                        var qBackColor = questionnaire.QuestionBackColor;
                        var rgbValue = [];

                        if (qBackColor != null) {
                            rgbValue = that.convertHexToRgb(qBackColor);
                        } else {
                            rgbValue = {
                                r: 245,
                                g: 245,
                                b: 245
                            };
                        } // Fetching question fore color and converting to rgb.


                        var qForeColor = questionnaire.QuestionForeColor;
                        var qForeRgbValue = [];

                        if (qForeColor != null) {
                            qForeRgbValue = that.convertHexToRgb(qForeColor);
                        } else {
                            qForeRgbValue = {
                                r: 80,
                                g: 80,
                                b: 80
                            };
                        } // Defining anonymous text value


                        var anonymousText = '';

                        if (personEntity.IsAnonymous) {
                            anonymousText = ' (' + $rootScope.getResourceText('LIT_ANONYMOUS') + ')';
                        } // Header and footer options


                        var header = function header(data) {
                            // Defining Customer Name
                            doc.setFontSize(22);
                            doc.text(customerName, 40, 40); // Defining questionnaire name

                            doc.setFontSize(16);
                            doc.text(questionnaire.Name + anonymousText, 40, 75); // Horizontal seperation line

                            doc.setLineWidth(1);
                            doc.line(0, 90, 90, 90);
                            doc.line(600, 90, 90, 90); // Adding image in the header section

                            var image = preloadedQuestionImages['headerImg'];

                            if (!angular.isUndefined(image)) {
                                if (image.complete) {
                                    var headerImgType = '';
                                    var splitValue = image.src.split(';');

                                    if (splitValue.length !== 0) {
                                        var splitValueLower = splitValue[0].toLowerCase();

                                        if (splitValueLower.indexOf("png") !== -1) {
                                            headerImgType = 'png';
                                        } else if (splitValueLower.indexOf("jpg") !== -1 || splitValueLower.indexOf("jpeg") !== -1) {
                                            headerImgType = 'jpeg';
                                        } else if (splitValueLower.indexOf("svg+xml") !== -1) {
                                            var data = that.convertSVGImage(image.src);
                                            image.src = data;
                                            headerImgType = 'png';
                                        }
                                    }

                                    if (image.naturalWidth < 150 && image.naturalHeight < 50) {
                                        doc.addImage(image, headerImgType, 550 - image.naturalWidth, 22, image.naturalWidth, image.naturalHeight, 10, 'NONE');
                                    } else {
                                        var newRatio = that.calculateAspectRatioFit(image.naturalWidth, image.naturalHeight, 150, 50);
                                        //if width has decimal values the header name looks scrambled 
                                        var mod = newRatio.width % 1;
                                        if (mod !== 0) {
                                            newRatio.width = Math.round(newRatio.width);
                                        }
                                        doc.addImage(image, headerImgType, 400, 22, newRatio.width, newRatio.height, 10, 'NONE');
                                    }
                                }
                            }
                        };

                        var footer = function footer(data) {
                            if (currentpage < doc.internal.getNumberOfPages()) {
                                doc.setFontSize(10);
                                doc.setFontStyle('normal');
                                var str = $rootScope.getResourceText('LIT_PAGE') + " " + doc.internal.getNumberOfPages();
                                doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 30);
                                currentpage = doc.internal.getNumberOfPages();
                            }
                        }; // Fetching the available page size for the content to be added.


                        var pageHeight = doc.internal.pageSize.height - 45; // Fetching Evaluating for and selected evaluating id

                        var list = questionnaire.EvaluatingFor;
                        var selectedId = personEntity.EvaluatedForId;
                        var evalPovText = $rootScope.getResourceText('LIT_EVALUATED_FOR') + " " + questionnaire.PointOfView;
                        doc.setFontSize(10);
                        doc.text(40, 110, evalPovText);
                        var evalText = doc.splitTextToSize(getSelectedListEntity(list, selectedId), 650);
                        doc.setFontSize(9);
                        doc.text(40, 120, evalText); // Initializing Y axis value for the scenario if description is null

                        var startYforNext = 120; // Description table 

                        if (questionnaire.Description != null) {
                            var descId = 'description-table';
                            var desRes = doc.autoTableHtmlToJson(document.getElementById(descId));
                            doc.autoTable(desRes.columns, desRes.data, {
                                beforePageContent: header,
                                afterPageContent: footer,
                                margin: {
                                    top: 110
                                },
                                theme: 'grid',
                                startY: 130,
                                //margin: 40,
                                headerStyles: {
                                    fillColor: [161, 162, 164],
                                    fontSize: 10,
                                    fontStyle: 'helvetica',
                                    fillStyle: 'DF',
                                    rowHeight: 20,
                                    textColor: [255, 255, 255],
                                    overflow: 'linebreak'
                                },
                                styles: {
                                    overflow: 'linebreak'
                                }
                            }); // If description is not null assign Y axis value

                            startYforNext = doc.autoTableEndPosY();
                        } // Horizontal seperation line


                        doc.setLineWidth(1);
                        doc.line(10, startYforNext + 10, startYforNext + 10, startYforNext + 10);
                        doc.line(500, startYforNext + 10, startYforNext + 10, startYforNext + 10);
                        doc.line(585, startYforNext + 10, startYforNext + 10, startYforNext + 10);
                        var valuationAnswers = personEntity.ValuationAnswers;
                        var qg = questionnaire.Groups;

                        for (var i = 0; i < qg.length; i++) {
                            var viewId = 'group-table_' + qg[i].Id;

                            if (i === 0) {
                                if (document.getElementById(viewId) != null) {
                                    var res = doc.autoTableHtmlToJson(document.getElementById(viewId));
                                    doc.autoTable(res.columns, res.data, {
                                        beforePageContent: header,
                                        afterPageContent: footer,
                                        margin: {
                                            top: 110
                                        },
                                        tableWidth: '250',
                                        theme: 'grid',
                                        startY: startYforNext + 20,
                                        //margin: 40,
                                        headerStyles: {
                                            fillColor: [qgRgbValue.r, qgRgbValue.g, qgRgbValue.b],
                                            textColor: [qgForeRgbValue.r, qgForeRgbValue.g, qgForeRgbValue.b]
                                        },
                                        styles: {
                                            overflow: 'linebreak'
                                        },
                                        bodyStyles: {
                                            valign: 'top',
                                            halign: 'centre'
                                        }
                                    });
                                }
                            } else {
                                if (document.getElementById(viewId) != null) {
                                    var res = doc.autoTableHtmlToJson(document.getElementById(viewId));
                                    doc.autoTable(res.columns, res.data, {
                                        beforePageContent: header,
                                        afterPageContent: footer,
                                        margin: {
                                            top: 110
                                        },
                                        tableWidth: '250',
                                        theme: 'grid',
                                        startY: doc.autoTableEndPosY() + 10 + heightAfterImage + ansImagHeightVal,
                                        headerStyles: {
                                            fillColor: [qgRgbValue.r, qgRgbValue.g, qgRgbValue.b],
                                            textColor: [qgForeRgbValue.r, qgForeRgbValue.g, qgForeRgbValue.b]
                                        },
                                        styles: {
                                            overflow: 'linebreak'
                                        },
                                        bodyStyles: {
                                            valign: 'top',
                                            halign: 'centre'
                                        }
                                    });
                                    heightAfterImage = 0;
                                    heightAfterAnsImg = 0;
                                    ansImagHeightVal = 0;
                                }
                            }

                            var questions = qg[i].Questions;

                            for (var j = 0; j < questions.length; j++) {
                                var questionId = '';
                                var pqaView = '';
                                questionId = questions[j].Id;
                                pqaView = getPersonQuestionAnswer(questionId);

                                if (questions[j].IsDependencyMet) {
                                    heightAfterAnsImg = 0;
                                    var questionViewId = 'question-table_' + qg[i].Id + '_' + questions[j].Id;
                                    var res = doc.autoTableHtmlToJson(document.getElementById(questionViewId));
                                    doc.autoTable(res.columns, res.data, {
                                        beforePageContent: header,
                                        afterPageContent: footer,
                                        margin: {
                                            top: 110
                                        },
                                        tableWidth: '250',
                                        theme: 'grid',
                                        //margin: 40,
                                        headerStyles: {
                                            fillColor: [rgbValue.r, rgbValue.g, rgbValue.b],
                                            fontSize: 10,
                                            fontStyle: 'normal',
                                            rowHeight: 20,
                                            textColor: [qForeRgbValue.r, qForeRgbValue.g, qForeRgbValue.b]
                                        },
                                        styles: {
                                            fillStyle: 'DF',
                                            font: 'Verdana',
                                            lineColor: [205, 205, 205],
                                            lineWidth: 0.1,
                                            overflow: 'linebreak',
                                            overflowColumns: false
                                        },
                                        startY: doc.autoTableEndPosY() + 10 + heightAfterImage + ansImagHeightVal,
                                        bodyStyles: {
                                            textColor: [80, 80, 80],
                                            valign: 'top',
                                            halign: 'centre'
                                        }
                                    });
                                    heightAfterImage = 0;
                                    ansImagHeightVal = 0;
                                    var answerImage = pqaView.AnswerImage;

                                    if (answerImage) {
                                        // Assigning the height value of image after added to the document
                                        var ansImgheightValue = doc.autoTableEndPosY() + 10; // Below variable is used to get the start position for the rectangle line to be drawn.

                                        var ansImgnewPageHeight = doc.autoTableEndPosY();
                                        var loadedAnsImg = preloadedQuestionImages[pqaView.QuestionId + 'answerImage'];

                                        if (loadedAnsImg.complete) {
                                            var newRatio = that.calculateAspectRatioFit(loadedAnsImg.naturalWidth, loadedAnsImg.naturalHeight, 200, 200);
                                            var maxHeight = ansImgheightValue + newRatio.height + 60; // If the image does not fit within the page then add a new page.

                                            if (maxHeight >= pageHeight) {
                                                doc.autoTableAddPage();
                                                doc.autoTable([], [], {
                                                    beforePageContent: header,
                                                    afterPageContent: footer,
                                                    margin: {
                                                        top: 110
                                                    }
                                                }); // Assign new values to the below variables (new page)

                                                ansImgheightValue = doc.autoTableEndPosY() + 10;
                                                ansImgnewPageHeight = 110 + 20; // Setting the line width and color for line (new page)

                                                doc.setLineWidth(0.3);
                                                doc.setDrawColor(204, 204, 204);
                                            }

                                            var imageType = pqaView.AnswerImage.substring(pqaView.AnswerImage.indexOf('/') + 1, pqaView.AnswerImage.indexOf(';base64'));
                                            doc.addImage(loadedAnsImg, imageType, 220, ansImgheightValue, newRatio.width, newRatio.height);
                                            heightAfterAnsImg = newRatio.height + 10;
                                            ansImgheightValue += newRatio.height + 10;
                                            doc.rect(40, ansImgnewPageHeight, 515, newRatio.height + 60);
                                        }
                                    }

                                    var vq = questionnaire.ValuationQuestion;

                                    if (questionnaire.ValuationQuestion.length !== 0 && !questions[j].IgnoreValuationQuestion) {
                                        var valViewId = 'valuation-table_' + qg[i].Id + '_' + questions[j].Id + '_' + questions[j].Id;
                                        var res = doc.autoTableHtmlToJson(document.getElementById(valViewId));
                                        doc.autoTable(res.columns, res.data, {
                                            beforePageContent: header,
                                            afterPageContent: footer,
                                            margin: {
                                                top: 110
                                            },
                                            theme: 'grid',
                                            tableWidth: '250',
                                            //margin: 40,
                                            headerStyles: {
                                                fillColor: [rgbValue.r, rgbValue.g, rgbValue.b],
                                                lineColor: [rgbValue.r, rgbValue.g, rgbValue.b],
                                                fontSize: 10,
                                                fontStyle: 'normal',
                                                rowHeight: 20,
                                                textColor: [80, 80, 80]
                                            },
                                            styles: {
                                                fillStyle: 'DF',
                                                font: 'Verdana',
                                                lineColor: [205, 205, 205],
                                                lineWidth: 0.1,
                                                overflow: 'linebreak',
                                                columnWidth: 257.5
                                            },
                                            startY: doc.autoTableEndPosY(),
                                            bodyStyles: {
                                                valign: 'top',
                                                halign: 'centre'
                                            }
                                        });
                                    }

                                    if (questions[j].EnableComment) {
                                        var commentId = 'comment-table_' + qg[i].Id + '_' + questions[j].Id;
                                        var res = doc.autoTableHtmlToJson(document.getElementById(commentId));
                                        doc.autoTable(res.columns, res.data, {
                                            beforePageContent: header,
                                            afterPageContent: footer,
                                            margin: {
                                                top: 110
                                            },
                                            tableWidth: '250',
                                            //margin: 40,
                                            headerStyles: {
                                                fillColor: [249, 249, 249],
                                                fontSize: 10,
                                                fontStyle: 'normal',
                                                rowHeight: 20,
                                                textColor: [80, 80, 80],
                                                columnWidth: 250
                                            },
                                            styles: {
                                                fillStyle: 'DF',
                                                font: 'Verdana',
                                                lineColor: [205, 205, 205],
                                                textColor: [80, 80, 80],
                                                lineWidth: 0.1,
                                                overflow: 'linebreak'
                                            },
                                            startY: doc.autoTableEndPosY() + 10 + heightAfterAnsImg,
                                            bodyStyles: {
                                                fillColor: [255, 255, 255],
                                                valign: 'top',
                                                halign: 'centre'
                                            }
                                        });
                                    } else {
                                        ansImagHeightVal = heightAfterAnsImg;
                                    } // Check is enableFile and FileSourceBase64 has value


                                    if (questions[j].EnableFile && pqaView.FileSourceBase64) {
                                        var qId = questions[j].Id;
                                        var attachId = 'attachment-table_' + qg[i].Id + '_' + qId;
                                        var res = doc.autoTableHtmlToJson(document.getElementById(attachId));
                                        doc.autoTable(res.columns, res.data, {
                                            beforePageContent: header,
                                            afterPageContent: footer,
                                            margin: {
                                                top: 110
                                            },
                                            tableWidth: '250',
                                            headerStyles: {
                                                fillColor: [249, 249, 249],
                                                fontSize: 10,
                                                fontStyle: 'normal',
                                                rowHeight: 20,
                                                textColor: [80, 80, 80],
                                                columnWidth: 250
                                            },
                                            styles: {
                                                fillStyle: 'DF',
                                                font: 'Verdana',
                                                lineColor: [205, 205, 205],
                                                textColor: [80, 80, 80],
                                                lineWidth: 0.1,
                                                overflow: 'linebreak'
                                            },
                                            startY: doc.autoTableEndPosY() + 10 + heightAfterAnsImg,
                                            bodyStyles: {
                                                fillColor: [255, 255, 255],
                                                valign: 'top',
                                                halign: 'centre'
                                            },
                                            drawHeaderRow: function drawHeaderRow(row, data) {
                                                // Adding this method Header should not be displayed twice in the PDF. FT 7268
                                                if (data.pageCount > 1) {
                                                    return false;
                                                }
                                            }
                                        }); // Assigning the height value of image after added to the document

                                        var heightValue = doc.autoTableEndPosY() + 10; // Below variable is used to get the start position for the rectangle line to be drawn.

                                        var newPageHeight = doc.autoTableEndPosY();
                                        var image = preloadedQuestionImages[qId];

                                        if (image != null && image.complete && !isPdf) {
                                            var newRatio = that.calculateAspectRatioFit(image.naturalWidth, image.naturalHeight, 200, 200);
                                            var maxHeight = heightValue + newRatio.height; // If the image does not fit within the page then add a new page.

                                            if (maxHeight >= pageHeight) {
                                                doc.autoTableAddPage();
                                                doc.autoTable([], [], {
                                                    beforePageContent: header,
                                                    afterPageContent: footer,
                                                    margin: {
                                                        top: 110
                                                    }
                                                }); // Assign new values to the below variables (new page)

                                                heightValue = doc.autoTableEndPosY() + 10;
                                                newPageHeight = 110 + 20; // Setting the line width and color for line (new page)

                                                doc.setLineWidth(0.3);
                                                doc.setDrawColor(204, 204, 204);
                                            }

                                            var imageType = pqaView.FileName.substr((~-pqaView.FileName.lastIndexOf(".") >>> 0) + 2);
                                            doc.addImage(image, imageType, 220, heightValue, newRatio.width, newRatio.height);
                                            heightAfterImage = newRatio.height + 10;
                                            heightValue += newRatio.height + 10;
                                            doc.rect(40, newPageHeight, 515, newRatio.height + 20);
                                        }
                                    }
                                }
                            }
                        }

                        var currentRef = that;
                        setTimeout(function () {
                            currentRef.saveGenPdf(doc, def, attachList, questionnaire, personEntity, isPdfEmail);
                        }, 100);
                    }, function (error) {
                        console.log(error);
                    });
                    return def.promise;
                } catch (e) {
                    console.log(e);
                }
            },
            loadCustomerImage: function loadCustomerImage(preloadedQuestionImages) {
                return $q(function (resolve, reject) {
                    var headerImage = new Image();
                    var customer = customersManager.getCustomers();
                    var customerImage = customer.ImageLogoBase64;

                    if (customer.ImageLogoBase64 !== null && customer.ImageLogoBase64 !== '') {
                        var custImg = customerImage.split("src=").length > 1 && customerImage.split("src=")[1];
                        if (custImg) {
                            var imageData = custImg.substring(1, custImg.length - 4);
                            headerImage.src = imageData;
                            headerImage.addEventListener('load', function () {
                                preloadedQuestionImages['headerImg'] = this;
                                resolve(headerImage);
                            });

                            headerImage.onerror = function (e) {
                                reject(e);
                            };
                        }
                    } else {
                        resolve(true);
                    }
                });
            },
            loadBase64Image: function loadBase64Image(answer, preloadedQuestionImages) {
                return $q(function (resolve, reject) {
                    var headerImage = new Image();

                    if (answer.AnswerImage != null && answer.AnswerImage !== '') {
                        var signImage = new Image();
                        signImage[answer.QuestionId + 'answerImage'] = answer.QuestionId;
                        signImage.src = answer.AnswerImage;
                        signImage.addEventListener('load', function () {
                            preloadedQuestionImages[answer.QuestionId + 'answerImage'] = this;
                            resolve(signImage);
                        });

                        signImage.onerror = function (e) {
                            reject(e);
                        };
                    } else {
                        resolve(true);
                    }
                });
            },
            loadBase64ImageForAskade: function loadBase64ImageForAskade(column, preloadedAskadeImages) {
                return $q(function (resolve, reject) {
                    if (column.ColumnType == "Signature") {
                        if (column.AnswerText != null && column.AnswerText !== '') {
                            var signatureImage = new Image();
                            signatureImage[column.FileColumnId + 'answerText'] = column.FileColumnId;
                            signatureImage.src = column.AnswerText;
                            signatureImage.addEventListener('load', function () {
                                preloadedAskadeImages[column.FileColumnId + 'answerText'] = this;
                                resolve(signatureImage);
                            });

                            signatureImage.onerror = function (e) {
                                reject(e);
                            };
                        } else {
                            resolve(true);
                        }
                    } else {
                        resolve(true);
                    }
                });
            },
            saveGenPdf: function saveGenPdf(jspdfInstance, def, attachList, entity, personAnswerEntity, isPdfEmail) {
                // If email is required, then userdetail is required for mail Id
                var userDetail = userDetailsManager.getUserLastLoggedTimeStamp();
                var customer = customersManager.getCustomers();
                var customerName = customer.CustomerName;
                setTimeout(function () {
                    // Below line of code is used to download the PDF file to the phone : TODO Could be implemented
                    //jspdfInstance.save('HSEQMaster.pdf');
                    var base64String = jspdfInstance.output('datauristring');
                    var timestamp = Date.now();
                    var fileName = timestamp + ".pdf"; // If Pdf has to be included in the mail, below code can be used

                    if (isPdfEmail === "true") {

                        var uri = base64String.replace('data:application/pdf;base64,', 'base64:' + fileName + '//');
                        attachList.push(uri);
                        var subjectMail = $rootScope.getResourceText('LIT_MAIL_SUBJECT_APP');
                        var hseqMaster = $rootScope.getResourceText('LIT_HSEQ_MASTER');
                        subjectMail = subjectMail.replace('__HSEQ__MASTER__', hseqMaster);
                        subjectMail = subjectMail.replace('__CUSTOMER__NAME__', customerName);
                        var registrationName = entity.Name;
                        subjectMail = subjectMail.replace('__REGISTRATION__NAME__', registrationName);
                        var dateTime = personAnswerEntity.CompletedDate;
                        console.log(personAnswerEntity);
                        console.log(dateTime);
                        subjectMail = subjectMail.replace('__DATE__', dateTime);
                        var mailBody = $rootScope.getResourceText('MSG_MAIL_BODY_APP');
                        mailBody = mailBody.replace('__HSEQ__MASTER__', hseqMaster);
                        mailBody = mailBody.replace('__NAME__', userDetail.FirstName + ' ' + userDetail.LastName);
                        mailBody = mailBody.replace('__REGISTRATION__NAME__', registrationName);
                        mailBody = mailBody.replace('__DATE__', dateTime);
                        mailBody = mailBody.replace('__CUSTOMER__NAME__', customerName);
                        mailBody = mailBody.replace('__HSEQ__MASTER__', hseqMaster);
                        mailBody = mailBody.split('<br>').join('\r\n');
                        EmailUtil.sendEmail(userDetail.Email, null, null, attachList, subjectMail, mailBody, true);
                        def.resolve(true);
                    } else {
                        // If file has to be saved locally and open using a client, below code can be used
                        FileUtil.saveFile(base64String, fileName);
                        def.resolve(true);
                    }
                }, 200);
            },
            convertHexToRgb: function convertHexToRgb(hexColorValue) {
                var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
                var hex = hexColorValue.replace(shorthandRegex, function (m, r, g, b) {
                    return r + r + g + g + b + b;
                });
                var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                var rgbValue = result ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16)
                } : null;
                return rgbValue;
            },
            calculateAspectRatioFit: function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
                var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
                return {
                    width: srcWidth * ratio,
                    height: srcHeight * ratio
                };
            },
            genPDFDocumentForPlanOfAction: function genPDFDocumentForPlanOfAction(personActionPlanWizard, actionPlanWizardEntity, customerName, isPdfEmail) {
                try {
                    var loadImage = function loadImage(attach) {
                        return $q(function (resolve, reject) {
                            if (attach.FileSourceBase64 !== null) {
                                var image = new Image();
                                image.pApAId = attach.Id;
                                image.src = attach.FileSourceBase64;
                                image.addEventListener('load', function () {
                                    preloadedActionPlanImages[this.pApAId] = this;
                                    resolve(image);
                                });

                                image.onerror = function (e) {
                                    reject(e);
                                };
                            } else {
                                resolve(true);
                            }
                        });
                    };

                    var def = $q.defer();
                    var preloadedActionPlanImages = [];
                    var promises = [];
                    var that = this;
                    personActionPlanWizard.Attachments.forEach(function (attach) {
                        promises.push(loadImage(attach));
                        promises.push(that.loadCustomerImage(preloadedActionPlanImages));
                    });
                    personActionPlanWizard.MultiTaskSolutions.forEach(function (mtTask) {
                        mtTask.Attachments.forEach(function (attach) {
                            promises.push(loadImage(attach));
                        });
                    });
                    $q.all(promises).then(function (results) {
                        // Initilizing Action plan wizard;
                        var wizard = actionPlanWizardEntity; // Initializing JSPDF

                        var doc = new jsPDF('p', 'pt'); // Initializing page count

                        var currentpage = 0; // This boolean variable is used to handle multi task attach height

                        var heightAfterAttach = 0; // Fetching ColumnGuide Person Entity

                        function getColumnGuideEntity(guideId, wizStepId, columnId) {
                            var pApEntity = getPersonApStepColoumnAnswer(wizStepId, columnId);
                            var guides = pApEntity.ColumnGuides;

                            for (var i = 0; i < guides.length; i++) {
                                var guide = guides[i];

                                if (guide.GuideId === guideId) {
                                    return guide;
                                }
                            }
                        } // Fetching Column Person entity


                        function getPersonApStepColoumnAnswer(wizStepId, columnId) {
                            var apPersonEntity = personActionPlanWizard.ColumnValues;

                            for (var i = 0; i < apPersonEntity.length; i++) {
                                var entity = apPersonEntity[i];

                                if (wizStepId === entity.WizardStepId && columnId == null) {
                                    return entity;
                                }
                            }
                        } // Fetching action plan step back color and converting to rgb

                        var apStepBackColor = wizard.GroupBackColor;
                        var apSBackRgbValue = [];

                        if (apStepBackColor != null) {
                            apSBackRgbValue = that.convertHexToRgb(apStepBackColor);
                        } else {
                            apSBackRgbValue = {
                                r: 221,
                                g: 223,
                                b: 225
                            };
                        } // Fetching action plan step fore color and converting to rgb


                        var apStepForeColor = wizard.GroupForeColor;
                        var apSForeRgbValue = [];

                        if (apStepForeColor != null) {
                            apSForeRgbValue = that.convertHexToRgb(apStepForeColor);
                        } else {
                            apSForeRgbValue = {
                                r: 80,
                                g: 80,
                                b: 80
                            };
                        } // Header and footer options


                        var header = function header(data) {
                            // Defining Customer Name
                            doc.setFontSize(22);
                            doc.text(customerName, 40, 40); // Defining Action Plan name

                            doc.setFontSize(16);
                            doc.text(wizard.Name, 40, 75); // Horizontal seperation line

                            doc.setLineWidth(1);
                            doc.line(0, 90, 90, 90);
                            doc.line(600, 90, 90, 90); // Adding image in the header section

                            var image = preloadedActionPlanImages['headerImg'];

                            if (!angular.isUndefined(image)) {
                                if (image.complete) {
                                    var headerImgType = '';
                                    var splitValue = image.src.split(';');

                                    if (splitValue.length !== 0) {
                                        var splitValueLower = splitValue[0].toLowerCase();

                                        if (splitValueLower.indexOf("png") !== -1) {
                                            headerImgType = 'png';
                                        } else if (splitValueLower.indexOf("jpg") !== -1 || splitValueLower.indexOf("jpeg") !== -1) {
                                            headerImgType = 'jpeg';
                                        } else if (splitValueLower.indexOf("svg+xml") !== -1) {
                                            var data = that.convertSVGImage(image.src);
                                            image.src = data;
                                            headerImgType = 'png';
                                        }
                                    }

                                    if (image.naturalWidth < 150 && image.naturalHeight < 50) {
                                        doc.addImage(image, headerImgType, 550 - image.naturalWidth, 22, image.naturalWidth, image.naturalHeight, 10, 'NONE');
                                    } else {
                                        var newRatio = that.calculateAspectRatioFit(image.naturalWidth, image.naturalHeight, 150, 50);
                                        var mod = newRatio.width % 1;
                                        if (mod !== 0) {
                                            newRatio.width = Math.round(newRatio.width);
                                        }
                                        doc.addImage(image, headerImgType, 400, 22, newRatio.width, newRatio.height, 10, 'NONE');
                                    }
                                }
                            }
                        };

                        var footer = function footer(data) {
                            if (currentpage < doc.internal.getNumberOfPages()) {
                                doc.setFontSize(10);
                                doc.setFontStyle('normal');
                                var str = $rootScope.getResourceText('LIT_PAGE') + " " + doc.internal.getNumberOfPages();
                                doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 30);
                                currentpage = doc.internal.getNumberOfPages();
                            }
                        };

                        var pageHeight = doc.internal.pageSize.height - 45; // Fetching title for the wizard which user has entered and converting to JSON data from HTML

                        var titleId = 'title-table';
                        var titleRes = doc.autoTableHtmlToJson(document.getElementById(titleId));
                        doc.autoTable(titleRes.columns, titleRes.data, {
                            beforePageContent: header,
                            afterPageContent: footer,
                            margin: {
                                top: 110
                            },
                            theme: 'grid',
                            startY: 100,
                            headerStyles: {
                                fontSize: 10,
                                fontStyle: 'normal',
                                fillStyle: 'DF',
                                rowHeight: 20,
                                overflow: 'linebreak',
                                fillColor: [apSBackRgbValue.r, apSBackRgbValue.g, apSBackRgbValue.b],
                                textColor: [apSForeRgbValue.r, apSForeRgbValue.g, apSForeRgbValue.b]
                            },
                            styles: {
                                overflow: 'linebreak'
                            }
                        });
                        var startYforNext = doc.autoTableEndPosY();
                        var wizardSteps = wizard.WizardSteps;

                        for (var i = 0; i < wizardSteps.length; i++) {
                            var wizardStep = wizardSteps[i];

                            if (!wizardStep.IsMultiTaskColumnsPresent) {
                                var stepId = 'step-table_' + wizardStep.Id;

                                if (document.getElementById(stepId) != null) {
                                    var res = doc.autoTableHtmlToJson(document.getElementById(stepId));
                                    doc.autoTable(res.columns, res.data, {
                                        beforePageContent: header,
                                        afterPageContent: footer,
                                        margin: {
                                            top: 110
                                        },
                                        tableWidth: '250',
                                        theme: 'grid',
                                        startY: doc.autoTableEndPosY() + 10 + heightAfterAttach,
                                        styles: {
                                            overflow: 'linebreak'
                                        },
                                        headerStyles: {
                                            fontSize: 10,
                                            fontStyle: 'normal',
                                            fillColor: [apSBackRgbValue.r, apSBackRgbValue.g, apSBackRgbValue.b],
                                            textColor: [apSForeRgbValue.r, apSForeRgbValue.g, apSForeRgbValue.b]
                                        },
                                        bodyStyles: {
                                            valign: 'top',
                                            halign: 'centre'
                                        }
                                    });
                                }

                                var columnGuideData = []; // Iterating to fetch column guide key and value data and add to the above declared array

                                if (wizardStep.ColumnGuides.length !== 0) {
                                    var columnGuides = wizardStep.ColumnGuides;

                                    for (var k = 0; k < columnGuides.length; k++) {
                                        var columnGuide = columnGuides[k];
                                        var cgText = columnGuide.Text;
                                        var cgAnswer = getColumnGuideEntity(columnGuide.Id, wizardStep.Id, null).AnswerText;
                                        columnGuideData.push(cgText);
                                        columnGuideData.push(cgAnswer);
                                    }
                                }

                                var wizardColumns = wizardStep.Columns;
                                var stepColumnId = 'column-table_' + wizardStep.Id;
                                var res = doc.autoTableHtmlToJson(document.getElementById(stepColumnId));
                                doc.autoTable(res.columns, res.data, {
                                    beforePageContent: header,
                                    afterPageContent: footer,
                                    margin: {
                                        top: 110
                                    },
                                    tableWidth: '250',
                                    theme: 'grid',
                                    headerStyles: {
                                        fontSize: 10,
                                        fontStyle: 'normal',
                                        rowHeight: 0.5,
                                        overflow: 'linebreak'
                                    },
                                    styles: {
                                        fillStyle: 'DF',
                                        font: 'Verdana',
                                        lineColor: [205, 205, 205],
                                        lineWidth: 0.1,
                                        overflow: 'linebreak',
                                        columnWidth: 257.5
                                    },
                                    startY: doc.autoTableEndPosY(),
                                    bodyStyles: {
                                        textColor: [80, 80, 80],
                                        valign: 'top',
                                        halign: 'centre',
                                        overflow: 'linebreak'
                                    },
                                    createdCell: function createdCell(cell, data) {
                                        var text = cell.text; // Replacing the fromCharCode to -- as this does not support in PDF

                                        if (columnGuideData.indexOf(text) > -1) {
                                            cell.styles.fontStyle = 'italic';
                                        }

                                        if (text.indexOf(String.fromCharCode(10143)) > -1) {
                                            var formattedText = text.replace(new RegExp(String.fromCharCode(10143), 'g'), '--');
                                            cell.text = formattedText;
                                        }
                                    }
                                });
                            } else {
                                var multiSolutions = personActionPlanWizard.MultiTaskSolutions;

                                for (var mt = 0; mt < multiSolutions.length; mt++) {
                                    var multiTask = multiSolutions[mt];
                                    var stepMtId = 'step-table_' + wizardStep.Id + '_' + multiTask.Id;

                                    if (document.getElementById(stepMtId) != null) {
                                        var res = doc.autoTableHtmlToJson(document.getElementById(stepMtId));
                                        doc.autoTable(res.columns, res.data, {
                                            beforePageContent: header,
                                            afterPageContent: footer,
                                            margin: {
                                                top: 110
                                            },
                                            tableWidth: '250',
                                            theme: 'grid',
                                            startY: doc.autoTableEndPosY() + 10 + heightAfterAttach,
                                            styles: {
                                                overflow: 'linebreak'
                                            },
                                            headerStyles: {
                                                fontSize: 10,
                                                fontStyle: 'normal',
                                                fillColor: [apSBackRgbValue.r, apSBackRgbValue.g, apSBackRgbValue.b],
                                                textColor: [apSForeRgbValue.r, apSForeRgbValue.g, apSForeRgbValue.b]
                                            },
                                            bodyStyles: {
                                                valign: 'top',
                                                halign: 'centre'
                                            }
                                        });
                                    }

                                    var wizardColumns = wizardStep.Columns;
                                    var stepMtColumnId = 'column-table_' + wizardStep.Id + '_' + multiTask.Id;
                                    var res = doc.autoTableHtmlToJson(document.getElementById(stepMtColumnId));
                                    doc.autoTable(res.columns, res.data, {
                                        beforePageContent: header,
                                        afterPageContent: footer,
                                        margin: {
                                            top: 110
                                        },
                                        tableWidth: '250',
                                        theme: 'grid',
                                        headerStyles: {
                                            fontSize: 10,
                                            fontStyle: 'normal',
                                            rowHeight: 0.5,
                                            overflow: 'linebreak'
                                        },
                                        styles: {
                                            fillStyle: 'DF',
                                            font: 'Verdana',
                                            lineColor: [205, 205, 205],
                                            lineWidth: 0.1,
                                            overflow: 'linebreak',
                                            columnWidth: 257.5
                                        },
                                        startY: doc.autoTableEndPosY(),
                                        bodyStyles: {
                                            textColor: [80, 80, 80],
                                            valign: 'top',
                                            halign: 'centre',
                                            overflow: 'linebreak'
                                        },
                                        createdCell: function createdCell(cell, data) {
                                            var text = cell.text; // Replacing the fromCharCode to -- as this does not support in PDF

                                            if (text.indexOf(String.fromCharCode(10143)) > -1) {
                                                var formattedText = text.replace(new RegExp(String.fromCharCode(10143), 'g'), '--');
                                                cell.text = formattedText;
                                            }
                                        }
                                    });
                                    var mtAttachments = multiTask.Attachments;

                                    if (mtAttachments.length !== 0) {
                                        var mtAttachId = 'attachment-mt-table_' + multiTask.Id;

                                        if (document.getElementById(mtAttachId) != null) {
                                            var res = doc.autoTableHtmlToJson(document.getElementById(mtAttachId));
                                            doc.autoTable(res.columns, res.data, {
                                                beforePageContent: header,
                                                afterPageContent: footer,
                                                margin: {
                                                    top: 110
                                                },
                                                tableWidth: '250',
                                                theme: 'grid',
                                                headerStyles: {
                                                    fontSize: 10,
                                                    fontStyle: 'normal',
                                                    rowHeight: 20,
                                                    overflow: 'linebreak',
                                                    fillColor: [255, 255, 255],
                                                    textColor: [apSForeRgbValue.r, apSForeRgbValue.g, apSForeRgbValue.b]
                                                },
                                                startY: doc.autoTableEndPosY(),
                                                drawHeaderRow: function drawHeaderRow(row, data) {
                                                    // Adding this method Header should not be displayed twice in the PDF. FT 7268
                                                    if (data.pageCount > 1) {
                                                        return false;
                                                    }
                                                }
                                            });
                                        }

                                        var heightValue = doc.autoTableEndPosY() + 10;
                                        var newPageHeight = doc.autoTableEndPosY();
                                        var attachList = [];
                                        heightAfterAttach = 0;

                                        for (var j = 0; j < mtAttachments.length; j++) {
                                            var pAttachment = mtAttachments[j];

                                            if (pAttachment.FileSourceBase64 != null) {
                                                var image = preloadedActionPlanImages[pAttachment.Id];

                                                if (image.complete) {
                                                    var newRatio = that.calculateAspectRatioFit(image.naturalWidth, image.naturalHeight, 200, 200);
                                                    var maxHeight = heightValue + newRatio.height; // Check for file header attachment and compute maxHeight if text exists 
                                                    // (This is if attachment has to be moved to new page in PDF)

                                                    if (pAttachment.FileHeader) {
                                                        var line = doc.splitTextToSize(pAttachment.FileHeader, 500);
                                                        var lineHeight = line.length * 9 + 10;
                                                        maxHeight += lineHeight + 10;
                                                    }

                                                    if (maxHeight >= pageHeight) {
                                                        doc.autoTableAddPage();
                                                        doc.autoTable([], [], {
                                                            beforePageContent: header,
                                                            afterPageContent: footer,
                                                            margin: {
                                                                top: 110
                                                            }
                                                        });
                                                        heightValue = doc.autoTableEndPosY() + 10;
                                                        newPageHeight = 110 + 20;
                                                        heightAfterAttach = 0;
                                                        doc.setLineWidth(0.3);
                                                        doc.setDrawColor(204, 204, 204);
                                                    }

                                                    var imageType = pAttachment.FileName.substr((~-pAttachment.FileName.lastIndexOf(".") >>> 0) + 2);
                                                    doc.addImage(image, imageType, 220, heightValue, newRatio.width, newRatio.height); // Include File header comments if exists in PDF

                                                    if (pAttachment.FileHeader) {
                                                        doc.addFont('Verdana-BoldItalic', 'Verdana', 'normal');
                                                        doc.setFont('Verdana');
                                                        doc.setFontSize(10);
                                                        doc.setTextColor(80, 80, 80);
                                                        heightValue += newRatio.height + 20;
                                                        var lines = doc.splitTextToSize(pAttachment.FileHeader, 500);
                                                        doc.text(45, heightValue, lines);
                                                        var eachLineHeight = lines.length * 9 + 10;
                                                        heightValue += eachLineHeight + 10;
                                                        doc.setLineWidth(1);
                                                        newPageHeight += newRatio.height + 20 + eachLineHeight + 10;
                                                        heightAfterAttach += newRatio.height + 10 + 20 + eachLineHeight;
                                                        doc.line(40, newPageHeight, 550, newPageHeight);
                                                    } else {
                                                        heightValue += newRatio.height + 20;
                                                        newPageHeight += newRatio.height + 20;
                                                        heightAfterAttach += newRatio.height + 20;
                                                        doc.setLineWidth(1);
                                                        doc.line(40, newPageHeight, 550, newPageHeight);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        } // Adding this file so as to not to display Attachments header in the PDF if Attachments are not there


                        var hasFileSource = false;
                        var pApAttachments = personActionPlanWizard.Attachments;

                        for (var attachChk = 0; attachChk < pApAttachments.length; attachChk++) {
                            var pAttachment = pApAttachments[attachChk];

                            if (pAttachment.FileSourceBase64 != null) {
                                hasFileSource = true;
                                break;
                            }
                        }

                        if (pApAttachments.length !== 0 && hasFileSource) {
                            var attachmentId = 'attachment-table';
                            var res = doc.autoTableHtmlToJson(document.getElementById(attachmentId));
                            doc.autoTable(res.columns, res.data, {
                                beforePageContent: header,
                                afterPageContent: footer,
                                margin: {
                                    top: 110
                                },
                                tableWidth: '250',
                                theme: 'grid',
                                headerStyles: {
                                    fontSize: 10,
                                    fontStyle: 'normal',
                                    rowHeight: 20,
                                    overflow: 'linebreak',
                                    fillColor: [apSBackRgbValue.r, apSBackRgbValue.g, apSBackRgbValue.b],
                                    textColor: [apSForeRgbValue.r, apSForeRgbValue.g, apSForeRgbValue.b]
                                },
                                startY: doc.autoTableEndPosY(),
                                drawHeaderRow: function drawHeaderRow(row, data) {
                                    // Adding this method Header should not be displayed twice in the PDF. FT 7268
                                    if (data.pageCount > 1) {
                                        return false;
                                    }
                                }
                            });
                        }

                        var heightValue = doc.autoTableEndPosY() + 10;
                        var newPageHeight = doc.autoTableEndPosY();
                        var attachList = [];

                        for (var j = 0; j < pApAttachments.length; j++) {
                            var pAttachment = pApAttachments[j];

                            if (pAttachment.FileSourceBase64 != null) {
                                var image = preloadedActionPlanImages[pAttachment.Id];

                                if (image.complete) {
                                    var newRatio = that.calculateAspectRatioFit(image.naturalWidth, image.naturalHeight, 200, 200);
                                    var maxHeight = heightValue + newRatio.height; // Check for file header attachment and compute maxHeight if text exists 
                                    // (This is if attachment has to be moved to new page in PDF)

                                    if (pAttachment.FileHeader) {
                                        var line = doc.splitTextToSize(pAttachment.FileHeader, 500);
                                        var lineHeight = line.length * 9 + 10;
                                        maxHeight += lineHeight + 10;
                                    }

                                    if (maxHeight >= pageHeight) {
                                        doc.autoTableAddPage();
                                        doc.autoTable([], [], {
                                            beforePageContent: header,
                                            afterPageContent: footer,
                                            margin: {
                                                top: 110
                                            }
                                        });
                                        heightValue = doc.autoTableEndPosY() + 10;
                                        newPageHeight = 110 + 20;
                                        doc.setLineWidth(0.3);
                                        doc.setDrawColor(204, 204, 204);
                                    }

                                    var imageType = pAttachment.FileName.substr((~-pAttachment.FileName.lastIndexOf(".") >>> 0) + 2);
                                    doc.addImage(image, imageType, 220, heightValue, newRatio.width, newRatio.height); // Include File header comments if exists in PDF

                                    if (pAttachment.FileHeader) {
                                        doc.addFont('Verdana-BoldItalic', 'Verdana', 'normal');
                                        doc.setFont('Verdana');
                                        doc.setFontSize(10);
                                        doc.setTextColor(80, 80, 80);
                                        heightValue += newRatio.height + 20;
                                        var lines = doc.splitTextToSize(pAttachment.FileHeader, 500);
                                        doc.text(45, heightValue, lines);
                                        var eachLineHeight = lines.length * 9 + 10;
                                        heightValue += eachLineHeight + 10;
                                        doc.setLineWidth(1);
                                        newPageHeight += newRatio.height + 20 + eachLineHeight + 10;
                                        doc.line(40, newPageHeight, 550, newPageHeight);
                                    } else {
                                        heightValue += newRatio.height + 20;
                                        newPageHeight += newRatio.height + 20;
                                        doc.setLineWidth(1);
                                        doc.line(40, newPageHeight, 550, newPageHeight);
                                    }
                                }
                            }
                        }

                        var currentRef = that;
                        setTimeout(function () {
                            currentRef.saveGenPdf(doc, def, attachList, wizard, personActionPlanWizard, isPdfEmail);
                        }, 1000);
                    }, function (error) {
                        console.log(error);
                    });
                    return def.promise;
                } catch (e) {
                    console.log(e);
                }
            },
            genPdfForAskade: function genPdfForAskade(personEntity, askadeWizardEntity, customerName, isPdfEmail) {
                try {
                    var loadImage = function loadImage(attach) {
                        return $q(function (resolve, reject) {
                            if (attach.FileSourceBase64 !== null) {

                                if (attach.FileName.indexOf('.pdf') !== -1) {
                                    isPdf = true;
                                    return resolve(attach.fileName);
                                };
                                var image = new Image();
                                image.pAkAId = attach.Id;
                                image.src = attach.FileSourceBase64;
                                image.addEventListener('load', function () {
                                    preloadedAskadeImages[this.pAkAId] = this;
                                    resolve(image);
                                });

                                image.onerror = function (e) {
                                    reject(e);
                                };
                            } else {
                                resolve(true);
                            }
                        });
                    };

                    var def = $q.defer();
                    var preloadedAskadeImages = [];
                    var promises = [];
                    var that = this;
                    var isPdf = false;

                    personEntity.Attachments.forEach(function (attach) {
                        promises.push(loadImage(attach));
                        promises.push(that.loadCustomerImage(preloadedAskadeImages));
                    });
                    personEntity.ColumnValues.forEach(function (column) {
                        promises.push(that.loadBase64ImageForAskade(column, preloadedAskadeImages));
                    });
                    $q.all(promises).then(function (results) {
                        // Fetching AskadeFileTypeWizard Entity from personAskadeEntity passed from function
                        var akWizard = askadeWizardEntity; // Initializing JSPDF

                        var doc = new jsPDF('p', 'pt'); // Initializing page count

                        var currentpage = 0; // This variable gives the height value where next table has to be added if a question has image included 

                        var heightAfterImage = 0;
                        var heightAfterAnsImg = 0;
                        var ansImagHeightVal = 0; // Fetching ColumnGuide Person Entity

                        function getColumnGuideEntity(guideId, columnId) {
                            var pAkEntity = getPersonAkStepColoumnAnswer(columnId);
                            var guides = pAkEntity.ColumnGuides;

                            for (var i = 0; i < guides.length; i++) {
                                var guide = guides[i];

                                if (guide.GuideId === guideId) {
                                    return guide;
                                }
                            }
                        } // Fetching Column Person entity


                        function getPersonAkStepColoumnAnswer(akColumnId) {
                            var personAk = personEntity;
                            var akPersonEntity = personEntity.ColumnValues;

                            for (var i = 0; i < akPersonEntity.length; i++) {
                                var entity = akPersonEntity[i];

                                if (akColumnId === entity.FileColumnId) {
                                    return entity;
                                }
                            }
                        } // Fetching askade step back color and converting to rgb


                        var akStepBackColor = akWizard.GroupBackColor;
                        var akSBackRgbValue = [];

                        if (akStepBackColor != null) {
                            akSBackRgbValue = that.convertHexToRgb(akStepBackColor);
                        } else {
                            akSBackRgbValue = {
                                r: 221,
                                g: 223,
                                b: 225
                            };
                        } // Fetching askade step fore color and converting to rgb


                        var akStepForeColor = akWizard.GroupForeColor;
                        var akSForeRgbValue = [];

                        if (akStepForeColor != null) {
                            akSForeRgbValue = that.convertHexToRgb(akStepForeColor);
                        } else {
                            akSForeRgbValue = {
                                r: 80,
                                g: 80,
                                b: 80
                            };
                        } // Header and footer options


                        var header = function header(data) {
                            // Defining Customer Name
                            doc.setFontSize(22);
                            doc.text(customerName, 40, 40); // Defining questionnaire name

                            doc.setFontSize(16);
                            doc.text(akWizard.Name, 40, 75); // Horizontal seperation line

                            doc.setLineWidth(1);
                            doc.line(0, 90, 90, 90);
                            doc.line(600, 90, 90, 90); // Adding image in the header section

                            var image = preloadedAskadeImages['headerImg'];

                            if (!angular.isUndefined(image)) {
                                if (image.complete) {
                                    var headerImgType = '';
                                    var splitValue = image.src.split(';');

                                    if (splitValue.length !== 0) {
                                        var splitValueLower = splitValue[0].toLowerCase();

                                        if (splitValueLower.indexOf("png") !== -1) {
                                            headerImgType = 'png';
                                        } else if (splitValueLower.indexOf("jpg") !== -1 || splitValueLower.indexOf("jpeg") !== -1) {
                                            headerImgType = 'jpeg';
                                        } else if (splitValueLower.indexOf("svg+xml") !== -1) {
                                            var data = that.convertSVGImage(image.src);
                                            image.src = data;
                                            headerImgType = 'png';
                                        }
                                    }

                                    if (image.naturalWidth < 150 && image.naturalHeight < 50) {
                                        doc.addImage(image, headerImgType, 550 - image.naturalWidth, 22, image.naturalWidth, image.naturalHeight, 10, 'NONE');
                                    } else {
                                        var newRatio = that.calculateAspectRatioFit(image.naturalWidth, image.naturalHeight, 150, 50);
                                        var mod = newRatio.width % 1;
                                        if (mod !== 0) {
                                            newRatio.width = Math.round(newRatio.width);
                                        }
                                        doc.addImage(image, headerImgType, 400, 22, newRatio.width, newRatio.height, 10, 'NONE');
                                    }
                                }
                            }
                        };

                        var footer = function footer(data) {
                            if (currentpage < doc.internal.getNumberOfPages()) {
                                doc.setFontSize(10);
                                doc.setFontStyle('normal');
                                var str = $rootScope.getResourceText('LIT_PAGE') + " " + doc.internal.getNumberOfPages();
                                doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 30);
                                currentpage = doc.internal.getNumberOfPages();
                            }
                        };

                        var AddSignature = function AddSignature(row, data, akColumns) {
                            if (row.cells[0].raw === 'Signature') {
                                for (var j = 0; j < akColumns.length; j++) {
                                    var akColumn = akColumns[j];
                                    if (akColumn.IsDependencyMet && akColumn.ColumnType === "Signature") {
                                        var cell1 = row.cells[0];
                                        cell1.text = akColumn.Text;
                                        cell1.styles.valign = "center";
                                        row.styles.fillStyle = "S";
                                        row.styles.rowHeight = 200;
                                        row.height = 200;
                                        row.heightStyle = 200;
                                        var signatureImage = preloadedAskadeImages[akColumn.FileColumnId + 'answerText'];
                                        var newRatio = that.calculateAspectRatioFit(signatureImage.naturalWidth, signatureImage.naturalHeight, 200, 200);
                                        var ansImgheightValue = doc.autoTableEndPosY() + 10;

                                        if (ansImgheightValue + newRatio.height + 60 >= pageHeight) {
                                            doc.autoTableAddPage();
                                            ansImgheightValue = doc.autoTableEndPosY() + 10;

                                            doc.setLineWidth(0.3);
                                            doc.setDrawColor(204, 204, 204);
                                        }

                                        doc.addImage(signatureImage, "image/png", 310, doc.autoTableEndPosY(), newRatio.width, newRatio.height, 20);
                                    }
                                }
                            }
                        }

                        var pageHeight = doc.internal.pageSize.height - 45; // Initilizing Askade wizard steps

                        var akWizSteps = akWizard.Steps;

                        for (var i = 0; i < akWizSteps.length; i++) {
                            var akStep = akWizSteps[i];
                            var stepId = 'step-table_ak_' + akStep.Id;

                            if (document.getElementById(stepId) != null) {
                                // If i == 0, start the y pos with 100 (because its the start of the PDF content),
                                // else use jspdf autotable built in method doc.autoTableEndPosY()
                                var startYPos = 0;

                                if (i == 0) {
                                    startYPos = 100;
                                } else {
                                    startYPos = doc.autoTableEndPosY() + 10;
                                } // Fetching the rendered HTML data and converting to JSON formatted data


                                var res = doc.autoTableHtmlToJson(document.getElementById(stepId));
                                doc.autoTable(res.columns, res.data, {
                                    beforePageContent: header,
                                    afterPageContent: footer,
                                    margin: {
                                        top: 110
                                    },
                                    tableWidth: '250',
                                    theme: 'grid',
                                    startY: startYPos,
                                    headerStyles: {
                                        fontSize: 10,
                                        fontStyle: 'normal',
                                        fillColor: [akSBackRgbValue.r, akSBackRgbValue.g, akSBackRgbValue.b],
                                        textColor: [akSForeRgbValue.r, akSForeRgbValue.g, akSForeRgbValue.b]
                                    },
                                    styles: {
                                        overflow: 'linebreak'
                                    },
                                    bodyStyles: {
                                        valign: 'top',
                                        halign: 'centre'
                                    }
                                });
                            } // Initilizing columns for each step iteration


                            var akColumns = akStep.Columns;

                            for (var j = 0; j < akColumns.length; j++) {
                                var akColumn = akColumns[j];
                                // Initilizing columnGuideData array for highlighting Column Guide in PDF

                                var columnGuideData = []; // Iterating to fetch column guide key and value data and add to the above declared array

                                if (akColumn.ColumnGuides.length !== 0) {
                                    var columnGuides = akColumn.ColumnGuides;

                                    for (var k = 0; k < columnGuides.length; k++) {
                                        var columnGuide = columnGuides[k];
                                        var cgText = columnGuide.Text;
                                        var cgAnswer = getColumnGuideEntity(columnGuide.Id, akColumn.FileColumnId).AnswerText;
                                        columnGuideData.push(cgText);
                                        columnGuideData.push(cgAnswer);
                                    }
                                }
                            }

                            var stepColumnId = 'column-table_ak_' + akStep.Id;
                            if (document.getElementById(stepColumnId) != null) {

                                var res = doc.autoTableHtmlToJson(document.getElementById(stepColumnId));

                                doc.autoTable(res.columns, res.data, {
                                    beforePageContent: header,
                                    afterPageContent: footer,
                                    margin: {
                                        top: 110
                                    },
                                    tableWidth: '250',
                                    theme: 'grid',
                                    headerStyles: {
                                        fillStyle: 'S',
                                        font: 'Verdana',
                                        fontStyle: 'normal',
                                        lineColor: [205, 205, 205],
                                        textColor: [80, 80, 80],
                                        lineWidth: 0.1,
                                        fillColor: [255, 255, 255],
                                        overflow: 'linebreak',
                                        columnWidth: 257.5
                                    },
                                    pageBreak: 'auto',
                                    styles: {
                                        fillStyle: 'S',
                                        font: 'Verdana',
                                        lineColor: [205, 205, 205],
                                        lineWidth: 0.1,
                                        overflow: 'linebreak',
                                        columnWidth: 257.5
                                    },
                                    startY: doc.autoTableEndPosY(),
                                    bodyStyles: {
                                        textColor: [80, 80, 80],
                                        valign: 'top',
                                        halign: 'centre',
                                        overflow: 'linebreak'
                                    },
                                    drawHeaderRow: function drawHeaderRow(row, data) {
                                        if (data.pageCount > 1) {
                                            return false;
                                        }
                                        if (data.pageCount == 1) {
                                            AddSignature(row, data, akColumns);
                                        }
                                    },
                                    drawRow: function drawRow(row, data) {
                                        AddSignature(row, data, akColumns);
                                    },
                                    createdCell: function createdCell(cell, data) {
                                        var text = cell.text; // Highlighting Column Guide data
                                        if (columnGuideData.indexOf(text) > -1) {
                                            cell.styles.fontStyle = 'italic';
                                        }
                                        if (text.indexOf(String.fromCharCode(10143)) > -1) {
                                            var formattedText = text.replace(new RegExp(String.fromCharCode(10143), 'g'), '--');
                                            cell.text = formattedText;
                                        }
                                    }
                                });
                            }

                        } // Adding this file so as to not to display Attachments header in the PDF if Attachments are not there


                        var hasFileSource = false;
                        var pAkAttachments = personEntity.Attachments;

                        for (var attachChk = 0; attachChk < pAkAttachments.length; attachChk++) {
                            var pAttachment = pAkAttachments[attachChk];

                            if (pAttachment.FileSourceBase64 != null) {
                                hasFileSource = true;
                                break;
                            }
                        }

                        if (pAkAttachments.length !== 0 && hasFileSource) {
                            var attachmentId = 'attachment-table_ak';
                            var res = doc.autoTableHtmlToJson(document.getElementById(attachmentId));
                            doc.autoTable(res.columns, res.data, {
                                beforePageContent: header,
                                afterPageContent: footer,
                                margin: {
                                    top: 110
                                },
                                tableWidth: '250',
                                theme: 'grid',
                                headerStyles: {
                                    fillColor: [akSBackRgbValue.r, akSBackRgbValue.g, akSBackRgbValue.b],
                                    textColor: [akSForeRgbValue.r, akSForeRgbValue.g, akSForeRgbValue.b],
                                    fontSize: 10,
                                    fontStyle: 'normal',
                                    rowHeight: 20,
                                    overflow: 'linebreak'
                                },
                                startY: doc.autoTableEndPosY() + 10,
                                drawHeaderRow: function drawHeaderRow(row, data) {
                                    // Adding this method Header should not be displayed twice in the PDF. FT 7268
                                    if (data.pageCount > 1) {
                                        return false;
                                    }
                                }
                            });
                        }

                        var heightValue = doc.autoTableEndPosY() + 10;
                        var newPageHeight = doc.autoTableEndPosY();
                        var attachList = [];

                        for (var j = 0; j < pAkAttachments.length; j++) {
                            var pAttachment = pAkAttachments[j];

                            if (pAttachment.FileSourceBase64 != null) {

                                if (!isPdf) {
                                    var image = preloadedAskadeImages[pAttachment.Id];

                                    if (image.complete) {
                                        var newRatio = that.calculateAspectRatioFit(image.naturalWidth, image.naturalHeight, 200, 200);
                                        var maxHeight = heightValue + newRatio.height; // Check for file header attachment and compute maxHeight if text exists 
                                        // (This is if attachment has to be moved to new page in PDF)

                                        if (pAttachment.FileHeader) {
                                            var line = doc.splitTextToSize(pAttachment.FileHeader, 500);
                                            var lineHeight = line.length * 9 + 10;
                                            maxHeight += lineHeight + 10;
                                        }

                                        if (maxHeight >= pageHeight) {
                                            doc.autoTableAddPage();
                                            doc.autoTable([], [], {
                                                beforePageContent: header,
                                                afterPageContent: footer,
                                                margin: {
                                                    top: 110
                                                }
                                            });
                                            heightValue = doc.autoTableEndPosY() + 10;
                                            newPageHeight = 110 + 20;
                                            doc.setLineWidth(0.3);
                                            doc.setDrawColor(204, 204, 204);
                                        }

                                        var imageType = pAttachment.FileName.substr((~-pAttachment.FileName.lastIndexOf(".") >>> 0) + 2);
                                        doc.addImage(image, imageType, 220, heightValue, newRatio.width, newRatio.height); // Include File header comments if exists in PDF

                                        if (pAttachment.FileHeader) {
                                            doc.addFont('Verdana-BoldItalic', 'Verdana', 'normal');
                                            doc.setFont('Verdana');
                                            doc.setFontSize(10);
                                            doc.setTextColor(80, 80, 80);
                                            heightValue += newRatio.height + 20;
                                            var lines = doc.splitTextToSize(pAttachment.FileHeader, 500);
                                            doc.text(45, heightValue, lines);
                                            var eachLineHeight = lines.length * 9 + 10;
                                            heightValue += eachLineHeight + 10;
                                            doc.setLineWidth(1);
                                            newPageHeight += newRatio.height + 20 + eachLineHeight + 10;
                                            doc.line(40, newPageHeight, 550, newPageHeight);
                                        } else {
                                            heightValue += newRatio.height + 20;
                                            newPageHeight += newRatio.height + 20;
                                            doc.setLineWidth(1);
                                            doc.line(40, newPageHeight, 550, newPageHeight);
                                        }
                                    }
                                }
                            }
                        }

                        var currentRef = that;
                        setTimeout(function () {
                            currentRef.saveGenPdf(doc, def, attachList, akWizard, personEntity, isPdfEmail);
                        }, 1000);
                    }, function (error) {
                        console.log(error);
                    });
                    return def.promise;
                } catch (e) {
                    console.log(e);
                }
            },
            convertSVGImage: function convertSVGImage(data) {
                //creating canvas to render the svg

                var canvasX = document.createElement("CANVAS");
                canvasX.setAttribute("class", "canvas");
                var ctx = canvasX.getContext("2d");
                ctx.fillStyle = "#FF0000";
                ctx.fillRect(20, 20, 150, 100);

                $("body").append(canvasX);

                //creating image element to attach the svg image data 

                var x = document.createElement("IMG");
                x.setAttribute("class", "canvasImage");
                x.setAttribute("src", data);
                x.setAttribute("width", "220");
                x.setAttribute("height", "60");

                $("body").append(x);

                //getting the elements canvas and image based on id

                var canImage = document.querySelector('.canvasImage');
                var canvas = document.querySelector('.canvas');
                var ctx = canvas.getContext("2d");
                var w = canvas.width;
                var h = canvas.height;
                ctx.clearRect(0, 0, w, h);
                //drawing svg image on canvas
                ctx.drawImage(canImage, 0, 0, w, h);
                //generating URI from svg image to png using the canvas
                var imgData = canvas.toDataURL('image/png');
                //removing the created elements
                $('.canvasImage').remove();
                $('canvas').remove();
                return imgData;
            }
        };
        return pdfUtil;
    }]);
    app.factory('GeneralUtil', ['$cordovaDatePicker', function ($cordovaDatePicker) {
        var genUtil = {
            intersect: function intersect(arg1, arg2) {
                return arg1.filter(function (n) {
                    return arg2.indexOf(n) != -1;
                });
            },
            arrayDifference: function arrayDifference(arg1, arg2) {
                var a = [],
                    diff = [];

                for (var i = 0; i < arg1.length; i++) {
                    a[arg1[i]] = true;
                }

                for (var i = 0; i < arg2.length; i++) {
                    if (a[arg2[i]]) {
                        delete a[arg2[i]];
                    } else {
                        a[arg2[i]] = true;
                    }
                }

                for (var k in a) {
                    diff.push(k);
                }

                return diff;
            },
            isPresentInArray: function isPresentInArray(arr, val) {
                arr.some(function (arrVal) {
                    return arrVal === val;
                });
            },
            regexExpCheck: function regexExpCheck(regexTxt, regexExp) {
                var term = regexTxt;
                var re = new RegExp(regexExp);

                if (re.test(term)) {
                    return true;
                } else {
                    return false;
                }
            },
            differenceDate: function differenceDate(previousDate) {
                var startDate = previousDate;
                var dateDiff = new Date() - new Date(startDate);
                var numberOfDays = Math.round(dateDiff / (1000 * 60 * 60 * 24));
                return numberOfDays;
            },
            pickTime: function pickTime(title, theme) {
                var options = {
                    date: new Date(),
                    mode: 'time',
                    is24Hour: 'true',
                    androidTheme: theme,
                    titleText: title
                }
                var timepicker = $cordovaDatePicker.show(options)
                    .then(function (time) {
                        var Hour = time.getHours();
                        var Minute = time.getMinutes();
                        if (Hour.toString().length < 2) {
                            Hour = "0" + Hour;
                        }
                        if (Minute.toString().length < 2) {
                            Minute = "0" + Minute;
                        }
                        var finalTime = Hour + ':' + Minute;
                        return finalTime;
                    });
                return timepicker;
            },
            pickDate: function pickDate(maxDate, date, theme, minDate) {
                //check for the maxdate if present then its converted to integer
                var maxDt = "";
                
                if (maxDate !== null && maxDate !== undefined) {
                    maxDt = new Date(maxDate).valueOf();
                }

                var minDt = "";
                if (minDate !== null && minDate !== undefined) {
                    minDt = new Date(minDate).valueOf();
                }

                var dateValue = new Date().valueOf();
                //if date present 
                if (date !== null && date !== undefined) {
                    //date is converted to integer 
                    var dateValue = new Date(date).valueOf();
                }
                var options = {
                    date: new Date(dateValue),
                    mode: "date",
                    maxDate: maxDt,
                    minDate: minDt,
                    androidTheme: theme
                }
                var datepicker = $cordovaDatePicker.show(options)
                    .then(function (date) {
                        var d = new Date();
                        var h = d.getHours();
                        var m = d.getMinutes();
                        var s = d.getSeconds();
                        var finalDate = new Date(date.setHours(h, m, s));
                        return finalDate;
                    });
                return datepicker;
            }
        };
        return genUtil;
    }]);
    app.factory('DeviceInfoUtil', ["$cordovaDevice", function ($cordovaDevice) {
        var deviceInfo = {
            getDeviceUUID: function getDeviceUUID() {
                var uuid = $cordovaDevice.getUUID();
                return uuid;
            },
            getAllDeviceInfo: function getAllDeviceInfo() {
                var uuid = $cordovaDevice.getUUID();
                var deviceInfo = $cordovaDevice.getDevice();
                return deviceInfo;
            },
            getPlatformVersion: function getPlatformVersion() {
                return ionic.Platform.version();
            }
        };
        return deviceInfo;
    }]);
    app.factory('DocumentLibraryUtil', ["FileUtil", "$q", "LoaderService", "PopupUtil", "$injector", function (FileUtil, $q, LoaderService, PopupUtil, $injector) {
        var dlUtil = {
            checkIfDLFileSaveLocally: function checkIfDLFileSaveLocally(dlDownloadedData, subDirName) {
                var def = $q.defer();
                var returnDataList = [];
                var counter = 0;
                var userDetails = $injector.get('userDetailsManager');
                var userData = userDetails.getUserLastLoggedTimeStamp();
                if (dlDownloadedData.length !== 0) {
                    for (var i = 0; i < dlDownloadedData.length; i++) {
                        var dlData = dlDownloadedData[i];
                        var computeProm = this.computeFileInsertData(dlData, i, subDirName, userData.Customer.SpecialCharactersToMask);
                        computeProm.then(function (successData) {
                            counter += 1;
                            returnDataList.push(successData);

                            if (counter === dlDownloadedData.length) {
                                def.resolve(returnDataList);
                            }
                        }, function (error) {
                            def.reject(false);
                        });
                    }
                } else {
                    def.resolve([]);
                }

                return def.promise;
            },
            computeFileInsertData: function computeFileInsertData(dlData, index, subDirName, spclChrMaskLst) {
                var computePromise = $q.defer();
                var isFileSourceBase64 = dlData.FileSourceBase64;
                var fileName = dlData.FileName;
                var filePath = null;
                var re = /(?:\.([^.]+))?$/;
                var getExtension = re.exec(fileName)[1];
                var contentType = FileUtil.getContentType(getExtension);

                if (isFileSourceBase64) {
                    var encriptedFileName = this.maskSpecialCharacters(dlData.FileName, spclChrMaskLst);
                    dlData.EncriptedFileName = encriptedFileName;
                    var filePathPromise = FileUtil.saveFileLocally(isFileSourceBase64, contentType, encriptedFileName, subDirName);
                    filePathPromise.then(function (successFilePath) {
                        filePath = successFilePath;
                        var returnDataList = {
                            'filePath': filePath,
                            'data': dlData,
                            'sortOrder': index,
                            'type': contentType
                        };
                        computePromise.resolve(returnDataList);
                    }, function (error) {
                        console.log(error);
                        computePromise.reject(false); // need to clarify
                    });
                } else {
                    var returnDataList = {
                        'filePath': filePath,
                        'data': dlData,
                        'sortOrder': index
                    };
                    computePromise.resolve(returnDataList);
                }

                return computePromise.promise;
            },
            encodeHTMLString: function encodeHTMLString(htmlData) {
                var encodedData = encodeURIComponent(htmlData);
                return encodedData;
            },
            decodeHTMLString: function decodeHTMLString(encodedHtmlData) {
                var decodedData = decodeURIComponent(encodedHtmlData);
                return decodedData;
            },
            download: function download(Doc) {
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
                    var CommonMethodsFactory = $injector.get('CommonMethodsFactory');
                    if (CommonMethodsFactory != null)
                        var ref = CommonMethodsFactory.openInAppBrowser(uri, "_blank", "location=yes");
                }
            },
            openHtmlDocument: function openHtmlDocument(htmlDoc, currentScope) {
                currentScope.docModalTitle = htmlDoc.Text;
                var decodedContent = this.decodeHTMLString(htmlDoc.HtmlContent); //To prevent the ng-bind-error on click of popup

                var content = angular.element('<div/>').html(decodedContent);
                PopupUtil.htmlDocAlert(currentScope.docModalTitle, content);
            },
            maskSpecialCharacters: function maskSpecialCharacters(str, chrLst) {
                var specialCharacterslist = chrLst.split(',');
                for(var i = 0; i < specialCharacterslist.length; i++) {
                    var specialCharacter = specialCharacterslist[i];
                    if (str.includes(specialCharacter))
                        str = str.replace(specialCharacter, `s${specialCharacterslist.indexOf(specialCharacter)}c`);
                }
                return str;
            }
        };
        return dlUtil;
    }]);
    app.factory('IOSUtil', function () {
        var iosUtil = {
            correctIOSPath: function correctIOSPath(fileLocationPath) {
                // Adding IOS check, so as to handle path issue after the change related to moving files to a specific folder.
                // In IOS on app update path name used to update because of this attachments were missing
                var isIPad = ionic.Platform.isIPad();
                var isIOS = ionic.Platform.isIOS();
                var directoryPath = fileLocationPath;

                if (isIPad || isIOS) {
                    if (directoryPath.indexOf('ImageFiles') >= 0) {
                        directoryPath = cordova.file.dataDirectory + 'ImageFiles/';
                    } else {
                        directoryPath = cordova.file.dataDirectory;
                    }
                }

                return directoryPath;
            }
        };
        return iosUtil;
    });
    app.factory('TextToSpeachUtil', ["userDetailsManager", function (userDetailsManager) {
        var ttsUtil = {
            convertTextToSpeach: function convertTextToSpeach(speechString) {
                var userDetail = userDetailsManager.getUserLastLoggedTimeStamp();
                var readSpeed = 0.75;
                if (userDetail != null && userDetail.Customer.ReadAloudSpeed) {
                    readSpeed = Number(userDetail.Customer.ReadAloudSpeed) / 10;
                }
                var userPrefLang = window.localStorage.getItem('userLanguage');
                TTS.speak({
                    text: speechString,
                    locale: userPrefLang,
                    rate: readSpeed
                }, function (success) {// Success scenario, 
                }, function (reason) {// Fail scenario
                });
            },
            pauseTextToSpeech: function pauseTextToSpeech() {
                TTS.playSilentUtterance(1000, QUEUE_ADD, null);
            },
            playTextToSpeech: function playTextToSpeech(instance, type) {
                this.fetchCompleteString(instance, type);
            },
            stripHTML: function stripHTML(html) {
                var tmp = document.createElement("DIV");
                tmp.innerHTML = html;
                return (tmp.textContent || tmp.innerText || "").replace(/'/g, "\x27");
            }
        };
        return ttsUtil;
    }]);
    app.factory('SpeachToTextUtil', ["$q", "DeviceInfoUtil", "DeviceUtil", "AppMessages", function ($q, DeviceInfoUtil, DeviceUtil, AppMessages) {
        var sttUtil = {
            isRecognitionAvailable: function isRecognitionAvailable() {
                var def = $q.defer();
                window.plugins.speechRecognition.isRecognitionAvailable(function (available) {
                    if (available) {
                        // You can use the speechRecognition
                        def.resolve();
                    }
                }, function (err) {
                    console.error(err);
                    def.reject(err);
                });
                return def.promise;
            },
            hasPermission: function hasPermission() {
                var def = $q.defer();
                var thisRef = this;
                window.plugins.speechRecognition.hasPermission(function (isGranted) {
                    if (isGranted) {
                        // Do other things as the initialization here
                        def.resolve();
                    } else {
                        // You need to request the permissions
                        var reqPer = thisRef.requestPermission();
                        reqPer.then(function () {
                            def.resolve();
                        }, function () {
                            def.reject();
                        });
                    }
                }, function (err) {
                    console.log(err);
                    def.reject(err);
                });
                return def.promise;
            },
            requestPermission: function requestPermission() {
                var def = $q.defer();
                window.plugins.speechRecognition.requestPermission(function () {
                    // Requested
                    def.resolve();
                }, function (err) {
                    // Opps, nope
                    def.reject(err);
                });
                return def.promise;
            },
            startListening: function startListening() {
                var def = $q.defer();
                var isOnline = DeviceUtil.isDeviceOnline();
                var thisRef = this;

                if (isOnline === false) {
                    AppMessages.Error($rootScope.getResourceText('LIT_ALERT'), $rootScope.getResourceText('MSG_CHECK_INTERNET_CONNECTION'));
                    def.reject();
                } else {
                    var userPrefLang = window.localStorage.getItem('userLanguage');
                    var settings = {
                        lang: userPrefLang,
                        showPopup: true
                    };
                    window.plugins.speechRecognition.startListening(function (result) {
                        def.resolve(result);
                    }, function (err) {
                        def.reject(err);
                        thisRef.hasPermission();
                    }, settings);
                }

                return def.promise;
            },
            stopListening: function stopListening() {
                var def = $q.defer();
                window.plugins.speechRecognition.stopListening(function () {
                    def.resolve(); // No more recognition
                }, function (err) {
                    console.log(err);
                    def.reject(err);
                });
                return def.promise;
            },
            checkAndroidVersion: function checkAndroidVersion() {
                if (ionic.Platform.isAndroid()) {
                    return true;
                }
                // return false if IOS
                return false;
            }
        };
        return sttUtil;
    }]);
})();


/***/ }),

/***/ 2:
/*!***************************************************************************************************************!*\
  !*** multi ./scripts/EntityHelper.js ./scripts/DataModels.js ./scripts/common.js ./scripts/camera-gallery.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./scripts/EntityHelper.js */"./scripts/EntityHelper.js");
__webpack_require__(/*! ./scripts/DataModels.js */"./scripts/DataModels.js");
__webpack_require__(/*! ./scripts/common.js */"./scripts/common.js");
module.exports = __webpack_require__(/*! ./scripts/camera-gallery.js */"./scripts/camera-gallery.js");


/***/ })

/******/ });
//# sourceMappingURL=modelapp.bundle.js.map