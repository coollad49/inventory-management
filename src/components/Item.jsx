import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"


const Item = ({id, name, desc, cat, status, date})=>{
    return(
        <TableRow className="">
            <TableCell className="font-medium">
                {id}
            </TableCell>
            <TableCell>
                <div className="font-medium">{name}</div>
            </TableCell>
            <TableCell className="hidden md:table-cell">
                <div className="text-sm text-muted-foreground">
                    {desc}
                </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
                {cat}
            </TableCell>
            <TableCell className="hidden sm:table-cell">
                <Badge className="text-xs" variant="secondary">
                    {status}
                </Badge>
            </TableCell>
            <TableCell className="">
                {date}
            </TableCell>
        </TableRow>
    )
}

export default Item;