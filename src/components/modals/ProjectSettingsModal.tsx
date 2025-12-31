'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ProjectData } from '@/lib/interfaces/manage_project_interfaces';
import { HeaderWithUserSection } from './ProjectSettingModalComponents/HeaderWithUserSection';
import { ProjectNameField } from './ProjectSettingModalComponents/ProjectNameField';
import { ProjectDescriptionField } from './ProjectSettingModalComponents/ProjectDescriptionField';
import { ProjectUrlField } from './ProjectSettingModalComponents/ProjectUrlField';
import { ErrorMessage } from './ProjectSettingModalComponents/ErrorMessage';
import { SuccessMessage } from './ProjectSettingModalComponents/SuccessMessage';
import { ModalFooter } from './ProjectSettingModalComponents/ModalFooter';
import { UserRequest } from '@/lib/user-requests/UserRequest';

interface SharedUser {
  id: string;
  name: string;
}

interface ProjectSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectData;
  sharedUsers?: SharedUser[];
  isLoadingUsers?: boolean;
  onSave?: (updatedProject: Partial<ProjectData>) => Promise<void>;
  onAddUser?: (email: string) => Promise<SharedUser[] | void>;
  onRevokeAccess?: (userId: string) => Promise<SharedUser[] | void>;
  onUsersUpdate?: (users: SharedUser[]) => void;
}

export function ProjectSettingsModal({
  isOpen,
  onClose,
  project,
  sharedUsers = [],
  isLoadingUsers = false,
  onSave,
  onAddUser,
  onRevokeAccess,
  onUsersUpdate,
}: ProjectSettingsModalProps) {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [deployedUrl, setDeployedUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize form fields when project changes or modal opens
  useEffect(() => {
    if (isOpen && project) {
      setProjectName(project.name || '');
      setDescription(project.description || '');
      setDeployedUrl(project.url || '');
      setError(null);
      setSuccess(false);
      setHasChanges(false);
    }
  }, [isOpen, project]);

  // Track if any field has changed
  useEffect(() => {
    const changed =
      projectName !== (project.name || '') ||
      description !== (project.description || '') ||
      deployedUrl !== (project.url || '');
    setHasChanges(changed);
  }, [projectName, description, deployedUrl, project]);

  const handleSave = async () => {
    // Check if there are changes
    if (!hasChanges) {
      setError('No changes to save');
      return;
    }

    // Validation
    if (!projectName.trim()) {
      setError('Project name is required');
      return;
    }

    if (!deployedUrl.trim()) {
      setError('Deployed URL is required');
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      const updatedProject = {
        name: projectName,
        description: description,
        url: deployedUrl,
      };
      const userRequest = new UserRequest();
      await userRequest.modifyProjectData(project.id, updatedProject.name, updatedProject.description, updatedProject.url);

      // Dummy API call with timeout
      // await new Promise((resolve, reject) => {
      //   const timeout = setTimeout(() => {
      //     // Randomly fail for testing (20% chance)
      //     reject(new Error('Failed to save project settings. Please try again.'));
      //     if (Math.random() < 0.2) {
      //       reject(new Error('Failed to save project settings. Please try again.'));
      //     } else {
      //       resolve(null);
      //     }
      //   }, 2000); // 2 second timeout
      // });

      if (onSave) {
        await onSave(updatedProject);
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save project settings');
      setSuccess(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setProjectName(project.name || '');
    setDescription(project.description || '');
    setDeployedUrl(project.url || '');
    setError(null);
    setSuccess(false);
    onClose();
  };

  const handleAddUser = async () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white border border-gray-200/60 rounded-xl shadow-lg">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-2xl font-bold text-[#647FBC]">
            Project Settings
          </DialogTitle>
        </DialogHeader>

        {error && <ErrorMessage message={error} />}

        {success && <SuccessMessage />}

        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-4">
          <HeaderWithUserSection
            sharedUsers={sharedUsers}
            isLoadingUsers={isLoadingUsers}
            onAddUser={onAddUser}
            onRevokeAccess={onRevokeAccess}
            onUsersUpdate={onUsersUpdate}
            onError={setError}
            onSuccess={handleAddUser}
          />

          <ProjectNameField value={projectName} onChange={setProjectName} />

          <ProjectDescriptionField value={description} onChange={setDescription} />

          <ProjectUrlField value={deployedUrl} onChange={setDeployedUrl} />
        </div>

        {/* Dialog Footer */}
        <ModalFooter onCancel={handleCancel} onSave={handleSave} isSaving={isSaving} />
      </DialogContent>
    </Dialog>
  );
}
