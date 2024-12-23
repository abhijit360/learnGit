"use client";
import { useState } from "react";
import ChangeDot from "./MyComponents/ChangeDot";
import CommandBox from "./MyComponents/CommandBox";
import Title from "./MyComponents/Title";
import type {CommitType} from "@/types";

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

  function handleGitCommand(cmd: string){
    
  }

  return (
    <div className="bg-gray-800 h-screen">
      <div className="mr-60 ml-60">
        <Title />
        <CommandBox createCommit={handleCreateCommit} branches={branches} />
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
