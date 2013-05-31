define(['jquery',
	    'backbone',
	    'handlebars',
	    'dropdown-template'],
function( $, Backbone, Handlebars ) {

var View = {};
	
	View.DropdownView = Backbone.View.extend({

		template: Handlebars.templates['dropdown-template'],

		events: {
			'change select[data-jos-role="FEATURE"]': 'onchange'
		},

		initialize: function() {
            this.listenTo(this.model, 'change', this.render);
            this.render();
		},

		render: function() {
            var html = this.template({
                'featureId':   this.model.get('featureId'),
                'featureOsr':  this.model.get('featureOsr'), 
                'displayName': this.model.get('displayName'), 
                'required':    ( this.model.get('required') === true ? 'true' : 'false' ),
                'options':     this.model.options.toJSON()
            });
            this.$el.html(html);
            return this;
		},

		onchange: function() {
			var value = this.$el.find('select[data-jos-role="FEATURE"] :selected').attr('data-jos-option-osr');
            this.model.setValue(value);
		}

	});

    return View;

});