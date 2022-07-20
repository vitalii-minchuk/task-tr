import { FC, Fragment } from "react"
import { Outlet } from "react-router-dom"

import { Box } from "@chakra-ui/react"

import Header from "./Header"

const Layout: FC = () => {
  return (
    <Fragment>
      <Box as="header">
        <Header />
      </Box>
      <Box as="main">
        <Outlet />
      </Box>
    </Fragment>
  )
}

export default Layout