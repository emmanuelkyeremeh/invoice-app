import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const darkMode = atom({
  key: "darkModeAtom",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const invoices = atom({
  key: "invoiceList",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const displayFilter = atom({
  key: "filter",
  default: [true, true, true],
  effects_UNSTABLE: [persistAtom],
});
