require(['jquery', 'backbone', 'component-factory', 'model', 'data'], function($, Backbone, componentFactory, Model, Data) {

	var builder = {};

	builder.launch = function() {

		var product = new Model.Product(Data.product),
		    selections = product.configurations,
		    feature = product.features.get('METAL CHOICE'),
		    selection = selections.get('METAL CHOICE');

	    selection.on('change:optionOsr', function() {
	    	console.log('Your selection has changed to : "' + selection.get('optionDisplayName') + '".');
	    });

		componentFactory.render( feature, selections )
	    	.then(function( selection ) {
	    		var component = selection.component;
	    		$('body').append(component.get('html'));
	    		component.trigger('ready', selection);
	    	});

	};


	$( document ).ready(function() {
		builder.launch();
	});

});