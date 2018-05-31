'use strict';

// Cars controller
angular.module('cars').controller('CarsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Cars',
  function ($scope, $stateParams, $location, Authentication, Cars) {
    $scope.authentication = Authentication;

    // Create new Cars
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'carForm');

        return false;
      }

      // Create new Car object
      var car = new Cars({
        brand: this.brand,
        model: this.model
      });

      // Redirect after save
      car.$save(function (response) {
        $location.path('cars/' + response._id);

        // Clear form fields
        $scope.brand = '';
        $scope.model = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Car
    $scope.remove = function (car) {
      if (car) {
        car.$remove();

        for (var i in $scope.cars) {
          if ($scope.cars[i] === car) {
            $scope.cars.splice(i, 1);
          }
        }
      } else {
        $scope.car.$remove(function () {
          $location.path('cars');
        });
      }
    };

    // Update existing Car
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'carForm');

        return false;
      }

      var car = $scope.car;

      car.$update(function () {
        $location.path('cars/' + car._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Cars
    $scope.find = function () {
      $scope.cars = Cars.query();
    };

    // Find existing Car
    $scope.findOne = function () {
      $scope.car = Cars.get({
        carId: $stateParams.carId
      });
    };
  }
]);
