"use client";
import { useGlobalStore } from "@/stores/globalStorage";
import type { CommitType } from "@/types";
import { useEffect, useState } from "react";
export default function StagingWindow() {
  const { currentBranch, branches } = useGlobalStore();
  const [unstagedCommits, setUnstagedCommits] = useState<CommitType[]>([]);

  function getUnstagedCommits() {
    const commits = branches.get(currentBranch)?.commits;
    if (commits === undefined) {
      // branches has yet to have any commits to it
      return setUnstagedCommits([] as CommitType[]);
    } else {
      // if c.stagedChange == undefined/false will be filtered
      setUnstagedCommits(commits.filter((c) => c.state != "commited"));
    }
  }

  useEffect(() => {
    getUnstagedCommits();
  }, [currentBranch, branches]);

  function displayCommit(commit: CommitType) {
    return (
      <span className={"flex flex-row gap-2" + commit.state == "unstaged" ? "text-red-500" : "text-green-400"}>
        <p>
          {"<"}
          {commit.commitId}
          {">"}
        </p>
        <p>{commit.commitMessage.slice(8)}...</p>
      </span>
    );
  }

  return (
    <div className="border-solid border-slate-400 border-2 rounded-sm  min-h-12 max-h-40 overflow-scroll">
      <p className="inline-block underline text-center">Staging Window</p>
      {unstagedCommits.map(displayCommit)}
    </div>
  );
}
