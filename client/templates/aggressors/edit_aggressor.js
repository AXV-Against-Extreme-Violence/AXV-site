var getAggressor = function ()
{
    return Session.get('aggressorEdit');
};

var setAggressor = function (editedAggressor){
    Session.set('aggressorEdit', editedAggressor);
};

Template.aliasesEdit.helpers({
    aliases: function () {
        return getAggressor().aliases;
    }
});

Template.firstNameEdit.helpers({
    name: function (){
        return getAggressor().name;
    }
});

Template.lastNameEdit.helpers({
    lastName: function (){
        return getAggressor().lastName;
    }
});

Template.aliasAdd.events({
   'click #addAlias': function (e){
       e.preventDefault();
        var aggressor = getAggressor();
       var value = $('#newAlias').val();
       aggressor.push('aliases', value);
       setAggressor(aggressor);
   }
});

Template.firstNameEdit.events({
   'change input': function (e){
       var aggressor = getAggressor();
       aggressor.set('name', $(e.target).val());
       setAggressor(aggressor);
   }
});

Template.lastNameEdit.events({
    'change input': function (e){
        var aggressor = getAggressor();
        aggressor.set('lastName', $(e.target).val());
        setAggressor(aggressor);
    }
});

Template.editAggressor.events({
   'submit form': function (e){
       e.preventDefault();
       var aggressor = getAggressor();
       aggressor.name       = $('#firstName').val();
       aggressor.lastName   = $('#lastName').val();
       if (aggressor && aggressor.validate(false)){
           aggressor.save(function(err, id) {
                if(err!= undefined) alert(err);
               var id = aggressor._id;
               setAggressor(undefined);
               Router.go('aggressorItem', {_id: id});
           });

       }
   }
});