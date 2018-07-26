const express = require('express');
const router = express.Router();
const Queue = require('bee-queue');
const ticketUnholdQueue = new Queue('ticketUnhold',{
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


const Show = require('../../models/Show');
const Ticket = require('../../models/Ticket');

ticketUnholdQueue.process(function (job, done) {
    console.log(`Processing job ${job.id}`);
    const ticketId = job.data.ticketId;
    console.log(ticketId);
    Ticket.findOneAndDelete({_id: ticketId, status: 'pending'},() => {
        done();
    });
  }); 



router.post('/createticket',(req,res) => {   
    Show.find({_id: req.body.showId})
        .then((show) => {
            console.log(">>>>>>");
            console.log(show);
            var tickets = null;
            tickets = req.body.tickets;
            const ticket = new Ticket({
                show:show[0]._id,
                showTime: show[0].showTime,
                tickets: tickets,
                status: 'pending'
            });
            console.log(ticket);
            console.log()
            ticket.save().then((ticket) => {
                const job = ticketUnholdQueue.createJob({ticketId: ticket._id}) ;
                console.log("Mohan");
                const now = new Date();
                const delayTimestamp = now.getTime() + 300000;
                job
                .delayUntil(delayTimestamp)
                .save();
                res.json(ticket)});
    })
});

router.get('/blocked_seats/:showId',(req,res) => {
    Ticket.find({show: req.params.showId,status: { $in : ["pending","confirmed"]} })
        .then((tickets) => {
            console.log(tickets);
            var blockedTickets = [];
            for(i = 0; i < tickets.length; i++)
            {
;
                  blockedTickets =  blockedTickets.concat(tickets[i].tickets);
                    console.log(blockedTickets);
            }    
            res.json(blockedTickets);
        })
})


router.post('/submit', (req,res) => {
    Ticket.findOne({_id: req.body.ticketId})
        .populate('show')
        .then((ticket) => {
            ticket.status = 'confirmed';
            ticket.username = req.body.username;
            ticket.email = req.body.email;
            ticket.mobile = req.body.mobile;
            ticket.transctionId = req.body.transctionId;
            ticket.save();
            Show.findOne({_id: ticket.show._id}).
                populate('movie').
                populate('cinema').
                then((show) => {
                    console.log(show);
                    ticket.show = show;
                    res.json(ticket);
                })
        })
})
module.exports = router