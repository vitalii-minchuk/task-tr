import { useEffect, useState } from "react"

import { TransactionType } from "../types"


const usePagination = (data: TransactionType[], selected: number) => {
  const [currentItems, setCurrentItems] = useState<TransactionType[] | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const itemsPerPage = 6

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage

    setCurrentItems(data?.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(data?.length / itemsPerPage))
  }, [itemOffset, itemsPerPage, data])

  useEffect(() => {
    const newOffset = (selected * itemsPerPage) % data?.length

    setItemOffset(newOffset)
  }, [selected, data?.length])

  return { currentItems, pageCount }
}

export default usePagination
