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
				
				useToken(response.access_token);
				console.log("obtained token");

			}
		});
	};
	//'SANDBOX-gAAAAABWyOVloiHYvbH0e6XqDZo8JZ5UiIgiGi5vvIB2qRdeMyF8OYLfevRSC8AdCzhbbejHZWqIeF_zl32C25ZJrN_AIpqDGeSFMZc3JU57Io9AQVVW_rdStjd8GD7G8NTwjITkB5XUWQrSdgtzMt1VKC62hWrpA_qvk-dcXXZcomXf1q5wMmMzoQXA9x1o6PjMMylUjKhL5eFVtT18b52EKncj8Q_qU68NGbaQCEf7O161W9Kxx2hGGjJsPJKfsLFSaPzRPXWzJdOcmezFA483V7v1OFp0S27xfNe2TnewZ-pYcAuqOhg=';
	
	var data={
		origin:{lat: 39.9532,
			lng:  -75.1941	
		},
		ride_type:"lyft",
	};
	/*
	return $.post(
		'https://api.lyft.com/v1/rides',
		data,
		function(response){
			alert("success! "+response);
		}
		
	);
	*/
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
			alert("success! "+response);
		}
	});
	}
}
