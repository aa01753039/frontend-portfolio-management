import { Table, Thead, Tbody, Tr, Th, Td, Box,  Text, Link } from "@chakra-ui/react";
import { useNavigate } from '@tanstack/react-router';
import { VacantePublic } from "../../client";


const PosicionSimpleTable = ({ vacantes }: { vacantes: VacantePublic[] }) => {

  const navigate = useNavigate();

  const handleIdPosicionClick = (id: string) => {
    navigate({
      to: `/posicion/${id}`,
      params: { id },
    });
  };

  

  return (
    <Box p={6} shadow="md" borderWidth="0.8px" borderRadius="md" ml={4} minW="100px" textAlign="center" bg="#FFFFFF">
      <Box maxH="300px" overflowY="auto">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th color={"black"}>Posición</Th>
            </Tr>
          </Thead>
          <Tbody>
            {vacantes.map(vacante => (
            <Tr key={vacante.id}>
            <Td >
            <Link onClick={() => handleIdPosicionClick(vacante.id || '')} display="block">
            <Text color={"ui.orange"}><strong>{vacante.id_pos}</strong></Text>
            <Text color={"gray.500"}>{vacante.deno_pos}</Text>
            </Link>
            </Td>
            
            </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  </Box>
);
};

export default PosicionSimpleTable;