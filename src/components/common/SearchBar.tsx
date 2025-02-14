import { SearchBarProps } from "@/interfaces/common/common"
import { Input } from "../ui/Input"

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  return (
    <div className="max-w-2xl mx-auto">
      <Input
        type="search"
        placeholder="Search for books..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full"
      />
    </div>
  )
}
