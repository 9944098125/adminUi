import { Component } from "react";

import UsersList from "../Users";

import Pagination from "../Pagination";

import "./index.css";

class AdminUi extends Component {
  state = {
    usersList: [],
    searchInput: "",
    limit: 10,
    offset: 0,
    setPageNumber: 0,
    selectedList: [],
  };

  componentDidMount() {
    this.getUsersList(); // after the component gets rendered this method runs whenever the page is changed
  }

  getUsersList = async () => {
    const url =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    const options = {
      method: "GET",
    }; // we are getting the details of the user from the given url
    const response = await fetch(url, options);
    const data = await response.json();
    const updatedData = data.map((eachUser) => ({
      // we are converting the details in snake case to camel case so that jsx understands
      id: eachUser.id,
      name: eachUser.name,
      email: eachUser.email,
      role: eachUser.role,
      isChecked: false,
    }));
    if (response.ok === true) {
      this.setState({ usersList: updatedData }); // we are assigning the updated data to users list
    }
  };

  onSearchInput = (event) => {
    this.setState({ searchInput: event.target.value }); // defining the searchInput as the event.
  };

  onDeleteUser = (id) => {
    const { usersList } = this.state;
    const updatedUsers = usersList.filter((each) => each.id !== id);
    // we are filtering the details of a user whose id is not equal to the deleting one

    this.setState({ usersList: updatedUsers });
  };

  onChangePageNumber = (number) => {
    console.log(number);
    this.setState({ pageNumber: number, offset: number * 10 }); // changing page with the given formula
  };

  onSelectAllCheckboxes = () => {
    this.setState((prevState) => ({
      usersList: prevState.usersList.map((eachUser) => ({
        ...eachUser,
        isChecked: !eachUser.isChecked,
      })), // selecting only the checkboxes and leaving the remaining details as they are using spread operator.
    }));
  };

  oneCheckboxSelect = (id) => {
    this.setState((prevState) => ({
      usersList: prevState.usersList.map((eachItem) => {
        if (id === eachItem.id) {
          return { ...eachItem, isChecked: !eachItem.isChecked };
        }
        return eachItem;
      }),
    })); // defining a function for selecting one checkbox
  };

  OnDeleteSelected = () => {
    const { usersList } = this.state;
    const deletedList = usersList.filter(
      (eachItem) => eachItem.isChecked === false // deleting the details of the user with selecting checkbox
    );

    this.setState({ usersList: deletedList });
  };

  render() {
    const { usersList, searchInput, limit, offset } = this.state;
    const updatedList = usersList.filter(
      // changing the searched items into lowercase to search for the results
      (eachItem) =>
        eachItem.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        eachItem.role.toLowerCase().includes(searchInput.toLowerCase()) ||
        eachItem.email.toLowerCase().includes(searchInput.toLowerCase())
    );

    const updatedInfo = updatedList.slice(offset, limit + offset);
    const pageCount = Math.ceil(usersList.length / limit);

    return (
      <div className="div-container">
        <input
          type="search"
          placeholder="Search by name email or role"
          className="search-input"
          onChange={this.onSearchInput}
        />
        <li className="admin-list-head-container">
          <input
            type="checkbox"
            className="checkbox"
            onChange={this.onSelectAllCheckboxes}
          />
          <p className="admin-desc">Name</p>
          <p className="admin-desc">Email</p>
          <p className="role-desc">Role</p>
          <p className="action">Actions</p>
        </li>
        {updatedInfo.map((eachUser) => (
          <UsersList
            key={eachUser.id}
            details={eachUser}
            onDeleteUser={this.onDeleteUser}
            oneCheckboxSelect={this.oneCheckboxSelect}
          />
        ))}
        <div className="delete-container">
          <button
            type="button"
            onClick={this.OnDeleteSelected}
            className="delete-btn"
          >
            Delete Selected
          </button>
        </div>

        <Pagination
          pageCount={pageCount}
          onChangePageNumber={this.onChangePageNumber}
        />
      </div>
    );
  }
}

export default AdminUi;
