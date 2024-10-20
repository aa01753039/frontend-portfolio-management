import { Box, Heading, Td, Table, Thead, Tr, Th, Tbody, Icon, Text } from "@chakra-ui/react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi"; // Import arrow icons
import { FinalReturn } from "../../client";

interface FinalReturnDisplayProps {
  finalReturn: FinalReturn;
}

const AllocationDisplay: React.FC<FinalReturnDisplayProps> = ({ finalReturn }) => {
  const allocation = finalReturn?.portfolio?.allocation || {};
  const historicalData = finalReturn?.portfolio?.historical_data || {};

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
         maxH="350px" overflowY="auto">

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Ticker</Th>
            <Th>Asignación (%)</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(allocation).length > 0 ? (
            Object.entries(allocation).map(([ticker, alloc], index) => {
              const percentageChange = historicalData[ticker]?.percentage_change || 0;

              return (
                <Tr key={index}>
                  <Td>
                    {ticker}{" "}
                    {percentageChange > 0 ? (
                      <Icon as={FiArrowUp} color="green.500" />
                    ) : (
                      <Icon as={FiArrowDown} color="red.500" />
                    )}<Text as="span" fontSize='xs' color={"gray.400"}>{" "}{percentageChange}%</Text>
                  </Td>
                  <Td>{`${alloc}%`}</Td>
                </Tr>
              );
            })
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
