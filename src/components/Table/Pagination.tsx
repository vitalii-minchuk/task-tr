import { Dispatch, FC, MouseEvent, SetStateAction } from "react"

import { getNumberOfPages } from "../../utils/helpers"

import { Button, Flex } from "@chakra-ui/react"

interface IPagination {
  setCurrentPage: Dispatch<SetStateAction<number>>
  pageCount: number
  currentPage: number
}

const Pagination: FC<IPagination> = ({ setCurrentPage, pageCount, currentPage }) => {
  const pages = getNumberOfPages(pageCount)

  const clickHandler = (event: MouseEvent<HTMLButtonElement>): void => {
    setCurrentPage(+event.currentTarget.value - 1)
  }

  return (
    <Flex gap={2} pt={3} position="absolute">
      {pages?.map(num => (
        <Button
          border={num === currentPage + 1 ? "1px solid gray" : "none"}
          key={num} 
          value={num}
          onClick={(e) => clickHandler(e)}>{num}</Button>
      ))}
    </Flex>
  )
}

export default Pagination