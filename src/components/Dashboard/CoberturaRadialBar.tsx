import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Text } from "@chakra-ui/react";
import { VacantePublic } from "../../client";
import { calculateBusinessDays } from '../../utils';

type RadialBarChartComponentProps = {
  vacantes: VacantePublic[];
};

type RadialBarChartComponentState = {
  series: number[];
  chartOptions: ApexCharts.ApexOptions;
  totalCount: number;
};

class RadialBarChartComponent extends React.Component<RadialBarChartComponentProps, RadialBarChartComponentState> {
  constructor(props: RadialBarChartComponentProps) {
    super(props);

    this.state = {
      series: [],
      totalCount: 0,
      chartOptions: {
        chart: {
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: '22px',
                fontFamily: 'poppins',
              },
              value: {
                fontSize: '16px',
                fontFamily: 'poppins',
                formatter: function (val: any) {
                  return Number(val).toFixed(0) + '%';
                }
              },
              total: {
                show: true,
                label: 'Vacantes',
                formatter: () => {
                  // Use the totalCount from the component state
                  return this.state.totalCount.toString();
                },
                color: '#000',
                fontFamily: 'poppins',
              }
            }
          }
        },
        labels: [],
        colors: ['#98FF98', '#FFDD44', '#FF4560'], // Green, Yellow, Red
        legend: {
          show: false,
          position: 'bottom',
        },
        title: {
          text: 'Semáforo de Cobertura',
          align: 'left',
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            fontFamily: 'poppins',
          },
        },
      },
    };
  }

  componentDidMount() {
    this.updateChartData(this.props.vacantes);
  }

  componentDidUpdate(prevProps: RadialBarChartComponentProps) {
    if (prevProps.vacantes !== this.props.vacantes) {
      this.updateChartData(this.props.vacantes);
    }
  }

  getCoberturaColor = (days: number) => {
    if (days > 41) return 'Rojo';
    if (days > 20 && days <= 40) return 'Amarillo';
    return 'Verde';
  };

  // Updated businessDays method to use calculateBusinessDays
  businessDays = (vacante: VacantePublic) => {
    const currentDate = new Date();
    if (vacante?.fecha_ingreso) {
      const fechaInicio = new Date(vacante.fecha_ingreso);
      if (fechaInicio > currentDate) {
        return vacante?.fecha_solicitud_vacante
          ? calculateBusinessDays(new Date(vacante.fecha_solicitud_vacante), currentDate)
          : 0;
      } else if (fechaInicio < currentDate) {
        return vacante?.fecha_solicitud_vacante
          ? calculateBusinessDays(new Date(vacante.fecha_solicitud_vacante), fechaInicio)
          : 0;
      }
    }
    return vacante?.fecha_solicitud_vacante
      ? calculateBusinessDays(new Date(vacante.fecha_solicitud_vacante), currentDate)
      : 0;
  };

  updateChartData(vacantes: VacantePublic[]) {
    const categoryCounts: { [key: string]: number } = {
      'Verde': 0,
      'Amarillo': 0,
      'Rojo': 0,
    };

    vacantes.forEach((vacante) => {
      if (!['Stand By', 'Cobertura Interna', 'Cancelada',null].includes(vacante.estatus_rys)) {
        const days = this.businessDays(vacante);
        const category = this.getCoberturaColor(days);
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      }
    });  
    //   vacantes.forEach((vacante) => {
    //   const days = this.businessDays(vacante);
    //   const category = this.getCoberturaColor(days);
    //   categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    // });

    const total = Object.values(categoryCounts).reduce((acc, count) => acc + count, 0);
    const labels = Object.keys(categoryCounts);
    const data = Object.values(categoryCounts).map(count => (count / total) * 100);

    this.setState({
      series: data,
      totalCount: total,
      chartOptions: {
        ...this.state.chartOptions,
        labels: labels,
        colors: ['#32CD32', '#FFD700', '#DC143C'], // Green, Yellow, Red
      },
    });
  }

  render() {
    return (
      <Box p={4} shadow="md" borderWidth="0.8px" borderRadius="md" ml={4} minW="100px" textAlign="center" mb={8} bg="#FFFFFF">
        <ReactApexChart
          options={this.state.chartOptions}
          series={this.state.series}
          type="radialBar"
          height={350}
          width='100%'
        />
        <Text mt={0} fontSize="sm" color="gray.500">
        <span >Verde: 1-20 días</span> 
        </Text>
        <Text mt={1} fontSize="sm" color="gray.500">
  <span >Amarillo: 21-40 días</span>
        </Text>
        <Text mt={1} fontSize="sm" color="gray.500">
<span >Rojo: &gt;41 días</span>
        </Text>
      </Box>
    );
  }
}

export default RadialBarChartComponent;



