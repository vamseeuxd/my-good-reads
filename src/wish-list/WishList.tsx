import React from "react";
interface WishListProps {
    listOfBook: any[];
    removeFromWishList: (book: any) => void;
}

const WishList = (prop: WishListProps) => {

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

    const renderBooksList = () => {
        if (prop.listOfBook && prop.listOfBook.length > 0) {
            return <ul  data-testid="wish-list-books-list-group" className="list-group books-list-group mt-3" style={{ maxHeight: 'calc(100vh - 250px)', overflowY: 'auto' }}>
                {
                    prop.listOfBook ? prop.listOfBook.map((bookInfo: any) => {
                        return <li key={bookInfo.id} className="list-group-item">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12">
                                            {renderTitle(bookInfo)}
                                            {renderAuthors(bookInfo)}
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer text-right">
                                    <button className="btn btn-primary" onClick={() => {
                                        prop.removeFromWishList(bookInfo);
                                    }}>Remove from Wish List</button>
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
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">My Reading Whishlist ({prop.listOfBook.length})</h5>
                    {renderBooksList()}
                </div>
            </div>
            {/* <pre>{JSON.stringify(prop.listOfBook, null, 4)}</pre> */}
        </>
    );
};

export default WishList;

