import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import { Construct, SecretValue, Stack, StackProps } from '@aws-cdk/core';
import { CdkPipeline, SimpleSynthAction } from '@aws-cdk/pipelines';
import { CdkPipelinesDemoStage } from './cdk-pipelines-tutorial-demo-stage';

export class CdkPipelinesPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const source = new codepipeline.Artifact();
    const cloudAssembly = new codepipeline.Artifact();

    const pipeline = new CdkPipeline(this, 'Pipeline', {
      pipelineName: 'MyServicePipeline',
      cloudAssemblyArtifact: cloudAssembly,
      sourceAction: new codepipeline_actions.GitHubSourceAction({
        actionName: 'GitHub',
        output: source,
        oauthToken: SecretValue.secretsManager('github-token'),
        owner: 'BryanPan342',
        repo: 'cdk-pipelines-tutorial',
        branch: 'main',
      }),
      synthAction: SimpleSynthAction.standardYarnSynth({
        sourceArtifact: source,
        cloudAssemblyArtifact: cloudAssembly,
        buildCommand: 'yarn build',
      }),
    });

    pipeline.addApplicationStage(new CdkPipelinesDemoStage(this, 'PreProduction', {
      env: {account: this.account, region: this.region},
    }));
  }
}