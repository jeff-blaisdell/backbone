require(['jquery', 'backbone', 'component-factory', 'model', 'data'], function($, Backbone, componentFactory, Model, Data) {

	var product        = undefined,
	    features       = undefined,
	    selections     = undefined,
	    optionFeatures = undefined,
	    feature        = undefined,
	    selection      = undefined;

	var builder        = {}; // Namespace for all controller behaviors.
    var events         = {}; // Namespace for all event handlers.
    events.helper      = {}; // Sub-namespace for event helper functions.

    builder.launch = function() {
        
        builder.init();
        events.init();

		componentFactory.render( feature, selections, optionFeatures )
	    	.then(function( selection ) {
	    		var component = selection.component;
	    		$('body').append(component.get('html'));
	    		component.trigger('ready', selection);
	    	});

    };

    builder.init = function() {
		product        = new Model.Product(Data.pendant),
		features       = product.features,
		selections     = product.configurations,
		optionFeatures = product.optionFeatures,
		feature        = product.features.get('PENDANT ENGRAVING'),
		selection      = selections.get(feature.get('featureId'));
    };
    
    builder.renderSeletion = function( selection ) {
        var feature = features.get(selection.get('featureOsr'));

		componentFactory.render( feature, selections, optionFeatures )
	    	.then(function( selection ) {
	    		var component = selection.component,
	    		    selector  = component.get('selector');

	    		$(selector).replaceWith(component.get('html'));
	    		component.trigger('ready', selection);
	    	});        
    };

    events.helper.isRenderNeeded = function( selection ) {
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

        isRenderNeeded = events.helper.isRenderNeeded( selection );

        if ( isRenderNeeded ) {
            builder.renderSeletion( selection );
        }
    };

    events.init = function() {
	    selections.off('change:optionOsr', events.onchange)
	               .on('change:optionOsr', events.onchange);

    };

	$( document ).ready(function() {
		builder.launch();
	});

});