///<reference path="FieldFormatterType.ts"/>

namespace Mvc {
  export class FieldFormatModel {
    public type: FieldFormatterType;
    public format: string;

    constructor(model: any) {
      if (model.type != null)
        this.type = model.type;
      if (model.format != null)
        this.format = model.format;
    };
  };
}
