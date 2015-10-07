var requiredStringWithLengthValidator = Validators.and([
    Validators.required(),
    Validators.string(),
    Validators.minLength(3, 'This string is too short')
]);


var arrayOrEmpty = Validators.or([
    Validators.array(),
    Validators.null()
]);

Document = Astro.Class({
    name    : 'Document',
    field   : {
        name: 'string',
        url : 'string'
    }
});

Evidence = Astro.Class({
    name    : 'Evidence',
    fields  : {
        documents   : {
            type    : 'array'
        },
        links       : {
            type    : 'array',
            nested  : 'string'
        },
        videos      : {
            type    : 'array',
            nested  : 'string'
        },
        photos      : {
            type    : 'array',
            nested  : 'string'
        }
    }
});

AggressorReference = Astro.Class({
    name: 'AggressorReference',
    fields: {
        aggressorID: 'string',
        explanation: 'string'
    },
    validators: {
        aggressorID: requiredStringWithLengthValidator,
        explanation: requiredStringWithLengthValidator
    },
    methods: {
        aggressor: function (){
            var anID = this.aggressorID;
            return Aggressors.findOne(anID);
        }
    }
});

Reports = new Mongo.Collection('reports');

Reports.initEasySearch(['title', 'kind']);

Report  = Astro.Class({
    name        : 'Report',
    collection  : Reports,
    fields      : {
        title       : 'string',
        date        : 'date',
        eventDate   : {
            name: 'date',
            default: function ()
            {
                return new Date();
            }
        },
        explanation : 'string',
        kind        : 'string',
        userID      : 'string',
        evidence    : {
            type    : 'object',
            nested  : 'Evidence'
        },
        aggressors  : {
            type    : 'array',
            nested  : 'string'
        }
    },
    validators: {
        kind        : Validators.choice(['Harassment', 'Violence']),
        title       : requiredStringWithLengthValidator,
        explanation : requiredStringWithLengthValidator,
        userID      : requiredStringWithLengthValidator,
        date        : Validators.date(),
        eventDate   : Validators.date(),
        aggressors  : arrayOrEmpty
    },
    methods: {
        user: function (){
            var anID = this.userID;
            return Meteor.users.findOne(anID);
        }
    }
});


Reports.allow({
    insert: function(userId, doc) {
        // only allow posting if you are logged in
        return !! userId;
    }
});