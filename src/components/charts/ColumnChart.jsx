import { Component } from "react";
import Chart from "react-apexcharts";

class ColumnChart extends Component {
  render() {
    return (
      <Chart
        options={this.props.chartOptions} // Directly using props instead of state
        series={this.props.chartData} // Directly using props instead of state
        type="bar"
        width="100%"
        height="100%"
      />
    );
  }
}

export default ColumnChart;
