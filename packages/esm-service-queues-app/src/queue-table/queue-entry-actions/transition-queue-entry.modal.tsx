import React from 'react';
import { useTranslation } from 'react-i18next';
import { type QueueEntry } from '../../types';
import QueueEntryActionModal from './queue-entry-actions.modal';
import { transitionQueueEntry } from './queue-entry-actions.resource';

interface TransitionQueueEntryModalProps {
  queueEntry: QueueEntry;
  closeModal: () => void;
  modalTitle?: string;
}

const TransitionQueueEntryModal: React.FC<TransitionQueueEntryModalProps> = ({
  queueEntry,
  closeModal,
  modalTitle,
}) => {
  const { t } = useTranslation();
  return (
    <QueueEntryActionModal
      queueEntry={queueEntry}
      closeModal={closeModal}
      modalParams={{
        modalTitle: modalTitle || t('movePatient', 'Move {{patient}}', { patient: queueEntry.display }),
        modalInstruction: t(
          'transitionPatientStatusOrQueue',
          'Select a new status or queue for patient to transition to',
        ),
        submitButtonText: t('move', 'Move'),
        submitSuccessTitle: t('queueEntryTransitioned', 'Queue entry transitioned'),
        submitSuccessText: t('queueEntryTransitionedSuccessfully', 'Queue entry transitioned successfully'),
        submitFailureTitle: t('queueEntryTransitionFailed', 'Error transitioning queue entry'),
        submitAction: (queueEntry, formState) => {
          return transitionQueueEntry({
            queueEntryToTransition: queueEntry.uuid,
            newQueue: formState.selectedQueue,
            newStatus: formState.selectedStatus,
            newPriority: formState.selectedPriority,
            newPriorityComment: formState.prioritycomment,
          });
        },
        disableSubmit: (queueEntry, formState) =>
          formState.selectedQueue == queueEntry.queue.uuid && formState.selectedStatus == queueEntry.status.uuid,
        isTransition: true,
      }}
    />
  );
};

export default TransitionQueueEntryModal;
