const beeQueue= require('bee-queue');
const ticketUnholdQueue = new beeQueue('ticketUnholdQueue',{
    redis: {
        host: '127.0.0.1',
        port: 6379,
        db: 0,
        options: {}
      },
    isWorker: true,
    activateDelayedJobs: true,
    removeOnSuccess: true
});

function ticketUnhold(){
    ticketUnholdQueue.process(function (job, done) {
        console.log(`Processing job ${job.id}`);
        var showId = null;
        showId = job.data.showId;
        
        return done(null, job.data.showId + job.data.y);
      });
}