import * as sst from '@serverless-stack/resources';
import { LambdaEdgeEventType, experimental } from '@aws-cdk/aws-cloudfront';
import * as lambda from '@aws-cdk/aws-lambda';

export default class MyStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    /**
     * Lamda edge method functioning ad proxy for the
     * website provide password protection.
     */
    const edgeFunc = new experimental.EdgeFunction(this, 'proxy', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'proxy.handler',
      code: lambda.Code.fromAsset('src'),
      stackId: `${scope.logicalPrefixedName('edge-lambda')}`,
    });

    /**
     * React static webiste
     */
    const site = new sst.ReactStaticSite(this, 'ReactSite', {
      path: 'frontend',
      cfDistribution: {
        defaultBehavior: {
          edgeLambdas: [
            {
              functionVersion: edgeFunc.currentVersion,
              eventType: LambdaEdgeEventType.VIEWER_REQUEST,
            },
          ],
        },
      },
    });

    // Show the URLs in the output
    this.addOutputs({
      SiteUrl: site.url,
    });
  }
}
