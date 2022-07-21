import { FC, Fragment, useEffect } from "react"


import { useAppSelector } from "../hooks"

import { Box, Container } from "@chakra-ui/react"

import MainTable from "../components/Table/MainTable"
import TableOptions from "../components/Table/TableOptions"
import { useNavigate } from "react-router-dom"

const Home: FC = () => {
  const { error } = useAppSelector(state=> state.transactions)
  const navigate = useNavigate()

  useEffect(() => {
    if(error) {
      navigate("/error")
    }
  }, [error, navigate])

  return (
    <Fragment>
      <Container  maxW="6xl">
        <Box my={6} minH="80vh" boxShadow="dark-lg" py="2" px="6" rounded="md" position="relative">
          <TableOptions />
          <MainTable />
        </Box>
      </Container>
    </Fragment>
  )
}

export default Home