import { FC, useEffect } from "react"

import { useAppDispatch, useAppSelector } from "../hooks"
import { requestFailure } from "../redux/Slices/transactionsSlice"

import { Text } from "@chakra-ui/react"

const Error: FC = () => {
  const { error } = useAppSelector(state => state.transactions)
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    dispatch(requestFailure(""))
  }, [dispatch])

  return (
    <Text>{error ? error : "page not fond"}</Text>
  )
}

export default Error