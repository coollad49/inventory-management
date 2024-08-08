"use client"
import { useState, createContext, useEffect } from 'react'
import { firestore } from "@/app/firebase/config";
import { doc, collection, getDocs, setDoc, getDoc, deleteDoc, addDoc } from 'firebase/firestore';


const ProductContext = createContext();

const ProductProvider = ({children})=>{
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const generateNumericId = async () => {
        const counterDocRef = doc(firestore, 'counters', 'productCounter');
        const counterDocSnap = await getDoc(counterDocRef);
      
        let nextId;
        if (counterDocSnap.exists()) {
          nextId = counterDocSnap.data().count + 1;
          await setDoc(counterDocRef, { count: nextId }, { merge: true });
        } else {
          nextId = 1;
          await setDoc(counterDocRef, { count: nextId });
        }
      
        return nextId;
    };
    const fetchProducts = async () => {
        try {
          const querySnapshot = await getDocs(collection(firestore, 'inventory'));
          const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setProducts(productsData);
        } catch (error) {
          console.error('Error fetching products: ', error);
        } finally {
          setLoading(false);
        }
    };
    const addProduct = async (product) => {
        setLoading(true)
        const numericId = await generateNumericId(); // Generate the numeric ID
        const docRef = doc(collection(firestore, 'inventory'), numericId.toString());
        const docSnap = await getDoc(docRef);
      
        if (docSnap.exists()) {
          const { quantity } = docSnap.data();
          await setDoc(docRef, { ...product, id: numericId, quantity: quantity + 1 });
        } else {
            await setDoc(docRef, { ...product, id: numericId, quantity: 1 });
        }

        setLoading(false)
        await fetchProducts();
    };
    const deleteProduct = async (id) => {
        setLoading(true)
        const docRef = doc(collection(firestore, 'inventory'), id.toString())
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            const { quantity } = docSnap.data()
            if (quantity === 1) {
                await deleteDoc(docRef)
            } else {
                await setDoc(docRef, { quantity: quantity - 1 })
            }
        }

        setLoading(false)
        await fetchProducts()
    };

    useEffect(()=>{
        fetchProducts();
    },[])

    const date = (isoString)=>{
        const date = new Date(isoString);
        // Extract parts of the date
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
        const day = date.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    return(
        <ProductContext.Provider value={{products, loading, addProduct, deleteProduct, date}}>
            {children}
        </ProductContext.Provider>
    )
}

export {ProductContext, ProductProvider};