/**
 * Created by xmityaz on 24.03.16.
 */

import React, { Component, Children }  from 'react';
import AccordionItem from './AccordionItem.jsx';
import './Fliter.css';

class Accordion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: null
    };

    this.onHeaderClick = this.onHeaderClick.bind(this);
  }

  onHeaderClick(item, value) {
    this.setState({
      activeItem: value
    });

    if (item.props.onClick) {
      item.props.onClick();
    }
  }

  render() {
    const { children } = this.props;
    const items = Children.map(children, (item, index) => {
      if (item.type === AccordionItem) {
        return React.cloneElement(item, {
          key: index,
          itemIndex: index,
          isOpen: index === this.state.activeItem,
          onHeaderClick: this.onHeaderClick.bind(null, item, index),
        });
      }

      return item;
    });

    return (
      <div className="filter__accordion">
        {items}
      </div>
    );
  }
}

export default Accordion;
