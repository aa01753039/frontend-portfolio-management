import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box } from "@chakra-ui/react";
import { VacantePublic } from "../../client";

type BarChartComponentProps = {
  vacantes: VacantePublic[];
};

type BarChartComponentState = {
  chartData: {
    name: string;
    data: number[];
  }[];
  chartOptions: ApexCharts.ApexOptions;
};

class BarChartComponent extends React.Component<BarChartComponentProps, BarChartComponentState> {
  constructor(props: BarChartComponentProps) {
    super(props);

    this.state = {
      chartData: [],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
          width: '100%',
          
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
        },
        fill: {
            type: 'gradient',
            gradient: {
              shade: 'light',
              type: 'horizontal',
              shadeIntensity: 0.25,
              gradientToColors: undefined,
              inverseColors: true,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [50, 0, 100, 100]
            }
          },
        title: {
          text: 'Vacantes Mensuales',
          align: 'left',
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            fontFamily: 'poppins',
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 3,
            columnWidth: '100%',

          },
        },
        stroke: {
          width: 1,
          colors: ['#fff'],
        },
        markers: {
          size: 5,
          colors: ['#FFFFFF'],
          strokeColors: ['#D8BFD8', '#1B2C4D'],
          strokeWidth: 2,
          
        },
        dataLabels: {
          enabled: false,
        },
        grid: {
          show: false,
        },
        xaxis: {
          categories: [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
          ],
          labels: {
            style: {
              fontSize: '11px',
              fontFamily: 'poppins',
            },
          },
        },
        yaxis: {
          
          labels: {
            
            show: false,
            style: {
              fontSize: '11px',
            },
          },
        },
        tooltip: {
          enabled: true,
          theme: 'dark',
          style: {
            
            fontFamily: 'poppins',
          },
        },
        legend: {
          position: 'bottom',
          fontSize: '12px',
          fontWeight: 'bold',
          fontFamily: 'poppins',
        },
        colors: ['#78256F', '#C78FB8'], // Colors for the bars
      },
    };
  }

  componentDidMount() {
    this.updateChartData(this.props.vacantes);
  }

  componentDidUpdate(prevProps: BarChartComponentProps) {
    if (prevProps.vacantes !== this.props.vacantes) {
      this.updateChartData(this.props.vacantes);
    }
  }

  updateChartData(vacantes: VacantePublic[]) {
    const vacantesPerMonth = Array(12).fill(0);
    const realVacantesPerMonth = Array(12).fill(0);
    
    vacantes.forEach((vacante) => {
      const month = vacante.mes - 1; // Subtract 1 because months are 1-12, but array indices are 0-11
      vacantesPerMonth[month]++;
      if (!['Stand By', 'Cobertura Interna', 'Cancelada',null].includes(vacante.estatus_rys)) {
        realVacantesPerMonth[month]++;
      }
    });

    this.setState({
      chartData: [
        {
          name: 'Solicitudes',
          data: vacantesPerMonth,
        },
        {
          name: 'Real',
          data: realVacantesPerMonth,
        },
      ],
    });
  }

  render() {
    return (
      <Box p={4} shadow="md" borderWidth="0.8px" borderRadius="md" ml={4} minW="100px" textAlign="center" mb={8} bg="#FFFFFF">
        <ReactApexChart
          options={this.state.chartOptions}
          series={this.state.chartData}
          type="bar"
          height={300}
          width='100%'
        />
      </Box>
    );
  }
}

export default BarChartComponent;

