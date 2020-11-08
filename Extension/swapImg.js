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
for (var i = 0; i < images.length; i++) {
    var my_data = "";
    my_data = imgToBase64(images[i]);
    fetch("https://localhost:5000/", { method: 'POST', body: JSON.stringify({ img: my_data }), header: { "Access-Control-Allow-Origin": "self" }, credentials: "same-origin" }).then(res => res.json()).then(function (data) { images[i].src = data['img'] }).catch(err => { console.log(err) })
}

// var images = document.getElementsByTagName('img');
// console.log(images)
// for(var i = 0; i < images.length; i++) {
// 	//TODO create json of image, get response img, change byte64
// 	fetch('https://localhost:5000/', {
// 		method: 'POST',
// 		body: JSON.stringify({img:images[i].src}),
// 		header:{"Access-Control-Allow-Origin":"*"}
// 	}).then(
// 		res=>res.text()
// 	).then(function(data){
// 		images[i].src=data
// 	}).catch(
// 		err=>{console.log(err)}
// 	)
// }

