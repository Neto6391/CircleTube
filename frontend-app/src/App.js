import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import RecordVideo from "./components/record/RecordVideo";


class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="container">
					<RecordVideo />
				</div>
			</div>
		);
	}
}

export default App;
