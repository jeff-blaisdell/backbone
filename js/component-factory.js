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
        	       selection = selections.get(feature.get('featureId'));
        	   
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

       component[ 'TEXT_GROUP' ] = {
           'render': function( feature, selections, optionFeature ) {

             var params    = {},
                 deferred  = $.Deferred(),
                 selection = selections.get(feature.get('featureId')),
                 c         = undefined;
               
               params.selection  = selection;
               params.featureId  = feature.get('featureId');
               params.featureOsr = feature.get('featureOsr');
               params.inputs     = [];
               
               optionFeature.optionFeatureItems.each(function( optionFeatureItem ) {
                   var input         = {};
                   input.displayName = optionFeatureItem.get('displayName');
                   input.featureOsr  = optionFeatureItem.get('optionFeatureItemOsr');
                   input.featureId   = optionFeatureItem.get('featureRefId');
                   input.optionId    = optionFeatureItem.get('optionFeatureItemId');
                   input.required    = (optionFeatureItem.get('required') === true ? 'true' : 'false');
                   
                   if ( optionFeatureItem.input ) {
                       input.allowedChars = optionFeatureItem.input.allowedList;
                       input.maxLength    = optionFeatureItem.input.maxLength;
                   }

                   if ( selection && selection.subConfigurations ) {
                       var subSelection = selection.subConfigurations.findWhere({ 'featureId': input.featureId });
                       if ( subSelection ) {
                           input.value = subSelection.get('optionValue');
                       }
                   }

                   params.inputs.push(input);
               });


               c = new Model.TextGroup(params);
               selection.component.setChild(c);


               selection.subConfigurations = new Model.Configurations();
               $.each(params.inputs, function(index, input) {
                 selection.subConfigurations.add([{ 
                   'featureId': input.featureId,
                   'featureOsr': input.featureOsr,
                   'parentFeatureOsr': feature.featureOsr, 
                   'optionId': input.optionId, 
                   'optionDisplayName': input.displayName, 
                   'optionValue': input.value,
                   'component': c
                 }]);
               });
              
               deferred.resolve(selection);

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
       factory.render = function( feature, selections, optionFeatures  ) {
           var deferred = $.Deferred(),
               componentPromise = undefined,
               type = undefined; 

           type = component[ feature.get('displayType') ];

           if ( type ) {
        	   type.render( feature, selections, optionFeatures )
                 .then(function( selection ) {
                     
                     var option        = undefined,
                         optionFeature = undefined;

                     if( selection.has('optionId') && optionFeatures ) {
                         var option = feature.options.get(selection.get('optionId'));
                         if ( option && option.has('optionFeatureRefId') ) {
                             optionFeature = optionFeatures.get(option.get('optionFeatureRefId'));
                         }
                     }

                     if ( optionFeature ) {
                         type = component[ optionFeature.get('displayType') ];
                         type.render( feature, selections, optionFeature )
                             .then( function( selection ) {
                                 deferred.resolve(selection);
                             });
                     } else {
                         deferred.resolve(selection);
                     }

                 });
           }
           
           return deferred.promise();
       };

       return factory; 

});
