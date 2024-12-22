"use client"
import ChangeDot from "./components/ChangeDot";
import CommandBox from "./components/CommandBox";
import Title from "./components/Title";
export default function Home() {
  return (
    <div className="bg-gray-800 h-screen">
      <div className="mr-60 ml-60">
        <Title />
        <CommandBox />
        <ChangeDot commitId={1} commitMessage="testing with a really long message. I wonder how does this scale? it would be nice to see. Going even longer to test if it breaks"/>
      </div>
    </div>
  );
}
