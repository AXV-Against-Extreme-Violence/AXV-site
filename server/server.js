function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid.toUpperCase();
}

Slingshot.createDirective("photoUploads", Slingshot.S3Storage, {
    bucket: Meteor.settings.AWSBucket,

    acl: "public-read",

    authorize: function () {
        //Deny uploads if user is not logged in.
        if (!this.userId) {
            var message = "Please login before posting files";
            throw new Meteor.Error("Login Required", message);
        }

        return true;
    },

    key: function (file) {
        //Store file into a directory by the user's id
        return this.userId + "/" + generateUUID();
    }
});

Slingshot.createDirective("documentUploads", Slingshot.S3Storage, {
    bucket: Meteor.settings.AWSBucket,

    acl: "public-read",

    authorize: function () {
        //Deny uploads if user is not logged in.
        if (!this.userId) {
            var message = "Please login before posting files";
            throw new Meteor.Error("Login Required", message);
        }

        return true;
    },

    key: function (file) {
        //Store file into a directory by the user's id
        return this.userId + "/" + generateUUID();
    }
});

WebApp.connectHandlers.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return next();
});