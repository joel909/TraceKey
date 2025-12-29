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

  // Initialize form fields when project changes or modal opens
  useEffect(() => {
    if (isOpen && project) {
      setProjectName(project.name || '');
      setDescription(project.description || '');
      setDeployedUrl(project.url || '');
      setError(null);
      setSuccess(false);
    }
  }, [isOpen, project]);

  const handleSave = async () => {
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

      if (onSave) {
        await onSave(updatedProject);
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save project settings');
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

          {success && <SuccessMessage />}

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
