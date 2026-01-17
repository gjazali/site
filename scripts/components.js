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
      <li><a href="/cv">CV</a></li>
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
      <p>{{ POST_CREATED }}&ensp;&middot;&ensp;{{ POST_AUTHOR }}</p>
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

export const cvItemExperienceTemplate = `
  <div class="c-card">
    <div class="c-cv-item-title">
      <h3 class="c-card-title-3">{{ CV_EXPERIENCE_POSITION }}</h3>
      <p><a href="{{ CV_EXPERIENCE_COMPANY_SITE }}">{{ CV_EXPERIENCE_COMPANY_NAME }}</a></p>
    </div>
    <div class="c-cv-item-subtitle">
      <p>{{ CV_EXPERIENCE_TYPE }}</p>
      <p>{{ CV_EXPERIENCE_DATE_START }}&ndash;{{ CV_EXPERIENCE_DATE_END }}</p>
      <p>{{ CV_EXPERIENCE_LOCATION }}</p>
    </div>
    <p>{{ CV_EXPERIENCE_DESCRIPTION }}</p>
    {{ CV_EXPERIENCE_RESPONSIBILITIES }}
    {{ CV_EXPERIENCE_PROJECTS }}
  </div>
`;

export const cvItemExperienceResponsibilitiesTemplate = `
  <div class="c-card-list-container">
    <b>Responsibilities:</b>
    <ul class="c-card-ul">
      {{ CV_EXPERIENCE_RESPONSIBILITY_ITEMS }}
    </ul>
  </div>
`;

export const cvItemExperienceResponsibilityItemTemplate = `
  <li>
    <p>{{ CV_EXPERIENCE_RESPONSIBILITY_ITEM_NAME }}: {{ CV_EXPERIENCE_RESPONSIBILITY_ITEM_DESCRIPTION }}</p>
  </li>
`;

export const cvItemExperienceProjectsTemplate = `
  <div class="c-card-list-container">
    <b>Projects:</b>
    <ul class="c-card-ul">
      {{ CV_EXPERIENCE_PROJECT_ITEMS }}
    </ul>
  </div>
`;

export const cvItemExperienceProjectItemTemplate = `
  <li>
    <p><a href="{{ CV_EXPERIENCE_PROJECT_ITEM_LINK }}">{{ CV_EXPERIENCE_PROJECT_ITEM_NAME }}</a>: {{ CV_EXPERIENCE_PROJECT_ITEM_DESCRIPTION }}</p>
  </li>
`;

export const cvItemEducationTemplate = `
  <div class="c-card">
    <div class="c-cv-item-title">
      <h3 class="c-card-title-3"><a href="{{ CV_EDUCATION_INSTITUTION_SITE }}">{{ CV_EDUCATION_INSTITUTION_NAME }}</a></h3>
    </div>
    <div class="c-cv-item-subtitle">
      <p>{{ CV_EDUCATION_DEGREE }}</p>
      <p>{{ CV_EDUCATION_DATE_START }}&ndash;{{ CV_EDUCATION_DATE_END }}</p>
      <p>{{ CV_EDUCATION_LOCATION }}</p>
    </div>
    <p><b>{{ CV_EDUCATION_GRADES_NAME }}:</b> {{ CV_EDUCATION_GRADES_VALUE }}</p>
    <p>{{ CV_EDUCATION_RELEVANT_COURSES }}</p>
    <p>{{ CV_EDUCATION_DESCRIPTION }}</p>
  </div>
`;

export const cvItemSkillsTemplate = `
  <div class="c-card">
    <div class="c-cv-item-title">
      <h3 class="c-card-title-3">{{ CV_SKILLS_NAME }}</h3>
    </div>
    <p>{{ CV_SKILLS_LIST }}</p>
  </div>
`;

export const cvItemHonorsAndAwardsTemplate = `
  <div class="c-card">
    <div class="c-cv-item-title">
      <h3 class="c-card-title-3">{{ CV_HONORS_AND_AWARDS_NAME }}</h3>
      <p><a href="{{ CV_HONORS_AND_AWARDS_INSTITUTION_SITE }}">{{ CV_HONORS_AND_AWARDS_INSTITUTION_NAME }}</a></p>
    </div>
    <div class="c-cv-item-subtitle">
      <p>{{ CV_HONORS_AND_AWARDS_DATE }}</p>
    </div>
    <p>{{ CV_HONORS_AND_AWARDS_DESCRIPTION }}</p>
  </div>
`;

export const cvItemVolunteerExperienceTemplate = `
  <div class="c-card">
    <div class="c-cv-item-title">
      <h3 class="c-card-title-3">{{ CV_VOLUNTEER_EXPERIENCE_POSITION }}</h3>
      <p><a href="{{ CV_VOLUNTEER_EXPERIENCE_INSTITUTION_SITE }}">{{ CV_VOLUNTEER_EXPERIENCE_INSTITUTION_NAME }}</a></p>
    </div>
    <div class="c-cv-item-subtitle">
      <p>{{ CV_VOLUNTEER_EXPERIENCE_DATE }}</p>
    </div>
    <p>{{ CV_VOLUNTEER_EXPERIENCE_DESCRIPTION }}</p>
  </div>
`;

export const cvItemLicensesAndCertificationsTemplate = `
  <div class="c-card">
    <div class="c-cv-item-title">
      <h3 class="c-card-title-3">{{ CV_CERTIFICATION_NAME }}</h3>
      <p><a href="{{ CV_CERTIFICATION_INSTITUTION_SITE }}">{{ CV_CERTIFICATION_INSTITUTION_NAME }}</a></p>
    </div>
    <div class="c-cv-item-subtitle">
      <p>{{ CV_CERTIFICATION_DATE }}</p>
    </div>
    <p>{{ CV_CERTIFICATION_DESCRIPTION }}</p>
    <a class="c-button-link c-button" href="{{ CV_CERTIFICATION_LINK }}">View Certificate</a>
  </div>
`;

export const cvItemLanguagesTemplate = `
  <div class="c-card">
    <div class="c-cv-item-title">
      <h3 class="c-card-title-3">{{ CV_LANGUAGES_NAME }}</h3>
    </div>
    <p><b>Proficiency:</b> {{ CV_LANGUAGES_PROFICIENCY }}</p>
  </div>
`;

export const cvItemReferencesTemplate = `
  <div class="c-card">
    <div class="c-cv-item-title">
      <h3 class="c-card-title-3">{{ CV_REFERENCES_NAME }}</h3>
      <p><a href="{{ CV_REFERENCES_INSTITUTION_SITE }}">{{ CV_REFERENCES_INSTITUTION_NAME }}</a></p>
    </div>
    <div class="c-cv-item-subtitle">
      <p>{{ CV_REFERENCES_POSITION }}</p>
      <p>{{ CV_REFERENCES_LOCATION }}</p>
    </div>
    <p><b>Relationship:</b> {{ CV_REFERENCES_RELATIONSHIP }}</p>
    <p>{{ CV_REFERENCES_PHONE_NUMBER }}</p>
    <p>{{ CV_REFERENCES_EMAIL_ADDRESS }}</p>
  </div>
`;
