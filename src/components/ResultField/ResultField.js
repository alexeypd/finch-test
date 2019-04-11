import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TopMenu from '../TopMenu/TopMenu';

import './style.less';


class ResultField extends PureComponent {
  static propTypes = {
    gameState: PropTypes.shape(),
  };
  static defaultProps = {
    gameState: {},
  };

  state = {
    isOpenComments: false,
  };

  render() {
    const { statusMessage } = this.props.gameState;

    return (
      <div className="playing-field">
        <TopMenu isWithBtn={false} />
        <div className="playing-field__output-message">{statusMessage}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gameState: state.game,
});

export default connect(mapStateToProps)(ResultField);
