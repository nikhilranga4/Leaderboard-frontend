import { Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { User } from "@/types";

interface LeaderboardTableProps {
  users: User[];
  onDeleteUser: (userId: string) => void;
}

const LeaderboardTable = ({ users, onDeleteUser }: LeaderboardTableProps) => {
  return (
    <div className="relative overflow-x-auto max-h-[400px] overflow-y-auto">
      {/* Use max height and scroll to make the table scrollable */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Points</TableHead>
            <TableHead className="w-16">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user._id} className="animate-fade-in">
              <TableCell className="font-medium">
                {index + 1}
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell className="text-right">{user.totalPoints}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteUser(user._id)}
                  className="hover:text-destructive"
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
