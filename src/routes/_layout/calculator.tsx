import { Box, Container, Text } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import OptimizationInput from "../../components/Portfolio/OptimizationInput";

// Define the route with the state type
export const Route = createFileRoute("/_layout/calculator")({
    component: Calculator,
    // Optionally, you can define the state type here if needed
});

function Calculator() {
    
    return (
        <>
          <Container maxW="80%">
    
              <>
                <Text fontSize="2xl" fontWeight="semibold" mb={4}>
                  Creación de un portafolio de inversión
                </Text>
                <Text fontSize="lg" fontWeight="medium">
                  Ingresa los valores para obtener una recomendación de portafolio.
                </Text>
              </>
              <br />
    
            <Box  p={4} shadow="md" borderWidth="0.8px" borderRadius="md"   mb={4} bg="#FFFFFF">
              <OptimizationInput />
            </Box>
      
          </Container>
        </>
      );
    }


export default Calculator;
