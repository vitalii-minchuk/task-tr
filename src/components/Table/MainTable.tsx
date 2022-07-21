import { FC, Fragment, useEffect, useState } from "react"

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
  Text,
  Progress,
} from "@chakra-ui/react"

import TableItem from "./TableItem"
import usePagination from "../../hooks/usePagination"
import Pagination from "./Pagination"

const MainTable: FC = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const { transactions, isLoading } = useAppSelector(state => state.transactions)
  
  const dispatch = useAppDispatch()

  const { currentItems, pageCount } = usePagination(transactions, currentPage)

  useEffect(() => {
    dispatch(fetchTransactions()) 
  }, [dispatch])

  return (
    <Fragment>
      <TableContainer>
        {isLoading ? <Progress size="xs" isIndeterminate /> : <Box h={1}></Box>}
        <Table variant="simple" size="sm">
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
            {currentItems?.map(transaction => (
              <Tr key={transaction.transactionid}>
                <TableItem transaction={transaction} />
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {transactions?.length > 6 &&
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pageCount={pageCount}
        />
      }
    </Fragment>
  )
}

export default MainTable