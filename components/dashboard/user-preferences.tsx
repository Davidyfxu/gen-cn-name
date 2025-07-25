import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function UserPreferences() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>
          Manage your notification and language preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <h4 className="font-medium text-gray-900 mb-1">Notifications</h4>
          <div className="space-y-1">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" defaultChecked />
              <span className="text-xs">
                Email notifications for new features
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" defaultChecked />
              <span className="text-xs">Payment confirmations</span>
            </label>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-1">
            Language Preferences
          </h4>
          <select className="w-full p-1 text-sm border rounded-md">
            <option>English</option>
            <option>Chinese (Simplified)</option>
            <option>Chinese (Traditional)</option>
          </select>
        </div>

        <Button variant="outline">Save Preferences</Button>
      </CardContent>
    </Card>
  );
}
