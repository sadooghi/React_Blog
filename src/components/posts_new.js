import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
//this {reduxForm} alows our component to communicate with the additional reducer that we wired in (similar to connect)

class PostsNew extends Component {

  renderTitleField(field) {
    return (
      <div>
        <input
          type="text"
          {...field.input}
        />
      </div>
    )
  }


  render() {
    //component inside field is a function that returns some amount of jsx
    //component helps Field show itself on the screen by helping filed understanding some jsx
    // we don't render the function inside component like renderTitleField() because Field is going to
    // call this funciton itself at some point
    return (
      <form>
        <Field
          name="title"
          component={this.renderTitleField}
        />
      </form>
    );
  }
}

export default reduxForm({
  form: 'PostsNewForm'
  //the string infront of form should be unique to make sure if we have differnet forms in the app,
  // they will be handeled properly
})(PostsNew);