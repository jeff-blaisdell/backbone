requirejs.config({
    baseUrl: './js',
    paths: {
        'handlebars': 'handlebars',
        'jquery': 'jquery',            
		'backbone': 'backbone',
		'underscore': 'underscore'
    },
    shim: {
    	'underscore': {
    		exports: '_'
    	},
    	'backbone': {
    		deps: ['underscore', 'jquery'],
    		exports: 'Backbone'
    	},
    	'handlebars': {
    		exports: 'Handlebars'
    	} 
    }
});