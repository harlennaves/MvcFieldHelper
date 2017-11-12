/// <reference path="../IFieldReader.ts"/>
/// <reference path="../FieldMappingModel.ts"/>
/// <reference path="../references.ts"/>

namespace Mvc {
  export class KendoFieldReader implements IFieldReader {
    public componentName : string;

    constructor() {
      this.componentName = null;
    };

    private setComponentName(el : any) : void {
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

      switch(dataRole) {
        case "autocomplete":
          this.componentName = "kendoAutoComplete";
          break;
        case "datepicker":
          this.componentName = "kendoDatePicker";
          break;
        case "datetimepicker":
          this.componentName = "kendoDateTimePicker";
          break;
        case "combobox" :
          this.componentName = "kendoComboBox";
          break;
        case "dropdownlist" :
          this.componentName = "kendoDropDownList";
          break;
        case "maskedtextbox" :
          this.componentName = "kendoMaskedTextBox";
          break;
        case "numerictextbox" :
          this.componentName = "kendoNumericTextBox";
          break;
      }
      this.componentName = "";
    };

    getModelValue(mapping: FieldMappingModel, model: any, format : IFieldFormatter) {
      var element = $("#" + mapping.fieldId);
      if (element == null) return;
      if (this.componentName == null)
        this.setComponentName(element);
      var kendoElement = element.data(this.componentName);
      if (kendoElement == null) return;
      var value = model[mapping.modelProperty];
      if (format != null)
        value = format.format(value, mapping.formatter == null ? null : mapping.formatter.format);
      kendoElement.value(value);
    };

    setModelValue(mapping: FieldMappingModel, model: any, format : IFieldFormatter) {
      var element = $("#" + mapping.fieldId);
      if (element == null) return;
      if (this.componentName == null)
        this.setComponentName(element);
      var kendoElement = element.data(this.componentName);
      if (kendoElement == null) return;
      model[mapping.modelProperty] = kendoElement.value();
    };
  }
}
