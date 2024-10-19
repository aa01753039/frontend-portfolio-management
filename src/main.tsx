import { ChakraProvider } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { DataProvider } from "./DataProvider"
import ReactDOM from "react-dom/client"
import { routeTree } from "./routeTree.gen"

import { StrictMode } from "react"
import { OpenAPI } from "./client"
import theme from "./theme"
import '@fontsource/poppins/400.css'

OpenAPI.BASE = import.meta.env.VITE_API_URL


OpenAPI.TOKEN = async () => {
  return localStorage.getItem("access_token") || ""
}

const queryClient = new QueryClient()

const router = createRouter({ routeTree })
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </StrictMode>,
)
