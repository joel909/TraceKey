import fetchSingleProjectDataByID from "../database/user/projects/fetchSingleProjectDetails";

export default class ProjectController {
    async fetchSingleProjectDetailsByID(id: string) {
        // code to fetch project details by ID
        const projectDetails = await fetchSingleProjectDataByID(id);
        console.log("Project Details:", projectDetails);
        return projectDetails;
    }

}

