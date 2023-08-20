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

type functions = {
  book: FindBook;
  onUpdate: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export default function CardCustom({ book, onUpdate, onDelete }: functions) {
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
        <Button
          className={'bg-blue-500 mr-2'}
          onClick={() => onUpdate(book.bookid!)}
        >
          Editar
        </Button>
        <Button className={'bg-danger'} onClick={() => onDelete(book.bookid!)}>
          Eliminar
        </Button>
      </CardFooter>
    </Card>
  );
}
