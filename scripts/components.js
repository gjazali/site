export const navbar = `
  <div class="c-navbar">
    <div class="c-navbar-logo">
      <h1 class="c-navbar-logo-text"><a href="/">G.A. Jazali</a></h1>
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
    <ul class="c-navbar-navigation">
      <li><a href="/">Home</a></li>
      <li><a href="/blog">Blog</a></li>
      <li><a href="https://static.jazali.net/documents/cv.pdf">CV</a></li>
      <li><a href="/portfolio">Portfolio</a></li>
      <li><a href="https://github.com/gjazali">GitHub</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </div>
`;

export const footer = `
  <footer>
    <p>Copyright &copy; 2026 G.A. Jazali&ensp;&middot;&ensp;<a href="https://github.com/gjazali/site/blob/main/LICENSE">MIT License</a>&ensp;&middot;&ensp;<a href="https://github.com/gjazali/site">Source code</a></p>
  </footer>
`;

export const postItemTemplate = `
  <div class="c-content-box c-e-content-box-post-list">
    <div class="c-content-subtitle">
      <p>{{ POST_CREATED }}</p>
    </div>
    <div class="c-content-title">
      <p><a href="/{{ POST_PATH }}">{{ POST_TITLE }}</a></p>
    </div>
    <div class="c-content-description">
      <p>{{ POST_DESCRIPTION }}</p>
    </div>
    <div class="c-content-tags">
      <p><b>Category:</b> {{ POST_CATEGORY }}</p>
    </div>
  </div>
`;

export const rssItemTemplate = `
  <item>
    <title>{{ RSS_ITEM_TITLE }}</title>
    <link>{{ RSS_ITEM_LINK }}</link>
    <description>{{ RSS_ITEM_DESCRIPTION }}</description>
    <pubDate>{{ RSS_ITEM_PUBLICATION_DATE }}</pubDate>
    <language>{{ RSS_ITEM_LANGUAGE }}</language>
    {{ RSS_ITEM_CATEGORIES }}
  </item>
`;

export const rssItemCategoryTemplate = `
  <category>{{ RSS_ITEM_CATEGORY }}</category>
`;
