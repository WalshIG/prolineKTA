import React, { Component } from "react";
import { Input, Divider, Dropdown, Button } from "semantic-ui-react";
import ReportList from "./ReportList";
import * as ui from "./ui";
import "semantic-ui-css/semantic.min.css";

class ReportDashboard extends Component {
  handleValue = (e, { value }) => this.setState({ filterValue: value });
  handleId = (e, { value }) => this.setState({ filterId: value });

  async generateFullReport(e) {
    e.preventDefault();
    try {
      let result = await fetch(`${process.env.REACT_APP_API_URL}/reports`);
      if (!result.ok) throw Error(result.statusText);
      const response = await result.json();
      console.log("Report generated on server");
      window.open(`file://${response.filePath}`);
    } catch (err) {
      console.log(JSON.stringify(err.message));
      window.alert("Report failure: " + JSON.stringify(err.message));
      return;
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      filterId: "",
      filterValue: "",
      tableType: this.props.tableType
    };
    this.handleId = this.handleId.bind(this);
    this.handleValue = this.handleValue.bind(this);
    this.generateFullReport = this.generateFullReport.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.tableType !== prevState.tableType) {
      console.log("firing");
      return {
        filterId: "",
        filterValue: "",
        tableType: nextProps.tableType
      };
    }
    return null;
  }

  render() {
    let columns = [];
    let options = [];
    let filter = {
      id: this.state.filterId,
      value: this.state.filterValue
    };

    switch (this.state.tableType) {
      case "keys":
        columns = ui.keyColumns;
        options = ui.keyFilter;
        break;
      case "properties":
        columns = ui.propertyColumns;
        options = ui.propertyFilter;
        break;
      default:
        break;
    }

    return (
      <div>
        <div>
          <Dropdown
            options={options}
            selection
            onChange={this.handleId}
            value={this.state.value}
            placeholder="Category..."
          />
          <Input
            style={{ paddingLeft: "5px" }}
            icon="search"
            iconPosition="left"
            placeholder="Search..."
            onChange={this.handleValue}
          />
          <Button
            floated="right"
            onClick={this.generateFullReport}
            color="purple"
          >
            Full Report
          </Button>
        </div>
        <Divider />
        <div>
          <ReportList
            type={this.props.tableType}
            columns={columns}
            filter={filter}
          />
        </div>
      </div>
    );
  }
}

export default ReportDashboard;
