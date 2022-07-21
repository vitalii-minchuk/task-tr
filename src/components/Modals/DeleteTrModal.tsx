import { FC } from "react"

import { useAppDispatch, useAppSelector } from "../../hooks"
import { removeTransaction } from "../../redux/Slices/transactionsSlice"
import { closeDialog } from "../../redux/Slices/openModalSlice"

import {
  Button,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from "@chakra-ui/react"

const DeleteTrModal: FC = () => {
  const { currentTr } = useAppSelector(state => state.transactions)
  const { dialogs } = useAppSelector(state => state.dialogs)

  const dispatch = useAppDispatch()

  const onClose = () => {
    dispatch(closeDialog("delTr"))
  }

  const onConfirm  = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (event.currentTarget.innerText === "ok") {
      if (currentTr?.transactionid) {
        dispatch(removeTransaction(currentTr?.transactionid))
      }
    }
    onClose()
  }

  return (
    <>
      <Modal isOpen={dialogs.delTr} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transaction #{currentTr?.transactionid}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Flex py={3} justify="space-between">
            <Text fontWeight="bold">Client Name</Text>
            <Text align="end">{currentTr?.clientname}</Text>
          </Flex>
          <Divider />
          <Flex py={3} justify="space-between">
            <Text fontWeight="bold">Type</Text>
            <Text align="end">{currentTr?.type}</Text>
          </Flex>
          <Divider />
          <Flex py={3} justify="space-between">
            <Text fontWeight="bold">Status</Text>
            <Text align="end">{currentTr?.status}</Text>
          </Flex>
          <Flex py={3} justify="space-between">
            <Text fontWeight="bold">Amount</Text>
            <Text align="end">{currentTr?.amount}</Text>
          </Flex>
          <Divider />
          <Text py={4} mx="auto" w="60%" align="center">
            Would you like to remove this transaction from the table ?
          </Text>
          </ModalBody>

          <ModalFooter>
            <Button mr={4} onClick={onClose}>cancel</Button>
            <Button onClick={(e) => onConfirm(e)}>ok</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteTrModal
