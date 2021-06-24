import * as cdk from '@aws-cdk/core';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
import * as path from 'path';

export class CdkPipelinesTutorialStack extends cdk.Stack {

  public readonly urlOutput: cdk.CfnOutput;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const handler = new lambda.Function(this, 'Lambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'handler.handler',
      code: lambda.Code.fromAsset(path.resolve(__dirname, 'lambda')),
    });

    const gw = new apigw.LambdaRestApi(this, 'API', {
      description: 'Endpoint for Lambda function',
      handler,
    });

    this.urlOutput = new cdk.CfnOutput(this, 'URL', {
      value: gw.url,
    });
  }
}
