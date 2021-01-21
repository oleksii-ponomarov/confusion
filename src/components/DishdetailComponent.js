import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from "react-redux-form";

const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;

class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFormOpen: false
    }

    this.toggleForm = this.toggleForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleForm() {
    this.setState({
      isFormOpen: !this.state.isFormOpen
    });
  }

  handleSubmit(values) {
    console.log(values);
    alert(
      `Comment info:\n\nRating: ${values.rating}\nAuthor: ${values.author}\nComment: ${values.comment}`
    );
  }

  render() {
    return(
      <React.Fragment>
        <Button outline color="secondary" onClick={this.toggleForm}>
          <span className="fa fa-pencil fa-lg" />{" "}Submit Comment
        </Button>

        <Modal isOpen={this.state.isFormOpen} toggle={this.toggleForm}>
          <ModalHeader toggle={this.toggleForm}>
            Submit Comment
          </ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>
              <div className="form-group">
                <Label for="rating">
                  Rating
                </Label>
                <Control.select
                  model=".rating"
                  id="rating"
                  name="rating"
                  className="form-control"
                  defaultValue=""
                  validators={{
                    required
                  }}
                >
                  <option disabled value="" hidden></option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
                <Errors
                  className="text-danger"
                  model=".rating"
                  show={field => field.touched && !field.focus}
                  messages={{
                    required: "Required"
                  }}
                />
              </div>
              <div className="form-group">
                <Label htmlFor="author">
                  Your Name
                </Label>
                <Control.text
                  model=".author"
                  id="author"
                  name="author"
                  className="form-control"
                  placeholder="Your Name"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15)
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".author"
                  show={field => field.touched && !field.focus}
                  messages={{
                    required: "Required ",
                    minLength: "Must be greater than 2 characters ",
                    maxLength: "Must be 15 characters or less "
                  }}
                />
              </div>
              <div className="form-group">
                <Label htmlFor="comment">
                  Comment
                </Label>
                <Control.textarea
                  model=".comment"
                  id="comment"
                  name="comment"
                  className="form-control"
                  rows="6"
                />
              </div>
              <Button type="submit" value="submit" color="primary">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    )
  }
};

const RenderDish = ({ dish }) => {
  return(
    <div className="col-12 col-md-5 m-1">
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
    </div>
  )
};

const RenderComments = ({ comments }) => {
  if (comments) {
    return(
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">
          {comments.map(comment => (
            <React.Fragment key={comment.id}>
              <li>
                <p>
                  {comment.comment}
                </p>
                <p>
                  {`-- ${comment.author}, ${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(comment.date))}`}
                </p>
              </li>
            </React.Fragment>
          ))}
        </ul>
        <CommentForm />
      </div>
    )
  } else {
    return <div></div>
  }
};

const DishDetail = ({ dish, comments }) => {
  if (dish) {
    return(
      <div className="container">
        <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            {dish.name}
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{dish.name}</h3>
          <hr />
        </div>
      </div>
        <div className="row">
          <RenderDish dish={dish} />
          <RenderComments comments={comments} />
        </div>
      </div>
    )
  } else {
    return <div></div>
  }
};

export default DishDetail;