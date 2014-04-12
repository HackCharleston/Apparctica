var app = angular.module('MobileAngularUiExamples', [
    "ngRoute",
    "mobile-angular-ui",
    "mobile-angular-ui.touch",
    "mobile-angular-ui.scrollable",
    'google-maps'
]);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: "home.html"
    });
    $routeProvider.when('/markets', {
        templateUrl: "scroll.html"
    });
    $routeProvider.when('/market/:id', {
        templateUrl: "market.html",
        controller: 'marketController'
    });
    $routeProvider.when('/toggle', {
        templateUrl: "toggle.html"
    });
    $routeProvider.when('/tabs', {
        templateUrl: "tabs.html"
    });
    $routeProvider.when('/accordion', {
        templateUrl: "accordion.html"
    });
    $routeProvider.when('/education', {
        templateUrl: "overlay.html"
    });
    $routeProvider.when('/forms', {
        templateUrl: "forms.html"
    });
    $routeProvider.when('/carousel', {
        templateUrl: "carousel.html"
    });
    $routeProvider.when('/map', {
        templateUrl: "map.html"
    });
    $routeProvider.when('/about', {
        templateUrl: "about.html"
    });
});

app.service('analytics', [
    '$rootScope', '$window', '$location',
    function($rootScope, $window, $location) {
        var send = function(evt, data) {
            ga('send', evt, data);
        }
    }
]);



app.directive("carouselExampleItem", function($rootScope, $swipe) {
    return function(scope, element, attrs) {
        var startX = null;
        var startY = null;
        var endAction = "cancel";
        var carouselId = element.parent().parent().attr("id");

        var translateAndRotate = function(x, y, z, deg) {
            element[0].style["-webkit-transform"] = "translate3d(" + x + "px," + y + "px," + z + "px) rotate(" + deg + "deg)";
            element[0].style["-moz-transform"] = "translate3d(" + x + "px," + y + "px," + z + "px) rotate(" + deg + "deg)";
            element[0].style["-ms-transform"] = "translate3d(" + x + "px," + y + "px," + z + "px) rotate(" + deg + "deg)";
            element[0].style["-o-transform"] = "translate3d(" + x + "px," + y + "px," + z + "px) rotate(" + deg + "deg)";
            element[0].style["transform"] = "translate3d(" + x + "px," + y + "px," + z + "px) rotate(" + deg + "deg)";
        }

        $swipe.bind(element, {
            start: function(coords)  {
                startX = coords.x;
                startY = coords.y;
            },

            cancel: function(e)  {
                translateAndRotate(0, 0, 0, 0);
                e.stopPropagation();
            },

            end: function(coords, e)  {
                if (endAction == "prev") {
                    $rootScope.carouselPrev(carouselId);
                } else if (endAction == "next") {
                    $rootScope.carouselNext(carouselId);
                }
                translateAndRotate(0, 0, 0, 0);
                e.stopPropagation();
            },

            move: function(coords)  {
                if (startX != null) {
                    var deltaX = coords.x - startX;
                    var deltaXRatio = deltaX / element[0].clientWidth;
                    if (deltaXRatio > 0.3) {
                        endAction = "next";
                    } else if (deltaXRatio < -0.3) {
                        endAction = "prev";
                    }
                    translateAndRotate(deltaXRatio * 200, 0, 0, deltaXRatio * 15);
                }
            }
        });
    }
});


app.controller('marketController', function($rootScope, $scope, analytics, $http, $routeParams) {
    $scope.items = [];
    $scope.market_name = $routeParams.market_name;
    $http({
        method: 'GET',
        url: 'http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=' + $routeParams.id,
        headers: {}
    })
        .success(function(data, status) {
            $scope.items = data;
        })
        .error(function(data, status) {
            alert("Error");
        });
});

app.controller('MainController', function($rootScope, $scope, analytics, $http) {

    $rootScope.$on("$routeChangeStart", function() {
        $rootScope.loading = true;
    });

    $rootScope.$on("$routeChangeSuccess", function() {
        $rootScope.loading = false;
    });

    var scrollItems = [];

    for (var i = 1; i <= 100; i++) {
        scrollItems.push("Item " + i);
    }

    $scope.scrollItems = scrollItems;

    $scope.map = {
        center: {
            latitude: 32.7833,
            longitude: -79.9333
        },
        zoom: 8,
        locations: [{
            latitude: 32.681955,
            longitude: -80.027751
        }]
    };

    $scope.items = [];

    $http({
        method: 'GET',
        url: 'http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=29492',
        headers: {}
    })
        .success(function(data, status) {
            $scope.items = data;
        })
        .error(function(data, status) {
            alert("Error");
        });
    // $scope.locations = [];
    // $http({
    //     method: 'GET',
    //     url: 'https://api.parse.com/1/classes/location',
    //     headers: {
    //         'X-Parse-Application-Id': 'sjiKwkVavpSin6QNBMN10tARAl54ezhGMcD8L3xI',
    //         'X-Parse-REST-API-Key': 'y4xm3BZWorsphZisMGIailK5oV4idbAyaXGl1aau'
    //     }
    // })
    //     .success(function(data, status) {
    //         $scope.locations = data;
    //     })
    //     .error(function(data, status) {
    //         alert("Error");
    //     });


    $scope.userAgent = navigator.userAgent;
    $scope.chatUsers = [{
        name: "Carlos  Flowers",
        online: true
    }, {
        name: "Byron Taylor",
        online: true
    }, {
        name: "Jana  Terry",
        online: true
    }, {
        name: "Darryl  Stone",
        online: true
    }, {
        name: "Fannie  Carlson",
        online: true
    }, {
        name: "Holly Nguyen",
        online: true
    }, {
        name: "Bill  Chavez",
        online: true
    }, {
        name: "Veronica  Maxwell",
        online: true
    }, {
        name: "Jessica Webster",
        online: true
    }, {
        name: "Jackie  Barton",
        online: true
    }, {
        name: "Crystal Drake",
        online: false
    }, {
        name: "Milton  Dean",
        online: false
    }, {
        name: "Joann Johnston",
        online: false
    }, {
        name: "Cora  Vaughn",
        online: false
    }, {
        name: "Nina  Briggs",
        online: false
    }, {
        name: "Casey Turner",
        online: false
    }, {
        name: "Jimmie  Wilson",
        online: false
    }, {
        name: "Nathaniel Steele",
        online: false
    }, {
        name: "Aubrey  Cole",
        online: false
    }, {
        name: "Donnie  Summers",
        online: false
    }, {
        name: "Kate  Myers",
        online: false
    }, {
        name: "Priscilla Hawkins",
        online: false
    }, {
        name: "Joe Barker",
        online: false
    }, {
        name: "Lee Norman",
        online: false
    }, {
        name: "Ebony Rice",
        online: false
    }]

});