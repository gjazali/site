import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const projectRootDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);

export const config = JSON.parse(
  fs.readFileSync(path.join(projectRootDir, "config.json"), "utf8")
);

export function resolvePageTitle(page) {
  if (page.title_page_name != null) {
    const { page_title_prefix, page_title_suffix } = config.site;

    return [page_title_prefix, page.title_page_name, page_title_suffix]
      .filter((part) => part != null)
      .join(" ");
  }

  return page.title != null ? page.title : config.site.name;
}

export function resolveTemplatePath(templateFileName) {
  return path.join(config.directories.templates, templateFileName);
}

export function resolveContentPath(contentFileName) {
  return path.join(config.directories.content, contentFileName);
}

export function resolveOutputPath(outputRelativePath) {
  return path.join(config.directories.output, outputRelativePath);
}

export function resolveStylesheetHref() {
  return `/${config.stylesheet.output_name}.css`;
}

export function resolveAssetsHref() {
  return `/${config.directories.output_assets}`;
}

export function resolveFeedHref(section) {
  if (section.feed == null) return null;

  return `/${section.route}/${section.feed.output_name}`;
}

export function resolveFeedList() {
  return config.sections
    .filter((section) => section.feed != null)
    .map((section) => ({
      title: resolvePageTitle({ title_page_name: section.heading }),
      href: resolveFeedHref(section),
    }));
}
