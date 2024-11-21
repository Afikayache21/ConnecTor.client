import { makeAutoObservable, runInAction } from "mobx";
import agent from "../Api/agent";
export interface ISelectOption {
    value: number;
    label: string;
}
export default class commonStore {
    allProffesios = new Map<number, string>();

    allRegions = new Map<number, string>();

    allProjectFileds = new Map<number, string>();

    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    //************************proffesions************************
    loadProffesions = async () => {
        try {
            const result = await agent.Common.proffesionsList();
            runInAction(() => {
                result.forEach(proffesion => this.setProffesion(proffesion));
            });

        } catch (err) {
            runInAction(() => {
                this.error = 'Failed to load Proffesions.';
                console.error(err);
            });
        }
    }

    loadProffesionById = async (id: number) => {

    }
    getProffesionById(id: number) {
        return this.allProffesios.get(id);
    }

    get proffesions(): ISelectOption[] {
        return Array.from(this.allProffesios.entries()).map(([value, label]) => ({ value, label }));
    }

    get regions(): ISelectOption[] {
        return Array.from(this.allRegions.entries()).map(([value, label]) => ({ value, label }));
    }

    get projectFileds(): ISelectOption[] {
        return Array.from(this.allProjectFileds.entries()).map(([value, label]) => ({ value, label }));
    }











    
        //************************regions************************
    //regions
    loadRegions = async () => {
        try {
            const result = await agent.Common.regionsList();
            runInAction(() => {
                result.forEach(region => this.setRegion(region));
            });

        } catch (err) {
            runInAction(() => {
                this.error = 'Failed to load Regions.';
                console.error(err);
            });
        }
    }

    getRegionById(id: number) {
        return this.allProffesios.get(id);
    }

    private setProffesion(option: ISelectOption) {
        this.allProffesios.set(option.value, option.label);
    }

    private setRegion(option: ISelectOption) {
        this.allRegions.set(option.value, option.label);
    }







    //************************projectsFileds************************
    //projectsFileds
    loadProjectsFileds = async () => {
        try {
            const result = await agent.Common.projectFiledsList();
            console.log(result);
            
            runInAction(() => {
                result.forEach(region => this.setProjectsFiled(region));
            });

        } catch (err) {
            runInAction(() => {
                this.error = 'Failed to load Regions.';
                console.error(err);
            });
        }
    }

     getProjectsFiledsById = (id: number) => {
        return this.allProjectFileds.get(id);
    }

    private setProjectsFiled(option: ISelectOption) {
        this.allProjectFileds.set(option.value, option.label);
    }

    getProjectsFiledById(id: number) {
        return this.allProjectFileds.get(id);
    }
}
