import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import data from 'utils/dataStore/data';
import 'utils/styleSheets/_tableData.css';

class TableData extends Component {
  render() {
    const columns = [
      {
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
      },
      {
        dataField: `property.title`,
        text: ``
      },
      {
        dataField: `property.address`,
        text: ``
      }
    ];

    return (
      <React.Fragment>
        <BootstrapTable
          keyField="id"
          data={data.results}
          columns={columns}
          id="dataTable"
        />
      </React.Fragment>
    );
  }
}

export default TableData;
