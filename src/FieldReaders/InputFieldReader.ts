/// <reference path="../IFieldReader.ts"/>
/// <reference path="../definitions/jquery.d.ts"/>
/// <reference path="../FieldMappingModel.ts"/>

namespace Mvc {

  export class InputFieldReader implements IFieldReader {
    getModelValue(mapping: FieldMappingModel, model: any, format : IFieldFormatter) {
      var element = $("#" + mapping.fieldId);
      if (element == null) return;
      if (model[mapping.modelProperty] == null) return;

      var value = model[mapping.modelProperty];
      if (format != null)
        value = format.format(value);
      element.val(value);
    };

    setModelValue(mapping: FieldMappingModel, model: any, format : IFieldFormatter) {
      var element = $("#" + mapping.fieldId);
      if (element == null) return;

      model[mapping.modelProperty] = element.val();
    }
  };
}
