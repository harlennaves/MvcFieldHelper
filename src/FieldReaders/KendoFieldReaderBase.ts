/// <reference path="../IFieldReader.ts"/>
/// <reference path="../FieldMappingModel.ts"/>
/// <reference path="../references.ts"/>

namespace Mvc {
  export abstract class KendoFieldReaderBase implements IFieldReader {
    public componentName : string;

    constructor(componentName : string) {
      this.componentName = componentName;
    };

    getModelValue(mapping: FieldMappingModel, model: any, format : IFieldFormatter) {
      var element = $("#" + mapping.fieldId);
      if (element == null) return;
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
      var kendoElement = element.data(this.componentName);
      if (kendoElement == null) return;
      model[mapping.modelProperty] = kendoElement.value();
    };
  }
}
