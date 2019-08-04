import _ from 'lodash';
import uuid from 'uuid';
import fakeListsData from './fakeLists.json';

let { lists: fakeLists }: IFakeData = _.cloneDeep(fakeListsData);

interface IFakeData {
    lists: Array<IList>;
}

export interface IList {
    id?: string;
    title: string;
    created?: number;
    items?: Array<IItem>;
    size?: number;
}

export interface IItem {
    name: string;
    purchased: boolean;
}

class ListsModel {
    static getLists(): Array<IList> {
        return fakeLists.map(({ id, title, items, created }) => ({
            id,
            title,
            created,
            size: items.length
        }));
    }

    static getList(id: string): IList {
        return _.first(fakeLists.filter(list => list.id === id));
    }

    static addList(list: IList): Promise<IList> {
        const newList = {
            id: uuid(),
            title: '',
            created: Date.now(),
            items: [],
            ...list
        };
        fakeLists.push(newList);
        return Promise.resolve(newList);
    }

    static deleteList(id: string): boolean {
        fakeLists = fakeLists.filter(list => list.id === id);
        return true;
    }

    static updateList(updateList: IList): boolean {
        fakeLists = fakeLists.map(list => {
            if (list.id === updateList.id) {
                return {
                    ...list,
                    ...updateList
                };
            } else return list;
        });
        return true;
    }
}

export default ListsModel;
