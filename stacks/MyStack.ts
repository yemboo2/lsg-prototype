import * as sst from '@serverless-stack/resources';

export default class MyStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    // Deploy our React app
    const site = new sst.ReactStaticSite(this, 'ReactSite', {
      path: 'frontend',
    });

    // Show the URLs in the output
    this.addOutputs({
      SiteUrl: site.url,
    });
  }
}
