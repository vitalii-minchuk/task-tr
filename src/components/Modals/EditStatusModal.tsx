import { FC } from "react"

import { useAppDispatch, useAppSelector } from "../../hooks"
import { setCurrentTr, toggleStatus } from "../../redux/Slices/transactionsSlice"
import { closeDialog } from "../../redux/Slices/openModalSlice"
import { possibleStatus } from "../../utils/constants"

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



const EditStatusModal: FC = () => {
  const { currentTr } = useAppSelector(state => state.transactions)
  const { dialogs } = useAppSelector(state => state.dialogs)

  const dispatch = useAppDispatch()

  const currentStatus = possibleStatus.filter(el => el === currentTr?.status)
  const statusOptions = possibleStatus.filter(el => el !== currentTr?.status)

  const onClose = () => {
    dispatch(closeDialog("editTr"))
  }

  const onConfirm  = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    if (currentTr) {
      if (event.currentTarget.textContent === "Pending") {
        dispatch(setCurrentTr({...currentTr, status: "Pending"}))
        dispatch(toggleStatus({...currentTr, status: "Pending"}))
      } else if (event.currentTarget.textContent === "Completed") {
        dispatch(setCurrentTr({...currentTr, status: "Completed"}))
        dispatch(toggleStatus({...currentTr, status: "Completed"}))
      } else {
        dispatch(setCurrentTr({...currentTr, status: "Cancelled"}))
        dispatch(toggleStatus({...currentTr, status: "Cancelled"}))
      }
    }

    onClose()
  }

  return (
    <>
      <Modal isOpen={dialogs.editTr} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {currentStatus}
          </ModalBody>

          <ModalFooter>
            {statusOptions?.map(status => (
              <Button onClick={onConfirm}>{status}</Button>
            ))}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditStatusModal