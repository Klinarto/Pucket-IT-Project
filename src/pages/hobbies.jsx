import React, { Component } from "react";
import Header from "../components/header";
import Navbar from "../components/navbar";
import "bulma/css/bulma.min.css";
import "./hobbies.css";

class Academic extends Component {
	render() {
		return (
			<React.Fragment>
				<Header />
				<Navbar />
				<section className="section has-background-white-ter">
					<div className="container card level py-3 px-4">
						<div className="columns is-vcentered">
							<div className="column">
								<div className="content">
									<h1 className="title">Piano</h1>
									<p className="has-text-justified">
										Lorem ipsum dolor sit amet, consectetur
										adipiscing elit. Cras elementum mi id
										sodales sollicitudin. Fusce eu magna
										volutpat, tempor leo vel, tincidunt
										felis. Duis id dictum ante, sit amet
										maximus massa. Ut vehicula non erat
										aliquet vehicula. Vestibulum ut eleifend
										nisl. Nam consequat nisi nec eleifend
										convallis. Nunc ullamcorper mi vitae
										hendrerit porta. In vel vestibulum
										turpis. Mauris vitae molestie massa.
										Suspendisse turpis dui, eleifend eu
										lectus quis, pharetra ultrices diam.
										Aliquam auctor faucibus metus eget
										pharetra. Sed vel turpis dignissim,
										suscipit justo faucibus, sagittis
										turpis. Curabitur magna sem, rhoncus sed
										ipsum sed, tincidunt fringilla sem. Ut
										dictum est interdum quam pulvinar, ac
										varius dui tempor. Mauris ut arcu sed
										magna feugiat condimentum at sit amet
										enim. Suspendisse malesuada efficitur
										sapien vitae dignissim.
									</p>
								</div>
							</div>
							<div className="column">
								<figure>
									<img
										className="image-hobbies"
										src={require("../images/piano.jpg")}
										alt="First slide"
									/>
								</figure>
							</div>
						</div>
					</div>

					<div className="container card level py-3 px-4">
						<div className="columns is-vcentered">
							<div className="column">
								<figure>
									<img
										className="image-hobbies"
										src={require("../images/guitar.jpg")}
										alt="First slide"
									/>
								</figure>
							</div>
							<div className="column">
								<div className="content">
									<h1 className="title has-text-right">
										Guitar
									</h1>
									<p className="has-text-justified">
										Vivamus ultricies, ipsum quis egestas
										luctus, ex quam commodo leo, ut rutrum
										felis nunc vel est. Nullam quis nibh
										fringilla, aliquet quam sed, blandit
										tortor. Nulla sit amet velit a purus
										aliquam tempus. Curabitur tristique,
										sapien id auctor dictum, augue metus
										dapibus nibh, a eleifend felis nunc id
										magna. Mauris venenatis hendrerit risus,
										et tempus ligula ornare eget. Mauris non
										augue metus. Mauris nisl orci, convallis
										sit amet fringilla ut, tempus semper
										est. Ut sodales pellentesque ex, ac
										accumsan risus vulputate nec. Nullam
										vehicula justo condimentum nunc finibus,
										vitae placerat diam rhoncus. Duis at
										tellus a neque dapibus rutrum.
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className="container card level py-3 px-4">
						<div className="columns is-vcentered">
							<div className="column">
								<div className="content">
									<h1 className="title has-text-left">
										Coding
									</h1>
									<p className="has-text-justified">
										Nunc tortor arcu, molestie eu rhoncus
										sit amet, efficitur at turpis. Maecenas
										neque sapien, malesuada sit amet velit
										vitae, faucibus auctor ex. Aliquam vitae
										porttitor quam. Pellentesque vitae
										lectus ac eros fringilla condimentum ut
										sit amet risus. Nullam semper, enim ac
										faucibus ultricies, eros mauris
										tincidunt tortor, posuere volutpat
										lectus metus molestie massa. Praesent
										justo urna, pellentesque eu euismod
										quis, congue tristique lectus. Duis
										congue sed velit et condimentum.
									</p>
								</div>
							</div>
							<div className="column">
								<figure>
									<img
										className="image-hobbies"
										src={require("../images/coding.jpg")}
										alt="First slide"
									/>
								</figure>
							</div>
						</div>
					</div>
				</section>
			</React.Fragment>
		);
	}
}

export default Academic;
