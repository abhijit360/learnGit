import { create } from "zustand";
import type { Branch } from "@/types";
import type { CommitType } from "@/types";

interface globalStoreInterface {
  branches: Map<string, Branch>;
  currentBranch: string;
}

export const useGlobalStore = create<globalStoreInterface>((set) => ({
  branches: new Map<string, Branch>(),
  currentBranch: "",
  setCurrentBranch: (newBranch: string) => {
    set((state) => {
      return { currentBranch: newBranch, branches: state.branches };
    });
  },
  createBranch: ({
    parentBranch,
    branchName,
    fromCommit,
  }: {
    parentBranch: Branch["branchName"];
    branchName: Branch["branchName"];
    fromCommit: Branch["fromCommit"];
  }) =>
    set((state) => {
      // Create a new Map to maintain immutability
      const newBranches = new Map(state.branches);
      newBranches.set(branchName, {
        merged: false,
        parentBranch,
        branchName,
        fromCommit,
        commits: [] as CommitType[],
      });
      return { currentBranch: state.currentBranch, branches: newBranches };
    }),
}));
