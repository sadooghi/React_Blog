import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';
import Navbar from './navbar';

class PostsShow extends Component {

  componentDidMount() {
    //this.props.match.params.id is provided by react router. match is the top level object in react router
    //which has params property inside of it. params is an object that has all different wildcart tokens that
    //exists inside the url. here we only have :id => we only have params.id here
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id , () => {
      this.props.history.push('/');
    });
  }

  onBackClick() {
    this.props.history.push('/');
  }

  render() {
    const { post } = this.props;

    if(!post) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Navbar />
        <div className="each-post-content">
          <button
          className="btn btn-primary pull-xs-right"
          onClick={this.onBackClick.bind(this)}
          >
            Back to Index
          </button>
          <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
          >
            Delete Post
          </button>
          <h3 className="post-title">{post.title}</h3>
          <h6 className="post-categories">Categories: {post.categories}</h6>
          <p className="post-content">{post.content}</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}


export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);