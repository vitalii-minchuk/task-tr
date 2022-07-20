import { FC } from "react"

import { CurrentDialogType } from "../../types"

import AddNewTrModal from "./AddNewTrModal"
import DeleteTrModal from "./DeleteTrModal"
import EditStatusModal from "./EditStatusModal"

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
    default:
      return null
  }
}

export default MainModal