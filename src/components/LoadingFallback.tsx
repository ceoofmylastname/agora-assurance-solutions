import { Skeleton } from "@/components/ui/skeleton";

interface LoadingFallbackProps {
  height?: string;
  className?: string;
}

export const SectionSkeleton = ({ height = "h-96", className = "" }: LoadingFallbackProps) => (
  <div className={`w-full ${height} ${className} animate-pulse bg-gray-50`}>
    <div className="max-w-6xl mx-auto px-4 py-16">
      <Skeleton className="h-8 w-64 mx-auto mb-4" />
      <Skeleton className="h-4 w-96 mx-auto mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-48 w-full" />
        ))}
      </div>
    </div>
  </div>
);

export const CardGridSkeleton = () => (
  <div className="w-full min-h-96 animate-pulse bg-gray-50">
    <div className="max-w-6xl mx-auto px-4 py-16">
      <Skeleton className="h-8 w-48 mx-auto mb-4" />
      <Skeleton className="h-4 w-80 mx-auto mb-12" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
            <Skeleton className="h-12 w-12 rounded-full mb-4" />
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const ContactFormSkeleton = () => (
  <div className="w-full min-h-96 animate-pulse bg-white">
    <div className="max-w-4xl mx-auto px-4 py-16">
      <Skeleton className="h-8 w-48 mx-auto mb-4" />
      <Skeleton className="h-4 w-80 mx-auto mb-12" />
      <div className="max-w-2xl mx-auto space-y-6">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-12 w-32 mx-auto" />
      </div>
    </div>
  </div>
);