
var selectedButtonId;

Template.postSubmit.events({
    'submit form': function(e) {
        e.preventDefault();

        //Create a new posts object
        var post = {
            
            title: $(e.target).find('[name=title]').val(),
            description : $(e.target).find('[name=description]').val(),
            address: $(e.target).find('[name=address]').val(),
            contactNo: $(e.target).find('[name=contactNo]').val(),
            bankAccount: $(e.target).find('[name=bankAccount]').val(),
            url: $(e.target).find('[name=url]').val(),
            category: selectedButtonId    
        }

        //Call server Method
        Meteor.call('post', post, function(error, id) { //This maps to a method in posts.js //methodName, dataParam, callback function
            if (error) {
                // display the error to the user
                throwError(error.reason);
                if ( error.error === 302 )
                    Router.go('postPage', { _id: error.details })
            } else {
                Router.go('postPage', { _id: id });
            }
        });
    },
    'click .btn' : function(e) {

        if ( $(e.currentTarget).val() != "Submit" ) {
            e.preventDefault();
            selectedButtonId = e.currentTarget; //Update the selected button id on click
            //alert( $(selectedButtonId).val() );
        }
    }
});


