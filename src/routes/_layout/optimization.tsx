import { createFileRoute } from "@tanstack/react-router";
import { useContext } from "react";
import { DataContext } from "../../DataProvider";
import FinalReturnDisplay from "../../components/Portfolio/FinalReturnDisplay";
import AllocationDisplay from "../../components/Portfolio/AllocationDisplay";
import LineChartComponent from "../../components/Portfolio/LineChartComponent";
import HeatmapComponent from "../../components/Portfolio/HeatmapComponent";
import { Container, Grid, GridItem, Button } from "@chakra-ui/react";
import { useNavigate } from "@tanstack/react-router";
import { IoReload } from "react-icons/io5";


// Define the route with the state type
export const Route = createFileRoute("/_layout/optimization")({
    component: Optimization,
    // Optionally, you can define the state type here if needed
});

function Optimization() {
    const { responseData } = useContext(DataContext);
    const navigate = useNavigate(); // Initialize the navigate hook

    const handleRedirect = () => {
        navigate({ to: "/" }); // Redirect to the index route
    };

    console.log("Received data:", responseData);

    return (
        <Container maxW="80%">
            {responseData ? (
                <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                    {/* First Row: Two Components Side by Side */}
                    <GridItem w="100%">
                        <FinalReturnDisplay finalReturn={responseData} />
                    </GridItem>
                    <GridItem w="100%">
                        <AllocationDisplay finalReturn={responseData} />
                        {/* Place HeatmapComponent directly below AllocationDisplay in the same column */}
                        <HeatmapComponent historicalData={responseData.portfolio.historical_data} />
                    </GridItem>

                    {/* Second Row: Line Chart Below Both Columns */}
                    <GridItem colSpan={2}>
                        <LineChartComponent historicalData={responseData.portfolio.historical_data} />
                    </GridItem>
                </Grid>
            ) : (
              
                    
                    <Button leftIcon={<IoReload/>} colorScheme="green" mt={4} onClick={handleRedirect}>
                        Crear otro portafolio
                    </Button>
               
            )}
        </Container>
    );
}

export default Optimization;
