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
var Mvc;
(function (Mvc) {
    var FieldReaderType;
    (function (FieldReaderType) {
        FieldReaderType["Input"] = "InputFieldReader";
        FieldReaderType["CheckBox"] = "CheckBoxFieldReader";
        FieldReaderType["Kendo"] = "KendoFieldReader";
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
                this.reader = (kendo == null || kendo.widgetInstance($("#" + this.fieldId), kendo.ui) == undefined) ? Mvc.FieldReaderType.Input : Mvc.FieldReaderType.Kendo;
            if (model.formatter != null)
                this.formatter = new Mvc.FieldFormatModel({ type: model.formatter, format: model.format });
            if (model.readOnly != null)
                this.readOnly = model.readOnly;
            if (model.group != null)
                this.group = model.group;
        }
        ;
        return FieldMappingModel;
    }());
    Mvc.FieldMappingModel = FieldMappingModel;
    ;
})(Mvc || (Mvc = {}));
/// <reference path="IFieldFormatter.ts"/>
/// <reference path="FieldMappingModel.ts"/>
var Mvc;
(function (Mvc) {
    ;
})(Mvc || (Mvc = {}));
/// <reference path="references.ts"/>
var Mvc;
(function (Mvc) {
    var HttpAjax = /** @class */ (function () {
        function HttpAjax() {
            this.initializePath();
        }
        HttpAjax.prototype.initializePath = function () {
            var pathName = window.location.href.replace(window.location.origin, "");
            if (pathName.indexOf("#") > 0)
                pathName = pathName.substring(0, pathName.indexOf("#"));
            if (pathName.indexOf("?") > 0)
                pathName = pathName.substring(0, pathName.indexOf("?"));
            var pathPieces = pathName.split("/");
            if (pathName == window.location.pathname && pathPieces.length <= 2) {
                this.hostBasePath = "/";
                return;
            }
            if (pathPieces.length < 2) {
                this.hostBasePath = "/";
                return;
            }
            this.hostBasePath = "/" + pathPieces[1] + "/";
        };
        HttpAjax.prototype.post = function (controller, method, data, successCallback, errorCallback) {
            var token = $('input[name="__RequestVerificationToken"]').val();
            var serializedData = token == null || token == ""
                ? $.param(data)
                : $.param($.extend({ __RequestVerificationToken: token }, data));
            $.ajax({
                type: "POST",
                dataType: "json",
                data: serializedData,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: successCallback,
                error: errorCallback,
                url: this.hostBasePath + controller + "/" + method
            });
        };
        ;
        return HttpAjax;
    }());
    Mvc.HttpAjax = HttpAjax;
})(Mvc || (Mvc = {}));
/// <reference path="IFieldReader.ts"/>
/// <reference path="FieldMappingModel.ts"/>
/// <reference path="FieldReaderType.ts"/>
/// <reference path="IFieldFormatter.ts"/>
/// <reference path="FieldFormatModel.ts"/>
/// <reference path="HttpAjax.ts"/>
/// <reference path="references.ts"/>
var Mvc;
(function (Mvc) {
    var FieldHelper = /** @class */ (function () {
        function FieldHelper(model, group) {
            this.Model = model;
            if (this.Model == null)
                this.Model = {};
            this.mapping = [];
            this.readers = {};
            this.formatters = {};
            this.group = group;
            this.initializeMapping();
            this.http = new Mvc.HttpAjax();
        }
        FieldHelper.prototype.initializeMapping = function () {
            var elements = this.group == null || this.group == ""
                ? $("[fh-Property]")
                : $("[fh-group='" + this.group + "']");
            if (elements == null || elements.length == 0)
                return;
            for (var index = 0; index < elements.length; index++) {
                var el = elements[index];
                var modelProperty = el.attributes["fh-property"];
                var readerProperty = el.attributes["fh-reader"];
                var formatterProperty = el.attributes["fh-formatter"];
                var formatProperty = el.attributes["fh-format"];
                var readOnly = el.attributes["fh-readonly"];
                var group = el.attributes["fh-group"];
                this.mapping.push(new Mvc.FieldMappingModel({
                    fieldId: el.id,
                    modelProperty: modelProperty == null ? el.id : modelProperty.value,
                    reader: readerProperty == null ? null : Mvc.FieldReaderType[readerProperty.value],
                    formatter: formatterProperty == null ? null : formatterProperty.value,
                    format: formatProperty == null ? null : formatProperty.value,
                    readOnly: readOnly == null ? false : readOnly.value,
                    group: group == null ? null : group.value
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
        FieldHelper.prototype.setModel = function (group) {
            var groupFields = group == null || group == "" ? this.mapping : this.mapping.filter(function (mapping) { return mapping.group == group; });
            var mappingLength = groupFields.length;
            for (var index = 0; index < mappingLength; index++) {
                var mappingField = groupFields[index];
                if (mappingField.readOnly)
                    continue;
                this.getFieldReader(mappingField.reader).setModelValue(mappingField, this.Model, this.getFieldFormatter(mappingField.formatter));
            }
        };
        ;
        FieldHelper.prototype.getModel = function (group) {
            var groupFields = group == null || group == "" ? this.mapping : this.mapping.filter(function (mapping) { return mapping.group == group; });
            var mappingLength = groupFields.length;
            for (var index = 0; index < mappingLength; index++) {
                var mappingField = groupFields[index];
                this.getFieldReader(mappingField.reader).getModelValue(mappingField, this.Model, this.getFieldFormatter(mappingField.formatter));
            }
        };
        ;
        FieldHelper.prototype.clearModel = function (group) {
            var groupFields = group == null || group == "" ? this.mapping : this.mapping.filter(function (mapping) { return mapping.group == group; });
            var mappingLength = groupFields.length;
            for (var index = 0; index < mappingLength; index++) {
                var mappingField = groupFields[index];
                this.Model[mappingField.modelProperty] = "";
            }
            this.getModel(group);
        };
        ;
        FieldHelper.prototype.post = function (controller, method, group, successCallback, errorCallback) {
            this.setModel(group);
            this.http.post(controller, method, this.Model, successCallback, errorCallback);
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
        DateFormatter.prototype.format = function (value, format) {
            if (value == null)
                return "";
            var date;
            if (value instanceof Date)
                date = value;
            else
                date = this.getDate(value.toString());
            if (date == null || !(date instanceof Date))
                return "";
            return date.format(format == null ? this.defaultFormat : format);
        };
        return DateFormatter;
    }());
    Mvc.DateFormatter = DateFormatter;
})(Mvc || (Mvc = {}));
/// <reference path="../IFieldReader.ts"/>
/// <reference path="../FieldMappingModel.ts"/>
/// <reference path="../references.ts"/>
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
/// <reference path="../FieldMappingModel.ts"/>
/// <reference path="../references.ts"/>
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
            element.val(format == null ? value : format.format(value, mapping.formatter == null ? null : mapping.formatter.format));
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
/// <reference path="../references.ts"/>
var Mvc;
(function (Mvc) {
    var KendoFieldReader = /** @class */ (function () {
        function KendoFieldReader() {
            var _this = this;
            this.getObjectValue = function (fullPropertyName, model) {
                if (fullPropertyName.indexOf(".") < 0)
                    return model[fullPropertyName];
                var propertyParts = fullPropertyName.split(".");
                var propertyEval = "model";
                for (var index = 0; index < propertyParts.length; index++) {
                    propertyEval += "['" + propertyParts[index] + "']";
                    if (index < (propertyParts.length - 1) && eval(propertyEval) == null)
                        return null;
                }
                return eval(propertyEval);
            };
            this.setObjectValue = function (fullPropertyName, model, kendoElement) {
                var objectValue = _this.componentName == "kendoDatePicker" || _this.componentName == "kendoDateTimePicker"
                    ? kendoElement.value() instanceof Date ? kendoElement.value().toISOString() : kendoElement.value()
                    : kendoElement.value();
                if (fullPropertyName.indexOf(".") < 0)
                    model[fullPropertyName] = objectValue;
                else {
                    var propertyParts = fullPropertyName.split(".");
                    var propertyEval = "model";
                    for (var index = 0; index < propertyParts.length; index++) {
                        propertyEval += "['" + propertyParts[index] + "']";
                        if (index < (propertyParts.length - 1) && eval(propertyEval) == null)
                            eval(propertyEval + " = {}");
                    }
                    propertyEval += " = " + (typeof (objectValue) == "string" ? "'" + objectValue + "'" : objectValue);
                    eval(propertyEval);
                }
            };
            this.componentName = null;
        }
        ;
        KendoFieldReader.prototype.setComponentName = function (el) {
            if (kendo == null) {
                this.componentName = "";
                return;
            }
            if (el == null) {
                this.componentName = "";
                return;
            }
            if (kendo.widgetInstance(el, kendo.ui) == undefined) {
                this.componentName = "";
                return;
            }
            var dataRole = el.data("role");
            switch (dataRole) {
                case "autocomplete":
                    this.componentName = "kendoAutoComplete";
                    break;
                case "datepicker":
                    this.componentName = "kendoDatePicker";
                    break;
                case "datetimepicker":
                    this.componentName = "kendoDateTimePicker";
                    break;
                case "combobox":
                    this.componentName = "kendoComboBox";
                    break;
                case "dropdownlist":
                    this.componentName = "kendoDropDownList";
                    break;
                case "maskedtextbox":
                    this.componentName = "kendoMaskedTextBox";
                    break;
                case "numerictextbox":
                    this.componentName = "kendoNumericTextBox";
                    break;
            }
            if (this.componentName != null && this.componentName != "")
                return;
            this.componentName = "";
        };
        ;
        KendoFieldReader.prototype.getModelValue = function (mapping, model, format) {
            var element = $("#" + mapping.fieldId);
            if (element == null)
                return;
            this.setComponentName(element);
            var kendoElement = element.data(this.componentName);
            if (kendoElement == null)
                return;
            var value = this.getObjectValue(mapping.modelProperty, model);
            if (format != null)
                value = format.format(value, mapping.formatter == null ? null : mapping.formatter.format);
            kendoElement.value(value);
        };
        ;
        KendoFieldReader.prototype.setModelValue = function (mapping, model, format) {
            var element = $("#" + mapping.fieldId);
            if (element == null)
                return;
            this.setComponentName(element);
            var kendoElement = element.data(this.componentName);
            if (kendoElement == null)
                return;
            this.setObjectValue(mapping.modelProperty, model, kendoElement);
        };
        ;
        return KendoFieldReader;
    }());
    Mvc.KendoFieldReader = KendoFieldReader;
})(Mvc || (Mvc = {}));
