/// <reference path="IFieldFormatter.ts"/>

namespace Mvc {

  export interface IFieldReader {
    getModelValue: (mapping : FieldMappingModel, model : any, format : IFieldFormatter) => void;
    setModelValue: (mapping : FieldMappingModel, model : any, format : IFieldFormatter) => void;
  };
}
