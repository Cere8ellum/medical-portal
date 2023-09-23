import * as React from 'react';
import { useState } from 'react';
import styles from '../styles/scheduledatepicker.module.css';
import api from 'apps/frontend/src/infrastructure/api';
import { AbsenceSchedule } from '../../../interfaces/AbsenceSchedule.dto';
import { groupDatesByPeriod } from '../../../utils/daterange';
import { Snackbar } from '@mui/material';
import { snackbarStore } from 'apps/frontend/src/stores';
import { ConfirmationDialog } from 'apps/frontend/src/components';

interface ListProps {
  schedules: Array<{
    range: string;
    cause: string;
    ids: number[];
  }>;
}

interface RowProps {
  range: string;
  ids: number[];
  cause: string;
}

const Row: React.FC<RowProps> = ({ range, ids, cause }: RowProps) => {
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  const remove = async () => {
    const btn = document.querySelector(
      'button[name="remove"]'
    ) as HTMLButtonElement;
    const ids = btn.getAttribute('id')?.split('-');
    let statuses: number[] = [];
    if (ids && ids.length > 0) {
      try {
        ids.forEach(async (id) => {
          await api({
            method: 'delete',
            url: `/absence-schedule/schedule?scheduleId=${id}`,
          })
            .then(({ status }) => {
              statuses.push(status);
            })
            .catch((error) => {
              snackbarStore.setContent({
                severity: 'error',
                message: `Произошла ошибка: ${error}`,
              });
              snackbarStore.handleOpen();
            });
        });
        setIsDelete(true);
        if (statuses.every((status) => status === 200)) {
          snackbarStore.setContent({
            severity: 'success',
            message: `Внесены изменения в график отпусков`,
          });
          snackbarStore.handleOpen();
        }
      } catch (error) {
        snackbarStore.setContent({
          severity: 'error',
          message: `Произошла ошибка: ${error}`,
        });
        snackbarStore.handleOpen();
      }
    }
  };

  return (
    <>
      <div
        className={styles['schedule-row']}
        style={{ display: isDelete ? 'none' : 'flex' }}
      >
        <input
          type="text"
          className={styles['schedule-row-range']}
          name="range"
          id={`range-${ids.join('-')}`}
          value={range.toString()}
          readOnly
        />
        <input
          type="text"
          name="cause"
          id={`cause-${ids.join('-')}`}
          value={cause}
          className={styles['schedule-row-cause']}
          readOnly
        />
        <button
          name="remove"
          id={ids.join('-')}
          className={styles['schedule-row-remove']}
          // onClick={remove}
          onClick={() => setDeleteOpen(true)}
        >
          удалить
        </button>
      </div>
      <Snackbar />
      <ConfirmationDialog
        message="Вы действительно хотите удалить это?"
        open={deleteOpen}
        onConfirm={remove}
        onClose={() => setDeleteOpen(false)}
      />
    </>
  );
};

const ScheduleList: React.FC<ListProps> = ({ schedules }: ListProps) => {
  return (
    <>
      <div className={styles['schedule-list']}>
        {schedules?.length > 0 ? (
          schedules.map((schedule) => {
            return (
              <Row
                key={`keys-${schedule.ids.join('-')}`}
                range={schedule.range}
                ids={schedule.ids}
                cause={schedule.cause}
              />
            );
          })
        ) : (
          <h5 className={styles['schedule-list-note']}>
            * График не сформирован *
          </h5>
        )}
      </div>
      <Snackbar />
    </>
  );
};

export default ScheduleList;
