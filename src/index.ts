import {
  getAsyncLifecycle,
  defineConfigSchema,
  getSyncLifecycle,
  registerBreadcrumbs,
} from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";
import { createLeftPanelLink } from "./left-panel-link";
const moduleName = "@openmrs/esm-ehrconfig-app";

const options = {
  featureName: "openmrs/esm-ehrconfig-app",
  moduleName,
};

export const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);

export function startupApp() {
  const ehrconfigBasepath = `${window.spaBase}/home/ehrconfigs`;

  defineConfigSchema(moduleName, configSchema);
  registerBreadcrumbs([
    {
      title: "ehrconfigs",
      path: ehrconfigBasepath,
      parent: `${window.spaBase}/home`,
    },
  ]);
}

export const root = getAsyncLifecycle(
  () => import("./root.component"),
  options
);

export const ehrconfigDashboardLink = getSyncLifecycle(
  createLeftPanelLink({
    name: "ehrconfigs",
    title: "EHR configs",
  }),
  options
);
