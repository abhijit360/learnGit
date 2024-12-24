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
  const [branchesArr, setBrancesArr] = useState<string[]>([]);
  const { currentBranch, branches } = useGlobalStore();
  const [unstagedCommits, setUnstagedCommits] = useState<CommitType[]>([]);

  useEffect(() => {
    // update the available branches
    setBrancesArr(Array.from(branches.keys()));
  }, [branches]);

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

  function displayBranches(branches: string[]) {
    return branches.map((branchName, index) =>
      branchName == currentBranch ? (
        <span key={index} className=" text-green-500">
          *{branchName}
        </span>
      ) : (
        <span key={index}>{branchName}</span>
      )
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

  function handleGitCommand(inputCommand: string) {
    // Regex to match the Git command structure
    const commandRegex = /^git\s+([a-z-]+)(.*)$/;
    const match = inputCommand.match(commandRegex);

    if (!match) {
      // incorrect commands throws an error
      toast("Invalid command", {
        description:
          "The command must meet the form of git [command] [aditional information or flags]",
        style: { background: "white", fontWeight: "bold", color: "black" },
      });
      return;
    }

    // Extract the base command
    const baseCommand = match[1];

    // Split the remaining part into tokens for options and positional arguments
    const remainingParts = match[2].trim().split(/\s+/);

    const options: string[] = [];
    const positionalArgs: string[] = [];

    remainingParts.forEach((part) => {
      if (part.startsWith("-")) {
        options.push(part);
      } else {
        positionalArgs.push(part);
      }
    });

    // Extract quoted arguments
    const args = [...inputCommand.matchAll(/['"]([^'"]*)['"]/g)].map(
      (match) => match[1]
    );
    console.log("paresed format", [
      baseCommand,
      {
        options,
        positionalArgs,
        quotedArgs: args,
      },
    ]);
    return [
      baseCommand, // branch, merge
      {
        options, // flags etc
        positionalArgs,
        quotedArgs: args,
      },
    ];
  }

  return (
    <div className="bg-gray-800 h-screen">
      <div className="mr-60 ml-60">
        <Title />
        <TerminalView
          terminalOutput={[
            <span className="flex flex-row gap-2 text-red-500"> Unstaged</span>,
            <span className="flex flex-row gap-2 text-red-500"> Unstaged</span>,
            <span className="flex flex-row gap-2 text-red-500"> Unstaged</span>,
            <span className="flex flex-row gap-2 text-red-500"> Unstaged</span>,
          ]}
        />
        <CommandBox
          createCommit={handleCreateCommit}
          handleGitCommit={handleGitCommand}
          branches={branchesArr}
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
