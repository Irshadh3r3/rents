import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDisputesPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Disputes</h1>
        <p className="text-muted-foreground">Manage and resolve customer disputes</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>No Active Disputes</CardTitle>
          <CardDescription>All disputes have been resolved</CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
