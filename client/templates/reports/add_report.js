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
    if (date == undefined || date == null)
    {
        date = new Date();
    }
    $('.datetimepicker').datetimepicker({
        defaultDate:new Date()
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
    documents: function (){
        var report = Session.get('report');
        return report.evidence.get('documents');
    },
    links: function (){
        var report = Session.get('report');
        return report.evidence.get('links');
    },
    aggressors: function (){
        var report = Session.get('report');
        return report.aggressors;
    },
    aggressorWithId: function (aId)
    {
      return Aggressors.findOne(aId);
    },
    title: function (){
        var report = Session.get('report');
        var date = report.eventDate;
        if (date == undefined || date == null)
        {
            date = new Date();
        }
        $('.datetimepicker').datetimepicker({
            defaultDate:new Date()
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
    },
    listOfAliases: function (){
        return this.aliases.join(', ');
    },
    noNames: function (){
        return !(this.firstName || this.lastName);
    }
});

Template.searchBox.events({
   'keyup .box': function ()
   {
       Session.set('term', $('.box').val());
   },
    'click #addWithAlias': function (){
        var newA = new Aggressor();
        newA.aliases = [Session.get('term')];
        newA.save();
    },
    'click #addToReport': function ()
    {
        var report          = Session.get('report');
        if (!report || report == undefined || report == null)
        {
            report = new Report();
            report.eventDate = new Date();
            Session.set('report', report);
        }
        if (!report.aggressors || report.aggressors == undefined || report.aggressors == null)
        {
            report.aggressors = [];
        }
        report.push('aggressors', this._id);
        Session.set('report', report);
    }
});

Template.searchBox.helpers({
   searchTerm: function()
   {
       return Session.get('term');
   },
    isAdded: function(aggressorID){
        var report = Session.get('report');
        return _.contains(report.get()['aggressors'], aggressorID);
    },
    listOfAliases: function (){
        return this.aliases.join(', ');
    },
    noNames: function (){
        return !(this.firstName || this.lastName);
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

    'change #fileToUpload': function (e,t) {
        var file = document.getElementById('fileToUpload').files[0];
        document.getElementById('fileToUpload').value = null;
        toastr.warning('Uploading photo!');
        processImage(file, 1024, 1024, function(dataURI) {
            var blob = dataURItoBlob(dataURI);
            uploader.send(blob, function (error, downloadUrl) {
                toastr.success('Succeeded uploading');

                var report          = Session.get('report');
                if (!report || report == undefined || report == null)
                {
                    report = new Report();
                    report.eventDate = new Date();
                    Session.set('report', report);
                }
                if (!report.evidence || report.evidence == undefined || report.evidence == null)
                {
                    report.evidence = new Evidence();
                    report.evidence.documents = [];
                    report.evidence.photos = [];
                    report.evidence.links = [];
                }
                report.evidence.push('photos', downloadUrl);
                Session.set('report', report);
                document.getElementById('fileToUpload').value = null;
            });
        });

    },

    'change #documentToUpload': function (e,t) {
        var files = document.getElementById('documentToUpload').files;
        var file = document.getElementById('documentToUpload').files[0];
            toastr.warning('Uploading document!');
            $('#documentToUpload').val(null);
            documentUploader.send(file, function (error, downloadUrl) {
                if (error !== null)
                {
                    toastr.error('Failed to upload'+error);
                    return;
                }
                toastr.success('Succeeded uploading');

                var report          = Session.get('report');
                if (!report || report == undefined || report == null)
                {
                    report = new Report();
                    report.eventDate = new Date();
                    Session.set('report', report);
                }
                if (!report.evidence || report.evidence == undefined || report.evidence == null)
                {
                    report.evidence = new Evidence();
                    report.evidence.documents = [];
                    report.evidence.photos = [];
                    report.evidence.links = [];
                }

                var document = {};
                document.name = file.name;
                document.url = downloadUrl;
                console.log(document.name);
                console.log(document.url);
                report.evidence.push('documents', document);
                Session.set('report', report);
                $('#documentToUpload').val(null);
            });

    },

    'click form': function (e){
        var t = $('#formAddReport');

        var report          = Session.get('report');
        if (!report || report == undefined || report == null)
        {
            report = new Report();
            report.eventDate = new Date();
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
            report.eventDate = new Date();
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
            report.eventDate = new Date();
            Session.set('report', report);
        }
        var link = $(e.target).find('[name=link]').val();
        if  (link && link != null && link != undefined)
        {
            if (!report.evidence || report.evidence == undefined || report.evidence == null)
            {
                report.evidence = new Evidence();
                report.evidence.documents = [];
                report.evidence.photos = [];
                report.evidence.links = [];
            }
            report.evidence.push('links', link);

            document.getElementById('link').value = null;
            report.validate(false);
            Session.set('report', report);
            return;

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
            Router.go('reportItem', {_id: report._id});

        } else {
            Session.set('report', report);
            Session.set('validationErrors', report.getValidationErrors());
        }

    }
});

