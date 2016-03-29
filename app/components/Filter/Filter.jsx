/**
 * Created by xmityaz on 23.03.16.
 */

import React, { Component, Children } from 'react';
import ReactDom from 'react-dom';
import Accordion from './Accardion';
import AccordionItem, { AccordionListItem, AccordionInputItem } from './AccordionItem';
import Tag from './Tag';
import './Fliter.css';

const protocols = ['SSH', 'Telnet', 'rlogin', 'Windows', 'vSphere', 'vCenter', 'SNMP', 'WBEM',
  'Mainview z/OS Agent', 'Cisco IMC Web API', 'HP iLO Web API', 'EMC VPLEX REST API'];

const quickFilters = [
  {
    name: 'ESX Host',
    protocols: ['vSphere']
  },
  {
    name: 'Mainframe',
    protocols: ['Mainview z/OS Agent']
  },
  {
    name: 'Management Controller',
    protocols: ['SNMP', 'Cisco IMC Web API', 'HP iLO Web API']
  },
  {
    name: 'Network Device',
    protocols: ['SNMP']
  },
  {
    name: 'Printer',
    protocols: ['SNMP']
  },
  {
    name: 'Storage',
    protocols: ['WBEM', 'EMC VPLEX REST API']
  },
  {
    name: 'UNIX Host',
    protocols: ['SSH', 'Telnet', 'rlogin']
  },
  {
    name: 'Windows',
    protocols: ['Windows']
  },
  {
    name: 'vCenter',
    protocols: ['vCenter']
  }
];


class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      selectedItems: []
    };

    this.onTriggerClick = this.onTriggerClick.bind(this);
    this.onProtocolSelect = this.onProtocolSelect.bind(this);
    this.onQuickFilterClick = this.onQuickFilterClick.bind(this);
    this.onIPInputKeyDown = this.onIPInputKeyDown.bind(this);
  }

  onTriggerClick() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  onProtocolSelect(item) {
    let { selectedItems } = this.state;
    let itemIdx = selectedItems.indexOf(item);
    if (itemIdx > -1) {
      selectedItems.splice(itemIdx, 1);
      this.setState({
        selectedItems
      })
    }
    else {
      this.setState({
        selectedItems: selectedItems.concat([item])
      });
    }
  }

  onQuickFilterClick(items) {
    this.setState({
      selectedItems: items
    });
  }

  onIPInputKeyDown(e) {
    if (e.keyCode === 13) {
      this.setState({
        selectedItems: this.state.selectedItems.concat([e.target.value])
      });
      e.target.value = '';
    }
  }

  onCloseTag(item) {
    let { selectedItems } = this.state;
    let itemIdx = selectedItems.indexOf(item);

    selectedItems.splice(itemIdx, 1);

    this.setState({
      selectedItems
    });
  }

  renderAccordion() {
    return (
      <Accordion>
        <AccordionInputItem
          autoFocus
          header="IP Filter"
          placeholder="Type ip address and press Enter"
          onKeyDown={this.onIPInputKeyDown}
        />

        <AccordionItem multiSelect title="Protocols">
          {protocols.map((p, index) =>
            <AccordionListItem
              onSelect={this.onProtocolSelect}
              selected={this.state.selectedItems.indexOf(p) > -1}
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
        <button className="filter__trigger" onClick={this.onTriggerClick}>Filter</button>

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

export default Filter;