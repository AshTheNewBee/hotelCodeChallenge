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

const testRow = {
  id: 'cxd650nuyo',
  property: {
    propertyId: 'P107801',
    title: 'Courtyard by Marriott Sydney-North Ryde',
    address: ['7-11 Talavera Rd', 'North Ryde'],
    previewImage: {
      url: 'https://unsplash.it/145/125/?random',
      caption: 'Image of Courtyard by Marriott Sydney-North Ryde',
      imageType: 'PRIMARY'
    },
    rating: {
      ratingValue: 4.5,
      ratingType: 'self'
    }
  },
  offer: {
    promotion: {
      title: 'Exclusive Deal',
      type: 'MEMBER'
    },
    name: 'Deluxe Balcony Room',
    displayPrice: {
      amount: 329.0,
      currency: 'AUD'
    },

    cancellationOption: {
      cancellationType: 'NOT_REFUNDABLE'
    }
  }
};

const testRow_FreeCancellation_savings = {
  id: 'cxd650nuyo',
  property: {
    propertyId: 'P107801',
    title: 'Courtyard by Marriott Sydney-North Ryde',
    address: ['7-11 Talavera Rd', 'North Ryde'],
    previewImage: {
      url: 'https://unsplash.it/145/125/?random',
      caption: 'Image of Courtyard by Marriott Sydney-North Ryde',
      imageType: 'PRIMARY'
    },
    rating: {
      ratingValue: 4.5,
      ratingType: 'self'
    }
  },
  offer: {
    promotion: {
      title: 'Exclusive Deal',
      type: 'MEMBER'
    },
    name: 'Deluxe Balcony Room',
    displayPrice: {
      amount: 329.0,
      currency: 'AUD'
    },
    savings: {
      amount: 30.0,
      currency: 'AUD'
    },
    cancellationOption: {
      cancellationType: 'FREE_CANCELLATION'
    }
  }
};

