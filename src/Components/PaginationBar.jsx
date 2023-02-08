import { Link } from "react-router-dom"

const PaginationBar = ({animeList, pageId}) => {

  return (
    animeList.length ? (<nav
                    aria-label="Page navigation example"
                    className="d-flex justify-content-center"
                >
                    <ul className="pagination">
                        <li
                            className={
                                "page-item " +
                                (parseInt(pageId) === 1 && "disabled")
                            }
                        >
                            <Link
                                className="page-link"
                                to={
                                    "/page/" +
                                    (pageId > 1 ? parseInt(pageId) - 1 : 1)
                                }
                                aria-label="Previous"
                            >
                                <span aria-hidden="true">&laquo;</span>
                            </Link>
                        </li>
                        <li className="page-item">
                            <Link
                                className="page-link active"
                                to={"/page/" + (pageId ? pageId : 1)}
                            >
                                {pageId ? pageId : 1}
                            </Link>
                        </li>
                        <li className="page-item">
                            <Link
                                className="page-link"
                                to={
                                    "/page/" +
                                    (pageId ? parseInt(pageId) + 1 : 2)
                                }
                            >
                                {pageId ? parseInt(pageId) + 1 : 2}
                            </Link>
                        </li>
                        <li className="page-item">
                            <Link
                                className="page-link"
                                to={
                                    "/page/" +
                                    (pageId ? parseInt(pageId) + 2 : 3)
                                }
                            >
                                {pageId ? parseInt(pageId) + 2 : 3}
                            </Link>
                        </li>
                        <li className="page-item">
                            <Link
                                className="page-link"
                                to={
                                    "/page/" +
                                    (pageId ? parseInt(pageId) + 1 : 2)
                                }
                                aria-label="Next"
                            >
                                <span aria-hidden="true">&raquo;</span>
                            </Link>
                        </li>
                    </ul>
                </nav>) : <br/>
  )
}

export default PaginationBar