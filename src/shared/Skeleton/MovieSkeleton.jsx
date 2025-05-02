import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function MovieSkeleton({ type }) {
  return (
    <div className="movie-box">
      <div className="v-item">
        {type === 1 ? (
          // Skeleton cho MovieBox type 1
          <div className="w-full">
            <Skeleton height={280} borderRadius={12} />
            <div className="mt-2">
              <Skeleton width="80%" height={20} />
              <Skeleton width="60%" height={16} className="mt-1" />
            </div>
          </div>
        ) : (
          // Skeleton cho MovieBox type 2
          <div className="flex gap-3">
            <Skeleton height={140} width={100} borderRadius={12} />
            <div className="flex-1">
              <Skeleton width="90%" height={20} />
              <Skeleton width="70%" height={16} className="mt-1" />
              <Skeleton width="40%" height={16} className="mt-1" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 