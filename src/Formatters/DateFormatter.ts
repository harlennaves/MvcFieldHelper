/// <reference path="../IFieldFormatter.ts"/>

namespace Mvc {
  export class DateFormatter implements IFieldFormatter {
    private defaultFormat : string = "dd/mm/yyyy";
    format(value : any) : string {
      return "";
    }
  }
}
