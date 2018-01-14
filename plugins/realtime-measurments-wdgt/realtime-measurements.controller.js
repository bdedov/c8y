(function () {
    'use strict';

    angular
        .module('realtime.measurements')
        .controller('measurementsController', measurementsController);

    /* @ngInject */
    function measurementsController(
        $scope,
        $routeParams,
        c8yMeasurements,
        c8yBase,
        c8yRealtime,
        c8yAlert
    ) {

        $scope.measurements = [];

        var scopeId = $scope.$id;
        var channel = '/measurements/' + $routeParams.deviceId;

        function onRealtimeNotification(evt, data) {
            c8yAlert.success(
                'New measurement value ' + data.CustomMeasurement.fahrenheit.value + ' ' + data.CustomMeasurement.fahrenheit.unit
            );
            $scope.measurements.push(data);
        };


        function onDestroy() {
            c8yRealtime.stop(scopeId, channel);
        }

        c8yRealtime.addListener(scopeId, channel, c8yRealtime.realtimeActions().CREATE, onRealtimeNotification);
        c8yRealtime.start(scopeId, channel);

        $scope.$on('$destroy', onDestroy);

        function init() {

            c8yMeasurements.list(
                _.assign(c8yBase.timeOrderFilter(), {
                    type: 'CustomMeasurement',
                    source: $routeParams.deviceId
                })
            ).then(function (measurements) {
                $scope.measurements = measurements;
                console.log(measurements);
            });

        }

        init();
    }
}());