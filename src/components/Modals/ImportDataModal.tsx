import { FC, useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../hooks"
import { closeDialog } from "../../redux/Slices/openModalSlice"
import { cancelImport } from "../../redux/Slices/importDataSlice"

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  CircularProgress,
  CircularProgressLabel,
  Text
} from "@chakra-ui/react"

const ImportDataModal: FC = () => {
  const [value, setValue] = useState(0)
  const { dialogs } = useAppSelector(state => state.dialogs)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()



  const onClose = useCallback(() => {
    dispatch(closeDialog("import"))
    navigate("/")
  }, [dispatch, navigate])

  const onStop = () => {
    dispatch(cancelImport())
    onClose()
  }

  useEffect(() => {
    if (value === 100) {
      onClose()
    }
    
    const timer = setInterval(() => {
      setValue(prev => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [value, onClose])

  return (
    <>
      <Modal isOpen={dialogs.import} onClose={() => console.log("importing...")}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Importing data ...</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CircularProgress value={value} color='green.400'>
              <CircularProgressLabel>{value}%</CircularProgressLabel>
            </CircularProgress>
            <Text>
              We apologize for the delay, our server has some limits regarding queries per second, but we are trying to resolve the problem ASAP
            </Text>
            <Text>
              You can stop this process, but in this case you have only some data to work with
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onStop}>stop</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ImportDataModal
