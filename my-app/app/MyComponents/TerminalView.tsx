export default function TerminalView({
  terminalOutput,
}: {
  terminalOutput: string[];
}) {
  return (
    <div className="bg-slate-900 w-[32rem] border-2 border-white border-solid pt-2 pl-1">
      <span className="flex flex-row gap-1">
        <span className="text-blue-100 font-bold animate-flicker">{">"}</span>
        <p className="text-blue-100 font-bold">{terminalOutput}</p>
      </span>
    </div>
  );
}
