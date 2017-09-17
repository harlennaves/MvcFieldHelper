/// <reference path="IFieldReader.ts"/>
/// <reference path="FieldMappingModel.ts"/>
/// <reference path="FieldReaderType.ts"/>

namespace Mvc {

  export class FieldHelper {

    public Model: any;
    private mapping: Array<FieldMappingModel>;
    private readers : any;

    constructor(mapping: Array<FieldMappingModel>,  model : any) {
      this.Model = model;
      if (this.Model == null)
        this.Model = {};
      this.mapping = mapping;
      this.readers = {};
    };

    private getFieldReader(type : FieldReaderType) : IFieldReader {
        if (this.readers[type.toString()] == null) {
          this.readers[type.toString()] = eval("new Mvc." + type.toString() + "()");
        }
        return this.readers[type.toString()] as IFieldReader;
    };


    setModel() {
      var mappingLength = this.mapping.length;
      for (var index = 0; index < mappingLength; index++) {
        var mappingField = this.mapping[index];
        this.getFieldReader(mappingField.reader).setModelValue(mappingField, this.Model);
      }
    };

    getModel() {
      var mappingLength = this.mapping.length;
      for (var index = 0; index < mappingLength; index++) {
        var mappingField = this.mapping[index];
        this.getFieldReader(mappingField.reader).getModelValue(mappingField, this.Model);
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
