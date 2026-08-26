import { config } from "./config.js";

const externalLinkIcon = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
            <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
          </svg>`;

function renderNavigationItem(item) {
  if (!item.external) {
    return `
      <li><a href="${item.href}">${item.label}</a></li>`;
  }

  return `
      <li>
        <div class="c-button-icon-aligner">
          <a href="${item.href}">
            ${item.label}
          </a>${externalLinkIcon}
        </div>
      </li>`;
}

export function renderNavbar() {
  const navigationItems = config.navigation
    .map(renderNavigationItem)
    .join("");

  return `
  <div class="c-navbar">
    <div class="c-navbar-logo">
      <h1 class="c-navbar-logo-text"><a href="/">${config.site.name}</a></h1>
      <div class="c-navbar-hamburger-toggle">
        <input type="checkbox" id="navbar-dropdown-toggle" hidden>
        <label for="navbar-dropdown-toggle" class="c-navbar-hamburger-toggle-icon" aria-label="Toggle menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
          </svg>
        </label>
        <label for="navbar-dropdown-toggle" class="c-navbar-close-toggle-icon" aria-label="Close menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
          </svg>
        </label>
      </div>
    </div>
    <ul class="c-navbar-navigation">${navigationItems}
    </ul>
  </div>
`;
}

export function renderFooter() {
  const { site } = config;

  return `
  <footer>
    <p>Copyright &copy; ${site.copyright_year} ${site.name}&ensp;&middot;&ensp;<a href="${site.license_url}">${site.license_name}</a>&ensp;&middot;&ensp;<a href="${site.source_code_url}">Source code</a></p>
  </footer>
`;
}
