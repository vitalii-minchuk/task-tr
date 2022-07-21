import { FC } from "react"

import { CurrentDialogType } from "../../types"

import AddNewTrModal from "./AddNewTrModal"
import DeleteTrModal from "./DeleteTrModal"
import EditStatusModal from "./EditStatusModal"
import ImportDataModal from "./ImportDataModal"

interface IMainModal {
  show: CurrentDialogType
}

const MainModal: FC<IMainModal> = ({ show }) => {
  switch (show) {
    case "delTr":
      return <DeleteTrModal />
    case "addNewTr":
      return <AddNewTrModal />
    case "editTr":
      return <EditStatusModal />
    case "import":
      return <ImportDataModal />
    default:
      return null
  }
}

export default MainModal