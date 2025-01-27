import { Trash2, Medal } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { User } from "@/types";

interface LeaderboardTableProps {
  users: User[];
  onDeleteUser: (userId: string) => void;
}

const LeaderboardTable = ({ users, onDeleteUser }: LeaderboardTableProps) => {
  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-500 animate-bounce";
      case 2:
        return "text-gray-400 animate-pulse";
      case 3:
        return "text-amber-600 animate-pulse";
      default:
        return "text-primary/50";
    }
  };

  return (
    <div className="relative overflow-x-auto rounded-xl">
      <Table>
        <TableHeader>
          <TableRow className="bg-primary/5">
            <TableHead className="w-16 text-primary font-bold">Rank</TableHead>
            <TableHead className="text-primary font-bold">Name</TableHead>
            <TableHead className="text-right text-primary font-bold">Points</TableHead>
            <TableHead className="w-16 text-primary font-bold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow
              key={user._id}
              className="transition-all duration-500 ease-in-out hover:bg-primary/5 group animate-fade-in"
              style={{
                animation: `slideIn 0.5s ease-out forwards`,
                animationDelay: `${index * 0.1}s`
              }}
            >
              <TableCell className="font-medium">
                <div className="flex items-center gap-2 transition-transform duration-300 group-hover:scale-110">
                  <Medal
                    className={`h-5 w-5 transition-all duration-300 ${getMedalColor(index + 1)}`}
                  />
                  <span className="font-bold text-lg bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    {index + 1}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <span className="font-semibold transition-colors duration-300 group-hover:text-primary">
                  {user.name}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <span className="font-bold text-lg bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-110 inline-block">
                  {user.totalPoints}
                </span>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteUser(user._id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-destructive hover:scale-110"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaderboardTable;