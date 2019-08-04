import React from 'react';
import { IList } from '../server/models/lists.model';

interface IListViewProps {
    activeListId: number;
}
interface IListViewState {
    list: IList;
    newItemName?: string;
}

class ListView extends React.Component<IListViewProps, IListViewState> {
    state = {
        list: null,
        newItemName: ''
    };

    componentWillReceiveProps(
        nextProps: Readonly<IListViewProps>,
        nextContext: any
    ): void {
        if (this.props.activeListId !== nextProps.activeListId) {
            this._fetchList(nextProps.activeListId);
        }
    }

    _fetchList(listId) {
        return fetch(`/lists/${listId}`)
            .then(res => res.json())
            .then(data => {
                this.setState(oldState => ({
                    list: data
                }));
            });
    }

    _handleNewItemNameChange(event) {
        event.preventDefault();
        const { target } = event;
        this.setState(oldState => ({
            newItemName: target.value
        }));
    }

    _handleItemCreate(event) {
        event.preventDefault();

        this.setState(
            ({ list }) => ({
                list: {
                    ...list,
                    items: [].concat(list.items, [
                        {
                            name: this.state.newItemName,
                            purchased: false
                        }
                    ])
                },
                newItemName: ''
            }),
            () => {
                fetch(`/lists/${this.props.activeListId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.state.list)
                })
                    .then(data => data.json())
                    .then(({ id }) => {
                        this._fetchList(this.props.activeListId);
                    });
            }
        );
    }

    _handleItemChecked(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();

        const target = event.target;

        this.setState(
            ({ list }) => ({
                list: {
                    ...list,
                    items: list.items.map(item =>
                        item.name === target.value
                            ? { ...item, purchased: target.checked }
                            : item
                    )
                }
            }),
            () => {
                fetch(`/lists/${this.props.activeListId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.state.list)
                })
                    .then(data => data.json())
                    .then(({ id }) => {
                        this._fetchList(this.props.activeListId);
                    });
            }
        );
    }

    render() {
        const { list, newItemName } = this.state;

        return list ? (
            <div className="list-view">
                <h4 className="list-view__name">{list.title}</h4>
                <ul className="list-view__items">
                    {list.items.map((item, index) => (
                        <li className="list-view__item" key={index}>
                            {item.name} -{' '}
                            <input
                                type="checkbox"
                                checked={item.purchased}
                                value={item.name}
                                onChange={this._handleItemChecked.bind(this)}
                            />
                        </li>
                    ))}
                </ul>

                <form action="#" onSubmit={this._handleItemCreate.bind(this)}>
                    <input
                        type="text"
                        value={newItemName}
                        onChange={this._handleNewItemNameChange.bind(this)}
                        placeholder="New item name"
                    />
                    <input type="submit" value="add item" />
                </form>
            </div>
        ) : null;
    }
}

export default ListView;
