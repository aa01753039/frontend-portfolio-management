import { Table, Thead, Tbody, Tr, Th, Td, Box,Tooltip } from "@chakra-ui/react";
import { VacantePublic } from "../../client";

const TableReclutadores = ({ vacantes }: { vacantes: VacantePublic[] }) => {
  // Group vacantes by id_reclutador and count the number of vacantes for each mes
  const reclutadoresVacantes = vacantes.reduce((acc, vacante) => {
    const idReclutador = vacante.id_reclutador || "N/A";
    const mes = vacante.mes;

    if (!acc[idReclutador]) {
        acc[idReclutador] = { nombre: vacante.nombre_reclutador ?? "N/A",email: vacante.email_reclutador ?? "N/A", Enero: 0, Febrero: 0, Marzo: 0, Abril: 0, Mayo: 0, Junio: 0, Julio: 0, Agosto: 0, Septiembre: 0, Octubre: 0, Noviembre: 0, Diciembre: 0, Total: 0 };
    }

    switch (mes) {
      case 1:
        acc[idReclutador].Enero++;
        break;
      case 2:
        acc[idReclutador].Febrero++;
        break;
      case 3:
        acc[idReclutador].Marzo++;
        break;
      case 4:
        acc[idReclutador].Abril++;
        break;
      case 5:
        acc[idReclutador].Mayo++;
        break;
      case 6:
        acc[idReclutador].Junio++;
        break;
      case 7:
        acc[idReclutador].Julio++;
        break;
      case 8:
        acc[idReclutador].Agosto++;
        break;
      case 9:
        acc[idReclutador].Septiembre++;
        break;
      case 10:
        acc[idReclutador].Octubre++;
        break;
      case 11:
        acc[idReclutador].Noviembre++;
        break;
      case 12:
        acc[idReclutador].Diciembre++;
        break;
    }

    acc[idReclutador].Total++;
    return acc;
  }, {} as Record<string, { nombre: string,email:string, Enero: number, Febrero: number, Marzo: number, Abril: number, Mayo: number, Junio: number, Julio: number, Agosto: number, Septiembre: number, Octubre: number, Noviembre: number, Diciembre: number, Total: number }>);

  // Convert the summary object to an array for rendering
  const summaryData = Object.entries(reclutadoresVacantes).map(([idReclutador, data]) => ({
    idReclutador,
    ...data
  }));

  // Sort the summary data by Total in descending order
  summaryData.sort((a, b) => b.Total - a.Total);

  return (
    <Box p={6} shadow="md" borderWidth="0.8px" borderRadius="md" ml={4} minW="100px" textAlign="center" bg="#FFFFFF">
      <Box maxH="300px" overflowY="auto">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th color={"black"}>Reclutador</Th>
              <Th color={"black"}>Total</Th>
              <Th color={"black"}>Enero</Th>
              <Th color={"black"}>Febrero</Th>
              <Th color={"black"}>Marzo</Th>
              <Th color={"black"}>Abril</Th>
              <Th color={"black"}>Mayo</Th>
              <Th color={"black"}>Junio</Th>
              <Th color={"black"}>Julio</Th>
              <Th color={"black"}>Agosto</Th>
              <Th color={"black"}>Septiembre</Th>
              <Th color={"black"}>Octubre</Th>
              <Th color={"black"}>Noviembre</Th>
              <Th color={"black"}>Diciembre</Th>
              
            </Tr>
          </Thead>
          <Tbody>
            {summaryData.map(({ idReclutador, nombre,email, Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio, Agosto, Septiembre, Octubre, Noviembre, Diciembre, Total }) => (
              <Tr key={idReclutador}>
                <Td>
                  <Tooltip label={email} aria-label="nombre">
                    <Box as="span" color="ui.main">{nombre}</Box>
                  </Tooltip>
                </Td>
                <Td>{Total}</Td>
                <Td>{Enero}</Td>
                <Td>{Febrero}</Td>
                <Td>{Marzo}</Td>
                <Td>{Abril}</Td>
                <Td>{Mayo}</Td>
                <Td>{Junio}</Td>
                <Td>{Julio}</Td>
                <Td>{Agosto}</Td>
                <Td>{Septiembre}</Td>
                <Td>{Octubre}</Td>
                <Td>{Noviembre}</Td>
                <Td>{Diciembre}</Td>
                
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default TableReclutadores;
