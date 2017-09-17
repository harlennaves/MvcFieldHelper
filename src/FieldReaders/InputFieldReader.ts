/// <reference path="../IFieldReader.ts"/>
/// <reference path="../definitions/jquery.d.ts"/>
/// <reference path="../FieldMappingModel.ts"/>

namespace Mvc {

  export class InputFieldReader implements IFieldReader {
    getModelValue(mapping: FieldMappingModel, model: any) {
      var element = $("#" + mapping.fieldId);
      if (element == null) return;
      if (model[mapping.modelProperty] == null) return;

      element.val(model[mapping.modelProperty]);
    };

    setModelValue(mapping: FieldMappingModel, model: any) {
      var element = $("#" + mapping.fieldId);
      if (element == null) return;

      model[mapping.modelProperty] = element.val();
    }
  };
}
