import { Box } from "@chakra-ui/react"
import { FC } from "react"
import { Outlet } from "react-router-dom"

import Header from "./Header"

const Layout: FC = () => {
  return (
    <Box as="body">
      <Box as="header">
        <Header />
      </Box>
      <Box as="main">
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout