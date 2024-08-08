"use client"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import {useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth"
import {auth} from "@/app/firebase/config"
const SignUpForm = ()=>{
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [createUserWIthEmailAndPassword] = useCreateUserWithEmailAndPassword(auth)
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const res =  await createUserWIthEmailAndPassword(email, password);
            console.log({res})
            setEmail('')
            setPassword('')
            setFirstName('')
            setLastName('')

        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="h-screen flex justify-center items-center">
            <Card className="max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Sign Up</CardTitle>
                    <CardDescription>
                    Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                            <Label htmlFor="first-name">First name</Label>
                            <Input 
                                value={firstName}
                                onChange={(e)=> setFirstName(e.target.value)}
                                id="first-name"
                                placeholder="Max"
                                required />
                            </div>
                            <div className="grid gap-2">
                            <Label htmlFor="last-name">Last name</Label>
                            <Input
                                value={lastName}
                                onChange={(e)=> setLastName(e.target.value)}
                                id="last-name" placeholder="Robinson" required />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)}
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                value={password}
                                onChange={(e)=> setPassword(e.target.value)}
                                id="password" type="password" />
                        </div>
                        <Button type="submit" className="w-full">
                            Create an account
                        </Button>
                        <Button variant="outline" className="w-full">
                            Sign up with GitHub
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="underline">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignUpForm;