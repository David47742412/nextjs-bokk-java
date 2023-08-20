import { Button, useDisclosure } from '@nextui-org/react';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/modal';
import { Input, Textarea } from '@nextui-org/input';
import { ChangeEvent, useState } from 'react';

type MNewBookProps = {
  Categories: { categoryId: string; description: string }[];
};

export default function MNewBook({ Categories }: MNewBookProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedKeys, setSelectedKeys] = useState(new Set(['text']));

  const [book, setBook] = useState({
    title: '',
    description: '',
    categoryId: '',
  });

  const onChange = (ev: ChangeEvent<any>) => {
    setBook({
      ...book,
      [ev.target.name]: ev.target.value,
    });
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
                <form>
                  <div>
                    <Input
                      className={'mb-3'}
                      type='text'
                      label='Titulo'
                      name={'title'}
                      placeholder={'Ingrese el titulo del libro'}
                      onChange={onChange}
                    />
                    <Textarea
                      name={'description'}
                      className={'mb-3'}
                      placeholder={'Descripción del libro'}
                      onChange={onChange}
                    ></Textarea>
                    <select className={'mb-3 w-full'} onChange={onChange}>
                      {Categories.map((category, index) => (
                        <option key={index} value={category.categoryId}>
                          {category.description}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Button
                    className={'w-full'}
                    color={'primary'}
                    onPress={onClose}
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
