define(['handlebars'], function(Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['text-group-template'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n        <fieldset>\r\n            ";
  stack1 = helpers['if'].call(depth0, depth0.displayName, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            <input type=\"text\" class=\"jos-with-hint jos-text-input\" data-jos-role=\"SUB_FEATURE\" data-jos-feature-id=\"";
  if (stack1 = helpers.featureId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.featureId; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-jos-option-id=\"";
  if (stack1 = helpers.optionId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.optionId; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-jos-option-display-name=\"";
  if (stack1 = helpers.displayName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.displayName; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-jos-required=\"";
  if (stack1 = helpers.required) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.required; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, depth0.allowedChars, {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, depth0.maxLength, {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"";
  if (stack1 = helpers.value) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" />                        \r\n        </fieldset>\r\n	";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n                <label>";
  if (stack1 = helpers.displayName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.displayName; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ":</label>\r\n            ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "data-jos-allowed-chars=\"";
  if (stack1 = helpers.allowedChars) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.allowedChars; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "data-jos-max-length=\"";
  if (stack1 = helpers.maxLength) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.maxLength; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"";
  return buffer;
  }

  buffer += "<span id=\"";
  if (stack1 = helpers.featureId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.featureId; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-jos-role=\"SUB_FEATURE_GROUP\" data-jos-feature-osr=\"";
  if (stack1 = helpers.featureOsr) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.featureOsr; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\r\n	";
  stack1 = helpers.each.call(depth0, depth0.inputs, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</span>";
  return buffer;
  });
});