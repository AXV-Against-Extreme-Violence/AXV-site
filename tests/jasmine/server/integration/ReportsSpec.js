describe('Collection: Reports', function () {
  it('has a reports object', function () {
    // A Reports object is verifed to be defined
    expect(Reports).toEqual(jasmine.anything());
  });

  // A model Report object should be defined
  describe('Report', function () {

    it('has a report object', function () {
      // A Report object is verified to be defined
      expect(Report).toEqual(jasmine.anything());
    });

    it('has a kind  field' function (){
      // A report's definition for the kind field (referring to it's id) exists
      expect(Report.kind).toEqual(jasmine.anything());
    });


    it('has a title field', function (){
      // A Report's definition for the title field exists
      expect(Report.title).toEqual(jasmine.anything());
    });

    it('has an upload date field', function (){
      // A Report's definition for the date field exists
      expect(Report.date).toEqual(jasmine.anything());
    });

    it('has an event date field', function (){
      // A Report's definition for the date field exists
      expect(Report.eventDate).toEqual(jasmine.anything());
    });

    it('has a explanation field', function (){
      // A Report's definition for the description field exists
      expect(Report.explanation).toEqual(jasmine.anything());
    });

    it('has a user reference field', function (){
      // A Report's definition for the userID field exists
      expect(Report.userID).toEqual(jasmine.anything());
    });
    describe('Evidence', function (){
      it('has an evidence dictionary field', function (){
        // An evidence dictionary exists
        expect(Report.evidence).toEqual(jasmine.anything());
      });

      it('has a documents array field', function (){
        // A documents array exists
        expect(Report.evidence.documents).toEqual(jasmine.anything());
      });

      it('has a links array field', function (){
        // A links array exists
        expect(Report.evidence.links).toEqual(jasmine.anything());
      });

      it('has a videos array field', function (){
        // A videos array exists
        expect(Report.evidence.videos).toEqual(jasmine.anything());
      });

      it('has a photos array field', function (){
        // A photos array exists
        expect(Report.evidence.photos).toEqual(jasmine.anything());
      });
    });

    it('has an aggressor array field', function (){
      // An aggressors array exists (dictionary: {aggressorID, explanation})
      expect(Report.aggressors).toEqual(jasmine.anything());
    });

  });


  it('can add new reports', function () {
    // A report is created
    var aReport = new Report();
    var id      = aReport._id;
    // The report is saved
    aReport.save();
    // We check that at least one Report with that id was added
    expect(Reports.find(id).count()).toBeGreaterThan(0);
    // We verify that the added Report is equal to the one saved
    expect(Reports.findOne(id)).toEqual(aReport);
  });

  it('can delete a report', function () {
    // A report is created
    var aReport = new Report();
    var id      = aReport._id;
    // The report is saved
    aReport.save();
    // We check that at least one Report with that id was added
    expect(Reports.find(id).count()).toBeGreaterThan(0);
    // We verify that the added Report is equal to the one saved
    expect(Report.findOne(id)).toEqual(aReport);
    // The Report is removed
    Reports.remove({id: id});
    // We verify that the report is gone
    expect(Report.findOne(id).count()).toEqual(0);
  });

});
