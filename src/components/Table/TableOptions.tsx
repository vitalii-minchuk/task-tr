import { FC } from "react"

import { useAppDispatch, useAppSelector } from "../../hooks"
import { openDialog } from "../../redux/Slices/openModalSlice"
import { filterByStatus, filterByType, searchByName } from "../../redux/Slices/transactionsSlice"

import {
  Button,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text 
} from "@chakra-ui/react"
import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons"

const TableOptions: FC = () => {
  const { transactions } = useAppSelector(state=> state.transactions)
  const dispatch = useAppDispatch()

  return (
    <Flex py={2} justify="space-between" gap={6} >
      <Flex gap={6}>
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />}>
                show status
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => dispatch(filterByStatus(""))}>
                  All
                </MenuItem>
                <MenuItem onClick={() => dispatch(filterByStatus("Pending"))}>
                  Pending
                </MenuItem>
                <MenuItem onClick={() => dispatch(filterByStatus("Completed"))}>
                  Completed
                </MenuItem>
                <MenuItem onClick={() => dispatch(filterByStatus("Cancelled"))}>
                  Cancelled
                </MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />}>
                show type
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => dispatch(filterByType(""))}>
                  All
                </MenuItem>
                <MenuItem onClick={() => dispatch(filterByType("Refill"))}>
                  Refill
                </MenuItem>
                <MenuItem onClick={() => dispatch(filterByType("Withdrawal"))}>
                  Withdrawal
                </MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
        <Input
          onChange={(e) => dispatch(searchByName(e.target.value))}
          placeholder="search by name ..."
          size="md"
          w={200}
        />
      </Flex>
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