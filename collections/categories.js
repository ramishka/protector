Categories = new Meteor.Collection('categories');

Meteor.methods({

    getCategoryName : function( postAttributes ) {
    	//alert ('getCategoryName called' + postAttributes.category );

    	var categoryData;
         if ( !_.isNull( postAttributes.category ) ){
	        categoryData = Categories.findOne ( { uname : postAttributes.category } );
	       	alert ("not null " + categoryData.uname);
	    } else {
	        categoryData = Categories.findOne ( { uname : "MONETARY" } );
	        //alert ("null" + categoryData.uname);
	    }

	    postAttributes.category = categoryData.uname;
	    return postAttributes;

    }
});
