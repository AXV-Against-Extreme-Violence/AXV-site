Template.reportForm.onRendered(function() {
    this.$('.datetimepicker').datetimepicker();
});



Template.displayError.helpers({
    hasErrorsForField: function (field){
        var report = Session.get('report');
        report.validate(field);
        return report.hasValidationError(field);
    },
    errorsForField: function(field){
        var report = Session.get('report');
        report.validate(field);
        return report.getValidationError(field);
    }
});

Template.reportForm.events({

    'keyup .form-control': function(e) {
        var t = $('#formAddReport');
        var report          = Session.get('report');
        if (!report || report == undefined || report == null)
        {
            report = new Report();
            Session.set('report', report);
        }
        report.title        = $(t).find('[name=title]').val();
        report.kind         = $(t).find('[name=kind]').val();
        report.set('eventDate', $(t).find('[name=eventDate]').val());
        report.explanation  = $(t).find('[name=explanation]').val();
        report.date         = new Date();
        report.userID       = Meteor.userId();
        report.validate(false);
        Session.set('report', report);
        //Router.go('postPage', post);
    },

    'submit form': function(e) {
        e.preventDefault();
        var report          = Session.get('report');
        if (!report || report == undefined || report == null)
        {
            report = new Report();
            Session.set('report', report);
        }
        report.title        = $(e.target).find('[name=title]').val();
        report.kind         = $(e.target).find('[name=kind]').val();
        report.set('eventDate', $(e.target).find('[name=eventDate]').val());
        report.explanation  = $(e.target).find('[name=explanation]').val();
        report.date         = new Date();
        report.userID       = Meteor.userId();
        if (report.validate(false))
        {
            report.save();
            console.log('saved');
            Session.set('report', null);
        } else {
            Session.set('report', report);
        }
        Router.go('reportItem', {_id: report._id});
    }
});