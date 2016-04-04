import React, { PropTypes } from 'react';
import Filter from './Filter/Filter';
import listStyles from './list.css'

function ListItem (props)  {

        return (
            <div className="list-item list-item_sortable">
                <div className={"list-item__drag-section list-item__status_" + props.credential.status} ></div>
                <div className="list-item__main-section">
                    <div className="list-item__icon" >
                        <label className="full-size list-item__icon-label">
                            <input type="checkbox" checked={props.credential.checked} onChange={props.checkItem.bind(this, props.index)} />
                        </label>
                    </div>
                    <div className="list-item__partial list-item__name" >
                        <a href="#">{props.credential.name}</a>
                    </div>
                    <div className="list-item__partial list-item__desc" >
                        <label>Description:</label> <span>{props.credential.description}</span><br/>
                        <label>Username:</label> <span>{props.credential.username}</span>
                    </div>
                    <div className="list-item__partial list-item__desc" >
                        <label dangerouslySetInnerHTML={{__html: props.credential.protocols.join('<br/>')}}></label>
                    </div>
                    <div className="list-item__partial list-item__actions">
                        <button className="dropdown-button">Actions ▼</button>
                    </div>
                </div>
            </div>
        )
}

ListItem.propTypes = {
    credential: PropTypes.object.isRequired,
    checkItem: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
};

const credentialsCache = {};

export default class CredentialsList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        areCredentialsLoading: true,
        credentialsList: [],
        filterCriteria: {
            protocols: [],
            ips: []
        }
      };

        this.checkAll = this.checkAll.bind(this);
        this.checkItem = this.checkItem.bind(this);
        this.invertSelection = this.invertSelection.bind(this);
        this.filterList = this.filterList.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
    }

    componentDidMount () {
        this.fetchCredentialsList(this.props.type);
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.type != nextProps.type) {
            this.setState({areCredentialsLoading: true});
            this.fetchCredentialsList(nextProps.type);
        }
    }

    fetchCredentialsList (type) {
        setTimeout(function () {
            fetch(`/mocks/${type}-credentials.json`).then(response => response.json()).then(json => {
                this.setState({
                    areCredentialsLoading: false,
                    credentialsList: json
                });
            });
        }.bind(this), 1000)

    }

    checkAll (e) {
        e.stopPropagation();

        const checked = e.target.checked,
            list = this.state.credentialsList.map(item => {
            item.checked = checked;
            return item;
        });

        this.setState({credentialsList: list});
    }

    checkItem (idx) {
        this.state.credentialsList[idx].checked = !this.state.credentialsList[idx].checked;
        this.setState({credentialsList: this.state.credentialsList});
    }

    invertSelection () {
        const lst = this.state.credentialsList.map(item => {
            item.checked = !item.checked;
            return item;
        });

        this.setState({credentialsList: lst});
    }

    onFilterChange(filterItems) {
        let ips = [];
        let protocols = [];
        filterItems.forEach(function (item) {
          if (item.split('.').length === 4) {
            ips.push(item);
          } else {
            protocols.push(item);
          }
        });
        this.setState({ filterCriteria: { ips, protocols } });
    }

    filterList(item) {
        let { ips, protocols } = this.state.filterCriteria;

        if (!ips.length && !protocols.length) {
          return true
        }
        else if (!ips.length) {
          return ~protocols.findIndex(filterItem => item.protocols.includes(filterItem));
        } else if (!protocols.length) {
          return ~ips.findIndex(filterItem => item.ips.includes(filterItem));
        } else {
          return ~protocols.findIndex(filterItem => item.protocols.includes(filterItem)) &&
            ~ips.findIndex(filterItem => item.ips.includes(filterItem));
        }
      }

    renderAdd() {
        return (
            <button className="btn btn_primary list-menu__button">
                Add
            </button>
        )
    }

    render() {
        const add = this.props.canAdd ? this.renderAdd() : '',
            allChecked = this.state.credentialsList.every(item => item.checked);

        if (this.state.areCredentialsLoading) {
            return (<span>Loading</span>)
        }

        return (
            <div>
                <div className="list-menu">
                    <div className="list-menu__button btn btn_secondary btn_small">
                        <input type="checkbox" className="list_menu__select-all-checkbox" checked={allChecked} onChange={this.checkAll}/>
                        <span className="list_menu__invert-selection" onClick={this.invertSelection}>🔄</span>
                    </div>
                    <Filter onFilterChange={this.onFilterChange} />
                    {add}

                </div>
                <div className="list list_sortable">
                    {this.state.credentialsList.filter(this.filterList).map((credential, idx) =>
                      <ListItem
                      credential={credential}
                      index={idx}
                      key={idx}
                      checkItem={this.checkItem}
                      />
                    )}
                </div>
            </div>

        );
    }
}

CredentialsList.propTypes = {
    canAdd: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired
};
