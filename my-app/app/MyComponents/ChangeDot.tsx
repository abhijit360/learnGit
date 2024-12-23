import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ChangeDot({
  commitId,
  commitMessage,
  branchName,
}: {
  commitId: number;
  commitMessage: string;
  branchName: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <p className="bg-coin w-6 h-6 rounded-full"></p>
        </TooltipTrigger>
        <TooltipContent>
          <span className=" inline-block bg-coinTooltip max-w-40 max-h-32 border-solid rounded-md p-4 overflow-y-scroll ">
            <p className="text-white font-semibold">Commit: #{commitId}</p>
            <p className="text-white font-semibold">Branch: {branchName}</p>
            <p className="text-white font-semibold">Message: {commitMessage}</p>
          </span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
