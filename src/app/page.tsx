'use client';
import { Button, NextUIProvider } from '@nextui-org/react';
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

  const onUpdate = async (id: string) => {
    try {
      console.log(id);
    } catch (ex: any) {
      console.log(ex.message);
    }
  };

  const onDelete = async (id: string) => {
    try {
      console.log(id);
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

  useEffect(() => {
    fetchBaseData();
  }, []);

  return (
    <NextUIProvider>
      <main className='container flex min-h-screen flex-col p-10 '>
        <div className={'mb-4'}>
          <MNewBook key={1} Categories={categories} />
        </div>
        <div className='grid auto-rows-max grid-flow-col gap-4'>
          {books.map((book, index) => (
            <>
              <CardCustom
                key={index}
                onDelete={onDelete}
                onUpdate={onUpdate}
                book={book}
              />
            </>
          ))}
        </div>
      </main>
    </NextUIProvider>
  );
}
