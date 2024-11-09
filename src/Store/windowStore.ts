import { makeAutoObservable } from 'mobx';

export default class WindowStore {
    isMobile: boolean = window.innerWidth < 781;
    isTablet: boolean = window.innerWidth > 780 && window.innerWidth < 1024;
    isDesktop: boolean = window.innerWidth >= 1024;

    constructor() {
        makeAutoObservable(this);
        window.addEventListener('resize', this.handleResize);
    }

    handleResize = (): void => {
        this.isMobile = window.innerWidth < 781;
        this.isTablet = window.innerWidth > 780 && window.innerWidth < 1024;
        this.isDesktop = window.innerWidth >= 1024;
    };
}

