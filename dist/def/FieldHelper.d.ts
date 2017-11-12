/// <reference path="IFieldReader.d.ts" />
/// <reference path="FieldMappingModel.d.ts" />
/// <reference path="FieldReaderType.d.ts" />
/// <reference path="IFieldFormatter.d.ts" />
/// <reference path="FieldFormatModel.d.ts" />
/// <reference path="HttpAjax.d.ts" />
/// <reference path="references.d.ts" />
declare namespace Mvc {
    class FieldHelper {
        Model: any;
        private mapping;
        private readers;
        private formatters;
        private http;
        private initializeMapping();
        constructor(model: any);
        private getFieldReader(type);
        private getFieldFormatter(format);
        setModel(group?: string): void;
        getModel(group?: string): void;
        clearModel(group?: string): void;
        post(controller: string, method: string, group: string, successCallback: (result: any) => any, errorCallback: (result: any) => void): void;
    }
}
