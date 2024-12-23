export default interface CommitType {
  commitId: number;
  commitMessage: string;
  branchName: string;
  stagedChange?: boolean;
}

export default interface branch {
    branchName: string;
    commits: CommitType[];
    parentBranch: string;
    fromCommit: CommitType["commitId"]; // commit id to begin 
    toCommit?: CommitType["commitId"]; // branches can be 
    merged: boolean;
}