function getToken(){
	window.open("https://api.lyft.com/oauth/authorize?client_id="+CLIENT_ID+"&response_type=code&scope=rides.request", '_self');
}
