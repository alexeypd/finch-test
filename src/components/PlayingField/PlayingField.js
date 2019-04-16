import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';

import { getArrayNeedLength } from '../../utils/getArrayNeedLength';
import { getRandomValue } from '../../utils/getRandomValue';
import { postResultGamesData } from './redux/game.redux';

import PlayingBlock from '../PlayingBlock/PlayingBlock';
import TopMenu from '../TopMenu/TopMenu';

import './style.less';


class PlayingField extends PureComponent {
  static propTypes = {
    postResultGamesData: PropTypes.func,
    gameState: PropTypes.shape(),
  };

  static defaultProps = {
    postResultGamesData: () => {},
    gameState: {},
  };

  state = {
    selectedNumber: {
      firstField: [],
      secondField: [],
    },
  };

  isSatisfiesRules = (maxSelectedItem, currentLength) => maxSelectedItem <= currentLength;

  isSelect = blockName => itemId =>
    !!this.state.selectedNumber[blockName].find(item => item === itemId);

  onClickSelectItem = (blockName, maxSelectedItem) => itemId => () => {
    const { selectedNumber } = this.state;

    const searchResult = selectedNumber[blockName].filter(item => item === itemId)[0];
    if (searchResult) {
      const newselectedNumber = selectedNumber[blockName].filter(item => item !== itemId);
      this.setState({ selectedNumber: { ...selectedNumber, [blockName]: newselectedNumber } });
    } else {
      if (this.isSatisfiesRules(maxSelectedItem, selectedNumber[blockName].length)) return;

      this.setState({
        selectedNumber: { ...selectedNumber, [blockName]: [...selectedNumber[blockName], itemId] },
      });
    }
  };

  generateNewRandomArray = (maxInputLength, outputLenght) => {
    let arrayNeedLength = getArrayNeedLength(maxInputLength);
    const resultArray = [];

    for (let i = 0; i < outputLenght; i++) {
      const currentArrayLength = arrayNeedLength.length;
      const randomItemIndex = getRandomValue(0, currentArrayLength - 1);
      const receivedValue = arrayNeedLength[randomItemIndex];
      arrayNeedLength = [
        ...arrayNeedLength.slice(0, randomItemIndex),
        ...arrayNeedLength.slice(randomItemIndex + 1),
      ];
      resultArray.push(receivedValue);
    }

    return resultArray;
  };

  onClickGenerateRandomSelected = () => {
    const arrayForFirstField = this.generateNewRandomArray(19, 8);
    const arrayForSecondField = this.generateNewRandomArray(2, 1);

    this.setState({
      selectedNumber: {
        firstField: arrayForFirstField,
        secondField: arrayForSecondField,
      },
    });
  };

  isSubmit = () => {
    const { firstField, secondField } = this.state.selectedNumber;
    return firstField.length === 8 && secondField.length === 1;
  };

  onClickShowResult = () => {
    if (!this.isSubmit()) return;

    const { firstField, secondField } = this.state.selectedNumber;

    const generatedResultFirstFieldArray = this.generateNewRandomArray(19, 8);
    const generatedResultSecondFieldArray = this.generateNewRandomArray(2, 1);

    const isCompareFirstField = this.compareArray(generatedResultFirstFieldArray, firstField);
    const isCompareSecondField = this.compareArray(generatedResultSecondFieldArray, secondField);

    if (isCompareFirstField && isCompareSecondField) {
      this.props.postResultGamesData({
        selectedNumber: this.state.selectedNumber,
        isTicketWon: true,
      });
    } else {
      this.props.postResultGamesData({
        selectedNumber: this.state.selectedNumber,
        isTicketWon: false,
      });
    }
  };

  compareArray = (first, second) => {
    if (first.length !== second.length) return false;
    const temp = {};

    first.forEach((item) => {
      temp[item] = item;
    });

    return second.reduce((bool, item) => {
      if (!bool) {
        return bool;
      }

      if (!temp[item]) {
        return false;
      }
      return bool;
    }, true);
  };

  render() {
    const { isFetching } = this.props.gameState;

    return (
      <div className="playing-field">
        <TopMenu isWithBtn onClickGenerateRandomSelected={this.onClickGenerateRandomSelected} />

        <div className="playing-field__block">
          <PlayingBlock
            name="firstField"
            fieldNumber={1}
            itemsQuantity={19}
            isSelect={this.isSelect('firstField')}
            onClickSelectItem={this.onClickSelectItem('firstField', 8)}
          />
          <PlayingBlock
            name="secondField"
            fieldNumber={2}
            itemsQuantity={2}
            isSelect={this.isSelect('secondField')}
            onClickSelectItem={this.onClickSelectItem('secondField', 1)}
          />
        </div>

        {isFetching ? (
          <div className="spinner">
            <Loader type="Oval" color="#00BFFF" height="50" width="50" />
          </div>
        ) : (
          <div
            className={`btn-show-result ${this.isSubmit() ? '' : 'disabled'}`}
            onClick={this.onClickShowResult}
          >
            <button>Показать результат</button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gameState: state.game,
});

export default connect(
  mapStateToProps,
  { postResultGamesData },
)(PlayingField);
