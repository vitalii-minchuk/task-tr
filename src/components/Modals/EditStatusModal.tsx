import { FC, Fragment } from "react"

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
  ModalOverlay,
  Text
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
    <Fragment>
      <Modal isOpen={dialogs.editTr} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>transaction #{currentTr?.transactionid}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text py={4} mx="auto" w="60%" align="center">
              Would you like to change current status {currentStatus}?
            </Text>
          </ModalBody>
          <ModalFooter>
            {statusOptions?.map(status => (
              <Button mx={2} onClick={onConfirm}>{status}</Button>
            ))}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  )
}

export default EditStatusModal