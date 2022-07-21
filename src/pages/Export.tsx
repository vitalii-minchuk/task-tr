import { FC, Fragment, useEffect } from "react"

import { fetchTransactions } from "../redux/Slices/transactionsSlice"
import { useAppDispatch, useAppSelector } from "../hooks"
import { tableHeader } from "../utils/constants"
import CsvDownload from "react-json-to-csv"

import {
  Box,
  Container,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Text,
  Center,
} from "@chakra-ui/react"


const Export: FC = () => {
  const { transactions } = useAppSelector(state => state.transactions)

  return (
    <Box as="section">
      <Container  maxW="6xl">
        {transactions?.length ? (
          <Fragment>
            <TableContainer py="4">
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    {tableHeader.slice(0, 5).map(title => (
                      <Th key={title}>
                        <Text>{title}</Text>
                      </Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {transactions?.map(transaction => (
                    <Tr key={transaction.transactionid}>
                      <Th>{transaction.transactionid}</Th>
                      <Th>{transaction.status}</Th>
                      <Th>{transaction.type}</Th>
                      <Th>{transaction.clientname}</Th>
                      <Th>{transaction.amount}</Th>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <CsvDownload data={transactions?.map(transaction => ({
              transactionid: transaction.transactionid,
              status: transaction.status,
              type: transaction.type,
              clientname: transaction.clientname,
              amount: transaction.amount,
            }))} />
          </Fragment>
        ) : (
          <Center h="500px">
            No Data
          </Center>
        )}

      </Container>
    </Box>
  )
}

export default Export
