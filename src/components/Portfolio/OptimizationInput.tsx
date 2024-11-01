import { Box, Radio, RadioGroup, Stack, Text, Button, Divider, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";
import { useState, useContext } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  PortfolioCalculator,
  FinalReturn,
} from "../../client/models";
import { PortfolioService } from "../../client/services";
import { DataContext } from "../../DataProvider";

const OptimizationInput = () => {
  const [investmentTerm, setInvestmentTerm] = useState<number | "">("");
  const [riskLimit, setRiskLimit] = useState<number | "">("");
  const [targetReturn, setTargetReturn] = useState<number | "">("");
  const [choice, setChoice] = useState<"riskTolerance" | "expectedReturn">("riskTolerance");

  const navigate = useNavigate();
  const { setResponseData } = useContext(DataContext);

  const handleSubmit = async () => {
    const requestBody: PortfolioCalculator = {
      // Convert investmentTerm from years to days
      investment_term: typeof investmentTerm === "number" ? investmentTerm * 365 : 0,
      risk_limit: choice === "riskTolerance" ? (riskLimit as number) / 100 : undefined,
      target_return: choice === "expectedReturn" ? (targetReturn as number) / 100 : undefined,
    };
  
    try {
      const response: FinalReturn = await PortfolioService.createCalculator({ requestBody });
      // Store the response data in context
      setResponseData(response);
  
      // Redirect to the new layout
      navigate({ to: "/optimization" });
    } catch (error: any) {
      if (error.response && (error.response.status === 400 || error.response.status === 422)) {
        // Display custom message for 400 or 422 errors
        alert("No se puede optimizar un portafolio con esas características");
      } else {
        console.error("Error submitting questionnaire:", error);
      }
    }
  };
  

  return (
    <Box p={5}>
      {/* Input for Investment Term in Years */}
     

      {/* Radio Group for Selecting Risk Tolerance or Expected Return */}
      <Text fontSize="lg" mb={2}>Selecciona tu estrategia:</Text>
      <RadioGroup onChange={(value) => setChoice(value as "riskTolerance" | "expectedReturn")} value={choice} >
        <Stack direction="row">
          <Radio colorScheme='green' value="riskTolerance">Tolerancia al Riesgo</Radio>
          <Radio colorScheme='green' value="expectedReturn">Retorno Esperado</Radio>
        </Stack>
      </RadioGroup>

      {/* Conditional Inputs Based on Choice */}
      {choice === "riskTolerance" && (
        <Box mt={5}>
          <Text>Tolerancia al Riesgo (%)</Text>
          <Slider colorScheme='green'
            value={typeof riskLimit === "number" ? riskLimit : 0}
            onChange={(val) => setRiskLimit(val)}
            min={0}
            max={100}
            step={0.1} // Allow finer control with smaller step
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text>Valor seleccionado: {riskLimit}</Text>
        </Box>
      )}

      {choice === "expectedReturn" && (
        <Box mt={5}>
          <Text>Retorno Esperado (%)</Text>
          <Slider colorScheme='green'
            value={typeof targetReturn === "number" ? targetReturn : 0}
            onChange={(val) => setTargetReturn(val)} // Corrected here to update targetReturn
            min={0}
            max={100}
            step={0.1} // Allow finer control with smaller step
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text>Valor seleccionado: {targetReturn}</Text>
        </Box>
      )}

      <br />

      <Divider />

<Box mt={5}>
          <Text>Plazo de Inversión (años)</Text>
          <Slider colorScheme='green'
            value={typeof investmentTerm === "number" ? investmentTerm : 0}
            onChange={(val) => setInvestmentTerm(val)} // Corrected here to update targetReturn
            min={0}
            max={30}
            step={1} // Allow finer control with smaller step
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text>Valor seleccionado: {investmentTerm}</Text>
        </Box>

      {/* Submit Button */}
      <Button mt={5} colorScheme="green" onClick={handleSubmit}>Enviar</Button>
    </Box>
  );
};

export default OptimizationInput;
