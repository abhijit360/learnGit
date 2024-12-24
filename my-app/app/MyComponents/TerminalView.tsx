export default function TerminalView({
  terminalOutput,
}: {
  terminalOutput: JSX.Element[];
}) {
  return (
    <div className="bg-slate-900 w-[32rem] border-2 border-white border-solid pt-2 pl-1 text-blue-100">
      {terminalOutput.length == 0 && (
        <span className="text-blue-100 font-bold animate-flicker">{">"}</span>
      )}
      {terminalOutput.map((e, index) =>
        index == terminalOutput.length - 1 ? (
          <span className="flex flex-row gap-1" key={index}>
            <span className="text-blue-100 font-bold animate-flicker">
              {">"}
            </span>
            <span key={index}>{e}</span>
          </span>
        ) : (
          <span key={index} className="flex flex-row gap-1 font-bold">
            {index}
            {e}
          </span>
        )
      )}
    </div>
  );
}
