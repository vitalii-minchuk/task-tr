import { FC, useState } from "react"

import { TransactionType } from "../../types"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { addTransaction } from "../../redux/Slices/transactionsSlice"
import { closeDialog } from "../../redux/Slices/openModalSlice"

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SelectField
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
console.log(newTransaction)
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
          <ModalHeader>New Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
                <FormLabel>Client Name</FormLabel>
                <Input
                  onChange={(e) => setNewTransaction({
                    ...newTransaction,
                    clientname: e.target.value
                  })}
                  value={newTransaction.clientname}
                />
              </FormControl>
            <FormControl>
                <FormLabel>Status</FormLabel>
                <Select
                  onChange={(e) => setNewTransaction({
                    ...newTransaction,
                    status: e.target.value
                  })}
                  value={newTransaction.status}
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </Select>
              </FormControl>
            <FormControl>
                <FormLabel>Type</FormLabel>
                <Select
                  onChange={(e) => setNewTransaction({
                    ...newTransaction,
                    type: e.target.value
                  })}
                  value={newTransaction.type}
                >
                  <option value="Refill">Refill</option>
                  <option value="Completed">Withdrawal</option>
                </Select>
              </FormControl>
            <FormControl>
                <FormLabel>Amount</FormLabel>
                <Input
                    type="number"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({
                    ...newTransaction,
                    amount: e.target.value
                  })}
                />
              </FormControl>
            </ModalBody>
          <ModalFooter>
            <Button mr={4} onClick={onClose}>cancel</Button>
            <Button onClick={onConfirm}>ok</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddNewTrModal