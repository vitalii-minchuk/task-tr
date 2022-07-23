import { DragEvent, FC, Fragment, useState } from "react"

import { useAppDispatch, useAppSelector } from "../hooks"
import { openDialog } from "../redux/Slices/openModalSlice"
import { choseAnotherData, downloadData, importData } from "../redux/Slices/importDataSlice"
import { TransactionType } from "../types"
import { papaparseOptions } from "../utils/constants"
import CSVReader from "react-csv-reader"
import Papa from "papaparse"

import {
  Button,
  Center,
  Container,
  Spacer,
  Stack,
  Text
} from "@chakra-ui/react"

const Import: FC = () => {
  const { data } = useAppSelector(state => state.import)
  const { transactions } = useAppSelector(state=> state.transactions)
  const dispatch = useAppDispatch()

  const [drag, setDrag] = useState(false)

  const handleForce = (data: TransactionType[]) => dispatch(downloadData((data)))
  
  const importHandler = () => {
    dispatch(importData())
    dispatch(openDialog("import"))
  }

  const droptHandler = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDrag(false)
    Array.from(event.dataTransfer.files)
      .filter(file => file.name === "data.csv")
      .forEach(async (file) => {
        const text = await file.text()
        const result = Papa.parse(text, papaparseOptions)
        const data  = result.data as TransactionType[]
        dispatch(downloadData((data)))
      })
  
  }

  return (
    <Fragment>
      <Container  maxW="6xl">
      <Stack mt={40} h={80} w="270px" mx="auto" boxShadow="dark-lg" p="6" rounded="md">
          {transactions?.length ? (
            <Text>
              The table should be empty. In order to import new data, 
              please clear the table up
            </Text>
          ) : (
            <Fragment>
              <Text pb={3}>Please chose .csv file to import</Text>
              {!data.length ? (
                <Fragment>
                  <CSVReader
                    cssClass="csv-input"
                    onFileLoaded={handleForce}
                    parserOptions={papaparseOptions}
                  />
                  <Text>or</Text>
                  <Center
                    h={40} m={3} border="1px dashed gray"
                    onDragOver={(e) => e.preventDefault()}
                    onDragLeave={(e) => {
                      setDrag(false)
                    }}
                    onDrop={(e) => droptHandler(e)}
                    onDragEnter={(e) => {
                      e.preventDefault()
                      setDrag(true)
                    }}
                  >
                    {drag ? (
                      <Text>Drop</Text>
                    ) : (
                      <Text>Drag your file here</Text>
                    )}
                  </Center>
                </Fragment>
              ) : (
                <Button onClick={() => dispatch(choseAnotherData())}>chose another file</Button>
              )}
              <Spacer />
              <Button disabled={!data?.length} onClick={importHandler}>import</Button>
            </Fragment>
          )}
        </Stack>
      </Container>
    </Fragment>
  )
}

export default Import