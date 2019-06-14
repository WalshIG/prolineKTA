import React, { Component } from "react";
import { Search } from "semantic-ui-react";
import { fetchNames } from "../../app/fetch/fetches";

const initialState = { isLoading: false, results: [], value: "" };

class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title });

  handleSearchChange(e, data) {
    this.setState({ isLoading: true, value: data.value }, () => {
      const request = {
        tableName: this.props.table,
        filterId: this.props.id,
        filterValue: this.state.value
      };
      fetchNames(request, res => {
        this.setState({
          results: res,
          isLoading: false
        });
      });
    });
  }

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Search
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={this.handleSearchChange}
        results={results}
        value={value}
        {...this.props}
      />
    );
  }
}

export default AutoComplete;
