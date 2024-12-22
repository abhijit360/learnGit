"use client"
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
type PossibleInput = string | number | readonly string[] | undefined;

export default function CommandBox() {
  const [command, setCommand] = useState<PossibleInput>(undefined);
  const handleClickEnter = (e: React.KeyboardEvent) => {
    if (e.key == "Enter") {
      e.preventDefault();// prevent the enter from moving to new line
      console.log("we are submitting the following command", command);
      setCommand("");
    }
  };

  return (
    <Textarea
      rows={1} // restrict the input to just 1 line
      style={{width: "30rem", color:"white", fontWeight: "600"}}
      value={command}
      placeholder="Enter a git command"
      onChange={(e) => setCommand(e.target.value)}
      onKeyDown={handleClickEnter}
    />
  );
}
