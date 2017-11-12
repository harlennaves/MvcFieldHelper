/// <reference path="IFieldReader.ts"/>
/// <reference path="FieldMappingModel.ts"/>
/// <reference path="FieldReaderType.ts"/>
/// <reference path="IFieldFormatter.ts"/>
/// <reference path="FieldFormatModel.ts"/>
/// <reference path="HttpAjax.ts"/>
/// <reference path="references.ts"/>

namespace Mvc {

  export class FieldHelper {

    public Model: any;
    private mapping: Array<FieldMappingModel>;
    private readers : any;
    private formatters : any;
    private http : HttpAjax;

    private initializeMapping() {
        var elements = $("[data-Property]");
        if (elements == null || elements.length == 0) return;

        for (var index = 0; index < elements.length; index++) {
          var el = elements[index] as any;
          var modelProperty = el.attributes["data-property"];
          var readerProperty = el.attributes["data-reader"];
          var formatterProperty = el.attributes["data-formatter"];
          var formatProperty = el.attributes["data-format"];
          var readOnly = el.attributes["data-readonly"];
          var group = el.attributes["data-group"];
          this.mapping.push(new FieldMappingModel({
            fieldId : el.id,
            modelProperty : modelProperty == null ? el.id : modelProperty.value,
            reader : readerProperty == null ? null : FieldReaderType[readerProperty.value],
            formatter : formatterProperty == null ? null : formatterProperty.value,
            format : formatProperty == null ? null : formatProperty.value,
            readOnly : readOnly == null ? false : readOnly.value,
            group : group == null ? null :group.value
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
      this.http = new HttpAjax();
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


    setModel(group? : string) {
      var groupFields = group == null || group == "" ? this.mapping : this.mapping.filter(mapping => mapping.group == group);
      var mappingLength = groupFields.length;
      for (var index = 0; index < mappingLength; index++) {
        var mappingField = groupFields[index];
        if (mappingField.readOnly) continue;
        this.getFieldReader(mappingField.reader).setModelValue(mappingField, this.Model, this.getFieldFormatter(mappingField.formatter));
      }
    };

    getModel(group? : string) {
      var groupFields = group == null || group == "" ? this.mapping : this.mapping.filter(mapping => mapping.group == group);
      var mappingLength = groupFields.length;
      for (var index = 0; index < mappingLength; index++) {
        var mappingField = groupFields[index];
        this.getFieldReader(mappingField.reader).getModelValue(mappingField, this.Model, this.getFieldFormatter(mappingField.formatter));
      }
    };

    clearModel(group? : string) {
      var groupFields = group == null || group == "" ? this.mapping : this.mapping.filter(mapping => mapping.group == group);
      var mappingLength = groupFields.length;
      for (var index = 0; index < mappingLength; index++) {
        var mappingField = groupFields[index];
        this.Model[mappingField.modelProperty] = "";
      }
      this.getModel(group);
    };

    post(controller : string, method : string, group : string, successCallback : (result : any) => any, errorCallback : (result : any) => void) {
      this.setModel(group);
      this.http.post(controller, method, this.Model, successCallback, errorCallback);
    };
  };
}
