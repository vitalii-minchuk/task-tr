import { FC, Fragment, useEffect, useState } from "react"

import {  useAppDispatch, useAppSelector } from "../hooks"
import { fetchTransactions } from "../redux/Slices/transactionsSlice"
import { useMapTables } from "../hooks/useMapTable"
import { AmountFilterType, TransactionType } from "../types"
import { tableHeader } from "../utils/constants"
import { getNumberFromAmount } from "../utils/helpers"
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
  Flex,
  RadioGroup,
  Stack,
  Radio,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Tooltip,
  Spacer,
} from "@chakra-ui/react"

const Export: FC = () => {
  const { transactions } = useAppSelector(state => state.transactions)
  const [items, setItems] = useState<TransactionType[] | []>([])
  const [filteredItems, setFilteredItems] = useState<TransactionType[]>(items)
  const [typeFilter, setTypeFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [amountFilter, setAmountFilter] = useState<AmountFilterType>({from: 0, to: 100})

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTransactions()) 
  }, [dispatch])

  const myTable = useMapTables(transactions)

  useEffect(() => {
    let filteredItems = [] as TransactionType[]
    items?.forEach(el => {
      const num = getNumberFromAmount(el.amount)

      if (amountFilter.from < num && num < amountFilter.to) {
        filteredItems.push(el)
      }
    })
    setFilteredItems(filteredItems)
  }, [amountFilter, items])

  useEffect(() => {
    if (myTable) {
      setItems(myTable?.get(`${typeFilter}${statusFilter}`))
    }
  }, [myTable, statusFilter, typeFilter])

  return (
    <Box as="section">
      <Container  maxW="6xl">
        <Flex my={2} gap={12}>
          <RadioGroup onChange={setTypeFilter} value={typeFilter}>
            <Text mb={2}>Type</Text>
            <Stack>
              <Radio value='All'>All</Radio>
              <Radio value='Refill'>Refill</Radio>
              <Radio value='Withdrawal'>Withdrawal</Radio>
            </Stack>
          </RadioGroup>
          <RadioGroup onChange={setStatusFilter} value={statusFilter}>
            <Text mb={2}>Status</Text>
            <Stack>
              <Radio value='All'>All</Radio>
              <Radio value='Pending'>Pending</Radio>
              <Radio value='Completed'>Completed</Radio>
              <Radio value='Cancelled'>Cancelled</Radio>
            </Stack>
          </RadioGroup>
          <Box w={200}>
            <Text mb={8}>Amount</Text>
            <RangeSlider
              onChange={(value) => setAmountFilter({
                ...amountFilter,
                from: value[0],
                to: value[1]
              })}
              defaultValue={[0, 100]}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <Tooltip placement='top' label={`$${amountFilter?.from}`}>
                <RangeSliderThumb bg={"teal"}  index={0} />
              </Tooltip>
              <Tooltip placement='top' label={`$${amountFilter?.to}`}>
                <RangeSliderThumb bg={"teal"} index={1} />
              </Tooltip>
            </RangeSlider>
          </Box>
          <Spacer />
          <Text fontSize='2xl'>TOTAL: {filteredItems?.length}</Text>
        </Flex>
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
                  {filteredItems?.map(transaction => (
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
