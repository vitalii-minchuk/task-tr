import { FC, Fragment } from "react"
import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Error from "./pages/Error"
import Export from "./pages/Export"
import Home from "./pages/Home"
import Import from "./pages/Import"

const App: FC = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="import" element={<Import />} />
          <Route path="export" element={<Export />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Fragment>
  )
}

export default App
