/**
 * Created by xmityaz on 23.03.16.
 */

import React, { Component, Children } from 'react';
import ReactDom from 'react-dom';
import Accordion from './Accardion.jsx';
import AccordionItem, { AccordionListItem, AccordionInputItem } from './AccordionItem.jsx';
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
  }

  onTriggerClick() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  onProtocolSelect(item) {
    this.setState({
      selectedItems: this.state.selectedItems.concat([item.props.children])
    });
  }

  onQuickFilterClick(item) {
    this.setState({
      selectedItems: item
    });
  }

  renderAccordion() {
    return (
      <Accordion>
        <AccordionInputItem
          autoFocus
          header="IP Filter"
          placeholder="Type ip address and press Enter"
        />

        <AccordionItem multiSelect itemTitle="Protocols">
          {protocols.map((p, index) =>
            <AccordionListItem
              onSelect={this.onProtocolSelect}
              key={index}
            >{p}</AccordionListItem>
          )}
        </AccordionItem>

        <AccordionItem itemTitle="Quick Filters">
          {quickFilters.map((item, index) =>
            <AccordionListItem key={index}>{item.name}</AccordionListItem>)}
        </AccordionItem>
      </Accordion>
    )
  }

  render() {
    return (
      <div className="filter-panel">
        <div className="filter__checkbox">
          <input type="checkbox" />
        </div>

        <button className="filter__trigger" onClick={this.onTriggerClick}>Filter</button>

        {this.state.isOpen ? this.renderAccordion() : ''}
        <div className="filter__tag-panel">
          {this.state.selectedItems.map((item, index) =>
            <span className="filter__tag" key={index}>{item}</span>
          )}
        </div>
      </div>
    )
  }
}

export default Filter;