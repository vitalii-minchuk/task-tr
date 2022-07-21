import { FC, Fragment } from "react"

import { Container } from "@chakra-ui/react"

import MainTable from "../components/Table/MainTable"
import TableOptions from "../components/Table/TableOptions"

const Home: FC = () => {
  return (
    <Fragment>
      <Container  maxW="6xl">
        <TableOptions />
        <MainTable />
      </Container>
    </Fragment>
  )
}

export default Home