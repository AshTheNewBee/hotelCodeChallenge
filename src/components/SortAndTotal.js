import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import data from 'utils/dataStore/data';
import TableData from 'components/TableData';

class SortAndTotal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: 'Price high-low',
      location: 'Sydney'
    };
  }

  /**************
   * @handleSortBy
   *  - set the selectedValue state to the selected sort
   **************/
  handleSortBy = e => {
    this.setState({ selectedValue: e.target.value });
  };

  /**************
   * @render
   *  Display the
   *  - Total number of hotels for the location
   *  - SortBy prices high-low or low-high
   *
   * Assumption: the data set has been given for location 'Sydney'
   **************/
  render() {
    return (
      <Grid container spacing={0} className="sortAndTotalGrid">
        <Grid item xs={6} className="hotelTotal">
          <Typography variant="h6" gutterBottom>
            {data && data.results.length} hotels in {this.state.location}
          </Typography>
        </Grid>

        <Grid item xs={6} className="sortBy">
          <InputLabel shrink htmlFor="age-native-label-placeholder">
            Sort by
          </InputLabel>

          <NativeSelect
            className="sortBySelector"
            value={this.state.selectedValue}
            name={this.state.selectedValue}
            onChange={e => {
              this.handleSortBy(e);
            }}
            inputProps={{ 'aria-label': 'price' }}
          >
            <option value="priceAsc">Price high-low</option>
            <option value="priceDsc">Price low-high</option>
          </NativeSelect>
        </Grid>
        <Grid item xs={12} className="dataTable">
          <TableData />
        </Grid>
      </Grid>
    );
  }
}

export default SortAndTotal;
