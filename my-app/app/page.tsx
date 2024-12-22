"client"
import CommandBox from "./components/CommandBox";
import Title from "./components/title";
export default function Home() {
  return (
    <div className="bg-gray-800 h-screen">
      <div className="mr-60 ml-60">
        <Title />
        <CommandBox />
      </div>
    </div>
  );
}
