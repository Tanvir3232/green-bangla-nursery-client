import { setSort } from "@/redux/features/filterSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
const PriceSortFilter = () => {
    const dispatch = useAppDispatch();

    return (
        <div className="text-xl font-semibold text-center text-[#083214]">
            <Select onValueChange={(value: "default" | "low" | "high") => dispatch(setSort(value))}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by price" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>

                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="low">Low to high</SelectItem>
                        <SelectItem value="high">High to Low</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

        </div>
    )
}
export default PriceSortFilter;