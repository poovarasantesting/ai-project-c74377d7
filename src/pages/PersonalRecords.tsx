import { Award, Filter, Search, Dumbbell, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function PersonalRecords() {
  // Mock data - would come from a database in a real app
  const strengthRecords = [
    {
      id: 1,
      exercise: "Bench Press",
      value: "225 lbs",
      date: "April 18, 2025",
      improvement: "+15 lbs",
      isRecent: true,
    },
    {
      id: 2,
      exercise: "Squat",
      value: "315 lbs",
      date: "April 10, 2025",
      improvement: "+25 lbs",
      isRecent: true,
    },
    {
      id: 3,
      exercise: "Deadlift",
      value: "365 lbs",
      date: "March 28, 2025",
      improvement: "+40 lbs",
      isRecent: false,
    },
    {
      id: 4,
      exercise: "Shoulder Press",
      value: "135 lbs",
      date: "April 5, 2025",
      improvement: "+10 lbs",
      isRecent: false,
    },
    {
      id: 5,
      exercise: "Pull-ups",
      value: "15 reps",
      date: "April 12, 2025",
      improvement: "+3 reps",
      isRecent: false,
    },
  ];

  const cardioRecords = [
    {
      id: 1,
      exercise: "5K Run",
      value: "23:45",
      date: "April 20, 2025",
      improvement: "-1:15",
      isRecent: true,
    },
    {
      id: 2,
      exercise: "1 Mile Run",
      value: "6:30",
      date: "April 14, 2025",
      improvement: "-0:25",
      isRecent: true,
    },
    {
      id: 3,
      exercise: "10K Run",
      value: "52:10",
      date: "March 30, 2025",
      improvement: "-2:40",
      isRecent: false,
    },
    {
      id: 4,
      exercise: "400m Sprint",
      value: "1:10",
      date: "April 8, 2025",
      improvement: "-0:05",
      isRecent: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Personal Records</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button className="hidden sm:flex" size="sm">
            <Award className="mr-2 h-4 w-4" />
            Add Record
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search records..."
            className="pl-8"
          />
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Strength PRs</CardTitle>
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground mt-2">2 new this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Cardio PRs</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground mt-2">2 new this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Recent Improvements</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground mt-2">Last 30 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total PRs</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9</div>
            <p className="text-xs text-muted-foreground mt-2">All time</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="strength" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="strength">Strength</TabsTrigger>
          <TabsTrigger value="cardio">Cardio</TabsTrigger>
        </TabsList>
        
        <TabsContent value="strength">
          <Card>
            <CardHeader>
              <CardTitle>Strength Personal Records</CardTitle>
              <CardDescription>Your best lifts and strength achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {strengthRecords.map((record) => (
                  <div
                    key={record.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg border p-3 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <Dumbbell className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{record.exercise}</div>
                        <div className="text-sm text-muted-foreground">
                          {record.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 ml-12 sm:ml-0">
                      <div className="text-xl font-semibold">{record.value}</div>
                      <div className="flex items-center">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <TrendingUp className="h-3.5 w-3.5" />
                          {record.improvement}
                        </Badge>
                        {record.isRecent && (
                          <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                            New
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cardio">
          <Card>
            <CardHeader>
              <CardTitle>Cardio Personal Records</CardTitle>
              <CardDescription>Your best times and cardio achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cardioRecords.map((record) => (
                  <div
                    key={record.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg border p-3 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{record.exercise}</div>
                        <div className="text-sm text-muted-foreground">
                          {record.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 ml-12 sm:ml-0">
                      <div className="text-xl font-semibold">{record.value}</div>
                      <div className="flex items-center">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <TrendingUp className="h-3.5 w-3.5" />
                          {record.improvement}
                        </Badge>
                        {record.isRecent && (
                          <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                            New
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}