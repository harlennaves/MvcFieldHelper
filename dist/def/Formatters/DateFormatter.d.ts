/// <reference path="../IFieldFormatter.d.ts" />
declare namespace Mvc {
    class DateFormatter implements IFieldFormatter {
        private defaultFormat;
        private getDate(s);
        getValue(value: any): any;
        format(value: any, format: string): string;
    }
}
