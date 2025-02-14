import { ActivityItemProps } from "@/interfaces/ui/components"
import { formatDistanceToNow } from "date-fns"

export const ActivityItem = ({ activity }: ActivityItemProps) => (
  <div className="px-6 py-4 border-b last:border-b-0 hover:bg-gray-50">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm font-medium text-gray-900">{activity.type}</p>
        <p className="text-sm text-gray-500">{activity.description}</p>
      </div>
      <span className="text-xs text-gray-500">
        {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
      </span>
    </div>
  </div>
)
