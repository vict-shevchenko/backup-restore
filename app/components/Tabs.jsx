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
        window.location.href = `/${url}`;
    }

    renderTitles() {
        function labels (child, index) {
            const className = ['tabs__tab', index === this.props.selected ? 'tabs__tab_current': ''].join(' ');
            return (
                <li key={index}
                    className={className}
                    onClick={this.handleClick.bind(this, index, child.props.url)}>
                    <span className="tabs__tab-title">{child.props.label}</span>
                </li>
            );
        }
        return (
            <nav className="tabs__panes">
                <ul className={'tabs__panes-container ' + (this.props.fullWidth ? 'tabs__panes-container_long': '')}>
                    {this.props.children.map(labels.bind(this))}
                    <li className="tabs__tab tabs__tab_information" style={ {maxWidth: ((4 - this.props.children.length) * 25) + '%' }}>
                        <span className="tabs__tab-title">{this.props.notice}</span>
                    </li>
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