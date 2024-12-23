"use client";
import { useState } from "react";
import ChangeDot from "./MyComponents/ChangeDot";
import CommandBox from "./MyComponents/CommandBox";
import Title from "./MyComponents/Title";
import type { CommitType } from "@/types";
import { toast } from "sonner";

export default function Home() {
  const [commits, setCommits] = useState<CommitType[]>([]);
  const branches: string[] = ["main", "branch1"];
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
        description: "The command must meet the form of git [command] [aditional information or flags]",
      });
      return;
    }
  }

  return (
    <div className="bg-gray-800 h-screen">
      <div className="mr-60 ml-60">
        <Title />
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
