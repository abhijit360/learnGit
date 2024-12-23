"use client";
import { useEffect } from "react";
import ChangeDot from "./MyComponents/ChangeDot";
import CommandBox from "./MyComponents/CommandBox";
import Title from "./MyComponents/Title";

export default function Home() {
  const commits: any[] = [];
  const branches: string[] = ["main","branch1"]
  function handleCreateCommit(
    commitMessage: string,
    commitId: number,
    branchName: string
  ) {
    commits.push(
      <ChangeDot
        commitId={commitId}
        commitMessage={commitMessage}
        branchName={branchName}
      />
    );
  }
  return (
    <div className="bg-gray-800 h-screen">
      <div className="mr-60 ml-60">
        <Title />

        <CommandBox createCommit={handleCreateCommit} branches={branches} />
      </div>
    </div>
  );
}
