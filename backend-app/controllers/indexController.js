import url from "url";
import path from "path";
import fs from "fs";

import { application } from "../app";

export function post(req, res) {
	var uri = url.parse(req.url).pathname,
		filename = path.join(process.cwd(), uri);

	var isWin = !!process.platform.match(/^win/);

	if (
		filename &&
		filename.toString().indexOf(isWin ? "\\uploadFile" : "/uploadFile") != -1 &&
		req.method.toLowerCase() == "post"
	) {
		uploadFile(req, res);
		return;
	}

	fs.exists(filename, function(exists) {
		if (!exists) {
			res.writeHead(404, {
				"Content-Type": "text/plain"
			});
			res.write("404 Not Found: " + filename + "\n");
			res.end();
			return;
		}

		if (filename.indexOf("favicon.ico") !== -1) {
			return;
		}

		if (fs.statSync(filename).isDirectory() && !isWin) {
			filename += "/index.html";
		} else if (fs.statSync(filename).isDirectory() && !!isWin) {
			filename += "\\index.html";
		}

		fs.readFile(filename, "binary", function(err, file) {
			if (err) {
				res.writeHead(500, {
					"Content-Type": "text/plain"
				});
				res.write(err + "\n");
				res.end();
				return;
			}

			var contentType;

			if (filename.indexOf(".html") !== -1) {
				contentType = "text/html";
			}

			if (filename.indexOf(".js") !== -1) {
				contentType = "application/javascript";
			}

			if (contentType) {
				res.writeHead(200, {
					"Content-Type": contentType
				});
			} else res.writeHead(200);

			res.write(file, "binary");
			res.end();
		});
	});
}

function uploadFile(req, res) {
	// parse a file upload
	var mime = require("mime");
	var formidable = require("formidable");
	var util = require("util");

	var form = new formidable.IncomingForm();

	var dir = !!process.platform.match(/^win/) ? "\\uploads\\" : "/uploads/";

	form.uploadDir = path.join(__dirname, "../", dir);
	form.keepExtensions = true;
	form.maxFieldsSize = 10 * 1024 * 1024;
	form.maxFields = 1000;
	form.multiples = false;

	form.parse(req, function(err, fields, files) {
		var file = util.inspect(files);

		res.writeHead(200, getHeaders("Content-Type", "application/json"));

		var fileName = file
			.split("path:")[1]
			.split("',")[0]
			.split(dir)[1]
			.toString()
			.replace(/\\/g, "")
			.replace(/\//g, "");
		var fileURL =
			"http://" +
			application.server.address +
			":" +
			5000 +
			"/uploads/" +
			fileName;

		//console.log("fileURL: ", fileURL);
		res.write(
			JSON.stringify({
				fileURL: fileURL
			})
		);
		res.end();
	});
}

function getHeaders(opt, val) {
	try {
		var headers = {};
		headers["Access-Control-Allow-Origin"] = "http://localhost:3000";
		headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
		headers["Access-Control-Allow-Credentials"] = true;
		headers["Access-Control-Max-Age"] = "86400"; // 24 hours
		headers["Access-Control-Allow-Headers"] =
			"X-reqed-With, X-HTTP-Method-Override, Content-Type, Accept";

		if (opt) {
			headers[opt] = val;
		}

		return headers;
	} catch (e) {
		return {};
	}
}
