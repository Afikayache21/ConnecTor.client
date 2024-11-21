import { makeAutoObservable, runInAction } from "mobx";
import agent from "../Api/agent";
import { HomePageProjectDto, Project } from "../services/ProjectService";

export default class ProjectStore {
    allProjectRegistry = new Map<number, HomePageProjectDto>();
    projectRegistry = new Map<number, HomePageProjectDto>();
    selectedUserProjectRegistry = new Map<number, HomePageProjectDto>();
    selectedProject: Project | undefined = undefined;
    selectedProjectForBid: Project | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }
    get selectedUserProjectsByDeadline() {
        return Array.from(this.selectedUserProjectRegistry.values()).sort(
            (a, b) => Date.parse(a.deadline.toString()) - Date.parse(b.deadline.toString())
        );
    }

    get projectsByDeadline() {
        return Array.from(this.projectRegistry.values()).sort(
            (a, b) => Date.parse(a.deadline.toString()) - Date.parse(b.deadline.toString())
        );
    }

    get projects() {
        const now = new Date(); 
        return Array.from(this.allProjectRegistry.values())
            .filter(project => Date.parse(project.deadline.toString()) >= now.getTime())
            .sort((a, b) => Date.parse(a.deadline.toString()) - Date.parse(b.deadline.toString())); 
    }
    
    get groupedProjects() {
        return Object.entries(this.projectsByDeadline.reduce((projects, project) => {
            const deadline = project.deadline.toString().split('T')[0];
            projects[deadline] = projects[deadline] ? [...projects[deadline], project] : [project];
            return projects;
        }, {} as { [key: string]: HomePageProjectDto[] }));
    }

    setLoadingInitial(load: boolean) {
        this.loadingInitial = load;
    }
    setSelectedProjectForBid = async () => {
        this.selectedProjectForBid = this.selectedProject
    }

    loadProjects = async () => {
        this.loading = true;
        this.error = null;

        try {
            const result = await agent.Projects.userList();
            //console.log('API response:', result);

            runInAction(() => {
                result.forEach(project => this.setProject(project));
                this.loading = false;
            });

        } catch (err) {
            runInAction(() => {
                this.error = 'Failed to load projects.';
                console.error(err);
                this.loading = false;
            });
        }
    }

    loadSelectedUserProjects = async (userId:number) => {

        this.loading = true;
        this.error = null;

        try {
            const result = await agent.Projects.selectedUserList(userId);
            //console.log('API response:', result);

            runInAction(() => {
                result.forEach(project => this.setSelectedUserProject(project));
                this.loading = false;
            });

        } catch (err) {
            runInAction(() => {
                this.error = 'Failed to load projects.';
                console.error(err);
                this.loading = false;
            });
        }
    }

    //TODO: Add the region id to the token to get the user region
    loadAllProjects = async () => {
        debugger
        this.loading = true;
        this.error = null;

        try {
            const result = await agent.Projects.list();
            //console.log('API response:', result);

            runInAction(() => {
                result.forEach(project => this.setAllProject(project));
                this.loading = false;
            });

        } catch (err) {
            runInAction(() => {
                this.error = 'Failed to load projects.';
                console.error(err);
                this.loading = false;
            });
        }
    }

    loadProject = async (projectId: number): Promise<Project | undefined> => {
        let newProject: Project | undefined

        this.setLoadingInitial(true);
        this.error = null;
        try {
            newProject = await agent.Projects.details(projectId);
            this.selectedProject = newProject;
        } catch (error) {
            runInAction(() => {
                this.error = 'Failed to load the project details.';
                console.error(error);
            });
        } finally {
            this.setLoadingInitial(false);
        }
        return newProject;

    }

    createProject = async (project: FormData) => {
        this.loading = true;
        this.error = null;
        try {
            var res = await agent.Projects.create(project);
            runInAction(() => {
                this.setProject(res);

                //this.selectedProject = project;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.error = 'Failed to create the project.';
                console.error(error);
                this.loading = false;
            });
        }
    }

    updateProject = async (project: HomePageProjectDto) => {
        //this.loading = true;
        this.error = null;
        try {
            await agent.Projects.update(project);
            runInAction(() => {
                this.projectRegistry.set(project.id, project);
                //this.selectedProject = project;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.error = 'Failed to update the project.';
                console.error(error);
                this.loading = false;
            });
        }
    }

    deleteProject = async (id: number) => {
        this.loading = true;
        this.error = null;
        try {
            await agent.Projects.delete(id);
            runInAction(() => {
                this.projectRegistry.delete(id);
                this.loading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.error = 'Failed to delete the project.';
                console.error(error);
                this.loading = false;
            });
        }
    }

    private getProject(id: number) {
        return this.projectRegistry.get(id);
    }

    private setProject(proj: HomePageProjectDto) {
        proj.deadline = new Date(proj.deadline);
        this.projectRegistry.set(proj.projectID, proj);
    }
    private setAllProject(proj: HomePageProjectDto) {
        proj.deadline = new Date(proj.deadline);
        this.allProjectRegistry.set(proj.projectID, proj);
    }
    private setSelectedUserProject(proj: HomePageProjectDto) {
        proj.deadline = new Date(proj.deadline);
        this.selectedUserProjectRegistry.set(proj.projectID, proj);
    }
}
