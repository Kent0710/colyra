import { getSpaces } from "@/actions/space";
import Spaces from "./spaces";

const SpacesLoader = async () => {
    const { spaces, error } = await getSpaces({ limit: 5, filter: "all" });

    if (error) return <div>Error loading spaces: {error}</div>;
    if (spaces.length === 0) return <div>No spaces</div>;
    return <Spaces spaces={spaces} />;
};

export default SpacesLoader;
