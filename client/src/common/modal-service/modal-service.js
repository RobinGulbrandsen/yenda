var mod = angular.module('yanda.common.modal-service', [
  //'ui.bootstrap'
]);

mod.factory('modalService', ['$uibModal', modalService]);

function modalService($uibModal) {
  var template = {
    backdrop: 'static',
    windowClass: "modal-center"
  };

  return {

    /*
      title: Title of the modal
      message: Message to be displayed
      okFunction: Functionality before the window closes.
        If you only want to show a message, you can skip this parameter
    */
    messageDialog: function (title, message, okFunction) {
      template.templateUrl = 'modal-service/message-dialog.tpl.html';
      template.controller = function ($scope, $uibModalInstance) {
        $scope.title = title;
        $scope.message = message;

        $scope.ok = function () {
          if(okFunction !== undefined) {
            okFunction();
          }

          $uibModalInstance.close();
        };
      };
      template.controller.$inject = ['$scope', '$uibModalInstance'];
      return $uibModal.open(template);
    },

    /*
      title: Title of the uibModal
      message: Message to be displayed
      okFunction: Functionality before the window closes with ok button.
        If you dont want functionality on the ok button, you can skip this paramter
      cancelFunction: Functionality before the window closes with cancel button.
        If you dont want functionality on the cancel button, you can skip this paramter
    */
    confirmDialog: function (title, message, okFunction, cancelFunction) {
      template.templateUrl = '../common/modal-service/confirm-dialog.tpl.html';
      template.controller = function ($scope, $uibModalInstance) {
        $scope.title = title;
        $scope.message = message;

        $scope.ok = function () {
          if(okFunction !== undefined) {
            okFunction();
          }
          $uibModalInstance.close();
        };

        $scope.cancel = function() {
          if(cancelFunction !== undefined) {
            okFunction();
          }
          $uibModalInstance.close();
        };
      };
      template.controller.$inject = ['$scope', '$uibModalInstance'];
      return $uibModal.open(template);
    },

    /*
      title: Title of the window
      formTemplate: URI to the form you wish to show to the user. The modal in
        in the form needs to be named 'formData' on scope to work
      okFunction: Functionality on the Ok button, this function needs to return
        true or false after the operations are done. True will close the window
      cancelFunction: Functionality before the window closes with cancel button.
        If you dont want functionality on the cancel button, you can skip this paramter 
    */
    formDialog: function (title, formTemplate, okFunction, cancelFunction) {
      template.templateUrl = formTemplate;
      template.controller = function ($scope, $uibModalInstance) {
        $scope.title = title;
        $scope.formData = {};

        $scope.ok = function () {
          var success = okFunction($scope.formData);
          if(success) {
            $uibModalInstance.close();
          }
        };

        $scope.cancel = function() {
          if(cancelFunction !== undefined) {
            cancelFunction();
          }
          $uibModalInstance.close();
        };
      };
      template.controller.$inject = ['$scope', '$uibModalInstance'];
      return $uibModal.open(template);
    }
  };
}