var images = document.getElementsByTagName('img');
console.log(images)
for(var i = 0; i < images.length; i++) {
	//TODO create json of image, get response img, change byte64
	fetch('https://localhost:5000/', {
		method: 'POST',
		body: JSON.stringify({img:images[i].src}),
		header:{"Access-Control-Allow-Origin":"*"}
	}).then(
		res=>res.text()
	).then(function(data){
		images[i].src=data
	}).catch(
		err=>{console.log(err)}
	)
}