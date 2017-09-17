var Mvc;
(function (Mvc) {
    ;
})(Mvc || (Mvc = {}));
var Mvc;
(function (Mvc) {
    var FieldReaderType;
    (function (FieldReaderType) {
        FieldReaderType["Input"] = "InputFieldReader";
        FieldReaderType["Kendo"] = "KendoFieldReader";
        FieldReaderType["CheckBox"] = "CheckBoxFieldReader";
    })(FieldReaderType = Mvc.FieldReaderType || (Mvc.FieldReaderType = {}));
    ;
})(Mvc || (Mvc = {}));
/// <reference path="IFieldReader.ts"/>
/// <reference path="FieldReaderType.ts"/>
var Mvc;
(function (Mvc) {
    var FieldMappingModel = /** @class */ (function () {
        function FieldMappingModel(model) {
            this.fieldId = model.fieldId;
            this.modelProperty = model.modelProperty;
            this.modelType = model.modelType;
            this.reader = model.reader;
            if (this.modelProperty == null) {
                throw new Error("modelProperty cannot be null");
            }
            if (this.fieldId == null)
                this.fieldId = this.modelProperty;
            if (this.modelType == null)
                this.modelType = "string";
            if (this.reader == null)
                this.reader = Mvc.FieldReaderType.Input;
        }
        ;
        return FieldMappingModel;
    }());
    Mvc.FieldMappingModel = FieldMappingModel;
    ;
})(Mvc || (Mvc = {}));
/// <reference path="IFieldReader.ts"/>
/// <reference path="FieldMappingModel.ts"/>
/// <reference path="FieldReaderType.ts"/>
var Mvc;
(function (Mvc) {
    var FieldHelper = /** @class */ (function () {
        function FieldHelper(mapping, model) {
            this.Model = model;
            if (this.Model == null)
                this.Model = {};
            this.mapping = mapping;
            this.readers = {};
        }
        ;
        FieldHelper.prototype.getFieldReader = function (type) {
            if (this.readers[type.toString()] == null) {
                this.readers[type.toString()] = eval("new Mvc." + type.toString() + "()");
            }
            return this.readers[type.toString()];
        };
        ;
        FieldHelper.prototype.setModel = function () {
            var mappingLength = this.mapping.length;
            for (var index = 0; index < mappingLength; index++) {
                var mappingField = this.mapping[index];
                this.getFieldReader(mappingField.reader).setModelValue(mappingField, this.Model);
            }
        };
        ;
        FieldHelper.prototype.getModel = function () {
            var mappingLength = this.mapping.length;
            for (var index = 0; index < mappingLength; index++) {
                var mappingField = this.mapping[index];
                this.getFieldReader(mappingField.reader).getModelValue(mappingField, this.Model);
            }
        };
        ;
        FieldHelper.prototype.clearModel = function () {
            var mappingLength = this.mapping.length;
            for (var index = 0; index < mappingLength; index++) {
                var mappingField = this.mapping[index];
                this.Model[mappingField.modelProperty] = "";
            }
            this.getModel();
        };
        ;
        return FieldHelper;
    }());
    Mvc.FieldHelper = FieldHelper;
    ;
})(Mvc || (Mvc = {}));
/// <reference path="../IFieldReader.ts"/>
/// <reference path="../FieldMappingModel.ts"/>
/// <reference path="../definitions/jquery.d.ts"/>
var Mvc;
(function (Mvc) {
    var CheckBoxFieldReader = /** @class */ (function () {
        function CheckBoxFieldReader() {
        }
        CheckBoxFieldReader.prototype.getModelValue = function (mapping, model) {
            var element = $("#" + mapping.fieldId);
            if (element == null)
                return;
            if (model[mapping.modelProperty] == null)
                return;
            element.prop("checked", model[mapping.modelProperty]);
        };
        ;
        CheckBoxFieldReader.prototype.setModelValue = function (mapping, model) {
            var element = $("#" + mapping.fieldId);
            if (element == null)
                return;
            model[mapping.modelProperty] = element.prop("checked");
        };
        return CheckBoxFieldReader;
    }());
    Mvc.CheckBoxFieldReader = CheckBoxFieldReader;
})(Mvc || (Mvc = {}));
/// <reference path="../IFieldReader.ts"/>
/// <reference path="../definitions/jquery.d.ts"/>
/// <reference path="../FieldMappingModel.ts"/>
var Mvc;
(function (Mvc) {
    var InputFieldReader = /** @class */ (function () {
        function InputFieldReader() {
        }
        InputFieldReader.prototype.getModelValue = function (mapping, model) {
            var element = $("#" + mapping.fieldId);
            if (element == null)
                return;
            if (model[mapping.modelProperty] == null)
                return;
            element.val(model[mapping.modelProperty]);
        };
        ;
        InputFieldReader.prototype.setModelValue = function (mapping, model) {
            var element = $("#" + mapping.fieldId);
            if (element == null)
                return;
            model[mapping.modelProperty] = element.val();
        };
        return InputFieldReader;
    }());
    Mvc.InputFieldReader = InputFieldReader;
    ;
})(Mvc || (Mvc = {}));
