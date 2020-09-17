const queue = require("../config/kue");

const forgotPasswordMailer = require("../mailers/forgot_password_mailer");

queue.process("emails1", function (job, done) {
  console.log("emails worker is processing a job ", job.data);

  forgotPasswordMailer.newReset(job.data);

  done();
});
