import { ReceiptDto } from "@/types/Receipt";
import { create } from "zustand";

interface ReceiptStore {
  myReceiptList: ReceiptDto[];
  setMyReceiptList: (myReceiptList: ReceiptDto[]) => void;
}

export const useReceiptStore = create<ReceiptStore>((set) => ({
  myReceiptList: [],
  setMyReceiptList: (myReceiptList: ReceiptDto[]) => set({ myReceiptList }),
}));
