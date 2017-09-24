namespace Mvc {
  export interface IFieldFormatter {
      format(value : any) : string;

      getValue(value : any) : any;
  };
}
