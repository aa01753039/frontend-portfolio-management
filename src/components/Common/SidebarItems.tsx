import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";

import { Link } from "@tanstack/react-router";
import { FaClipboardQuestion, FaCalculator} from "react-icons/fa6";




const items = [
  { icon: FaClipboardQuestion, title: "Questionario", path: "/" },
  {icon: FaCalculator, title: "Calculadora", path: "/calculator" },

];

interface SidebarItemsProps {
  onClose?: () => void;
}

const SidebarItems = ({ onClose }: SidebarItemsProps) => {

  const textColor = useColorModeValue("ui.main", "ui.light");
  const bgActive = useColorModeValue("#E2E8F0", "#4A5568");



  const listItems = items.map(({ icon, title, path }) => (
    <Flex
      as={Link}
      to={path}
      w="100%"
      p={2}
      key={title}
      activeProps={{
        style: {
          background: bgActive,
          borderRadius: "12px",
        },
      }}
      color={textColor}
      onClick={onClose}
    >
      <Icon as={icon} alignSelf="center" />
      <Text ml={2}>{title}</Text>
    </Flex>
  ));

  return (
    <>
      <Box>{listItems}</Box>
    </>
  );
};

export default SidebarItems;
