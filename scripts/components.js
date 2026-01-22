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
      <li>
        <div class="c-navbar-navigation-external-link">
          <a href="https://github.com/gjazali">
            GitHub
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
              <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
            </svg>
          </a>
        </div>
      </li>
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
      <p><a href="{{ CV_EXPERIENCE_COMPANY_SITE }}">{{ CV_EXPERIENCE_COMPANY_NAME }}</a>&ensp;&middot;&ensp;{{ CV_EXPERIENCE_TYPE }}</p>
    </div>
    <div class="c-cv-item-subtitle">
      <p>{{ CV_EXPERIENCE_DATE_START }}&ndash;{{ CV_EXPERIENCE_DATE_END }}</p>
      <p>{{ CV_EXPERIENCE_LOCATION }}&ensp;&middot;&ensp;{{ CV_EXPERIENCE_ARRANGEMENT }}</p>
    </div>
    <div class="cv-ed">
      <div class="cv-ed-toggle">
        <input type="checkbox" id="cv-ed-dropdown-toggle-{{ CV_EXPERIENCE_ID }}" hidden>
        <label for="cv-ed-dropdown-toggle-{{ CV_EXPERIENCE_ID }}" class="cv-ed-toggle-show-icon" aria-label="Show details"><p>&#9654;&ensp;Show Details</p></label>
        <label for="cv-ed-dropdown-toggle-{{ CV_EXPERIENCE_ID }}" class="cv-ed-toggle-hide-icon" aria-label="Hide details"><p>&#9660;&ensp;Hide Details</p></label>
      </div>
      <div class="cv-ed-container">
        <p>{{ CV_EXPERIENCE_DESCRIPTION }}</p>
        {{ CV_EXPERIENCE_RESPONSIBILITIES }}
        {{ CV_EXPERIENCE_PROJECTS }}
      </div>
    </div>
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
      <p>{{ CV_EDUCATION_DEGREE }}</p>
    </div>
    <div class="c-cv-item-subtitle">
      <p>{{ CV_EDUCATION_DATE_START }}&ndash;{{ CV_EDUCATION_DATE_END }}</p>
      <p>{{ CV_EDUCATION_LOCATION }}</p>
    </div>
    <p><b>{{ CV_EDUCATION_GRADES_NAME }}:</b> {{ CV_EDUCATION_GRADES_VALUE }}</p>
    <div class="cv-ed">
      <div class="cv-ed-toggle">
        <input type="checkbox" id="cv-ed-dropdown-toggle-{{ CV_EDUCATION_ID }}" hidden>
        <label for="cv-ed-dropdown-toggle-{{ CV_EDUCATION_ID }}" class="cv-ed-toggle-show-icon" aria-label="Show details"><p>&#9654;&ensp;Show Details</p></label>
        <label for="cv-ed-dropdown-toggle-{{ CV_EDUCATION_ID }}" class="cv-ed-toggle-hide-icon" aria-label="Hide details"><p>&#9660;&ensp;Hide Details</p></label>
      </div>
      <div class="cv-ed-container">
        <p>{{ CV_EDUCATION_RELEVANT_COURSES }}</p>
        <p>{{ CV_EDUCATION_DESCRIPTION }}</p>
      </div>
    </div>
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
    <div class="cv-ed">
      <div class="cv-ed-toggle">
        <input type="checkbox" id="cv-ed-dropdown-toggle-{{ CV_HONORS_AND_AWARDS_ID }}" hidden>
        <label for="cv-ed-dropdown-toggle-{{ CV_HONORS_AND_AWARDS_ID }}" class="cv-ed-toggle-show-icon" aria-label="Show details"><p>&#9654;&ensp;Show Details</p></label>
        <label for="cv-ed-dropdown-toggle-{{ CV_HONORS_AND_AWARDS_ID }}" class="cv-ed-toggle-hide-icon" aria-label="Hide details"><p>&#9660;&ensp;Hide Details</p></label>
      </div>
      <div class="cv-ed-container">
        <p>{{ CV_HONORS_AND_AWARDS_DESCRIPTION }}</p>
      </div>
    </div>
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
    <div class="cv-ed">
      <div class="cv-ed-toggle">
        <input type="checkbox" id="cv-ed-dropdown-toggle-{{ CV_VOLUNTEER_EXPERIENCE_ID }}" hidden>
        <label for="cv-ed-dropdown-toggle-{{ CV_VOLUNTEER_EXPERIENCE_ID }}" class="cv-ed-toggle-show-icon" aria-label="Show details"><p>&#9654;&ensp;Show Details</p></label>
        <label for="cv-ed-dropdown-toggle-{{ CV_VOLUNTEER_EXPERIENCE_ID }}" class="cv-ed-toggle-hide-icon" aria-label="Hide details"><p>&#9660;&ensp;Hide Details</p></label>
      </div>
      <div class="cv-ed-container">
        <p>{{ CV_VOLUNTEER_EXPERIENCE_DESCRIPTION }}</p>
      </div>
    </div>
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
      <p><a href="{{ CV_REFERENCES_INSTITUTION_SITE }}">{{ CV_REFERENCES_INSTITUTION_NAME }}</a>&ensp;&middot;&ensp;{{ CV_REFERENCES_POSITION }}</p>
    </div>
    <div class="c-cv-item-subtitle">
      <p>{{ CV_REFERENCES_LOCATION }}</p>
    </div>
    <p><b>Relationship:</b> {{ CV_REFERENCES_RELATIONSHIP }}</p>

    <div class="contact-details-container">
      <div class="about-me-details-individual-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
          <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
        </svg>
        <picture>
          <source srcset="../assets/texts/{{ CV_REFERENCES_PHONE_NUMBER_DARK }}.svg" media="(prefers-color-scheme: dark)">
          <source srcset="../assets/texts/{{ CV_REFERENCES_PHONE_NUMBER_LIGHT }}.svg" media="(prefers-color-scheme: light)">
          <img class="c-text-image" alt="Main phone number" loading="lazy"/>
        </picture>
      </div>

      <div class="about-me-details-individual-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
        </svg>
        <picture>
          <source srcset="../assets/texts/{{ CV_REFERENCES_EMAIL_ADDRESS_DARK }}.svg" media="(prefers-color-scheme: dark)">
          <source srcset="../assets/texts/{{ CV_REFERENCES_EMAIL_ADDRESS_LIGHT }}.svg" media="(prefers-color-scheme: light)">
          <img class="c-text-image" alt="Main email" loading="lazy"/>
        </picture>
      </div>
    </div>
  </div>
`;
