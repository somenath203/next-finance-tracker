import { create } from 'zustand';


const userGlobalStore = create((set) => ({

    loggedInUserInGlobalStore: null,

    setLoggedInUserInGlobalStore: (user: any) => set({ loggedInUserInGlobalStore: user })

}));


export default userGlobalStore;

