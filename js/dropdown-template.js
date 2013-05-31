define(['handlebars'], function(Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['dropdown-template'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n		<label>";
  if (stack1 = helpers.displayName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.displayName; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ":</label>\r\n	";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n			<option data-jos-option-osr=\"";
  if (stack1 = helpers.optionOsr) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.optionOsr; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, depth0.selected, {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\r\n				";
  if (stack1 = helpers.displayName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.displayName; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " ";
  stack1 = helpers['if'].call(depth0, depth0.priceText, {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " \r\n			</option>\r\n		";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "selected=\"true\"";
  }

function program6(depth0,data) {
  
  var stack1;
  if (stack1 = helpers.priceText) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.priceText; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  return escapeExpression(stack1);
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n		";
  if (stack1 = helpers.child) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.child; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	";
  return buffer;
  }

  buffer += "\r\n	";
  stack1 = helpers['if'].call(depth0, depth0.displayName, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " \r\n	<select class=\"jos-with-hint\" data-jos-role=\"FEATURE\" data-jos-feature-osr=\"";
  if (stack1 = helpers.featureOsr) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.featureOsr; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-jos-required=\"";
  if (stack1 = helpers.required) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.required; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\r\n		<option>Please select...</option>\r\n		";
  stack1 = helpers.each.call(depth0, depth0.options, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	</select>\r\n	";
  stack1 = helpers['if'].call(depth0, depth0.child, {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  return buffer;
  });
});