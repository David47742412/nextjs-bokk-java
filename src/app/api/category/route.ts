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
    const req = await fetch(`${environment.host}/category`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = (await req.json()) as IResponseApi<{
      categoryId: string;
      description: string;
    }>;
    console.log(data);
    return NextResponse.json(data);
  } catch (ex: any) {
    response.statusCode = 500;
    response.message = 'Ha ocurrido un error al momento de listar los datos.';
    return new NextResponse(JSON.stringify(response), {
      status: response.statusCode,
    });
  }
}
