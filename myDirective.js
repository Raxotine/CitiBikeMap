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
	        var datas = [];
	        var mlat = [];
	        var mlng = [];

            //Get Citi Bike data
	       	var promise = $.getJSON("https://feeds.citibikenyc.com/stations/stations.json", function(json) {
			datas = json.stationBeanList;
			});


                //Build Map with markers
    	       	promise.done(function() {

    	        for (var x in datas) {
       				mlat.push(datas[x].latitude);
       				mlng.push(datas[x].longitude);
    			}

                var myLatLng = new google.maps.LatLng(40.68, -73.95); 
                var mapOptions = {
                    center: myLatLng, 
                    zoom: 11, 
                    
                    mapTypeId: google.maps.MapTypeId.ROADMAP 
                    };

                var map = new google.maps.Map(document.getElementById(attributes.id),
                              mapOptions);

                var marker, i;
                for (i = 0; i < mlat.length; i++) {
    	            marker = new google.maps.Marker({

    	                position: new google.maps.LatLng(mlat[i], mlng[i]),
    	                map: map,
    	            });
            	}
                marker.setMap(map); 
    	       	});

        }   
    };
});
