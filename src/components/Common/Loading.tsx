import { Box, Spinner, Text } from '@chakra-ui/react';

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = 'Cargando...' }) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" p={4}>
      <Spinner size="lg" />
      <Text ml={3}>{message}</Text>
    </Box>
  );
};

export default Loading;
