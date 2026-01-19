import fs from "fs";
import path from "path";
import { navbar, footer } from "./components.js";
import { minifyHTML, parseYearMonth, processPotentialNull } from "./utils.js";
import {
  cvItemExperienceTemplate,
  cvItemExperienceResponsibilitiesTemplate,
  cvItemExperienceResponsibilityItemTemplate,
  cvItemExperienceProjectsTemplate,
  cvItemExperienceProjectItemTemplate,
  cvItemEducationTemplate,
  cvItemSkillsTemplate,
  cvItemHonorsAndAwardsTemplate,
  cvItemVolunteerExperienceTemplate,
  cvItemLicensesAndCertificationsTemplate,
  cvItemLanguagesTemplate,
  cvItemReferencesTemplate,
} from "./components.js";

export async function generateCV(templateFilePath, metadataFilePath, outputDirPath, outputFileName) {
  const templateFile = path.resolve(templateFilePath);
  const metadataFile = path.resolve(metadataFilePath);
  const outputDir = path.resolve(outputDirPath);

  if (!fs.existsSync(templateFile)) {
    console.log("Input file doesn't exist, skipping generation");
    return;
  }

  const template = fs.readFileSync(templateFile, "utf8");
  const metadata = JSON.parse(fs.readFileSync(metadataFile, "utf8"));

  fs.mkdirSync(outputDir, { recursive: true });

  let cvItemExperience = [];
  let cvItemEducation = [];
  let cvItemSkills = [];
  let cvItemHonorsAndAwards = [];
  let cvItemVolunteerExperience = [];
  let cvItemLicensesAndCertifications = [];
  let cvItemLanguages = [];
  let cvItemReferences = [];

  // Experience
  metadata.experience.forEach(function (x) {
    // Responsibilities
    let cvItemExperienceResponsibilityItems = [];
    let cvItemExperienceResponsibilities = "";

    if (!x.responsibilities.length == 0) {
      x.responsibilities.forEach(function(r) {
        const item = cvItemExperienceResponsibilityItemTemplate
          .replace("{{ CV_EXPERIENCE_RESPONSIBILITY_ITEM_NAME }}", r.name)
          .replace("{{ CV_EXPERIENCE_RESPONSIBILITY_ITEM_DESCRIPTION }}", r.description);
        cvItemExperienceResponsibilityItems.push(item);
      });

      cvItemExperienceResponsibilities = cvItemExperienceResponsibilitiesTemplate
        .replace("{{ CV_EXPERIENCE_RESPONSIBILITY_ITEMS }}", cvItemExperienceResponsibilityItems.join(""));
    }

    // Projects
    let cvItemExperienceProjectItems = [];
    let cvItemExperienceProjects = "";

    if (!x.projects.length == 0) {
      x.projects.forEach(function (p) {
        const item = cvItemExperienceProjectItemTemplate
          .replace("{{ CV_EXPERIENCE_PROJECT_ITEM_NAME }}", p.name)
          .replace("{{ CV_EXPERIENCE_PROJECT_ITEM_LINK }}", p.link)
          .replace("{{ CV_EXPERIENCE_PROJECT_ITEM_DESCRIPTION }}", p.description);
        cvItemExperienceProjectItems.push(item);
      });

      cvItemExperienceProjects = cvItemExperienceProjectsTemplate
        .replace("{{ CV_EXPERIENCE_PROJECT_ITEMS }}", cvItemExperienceProjectItems.join(""));
    }

    const experience = cvItemExperienceTemplate
      .replace("{{ CV_EXPERIENCE_POSITION }}", x.position)
      .replace("{{ CV_EXPERIENCE_COMPANY_SITE }}", x.company.site)
      .replace("{{ CV_EXPERIENCE_COMPANY_NAME }}", x.company.name)
      .replace("{{ CV_EXPERIENCE_TYPE }}", x.type)
      .replace("{{ CV_EXPERIENCE_DATE_START }}", parseYearMonth(x.start_date))
      .replace("{{ CV_EXPERIENCE_DATE_END }}", processPotentialNull(parseYearMonth(x.end_date), "Present"))
      .replace("{{ CV_EXPERIENCE_LOCATION }}", x.location)
      .replace("{{ CV_EXPERIENCE_ARRANGEMENT }}", x.arrangement)
      .replace("{{ CV_EXPERIENCE_DESCRIPTION }}", processPotentialNull(x.description, ""))
      .replace("{{ CV_EXPERIENCE_RESPONSIBILITIES }}", cvItemExperienceResponsibilities)
      .replace("{{ CV_EXPERIENCE_PROJECTS }}", cvItemExperienceProjects);
    cvItemExperience.push(experience);
  });

  // Education
  metadata.education.forEach(function (x) {
    const education = cvItemEducationTemplate
      .replace("{{ CV_EDUCATION_INSTITUTION_SITE }}", x.institution.site)
      .replace("{{ CV_EDUCATION_INSTITUTION_NAME }}", x.institution.name)
      .replace("{{ CV_EDUCATION_DATE_START }}", parseYearMonth(x.start_date))
      .replace("{{ CV_EDUCATION_DATE_END }}", processPotentialNull(parseYearMonth(x.end_date), "Present"))
      .replace("{{ CV_EDUCATION_LOCATION }}", x.location)
      .replace("{{ CV_EDUCATION_DEGREE }}", x.degree)
      .replace("{{ CV_EDUCATION_GRADES_NAME }}", x.grades.name)
      .replace("{{ CV_EDUCATION_GRADES_VALUE }}", x.grades.value)
      .replace("{{ CV_EDUCATION_RELEVANT_COURSES }}", x.relevant_courses.length == 0 ? "" : `<b>Relevant Courses:</b> ${x.relevant_courses.join(", ")}`)
      .replace("{{ CV_EDUCATION_DESCRIPTION }}", x.description);
    cvItemEducation.push(education);
  });

  // Skills
  metadata.skills.forEach(function (x) {
    const skills = cvItemSkillsTemplate
      .replace("{{ CV_SKILLS_NAME }}", x.name)
      .replace("{{ CV_SKILLS_LIST }}", x.list.join(", "));
    cvItemSkills.push(skills);
  });

  // Honors and Awards
  metadata.honors_and_awards.forEach(function (x) {
    const honorsAndAwards = cvItemHonorsAndAwardsTemplate
      .replace("{{ CV_HONORS_AND_AWARDS_NAME }}", x.name)
      .replace("{{ CV_HONORS_AND_AWARDS_INSTITUTION_SITE }}", x.institution.site)
      .replace("{{ CV_HONORS_AND_AWARDS_INSTITUTION_NAME }}", x.institution.name)
      .replace("{{ CV_HONORS_AND_AWARDS_DATE }}", parseYearMonth(x.date))
      .replace("{{ CV_HONORS_AND_AWARDS_DESCRIPTION }}", x.description);
    cvItemHonorsAndAwards.push(honorsAndAwards);
  });

  // Volunteer Experience
  metadata.volunteer_experience.forEach(function (x) {
    const volunteerExperience = cvItemVolunteerExperienceTemplate
      .replace("{{ CV_VOLUNTEER_EXPERIENCE_POSITION }}", x.position)
      .replace("{{ CV_VOLUNTEER_EXPERIENCE_INSTITUTION_SITE }}", x.institution.site)
      .replace("{{ CV_VOLUNTEER_EXPERIENCE_INSTITUTION_NAME }}", x.institution.name)
      .replace("{{ CV_VOLUNTEER_EXPERIENCE_DATE }}", parseYearMonth(x.date))
      .replace("{{ CV_VOLUNTEER_EXPERIENCE_DESCRIPTION }}", x.description);
    cvItemVolunteerExperience.push(volunteerExperience);
  });

  // Licenses and Certification
  metadata.licenses_and_certifications.forEach(function (x) {
    const licensesAndCertifications = cvItemLicensesAndCertificationsTemplate
      .replace("{{ CV_CERTIFICATION_LINK }}", x.certification_link)
      .replace("{{ CV_CERTIFICATION_NAME }}", x.name)
      .replace("{{ CV_CERTIFICATION_DATE }}", parseYearMonth(x.date))
      .replace("{{ CV_CERTIFICATION_INSTITUTION_SITE }}", x.institution.site)
      .replace("{{ CV_CERTIFICATION_INSTITUTION_NAME }}", x.institution.name)
      .replace("{{ CV_CERTIFICATION_DESCRIPTION }}", x.description);
    cvItemLicensesAndCertifications.push(licensesAndCertifications);
  });

  // Languages
  metadata.languages.forEach(function (x) {
    const languages = cvItemLanguagesTemplate
      .replace("{{ CV_LANGUAGES_NAME }}", x.name)
      .replace("{{ CV_LANGUAGES_PROFICIENCY }}", x.proficiency);
    cvItemLanguages.push(languages);
  });

  // References
  metadata.references.forEach(function (x) {
    const references = cvItemReferencesTemplate
      .replace("{{ CV_REFERENCES_NAME }}", x.name)
      .replace("{{ CV_REFERENCES_INSTITUTION_SITE }}", x.institution.site)
      .replace("{{ CV_REFERENCES_INSTITUTION_NAME }}", x.institution.name)
      .replace("{{ CV_REFERENCES_POSITION }}", x.position)
      .replace("{{ CV_REFERENCES_RELATIONSHIP }}", x.relationship)
      .replace("{{ CV_REFERENCES_LOCATION }}", x.location)
      .replace("{{ CV_REFERENCES_PHONE_NUMBER_DARK }}", `${x.phone_number}_dark`)
      .replace("{{ CV_REFERENCES_PHONE_NUMBER_LIGHT }}", `${x.phone_number}_light`)
      .replace("{{ CV_REFERENCES_EMAIL_ADDRESS_DARK }}", `${x.email_address}_dark`)
      .replace("{{ CV_REFERENCES_EMAIL_ADDRESS_LIGHT }}", `${x.email_address}_light`);
    cvItemReferences.push(references);
  });

  const html = template
    .replace("{{ COMPONENT_NAVBAR }}", navbar)
    .replace("{{ COMPONENT_FOOTER }}", footer)
    .replace("{{ CV_EXPERIENCE }}", cvItemExperience.join(""))
    .replace("{{ CV_EDUCATION }}", cvItemEducation.join(""))
    .replace("{{ CV_SKILLS }}", cvItemSkills.join(""))
    .replace("{{ CV_HONORS_AND_AWARDS }}", cvItemHonorsAndAwards.join(""))
    .replace("{{ CV_VOLUNTEER_EXPERIENCE }}", cvItemVolunteerExperience.join(""))
    .replace("{{ CV_VOLUNTEER_EXPERIENCE }}", cvItemVolunteerExperience.join(""))
    .replace("{{ CV_LICENSES_AND_CERTIFICATIONS }}", cvItemLicensesAndCertifications.join(""))
    .replace("{{ CV_LANGUAGES }}", cvItemLanguages.join(""))
    .replace("{{ CV_REFERENCES }}", cvItemReferences.join(""));

  const outputFilePath = path.join(
    outputDir,
    `${outputFileName}.html`
  );

  const minifiedHTML = await minifyHTML(html);

  fs.writeFileSync(outputFilePath, minifiedHTML, "utf8");

  console.log(`Generated ${outputFilePath}`);
}
