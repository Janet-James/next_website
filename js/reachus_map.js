/***
 * This File Js is used for Get current Location of Coordinates 
 * Result of this file is Highlight the Nearest Location
 * 
 **/

var lat = 0,
	lng = 0; //Global Variable for Lat , Long
try {

	//Get Distance From Two Point Coordinate
	function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
		var R = 6371; // Radius of the earth in km
		var dLat = deg2rad(lat2 - lat1); // deg2rad below
		var dLon = deg2rad(lon2 - lon1);
		var a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
			Math.sin(dLon / 2) * Math.sin(dLon / 2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c; // Distance in km
		return d;
	}
	//Convrt Degree to Radian
	function deg2rad(deg) {
		return deg * (Math.PI / 180)
	}


	$.ajax({
		url: 'https://extreme-ip-lookup.com/json/',
		type: 'GET',
		async: false,
	}).done(function (json) {
        //USA,Belgium,Coimbatore,PortMoserby,Australia,unitedkingdom,srilanka
var array_lat = ['37.512844,-121.913277', '50.862162,4.6696494',
                '11.032179,77.021182', '-9.4246403,147.1839909', '-27.4679633,153.0292409', '51.59727,-0.336702', '6.907813,79.877089'
            ];
 
var array_class= ['usa-add','bel-add','ind-add','png-add','aus-add', 'uk-add', 'sl-add'];
        
var address_array = ['usa_address', 'belgium_address', 'coimbatore_address', 'png_address', 'australia_address', 'unitedkingdom_address', 'srilanka_address'];
            
		if (json.country || json.city) {
			console.log("Country", json.country);
			console.log("City", json);
			var lat = json.lat;
			var lng = json.lon;
			var Country = json.country;
            var City = json.city;
            
            $('#Country').html('').html(Country);
            $('#City').html('').html(City);
            $('#Latitude').html('').html(lat);
            $('#Longitude').html('').html(lng);

			//$('#ipLookup').html(Country);
			var distance_list = []
			for (var i = 0; i < array_lat.length; i++) {
				var lat_2 = parseFloat(array_lat[i].split(',')[0]);
				var lng_2 = parseFloat(array_lat[i].split(',')[1]);
				var distance_data = getDistanceFromLatLonInKm(lat, lng, lat_2, lng_2);
				distance_list.push(distance_data);
			}
			var index = 0;
			var value = distance_list[0];
			for (var i = 1; i < distance_list.length; i++) {
				if (distance_list[i] < value) {
					value = distance_list[i];
					index = i;
				}
			}
            
           var nearest_address = $('#'+address_array[index]).html();
            $('#nearest_address').html('').html(nearest_address);

			console.log(distance_list)
            $('.address_highlight').removeClass('active');
            $('.'+array_class[index]).addClass('active');
			//reachus-bg.jpg
			$('.nxt-map-bg').css('background-image', ' ')
			$('.nxt-map-bg').css('background-image', "url(images/" + index + "_map.png)")


			// $('#ipLookup').html('Location of '+json.query+': '+json.city+', '+json.country+'');
		} else {

			$.ajax({
				url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyA-HtrBDdXoAfETrqqLhRGrHUpik0ZvrFo',
				type: 'POST',
				async: false,
			}).done(function (json_data) {
				console.log(json_data)
				lat = json_data.location.lat
				lng = json_data.location.lng
			});


			$.ajax({
				url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=AIzaSyCTXdFqzv78uIM65f4FiWAB5y6qpUns8S0&sensor=false',
				type: 'GET',
				async: false,
			}).done(function (json_data) {
				//console.log(json_data.results[json_data.results.length-1]['formatted_address'])
				//$('#country').html(json_data.results[json_data.results.length-1]['formatted_address'])
				//$('#google_api').html('').html(JSON.stringify(json_data))
                
                $('#Country').html('').html(json_data.results[json_data.results.length-1]['formatted_address']);
            //$('#City').html('').html(City);
            $('#Latitude').html('').html(lat);
            $('#Longitude').html('').html(lng);

				var lat_2 = json_data
				var distance_list = []
				for (var i = 0; i < array_lat.length; i++) {
					var lat_2 = parseFloat(array_lat[i].split(',')[0]);
					var lng_2 = parseFloat(array_lat[i].split(',')[1]);
					var distance_data = getDistanceFromLatLonInKm(lat, lng, lat_2, lng_2);
					distance_list.push(distance_data);
				}
				var index = 0;
				var value = distance_list[0];
				for (var i = 1; i < distance_list.length; i++) {
					if (distance_list[i] < value) {
						value = distance_list[i];
						index = i;
					}
				}
				//reachus-bg.jpg
				$('.nxt-map-bg').css('background-image', ' ')
				$('.nxt-map-bg').css('background-image', "url(images/" + index + "_map.png)")
			});
		}

	});


} catch (e) {
	console.log('Map Error', e)
	$('.nxt-map-bg').css('background-image', "url(../images/reachus-bg.jpg)")
}