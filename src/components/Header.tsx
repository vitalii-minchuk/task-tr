import { FC } from "react"

import { Box } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const Header: FC = () => {
  return (
    <Box bg="tomato">
      <Link to="/">Table</Link>
      <Link to="/import">Import</Link>
      <Link to="/export">Export</Link>
    </Box>
  )
}

export default Header