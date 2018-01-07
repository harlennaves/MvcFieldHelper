/// <reference path="IFieldFormatter.d.ts" />
/// <reference path="FieldMappingModel.d.ts" />
declare namespace Mvc {
    interface IFieldReader {
        getModelValue: (mapping: FieldMappingModel, model: any, format: IFieldFormatter, role: string) => void;
        setModelValue: (mapping: FieldMappingModel, model: any, format: IFieldFormatter) => void;
    }
}
