import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import Link from "react-router-dom/Link";
import { validateEmails } from "../../helpers/validators";
import { fields } from "../../helpers/fields";

class SurveyForm extends Component {
  renderFields = () => {
    return fields.map(({ type, name, label }, index) => {
      return (
        <Field
          key={index}
          type={type}
          name={name}
          label={label}
          component={SurveyField}
        />
      );
    });
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <div className="right">
            <Link
              to="/surveys"
              className="waves-effect grey lighten-2 btn-flat"
              style={{ marginRight: "10px" }}
            >
              Cancel
            </Link>
            <button type="submit" className="btn waves-effect waves-teal">
              Next
              <i className="material-icons right">chevron_right</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

/**
 * Form values will be passed into this function via reduxForm
 *
 * * Match errors with fields by adding a property on the errors object with the same key as the name
 * * of the field
 *
 * * Validate list of recipients by calling helper function, run before empty field check to
 * * ensure that the error message isn't overridden
 *
 * @param {obj} values - contains form field values
 */
const validate = values => {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || "");

  fields.forEach(({ name, error }) => {
    if (!values[name]) {
      errors[name] = error;
    }
  });

  return errors;
};

/**
 * Connect reduxForm to our SurveyForm component so that form data/state can easily be handled
 * by redux
 *
 * * Pass a validate function to reduxForm so that each field in the SurveyForm will be validated
 * * When this component is unmounted, preserve the data provided by redux form
 */
export default reduxForm({
  form: "surveyForm",
  validate: validate,
  destroyOnUnmount: false
})(SurveyForm);
