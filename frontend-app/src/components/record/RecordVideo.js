import React, { Component } from "react";

import Card from "../common/Card";
import Button from "../common/Button";
import RecordRTC from "recordrtc";

import {
	captureCamera,
	generateRandomString,
	xhr
} from "../processing-record/recordUtils";

const hasGetUserMedia = !!(
	navigator.getUserMedia ||
	navigator.webkitGetUserMedia ||
	navigator.mozGetUserMedia ||
	navigator.msGetUserMedia
);

class RecordVideo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			videoPreview: null,
			recordVideo: null,
			camera: null,
			blockBtnStart: false,
			blockBtnStop: true
		};

		this.onClickStart = this.onClickStart.bind(this);
		this.onClickStop = this.onClickStop.bind(this);
	}

	componentDidMount() {
		if (!hasGetUserMedia) {
			alert(
				"Your browser cannot stream from your webcam. Please switch to Chrome or Firefox."
			);
		}
	}

	onClickStart() {
		captureCamera(stream => {
			this.setState({
				blockBtnStart: true,
				blockBtnStop: false,
				camera: stream,
				videoPreview: document.querySelector("video"),
				recordVideo: RecordRTC(stream, {
					type: "video/webm; codecs=vp9"
				})
			});

			//This Feature is for preview and is necessary disable eslint, why show warning
			/* eslint-disable */
			this.state.videoPreview.srcObject = stream;
			this.state.recordVideo.startRecording();
		});
	}

	onClickStop() {
		this.setState({
			blockBtnStart: false,
			blockBtnStop: true
		});

		this.state.recordVideo.stopRecording(() => {
			let params = {
				type: "video/webm",
				data: this.state.recordVideo.blob,
				id: Math.floor(Math.random() * 90000) + 10000
			};

			//release camera
			this.setState({
				videoPreview: null,
				camera: this.state.camera.getTracks().forEach(function(track) {
					track.stop();
				})
			});

			const fileName = generateRandomString() + ".mp4";

			let file = new File([params.data], fileName, {
				type: "video/mp4"
			});

			xhr("http://localhost:5000/uploadFile", file, function() {
				alert("send to a server");
			});
		});
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-5 align-block">
						<div className="block">
							<Card title="CircleTube Record WebCam Video">
								<Card
									className={
										this.state.blockBtnStart
											? "block-video"
											: "block-video no-block"
									}
								>
									<video
										autoPlay
										controls
										width="320"
										height="240"
										muted="muted"
									/>
								</Card>
								<br />
								<Button
									type="button"
									color="btn-primary"
									block={true}
									onClick={this.onClickStart}
									disabled={this.state.blockBtnStart ? true : false}
								>
									Start Recording
								</Button>
								<Button
									type="button"
									color="btn-danger"
									block={true}
									onClick={this.onClickStop}
									disabled={this.state.blockBtnStop ? true : false}
								>
									Stop Recording
								</Button>
							</Card>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default RecordVideo;
