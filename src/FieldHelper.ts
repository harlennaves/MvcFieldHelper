/// <reference path="IFieldReader.ts"/>
/// <reference path="FieldMappingModel.ts"/>
/// <reference path="FieldReaderType.ts"/>
/// <reference path="IFieldFormatter.ts"/>
/// <reference path="FieldFormatModel.ts"/>
/// <reference path="definitions/jquery.d.ts"/>

namespace Mvc {

  export class FieldHelper {

    public Model: any;
    private mapping: Array<FieldMappingModel>;
    private readers : any;
    private formatters : any;

    private initializeMapping() {
        var elements = $("[data-Property]");
        if (elements == null || elements.length == 0) return;

        for (var index = 0; index < elements.length; index++) {
          var el = elements[index];
          var modelProperty = el.attributes["data-property"];
          var readerProperty = el.attributes["data-reader"];
          var formatterProperty = el.attributes["data-formatter"];
          this.mapping.push(new FieldMappingModel({
            fieldId : el.id,
            modelProperty : modelProperty == null ? el.id : modelProperty.value,
            reader : readerProperty == null ? null : FieldReaderType[readerProperty.value],
            formatter : formatterProperty == null ? null : formatterProperty.value
          }));
        }
    };

    constructor(model : any) {
      this.Model = model;
      if (this.Model == null)
        this.Model = {};
      this.mapping = [];
      this.readers = {};
      this.formatters = {};
      this.initializeMapping();
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
        this.formatters[typeName] = eval("new Mvc." + FieldFormatterType[typeName] + "()");
      }
      return this.formatters[typeName] as IFieldFormatter;
    };


    setModel() {
      var mappingLength = this.mapping.length;
      for (var index = 0; index < mappingLength; index++) {
        var mappingField = this.mapping[index];
        this.getFieldReader(mappingField.reader).setModelValue(mappingField, this.Model, this.getFieldFormatter(mappingField.formatter));
      }
    };

    getModel() {
      var mappingLength = this.mapping.length;
      for (var index = 0; index < mappingLength; index++) {
        var mappingField = this.mapping[index];
        this.getFieldReader(mappingField.reader).getModelValue(mappingField, this.Model, this.getFieldFormatter(mappingField.formatter));
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
