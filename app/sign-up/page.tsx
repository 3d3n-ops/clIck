import { SignUp } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MousePointer } from "@/components/mouse-pointer"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center justify-center gap-2">
          <MousePointer className="h-6 w-6 text-white animate-float" />
          <span className="text-xl font-semibold text-white">clIck</span>
        </div>
        
        <Card className="bg-black border-gray-800">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-white">Create an account</CardTitle>
            <CardDescription className="text-center text-gray-400">
              Join clIck to start building your mobile apps
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUp 
              appearance={{
                elements: {
                  formButtonPrimary: "bg-white text-black hover:bg-gray-200",
                  footerActionLink: "text-white hover:text-gray-200",
                  formFieldInput: "bg-gray-900 border-gray-800 text-white",
                  formFieldLabel: "text-gray-400",
                  socialButtonsBlockButton: "border-gray-800 hover:bg-gray-900 text-white",
                },
              }}
              routing="path"
              path="/sign-up"
              signInUrl="/sign-in"
              redirectUrl="/chat"
            />
          </CardContent>
        </Card>

        <div className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-white hover:text-gray-200">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
