"use client";
import { Textarea } from "@/components/ui/textarea";
import sha256 from "crypto-js/sha256";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CommandBox({
  createCommit,
  branches,
  handleGitCommit,
}: {
  createCommit: (
    commitMessage: string,
    commitId: number,
    branchName: string
  ) => {};
  branches: string[];
  handleGitCommit: (command: string) => {};
}) {
  
  const [command, setCommand] = useState<string>("");
  const [commitMsg, setCommitMsg] = useState<string>("");
  const [currentBranch, setCurrentBranch] = useState<string>("");
  
  const handleClickEnter = (e: React.KeyboardEvent) => {
    if (e.key == "Enter") {
      e.preventDefault(); // prevent the enter from moving to new line
      handleGitCommit(command)
      setCommand("");
    }
  };

  function handleCreateCommit() {
    const hash: number = sha256("sha256").words[7].toString().slice(-5);
    createCommit(commitMsg, hash, currentBranch);
    setCommitMsg("");
  }

  return (
    <>
      <p className=" text-white font-bold">Git Command</p>
      <Textarea
        rows={1} // restrict the input to just 1 line
        style={{ width: "32rem", color: "white", fontWeight: "600" }}
        value={command}
        placeholder="Enter a git command"
        onChange={(e) => setCommand(e.target.value)}
        onKeyDown={handleClickEnter}
      />
      <div className="flex flex-col">
        <label className=" text-white font-bold">Create a commit</label>
        <input
          type="text"
          value={commitMsg}
          onChange={(e) => setCommitMsg(e.target.value.toString())}
          maxLength={150}
          placeholder="Enter a commit message..."
          className="p-2 h-12 mb-2 w-[32rem] text-white bg-transparent border border-solid border-white rounded-md"
        />
        <span className="flex flex-row gap-3">
          <button
            className="p-1.5 bg-white text-black font-semibold  rounded-md w-24"
            onClick={() => handleCreateCommit()}
          >
            Commit
          </button>
          {branches.length == 0 && <p className=" underline text-white font-light  self-end">Consider creating a branch</p>}
          {
            branches.length > 0 && 
          <Select onValueChange={setCurrentBranch}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Branch" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {branches.map((branchName, index) => (
                <SelectItem
                  className="bg-white "
                  key={index}
                  value={branchName}
                >
                  {branchName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>}
        </span>
      </div>
    </>
  );
}
