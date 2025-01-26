import { format } from "date-fns";
import { HistoryEntry } from "@/types";

interface HistoryTimelineProps {
  history: HistoryEntry[];
}

const HistoryTimeline = ({ history }: HistoryTimelineProps) => {
  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4">
      {history.map((entry) => (
        <div key={entry._id} className="history-item animate-fade-in">
          <div className="font-medium">{entry.userId.name}</div>
          <div className="text-sm text-muted-foreground">
            Claimed {entry.points} points
          </div>
          <div className="text-xs text-muted-foreground">
            {format(new Date(entry.timestamp), "MMM d, yyyy HH:mm")}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryTimeline;