ReportsService = {
    'getReportsList': function () {
        return Reports.find({}, {sort: {eventDate: -1, uploadDate: -1}});
    },
    'getReport': function (reportId) {
        return Reports.findOne(reportId);
    },
    'reportsExist': function(){
        return (Reports.find({}).count() >= 0);
    }
};
