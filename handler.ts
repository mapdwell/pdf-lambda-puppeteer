import { APIGatewayProxyHandler } from "aws-lambda";
import { PDFGenerator } from "./src/PDFGenerator";

export const pdf: APIGatewayProxyHandler = async (event, _context) => {
  let body = event.body;
  if (typeof body === 'string') {
    body = JSON.parse(body);
  }
  const response = await PDFGenerator.getPDF(body);
  return response;
};
