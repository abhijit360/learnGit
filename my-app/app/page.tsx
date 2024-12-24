"use client";

import ChangeDot from "./MyComponents/ChangeDot";
import CommandBox from "./MyComponents/CommandBox";
import TerminalView from "./MyComponents/TerminalView";
import Title from "./MyComponents/Title";
import type { CommitType } from "@/types";
import { useGlobalStore } from "@/stores/globalStorage";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [commits, setCommits] = useState<CommitType[]>([]);
  const [terminalOutput, setTerminalOutput] = useState<JSX.Element[]>([]);
  // const branchesArr: string[] = [];

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
      <span
        className={
          "flex flex-row gap-2" + commit.state == "unstaged"
            ? "text-red-500"
            : "text-green-400"
        }
      >
        <p>
          {"<"}
          {commit.commitId}
          {">"}
        </p>
        <p>{commit.commitMessage.slice(8)}...</p>
      </span>
    );
  }
  function handleCreateCommit(
    commitMessage: string,
    commitId: number,
    branchName: string
  ) {
    setCommits((prev) => [
      ...prev,
      {
        commitId: commitId,
        commitMessage: commitMessage,
        branchName: branchName,
      },
    ]);
  }

  function handleGitCommand(cmd: string) {
    const commandComponents = cmd.split(" ");
    if (commandComponents[0] !== "git") {
      // incorrect commands throws an error
      toast("Invalid command", {
        description:
          "The command must meet the form of git [command] [aditional information or flags]",
        style: { background: "white", fontWeight: "bold", color: "black" },
      });
      return;
    }
    if (commandComponents[1] == "branch") {
    }
  }

  return (
    <div className="bg-gray-800 h-screen">
      <div className="mr-60 ml-60">
        <Title />
        <TerminalView terminalOutput={terminalOutput} />
        <CommandBox
          createCommit={handleCreateCommit}
          handleGitCommit={handleGitCommand}
          branches={branches}
        />
        <div className="flex flex-row">
          {commits.map((commitMetaData, index) => (
            <ChangeDot
              key={index}
              commitId={commitMetaData.commitId}
              commitMessage={commitMetaData.commitMessage}
              branchName={commitMetaData.branchName}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
