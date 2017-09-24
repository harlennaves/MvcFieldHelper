/// <reference path="../IFieldFormatter.ts"/>

namespace Mvc {
  export class DateFormatter implements IFieldFormatter {
    private defaultFormat : string = "dd/mm/yyyy";

    private getDate(s : string) : Date {
      if (s.indexOf("Date") != -1)
        return new Date(parseFloat(/Date\(([^)]+)\)/.exec(s)[1]));

      if (s.indexOf("/") != -1) {
        var dateParts = s.split("/");
        return new Date(parseInt(dateParts[2]), parseInt(dateParts[1]) - 1, parseInt(dateParts[0]));
      }
      return null;
    };

    getValue(value : any) : any {
      return this.getDate(value);
    }

    format(value : any) : string {
      if (value == null) return "";
      var date;
      if (value instanceof Date)
        date = value;
      else
        date = this.getDate(value.toString());

      if (date == null || !(date instanceof Date)) return "";

      return date.format(this.defaultFormat);
    }
  }
}
