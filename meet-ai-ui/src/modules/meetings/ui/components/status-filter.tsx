import CommandSelect from "@/components/command-select";
import { MeetingStatus } from "@/modules/meetings/types";
import {
  CircleArrowUpIcon,
  CircleCheckIcon,
  CircleXIcon,
  LoaderIcon,
  VideoIcon,
} from "lucide-react";

const options = [
  {
    id: MeetingStatus.Upcoming,
    value: MeetingStatus.Upcoming,
    children: (
      <div className="flex items-center capitalize gap-x-2">
        <CircleArrowUpIcon />
        {MeetingStatus.Upcoming}
      </div>
    ),
  },
  {
    id: MeetingStatus.Completed,
    value: MeetingStatus.Completed,
    children: (
      <div className="flex items-center capitalize gap-x-2">
        <CircleCheckIcon />
        {MeetingStatus.Completed}
      </div>
    ),
  },
  {
    id: MeetingStatus.Active,
    value: MeetingStatus.Active,
    children: (
      <div className="flex items-center capitalize gap-x-2">
        <VideoIcon />
        {MeetingStatus.Active}
      </div>
    ),
  },
  {
    id: MeetingStatus.Processing,
    value: MeetingStatus.Processing,
    children: (
      <div className="flex items-center capitalize gap-x-2">
        <LoaderIcon />
        {MeetingStatus.Processing}
      </div>
    ),
  },
  {
    id: MeetingStatus.Cancelled,
    value: MeetingStatus.Cancelled,
    children: (
      <div className="flex items-center capitalize gap-x-2">
        <CircleXIcon />
        {MeetingStatus.Cancelled}
      </div>
    ),
  },
];

interface StatusFilterProps {
  value: MeetingStatus | "";
  onChange: (value: MeetingStatus) => void;
}

export default function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <CommandSelect
      placeholder="Filter by status"
      options={options}
      className="h-9"
      onSelect={(value) => onChange(value as MeetingStatus)}
      value={value}
    />
  );
}
