import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';
//this {reduxForm} alows our component to communicate with the additional reducer that we wired in (similar to connect)

class PostsNew extends Component {

  renderField(field) {
    const { meta: {touched , error} } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <lable>{field.lable}</lable>
        <input
        className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values) {
    //this === component
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    //{ handleSubmit } is a property that comes from reduxform which we attached to posts_new
    const{ handleSubmit } = this.props;

    //component inside field is a function that returns some amount of jsx
    //component helps Field show itself on the screen by helping filed understanding some jsx
    // we don't render the function inside component like renderTitleField() because Field is going to
    // call this funciton itself at some point
    return (
      //handleSubmit makes sure that form is valid and does the redux side job and then redux says if everything
      // is good and ready to be submitted, calls the function we passed to handleSubmit (here: this.onSubmit)
      // here we used .bind(this) because onSubmit is a callback function and it is executed in another context
      // inside component and we want to make sure here we have  access to the right this inside onSubmit
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          lable="Title For Post"
          name="title"
          component={this.renderField}
        />
        <Field
          lable="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          lable="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  //validate the inputs from 'values'
  if(!values.title) {
    errors.title = 'Enter a title';
  }

  if(!values.categories) {
    errors.categories= 'Enter a category';
  }

  if(!values.content) {
    errors.content = 'Enter some content';
  }
  //If errors is empty, redux assumes the form is ready to be submitted
  //If errors has any properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
  //the string infront of form should be unique to make sure if we have differnet forms in the app,
  // they will be handeled properly
})(
  connect(null,{ createPost })(PostsNew)
);









