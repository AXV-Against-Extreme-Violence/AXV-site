Evidence = Astro.Class({
    name    : 'Evidence',
    fields  : {
        documents   : {
            type    : 'array',
            nested  : 'string'
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
Report  = Astro.Class({
    name        : 'Report',
    collection  : Reports,
    fields      : {
        title       : 'string',
        date        : 'date',
        eventDate   : 'date',
        explanation : 'string',
        kind        : 'string',
        userID      : 'string',
        evidence    : {
            type    : 'array',
            nested  : 'Evidence'
        },
        aggressors  : {
            type    : 'array',
            nested  : 'AggressorReference'
        }
    },
    validators: {
        kind: Validators.choice(['harassment']),
        title: requiredStringWithLengthValidator,
        explanation: requiredStringWithLengthValidator,
        userID: requiredStringWithLengthValidator,
        evidence: Validators.array(),
        aggressors: Validators.array()
    },
    methods: {
        user: function (){
            var anID = this.userID;
            return Meteor.users.findOne(anID);
        }
    }
});

var requiredStringWithLengthValidator = Validators.and([
    Validators.required(),
    Validators.string(),
    Validators.minLength(3)
]);
