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
		var button_0 = document.createElement("button");
		var button_1 = document.createElement("button");
		var button_2 = document.createElement("button");
		var button_3 = document.createElement("button");
		var button_4 = document.createElement("button");
		button_0.textContent = "anime me hosoda style";
		button_1.textContent = "anime me hayao style";
		button_2.textContent = "anime me shinkai style";
		button_3.textContent = "anime me paprika style";
		button_4.textContent = "no like, bring back";
		images[i].setAttribute('originalsrc', images[i].src);
		button_0.onclick = (e) => {
			var my_data = "";
			my_data = imgToBase64(images[i]);
			fetch("http://localhost:5000/", {
				method: "POST",
				body: JSON.stringify({ img: my_data, style: 0 }),
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
		button_1.onclick = (e) => {
			var my_data = "";
			my_data = imgToBase64(images[i]);
			fetch("http://localhost:5000/", {
				method: "POST",
				body: JSON.stringify({ img: my_data, style: 1 }),
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

		button_2.onclick = (e) => {
			var my_data = "";
			my_data = imgToBase64(images[i]);
			fetch("http://localhost:5000/", {
				method: "POST",
				body: JSON.stringify({ img: my_data, style: 2 }),
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

		button_3.onclick = (e) => {
			var my_data = "";
			my_data = imgToBase64(images[i]);
			fetch("http://localhost:5000/", {
				method: "POST",
				body: JSON.stringify({ img: my_data, style: 3 }),
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
		button_4.onclick = (e) => {
			images[i].src = images[i].getAttribute('originalsrc')
		}

		images[i].parentElement.appendChild(button_0);
		images[i].parentElement.appendChild(button_1);
		images[i].parentElement.appendChild(button_2);
		images[i].parentElement.appendChild(button_3);
		images[i].parentElement.appendChild(button_4);
	};
}

for (var i = 0; i < images.length; i++) {
	funcs[i] = createfunc(i);
}

for (var j = 0; j < images.length; j++) {
	// and now let's run each one to see
	funcs[j]();
}
