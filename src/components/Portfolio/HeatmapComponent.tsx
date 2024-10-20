import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box } from "@chakra-ui/react";

type TickerHistoricalData = {
  historical_data: {
    date: string;
    price: number;
  }[];
};

type HeatmapComponentProps = {
  historicalData: Record<string, TickerHistoricalData>;
};

type HeatmapComponentState = {
  heatmapData: {
    name: string;
    data: { x: string, y: number }[];
  }[];
  chartOptions: ApexCharts.ApexOptions;
};

class HeatmapComponent extends React.Component<HeatmapComponentProps, HeatmapComponentState> {
  constructor(props: HeatmapComponentProps) {
    super(props);

    this.state = {
      heatmapData: [],
      chartOptions: {
        chart: {
          type: 'heatmap',
          height: 350,
          width: '100%',
        },
        plotOptions: {
          heatmap: {
            shadeIntensity: 0.5,
            colorScale: {
              ranges: [
                { from: -1, to: -0.95, color: '#FF0000' },    // Deep red
                { from: -0.95, to: -0.85, color: '#FF4000' },
                { from: -0.85, to: -0.75, color: '#FF5733' }, // Red
                { from: -0.75, to: -0.65, color: '#FF7043' },
                { from: -0.65, to: -0.55, color: '#FF8A50' },
                { from: -0.55, to: -0.45, color: '#FFAA33' }, // Orange
                { from: -0.45, to: -0.35, color: '#FFBB66' },
                { from: -0.35, to: -0.25, color: '#FFD27F' },
                { from: -0.25, to: -0.15, color: '#DAF7A6' }, // Light green
                { from: -0.15, to: -0.05, color: '#A7FFB5' },
                { from: -0.05, to: 0.05, color: '#B9FCCC' },  // Weak correlation
                { from: 0.05, to: 0.15, color: '#33FFAA' },
                { from: 0.15, to: 0.25, color: '#66FFA3' },
                { from: 0.25, to: 0.35, color: '#33FF66' },   // Green
                { from: 0.35, to: 0.45, color: '#33FF99' },
                { from: 0.45, to: 0.55, color: '#33FFC2' },
                { from: 0.55, to: 0.65, color: '#5A88C2' },   // Blue
                { from: 0.65, to: 0.75, color: '#33AAFF' },
                { from: 0.75, to: 0.85, color: '#3399FF' },   // Strong positive
                { from: 0.85, to: 1, color: '#0000FF' },      // Deep blue
              ],
            },
          },
        },
        title: {
          text: 'Matriz de Correlación',
          align: 'left',
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            fontFamily: 'poppins',
          },
        },
        xaxis: {
          type: 'category',
        },
        yaxis: {
          labels: {
            style: {
              fontSize: '12px',
              fontFamily: 'poppins',
            },
          },
        },
        tooltip: {
          enabled: true,
          theme: 'dark',
          y: {
            formatter: function(value: number) {
              return value.toFixed(3); // Display with 3 decimals
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
            show: false, // Disable the legend that shows color scale
          },
      },
    };
  }

  componentDidMount() {
    this.updateHeatmapData(this.props.historicalData);
  }

  componentDidUpdate(prevProps: HeatmapComponentProps) {
    if (prevProps.historicalData !== this.props.historicalData) {
      this.updateHeatmapData(this.props.historicalData);
    }
  }

  // Helper function to calculate the Pearson correlation coefficient
  calculateCorrelation(data1: number[], data2: number[]): number {
    const n = data1.length;
    const mean1 = data1.reduce((sum, value) => sum + value, 0) / n;
    const mean2 = data2.reduce((sum, value) => sum + value, 0) / n;
  
    const covariance = data1.reduce((sum, value, index) => {
      return sum + (value - mean1) * (data2[index] - mean2);
    }, 0);
  
    const stdDev1 = Math.sqrt(data1.reduce((sum, value) => sum + Math.pow(value - mean1, 2), 0));
    const stdDev2 = Math.sqrt(data2.reduce((sum, value) => sum + Math.pow(value - mean2, 2), 0));
  
    let correlation = covariance / (stdDev1 * stdDev2);
  
    // Fixing floating-point precision issues
    if (Math.abs(correlation) > 0.999999) {
      correlation = Math.sign(correlation); // Set to exactly 1 or -1
    }
  
    return correlation;
  }
  

  updateHeatmapData(historicalData: Record<string, TickerHistoricalData>) {
    const tickers = Object.keys(historicalData);
    const prices = tickers.map((ticker) => historicalData[ticker].historical_data.map((data) => data.price));

    const correlationMatrix: number[][] = [];

    // Calculate the correlation matrix
    for (let i = 0; i < tickers.length; i++) {
      correlationMatrix[i] = [];
      for (let j = 0; j < tickers.length; j++) {
        const correlation = this.calculateCorrelation(prices[i], prices[j]);
        correlationMatrix[i][j] = correlation;
      }
    }

    // Prepare data for heatmap
    const heatmapData = tickers.map((ticker, i) => ({
      name: ticker,
      data: tickers.map((otherTicker, j) => ({
        x: otherTicker,
        y: correlationMatrix[i][j],
      })),
    }));

    this.setState({
      heatmapData,
    });
  }

  render() {
    return (
      <Box p={4} shadow="sm" borderWidth="0.8px" borderRadius="lg" ml={4} minW="150px" textAlign="center" mb={8} bg="#FFFFFF">
        <ReactApexChart
          options={this.state.chartOptions}
          series={this.state.heatmapData}
          type="heatmap"
          height="350px"
          width="100%"
        />
      </Box>
    );
  }
}

export default HeatmapComponent;
