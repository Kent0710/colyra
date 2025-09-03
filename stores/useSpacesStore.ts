import { create } from "zustand";

import { GetSpacesSpaceResponseType } from "@/actions/space";

interface SpacesState {
    spaces: GetSpacesSpaceResponseType[];
    hasBeenModified: boolean;
    setSpaces: (spaces: GetSpacesSpaceResponseType[]) => void;
    addSpace: (space: GetSpacesSpaceResponseType) => void;
    deleteSpace: (spaceId: string) => void;
}

export const useSpacesStore = create<SpacesState>((set) => ({
    spaces: [],
    hasBeenModified: false,
    setSpaces: (spaces) => set({ spaces }),
    addSpace: (space) => set((state) => ({ 
        spaces: [space, ...state.spaces],
        hasBeenModified: true 
    })),
    deleteSpace: (spaceId: string) =>
        set((state) => ({
            spaces: state.spaces.filter((space) => space.space_id !== spaceId),
            hasBeenModified: true,
        })),
}));
