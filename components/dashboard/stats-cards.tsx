import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Sparkles, Calendar } from "lucide-react";
import { User } from "@supabase/supabase-js";

interface StatsCardsProps {
  credits: number;
  generationsCount: number;
  user: User;
}

export function StatsCards({
  credits,
  generationsCount,
  user,
}: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
          <CardTitle className="text-sm font-medium">
            Available Credits
          </CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="pt-1">
          <div className="text-xl font-bold">{credits}</div>
          <p className="text-xs text-muted-foreground">
            Each generation costs 1 credit
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
          <CardTitle className="text-sm font-medium">Names Generated</CardTitle>
          <Sparkles className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="pt-1">
          <div className="text-xl font-bold">{generationsCount}</div>
          <p className="text-xs text-muted-foreground">Total names created</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
          <CardTitle className="text-sm font-medium">Member Since</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="pt-1">
          <div className="text-xl font-bold">
            {user?.created_at
              ? new Date(user.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })
              : "Recently"}
          </div>
          <p className="text-xs text-muted-foreground">Account creation date</p>
        </CardContent>
      </Card>
    </div>
  );
}
