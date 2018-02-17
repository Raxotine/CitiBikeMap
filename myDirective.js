myApp.directive("myMaps", function(){

    return{
        restrict:'E', 
        template:'<div></div>', 
        replace:true, 
        link: function(scope, element, attributes){

            /*Chapter Index:
            1.Declare variables
            2.Get data
            3.Build map*/

            //Declare Variables
            var CitiBikeData = [];
            var MapLatitudes = [];
            var MapLongitudes = [];

            //Get Citi Bike data
            var promise = $.getJSON("https://feeds.citibikenyc.com/stations/stations.json", function(json) {
            CitiBikeData = json.stationBeanList;
            });


                //Build Map with markers
                promise.done(function() {

                for (var x in CitiBikeData) {
                    MapLatitudes.push(CitiBikeData[x].latitude);
                    MapLongitudes.push(CitiBikeData[x].longitude);
                }

                var latitudeLongitude = new google.maps.LatLng(40.68, -73.95); 
                var mapOptions = {
                    center: latitudeLongitude, 
                    zoom: 11, 
                    
                    mapTypeId: google.maps.MapTypeId.ROADMAP 
                    };

                var map = new google.maps.Map(document.getElementById(attributes.id),
                              mapOptions);

                var marker, i;
                angular.forEach(MapLatitudes, function(value, key) {
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(MapLatitudes[key], MapLongitudes[key]),
                        map: map,
                    });
                });
                marker.setMap(map); 
                });

        }   
    };
});
