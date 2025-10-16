const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
const ROOT = process.cwd();

function waitForHealth(url, timeout = 30000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    (function poll(){
      http.get(url, (res) => {
        if(res.statusCode === 200) return resolve(true);
        if(Date.now() - start > timeout) return reject(new Error('timeout'));
        setTimeout(poll, 1000);
      }).on('error', () => {
        if(Date.now() - start > timeout) return reject(new Error('timeout'));
        setTimeout(poll, 1000);
      });
    })();
  });
}

async function main(){
  console.log('Starting server...');
  const serverProc = spawn(process.execPath, [path.join(ROOT,'server.js')], { stdio: 'inherit' });

  process.on('exit', ()=> { try{ serverProc.kill(); }catch(e){} });
  process.on('SIGINT', ()=> { try{ serverProc.kill(); }catch(e){} process.exit(1); });

  const healthUrl = `http://localhost:${PORT}/health`;
  console.log('Waiting for', healthUrl);
  try{
    await waitForHealth(healthUrl, 30000);
    console.log('Health OK');
  }catch(err){
    console.error('Health check failed:', err.message);
    serverProc.kill();
    process.exit(2);
  }

  console.log('Running Cypress...');
  const cypress = spawn(process.execPath, [require.resolve('cypress/bin/cypress'), 'run', '--config', `baseUrl=http://localhost:${PORT}`], { stdio: 'inherit' });
  cypress.on('exit', (code) => {
    try{ serverProc.kill(); }catch(e){}
    process.exit(code);
  });
}

main();
