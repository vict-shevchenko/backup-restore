/**
 * Created by xmityaz on 30.03.16.
 */

export const protocols = ['ssh', 'telnet', 'rlogin', 'Windows', 'vSphere', 'vCenter', 'SNMP', 'WBEM',
  'Mainview z/OS Agent', 'Cisco IMC Web API', 'HP iLO Web API', 'EMC VPLEX REST API'];

export const quickFilters = [
  {
    name: 'ESX Host',
    protocols: ['vSphere']
  },
  {
    name: 'Mainframe',
    protocols: ['Mainview z/OS Agent']
  },
  {
    name: 'Management Controller',
    protocols: ['SNMP', 'Cisco IMC Web API', 'HP iLO Web API']
  },
  {
    name: 'Network Device',
    protocols: ['SNMP']
  },
  {
    name: 'Printer',
    protocols: ['SNMP']
  },
  {
    name: 'Storage',
    protocols: ['WBEM', 'EMC VPLEX REST API']
  },
  {
    name: 'UNIX Host',
    protocols: ['ssh', 'telnet', 'rlogin']
  },
  {
    name: 'Windows',
    protocols: ['Windows']
  },
  {
    name: 'vCenter',
    protocols: ['vCenter']
  }
];
