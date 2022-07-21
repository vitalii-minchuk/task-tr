import { FC, useEffect } from "react"

import { useAppDispatch, useAppSelector } from "../../hooks"
import { tableHeader } from "../../utils/constants"
import { fetchTransactions } from "../../redux/Slices/transactionsSlice"

import {
  Box,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Tfoot,
  Text,
  TableCaption,
  Progress,
} from "@chakra-ui/react"

import TableItem from "./TableItem"
import PaginatedItems from "../Pagination"

const MainTable: FC = () => {
  const { transactions, isLoading } = useAppSelector(state => state.transactions)
  // const { isLoading } = useAppSelector(state => state.transactions)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTransactions()) 
  }, [dispatch])

  return (
    <Box as="section">
        <TableContainer>
        {isLoading ? <Progress size='xs' isIndeterminate /> : <Box h={1}></Box>}
          <Table variant='simple' size="sm">
            <Thead>
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
          </Table>
        </TableContainer>
        <PaginatedItems data={transactions} />
    </Box>
  )
}

export default MainTable