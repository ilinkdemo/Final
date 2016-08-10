/*jslint browser: true*/
/*global $, ticketApp,FileReader*/
ticketApp.directive('onReadFile', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        scope: false,
        link: function (scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);

            element.on('change', function (onChangeEvent) {
                var reader = new FileReader(),
                    fileName = onChangeEvent.currentTarget.value;

                reader.onload = function (onLoadEvent) {

                    scope.$apply(function () {
                        fn(scope, { $fileContent: onLoadEvent.target.result, $fileName: fileName });
                    });
                };

                reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
            });
        }
    };
}]);

ticketApp.directive('customOnChange', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var onChangeHandler = scope.$eval(attrs.customOnChange);
            element.bind('change', onChangeHandler);
        }
    };
});