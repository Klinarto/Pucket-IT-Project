import React, { Component } from "react";
import axios from "axios";
import Header from "../components/header";
import Navbar from "../components/navbar";
import "bulma/css/bulma.min.css";

class Contact extends Component {
  constructor(props) {
		super();

		this.state = { name: "", email: "",message: ""};
	}
  sendMessage = () => {
    const user={
      name: this.state.name,
      email: this.state.email,
      message: this.state.message
    }
    axios.post("http://localhost:5000/home/contact_me",{
        user
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }
  
  render() {
    return (
      <React.Fragment>
        <Header />
        <Navbar />
        <div className="section has-background-light">
          <h1>Contact me</h1>
          <form onSubmit= {this.sendMessage}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={(event) => {
                this.setState({name:event.target.value});
              }}
            />
            <br />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={(event) => {
                this.setState({email:event.target.value});
              }}
            />
            <br />
            <label>Message</label>
            <input
              type="text"
              name="message"
              value={this.state.message}
              onChange={(event) => {
                this.setState({message:event.target.value});
              }}
            />
            <br />
            <button type="submit" className="account-btn">
              Submit
            </button>
          </form>
        </div>

{/* 
        <section className="section has-background-light">
          <div className="card container">
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input className="input" type="text" placeholder="Fake Faker" />
              </div>
            </div>

            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input is-danger"
                  type="email"
                  placeholder="e.g. FakeEmail@Fake.com"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Message</label>
              <div className="control">
                <textarea
                  className="textarea"
                  placeholder="Fake Message"
                ></textarea>
              </div>
            </div>

            <div class="field is-grouped">
              <div class="control">
                <button class="button is-link" name="send-message" onClick={this.sendMessage}>
                  Submit
                </button>
              </div>
              <div class="control">
                <button class="button is-link is-light">Cancel</button>
              </div>
            </div>
          </div>
        </section> */}
      </React.Fragment>
    );
  }
}

export default Contact;
