import { FC, useEffect } from "react"

import { useAppDispatch, useAppSelector } from "../../hooks"
import { tableHeader } from "../../utils/constants"
import { fetchTransactions } from "../../redux/Slices/transactionsSlice"

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
  Text,
} from "@chakra-ui/react"


import TableItem from "./TableItem"
import TableOptions from "./TableOptions"

const MainTable: FC = () => {
  const { transactions } = useAppSelector(state => state.transactions)
  // const { isLoading } = useAppSelector(state => state.transactions)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTransactions()) 
  }, [dispatch])

  return (
    <Box as="section">
      <Container  maxW="6xl">
        <TableContainer>
          <Table variant='simple' size="sm">
            <Thead>
              <Tr>
                <TableOptions />
              </Tr>
              <Tr>
                {tableHeader.map(title => (
                  <Th key={title}>
                    <Text>{title}</Text>
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {transactions?.map(transaction => (
                <Tr key={transaction.transactionid}>
                  <TableItem transaction={transaction} />
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