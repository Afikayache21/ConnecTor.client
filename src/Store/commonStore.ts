import { makeAutoObservable, runInAction } from "mobx";
import agent from "../Api/agent";
export interface ISelectOption {
    value: number;
    label: string;
}
export default class commonStore {
    allProffesios = new Map<number, string>();
    allRegions = new Map<number, string>();
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }


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

    private setProffesion(option: ISelectOption) {
        this.allProffesios.set(option.value, option.label);
    }

    private setRegion(option: ISelectOption) {
        this.allRegions.set(option.value, option.label);
    }
}
