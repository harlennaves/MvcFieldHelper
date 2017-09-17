/// <reference path="IFieldReader.ts"/>
/// <reference path="FieldReaderType.ts"/>

namespace Mvc {
  export class FieldMappingModel {
    public fieldId : string;
    public modelProperty : string;
    public modelType : string;
    public reader : FieldReaderType;

    constructor(model : any) {
        this.fieldId = model.fieldId;
        this.modelProperty = model.modelProperty;
        this.modelType = model.modelType;
        this.reader = model.reader;

        if (this.modelProperty == null) {
          throw new Error("modelProperty cannot be null");
        }
        if (this.fieldId == null)
          this.fieldId = this.modelProperty;
        if (this.modelType == null)
          this.modelType = "string";
        if (this.reader == null)
          this.reader = FieldReaderType.Input;
    };


  };
}
