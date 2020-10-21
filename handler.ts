import { APIGatewayProxyHandler } from "aws-lambda";
import { PDFGenerator } from "./src/PDFGenerator";

export const pdf: APIGatewayProxyHandler = async (event, _context) => {
  const response = await PDFGenerator.getPDF(event);
  return response;
};
