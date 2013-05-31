define(['jquery', 'model', 'view'], function( $, Model, View ) {
       var component ={},
           factory = {};

       /**
        * Define available components.
        */
       component[ 'STD_DROP' ] = {
           'render': function( product, feature ) {

        	   var params    = {},
       	         deferred  = $.Deferred(),
                 viewModel = undefined,
                 view      = undefined;
        	   
             params.product        = product;
             params.feature        = feature;
        	   
        	   viewModel = new Model.Dropdown(params);
             view = new View.DropdownView({ 
                 'el': '#' + feature.get('featureId'),
                 'model': viewModel 
             });

             deferred.resolve(view);

             return deferred.promise();
           }
       };

       component[ 'TEXT_GROUP' ] = {
           'render': function( product, feature ) {

             var params    = {},
                 deferred  = $.Deferred(),
                 viewModel = undefined,
                 view      = undefined;
             
             params.product        = product;
             params.feature        = feature;
             
             viewModel = new Model.TextGroup(params);
             view = new View.TextGroup({ 
                 'model': viewModel
             });

             deferred.resolve(view);

             return deferred.promise();
           }
       };

       component['STD_IMAGE'] = component['STD_DROP'];
       

      /**
       * Factory method to render an html component.
       * @param feature        (required)
       * @param selections     (required)
       * @param optionFeatures (optional)
       * @returns A UI Component.
       */       
       factory.render = function( product, feature  ) {
           var deferred = $.Deferred(),
               componentPromise = undefined,
               type = undefined; 

           type = component[ feature.get('displayType') ];

           if ( type ) {
        	   type.render( product, feature )
                 .then( deferred.resolve );
           }
           
           return deferred.promise();
       };

       return factory; 

});
