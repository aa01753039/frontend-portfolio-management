import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box } from "@chakra-ui/react";

type TickerHistoricalData = {
  historical_data: {
    date: string;
    price: number;
  }[];
  first_price: number;
  last_price: number;
  absolute_change: number;
  percentage_change: number;
};

type LineChartComponentProps = {
  historicalData: Record<string, TickerHistoricalData>;
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
          text: 'Precios Históricos',
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
            format: 'MMM yyyy',
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
            format: 'dd MMM yyyy',
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
        colors: [
            '#5A88C2', '#FF5733', '#28B463', '#C70039', '#900C3F', 
            '#FFC300', '#581845', '#DAF7A6', '#FF33F6', '#33FF57',
            '#FF6F61', '#33AFFF', '#FFAA33', '#B833FF', '#33FFAA'
          ]      },
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

  updateChartData(historicalData: Record<string, TickerHistoricalData>) {
    const chartData = Object.keys(historicalData).map((ticker) => ({
      name: ticker,
      data: historicalData[ticker].historical_data.map((entry) => ({
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
      <Box p={4} shadow="sm" borderWidth="0.8px" borderRadius="lg" ml={4} minW="150px" textAlign="center" mb={8} bg="#FFFFFF">
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
