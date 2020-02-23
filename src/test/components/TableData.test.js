import * as React from 'react';
import TableData from 'components/TableData';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

configure({ adapter: new Adapter() });

function setup() {
  const props = {
    sortingValue: 'null'
  };
  const wrapper = shallow(<TableData {...props} />);
  return {
    props,
    wrapper
  };
}

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
    const table = wrapper.find('#dataTable');

    expect(wrapper.find('.propertyImage').length).toBe(1);
  });

  it('should sort price high-low', () => {
    const { wrapper } = setup();
    wrapper.setProps({ sortingValue: 'priceAsc' });
    expect(wrapper.instance().state.field).toEqual('offer.displayPrice.amount');
    expect(wrapper.instance().state.order).toEqual('asc');
  });

  it('should sort price low-high', () => {
    const { wrapper } = setup();
    wrapper.setProps({ sortingValue: 'priceDsc' });
    expect(wrapper.instance().state.field).toEqual('offer.displayPrice.amount');
    expect(wrapper.instance().state.order).toEqual('desc');
  });

  // it('should truncate the title of the hotel name, if the title is longer than 32 characters', () => {
  //     let title = 'Courtyard by Marriott Sydney-North Ryde 7-11 Talavera RdNorth Ryde'
  //     const wrapper = shallow(<TableData />);
  // })

  // it('should show address as a sub title in second column', () => {

  // })

  // it('should show link for hotel under second column', () => {

  // })

  // it('should show offer name cancellation type')
});
