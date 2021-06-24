import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

export default async function handler (
  ev: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  return {
    body: 'Hello from Lambda',
    statusCode: 200,
  };
}