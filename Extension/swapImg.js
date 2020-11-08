function imgToBase64(img) {
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	canvas.width = img.naturalWidth;
	canvas.height = img.naturalHeight;
	img.crossOrigin = "anonymous";
	ctx.drawImage(img, 0, 0);
	return canvas.toDataURL();
}
var images = document.getElementsByTagName("img");

var funcs = [];

function createfunc(i) {
	return function () {
		var button = document.createElement("button");
		button.textContent = "anime me";
		button.setAttribute("imgID", i);
		button.onclick = (e) => {
			console.log(i);
			console.log(images[i].height);
			var my_data = "";
			my_data = imgToBase64(images[i]);
			if (my_data.length > 500){
				console.log(my_data);
			fetch("http://localhost:5000/", {
				method: "POST",
				body: JSON.stringify({ img: my_data }),
				header: { "Access-Control-Allow-Origin": "*" },
				credentials: "same-origin",
			})
				.then((res) => res.json())
				.then(function (data) {
					images[i].src = data["img"];
				})
				.catch((err) => {
					console.log(err);
				});
		}
		};
		images[i].parentElement.appendChild(button);
	};
}

for (var i = 0; i < images.length; i++) {
	funcs[i] = createfunc(i);
}

for (var j = 0; j < images.length; j++) {
	// and now let's run each one to see
	funcs[j]();
}
