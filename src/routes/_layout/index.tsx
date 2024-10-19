// index.tsx
import { Box, Container, Text } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import MultipleChoiceQuestionnaire from "../../components/Portfolio/MultipleChoiceQuestionnaire";

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
});

function Dashboard() {

 
  return (
    <>
      <Container maxW="80%">

          <>
            <Text fontSize="2xl" fontWeight="semibold" mb={4}>
              Creación de un portafolio de inversión
            </Text>
            <Text fontSize="lg" fontWeight="medium">
              Contesta las preguntas para obtener una recomendación de portafolio.
            </Text>
          </>
          <br />

        <Box  p={4} shadow="md" borderWidth="0.8px" borderRadius="md"   mb={4} bg="#FFFFFF">
          <MultipleChoiceQuestionnaire />
        </Box>
  
      </Container>
    </>
  );
}

export default Dashboard;
