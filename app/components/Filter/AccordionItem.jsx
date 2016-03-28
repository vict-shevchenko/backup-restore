/**
 * Created by xmityaz on 28.03.16.
 */

import React, { Component, Children } from 'react';

function focusOnMount(el) {
  if (el != null) {
    el.focus();
  }
}

export default class AccordionItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedListItems: {}
    }
  }

  onListItemClick(index, item) {
    let selectedItems = this.state.selectedListItems;
    selectedItems[index] = !selectedItems[index];

    this.setState({
      selectedListItems: selectedItems
    });

    if (item.props.onSelect) {
      item.props.onSelect(item);
    }
  }

  render() {
    const items = Children.map(this.props.children, (item, index) => {
      if (item.type === AccordionListItem) {
        return React.cloneElement(item, {
          selected: item.props.selected || this.state.selectedListItems[index],
          checkbox: this.props.multiSelect,
          onClick: this.props.multiSelect ?
            this.onListItemClick.bind(this, index, item) :
            item.props.onSelect
        })
      }
      return item;
    });

    return (
      <div className="filter-accordion__item">
        <div
          className="filter-accordion__item-title"
          onClick={this.props.onHeaderClick}
        >
          {this.props.itemTitle}
        </div>

        {
          this.props.isOpen ?
            <div className="filter-accordion__item-body">{items}</div> : ''
        }
      </div>
    )
  }
}

export function AccordionListItem(props) {
  const className = ['filter-accordion__list-item'];

  if (props.selected) {
    className.push('filter-accordion__list-item_selected')
  }
  return (
    <div className={className.join(' ')} onClick={props.onClick}>
      {
        props.checkbox ?
          <input
            className="filter-accordion-list-item__checkbox"
            type="checkbox"
            readOnly
            checked={props.selected}
          /> : ''
      }
      {props.children}
    </div>
  )
}

export function AccordionInputItem(props) {
  return (
    <div>
      <div className="filter-accordion__item-header">{props.header}</div>
      <input
        ref={props.autoFocus ? focusOnMount : null}
        className="filter-accordion__item-input"
        placeholder={props.placeholder}
      />
    </div>
  )
}
