import { CfnOutput, Construct, Stage, StageProps } from '@aws-cdk/core';
import { CdkPipelinesTutorialStack } from './cdk-pipelines-tutorial-stack';

export class CdkPipelinesDemoStage extends Stage {

  public readonly urlOutput: CfnOutput;

  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    const service = new CdkPipelinesTutorialStack(this, 'Webservice');

    this.urlOutput = service.urlOutput;
  }
}