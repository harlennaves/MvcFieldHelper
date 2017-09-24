namespace Mvc {
  export interface IFieldFormatter {
      format(value : any, format : string) : string;

      getValue(value : any) : any;
  };
}
