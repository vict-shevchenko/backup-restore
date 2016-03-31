/**
 * Created by xmityaz on 28.03.16.
 */

import React, { Component, Children, PropTypes } from 'react';

function focusOnMount(el) {
  if (el != null) {
    el.focus();
  }
}

const AccordionItemPropTypes = {
  onSelect: PropTypes.func,
  multiSelect: PropTypes.bool,
  children: PropTypes.any,
  title: PropTypes.string
};

export default class AccordionItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedListItems: {}
    }
  }

  onListItemClick(index, item) {
    if (item.props.onSelect) {
      item.props.onSelect(item.props.value || item.props.text);
    }
    else {
      let selectedItems = this.state.selectedListItems;
      selectedItems[index] = !selectedItems[index];

      this.setState({
        selectedListItems: selectedItems
      });

    }
  }

  render() {
    const items = Children.map(this.props.children, (item, index) => {
      if (item.type === AccordionListItem) {
        const value = item.props.value || item.props.text;
        return React.cloneElement(item, {
          value,
          selected: item.props.selected || this.state.selectedListItems[index],
          checkbox: this.props.multiSelect,
          onClick: this.props.multiSelect ?
            this.onListItemClick.bind(this, index, item) :
            item.props.onSelect.bind(null, value)
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
          {this.props.title}
        </div>

        {
          this.props.isOpen ?
            <div className="filter-accordion__item-body">{items}</div> : ''
        }
      </div>
    )
  }
}

const AccordionListItemPropTypes = {
  selected: PropTypes.bool,
  checkbox: PropTypes.bool,
  text: PropTypes.string,
  value: PropTypes.any,
  onClick: PropTypes.func
};

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
      {props.text}
    </div>
  )
}


const AccordionInputItemPropTypes = {
  autoFocus: PropTypes.bool,
  onKeyDown: PropTypes.func,
  placeholder: PropTypes.string,
};

export function AccordionInputItem(props) {
  const { autoFocus, onKeyDown, placeholder, value, inputClass, onChange } = props;
  return (
    <div>
      <div className="filter-accordion__item-header">{props.header}</div>
      <input
        placeholder={placeholder}
        value={value}
        onKeyDown={onKeyDown}
        onChange={onChange}
        ref={autoFocus ? focusOnMount : null}
        className={'filter-accordion__item-input' + ' ' + inputClass}
      />
    </div>
  )
}

AccordionListItem.propTypes = AccordionListItemPropTypes;
AccordionInputItem.propTypes = AccordionInputItemPropTypes;