import { createContext } from "react"
import { IWarningDialog } from "../components/WarningDialog/WarningDialog";

interface IDialogContext{
    showDialog: ( params:IWarningDialog ) => void,
    hideDialog: () => void
}

export const DialogContext = createContext<IDialogContext>({
    showDialog: function (params: IWarningDialog): void {
        throw new Error("Function not implemented.");
    },
    hideDialog: function (): void {
        throw new Error("Function not implemented.");
    }
});