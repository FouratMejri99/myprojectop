// src/charts/PieChart.jsx
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

// Register required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ chartData, chartOptions, h, w }) => {
  return (
    <div style={{ height: h, width: w }}>
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default PieChart;
