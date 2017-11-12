/// <reference path="IFieldReader.ts"/>
/// <reference path="FieldReaderType.ts"/>
/// <reference path="FieldFormatModel.ts"/>

namespace Mvc {
  export class FieldMappingModel {
    public fieldId : string;
    public modelProperty : string;
    public modelType : string;
    public reader : FieldReaderType;
    public formatter : FieldFormatModel;
    public readOnly : boolean;
    public group : string;

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
          this.reader = (kendo == null || kendo.widgetInstance($("#" + this.fieldId), kendo.ui) == undefined) ? FieldReaderType.Input : FieldReaderType.Kendo;

        if (model.formatter != null)
          this.formatter = new Mvc.FieldFormatModel({ type : model.formatter, format : model.format } );

        if (model.readOnly != null)
          this.readOnly = model.readOnly as boolean;

        if (model.group != null)
          this.group = model.group;
    };
  };
}
