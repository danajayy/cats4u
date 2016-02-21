function requestRide(){
	
	var SANDBOX_TOKEN= getToken();
	
	function getToken(){
		console.log("Searching for token...");
		
		console.log("client id = "+CLIENT_ID);
		console.log("client id = "+CLIENT_SECRET);
		var token;
		
		var clientData = {
			grant_type: "client_credentials",
			scope: "public offline rides.request rides.read"
		};
		
		$.ajax({
			url: 'https://api.lyft.com/oauth/token',
			type: 'post',
			data: JSON.stringify(clientData),
			headers: {
				"Authorization": "Basic " + btoa(CLIENT_ID + ":SANDBOX-" + CLIENT_SECRET),
				"Content-Type": "application/json;charset=UTF-8"
			},
			dataType: 'json',
			contentType: "application/json",
			success: function(response){
				
				r = response;
				
				useToken(response.access_token);
				

			}
		});
	};

	var data={
		origin:{lat: 39.9532,
			lng:  -75.1941	
		},
		ride_type:"lyft",
	};

	function useToken(token){
		$.ajax({
			url: 'https://api.lyft.com/v1/rides',
			type: 'post',
			data: JSON.stringify(data),
			headers: {
				"Authorization": "Bearer "+token,
				"Content-Type": "application/json"
			},
			dataType: 'json',
			contentType: "application/json",
			success: function(response){
				alert("Your ride is on the way!");
				console.log("obtained token");
				console.log(response);
				getDetails(response, token);
			}
		});
	}
	
	function getDetails(resp, t){
		
		var rideInfo;
		
		$.ajax({
			url: 'https://api.lyft.com/v1/'+resp.ride_id,
			type: 'get',
			//data: JSON.stringify(data),
			headers: {
				"Authorization": "Bearer "+t,
				"Content-Type": "application/json"
			},
			//dataType: 'json',
			//contentType: "application/json",
			success: function(response){
				console.log("Got info! "+ response);
			},
			error: function(){
				console.log("OH NO!")
			}
		});
		
	}
}
