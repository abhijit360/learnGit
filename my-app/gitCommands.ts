import { useGlobalStore } from "./stores/globalStorage";
import type { CommitType } from "./types";

function createBranch(branchName: string) {
  const { currentBranch, branches, createBranch, updateCurrentBranch } = useGlobalStore();

  // check if there are any unstaged git commits
  const commits = branches.get(currentBranch)?.commits;
  const mergedCommits = commits?.filter((c) => c.state == "commited");
  const unstagedCommits = commits?.filter((c) => c.state != "commited");

  createBranch({
    parentBranch: currentBranch,
    fromCommit: mergedCommits[-1],
    branchName: branchName,
  });
  updateCurrentBranch(branchName,unstagedCommits ? unstagedCommits : [] as CommitType[])
}
