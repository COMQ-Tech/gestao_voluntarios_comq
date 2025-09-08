export default function AdminUsers() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      <div className="bg-card rounded-lg border">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">All Users</h2>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
              Add User
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Role</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-4">Maria Silva</td>
                <td className="p-4">maria@example.com</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    Volunteer
                  </span>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    Active
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-primary hover:underline mr-2">
                    Edit
                  </button>
                  <button className="text-destructive hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-4">João Santos</td>
                <td className="p-4">joao@example.com</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    Coordinator
                  </span>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    Active
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-primary hover:underline mr-2">
                    Edit
                  </button>
                  <button className="text-destructive hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
