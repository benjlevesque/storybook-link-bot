import { Application, Context } from "probot"; // eslint-disable-line no-unused-vars
import getConfig from "probot-config";

const sendComment = async (
  context: Context,
  body: string,
  appName: string,
  prNumber: number
) => {
  const response = await context.github.issues.listComments(
    context.repo({
      creator: appName,
      number: prNumber
    })
  );

  if (response.data.length === 0) {
    context.log("Storybook", "Posting comment...");
    await context.github.issues.createComment(
      context.repo({
        body,
        number: prNumber
      })
    );
  } else {
    context.log("Storybook", "Already posted comment!");
  }
};

const loadConfig = async (context: Context) =>
  await getConfig(context, "storybook.yml", {
    body: "Browse storybook for this branch at {url}",
    checkName: "deploy-storybook",
    storybookUrlBase:
      "https://s3-eu-west-1.amazonaws.com/storybook.request.network/",
    projectName: context.repo().repo
  });

export = (app: Application) => {
  app.on("check_run.completed", async context => {
    const { check_run } = context.payload;
    const config = await loadConfig(context);

    const projectName = config.projectName;
    const expectedCheckName = config.checkName;
    const { name: checkName, conclusion, pull_requests } = check_run;
    const pr = pull_requests[0];
    const branchName = pr.head.ref;
    const url =
      config.storybookUrlBase + projectName + "/" + branchName + "/index.html";

    const body = config.body.replace("{url}", url);
    context.log("Project", projectName);
    context.log("Branch", branchName);
    context.log("CheckName", checkName);
    context.log("Expected CheckName", expectedCheckName);
    context.log("CheckConclusion", conclusion);
    context.log("Url", url);
    context.log("Body", body);

    if (checkName === expectedCheckName && conclusion === "success") {
      await sendComment(context, body, app.app.name, pr.number);
    }
  });
};
