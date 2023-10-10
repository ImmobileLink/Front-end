// utils/scheduleJob.js
const schedule = require('node-schedule');

export default function scheduleJob (date: Date, jobFunction: () => any) {
  // 'date' deve ser uma instância de Date representando a data e hora exatas do job
  const jobDate = new Date(date);

  // Configuração do job
  const job = schedule.scheduleJob(jobDate, jobFunction);

  // Retornar o job agendado (opcional, mas pode ser útil para cancelamento)
  return job;
};

