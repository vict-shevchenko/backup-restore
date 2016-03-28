import React from 'react';
import DevicesList from './DevicesList';
import deviceCredentials from './../mocks/device-credentials.js';

const list = deviceCredentials.concat([]).splice(2, 6).reverse();

require('./Tabs.css');

const tabData = [
    { id: 0, name: 'Devices', component: 'DevicesComponent' },
    { id: 1, name: 'Databases', component: 'DatabasesComponent' },
    { id: 2, name: 'Windows Proxies', component: 'WindowsProxiesComponent' },
    { id: 3, name: 'Tests', component: 'TestsComponent' }
];

class DBList extends DevicesList {
    constructor(props) {
        super(props);
        this.state = {
            list: list
        }
    }
}

class Tab extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.handleClick();
    }

    render() {
        return (
            <li className={this.props.isCurrent ? 'tabs__tab tabs__tab_current' : 'tabs__tab'}
                onClick={this.handleClick.bind(this)}>
                <span> {this.props.name} </span>
            </li>
        )
    }
}

class Tabs extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick(tab) {
        this.props.changeTab(tab);
    }

    render() {
        return (
            <nav className="tabs__panes">
                <ul className="tabs__panes-container">
                    {this.props.tabData.map( function (tab) {
                        return (
                            <Tab
                                handleClick = {this.handleClick.bind(this, tab)}
                                key = {tab.id}
                                name = {tab.name}
                                isCurrent = {(this.props.currentTab === tab.id)}
                            />
                        );
                    }.bind(this))}
                </ul>
            </nav>
        );
    }
}

class TabContent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="tabs__tab-content">
                {this.props.currentTab === 0 ? <DevicesList /> : null}

                {this.props.currentTab === 1 ? <DBList /> : null}

                {this.props.currentTab === 2 ? <span>Tab 3</span> : null}

                {this.props.currentTab === 3 ? <span>Tab 4</span> : null}
            </div>
        )
    }
}

export default class TabsComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tabData: tabData,
            currentTab: 0
        };
    }

    changeTab(tab) {
        this.setState({ currentTab: tab.id });
    }

    render() {
        return (
            <div className="tabs">
                <Tabs
                    currentTab = {this.state.currentTab}
                    tabData = {this.state.tabData}
                    changeTab = {this.changeTab.bind(this)}
                />
                <TabContent
                    currentTab = {this.state.currentTab}
                />
            </div>
        )
    }
}