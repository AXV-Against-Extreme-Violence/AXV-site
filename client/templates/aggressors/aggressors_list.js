Template.aggressorItemTable.helpers({
   listOfAliases: function (){
       return this.aliases.join(', ');
   },
    noNames: function (){
        return !(this.name || this.lastName);
    }
});

Template.aggressorItemTable.events({
    'click .rowItem': function ()
    {
        Router.go('aggressorItem', {_id: this._id});
    }
});

Template.cityFiltersAggressors.helpers({
    cities: function ()
    {
        return cubanCities;
    }
});

Template.cityFiltersAggressors.events({
    'click .cityFilter': function (e,t){
        var newVal = $(e.target).val();
        $('.search').val(newVal);
        Session.set('aggressorSearchTerm', newVal);
        EasySearch
            .getComponentInstance({ id:'aList', index: 'aggressors' })
            .search(newVal);
    }
});

aggressorSearchHandler = Tracker.autorun(function() {
    var sessionVal = Session.get("aggressorSearchTerm");
    $('.search').val(sessionVal);
});