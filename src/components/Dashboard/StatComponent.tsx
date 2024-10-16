import { Flex, Box, Container, SimpleGrid, GridItem, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { Stat } from "../Common/Stat";

interface StatData {
  icon: IconType;
  label: string;
  value: string;
  delta: {
    value: string | null;
    isUpwardsTrend: boolean | null;
  };
  progress: {
    value: number | null;
    limit: number | null;
  };
  info: string | null;
}

interface StatComponentProps {
  data: StatData[];
}

const StatComponent: React.FC<StatComponentProps> = ({ data }) => {
  return (
    <Flex flexDirection='column' pt={{ base: "120px", sm: "20px", md: "200px" }} py={{ base: "4", md: "8" }}>
      <Container maxW="full">
      <SimpleGrid columns={{ base: 1, sm: 1, md: 1, lg: 2, "2xl": 5 }} spacing={{ base: "5", md: "6" }}>
      {data.slice(0, data.length - 3).map((stat, id) => (
            <Stat key={id} {...stat} />
          ))}
          <GridItem colSpan={{ base: 1, sm: 1,md: 1,lg:3,xl:3 }}>
            <Box bg="gray.100" p={{ base: 2, md: 4 }} borderRadius="md">
              <Text fontSize={{ base: "sm", md: "xs" }} fontWeight="bold" color={"gray.500"} mb={2}>
                Reclutamiento General
              </Text>
              <SimpleGrid columns={{ base: 1, sm: 1,md: 1,lg:3,xl:3 }} spacing={{ base: "5", md: "6" }}>
                {data.slice(data.length - 3).map((stat, id) => (
                  <Stat key={id} {...stat} />
                ))}
              </SimpleGrid>
            </Box>
          </GridItem>
        </SimpleGrid>
      </Container>
    </Flex>
  );
};

export default StatComponent;

