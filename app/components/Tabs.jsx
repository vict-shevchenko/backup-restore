import React from 'react';
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

        this.state = {
            selected: props.selected ? props.selected : 0
        }
    }

    handleClick(index, event) {
        event.preventDefault();
        this.setState({ selected: index });
    }

    renderTitles() {
        function labels (child, index) {
            let activeClass = (this.state.selected === index) ? 'tabs__tab tabs__tab_current' : 'tabs__tab';
            return (
                <li key={index}
                    className={activeClass}
                    onClick={this.handleClick.bind(this, index)}>
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
                {this.props.children[this.state.selected]}
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