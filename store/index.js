export const strict = false;

import moment from 'moment';
moment.locale('tr');

export const state = () => ({
  isUserWorker: undefined,
  totalCompanies: 0,
  totalJobs: 0,
  totalTodo: 0,
  dateFull: moment(new Date).format('LL'),
  dateDay: moment(new Date).format('DD'),
  dateNow: moment(new Date).format('LTS')
});
