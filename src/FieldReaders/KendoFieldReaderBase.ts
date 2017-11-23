/// <reference path="../IFieldReader.ts"/>
/// <reference path="../FieldMappingModel.ts"/>
/// <reference path="../references.ts"/>

namespace Mvc {
  export class KendoFieldReader implements IFieldReader {
    public componentName: string;

    constructor() {
      this.componentName = null;
    };

    private setComponentName(el: any): void {
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

    getModelValue(mapping: FieldMappingModel, model: any, format: IFieldFormatter) {
      var element = $("#" + mapping.fieldId);
      if (element == null) return;
      this.setComponentName(element);
      var kendoElement = element.data(this.componentName);
      if (kendoElement == null) return;
      var value = this.getObjectValue(mapping.modelProperty, model);
      if (format != null)
        value = format.format(value, mapping.formatter == null ? null : mapping.formatter.format);
      kendoElement.value(value);
    };

    setModelValue(mapping: FieldMappingModel, model: any, format: IFieldFormatter) {
      var element = $("#" + mapping.fieldId);
      if (element == null) return;
      this.setComponentName(element);
      var kendoElement = element.data(this.componentName);
      if (kendoElement == null) return;
      this.setObjectValue(mapping.modelProperty, model, kendoElement);
    };

    private getObjectValue = (fullPropertyName: string, model: any): any => {
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

    private setObjectValue = (fullPropertyName: string, model: any, kendoElement: any) => {
      var objectValue = this.componentName == "kendoDatePicker" || this.componentName == "kendoDateTimePicker"
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
        propertyEval += " = " + (typeof(objectValue) == "string" ? "'" + objectValue + "'" : objectValue);
        eval(propertyEval);
      }
    };
  }
}
