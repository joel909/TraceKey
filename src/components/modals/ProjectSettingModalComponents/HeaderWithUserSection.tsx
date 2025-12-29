'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Trash2, UserPlus, AlertCircle, Loader } from 'lucide-react';
import { UserListSkeleton, AddUserSkeleton } from './UserListSkeleton';

interface SharedUser {
  id: string;
  name: string;
}

interface HeaderWithUserSectionProps {
  sharedUsers?: SharedUser[];
  isLoadingUsers?: boolean;
  onAddUser?: (email: string) => Promise<SharedUser[] | void>;
  onRevokeAccess?: (userId: string) => Promise<SharedUser[] | void>;
  onUsersUpdate?: (users: SharedUser[]) => void;
  onError?: (error: string) => void;
  onSuccess?: () => void;
}

export function HeaderWithUserSection({
  sharedUsers = [],
  isLoadingUsers = false,
  onAddUser,
  onRevokeAccess,
  onUsersUpdate,
  onError,
  onSuccess,
}: HeaderWithUserSectionProps) {
  const [newUserEmail, setNewUserEmail] = useState('');
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [revokingUserId, setRevokingUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<SharedUser[]>(sharedUsers);
  const [isLoading, setIsLoading] = useState(isLoadingUsers);

  useEffect(() => {
    setUsers(sharedUsers);
    setIsLoading(isLoadingUsers);
  }, [sharedUsers, isLoadingUsers]);

  const handleAddUser = async () => {
    if (!newUserEmail.trim()) {
      setError('Please enter an email address');
      onError?.('Please enter an email address');
      return;
    }

    try {
      setIsAddingUser(true);
      setError(null);

      if (onAddUser) {
        const result = await onAddUser(newUserEmail);
        console.log('Add user result:', result);
        if (result && Array.isArray(result)) {
          setUsers(result);
          onUsersUpdate?.(result);
        } else {
          // If no result returned, add user optimistically
          const newUser: SharedUser = {
            id: Date.now().toString(),
            name: newUserEmail,
          };
          const updatedUsers = [...users, newUser];
          setUsers(updatedUsers);
          onUsersUpdate?.(updatedUsers);
        }

        setNewUserEmail('');
        onSuccess?.();
      }
      
    } catch (err) {
      console.error('Error adding user:', err);
      const errMsg = err instanceof Error ? err.message : 'Failed to add user';
      setError(errMsg);
      onError?.(errMsg);
    } finally {
      setIsAddingUser(false);
    }
  };

  const handleRevokeAccess = async (email: string) => {
    try {
      setRevokingUserId(email);
      setError(null);

      // Wait for 5 seconds
      
      if (onRevokeAccess) {
        const result = await onRevokeAccess(email);
        if (result && Array.isArray(result)) {
          setUsers(result);
          onUsersUpdate?.(result);
        } else {
          // If no result returned, remove user optimistically
          const updatedUsers = users.filter((u) => u.name !== email);
          setUsers(updatedUsers);
          onUsersUpdate?.(updatedUsers);
        }
      }

      onSuccess?.();

    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Failed to revoke access';
      setError(errMsg);
      onError?.(errMsg);
    } finally {
      setRevokingUserId(null);
    }
  };
  return (
    <div className="space-y-4">
      {/* Shared With Section */}
      <div>
        <h3 className="text-sm font-semibold text-[#647FBC] mb-3">Shared With</h3>
        <div className="bg-gray-50/50 rounded-lg border border-gray-200/60 p-4 space-y-3">
          {isLoading ? (
            <UserListSkeleton />
          ) : users?.length > 0 ? (
            <div className="space-y-2">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-2"
                >
                  <span className="text-sm text-[#647FBC] font-medium">{user.name}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRevokeAccess(user.name)}
                    disabled={revokingUserId === user.name}
                    className="text-red-600 border-red-200 hover:bg-red-50 h-7 px-2"
                  >
                    {revokingUserId === user.name ? (
                      <div className="animate-spin h-3 w-3 border-2 border-red-600 border-t-transparent rounded-full" />
                    ) : (
                      <Trash2 className="h-3 w-3" />
                    )}
                    <span className="ml-1 text-xs">Revoke</span>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No users have access</p>
          )}
        </div>
      </div>

      {/* Add User Section */}
      <div>
        <h3 className="text-sm font-semibold text-[#647FBC] mb-3">Add User</h3>
        {isLoading ? (
          <AddUserSkeleton />
        ) : (
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter user email"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddUser()}
              disabled={isAddingUser}
              className="flex-1 h-10 rounded-lg border border-gray-300 focus:border-[#647FBC] focus-visible:ring-[#647FBC] text-[#647FBC] placeholder-gray-400 bg-white"
            />
            <Button
              onClick={handleAddUser}
              disabled={isAddingUser}
              className="bg-[#647FBC] hover:bg-[#5a6fb0] text-white h-10 px-4"
            >
              {isAddingUser ? (
                <div className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <UserPlus className="h-4 w-4" />
              )}
            </Button>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Loader Modal */}
      <Dialog open={isAddingUser || !!revokingUserId}>
        <DialogContent className="flex flex-col items-center justify-center gap-4 border-0 bg-white">
          <DialogTitle className="sr-only">
            {isAddingUser ? 'Adding user' : 'Revoking access'}
          </DialogTitle>
          <div className="animate-spin">
            <Loader className="h-12 w-12 text-[#647FBC]" />
          </div>
          <p className="text-lg font-semibold text-[#647FBC]">
            {isAddingUser ? 'Adding user...' : 'Revoking access...'}
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
