import * as React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';

import {App} from './';

describe('components/ App', function () {
    it('should be rendered', function () {
        const wrapper = shallow(<App name="world"/>);

        expect(wrapper.find('#appContainer')).to.have.length(1);
    });
});