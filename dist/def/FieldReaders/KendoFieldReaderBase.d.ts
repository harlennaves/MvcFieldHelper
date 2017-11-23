/// <reference path="../IFieldReader.d.ts" />
/// <reference path="../FieldMappingModel.d.ts" />
/// <reference path="../references.d.ts" />
declare namespace Mvc {
    class KendoFieldReader implements IFieldReader {
        componentName: string;
        constructor();
        private setComponentName(el);
        getModelValue(mapping: FieldMappingModel, model: any, format: IFieldFormatter): void;
        setModelValue(mapping: FieldMappingModel, model: any, format: IFieldFormatter): void;
        private getObjectValue;
        private setObjectValue;
    }
}
