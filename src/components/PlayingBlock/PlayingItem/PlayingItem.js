import React from 'react';
import PropTypes from 'prop-types';


const PlayingItem = ({ item, isSelect, onClick }) => (
  <div className={`playing-section__item ${isSelect ? 'active' : ''}`} onClick={onClick(item)}>
    {item}
  </div>
);

PlayingItem.propTypes = {
  onClick: PropTypes.func,
  item: PropTypes.number,
  isSelect: PropTypes.bool,
};

PlayingItem.defaultProps = {
  onClick: () => {},
  item: null,
  isSelect: false,
};

export default PlayingItem;
