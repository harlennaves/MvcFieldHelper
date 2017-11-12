/// <reference path="references.d.ts" />
declare namespace Mvc {
    class HttpAjax {
        private hostBasePath;
        private initializePath();
        constructor();
        post(controller: string, method: string, data: any, successCallback: (response: any) => void, errorCallback: (response: any) => void): void;
    }
}
