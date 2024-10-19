import { Box, Heading, Td, Table, Thead, Tr, Th, Tbody } from "@chakra-ui/react";
import { FinalReturn } from "../../client";

interface FinalReturnDisplayProps {
  finalReturn: FinalReturn;
}

const AllocationDisplay: React.FC<FinalReturnDisplayProps> = ({ finalReturn }) => {
  const allocation = finalReturn?.portfolio?.allocation || {};

  return (
    <Box p={5}>
      <Heading as="h3" size="md" mt={10} mb={5}>
        Asignación de activos
      </Heading>
      <Box
        border="0.5px solid"
        borderColor="gray.300"
        borderRadius="lg" // Redondea las esquinas del contenedor de la tabla
        overflow="hidden" // Asegura que la tabla se ajuste al contorno curvo
      >
      <Table variant="simple" 

    >
        <Thead>
          <Tr>
            <Th>Ticker</Th>
            <Th>Asignación (%)</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(allocation).length > 0 ? (
            Object.entries(allocation).map(([ticker, alloc], index) => (
              <Tr key={index}>
                <Td>{ticker}</Td>
                <Td>{`${alloc}%`}</Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={2}>No allocation data available</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
      </Box>
    </Box>
  );
};

export default AllocationDisplay;
