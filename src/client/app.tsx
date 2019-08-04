import React from 'react';
import { IList } from '../server/models/lists.model';
import ListView from './list-view';

interface IAppProps {}
interface IAppState {
    lists?: Array<IList>;
    activeListId?: number;
    newListName: string;
}

class App extends React.Component<IAppProps, IAppState> {
    state = {
        lists: [],
        activeListId: null,
        newListName: ''
    };

    constructor(props) {
        super(props);
        this._fetchLists = this._fetchLists.bind(this);
    }

    componentDidMount(): void {
        this._fetchLists().then(data => {
            this.setState(oldState => ({
                lists: data,
                activeListId: data[0].id
            }));
        });
    }

    _fetchLists(): Promise<any> {
        return fetch('/lists').then(res => res.json());
    }

    _handleListClick(activeListId, event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        this.setState(oldState => ({
            activeListId
        }));
    }

    _handleNewListNameChange(event) {
        event.preventDefault();
        const { target } = event;
        this.setState(oldState => ({
            newListName: target.value
        }));
    }

    _handleListCreate(event) {
        event.preventDefault();

        fetch('/lists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.newListName
            })
        })
            .then(data => data.json())
            .then(({ id }) => {
                this._fetchLists().then(data => {
                    this.setState(oldState => ({
                        lists: data,
                        activeListId: id
                    }));
                });
            });
    }

    render() {
        const { newListName } = this.state;

        return (
            <div>
                <h1>Grocery List</h1>
                <h2>Lists:</h2>
                <ul>
                    {this.state.lists.map(list => (
                        <li
                            key={list.id}
                            onClick={this._handleListClick.bind(this, list.id)}
                        >
                            {list.title} - ({list.size})
                        </li>
                    ))}
                </ul>

                <hr />

                <form action="#" onSubmit={this._handleListCreate.bind(this)}>
                    <input
                        type="text"
                        value={newListName}
                        onChange={this._handleNewListNameChange.bind(this)}
                        placeholder="New list name"
                    />
                    <input type="submit" value="Create list" />
                </form>

                <hr />

                <ListView activeListId={this.state.activeListId} />
            </div>
        );
    }
}

export default App;
