define(['jquery', 'model'], function( $, Model ) {
       var component ={},
           factory = {};

       /**
        * Define available components.
        */
       component[ 'STD_DROP' ] = {
           'render': function( feature, selections ) {

        	   var params    = {},
       	         deferred  = $.Deferred(),
        	       selection = selections.get(feature.get('featureOsr'));
        	   
             params.featureId   = feature.get('featureId');
             params.featureOsr  = feature.get('featureOsr');
        	   params.displayName = feature.get('displayName');
             params.required    = feature.get('required');
        	   params.options     = feature.options;
        	   params.selection   = selection;
        	   
        	   selection.component = new Model.Dropdown(params);
             deferred.resolve(selection);

             return deferred.promise();
           }
       };

 
       component['STD_IMAGE'] = component['STD_DROP'];
       
   	
      /**
       * Factory method to render an html component.
       * @param feature
       * @param optionFeature (optional)
       * @returns HTML mark-up.
       */       
       factory.render = function( feature, selections, optionFeature  ) {
           var componentPromise = undefined,
               type = undefined; 
        	   
           if (optionFeature) {
               type = component[ optionFeature.get('displayType') ];
           } else {
               type = component[ feature.get('displayType') ];
           }
        	   

           if ( type ) {
        	   componentPromise = type.render( feature, selections, optionFeature );
           }
           
           return componentPromise;
       };

       return factory; 

});
