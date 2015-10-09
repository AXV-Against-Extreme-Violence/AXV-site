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
    firstName: function (){
        return getAggressor().firstName;
    }
});

Template.lastNameEdit.helpers({
    lastName: function (){
        return getAggressor().lastName;
    }
});


Template.aliasEdit.events({
   'click #removeAlias': function (){
       var aggressor = getAggressor();
       var aliases = aggressor.aliases;
       var alias = this;
       alert(aliases);

       //fixme array doesnt change
       var without = _.without(aliases,alias);
        alert(without);
       aggressor.aliases = without;
       setAggressor(aggressor);
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
       aggressor.name = $(e.target).val();
       setAggressor(aggressor);
   }
});

Template.lastNameEdit.events({
    'change input': function (){
        var aggressor = getAggressor();
        aggressor.lastName = $(e.target).val();
        setAggressor(aggressor);
    }
});

Template.editAggressor.events({
   'submit form': function (){
       // TODO update all fields
       // TODO Validate
       // TODO Save
       // TODO clear session
       // TODO route to aggressor
   }
});