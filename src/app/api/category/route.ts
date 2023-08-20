import { environment } from '@/configuration/configuration';
import { IResponseApi } from '@/interface/response-api';
import { NextResponse } from 'next/server';

export async function GET() {
  const response: IResponseApi<{ categoryId: string; description: string }> = {
    statusCode: 200,
    message: '',
    body: [],
  };
  try {
    const req = await fetch(`${environment.host}/category`);
    const data = (await req.json()) as IResponseApi<{
      categoryId: string;
      description: string;
    }>;
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
