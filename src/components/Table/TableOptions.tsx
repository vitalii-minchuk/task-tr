import { FC } from "react"

import { useAppDispatch, useAppSelector } from "../../hooks"
import { openDialog } from "../../redux/Slices/openModalSlice"

import { Button, Flex, Text } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"

const TableOptions: FC = () => {
  const { transactions } = useAppSelector(state=> state.transactions)
  const dispatch = useAppDispatch()

  return (
    <Flex pb={3} justify="space-between" gap={6} >
      <Flex>filters</Flex>
        {transactions?.length === 100 ? (
          <Text>100 transactions max</Text>
        ) : (
          <Button
            size="sm"
            onClick={() => dispatch(openDialog("addNewTr"))}
          >
            <AddIcon mr={3} />
            add new transaction
          </Button>
        )}
    </Flex>
  )
}

export default TableOptions