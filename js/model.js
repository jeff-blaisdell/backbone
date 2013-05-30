define(['jquery', 'backbone', 'handlebars', 'dropdown-template'], function ($, Backbone, Handlebars) {

    var decorateOptions = function( options, selection ) {
    	var selectedOptionPrice = selection.get('adjustmentPrice');
        options.each(function( option ) { 
    		var priceText = undefined;
    		var price = new Number(0);
    		var optionPrice = option.get('adjustmentPrice');
			if ( optionPrice ) {
                    price = (new Number(optionPrice) * 100) - (new Number(selectedOptionPrice) * 100); 
            }
            price = (price / 100).toFixed(2);

            if ('0.00' === price) {
               priceText = undefined;
            } else if (price < 0) {
               priceText = '[-$' + (new String(price)).replace(/-/, '') + ']';
            } else {
               priceText = '[+$' + price + ']';
            }
            option.set({ 
            	'priceText': priceText,
            	'selected': false 
            });            
        });

        var option = options.findWhere({ 'optionOsr': selection.get('optionOsr') });
        if ( option ) {
        	option.set({ 'selected': true });
        }

    };

	var Model = {};

	Model.Product = Backbone.Model.extend({
		initialize: function() {
			var that = this;

			that.features = new Model.Features(that.get('features'));
			that.configurations = new Model.Configurations(that.get('configurations'));
			that.optionFeatures = new Model.OptionFeatures(that.get('optionFeatures'));
			that.set({
				'id': that.get('productId')
			});				
		}
	});

	Model.Feature = Backbone.Model.extend({
		initialize: function() {
			var that = this;

			that.options = new Model.Options(that.get('options'));
			that.set({
				'id': that.get('featureOsr')
			});			
		}
	});	

	Model.Features = Backbone.Collection.extend({
        model: Model.Feature
	});	

	Model.Option = Backbone.Model.extend({
		initialize: function() {
			var that = this;

			that.set({
				'id': that.get('optionId')
			});
		}
	});		

	Model.Options = Backbone.Collection.extend({
        model: Model.Option
	});		

	Model.OptionFeature = Backbone.Model.extend({
		initialize: function() {
			var that = this;

			that.optionFeatureItems = new Model.OptionFeatureItems(that.get('optionFeatureItems'));
			that.set({
				'id': that.get('optionFeatureRefId')
			});
		}
	});	

	Model.OptionFeatures = Backbone.Collection.extend({
        model: Model.OptionFeature
	});	

	Model.OptionFeatureItem = Backbone.Model.extend({
		initialize: function() {
			var that = this;
			that.set({
				'id': that.get('optionFeatureItemId')
			});
		}
	});	

	Model.OptionFeatureItems = Backbone.Collection.extend({
        model: Model.OptionFeatureItem
	});			

	Model.Configuration = Backbone.Model.extend({
        initialize: function () {

            var that = this; // public api

            that.subConfigurations = new Model.Configurations(this.get('subConfigurations'));
            that.component = undefined;

            that.set({
                    'id': that.get('featureOsr')
                });

        }
	});

	Model.Configurations = Backbone.Collection.extend({
        model: Model.Configuration
	});

	Model.Dropdown = Backbone.Model.extend({
        initialize: function () {

        	var that = this,           // public api
        	    selection = that.get('selection'); // private instance variables

        	var render = function() {
        		decorateOptions(that.options, selection);
        		var html = Handlebars.templates['dropdown-template']({
                    'featureId':   that.get('featureId'),
                    'featureOsr':  that.get('featureOsr'), 
                    'displayName': that.get('displayName'), 
                    'required':    ( that.get('required') === true ? 'true' : 'false' ),
                    'options':     that.options.toJSON()
        		});
        		return html;
        	};

        	var onchange = function() {
        		var $fieldset = $(that.get('selector')),
        		    $dropdown = $(that.get('selector') + ' select[data-jos-role="FEATURE"]'),
        		    $option   = $dropdown.find(':selected'),
        		    optionOsr = ($option ? $option.attr('data-jos-option-osr') : undefined),
        		    option    = that.options.findWhere({ 'optionOsr': optionOsr });

                    selection.set({
					    'optionOsr': option.get('optionOsr'),
						'optionId': option.get('optionId'),
						'optionDisplayName': option.get('displayName'),
						'adjustmentPrice': option.get('adjustmentPrice')
					});

					that.set({
						'html': render()
				    });

                    $fieldset.replaceWith(that.get('html'));

                    that.trigger('ready');
        	};

        	that.options = that.get('options');

            that.set({
            	'selector': ( '#' + that.get('featureId')),
            	'html': render()
            })

            /**
             * Event Listeners
             */
            that.on('ready', function() {
                  var $dropdown = $(that.get('selector'));
                  $dropdown.find('select[data-jos-role="FEATURE"]').off('change', onchange)
                                                                    .on('change', onchange);
            });


        }
	});




	return Model;
});