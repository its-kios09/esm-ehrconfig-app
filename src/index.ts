import {
  getAsyncLifecycle,
  defineConfigSchema,
  getSyncLifecycle,
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
  defineConfigSchema(moduleName, configSchema);
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
