import { Flex, Spinner } from "@chakra-ui/react"
import { Outlet, createFileRoute } from "@tanstack/react-router"

import Sidebar from "../components/Common/Sidebar"


export const Route = createFileRoute("/_layout")({
  component: Layout,
  beforeLoad: async () => {
   
  },
})

function Layout() {
  

  return (
    <Flex maxW="large" h="auto" position="relative">
      <Sidebar />
      
        <Flex justify="center" align="center" height="100vh" width="full">
          <Spinner size="xl" color="ui.main" />
        </Flex>
     (
        <Outlet />
      )

    </Flex>
  )
}