require(['jquery', 'backbone', 'view-factory', 'model', 'data'], function($, Backbone, viewFactory, Model, Data) {

	var product        = undefined,
	    features       = undefined,
	    selections     = undefined,
	    optionFeatures = undefined,
	    feature        = undefined,
	    selection      = undefined;

	var builder        = {}; // Namespace for all controller behaviors.
    var events         = {}; // Namespace for all event handlers.
    events.helper      = {}; // Sub-namespace for event helper functions.


    builder.init = function() {
		//product        = new Model.Product(Data.pendant),
		product        = new Model.Product(Data.ring),
		feature        = product.features.get('METAL CHOICE');
		// feature        = product.features.get('PENDANT ENGRAVING');
    };

    builder.launch = function() {
        
        builder.init();

		viewFactory.render( product, feature )
	    	.then(function( view ) {

	    	});

    };



	$( document ).ready(function() {
		builder.launch();
	});

});