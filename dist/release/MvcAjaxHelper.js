var Mvc;!function(e){!function(e){e.Date="DateFormatter"}(e.FieldFormatterType||(e.FieldFormatterType={}))}(Mvc||(Mvc={}));var Mvc;!function(e){var t=function(){return function(e){null!=e.type&&(this.type=e.type),null!=e.format&&(this.format=e.format)}}();e.FieldFormatModel=t}(Mvc||(Mvc={}));var Mvc;Mvc||(Mvc={});var Mvc;!function(e){!function(e){e.Input="InputFieldReader",e.CheckBox="CheckBoxFieldReader",e.Kendo="KendoFieldReader"}(e.FieldReaderType||(e.FieldReaderType={}))}(Mvc||(Mvc={}));var Mvc;!function(e){var t=function(){return function(t){if(this.fieldId=t.fieldId,this.modelProperty=t.modelProperty,this.modelType=t.modelType,this.reader=t.reader,null==this.modelProperty)throw new Error("modelProperty cannot be null");null==this.fieldId&&(this.fieldId=this.modelProperty),null==this.modelType&&(this.modelType="string"),null==this.reader&&(this.reader=null==kendo||void 0==kendo.widgetInstance($("#"+this.fieldId),kendo.ui)?e.FieldReaderType.Input:e.FieldReaderType.Kendo),null!=t.formatter&&(this.formatter=new e.FieldFormatModel({type:t.formatter,format:t.format})),null!=t.readOnly&&(this.readOnly=t.readOnly),null!=t.group&&(this.group=t.group)}}();e.FieldMappingModel=t}(Mvc||(Mvc={}));var Mvc;Mvc||(Mvc={});var Mvc;!function(e){var t=function(){function e(){this.initializePath()}return e.prototype.initializePath=function(){if("/"!=window.location.pathname){var e=window.location.pathname.split("/");e.length<2?this.hostBasePath="/":this.hostBasePath=e[1]+"/"}else this.hostBasePath="/"},e.prototype.post=function(e,t,r,o,n){var a=$('input[name="__RequestVerificationToken"]').val(),l=null==a||""==a?$.param(r):$.param($.extend({__RequestVerificationToken:a},r));$.ajax({type:"POST",dataType:"json",data:l,contentType:"application/x-www-form-urlencoded; charset=UTF-8",success:o,error:n,url:this.hostBasePath+e+"/"+t})},e}();e.HttpAjax=t}(Mvc||(Mvc={}));var Mvc;!function(Mvc){var FieldHelper=function(){function FieldHelper(e){this.Model=e,null==this.Model&&(this.Model={}),this.mapping=[],this.readers={},this.formatters={},this.initializeMapping(),this.http=new Mvc.HttpAjax}return FieldHelper.prototype.initializeMapping=function(){var e=$("[data-Property]");if(null!=e&&0!=e.length)for(var t=0;t<e.length;t++){var r=e[t],o=r.attributes["data-property"],n=r.attributes["data-reader"],a=r.attributes["data-formatter"],l=r.attributes["data-format"],i=r.attributes["data-readonly"],d=r.attributes["data-group"];this.mapping.push(new Mvc.FieldMappingModel({fieldId:r.id,modelProperty:null==o?r.id:o.value,reader:null==n?null:Mvc.FieldReaderType[n.value],formatter:null==a?null:a.value,format:null==l?null:l.value,readOnly:null!=i&&i.value,group:null==d?null:d.value}))}},FieldHelper.prototype.getFieldReader=function(type){return null==this.readers[type.toString()]&&(this.readers[type.toString()]=eval("new Mvc."+type.toString()+"()")),this.readers[type.toString()]},FieldHelper.prototype.getFieldFormatter=function(format){if(null==format||null==format.type)return null;var typeName=format.type.toString();return null==this.formatters[typeName]&&(this.formatters[typeName]=eval("new Mvc."+Mvc.FieldFormatterType[typeName]+"()")),this.formatters[typeName]},FieldHelper.prototype.setModel=function(e){for(var t=null==e||""==e?this.mapping:this.mapping.filter(function(t){return t.group==e}),r=t.length,o=0;o<r;o++){var n=t[o];n.readOnly||this.getFieldReader(n.reader).setModelValue(n,this.Model,this.getFieldFormatter(n.formatter))}},FieldHelper.prototype.getModel=function(e){for(var t=null==e||""==e?this.mapping:this.mapping.filter(function(t){return t.group==e}),r=t.length,o=0;o<r;o++){var n=t[o];this.getFieldReader(n.reader).getModelValue(n,this.Model,this.getFieldFormatter(n.formatter))}},FieldHelper.prototype.clearModel=function(e){for(var t=null==e||""==e?this.mapping:this.mapping.filter(function(t){return t.group==e}),r=t.length,o=0;o<r;o++){var n=t[o];this.Model[n.modelProperty]=""}this.getModel(e)},FieldHelper.prototype.post=function(e,t,r,o,n){this.setModel(r),this.http.post(e,t,this.Model,o,n)},FieldHelper}();Mvc.FieldHelper=FieldHelper}(Mvc||(Mvc={}));var Mvc;!function(e){var t=function(){function e(){}return e.prototype.getModelValue=function(e,t,r){var o=$("#"+e.fieldId);null!=o&&null!=t[e.modelProperty]&&o.prop("checked",t[e.modelProperty])},e.prototype.setModelValue=function(e,t,r){var o=$("#"+e.fieldId);null!=o&&(t[e.modelProperty]=o.prop("checked"))},e}();e.CheckBoxFieldReader=t}(Mvc||(Mvc={}));var Mvc;!function(e){var t=function(){function e(){}return e.prototype.getModelValue=function(e,t,r){var o=$("#"+e.fieldId);if(null!=o&&null!=t[e.modelProperty]){var n=t[e.modelProperty];o.val(null==r?n:r.format(n,null==e.formatter?null:e.formatter.format))}},e.prototype.setModelValue=function(e,t,r){var o=$("#"+e.fieldId);null!=o&&(t[e.modelProperty]=null==r?o.val():r.getValue(o.val()))},e}();e.InputFieldReader=t}(Mvc||(Mvc={}));var Mvc;!function(e){var t=function(){function e(){this.componentName=null}return e.prototype.setComponentName=function(e){if(null!=kendo)if(null!=e)if(void 0!=kendo.widgetInstance(e,kendo.ui)){switch(e.data("role")){case"autocomplete":this.componentName="kendoAutoComplete";break;case"datepicker":this.componentName="kendoDatePicker";break;case"datetimepicker":this.componentName="kendoDateTimePicker";break;case"combobox":this.componentName="kendoComboBox";break;case"dropdownlist":this.componentName="kendoDropDownList";break;case"maskedtextbox":this.componentName="kendoMaskedTextBox";break;case"numerictextbox":this.componentName="kendoNumericTextBox"}this.componentName=""}else this.componentName="";else this.componentName="";else this.componentName=""},e.prototype.getModelValue=function(e,t,r){var o=$("#"+e.fieldId);if(null!=o){null==this.componentName&&this.setComponentName(o);var n=o.data(this.componentName);if(null!=n){var a=t[e.modelProperty];null!=r&&(a=r.format(a,null==e.formatter?null:e.formatter.format)),n.value(a)}}},e.prototype.setModelValue=function(e,t,r){var o=$("#"+e.fieldId);if(null!=o){null==this.componentName&&this.setComponentName(o);var n=o.data(this.componentName);null!=n&&(t[e.modelProperty]=n.value())}},e}();e.KendoFieldReader=t}(Mvc||(Mvc={}));var Mvc;!function(e){var t=function(){function e(){this.defaultFormat="dd/mm/yyyy"}return e.prototype.getDate=function(e){if(-1!=e.indexOf("Date"))return new Date(parseFloat(/Date\(([^)]+)\)/.exec(e)[1]));if(-1!=e.indexOf("/")){var t=e.split("/");return new Date(parseInt(t[2]),parseInt(t[1])-1,parseInt(t[0]))}return null},e.prototype.getValue=function(e){return this.getDate(e)},e.prototype.format=function(e,t){if(null==e)return"";var r;return null!=(r=e instanceof Date?e:this.getDate(e.toString()))&&r instanceof Date?r.format(null==t?this.defaultFormat:t):""},e}();e.DateFormatter=t}(Mvc||(Mvc={}));