var mvc = new Mvc.FieldHelper([
  new Mvc.FieldMappingModel({ fieldId: "textBoxName", modelProperty : "Name"}),
  new Mvc.FieldMappingModel({ fieldId: "textBoxEmail", modelProperty : "Email"}),
  new Mvc.FieldMappingModel({ fieldId: "checkboxSend", modelProperty : "Send", reader : Mvc.FieldReaderType.CheckBox})
],
  { "Name" : "Harlen Morais Naves", "Email" : "harlennaves@gmail.com", "Send": true});

  mvc.getModel();
