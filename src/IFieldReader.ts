namespace Mvc {

  export interface IFieldReader {
    getModelValue: (mapping : FieldMappingModel, model : any) => void;
    setModelValue: (mapping : FieldMappingModel, model : any) => void;
  };
}
