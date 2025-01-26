import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@/types";

interface UserSelectorProps {
  users: User[];
  selectedUser: User | null;
  onSelect: (user: User) => void;
}

const UserSelector = ({ users, selectedUser, onSelect }: UserSelectorProps) => {
  return (
    <Select
      value={selectedUser?._id}
      onValueChange={(value) => {
        const user = users.find((u) => u._id === value);
        if (user) onSelect(user);
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a user" />
      </SelectTrigger>
      <SelectContent className="max-h-[300px] overflow-y-auto">
        {/* Set a maximum height and enable scrolling */}
        {users.map((user) => (
          <SelectItem key={user._id} value={user._id}>
            {user.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default UserSelector;
