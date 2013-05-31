define(['jquery', 
        'backbone', 
        'handlebars',
        'dropdown-template', 
        'text-group-template'], 
function ($, Backbone, Handlebars) {

	var Model = {};

	Model.Product = Backbone.Model.extend({
		initialize: function() {
			var that = this;


            var buildOptionFeatures = function( selection ) {

                var feature               = that.features.get(selection.get('featureOsr')),
                    optionFeatures        = that.optionFeatures,
                    option                = undefined,
                    optionFeature         = undefined,
                    prevSubConfigurations = selection.subConfigurations,
                    subConfigurations     = undefined;

                // Reset sub-configurations
                selection.subConfigurations = undefined;

                if ( selection.has('optionId') && optionFeatures ) {
                    option = feature.options.get(selection.get('optionId'));
                    if ( option && option.has('optionFeatureRefId') ) {
                        optionFeature = optionFeatures.get(option.get('optionFeatureRefId'));
                    }

                    if ( optionFeature ) {
                        subConfigurations = new Model.Configurations();
                        optionFeature.optionFeatureItems.each(function( item ) {
                            subConfigurations.add([{
                                'featureId': item.featureId,
                                'featureOsr': item.featureOsr,
                                'parentFeatureOsr': feature.get('featureOsr'), 
                                'optionId': item.optionId, 
                                'optionDisplayName': item.displayName, 
                                'optionValue': item.value
                            }]);
                        });
                        selection.subConfigurations = subConfigurations;
                    }
                }

                if ( prevSubConfigurations !== subConfigurations ) {
                    selection.trigger('change:subConfigurations', selection);
                }

            };

            var bomb = function( selection ) {
                console.log('cha');
            };

			that.features = new Model.Features(that.get('features'));
			that.configurations = new Model.Configurations(that.get('configurations'));
			that.optionFeatures = new Model.OptionFeatures(that.get('optionFeatures'));
			that.set({
				'id': that.get('productId')
			});				

            that.listenTo(that.configurations, 'change:optionOsr', buildOptionFeatures) 
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
                'id': that.get('featureId')
            });

        }
	});

	Model.Configurations = Backbone.Collection.extend({
        model: Model.Configuration
	});

	Model.Dropdown = Backbone.Model.extend({
        initialize: function () {

        	var that           = this,                  // public api
                product        = that.get('product'),   // private instance variables
                feature        = that.get('feature'),
                selection      = product.configurations.get(feature.get('featureId'));

        	that.options = feature.options;
            that.set({
                'featureId':   feature.get('featureId'),
                'featureOsr':  feature.get('featureOsr'),
                'displayName': feature.get('displayName'),
                'required':    feature.get('required'),
                'value':       selection.get('optionOsr')
            });

            var updateOptionPriceText = function( options, selection ) {
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

            that.on('change:value', function() {
                var option     = that.options.findWhere({ 'optionOsr': that.get('value') }),
                    prevOption = that.options.findWhere({ 'optionOsr': that.previous('value') });

                selection.set({
                    'optionOsr': option.get('optionOsr'),
                    'optionId': option.get('optionId'),
                    'optionDisplayName': option.get('displayName'),
                    'adjustmentPrice': option.get('adjustmentPrice')
                });

                if ( option.get('adjustmentPrice') !== prevOption.get('adjustmentPrice') ) {
                    updateOptionPriceText(that.options, selection);
                    that.trigger('render', that);
                }

            });

            updateOptionPriceText(that.options, selection);

        }
	});

    Model.TextGroup = Backbone.Model.extend({
        initialize: function () {

            var that           = this,                     // public api
                feature        = that.get('feature'),      // private instance variables
                selection      = that.get('selections').get(feature.get('featureId')),
                selections     = that.get('selections'), 
                optionFeatures = that.get('optionFeatures');

            var render = function() {
                var html = Handlebars.templates['text-group-template']({
                    'featureId':   that.get('featureId'),
                    'featureOsr':  that.get('featureOsr'), 
                    'inputs':      that.inputs
                });
                return html;
            };

            var onchange = function() {

            };

            that.inputs = that.get('inputs');

            that.set({
                'selector': ( '#' + that.get('featureId')),
                'html': render()
            })

            /**
             * Event Listeners
             */
            selection.component.on('ready', function() {

            })

        }
    });


	return Model;
});
