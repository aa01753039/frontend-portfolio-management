import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import {  FiMenu } from "react-icons/fi"

import Logo from "../../assets/images/logo-ip.svg"
import SidebarItems from "./SidebarItems"

const Sidebar = () => {
  const bgColor = useColorModeValue("ui.light", "ui.dark")
  const secBgColor = useColorModeValue("ui.secondary", "ui.darkSlate")
  const { isOpen, onOpen, onClose } = useDisclosure()



  return (
    <>
      {/* Mobile */}
      <IconButton
        onClick={onOpen}
        display={{ base: "flex", md: "none" }}
        aria-label="Open Menu"
        position="absolute"
        fontSize="20px"
        m={4}
        icon={<FiMenu />}
      />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent maxW="250px">
          <DrawerCloseButton />
          <DrawerBody py={8}>
            <Flex flexDir="column" justify="space-between">
              <Box>
                <Image src={Logo} alt="logo" p={6} />
                <SidebarItems onClose={onClose} />
                
              </Box>
              
              
              <Text color={"gray"} noOfLines={1} fontSize="sm" p={2}>
              v1.0.0 beta
                </Text>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Desktop */}
      <Box
        bg={bgColor}
        p={3}
        h="100vh"
        position="sticky"
        top="0"
        display={{ base: "none", md: "flex" }}
      >
        <Flex
          flexDir="column"
          justify="space-between"
          bg={secBgColor}
          p={4}
          borderRadius={12}
        >
          <Box>
            <Image src={Logo} alt="Logo" w="220px" maxW="2xs" p={6} />
            <SidebarItems />
          </Box>
          <Box>
            

   
          {/* add a version tag */}
          <Text
            color={"gray"}
            noOfLines={1}
            fontSize="sm"
           
          >
            v1.0.0 beta
          </Text>
          </Box>
          
        </Flex>
        
      </Box>
    </>
  )
}

export default Sidebar
