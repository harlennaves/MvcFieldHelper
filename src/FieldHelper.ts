/// <reference path="IFieldReader.ts"/>
/// <reference path="FieldMappingModel.ts"/>
/// <reference path="FieldReaderType.ts"/>
/// <reference path="IFieldFormatter.ts"/>
/// <reference path="FieldFormatModel.ts"/>

namespace Mvc {

  export class FieldHelper {

    public Model: any;
    private mapping: Array<FieldMappingModel>;
    private readers : any;
    private formatters : any;

    private initializeMapping(mapping : Array<any>) {
      var mappingLength = mapping.length;
      for (var index = 0; index < mappingLength; index++) {
        var item = mapping[index];
        this.mapping.push(new FieldMappingModel(item));
      }
    };

    constructor(mapping: Array<any>,  model : any) {
      this.Model = model;
      if (this.Model == null)
        this.Model = {};
      this.mapping = [];
      this.readers = {};
      this.formatters = {};
      this.initializeMapping(mapping);
    };

    private getFieldReader(type : FieldReaderType) : IFieldReader {
        if (this.readers[type.toString()] == null) {
          this.readers[type.toString()] = eval("new Mvc." + type.toString() + "()");
        }
        return this.readers[type.toString()] as IFieldReader;
    };

    private getFieldFormatter(format : FieldFormatModel) : IFieldFormatter {
      if (format == null || format.type == null) return null;

      var typeName = format.type.toString();
      if (this.formatters[typeName] == null) {
        this.formatters[typeName] = eval("new Mvc." + typeName + "()");
      }
      return this.formatters[typeName] as IFieldFormatter;
    };


    setModel() {
      var mappingLength = this.mapping.length;
      for (var index = 0; index < mappingLength; index++) {
        var mappingField = this.mapping[index];
        this.getFieldReader(mappingField.reader).setModelValue(mappingField, this.Model, this.getFieldFormatter(mappingField.format));
      }
    };

    getModel() {
      var mappingLength = this.mapping.length;
      for (var index = 0; index < mappingLength; index++) {
        var mappingField = this.mapping[index];
        this.getFieldReader(mappingField.reader).getModelValue(mappingField, this.Model, this.getFieldFormatter(mappingField.format));
      }
    };

    clearModel() {
      var mappingLength = this.mapping.length;
      for (var index = 0; index < mappingLength; index++) {
        var mappingField = this.mapping[index];
        this.Model[mappingField.modelProperty] = "";
      }
      this.getModel();
    };

  };
}
