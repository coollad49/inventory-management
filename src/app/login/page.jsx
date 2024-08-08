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
import {useSignInWithEmailAndPassword} from "react-firebase-hooks/auth"
import { auth } from "@/app/firebase/config"
import { useRouter } from "next/navigation"
const LoginForm =()=> {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth)
    const router = useRouter()

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const res = await signInWithEmailAndPassword(email, password)
            console.log({res})
            setEmail('')
            setPassword('')
            router.push('/')

        } catch(error){
            console.error(error)
        }
        
    }
    return (
        <div className="h-screen flex justify-center items-center">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                    Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid gap-4">
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
                            <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link href="#" className="ml-auto inline-block text-sm underline">
                                Forgot your password?
                            </Link>
                            </div>
                            <Input
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            id="password" type="password" required />
                        </div>
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                        <Button variant="outline" className="w-full">
                            Login with Google
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/sign-up" className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card> 
        </div>
        
    )
}

export default LoginForm;