'use strict';

describe('Case Controllers', function() {

    var mockScope;
    var attachmentsService;
    var securityService;
    var caseService;
    var treeViewSelectorUtils;
    var compile;
    var document;
    var cont
    beforeEach(angular.mock.module('RedhatAccess.cases'));
    beforeEach(function() {
        inject(function($injector, $rootScope, $compile, $document) {
            attachmentsService = $injector.get('AttachmentsService');
            securityService = $injector.get('securityService');
            mockScope = $rootScope.$new();
            compile = $compile;
//                                                                   document = $document;
//                                                                    var element = angular.element('<input id="fileUploader" type="file" value="upload"/>');
//                                            var e = $compile('<input id="fileUploader" type="file" value="upload"/>')(mockScope);
//                                             mockScope.$digest();
//                                             
//                                             console.log('test'+e.html());
        });
    });

    it('should have no file chosen with no description', inject(function($controller) {

        $controller('AttachLocalFile', {
            $scope: mockScope,
            AttachmentsService: attachmentsService,
            securityService: securityService
        });

        expect(mockScope.NO_FILE_CHOSEN).toEqual('No file chosen');
        expect(mockScope.fileDescription).toEqual('');

    }));

    it('should clear filename and file description', inject(function($controller) {
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

  /*  it('should get selected file', inject(function($controller) {
        var element = angular.element('<div ><button  ng-click="getFile()" ng-disabled="disabled" class="btn">Attach local file</button><div ><input id="fileUploader" type="file" value="/tmp/test.txt" rha-on-change="selectFile" ng-model="file" ng-disabled="enabled"/></div></div><div ><div >{{fileName}}</div></div></div><div ><div ><span></span></div></div><div ><div class="col-xs-12"><input  placeholder="File description" ng-model="fileDescription" ng-disabled="disabled" class="form-control"/></div></div><div class="row rha-create-field"><div class="col-xs-12"><button ng-disabled="fileName == NO_FILE_CHOSEN || disabled" style="float: right;" ng-click="addFile(fileUploaderForm)" class="btn">Add</button></div>');
        var e = compile(element)(mockScope);
        $("body").append(e);
        mockScope.$digest();
       
        debugger;
        console.log('test' + e.html());
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

    }));*/

 it('should add the selected file', inject(function($controller) {
        /*var element = angular.element('<div ><button  ng-click="getFile()" ng-disabled="disabled" class="btn">Attach local file</button><div ><input id="fileUploader" type="file" value="/tmp/test.txt" rha-on-change="selectFile" ng-model="file" ng-disabled="enabled"/></div></div><div ><div >{{fileName}}</div></div></div><div ><div ><span></span></div></div><div ><div class="col-xs-12"><input  placeholder="File description" ng-model="fileDescription" ng-disabled="disabled" class="form-control"/></div></div><div class="row rha-create-field"><div class="col-xs-12"><button ng-disabled="fileName == NO_FILE_CHOSEN || disabled" style="float: right;" ng-click="addFile(fileUploaderForm)" class="btn">Add</button></div>');
        var e = compile(element)(mockScope);
        $("body").append(e);
        mockScope.$digest();
       
        debugger;
        console.log('test' + e.html());*/
        $controller('AttachLocalFile', {
            $scope: mockScope,
            AttachmentsService: attachmentsService,
            securityService: securityService
        });
        var fileObj ={
            size:12000,
            name:"test.tar"
        };
       var files = new Array();
        files.push(fileObj);
       /*
        mockScope.fileObj = "test data";
        mockScope.fileDescription = "test desc";
        mockScope.fileName = "test.gz";
        mockScope.fileSize = 1000;*/
        expect(mockScope.selectFile).toBeDefined();
        debugger;
        mockScope.selectFile(files);

    }));

    it('should add file to the list of attachments', inject(function($controller) {
        debugger;
        $controller('AttachLocalFile', {
            $scope: mockScope,
            AttachmentsService: attachmentsService,
            securityService: securityService
        });

        mockScope.fileDescription = "test desc";        mockScope.fileObj = "test data";

        mockScope.fileName = "test.gz";
        mockScope.fileSize = 1000;

        expect(mockScope.addFile).toBeDefined();
        mockScope.addFile();
        expect(attachmentsService.updatedAttachments.length).toEqual(1);
    }));

});
