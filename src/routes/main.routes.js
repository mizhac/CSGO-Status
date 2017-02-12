import express from 'express';
let Rcon = require('srcds-rcon');

let rcon = Rcon({
  address: '190.102.157.50:27023',
  password: 'synergyesport'
});

const router = express.Router();

router.get('/', (req, res) => {

  let status_obj = {hostname:'', version: '', udp_ip: '', os: '', type:'' , humans: '', bots: ''};

  let re_hostname = /(.*)(hostname)(.*)/,
      re_version = /(.*)(version\s+)(.*)/,
      re_udp_ip = /(.*)(udp[/]ip\s+)(.*)/,
      re_os = /(.*)(os\s+)(.*)/,
      re_type = /(.*)(type\s+)(.*)/,
      re_humans = /[:].*[,]/,
      re_bots = /[,].*/;

  rcon.connect().then(() => {
    return rcon.command('sv_airaccelerate 10').then(() => {
      console.log('changed sv_airaccelerate');
    });
  }).then(
    () => rcon.command('status').then(status => {

      status_obj.hostname = re_hostname.exec(status)[3].substring(2);
      status_obj.version = re_version.exec(status)[3].substring(2);
      status_obj.udp_ip = re_udp_ip.exec(status)[3].substring(2);
      status_obj.os = re_os.exec(status)[3].substring(2);
      status_obj.type = re_type.exec(status)[3].substring(2);
      status_obj.humans = re_humans.exec(status)[0].substring(2);
      status_obj.bots = re_bots.exec(status)[0].substring(2);

      res.json({status:status_obj});
    })
  ).catch(err => {
    console.log('caught', err);
    console.log(err.stack);
  });

});
export default router;
