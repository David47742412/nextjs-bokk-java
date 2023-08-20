import { Button, useDisclosure } from '@nextui-org/react';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/modal';
import { Input, Textarea } from '@nextui-org/input';
import { ChangeEvent, useEffect, useState } from 'react';
import { FindBook } from '@/models/find-book';
import { IResponseApi } from '@/interface/response-api';

type MNewBookProps = {
  Categories: { categoryId: string; description: string }[];
  outAction: (books: FindBook[]) => void;
  findUpd?: FindBook;
};

export default function MNewBook({
  Categories,
  outAction,
  findUpd,
}: MNewBookProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [titleBtn, setTitleBtn] = useState('Nuevo libro');
  const [actionModal, setActionModal] = useState('Crear');

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

  useEffect(() => {
    if (findUpd) {
      setActionModal('Actualizar');
      setTitleBtn('Editar');
      setBook({
        title: findUpd.title ?? 'fue nulo',
        description: findUpd.description!,
        categoryId: findUpd.categoryid!,
      });
    }
  }, []);

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

      const req = await fetch(`api/book?id=${findUpd?.bookid}`, {
        method: !findUpd ? 'POST' : 'PUT',
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
      <Button
        className={`${!findUpd ? 'bg-green-400' : 'bg-blue-500'}`}
        onPress={onOpen}
      >
        {titleBtn}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1 text-center'>
                {actionModal} Libro
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
                      value={book.title}
                    />
                    <Textarea
                      label={'Descripción'}
                      isRequired
                      name={'description'}
                      className={'mb-3'}
                      placeholder={'Descripción del libro'}
                      onChange={onChange}
                      value={book.description}
                    ></Textarea>
                    <select
                      className={
                        'mb-3 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      }
                      onChange={onSelectOption}
                      value={book.categoryId ?? 'default'}
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
                    {actionModal}
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
