import { Outlet } from "react-router-dom";
import { NewArtworkProvider } from "../contexts/NewArtworkContext";

function FillArtwork() {
    return (
            <NewArtworkProvider>
                <Outlet />
            </NewArtworkProvider>
    )
}

export default FillArtwork;