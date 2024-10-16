import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box } from "@chakra-ui/react";
import { VacantePublic } from "../../client";

type TipoDonutProps = {
  vacantes: VacantePublic[];
};

type TipoDonutState = {
  chartData: number[];
  chartOptions: ApexCharts.ApexOptions;
  labels: string[];
};

class TipoDonut extends React.Component<TipoDonutProps, TipoDonutState> {
  constructor(props: TipoDonutProps) {
    super(props);

    this.state = {
      chartData: [],
      chartOptions: {
        chart: {
          type: 'donut',
          
          toolbar: {
            show: true,
          },

        },
        plotOptions: {
          pie: {
            donut: {
              size: '85%'
            }
          }
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
            stops: [50, 0, 100, 50]
          }
        },
        
        dataLabels: {
          enabled: true,
          formatter: function (val: number) {
            return val.toFixed(0) + '%';
          },
          style: {
            fontSize: '14px',
            fontFamily: 'poppins',
            fontWeight: 'bold',
            
          },
        },
        tooltip: {
          enabled: true,
          theme: 'dark',
          style: {
            fontFamily: 'poppins',
          },
          y: {
            formatter: function (val: number) {
              return val.toFixed(0) + '%';
            },
          },
        },
        legend: {
          position: 'bottom',
          fontSize: '14px',
          fontWeight: 'bold',
          fontFamily: 'poppins',
        },
        colors: [ '#C78FB8', '#78256F', ], // New color palette
      },
      labels: [],
    };
  }

  componentDidMount() {
    this.updateChartData(this.props.vacantes);
  }

  componentDidUpdate(prevProps: TipoDonutProps) {
    if (prevProps.vacantes !== this.props.vacantes) {
      this.updateChartData(this.props.vacantes);
    }
  }

  updateChartData(vacantes: VacantePublic[]) {
    const tipoVacanteCounts: { [key: string]: number } = {};
    let totalVacantes = 0;

    vacantes.forEach((vacante) => {
      const tipo = vacante.tipo_vacante;
      if (tipo) {
        tipoVacanteCounts[tipo] = (tipoVacanteCounts[tipo] || 0) + 1;
        totalVacantes++;
      }
    });

    const labels = Object.keys(tipoVacanteCounts);
    const data = Object.values(tipoVacanteCounts).map(count => (count / totalVacantes) * 100);

    this.setState({
      chartData: data,
      labels: labels,
    });
  }

  render() {
    return (
      <Box p={4} shadow="md" borderWidth="0.8px" borderRadius="md" ml={4} minW="100px" textAlign="center" mb={8} bg="#FFFFFF">
        <ReactApexChart
          options={{ ...this.state.chartOptions, labels: this.state.labels }}
          series={this.state.chartData}
          type="donut"
          height={350}
          width='100%'
        />
      </Box>
    );
  }
}

export default TipoDonut;

