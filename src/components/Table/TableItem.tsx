import { FC, Fragment } from "react"

import { TransactionType } from "../../types"

import { Button, Th, Tr } from "@chakra-ui/react"

interface ITableItem {
  transaction: TransactionType
}

const TableItem: FC<ITableItem> = ({ transaction }) => {
  return (
    <Fragment>
      <Th>{transaction.transactionid}</Th>
      <Th>{transaction.status}</Th>
      <Th>{transaction.type}</Th>
      <Th>{transaction.clientname}</Th>
      <Th>{transaction.amount}</Th>
      <Th>
        <Button></Button>
        <Button></Button>
      </Th>
    </Fragment>
  )
}

export default TableItem