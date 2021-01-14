import React from 'react';
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap';

class Menu extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedDish: null,
    }
  }

  onDishSelect(dish) {
    this.setState({ selectedDish: dish });
  }

  renderDish(dish) {
    if (dish !== null) {
      console.log(dish.description);
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
    } else {
      return null
    }
  }

  render() {
    const menu = this.props.dishes.map((dish) => {
      return (
        <div key={dish.id} className="col-12 col-md-6 my-3">
          <Card onClick={() => this.onDishSelect(dish)}>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardImgOverlay className="ml-5">
              <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">
          {menu}
        </div>
        <div className="row d-flex justify-content-center">
          {this.renderDish(this.state.selectedDish)}
        </div>
      </div>
    );
  }
}

export default Menu;
