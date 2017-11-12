/// <reference path="FieldFormatterType.d.ts" />
declare namespace Mvc {
    class FieldFormatModel {
        type: FieldFormatterType;
        format: string;
        constructor(model: any);
    }
}
