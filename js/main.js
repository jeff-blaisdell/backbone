require(['jquery', 'backbone', 'component-factory', 'model', 'data'], function($, Backbone, componentFactory, Model, Data) {

	var builder = {};

	builder.launchRing = function() {

		var product    = new Model.Product(Data.ring),
		    selections = product.configurations,
		    feature    = product.features.get('METAL CHOICE'),
		    selection      = selections.get(feature.get('featureId'));

	    selections.on('change:optionOsr', function( selection ) {
	    	console.log('Your selection has changed to : "' + selection.get('optionDisplayName') + '" from "' + selection.previous('optionDisplayName') + '".');
	    });

		componentFactory.render( feature, selections )
	    	.then(function( selection ) {
	    		var component = selection.component;
	    		$('body').append(component.get('html'));
	    		component.trigger('ready', selection);
	    	});

	};

	builder.launchPendant = function() {

		var product        = new Model.Product(Data.pendant),
		    features       = product.features,
		    selections     = product.configurations,
		    optionFeatures = product.optionFeatures,
		    feature        = product.features.get('PENDANT ENGRAVING'),
		    selection      = selections.get(feature.get('featureId'));

		var events = {};
		events.isRenderNeeded = function( selection ) {
            var feature        = features.get(selection.get('featureOsr')),
                option         = feature.options.get(selection.get('optionId')),
                prevOption     = ( selection.previous('optionId') ? feature.options.get(selection.previous('optionId')) : undefined),
                isRenderNeeded = false;
                
                /**
                 * Have sub-features changed?
                 */
                if ( prevOption.has('optionFeatureRefId') || option.has('optionFeatureRefId') ) {
                	return true;
                }
            
            return false;
		};

		events.onchange = function( selection ) {
			var isRenderNeeded = false;
            isRenderNeeded = events.isRenderNeeded( selection );

            if ( isRenderNeeded ) {
            	componentFactory.render( feature, selections, optionFeatures )
	    	        .then(function( selection ) {
	    		        var component = selection.component,
	    		            selector  = selection.component.get('selector');
	    		        $(selector).replaceWith(component.get('html'));
	    		        component.trigger('ready', selection);
	    	});
            }
		};


	    selections.on('change:optionOsr', function( selection ) {
	    	events.onchange( selection );
	    	console.log('Your selection has changed to : "' + selection.get('optionDisplayName') + '" from "' + selection.previous('optionDisplayName') + '".');
	    });

		componentFactory.render( feature, selections, optionFeatures )
	    	.then(function( selection ) {
	    		var component = selection.component;
	    		$('body').append(component.get('html'));
	    		component.trigger('ready', selection);
	    	});

	};	


	$( document ).ready(function() {
		builder.launchPendant();
	});

});