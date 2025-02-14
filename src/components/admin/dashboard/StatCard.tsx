import { StatCardProps } from "@/interfaces/ui/components"

export const StatCard = ({ title, value, icon, alert }: StatCardProps) => (
  <div
    className={`bg-white p-6 rounded-lg shadow ${
      alert ? "border-l-4 border-red-500" : ""
    }`}
  >
    <div className="flex items-center">
      <span className="text-2xl mr-3">{icon}</span>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p
          className={`text-2xl font-bold ${
            alert ? "text-red-600" : "text-gray-900"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  </div>
)
