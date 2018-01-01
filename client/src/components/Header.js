import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Payments from "./Payments";

class Header extends Component {
  renderContent = () => {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      default:
        return [
          <li key="1">
            <Payments />
          </li>,
          <li key="2" style={{ margin: "0 10px" }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key="3">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  };

  render = () => {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={this.props.auth ? "/surveys" : "/"}>Emaily</Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  };
}

// Convert global state object into props that are available to this component
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
