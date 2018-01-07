/// <reference path="../IFieldReader.ts"/>
/// <reference path="../FieldMappingModel.ts"/>
/// <reference path="../references.ts"/>

namespace Mvc {

  export class InputFieldReader implements IFieldReader {
    getModelValue(mapping: FieldMappingModel, model: any, format : IFieldFormatter, role : string) {
      var element = $("#" + mapping.fieldId);
      if (element == null) return;
      FieldPermission.setPropertyByPermission(element, role, mapping.permissions, model);
      var value = this.getObjectValue(mapping.modelProperty, model);
      if (value == null) return;
      element.val(format == null ? value : format.format(value, mapping.formatter == null ? null : mapping.formatter.format));


    };

    setModelValue(mapping: FieldMappingModel, model: any, format : IFieldFormatter) {
      var element = $("#" + mapping.fieldId);
      if (element == null) return;
      this.setObjectValue(mapping.modelProperty, model, element);
    }

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

    private setObjectValue = (fullPropertyName: string, model: any, element: any) => {
      var objectValue = element.val();
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
  };
}
