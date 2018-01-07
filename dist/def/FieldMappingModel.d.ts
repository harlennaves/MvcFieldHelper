/// <reference path="IFieldReader.d.ts" />
/// <reference path="FieldReaderType.d.ts" />
/// <reference path="FieldFormatModel.d.ts" />
/// <reference path="FieldPermission.d.ts" />
declare namespace Mvc {
    class FieldMappingModel {
        fieldId: string;
        modelProperty: string;
        modelType: string;
        reader: FieldReaderType;
        formatter: FieldFormatModel;
        readOnly: boolean;
        group: string;
        permissions: Array<FieldPermission>;
        constructor(model: any);
    }
}
