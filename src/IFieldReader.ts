/// <reference path="IFieldFormatter.ts"/>
/// <reference path="FieldMappingModel.ts"/>

namespace Mvc {

  export interface IFieldReader {
    getModelValue: (mapping : FieldMappingModel, model : any, format : IFieldFormatter, role : string) => void;
    setModelValue: (mapping : FieldMappingModel, model : any, format : IFieldFormatter) => void;
  };
}
