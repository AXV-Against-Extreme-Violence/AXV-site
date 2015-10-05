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