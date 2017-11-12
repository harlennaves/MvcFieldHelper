/// <reference path="references.ts"/>

namespace Mvc {
  export class HttpAjax {

    private hostBasePath: string;

    private initializePath() {
      if (window.location.pathname == "/") {
        this.hostBasePath = "/";
        return;
      }
      var pathPieces = window.location.pathname.split("/");

      if (pathPieces.length < 2) {
        this.hostBasePath = "/";
        return;
      }

      this.hostBasePath = pathPieces[1] + "/";
    }

    constructor() {
      this.initializePath();
    }

    post(controller : string, method : string, data: any, successCallback: (response: any) => void, errorCallback: (response: any) => void): void {
      var token = $('input[name="__RequestVerificationToken"]').val();
      var serializedData = token == null || token == ""
        ? $.param(data)
        : $.param($.extend({ __RequestVerificationToken: token }, data));
      $.ajax({
        type: "POST",
        dataType: "json",
        data: serializedData,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: successCallback,
        error: errorCallback,
        url : this.hostBasePath + controller + "/" + method
      })
    };

  }
}
