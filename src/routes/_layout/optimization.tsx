// optimization.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useContext } from "react";
import { DataContext } from "../../DataProvider";
import FinalReturnDisplay from "../../components/Portfolio/FinalReturnDisplay";
import AllocationDisplay from "../../components/Portfolio/AllocationDisplay";
// Define the route with the state type
export const Route = createFileRoute("/_layout/optimization")({
    component: Optimization,
    // Optionally, you can define the state type here if needed
});

function Optimization() {
    const { responseData } = useContext(DataContext);

    console.log("Received data:", responseData);

    return (
        <>
            {responseData ? (

                <>
                <FinalReturnDisplay finalReturn={responseData} />
                <AllocationDisplay finalReturn={responseData} />
                </>
            ) : (
                <p>No data available.</p>
            )}
        </>
    );
}

export default Optimization;
