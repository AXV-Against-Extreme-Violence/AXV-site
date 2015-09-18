describe('Collection: Agressors', function () {
  it('has an Agressors object', function () {
    // A Agressors object is verifed to be defined
    expect(Agressors).toEqual(jasmine.anything());
  });

  // A model agressor object should be defined
  describe('Agressor', function () {

    it('has an Agressor object', function () {
      // A Agressor object is verified to be defined
      expect(Agressor).toEqual(jasmine.anything());
    });

    it('has a name field', function (){
      // A Agressor's definition for the name field exists
      expect(Agressor.name).toEqual(jasmine.anything());
    });

    it('has a lastName field', function (){
      // A Agressor's definition for the lastName field exists
      expect(Agressor.lastName).toEqual(jasmine.anything());
    });


    it('has an aliases array field', function (){
      // A Agressor's definition for the description field exists
      expect(Agressor.aliases).toEqual(jasmine.anything());
    });

  });


  it('can add new agressors', function () {
    // A agressor is created
    var anAgressor = new Agressor();
    var id      = anAgressor._id;
    // The agressor is saved
    anAgressor.save();
    // We check that at least one agressor with that id was added
    expect(Agressors.find(id).count()).toBeGreaterThan(0);
    // We verify that the added agressor is equal to the one saved
    expect(Agressors.findOne(id)).toEqual(anAgressor);
  });

  it('can delete an agressor', function () {
    // A agressor is created
    var anAgressor = new Agressor();
    var id      = anAgressor._id;
    // The agressor is saved
    anAgressor.save();
    // We check that at least one agressor with that id was added
    expect(Agressors.find(id).count()).toBeGreaterThan(0);
    // We verify that the added agressor is equal to the one saved
    expect(Agressors.findOne(id)).toEqual(anAgressor);
    // The agressor is removed
    Agressors.remove({id: id});
    // We verify that the agressor is gone
    expect(Agressors.findOne(id).count()).toEqual(0);
  });

});
