import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box } from "@chakra-ui/react";
import { VacantePublic } from "../../client";

type StackedBarChartComponentProps = {
    vacantes: VacantePublic[];
};

type StackedBarChartComponentState = {
    chartData: {
        name: string;
        data: number[];
    }[];
    chartOptions: ApexCharts.ApexOptions;
};

class StackedBarChartComponent extends React.Component<StackedBarChartComponentProps, StackedBarChartComponentState> {
    constructor(props: StackedBarChartComponentProps) {
        super(props);

        this.state = {
            chartData: [],
            chartOptions: {
                chart: {
                    type: 'bar',
                    stacked: true,
                    height: 350,
                    width: '100%',
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        borderRadius: 3,
                        barHeight: '100%', // Make bars thicker
                        borderRadiusWhenStacked: 'last' 
                    },

                },
                stroke: {
                    width: 1,
                    colors: ['#fff']
                },
                xaxis: {
                    categories: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                    labels: {
                        
                        style: {
                            fontSize: '12px',
                            fontFamily: 'poppins',
                        },
                    },
                    title: {
                        text: 'Vacantes',
                        style: {
                            fontSize: '14px',
                            fontFamily: 'poppins',
                        }
                    },
                    axisBorder: {
                        show: true,
                        color: '#78909C',
                        
                        offsetX: 0,
                        offsetY: 0
                    },
                    axisTicks: {
                        show: true,
                        borderType: 'solid',
                        color: '#78909C',
                        height: 6,
                        offsetX: 0,
                        offsetY: 0
                    }
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
                    style: {
                        
                        fontFamily: 'poppins',
                    }, 

                },
                legend: {
                    position: 'bottom',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    fontFamily: 'poppins',
                },
                title: {
                    text: 'Reclutadores por Mes',
                    align: 'left',
                    style: {
                      fontSize: '16px',
                      fontWeight: 'bold',
                      fontFamily: 'poppins',
                    //  fontFamily: 'raleway sans-serif',
                    },
                },
                grid: {
                    show: true, // Show vertical grid lines
                    xaxis: {
                        lines: {
                            show: true
                        }
                    },
                    yaxis: {
                        lines: {
                            show: false
                        }
                    }
                },
                
                fill: {
                    type: 'gradient',
                    gradient: {
                      shade: 'light',
                      type: 'vertical',
                      shadeIntensity: 0.25,
                      gradientToColors: undefined,
                      inverseColors: true,
                      opacityFrom: 1,
                      opacityTo: 1,
                      stops: [50, 0, 100, 100]
                    }
                },
                colors: ['#324C76', '#466A9C', '#5A88C2', '#7AA7DD', '#9BC5F8', '#ABCFFF'], // New color palette
            },
        };
    }

    componentDidMount() {
        this.updateChartData(this.props.vacantes);
    }

    componentDidUpdate(prevProps: StackedBarChartComponentProps) {
        if (prevProps.vacantes !== this.props.vacantes) {
            this.updateChartData(this.props.vacantes);
        }
    }

    updateChartData(vacantes: VacantePublic[]) {
        const reclutadores: { [key: string]: number[] } = {};

        vacantes.forEach(vacante => {
            const reclutador = vacante.nombre_reclutador || 'No asignada';
            const month = vacante.mes; // 1-based index for months

            if (!reclutadores[reclutador]) {
                reclutadores[reclutador] = Array(12).fill(0);
            }
            reclutadores[reclutador][month - 1]++;
        });

        const series = Object.keys(reclutadores).map(reclutador => ({
            name: reclutador,
            data: reclutadores[reclutador]
        }));

        this.setState({ chartData: series });
    }

    render() {
        return (
            <Box p={4} shadow="md" borderWidth="0.8px" borderRadius="md" ml={4} minW="100px" textAlign="center" mb={8} bg="#FFFFFF" >
                <ReactApexChart
                    options={this.state.chartOptions}
                    series={this.state.chartData}
                    type="bar"
                    height={350}
                    width='100%'
                />
            </Box>
        );
    }
}

export default StackedBarChartComponent;

