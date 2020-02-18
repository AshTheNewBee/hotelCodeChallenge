import * as React from 'react';
import { App } from 'App.js';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

configure({ adapter: new Adapter() });

it('should show Quantas logo', () => {
  console.log(App);
  const wrapper = shallow(<App />);
  expect(wrapper.find('.qantasLogo').length).toBe(1);
});
