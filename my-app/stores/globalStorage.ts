import { create } from "zustand";
import type { Branch } from "@/types";
import type { CommitType } from "@/types";
import { toast } from "sonner";

interface globalStoreInterface {
  branches: Map<string, Branch>;
  currentBranch: string;
  setCurrentBranch: (newBranch: string) => void;
  createBranch: ({
    parentBranch,
    branchName,
    fromCommit,
  }: {
    parentBranch: Branch["branchName"];
    branchName: Branch["branchName"];
    fromCommit: Branch["fromCommit"];
  }) => void;
  updateCurrentBranch: (branch: string, commits: CommitType[]) => void;
}

export const useGlobalStore = create<globalStoreInterface>((set) => ({
  branches: new Map<string, Branch>(),
  currentBranch: "",
  setCurrentBranch: (newBranch: string) => {
    set((state) => ({
      ...state,
      currentBranch: newBranch,
      branches: state.branches,
    }));
  },
  updateCurrentBranch: (branch: string, commits: CommitType[]) => set((state) => {
    const newBranches = new Map(state.branches);
    const branchObj = newBranches.get(branch)
    if(branchObj === undefined){
      toast(`Unable to update ${branch}`, {
        description:
          "Branch does not exist. Unable to update the branch",
        style: { background: "white", fontWeight: "bold", color: "black" },
      });
      return state; // unchanged state
    }else{
      branchObj["commits"] = commits;
      newBranches.set(branch, branchObj) // update the branch
      return {...state, branches:newBranches}
    }

  }),
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
