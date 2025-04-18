import { useEffect, useState } from "react";
import { 
  ClockIcon, 
  UserIcon, 
  BookIcon, 
  HashIcon, 
  FlaskConicalIcon,
  CheckCircleIcon,
  TimerIcon
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

interface StudentPeriodCardProps {
  period: {
    id: string;
    subject: string;
    startTime: string;
    endTime: string;
    subjectCode: string;
    periodNumber: number;
    isLab: boolean;
    staff: string;
  };
  branchName: string;
  semesterNumber: string;
  periodId: string;
  day: string;
  section: string;
}

const StudentPeriodCard: React.FC<StudentPeriodCardProps> = ({
  period,
  branchName,
  semesterNumber,
  periodId,
  section,
  day,
}) => {
  const [status, setStatus] = useState<'upcoming' | 'current' | 'past'>('upcoming');
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  // Calculate period status and time remaining
  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      const start = new Date(period.startTime);
      const end = new Date(period.endTime);

      if (now < start) {
        setStatus('upcoming');
        const diff = Math.floor((start.getTime() - now.getTime()) / 60000);
        setTimeRemaining(`Starts in ${diff} min`);
      } else if (now >= start && now <= end) {
        setStatus('current');
        const diff = Math.floor((end.getTime() - now.getTime()) / 60000);
        setTimeRemaining(`${diff} min remaining`);
      } else {
        setStatus('past');
        setTimeRemaining('Completed');
      }
    };

    updateStatus();
    const interval = setInterval(updateStatus, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [period.startTime, period.endTime]);

  // Format time to readable string
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Link href={`/student/${periodId}`}>
    <Card className={cn(
      "transition-all duration-300 overflow-hidden group",
      "hover:shadow-md hover:-translate-y-1",
      status === 'current' && " shadow-sm shadow-primary/20 border-green-600",
      status === 'upcoming' && "border-muted-foreground/20",
      status === 'past' && "border-muted opacity-80"
    )}>
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
          <div className={cn(
            "rounded-full p-2",
            status === 'current' && "bg-primary/10 text-primary",
            status === 'upcoming' && "bg-muted text-muted-foreground",
            status === 'past' && "bg-muted text-muted-foreground/60"
          )}>
            <HashIcon className="w-4 h-4" />
          </div>
          <div>
            <p className="font-medium text-sm">Period {period.periodNumber}</p>
            <p className="text-xs text-muted-foreground">{day}</p>
          </div>
        </div>
        
        <Badge variant={period.isLab ? "default" : "outline"} className={cn(
          "flex items-center gap-1 transition-colors duration-300",
          period.isLab && "bg-accent text-accent-foreground",
        )}>
          <FlaskConicalIcon className="w-3 h-3" />
          {period.isLab ? 'Laboratory' : 'Theory'}
        </Badge>
      </CardHeader>

      <CardContent className="p-4 pt-2">
        <div className="space-y-4">
          {/* Subject information */}
          <div className="space-y-1">
            <h2 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
              {period.subject}
            </h2>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <BookIcon className="w-3.5 h-3.5" />
              Code: {period.subjectCode}
            </p>
          </div>
          
          {/* Time information */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2">
              <ClockIcon className="w-4 h-4 mt-0.5 text-muted-foreground" />
              <div>
                <p className="font-medium text-xs text-muted-foreground">Start</p>
                <p className="font-medium">{formatTime(period.startTime)}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <ClockIcon className="w-4 h-4 mt-0.5 text-muted-foreground rotate-180" />
              <div>
                <p className="font-medium text-xs text-muted-foreground">End</p>
                <p className="font-medium">{formatTime(period.endTime)}</p>
              </div>
            </div>
          </div>
          
          {/* Staff information */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <UserIcon className="w-4 h-4 text-muted-foreground" />
              <p>{period.staff}</p>
            </div>
            
            {/* Status indicator */}
            <div className={cn(
              "text-xs font-medium flex items-center gap-1.5 px-2 py-1 rounded-full",
              status === 'current' && "bg-primary/10 text-primary",
              status === 'upcoming' && "bg-muted text-muted-foreground",
              status === 'past' && "bg-muted text-muted-foreground/60"
            )}>
              {status === 'current' ? (
                <>
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  {timeRemaining}
                </>
              ) : status === 'upcoming' ? (
                <>
                  <TimerIcon className="w-3 h-3" />
                  {timeRemaining}
                </>
              ) : (
                <>
                  <CheckCircleIcon className="w-3 h-3" />
                  {timeRemaining}
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
};

export default StudentPeriodCard;