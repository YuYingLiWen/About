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

function createUl(attrName)
{
  return createElement("ul", "class", attrName);
}

function createLi(attrName)
{
  return createElement("li", "class", attrName);
}

function makeJobHTMLElement(jobData) {
  const sectionJob = createSection("job");
  const sectionJobHeader = createSection("job-header");
  const sectionJobHeaderLeftPanel = createSection("job-header-left-panel");
  const sectionJobHeaderRightPanel = createSection("job-header-right-panel");
  const sectionJobDescription = createSection("job-description");

  const pJobTitle = createP("job-title");
  const pJobOrganization = createP("job-title");
  const pJobLocation = createP("job-title");
  const pJobDate = createP("job-title");

  const timeFrom = createTime("date-from");
  const timeTo = createTime("date-to");

  const jobDescList = createUl("job-description-list");

  sectionJob.appendChild(sectionJobHeader);
  sectionJobHeader.appendChild(sectionJobHeaderLeftPanel);
  sectionJobHeader.appendChild(sectionJobHeaderRightPanel);
  sectionJobHeader.appendChild(sectionJobDescription);
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

async function loadJobExperiences() {
  fetch("./data/job_experiences.json").then((response) =>
    response.json().then((json) => {
      const jobs = document.getElementById("jobs");

      for (const job of json["job-experiences"]) {
        console.log(job["title"]);

        jobs.appendChild(makeJobHTMLElement(job));
      }
    })
  );
}

loadJobExperiences();
