import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box } from "@chakra-ui/react";
import { VacantePublic } from "../../client";

type LineChartComponentProps = {
  vacantes: VacantePublic[];
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
          type: 'area',
          height: 350,
          width: '100%',
        },
        title: {
          text: 'Posiciones Solicitadas',
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
        // markers: {
        //   size: 5,
        //   colors: ['#FFFFFF'],
        //   strokeColors: ['#FFDD44'],
        //   strokeWidth: 2,
        // },
        dataLabels: {
          enabled: false,
        },
        grid: {
          show: false,
        },
        xaxis: {
          type: 'datetime',
          labels: {
            format: 'dd MMM', // Format to show date as "12 Jun", etc.
            style: {
              fontSize: '12px',
              fontFamily: 'poppins',
            },
          },
        },
        yaxis: {
          min: 0,
          labels: {
            show: false, // Remove y-axis labels
          },
        },
        tooltip: {
          enabled: true,
          theme: 'dark',
          x: {
            format: 'dd MMM', // Format to show date as "12 Jun", etc.
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
        colors: ['#5A88C2'], // Colors for the lines
      },
    };
  }

  componentDidMount() {
    this.updateChartData(this.props.vacantes);
  }

  componentDidUpdate(prevProps: LineChartComponentProps) {
    if (prevProps.vacantes !== this.props.vacantes) {
      this.updateChartData(this.props.vacantes);
    }
  }

  updateChartData(vacantes: VacantePublic[]) {
    const vacantesPerDay: { [key: string]: number } = {};
    const dateSet: Set<string> = new Set();

    vacantes.forEach((vacante) => {
      const date = new Date(vacante.fecha_solicitud_vacante);
      const dateString = date.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
      if (!vacantesPerDay[dateString]) {
        vacantesPerDay[dateString] = 0;
      }
      vacantesPerDay[dateString]++;
      dateSet.add(dateString);
    });

    // Fill in missing dates with 0
    const categories = Array.from(dateSet).sort();
    const startDate = new Date(categories[0]);
    const endDate = new Date(categories[categories.length - 1]);
    const dateRange: string[] = [];

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateString = d.toISOString().split('T')[0];
      dateRange.push(dateString);
      if (!vacantesPerDay[dateString]) {
        vacantesPerDay[dateString] = 0;
      }
    }

    const data = dateRange.map(date => ({ x: date, y: vacantesPerDay[date] }));

    this.setState({
      chartData: [
        {
          name: 'Vacantes',
          data,
        },
      ],
      chartOptions: {
        ...this.state.chartOptions,
        xaxis: {
          ...this.state.chartOptions.xaxis,
          categories: dateRange,
        },
      },
    });
  }

  render() {
    return (
      <Box p={4} shadow="md" borderWidth="0.8px" borderRadius="md" ml={4} minW="150px" textAlign="center" mb={8} bg="#FFFFFF">
        <ReactApexChart
          options={this.state.chartOptions}
          series={this.state.chartData}
          type="area"
          height={"300px"}
          width='100%'
        />
      </Box>
    );
  }
}

export default LineChartComponent;


