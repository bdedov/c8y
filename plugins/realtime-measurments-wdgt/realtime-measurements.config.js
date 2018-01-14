(function () {
    'use strict';

    angular
        .module('realtime.measurements')
        .config(configure);

    /* @ngInject */
    function configure(
        c8yComponentsProvider,
        gettext
    ) {
        c8yComponentsProvider.add({ // adds a menu item to the widget menu list with ...
            name: 'realtime-measurements-wdgt', // ... the identifier which has to be unique among the widgets in the application
            nameDisplay: gettext('Realtime Measurments'), // ... the displayed name
            description: gettext('Displays a list of the values for a given measurement given a measurement type.'), // ... a description
            templateUrl: ':::PLUGIN_PATH:::/views/realtime-measurements.main.html', // ... displaying *"iconmap.main.html"* when added to the dashboard
            options: { noDeviceTarget: true }
        });
    }
}());