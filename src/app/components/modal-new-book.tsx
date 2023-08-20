import { Button, useDisclosure } from '@nextui-org/react';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/modal';
import { Input, Textarea } from '@nextui-org/input';
import { ChangeEvent, useState } from 'react';
import { FindBook } from '@/models/find-book';
import { IResponseApi } from '@/interface/response-api';

type MNewBookProps = {
  Categories: { categoryId: string; description: string }[];
  outAction: (books: FindBook[]) => void;
};

export default function MNewBook({ Categories, outAction }: MNewBookProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [book, setBook] = useState({
    title: '',
    description: '',
    categoryId: '',
  });

  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setBook({
      ...book,
      [ev.target.name]: ev.target.value,
    });
  };

  const onSelectOption = (ev: ChangeEvent<HTMLSelectElement>) => {
    setBook({
      ...book,
      categoryId: ev.target.value,
    });
  };

  const onSubmit = async (ev: ChangeEvent<HTMLFormElement>) => {
    ev.preventDefault();
    try {
      if (book.categoryId == '' || book.categoryId == 'default') {
        alert('Debe seleccionar una categoría');
        return;
      }

      const req = await fetch('api/book', {
        method: 'POST',
        body: JSON.stringify(book),
        headers: {
          'content-type': 'application/json',
        },
      });

      const reqJson = (await req.json()) as IResponseApi<FindBook>;
      if (reqJson.message) {
        alert(reqJson.message);
        return;
      }
      outAction(reqJson.body);
      onClose();
    } catch (ex: any) {
      console.log(ex.message);
    }
  };

  return (
    <>
      <Button className={'bg-green-400'} onPress={onOpen}>
        Nuevo Libro
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1 text-center'>
                Nuevo Libro
              </ModalHeader>
              <ModalBody className={'mb-2'}>
                <form onSubmit={onSubmit}>
                  <div>
                    <Input
                      isRequired
                      className={'mb-3'}
                      type='text'
                      label='Titulo'
                      name={'title'}
                      placeholder={'Ingrese el titulo del libro'}
                      onChange={onChange}
                    />
                    <Textarea
                      label={'Descripción'}
                      isRequired
                      name={'description'}
                      className={'mb-3'}
                      placeholder={'Descripción del libro'}
                      onChange={onChange}
                    ></Textarea>
                    <select
                      className={
                        'mb-3 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      }
                      onChange={onSelectOption}
                    >
                      <option value='default'>Seleccione una categoría</option>
                      {Categories.map((category, index) => (
                        <option key={index} value={category.categoryId}>
                          {category.description}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Button
                    type={'submit'}
                    className={'w-full'}
                    color={'primary'}
                  >
                    Guardar
                  </Button>
                </form>
                <Button
                  className={'bg-danger'}
                  variant='light'
                  onClick={onClose}
                >
                  Cerrar
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
