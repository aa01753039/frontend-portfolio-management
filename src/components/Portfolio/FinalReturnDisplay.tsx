import { Box, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { FinalReturn } from "../../client";

interface FinalReturnDisplayProps {
    finalReturn: FinalReturn;
}

const FinalReturnDisplay: React.FC<FinalReturnDisplayProps> = ({ finalReturn }) => {
    const {
        risk_level,
     
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
                        <Text fontWeight="bold">Tu nivel de Riesgo:</Text>
                        <Text>{Math.round(Number(risk_level) * 100)}%</Text>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box p={4} borderWidth={1} borderRadius="lg">
                        <Text fontWeight="bold">Plazo de Inversión:</Text>
                        <Text>{investment_term_days / 365} años</Text>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box p={4} borderWidth={1} borderRadius="lg">
                        <Text fontWeight="bold">Objetivo:</Text>
                        <Text>{objective}</Text>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box p={4} borderWidth={1} borderRadius="lg">
                        <Text fontWeight="bold">Días de Inversión:</Text>
                        <Text>{investment_term_days} días</Text>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box p={4} borderWidth={1} borderRadius="lg">
                        <Text fontWeight="bold">Retorno Diario Esperado:</Text>
                        <Text>{expected_daily_return}%</Text>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box p={4} borderWidth={1} borderRadius="lg">
                        <Text fontWeight="bold">Riesgo Diario Esperado:</Text>
                        <Text>{expected_daily_risk}%</Text>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box p={4} borderWidth={1} borderRadius="lg">
                        <Text fontWeight="bold">Retorno Anual Esperado:</Text>
                        <Text>{expected_annual_return}%</Text>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box p={4} borderWidth={1} borderRadius="lg">
                        <Text fontWeight="bold">Riesgo Anual Esperado:</Text>
                        <Text>{expected_annual_risk}%</Text>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box p={4} borderWidth={1} borderRadius="lg">
                        <Text fontWeight="bold">Nivel de Confianza (VaR):</Text>
                        <Text>{confidence_level * 100}%</Text>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box p={4} borderWidth={1} borderRadius="lg">
                        <Text fontWeight="bold">VaR Diario:</Text>
                        <Text>{daily_var}%</Text>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box p={4} borderWidth={1} borderRadius="lg">
                        <Text fontWeight="bold">VaR Semanal:</Text>
                        <Text>{weekly_var}%</Text>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box p={4} borderWidth={1} borderRadius="lg">
                        <Text fontWeight="bold">VaR Anual:</Text>
                        <Text>{yearly_var}%</Text>
                    </Box>
                </GridItem>
            </Grid>
        </Box>
    );
}

export default FinalReturnDisplay;
