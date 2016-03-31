import React from 'react';
import { browserHistory } from 'react-router'
require('./Tabs.css');

export class Pane extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export class Tabs extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick(index, url , event) {
        event.preventDefault();
        const path = `/manage/credentials/${url}`;
        browserHistory.push(path);
    }

    renderTitles() {
        function labels (child, index) {
            let activeClass = (this.props.selected === index) ? 'tabs__tab tabs__tab_current' : 'tabs__tab';
            return (
                <li key={index}
                    className={activeClass}
                    onClick={this.handleClick.bind(this, index, child.props.url)}>
                    <span>{child.props.label}</span>
                </li>
            );
        }
        return (
            <nav className="tabs__panes">
                <ul className="tabs__panes-container">
                    {this.props.children.map(labels.bind(this))}
                </ul>
            </nav>
        );
    }

    renderContent() {
        return (
            <div className="tabs__tab-content">
                {this.props.children[this.props.selected]}
            </div>
        );
    }

    render() {
        return (
            <div className="tabs">
                {this.renderTitles()}
                {this.renderContent()}
            </div>
        );
    }
}