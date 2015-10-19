var requiredStringWithLengthValidator = Validators.and([
    Validators.required(),
    Validators.string(),
    Validators.minLength(3, 'This string is too short')
]);

cubanCities = ["Havana",
    "Santiago de Cuba",
    "Camagüey",
    "Holguín",
    "Guantánamo",
    "Santa Clara",
    "Las Tunas",
    "Bayamo",
    "Cienfuegos",
    "Pinar del Río",
    "Matanzas",
    "Ciego de Ávila",
    "Sancti Spíritus",
    "Manzanillo",
    "Cárdenas",
    "Palma Soriano",
    "Moa",
    "Florida",
    "Morón",
    "Nueva Gerona",
    "Contramaestre",
    "Colón",
    "Artemisa",
    "Güines",
    "Sagua la Grande",
    "Trinidad",
    "Placetas",
    "Baracoa",
    "Nuevitas",
    "Banes",
    "San Luis",
    "San José de las Lajas",
    "Caibarién",
    "San Antonio de los Baños",
    "Puerto Padre",
    "Jagüey Grande",
    "Cabaiguán",
    "Mayarí",
    "Vertientes",
    "Varadero",
    "Consolación del Sur",
    "Amancio",
    "San Cristóbal",
    "Güira de Melena",
    "San Germán",
    "Cumanayagua",
    "Sagua de Tánamo",
    "Guanajay",
    "Jatibonico",
    "Manicaragua",
    "Camajuaní",
    "Colombia",
    "Sandino",
    "Jovellanos",
    "Niquero",
    "La Maya",
    "Bauta",
    "Jiguaní",
    "Guisa",
    "Nicaro-Levisa"];
cubanCityValidator = Validators.choice(cubanCities);


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

Reports.initEasySearch(['location', 'kind']);

Report  = Astro.Class({
    name        : 'Report',
    collection  : Reports,
    fields      : {
        location    : 'string',
        date        : 'date',
        eventDate   : {
            type: 'date',
            default: function ()
            {
                return new moment();
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
        location    : cubanCityValidator,
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
    },
    update: function(userId, doc) {
        // only allow posting if you are logged in
        return !! userId;
    }
});