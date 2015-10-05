function dataURItoBlob(dataURI) {
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: mimeString});
}

Template.reportForm.onRendered(function() {
    var report = Session.get('report');
    var date = report.eventDate;
    console.log('adate '+date);
    this.$('.datetimepicker').datetimepicker({
        defaultDate:date
    }).on("dp.change", function(e) {
        var t = $('#formAddReport');
        report.set('eventDate', $(t).find('[name=eventDate]').val());
        Session.set('report',report);
    });

});

Blaze.registerHelper('isEqual', function (lhs, rhs) {
    return lhs === rhs;
});

Template.reportForm.helpers({
   photos: function (){
       var report = Session.get('report');
       return report.evidence.photos;
   },
    title: function (){
        var report = Session.get('report');
        var date = report.eventDate;
        $('.datetimepicker').datetimepicker({
            defaultDate:date
        }).on("dp.change", function(e) {
                var t = $('#formAddReport');
                report.set('eventDate', $(t).find('[name=eventDate]').val());
                Session.set('report',report);
            });
        return report.title;
    },
    explanation: function (){
        var report = Session.get('report');
        return report.explanation;
    },
    kind: function (){

        var report = Session.get('report');
        return report.kind;
    }
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

    'change [type=file]': function (e) {
        var file = document.getElementById('fileToUpload').files[0];
        processImage(file, 300, 300, function(dataURI) {
            var blob = dataURItoBlob(dataURI);
            uploader.send(blob, function (error, downloadUrl) {
                toastr.success('Succeeded uploading');

                var report          = Session.get('report');
                if (!report || report == undefined || report == null)
                {
                    report = new Report();
                    Session.set('report', report);
                }
                if (!report.evidence || report.evidence == undefined || report.evidence == null)
                {
                    report.evidence = new Evidence();
                    report.evidence.photos = [];
                }
                report.evidence.push('photos', downloadUrl);
                Session.set('report', report);
                document.getElementById('fileToUpload').value = null;
            });
        });

    },
    'click form': function (e){
        var t = $('#formAddReport');
        var report          = Session.get('report');
        if (!report || report == undefined || report == null)
        {
            report = new Report();
            Session.set('report', report);
        }
        report.set('eventDate', $(t).find('[name=eventDate]').val());
        report.validate(false);
        Session.set('report', report);
    },
    'click .datetimepicker': function (e){
        var t = $('#formAddReport');
        var report          = Session.get('report');
        if (!report || report == undefined || report == null)
        {
            report = new Report();
            Session.set('report', report);
        }
        report.set('eventDate', $(t).find('[name=eventDate]').val());
        report.validate(false);
        Session.set('report', report);
    },
    'change .form-control': function(e) {
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

