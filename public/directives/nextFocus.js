angular.module('SymText')
    .directive("nextFocus", nextFocus);

/** Usage:
 <input next-focus id="field1">
 <input next-focus id="field2">
 <input id="field3">
 Upon pressing ENTER key the directive will switch focus to
 the next field id e.g field2
 The last field should not have next-focus directive to avoid
 focusing on non-existing element.

 **/

function nextFocus() {
    var directive = {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            elem.bind('keydown', function(e) {
                var partsId = attrs.id.match(/text(\d+)/);
                var currentId = parseInt(partsId[1]);

                var code = e.keyCode || e.which;
                if (code === 32) {
                    e.preventDefault();
                    document.querySelector('#text' + (currentId + 1)).focus();
                }
            });
        }
    };
    return directive;

}
