export function generateRandomString() {
	if (window.crypto) {
		let a = window.crypto.getRandomValues(new Uint32Array(3)),
			token = "";
		for (let i = 0, l = a.length; i < l; i++) token += a[i].toString(36);
		return token;
	} else {
		return (Math.random() * new Date().getTime())
			.toString(36)
			.replace(/\./g, "");
	}
}

export function captureCamera(callback) {
	const constraints = {
		audio: {
			mandatory: {
				echoCancellation: true,
				googAutoGainControl: false,
				googNoiseSuppression: true,
				googHighpassFilter: false
			}
		},
		video: {
			width: 320,
			height: 240,
			frameRate: 30
		}
	};
	navigator.mediaDevices
		.getUserMedia(constraints)
		.then(stream => {
			callback(stream);
		})
		.catch(error => {
			alert("Unable to capture your camera. Please check console logs.");
			console.error(error);
		});
}

export function xhr(url, data, callback) {
	let request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState === 4 && request.status === 200) {
			callback(request.responseText);
		}
	};

	request.open("POST", url);
	const formData = new FormData();
	formData.append("file", data);
	request.send(formData);
}
