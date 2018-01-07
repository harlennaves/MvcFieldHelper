namespace Mvc {
  export class FieldPermission {
    public role : string;

    public visibility : string;

    public action : (element : JQuery<HTMLElement>, model : any) => void;

    private CheckVisibility(visibility : string) : string {
      switch (visibility)
      {
        case "visible":
          return "visible";
        case "hidden" :
          return "hidden";
        case "readonly" :
          return "readonly";
        default :
          return "visible";
      }
    };

    public static LoadPermissions(plainPermissions : string) : Array<FieldPermission> {
      var permissions = new Array<FieldPermission>();

      //'[{"role": "admin", "visibility": "hidden"}, {"role": "sys" , "visibility": "readonly"}]'
      try {
        permissions = JSON.parse(plainPermissions);
      } catch(e) {

      }
      return permissions;
    };

    public static setPropertyByPermission(element : JQuery<HTMLElement>, role : string, permissions : Array<FieldPermission>, model : any) {
      if (element == null || role == null || role == '' || permissions == null || permissions.length == 0)
        return;
      var matched = $.grep(permissions, (permission : FieldPermission) => {
        return permission.role == role;
      });
      if (matched.length != 1)
        return;

      var permission = matched[0];
      if (permission == null) return;
      switch(permission.visibility)
      {
        case "readonly" :
          element.prop("readonly", true);
          break;
        case "hidden" :
          element.hide();
          break;
        case "visible" :
          element.show();
          break;
      }

      if (permission.action != null)
        eval(permission.action.toString())(element, model);
    };

    constructor(model : any) {
      if (model == null)
        throw new Error("model cannot be null");

      if (model.role == null)
        throw new Error("role cannot be null");

      this.role = model.role;

      if (model.visibility == null)
        this.visibility = "visible";

      this.visibility = this.CheckVisibility(model.visibility);

      if (model.action != null)
        this.action = eval(model.action);
    };
  };
}
