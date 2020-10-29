import { Helper } from "./Helper";
import { GeneratorFunction } from "./types/GeneratorTypes";

export class PDFGenerator {
  /**
   * This function returns the buffer for a generated PDF of manual
   * @param {any} event - The object that comes for lambda which includes the http's attributes
   * @returns {Array<any>} array of Structure Instructions
   */
  static getPDF: GeneratorFunction = async (body) => {
    try {
      const pdf = await Helper.getPDFBuffer(body.url, body.html, body.options);

      return {
        headers: {
          "Content-type": "application/pdf",
        },
        statusCode: 200,
        body: pdf.toString("base64"),
        isBase64Encoded: true,
      };
    } catch (error) {
      console.error("Error : ", error);
      return {
        headers: {
          "Content-type": "application/json",
        },
        statusCode: 500,
        body: JSON.stringify({
          error,
          message: "Something went wrong",
        }),
      };
    }
  };
}
