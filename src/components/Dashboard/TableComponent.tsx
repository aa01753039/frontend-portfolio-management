import { Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";
import { VacantePublic } from "../../client";

const TableComponent = ({ vacantes }: { vacantes: VacantePublic[] }) => {
  // Group vacantes by dir_corp and count the number of vacantes for each dir_corp
  const dirCorpVacantesCount = vacantes.reduce((acc, vacante) => {
  const dirCorp = vacante.dir_corp || "N/A";
  if (!acc[dirCorp]) {
    acc[dirCorp] = { count: 0, real: 0, cubierto: 0 };
  }
  acc[dirCorp].count++;
  if (!['Stand By', 'Cobertura Interna', 'Cancelada',null].includes(vacante.estatus_rys)) {
    acc[dirCorp].real++;
  }
  switch (vacante.estatus_rys) {
    // case 'Acuerdo de servicio':
    // case 'Publicación de vacante':
    // case 'Búsqueda de candidatos':
    // case 'Entrevistas RYS':
    // case 'En pruebas Psicométricas':
    // case 'Entrevista Cliente':
    // case 'En Prueba técnica':
    // case 'Panel':
    // case 'Oferta económica':
    case 'Contratad@':
    case 'Entrega de documentos y firma de propuesta':
      acc[dirCorp].cubierto++;
      break;
  }
  return acc;
}, {} as Record<string, { count: number, real: number, cubierto: number }>);

// Convert the summary object to an array for rendering
const summaryData = Object.entries(dirCorpVacantesCount).map(([dirCorp, { count, real, cubierto }]) => ({
  dirCorp,
  count,
  real,
  cubierto,
}));

  return (
    <Box p={6} shadow="md" borderWidth="0.8px" borderRadius="md" ml={4} minW="100px" textAlign="center" bg="#FFFFFF">
      <Box maxH="300px" overflowY="auto">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th color={"black"}>Negocio</Th>
              <Th color={"black"}>Solicitudes</Th>
              <Th color={"black"}>Real</Th>
              <Th color={"black"}>Cobertura</Th>

            </Tr>
          </Thead>
          <Tbody>
            {summaryData.map(({ dirCorp, count, real, cubierto }) => (
              <Tr key={dirCorp}>
                <Td>{dirCorp.charAt(0).toUpperCase() + dirCorp.slice(1).toLowerCase()}</Td>
                <Td>{count}</Td>
                <Td>{real}</Td>
                <Td>{(( cubierto / real) * 100).toFixed(0)}%</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default TableComponent;


