import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getSpaces } from "@/actions/space";
import Spaces from "./spaces";
import { Frown } from "lucide-react";

const SpacesLoader = async () => {
    const { spaces } = await getSpaces({ limit: 5, offset: 0, filter: "all" });

    if (spaces.length === 0) return <NoSpacesView />;
    return <Spaces spaces={spaces} />;
};

export default SpacesLoader;

const NoSpacesView = () => {
    return (
        <Alert>
            <Frown />
            <AlertTitle> No spaces yet. </AlertTitle>
            <AlertDescription>
                You do not have any spaces yet. Create a new space or join one
                to get started.
            </AlertDescription>
        </Alert>
    );
};
