"use client"
import { useState, createContext, useContext } from 'react'
import { ProductContext } from './ProductContext';

const SearchContext = createContext();

const SearchProvider = ({children})=>{
    const {products} = useContext(ProductContext)
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return(
        <SearchContext.Provider value={{searchQuery, handleSearchChange, filteredProducts}}>
            {children}
        </SearchContext.Provider>
    )
}

export {SearchContext, SearchProvider}