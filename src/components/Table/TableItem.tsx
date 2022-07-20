import { FC, Fragment } from "react"

import { TransactionType } from "../../types"
import { useAppDispatch } from "../../hooks"
import { openDialog } from "../../redux/Slices/openModalSlice"
import { setCurrentTr } from "../../redux/Slices/transactionsSlice"

import { Button, Th, Tooltip, Tr } from "@chakra-ui/react"
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
      <Th>{transaction.transactionid}</Th>
      <Th>{transaction.status}</Th>
      <Th>{transaction.type}</Th>
      <Th>{transaction.clientname}</Th>
      <Th>{transaction.amount}</Th>
      <Th>
        <Button onClick={editHandler}>
          <Tooltip hasArrow label="edit" placement="top" bg="gray.300" color="black">
            <EditIcon />
          </Tooltip>
        </Button>
        <Button onClick={deleteHandler}>
          <Tooltip hasArrow label="delete" placement="top" bg="gray.300" color="black">
            <DeleteIcon />
          </Tooltip>
        </Button>
      </Th>
    </Fragment>
  )
}

export default TableItem