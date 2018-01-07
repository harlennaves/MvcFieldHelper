/// <reference types="jquery" />
/// <reference types="kendo-ui" />
declare namespace Mvc {
    class FieldPermission {
        role: string;
        visibility: string;
        action: (element: JQuery<HTMLElement>, model: any) => void;
        private CheckVisibility(visibility);
        static LoadPermissions(plainPermissions: string): Array<FieldPermission>;
        static setPropertyByPermission(element: JQuery<HTMLElement>, role: string, permissions: Array<FieldPermission>, model: any): void;
        constructor(model: any);
    }
}
