import { FC, ReactNode } from "react"
import { Link, useMatch } from "react-router-dom"

import { Text } from "@chakra-ui/react"

interface ICustomLink {
  to: string
  children: ReactNode
}
const CustomLink: FC<ICustomLink> = ({ children, to, ...props }) => {
  const match = useMatch({
    path: to,
    end: to.length === 1
  })

  return (
    <Link to={to} {...props}>
      <Text color={ match ? "black" : ""}>
        {children}
      </Text>
    </Link>
  )
}

export default CustomLink