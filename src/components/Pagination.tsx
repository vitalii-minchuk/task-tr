import { FC, useEffect, useState } from "react"

import { TransactionType } from "../types"
import ReactPaginate from "react-paginate"

import { Box, Flex } from "@chakra-ui/react"

interface IPaginatedItems {
  data: TransactionType[]
}

const PaginatedItems: FC<IPaginatedItems> = ({ data }) => {
  const [currentItems, setCurrentItems] = useState<TransactionType[] | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const itemsPerPage = 6

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage
    setCurrentItems(data?.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(data.length / itemsPerPage))
  }, [itemOffset, itemsPerPage, data])

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % data.length
    setItemOffset(newOffset)
  }

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        // renderOnZeroPageCount={null}
      />
    </>
  )
}

export default PaginatedItems
