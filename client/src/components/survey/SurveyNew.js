import React, { Component } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyReview from "./SurveyReview";

class SurveyNew extends Component {
  state = { showSurveyReview: false };

  /**
   * Determine whether or not to render a SurveyReview component or a SurveyForm component
   *
   * * Pass a function down into SurveyForm and SurveyReview as a prop in order to toggle our
   * * component state of SurveyNew when the form has been submitted
   */
  renderContent = () => {
    return this.state.showSurveyReview ? (
      <SurveyReview
        onCancel={() => this.setState({ showSurveyReview: false })}
      />
    ) : (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showSurveyReview: true })}
      />
    );
  };

  render() {
    return this.renderContent();
  }
}

/**
 * Tie this component to our SurveyForm by using reduxForm
 * and allow reduxForm to naturally remove all field values when this SurveyNew component is
 * navigated away from
 */
export default reduxForm({ form: "surveyForm" })(SurveyNew);
