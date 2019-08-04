import React from 'react';
import { shallow } from 'enzyme';
import App from '../../src/client/app';
import { lists as fakeLists } from './../fakeLists.json';

describe('App', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('Renders Correctly', () => {
        fetchMock.mockResponses(
            [JSON.stringify(fakeLists), { status: 200 }],
            [JSON.stringify(fakeLists[0]), { status: 200 }]
        );

        const tree = shallow(<App />);

        expect(tree).toMatchSnapshot();
        expect(fetchMock.mock.calls.length).toEqual(1);
        expect(fetchMock.mock.calls[0][0]).toEqual('/lists');
    });
});
