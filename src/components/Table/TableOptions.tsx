import { FC } from "react"

import { useAppDispatch } from "../../hooks"
import { openDialog } from "../../redux/Slices/openModalSlice"

import { Button, Th } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"

const TableOptions: FC = () => {
  const dispatch = useAppDispatch()

  return (
    <Th>TableOptions
      <Button onClick={() => dispatch(openDialog("addNewTr"))}>
        <AddIcon />
        add new transaction
      </Button>
    </Th>
  )
}

export default TableOptions