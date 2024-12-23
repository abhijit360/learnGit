export  interface CommitType {
  commitId: number;
  commitMessage: string;
  branchName: string;
  stagedChange?: boolean;
}

export interface Branch {
    branchName: string;
    commits: CommitType[];
    parentBranch: string;
    fromCommit: CommitType["commitId"]; // commit id to begin 
    toCommit?: CommitType["commitId"]; // branches can be 
    merged: boolean;
}