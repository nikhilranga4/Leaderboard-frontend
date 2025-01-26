import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LeaderboardTable from "@/components/LeaderboardTable";
import UserSelector from "@/components/UserSelector";
import AddUserForm from "@/components/AddUserForm";
import HistoryTimeline from "@/components/HistoryTimeline";
import { ThemeToggle } from "@/components/theme-toggle";
import useConfetti from "@/hooks/use-confetti";
import { User, HistoryEntry } from "@/types";
import { api } from "@/lib/api";

const Index = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [leaderboard, setLeaderboard] = useState<User[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const { toast } = useToast();
  const { triggerConfetti } = useConfetti();

  const fetchLeaderboard = async () => {
    try {
      const response = await api.get("/users/leaderboard");
      setLeaderboard(response.data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      toast({
        title: "Error",
        description: "Failed to fetch leaderboard",
        variant: "destructive",
      });
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await api.get("/users/history");
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching history:", error);
      toast({
        title: "Error",
        description: "Failed to fetch history",
        variant: "destructive",
      });
    }
  };

  const handleClaimPoints = async () => {
    if (!selectedUser) {
      toast({
        title: "Error",
        description: "Please select a user first",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await api.post(`/users/${selectedUser._id}/claim`, {
        userId: selectedUser._id
      });
      triggerConfetti();
      toast({
        title: "Points Claimed!",
        description: `${selectedUser.name} got ${response.data.history.points} points!`,
      });
      fetchLeaderboard();
      fetchHistory();
    } catch (error) {
      console.error("Error claiming points:", error);
      toast({
        title: "Error",
        description: "Failed to claim points",
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await api.delete(`/users/${userId}`);
      toast({
        title: "Success",
        description: "User deleted successfully",
      });
      if (selectedUser?._id === userId) {
        setSelectedUser(null);
      }
      fetchLeaderboard();
      fetchHistory();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    fetchHistory();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* Adjust this flex container to add spacing on mobile */}
      <div className="flex justify-between items-center mb-8 relative">
        <h1 className="text-4xl font-bold">Points Leaderboard</h1>
        <div className="absolute top-4 right-4 z-50 md:relative">
          <ThemeToggle />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="glass-card p-6 lg:col-span-2">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <UserSelector
                users={leaderboard}
                selectedUser={selectedUser}
                onSelect={setSelectedUser}
              />
            </div>
            <Button
              size="lg"
              onClick={handleClaimPoints}
              className="animate-scale-in bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={!selectedUser}
            >
              Claim Points
            </Button>
          </div>
          <LeaderboardTable
            users={leaderboard}
            onDeleteUser={handleDeleteUser}
          />
        </Card>

        <div className="flex flex-col gap-8">
          <Card className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Add New User</h2>
            <AddUserForm onSuccess={fetchLeaderboard} />
          </Card>

          <Card className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Points History</h2>
            <HistoryTimeline history={history} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
