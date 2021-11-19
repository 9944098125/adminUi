import { Component } from "react";
import ReactPaginate from "react-paginate";
import "./index.css";

class Pagination extends Component {
  state = {
    pageNumber: 0,
  };

  changePageNumber = ({ selected }) => {
    /* this onChangePageNumber is taken as props to be used as 
      an attribute for this pagination component in the parent component   */
    const { onChangePageNumber } = this.props;
    this.setState({ pageNumber: selected });
    /* we are setting this pageNumber state as selected and we are applying that 
    to the function onChangePageNumber from props in parent component  */
    onChangePageNumber(selected);
  };

  render() {
    const { pageCount } = this.props;

    return (
      <>
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          onPageChange={this.changePageNumber}
          containerClassName={"non-active-btn"}
          activeClassName={"active-btn"}
        />
      </>
    );
  }
}

export default Pagination;
