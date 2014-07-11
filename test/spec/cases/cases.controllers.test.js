'use strict';

describe('Case Controllers', function() {

	var mockScope;
	var attachmentsService;
	var securityService;
	var caseService;
	var treeViewSelectorUtils;
                      var compile;
	beforeEach(angular.mock.module('RedhatAccess.cases'));
	beforeEach(function () {
		inject(function ($injector, $rootScope, $compile) {
			attachmentsService = $injector.get('AttachmentsService');
			securityService = $injector.get('securityService');
			mockScope = $rootScope.$new();
                                                                   compile = $compile;
		});
	});

	it('should have no file chosen with no description', inject(function ($controller) {

		$controller('AttachLocalFile', {
			$scope: mockScope,
			AttachmentsService: attachmentsService,
			securityService: securityService
		});

		expect(mockScope.NO_FILE_CHOSEN).toEqual('No file chosen');
		expect(mockScope.fileDescription).toEqual('');

	}));

	it('should clear filename and file description', inject(function ($controller) {
		$controller('AttachLocalFile', {
			$scope: mockScope,
			AttachmentsService: attachmentsService,
			securityService: securityService
		});

		expect(mockScope.clearSelectedFile).toBeDefined();
                                            mockScope.clearSelectedFile();
		expect(mockScope.fileName).toEqual('No file chosen');
		expect(mockScope.fileDescription).toEqual('');
	}));

	it('should get selected file', inject(function ($controller) {
                                            var element = angular.element('<input id="fileUploader" type="file" value="upload"/>');
                                             compile(element)(mockScope);
                                             mockScope.$digest();
                                            var eventListener = jasmine.createSpy();

                                            spyOn(window, "FileReader").andReturn({

                                                        addEventListener: eventListener
                                            });
		$controller('AttachLocalFile', {
			$scope: mockScope,
			AttachmentsService: attachmentsService,
			securityService: securityService
		});
                                            
                                             mockScope.fileObj = "test data";
                                            mockScope.fileDescription = "test desc";
                                            mockScope.fileName = "test.gz";
                                            mockScope.fileSize = 1000;
		expect(mockScope.selectFile).toBeDefined();
                                            mockScope.selectFile();
                                            
	}));

	it('should add file to the list of attachments', inject(function ($controller) {
		debugger;
		$controller('AttachLocalFile', {
			$scope: mockScope,
			AttachmentsService: attachmentsService,
			securityService: securityService
		});
		
                                            mockScope.fileObj = "test data";
                                            mockScope.fileDescription = "test desc";
                                            mockScope.fileName = "test.gz";
                                            mockScope.fileSize = 1000;
                                       
		expect(mockScope.addFile).toBeDefined();
                                            mockScope.addFile();
		expect(attachmentsService.updatedAttachments.length).toEqual(1);
	}));
	
});
