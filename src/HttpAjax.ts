/// <reference path="references.ts"/>

namespace Mvc {
  export class HttpAjax {
    post(data : any, successCallback : (response : any) => void, errorCallback : (response : any) => void) : void {
      $.ajax({
        type : "POST",
        success : successCallback,
        error : errorCallback

      })
    };
  }
}
