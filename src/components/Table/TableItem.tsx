import { FC, Fragment } from "react"

import { TransactionType } from "../../types"
import { useAppDispatch } from "../../hooks"
import { openDialog } from "../../redux/Slices/openModalSlice"
import { setCurrentTr } from "../../redux/Slices/transactionsSlice"

import { Button, Td, Tooltip } from "@chakra-ui/react"
import { DeleteIcon, EditIcon } from "@chakra-ui/icons"

interface ITableItem {
  transaction: TransactionType
}

const TableItem: FC<ITableItem> = ({ transaction }) => {
  const dispatch = useAppDispatch()

  const deleteHandler = () => {
    dispatch(setCurrentTr(transaction))
    dispatch(openDialog("delTr"))
  }

  const editHandler = () => {
    dispatch(setCurrentTr(transaction))
    dispatch(openDialog("editTr"))
  }

  return (
    <Fragment>
      <Td>{transaction.transactionid}</Td>
      <Td>{transaction.status}</Td>
      <Td>{transaction.type}</Td>
      <Td>{transaction.clientname}</Td>
      <Td>{transaction.amount}</Td>
      <Td display="flex" alignItems="center" gap={3}>
        <Button bg="transparent" onClick={editHandler}>
          <Tooltip hasArrow label="edit" placement="top" bg="gray.300" color="black">
            <EditIcon color="green.500" />
          </Tooltip>
        </Button>
        <Button bg="transparent" onClick={deleteHandler}>
          <Tooltip hasArrow label="delete" placement="top" bg="gray.300" color="black">
            <DeleteIcon color="red.500" />
          </Tooltip>
        </Button>
      </Td>
    </Fragment>
  )
}

export default TableItem