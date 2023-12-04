import { Badge } from "@radix-ui/themes";
import { Status } from "@prisma/client";

const statusColor: Record<
  Status,
  { label: string; color: "red" | "green" | "violet" }
> = {
  OPEN: { label: "Open", color: "red" },
  CLOSED: { label: "Closed", color: "green" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
};

const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusColor[status].color}>{statusColor[status].label}</Badge>
  );
};

export default StatusBadge;
