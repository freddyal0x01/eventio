import { BecomeProModalComponent } from "./components/BecomeProModal";
import { ReportBugModalComponent } from "./components/ReportBugModal";

export enum GlobalModal {
  becomePro = "becomePro",
  reportBug = "reportBug",
}

export const globalModals = {
  [GlobalModal.becomePro]: BecomeProModalComponent,
  [GlobalModal.reportBug]: ReportBugModalComponent,
};

declare module "@mantine/modals" {
  export interface MantineModalsOverride {
    modals: typeof globalModals;
  }
}
