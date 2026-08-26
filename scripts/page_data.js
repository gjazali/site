import { renderNavbar, renderFooter } from "./components.js";
import {
  config,
  resolvePageTitle,
  resolveStylesheetHref,
  resolveAssetsHref,
  resolveFeedList
} from "./config.js";

export function buildPageData(page, extraData) {
  return {
    config: config,
    navbar: renderNavbar(),
    footer: renderFooter(),
    title: resolvePageTitle(page),
    heading: page.heading,
    stylesheetHref: resolveStylesheetHref(),
    assetsHref: resolveAssetsHref(),
    feeds: resolveFeedList(),
    ...extraData
  };
}
