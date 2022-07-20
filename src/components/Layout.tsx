import { FC, Fragment } from "react"
import { Outlet } from "react-router-dom"

import { useAppSelector } from "../hooks"

import { Box } from "@chakra-ui/react"

import Header from "./Header"
import MainModal from "./Modals/MainModal"

const Layout: FC = () => {
  const { currentDialog } = useAppSelector(state => state.dialogs)

  return (
    <Fragment>
      <Box as="header">
        <Header />
      </Box>
      <Box as="main">
        <Outlet />
      </Box>
      <MainModal show={currentDialog} />
    </Fragment>
  )
}

export default Layout