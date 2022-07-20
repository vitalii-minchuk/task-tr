import { FC } from "react"
import { Link } from "react-router-dom"

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  List,
  ListItem,
  Spacer,
  Text,
} from "@chakra-ui/react"


const Header: FC = () => {
  return (
    <Box bg="tomato">
      <Container  maxW="6xl">
        <Flex align="center" justify="space-between" gap="8">
          <Box>
            <Heading fontSize="lg">LOGO</Heading>
          </Box>
          <Spacer />
          <Box as="nav">
            <List display="flex" gap="8 ">
              <ListItem>
                <Link to="/">Table</Link>
              </ListItem>
              <ListItem>
                <Link to="/import">Import</Link>
              </ListItem>
              <ListItem>
                <Link to="/export">Export</Link>
              </ListItem>
            </List>
          </Box>
          <Box>
            <Button as="a" target="_blank" href="https://github.com/vitalii-minchuk/task-tr">
              ok
            </Button>
          </Box>
        </Flex>
      </Container>

    </Box>
  )
}

export default Header