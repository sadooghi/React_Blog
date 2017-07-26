import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions';

class PostsShow extends Component {

  componentDidMount() {
    //this.props.match.params.id is provided by react router. match is the top level object in react router
    //which has params property inside of it. params is an object that has all different wildcart tokens that
    //exists inside the url. here we only have :id => we only have params.id here
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  render() {
    const { post } = this.props;

    if(!post) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}


export default connect(mapStateToProps, { fetchPost })(PostsShow);