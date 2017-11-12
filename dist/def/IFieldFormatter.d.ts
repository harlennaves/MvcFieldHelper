declare namespace Mvc {
    interface IFieldFormatter {
        format(value: any, format: string): string;
        getValue(value: any): any;
    }
}
