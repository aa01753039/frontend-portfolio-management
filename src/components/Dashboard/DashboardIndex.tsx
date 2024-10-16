import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { VacantePublic, UserPublic } from "../../client";
import CoberturaRadialBar from "./CoberturaRadialBar";
import StatComponent from "./StatComponent";
import VacantesMensualBarChart from "./VacantesMensualBarChart";
import TableComponent from "./TableComponent";
import PosicionSimpleTable from "./PosicionSimpleTable";
import TipoDonut from "./TipoDonut";
import TableReclutadores from "./TableReclutadores";
import { PiUsersFour, PiUsersFourFill, PiUser, PiCalendar, PiFolderOpen } from "react-icons/pi";
import { calculateBusinessDays } from "../../utils";

const DashboardIndex = ({ vacantes, currentUser }: { vacantes: VacantePublic[], currentUser: UserPublic }) => {

  const myVacantesCount = vacantes.filter(vacante => {
    if (currentUser.user_type === 'BP') {
      return vacante.id_bp === currentUser.id;
    } else if (currentUser.user_type === 'Reclutador') {
      return vacante.id_reclutador === currentUser.id;
    } else if (currentUser.is_superuser) {
      return (vacante.id_bp === currentUser.id) || (vacante.id_reclutador) === currentUser.id;
    }
    return false;
  });

  const getVacantesCountForMonths = (vacantes: VacantePublic[], month: number, year: number) => {
    return vacantes.filter(vacante => {
      return month === (vacante.mes) && vacante.anio === year;
    }).length;
  };

  const calculateVacantesTrend = (vacantes: VacantePublic[]) => {
    
    // get the max date from the vacantes in the fecha field
    const currentDate = new Date(Math.max(...vacantes.map(vacante => new Date(vacante.fecha).getTime())));
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    // substract a month from the currentDate
    const lastDate = currentDate.setMonth(currentDate.getMonth() - 1);
    const lastMonth = new Date(lastDate).getMonth() + 1;
    const lastYear = new Date(lastDate).getFullYear();

    const currentMonthCount = getVacantesCountForMonths(vacantes, currentMonth, currentYear);
    const lastMonthCount = getVacantesCountForMonths(vacantes, lastMonth, lastYear);

    const difference = currentMonthCount - lastMonthCount;
    const isUpwardsTrend = difference > 0;

    return {
      currentMonthCount,
      lastMonthCount,
      difference,
      isUpwardsTrend,
    };
  };


  const myVacantesTrend = calculateVacantesTrend(myVacantesCount);
  const filteredVacantesTrend = calculateVacantesTrend(vacantes);
  const pctCobertura = ({ vacantes }: { vacantes: any[] }) => {
    const getEstatus = (estatus: string) => {
      switch (estatus) {
        case 'Acuerdo de servicio':
        case 'Publicación de vacante':
        case 'Búsqueda de candidatos':
        case 'Entrevistas RYS':
        case 'En pruebas Psicométricas':
        case 'Entrevista Cliente':
        case 'En Prueba técnica':
        case 'Panel':
          return 'abierto';
        case 'Oferta económica':
        case 'Entrega de documentos y firma de propuesta':
          return 'propuesta';
        case 'Contratad@':
          return 'ingreso';
        case 'Stand By':
          return 'stand by';
        case 'Cobertura Interna':
          return 'cobertura interna';
        case 'Cancelada':
          return 'cancelaciones';
          case 'Reinicio':
            return 'reinicio';
        default:
          return 'N/A';
      }
    };

    let abiertoCount = 0;
    let propuestaCount = 0;
    let ingresoCount = 0;

    vacantes.forEach(vacante => {
      const status = getEstatus(vacante.estatus_rys);
      if (status === 'abierto') {
        abiertoCount += 1;
      } else if (status === 'propuesta') {
        propuestaCount += 1;
      } else if (status === 'ingreso') {
        ingresoCount += 1;
      }
    });

    const total = abiertoCount + ingresoCount + propuestaCount;
    const coverage = ingresoCount + propuestaCount;
    const coveragePercentage = total ? (coverage / total) * 100 : 0;
    const coveragePercentageRounded = coveragePercentage.toFixed(0) + '%';

    return {
      total,
      coverage,
      coveragePercentageRounded,
      abiertoCount,
    };
  };

  const cobertura = pctCobertura({ vacantes: vacantes });

  const businessDays = (vacante: any) => {
    const currentDate = new Date();
    if (vacante?.fecha_ingreso) {
      const fechaInicio = new Date(vacante.fecha_ingreso);
      if (fechaInicio > currentDate) {
        return vacante?.fecha_solicitud_vacante ? calculateBusinessDays(new Date(vacante.fecha_solicitud_vacante), currentDate) : 0;
      } else if (fechaInicio < currentDate) {
        return vacante?.fecha_solicitud_vacante ? calculateBusinessDays(new Date(vacante.fecha_solicitud_vacante), fechaInicio) : 0;
      }
    }
    return vacante?.fecha_solicitud_vacante ? calculateBusinessDays(new Date(vacante.fecha_solicitud_vacante), currentDate) : 0
  };

  const avgBusinessDays = (vacantes: any[]) => {
    const businessDaysArray = vacantes.map(vacante => businessDays(vacante));
    const totalBusinessDays = businessDaysArray.reduce((total, days) => total + days, 0);
    const avgBusinessDays = businessDaysArray.length > 0 ? totalBusinessDays / businessDaysArray.length : 0;
    const maxBusinessDays = businessDaysArray.length > 0 ? Math.max(...businessDaysArray) : 0;
    const minBusinessDays = businessDaysArray.length > 0 ? Math.min(...businessDaysArray) : 0;

    return {
      avg: avgBusinessDays,
      max: maxBusinessDays,
      min: minBusinessDays
    };
  };
  
  const averageBusinessDays = avgBusinessDays(vacantes).avg.toFixed(0);
  const maxBusinessDays = avgBusinessDays(vacantes).max.toString();

  const dataStats = [
    {
      icon: PiUser,
      label: 'Mis vacantes',
      value: myVacantesCount.length.toString(),
      delta: { value: myVacantesTrend.difference.toString(), isUpwardsTrend: myVacantesTrend.isUpwardsTrend },
      progress: { value: myVacantesCount.length, limit: vacantes.length },
      info: `${((Number(myVacantesCount.length) / Number(vacantes.length)) * 100).toFixed(0)}% del total`,
    },
    {
      icon: PiUsersFour,
      label: 'Vacantes Totales',
      value: vacantes.length.toString(),
      delta: { value: `${filteredVacantesTrend.difference}`, isUpwardsTrend: filteredVacantesTrend.isUpwardsTrend },
      progress: { value: null, limit: null },
      info: '* Incluye todas las vacantes registradas',
    },
    {
      icon: PiUsersFourFill,
      label: 'Cobertura',
      value: cobertura.coveragePercentageRounded,
      delta: { value: null, isUpwardsTrend: null },
      progress: { value: cobertura.coverage, limit: cobertura.total },
      info: ` ${cobertura.coverage} de ${cobertura.total} vacantes reales`,
    },
    {
      icon: PiCalendar,
      label: 'Días prom. de cobertura',
      value: averageBusinessDays ,
      delta: { value: null, isUpwardsTrend: null },
      progress: { value: null, limit: null },
      info: ` Máxima: ${maxBusinessDays} días `,
    },
    {
      icon: PiFolderOpen,
      label: 'Pendientes por cubrir',
      value: cobertura.abiertoCount.toString() ,
      delta: { value: null, isUpwardsTrend: null },
      progress: { value: cobertura.abiertoCount, limit: cobertura.total },
      info: null,
    },
  ];

return (
    <Flex flexDirection='column' pt={{ base: "5px", md: "5px" }}>
      
      <StatComponent data={dataStats} />
      <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={1}>
      <GridItem colSpan={{ base: 1, sm: 2, md: 2, lg: 1, xl: 1, "2xl": 1 }}>
    <PosicionSimpleTable vacantes={vacantes} />
  </GridItem>

  <GridItem colSpan={{ base: 1, sm: 2, md: 2, lg: 2, xl: 2, "2xl": 2 }}>
    <TableComponent vacantes={vacantes} />
  </GridItem>

  <GridItem colSpan={{ base: 1, sm: 2, md: 2, lg: 2, xl: 2, "2xl": 2 }}>
    <VacantesMensualBarChart vacantes={vacantes} />
  </GridItem>

  <GridItem colSpan={{ base: 1, sm: 1, md: 1, lg: 1, xl: 1, "2xl": 1 }}>
    <TipoDonut vacantes={vacantes} />
  </GridItem>

  <GridItem colSpan={{ base: 1, sm: 2, md: 2, lg: 2, xl: 2, "2xl": 3 }}>
    <TableReclutadores vacantes={vacantes} />
  </GridItem>

  <GridItem colSpan={{ base: 1, sm: 1, md: 1, lg: 1, xl: 1, "2xl": 1 }}>
    <CoberturaRadialBar vacantes={vacantes} />
  </GridItem>
</Grid>

    </Flex>
  );
};
export default DashboardIndex;