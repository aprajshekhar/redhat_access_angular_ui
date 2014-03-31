'use strict';

angular.module('RedhatAccessCases')
.controller('New', [
  '$scope',
  '$state',
  '$q',
  'attachments',
  'productsJSON',
  'severityJSON',
  'groupsJSON',
  function ($scope, $state, $q, attachments, productsJSON, severityJSON, groupsJSON) {
    $scope.products = productsJSON;
    $scope.versions = [];
    $scope.versionDisabled = true;
    $scope.versionLoading = false;
    $scope.incomplete = true;
    $scope.severities = severityJSON;
    $scope.severity = severityJSON[severityJSON.length - 1];
    $scope.groups = groupsJSON;
    $scope.submitProgress = 0;
    $scope.attachments = attachments;

    $scope.validateForm = function() {
      if ($scope.product == null || $scope.product == "" ||
          $scope.version == null || $scope.version == "" ||
          $scope.summary == null || $scope.summary == "" ||
          $scope.description == null || $scope.description == "") {
        $scope.incomplete = true;
      } else {
        $scope.incomplete = false;
      }
    };

    /**
     * Retrieve product's versions from strata
     *
     * @param product
     */
    $scope.getProductVersions = function(product) {
      $scope.version = "";
      $scope.versionDisabled = true;
      $scope.versionLoading = true;

      strata.products.versions(
          product.code,
          function(response){
            $scope.versions = response;
            $scope.validateForm();
            $scope.versionDisabled = false;
            $scope.versionLoading = false;
            $scope.$apply();
          },
          function(error){
            console.log(error);
          });
    };

    /**
     * Go to a page in the wizard
     *
     * @param page
     */
    $scope.setPage = function(page) {
      $scope.isPage1 = page == 1 ? true : false;
      $scope.isPage2 = page == 2 ? true : false;
    };

    /**
     * Navigate forward in the wizard
     */
    $scope.doNext = function() {
      $scope.setPage(2);
    };

    /**
     * Navigate back in the wizard
     */
    $scope.doPrevious = function() {
      $scope.setPage(1);
    };

    /**
     * Return promise for a single attachment
     */
    var postAttachment = function(caseNumber, attachment, progressIncrement) {

      var singleAttachmentSuccess = function(response) {
        $scope.submitProgress = $scope.submitProgress + progressIncrement;
      };

      var deferred = $q.defer();
      deferred.promise.then(singleAttachmentSuccess);

      strata.cases.attachments.post(
          attachment,
          caseNumber,
          function(response) {
            deferred.resolve(response);
          },
          function(error, error2, error3, error4) {
            console.log(error);
            deferred.reject(error);
          }
      );

      return deferred.promise;
    };

    /**
     * Create the case with attachments
     */
    $scope.doSubmit = function() {

      $scope.submitProgress = 10;

      var caseJSON = {
        'product': $scope.product.code,
        'version': $scope.version,
        'summary': $scope.summary,
        'description': $scope.description,
        'severity': $scope.severity.name,
        'folderNumber': $scope.caseGroup == null ? '' : $scope.caseGroup.number
      };

      strata.cases.post(
          caseJSON,
          function(caseNumber) {
            if ($scope.attachments.length > 0) {
              var progressIncrement = 90 / $scope.attachments.length;

              var promises = [];
              for (var i in $scope.attachments) {
                promises.push(
                    postAttachment(
                        caseNumber,
                        $scope.attachments[i].file,
                        progressIncrement));
              }

              var parentPromise = $q.all(promises);
              parentPromise.then(
                function() {
                  $scope.submitProgress = '100';
                  $state.go('case', {id: caseNumber});
                },
                function(error) {
                  console.log("Problem creating attachment: " + error);
                }
              );
            } else {
              $scope.submitProgress = '100';
              $state.go('case', {id: caseNumber});
            }
          },
          function(error) {
            console.log(error);
          }
      );

    };

    $scope.setPage(1);
  }]);
