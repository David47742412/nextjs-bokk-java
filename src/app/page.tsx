'use client';
import { NextUIProvider } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { FindBook } from '@/models/find-book';
import CardCustom from '@/app/components/card-custom';
import { IResponseApi } from '@/interface/response-api';
import MNewBook from '@/app/components/modal-new-book';

export default function Home() {
  const [books, setBooks] = useState<FindBook[]>([]);
  const [categories, setCategories] = useState<
    { categoryId: string; description: string }[]
  >([]);

  useEffect(() => {
    fetchBaseData();
  }, []);

  const onActionResult = (books: FindBook[]) => {
    setBooks(books);
  };

  const onUpdate = async (id: string) => {
    try {
      console.log(id);
    } catch (ex: any) {
      console.log(ex.message);
    }
  };

  const onDelete = async (id: string) => {
    try {
      const req = await fetch(`api/book?id=${id}`, {
        method: 'DELETE',
      });
      const reqJson = (await req.json()) as IResponseApi<FindBook>;
      if (reqJson.message) {
        alert(reqJson.message);
      }
      setBooks(reqJson.body);
    } catch (ex: any) {
      console.log(ex.message);
    }
  };

  const fetchBaseData = async () => {
    try {
      const resBooks = await fetch('api/book');
      const resCategories = await fetch('api/category');
      const categories = (await resCategories.json()) as IResponseApi<{
        categoryId: string;
        description: string;
      }>;
      const books = (await resBooks.json()) as IResponseApi<FindBook>;
      setBooks(books.body);
      setCategories(categories.body);
    } catch (ex: any) {
      console.log(ex.message);
    }
  };

  return (
    <NextUIProvider>
      <main className='container flex min-h-screen flex-col p-10 '>
        <div className={'mb-4'}>
          <MNewBook
            key={1}
            Categories={categories}
            outAction={onActionResult}
          />
        </div>
        <div className='grid auto-rows-max grid-flow-col gap-4'>
          {books.map((book, index) => (
            <CardCustom
              key={index}
              onDelete={onDelete}
              onUpdate={onUpdate}
              book={book}
            />
          ))}
        </div>
      </main>
    </NextUIProvider>
  );
}
