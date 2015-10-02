Template.reportsList.helpers({
   reports: function () {
       return ReportsService.getReportsList();
   }
});