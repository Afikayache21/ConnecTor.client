import { makeAutoObservable, runInAction } from "mobx";
import agent from "../Api/agent";
export interface BidDto {
    proposalID: number;
    projectID: number;
    contractorID: number;
    contractorName: string;
    projectName: string;
    proposalPrice: number;
    proposalDate: Date;
    suggestedStartDate: Date;
    acceptedStatus: boolean | null;
}
export default class BidsStore {
    allBidRegistry = new Map<number, BidDto>();
    bidRegistry = new Map<number, BidDto>();
    selectedBid: BidDto | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get bidsSortedByAmount() {
        return Array.from(this.bidRegistry.values()).sort(
            (a, b) => a.proposalPrice - b.proposalPrice
        );
    }

    get bids() {
        return Array.from(this.allBidRegistry.values());
    }

    get bidsSortedByProposalDate() {
        return Array.from(this.bidRegistry.values()).sort(
            (a, b) => new Date(a.proposalDate).getTime() - new Date(b.proposalDate).getTime()
        );
    }
    get groupedBids() {
        return Object.entries(this.bidsSortedByAmount.reduce((bids, bid) => {
            const createdDate = bid.proposalDate.toString().split('T')[0];
            bids[createdDate] = bids[createdDate] ? [...bids[createdDate], bid] : [bid];
            return bids;
        }, {} as { [key: string]: BidDto[] }));
    }

    setLoadingInitial(load: boolean) {
        this.loadingInitial = load;
    }

    loadBids = async () => {
        this.loading = true;
        this.error = null;

        try {
            const result = await agent.Bids.userList();
            //console.log('API response:', result);

            runInAction(() => {
                result.forEach(bid => this.setBid(bid));
                this.loading = false;
            });
        } catch (err) {
            runInAction(() => {
                this.error = 'Failed to load bids.';
                console.error(err);
                this.loading = false;
            });
        }
    }

    // loadAllBids = async () => {
    //     this.loading = true;
    //     this.error = null;

    //     try {
    //         const result = await agent.Bids.list();
    //         console.log('API response:', result);

    //         runInAction(() => {
    //             result.forEach(bid => this.setBid(bid));
    //             this.loading = false;
    //         });
    //     } catch (err) {
    //         runInAction(() => {
    //             this.error = 'Failed to load all bids.';
    //             console.error(err);
    //             this.loading = false;
    //         });
    //     }
    // }

    // loadBid = async (id: number): Promise<BidDto | undefined> => {
    //     let bid = this.getBid(id);
    //     if (bid) {
    //         this.selectedBid = bid;
    //         return bid;
    //     } else {
    //         this.setLoadingInitial(true);
    //         this.error = null;
    //         try {
    //             bid = await agent.Bids.details(id);
    //             this.setBid(bid);
    //             runInAction(() => this.selectedBid = bid);
    //         } catch (error) {
    //             runInAction(() => {
    //                 this.error = 'Failed to load the bid details.';
    //                 console.error(error);
    //             });
    //         } finally {
    //             this.setLoadingInitial(false);
    //         }
    //         return bid;
    //     }
    // }

    // createBid = async (bid: BidDto) => {
    //     this.loading = true;
    //     this.error = null;
    //     try {
    //         await agent.Bids.create(bid);
    //         runInAction(() => {
    //             this.setBid(bid);
    //             this.selectedBid = bid;
    //             this.editMode = false;
    //             this.loading = false;
    //         });
    //     } catch (error) {
    //         runInAction(() => {
    //             this.error = 'Failed to create the bid.';
    //             console.error(error);
    //             this.loading = false;
    //         });
    //     }
    // }

    updateBid = async (bid: BidDto) => {
        this.loading = true;
        this.error = null;
        try {
            await agent.Bids.update(bid);
            runInAction(() => {
                this.bidRegistry.set(bid.proposalID, bid);
                this.selectedBid = bid;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.error = 'Failed to update the bid.';
                console.error(error);
                this.loading = false;
            });
        }
    }

    deleteBid = async (id: number) => {
        this.loading = true;
        this.error = null;
        try {
            await agent.Bids.delete(id);
            runInAction(() => {
                this.bidRegistry.delete(id);
                this.loading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.error = 'Failed to delete the bid.';
                console.error(error);
                this.loading = false;
            });
        }
    }

    private getBid(id: number) {
        return this.bidRegistry.get(id);
    }

    private setBid(bid: BidDto) {
        bid.proposalDate = new Date(bid.proposalDate); // Format date if needed
        this.bidRegistry.set(bid.proposalID, bid);
        this.allBidRegistry.set(bid.proposalID, bid);
    }
}
