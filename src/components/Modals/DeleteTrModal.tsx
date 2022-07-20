import { FC } from "react"

import { useAppDispatch, useAppSelector } from "../../hooks"
import { removeTransaction } from "../../redux/Slices/transactionsSlice"
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
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>cancel</Button>
            <Button onClick={(e) => onConfirm(e)}>ok</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteTrModal
