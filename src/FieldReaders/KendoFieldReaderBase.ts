/// <reference path="../IFieldReader.ts"/>
/// <reference path="../FieldMappingModel.ts"/>
/// <reference path="../definitions/jquery.d.ts"/>

namespace Mvc {
  export abstract class KendoFieldReaderBase implements IFieldReader {
    public componentName : string;

    constructor(componentName : string) {
      this.componentName = componentName;
    };

    getModelValue(mapping: FieldMappingModel, model: any) {
      var element = $("#" + mapping.fieldId);
      if (element == null) return;
      var kendoElement = element.data(this.componentName);
      if (kendoElement == null) return;
      kendoElement.value(model[mapping.modelProperty]);
    };

    setModelValue(mapping: FieldMappingModel, model: any) {
      var element = $("#" + mapping.fieldId);
      if (element == null) return;
      var kendoElement = element.data(this.componentName);
      if (kendoElement == null) return;
      model[mapping.modelProperty] = kendoElement.value();
    };
  }
}
