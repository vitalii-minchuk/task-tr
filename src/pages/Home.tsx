import { FC, Fragment } from "react"

import { Box, Container } from "@chakra-ui/react"

import MainTable from "../components/Table/MainTable"
import TableOptions from "../components/Table/TableOptions"

const Home: FC = () => {
  return (
    <Fragment>
      <Container  maxW="6xl">
        <Box my={6} minH="80vh" boxShadow="dark-lg" p="6" rounded="md">
          <TableOptions />
          <MainTable />
        </Box>
      </Container>
    </Fragment>
  )
}

export default Home