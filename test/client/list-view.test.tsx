import React from 'react';
import { shallow } from 'enzyme';
import ListView from '../../src/client/list-view';
import { lists as fakeLists } from '../fakeLists.json';

describe('List View', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('Renders Correctly', () => {
        fetchMock.mockResponseOnce(JSON.stringify(fakeLists[0]));

        const ListWrapper = shallow(<ListView activeListId={null} />);

        expect(ListWrapper).toMatchSnapshot();

        ListWrapper.setProps({ activeListId: 0 });
        ListWrapper.update();
        ListWrapper.instance().forceUpdate();

        expect(ListWrapper).toMatchSnapshot();

        expect(fetchMock.mock.calls.length).toEqual(1);
        expect(fetchMock.mock.calls[0][0]).toEqual('/lists/0');
    });
});
