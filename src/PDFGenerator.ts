import { Helper } from "./Helper";
import { GeneratorFunction } from "./types/GeneratorTypes";

export class PDFGenerator {
  /**
   * This function returns the buffer for a generated PDF of manual
   * @param {any} event - The object that comes for lambda which includes the http's attributes
   * @returns {Array<any>} array of Structure Instructions
   */
  static getPDF: GeneratorFunction = async (event) => {
    try {
      const body = event.body;
      const html = Buffer.from(body.htmlBase64, 'base64').toString('utf8');
      const options = {
        format: "Letter",
        printBackground: true,
        margin: { top: "0", right: "0", bottom: "0", left: "0" },
        ...body.options,
      };

      const pdf = await Helper.getPDFBuffer(html, options);

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
