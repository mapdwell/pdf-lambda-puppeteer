# Generating PDF within AWS Lambda with NodeJs and Puppeteer.

To get started,

1. Clone the project.
2. Run `npm install`.
3. Install [serverless](https://www.serverless.com/) globally: `npm install -g serverless`.
4. Configure `aws_access_key_id` and `aws_secret_access_key` credentials. https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html
5. Ensure that your default AWS `region` (configured in ~/.aws/config, for example) matches the default in `serverless.yml`, which is `us-east-1`.
6. To invoke the lambda locally, run `npm start`. The serverless-offline service will output a lambda endpoint: the default is `http://localhost:3002`.
   ```
   offline: Offline [http for lambda] listening on http://localhost:3002
   ```
   The local function name is `pdf-lambda-puppeteer-local-pdf`.
7. To deploy the lambda, run `npm run deploy-prod`. The prod function name is `pdf-lambda-puppeteer-prod-pdf`.
8. Enjoy generating PDF documents :)
