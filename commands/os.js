import os from 'os';


export async function osInfo(com) {
  let result = null;

  if (com === '--EOL') {
    result = `EOL: "${os.EOL.replace(/\n/g, '\\n').replace(/\r/g, '\\r')}"`;
  } else if (com === '--cpus') {
    const cpus = os.cpus();
    const totalCores = cpus.length;

    const cpuInfo = cpus.map(cpu => ({
      Model: cpu.model,
      'Clock Rate (GHz)': (cpu.speed / 1000).toFixed(2)
    }));

    result = {
      'Total Cores': totalCores,
      'CPUs': cpuInfo
    };
  } else if (com === '--homedir') {
    result = os.homedir();
  } else if (com === '--username') {
    result = os.userInfo().username;
  } else if (com === '--architecture') {
    result = os.arch();
  } else {
    result = 'Invalid input: unknown OS command.';
  }
  console.log(result);
}