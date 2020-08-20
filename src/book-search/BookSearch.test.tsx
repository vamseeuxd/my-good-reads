import React from 'react';
import { render, cleanup } from '@testing-library/react';
import BookSearch from './BookSearch';

afterEach(cleanup);

it('renders "Try searching for a topic, for example"', () => {
  let wishList: any[] = [];
  const isBookNotInWishList = (book: any): boolean => {
    return (!wishList.find(_book => (_book.id == book.id)));
  }
  const addTowishList = (book: any) => {
    if (isBookNotInWishList(book)) {
      wishList = [...wishList, book];
    }
  }
  const { getByText } = render(<BookSearch isBookNotInWishList={isBookNotInWishList} addTowishList={addTowishList} />);
  const linkElement = getByText(/Try searching for a topic, for example/i);
  expect(linkElement).toBeInTheDocument();
});

it('renders "Try searching for a topic, for example"', () => {
  let wishList: any[] = [];
  const isBookNotInWishList = (book: any): boolean => {
    return (!wishList.find(_book => (_book.id == book.id)));
  }
  const addTowishList = (book: any) => {
    if (isBookNotInWishList(book)) {
      wishList = [...wishList, book];
    }
  }
  const { getByTestId } = render(<BookSearch isBookNotInWishList={isBookNotInWishList} addTowishList={addTowishList} />);
  expect( getByTestId('search-for-books-text-input') ).toBeDefined(); 
});

