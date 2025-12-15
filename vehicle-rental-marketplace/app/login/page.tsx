import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-primary">Karachi Rides</h1>
        <p className="mt-2 text-muted-foreground">Verified vehicles, trusted drivers</p>
      </div>
      <LoginForm />
    </div>
  )
}
