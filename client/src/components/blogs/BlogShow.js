import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBlog } from "../../actions";

class BlogShow extends Component {
  componentDidMount() {
    this.props.fetchBlog(this.props.match.params._id);
  }

  renderImage() {
    const { imageUrl } = this.props.blog;
    if (this.props.blog.imageUrl) {
      return (
        <img
          src={"https://s3-ap-southeast-1.amazonaws.com/f2-images/" + imageUrl}
        />
      );
    }
  }

  render() {
    if (!this.props.blog) {
      return "";
    }

    const { title, content, imageUrl } = this.props.blog;

    return (
      <div>
        {this.renderImage()}
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    );
  }
}

function mapStateToProps({ blogs }, ownProps) {
  return { blog: blogs[ownProps.match.params._id] };
}

export default connect(
  mapStateToProps,
  { fetchBlog }
)(BlogShow);
