import React from 'react';
import { render, cleanup } from '@testing-library/react';
import WishList from './WishList';

afterEach(cleanup);

it('renders "My Reading Whishlist"', () => {
  let wishList: any[] = [];
  const removeFromWishList = (book: any) => {
    wishList = [...wishList.filter((_book: any) => (_book.id != book.id))];
  }
  const { getByText } = render(<WishList removeFromWishList={removeFromWishList} listOfBook={wishList}></WishList>);
  const linkElement = getByText(/My Reading Whishlist/i);
  expect(linkElement).toBeInTheDocument();
});

it('Whishlist container Book Item', () => {
  let wishList: any[] = [
    {
      volumeInfo: {
        authors: ['Test1'],
        title: 'Test1',
        id: 'Test1'
      }
    }, {
      volumeInfo: {
        authors: ['Test2'],
        title: 'Test2',
        id: 'Test2'
      }
    }
  ];
  const removeFromWishList = (book: any) => {
    wishList = [...wishList.filter((_book: any) => (_book.id != book.id))];
  }
  const { getByTestId } = render(<WishList removeFromWishList={removeFromWishList} listOfBook={wishList}></WishList>);
  expect( getByTestId('wish-list-books-list-group') ).toBeDefined();
});
