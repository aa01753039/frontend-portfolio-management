import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box } from "@chakra-ui/react";

type TickerHistoricalData = {
  date: string;
  price: number;
};

type LineChartComponentProps = {
  historicalData: Record<string, TickerHistoricalData[]>;
};

type LineChartComponentState = {
  chartData: {
    name: string;
    data: { x: string, y: number }[];
  }[];
  chartOptions: ApexCharts.ApexOptions;
};

class LineChartComponent extends React.Component<LineChartComponentProps, LineChartComponentState> {
  constructor(props: LineChartComponentProps) {
    super(props);

    this.state = {
      chartData: [],
      chartOptions: {
        chart: {
          type: 'line',
          height: 350,
          width: '100%',
        },
        title: {
          text: 'Historical Prices',
          align: 'left',
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            fontFamily: 'poppins',
          },
        },
        stroke: {
          curve: 'smooth',
          width: 3,
        },
        dataLabels: {
          enabled: false,
        },
        grid: {
          show: false,
        },
        xaxis: {
          type: 'datetime',
          labels: {
            format: 'dd MMM',
            style: {
              fontSize: '12px',
              fontFamily: 'poppins',
            },
          },
        },
        yaxis: {
          labels: {
            formatter: function (value: number) {
              return `$${value.toFixed(2)}`;
            },
          },
        },
        tooltip: {
          enabled: true,
          theme: 'dark',
          x: {
            format: 'dd MMM',
          },
          style: {
            fontFamily: 'poppins',
          },
        },
        legend: {
          position: 'top',
          fontSize: '14px',
          fontWeight: 'bold',
          fontFamily: 'poppins',
        },
        colors: ['#5A88C2'],
      },
    };
  }

  componentDidMount() {
    this.updateChartData(this.props.historicalData);
  }

  componentDidUpdate(prevProps: LineChartComponentProps) {
    if (prevProps.historicalData !== this.props.historicalData) {
      this.updateChartData(this.props.historicalData);
    }
  }

  updateChartData(historicalData: Record<string, TickerHistoricalData[]>) {
    const chartData = Object.keys(historicalData).map((ticker) => ({
      name: ticker,
      data: historicalData[ticker].map((entry) => ({
        x: entry.date,
        y: entry.price,
      })),
    }));

    this.setState({
      chartData,
    });
  }

  render() {
    return (
      <Box p={4} shadow="md" borderWidth="0.8px" borderRadius="md" ml={4} minW="150px" textAlign="center" mb={8} bg="#FFFFFF">
        <ReactApexChart
          options={this.state.chartOptions}
          series={this.state.chartData}
          type="line"
          height="300px"
          width="100%"
        />
      </Box>
    );
  }
}

export default LineChartComponent;
