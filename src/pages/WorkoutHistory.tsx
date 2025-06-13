import { CalendarIcon, Filter, Search, Dumbbell, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function WorkoutHistory() {
  // Mock data - would come from a database in a real app
  const workouts = [
    {
      id: 1,
      name: "Upper Body",
      date: "April 24, 2025",
      duration: "45 min",
      exercises: ["Bench Press", "Shoulder Press", "Tricep Extensions", "Pull-ups"],
      category: "Strength",
    },
    {
      id: 2,
      name: "Leg Day",
      date: "April 23, 2025",
      duration: "60 min",
      exercises: ["Squats", "Leg Press", "Lunges", "Calf Raises"],
      category: "Strength",
    },
    {
      id: 3,
      name: "Core & Cardio",
      date: "April 21, 2025",
      duration: "30 min",
      exercises: ["Planks", "Russian Twists", "Mountain Climbers", "Burpees"],
      category: "Cardio",
    },
    {
      id: 4,
      name: "Full Body",
      date: "April 17, 2025",
      duration: "75 min",
      exercises: ["Deadlifts", "Push-ups", "Kettlebell Swings", "Chin-ups"],
      category: "Strength",
    },
    {
      id: 5,
      name: "HIIT Session",
      date: "April 15, 2025",
      duration: "25 min",
      exercises: ["Jumping Jacks", "High Knees", "Burpees", "Mountain Climbers"],
      category: "Cardio",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Workout History</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Filter by date
          </Button>
          <Button className="hidden sm:flex" size="sm">
            <Dumbbell className="mr-2 h-4 w-4" />
            Log Workout
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search workouts..."
            className="pl-8"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Workout type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="strength">Strength</SelectItem>
            <SelectItem value="cardio">Cardio</SelectItem>
            <SelectItem value="flexibility">Flexibility</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Workouts</CardTitle>
          <CardDescription>View and manage your workout history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workouts.map((workout) => (
              <div
                key={workout.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <Dumbbell className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{workout.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {workout.date} • {workout.duration}
                    </div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {workout.exercises.map((exercise, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {exercise}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center ml-12 sm:ml-0">
                  <Badge variant="outline" className="mr-2">
                    {workout.category}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}