import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class PostsIndex extends Component {
  //componentDidMount is a good place to fetch a data or any action that wants to be done only one time at
  // the moment that this class is rendering to the dom (react will automatically call componentDidMount
  //after rendering this class)
  // there is no difference between fetching data in componentDidMount or componentWillMount since in either
  //case, data will be fetched after rendering due to the time it takes for data to be fetched and the fact
  //that react is asyncron and wont wait for the data to fetch and then render!

  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group" key={post.id}>
          {post.title}
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect (mapStateToProps, { fetchPosts })(PostsIndex);
// using {fetchPosts} in above line is the same as defining a funcion of mapDispatchToProps (the way we
// used to do) just in this way, connect does thoes steps for us and the {fetchPosts} is the equivalent
// of {fetchPosts: fetchPosts}
