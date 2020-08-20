import React, { useEffect, useState } from "react";
import { getBooksByType } from "./book-search.service";

interface BookSearchProps {
    addTowishList: (book: any) => void;
    isBookNotInWishList: (book: any) => boolean;
}

const BookSearch = (prop: BookSearchProps) => {
    const [bookType, updateBookType] = useState("");
    const [bookTypeToSearch, updateBookTypeToSearch] = useState("");
    const [allAvailableBooks, setAllAvailableBooks] = useState([]);
    async function requestBooks() {
        if (bookTypeToSearch) {
            const allBooks = await getBooksByType(bookTypeToSearch);
            setAllAvailableBooks(allBooks.items);
        }
    }

    useEffect(() => {
        async function getAllBooks() {
            await requestBooks();
        }
        getAllBooks();
    }, [bookTypeToSearch]);

    const renderDiscription = (bookInfo: any) => {
        if (bookInfo && bookInfo.searchInfo && bookInfo.searchInfo.textSnippet) {
            return <p dangerouslySetInnerHTML={{ __html: `${bookInfo.searchInfo.textSnippet}` }} className="card-text"></p>
        } else {
            return '';
        }
    }

    const renderThumbnail = (bookInfo: any) => {
        if (bookInfo && bookInfo.volumeInfo && bookInfo.volumeInfo.imageLinks && bookInfo.volumeInfo.imageLinks.thumbnail) {
            return <img className="w-100" src={bookInfo.volumeInfo.imageLinks.thumbnail}></img>
        } else {
            return '';
        }
    }

    const renderAuthors = (bookInfo: any) => {
        if (bookInfo && bookInfo.volumeInfo && bookInfo.volumeInfo.authors) {
            return <h6 className="card-subtitle mb-2 text-muted">Author(s) : {bookInfo.volumeInfo.authors.join(', ')}</h6>
        } else {
            return '';
        }
    }

    const renderTitle = (bookInfo: any) => {
        if (bookInfo && bookInfo.volumeInfo && bookInfo.volumeInfo.title) {
            return <h5 className="card-title">Title : {bookInfo.volumeInfo.title}</h5>
        } else {
            return '';
        }
    }

    const renderPublisher = (bookInfo: any) => {
        if (bookInfo && bookInfo.volumeInfo && bookInfo.volumeInfo.publisher) {
            return <h6 className="card-subtitle mb-2 text-muted">Publisher : {bookInfo.volumeInfo.publisher}</h6>
        } else {
            return '';
        }
    }

    const renderPublishedDate = (bookInfo: any) => {
        if (bookInfo && bookInfo.volumeInfo && bookInfo.volumeInfo.publishedDate) {
            return <h6 className="card-subtitle mb-2 text-muted">Published On : {bookInfo.volumeInfo.publishedDate}</h6>
        } else {
            return '';
        }
    }

    const renderBooksList = () => {
        if (bookType && bookType.length > 0) {
            return <ul className="list-group books-list-group mt-3" style={{ maxHeight: 'calc(100vh - 250px)', overflowY: 'auto' }}>
                {
                    allAvailableBooks ? allAvailableBooks.map((bookInfo: any) => {
                        return <li key={bookInfo.id} className="list-group-item">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-6 col-md-2 text-center">
                                            {renderThumbnail(bookInfo)}
                                        </div>
                                        <div className="col-sm-6 col-md-10">
                                            {renderTitle(bookInfo)}
                                            {renderAuthors(bookInfo)}
                                            {renderPublisher(bookInfo)}
                                            {renderDiscription(bookInfo)}
                                            {renderPublishedDate(bookInfo)}
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer text-right">
                                    <button disabled={!prop.isBookNotInWishList(bookInfo)} className="btn btn-primary" onClick={() => {
                                        prop.addTowishList(bookInfo);
                                    }}>Add To Wish List</button>
                                </div>
                            </div>
                        </li>
                    }) : ''
                }
            </ul>
        } else {
            return '';
        }
    }

    return (
        <>
            <div className="book--container">
                <div className="search-params">
                    <div>
                        <input
                            className="full-width form-control"
                            autoFocus
                            data-testid="search-for-books-text-input"
                            name="gsearch"
                            type="search"
                            value={bookType}
                            autoComplete="off"
                            placeholder="Search for books to add to your reading list and press Enter"
                            onChange={e => {
                                updateBookType(e.target.value);
                                updateBookTypeToSearch(bookType);
                            }}
                        />
                        {!bookType && (
                            <div className="empty">
                                <p>
                                    Try searching for a topic, for example
                                        <a onClick={() => {
                                        updateBookType("Javascript");
                                    }}
                                    >
                                        {" "}
                                            "Javascript"
                                        </a>
                                </p>
                            </div>
                        )}

                    </div>
                </div>
            </div>
            {renderBooksList()}

            {/* {<pre>{JSON.stringify(allAvailableBooks, null, 4)}</pre>} */}
        </>
    );
};

export default BookSearch;
