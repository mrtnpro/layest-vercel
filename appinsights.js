const appInsights = require("applicationinsights");

require("dotenv").config({ path: [".env.local", ".env"] });

appInsights
  .setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING)
  .setAutoCollectRequests(true)
  .setAutoCollectPerformance(true, true)
  .setAutoCollectExceptions(true)
  .setAutoCollectDependencies(true)
  .setAutoCollectConsole(true, false)
  .setAutoCollectPreAggregatedMetrics(true)
  .setSendLiveMetrics(false)
  .setInternalLogging(false, true)
  .enableWebInstrumentation(false)
  .start();
