import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";

import "./index.css";

const UsersList = (props) => {
  const { details, onDeleteUser, oneCheckboxSelect } = props;
  /* These details are deconstructed and formed as we want it in the output  */
  const { id, name, email, role, isChecked } = details;

  function onSelectCheckbox() {
    oneCheckboxSelect(id); // this method is defined in the parent component
  }
  function onDeleteItem() {
    onDeleteUser(id); // this method is defined in the parent component
  }

  return (
    <li className="single-user">
      <input
        type="checkbox"
        onChange={onSelectCheckbox}
        className="checkbox-input"
        checked={isChecked}
      />
      <div className="name-email-role">
        <p className="ner">{name}</p>
        <p className="ner">{email}</p>
        <p className="ner">{role}</p>
      </div>
      <div className="buttons-container">
        <button className="edit-button">
          <AiOutlineEdit />
        </button>
        <button className="edit-button" onClick={onDeleteItem}>
          <RiDeleteBin6Fill />
        </button>
      </div>
    </li>
  );
};
export default UsersList;
