// index.tsx
import { Box, Container, Text, Spinner } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import {  useState } from "react";

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
});

function Dashboard() {


  const [loading, setLoading] = useState(true);

 
  return (
    <>
      <Container maxW="80%">
        
        {loading ? (
          <Box textAlign="center" p={8}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="ui.main"
              size="xl"
            />
          </Box>
        ) : (
          <>
            <Text fontSize="2xl" fontWeight="semibold" mb={4}>
              Dashboard
            </Text>
            <Text fontSize="lg" fontWeight="medium">
              Welcome to the dashboard
            </Text>
          </>
        )}
      </Container>
    </>
  );
}

export default Dashboard;
