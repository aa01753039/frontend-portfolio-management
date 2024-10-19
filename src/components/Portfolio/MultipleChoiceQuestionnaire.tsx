import { Box, Radio, RadioGroup, Stack, Text, Button } from "@chakra-ui/react";
import { useState, useContext } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  AgeGroup,
  InvestmentGoal,
  LossReaction,
  InvestmentHorizon,
  QuestionnaireResponse,
  FinalReturn,
} from "../../client/models";
import { PortfolioService } from "../../client/services";
import { DataContext } from "../../DataProvider";

const MultipleChoiceQuestionnaire = () => {
  const [ageGroup, setAgeGroup] = useState<AgeGroup | "">("");
  const [investmentGoal, setInvestmentGoal] = useState<InvestmentGoal | "">("");
  const [lossReaction, setLossReaction] = useState<LossReaction | "">("");
  const [investmentHorizon, setInvestmentHorizon] = useState<InvestmentHorizon | "">("");
  const navigate = useNavigate();
  const { setResponseData } = useContext(DataContext);

  const handleSubmit = async () => {
    const requestBody: QuestionnaireResponse = {
      age_group: ageGroup as AgeGroup,
      investment_goal: investmentGoal as InvestmentGoal,
      loss_reaction: lossReaction as LossReaction,
      investment_horizon: investmentHorizon as InvestmentHorizon,
    };

    try {
      const response: FinalReturn = await PortfolioService.createQuestionnaire({ requestBody });
      console.log("Response:", response);
      // Store the response data in context
      setResponseData(response);
      // Redirect to the new layout
      navigate({ to: "/optimization" });
    } catch (error) {
      console.error("Error submitting questionnaire:", error);
    }
  };


  return (
    <Box p={5}>
      {/* Question 1: Age Group */}
      <Text fontSize="lg" mb={2}>¿Cuál es tu grupo de edad?</Text>
      <RadioGroup onChange={(value) => setAgeGroup(value as AgeGroup)} value={ageGroup}>
        <Stack direction="column">
          {Object.values(AgeGroup).map((group) => (
            <Radio key={group} value={group} colorScheme='green'>{group}</Radio>
          ))}
        </Stack>
      </RadioGroup>

      {/* Question 2: Investment Goal */}
      <Text fontSize="lg" mt={5} mb={2}>¿Cuál es tu principal objetivo de inversión?</Text>
      <RadioGroup onChange={(value) => setInvestmentGoal(value as InvestmentGoal)} value={investmentGoal}>
        <Stack direction="column">
          {Object.values(InvestmentGoal).map((goal) => (
            <Radio key={goal} value={goal} colorScheme='green'>{goal}</Radio>
          ))}
        </Stack>
      </RadioGroup>

      {/* Question 3: Loss Reaction */}
      <Text fontSize="lg" mt={5} mb={2}>¿Cómo reaccionarías si tu portafolio perdiera un 10% en un mes?</Text>
      <RadioGroup onChange={(value) => setLossReaction(value as LossReaction)} value={lossReaction}>
        <Stack direction="column">
          {Object.values(LossReaction).map((reaction) => (
            <Radio key={reaction} value={reaction} colorScheme='green'>{reaction}</Radio>
          ))}
        </Stack>
      </RadioGroup>

      {/* Question 4: Investment Horizon */}
      <Text fontSize="lg" mt={5} mb={2}>¿Cuál es tu horizonte de inversión?</Text>
      <RadioGroup onChange={(value) => setInvestmentHorizon(value as InvestmentHorizon)} value={investmentHorizon}>
        <Stack direction="column">
          {Object.values(InvestmentHorizon).map((horizon) => (
            <Radio key={horizon} value={horizon} colorScheme='green'>{horizon}</Radio>
          ))}
        </Stack>
      </RadioGroup>

      {/* Submit Button */}
      <Button mt={5} colorScheme="green" onClick={handleSubmit}>Enviar</Button>
    </Box>
  );
};

export default MultipleChoiceQuestionnaire;
