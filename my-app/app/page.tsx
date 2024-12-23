"use client";
import { useState } from "react";
import ChangeDot from "./MyComponents/ChangeDot";
import CommandBox from "./MyComponents/CommandBox";
import TerminalView from "./MyComponents/TerminalView";
import Title from "./MyComponents/Title";
import type { CommitType } from "@/types";
import { toast } from "sonner";

export default function Home() {
  const [commits, setCommits] = useState<CommitType[]>([]);
  const branches: string[] = [];
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
    if(commandComponents[1] == "branch" ){

    }
  
  }

  return (
    <div className="bg-gray-800 h-screen">
      <div className="mr-60 ml-60">
        <Title />
        <TerminalView terminalOutput="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi "/>
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
