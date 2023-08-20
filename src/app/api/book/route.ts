import { NextApiRequest } from 'next';
import { environment } from '@/configuration/configuration';
import { NextResponse } from 'next/server';
import { IResponseApi } from '@/interface/response-api';
import { FindBook } from '@/models/find-book';

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
