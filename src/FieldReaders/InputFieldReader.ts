/// <reference path="../IFieldReader.ts"/>
/// <reference path="../FieldMappingModel.ts"/>
/// <reference path="../references.ts"/>

namespace Mvc {

  export class InputFieldReader implements IFieldReader {
    getModelValue(mapping: FieldMappingModel, model: any, format : IFieldFormatter) {
      var element = $("#" + mapping.fieldId);
      if (element == null) return;
      if (model[mapping.modelProperty] == null) return;

      var value = model[mapping.modelProperty];

      element.val(format == null ? value : format.format(value, mapping.formatter == null ? null : mapping.formatter.format));
    };

    setModelValue(mapping: FieldMappingModel, model: any, format : IFieldFormatter) {
      var element = $("#" + mapping.fieldId);
      if (element == null) return;

      model[mapping.modelProperty] = format == null ? element.val() : format.getValue(element.val());
    }
  };
}
