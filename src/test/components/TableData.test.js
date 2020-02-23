import * as React from 'react';
import TableData from 'components/TableData';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

configure({ adapter: new Adapter() });

describe('Should create table with hotel data', () => {
  it('should load the bootstrap table', () => {
    const wrapper = shallow(<TableData />);
    expect(wrapper.find('#dataTable').length).toBe(1);
  });

  it('should show the hotel previewImages on first column', () => {
    const wrapper = shallow(<TableData />);
    expect(wrapper.find('.propertyImage').length).toBe(1);
  });

  it('should show offer title as a sub column of first column', () => {
    const wrapper = shallow(<TableData />);
    console.log(wrapper.find('#dataTable'));
    expect(wrapper.find('.promoTitle').length).toBe(1);
  });
});
