Template.reportsList.helpers({
   reports: function () {
       return ReportsService.getReportsList();
   }
});

Template.reportItemTable.helpers({
   formatDate: function (date) {
       return moment(date).format("DD/MM/YYYY");
   }
});

Template.reportItemTable.events({
   'click .rowItem': function ()
   {
       Router.go('reportItem', {_id: this._id});
   }
});
Template.cityFilters.helpers({
    cities: function ()
    {
        return cubanCities;
    }
});

Template.cityFilters.events({
   'click .cityFilter': function (e,t){
       var newVal = $(e.target).val();
       $('.search').val(newVal);
       Session.set('searchTerm', newVal);
       EasySearch
           .getComponentInstance({ id:'reportList', index: 'reports' })
           .search(newVal);
   }
});

reportSearchHandler = Tracker.autorun(function() {
    var sessionVal = Session.get("searchTerm");
    $('.search').val(sessionVal);
});
