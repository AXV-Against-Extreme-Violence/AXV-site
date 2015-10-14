Template.header.events({
   'click #add': function (){
       var report = Session.get('report');
       if (report && report != undefined && report != null)
       {
           if (Reports.findOne(report._id) != undefined){
               Session.set('report', undefined);
           }
       }
   }
});

$(document).on('click','.navbar-collapse.in',function(e) {

    if( $(e.target).is('a') && ( $(e.target).attr('class') != 'dropdown-toggle' ) ) {
        $(this).collapse('hide');
    }

});