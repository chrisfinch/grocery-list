import ListModel from './../../src/server/models/lists.model';

describe('List Model', () => {
    it('Runs getLists correctly', () => {
        const result = ListModel.getLists();

        expect(result.length).toBe(2);
        expect(result).toMatchSnapshot();
    });

    it('Runs getList correctly', () => {
        const result = ListModel.getList('1');

        expect(result.title).toBe('Demo list');
        expect(result).toMatchSnapshot();
    });

    it('Runs addList correctly', async () => {
        const newTitle = 'TestList';

        const result = await ListModel.addList({
            title: newTitle,
            created: 123
        });

        expect(result.id.length).toBeGreaterThan(0);
        expect(result.title).toBe(newTitle);
    });

    it('Runs deleteList correctly', () => {
        const result = ListModel.deleteList('2');

        expect(result).toBe(true);
    });

    it('Runs updateList correctly', () => {
        const newTitle = 'TestList';

        const result = ListModel.updateList({
            id: '1',
            title: newTitle
        });

        expect(result).toBe(true);
    });
});
