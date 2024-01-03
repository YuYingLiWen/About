function init() {}

function createElement(elementName, attribute, attrName) {
  const element = document.createElement(elementName);
  element.setAttribute(attribute, attrName);
  return element;
}

function createSection(attrName) {
  return createElement("section", "class", attrName);
}

function createP(attrName) {
  return createElement("p", "class", attrName);
}

function createTime(attrName) {
  return createElement("time", "class", attrName);
}

function createUl(attrName) {
  return createElement("ul", "class", attrName);
}

function createLi(attrName) {
  return createElement("li", "class", attrName);
}

function createH3(attrName) {
  return createElement("h3", "class", attrName);
}

function makeJobHTMLElement(jobData) {
  const sectionJob = createSection("job");
  const sectionJobHeader = createSection("job-header");
  const sectionJobHeaderLeftPanel = createSection("job-header-left-panel");
  const sectionJobHeaderRightPanel = createSection("job-header-right-panel");
  const sectionJobDescription = createSection("job-description");

  const pJobTitle = createH3("job-title");

  const pJobOrganization = createP("job-organization");
  const pJobLocation = createP("job-location");
  const pJobDate = createP("job-date");

  const timeFrom = createTime("date-from");
  const timeTo = createTime("date-to");

  const jobDescList = createUl("job-description-list");

  sectionJob.appendChild(sectionJobHeader);
  sectionJob.appendChild(sectionJobDescription);
  sectionJobHeader.appendChild(sectionJobHeaderLeftPanel);
  sectionJobHeader.appendChild(sectionJobHeaderRightPanel);
  sectionJobHeaderLeftPanel.appendChild(pJobTitle);
  sectionJobHeaderLeftPanel.appendChild(pJobOrganization);
  sectionJobHeaderLeftPanel.appendChild(pJobLocation);
  sectionJobHeaderRightPanel.appendChild(pJobDate);
  sectionJobDescription.appendChild(jobDescList);

  pJobTitle.textContent = jobData["title"];
  pJobOrganization.textContent = jobData["organization"];
  pJobLocation.textContent = jobData["location"];

  timeFrom.textContent =
    jobData["time-from-month"] + " " + jobData["time-from-year"];
  timeTo.textContent = jobData["time-to-month"] + " " + jobData["time-to-year"];

  pJobDate.textContent = " ― ";
  pJobDate.prepend(timeFrom);
  pJobDate.appendChild(timeTo);

  for (const task of jobData["job-description"]) {
    const taskItem = createLi("job-description-list-item");
    taskItem.textContent = task;
    jobDescList.appendChild(taskItem);
  }

  return sectionJob;
}

function makeProjectHTMLElement(jobData) {

}

async function loadJobExperiences() {
  fetch("./data/job_experiences.json").then((response) =>
    response.json().then((json) => {
      const jobsAnchor = document.getElementById("jobs");

      for (const job of json["job-experiences"]) {
        jobsAnchor.appendChild(makeJobHTMLElement(job));
      }
    })
  );
}

async function loadProjects() {
  fetch("./data/job_experiences.json")
    .then((response) => response.json())
    .then((json) => {
      const projectAnchor = document.getElementById("projects");

      for (const project of json["projects"]) {
        projectAnchor.appendChild(makeProjectHTMLElement(project));
      }
    });
}

loadJobExperiences();
