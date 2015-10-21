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



Template.photoAdd.events({
    'change #fileToUpload': function (e,t) {
        var file = document.getElementById('fileToUpload').files[0];
        document.getElementById('fileToUpload').value = null;
        toastr.warning('Uploading photo!');
        processImage(file, 1024, 1024, function(dataURI) {
            var blob = dataURItoBlob(dataURI);
            uploader.send(blob, function (error, downloadUrl) {
                toastr.success('Succeeded uploading');

                var aggressor          = getAggressor();

                if (!aggressor.photos || aggressor.photos == undefined || aggressor.photos == null)
                {

                    aggressor.set('photos', [downloadUrl]);
                } else
                {
                    var sum = aggressor.get('photos');
                    sum.push(downloadUrl);


                    aggressor.set('photos', sum);
                }

                aggressor.save();
                setAggressor(aggressor);
                document.getElementById('fileToUpload').value = null;
            });
        });

    }
});