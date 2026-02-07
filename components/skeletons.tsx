import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function HeroSkeleton() {
  return (
    <Card className="border-zinc-800 bg-zinc-900/50">
      <CardContent className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-40 bg-zinc-800" />
          <Skeleton className="h-10 w-56 bg-zinc-800" />
        </div>
        <Skeleton className="h-7 w-24 bg-zinc-800" />
      </CardContent>
    </Card>
  );
}

export function ChartSkeleton() {
  return (
    <div className="space-y-3">
      <div className="flex items-end gap-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton
            key={i}
            className="flex-1 bg-zinc-800"
            style={{ height: `${40 + Math.random() * 60}%`, minHeight: 20 }}
          />
        ))}
      </div>
      <Skeleton className="h-4 w-full bg-zinc-800" />
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 py-3">
      <Skeleton className="h-8 w-8 rounded-full bg-zinc-800" />
      <div className="flex-1 space-y-1">
        <Skeleton className="h-4 w-24 bg-zinc-800" />
        <Skeleton className="h-3 w-12 bg-zinc-800" />
      </div>
      <Skeleton className="h-4 w-16 bg-zinc-800" />
      <Skeleton className="h-4 w-20 bg-zinc-800" />
      <Skeleton className="h-4 w-14 bg-zinc-800" />
      <Skeleton className="h-8 w-24 bg-zinc-800" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-1">
      {Array.from({ length: rows }).map((_, i) => (
        <TableRowSkeleton key={i} />
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <Card className="border-zinc-800 bg-zinc-900/50">
      <CardHeader className="pb-2">
        <Skeleton className="h-4 w-32 bg-zinc-800" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-8 w-20 bg-zinc-800" />
        <Skeleton className="h-3 w-full bg-zinc-800" />
      </CardContent>
    </Card>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="space-y-1">
        <Skeleton className="h-8 w-40 bg-zinc-800" />
        <Skeleton className="h-4 w-64 bg-zinc-800" />
      </div>
      <HeroSkeleton />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <CardSkeleton />
    </div>
  );
}
