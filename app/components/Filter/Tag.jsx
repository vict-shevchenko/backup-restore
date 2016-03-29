/**
 * Created by xmityaz on 29.03.16.
 */

import React, { PropTypes } from 'react';

const propTypes = {
  children: PropTypes.any,
  onClose: PropTypes.func
};

function Tag(props) {
  return (
    <div className="filter__tag">
      {props.children}
      <button onClick={props.onClose} className="filter-tag__close">X</button>
    </div>
  );
}

Tag.propTypes = propTypes;

export default Tag;