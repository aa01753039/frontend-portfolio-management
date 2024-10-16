import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  FiBriefcase,
  FiHome,
  FiSettings,
  FiUsers,
  FiFolder,
  FiTable,
  FiBookOpen,
} from "react-icons/fi";
import { GoGoal } from "react-icons/go";


import type { UserPublic } from "../../client";

const items = [
  { icon: FiHome, title: "Dashboard", path: "/" },
  { icon: GoGoal, title: "Efectividad del Reclutador", path: "/efectividad_reclutador" },
  { icon: GoGoal, title: "Mi Efectividad", path: "/mi_efectividad" },
  // { icon: FiBriefcase, title: "Items", path: "/items" },
  { icon: FiTable, title: "General", path: "/general" },
  { icon: FiBriefcase, title: "BP", path: "/vacantes" },
  { icon: FiFolder, title: "R&S", path: "/rys" },
  { icon: FiBookOpen, title: "Glosario", path: "/glossary" },

  // { icon: FiUser, title: "Postulaciones", path: "/postulacioines"},
  { icon: FiSettings, title: "Configuración", path: "/settings" },
];

interface SidebarItemsProps {
  onClose?: () => void;
}

const SidebarItems = ({ onClose }: SidebarItemsProps) => {
  const queryClient = useQueryClient();
  const textColor = useColorModeValue("ui.main", "ui.light");
  const bgActive = useColorModeValue("#E2E8F0", "#4A5568");
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"]);

  const finalItems = currentUser?.is_superuser
    ? currentUser?.user_type === "BP" ? [...items.filter(
      ({ title }) => title !== "Mi Efectividad"), { icon: FiUsers, title: "Admin", path: "/admin" }] : [...items, { icon: FiUsers, title: "Admin", path: "/admin" }]
    : // dont show Vacantes if user is not BP
      currentUser?.user_type === "BP"
      ? items.filter(({ title }) => title !== "R&S" && title !== "Efectividad del Reclutador"  && title !== "Mi Efectividad" )
      : items.filter(
          ({ title }) => title !== "BP" && title !== "Efectividad del Reclutador"
          // dont show R&S if user is not Reclutador
        );

  const listItems = finalItems.map(({ icon, title, path }) => (
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
