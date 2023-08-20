import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
} from '@nextui-org/react';
import { FindBook } from '@/models/find-book';
import MNewBook from '@/app/components/modal-new-book';

type functions = {
  book: FindBook;
  onDelete: (id: string) => Promise<void>;
  categories: { categoryId: string; description: string }[];
  outAction: (books: FindBook[]) => void;
};

export default function CardCustom({
  book,
  categories,
  onDelete,
  outAction,
}: functions) {
  return (
    <Card className='max-w-[400px]'>
      <CardHeader className='flex gap-3'>
        <div className='flex flex-col'>
          <p className='text-md'>{book.title}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{book.description}</p>
      </CardBody>
      <Divider />
      <CardFooter className={'justify-center'}>
        <MNewBook
          key={1}
          Categories={categories}
          outAction={outAction}
          findUpd={book}
        />
        <Button
          className={'ml-2 bg-danger'}
          onClick={() => onDelete(book.bookid!)}
        >
          Eliminar
        </Button>
      </CardFooter>
    </Card>
  );
}
