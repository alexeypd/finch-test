import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';


class AppRoute extends PureComponent {
  static propTypes = {
    component: PropTypes.func,
    location: PropTypes.shape(),
  };

  static defaultProps = {
    component: null,
    location: {},
  };

  render() {
    const { component: Component, ...rest } = this.props;

    return <Route {...rest} component={Component} />;
  }
}

export default AppRoute;
