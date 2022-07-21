import { FC, Fragment } from "react"


import { useAppDispatch, useAppSelector } from "../hooks"
import { openDialog } from "../redux/Slices/openModalSlice"
import { downloadData, importData } from "../redux/Slices/importDataSlice"
import { TransactionType } from "../types"
import { papaparseOptions } from "../utils/constants"
import CSVReader from "react-csv-reader"

import { Button, Container, Text } from "@chakra-ui/react"

const Import: FC = () => {
  const { data } = useAppSelector(state => state.import)
  const { transactions } = useAppSelector(state=> state.transactions)
  const dispatch = useAppDispatch()

  const handleForce = (data: TransactionType[]) => dispatch(downloadData((data)))
  
  const importHandler = () => {
    dispatch(importData())
    dispatch(openDialog("import"))
  }

  return (
    <Fragment>
      <Container  maxW="6xl">
        {transactions?.length ? (
          <Text>The table should be empty. In order to import new data, please clear the table up</Text>
        ) : (
          <Fragment>
            <CSVReader
              cssClass="csv-input"
              onFileLoaded={handleForce}
              parserOptions={papaparseOptions}
            />
            <Button disabled={!data?.length} onClick={importHandler}>import</Button>
          </Fragment>
        )}

      </Container>
    </Fragment>
  )
}

export default Import