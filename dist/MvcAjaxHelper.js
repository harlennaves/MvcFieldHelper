var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Mvc;
(function (Mvc) {
    var FieldFormatterType;
    (function (FieldFormatterType) {
        FieldFormatterType["Date"] = "DateFormatter";
    })(FieldFormatterType = Mvc.FieldFormatterType || (Mvc.FieldFormatterType = {}));
    ;
})(Mvc || (Mvc = {}));
///<reference path="FieldFormatterType.ts"/>
var Mvc;
(function (Mvc) {
    var FieldFormatModel = /** @class */ (function () {
        function FieldFormatModel(model) {
            if (model.type != null)
                this.type = model.type;
            if (model.format != null)
                this.format = model.format;
        }
        ;
        return FieldFormatModel;
    }());
    Mvc.FieldFormatModel = FieldFormatModel;
    ;
})(Mvc || (Mvc = {}));
var Mvc;
(function (Mvc) {
    ;
})(Mvc || (Mvc = {}));
/// <reference path="IFieldFormatter.ts"/>
var Mvc;
(function (Mvc) {
    ;
})(Mvc || (Mvc = {}));
var Mvc;
(function (Mvc) {
    var FieldReaderType;
    (function (FieldReaderType) {
        FieldReaderType["Input"] = "InputFieldReader";
        FieldReaderType["CheckBox"] = "CheckBoxFieldReader";
        FieldReaderType["KendoDropDown"] = "KendoDropDownListFieldReader";
        FieldReaderType["KendoDatePicker"] = "KendoDatePickerFieldReader";
        FieldReaderType["KendoNumericTextBox"] = "KendoNumericTextBoxFieldReader";
    })(FieldReaderType = Mvc.FieldReaderType || (Mvc.FieldReaderType = {}));
    ;
})(Mvc || (Mvc = {}));
/// <reference path="IFieldReader.ts"/>
/// <reference path="FieldReaderType.ts"/>
/// <reference path="FieldFormatModel.ts"/>
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
            if (model.formatter != null)
                this.formatter = new Mvc.FieldFormatModel({ type: model.formatter });
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
/// <reference path="IFieldFormatter.ts"/>
/// <reference path="FieldFormatModel.ts"/>
/// <reference path="definitions/jquery.d.ts"/>
var Mvc;
(function (Mvc) {
    var FieldHelper = /** @class */ (function () {
        function FieldHelper(model) {
            this.Model = model;
            if (this.Model == null)
                this.Model = {};
            this.mapping = [];
            this.readers = {};
            this.formatters = {};
            this.initializeMapping();
        }
        FieldHelper.prototype.initializeMapping = function () {
            var elements = $("[data-Property]");
            if (elements == null || elements.length == 0)
                return;
            for (var index = 0; index < elements.length; index++) {
                var el = elements[index];
                var modelProperty = el.attributes["data-property"];
                var readerProperty = el.attributes["data-reader"];
                var formatterProperty = el.attributes["data-formatter"];
                this.mapping.push(new Mvc.FieldMappingModel({
                    fieldId: el.id,
                    modelProperty: modelProperty == null ? el.id : modelProperty.value,
                    reader: readerProperty == null ? null : Mvc.FieldReaderType[readerProperty.value],
                    formatter: formatterProperty == null ? null : formatterProperty.value
                }));
            }
        };
        ;
        ;
        FieldHelper.prototype.getFieldReader = function (type) {
            if (this.readers[type.toString()] == null) {
                this.readers[type.toString()] = eval("new Mvc." + type.toString() + "()");
            }
            return this.readers[type.toString()];
        };
        ;
        FieldHelper.prototype.getFieldFormatter = function (format) {
            if (format == null || format.type == null)
                return null;
            var typeName = format.type.toString();
            if (this.formatters[typeName] == null) {
                this.formatters[typeName] = eval("new Mvc." + Mvc.FieldFormatterType[typeName] + "()");
            }
            return this.formatters[typeName];
        };
        ;
        FieldHelper.prototype.setModel = function () {
            var mappingLength = this.mapping.length;
            for (var index = 0; index < mappingLength; index++) {
                var mappingField = this.mapping[index];
                this.getFieldReader(mappingField.reader).setModelValue(mappingField, this.Model, this.getFieldFormatter(mappingField.formatter));
            }
        };
        ;
        FieldHelper.prototype.getModel = function () {
            var mappingLength = this.mapping.length;
            for (var index = 0; index < mappingLength; index++) {
                var mappingField = this.mapping[index];
                this.getFieldReader(mappingField.reader).getModelValue(mappingField, this.Model, this.getFieldFormatter(mappingField.formatter));
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
/// <reference path="../IFieldFormatter.ts"/>
var Mvc;
(function (Mvc) {
    var DateFormatter = /** @class */ (function () {
        function DateFormatter() {
            this.defaultFormat = "dd/mm/yyyy";
        }
        DateFormatter.prototype.getDate = function (s) {
            if (s.indexOf("Date") != -1)
                return new Date(parseFloat(/Date\(([^)]+)\)/.exec(s)[1]));
            if (s.indexOf("/") != -1) {
                var dateParts = s.split("/");
                return new Date(parseInt(dateParts[2]), parseInt(dateParts[1]) - 1, parseInt(dateParts[0]));
            }
            return null;
        };
        ;
        DateFormatter.prototype.getValue = function (value) {
            return this.getDate(value);
        };
        DateFormatter.prototype.format = function (value) {
            if (value == null)
                return "";
            var date;
            if (value instanceof Date)
                date = value;
            else
                date = this.getDate(value.toString());
            if (date == null || !(date instanceof Date))
                return "";
            return date.format(this.defaultFormat);
        };
        return DateFormatter;
    }());
    Mvc.DateFormatter = DateFormatter;
})(Mvc || (Mvc = {}));
/// <reference path="../IFieldReader.ts"/>
/// <reference path="../FieldMappingModel.ts"/>
/// <reference path="../definitions/jquery.d.ts"/>
var Mvc;
(function (Mvc) {
    var CheckBoxFieldReader = /** @class */ (function () {
        function CheckBoxFieldReader() {
        }
        CheckBoxFieldReader.prototype.getModelValue = function (mapping, model, format) {
            var element = $("#" + mapping.fieldId);
            if (element == null)
                return;
            if (model[mapping.modelProperty] == null)
                return;
            element.prop("checked", model[mapping.modelProperty]);
        };
        ;
        CheckBoxFieldReader.prototype.setModelValue = function (mapping, model, format) {
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
        InputFieldReader.prototype.getModelValue = function (mapping, model, format) {
            var element = $("#" + mapping.fieldId);
            if (element == null)
                return;
            if (model[mapping.modelProperty] == null)
                return;
            var value = model[mapping.modelProperty];
            element.val(format == null ? value : format.format(value));
        };
        ;
        InputFieldReader.prototype.setModelValue = function (mapping, model, format) {
            var element = $("#" + mapping.fieldId);
            if (element == null)
                return;
            model[mapping.modelProperty] = format == null ? element.val() : format.getValue(element.val());
        };
        return InputFieldReader;
    }());
    Mvc.InputFieldReader = InputFieldReader;
    ;
})(Mvc || (Mvc = {}));
/// <reference path="../IFieldReader.ts"/>
/// <reference path="../FieldMappingModel.ts"/>
/// <reference path="../definitions/jquery.d.ts"/>
var Mvc;
(function (Mvc) {
    var KendoFieldReaderBase = /** @class */ (function () {
        function KendoFieldReaderBase(componentName) {
            this.componentName = componentName;
        }
        ;
        KendoFieldReaderBase.prototype.getModelValue = function (mapping, model, format) {
            var element = $("#" + mapping.fieldId);
            if (element == null)
                return;
            var kendoElement = element.data(this.componentName);
            if (kendoElement == null)
                return;
            var value = model[mapping.modelProperty];
            if (format != null)
                value = format.format(value);
            kendoElement.value(value);
        };
        ;
        KendoFieldReaderBase.prototype.setModelValue = function (mapping, model, format) {
            var element = $("#" + mapping.fieldId);
            if (element == null)
                return;
            var kendoElement = element.data(this.componentName);
            if (kendoElement == null)
                return;
            model[mapping.modelProperty] = kendoElement.value();
        };
        ;
        return KendoFieldReaderBase;
    }());
    Mvc.KendoFieldReaderBase = KendoFieldReaderBase;
})(Mvc || (Mvc = {}));
/// <reference path="KendoFieldReaderBase.ts"/>
var Mvc;
(function (Mvc) {
    var KendoDatePickerFieldReader = /** @class */ (function (_super) {
        __extends(KendoDatePickerFieldReader, _super);
        function KendoDatePickerFieldReader() {
            return _super.call(this, "kendoDatePicker") || this;
        }
        return KendoDatePickerFieldReader;
    }(Mvc.KendoFieldReaderBase));
    Mvc.KendoDatePickerFieldReader = KendoDatePickerFieldReader;
})(Mvc || (Mvc = {}));
/// <reference path="KendoFieldReaderBase.ts"/>
var Mvc;
(function (Mvc) {
    var KendoDropDownListFieldReader = /** @class */ (function (_super) {
        __extends(KendoDropDownListFieldReader, _super);
        function KendoDropDownListFieldReader() {
            return _super.call(this, "kendoDropDownList") || this;
        }
        return KendoDropDownListFieldReader;
    }(Mvc.KendoFieldReaderBase));
    Mvc.KendoDropDownListFieldReader = KendoDropDownListFieldReader;
})(Mvc || (Mvc = {}));
/// <reference path="KendoFieldReaderBase.ts"/>
var Mvc;
(function (Mvc) {
    var KendoNumericTextBoxFieldReader = /** @class */ (function (_super) {
        __extends(KendoNumericTextBoxFieldReader, _super);
        function KendoNumericTextBoxFieldReader() {
            return _super.call(this, "kendoNumericTextBox") || this;
        }
        return KendoNumericTextBoxFieldReader;
    }(Mvc.KendoFieldReaderBase));
    Mvc.KendoNumericTextBoxFieldReader = KendoNumericTextBoxFieldReader;
})(Mvc || (Mvc = {}));
