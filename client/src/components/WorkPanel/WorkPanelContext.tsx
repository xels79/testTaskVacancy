import { createContext } from "react";

export interface IWorkPanelContext{
    setUpdateFlag: () => void
}

const WorkPanelContext = createContext<IWorkPanelContext>({
    setUpdateFlag: () => {},
});

export default WorkPanelContext;