describe('Should create table with hotel data', () => {
  it('should load the bootstrap table', () => {
    const wrapper = shallow(<TableData />);
    expect(wrapper.find('#dataTable').length).toBe(1);
  });

  it('should pass previewImages on first column', () => {
    const wrapper = shallow(<TableData />);
    const column = wrapper.instance().propertyImg();
    expect(column.dataField).toEqual('property.previewImage.url');
  });

  it('should show previewImages and promotion title in first column', () => {
    const wrapper = shallow(<TableData />);
    const column = wrapper.instance().propertyImg();
    const formatter = column.formatter('testImg', testRow);
    expect(formatter.props.className).toEqual('propertyImage');
  });

  it('should pass previewImages on first column', () => {
    const wrapper = shallow(<TableData />);
    const column = wrapper.instance().propertyImg();
    const formatter = column.formatter('testImg', testRow);
    expect(formatter.props.children[0].type).toEqual('img');
    expect(formatter.props.children[0].props).toEqual({
      src: 'testImg',
      alt: 'propery'
    });
  });

  //------------------ 2nd column -------------------------------

  it('should show property title on 2nd column', () => {
    const wrapper = shallow(<TableData />);
    const column = wrapper.instance().propertyDetails();
    expect(column.dataField).toEqual('property.title');
  });

  it('should show property details on 2nd column', () => {
    const wrapper = shallow(<TableData />);
    const column = wrapper.instance().propertyDetails();
    const formatter = column.formatter('testDetails', testRow);
    expect(formatter.props.className).toEqual('propertyDetails');
  });

  it('should truncate propertyTitle if propertyTitle is longer than 32 charcters', () => {
    const wrapper = shallow(<TableData />);
    const column = wrapper.instance().propertyDetails();
    const longName = 'Courtyard by Marriott Sydney-North Ryde';
    const formatter = column.formatter(longName, testRow);
    expect(formatter.props.children[0].props.className).toEqual(
      'propertyTitle'
    );
    expect(formatter.props.children[0].props.children[0]).toEqual(
      'Courtyard by Marriott Sydney-Nor...'
    );
  });

  it('should show the full propertyTitle if propertyTitle shorter than 32 charcters', () => {
    const wrapper = shallow(<TableData />);
    const column = wrapper.instance().propertyDetails();
    const longName = 'Courtyard';
    const formatter = column.formatter(longName, testRow);
    expect(formatter.props.children[0].props.className).toEqual(
      'propertyTitle'
    );
    expect(formatter.props.children[0].props.children[0]).toEqual('Courtyard');
  });

  it('should show the full propertyTitle if propertyTitle 31 charcters', () => {
    const wrapper = shallow(<TableData />);
    const column = wrapper.instance().propertyDetails();
    const longName = 'Courtyard by Marriott Sydney-Nor';
    const formatter = column.formatter(longName, testRow);
    expect(formatter.props.children[0].props.className).toEqual(
      'propertyTitle'
    );
    expect(formatter.props.children[0].props.children[0]).toEqual(
      'Courtyard by Marriott Sydney-Nor'
    );
  });

  it('should show rating', () => {
    const wrapper = shallow(<TableData />);
    const column = wrapper.instance().propertyDetails();
    const longName = 'Courtyard by Marriott Sydney-North Ryde';
    const formatter = column.formatter(longName, testRow);
    const rating = formatter.props.children[0].props.children[1].props;
    expect(rating.className).toEqual('rating');
    expect(rating.defaultValue).toEqual(4.5);
  });

  it('should show propertyAddress', () => {
    const wrapper = shallow(<TableData />);
    const column = wrapper.instance().propertyDetails();
    const formatter = column.formatter('test', testRow);
    expect(formatter.props.children[1].props.className).toEqual(
      'propertyAddress'
    );
    expect(formatter.props.children[1].props.children[0]).toEqual(
      '7-11 Talavera Rd',
      'North Ryde'
    );
  });

  it('should show propertyLink', () => {
    const wrapper = shallow(<TableData />);
    const column = wrapper.instance().propertyDetails();
    const formatter = column.formatter('test', testRow);
    expect(formatter.props.children[2].props.className).toEqual('propertyLink');
    expect(formatter.props.children[2].props.children.props.children).toEqual(
      'Deluxe Balcony Room'
    );
  });

  it('should show free cancellation if cancellation type is FREE_CANCELLATION', () => {
    const wrapper = shallow(<TableData />);
    const column = wrapper.instance().propertyDetails();
    const formatter = column.formatter(
      'test',
      testRow_FreeCancellation_savings
    );
    expect(formatter.props.children[3].props.className).toEqual(
      'cancellationType'
    );
    expect(formatter.props.children[3].props.children).toEqual(
      'Free cancellation'
    );
  });

  it('should not show free cancellation if cancellation type is not FREE_CANCELLATION', () => {
    const wrapper = shallow(<TableData />);
    const column = wrapper.instance().propertyDetails();
    const formatter = column.formatter('test', testRow);
    expect(formatter.props.children[3]).toEqual(false);
  });

  //------------------ 3rd column -----------------------------------------
  it('should show property pricing details cloumn', () => {
    const wrapper = shallow(<TableData />);
    const column = wrapper.instance().propertyPrice();
    const formatter = column.formatter('testDetails', testRow);
    expect(formatter.props.className).toEqual('propertyPricing');
  });

  it('should show price per night text', () => {
    const wrapper = shallow(<TableData />);
    const column = wrapper.instance().propertyPrice();
    const formatter = column.formatter('tst', testRow);

    expect(formatter.props.children[0].props.className).toEqual('priceTxt');
    expect(formatter.props.children[0].props.children).toEqual(
      '1 night total (AUD)'
    );
  });

  it('should show price per night', () => {
    const wrapper = shallow(<TableData />);
    const column = wrapper.instance().propertyPrice();
    const formatter = column.formatter('32.00', testRow);
    console.log(formatter.props.children[1].props);
    expect(formatter.props.children[1].props.className).toEqual('price');
    expect(formatter.props.children[1].props.children[1]).toEqual('32.00');
  });

  it('should show saving amount if exist', () => {
    const wrapper = shallow(<TableData />);
    const column = wrapper.instance().propertyPrice();
    const formatter = column.formatter(
      '32.00',
      testRow_FreeCancellation_savings
    );
    expect(formatter.props.children[2].props.className).toEqual('savings');
    expect(formatter.props.children[1].props.children[1]).toEqual('30.0');
  });

  it('should not show saving amount if not exist', () => {
    const wrapper = shallow(<TableData />);
    const column = wrapper.instance().propertyPrice();
    const formatter = column.formatter('32.00', testRow);
    expect(formatter.props.children[2]).toEqual(false);
  });

  //------------------ Sort -----------------------------------------

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
});
