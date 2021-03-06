import React, { Component } from 'react';
import data from 'utils/dataStore/data';
import 'utils/styleSheets/_tableData.css';
import BootstrapTable from 'react-bootstrap-table-next';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Star from '@material-ui/icons/Star';

class TableData extends Component {
  state = {
    field: null,
    order: null
  };

  /**************
   * @componentDidUpdate
   *  - Retrieve the sortingValue from SortAndTotal
   *  - Set the states of field on `price` column & order `ascending` or 'descending`
   **************/
  componentDidUpdate = prevProps => {
    if (prevProps.sortingValue !== this.props.sortingValue) {
      let order = this.props.sortingValue === 'priceAsc' ? 'asc' : 'desc';
      this.setState({ field: 'offer.displayPrice.amount', order });
    }
  };

  /**************
   * @propertyImg
   *  - Returns json object for the first column with property image and title
   **************/

  propertyImg = () => {
    const ImgColumn = {
      dataField: `property.previewImage.url`,
      formatter: (cell, row, rowIndex, extraData) => (
        <div className="propertyImage">
          <img src={cell} alt="propery" />
          <mark className="promoTitle">
            <strong>{row.offer.promotion.title}</strong>
          </mark>
        </div>
      ),
      text: ``
    };
    return ImgColumn;
  };

  /**************
   * @propertyDetails
   *  - Returns json object for the second column with
   *    - rating (if ratingType is self outputs CheckCircle icon if not starIcon)
   *    - Property Address
   *    - Offer Name
   *    - If cancellationType is FREE_CANCELLATION displays 'Free Cancellation'
   **************/
  propertyDetails = () => {
    const propertyDetails = {
      dataField: `property.title`,
      formatter: (cell, row, rowIndex, extraData) => (
        <div className="propertyDetails">
          <Typography className="propertyTitle" variant="h6">
            {cell.length > 32 ? cell.substring(0, 32) + '...' : cell}
            <Rating
              className="rating"
              name="half-rating-read"
              defaultValue={row.property.rating.ratingValue}
              precision={0.5}
              readOnly
              icon={
                row.property.rating.ratingType === 'self' ? (
                  <CheckCircle id="icon" />
                ) : (
                  <Star id="icon" />
                )
              }
            />
          </Typography>
          <Typography
            className="propertyAddress"
            variant="caption"
            display="block"
            gutterBottom
          >
            {row.property.address}
          </Typography>
          <Typography
            className="propertyLink"
            variant="caption"
            display="block"
            gutterBottom
          >
            <a href="!#" id="link">
              {row.offer.name}
            </a>
          </Typography>
          {row.offer.cancellationOption.cancellationType ===
            'FREE_CANCELLATION' && (
            <Typography
              className="cancellationType"
              variant="caption"
              display="block"
              gutterBottom
            >
              Free cancellation
            </Typography>
          )}
        </div>
      ),
      text: ``
    };
    return propertyDetails;
  };

  /**************
   * @propertyPrice
   *  - Returns json object for the third column with
   *    - Property price
   *    - Saving amount
   **************/

  propertyPrice = () => {
    const priceColumn = {
      dataField: `offer.displayPrice.amount`,
      formatter: (cell, row, rowIndex, extraData) => (
        <div className="propertyPricing">
          <Typography
            className="priceTxt"
            variant="caption"
            display="block"
            gutterBottom
          >
            1 night total (AUD)
          </Typography>
          <Typography className="price" variant="h5">
            ${cell}
          </Typography>
          {row.offer.savings && (
            <Typography className="savings" variant="body1">
              Save ${row.offer.savings.amount}~
            </Typography>
          )}
        </div>
      ),
      text: ``,
      sort: true
    };
    return priceColumn;
  };

  /**************
   * @render
   *  - Render bootstrap table with sorting
   **************/
  render() {
    const columns = [
      this.propertyImg(),
      this.propertyDetails(),
      this.propertyPrice()
    ];
    return (
      <React.Fragment>
        <BootstrapTable
          keyField="id"
          data={data.results}
          columns={columns}
          id="dataTable"
          sort={{
            dataField: this.state.field,
            order: this.state.order
          }}
        />
      </React.Fragment>
    );
  }
}

export default TableData;
