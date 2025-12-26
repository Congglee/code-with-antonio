import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface AgentsSearchFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export default function AgentsSearchFilter({
  value,
  onChange,
}: AgentsSearchFilterProps) {
  return (
    <div className="relative">
      <Input
        placeholder="Filter by name"
        className="h-9 bg-white w-[200px] pl-7"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <SearchIcon className="absolute -translate-y-1/2 size-4 left-2 top-1/2 text-muted-foreground" />
    </div>
  );
}
