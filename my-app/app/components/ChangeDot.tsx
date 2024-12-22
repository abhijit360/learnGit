import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ChangeDot({
  commitId,
  commitMessage,
}: {
  commitId: number;
  commitMessage: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <p
            className="bg-coin w-8 h-8 rounded-full shadow shadow-2xl"
          ></p>
        </TooltipTrigger>
        <TooltipContent>
          <span className=" inline-block bg-coinTooltip max-w-40 max-h-32 border-solid rounded-md p-4 overflow-y-scroll ">
            <p className="text-white font-semibold">Commit: #{commitId}</p>
            <p className="text-white font-semibold">Message: {commitMessage}</p>
          </span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
