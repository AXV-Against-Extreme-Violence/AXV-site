describe('ReportsService', function () {
  'use strict';

  beforeEach(function () {
    MeteorStubs.install();
    mock(global, 'Reports');
  });

  afterEach(function () {
    MeteorStubs.uninstall();
  });

  describe('getReportsList', function () {
    it('should ask for the reports in primarily in reverse chronological order', function () {
      var result = {};
      spyOn(Reports, 'find').and.returnValue(result);

      expect(ReportsService.getReportsList()).toBe(result);
      expect(Reports.find.calls.argsFor(0)).toEqual([{}, {sort: {eventDate: -1, uploadDate: -1}}]);
    });
  });

  describe('getReport', function () {
    it('should ask for the report with the given id and return it', function () {
      var reportId = 1;
      var result = {_id: reportId};
      spyOn(Reports, 'findOne').and.returnValue(result);

      expect(ReportsService.getReport(reportId)).toBe(result);
      expect(Reports.findOne.calls.argsFor(0)).toEqual([reportId]);
    });
  });

  describe('reportsExist', function () {
    it('should return true when reports exist', function () {
      var cursor = {
        count: function () {
          return 1;
        }
      };
      spyOn(Reports, 'find').and.returnValue(cursor);
      expect(ReportsService.reportsExist()).toBe(true);
    });

    it('should return false when no reports exist', function () {
      var cursor = {
        count: function () {
          return 0;
        }
      };
      spyOn(Reports, 'find').and.returnValue(cursor);
      expect(ReportsService.reportsExist()).toBe(false);
    });
  });

});
