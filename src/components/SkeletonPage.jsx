export default function SkeletonPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero skeleton */}
        <div className="text-center mb-16 space-y-4">
          <div className="h-3 w-24 bg-brand-slateAccent/40 rounded mx-auto" />
          <div className="h-8 sm:h-10 w-72 bg-brand-slateAccent/30 rounded mx-auto" />
          <div className="h-4 w-96 max-w-full bg-brand-slateAccent/20 rounded mx-auto" />
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-card rounded-xl p-6 space-y-4">
              <div className="w-12 h-12 bg-brand-slateAccent/30 rounded-lg" />
              <div className="h-4 w-3/4 bg-brand-slateAccent/30 rounded" />
              <div className="space-y-2">
                <div className="h-3 w-full bg-brand-slateAccent/20 rounded" />
                <div className="h-3 w-5/6 bg-brand-slateAccent/20 rounded" />
                <div className="h-3 w-2/3 bg-brand-slateAccent/20 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
