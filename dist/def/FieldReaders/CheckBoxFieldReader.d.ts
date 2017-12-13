/// <reference path="../IFieldReader.d.ts" />
/// <reference path="../FieldMappingModel.d.ts" />
/// <reference path="../references.d.ts" />
declare namespace Mvc {
    class CheckBoxFieldReader implements IFieldReader {
        getModelValue(mapping: FieldMappingModel, model: any, format: IFieldFormatter): void;
        setModelValue(mapping: FieldMappingModel, model: any, format: IFieldFormatter): void;
        private getObjectValue;
        private setObjectValue;
    }
}
