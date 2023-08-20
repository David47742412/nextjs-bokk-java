import { environment } from '@/configuration/configuration';
import { NextRequest, NextResponse } from 'next/server';
import { IResponseApi } from '@/interface/response-api';
import { FindBook } from '@/models/find-book';

type createBook = {
  title: string;
  description: string;
  categoryId: string;
};

export async function GET() {
  const response: IResponseApi<FindBook> = {
    statusCode: 200,
    message: '',
    body: [],
  };
  try {
    const host = environment.host!;
    const req = await fetch(`${host}/book`);
    const data = (await req.json()) as IResponseApi<FindBook>;
    response.message = data.message;
    response.statusCode = data.statusCode;
    response.body = data.body;
    return new NextResponse(JSON.stringify(response), {
      status: response.statusCode,
    });
  } catch (ex: any) {
    response.statusCode = 500;
    response.message = 'Ha ocurrido un error al momento de listar los datos.';
    return new NextResponse(JSON.stringify(response), {
      status: response.statusCode,
    });
  }
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as createBook;
  try {
    const host = environment.host!;
    const req = await fetch(`${host}/book`, {
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
    });
    return NextResponse.json(await req.json());
  } catch (ex: any) {
    console.log(ex.message);
    return new NextResponse(
      JSON.stringify({
        statusCode: 500,
        message: 'Ha ocurrido un Error al momento de crear un libro',
        body: [],
      }),
      {
        status: 500,
        statusText: 'Internal Server Error',
      }
    );
  }
}

export async function PUT(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')!;
  const body = (await req.json()) as createBook;
  try {
    const host = environment.host!;
    const req = await fetch(`${host}/book/${id}`, {
      headers: {
        'content-type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(body),
    });
    return NextResponse.json(await req.json());
  } catch (ex: any) {
    console.log(ex.message);
    return new NextResponse(
      JSON.stringify({
        statusCode: 500,
        message: 'Ha ocurrido un Error al momento de actualizar un libro',
        body: [],
      })
    );
  }
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')!;
  try {
    const host = environment.host!;
    const req = await fetch(`${host}/book/${id}`, {
      method: 'DELETE',
    });
    return NextResponse.json(await req.json());
  } catch (ex: any) {
    console.log(ex.message);
    return new NextResponse(
      JSON.stringify({
        statusCode: 500,
        message: 'Ha ocurrido un Error al momento de eliminar un libro',
        body: [],
      })
    );
  }
}
