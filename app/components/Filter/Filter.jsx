/**
 * Created by xmityaz on 23.03.16.
 */

import React, { Component, Children, PropTypes } from 'react';
import ReactDom from 'react-dom';
import Accordion from './Accardion';
import AccordionItem, { AccordionListItem, AccordionInputItem } from './AccordionItem';
import Tag from './Tag';
import { protocols, quickFilters } from '../../mocks/credential-filters.js';
import './Fliter.css';

const propTypes = {
  onFilterChange: PropTypes.func
};

class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      selectedItems: [],
      ip: ''
    };

    this.onTriggerClick = this.onTriggerClick.bind(this);
    this.onProtocolSelect = this.onProtocolSelect.bind(this);
    this.onQuickFilterClick = this.onQuickFilterClick.bind(this);
    this.onIPInputKeyDown = this.onIPInputKeyDown.bind(this);
    this.onIPInputChange = this.onIPInputChange.bind(this);
  }

  onTriggerClick() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  onProtocolSelect(item) {
    let selectedItems = this.state.selectedItems.slice(); // call slice to avoid direct mutation of state
    const itemIdx = selectedItems.indexOf(item);
    if (itemIdx > -1) {
      selectedItems.splice(itemIdx, 1);
    }
    else {
      selectedItems = selectedItems.concat([item]);
    }

    this.setState({
      selectedItems
    }, this.props.onFilterChange.bind(null, selectedItems));
  }

  onQuickFilterClick(items) {
    this.setState({
      selectedItems: items
    }, this.props.onFilterChange.bind(null, items));
  }

  onIPInputKeyDown(e) {
    const value = e.target.value;

    if (e.keyCode === 13 && value && this.validateIP(value)) {
      let { selectedItems } = this.state;
      selectedItems = selectedItems.includes(value) ? selectedItems : selectedItems.concat([value]);

      this.setState({
        selectedItems,
        ip: ''
      }, this.props.onFilterChange.bind(null, selectedItems));
    }
  }

  onIPInputChange(e) {
    this.setState({ ip: e.target.value });
  }

  onCloseTag(item) {
    const selectedItems = this.state.selectedItems.slice(); // call slice to avoid direct mutation of state
    const itemIdx = selectedItems.indexOf(item);

    selectedItems.splice(itemIdx, 1);

    this.setState({
      selectedItems
    }, this.props.onFilterChange.bind(null, selectedItems));
  }

  validateIP(ip) {
    const reg = /^(?!0)(?!.*\.$)(((1?\d?\d|25[0-5]|2[0-4]\d)|\*)(\.|$)){4}$/;

    return !ip || reg.test(ip);
  }

  renderAccordion() {
    return (
      <Accordion>
        <AccordionInputItem
          inputClass={this.validateIP(this.state.ip) ? '' : 'input_invalid'}
          autoFocus
          header="IP Filter"
          placeholder="Type ip address and press Enter"
          onKeyDown={this.onIPInputKeyDown}
          onChange={this.onIPInputChange}
          value={this.state.ip}
        />

        <AccordionItem multiSelect title="Protocols">
          {protocols.map((p, index) =>
            <AccordionListItem
              onSelect={this.onProtocolSelect}
              selected={this.state.selectedItems.includes(p)}
              key={index}
              text={p}
            />
          )}
        </AccordionItem>

        <AccordionItem title="Quick Filters">
          {quickFilters.map((item, index) =>
            <AccordionListItem
              onSelect={this.onQuickFilterClick}
              key={index}
              text={item.name}
              value={item.protocols}
            />
          )}
        </AccordionItem>
      </Accordion>
    )
  }

  render() {
    return (
      <div className="filter-panel">
        <button
          className="btn btn_secondary btn_small list-menu__button"
          onClick={this.onTriggerClick}
        >
          Filter
        </button>

        {this.state.isOpen ? this.renderAccordion() : ''}
        <div className="filter__tag-panel">
          {this.state.selectedItems.map((item, index) =>
            <Tag key={index} onClose={this.onCloseTag.bind(this, item)}>{item}</Tag>
          )}
        </div>
      </div>
    )
  }
}

Filter.propTypes = propTypes;

export default Filter;
