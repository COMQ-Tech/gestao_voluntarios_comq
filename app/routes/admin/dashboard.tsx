import { useLoaderData } from "react-router";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-primary">142</p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Active Volunteers</h3>
          <p className="text-3xl font-bold text-green-600">89</p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Pending Approvals</h3>
          <p className="text-3xl font-bold text-orange-600">12</p>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg border">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b">
            <span>New volunteer registration: Maria Silva</span>
            <span className="text-sm text-muted-foreground">2 hours ago</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span>Event created: Community Cleanup</span>
            <span className="text-sm text-muted-foreground">5 hours ago</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span>User role updated: João Santos → Coordinator</span>
            <span className="text-sm text-muted-foreground">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
