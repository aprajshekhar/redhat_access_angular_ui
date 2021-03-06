'use strict';
/*jshint camelcase: false */
angular.module('RedhatAccess.cases')
  .controller('AttachmentsSection', [
    '$scope',
    'AttachmentsService',
    'CaseService',
    'TreeViewSelectorUtils',
    'EDIT_CASE_CONFIG',
    function (
      $scope,
      AttachmentsService,
      CaseService,
      TreeViewSelectorUtils,
      EDIT_CASE_CONFIG) {

      $scope.rhaDisabled = !EDIT_CASE_CONFIG.showAttachments;
      $scope.showServerSideAttachments = EDIT_CASE_CONFIG.showServerSideAttachments;
      $scope.AttachmentsService = AttachmentsService;
      $scope.CaseService = CaseService;
      $scope.TreeViewSelectorUtils = TreeViewSelectorUtils;

      $scope.doUpdate = function () {
        $scope.updatingAttachments = true;
        AttachmentsService.updateAttachments(CaseService.
        case .case_number).then(
          function () {
            $scope.updatingAttachments = false;
          },
          function (error) {
            $scope.updatingAttachments = false;
            console.log('Error posting attachment : ' + error);
          });
      };
    }
  ]);
