function imgToBase64(img) {
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = img.naturalWidth;
	canvas.height = img.naturalHeight;
	img.crossOrigin = "anonymous"
	ctx.drawImage(img, 0, 0);
	return canvas.toDataURL();
}
var images = document.getElementsByTagName('img')

for (var i = 0; i <images.length; i++) {
	var button = document.createElement('button');
	button.textContent = 'anime me';
	button.setAttribute('imgID', i)
	button.onclick = (e) => {
		console.log(i)
		console.log(images[x].height);
		var my_data = "";
		my_data = imgToBase64(images[x]);
		fetch("https://localhost:5000/", { method: 'POST', body: JSON.stringify({ img: my_data }), header: { "Access-Control-Allow-Origin": "self" }, credentials: "same-origin" })
			.then(res => res.json())
			.then(function (data) { images[x].src=data['img'] })
			.catch(err => { console.log(err) })
	}
	images[i].parentElement.appendChild(button);
}