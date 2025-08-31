import { create } from "zustand";

import { GetSpacesSpaceResponseType } from "@/actions/space";

interface SpacesState {
    spaces: GetSpacesSpaceResponseType[];
    setSpaces: (spaces: GetSpacesSpaceResponseType[]) => void;
    addSpace: (space: GetSpacesSpaceResponseType) => void;
    deleteSpace: (spaceId: string) => void;
}

export const useSpacesStore = create<SpacesState>((set) => ({
    spaces: [],
    setSpaces: (spaces) => set({ spaces }),
    addSpace: (space) => set((state) => ({ spaces: [space, ...state.spaces] })),
    deleteSpace: (spaceId: string) =>
        set((state) => ({
            spaces: state.spaces.filter((space) => space.space_id !== spaceId),
        })),
}));
