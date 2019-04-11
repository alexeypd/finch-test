import React from 'react';
import PropTypes from 'prop-types';

import { getArrayNeedLength } from '../../utils/getArrayNeedLength';

import PlayingItem from './PlayingItem/PlayingItem';

import './style.less';


class PlayingBlock extends React.Component {
  static propTypes = {
    onClickSelectItem: PropTypes.func,
    isSelect: PropTypes.func,
    fieldNumber: PropTypes.number,
    itemsQuantity: PropTypes.number,
    name: PropTypes.string,
  };

  static defaultProps = {
    onClickSelectItem: () => {},
    isSelect: () => {},
    fieldNumber: null,
    itemsQuantity: null,
    name: '',
  };

  componentDidMount() {}

  render() {
    const { fieldNumber, itemsQuantity, name, isSelect, onClickSelectItem } = this.props;
    const itemsArray = getArrayNeedLength(itemsQuantity);

    return (
      <div className="playing-section">
        <h2 className="playing-section__head">
          <span className="playing-section__title">Поле {fieldNumber}</span>
          {name === 'block1' ? 'Отметьте 8 чисел.' : 'Отметьте 1 число.'}
        </h2>
        <div className="playing-section__numbers-block">
          {itemsArray.map(item => (
            <PlayingItem
              key={item}
              item={item}
              isSelect={isSelect(item)}
              onClick={onClickSelectItem}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default PlayingBlock;
