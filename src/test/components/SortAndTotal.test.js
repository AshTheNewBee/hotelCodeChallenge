import * as React from 'react';
import SortAndTotal from 'components/SortAndTotal';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

configure({ adapter: new Adapter() });

describe('Total and Sorting', () => {
  it('should display the sortAndTotal grid', () => {
    const wrapper = shallow(<SortAndTotal />);
    expect(wrapper.find('.sortAndTotalGrid').length).toBe(1);
  });

  //Assumption: Given Location is Sydney
  it('should display the total number of hotels in the given location', () => {
    const wrapper = shallow(<SortAndTotal />);
    expect(wrapper.find('.hotelTotal').length).toBe(1);
  });

  it('should show the sortBy', () => {
    const wrapper = shallow(<SortAndTotal />);
    expect(wrapper.find('.sortBy').length).toBe(1);
  });

  it('should change the sortBy value to (price high-low) when (price high-low) is selected', () => {
    const wrapper = shallow(<SortAndTotal />);
    expect(wrapper.find('.sortBy').length).toBe(1);
    wrapper
      .find('.sortBySelector')
      .at(0)
      .simulate('change', {
        target: { name: 'Price high-low', value: 'Price high-low' }
      });
    expect(wrapper.state().selectedValue).toBe('Price high-low');
  });

  it('should change the sortBy value to (price low-high) when (price low-high) is selected', () => {
    const wrapper = shallow(<SortAndTotal />);
    expect(wrapper.find('.sortBy').length).toBe(1);
    wrapper
      .find('.sortBySelector')
      .at(0)
      .simulate('change', {
        target: { name: 'Price low-high', value: 'Price low-high' }
      });
    expect(wrapper.state().selectedValue).toBe('Price low-high');
  });
});
