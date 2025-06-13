import { CheckCircle2, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function RecentWorkouts() {
  // Mock data - would come from a database in a real app
  const workouts = [
    {
      id: 1,
      name: "Upper Body",
      date: "Today",
      duration: "45 min",
      exercises: 8,
      isCompleted: true,
    },
    {
      id: 2,
      name: "Leg Day",
      date: "Yesterday",
      duration: "60 min",
      exercises: 6,
      isCompleted: true,
    },
    {
      id: 3,
      name: "Core & Cardio",
      date: "3 days ago",
      duration: "30 min",
      exercises: 5,
      isCompleted: true,
    },
    {
      id: 4,
      name: "Full Body",
      date: "1 week ago",
      duration: "75 min",
      exercises: 12,
      isCompleted: true,
    },
  ];

  return (
    <div className="space-y-4">
      {workouts.map((workout) => (
        <div
          key={workout.id}
          className="flex items-center justify-between rounded-lg border p-3"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              {workout.isCompleted ? (
                <CheckCircle2 className="h-5 w-5 text-primary" />
              ) : (
                <span className="h-5 w-5 rounded-full border-2 border-muted-foreground"></span>
              )}
            </div>
            <div>
              <div className="font-medium">{workout.name}</div>
              <div className="text-sm text-muted-foreground">
                {workout.date} • {workout.duration}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{workout.exercises} exercises</Badge>
            <Button variant="ghost" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}