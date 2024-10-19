import { Box, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { FinalReturn } from "../../client";

interface FinalReturnDisplayProps {
    finalReturn: FinalReturn;
}

const FinalReturnDisplay: React.FC<FinalReturnDisplayProps> = ({ finalReturn }) => {
    const {
        risk_level,
        investment_term,
        portfolio: {
            objective,
            investment_term_days,
            expected_daily_return,
            expected_daily_risk,
            expected_annual_return,
            expected_annual_risk,
            confidence_level,
            value_at_risk: { daily_var, weekly_var, yearly_var },
        },
    } = finalReturn;

    return (
        <Box p={5}>
            <Heading as="h2" size="lg" mb={5}>Resultados de la optimización de tu inversión</Heading>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <GridItem>
                    <Box p={4} borderWidth={1} borderRadius="lg">
                        <Text fontWeight="bold">Risk Level:</Text>
                        <Text>{Math.round(Number(risk_level) * 100)}%</Text>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box p={4} borderWidth={1} borderRadius="lg">
                        <Text fontWeight="bold">Investment Term:</Text>
                        <Text>{investment_term/365} years</Text>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box p={4} borderWidth={1} borderRadius="lg">
                        <Text fontWeight="bold">Objective:</Text>
                        <Text>{objective}</Text>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box p={4} borderWidth={1} borderRadius="lg">
                        <Text fontWeight="bold">Investment Term Days:</Text>
                        <Text>{investment_term_days} days</Text>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box p={4} borderWidth={1} borderRadius="lg">
                        <Text fontWeight="bold">Expected Daily Return:</Text>
                        <Text>{expected_daily_return}%</Text>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box p={4} borderWidth={1} borderRadius="lg">
                        <Text fontWeight="bold">Expected Daily Risk:</Text>
                        <Text>{expected_daily_risk}%</Text>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box p={4} borderWidth={1} borderRadius="lg">
                        <Text fontWeight="bold">Expected Annual Return:</Text>
                        <Text>{expected_annual_return}%</Text>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box p={4} borderWidth={1} borderRadius="lg">
                        <Text fontWeight="bold">Expected Annual Risk:</Text>
                        <Text>{expected_annual_risk}%</Text>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box p={4} borderWidth={1} borderRadius="lg">
                        <Text fontWeight="bold">Confidence Level:</Text>
                        <Text>{confidence_level*100}%</Text>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box p={4} borderWidth={1} borderRadius="lg">
                        <Text fontWeight="bold">Daily VaR:</Text>
                        <Text>{daily_var}%</Text>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box p={4} borderWidth={1} borderRadius="lg">
                        <Text fontWeight="bold">Weekly VaR:</Text>
                        <Text>{weekly_var}%</Text>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box p={4} borderWidth={1} borderRadius="lg">
                        <Text fontWeight="bold">Yearly VaR:</Text>
                        <Text>{yearly_var}%</Text>
                    </Box>
                </GridItem>
                
            </Grid>
        </Box>
    );
}

export default FinalReturnDisplay;
