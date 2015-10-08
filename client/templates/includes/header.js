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