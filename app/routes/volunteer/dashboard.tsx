export default function VolunteerDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Welcome Back!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Hours This Month</h3>
          <p className="text-3xl font-bold text-primary">24</p>
          <p className="text-sm text-muted-foreground">+8 from last month</p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Upcoming Events</h3>
          <p className="text-3xl font-bold text-green-600">3</p>
          <p className="text-sm text-muted-foreground">
            Next: Community Cleanup
          </p>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg border mb-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Schedule</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-3 border-b">
            <div>
              <h3 className="font-medium">Community Cleanup</h3>
              <p className="text-sm text-muted-foreground">
                Saturday, 9:00 AM - 12:00 PM
              </p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              Confirmed
            </span>
          </div>
          <div className="flex justify-between items-center py-3 border-b">
            <div>
              <h3 className="font-medium">Food Bank Support</h3>
              <p className="text-sm text-muted-foreground">
                Tuesday, 2:00 PM - 5:00 PM
              </p>
            </div>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
              Pending
            </span>
          </div>
          <div className="flex justify-between items-center py-3">
            <div>
              <h3 className="font-medium">Senior Center Visit</h3>
              <p className="text-sm text-muted-foreground">
                Friday, 10:00 AM - 1:00 PM
              </p>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              Available
            </span>
          </div>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg border">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Completed: Park Beautification Project</span>
            <span className="text-sm text-muted-foreground ml-auto">
              2 days ago
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Signed up for: Community Cleanup</span>
            <span className="text-sm text-muted-foreground ml-auto">
              5 days ago
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Updated profile information</span>
            <span className="text-sm text-muted-foreground ml-auto">
              1 week ago
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
