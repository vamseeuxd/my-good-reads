import React, { useState } from 'react';
import './styles/App.scss';
import BookSearch from './book-search/BookSearch';
import WishList from './wish-list/WishList';

function App() {
  const [wishList, setwishList] = useState<any[]>([]);

  const isBookNotInWishList = (book: any): boolean => {
    return (!wishList.find(_book => (_book.id == book.id)));
  }

  const addTowishList = (book: any) => {
    if (isBookNotInWishList(book)) {
      setwishList([...wishList, book]);
    }
  }

  const removeFromWishList = (book: any) => {
    setwishList([...wishList.filter((_book: any) => (_book.id != book.id))]);
  }

  return (
    <div>
      <header className="header">
        <div className="header--content">
          <h1>My Good Reads</h1>
        </div>
      </header>
      <main className="row">
        <div className="col-md-8" data-testid="book-search-component">
          <div className="card">
            <div className="card-body">
              <BookSearch isBookNotInWishList={isBookNotInWishList} addTowishList={addTowishList} />
            </div>
          </div>
        </div>
        <div className="col-md-4" data-testid="wish-list-component">
          <WishList removeFromWishList={removeFromWishList} listOfBook={wishList}></WishList>
        </div>
      </main>

    </div>
  );
}

export default App;
