import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap';

class DishDetail extends React.Component {
  renderDish(dish) {
    return(
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>
            {dish.name}
          </CardTitle>
          <CardText>
            {dish.description}
          </CardText>
        </CardBody>
      </Card>
    )
  }

  renderComments(comments) {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const monthsNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = date.getMonth();
      const day = date.getDate();
      const year = date.getFullYear();

      return `${monthsNames[month]} ${day < 10 ? "0" + day : day}, ${year}`
    };

    if (comments !== null) {
      return(
        <div>
          <h4>Comments</h4>
          <ul className="list-unstyled">
            {comments.map(comment => (
              <React.Fragment key={comment.id}>
                <li className="mb-3">
                  {comment.comment}
                </li>
                <li className="mb-3">
                  {`-- ${comment.author}, ${formatDate(comment.date)}`}
                </li>
              </React.Fragment>
            ))}
          </ul>
        </div>
      )
    } else {
      return <div></div>
    }
  }

  render() {
    const dish = this.props.dish;

    if (dish !== null) {
      return(
        <div className="row">
          <div className="col-12 col-md-5 m-1">
              {this.renderDish(dish)}
          </div>
          <div className="col-12 col-md-5 m-1">
            {this.renderComments(dish.comments)}
          </div>
        </div>
      )
    } else {
      return <div></div>
    }
  }
}

export default DishDetail;