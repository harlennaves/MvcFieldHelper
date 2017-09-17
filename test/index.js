var mvc = new Mvc.FieldHelper([
  { fieldId: "textBoxName", modelProperty : "Name"},
  { fieldId: "textBoxEmail", modelProperty : "Email"},
  { fieldId: "checkboxSend", modelProperty : "Send", reader : Mvc.FieldReaderType.CheckBox}
],
  { "Name" : "Harlen Morais Naves", "Email" : "harlennaves@gmail.com", "Send": true});

  mvc.getModel();
