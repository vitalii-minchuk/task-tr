import { FC } from "react"

import {
  Box,
  Container,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Tfoot,
  Td,
} from "@chakra-ui/react"
import { tableHeader } from "../../utils/constants"
import { useAppSelector } from "../../hooks"
import TableItem from "./TableItem"
import TableOptions from "./TableOptions"

const MainTable: FC = () => {
  const { transactions } = useAppSelector(state => state.transactions)
  return (
    <Box as="section">
      <Container  maxW="6xl">
        <TableContainer>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <TableOptions />
              </Tr>
              <Tr>
                {tableHeader.map(title => (
                  <Th key={title}>{title}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {transactions?.map(transaction => (
                <Tr>
                  <TableItem key={transaction.transactionid} transaction={transaction} />
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>into</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  )
}

export default MainTable