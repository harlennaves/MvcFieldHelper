/// <reference path="../IFieldReader.ts"/>
/// <reference path="../FieldMappingModel.ts"/>
/// <reference path="../definitions/jquery.d.ts"/>

namespace Mvc {
  export class CheckBoxFieldReader implements IFieldReader {
    getModelValue(mapping: FieldMappingModel, model: any) {
      var element = $("#" + mapping.fieldId);
      if (element == null) return;
      if (model[mapping.modelProperty] == null) return;

      element.prop("checked", model[mapping.modelProperty]);
    };

    setModelValue(mapping: FieldMappingModel, model: any) {
      var element = $("#" + mapping.fieldId);
      if (element == null) return;

      model[mapping.modelProperty] = element.prop("checked");
    }
  }
}
