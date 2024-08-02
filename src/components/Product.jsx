import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Trash2 } from "lucide-react"
import { Button } from "./ui/button"
import { useContext } from "react"
import { ProductContext } from "@/contexts/ProductContext"

const Product = ({id, name, desc, cat, quantity, date})=>{
    const {deleteProduct} = useContext(ProductContext)
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
            <TableCell className="table-cell">
                <Badge className="text-xs" variant="secondary">
                    {quantity}
                </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
                <div>{date} </div>
            </TableCell>
            <TableCell>
                <Button onClick={()=>deleteProduct(id)} variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>
            </TableCell>
        </TableRow>
    )
}

export default Product;