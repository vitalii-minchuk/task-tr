import { FC, useState } from "react"

import { TransactionType } from "../../types"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { addTransaction, removeTransaction } from "../../redux/Slices/transactionsSlice"
import { closeDialog } from "../../redux/Slices/openModalSlice"

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react"
import { convertMoney, getOrderNumber } from "../../utils/helpers"

const AddNewTrModal: FC = () => {
  const [newTransaction, setNewTransaction] = useState<TransactionType>({
    transactionid: "1",
    status: "Pending",
    type: "Refill",
    clientname: "Boris",
    amount: "11"
  })

  
  const { dialogs } = useAppSelector(state => state.dialogs)
  const { transactions } = useAppSelector(state => state.transactions)

  const dispatch = useAppDispatch()

  const currentId = getOrderNumber(transactions)
  const transformedAmount = convertMoney(Number(newTransaction.amount))

  const onClose = (): void => {
    dispatch(closeDialog("addNewTr"))
  }

  const onConfirm = (): void => {
    dispatch(addTransaction({...newTransaction,
      transactionid: currentId,
      amount: transformedAmount
    }))
    onClose()
  }

  return (
    <>
      <Modal isOpen={dialogs.addNewTr} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>cancel</Button>
            <Button onClick={onConfirm}>ok</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddNewTrModal