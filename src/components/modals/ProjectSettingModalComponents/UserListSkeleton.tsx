'use client';

export function UserListSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-2"
        >
          <div className="flex-1">
            <div className="h-4 w-40 bg-gray-300 rounded animate-pulse" />
          </div>
          <div className="h-7 w-20 bg-gray-300 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}

export function AddUserSkeleton() {
  return (
    <div className="flex gap-2">
      <div className="flex-1 h-10 bg-gray-300 rounded-lg animate-pulse" />
      <div className="h-10 w-12 bg-gray-300 rounded-lg animate-pulse" />
    </div>
  );
}

