"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from './ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { useContext, useState} from 'react';
import { ProductContext } from '@/contexts/ProductContext';

const ProductForm = ()=>{
    const {addProduct, loading} = useContext(ProductContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = {
          name,
          description,
          category,
          date: new Date().toISOString(), // Current date
          quantity: 1, // Initial quantity
        };
        await addProduct(productData);
        setName('');
        setDescription('');
        setCategory('');
      };

    return(
        <Card className="md:w-[40%]">
            <CardHeader>
                <CardTitle className="capitalize">Add to Inventory</CardTitle>
                <CardDescription>Your inventory kinda look empty</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required/>
                    <Textarea placeholder="Describe your Product" value={description} onChange={(e)=> setDescription(e.target.value)}/>
                    <Select value={category} onValueChange={setCategory} required>
                        <SelectTrigger className="">
                            <SelectValue placeholder="Product Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Category</SelectLabel>
                                <SelectItem value="electronics">Electronics</SelectItem>
                                <SelectItem value="furniture">Furniture</SelectItem>
                                <SelectItem value="clothing">Clothing</SelectItem>
                                <SelectItem value="books">Books</SelectItem>
                                <SelectItem value="toys">Toys</SelectItem>
                                <SelectItem value="groceries">Groceries</SelectItem>
                                <SelectItem value="sports-equipment">Sports Equipment</SelectItem>
                                <SelectItem value="health-beauty">Health & Beauty</SelectItem>
                                <SelectItem value="home-appliances">Home Appliances</SelectItem>
                                <SelectItem value="stationery">Stationery</SelectItem>
                                <SelectItem value="automotive">Automotive</SelectItem>
                                <SelectItem value="jewelry">Jewelry</SelectItem>
                                <SelectItem value="garden-supplies">Garden Supplies</SelectItem>
                                <SelectItem value="pet-supplies">Pet Supplies</SelectItem>
                                <SelectItem value="office-supplies">Office Supplies</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <div className="flex justify-between">
                        <Button type="button" onClick={() => { setName(''); setDescription(''); setCategory(''); }}>Clear</Button>
                        {loading ? <Button disabled><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait</Button> : <Button variant="outline" className="px-8" type="submit" >Add</Button>}
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default ProductForm;