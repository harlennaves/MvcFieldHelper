var __extends=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])};return function(t,r){function o(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}}(),Mvc;!function(e){!function(e){e.Date="DateFormatter"}(e.FieldFormatterType||(e.FieldFormatterType={}))}(Mvc||(Mvc={}));var Mvc;!function(e){var t=function(){return function(e){null!=e.type&&(this.type=e.type),null!=e.format&&(this.format=e.format)}}();e.FieldFormatModel=t}(Mvc||(Mvc={}));var Mvc;Mvc||(Mvc={});var Mvc;Mvc||(Mvc={});var Mvc;!function(e){!function(e){e.Input="InputFieldReader",e.CheckBox="CheckBoxFieldReader",e.KendoDropDown="KendoDropDownListFieldReader",e.KendoDatePicker="KendoDatePickerFieldReader",e.KendoNumericTextBox="KendoNumericTextBoxFieldReader"}(e.FieldReaderType||(e.FieldReaderType={}))}(Mvc||(Mvc={}));var Mvc;!function(e){var t=function(){return function(t){if(this.fieldId=t.fieldId,this.modelProperty=t.modelProperty,this.modelType=t.modelType,this.reader=t.reader,null==this.modelProperty)throw new Error("modelProperty cannot be null");null==this.fieldId&&(this.fieldId=this.modelProperty),null==this.modelType&&(this.modelType="string"),null==this.reader&&(this.reader=e.FieldReaderType.Input),null!=t.format&&(this.format=new e.FieldFormatModel(t.format))}}();e.FieldMappingModel=t}(Mvc||(Mvc={}));var Mvc;!function(Mvc){var FieldHelper=function(){function FieldHelper(e,t){this.Model=t,null==this.Model&&(this.Model={}),this.mapping=[],this.readers={},this.formatters={},this.initializeMapping(e)}return FieldHelper.prototype.initializeMapping=function(e){for(var t=e.length,r=0;r<t;r++){var o=e[r];this.mapping.push(new Mvc.FieldMappingModel(o))}},FieldHelper.prototype.getFieldReader=function(type){return null==this.readers[type.toString()]&&(this.readers[type.toString()]=eval("new Mvc."+type.toString()+"()")),this.readers[type.toString()]},FieldHelper.prototype.getFieldFormatter=function(format){if(null==format||null==format.type)return null;var typeName=format.type.toString();return null==this.formatters[typeName]&&(this.formatters[typeName]=eval("new Mvc."+typeName+"()")),this.formatters[typeName]},FieldHelper.prototype.setModel=function(){for(var e=this.mapping.length,t=0;t<e;t++){var r=this.mapping[t];this.getFieldReader(r.reader).setModelValue(r,this.Model,this.getFieldFormatter(r.format))}},FieldHelper.prototype.getModel=function(){for(var e=this.mapping.length,t=0;t<e;t++){var r=this.mapping[t];this.getFieldReader(r.reader).getModelValue(r,this.Model,this.getFieldFormatter(r.format))}},FieldHelper.prototype.clearModel=function(){for(var e=this.mapping.length,t=0;t<e;t++){var r=this.mapping[t];this.Model[r.modelProperty]=""}this.getModel()},FieldHelper}();Mvc.FieldHelper=FieldHelper}(Mvc||(Mvc={}));var Mvc;!function(e){var t=function(){function e(){}return e.prototype.getModelValue=function(e,t,r){var o=$("#"+e.fieldId);null!=o&&null!=t[e.modelProperty]&&o.prop("checked",t[e.modelProperty])},e.prototype.setModelValue=function(e,t,r){var o=$("#"+e.fieldId);null!=o&&(t[e.modelProperty]=o.prop("checked"))},e}();e.CheckBoxFieldReader=t}(Mvc||(Mvc={}));var Mvc;!function(e){var t=function(){function e(){}return e.prototype.getModelValue=function(e,t,r){var o=$("#"+e.fieldId);if(null!=o&&null!=t[e.modelProperty]){var n=t[e.modelProperty];null!=r&&(n=r.format(n)),o.val(n)}},e.prototype.setModelValue=function(e,t,r){var o=$("#"+e.fieldId);null!=o&&(t[e.modelProperty]=o.val())},e}();e.InputFieldReader=t}(Mvc||(Mvc={}));var Mvc;!function(e){var t=function(){function e(e){this.componentName=e}return e.prototype.getModelValue=function(e,t,r){var o=$("#"+e.fieldId);if(null!=o){var n=o.data(this.componentName);if(null!=n){var i=t[e.modelProperty];null!=r&&(i=r.format(i)),n.value(i)}}},e.prototype.setModelValue=function(e,t,r){var o=$("#"+e.fieldId);if(null!=o){var n=o.data(this.componentName);null!=n&&(t[e.modelProperty]=n.value())}},e}();e.KendoFieldReaderBase=t}(Mvc||(Mvc={}));var Mvc;!function(e){var t=function(e){function t(){return e.call(this,"kendoDatePicker")||this}return __extends(t,e),t}(e.KendoFieldReaderBase);e.KendoDatePickerFieldReader=t}(Mvc||(Mvc={}));var Mvc;!function(e){var t=function(e){function t(){return e.call(this,"kendoDropDownList")||this}return __extends(t,e),t}(e.KendoFieldReaderBase);e.KendoDropDownListFieldReader=t}(Mvc||(Mvc={}));var Mvc;!function(e){var t=function(e){function t(){return e.call(this,"kendoNumericTextBox")||this}return __extends(t,e),t}(e.KendoFieldReaderBase);e.KendoNumericTextBoxFieldReader=t}(Mvc||(Mvc={}));var Mvc;!function(e){var t=function(){function e(){this.defaultFormat="dd/mm/yyyy"}return e.prototype.format=function(e){return""},e}();e.DateFormatter=t}(Mvc||(Mvc={}));