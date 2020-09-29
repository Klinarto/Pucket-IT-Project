import React, { Component } from "react";
import Header from "../components/header";
import Navbar from "../components/navbar";
import "bulma/css/bulma.min.css";

class Login extends Component {
  state = {};
  sendMessage() {
    const apiUrl = 'http://localhost:5000/home/contact_me';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => console.log('This is your data', data));
  }
  render() {
    return (
      <React.Fragment>
        <Header />
        <Navbar />
        <section className="section has-background-light">
          <div className="card container">
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input className="input" type="text" placeholder="Fake Faker" />
              </div>
            </div>

            <div className="field">
              <label className="label">password</label>
              <div className="control">
                <input
                  className="input is-danger"
                  type="email"
                  placeholder="e.g. FakeEmail@Fake.com"
                />
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
        </section>
      </React.Fragment>
    );
  }
}

export default Login;